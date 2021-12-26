import {createElement} from '../render.js';

const createNoDataTemplate = ()=>('<p class="trip-events__msg">Click New Event to create your first point</p>');

export default class NoData {
  #element = null;

  get element() {
    if (!this.#element) {
      this.#element = createElement(this.template);
    }

    return this.#element;
  }

  get template() {
    return createNoDataTemplate();
  }

  removeElement() {
    this.#element = null;
  }
}
