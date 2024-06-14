type ProductType = "софт-скил" | "другое";
type PaymentMethod = "online" | "offline";

interface Product {
    title: string;
    description: string;
    imageLink: string;
    price?: number;
    type: ProductType;
    id: string;
}

interface Order {
    productIds: string[];
    paymentMethod: PaymentMethod;
    destinationAddress: string;
    email: string;
    phoneNumber: string;
    total: number;
}

interface ProductRepository {
    GetProducts() :Promise <Product[]>;
    GetById(id: string) :Promise<Product>;
}

interface OrderRepository {
    Add(order: Order) :string
}

interface BasketData {
    totalPrice: number;
    orderIds: string[];
}

interface OrderOptions {
    paymentMethod: "Онлайн" | "При получении";
    address: string;
}

interface OrderContacts {
    email: string;
    phone: string;
}

interface Basket {
    Delete(id: string) :void;
    Add(id: Product) :void;
    Clear() :void;
    List() :Product[];
    GetTotalCount() : number;
    GetTotalPrice() : number;
}

interface BasketView {
    list: HTMLUListElement;
    totalPrice: HTMLSpanElement;
}

interface Page {
    list: HTMLUListElement;
    basketCounter: HTMLSpanElement;
}

abstract class Component<T> {
    protected abstract SetHide(element: HTMLElement): void;\
    protected abstract SetShow(element: HTMLElement): void;
    protected abstract SetText(element: HTMLElement, value: string): void;
    abstract SwitchEnableState(element: HTMLElement, state: boolean): void;
    protected abstract SetImage(el: HTMLImageElement, src: string, alt?: string): void;
    abstract render(data?: Partial<T>): HTMLElement;
  }
  
 class PageComponent extends Component<Page> {
     protected SetHide(element: HTMLElement): void {
         throw new Error("Method not implemented.");
     }
     protected SetShow(element: HTMLElement): void {
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
     render(data?: Partial<Page>): HTMLElement {
         throw new Error("Method not implemented.");
     }
 }

 class BasketComponent extends Component<Basket> {
     protected SetHide(element: HTMLElement): void {
         throw new Error("Method not implemented.");
     }
     protected SetShow(element: HTMLElement): void {
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
     render(data?: Partial<Basket>): HTMLElement {
         throw new Error("Method not implemented.");
     }
 }

 class OrderComponent extends Component<Order> {
     protected SetHide(element: HTMLElement): void {
         throw new Error("Method not implemented.");
     }
     protected SetShow(element: HTMLElement): void {
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
     render(data?: Partial<Order>): HTMLElement {
         throw new Error("Method not implemented.");
     }
 }

 class CardComponent extends Component<Product> {
     protected SetHide(element: HTMLElement): void {
         throw new Error("Method not implemented.");
     }
     protected SetShow(element: HTMLElement): void {
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
     render(data?: Partial<Product>): HTMLElement {
         throw new Error("Method not implemented.");
     }
 }






