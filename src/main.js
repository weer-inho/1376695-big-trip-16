import SiteFilters from './view/site-menu-filters.js';
import MainSort from './view/main-sort.js';
import TripList from './view/trip-events-list.js';
import TripEventsEdit from './view/trip-events-list-item-edit.js';
import TripEventsItem from './view/trip-event-list-item.js';
import { render } from './render.js';
import PageHeader from './view/page-header.js';
import MainNavigation from './view/menu-navigation.js';
import TripCost from './view/trip-info-cost.js';
import InfoMain from './view/trip-info-main.js';
import PageMain from './view/page-main.js';
import {generateTrip} from './mock/trip.js';

const TRIP_COUNT = 15;

const trips = Array.from({length: TRIP_COUNT}, generateTrip);
const tripCost = trips.reduce((accumulator, trip) => accumulator + trip.price, 0);

const renderTrip = (listElement, trip) => {
  const tripComponent = new TripEventsItem(trip);
  const tripEditComponent = new TripEventsEdit(trip);

  const replaceTripToForm = () => {
    listElement.replaceChild(tripEditComponent.element, tripComponent.element);
  };

  const replaceFormToTrip = () => {
    listElement.replaceChild(tripComponent.element, tripEditComponent.element);
  };

  const onEscKeyDown = (evt) => {
    if (evt.key === 'Escape' || evt.key === 'Esc') {
      evt.preventDefault();
      replaceFormToTrip();
      document.removeEventListener('keydown', onEscKeyDown);
    }
  };

  tripComponent.element.querySelector('.event__rollup-btn').addEventListener('click', () => {
    replaceTripToForm();
    document.addEventListener('keydown', onEscKeyDown);
  });

  tripEditComponent.element.querySelector('.event__rollup-btn').addEventListener('click', () => {
    replaceFormToTrip();
    document.removeEventListener('keydown', onEscKeyDown);
  });

  render(listElement, tripComponent.element);
};

const renderTripInfo = (container) => {
  render(container, new InfoMain(trips).element);
  render(container, new TripCost(tripCost).element);
};

const renderTripNavigation = (container) => {
  render(container, new MainNavigation().element);
};
const renderTripFilter = (container) => {
  render(container, new SiteFilters().element);
};
const renderPageHeader = (body) => {
  render(body, new PageHeader().element);
  renderTripInfo(body.querySelector('.trip-main__trip-info'));
  renderTripNavigation(body.querySelector('.trip-controls__navigation'));
  renderTripFilter(body.querySelector('.trip-controls__filters'));
};

const renderTripItems = (container) => {
  renderTrip(container, trips[0]);

  for (let i = 1; i < TRIP_COUNT; i++) {
    renderTrip(container, trips[i]);
  }
};

const renderTripMain = (container)=>{
  render(container, new MainSort().element);
  render(container, new TripList().element);
  renderTripItems(container.querySelector('.trip-events__list'));
};

const renderPageMain = (body)=>{
  render(body, new PageMain().element);
  renderTripMain(body.querySelector('.trip-events'));
};

const renderPage = (body) => {
  renderPageHeader(body);
  renderPageMain(body);
};

renderPage(document.querySelector('.page-body'));
