import BoardPresenter from './presenter/board-presenter.js';
import {generateTrip} from './mock/trip.js';
import TripsModel from './model/trips-model.js';
import FilterModel from './model/filter-model.js';
import FilterPresenter from './presenter/filter-presenter.js';

const TRIP_COUNT = 3;
const trips = Array.from({length: TRIP_COUNT}, generateTrip);

const tripsModel = new TripsModel();
tripsModel.trips = trips;

const filterModel = new FilterModel();

const boardPresenter = new BoardPresenter(document.querySelector('.page-body'), tripsModel, filterModel);
boardPresenter.init();

const filterPresenter = new FilterPresenter(document.querySelector('.page-body').querySelector('.trip-controls__filters'), filterModel);
filterPresenter.init();

document.querySelector('.trip-main__event-add-btn').addEventListener('click', (evt) => {
  evt.preventDefault();
  boardPresenter.createTask();
});
