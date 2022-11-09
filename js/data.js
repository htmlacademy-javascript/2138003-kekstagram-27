import {getRandomNumber, createRandomIdFromRangeGenerator, createIdGenerator} from './util.js';

const MIN_LIKE = 25;
const MAX_LIKE = 200;
const MIN_ID_COMMENT = 1;
const MAX_ID_COMMENT = 500;
const SIMILAR_COUNT_IMAGE = 25;
const MIN_ID_AVATAR_ADDRESS = 1;
const MAX_ID_AVATAR_ADDRESS = 6;
const MIN_SIMILAR_COMMENT = 1;
const MAX_SIMILAR_COMMENT = 5;

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

const names = ['Артём','Михаил','Константин','Елизавета','Алёна','Данил','Игорь','Саша','Артур','Мария'];

const getRandomArrayElement = (elements) => elements[getRandomNumber(0, elements.length - 1)];

const getPhotoId = createIdGenerator();
const getDescription = createIdGenerator();
const getPhotoIdGeneration = createIdGenerator();
const getPhotoAddress = (index) => `photos/${index}.jpg`;
const getCommentId = createRandomIdFromRangeGenerator(MIN_ID_COMMENT, MAX_ID_COMMENT);
const getAvatarAddress = (min,max) => `img/avatar-${getRandomNumber(min, max)}.svg`;

const comment = () => ({
  id: getCommentId(),
  message:getRandomArrayElement(MESSAGE),
  avatar:getAvatarAddress(MIN_ID_AVATAR_ADDRESS, MAX_ID_AVATAR_ADDRESS),
  name:getRandomArrayElement(names)
});

const similarComment = () => Array.from({length: getRandomNumber(MIN_SIMILAR_COMMENT, MAX_SIMILAR_COMMENT)}, comment);

const image = () => ({
  id: getPhotoId(),
  url: getPhotoAddress(getPhotoIdGeneration(MIN_ID_AVATAR_ADDRESS, MAX_ID_AVATAR_ADDRESS)),
  description: DESCRIPTION[getDescription() - 1],
  likes: getRandomNumber(MIN_LIKE, MAX_LIKE),
  comments: similarComment()
});

const similarImage = () => Array.from({length: SIMILAR_COUNT_IMAGE}, image);

export {similarImage};
