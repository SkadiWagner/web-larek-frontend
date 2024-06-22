import './scss/styles.scss';
import { ApiClient } from './components/base/apiclient'
import { TPayment } from './types';
import { EventEmitter } from './components/base/events';
import { CardComponent } from './components/CardComponent';
import { PageComponent } from './components/page';
import { cloneTemplate, ensureElement } from './utils/utils';

const apiClient = new ApiClient()


const events = new EventEmitter;
const page = new PageComponent(document.querySelector('.page'), events);
const cardCatalogTemplate = ensureElement<HTMLTemplateElement>("#card-catalog");
const cardPreviewTemplate = ensureElement<HTMLTemplateElement>('#card-preview');

events.onAll((event) => console.log(event.eventName))

 events.on('products:changed', async () => {
     const productsData = await apiClient.getProducts()
     page.productList = productsData.map((product) => new CardComponent(cloneTemplate(cardCatalogTemplate), product).render())
})

events.emit("products:changed")

