import AbstractView from './abstract-view.js';

const createTripList = () => (
  '<ul class="trip-events__list"><ul>'
);

export default class TripList extends AbstractView {
  get template() {
    return createTripList();
  }
}
