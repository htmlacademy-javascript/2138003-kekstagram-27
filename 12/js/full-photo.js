import { isEscapeKey } from './util.js';

const ONE_STEP = 5;
let uploadMaximumComment = ONE_STEP;
let buttonMaximumComment = ONE_STEP;
const START_CYCLE_FOR_COMMENT = 0;
const body = document.querySelector('body');
const bigPicture = document.querySelector('.big-picture');
const bigPreview = document.querySelector('.big-picture__img').querySelector('img');
const bigLikes = bigPicture.querySelector('.likes-count');
const selectorComments = bigPicture.querySelector('.social__comments');
const liComments = bigPicture.querySelector('.social__comment');
const bigComments = bigPicture.querySelector('.comments-count');
const bigDescription = bigPicture.querySelector('.social__caption');
const commentCount = bigPicture.querySelector('.social__comment-count');
const buttonLoader = bigPicture.querySelector('.comments-loader');
const spanComment = commentCount.querySelector('.comments-visible');
const cancelButtonBigPhoto = bigPicture.querySelector('.big-picture__cancel');

const hiddenUploadComment = () => {
  if(parseInt(bigComments.firstChild.textContent, Number) <= parseInt(spanComment.textContent, Number) ){
    spanComment.textContent = bigComments.lastChild.textContent;
    buttonLoader.classList.add('hidden');
  }
};

const createComment = (nameComment, startIndex, endIndex) => {
  const commentListFragment = document.createDocumentFragment();
  for(let i = startIndex; i < endIndex; i++){
    const newComment = liComments.cloneNode(true);
    const imgComments = newComment.querySelector('.social__picture');
    const textComments = newComment.querySelector('.social__text');

    imgComments.src = nameComment.comments[i].avatar;
    imgComments.alt = nameComment.comments[i].name;
    textComments.textContent = nameComment.comments[i].message;
    commentListFragment.append(newComment);
  }
  return commentListFragment;
};

const renderBigPhoto = (picture) =>{
  bigPicture.classList.remove('hidden');
  body.classList.add('modal-open');
  selectorComments.innerHTML = '';

  bigPreview.src = picture.url;
  bigLikes.textContent = picture.likes;
  bigComments.textContent = picture.comments.length;
  bigDescription.textContent = picture.description;

  hiddenUploadComment();

  if(bigComments.textContent < ONE_STEP){
    uploadMaximumComment = bigComments.textContent;
  }

  selectorComments.append(createComment(picture, START_CYCLE_FOR_COMMENT, uploadMaximumComment));

  const onClickUploadCommnent = (evt) => {
    evt.preventDefault();
    const numberCurrentComment = parseInt(spanComment.textContent, Number);
    if(bigComments.textContent - spanComment.textContent < ONE_STEP){
      buttonMaximumComment = bigComments.textContent - spanComment.textContent;
    }

    selectorComments.append(createComment(picture, numberCurrentComment, numberCurrentComment + buttonMaximumComment));
    spanComment.textContent = numberCurrentComment + ONE_STEP;
    hiddenUploadComment();
  };
  buttonLoader.addEventListener('click', onClickUploadCommnent);

  const closeBigPhoto = () => {
    bigPicture.classList.add('hidden');
    body.classList.remove('modal-open');
    buttonMaximumComment = ONE_STEP;
    uploadMaximumComment = ONE_STEP;
    buttonLoader.removeEventListener('click', onClickUploadCommnent);
    spanComment.textContent = ONE_STEP;
    buttonLoader.classList.remove('hidden');
  };
  cancelButtonBigPhoto.addEventListener('click', () => {
    closeBigPhoto();
  });
  document.addEventListener('keydown', (evt) => {
    if (isEscapeKey(evt)) {
      closeBigPhoto();
    }
  });
};

export {renderBigPhoto};
