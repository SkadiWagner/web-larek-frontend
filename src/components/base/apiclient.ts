import { IApiClient, IOrder, IOrderDto, IProductItem, IProductListDto } from '../../types/index';
import { API_URL } from '../../utils/constants';
import { Api } from './api';


export class ApiClient implements IApiClient {
    api = new Api(API_URL)

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
    async createOrder(order: IOrder): Promise<IOrderDto> {
        const data = await this.api.post("/order", order)
        return data as IOrderDto;
    }

}
