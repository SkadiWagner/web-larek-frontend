import { Component, ICartContent, IOrderModel, IProductItem } from "../../types";
import { ensureElement } from "../../utils/utils";
import { IEvents } from "../base/events";


export class CartComponent extends Component<ICartContent> {
    cartList: HTMLElement;
    product: HTMLElement;
    totalPrice: HTMLElement;
    submitButton: HTMLButtonElement;

    constructor(container: HTMLElement, events: IEvents) {
        super(container)

        this.cartList = ensureElement<HTMLElement>('.basket__list')
        this.product = ensureElement<HTMLElement>('.card_compact')
        this.totalPrice = ensureElement<HTMLElement>('.basket__price')
        // this.submitButton = ensureElement<HTMLButtonElement>('.basket__button')

        // this.submitButton.addEventListener('click', () => {
        //     // открывается форма #1
        // })

    }


}


