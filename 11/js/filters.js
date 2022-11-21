const filterForm = document.querySelector('.img-filters__form');
const defaultButton = filterForm.querySelector('#filter-default');
const randomButton = filterForm.querySelector('#filter-random');
const discussedButton = filterForm.querySelector('#filter-discussed');

const toggleFilter = (choosen) => {
  const currentFilter = document.querySelector('.img-filters__button--active');
  currentFilter.classList.remove('img-filters__button--active');
  choosen.classList.add('img-filters__button--active');
};

const setDefaultPhotosClick = (callback) => {
  defaultButton.addEventListener('click', (evt) => {
    toggleFilter(evt.target);
    callback();
  });
};

const setRandomPhotosClick = (callback) => {
  randomButton.addEventListener('click', (evt) => {
    toggleFilter(evt.target);
    callback();
  });
};

const setDiscussedPhotoClick = (callback) => {
  discussedButton.addEventListener('click', (evt) => {
    toggleFilter(evt.target);
    callback();
  });
};

export { setDefaultPhotosClick, setRandomPhotosClick, setDiscussedPhotoClick };
