import AbstractView from './abstract-view.js';

export default class SmartView extends AbstractView {
  #trip = null;

  constructor(trip) {
    super();
    this.#trip = trip;
  }

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
    this.#trip = {...this.#trip, ...update};

    this.updateElement();
  }

  restoreHandlers = () => {
    throw new Error('Abstract method not implemented: restoreHandlers');
  }
}
