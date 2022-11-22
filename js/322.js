import {isEscapeKey} from './util.js';

const COUNT_LOAD_COMMENT = 5;

const body = document.querySelector('body');
const bigPicture = document.querySelector('.big-picture');
const cancelBigPicture = bigPicture.querySelector('.big-picture__cancel');

const bigPreview = document.querySelector('.big-picture__img img');
const bigLikes = bigPicture.querySelector('.likes-count');
const commentsCount = bigPicture.querySelector('.comments-count');
const commentsLoader = bigPicture.querySelector('.comments-loader');
const commentsList = bigPicture.querySelector('.social__comments');
const commentTemplate = bigPicture.querySelector('.social__comment');
const counterLoadComment = bigPicture.querySelector('.social__comment-count');
const bigDescription = bigPicture.querySelector('.social__caption');

const clearPictureCommentsData = () => {
  commentsList.innerHTML = '';
};

const onPopupEscKeydown = (evt) => {
  if (isEscapeKey(evt)) {
    evt.preventDefault();
    closeBigPhoto();
  }
};

function closeBigPhoto () {
  bigPicture.classList.add('hidden');
  body.classList.remove('modal-open');
  clearPictureCommentsData();

  cancelBigPicture.removeEventListener('click', closeBigPhoto);
  document.removeEventListener('keydown', onPopupEscKeydown);
  commentsLoader.removeEventListener('click', closeBigPhoto);
  clearPictureCommentsData ();
}

const createComment = ({avatar, name, message}) => {
  const newComment = commentTemplate.cloneNode(true);

  const imgComments = newComment.querySelector('.social__picture');
  const textComments = newComment.querySelector('.social__text');
  imgComments.src = avatar;
  imgComments.alt = name;
  textComments.textContent = message;

  newComment.classList.add('hidden');
  return newComment;
};
const hideButtonShowMore = (hiddenComments) => {
  if (hiddenComments.length <= COUNT_LOAD_COMMENT) {
    commentsLoader.classList.add('hidden');
  }
};

const showMore = () => {
  const hidden = commentsList.querySelectorAll('.hidden');
  for (let i = 0; i < COUNT_LOAD_COMMENT && i < hidden.length; i++) {
    hidden[i].classList.remove('hidden');
  }
  hideButtonShowMore(hidden);
};

const liveCommentCounter = () => {
  counterLoadComment.textContent = `${commentsCount.textContent - commentsList.querySelectorAll('.hidden').length} из ${commentsCount.textContent} комментариев`;
};

const onClickUploadComment = (evt) => {
  evt.preventDefault();
  showMore();
  liveCommentCounter();
};

const openBigPhoto = ({ url, likes, comments, description }) => {
  bigPicture.classList.remove('hidden');
  body.classList.add('modal-open');
  commentsLoader.classList.remove('hidden');

  bigPreview.src = url;
  bigLikes.textContent = likes;
  commentsCount.textContent = comments.length;
  bigDescription.textContent = description;

  clearPictureCommentsData();

  const commentsListFragment = document.createDocumentFragment();

  for (let i = 0; i < comments.length; i++) {
    const newComment = createComment(comments[i]);
    commentsListFragment.append(newComment);
  }
  commentsList.append(commentsListFragment);

  showMore();
  liveCommentCounter();

  cancelBigPicture.addEventListener('click', closeBigPhoto);

  document.addEventListener('keydown', onPopupEscKeydown);

  commentsLoader.addEventListener('click', onClickUploadComment);
};

export { openBigPhoto };
