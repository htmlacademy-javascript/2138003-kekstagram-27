import { isEscapeKey } from './util.js';

const ONE_STEP = 5;
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
const commentListFragment = document.createDocumentFragment();
const hidden = () => {if(Number(bigComments.firstChild.textContent) <= Number(spanComment.textContent) ){
  spanComment.textContent = bigComments.lastChild.textContent;
  buttonLoader.classList.add('hidden');
}};

const createComment = (nameComment, indexComment) => {
  const newComment = liComments.cloneNode(true);
  const imgComments = newComment.querySelector('.social__picture');
  const textComments = newComment.querySelector('.social__text');

  imgComments.src = nameComment.comments[indexComment].avatar;
  imgComments.alt = nameComment.comments[indexComment].name;
  textComments.textContent = nameComment.comments[indexComment].message;
  commentListFragment.append(newComment);
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

  for (let i = 0; i < bigComments.textContent && i < ONE_STEP; i++){
    createComment(picture, i);
  }
  selectorComments.innerHTML = '';
  selectorComments.append(commentListFragment);

  const onClickUploadCommnent = (evt) => {
    evt.preventDefault();
    let page = 5;
    if(bigComments.textContent - spanComment.textContent < ONE_STEP){
      page = bigComments.textContent - spanComment.textContent;
    }
    for (let i = parseInt(spanComment.textContent, Number); i < parseInt(spanComment.textContent, Number) + page; i++){
      createComment(picture, i);
    }
    spanComment.textContent = parseInt(spanComment.textContent, Number) + ONE_STEP;
    selectorComments.append(commentListFragment);
    hidden();
  };
  buttonLoader.addEventListener('click', onClickUploadCommnent);
};

cancelButtonBigPhoto.addEventListener('click', () => {
  bigPicture.classList.add('hidden');
  body.classList.remove('modal-open');
});

document.addEventListener('keydown', (evt) => {
  if (isEscapeKey(evt)) {
    bigPicture.classList.add('hidden');
    body.classList.remove('modal-open');
  }
});

export {renderBigPhoto};
