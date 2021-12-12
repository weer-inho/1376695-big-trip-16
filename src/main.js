import { createSiteFiltersTemplate } from './view/site-menu-filters.js';
import { createMainSortTemplate } from './view/main-sort.js';
import { createTripEventsList } from './view/trip-events-list.js';
import { createTripEventsListItemEditTemplate } from './view/trip-events-list-item-edit.js';
import { createTripEventsListItemTemplate } from './view/trip-event-list-item.js';
import { renderTemplate } from './render.js';
import { createPageHeaderTemplate } from './view/page-header.js';
import { createNavigationTemplate } from './view/menu-navigation.js';
import { createTripCostTemplate } from './view/trip-info-cost.js';
import { createTripInfoMainTemplate } from './view/trip-info-main.js';
import { createPageMainTemplae } from './view/page-main.js';
import {generateTrip} from './mock/trip.js';

const TRIP_COUNT = 15;

const trips = Array.from({length: TRIP_COUNT}, generateTrip);
const tripCost = trips.reduce((accumulator, trip) => accumulator + trip.price, 0);

const renderTripInfo = (container)=>{
  renderTemplate(container,createTripInfoMainTemplate(trips));
  renderTemplate(container,createTripCostTemplate(tripCost));
};

const renderTripNavigation = (container)=>{
  renderTemplate(container, createNavigationTemplate());
};
const renderTripFilter = (container)=>{
  renderTemplate(container, createSiteFiltersTemplate());
};
const renderPageHeader = (body) => {
  renderTemplate(body,createPageHeaderTemplate());
  renderTripInfo(body.querySelector('.trip-main__trip-info'));
  renderTripNavigation(body.querySelector('.trip-controls__navigation'));
  renderTripFilter(body.querySelector('.trip-controls__filters'));
};

const renderTripItems = (container)=>{
  renderTemplate(container,createTripEventsListItemEditTemplate(trips[0]));

  for (let i = 1; i < TRIP_COUNT; i++) {
    renderTemplate(container, createTripEventsListItemTemplate(trips[i]));
  }
};

const renderTripMain = (container)=>{
  renderTemplate(container, createMainSortTemplate());
  renderTemplate(container,createTripEventsList());
  renderTripItems(container.querySelector('.trip-events__list'));
};

const renderPageMain = (body)=>{
  renderTemplate(body, createPageMainTemplae());
  renderTripMain(body.querySelector('.trip-events'));
};

const renderPage = (body) => {
  renderPageHeader(body);
  renderPageMain(body);
};

renderPage(document.querySelector('.page-body'));

