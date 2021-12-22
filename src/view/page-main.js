import {createElement} from '../render.js';

const createPageMainTemplate = ()=>(`<main class="page-body__page-main  page-main">
<div class="page-body__container">
    <section class="trip-events">
      <h2 class="visually-hidden">Trip events</h2>

    </section>
</div>
</main>`);

export default class PageMain {
  #element = null;

  get element() {
    if (!this.#element) {
      this.#element = createElement(this.template);
    }

    return this.#element;
  }

  get template() {
    return createPageMainTemplate();
  }

  removeElement() {
    this.#element = null;
  }
}
