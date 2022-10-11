function getRandomNumber(min, max){
  if(min < 0 || max < 0 || max <= min){
    return NaN;
  }

  return Math.floor(min + Math.random() * (max + 1 - min));
}

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

const checkStringLength = (string, length) => string.length <= length;

checkStringLength(0, 140);

const getRandomArrayElement = (elements) => elements[getRandomNumber(0, elements.length - 1)];

function createIdGenerator () {
  let lastGeneratedId = 0;

  return function () {
    lastGeneratedId += 1;
    return lastGeneratedId;
  };
}

const getPhotoId = createIdGenerator();
const getDescription = createIdGenerator();
const getPhotoIdGeneration = createIdGenerator();
const getPhotoAddress = (index) => `photos/${index}.jpg`;
const MIN_LIKE = 25;
const MAX_LIKE = 200;
const LIKES = () => getRandomNumber(MIN_LIKE, MAX_LIKE);
const MIN_ID_COMMENT = 1;
const MAX_ID_COMMENT = 500;
const getCommentId = createRandomIdFromRangeGenerator(MIN_ID_COMMENT, MAX_ID_COMMENT);
const getAvatarAddress = () => `img/avatar-${getRandomNumber(1, 6)}.svg`;
const SIMILAR_COUNT_COMMENT = () => getRandomNumber(1, 5);
const SIMILAR_COUNT_IMAGE = 25;

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

const MESSAGE = ['Всё отлично!',
  'В целом всё неплохо. Но не всё.',
  'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.',
  'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.',
  'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.',
  'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!'];

const NAME = ['Артём','Михаил','Константин','Елизавета','Алёна','Данил','Игорь','Саша','Артур','Мария'];

const COMMENT = () => ({
  commentsId: getCommentId(),
  message:getRandomArrayElement(MESSAGE),
  avatar:getAvatarAddress(),
  name:getRandomArrayElement(NAME)
});

const similarComment = () => Array.from({length: SIMILAR_COUNT_COMMENT()}, COMMENT);

const image = () => ({
  id: getPhotoId(),
  url: getPhotoAddress(getPhotoIdGeneration()),
  description: DESCRIPTION[getDescription() - 1],
  likes: LIKES(),
  comments: similarComment()
});

const similarImage = Array.from({length: SIMILAR_COUNT_IMAGE}, image);

// eslint-disable-next-line
similarImage;
