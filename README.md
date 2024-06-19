# Проектная работа "Веб-ларек"

Стек: HTML, SCSS, TS, Webpack

Структура проекта:
- src/ — исходные файлы проекта
- src/components/ — папка с JS компонентами
- src/components/base/ — папка с базовым кодом

Важные файлы:
- src/pages/index.html — HTML-файл главной страницы
- src/types/index.ts — файл с типами
- src/index.ts — точка входа приложения
- src/scss/styles.scss — корневой файл стилей
- src/utils/constants.ts — файл с константами
- src/utils/utils.ts — файл с утилитами

## Установка и запуск
Для установки и запуска проекта необходимо выполнить команды

```
npm install
npm run start
```

или

```
yarn
yarn start
```
## Сборка

```
npm run build
```

или

```
yarn build
```

# Документация

## Общие типы

```TypeScript 

// Тип с категориями товаров.
type TCategory = "софт-скилл" | "другое" | "дополнительное" | "кнопка" | "хард-скилл";

// Тип с методами оплаты.
type TPayment = "онлайн" | "при получении"; 

```

## Базовые классы

### 1. Класс API

Класс Api служит для управления взаимодействием с API посредством HTTP-запросов. Он упрощает выполнение основных операций, таких как отправка запросов и обработка ответов, благодаря обобщенным методам и настройкам.

#### Свойства

__baseUrl__: строка, представляющая базовый URL для всех API-запросов. Это начальная точка для формирования URI запросов.
__options__: объект с параметрами, определяющими настройки запроса по умолчанию. Включает заголовки и другие параметры, необходимые для выполнения запросов.

#### Методы

##### get(uri: string): Promise<any>
Метод отправляет HTTP GET-запрос на указанный uri, который добавляется к baseUrl. Возвращает Promise, который разрешается с данными ответа, обработанными внутренним методом handleResponse.

###### Параметры:
__uri:__ относительный путь, добавляемый к baseUrl, чтобы сформировать полный URL для GET-запроса.

#### post(uri: string, data: object, method: ApiPostMethods = 'POST'): Promise<any>
Метод отправляет HTTP-запрос с методом POST, PUT или DELETE на указанный uri, включая данные data в теле запроса. Возвращает Promise, который разрешается с данными ответа, обработанными внутренним методом handleResponse.

###### Параметры:
__uri__: относительный путь для построения полного URL запроса.
__data__: объект, содержащий данные, отправляемые в теле запроса.
__method__: строка, определяющая HTTP-метод (по умолчанию 'POST').

##### protected handleResponse(response: Response): Promise<any>
Защищенный метод, который обрабатывает ответ от API. Возвращает Promise, который разрешается с JSON-данными, если запрос успешен, или отклоняется в случае ошибки.

###### Параметры:
__response__: объект Response, полученный от выполнения HTTP-запроса.

## Слой Model

```TypeScript 

// Сущность продукта ProductItem, содержит в себе данные конкретного товара(ID, описание товара, изображение, название, категорию, стоимость). Имплементирует интерфейс IProductItem. 
interface IProductItem {
    id: string; // id 
    description: string; // описание 
    image: string; // изображение 
    title: string; // название
    category: TCategory; // категория
    price: number; // цена
}

// Сущность ProductList списка продуктов, содержит в себе массив продуктов. Имплементирует интерфейс IProductList. 
interface IProductList {
    items: IProductItem[]; // массив продуктов
}

// Сущность заказа Order, хранит в себе такие данные как ( способ оплаты, контактная почта, телефон, адресс ). Имплементирует интерфейс IOrder. 
interface IOrder {
    payment: TPayment; // способ оплаты
    email: string; // контактная почта
    phone: string; // контактный телефон
    address: string; // адресс доставки 
    total: number; // итоговая стоимость
    items: string[]; // товары в корзине

}

// Сущность корзины Cart, содержит массив товаров добавленных в корзину, а также итоговую стоимость. Имеет 2 метода(добавление/удаление товара). Имплементирует интерфейс ICart.
interface ICart {
    items: IProductItem[]; // массив товаров в корзине
    totalPrice: number; // итоговая стоимость

    addProduct(productId: string): void; // метод добавления товаров в корзину
	removeProduct(productId: string): void // метод удаления товара
	createOrder(): void 
}
```

## Слой View
```TypeScript 

// Абстрактный компонент, позволяющий разбить интерфейс на независимые части, с которыми можно по отдельности работать и переиспользовать. 
// T - это дженерик-тип, представляющий собой DTO для отображения данных компонента.
export abstract class Component<T> {
    protected constructor(protected readonly container: HTMLElement) {
        // Учитывайте что код в конструкторе исполняется ДО всех объявлений в дочернем классе
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
interface IPageView {
	cartCounter: number; // Счетчик товаров в корзине
	productList: HTMLElement[]; // Список продуктов на странице
} 

// Класс CardView Компонент карточки продукта, содержит опциональные поля. Используется в различных компонентах (корзине, галереии, в каталоге на главной странице). Имплементирует интерфейс ICardView.
interface ICardView {
	title: HTMLHeadingElement; // Заголовок продукта
	price: HTMLSpanElement; // Цена продукта 
	button: HTMLButtonElement; // Кнопка
	category?: HTMLSpanElement; // Категория продукта (необязательно)
    description?: HTMLParagraphElement; // Описание продукта (необязательно)
    image?: HTMLImageElement; // Изображение продукта (необязательно)
}

// Класс CartView Компонент корзины, содержащий список продуктов, добавленных в корзину, а также итоговую стоимость. Имеется кнопка для перехода к оформлению заказа. Имплементирует интерфейс ICartView.
interface ICartView {
	productList: HTMLElement[]; // Список продуктов в корзине
	totalPrice: number; // Итоговая стоимость корзины
} 

// Класс ModalView Компонент модального окна, имеет 2 метода Открытие и Закрытие. В качестве дженерика принимает контент для отображения. Имплементирует интерфейс IModalView.
interface IModalView extends Component<IModalContent> {
	open(): void; // метод открытия модального окна
    close(): void; // метод закрытия модального окна
}

// Класс ModalContent содержит контент для модального окна. Имплементирует интерфейс IModalContent.
interface IModalContent {
    content: HTMLElement; // Содержимое модального окна
}

// Класс IFormView универсальногого компонента формы. С ее помощью можно будет настроить валидацию всех форм в проекте. Имплементирует интерфейс IFormView.
interface IFormView {
	isValid: boolean; // проверка валидности формы
}

// Класс FormDeliveryView Валидируемой формы, которая содержит 2 обязательных поля: способ оплаты и адресс. Имплементирует интерфейс IFormDeliveryView.
interface IFormDeliveryView {
	payment: TPayment; // Метод оплаты
	address: string; // Адрес доставки
}

// Класс FormContactsView Валидируемой формы, которая содержит 2 обязательных поля: контактная почта и номер телефона. Имплементирует интерфейс IFormContactsView.
interface IFormContactsView {
	email: string; // Email адрес
	phone: string; // Контактный телефон
}

// Класс SuccessfulOrderView модального окна с информацией о успешном оформлении заказа. Отображает списанную сумму. При закрытии данного модального окна происходит очистка корзины. 
// Имплементирует интерфейс ISuccessfulOrderView.
interface ISuccessfulOrderView {
	totalAmount: number; // Итоговая сумма заказа
}
```

## Слой Presenter 

```TypeScript 
// Класс Events помогает раболтать с такиим событями как: подписка на событие, отправление данных, генерациях новых событий с  контекстом. Имплементирует интерфейс IEvents.
export interface IEvents {
    on<T extends object>(event: EventName, callback: (data: T) => void): void;
    emit<T extends object>(event: string, data?: T): void;
    trigger<T extends object>(event: string, context?: Partial<T>): (data: T) => void;
}

export class EventEmitter implements IEvents {
    _events: Map<EventName, Set<Subscriber>>;

    constructor() {
        this._events = new Map<EventName, Set<Subscriber>>();
    }

    /**
     * Установить обработчик на событие
     */
    on<T extends object>(eventName: EventName, callback: (event: T) => void) {
        if (!this._events.has(eventName)) {
            this._events.set(eventName, new Set<Subscriber>());
        }
        this._events.get(eventName)?.add(callback);
    }

    /**
     * Снять обработчик с события
     */
    off(eventName: EventName, callback: Subscriber) {
        if (this._events.has(eventName)) {
            this._events.get(eventName)!.delete(callback);
            if (this._events.get(eventName)?.size === 0) {
                this._events.delete(eventName);
            }
        }
    }

    /**
     * Инициировать событие с данными
     */
    emit<T extends object>(eventName: string, data?: T) {
        this._events.forEach((subscribers, name) => {
            if (name === '*') subscribers.forEach(callback => callback({
                eventName,
                data
            }));
            if (name instanceof RegExp && name.test(eventName) || name === eventName) {
                subscribers.forEach(callback => callback(data));
            }
        });
    }

    /**
     * Слушать все события
     */
    onAll(callback: (event: EmitterEvent) => void) {
        this.on("*", callback);
    }

    /**
     * Сбросить все обработчики
     */
    offAll() {
        this._events = new Map<string, Set<Subscriber>>();
    }

    /**
     * Сделать коллбек триггер, генерирующий событие при вызове
     */
    trigger<T extends object>(eventName: string, context?: Partial<T>) {
        return (event: object = {}) => {
            this.emit(eventName, {
                ...(event || {}),
                ...(context || {})
            });
        };
    }
}

// Класс ApiClient для работы с апи, позволяет получить список продуктов, продукт по ID, создать сущносость заказа. Имплементирует интерфейс IApiClient.
interface IApiClient {
    getProducts(): Promise<IProductItem[]>; // Получить список продуктов
    getProduct(id: string): Promise<IProductItem>; // Получить информацию о продукте по его идентификатору
    createOrder(order: iOrder): Promise<ICreatedOrderResponse>; // Создать новый заказ
}
```

## Архитектура проекта
Проект "Веб-ларек" следует архитектурному паттерну MVP (Model View Presenter), который включает несколько ключевых компонентов для обеспечения модульности, переиспользуемости и легкости сопровождения.
Взаимодействия внутри приложения происходят через события. Модели инициализируют события, слушатели событий в основном коде выполняют передачу данных компонентам отображения, а также вычислениями между этой передачей, и еще они меняют значения в моделях.
 

### Основные части проекта:
### 1. Слой Model:
	Содержит интерфейсы данных для продуктов, заказов и корзины.
* __IProductItem__: Описывает атрибуты продукта.
* __IProductList__: Содержит массив продуктов.
* __IOrder__: Определяет структуру заказа.
* __ICartItem__: Представляет продукт в корзине.
* __ICart__: Управляет содержимым корзины и вычисляет итоговую стоимость.

### 2. Слой View:
	Определяет интерфейсы представлений для отображения данных и взаимодействия с пользователем.
* __IPageView__: Содержит элементы для отображения главной страницы, такие как счетчик корзины и список продуктов.
* __ICardView__: Описывает структуру отдельного продукта на карточке.
* __ICartView__: Представляет содержимое корзины.
* __IFormView__: Отвечает за валидацию форм.
* __IModalView__: Управляет модальными окнами.

### 3. Слой Presenter:
	Обеспечивает управление бизнес-логикой и взаимодействием между моделью, представлениями и API.
* __IEvents__ предоставляет механизмы для обработки событий.
* __IApiClient__ определяет интерфейс для работы с внешним API, таким как получение продуктов и создание заказов.

### Взаимодействие между частями проекта:
### Модульность:

* Компоненты представления используются для отображения данных и обработки пользовательского ввода.
* Презентеры и контроллеры управляют бизнес-логикой и взаимодействием с моделью данных и API.

### Обмен данными:

* Данные о продуктах и заказах передаются между моделью, представлениями и контроллерами через определенные интерфейсы и методы.

### Пример процесса в приложении:
* Взаимодействие с пользователем осуществляется через представления, которые обновляются при изменении данных в модели.
* Событийная модель (IEvents) используется для управления событиями и уведомлений между компонентами.

### Основные типы и интерфейсы:

* __IProductItem__, __IProductList__, __IOrder__, __ICartItem__, __ICart__: модели данных для продуктов, заказов и корзины.
* __IPageView__, __ICardView__, __ICartView__, __IFormView__, __IModalView__: __интерфейсы__ представлений для отображения информации и взаимодействия с пользователем.
* __IEvents__, __IApiClient__: интерфейсы для управления событиями и взаимодействия с внешним API.

