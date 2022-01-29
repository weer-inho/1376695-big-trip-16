// import { UpdateType } from '../utils.js';
import AbstractObservable from './abstract-observer.js';

export default class TripsModel extends AbstractObservable {
  #trips = [];

  set trips(trips) {
    this.#trips = [...trips];
  }

  get trips() {
    return this.#trips;
  }

  updateTrip = (updateType, update) => {
    const index = this.#trips.findIndex((trip) => trip.id === update.id);

    if (index === -1) {
      throw new Error('cant update unexisting trip');
    }

    this.#trips = [
      ...this.#trips.slice(0, index),
      update,
      ...this.#trips.slice(index+1),
    ];

    this._notify(updateType, update);
  }

  addTrip = (updateType, update) => {
    this.#trips = [
      update,
      ...this.#trips,
    ];
    this._notify(updateType, update);
  }

  deleteTrip = (updateType, update) => {
    const index = this.#trips.findIndex((trip) => trip.id === update.id);

    if (index === -1) {
      throw new Error('cant delete unexisting trip');
    }

    this.#trips = [
      ...this.#trips.slice(0, index),
      ...this.#trips.slice(index+1),
    ];

    this._notify(updateType);
  }
}


