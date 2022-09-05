import { ACTIVE_CLASS, addClass, checkClassList,
  removeClass } from './components';

const tabs = {
  nav: document.querySelectorAll('.tabs__nav'),
  buttons: document.querySelectorAll('.nav__tabs__btn'),
  sizeButtons: document.querySelectorAll('.btn--tabs'),
  get content() {
    const contents = document.querySelectorAll('.tabs__content');
    let contentItem = null;
    contents.forEach((el) => contentItem = el);
    return contentItem;
  },
  get items() {
    const items = this.content.querySelectorAll('.tabs__item');
    return items;
  },
};

const replaceTabContent = (id) => {
  const currentTab = document.querySelector(id);
  removeClass(ACTIVE_CLASS, ...tabs.items);
  addClass(ACTIVE_CLASS, currentTab);
};

const tabsClick = (event) => {
  const currentBtn = event.target.closest('.nav__tabs__btn');
  const tabsContains = checkClassList(currentBtn, ACTIVE_CLASS);
  const tabId = currentBtn.dataset.tab;

  event.preventDefault();
  if (!tabsContains) {
    removeClass(ACTIVE_CLASS, ...tabs.buttons);
    addClass(ACTIVE_CLASS, currentBtn);
  }
  replaceTabContent(tabId);
};

const tabsSizeClick = (event) => {
  const currentBtn = event.target.closest('.btn--tabs');
  const tabsContains = checkClassList(currentBtn, ACTIVE_CLASS);

  event.preventDefault();
  if (!tabsContains) {
    removeClass(ACTIVE_CLASS, ...tabs.sizeButtons);
    addClass(ACTIVE_CLASS, currentBtn);
  }
};

tabs.buttons && tabs.buttons.forEach((btn) => {
  btn.addEventListener('click', tabsClick);
});

tabs.sizeButtons && tabs.sizeButtons.forEach((btn) => {
  btn.addEventListener('click', tabsSizeClick);
});
