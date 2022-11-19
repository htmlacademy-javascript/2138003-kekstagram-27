import { checkStringLength, isEscapeKey } from './util.js';
import { resetScale } from './image-scale.js';
import { resetEffects } from './effects.js';
import { sendData } from './api.js';

const MAX_LENGTH_COMMENT = 140;
const MAX_COUNT_HASHTAGS = 5;
const MAX_LENGTH_HASHTAG = 20;
const body = document.querySelector('body');
const uploadForm = document.querySelector('#upload-select-image');
const fileField = document.querySelector('#upload-file');
const hashtagInput = uploadForm.querySelector('.text__hashtags');
const commentInput = uploadForm.querySelector('.text__description');
const form = document.querySelector('.img-upload__form');
const uploadOverlay = uploadForm.querySelector('.img-upload__overlay');
const cancelButtonRenderPicture = form.querySelector('#upload-cancel');
const simbolHashtag = /^#[A-Za-zА-яа-яЁё0-9]{1,19}$/;
const validHashtag = (hashtag) => simbolHashtag.test(hashtag);

const pristine = new Pristine(form, {
  classTo: 'img-upload__field-wrapper',
  errorClass: 'img-upload__field-wrapper--invalid',
  successClass: 'img-upload__field-wrapper-valid',
  errorTextParent: 'img-upload__field-wrapper',
  errorTextTag: 'div',
  errorTextClass: 'img-upload__field-wrapper-error'
});

const validateSymbolsHashtag = (value) => {
  const hashtagsArray = value.trim().split(' ');
  return hashtagsArray.every(validHashtag);
};

const validateDoubleHashtag = (value) => {
  const lowerCaseTags = value.map((values) => values.toLowerCase());
  return lowerCaseTags.length === new Set(lowerCaseTags).size;
};

const validateCountHashtag = (value) => value.length <= MAX_COUNT_HASHTAGS;

const validateTags = (value) => {
  const hashtagsArray = value.trim().split(' ').filter((tag) => tag.trim().length);
  return hashtagsArray.every(validateSymbolsHashtag);
};
const validateTagDouble = (value) => {
  const hashtagsArray = value.trim().split(' ').filter((tag) => tag.trim().length);
  return validateDoubleHashtag(hashtagsArray);
};
const validateTagCountHashtag = (value) => {
  const hashtagsArray = value.trim().split(' ').filter((tag) => tag.trim().length);
  return validateCountHashtag(hashtagsArray);
};

const validateComment = (value) => checkStringLength(value, MAX_LENGTH_COMMENT);

pristine.addValidator(hashtagInput, validateTags, `Хэштег должен начинаться с #. Максимальная длина хэштега ${MAX_LENGTH_HASHTAG} символов.`);
pristine.addValidator(hashtagInput, validateTagCountHashtag, `Разрешено использовать не более ${MAX_COUNT_HASHTAGS} хэштегов.`);
pristine.addValidator(hashtagInput, validateTagDouble, 'Хэштеги не должны дублироваться');
pristine.addValidator(commentInput, validateComment, `Максимальная длина комментария не более ${MAX_LENGTH_COMMENT} символов.`);

const checkingForFocus = () => document.activeElement === hashtagInput || document.activeElement === commentInput;

const hideForm = () => {
  form.reset();
  pristine.reset();
  uploadOverlay.classList.add('hidden');
  body.classList.remove('modal-open');
};

const onEscKeyDown = (evt) => {
  if (isEscapeKey(evt) && !checkingForFocus()) {
    evt.preventDefault();
    hideForm();
  }
};

const showForm = () => {
  uploadOverlay.classList.remove('hidden');
  body.classList.add('modal-open');
  document.addEventListener('keydown', onEscKeyDown);
  resetScale();
  resetEffects();
};

const onFileInputChange = () => {
  showForm();
};

const oncloselButtonClick = () => {
  hideForm ();
};

const onFormSubmit = (evt) => {

  evt.preventDefault();
  const isValid = pristine.validate();
  if(isValid) {
    const formData = new FormData(evt.target);
    sendData(formData);
  }
};

fileField.addEventListener('change', onFileInputChange);
cancelButtonRenderPicture.addEventListener('click', oncloselButtonClick);
form.addEventListener('submit', onFormSubmit);

export { hideForm };
