import TripPresenter from './presenter/trip-presenter.js';
import {generateTrip} from './mock/trip.js';

const TRIP_COUNT = 3;
const trips = Array.from({length: TRIP_COUNT}, generateTrip);
const tripPresenter = new TripPresenter(document.querySelector('.page-body'));

tripPresenter.init(trips);
