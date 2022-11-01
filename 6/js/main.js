import {similarImage} from './data.js';
import {photos} from './thumbnail.js';
import {bigPhoto} from './fullPhoto.js';

const createImage = similarImage();

photos(createImage);
bigPhoto(createImage);
