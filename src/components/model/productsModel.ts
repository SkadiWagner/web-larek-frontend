
import { IDataModel as IProductsModel, IProductItem } from '../../types/index';
import { settings } from '../../utils/constants';
import { IEvents } from "../base/events";

export class ProductsModel implements IProductsModel {
  protected _productCards: IProductItem[];
  protected _selectedProduct: IProductItem;

  constructor(protected events: IEvents) {
    this._productCards = []
  }

  set productCards(data: IProductItem[]) {
    this._productCards = data;
    this.events.emit(settings.events.productsChanged);
  }

  set selectedProduct(item: IProductItem) {
    this._selectedProduct = item;
    this.events.emit(settings.events.selectedProductChanged, item);
  }

  get selectedProduct() {
    return this._selectedProduct;
  }

  get productCards() {
    return this._productCards;
  }

  setPreview(item: IProductItem) {
    this.selectedProduct = item;
    this.events.emit('modalCard:open', item)
  }
} 