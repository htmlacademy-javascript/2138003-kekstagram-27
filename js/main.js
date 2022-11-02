import {similarImage} from './data.js';
import {miniPhotos} from './thumbnail.js';
import {bigPhoto} from './fullPhoto.js';

const createImage = similarImage();

miniPhotos(createImage);

bigPhoto(createImage[1]);
