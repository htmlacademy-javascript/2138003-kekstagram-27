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

const createRandomIdFromRangeGenerator = (min, max) => {
  const previousValues = [];

  return function () {
    let currentValue = getRandomNumber(min, max);
    while (previousValues.includes(currentValue)) {
      currentValue = getRandomNumber(min, max);
    }
    previousValues.push(currentValue);
    return currentValue;
  };
};

const createIdGenerator = () => {
  let lastGeneratedId = 0;

  return function () {
    lastGeneratedId += 1;
    return lastGeneratedId;
  };
};

const debounce = (callback, timeoutDelay = 500) => {
  let timeoutId;
  return (...rest) => {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => callback.apply(this,rest),timeoutDelay);
  };
};

const throttle = (callback, delayBetweenFrames) => {
  let lastTime = 0;
  return (...rest) => {
    const now = new Date();
    if (now - lastTime >= delayBetweenFrames) {
      callback.apply(this, rest);
      lastTime = now;
    }
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

  let resultArray = [];
  while (resultArray.length !== countElement) {
    resultArray.push(getRandomElementArray(array));
    resultArray = Array.from(new Set(resultArray));
  }
  return resultArray;
};

const isEscapeKey = (evt) => evt.key === 'Escape';

const checkStringLength = (string, length) => string.length <= length;

export {getRandomNumber, createRandomIdFromRangeGenerator, createIdGenerator, checkStringLength, isEscapeKey, showErrorAlert, debounce, sortingDiscussed, getRandomArray, throttle };
