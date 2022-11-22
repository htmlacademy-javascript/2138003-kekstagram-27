import { isEscapeKey } from './util.js';


const ONE_STEP = 5;
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
const numberCurrentComment = parseInt(spanComment.textContent, Number);
const commentListFragment = document.createDocumentFragment();

let buttonMaximumComment = 5;

const hidden = () => {
  if(parseInt(bigComments.firstChild.textContent, Number) <= parseInt(spanComment.textContent, Number) ){
    spanComment.textContent = bigComments.lastChild.textContent;
    buttonLoader.classList.add('hidden');
  } else {
    spanComment.textContent = 5;
    buttonLoader.classList.remove('hidden');
  }
};

const createComment = (nameComment, startIndex, endIndex) => {
  for(let i = startIndex; i < endIndex; i++){
    const newComment = liComments.cloneNode(true);
    const imgComments = newComment.querySelector('.social__picture');
    const textComments = newComment.querySelector('.social__text');

    imgComments.src = nameComment.comments[i].avatar;
    imgComments.alt = nameComment.comments[i].name;
    textComments.textContent = nameComment.comments[i].message;
    commentListFragment.append(newComment);
  }
};

const renderBigPhoto = (picture) =>{
  bigPicture.classList.remove('hidden');
  body.classList.add('modal-open');
  selectorComments.innerHTML = '';

  bigPreview.src = picture.url;
  bigLikes.textContent = picture.likes;
  bigComments.textContent = picture.comments.length;
  bigDescription.textContent = picture.description;

  hidden();

  const xx = () => {
    let initialMaximumComment = 5;
    if(bigComments.textContent < ONE_STEP){
      initialMaximumComment = bigComments.textContent;
    }
    createComment(picture, START_CYCLE_FOR_COMMENT, initialMaximumComment);
  };
  xx();
  selectorComments.innerHTML = '';
  selectorComments.append(commentListFragment);

  const onClickUploadCommnent = (evt) => {
    evt.preventDefault();
    if(bigComments.textContent - spanComment.textContent < ONE_STEP){
      buttonMaximumComment = bigComments.textContent - spanComment.textContent;
    }

    createComment(picture, numberCurrentComment, numberCurrentComment + buttonMaximumComment);
    spanComment.textContent = numberCurrentComment + ONE_STEP;
    selectorComments.append(commentListFragment);
    hidden();
  };
  buttonLoader.addEventListener('click', onClickUploadCommnent);
  cancelButtonBigPhoto.addEventListener('click', () => {
    bigPicture.classList.add('hidden');
    body.classList.remove('modal-open');
    buttonMaximumComment = 5;
  });

  document.addEventListener('keydown', (evt) => {
    if (isEscapeKey(evt)) {
      bigPicture.classList.add('hidden');
      body.classList.remove('modal-open');
      buttonMaximumComment = 5;
    }
  });
};

export {renderBigPhoto};
