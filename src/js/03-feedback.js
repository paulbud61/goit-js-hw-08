import throttle from 'lodash.throttle';

const STORAGE_KEY = 'feedback-form-state';

const form = document.querySelector('.feedback-form');

let formData = {};

populateTextarea();

form.addEventListener('input', throttle(onTextareaInput, 500));

form.addEventListener('submit', e => {
  e.preventDefault();
  localStorage.removeItem(STORAGE_KEY);
  e.currentTarget.reset();
  console.log(formData);
  formData = {};
});

function onTextareaInput(e) {
  formData[e.target.name] = e.target.value.trim();
  const stringifiedData = JSON.stringify(formData);
  localStorage.setItem(STORAGE_KEY, stringifiedData);
}

function populateTextarea() {
  try {
    const saveData = localStorage.getItem(STORAGE_KEY);
    if (!saveData) return;
    formData = JSON.parse(saveData);
    Object.entries(formData).forEach(([key, val]) => {
      form.elements[key].value = val;
    });
  } catch ({ message }) {
    console.log(message);
  }
}
