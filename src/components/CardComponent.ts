import { IAction , IProductItem } from '../types/index';
import { Component } from './base/component';
import { ensureElement } from '../utils/utils';
import { CDN_URL } from '../utils/constants';


export class CardComponent extends Component<IProductItem> {
	protected _id: HTMLElement;
    protected _description?: HTMLElement;
    protected _image?: HTMLImageElement;
	protected _title: HTMLElement;
    protected _category?: HTMLElement;
	protected _price: HTMLElement;

    _button: HTMLButtonElement;

	protected _categoryColor = new Map<string, string>([
		['софт-скил', '_soft'],
		['другое', '_other'],
		['дополнительное', '_additional'],
		['кнопка', '_button'],
		['хард-скил', '_hard'],
	]);

	constructor(container: HTMLElement, productData: IProductItem, action?: IAction) {
		super(container); 

		this._title = ensureElement<HTMLElement>('.card__title', container);
		this.setText(this._title, productData.title)
		this._price = ensureElement<HTMLElement>('.card__price', container);
		if (productData.price === null) {
			this.setText(this._price, `Бесценно`)
			if (this._button) {
				this.setText(this._button, `Нельзя купить`)
				this.setDisabled(this._button, true)
			}
		} else {
			this.setText(this._price, `${productData.price} синапсов`);
		}

		this._category = container.querySelector(`.card__category`);
		if(container.querySelector(`.card__category`) !== null) {
			this.setText(this._category, productData.category)
			this._category?.classList?.add(`card__category${this._categoryColor.get(productData.category)}`);
		}

		this._image = container.querySelector(`.card__image`);
		if(container.querySelector(`.card__image`) !== null) {
			this.setImage(this._image, CDN_URL + productData.image)
		}
		this._description = container.querySelector(`.card__description`);
		if(container.querySelector(`.card__description`) !== null) {
			this.setText(this._description, productData.description)
		}
		this._button = container.querySelector(`.card__button`);


		if (action?.onClick) {
			if (this._button) {
				this._button.addEventListener('click', action.onClick);
			} else {
				container.addEventListener('click', action.onClick);
			}
		}
	}

	set id(value: string) {
		this.container.dataset.id = value;
	}
	get id() {
		return this.container.dataset.id;
	}
	set title(value: string) {
		this.setText(this._title, value);
	}

	get title() {
		return this._title.textContent;
	}

	set price(value: string | null) {
		if (value === null) {
			this.setText(this._price, `Бесценно`)
			if (this._button) {
				this.setText(this._button, `Нельзя купить`)
				this.setDisabled(this._button, true)
			}
		} else {
			this.setText(this._price, `${value} синапсов`);
		}
	}

	markAsSelected() {
		this.setText(this._button, 'Уже в корзине');
	}

	get price() {
		return this._price.textContent;
	}
	set image(value: string) {
		this.setImage(this._image, value, this.title);
	}


	set category(value: string) {
		this._category?.classList?.remove('card__category_soft');
		this._category?.classList?.remove('card__category_other');
		this._category?.classList?.add(`card__category${this._categoryColor.get(value)}`);


		// if(value === 'софт-скилл') {
		// 	this.toggleClass(this._category, 'card__category_soft', true)
		// }
		// if(value === 'другое') {
		// 	this.toggleClass(this._category, 'card__category_other', true)
		// }

	}

	// this.setText(this._category, value);
	// this._category?.classList?.remove('card__category_soft');
	// this._category?.classList?.remove('card__category_other');
	// this._category?.classList?.add(
	// 	`card__category${this._categoryColor.get(value)}`
	// );
	// this._category.classList.add(`card__category${categoryClass}`);

	get category() {
		return this._category.textContent;
	}

	set description(value: string) {
		this.setText(this._description, value);
	}

	set button(value: string) {
		this.setText(this._button, value);
	}

}