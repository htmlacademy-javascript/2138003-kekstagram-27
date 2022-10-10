function getRandomNumber(min, max){
  if(min < 0 || max < 0 || max <= min){
    return NaN;
  }

  return Math.floor(min + Math.random() * (max + 1 - min));
}

function checkStringLength (string, length) {
  return string.length <= length;
}

checkStringLength();

const getRandomArrayElement = (elements) => elements[getRandomNumber(0, elements.length - 1)];

function createIdGenerator () {
  let lastGeneratedId = 0;

  return function () {
    lastGeneratedId += 1;
    return lastGeneratedId;
  };
}

const ID = createIdGenerator();
const DESCRIPTION_GENERATOR = createIdGenerator();
const PHOTO_GENERATION = createIdGenerator();

const PHOTO = () => `photos/{${PHOTO_GENERATION()}}.jpg`;

const DESCRIPTION = ['Летний пляж',
  'Где-то там есть пляж',
  'Необитаемый остров',
  'Девушка',
  'Семейный обед',
  'McLaren',
  'Клубничка',
  'Компот',
  'Отдых на море',
  'Обувь',
  'Проход',
  'Audio',
  'Салат с лососем',
  'Не ешь, подумой',
  'Модные валенки',
  'Гималаи',
  'Оркестр',
  'Машина 90-х',
  'Тапочки с фонариками',
  'Вечер в отпуске',
  'Ужин',
  'Морской закат',
  'Крабик',
  'Концерт',
  'Джиппинг'
];

const LIKES = () => getRandomNumber(25,200);

const image = () => ({
  id: ID(),
  url: PHOTO(),
  description: DESCRIPTION[DESCRIPTION_GENERATOR() - 1],
  likes: LIKES()
});

function createRandomIdFromRangeGenerator (min, max) {
  const previousValues = [];

  return function () {
    let currentValue = getRandomNumber(min, max);
    while (previousValues.includes(currentValue)) {
      currentValue = getRandomNumber(min, max);
    }
    previousValues.push(currentValue);
    return currentValue;
  };
}

const COMMENTS_ID = createRandomIdFromRangeGenerator(1, 500);

const MESSAGE = ['Всё отлично!',
  'В целом всё неплохо. Но не всё.',
  'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.',
  'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.',
  'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.',
  'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!'];

const AVATAR = () => `img/avatar-{${getRandomNumber(1, 6)}}.svg`;

const NAME = [
  'Артём',
  'Михаил',
  'Константин',
  'Елизавета',
  'Алёна',
  'Данил',
  'Игорь'
];

const comments = () => ({
  commentsId: COMMENTS_ID(),
  message:getRandomArrayElement(MESSAGE),
  avatar:AVATAR(),
  name:getRandomArrayElement(NAME)
});

const SIMILAR_COUNT_COMMENT = 5;

const similarcomment = Array.from({length: SIMILAR_COUNT_COMMENT}, comments);

const SIMILAR_COUNT = 25;

const similarImage = Array.from({length: SIMILAR_COUNT}, image);

similarcomment();

similarImage();
