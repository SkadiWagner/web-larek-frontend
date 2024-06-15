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
- src/styles/styles.scss — корневой файл стилей
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

## Слой Model

```TypeScript 

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
```

## Слой View
```TypeScript 
// Абстрактный компонент

abstract class IComponent<T> {
    protected abstract Hide(element: HTMLElement): void; // Скрывает указанный элемент интерфейса.
    protected abstract Show(element: HTMLElement): void; // Отображает указанный элемент интерфейса.
    protected abstract SetText(element: HTMLElement, value: string): void; //  Устанавливает текстовое содержимое элемента.
    abstract SwitchEnableState(element: HTMLElement, state: boolean): void; // Изменяет доступность элемента. 
    protected abstract SetImage(el: HTMLImageElement, src: string, alt?: string): void;  // Устанавливает изображение элементу.
    abstract Render(data?: Partial<T>): HTMLElement; // Абстрактный метод для отрисовки компонента на основе данных типа T.
  }


 // Главная страничка
interface IPageView {
	cartCounter: number; // Счетчик товаров в корзине
	productList: HTMLElement[]; // Список продуктов на странице
} 

// Продукт
interface ICardView {
	title: HTMLHeadingElement; // Заголовок продукта
	price: HTMLSpanElement; // Цена продукта 
	category?: HTMLSpanElement; // Категория продукта (необязательно)
	button?: HTMLButtonElement; // Кнопка (необязательно)
    description?: HTMLParagraphElement; // Описание продукта (необязательно)
    image?: HTMLImageElement; // Изображение продукта (необязательно)
}

// Корзина
interface ICartView {
	productList: HTMLElement[]; // Список продуктов в корзине
	totalPrice: number; // Итоговая стоимость корзины
} 

// Форма
interface IFormView {
	isValid: boolean; // проверка валидности формы
}

// Модальное окно
interface IModalView extends IComponent<IModalContent> {
	open(): void; // метод открытия модального окна
    close(): void; // метод закрытия модального окна
}

// контент модального окна
interface IModalContent {
    content: HTMLElement; // Содержимое модального окна
}

// Модальное окно с методом оплаты и адресом 
interface IFormDeliveryView {
	payment: TPayment; // Метод оплаты
	address: string; // Адрес доставки
}

// Модальное окно с контактными данными
interface IFormContactsView {
	email: string; // Email адрес
	phone: string; // Контактный телефон
}

// Модальное окно с успешным оформлением заказа
interface ISuccessfulOrderView {
	totalAmount: number; // Итоговая сумма заказа
}
```

## Слой Presenter 

```TypeScript 
// Презентер  событий
interface IEvents {
    on<T>(event: string, callback: (data: T) => void): void; // Подписаться на событие
    emit<T>(event: string, data?: T): void; // Отправить событие с данными
    trigger<T>(event: string, context?: Partial<T>): (data: T) => void; // Сгенерировать событие с контекстом
}

// Интерфейс для работы с API
interface IApiClient {
    getProducts(): Promise<IProductItem[]>; // Получить список продуктов
    getProduct(id: string): Promise<IProductItem>; // Получить информацию о продукте по его идентификатору
    createOrder(order: iOrder): Promise<ICreatedOrderResponse>; // Создать новый заказ
}
```

## Архитектура проекта
Проект "Веб-ларек" следует архитектурному подходу, который включает несколько ключевых компонентов для обеспечения модульности, переиспользуемости и легкости сопровождения.

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

