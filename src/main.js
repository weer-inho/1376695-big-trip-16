import BoardPresenter from './presenter/board-presenter.js';
import {generateTrip} from './mock/trip.js';
import TripsModel from './model/trips-model.js';

const TRIP_COUNT = 3;
const trips = Array.from({length: TRIP_COUNT}, generateTrip);

const tripsModel = new TripsModel();
tripsModel.trips = trips;

const boardPresenter = new BoardPresenter(document.querySelector('.page-body'), tripsModel);
boardPresenter.init();

document.querySelector('.trip-main__event-add-btn').addEventListener('click', (evt) => {
  evt.preventDefault();
  console.log('new event');
  boardPresenter.createTask();
});
