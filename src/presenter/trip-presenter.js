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

  resetView = () => {
    if (this.#mode !== Mode.DEFAULT) {
      this.#replaceFormToTrip();
    }
  }

  destroy = () => {
    remove(this.#tripComponent);
    remove(this.#tripEditComponent);
  }

  #replaceTripToForm = () => {
    // заменяю на форму, убираю обычный
    replace(this.#tripEditComponent, this.#tripComponent);
    console.log('tripToForm')
    
  };

  #replaceFormToTrip = () => {
    // заменяю на обычный, убираю форму
    replace(this.#tripComponent, this.#tripEditComponent);
    console.log('formToTrip')
  };

  #onEscKeyDown = (evt) => {
    if (evt.key === 'Escape' || evt.key === 'Esc') {
      evt.preventDefault();
      this.#replaceFormToTrip();
      document.removeEventListener('keydown', this.#onEscKeyDown);
    }
  };

  #handleEditClick = () => {
    this.#replaceFormToTrip();
  }

  #handleFavoriteClick = () => {
    this.#changeData({...this.#trip, isFavorite: !this.#trip.isFavorite});
  }

  #handleFormSubmit = () => {
    this.#replaceTripToForm();
  }
}
