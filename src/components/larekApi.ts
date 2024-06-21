// import { Api, ApiListResponse } from './base/api';
// import { IProductItem, IApiClient, IOrder, IOrderEntity} from '../types/index';

// export class LarekApi extends Api implements IApiClient {
//     readonly cdn: string;

//     constructor(cdn: string, baseUrl: string, options?: RequestInit) {
// 		super(baseUrl, options);
// 		this.cdn = cdn;
// 	}

//     getProducts(): Promise<IProductItem[]> {
// 		return this.get('/product').then((data: ApiListResponse<IProductItem>) =>
// 			data.items.map((item: IProductItem) => ({
// 				...item,
// 				image: this.cdn + item.image,
// 			}))
// 		);
// 	}

// 	getProduct(id: string): Promise<IProductItem> {
// 		return this.get(`/product/${id}`).then((item: IProductItem) => ({
// 			...item,
// 			image: this.cdn + item.image,
// 		}));
// 	}

// 	createOrder(order: IOrder): Promise<IOrderEntity> {
// 		return this.post('/order', order).then((data: IOrderEntity) => data);
// 	}
// }