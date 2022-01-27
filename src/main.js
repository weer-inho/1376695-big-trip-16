import BoardPresenter from './presenter/board-presenter.js';
import FilterPresenter from './presenter/filter-presenter.js';
import {generateTrip} from './mock/trip.js';
import TripsModel from './model/trips-model.js';
import FilterModel from './model/filter-model.js';
import dayjs from 'dayjs';

const isDateFuture = (date) => dayjs(date).diff(dayjs()) > 0;
const isDatePast = (date) => dayjs().diff(dayjs(date)) > 0;

const TRIP_COUNT = 3;
const trips = Array.from({length: TRIP_COUNT}, generateTrip);

const filterModel = new FilterModel();
const tripsModel = new TripsModel();
tripsModel.trips = trips;

const boardPresenter = new BoardPresenter(document.querySelector('.page-body'), tripsModel);
boardPresenter.init();

const filterPresenter = new FilterPresenter(document.querySelector('.page-body'), filterModel, tripsModel);
filterPresenter.init();

document.querySelector('.trip-main__event-add-btn').addEventListener('click', (evt) => {
  evt.preventDefault();
  boardPresenter.createTask();
});