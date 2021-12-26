import dayjs from 'dayjs';
import AbstractView from './abstract-view.js';

const createTripInfoMainTemplate = (trips = []) => {
  if (trips.length === 0) {
    return '';
  }
  return `<div class="trip-info__main">
<h1 class="trip-info__title">${trips[0].destinationCity} — ${trips[1].destinationCity} — ${trips[trips.length-1].destinationCity}</h1>

<p class="trip-info__dates">${dayjs(trips[0].startDate).format('D MMM')}&nbsp;—&nbsp;${dayjs(trips[0].endDate).format('D')}</p>
</div>`;
};

export default class InfoMain extends AbstractView {
  #trips = null;

  constructor(trips) {
    super();
    this.#trips = trips;
  }

  get template() {
    return createTripInfoMainTemplate(this.#trips);
  }
}
