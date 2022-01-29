import TripEventsEdit from '../view/trip-events-list-item-edit.js';
import {nanoid} from 'nanoid';
import { testEditObject } from '../utils.js';
import { render, remove, UserAction, UpdateType } from '../utils.js';

export default class TripNewPresenter {
  #tripListContainer = null;
  #changeData = null;
  #tripEditComponent = null;
  #trip = null;

  constructor(tripListContainer, changeData) {
    this.#tripListContainer = tripListContainer;
    this.#changeData = changeData;
  }

  init = () => {
    if (this.#tripEditComponent !== null) {
      return;
    }

    this.#tripEditComponent = new TripEventsEdit(testEditObject);
    this.#tripEditComponent.setFormSubmitHandler(this.#handleFormSubmit);
    // this.#tripEditComponent.setDeleteClickHandler(this.#handleDeleteClick);

    render(this.#tripListContainer.querySelector('.trip-events__list'), this.#tripEditComponent);

    document.addEventListener('keydown', this.#escKeyDownHandler);
  }

  destroy = () => {
    if (this.#tripEditComponent === null) {
      return;
    }

    remove(this.#tripEditComponent);
    this.#tripEditComponent = null;

    document.removeEventListener('keydown', this.#escKeyDownHandler);
  }

  #handleFormSubmit = () => {
    this.#changeData(
      UserAction.ADD_TRIP,
      UpdateType.MINOR,
      // Пока у нас нет сервера, который бы после сохранения
      // выдывал честный id задачи, нам нужно позаботиться об этом самим
      {id: nanoid(), ...testEditObject},
    );
    this.destroy();
  }

  #handleDeleteClick = () => {
    this.destroy();
  }

  #escKeyDownHandler = (evt) => {
    if (evt.key === 'Escape' || evt.key === 'Esc') {
      evt.preventDefault();
      this.destroy();
    }
  }
}
