import {
    IApiClient,
    IFormAddressContent,
    IFormContactsContent,
    IOrder, IOrderDto,
    IOrderModel,
    IProductItem,
} from '../../types';
import { settings } from "../../utils/constants";
import { IEvents } from "../base/events";




export class OrderModel implements IOrderModel {
    protected _items: IProductItem[];
    protected _totalPrice: number;
    protected events: IEvents;
    protected apiClient: IApiClient;
    addressData: IFormAddressContent
    contactsData: IFormContactsContent
    successOrder: IOrderDto;

    constructor(events: IEvents, apiClient: IApiClient) {
        this._items = []
        this._totalPrice = 0
        this.events = events;
        this.apiClient = apiClient;
        this.addressData = {
            address: null,
            payment: null
        }
        this.contactsData = {
            email: null,
            phone: null
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
        console.log(this._items)
        this._items = this._items.filter(product => product.id !== productId);
        this._totalPrice -= product.price
        this.events.emit(settings.events.cartChanged, product)
    }

    contains(productId: string): boolean {
        const product = this._items.find((item) => item.id === productId);
        return product !== undefined;
    }

    getCounter() {
        return this._items.length;
      }

    async createOrder(): Promise<IOrderDto> {
       const order : IOrder = {
           phone: this.contactsData.phone,
           email: this.contactsData.email,
           payment: this.addressData.payment,
           address: this.addressData.address,
           items: this._items.map((value) => value.id),
           total: this.totalPrice
       }
       const orderDto = await this.apiClient.createOrder(order);
       return orderDto;
    }
    reset(){
        this._items = []
        this._totalPrice = 0
        this.addressData = {
            address: null,
            payment: null
        }
        this.contactsData = {
            email: null,
            phone: null
        }
    }
}