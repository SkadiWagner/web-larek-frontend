
import { IDataModel as IProductsModel, IProductItem } from '../../types/index';
import { settings } from '../../utils/constants';
import { IEvents } from "../base/events";

export class ProductsModel implements IProductsModel {
  protected _productCards: IProductItem[];
  protected _selectedProduct: IProductItem;

  constructor(protected events: IEvents) {
    this._productCards = []
  }

  set selectedProduct(item: IProductItem) {
    this._selectedProduct = item;
    this.events.emit(settings.events.selectedProductChanged, item);
  }

  get selectedProduct() : IProductItem {
    return this._selectedProduct;
  }

  get productCards() : IProductItem[] {
    return this._productCards;
  }

  set productCards(data: IProductItem[]) {
    this._productCards = data;
    this.events.emit(settings.events.productsChanged);
  }

  setPreview(item: IProductItem) {
    this.selectedProduct = item;
    this.events.emit('modalCard:open', item)
  }
} 