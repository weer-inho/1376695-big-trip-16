import SiteFilters from '../view/site-menu-filters.js';
import dayjs from 'dayjs';
import {render, replace, remove, UpdateType} from '../utils.js';

export default class FilterPresenter {
  #filterContainer = null;
  #filterModel = null;
  #tripsModel = null;

  #filterComponent = null;

  constructor(filterContainer, filterModel, tripsModel) {
    this.#filterContainer = filterContainer;
    this.#filterModel = filterModel;
    this.#tripsModel = tripsModel;

    // this.#tripsModel.addObserver(this.#handleModelEvent);
    this.#filterModel.addObserver(this.#handleModelEvent);
  }

  init = () => {
    const prevFilterComponent = this.#filterComponent;

    this.#filterComponent = new SiteFilters(this.#filterModel.filter);

    this.#filterComponent.setFilterTypeChangeHandler(this.#handleFilterTypeChange);

    if (prevFilterComponent === null) {
      render(this.#filterContainer, this.#filterComponent);
      console.log('Отрендерил')
      return;
    }

    replace(this.#filterComponent, prevFilterComponent);
    remove(prevFilterComponent);
  }

  #handleModelEvent = () => {
    this.init();
  }

  #handleFilterTypeChange = (filterType) => {
    if (this.#filterModel.filter === filterType) {
      return;
    }

    this.#filterModel.setFilter(UpdateType.MAJOR, filterType);
  }
}
