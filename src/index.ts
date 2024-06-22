import './scss/styles.scss';
import { ApiClient } from './components/base/apiclient'
import { TPayment } from './types';
import { EventEmitter } from './components/base/events';
import { CardComponent } from './components/CardComponent';
import { PageComponent } from './components/page';
import { ensureElement } from './utils/utils';

const apiClient = new ApiClient()


const events = new EventEmitter;
const page = new PageComponent(document.querySelector('.page'), events);
const cardCatalogTemplate = ensureElement<HTMLTemplateElement>("#card-catalog");

events.onAll((event) => console.log(event.eventName))

 events.on('products:changed', async () => {
     const productsData = await apiClient.getProducts()
     page.productList = 
     productsData.map((product) => new CardComponent(cardCatalogTemplate, product).render())
})

events.emit("products:changed")

console.log(cardCatalogTemplate)
