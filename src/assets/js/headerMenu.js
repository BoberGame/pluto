import { ACTIVE_CLASS, addClass, checkClassList, HIDDEN_CLASS,
  removeClass } from './components';

const headerElems = {
  header: document.querySelector('.header'),
  nav: document.querySelector('.nav'),
  burger: document.querySelector('.burger'),
};

const scrollCompare = ({ header, nav, burger }) => {
  const headerHeight = header.offsetHeight;
  const headerScroll = window.scrollY;
  const scrollClass = 'scrolled';

  if (headerScroll >= headerHeight) {
    addClass(scrollClass, header);
    addClass(HIDDEN_CLASS, nav);
  } else {
    removeClass(scrollClass, header);
    removeClass(HIDDEN_CLASS, nav);
    removeClass(ACTIVE_CLASS, nav, burger);
  }
};

const replaceClasses = (item, className = '') => {
  const containsItem = checkClassList(item, className);
  !containsItem ? addClass(className, item) : removeClass(className, item);
};

const openMenu = ({ burger, nav }) => {
  replaceClasses(burger, ACTIVE_CLASS);
  replaceClasses(nav, ACTIVE_CLASS);

  const body = document.body;
  const minWidth = 576;
  if (window.innerWidth <= minWidth) {
    const burgerActive = checkClassList(burger, ACTIVE_CLASS);
    burgerActive ? addClass('no-scroll', body) : removeClass('no-scroll', body);
  }
};

document.addEventListener('scroll', scrollCompare.bind(null, headerElems));
headerElems.burger.addEventListener('click', openMenu.bind(null, headerElems));

const search = () => {
  const searchElems = {
    btn: document.getElementById('searchBtn'),
    form: document.querySelector('.form__search'),
  };

  const showInputSearch = (event) => {
    event.preventDefault();
    const { form } = searchElems;
    const input = form.querySelector('.form__input--search');
    const inputContains = checkClassList(form, 'show');

    if (!inputContains) {
      addClass('show', form);
      input.focus();
    } else removeClass('show', form);
  };

  const closeWithout = (event) => {
    const closestItem = event.target.closest('.header');
    const keycodeEsc = 27;
    if (closestItem !== headerElems.header || event.keyCode === keycodeEsc) {
      removeClass('show', searchElems.form);
    }
  };

  const checkResizeSearch = (minWidth) => {
    const width = window.innerWidth;
    if (width <= minWidth) {
      searchElems.btn.removeEventListener('click', showInputSearch);
      document.removeEventListener('click', closeWithout);
      document.removeEventListener('keydown', closeWithout);
    }
  };

  searchElems.btn.addEventListener('click', showInputSearch);
  document.addEventListener('click', closeWithout);
  document.addEventListener('keydown', closeWithout);
  checkResizeSearch(768);
};

search();
