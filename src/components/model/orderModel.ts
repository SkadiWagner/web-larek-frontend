import { IOrder, IOrderModel, IProductItem, TCategory } from '../../types';
import { settings } from "../../utils/constants";
import { ensureElement } from "../../utils/utils";
import { IEvents } from "../base/events";




export class OrderModel implements IOrderModel {
    protected _items: IProductItem[];
    protected _totalPrice: number;
    protected events: IEvents;
    order: IOrder

    constructor(events: IEvents) {
        this._items = []
        this._totalPrice = 0
        this.events = events;
        this.order = {
            address: '',
            email: '',
            items: [],
            payment: 'онлайн',
            phone: '',
            total: 0
        }
    }
    
    get items() : IProductItem[] {
        return this._items;
    }
    
    get totalPrice() : number {
        return this._totalPrice
    }
    addProduct(product: IProductItem): void {
        this._items.push(product)
        this._totalPrice += product.price
        this.events.emit(settings.events.cartChanged, product)
    }
    removeProduct(productId: string): void {
        const index = this._items.findIndex(item => item.id === productId);
        const product = this._items[index]
        this._totalPrice -= product.price
        this._items = this._items.filter(product => product.id !== productId);
        this.events.emit(settings.events.cartChanged, product)
    }

    contains(productId: string): boolean {
        const product = this._items.find((item) => item.id === productId);
        return product !== undefined;
    }

    createOrder(): void {
       
    }
    
}