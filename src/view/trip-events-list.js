import {createElement} from '../render.js';

const createTripList = () => (
  '<ul class="trip-events__list"><ul>'
);

export default class TripList {
  #element = null;

  get element() {
    if (!this.#element) {
      this.#element = createElement(this.template);
    }

    return this.#element;
  }

  get template() {
    return createTripList();
  }

  removeElement() {
    this.#element = null;
  }
}