// import { Component } from '../base/Component';
// import { IModal } from '../../types/myTypes';
// import { IEvents } from '../base/Events';
// import { ensureElement } from '../../utils/utils';

// export class Modal extends Component<IModalData> implements IModalView {
// 	protected _closeButton: HTMLButtonElement;
// 	protected _content: HTMLElement;

// 	constructor(container: HTMLElement, protected events: IEvents) {
// 		super(container);

// 		this._closeButton = ensureElement<HTMLButtonElement>(
// 			'.modal__close',
// 			container
// 		);
// 		this._content = ensureElement<HTMLElement>('.modal__content', container);

// 		this._closeButton.addEventListener('click', this.close.bind(this));
// 		this.container.addEventListener('click', this.close.bind(this));
// 		this._content.addEventListener('click', (event) => event.stopPropagation());
// 	}

// 	set content(value: HTMLElement) {
// 		this._content.replaceChildren(value);
// 	}

// 	open() {
// 		this.toggleClass(this.container, 'modal_active', true);
// 		this.events.emit('modal:open', this._content);
// 	}

// 	close() {
// 		this.toggleClass(this.container, 'modal_active', false);
// 		this.content = null;
// 		this.events.emit('modal:close');
// 	}

// 	render(data: IModalData): HTMLElement {
// 		super.render(data);
// 		this.open();
// 		return this.container;
// 	}
// }