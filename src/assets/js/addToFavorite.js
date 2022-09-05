/* eslint-disable max-len */

import { checkClassList, ACTIVE_CLASS } from './components';

const favoriteInfo = {
  btnClassName: '.card__favorite__btn',
  cardClassName: '.card__item',
  cardStorageName: 'cardItem',
  wrapper: document.getElementById('favoriteWrapper'),
  get buttons() {
    const buttons = document.querySelectorAll(this.btnClassName);
    return buttons;
  },
};

class Storage {
  constructor(name) {
    this.name = name;
  }
  get data() {
    let data;
    const oldItem = localStorage.getItem(this.name);
    if (oldItem === null) data = [];
    else data = JSON.parse(localStorage.getItem(this.name));
    return data;
  }
  getInfo(elem) {
    const dataItem = {
      title: elem.querySelector('.card__title a').innerHTML,
      imgSrc: elem.querySelector('.card__img').getAttribute('src'),
      price: elem.querySelector('.card__price').innerHTML,
      id: elem.dataset.card,
    };
    return dataItem;
  }
  setLocalStorage(item) {
    const data = this.data;
    data.push(item);
    localStorage.setItem(this.name, JSON.stringify(data));
  }
  removeLocalStorage(itemId) {
    const data = this.data;
    for (const key of data) {
      if (key.id === itemId) data.splice(key, 1);
    }
    localStorage.setItem(this.name, JSON.stringify(data));
  }
  checkStorageItem(item) {
    const data = this.data;
    if (data !== null) {
      for (const key of data) {
        if (key.id === item.id) return true;
      }
    }
  }
  setStateCard() {
    const cards = document.querySelectorAll(favoriteInfo.cardClassName);
    const data = this.data;
    cards.forEach((card) => {
      data.forEach((dataItem) => {
        if (card.dataset.card === dataItem.id) {
          const btn = card.querySelector(favoriteInfo.btnClassName);
          btn.classList.add(ACTIVE_CLASS);
        }
      });
    });
  }
}

const favorite = new Storage(favoriteInfo.cardStorageName);

const clickHandler = (event) => {
  const currentBtn = event.target.closest(favoriteInfo.btnClassName);
  const card = currentBtn.closest(favoriteInfo.cardClassName);
  const dataItem = favorite.getInfo(card);
  const available = favorite.checkStorageItem(dataItem);

  event.preventDefault();
  currentBtn.classList.toggle(ACTIVE_CLASS);
  const btnWithActive = checkClassList(currentBtn, ACTIVE_CLASS);
  if (btnWithActive && !available) favorite.setLocalStorage(dataItem);
  if (!btnWithActive && available) favorite.removeLocalStorage(dataItem.id);
};

const createPattern = (item) => {
  const imgSrc = item.imgSrc.replace('dist/', '');
  const pattern = `
    <div class="card__item col-12 col-sm-6 col-md-4 col-lg-3" data-card="${item.id}">
      <div class="card__preview">
          <img class="card__img img" src="${imgSrc}">
          <button class="card__favorite__btn ${ACTIVE_CLASS}" type="button">
              <svg class="card__favorite__icon" fill="none" viewBox="0 0 20 20">
                  <path fill-rule="evenodd" d="M12.13 2.27a5.2 5.2 0 0 1 5.68 8.5l-7.37 7.37a.63.63 0 0 1-.88 0l-7.37-7.37A5.21 5.21 0 0 1 9.56 3.4l.44.44.44-.44a5.2 5.2 0 0 1 1.7-1.13Zm4.8 2.02a3.96 3.96 0 0 0-5.6 0l-.89.88a.63.63 0 0 1-.88 0l-.88-.88a3.96 3.96 0 0 0-5.6 5.6L10 16.8l6.93-6.93a3.96 3.96 0 0 0 0-5.6Z" clip-rule="evenodd" />
              </svg>
          </button>
      </div>
      <div class="card__color">
          <button class="card__color__btn red" type="button">red</button>
          <button class="card__color__btn white active" type="button">white</button>
      </div>
      <h3 class="card__title">
          <a href="card.html">${item.title}</a>
      </h3>
      <div class="card__price">${item.price}</div>
    </div>
  `;
  return pattern;
};

const createItem = () => {
  const data = favorite.data;
  data.forEach((info) => {
    const pattern = createPattern(info);
    favoriteInfo.wrapper.insertAdjacentHTML('afterbegin', pattern);
    favoriteInfo.buttons.forEach((btn) => {
      btn.addEventListener('click', clickHandler);
    });
  });
};

favoriteInfo.buttons.forEach((btn) => {
  btn.addEventListener('click', clickHandler);
});
favorite.setStateCard();
favoriteInfo.wrapper && createItem();

export { Storage };
