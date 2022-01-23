import AbstractObservable from './abstract-observer.js';

export default class TripsModel extends AbstractObservable {
  #trips = [];

  set trips(trips) {
    this.#trips = [...trips];
  }

  get trips() {
    return this.#trips;
  }
}
