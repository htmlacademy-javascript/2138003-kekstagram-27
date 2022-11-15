import { similarImage } from './data.js';
import { miniPhotos } from './thumbnail.js';
import { renderBigPhoto } from './full-photo.js';
import './user-data-form.js';
import './image-scale.js';
import './effects.js';

const createImage = similarImage();

miniPhotos(createImage);

renderBigPhoto(createImage[1]);
