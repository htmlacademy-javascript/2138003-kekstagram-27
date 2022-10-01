function getRandomNumber(min, max){
  if(min < 0 || max < 0){
    return NaN;
  }
  if(max <= min){
    return NaN;
  }
  if(min <= max){
    return Math.floor(min + Math.random() * (max + 1 - min));
  }
}
getRandomNumber(0,140);
