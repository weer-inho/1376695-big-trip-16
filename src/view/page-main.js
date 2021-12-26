import AbstractView from './abstract-view.js';

const createPageMainTemplate = ()=>(`<main class="page-body__page-main  page-main">
<div class="page-body__container">
    <section class="trip-events">
      <h2 class="visually-hidden">Trip events</h2>

    </section>
</div>
</main>`);

export default class PageMain extends AbstractView {
  get template() {
    return createPageMainTemplate();
  }
}
