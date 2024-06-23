import './scss/styles.scss';
import { ApiClient } from './components/base/apiclient'
import { IProductItem, TPayment } from './types';
import { EventEmitter } from './components/base/events';
import { CardComponent } from './components/view/cardComponent';
import { PageComponent } from './components/view/page';
import { cloneTemplate, ensureElement } from './utils/utils';
import { ProductsModel } from './components/model/productsModel';
import { settings } from './utils/constants';
import { Modal } from './components/common/modal';
import { CartComponent } from './components/view/cartComponent';
import { OrderModel } from "./components/model/orderModel"



const apiClient = new ApiClient()


const events = new EventEmitter;
const page = new PageComponent(document.querySelector('.page'), events);
const cardCatalogTemplate = ensureElement<HTMLTemplateElement>("#card-catalog");
const cardPreviewTemplate = ensureElement<HTMLTemplateElement>('#card-preview');
const modalContainer = ensureElement<HTMLElement>('#modal-container')
const CartTemplate = ensureElement<HTMLTemplateElement>('#basket')
const dataModel = new ProductsModel(events);
const modal = new Modal(modalContainer, events)
const orderModel = new OrderModel()


// константы модалок

const cardPreviewModal = ensureElement<HTMLElement>(".card_full");
const basketModal = ensureElement<HTMLElement>('.basket');
const orderModal = ensureElement<HTMLElement>('.order');
const orderSucess = ensureElement<HTMLElement>('.order-success');




events.on(settings.events.productsChanged, async () => {
     const productsData = await apiClient.getProducts()
     page.productList = productsData.map((product) => new CardComponent(cloneTemplate(cardCatalogTemplate), product, events).render())
})

events.on(settings.events.cardSelected, async (item: HTMLElement) => {
    if(item.dataset['id'] !== undefined) {
        const productData = await apiClient.getProduct(item.dataset.id);
        dataModel.selectedProduct =  productData
    }
})

events.on(settings.events.modalOpen, (content: HTMLElement) => {
    if(content.querySelector('.card_full')) {
        const card = ensureElement<HTMLElement>('.card_full', content)
        const productId = card.dataset.id
        if(orderModel.contains(productId)) {
            modal.setDisabled(content.querySelector('.card__button'), true)
        } else {
            const button = ensureElement<HTMLButtonElement>('.card__button', content)
            button.addEventListener('click', () => {
                events.emit(settings.events.addedToCart)
            })
        }
    }
})



events.on(settings.events.selectedProductChanged, (product: IProductItem) => {
    console.log(product)
    const card = new CardComponent(cloneTemplate(cardPreviewTemplate), product, events)
    modal.render({content: card.render()})
})

events.on(settings.events.cartOpen, (content: HTMLElement) => {
    const cart = new CartComponent(cloneTemplate(CartTemplate), events)
    modal.render({content: cart.render()})
})

// events.onAll((event) => console.log(event.eventName))
events.emit(settings.events.productsChanged)

