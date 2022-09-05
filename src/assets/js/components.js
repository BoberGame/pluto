export const ACTIVE_CLASS = 'active';
export const HIDDEN_CLASS = 'hidden';

const checkClassList = (elem, className = '') => {
  if (elem.classList.contains(className)) return true;
  if (!elem.classList.contains(className)) return false;
};

const addClass = (className = '', ...elems) => {
  elems.forEach((item) => item.classList.add(className));
};

const removeClass = (className = '', ...elems) => {
  elems.forEach((item) => item.classList.remove(className));
};

const setStorage = (name = '', item) => {
  localStorage.setItem(name, JSON.stringify(item));
};

const generateId = (min, max) => {
  if (max === undefined) {
    max = min;
    min = 0;
  }
  return min + Math.floor(Math.random() * (max - min + 1));
};

const serialize = (form) => {
  if (form.nodeName !== 'FORM') throw new Error('Not a form');
  const data = {};
  let elem;
  for (elem of form.elements) {
    if (elem.type === 'radio' || elem.type === 'checkbox') {
      elem.checked ? elem.value = true : elem.value = false;
    }
    if (elem.nodeName === 'BUTTON') elem.value = false;
    if (elem.value !== 'false') data[elem.id] = elem.value;
  }
  return data;
};

export { checkClassList, addClass, removeClass, setStorage, generateId,
  serialize };

