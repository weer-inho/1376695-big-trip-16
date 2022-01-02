import SiteFilters from './view/site-menu-filters.js';
import MainSort from './view/main-sort.js';
import TripList from './view/trip-events-list.js';
import TripEventsEdit from './view/trip-events-list-item-edit.js';
import TripEventsItem from './view/trip-event-list-item.js';
import { render, replace } from './render.js';
import PageHeader from './view/page-header.js';
import MainNavigation from './view/menu-navigation.js';
import TripCost from './view/trip-info-cost.js';
import InfoMain from './view/trip-info-main.js';
import PageMain from './view/page-main.js';
import NoData from './view/no-data.js';
import {generateTrip} from './mock/trip.js';

const TRIP_COUNT = 3;

const trips = Array.from({length: TRIP_COUNT}, generateTrip);
const tripCost = trips.reduce((accumulator, trip) => accumulator + trip.price, 0);

const renderTrip = (listElement, trip) => {
  const tripComponent = new TripEventsItem(trip);
  const tripEditComponent = new TripEventsEdit(trip);

  const replaceTripToForm = () => {
    replace(tripEditComponent, tripComponent);
  };

  const replaceFormToTrip = () => {
    replace(tripComponent, tripEditComponent);
  };

  const onEscKeyDown = (evt) => {
    if (evt.key === 'Escape' || evt.key === 'Esc') {
      evt.preventDefault();
      replaceFormToTrip();
      document.removeEventListener('keydown', onEscKeyDown);
    }
  };

  tripComponent.setListItemClickHandler(() => {
    replaceTripToForm();
    document.addEventListener('keydown', onEscKeyDown);
  });

  tripEditComponent.setListItemEditClickHandler(() => {
    replaceFormToTrip();
    document.removeEventListener('keydown', onEscKeyDown);
  });

  render(listElement, tripComponent);
};

const renderInfo = (container) => {
  render(container, new InfoMain(trips));
  render(container, new TripCost(tripCost));
};

const renderNavigation = (container) => {
  render(container, new MainNavigation());
};
const renderFilter = (container) => {
  render(container, new SiteFilters());
};
const renderPageHeader = (body) => {
  render(body, new PageHeader());
  renderInfo(body.querySelector('.trip-main__trip-info'));
  renderNavigation(body.querySelector('.trip-controls__navigation'));
  renderFilter(body.querySelector('.trip-controls__filters'));
};

const renderTripItems = (container) => {
  renderTrip(container, trips[0]);

  for (let i = 1; i < TRIP_COUNT; i++) {
    renderTrip(container, trips[i]);
  }
};

const renderTripMain = (container)=>{
  render(container, new MainSort());
  render(container, new TripList());
  renderTripItems(container.querySelector('.trip-events__list'));
};

const renderPageMain = (body)=>{
  render(body, new PageMain());
  renderTripMain(body.querySelector('.trip-events'));
};

const renderPage = (body) => {
  renderPageHeader(body);
  renderPageMain(body);
};

const renderApplication = (body) => {
  if (trips.length === 0) {
    renderPageHeader(body);
    render(body, new NoData());
  } else {
    renderPage(body);
  }
};

renderApplication(document.querySelector('.page-body'));
