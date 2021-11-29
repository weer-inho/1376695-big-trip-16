import {createSiteInfoTemplate} from './view/site-menu-info.js';
import {renderTemplate} from './render.js';

const siteMainElement = document.querySelector('.trip-main');

renderTemplate(siteMainElement, createSiteInfoTemplate())