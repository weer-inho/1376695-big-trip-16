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
import './mock/trip.js';

const renderTripInfo = (container)=>{
  renderTemplate(container,createTripInfoMainTemplate());
  renderTemplate(container,createTripCostTemplate());
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
  renderTemplate(container,createTripEventsListItemEditTemplate());
  Array.from({length:3}).forEach(()=>{
    renderTemplate(container, createTripEventsListItemTemplate());
  });
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

