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

## Типы данных
```ts
/*
* Интерфейс для данных о продукте
*  */
interface Product {
    title: string;
    description: string;
    imageLink: string;
    price?: number;
    type: ProductType;
    id: string;
}

/*
* Интерфейс для данных о заказе
*  */
interface Order {
    productIds: string[];
    paymentMethod: PaymentMethod;
    destinationAddress: string;
    email: string;
    phoneNumber: string;
    total: number;
}

/*
* Интерфейс для данных из корзины
*  */
interface BasketData {
	totalPrice: number;
	orderIds: string[];
}

/*
* Интерфейс для данных о способе оплаты и доставки
*  */
interface OrderOptions {
	paymentMethod: "Онлайн" | "При получении";
	address: string;
}

/*
* Интерфейс для данных контакта с покупателем
*  */
interface OrderContacts {
	email: string;
	phone: string;
}

`/*
* Интерфейс для работы с корзиной
*  */`
interface Basket {
	Delete(id: string) :void;
	Add(id: Product) :void;
	Clear() :void;
	List() :Product[];
	GetTotalCount() : number;
	GetTotalPrice() : number;
}
```
# Представление
```ts
/*
* Интерфейс для страницы корзины
*  */
interface BasketView {
    list: HTMLUListElement;
    totalPrice: HTMLSpanElement;
}

/*
* Интерфейс для страницы с продуктами
*  */
interface ProductsView {
    list: HTMLUListElement;
    basketCounter: HTMLSpanElement;
}

/*
* Абстрактный компонент
*  */
abstract class Component<T> {
    protected abstract Hide(element: HTMLElement): void;
    protected abstract Show(element: HTMLElement): void;
    protected abstract SetText(element: HTMLElement, value: string): void;
    abstract SwitchEnableState(element: HTMLElement, state: boolean): void;
    protected abstract SetImage(el: HTMLImageElement, src: string, alt?: string): void;
    abstract Render(data?: Partial<T>): HTMLElement;
  }

/*
* Компонент для рендера карточки товара
*  */
class ProductsComponent extends Component<ProductsView> {
	protected Hide(element: HTMLElement): void {
		throw new Error("Method not implemented.");
	}
	protected Show(element: HTMLElement): void {
		throw new Error("Method not implemented.");
	}
	protected SetText(element: HTMLElement, value: string): void {
		throw new Error("Method not implemented.");
	}
	SwitchEnableState(element: HTMLElement, state: boolean): void {
		throw new Error("Method not implemented.");
	}
	protected SetImage(el: HTMLImageElement, src: string, alt?: string): void {
		throw new Error("Method not implemented.");
	}
	Render(data?: Partial<Page>): HTMLElement {
		throw new Error("Method not implemented.");
	}
}

/*
* Компонент для рендера корзины
*  */
class BasketComponent extends Component<Basket> {
	protected Hide(element: HTMLElement): void {
		throw new Error("Method not implemented.");
	}
	protected Show(element: HTMLElement): void {
		throw new Error("Method not implemented.");
	}
	protected SetText(element: HTMLElement, value: string): void {
		throw new Error("Method not implemented.");
	}
	SwitchEnableState(element: HTMLElement, state: boolean): void {
		throw new Error("Method not implemented.");
	}
	protected SetImage(el: HTMLImageElement, src: string, alt?: string): void {
		throw new Error("Method not implemented.");
	}
	Render(data?: Partial<Basket>): HTMLElement {
		throw new Error("Method not implemented.");
	}
}

/*
* Компонент для рендера заказа
*  */
class OrderComponent extends Component<Order> {
	protected Hide(element: HTMLElement): void {
		throw new Error("Method not implemented.");
	}
	protected Show(element: HTMLElement): void {
		throw new Error("Method not implemented.");
	}
	protected SetText(element: HTMLElement, value: string): void {
		throw new Error("Method not implemented.");
	}
	SwitchEnableState(element: HTMLElement, state: boolean): void {
		throw new Error("Method not implemented.");
	}
	protected SetImage(el: HTMLImageElement, src: string, alt?: string): void {
		throw new Error("Method not implemented.");
	}
	Render(data?: Partial<Order>): HTMLElement {
		throw new Error("Method not implemented.");
	}
}
/*
* Компонент для рендера карточки товара
*  */
class CardComponent extends Component<Product> {
	protected Hide(element: HTMLElement): void {
		throw new Error("Method not implemented.");
	}
	protected Show(element: HTMLElement): void {
		throw new Error("Method not implemented.");
	}
	protected SetText(element: HTMLElement, value: string): void {
		throw new Error("Method not implemented.");
	}
	SwitchEnableState(element: HTMLElement, state: boolean): void {
		throw new Error("Method not implemented.");
	}
	protected SetImage(el: HTMLImageElement, src: string, alt?: string): void {
		throw new Error("Method not implemented.");
	}
	Render(data?: Partial<Product>): HTMLElement {
		throw new Error("Method not implemented.");
	}
}

```

# Дополнительные интерфейсы
```ts
/*
* Интерфейс для репозитория продуктов
*  */
interface ProductRepository {
    GetProducts() :Promise <Product[]>;
    GetById(id: string) :Promise<Product>;
}

/*
* Интерфейс для репозитория заказов
*  */
interface OrderRepository {
    Add(order: Order) :string
}
```
