import './scss/styles.scss';
import { ApiClient } from './components/model/apiclient'
import { IFormContactsContent, IFormAddressContent, IProductItem } from './types';
import { EventEmitter } from './components/base/events';
import { CardComponent } from './components/view/cardComponent';
import { PageComponent } from './components/view/page';
import { cloneTemplate, ensureElement } from './utils/utils';
import { ProductsModel } from './components/model/productsModel';
import { paymentMethods, settings } from './utils/constants';
import { Modal } from './components/common/modal';
import { CartComponent } from './components/view/cartComponent';
import { OrderModel } from "./components/model/orderModel"
import { FormAddressComponent } from './components/view/formAddressComponent';
import { FormContactsComponent } from './components/view/formContactsComponent';
import { SuccessComponent } from './components/view/successComponent';



const apiClient = new ApiClient()
const events = new EventEmitter;

const cardCatalogTemplate = ensureElement<HTMLTemplateElement>("#card-catalog");
const cardPreviewTemplate = ensureElement<HTMLTemplateElement>('#card-preview');
const cardBasketTemplate = ensureElement<HTMLTemplateElement>('#card-basket');
const cartTemplate = ensureElement<HTMLTemplateElement>('#basket')
const addressFormTemplate = ensureElement<HTMLTemplateElement>('#order');
const contactsFormTemplate = ensureElement<HTMLTemplateElement>('#contacts');
const successTemplate = ensureElement<HTMLTemplateElement>('#success');


const modalContainer = ensureElement<HTMLElement>('#modal-container')

const page = new PageComponent(document.querySelector('.page'), events);
const modal = new Modal(modalContainer, events)

const productModel = new ProductsModel(events);
const orderModel = new OrderModel(events, apiClient)

const cart = new CartComponent(cloneTemplate(cartTemplate), events)
const formAddressComponent = new FormAddressComponent(cloneTemplate(addressFormTemplate), events)
const formContactsComponent = new FormContactsComponent(cloneTemplate(contactsFormTemplate), events)
const successComponent = new SuccessComponent(cloneTemplate(successTemplate), events)



events.on(settings.events.productsChanged, () => {
     const productsData = productModel.productCards;
     page.productList = productsData.map((product) => new CardComponent(cloneTemplate(cardCatalogTemplate), product, events).render())
})

events.on(settings.events.cartChanged, () => {
    page.renderHeaderBasketCounter(orderModel.getCounter())
    updateCartComponent() 
    modal.render({content: cart.render()})
})

function updateCartComponent() {
    const renderedComponents = orderModel.items.map((product, index) => {
        const card = new CardComponent(cloneTemplate(cardBasketTemplate), product, events)
        card.listingIndex = index + 1;
        return card.render();
    }
    );


    cart.cardList = renderedComponents;
    cart.totalPrice = orderModel.totalPrice;
}

events.on(settings.events.cardSelected, async (item: HTMLElement) => {
    if(item.dataset['id'] !== undefined) {
        try {
            const productData = await apiClient.getProduct(item.dataset.id);
            productModel.selectedProduct = productData;
        } catch (error) {
            console.error('Ошибка при получении данных о продукте:', error);
        }
    }
});

events.on(settings.events.modalOpen, (content: HTMLElement) => {
   
})

events.on(settings.events.selectedProductChanged, (product: IProductItem) => {
    const card = new CardComponent(cloneTemplate(cardPreviewTemplate), product, events)
        if(orderModel.contains(product.id)) {
            modal.setDisabled(card._button, true)
            card.markAsSelected();
        } 
    modal.render({content: card.render()})
})

events.on(settings.events.addProduct, () => {
    const selectedProduct = productModel.selectedProduct;
    orderModel.addProduct(selectedProduct);
    page.renderHeaderBasketCounter(orderModel.getCounter())
    modal.close()
})


events.on(settings.events.cartOpen, (content: HTMLElement) => {
    updateCartComponent()
    modal.render({content: cart.render()})
})

events.on(settings.events.removeProduct, (productData: IProductItem) => {
    orderModel.removeProduct(productData.id)
})

events.on(settings.events.orderStarted, () => {
    modal.render({
        content: formAddressComponent.render(
          {
              isValid: false,
              errors: ''
          }
        )
    });
    formAddressComponent.validate();
})

events.on(settings.events.addressDataChanged, (data: {field: keyof IFormAddressContent; value: string}) => {
    switch (data.field){
        case 'payment':
            formAddressComponent.payment = data.value;
            orderModel.addressData.payment = data.value === paymentMethods.online ? "онлайн" : "при получении";
            break;
        case 'address':
            formAddressComponent.address = data.value;
            orderModel.addressData.address = data.value;
            break;
    }
})

events.on(settings.events.addressErrorsChanged, (errors : Partial<IFormAddressContent>) => {
    const {payment, address} = errors;
    formAddressComponent.valid = !payment && !address;
    formAddressComponent.errors = Object.values({payment, address})
      .filter(value => !!value) // Remove empty string
      .join('; ')
})

events.on(settings.events.addressFormSubmitted, () => {
    modal.render({
        content: formContactsComponent.render(
          {
              isValid: false,
              errors: ''
          }
        )
    })
})

events.on(settings.events.contactsDataChanged, (data: {field: keyof IFormContactsContent; value: string}) => {
    switch (data.field){
        case 'email':
            formContactsComponent.email = data.value;
            orderModel.contactsData.email = data.value;
            break;
        case 'phone':
            formContactsComponent.phone = data.value;
            orderModel.contactsData.phone = data.value;
            break;
    }
})

events.on(settings.events.contactsErrorsChanged, (errors: Partial<IFormContactsContent>) => {
    const {email, phone} = errors;
    formContactsComponent.valid = !email && !phone;
    formContactsComponent.errors = Object.values({email, phone})
      .filter(value => !!value)
      .join('; ')
})

events.on(settings.events.contactsFormSubmitted, () => {
    orderModel.createOrder()
        .then((res) => {
            orderModel.successOrder = res;
            events.emit(settings.events.orderPublished);
        })
        .catch((error) => {
            console.error('Ошибка при создании заказа:', error);
        });
});

events.on(settings.events.orderPublished, () => {
    successComponent.total = orderModel.successOrder.total
    modal.render({
        content: successComponent.render({
            totalAmount: orderModel.successOrder.total
        })
    })
})

events.on(settings.events.orderFinished, () => {
    formAddressComponent.reset()
    formContactsComponent.reset()
    orderModel.reset()
    modal.close()
    page.counter = 0;
})

events.emit(settings.events.productsChanged)

apiClient.getProducts()
    .then((result) => productModel.productCards = result)
    .catch((error) => {
        console.error('Ошибка при получении списка продуктов:', error);
    });