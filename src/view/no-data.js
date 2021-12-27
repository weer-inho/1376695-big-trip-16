import AbstractView from './abstract-view.js';

const createNoDataTemplate = ()=>('<p class="trip-events__msg">Click New Event to create your first point</p>');

export default class NoData extends AbstractView {
  get template() {
    return createNoDataTemplate();
  }
}
