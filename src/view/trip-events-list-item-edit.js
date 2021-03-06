import SmartView from './smart-view.js';
import {makePicker} from '../render.js';
import {generateOffer, generatePhoto, generateDestination} from '../mock/trip.js';
import dayjs from 'dayjs';

import '../../node_modules/flatpickr/dist/flatpickr.min.css';

const createEventOffers = (offers) => (`<section class="event__section  event__section--offers">
${(offers.length === 0) ? '' : `<h3 class="event__section-title  event__section-title--offers">Offers</h3>
<div class="event__available-offers">
  ${offers.map((offer) => `<div class="event__offer-selector">
    <input class="event__offer-checkbox  visually-hidden" id="event-offer-${offer.id}" type="checkbox" name="event-offer-${offer.id}"
    ${(offer.selected) ? 'checked' : ''}>
    <label class="event__offer-label" for="event-offer-${offer.id}">
      <span class="event__offer-title">${offer.title}</span>
      &plus;&euro;&nbsp;
      <span class="event__offer-price">${offer.price}</span>
    </label>
  </div>`).join('')}
</div>`}
</section>`
);

const createEventPhotos = (photos) => (`
${photos.map((photo) => `<img class="event__photo" src="${photo}" alt="Event photo">`)}
`);

const createListItemEditTemplate = (trip) => {
  const {typePoint, offers, startDate, endDate, destination, price, photos} = trip;

  return `<li class="trip-events__item">
    <form class="event event--edit" action="#" method="post">
      <header class="event__header">
        <div class="event__type-wrapper">
          <label class="event__type  event__type-btn" for="event-type-toggle-1">
            <span class="visually-hidden">Choose event type</span>
            <img class="event__type-icon" width="17" height="17" src="img/icons/${typePoint}.png" alt="Event type icon">
          </label>
          <input class="event__type-toggle  visually-hidden" id="event-type-toggle-1" type="checkbox">
    
          <div class="event__type-list">
            <fieldset class="event__type-group">
              <legend class="visually-hidden">Event type</legend>
    
              <div class="event__type-item">
                <input id="event-type-taxi-1" class="event__type-input  visually-hidden" type="radio" name="event-type" value="taxi">
                <label class="event__type-label  event__type-label--taxi" for="event-type-taxi-1">Taxi</label>
              </div>
    
              <div class="event__type-item">
                <input id="event-type-bus-1" class="event__type-input  visually-hidden" type="radio" name="event-type" value="bus">
                <label class="event__type-label  event__type-label--bus" for="event-type-bus-1">Bus</label>
              </div>
    
              <div class="event__type-item">
                <input id="event-type-train-1" class="event__type-input  visually-hidden" type="radio" name="event-type" value="train">
                <label class="event__type-label  event__type-label--train" for="event-type-train-1">Train</label>
              </div>
    
              <div class="event__type-item">
                <input id="event-type-ship-1" class="event__type-input  visually-hidden" type="radio" name="event-type" value="ship">
                <label class="event__type-label  event__type-label--ship" for="event-type-ship-1">Ship</label>
              </div>
    
              <div class="event__type-item">
                <input id="event-type-drive-1" class="event__type-input  visually-hidden" type="radio" name="event-type" value="drive">
                <label class="event__type-label  event__type-label--drive" for="event-type-drive-1">Drive</label>
              </div>
    
              <div class="event__type-item">
                <input id="event-type-flight-1" class="event__type-input  visually-hidden" type="radio" name="event-type" value="flight" checked>
                <label class="event__type-label  event__type-label--flight" for="event-type-flight-1">Flight</label>
              </div>
    
              <div class="event__type-item">
                <input id="event-type-check-in-1" class="event__type-input  visually-hidden" type="radio" name="event-type" value="check-in">
                <label class="event__type-label  event__type-label--check-in" for="event-type-check-in-1">Check-in</label>
              </div>
    
              <div class="event__type-item">
                <input id="event-type-sightseeing-1" class="event__type-input  visually-hidden" type="radio" name="event-type" value="sightseeing">
                <label class="event__type-label  event__type-label--sightseeing" for="event-type-sightseeing-1">Sightseeing</label>
              </div>
    
              <div class="event__type-item">
                <input id="event-type-restaurant-1" class="event__type-input  visually-hidden" type="radio" name="event-type" value="restaurant">
                <label class="event__type-label  event__type-label--restaurant" for="event-type-restaurant-1">Restaurant</label>
              </div>
            </fieldset>
          </div>
        </div>
    
        <div class="event__field-group  event__field-group--destination">
          <label class="event__label  event__type-output" for="event-destination-1">
          ${typePoint}
          </label>
          <input class="event__input  event__input--destination" id="event-destination-1" type="text" name="event-destination" list="destination-list-1">
          <datalist id="destination-list-1">
            <option value="Amsterdam"></option>
            <option value="Geneva"></option>
            <option value="Chamonix"></option>
          </datalist>
        </div>
    
        <div class="event__field-group  event__field-group--time">
          <label class="visually-hidden" for="event-start-time-1">From</label>
          <input class="event__input  event__input--time" id="event-start-time-1" type="text" name="event-start-time" value="${dayjs(startDate).format('M/D/YYYY h:mm')}">
          &mdash;
          <label class="visually-hidden" for="event-end-time-1">To</label>
          <input class="event__input  event__input--time" id="event-end-time-1" type="text" name="event-end-time" value="${dayjs(endDate).format('M/D/YYYY h:mm')}">
        </div>
    
        <div class="event__field-group  event__field-group--price">
          <label class="event__label" for="event-price-1">
            <span class="visually-hidden">Price</span>
            &euro;
          </label>
          <input class="event__input  event__input--price" id="event-price-1" type="text" name="event-price" value="${price}">
        </div>
    
        <button class="event__save-btn  btn  btn--blue" type="submit">Save</button>
        <button class="event__reset-btn" type="reset">Delete</button>
        <button class="event__rollup-btn" type="button">
          <span class="visually-hidden">Open event</span>
        </button>
      </header>
      <section class="event__details">
        <section class="event__section  event__section--offers">
          ${createEventOffers(offers)}

        </section>
    
        <section class="event__section  event__section--destination">
          <h3 class="event__section-title  event__section-title--destination">Destination</h3>
          <p class="event__destination-description">${destination}</p>

          <div class="event__photos-container">
            <div class="event__photos-tape">
            ${createEventPhotos(photos)}
            </div>
        </div>
        </section>
      </section>
    </form>
    </li>`;
};

export default class TripEventsEdit extends SmartView {
  #datepicker = null;

  constructor(trip) {
    super(trip);
    this.#setInnerHandlers();
    this.#setDatepicker();
  }

  get template() {
    return createListItemEditTemplate(this.getData());
  }

  setListItemEditClickHandler = (callback) => {
    this._callback.editClick = callback;
    this.element.querySelector('.event__rollup-btn').addEventListener('click', this.#listItemEditClickHandler);
  }

  restoreHandlers = () => {
    this.#setInnerHandlers();
    this.setListItemEditClickHandler(this._callback.editClick);
    this.#setDatepicker();
  }

  removeElement = () => {
    super.removeElement();

    if (this.#datepicker) {
      this.#datepicker.destroy();
      this.#datepicker = null;
    }
  }

  #setDatepicker = () => {
    this.#datepicker = makePicker (
      this.element.querySelector('.event__input--time[name="event-start-time"]'),
      this.getData().startDate,
      this.#dateStartChangeHandler,
    );

    this.#datepicker = makePicker (
      this.element.querySelector('.event__input--time[name="event-end-time"]'),
      this.getData().endDate,
      this.#dateEndChangeHandler,
    );
  }

  #dateStartChangeHandler = ([userDate]) => {
    this.updateData({
      startDate: userDate,
    });
  }

  #dateEndChangeHandler = ([userDate]) => {
    this.updateData({
      endDate: userDate,
    });
  }

  #setInnerHandlers = () => {
    this.element.querySelector('.event__input--destination').addEventListener('input', this.#destinationInputHandler);
    this.element.querySelector('.event__type-group').addEventListener('change', this.#typePointChanged);
  }

  #listItemEditClickHandler = (evt) => {
    evt.preventDefault();
    this._callback.editClick();
  }

  #typePointChanged = (evt) => {
    const radioInputValue = evt.target.value;
    this.updateData({
      typePoint: radioInputValue,
      offers: generateOffer(radioInputValue),
    });
  }

  #destinationInputHandler = (evt) => {
    evt.preventDefault();
    this.updateData({
      photos: generatePhoto(),
      destination: generateDestination(),
    });
  }
}
