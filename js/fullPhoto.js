
const body = document.querySelector('body');
const bigPicture = document.querySelector('.big-picture');
const bigPreview = document.querySelector('.big-picture__img').querySelector('img');
const bigLikes = bigPicture.querySelector('.likes-count');
const selectorComments = bigPicture.querySelector('.social__comments');
const liComments = bigPicture.querySelector('.social__comment');
const bigComments = bigPicture.querySelector('.comments-count');
const bigDescription = bigPicture.querySelector('.social__caption');
const commentCount = bigPicture.querySelector('.social__comment-count');
const commentLoader = bigPicture.querySelector('.comments-loader');
const cancel = bigPicture.querySelector('.big-picture__cancel');

const bigPhoto = (object) =>{
  bigPicture.classList.remove('hidden');
  body.classList.add('modal-open');
  commentCount.classList.add('hidden');
  commentLoader.classList.add('hidden');

  bigPreview.src = object.url;
  bigLikes.textContent = object.likes;
  bigComments.textContent = object.comments.length;
  bigDescription.textContent = object.description;
  const commentListFragment = document.createDocumentFragment();

  object.comments.forEach(({avatar,name,message}) => {
    const newComment = liComments.cloneNode(true);
    const imgComments = newComment.querySelector('.social__picture');
    const textComments = newComment.querySelector('.social__text');
    imgComments.src = avatar;
    imgComments.alt = name;
    textComments.textContent = message;
    commentListFragment.append(newComment);
  });

  selectorComments.innerHTML = '';
  selectorComments.append(commentListFragment);

};

cancel.addEventListener('click', () => {
  bigPicture.classList.add('hidden');
  body.classList.remove('modal-open');
});

document.addEventListener('keydown', (evt) => {
  if (evt.keyCode === 27) {
    bigPicture.classList.add('hidden');
    body.classList.remove('modal-open');
  }
});

export {bigPhoto};
