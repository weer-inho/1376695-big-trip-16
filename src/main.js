import BoardPresenter from './presenter/board-presenter.js';
import {generateTrip} from './mock/trip.js';
import TripsModel from './model/trips-model.js';
import FilterModel from './model/filter-model.js';
import dayjs from 'dayjs';

const isDateFuture = (date) => dayjs(date).diff(dayjs()) > 0;
const isDatePast = (date) => dayjs().diff(dayjs(date)) > 0;

const TRIP_COUNT = 3;
const trips = Array.from({length: TRIP_COUNT}, generateTrip);

const tripsModel = new TripsModel();
tripsModel.trips = trips;

const filterModel = new FilterModel();

const boardPresenter = new BoardPresenter(document.querySelector('.page-body'), tripsModel, filterModel);
boardPresenter.init();

document.querySelector('.trip-main__event-add-btn').addEventListener('click', (evt) => {
  evt.preventDefault();
  boardPresenter.createTask();
});
