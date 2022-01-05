import BoardPresenter from './presenter/board-presenter.js';
import {generateTrip} from './mock/trip.js';

const TRIP_COUNT = 3;
const trips = Array.from({length: TRIP_COUNT}, generateTrip);
const boardPresenter = new BoardPresenter(document.querySelector('.page-body'));
boardPresenter.init(trips);
