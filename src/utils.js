import AbstractView from './view/abstract-view';
import flatpickr from 'flatpickr';

export const RenderPosition = {
  BEFOREBEGIN: 'beforebegin',
  AFTERBEGIN: 'afterbegin',
  BEFOREEND: 'beforeend',
  AFTEREND: 'afterend',
};

export const render = (container, element, place = RenderPosition.BEFOREEND) => {
  const parent = container instanceof AbstractView ? container.element : container;
  const child = element instanceof AbstractView ? element.element : element;

  switch (place) {
    case RenderPosition.BEFOREBEGIN:
      parent.before(child);
      break;
    case RenderPosition.AFTERBEGIN:
      parent.prepend(child);
      break;
    case RenderPosition.BEFOREEND:
      parent.append(child);
      break;
    case RenderPosition.AFTEREND:
      parent.after(child);
      break;
  }
};

export const replace = (newElement, oldElement) => {
  if (newElement === null || oldElement === null) {
    throw new Error('cant replace unexisting elements');
  }

  const newChild = newElement instanceof AbstractView ? newElement.element : newElement;
  const oldChild = oldElement instanceof AbstractView ? oldElement.element : oldElement;

  const parent = oldChild.parentElement;

  if (parent === null) {
    throw new Error ('parent element does not exist');
  }

  parent.replaceChild(newChild, oldChild);
};

export const remove = (component) => {
  if (component === null) {
    return;
  }

  if (!(component instanceof AbstractView)) {
    throw new Error('can remove only components');
  }

  component.element.remove();
  component.removeElement();
};

export const createElement = (template) => {
  const newElement = document.createElement('div');
  newElement.innerHTML = template;

  return newElement.firstChild;
};

export const updateItem = (items, update) => {
  const index = items.findIndex((item) => item.id === update.id);

  if (index === -1) {
    return items;
  }

  return [
    ...items.slice(0, index),
    update,
    ...items.slice(index + 1),
  ];
};

export const getThreeRoutePoints = (array) => [array[0], array[1], array[array.length - 1]];
export const getTotalCost = (array) => array.reduce((accumulator, trip) => accumulator + trip.price, 0);

export const DATE_FORMAT = 'd/m/Y H:i';
export const makePicker = (target, initialValue, onChange)=>flatpickr(target,{dateFormat:DATE_FORMAT, defaultDate: initialValue, onChange});

export const UserAction = {
  UPDATE_TRIP: 'UPDATE_TRIP',
  ADD_TRIP: 'ADD_TRIP',
  DELETE_TRIP: 'DELETE_TRIP',
};

export const UpdateType = {
  PATCH: 'PATCH',
  MINOR: 'MINOR',
  MAJOR: 'MAJOR',
};

export const FilterType = {
  EVERYTHING: 'EVERYTHING',
  FUTURE: 'FUTURE',
  PAST: 'PAST',
};

export const testEditObject = {
  'id': 'UgUoiHHwUOLEb6m8eqIdW',
  'typePoint': 'taxi',
  'destinationCity': 'Vienna',
  'offers': [
    {
      'id': 1,
      'title': 'Switch to comfort',
      'price': 74,
      'selected': false
    },
    {
      'id': 2,
      'title': 'Choose the radio station',
      'price': 1,
      'selected': true
    }
  ],
  'destination': 'Sed sed nisi sed augue convallis suscipit in sed felis. ',
  'photos': [
    'http://picsum.photos/248/152?r=15',
    'http://picsum.photos/248/152?r=85',
    'http://picsum.photos/248/152?r=21',
    'http://picsum.photos/248/152?r=21'
  ],
  'price': 548,
  'startDate': '2022-01-23T03:44:38.211Z',
  'endDate': '2022-01-26T22:41:38.211Z',
  'isFavorite': true,
};
