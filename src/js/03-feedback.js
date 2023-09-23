import throttle from 'lodash.throttle';

const SAVE_KEY = 'feedback-form-state';
const form = document.querySelector('.feedback-form');
const emailInput = form.querySelector('input[name="email"]');
const messageInput = form.querySelector('textarea[name="message"]');

const onSaveForm = throttle(() => {
  const saveData = {
    email: emailInput.value,
    message: messageInput.value,
  };
  localStorage.setItem('SAVE_KEY', JSON.stringify(saveData));
}, 500);

form.addEventListener('input', onSaveForm);
