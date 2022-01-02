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
    // метод для начала работы модуля
  }

  #renderTrip = () => {
    // метод отрисовки одной карточки(поездки)
  }

  #renderInfo = () => {
    // метод отрисовки блока trip-info
  }

  #renderNavigation = () => {
    // метод отрисовки блока trip-controls__navigation
  }

  #renderFilter = () => {
    // метод отрисовки блока trip-controls__filters
  }

  #renderPageHeader = () => {
    // метод отрисовки блоков newPageHeader+info+navigation+filter
  }

  #renderTripItems = () => {
    // метод отрисовки всех поездок
  }
  
  #renderMain = () => {
    // метод отрисовки блоков сортировки, контейнера-списка ul, renderTripItems
  }

  #renderPageMain = () => {
    // метод отрисовки блоков newPageMain+renderMain
  }

  #renderPage = () => {
    // метод отрисовки блоков pageHeader+pageMain
  }
}