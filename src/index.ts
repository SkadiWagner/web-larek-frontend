import './scss/styles.scss';
import { ApiClient } from './components/base/apiclient'
import { IFormDeliveryContent, IProductItem } from './types';
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

const cart = new CartComponent(cloneTemplate(cartTemplate), events)

const modalContainer = ensureElement<HTMLElement>('#modal-container')

const page = new PageComponent(document.querySelector('.page'), events);
const modal = new Modal(modalContainer, events)

const productModel = new ProductsModel(events);
const orderModel = new OrderModel(events)
const formAddressComponent = new FormAddressComponent(cloneTemplate(addressFormTemplate), events)
const formContactsComponent = new FormContactsComponent(cloneTemplate(contactsFormTemplate), events)
const successComponent = new SuccessComponent(cloneTemplate(successTemplate), events)

// константы модалок

const cardPreviewModal = ensureElement<HTMLElement>(".card_full");
const basketModal = ensureElement<HTMLElement>('.basket');
const orderModal = ensureElement<HTMLElement>('.order');
const orderSucess = ensureElement<HTMLElement>('.order-success');




events.on(settings.events.productsChanged, () => {
     const productsData = productModel.productCards;
     page.productList = productsData.map((product) => new CardComponent(cloneTemplate(cardCatalogTemplate), product, events).render())
})

events.on(settings.events.cardSelected, async (item: HTMLElement) => {
    if(item.dataset['id'] !== undefined) {
        const productData = await apiClient.getProduct(item.dataset.id);
        productModel.selectedProduct =  productData
    }
})

events.on(settings.events.modalOpen, (content: HTMLElement) => {
    if(content.querySelector('.card_full')) {
        const card = ensureElement<HTMLElement>('.card_full', content)
        const productId = card.dataset.id
        if(orderModel.contains(productId)) {
            modal.setDisabled(content.querySelector('.card__button'), true)
            const cardComponent = new CardComponent(card, productModel.selectedProduct, events);
            cardComponent.markAsSelected();
        } else {
            const button = ensureElement<HTMLButtonElement>('.card__button', content)
            button.addEventListener('click', () => {
                const selectedProduct = productModel.selectedProduct;
                orderModel.addProduct(selectedProduct);
                page.renderHeaderBasketCounter(orderModel.getCounter())
                modal.close();
            }, { once: true})
        }
    }
})

// events.on('basketList:changed', (items: IProductItem[]) => {
// 	page.counter = Object.keys(items).length;
// });


events.on(settings.events.selectedProductChanged, (product: IProductItem) => {
    const card = new CardComponent(cloneTemplate(cardPreviewTemplate), product, events)
    modal.render({content: card.render()})
})

events.on(settings.events.cartOpen, (content: HTMLElement) => {
    const renderedComponents = orderModel.items.map((product) =>
      new CardComponent(cloneTemplate(cardBasketTemplate), product, events).render()
    );

    renderedComponents.forEach((component) => {
        const deleteButton = component.querySelector('.basket__item-delete');
        const componentId = component.dataset.id 
        console.log(orderModel.items)
        if (deleteButton) {
            deleteButton.addEventListener('click', (item) => {
                events.on(settings.events.removeProduct, () => {
                    orderModel.removeProduct(componentId)
                })    
            });
        }
    });


    const cart = new CartComponent(cloneTemplate(cartTemplate), events)
    cart.cardList = renderedComponents;
    cart.totalPrice = orderModel.totalPrice;
    modal.render({content: cart.render()})
})

events.on(settings.events.orderStarted, () => {
    modal.render({
        content: formAddressComponent.render(
          {
              isValid: false,
              errors: new Array<string>()
          }
        )
    });
    formAddressComponent.validate
})

events.on(settings.events.orderDeliveryDataChanged, (data: {field: keyof IFormDeliveryContent; value: string}) => {
    switch (data.field){
        case 'payment':
            formAddressComponent.payment = data.value;
            orderModel.order.payment = data.value === paymentMethods.online ? "онлайн" : "при получении";
            break;
        case 'address':
            formAddressComponent.address = data.value;
            orderModel.order.address = data.value;
            break;
    }
})


// events.onAll((event) => console.log(event.eventName))
events.emit(settings.events.productsChanged)

apiClient.getProducts().then((result) => productModel.productCards = result)