import MainSort from '../view/main-sort.js';
import TripList from '../view/trip-events-list.js';
import PageHeader from '../view/page-header.js';
import MainNavigation from '../view/menu-navigation.js';
import TripCost from '../view/trip-info-cost.js';
import InfoMain from '../view/trip-info-main.js';
import PageMain from '../view/page-main.js';
import NoData from '../view/no-data.js';
import TripNewPresenter from './trip-new-presenter.js';
import FilterPresenter from './filter-presenter.js';
import TripPresenter from './trip-presenter.js';
import { getTotalCost, getThreeRoutePoints, render, remove, updateItem, UserAction, UpdateType } from '../utils.js';
import { SortType, sortPrice, sortTime } from '../mock/data.js';

export default class BoardPresenter {
  #tripContainer = null;
  #tripsModel = null;
  #sectionTripEvents = null;
  #tripEventsList = null;
  #filterModel = null;
  #sortComponent = null;

  #HeaderComponent = new PageHeader();
  #MainComponent = new PageMain();
  #TripList =  new TripList();
  #noTripsComponent = new NoData();
  #tripNewPresenter = null;

  #trips = [];
  #tripPresenters = new Map();
  #currentSortType = SortType.DEFAULT;
  #sourcedBoardTrips = [];

  constructor(tripContainer, tripsModel, filterModel) {
    this.#tripContainer = tripContainer;
    this.#tripsModel = tripsModel;
    this.#filterModel = filterModel;
    this.#sourcedBoardTrips = [...this.#tripsModel.trips];

    this.#tripsModel.addObserver(this.#handleModelEvent);
    this.#filterModel.addObserver(this.#handleModelEvent);
    this.#tripNewPresenter = new TripNewPresenter(this.#tripContainer, this.#handleViewAction);
  }

  init = () => {
    this.#renderBoard();
  }

  createTask = () => {
    this.#currentSortType = SortType.DEFAULT;
    //this.#filterModel.setFilter(UpdateType.MAJOR, FilterType.ALL);
    this.#tripNewPresenter.init();
  }

  get trips() {
    console.log('я дошел до борды');

    const filterType = this.#filterModel.filter;
    const trips = this.#tripsModel.trips;
    const filteredTasks = filter[filterType](trips);

    switch (this.#currentSortType) {
      case SortType.PRICE:
        return this.#tripsModel.trips.sort(sortPrice);
      case SortType.TIME:
        return this.#tripsModel.trips.sort(sortTime);
      case SortType.DEFAULT:
        return [...this.#tripsModel.trips];
      default:
    }
    return this.#tripsModel.trips;
  }

  #handleViewAction = (actionType, updateType, update) => {
    switch (actionType) {
      case UserAction.UPDATE_TRIP:
        this.#tripsModel.updateTrip(updateType, update);
        break;
      case UserAction.ADD_TRIP:
        this.#tripsModel.addTrip(updateType, update);
        break;
      case UserAction.DELETE_TRIP:
        this.#tripsModel.deleteTrip(updateType, update);
        break;
    }
  }

  #handleModelEvent = (updateType, data) => {
    // В зависимости от типа изменений решаем, что делать:
    switch (updateType) {
      case UpdateType.PATCH:
        // - обновить часть списка (например, когда поменялось описание)
        this.tripPresenter.get(data.id).init(data);
        break;
      case UpdateType.MINOR:
        this.#clearTripList();
        this.#renderTripItems();
        break;
      case UpdateType.MAJOR:
        // - обновить всю доску (например, при переключении фильтра)
        this.#clearBoard();
        this.#renderBoard();
        break;
    }
  }

  #handleSortTypeChange = (sortType) => {
    if (this.#currentSortType === sortType) {
      return;
    }

    this.#sortTrips(sortType);
    this.#clearBoard();
    this.#currentSortType = sortType;
    this.#renderBoard();
  }

  #handleModeChange = () => {
    this.#tripPresenters.forEach((presenter) => presenter.resetView());
  }

  #handleTripChange = (updatedTrip) => {
    this.#tripsModel.trips = updateItem(this.#tripsModel.trips, updatedTrip);

    this.#tripPresenters.get(updatedTrip.id).init(updatedTrip);
  }

  #sortTrips = (sortType) => {
    switch (sortType) {
      case SortType.PRICE:
        this.#tripsModel.trips.sort(sortPrice);
        break;
      case SortType.TIME:
        this.#tripsModel.trips.sort(sortTime);
        break;
      case SortType.DEFAULT:
        this.#tripsModel.trips = [...this.#sourcedBoardTrips];
        break;
      default:
    }
  }

  #clearTripList = () => {
    this.#tripPresenters.forEach((presenter) => presenter.destroy());
    this.#tripPresenters.clear();
  }

  #clearBoard = ({resetSortType = false} = {}) => {
    this.#tripPresenters.forEach((presenter) => presenter.destroy());
    this.#tripPresenters.clear();

    remove(this.#sortComponent);
    remove(this.#noTripsComponent);
    remove(this.#HeaderComponent);

    if (resetSortType) {
      this.#currentSortType = SortType.DEFAULT;
    }
  }

  #renderTrip = (trip) => {
    const tripPresenter = new TripPresenter(this.#tripEventsList, this.#handleViewAction, this.#handleModeChange);
    tripPresenter.init(trip);
    this.#tripPresenters.set(trip.id, tripPresenter);
  }

  #renderInfo = () => {
    const container = this.#tripContainer.querySelector('.trip-main__trip-info');
    render(container, new InfoMain(getThreeRoutePoints(this.#tripsModel.trips)));
    render(container, new TripCost(getTotalCost(this.#tripsModel.trips)));
  }

  #renderNavigation = () => {
    render(this.#tripContainer.querySelector('.trip-controls__navigation'), new MainNavigation());
  }

  #renderFilter = () => {
    const filterPresenter = new FilterPresenter(this.#tripContainer.querySelector('.trip-controls__filters'), this.#filterModel);
    filterPresenter.init();
  }

  #renderPageHeader = () => {
    render(this.#tripContainer, this.#HeaderComponent);
    this.#renderInfo();
    this.#renderNavigation();
    // this.#renderFilter();
  }

  #renderTripItems = () => {
    this.#tripsModel.trips.forEach((trip) => this.#renderTrip(trip));
  }

  #renderSort = () => {
    this.#sortComponent = new MainSort(this.#currentSortType);
    this.#sortComponent.setSortTypeChangeHandler(this.#handleSortTypeChange);
    render(this.#sectionTripEvents, this.#sortComponent);
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
    if (this.#tripsModel.trips.length === 0) {
      this.#renderPageHeader();
      render(this.#tripContainer, this.#noTripsComponent);
    } else {
      this.#renderPage();
    }
  }
}
