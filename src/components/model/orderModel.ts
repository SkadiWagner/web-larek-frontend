import { IOrderModel, IProductItem, TCategory } from "../../types";
import { settings } from "../../utils/constants";
import { ensureElement } from "../../utils/utils";
import { IEvents } from "../base/events";




export class OrderModel implements IOrderModel {
    protected items: IProductItem[];
    protected totalPrice: number;
    events: IEvents;


    constructor() {
        this.items = [{
            id: '854cef69-976d-4c2a-a18c-2aa45046c390', // id 
    description: 'string', // описание 
    image: 'string', // изображение 
    title: 'string', // название
    category: 'онлайн' as TCategory, // категория
    price: 123 // цена
        }]
        this.totalPrice = 0
    }
    
    addProduct(product: IProductItem): void {
        this.items.push(product)
        this.totalPrice += product.price
        this.events.on(settings.events.addedToCart)
    }
    removeProduct(productId: string): void {
        const index = this.items.findIndex(item => item.id === productId);
        const product = this.items[index]
        this.totalPrice -= product.price
        this.items = this.items.filter(product => product.id !== productId);
    }

    contains(productId: string): boolean {
        const product = this.items.find((item) => item.id === productId);
        return product !== undefined;
    }

    createOrder(): void {
       
    }
    
}