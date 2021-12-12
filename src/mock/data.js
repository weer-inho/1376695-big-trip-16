export const getRandomInteger = (a = 0, b = 1) => {
  const lower = Math.ceil(Math.min(a, b));
  const upper = Math.floor(Math.max(a,b));

  return Math.floor(lower + Math.random() * (upper - lower + 1));
};

export const offerTypes = [
  'taxi',
  'bus',
  'train',
  'ship',
  'drive',
  'flight',
  'check-in',
  'sightseeing',
  'restaurant',
];

export const offer = {
  'taxi': [
    {
      'id' : 1,
      'title': 'Switch to comfort',
      'price': getRandomInteger(0, 100),
      'selected' : Boolean(getRandomInteger(0, 1)),
    }, {
      'id' : 2,
      'title': 'Choose the radio station',
      'price': getRandomInteger(0, 100),
      'selected' : Boolean(getRandomInteger(0, 1))
    }
  ],
  'check-in': [],
  'train': [
    {
      'id' : 1,
      'title': 'Switch to comfort',
      'price': getRandomInteger(0, 100),
      'selected' : Boolean(getRandomInteger(0, 1))
    }, {
      'id' : 2,
      'title': 'Add meal',
      'price': getRandomInteger(0, 100),
      'selected' : Boolean(getRandomInteger(0, 1))
    }, {
      'id' : 3,
      'title': 'Choose seats',
      'price': getRandomInteger(0, 100),
      'selected' : Boolean(getRandomInteger(0, 1))
    }
  ],
  'ship': [
    {
      'id' : 1,
      'title': 'Travel by train',
      'price': getRandomInteger(0, 100),
      'selected' : Boolean(getRandomInteger(0, 1))
    }
  ],
  'drive': [
    {
      'id' : 1,
      'title': 'Choose seats',
      'price': getRandomInteger(0, 100),
      'selected' : Boolean(getRandomInteger(0, 1))
    }, {
      'id' : 2,
      'title': 'Choose the radio station',
      'price': getRandomInteger(0, 100),
      'selected' : Boolean(getRandomInteger(0, 1))
    }, {
      'id' : 3,
      'title': 'Switch to comfort',
      'price': getRandomInteger(0, 100),
      'selected' : Boolean(getRandomInteger(0, 1))
    }
  ],
  'flight': [
    {
      'id' : 1,
      'title': 'Switch to comfort',
      'price': getRandomInteger(0, 100),
      'selected' : Boolean(getRandomInteger(0, 1))
    }, {
      'id' : 2,
      'title': 'Add meal',
      'price': getRandomInteger(0, 100),
      'selected' : Boolean(getRandomInteger(0, 1))
    }, {
      'id' : 3,
      'title': 'Choose seats',
      'price': getRandomInteger(0, 100),
      'selected' : Boolean(getRandomInteger(0, 1))
    }, {
      'id' : 4,
      'title': 'Add luggage',
      'price': getRandomInteger(0, 100),
      'selected' : Boolean(getRandomInteger(0, 1))
    }
  ],
  'bus': [
    {
      'id' : 1,
      'title': 'Switch to comfort',
      'price': getRandomInteger(0, 100),
      'selected' : Boolean(getRandomInteger(0, 1))
    }, {
      'id' : 2,
      'title': 'Add meal',
      'price': getRandomInteger(0, 100),
      'selected' : Boolean(getRandomInteger(0, 1))
    }
  ],
  'sightseeing': [
    {
      'id' : 1,
      'title': 'Add meal',
      'price': getRandomInteger(0, 100),
      'selected' : Boolean(getRandomInteger(0, 1))
    }
  ],
  'restaurant': [
    {
      'id' : 1,
      'title': 'Choose seats',
      'price': getRandomInteger(0, 100),
      'selected' : Boolean(getRandomInteger(0, 1))
    }
  ],
};

export const cities = [
  'Vienna',
  'Vancouver',
  'Munich',
  'Copenhagen',
  'Berlin',
];

export const descriptions = [
  'Lorem ipsum dolor sit amet, consectetur adipiscing elit. ',
  'Cras aliquet varius magna, non porta ligula feugiat eget. ',
  'Fusce tristique felis at fermentum pharetra. ',
  'Aliquam id orci ut lectus varius viverra. ',
  'Nullam nunc ex, convallis sed finibus eget, sollicitudin eget ante. ',
  'Phasellus eros mauris, condimentum sed nibh vitae, sodales efficitur ipsum. ',
  'Sed blandit, eros vel aliquam faucibus, purus ex euismod diam, eu luctus nunc ante ut dui. ',
  'Sed sed nisi sed augue convallis suscipit in sed felis. ',
  'Aliquam erat volutpat. ',
  'Nunc fermentum tortor ac porta dapibus. In rutrum ac purus sit amet tempus. ',
];
