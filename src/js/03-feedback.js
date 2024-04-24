import throttle from 'lodash.throttle';
import lodash from 'lodash.throttle';

const form = document.querySelector('.feedback-form');
const emailEl = document.querySelector('[name="email"]');
const messageEl = document.querySelector('[name="message"]');
const STORAGE_KEY = 'feedback-form-state';

function onPageReload() {
  const savedMessage = JSON.parse(localStorage.getItem(STORAGE_KEY));

  if (savedMessage) {
    emailEl.value = savedMessage.email;
    messageEl.value = savedMessage.message;
  }
}

onPageReload();

function onFormInput() {
  const email = emailEl.value;
  const message = messageEl.value;

  const formData = {
    email,
    message,
  };

  localStorage.setItem(STORAGE_KEY, JSON.stringify(formData));
}

form.addEventListener('input', throttle(onFormInput, 500));

function onFormSubmit(e) {
  e.preventDefault();

  const email = emailEl.value;
  const message = messageEl.value;

  if (email == '' || message == '') {
    alert('Please enter email and message.');
    form.reset();

    return;
  }

  form.reset();
  alert('Successfully submitted.');
  localStorage.removeItem(STORAGE_KEY);
}

form.addEventListener('submit', onFormSubmit);
