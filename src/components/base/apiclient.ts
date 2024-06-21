import { IApiClient, IOrder, IOrderEntity, IProductItem } from '../../types/index';
import { Api } from './api'


export class ApiClient implements IApiClient {
    api = new Api("https://larek-api.nomoreparties.co/api/weblarek")

    async getProducts(): Promise<IProductItem[]> {
        await this.api
        .get("/product/")
        .then(data => data as IProductItem[])
        .then(data => console.log(data))
        .then(data => console.log("123123123"))
        
        throw new Error('Method not implemented.');
    }
    getProduct(id: string): Promise<IProductItem> {
        throw new Error('Method not implemented.');
    }
    createOrder(order: IOrder): Promise<IOrderEntity> {
        throw new Error('Method not implemented.');
    }
    
}
