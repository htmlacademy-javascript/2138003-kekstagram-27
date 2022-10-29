import {similarImage} from './data.js';

const pictureContainers = document.querySelector('.pictures');
const pictureTemplate = document.querySelector('#picture').content;
const createImage = similarImage();
const pictureListFragment = document.createDocumentFragment();

createImage.forEach(({url,likes,comments}) => {

  const thumbnailsPicture = pictureTemplate.cloneNode(true);
  thumbnailsPicture.querySelector('.picture__img').src = url;
  thumbnailsPicture.querySelector('.picture__likes').textContent = likes;
  thumbnailsPicture.querySelector('.picture__comments').textContent = comments.length;
  pictureListFragment.appendChild(thumbnailsPicture);
});

pictureContainers.appendChild(pictureListFragment);
