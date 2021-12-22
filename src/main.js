import SiteFilters from './view/site-menu-filters.js';
import MainSort from './view/main-sort.js';
import TripList from './view/trip-events-list.js';
import TripEventsEdit from './view/trip-events-list-item-edit.js';
import TripEventsItem from './view/trip-event-list-item.js';
import { renderTemplate, renderElement } from './render.js';
import PageHeader from './view/page-header.js';
import MainNavigation from './view/menu-navigation.js';
import TripCost from './view/trip-info-cost.js';
import InfoMain from './view/trip-info-main.js';
import PageMain from './view/page-main.js';
import {generateTrip} from './mock/trip.js';

const TRIP_COUNT = 15;

const trips = Array.from({length: TRIP_COUNT}, generateTrip);
const tripCost = trips.reduce((accumulator, trip) => accumulator + trip.price, 0);

const renderTripInfo = (container)=>{
  renderElement(container, new InfoMain(trips).element)
  renderElement(container, new TripCost(tripCost).element)
};

const renderTripNavigation = (container)=>{
  renderElement(container, new MainNavigation().element);
};
const renderTripFilter = (container)=>{
  // renderTemplate(container, createSiteFiltersTemplate());
  renderElement(container, new SiteFilters().element)
};
const renderPageHeader = (body) => {
  renderElement(body, new PageHeader().element)
  renderTripInfo(body.querySelector('.trip-main__trip-info'));
  renderTripNavigation(body.querySelector('.trip-controls__navigation'));
  renderTripFilter(body.querySelector('.trip-controls__filters'));
};

const renderTripItems = (container)=>{
  renderElement(container, new TripEventsEdit(trips[0]).element)

  for (let i = 1; i < TRIP_COUNT; i++) {
    renderElement(container, new TripEventsItem(trips[i]).element)
  }
};

const renderTripMain = (container)=>{
  renderElement(container, new MainSort().element)
  renderElement(container, new TripList().element);
  renderTripItems(container.querySelector('.trip-events__list'));
};

const renderPageMain = (body)=>{
  renderElement(body, new PageMain().element)
  renderTripMain(body.querySelector('.trip-events'));
};

const renderPage = (body) => {
  renderPageHeader(body);
  renderPageMain(body);
};

renderPage(document.querySelector('.page-body'));

