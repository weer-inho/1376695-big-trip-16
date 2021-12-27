import {createElement} from '../render.js';

export default class AbstractView {
  #element = null;
  _callback = {};

  constructor() {
    if (new.target === AbstractView) {
      throw new Error('Can\'t instant AbstractClass, only concrete one');
    }
  }

  get element() {
    if (!this.#element) {
      this.#element = createElement(this.template);
    }

    return this.#element;
  }

  get template() {
    throw new Error('AbstractClass not implemented, create your own');
  }

  removeElement() {
    this.#element = null;
  }
}
