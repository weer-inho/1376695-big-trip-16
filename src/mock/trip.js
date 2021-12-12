import dayjs from 'dayjs';
import {offerTypes, offer, cities, descriptions, getRandomInteger} from './data.js';

const generateDestination = () => {
  let description = '';
  const randomValue = getRandomInteger(1, 5);
  for (let i = 0; i < randomValue; i++) {
    const randomIndex = getRandomInteger(0, descriptions.length - 1);
    description = description + descriptions[randomIndex];
  }
  return description;
};

const generateTypePoint = () => {
  const randomIndex = getRandomInteger(0, offerTypes.length - 1);

  return offerTypes[randomIndex];
};

const generatePhoto = () => {
  const photos = [];
  for (let i = 0; i < getRandomInteger(1,10); i++) {
    photos.push(`http://picsum.photos/248/152?r=${Math.floor(Math.random()*100)}`);
  }
  return photos;
};

export const formatTime = (time) => (String(time).length === 1) ? `0${time}` : time;

export const getDuration = (startDate, endDate) => {
  const days = dayjs(endDate).diff(startDate, 'd');
  const hours = dayjs(endDate).diff(startDate, 'h') - days*24;
  const minutes = dayjs(endDate).diff(startDate, 'm') - days*24*60 - hours*60;

  if (days === 0 && hours === 0) {
    return `${formatTime(minutes)}M`;
  }

  if (days === 0 ) {
    return `${formatTime(hours)}H ${formatTime(minutes)}M`;
  }

  return `${formatTime(days)}D ${formatTime(hours)}H ${formatTime(minutes)}M`;
};

export const generateTrip = () => {
  const typePoint= generateTypePoint();

  return {
    typePoint,
    destinationCity: cities[getRandomInteger(0, cities.length - 1)],
    offers: offer[typePoint],
    destination: generateDestination(),
    photos: generatePhoto(),
    price: getRandomInteger(1, 10000),
    startDate: dayjs().add(- Math.floor(Math.random()*10000), 'minute').toDate(),
    endDate: dayjs().add(Math.floor(Math.random()*1000), 'minute').toDate(),
    isFavorite: Boolean(getRandomInteger(0,1)),
  };
};

