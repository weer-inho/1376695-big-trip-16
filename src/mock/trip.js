const getRandomInteger = (a = 0, b = 1) => {
  const lower = Math.ceil(Math.min(a, b));
  const upper = Math.floor(Math.max(a,b));

  return Math.floor(lower + Math.random() * (upper - lower + 1));
};

const generateRoutePoint = () => {
  const routePoints = [
    'Taxi',
    'Bus',
    'Train',
    'Ship',
    'Drive',
    'Flight',
    'Check-in',
    'Sightseeing',
    'Restaurant'
  ];

  const randomIndex = getRandomInteger(0, routePoints.length - 1);
  return routePoints[randomIndex];
};

export const generateTrip = () => ({
  routePoint: generateRoutePoint(),
  city: null,
  options: {
    luggage: false,
    comfort: false,
    meal: false,
    chooseSeats: false,
    train: false,
  },
  photo: null,
  time: null,
  isFavorite: null,
  price: null,
});
