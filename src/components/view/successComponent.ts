import { Form } from '../common/form';
import { Component } from '../base/component';
import { IEvents } from '../base/events';
import { ensureElement } from '../../utils/utils';
import { settings } from '../../utils/constants';
import { ISuccessfulOrderContent } from '../../types';

export class SuccessComponent extends Component<ISuccessfulOrderContent>{
	protected _totalElement: HTMLElement;
	protected _submitButton: HTMLButtonElement;
	constructor(container: HTMLElement, events: IEvents) {
		super(container);
		this._totalElement = ensureElement<HTMLElement>('.order-success__description', container);
		this._submitButton = ensureElement<HTMLButtonElement>('.order-success__close', container);
		this._submitButton.addEventListener('click', (evt) => {
			evt.preventDefault()
			events.emit(settings.events.orderFinished)
		})
	}
	set total(value: number) {
		this.setText(this._totalElement, `Списано ${value} синапсов`)
	}
}