
// Тип с категориями товаров.
export type TCategory = "софт-скилл" | "другое" | "дополнительное" | "кнопка" | "хард-скилл";

// Тип с методами оплаты.
export type TPayment = "онлайн" | "при получении";

export type FormErrors<T> = Partial<Record<keyof T, string>>;

// Сущность продукта ProductItem, содержит в себе данные конкретного товара(ID, описание товара, изображение, название, категорию, стоимость). Имплементирует интерфейс IProductItem. 
export interface IProductItem {
    id: string; // id 
    description: string; // описание 
    image: string; // изображение 
    title: string; // название
    category: TCategory; // категория
    price: number; // цена
}

// Сущность ProductList списка продуктов, содержит в себе массив продуктов. Имплементирует интерфейс IProductList. 
export interface IProductListDto {
    items: IProductItem[]; // массив продуктов
}

// Сущность заказа Order, хранит в себе такие данные как ( способ оплаты, контактная почта, телефон, адресс ). Имплементирует интерфейс IOrder. 
export interface IOrder {
    payment: TPayment; // способ оплаты
    email: string; // контактная почта
    phone: string; // контактный телефон
    address: string; // адресс доставки 
    total: number; // итоговая стоимость
    items: string[]; // товары в корзине
}

// Сущность – Заказ
export interface IOrderDto {
	id: string; // Выдается сервером
	total: number; // Сумма заказа
}

export interface IAction {
	onClick(event: MouseEvent): void;
}

export interface ICartContent {
    items: IProductItem[];
    total: number;
}

// Сущность корзины Cart, содержит массив товаров добавленных в корзину, а также итоговую стоимость. Имеет 2 метода(добавление/удаление товара). Имплементирует интерфейс ICart.
export interface IOrderModel {

	addProduct(product: IProductItem): void; // метод добавления товаров в корзину
	removeProduct(productId: string): void // метод удаления товара
	createOrder(): Promise<IOrderDto>
}

export interface IDataModel {
    productCards: IProductItem[];
    selectedProduct: IProductItem;
    setPreview(item: IProductItem): void;
  }

// Абстрактный компонент, позволяющий разбить интерфейс на независимые части, с которыми можно по отдельности работать и переиспользовать. 
// T - это дженерик-тип, представляющий собой DTO для отображения данных компонента.
export abstract class Component<T> {
    protected constructor(protected readonly container: HTMLElement) {
    }

    // Инструментарий для работы с DOM в дочерних компонентах

    // Переключить класс
    toggleClass(element: HTMLElement, className: string, force?: boolean) {
        element.classList.toggle(className, force);
    }

    // Установить текстовое содержимое
    protected setText(element: HTMLElement, value: unknown) {
        if (element) {
            element.textContent = String(value);
        }
    }

    // Сменить статус блокировки
    setDisabled(element: HTMLElement, state: boolean) {
        if (element) {
            if (state) element.setAttribute('disabled', 'disabled');
            else element.removeAttribute('disabled');
        }
    }

    // Скрыть
    protected setHidden(element: HTMLElement) {
        element.style.display = 'none';
    }

    // Показать
    protected setVisible(element: HTMLElement) {
        element.style.removeProperty('display');
    }

    // Установить изображение с алтернативным текстом
    protected setImage(element: HTMLImageElement, src: string, alt?: string) {
        if (element) {
            element.src = src;
            if (alt) {
                element.alt = alt;
            }
        }
    }

    // Вернуть корневой DOM-элемент
    render(data?: Partial<T>): HTMLElement {
        Object.assign(this as object, data ?? {});
        return this.container;
    }
}


 // Класс PageView Главная страница с каталогом товаров, содержит счетчик товаров в корзине, а также список всех товаров.  Имплементирует интерфейс IPageView.
export interface IPageView {
	cartCounter: number; // Счетчик товаров в корзине
	productList: HTMLElement[]; // Список продуктов на странице
} 

// Класс CardView Компонент карточки продукта, содержит опциональные поля. Используется в различных компонентах (корзине, галереии, в каталоге на главной странице). Имплементирует интерфейс ICardView.
export interface ICardView {
	title: HTMLHeadingElement; // Заголовок продукта
	price: HTMLSpanElement; // Цена продукта 
	button: HTMLButtonElement; // Кнопка
	category?: HTMLSpanElement; // Категория продукта (необязательно)
    description?: HTMLParagraphElement; // Описание продукта (необязательно)
    image?: HTMLImageElement; // Изображение продукта (необязательно)
}

// Класс CartView Компонент корзины, содержащий список продуктов, добавленных в корзину, а также итоговую стоимость. Имеется кнопка для перехода к оформлению заказа. Имплементирует интерфейс ICartView.
export interface ICartView {
	productList: HTMLElement[]; // Список продуктов в корзине
	totalPrice: number; // Итоговая стоимость корзины
} 

// Класс ModalView Компонент модального окна, имеет 2 метода Открытие и Закрытие. В качестве дженерика принимает контент для отображения. Имплементирует интерфейс IModalView.
export interface IModalView extends Component<IModalContent> {
	open(): void; // метод открытия модального окна
    close(): void; // метод закрытия модального окна
}

// Класс ModalContent содержит контент для модального окна. Имплементирует интерфейс IModalContent.
export interface IModalContent {
    content: HTMLElement; // Содержимое модального окна
}

// Класс IFormView универсальногого компонента формы. С ее помощью можно будет настроить валидацию всех форм в проекте. Имплементирует интерфейс IFormView.
export interface IFormValidationState {
    errors: string;
	isValid: boolean; // проверка валидности формы
}

// Класс FormDeliveryView Валидируемой формы, которая содержит 2 обязательных поля: способ оплаты и адресс. Имплементирует интерфейс IFormDeliveryContent.
export interface IFormAddressContent {
	payment: TPayment; // Метод оплаты
	address: string; // Адрес доставки
}

// Класс FormContactsView Валидируемой формы, которая содержит 2 обязательных поля: контактная почта и номер телефона. Имплементирует интерфейс IFormContactsView.
export interface IFormContactsContent {
	email: string; // Email адрес
	phone: string; // Контактный телефон
}

// Класс SuccessfulOrderView модального окна с информацией о успешном оформлении заказа. Отображает списанную сумму. При закрытии данного модального окна происходит очистка корзины. 
// Имплементирует интерфейс ISuccessfulOrderView.
export interface ISuccessfulOrderContent {
	totalAmount: number; // Итоговая сумма заказа
}


// Класс ApiClient для работы с апи, позволяет получить список продуктов, продукт по ID, создать сущносость заказа. Имплементирует интерфейс IApiClient.
export interface IApiClient {
    getProducts(): Promise<IProductItem[]>; // Получить список продуктов
    getProduct(id: string): Promise<IProductItem>; // Получить информацию о продукте по его идентификатору
    createOrder(order: IOrder): Promise<IOrderDto>; // Создать новый заказ
}