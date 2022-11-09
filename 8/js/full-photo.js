import { isEscapeKey } from './util.js';

let commentVisible = 5;
const body = document.querySelector('body');
const bigPicture = document.querySelector('.big-picture');
const bigPreview = document.querySelector('.big-picture__img').querySelector('img');
const bigLikes = bigPicture.querySelector('.likes-count');
const selectorComments = bigPicture.querySelector('.social__comments');
const liComments = bigPicture.querySelector('.social__comment');
const bigComments = bigPicture.querySelector('.comments-count');
const bigDescription = bigPicture.querySelector('.social__caption');
// const commentCount = bigPicture.querySelector('.social__comment-count');// строка комментариев
const buttonLoader = bigPicture.querySelector('.comments-loader'); //кнопка
const spanComment = bigComments.querySelector('.comments-visible'); // спан комментов с 5
const cancelButtonBigPhoto = bigPicture.querySelector('.big-picture__cancel');

const renderBigPhoto = (picture) =>{
  bigPicture.classList.remove('hidden');
  body.classList.add('modal-open');
  // commentCount.classList.add('hidden');
  // buttonLoader.classList.add('hidden');

  bigPreview.src = picture.url;
  bigLikes.textContent = picture.likes;
  bigComments.textContent = picture.comments.length;
  bigDescription.textContent = picture.description;
  const commentListFragment = document.createDocumentFragment();

  picture.comments.forEach(({avatar,name,message}) => {
    const newComment = liComments.cloneNode(true);
    const imgComments = newComment.querySelector('.social__picture');
    const textComments = newComment.querySelector('.social__text');
    imgComments.src = avatar;
    imgComments.alt = name;
    textComments.textContent = message;
    commentListFragment.append(newComment);
    // присваю новым комментарии хидден
    if(commentListFragment.childNodes.length > commentVisible){
      commentListFragment.lastChild.classList.add('hidden');
    }
  });

  selectorComments.innerHTML = '';
  selectorComments.append(commentListFragment);

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

if (liComments.length > commentVisible) {
  for (let i = commentVisible; i < liComments.length; i++) {
    liComments[i].classList.add('hidden');
  }
}

// кнопка должна удалять хидден с невидимых комментарий, начиная с 5
buttonLoader.addEventListener('click',()=>{
  if (liComments.length >= commentVisible + 5) {
    for (let i = commentVisible; i < commentVisible + 5; i++) {
      liComments[i].classList.remove('hidden');
    }
    commentVisible += 5;
  } else if (liComments.length < commentVisible + 5) {
    for (let i = commentVisible; i < liComments.length; i++) {
      liComments[i].classList.remove('hidden');
    }
    commentVisible = liComments.length;
  }
  spanComment.textContent = commentVisible;
});

export {renderBigPhoto};
