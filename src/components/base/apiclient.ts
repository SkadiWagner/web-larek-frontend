import { IApiClient, IOrder, IOrderEntity, IProductItem, IProductListDto } from '../../types/index';
import { Api } from './api'


export class ApiClient implements IApiClient {
    api = new Api("https://larek-api.nomoreparties.co/api/weblarek")

    async getProducts(): Promise<IProductItem[]> {
        const data = await this.api.get("/product/")
        const productListDto = data as IProductListDto
        return productListDto.items;
    }
    async getProduct(id: string): Promise<IProductItem> {
        const data = await this.api.get(`/product/${id}`)
        const product = data as IProductItem
        return product;
    }
    async createOrder(order: IOrder): Promise<IOrderEntity> {
        const data = await this.api.post("/order", order)
        const orderEntity = data as IOrderEntity
        return orderEntity;
    }

}
