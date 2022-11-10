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

const hideButtonShowMore = (hiddenComments) => {
  if (hiddenComments.length <= ONE_STEP) {
    buttonLoader.classList.add('hidden');
  }
};

const showMore = () => {
  const hidden = selectorComments.querySelectorAll('.hidden');

  for (let i = 0; i < ONE_STEP && i < hidden.length; i++) {
    hidden[i].classList.remove('hidden');
  }
  hideButtonShowMore(hidden);
};

if(spanComment.textContent < bigComments.firstChild.textContent){
  spanComment.textContent = bigComments.firstChild.textContent;
}


const renderBigPhoto = (picture) =>{
  bigPicture.classList.remove('hidden');
  body.classList.add('modal-open');

  bigPreview.src = picture.url;
  bigLikes.textContent = picture.likes;
  bigComments.textContent = picture.comments.length;
  bigDescription.textContent = picture.description;
  if(bigComments.firstChild.textContent <= spanComment.textContent ){
    spanComment.textContent = bigComments.firstChild.textContent;
  }
  const commentListFragment = document.createDocumentFragment();

  picture.comments.forEach(({avatar,name,message}) => {
    const newComment = liComments.cloneNode(true);
    const imgComments = newComment.querySelector('.social__picture');
    const textComments = newComment.querySelector('.social__text');
    imgComments.src = avatar;
    imgComments.alt = name;
    textComments.textContent = message;
    newComment.classList.add('hidden');
    commentListFragment.append(newComment);
  });

  selectorComments.innerHTML = '';
  selectorComments.append(commentListFragment);
  showMore();
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

const onClickUploadCommnent = (evt) => {
  evt.preventDefault();
  showMore();

  if(spanComment.textContent + ONE_STEP >= bigComments.firstChild.textContent){
    spanComment.textContent = parseInt(spanComment.textContent, Number) + ONE_STEP;
  }else {
    spanComment.textContent = bigComments.firstChild.textContent;
  }
};

buttonLoader.addEventListener('click', onClickUploadCommnent);

export {renderBigPhoto};
