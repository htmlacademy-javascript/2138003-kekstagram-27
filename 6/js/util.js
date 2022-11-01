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

const checkStringLength = (string, length) => string.length <= length;

export {getRandomNumber, createRandomIdFromRangeGenerator, createIdGenerator, checkStringLength};
