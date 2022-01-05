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
import { getTotalCost, getThreeRoutePoints, render, updateItem } from '../render.js';
import { SortType, sortPrice, sortTime } from '../mock/data.js';

export default class BoardPresenter {
  #tripContainer = null;
  #sectionTripEvents = null;
  #tripEventsList = null;

  #HeaderComponent = new PageHeader();
  #MainComponent = new PageMain();
  #TripList =  new TripList();
  #sortComponent = new MainSort();
  #noTripsComponent = new NoData();

  #trips = [];
  #tripPresenters = new Map();
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
    this.#renderTripItems();
    this.#currentSortType = sortType;
  }

  #handleModeChange = () => {
    this.#tripPresenters.forEach((presenter) => presenter.resetView());
  }

  #handleTripChange = (updatedTrip) => {
    this.#trips = updateItem(this.#trips, updatedTrip);

    this.#tripPresenters.get(updatedTrip.id).init(updatedTrip);
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
    this.#tripPresenters.forEach((presenter) => presenter.destroy());
    this.#tripPresenters.clear();
  }

  #renderTrip = (trip) => {
    const tripPresenter = new TripPresenter(this.#tripEventsList, this.#handleTripChange, this.#handleModeChange);
    tripPresenter.init(trip);
    this.#tripPresenters.set(trip.id, tripPresenter);
  }

  #renderInfo = () => {
    const container = this.#tripContainer.querySelector('.trip-main__trip-info');
    render(container, new InfoMain(getThreeRoutePoints(this.#trips)));
    render(container, new TripCost(getTotalCost(this.#trips)));
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

  #renderSort = () => {
    render(this.#sectionTripEvents, this.#sortComponent);
    this.#sortComponent.setSortTypeChangeHandler(this.#handleSortTypeChange);
  }

  #renderMain = () => {
    this.#renderSort();
    render(this.#sectionTripEvents, this.#TripList);
    this.#tripEventsList = this.#tripContainer.querySelector('.trip-events__list');
    this.#renderTripItems();
  }

  #renderPageMain = () => {
    render(this.#tripContainer, this.#MainComponent);
    this.#sectionTripEvents = this.#tripContainer.querySelector('.trip-events');
    this.#renderMain();
  }

  #renderPage = () => {
    this.#renderPageHeader();
    this.#renderPageMain();
  }

  #renderBoard = () => {
    if (this.#trips.length === 0) {
      this.#renderPageHeader();
      render(this.#tripContainer, this.#noTripsComponent);
    } else {
      this.#renderPage();
    }
  }
}
