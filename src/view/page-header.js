import {createElement} from '../render.js';

const createPageHeaderTemplate = ()=>(`<header class="page-header">
<div class="page-body__container  page-header__container">
  <img class="page-header__logo" src="img/logo.png" width="42" height="42" alt="Trip logo">

  <div class="trip-main">
    <section class="trip-main__trip-info  trip-info">        
    </section>
    <div class="trip-main__trip-controls  trip-controls">
      <div class="trip-controls__navigation">
        <h2 class="visually-hidden">Switch trip view</h2>
      </div>

      <div class="trip-controls__filters">
        <h2 class="visually-hidden">Filter events</h2>
      </div>
    </div>

    <button class="trip-main__event-add-btn  btn  btn--big  btn--yellow" type="button">New event</button>
  </div>
</div>
</header>
`);

export default class PageHeader {
  #element = null;

  get element() {
    if (!this.#element) {
      this.#element = createElement(this.template);
    }

    return this.#element;
  }

  get template() {
    return createPageHeaderTemplate();
  }

  removeElement() {
    this.#element = null;
  }
}
