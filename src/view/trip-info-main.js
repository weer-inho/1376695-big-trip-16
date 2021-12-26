import dayjs from 'dayjs';
import {createElement} from '../render.js';

const createTripInfoMainTemplate = (trips = []) => {
  if (trips.length === 0) {
    return '';
  }
  return `<div class="trip-info__main">
<h1 class="trip-info__title">${trips[0].destinationCity} — ${trips[1].destinationCity} — ${trips[trips.length-1].destinationCity}</h1>

<p class="trip-info__dates">${dayjs(trips[0].startDate).format('D MMM')}&nbsp;—&nbsp;${dayjs(trips[0].endDate).format('D')}</p>
</div>`;
};

export default class InfoMain {
  #element = null;
  #trips = null;

  constructor(trips) {
    this.#trips = trips;
  }

  get element() {
    if (!this.#element) {
      this.#element = createElement(this.template);
    }

    return this.#element;
  }

  get template() {
    return createTripInfoMainTemplate(this.#trips);
  }

  removeElement() {
    this.#element = null;
  }
}
