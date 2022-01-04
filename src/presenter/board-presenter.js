import SiteFilters from '../view/site-menu-filters.js';
import MainSort from '../view/main-sort.js';
import TripList from '../view/trip-events-list.js';
import PageHeader from '../view/page-header.js';
import MainNavigation from '../view/menu-navigation.js';
import TripCost from '../view/trip-info-cost.js';
import InfoMain from '../view/trip-info-main.js';
import PageMain from '../view/page-main.js';
import NoData from '../view/no-data.js';
import TripPresenter from './trip-presenter.js';
import { render, updateItem } from '../render.js';

export default class BoardPresenter {
  #tripContainer = null;

  #HeaderComponent = new PageHeader();
  #MainComponent = new PageMain();
  #TripList =  new TripList();
  #sortComponent = new MainSort();
  #noTripsComponent = new NoData();

  #trips = [];
  #tripPresenter = new Map();

  constructor(tripContainer) {
    this.#tripContainer = tripContainer;
  }

  init = (trips) => {
    this.#trips = [...trips];

    this.#renderBoard(this.#tripContainer);
  }

  #handleModeChange = () => {
    this.#tripPresenter.forEach((presenter) => presenter.resetView());
  }

  #handleTripChange = (updatedTrip) => {
    this.#trips = updateItem(this.#trips, updatedTrip);
    this.#tripPresenter.get(updatedTrip.id).init(updatedTrip);
  }


  #clearTaskList = () => {
    this.#tripPresenter.forEach((presenter) => presenter.destroy());
    this.#tripPresenter.clear();
  }

  #renderTrip = (listElement, trip) => {
    const tripPresenter = new TripPresenter(listElement, this.#handleTripChange, this.#handleModeChange);
    tripPresenter.init(trip);
    this.#tripPresenter.set(trip.id, tripPresenter);
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
    render(body, this.#HeaderComponent);
    this.#renderInfo(body.querySelector('.trip-main__trip-info'));
    this.#renderNavigation(body.querySelector('.trip-controls__navigation'));
    this.#renderFilter(body.querySelector('.trip-controls__filters'));
  }

  #renderTripItems = (container) => {
    this.#trips.forEach((trip) => this.#renderTrip(container, trip));
  }

  #renderMain = (container) => {
    render(container, this.#sortComponent);
    render(container, this.#TripList);
    this.#renderTripItems(container.querySelector('.trip-events__list'));
  }

  #renderPageMain = (body) => {
    render(body, this.#MainComponent);
    this.#renderMain(body.querySelector('.trip-events'));
  }

  #renderPage = (body) => {
    this.#renderPageHeader(body);
    this.#renderPageMain(body);
  }

  #renderBoard = (body) => {
    if (this.#trips.length === 0) {
      this.#renderPageHeader(body);
      render(body, this.#noTripsComponent);
    } else {
      this.#renderPage(body);
    }
  }
}
