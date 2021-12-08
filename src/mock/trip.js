import dayjs from 'dayjs';
const offerTypes = ['taxi', 'bus', 'train', 'ship', 'drive', 'flight', 'check-in', 'sightseeing', 'restaurant'];

const getRandomInteger = (a = 0, b = 1) => {
  const lower = Math.ceil(Math.min(a, b));
  const upper = Math.floor(Math.max(a,b));

  return Math.floor(lower + Math.random() * (upper - lower + 1));
};

const generateCity = () => {
  const cities = [
    'Malmo',
    'Sidney',
    'Erevan',
    'Minsk',
    'London',
    'Copenghagen',
    'Montreal',
    'Oslo',
    'Krarov'
  ];

  const randomIndex = getRandomInteger(0, cities.length - 1);
  return cities[randomIndex];
};

const generateDestination = () => {
  const destinations = [
    'Lorem ipsum dolor sit amet, consectetur adipiscing elit',
    'Cras aliquet varius magna, non porta ligula feugiat eget',
    'Fusce tristique felis at fermentum pharetra',
    'Aliquam id orci ut lectus varius viverra',
    'Nullam nunc ex, convallis sed finibus eget, sollicitudin eget ante',
    'Phasellus eros mauris, condimentum sed nibh vitae, sodales efficitur ipsum',
    'Sed blandit, eros vel aliquam faucibus, purus ex euismod diam, eu luctus nunc ante ut dui-in',
  ];

  const randomIndex = getRandomInteger(0, destinations.length - 1);
  return {
    description: destinations[randomIndex],
    name: generateCity(),
    pictures: [
      {
        src: `http://picsum.photos/248/152?r=${getRandomInteger(0, 100)}`,
        description: destinations[randomIndex],
      }
    ]
  };
};

const generateOffer = () => (
  {
    type: offerTypes[getRandomInteger(0, offerTypes.length)],
    offers: [
      {
        id: getRandomInteger(0, 10),
        title: 'Upgrade to a business class',
        price: 120
      }, {
        id: getRandomInteger(0, 10),
        title: 'Choose the radio station',
        price: 60
      }
    ]
  }
);

const generateDate = () => {
  const maxDaysGap = 365;
  const daysGap = getRandomInteger(-maxDaysGap, maxDaysGap);

  return dayjs().add(daysGap, 'day').toDate();
};

const generatePoint = () => {
  const offer = generateOffer();
  const destination = generateDestination();

  return {
    basePrice: getRandomInteger(500, 15000),
    dateFrom: generateDate(),
    dateTo: generateDate(),
    destination,
    id: '0',
    isFavorite: Boolean(getRandomInteger()),
    offer,
    type: offerTypes[getRandomInteger(0, offerTypes.length)],
  };
};

export const generateTrip = () => ({
  point: generatePoint(),
  city: generateCity(),
});
