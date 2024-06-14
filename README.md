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

## Документация

## Модули

```TypeScript 

// Определение категорий товаров
type TCategory = "софт-скилл" | "другое" | "дополнительное" | "кнопка" | "хард-скилл";

// Определение вариантов оплаты
type TPayment = "онлайн" | "при получении";

// MODEL

// Сущность продукта
interface IProductItem {
    id: string;
    description: string;
    image: string;
    title: string;
    category: TCategory;
    price: number;
}

// Сущность списка продуктов
interface IProductList {
    items: IProductItem[];
}

// Сущность заказа
interface iOrder {
    payment: TPayment;
    email: string;
    phone: string;
    address: string;
    total: number;
    items: string[];
}

// Интерфейс товара в корзине
interface ICartItem {
    product: IProductItem;
    quantity: number;
}

// интерфейс корзины

interface ICart {
    items: ICartItem[];
    totalPrice: number;

    addProduct(product: IProductItem, quantity?: number): void;
    updateProductQuantity(productId: string, quantity: number): void;
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

// Интерфейс модального окна
interface IModalView extends IComponent<IModelViewContent> {
    openModal(): void;
    closeModal(): void;
}

// Интерфейс контента модального окна
interface IModelViewContent{
    content: HTMLElement;
}

// Интерфейс представления товара
interface IProductItemView{
    description: HTMLElement; 
    image: HTMLImageElement; 
    title: HTMLElement; 
    category: HTMLElement; 
    price: HTMLElement; 
    addButton?: HTMLButtonElement; 
}

// Интерфейс представления корзины
interface ICartView extends IModalView {
    productItemList: HTMLElement[];
    totalPrice: HTMLElement;
}

// Интерфейс формы
interface IForm<T> extends IComponent<T> {
    isValid: boolean;
}

// Данные формы доставки
interface IDeliveryFormData {
    paymentMethod: TPayment;
    address: string;
}

// Данные формы контактов
interface IContactsFormData {
    email: string;
    telephonenumber: string;
}

// Представление завершенного заказа
interface ICompletedOrder {
    totalPrice: HTMLElement;
}

// Интерфейс представления страницы
interface IPageView {
    cardList: HTMLElement[];
    cartCounter: HTMLElement;
}

// Presenter 

// Сущность ответа при создании заказа
interface ICreatedOrderResponse {
    id: string;
    total: number;
}

// Интерфейс для работы с API
interface IApiClient {
    getProducts(): Promise<IProductItem[]>;
    getProduct(id: string): Promise<IProductItem>;
    createOrder(order: iOrder): Promise<ICreatedOrderResponse>;
}

// Интерфейс событий
interface IEvents {
    on<T>(event: string, callback: (data: T) => void): void;
    emit<T>(event: string, data?: T): void;
    trigger<T>(event: string, context?: Partial<T>): (data: T) => void;
}

