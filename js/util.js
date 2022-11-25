const ALERT_SHOW_TIME = 5000;

const showErrorAlert = (message) => {
  const alertContainer = document.createElement('div');
  alertContainer.style.position = 'absolute';
  alertContainer.style.width = '100%';
  alertContainer.style.top = '0';
  alertContainer.style.padding = '10px 5px';
  alertContainer.style.fontSize = '22px';
  alertContainer.style.textAlign = 'center';
  alertContainer.style.backgroundColor = 'Crimson';

  alertContainer.textContent = message;
  document.body.append(alertContainer);

  setTimeout(() => {
    alertContainer.remove();
  }, ALERT_SHOW_TIME);
};

const getRandomNumber = (min, max) => {
  if(min < 0 || max < 0 || max <= min){
    return NaN;
  }
  return Math.floor(min + Math.random() * (max + 1 - min));
};

const debounce = (callback, timeoutDelay = 500) => {
  let timeoutId;
  return (...rest) => {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => callback.apply(this,rest),timeoutDelay);
  };
};

const comparePhotos = (photoA, photoB) => {
  const commentA = photoA.comments.length;
  const commentB = photoB.comments.length;
  return commentB - commentA;
};

const sortingDiscussed = (photos) => photos.slice().sort(comparePhotos);

const getRandomElementArray = (array) => array[getRandomNumber(0, array.length - 1)];
const getRandomArray = (array, countElement) => {
  if (array.length <= countElement) {
    return array;
  }

  let results = [];
  while (results.length !== countElement) {
    results.push(getRandomElementArray(array));
    results = Array.from(new Set(results));
  }
  return results;
};

const isEscapeKey = (evt) => evt.key === 'Escape';

const checkStringLength = (string, length) => string.length <= length;

export { checkStringLength, isEscapeKey, showErrorAlert, debounce, sortingDiscussed, getRandomArray };
