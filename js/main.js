import { renderMiniPhotos } from './thumbnail.js';
import './full-photo.js';
import './user-data-form.js';
import './image-scale.js';
import './effects.js';
import { getData } from './api.js';
import { showErrorAlert, debounce } from './util.js';
import { setFilterClick } from './filters.js';

const RERENDER_DELAY = 500;

getData((data) => {
  renderMiniPhotos(data);
  setFilterClick(data, debounce(renderMiniPhotos, RERENDER_DELAY));
},
() => {
  showErrorAlert('Не удалось загрузить изображения.');
}
);
