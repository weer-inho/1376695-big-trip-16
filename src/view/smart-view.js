import AbstractView from './abstract-view.js';

export default class SmartView extends AbstractView {
  #buffer = {};

  constructor(trip) {
    super();
    this.#buffer = trip;
  }

  getData = () => this.#buffer;

  updateElement = () => {
    const prevElement = this.element;
    const parent = prevElement.parentElement;
    this.removeElement();

    const newElement = this.element;

    parent.replaceChild(newElement, prevElement);

    this.restoreHandlers();
  }

  updateData = (update) => {
    if (!update) {
      return;
    }
    this.#buffer = {...this.#buffer, ...update};

    this.updateElement();
  }

  restoreHandlers = () => {
    throw new Error('Abstract method not implemented: restoreHandlers');
  }
}
