import { similarImage } from './data.js';
import { renderMiniPhotos } from './thumbnail.js';
import { renderBigPhoto } from './full-photo.js';
import './user-data-form.js';
import './image-scale.js';
import './effects.js';
import { getData } from './api.js';
import { showErrorAlert, debounce, sortingDiscussed, getRandomArray } from './util.js';
import { setDefaultPhotosClick, setRandomPhotosClick, setDiscussedPhotoClick } from './filters.js';

const RERENDER_DELAY = 500;
const COUNT_RANDOM_PHOTO = 10;

const createImage = similarImage();

getData((data) => {
  renderMiniPhotos(data);
  setDefaultPhotosClick(debounce(
    () => renderMiniPhotos(data),
    RERENDER_DELAY
  ));
  setRandomPhotosClick(debounce(
    () => renderMiniPhotos(getRandomArray(data, COUNT_RANDOM_PHOTO)),
    RERENDER_DELAY
  ));
  setDiscussedPhotoClick(debounce(
    () => renderMiniPhotos(sortingDiscussed(data)),
    RERENDER_DELAY
  ));
},
() => {
  showErrorAlert('Не удалось загрузить изображения.');
}
);

renderBigPhoto(createImage[1]);
