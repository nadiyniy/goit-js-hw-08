import throttle from 'lodash.throttle';

const SAVE_KEY = 'feedback-form-state';
const form = document.querySelector('.feedback-form');
const emailInput = form.querySelector('input[name="email"]');
const messageInput = form.querySelector('textarea[name="message"]');

let saveData;

function loadPage() {
  saveData = loadFromLS('SAVE_KEY') || {};
  emailInput.value = saveData.email || '';
  messageInput.value = saveData.message || '';
}

loadPage();

function loadFromLS(key) {
  const saveData = localStorage.getItem(key);

  try {
    return JSON.parse(saveData);
  } catch {
    return saveData;
  }
}

const onSubmiteFormRemove = e => {
  e.preventDefault();
  console.log(saveData);
  e.target.reset();
  localStorage.removeItem('SAVE_KEY');
  saveData = {};
};

const onInputForm = throttle(() => {
  saveData = {
    email: emailInput.value,
    message: messageInput.value,
  };

  localStorage.setItem('SAVE_KEY', JSON.stringify(saveData));
}, 500);

form.addEventListener('input', onInputForm);
form.addEventListener('submit', onSubmiteFormRemove);
