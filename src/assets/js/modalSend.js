import { serialize } from './components';

const MODAL_FORM = document.getElementById('modalSignForm');

const validataForm = (form) => {
  let invalid = 0;
  for (const item of form.elements) item.validity.valid && invalid++;
  return invalid === form.elements.length;
};

const clearForm = (form) => {
  for (const item of form.elements) {
    if (item.nodeName === 'INPUT') {
      item.value = '';
      item.checked = false;
    }
  }
};

if (MODAL_FORM) {
  const formBtn = MODAL_FORM.querySelector('.btn');
  formBtn.addEventListener('click', (event) => {
    event.preventDefault();
    if (validataForm(MODAL_FORM)) {
      const data = serialize(MODAL_FORM);
      clearForm(MODAL_FORM);
      formBtn.id = 'modalSuccessBtn';
    }
  });
}
