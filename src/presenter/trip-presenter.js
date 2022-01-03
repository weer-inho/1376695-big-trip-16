import TripEventsEdit from '../view/trip-events-list-item-edit.js';
import TripEventsItem from '../view/trip-event-list-item.js';
import { render, replace, remove } from '../render.js';

const Mode = {
  DEFAULT: 'DEFAULT',
  EDITING: 'EDITING',
};

export default class TripPresenter {
  #tripListContainer = null;

  #tripComponent = null;
  #tripEditComponent = null;
  #tripPresenter = new Map();
  #changeData = null;
  #changeMode = null;

  #trip = null;
  #mode = Mode.DEFAULT

  constructor(tripListContainer, changeData, changeMode) {
    this.#tripListContainer = tripListContainer;
    this.#changeData = changeData;
    this.#changeMode = changeMode;
  }

  init = (trip) => {
    this.#trip = trip;

    const prevTripComponent = this.#tripComponent;
    const prevTripEditComponent = this.#tripEditComponent;

    this.#tripComponent = new TripEventsItem(trip);
    this.#tripEditComponent = new TripEventsEdit(trip);

    this.#tripComponent.setListItemClickHandler(this.#handleFormSubmit);
    this.#tripEditComponent.setListItemEditClickHandler(this.#handleEditClick);
    this.#tripComponent.setFavoriteClickHandler(this.#handleFavoriteClick);

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

  #handleFavoriteClick = () => {
    this.#changeData({...this.#trip, isFavorite: !this.#trip.isFavorite});
  }

  #handleFormSubmit = () => {
    this.#replaceFormToTrip();
  }
}
