import {isEscapeKey} from './util.js';

const showMessage = (message, button) => {
  document.body.append(message);

  const closeMessage = () => {
    message.remove();
    window.removeEventListener('keydown', onMessageEscKeyDown);
  };

  button.addEventListener('click', () => {
    closeMessage();
  });

  message.addEventListener('click', (evt) => {
    if(evt.target === message){
      closeMessage();
    }
  });

  function onMessageEscKeyDown(evt) {
    if(isEscapeKey(evt)) {
      evt.preventDefault();
      closeMessage();
    }
  }
  window.addEventListener('keydown', onMessageEscKeyDown);
};

const showSuccessMessage = () => {
  const message = document.querySelector('#success').content.querySelector('.success').cloneNode(true);
  const button = message.querySelector('.success__button');
  showMessage(message, button);
};

const showUploadErrorMessage = () => {
  const message = document.querySelector('#error').content.querySelector('.error').cloneNode(true);
  const button = message.querySelector('.error__button');
  showMessage(message, button);
};

export {showSuccessMessage, showUploadErrorMessage};
