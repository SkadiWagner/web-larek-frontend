import { Component } from '../base/component';
import { IModalContent, IModalView } from '../../types/index';
import { IEvents } from '../base/events';
import { ensureElement } from '../../utils/utils';
import { settings } from '../../utils/constants';

export class Modal extends Component<IModalContent> {
	closeButton: HTMLButtonElement;
	_content: HTMLElement;


	constructor(container: HTMLElement, protected events: IEvents) {
		super(container);

		this.closeButton = ensureElement<HTMLButtonElement>(
			'.modal__close',
			container
		);
		this._content = ensureElement<HTMLElement>('.modal__content', container);
		this.closeButton.addEventListener('click', this.close.bind(this));
		this.container.addEventListener('click', this.close.bind(this));
		this._content.addEventListener('click', (event) => event.stopPropagation());

	}

	set content(value: HTMLElement) {
		this._content.replaceChildren(value);
	}

	_toggleModal(state: boolean = true) {
        this.toggleClass(this.container, 'modal_active', state);
    }

	_handleEscape = (evt: KeyboardEvent) => {
        if (evt.key === 'Escape') {
            this.close();
        }
    };


	open() {
		this.container.classList.add('modal_active');
		this.events.emit(settings.events.modalOpen, this._content);
	}

	close() {
		this.container.classList.remove('modal_active');
		this.content = null;
		this.events.emit(settings.events.modalClose);
	}

	render(data: IModalContent): HTMLElement {
		super.render(data);
		this.open();
		return this.container;
	}
}