import {createSiteInfoTemplate} from './view/site-menu-info.js';
import {createSiteFiltersTemplate} from './view/site-menu-filters.js';
import {createMainSortTemplate} from './view/main-sort.js';
import {createTripEventsList} from './view/trip-events-list.js';
import {createTripEventsListItemEditTemplate} from './view/trip-events-list-item-edit.js';
import {createTripEventsListItemTemplate} from './view/trip-event-list-item.js';
import {RenderPosition, renderTemplate} from './render.js';

const renderPage = (body) => {
  const siteMainElement = body.querySelector('.trip-main');

  renderTemplate(siteMainElement, createSiteInfoTemplate(), RenderPosition.AFTERBEGIN);

  const siteMainControls = siteMainElement.querySelector('.trip-main__trip-controls ');
  renderTemplate(siteMainControls, createSiteFiltersTemplate());

  const pageBodyContainer = body.querySelector('.trip-events');
  renderTemplate(pageBodyContainer, createMainSortTemplate());
  renderTemplate(pageBodyContainer, createTripEventsList());

  const tripEventsList = body.querySelector('.trip-events__list');
  renderTemplate(tripEventsList, createTripEventsListItemEditTemplate());
  for (let i = 0; i < 3; i++) {
    renderTemplate(tripEventsList, createTripEventsListItemTemplate());
  }
};

renderPage(document.querySelector('.page-body'));

