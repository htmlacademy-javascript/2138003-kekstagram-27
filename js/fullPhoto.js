import {photos} from './thumbnail.js';
const body = document.querySelector('body');
const bigPicture = document.querySelector('.big-picture');
const bigPreview = document.querySelector('.big-picture__img').querySelector('img');
const bigLikes = bigPicture.querySelector('.likes-count');
const selectorComments = bigPicture.querySelector('.social__comments');
const liComments = bigPicture.querySelector('.social__comment');
const bigComments = bigPicture.querySelector('.comments-count');
const bigDescription = bigPicture.querySelector('.social__caption');

bigPicture.classList.remove('hidden');
body.classList.add('modal-open');

const bigPhoto = (data) =>{
  bigPreview.src = data.url;
  bigLikes.textContent = data.likes;
  bigComments.textContent = data.comments;
  bigDescription.textContent = data.description;
  const commentListFragment = document.createDocumentFragment();

  //console.log(data[0].comments);

  for (let i = 0; i < data[0].comments.length; i++){
    const newComment = liComments.cloneNode(true);
    const imgComments = newComment.querySelector('.social__picture');
    const textComments = newComment.querySelector('.social__text');

    imgComments.src = data.comments[i].avatar;
    imgComments.alt = data.comments[i].name;
    textComments.textContent = data.comments[i].message;
    commentListFragment.append(newComment);
  }
  selectorComments.innerHTML = '';
  selectorComments.append(commentListFragment);

};

bigPhoto(photos());

export {bigPhoto};
