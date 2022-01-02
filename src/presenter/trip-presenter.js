import TripEventsEdit from '../view/trip-events-list-item-edit.js';
import TripEventsItem from '../view/trip-event-list-item.js';
import { render, replace, remove } from '../render.js';

export default class TripPresenter {
  #tripListContainer = null;

  #tripComponent = null;
  #tripEditComponent = null;

  #trip = null;
  #changeData = null;

  constructor(tripListContainer, changeData) {
    this.#tripListContainer = tripListContainer;
    this.#changeData = changeData;
  }

  init = (trip) => {
    this.#trip = trip;

    const prevTripComponent = this.#tripComponent;
    const prevTripEditComponent = this.#tripEditComponent;

    this.#tripComponent = new TripEventsItem(trip);
    this.#tripEditComponent = new TripEventsEdit(trip);

    this.#tripComponent.setListItemClickHandler(this.#handleFormSubmit);
    this.#tripComponent.setFavoriteClickHandler(this.#handleFavoriteClick);
    this.#tripEditComponent.setListItemEditClickHandler(this.#handleEditClick);

    if (prevTripComponent === null || prevTripEditComponent === null) {
      render(this.#tripListContainer, this.#tripComponent);
      return;
    }

    if (this.#tripListContainer.contains(prevTripComponent.element)) {
      replace(this.#tripComponent, prevTripComponent);
    }

    if (this.#tripListContainer.contains(prevTripEditComponent.element)) {
      replace(this.#tripEditComponent, prevTripEditComponent);
    }

    remove(prevTripComponent);
    remove(prevTripEditComponent);
  }

  destroy = () => {
    remove(this.#tripComponent);
    remove(this.#tripEditComponent);
  }

  #replaceTripToForm = () => {
    replace(this.#tripComponent, this.#tripEditComponent);
  };

  #replaceFormToTrip = () => {
    replace(this.#tripEditComponent, this.#tripComponent);
  };

  #onEscKeyDown = (evt) => {
    if (evt.key === 'Escape' || evt.key === 'Esc') {
      evt.preventDefault();
      this.#replaceFormToTrip();
      document.removeEventListener('keydown', this.#onEscKeyDown);
    }
  };

  #handleEditClick = () => {
    this.#replaceTripToForm();
  }

  #handleFormSubmit = (trip) => {
    this.#changeData(trip);
    this.#replaceFormToTrip();
  }

  #handleFavoriteClick = () => {
    this.#changeData({...this.#trip, isFavorite: !this.#trip.isFavorite});
  }
}
