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
const body = document.querySelector('.page-body');

const boardPresenter = new BoardPresenter(body, tripsModel, filterModel);
boardPresenter.init();

const filterPresenter = new FilterPresenter(body, filterModel, tripsModel);
filterPresenter.init();

document.querySelector('.trip-main__event-add-btn').addEventListener('click', (evt) => {
  evt.preventDefault();
  boardPresenter.createTask();
});
