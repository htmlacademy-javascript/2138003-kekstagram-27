const EFFECTS = [
  {
    name: 'none',
    min: 0,
    max: 100,
    step: 1,
    unit:''
  }, {
    name: 'chrome',
    style: 'grayscale',
    min: 0,
    max: 1,
    step: 0.1,
    unit: ''
  },
  {
    name: 'sepia',
    style: 'sepia',
    min: 0,
    max: 1,
    step: 0.1,
    unit: '',
  },
  {
    name: 'marvin',
    style: 'invert',
    min: 0,
    max: 100,
    step: 1,
    unit: '%',
  },
  {
    name: 'phobos',
    style: 'blur',
    min: 0,
    max: 3,
    step: 0.1,
    unit: 'px',
  },
  {
    name: 'heat',
    style: 'brightness',
    min: 1,
    max: 3,
    step: 0.1,
    unit: '',
  },
];

const imgUploadSection = document.querySelector('.img-upload__overlay');
const form = document.querySelector('.img-upload__form');
const slider = imgUploadSection.querySelector('.effect-level__slider');
const photoPreview = form.querySelector('.img-upload__preview img');
const effectLevel = form.querySelector('.effect-level__value');
const depthSliderEffect = form.querySelector('.img-upload__effect-level');

const noneEffect = EFFECTS[0];
let chosenEffect = noneEffect;
const isDefault = () => chosenEffect === noneEffect;

const updateSlider = () => {
  depthSliderEffect.classList.remove('hidden');
  slider.noUiSlider.updateOptions({
    range: {
      min: chosenEffect.min,
      max: chosenEffect.max,
    },
    step: chosenEffect.step,
    start: chosenEffect.max,
  });
  if (isDefault()) {
    depthSliderEffect.classList.add('hidden');
  }
};

const onFormChangeEffect = (evt) => {
  if (!evt.target.classList.contains('effects__radio')) {
    return;
  }
  chosenEffect = EFFECTS.find((effect) => effect.name === evt.target.value);
  updateSlider();
};

const onSliderUpdate = () => {
  const sliderValue = slider.noUiSlider.get();
  photoPreview.style.filter = 'none';
  photoPreview.className = '';
  effectLevel.value = '';
  if (isDefault()) {
    return;
  }
  photoPreview.style.filter = `${chosenEffect.style}(${sliderValue}${chosenEffect.unit})`;
  photoPreview.classList.add(`effects__preview--${chosenEffect.name}`);
  effectLevel.value = sliderValue;
};

const resetEffects = () => {
  chosenEffect = noneEffect;
  updateSlider();
};

window.noUiSlider.create(slider, {
  range: {
    min: noneEffect.min,
    max: noneEffect.max,
  },
  start: noneEffect.max,
  step: noneEffect.step,
  connect: 'lower'
});
updateSlider();

form.addEventListener('change', onFormChangeEffect);
slider.noUiSlider.on('update', onSliderUpdate);

export {resetEffects};
