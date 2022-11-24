const ScaleParameter = {
  MIN: 25,
  MAX: 100,
  STEP: 25,
  START: 100
};

const scaleField = document.querySelector('.img-upload__scale');
const biggerButton = scaleField.querySelector('.scale__control--bigger');
const smallerButton = scaleField.querySelector('.scale__control--smaller');
const scaleValue = document.querySelector('.scale__control--value');
const photoPreview = document.querySelector('.img-upload__preview img');

const resetScale = () => {
  scaleValue.value = `${ScaleParameter.START}%`;
  photoPreview.style.transform = `scale(${scaleValue.value})`;
};

const onPlusButton = () => {
  let valueScale = parseInt(scaleValue.value, Number);
  if (valueScale < ScaleParameter.MAX) {
    photoPreview.style.transform = `scale(${valueScale += ScaleParameter.STEP}%)`;
    scaleValue.value = `${valueScale}%`;
  }
};
const onMinusButton = () => {
  let valueScale = parseInt(scaleValue.value, Number);
  if(valueScale > ScaleParameter.MIN) {
    photoPreview.style.transform = `scale(${valueScale -= ScaleParameter.STEP}%)`;
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
