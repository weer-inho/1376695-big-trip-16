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
import { SortType, sortPrice, sortTime } from '../mock/data.js';

export default class BoardPresenter {
  #tripContainer = null;

  #HeaderComponent = new PageHeader();
  #MainComponent = new PageMain();
  #TripList =  new TripList();
  #sortComponent = new MainSort();
  #noTripsComponent = new NoData();

  #trips = [];
  #tripPresenter = new Map();
  #currentSortType = SortType.DEFAULT;
  #sourcedBoardTrips = [];

  constructor(tripContainer) {
    this.#tripContainer = tripContainer;
  }

  init = (trips) => {
    this.#trips = [...trips];
    this.#sourcedBoardTrips = [...trips];

    this.#renderBoard();
  }

  #handleSortTypeChange = (sortType) => {
    if (this.#currentSortType === sortType) {
      return;
    }

    this.#sortTrips(sortType);
    this.#clearTripList();
    this.#renderTripItems(document.querySelector('.trip-events__list'));
    this.#currentSortType = sortType;
  }

  #handleModeChange = () => {
    this.#tripPresenter.forEach((presenter) => presenter.resetView());
  }

  #handleTripChange = (updatedTrip) => {
    this.#trips = updateItem(this.#trips, updatedTrip);

    this.#tripPresenter.get(updatedTrip.id).init(updatedTrip);
  }

  #sortTrips = (sortType) => {
    switch (sortType) {
      case SortType.PRICE:
        this.#trips.sort(sortPrice);
        break;
      case SortType.TIME:
        this.#trips.sort(sortTime);
        break;
      case SortType.DEFAULT:
        this.#trips = [...this.#sourcedBoardTrips];
        break;
      default:
    }
  }

  #clearTripList = () => {
    this.#tripPresenter.forEach((presenter) => presenter.destroy());
    this.#tripPresenter.clear();
  }

  #renderTrip = (trip) => {
    const listElement = this.#tripContainer.querySelector('.trip-events__list');
    const tripPresenter = new TripPresenter(listElement, this.#handleTripChange, this.#handleModeChange);
    tripPresenter.init(trip);
    this.#tripPresenter.set(trip.id, tripPresenter);
  }

  #renderInfo = () => {
    const container = this.#tripContainer.querySelector('.trip-main__trip-info');
    render(container, new InfoMain(this.#trips));
    const tripCost = this.#trips.reduce((accumulator, trip) => accumulator + trip.price, 0);
    render(container, new TripCost(tripCost));
  }

  #renderNavigation = () => {
    render(this.#tripContainer.querySelector('.trip-controls__navigation'), new MainNavigation());
  }

  #renderFilter = () => {
    render(this.#tripContainer.querySelector('.trip-controls__filters'), new SiteFilters());
  }

  #renderPageHeader = () => {
    render(this.#tripContainer, this.#HeaderComponent);
    this.#renderInfo();
    this.#renderNavigation();
    this.#renderFilter();
  }

  #renderTripItems = () => {
    this.#trips.forEach((trip) => this.#renderTrip(trip));
  }

  #renderSort = (container) => {
    render(container, this.#sortComponent);
    this.#sortComponent.setSortTypeChangeHandler(this.#handleSortTypeChange);
  }

  #renderMain = (container) => {
    this.#renderSort(container);
    render(container, this.#TripList);
    this.#renderTripItems(container.querySelector('.trip-events__list'));
  }

  #renderPageMain = (body) => {
    render(body, this.#MainComponent);
    this.#renderMain(body.querySelector('.trip-events'));
  }

  #renderPage = (body) => {
    this.#renderPageHeader();
    this.#renderPageMain(body);
  }

  #renderBoard = () => {
    if (this.#trips.length === 0) {
      this.#renderPageHeader();
      render(this.#tripContainer, this.#noTripsComponent);
    } else {
      this.#renderPage(this.#tripContainer);
    }
  }
}
