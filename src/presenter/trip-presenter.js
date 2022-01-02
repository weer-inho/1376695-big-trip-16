import SiteFilters from '../view/site-menu-filters.js';
import MainSort from '../view/main-sort.js';
import TripList from '../view/trip-events-list.js';
import TripEventsEdit from '../view/trip-events-list-item-edit.js';
import TripEventsItem from '../view/trip-event-list-item.js';
import { render, replace } from '../render.js';
import PageHeader from '../view/page-header.js';
import MainNavigation from '../view/menu-navigation.js';
import TripCost from '../view/trip-info-cost.js';
import InfoMain from '../view/trip-info-main.js';
import PageMain from '../view/page-main.js';
import NoData from '../view/no-data.js';

export default class TripPresenter {
  #tripContainer = null;

  #HeaderComponent = new PageHeader();
  #MainComponent = new PageMain();
  #sortComponent = new MainSort();
  #noTripsComponent = new NoData();

  #trips = [];

  constructor(tripContainer) {
    this.#tripContainer = tripContainer;
  }

  init = (trips) => {
    this.#trips = [...trips];

    this.#renderBoard(this.#tripContainer);
  }

  #renderTrip = (listElement, trip) => {
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
  }

  #renderInfo = (container) => {
    render(container, new InfoMain(this.#trips));
    const tripCost = this.#trips.reduce((accumulator, trip) => accumulator + trip.price, 0);
    render(container, new TripCost(tripCost));
  }

  #renderNavigation = (container) => {
    render(container, new MainNavigation());
  }

  #renderFilter = (container) => {
    render(container, new SiteFilters());
  }

  #renderPageHeader = (body) => {
    render(body, new PageHeader());
    this.#renderInfo(body.querySelector('.trip-main__trip-info'));
    this.#renderNavigation(body.querySelector('.trip-controls__navigation'));
    this.#renderFilter(body.querySelector('.trip-controls__filters'));
  }

  #renderTripItems = (container) => {
    this.#trips.forEach((trip) => this.#renderTrip(container, trip));
  }

  #renderMain = (container) => {
    render(container, new MainSort());
    render(container, new TripList());
    this.#renderTripItems(container.querySelector('.trip-events__list'));
  }

  #renderPageMain = (body) => {
    render(body, new PageMain());
    this.#renderMain(body.querySelector('.trip-events'));
  }

  #renderPage = (body) => {
    this.#renderPageHeader(body);
    this.#renderPageMain(body);
  }

  #renderBoard = (body) => {
    if (this.#trips.length === 0) {
      this.#renderPageHeader(body);
      render(body, new NoData());
    } else {
      this.#renderPage(body);
    }
  }
}
