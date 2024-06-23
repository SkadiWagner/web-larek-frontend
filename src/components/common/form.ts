import { IFormValidationState } from '../../types';
import { Component } from "../base/component";
import { IEvents } from "../base/events";
import { ensureElement } from "../../utils/utils";

export class Form extends Component<IFormValidationState> {
	protected _submit: HTMLButtonElement;
	protected _errors: HTMLElement;
  
	constructor(protected container: HTMLFormElement, protected events: IEvents) {
		super(container);
  
		this._submit = ensureElement<HTMLButtonElement>('button[type=submit]', this.container);
		this._errors = ensureElement<HTMLElement>('.form__errors', this.container);

	}
	set valid(value: boolean) {
		this._submit.disabled = !value;
	}
  
	set errors(value: string) {
		this.setText(this._errors, value);
	}
  
	render(state: IFormValidationState) {
		const {isValid, errors, ...inputs} = state;
		super.render({isValid, errors});
		Object.assign(this, inputs);
		return this.container;
  
	}
  }