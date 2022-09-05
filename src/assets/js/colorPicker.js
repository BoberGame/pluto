// eslint-disable-next-line max-len
import { ACTIVE_CLASS, addClass, checkClassList, removeClass } from './components';

const COLOR_BUTTONS = document.querySelectorAll('.card__color__btn');

const colors = {
  red: 'красный',
  blue: 'синий',
  white: 'белый',
  pink: 'розовый',
  green: 'зеленый',
  black: 'черный',
};

const setColor = (colorName, collection) => {
  const colorKeys = Object.keys(collection);
  let colorKey;
  for (const key in colorKeys) {
    if (colorKeys[key] === colorName) {
      colorKey = colorKeys[key];
      return collection[colorKey];
    }
  }
};

const changeDisplayColor = (btn, display) => {
  const colorName = btn.innerHTML;
  const colorDisplayName = setColor(colorName, colors);

  if (display.innerHTML !== colorDisplayName) {
    display.innerHTML = colorDisplayName;
  }
};

const changeActiveColor = (event) => {
  const currentBtn = event.target;
  const currentWrapper = currentBtn.closest('.card__color');
  const currentButtons = currentWrapper.querySelectorAll('.card__color__btn');
  const colorWithActive = checkClassList(currentBtn, ACTIVE_CLASS);
  const colorDisplay = document.getElementById('colorDisplay');

  event.preventDefault();
  if (!colorWithActive) {
    removeClass(ACTIVE_CLASS, ...currentButtons);
    addClass(ACTIVE_CLASS, currentBtn);
  }
  colorDisplay && changeDisplayColor(currentBtn, colorDisplay);
};

COLOR_BUTTONS && COLOR_BUTTONS.forEach((colorBtn) => {
  colorBtn.addEventListener('click', changeActiveColor);
});
