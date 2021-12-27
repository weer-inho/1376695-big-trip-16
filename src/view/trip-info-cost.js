import AbstractView from './abstract-view.js';

const createTripCostTemplate = (cost = 0) => {
  if (cost === 0) {
    return '';
  }
  return `<p class="trip-info__cost">
Total: €&nbsp;<span class="trip-info__cost-value">${cost}</span>
</p>`;
};

export default class TripCost extends AbstractView {
  #cost = null;

  constructor(cost) {
    super();
    this.#cost = cost;
  }

  get template() {
    return createTripCostTemplate(this.#cost);
  }
}
