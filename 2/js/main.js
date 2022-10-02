function getRandomNumber(min, max){
  if(min < 0 || max < 0 || max <= min){
    return NaN;
  }

  return Math.floor(min + Math.random() * (max + 1 - min));

}
getRandomNumber(0,140);
