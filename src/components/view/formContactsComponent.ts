import { Form } from '../common/form';
import { settings } from '../../utils/constants';
import { FormErrors, IFormContactsContent } from '../../types';
import { IEvents } from '../base/events';

export class FormContactsComponent extends Form {
	protected _phoneInput: HTMLInputElement;
	protected _emailInput: HTMLInputElement;
	protected _formErrors: FormErrors<IFormContactsContent> = {};
	constructor(container: HTMLFormElement, events: IEvents ) {
		super(container, events);
		this._phoneInput = this.container.elements.namedItem('phone') as HTMLInputElement;
		this._emailInput = this.container.elements.namedItem('email') as HTMLInputElement;
		this._emailInput.addEventListener('input', () => {
			events.emit(settings.events.contactsDataChanged, {
				field: 'email',
				value: this.email
			})
		});
		this._phoneInput.addEventListener('input', () => {
			events.emit(settings.events.contactsDataChanged, {
				field: 'phone',
				value: this.phone
			})
		})

		this.container.addEventListener('submit', (evt) => {
            evt.preventDefault();
            if (this.validate()) {
                events.emit(settings.events.contactsFormSubmitted)
            }
        });	

	}
	set email(value: string) {
		this._emailInput.value = value;
		this.validate();
	}

	get email() : string {
		return this._emailInput.value;
	}

	set phone(value: string){
		this._phoneInput.value = value;
		this.validate();
	}

	get phone() : string {
		return this._phoneInput.value;
	}

	validate() {
		const errors: typeof this._formErrors = {};
		const phoneValidationRegexp = /^\+?(\d{1,3})?[- .]?\(?(?:\d{2,3})\)?[- .]?\d\d\d[- .]?\d\d\d\d$/;
		const emailValidationRegexp = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
		if (!this.phone) {
			errors.phone = 'Укажите номер';
		}
		else if (!phoneValidationRegexp.test(this.phone)) {
			errors.phone = 'Укажите правильный номер'
		}
		if (!this.email) {
			errors.email = 'Укажите email';
		}
		else if (!emailValidationRegexp.test(this.email)){
			errors.email = 'Укажите правильный email'
		}

		this._formErrors = errors;
		this.events.emit(settings.events.contactsErrorsChanged, this._formErrors);
		return Object.keys(errors).length === 0;
	}

	reset(){
		this.email = null;
		this.phone = null;
	}
}