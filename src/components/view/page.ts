import { IPageView } from '../../types/index';
import { Component } from '../base/component';
import { IEvents } from '../base/events';
import { ensureElement } from '../../utils/utils';
import { settings } from '../../utils/constants';


export class PageComponent extends Component<IPageView> {
	protected _cardList: HTMLElement;
	protected _cart: HTMLButtonElement;
	protected _counter: HTMLElement;
	protected _pageWrapper: HTMLElement;

	constructor(container: HTMLElement, protected events: IEvents) {
		super(container);

		this._counter = ensureElement<HTMLElement>('.header__basket-counter')
		this._cardList = ensureElement<HTMLElement>('.gallery');
		this._cart = ensureElement<HTMLButtonElement>('.header__basket');
		this._pageWrapper = ensureElement<HTMLElement>('.page__wrapper');

		this._cart.addEventListener('click', () => {
			this.events.emit(settings.events.cartOpen)
		})

		// обработчик клика для открытия модального окна с товаром

		this.container.addEventListener('click', (evt) => {
			const target = evt.target as HTMLElement;
			if (target) {
				if (target.classList.contains('card')) {	
					this.events.emit(settings.events.cardSelected, target);
				} else {
					const card = target.closest('.card');
					if (card) {
						this.events.emit(settings.events.cardSelected, card);
					}
				}
			}
		});
	}

	set counter(value: number) {
		this.setText(this._counter, String(value));
	}

	set productList(items: HTMLElement[]) {
		this._cardList.replaceChildren(...items);
	}

	set locked(value: boolean) {
		if (value === true) {
			this._pageWrapper.classList.add('page__wrapper_locked');
		} else {
			this._pageWrapper.classList.remove('page__wrapper_locked');
		}
	}

	renderHeaderBasketCounter(value: number) {
		this.setText(this._counter, String(value))
      }
}