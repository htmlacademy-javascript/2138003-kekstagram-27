const PARAMETRS_SCALE = {
  min: 25,
  max: 100,
  step: 25,
  start: 100
};

const scaleField = document.querySelector('.img-upload__scale');
const biggerButton = scaleField.querySelector('.scale__control--bigger');
const smallerButton = scaleField.querySelector('.scale__control--smaller');
const scaleValue = document.querySelector('.scale__control--value');
const photoPreview = document.querySelector('.img-upload__preview img');
let valueScale = parseInt(scaleValue.value, Number);

const resetScale = () => {
  scaleValue.value = `${PARAMETRS_SCALE.start}%`;
  photoPreview.style.transform = `scale(${scaleValue.value})`;
};

const onPlusButton = () => {
  if (valueScale < PARAMETRS_SCALE.max) {
    photoPreview.style.transform = `scale(${valueScale += PARAMETRS_SCALE.step}%)`;
    scaleValue.value = `${valueScale}%`;
  }
};
const onMinusButton = () => {
  if(valueScale > PARAMETRS_SCALE.min) {
    photoPreview.style.transform = `scale(${valueScale -= PARAMETRS_SCALE.step}%)`;
    scaleValue.value = `${valueScale}%`;
  }
};

scaleField.addEventListener('click', (evt) => {
  if (evt.target === biggerButton) {
    onPlusButton();
  }
  if (evt.target === smallerButton) {
    onMinusButton();
  }
});

export {resetScale};
