
// Тип с категориями товаров.
export type TCategory = "софт-скилл" | "другое" | "дополнительное" | "кнопка" | "хард-скилл";

// Тип с методами оплаты.
export type TPayment = "онлайн" | "при получении"; 

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
    items: IProductItem[]; // товары в корзине
}

// Сущность – Заказ
export interface IOrderEntity {
	id: string[]; // Выдается сервером
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
	createOrder(): void 
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
export interface IFormView {
    errors: string[];
	isValid: boolean; // проверка валидности формы
}

// Класс FormDeliveryView Валидируемой формы, которая содержит 2 обязательных поля: способ оплаты и адресс. Имплементирует интерфейс IFormDeliveryView.
export interface IFormDeliveryView {
	payment: TPayment; // Метод оплаты
	address: string; // Адрес доставки
}

// Класс FormContactsView Валидируемой формы, которая содержит 2 обязательных поля: контактная почта и номер телефона. Имплементирует интерфейс IFormContactsView.
export interface IFormContactsView {
	email: string; // Email адрес
	phone: string; // Контактный телефон
}

// Класс SuccessfulOrderView модального окна с информацией о успешном оформлении заказа. Отображает списанную сумму. При закрытии данного модального окна происходит очистка корзины. 
// Имплементирует интерфейс ISuccessfulOrderView.
export interface ISuccessfulOrderView {
	totalAmount: number; // Итоговая сумма заказа
}


// // Класс Events помогает раболтать с такиим событями как: подписка на событие, отправление данных, генерациях новых событий с  контекстом. Имплементирует интерфейс IEvents.
// export interface IEvents {
//     on<T extends object>(event: EventName, callback: (data: T) => void): void;
//     emit<T extends object>(event: string, data?: T): void;
//     trigger<T extends object>(event: string, context?: Partial<T>): (data: T) => void;
// }

// export class EventEmitter implements IEvents {
//     _events: Map<EventName, Set<Subscriber>>;

//     constructor() {
//         this._events = new Map<EventName, Set<Subscriber>>();
//     }

//     /**
//      * Установить обработчик на событие
//      */
//     on<T extends object>(eventName: EventName, callback: (event: T) => void) {
//         if (!this._events.has(eventName)) {
//             this._events.set(eventName, new Set<Subscriber>());
//         }
//         this._events.get(eventName)?.add(callback);
//     }

//     /**
//      * Снять обработчик с события
//      */
//     off(eventName: EventName, callback: Subscriber) {
//         if (this._events.has(eventName)) {
//             this._events.get(eventName)!.delete(callback);
//             if (this._events.get(eventName)?.size === 0) {
//                 this._events.delete(eventName);
//             }
//         }
//     }

//     /**
//      * Инициировать событие с данными
//      */
//     emit<T extends object>(eventName: string, data?: T) {
//         this._events.forEach((subscribers, name) => {
//             if (name === '*') subscribers.forEach(callback => callback({
//                 eventName,
//                 data
//             }));
//             if (name instanceof RegExp && name.test(eventName) || name === eventName) {
//                 subscribers.forEach(callback => callback(data));
//             }
//         });
//     }

//     /**
//      * Слушать все события
//      */
//     onAll(callback: (event: EmitterEvent) => void) {
//         this.on("*", callback);
//     }

//     /**
//      * Сбросить все обработчики
//      */
//     offAll() {
//         this._events = new Map<string, Set<Subscriber>>();
//     }

//     /**
//      * Сделать коллбек триггер, генерирующий событие при вызове
//      */
//     trigger<T extends object>(eventName: string, context?: Partial<T>) {
//         return (event: object = {}) => {
//             this.emit(eventName, {
//                 ...(event || {}),
//                 ...(context || {})
//             });
//         };
//     }
// }

// Класс ApiClient для работы с апи, позволяет получить список продуктов, продукт по ID, создать сущносость заказа. Имплементирует интерфейс IApiClient.
export interface IApiClient {
    getProducts(): Promise<IProductItem[]>; // Получить список продуктов
    getProduct(id: string): Promise<IProductItem>; // Получить информацию о продукте по его идентификатору
    createOrder(order: IOrder): Promise<IOrderEntity>; // Создать новый заказ
}