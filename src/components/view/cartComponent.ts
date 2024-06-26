import { Component, ICartContent } from "../../types";
import { ensureElement } from "../../utils/utils";
import { IEvents } from "../base/events";
import { settings } from '../../utils/constants';


export class CartComponent extends Component<ICartContent> {
    protected _totalPrice: HTMLElement;
    protected _submitButton: HTMLButtonElement;

    protected _cardList: HTMLElement;

    constructor(container: HTMLElement, events: IEvents) {
        super(container)
        this._cardList = ensureElement<HTMLElement>('.basket__list', container)
        this._totalPrice = ensureElement<HTMLElement>('.basket__price', container)
        this._submitButton = ensureElement<HTMLButtonElement>('.basket__button', container)

        this._submitButton.addEventListener('click', () => {
            events.emit(settings.events.orderStarted)
        })

    }

    set cardList(cards: HTMLElement[]){
        this._cardList.replaceChildren(...cards)
        if (cards.length > 0){
            this.toggleButton(false)
        }
        else{
            this.toggleButton(true)
        }
    }

    set totalPrice(totalPrice: number){
        this.setText(this._totalPrice, `${totalPrice} синапсов`)
    }

    toggleButton(state: boolean) {
        this.setDisabled(this._submitButton, state);
    } 
}


