// eslint-disable-next-line max-len
import { ACTIVE_CLASS, addClass, checkClassList, removeClass } from './components';

const HEADER_SWITCH = document.querySelector('.header__switch');

const switchHandler = (event) => {
  const currentBtn = event.target.closest('.header__switch__btn');
  const switchButtons = HEADER_SWITCH.querySelectorAll('.header__switch__btn');

  if (currentBtn !== null) {
    const containsActive = checkClassList(currentBtn, ACTIVE_CLASS);
    if (!containsActive) {
      removeClass(ACTIVE_CLASS, ...switchButtons);
      addClass(ACTIVE_CLASS, currentBtn);
    }
  }
};

HEADER_SWITCH && HEADER_SWITCH.addEventListener('click', switchHandler);
