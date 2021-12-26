import {createElement} from '../render.js';

const createTripCostTemplate = (cost = 0) => {
  if (cost === 0) {
    return '';
  }
  return `<p class="trip-info__cost">
Total: €&nbsp;<span class="trip-info__cost-value">${cost}</span>
</p>`;
};

export default class TripCost {
  #element = null;
  #cost = null;

  constructor(cost) {
    this.#cost = cost;
  }

  get element() {
    if (!this.#element) {
      this.#element = createElement(this.template);
    }

    return this.#element;
  }

  get template() {
    return createTripCostTemplate(this.#cost);
  }

  removeElement() {
    this.#element = null;
  }
}
