import { Form } from '../common/form';
import { FormErrors, IFormAddressContent } from '../../types';
import { IEvents } from '../base/events';
import { paymentMethods, settings } from '../../utils/constants';

export class FormAddressComponent extends Form{
	protected _onlineMethodButton: HTMLButtonElement;
	protected _cashMethodButton: HTMLButtonElement;
	protected _addressInput: HTMLInputElement;
	protected _formErrors: FormErrors<IFormAddressContent> = {};
	protected _paymentMethod: string;
	constructor(container: HTMLFormElement, events: IEvents ) {
		super(container, events);
		this._addressInput = this.container.elements.namedItem('address') as HTMLInputElement;

		this._onlineMethodButton = this.container.elements.namedItem(paymentMethods.online) as HTMLButtonElement;

		this._cashMethodButton = this.container.elements.namedItem(paymentMethods.offline) as HTMLButtonElement;

		if (this._onlineMethodButton) {
			this._onlineMethodButton.addEventListener('click', () => {
				events.emit(settings.events.addressDataChanged, {
					field: 'payment',
					value: paymentMethods.online,
				});
			});
		}

		if (this._cashMethodButton) {
			this._cashMethodButton.addEventListener('click', () => {
				events.emit(settings.events.addressDataChanged, {
					field: 'payment',
					value: paymentMethods.offline,
				});
			});
		}
		this._addressInput.addEventListener('input', () => {
			events.emit(settings.events.addressDataChanged, {
				field: 'address',
				value: this.address
			})
		})
		this.container.addEventListener('submit', (evt) => {
            evt.preventDefault();
            if (this.validate()) {
                events.emit(settings.events.addressFormSubmitted);
            }
        });
    }

	set address(value: string) {
		this._addressInput.value = value;
		this.validate();
	}

	get address() {
		return this._addressInput.value;
	}

	set payment(value: string | null) {
		if (value === '' || null) {
			this.toggleCard(false)
			this.toggleCash(false)
		}
		if (value === paymentMethods.online) {
			this.toggleCard()
			this.toggleCash(false)
		}
		if (value === paymentMethods.offline) {
			this.toggleCard(false)
			this.toggleCash()
		}
		this._paymentMethod = value;
		this.validate();
	}

	toggleCard(state: boolean = true) {
        this.toggleClass(this._onlineMethodButton, 'button_alt-active', state);
    }

    toggleCash(state: boolean = true) {
        this.toggleClass(this._cashMethodButton, 'button_alt-active', state);
    } 

	validate() {
		const errors: typeof this._formErrors = {};
		if (!this._paymentMethod) {
			errors.payment = 'Выберите способ оплаты';
		}
		if (!this.address) {
			errors.address = 'Укажите адрес';
		}

		this._formErrors = errors;
		this.events.emit(settings.events.addressErrorsChanged, this._formErrors);
		return Object.keys(errors).length === 0;
	}

	reset() {
		this.payment = null;
		this.toggleCash(false)
        this.toggleCard(false)
		this.address = null;
	}
}