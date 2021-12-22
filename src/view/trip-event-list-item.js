import dayjs from 'dayjs';
import {createElement} from '../render.js';
import {getDuration} from '../mock/trip.js';

const createListItemTemplate = (trip = {}) => {
  const {destinationCity, typePoint, offers, startDate, endDate, isFavorite, price} = trip;

  return `<li class="trip-events__item">
    <div class="event">
      <time class="event__date" datetime="${dayjs(startDate).format('YYYY-MM-D')}">${dayjs(startDate).format('D MMM')}</time>
      <div class="event__type">
        <img class="event__type-icon" width="42" height="42" src="img/icons/${typePoint.toLowerCase()}.png" alt="Event type icon">
      </div>
      <h3 class="event__title">${typePoint} ${destinationCity}</h3>
      <div class="event__schedule">
        <p class="event__time">
          <time class="event__start-time" datetime="${dayjs(startDate).format('YYYY-MM-DTHH:mm')}">${dayjs(startDate).format('HH:mm')}</time>
          &mdash;
          <time class="event__end-time" datetime="${dayjs(endDate).format('YYYY-MM-DTHH:mm')}">${dayjs(endDate).format('HH:mm')}</time>
        </p>
        <p class="event__duration">${getDuration(startDate, endDate)}</p>
      </div>
      <p class="event__price">
        &euro;&nbsp;<span class="event__price-value">${price}</span>
      </p>
      <h4 class="visually-hidden">Offers:</h4>
      <ul class="event__selected-offers">
        <li class="event__offer">
          <span class="event__offer-title">${offers.length === 0 ? '' : offers[0].title}</span>
          &plus;&euro;&nbsp;
          <span class="event__offer-price">${offers.length === 0 ? '' : offers[0].price }</span>
        </li>
      </ul>
      <button class="event__favorite-btn ${isFavorite ? 'event__favorite-btn--active' : ''}" type="button">
        <span class="visually-hidden">Add to favorite</span>
        <svg class="event__favorite-icon" width="28" height="28" viewBox="0 0 28 28">
          <path d="M14 21l-8.22899 4.3262 1.57159-9.1631L.685209 9.67376 9.8855 8.33688 14 0l4.1145 8.33688 9.2003 1.33688-6.6574 6.48934 1.5716 9.1631L14 21z"/>
        </svg>
      </button>
      <button class="event__rollup-btn" type="button">
        <span class="visually-hidden">Open event</span>
      </button>
    </div>
  </li>`;
};

export default class TripEventsItem {
  #element = null;
  #trip = null;

  constructor(trip) {
    this.#trip = trip;
  }

  get element() {
    if (!this.#element) {
      this.#element = createElement(this.template);
    }

    return this.#element;
  }

  get template() {
    return createListItemTemplate(this.#trip);
  }

  removeElement() {
    this.#element = null;
  }
}
