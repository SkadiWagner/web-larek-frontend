// MODEL

// Сущность продукта
interface IProductItem {
    id: string; // id 
    description: string; // описание 
    image: string; // изображение 
    title: string; // название
    category: TCategory; // категория
    price: number; // цена
}

// Сущность списка продуктов
interface IProductList {
    items: IProductItem[]; // массив продуктов
}

// Сущность заказа
interface IOrder {
    payment: TPayment; // способ оплаты
    email: string; // контактная почта
    phone: string; // контактный телефон
    address: string; // адресс доставки 
    total: number; // итоговая стоимость
    items: string[]; // товары в корзине
}

// Сущность товара в корзине
interface ICartItem {
    product: IProductItem; // продукт в корзине
    quantity: number; // кол-во продукта
}

// Сущность корзины
interface ICart {
    items: ICartItem[]; // массив товаров в корзине
    totalPrice: number; // итоговая стоимость

    addProduct(product: IProductItem): void; // метод добавления товаров в корзину
    updateProductQuantity(productId: string, quantity: number): void; // метод обновления кол-ва товара в корзине
}

// View

// Абстрактный компонент

abstract class IComponent<T> {
    protected abstract Hide(element: HTMLElement): void;
    protected abstract Show(element: HTMLElement): void;
    protected abstract SetText(element: HTMLElement, value: string): void;
    abstract SwitchEnableState(element: HTMLElement, state: boolean): void;
    protected abstract SetImage(el: HTMLImageElement, src: string, alt?: string): void;
    abstract Render(data?: Partial<T>): HTMLElement;
  }


 // Главная страничка
interface IPageView {
	cartCounter: number;
	productList: HTMLElement[];
} 

// Продукт
interface ICardView {
	title: HTMLHeadingElement;
	price: HTMLSpanElement;
	category?: HTMLSpanElement;
	button?: HTMLButtonElement;
    description?: HTMLParagraphElement;
    image?: HTMLImageElement;
}

// Корзина
interface ICartView {
	productList: HTMLElement[];
	totalPrice: number;
}

// Форма
interface IFormView {
	isValid: boolean;
}

// Модальное окно
interface IModalView extends IComponent<IModalContent> {
	open(): void;
    close(): void;
}

// контент модального окна
interface IModalContent {
    content: HTMLElement;
}

// Модальное окно с методом оплаты и адресом 
interface IFormDeliveryView {
	payment: string;
	address: string;
}

// Модальное окно с контактными данными
interface IFormContactsView {
	email: string;
	phone: string;
}

// Модальное окно с успешным оформлением заказа
interface ISuccessfulOrderView {
	totalAmount: number;
}

// Presenter 

// Презентер  событий
interface IEvents {
    on<T>(event: string, callback: (data: T) => void): void;
    emit<T>(event: string, data?: T): void;
    trigger<T>(event: string, context?: Partial<T>): (data: T) => void;
}

// Интерфейс для работы с API
interface IApiClient {
    getProducts(): Promise<IProductItem[]>;
    getProduct(id: string): Promise<IProductItem>;
    createOrder(order: iOrder): Promise<ICreatedOrderResponse>;
}