import { similarImage } from './data.js';
import { miniPhotos } from './thumbnail.js';
import { renderBigPhoto } from './full-photo.js';
import './user-data-form.js';
import './image-scale.js';
import './effects.js';
import { getData } from './api.js';
import { showErrorAlert } from './util.js';

const createImage = similarImage();

// miniPhotos(createImage);

getData((data) => {
  miniPhotos(data);
},

() => {
  showErrorAlert('Не удалось загрузить изображения.');
}
);

renderBigPhoto(createImage[1]);
