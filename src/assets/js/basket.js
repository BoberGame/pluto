import { Storage } from './addToFavorite';
import { addClass, generateId, HIDDEN_CLASS, removeClass } from './components';
import wordCorrect from './wordCorrection';

/* eslint-disable max-len */

const basketElems = {
  addCartBtn: document.getElementById('addCartBtn'),
  cartInfo: document.getElementById('cardInfo'),
  basketWrapper: document.querySelector('.basket__left'),
  basketHeader: document.querySelector('.basket__header'),
  basketDefault: document.querySelector('.basket__without'),
  basketOrder: document.querySelector('.basket__right'),
  storageName: 'basketData',
};

class Basket extends Storage {
  getInfo(item) {
    const dataItem = {
      title: item.querySelector('.page__title').innerHTML,
      price: item.querySelector('#cardPrice').innerHTML,
      color: item.querySelector('#colorDisplay').innerHTML,
      size: item.querySelector('.btn--tabs.active').innerHTML,
      imgsrc: document.getElementById('cardImg').getAttribute('src'),
      id: generateId(0, 10000),
    };
    return dataItem;
  }
}

const basket = new Basket(basketElems.storageName);

const cartHandler = () => {
  const dataItem = basket.getInfo(basketElems.cartInfo);
  basket.setLocalStorage(dataItem);
};

const createPattern = (item) => {
  const pattern = `
  <div class="basket__item" data-cartId="${item.id}">
    <div class="basket__preview">
        <img class="basket__item__img img" src="${item.imgsrc}" alt="${item.title}">
    </div>
    <div class="basket__info">
        <h4 class="basket__name"><a href="card.html">${item.title}</a></h4>
        <ul class="basket__description">
            <li>Цвет: ${item.color}</li>
            <li>Размер: ${item.size}</li>
        </ul>
        <div class="basket__price">
            <div class="card__price card__price--new">1 499,00 руб. (-55%)</div>
            <div class="card__price card__price--old">${item.price}</div>
        </div>
        <div class="basket__actions">
            <button class="basket__actions__btn" type="button">
                <svg class="basket__actions__icon" fill="none" viewBox="0 0 20 20">
                    <path fill-rule="evenodd" d="M12.13 2.27a5.2 5.2 0 0 1 5.68 8.5l-7.37 7.37a.63.63 0 0 1-.88 0l-7.37-7.37A5.21 5.21 0 0 1 9.56 3.4l.44.44.44-.44a5.2 5.2 0 0 1 1.7-1.13Zm4.8 2.02a3.96 3.96 0 0 0-5.6 0l-.89.88a.63.63 0 0 1-.88 0l-.88-.88a3.96 3.96 0 0 0-5.6 5.6L10 16.8l6.93-6.93a3.96 3.96 0 0 0 0-5.6Z" clip-rule="evenodd"/>
                </svg>
            </button>
            <button class="basket__actions__btn basket__close" type="button">
                <svg class="basket__actions__icon" fill="none" viewBox="0 0 16 16">
                    <path fill-rule="evenodd" d="m8.86 8 4.59-4.68a.54.54 0 0 0-.78-.76L8.1 7.23 3.32 2.55a.54.54 0 0 0-.92.4c0 .14.06.28.16.38L7.33 8l-4.77 4.67a.54.54 0 0 0 .58.89.54.54 0 0 0 .18-.12L8.1 8.76l4.58 4.68a.54.54 0 0 0 .77 0 .54.54 0 0 0 0-.76L8.87 8Z" clip-rule="evenodd"/>
                </svg>
            </button>
        </div>
    </div>
  </div>`;
  return pattern;
};

const addToCart = () => {
  const dataItems = basket.data;
  for (const item of dataItems) {
    const pattern = createPattern(item);
    basketElems.basketWrapper.insertAdjacentHTML('beforeend', pattern);
  }
};

const changeBasketItems = (result) => {
  if (result) {
    removeClass(HIDDEN_CLASS, basketElems.basketOrder, basketElems.basketHeader);
    addClass(HIDDEN_CLASS, basketElems.basketDefault);
  }
  if (!result) {
    addClass(HIDDEN_CLASS, basketElems.basketOrder, basketElems.basketHeader);
    removeClass(HIDDEN_CLASS, basketElems.basketDefault);
  }
};

const countItem = () => {
  const len = basket.data.length;
  const words = [' изделие', ' изделия', ' изделий'];
  const basketTitle = basketElems.basketHeader.querySelector('#basketTitle');
  const correctWord = wordCorrect(len, words);
  const title = `В корзине ${len} ${correctWord}`;

  if (len > 0) basketTitle.innerHTML = title;
  changeBasketItems(len > 0);
};

/* Function replace ',' on '.' and remove spaces for parseFloat. */
const normalizePrice = (price = '', type = 'int') => {
  let normalPrice;
  price = price.replace(',', '.');
  if (type === 'float') normalPrice = parseFloat(price.replace(/ /g, ''));
  if (type === 'int') normalPrice = parseInt(price.replace(/ /g, ''));
  return normalPrice;
};

const calculatePrice = (className = '') => {
  const prices = document.querySelectorAll(className);
  let amount = 0;

  for (const price of prices) {
    const normalPrice = normalizePrice(price.innerHTML, 'float');
    amount += normalPrice;
  }
  return amount;
};

const getFormatPrice = (price) => {
  const formattedPrice = new Intl.NumberFormat('ru', {
    style: 'currency', currency: 'RUB', });
  return formattedPrice.format(price);
};

const getTotalElems = (key = '') => {
  const totalItems = {
    counter: document.getElementById(`total${key}Count`),
    amount: document.getElementById(`total${key}Amount`),
    discount: document.getElementById(`total${key}Discount`),
    totalPrice: document.getElementById(`total${key}Price`),
  };
  return totalItems;
};

const calculateTotalPrice = () => {
  const amountPrice = calculatePrice('.card__price--old');
  const amountDiscountPrice = calculatePrice('.card__price--new');
  const totalPrice = amountPrice - amountDiscountPrice;

  if (totalPrice < 0) throw 'Amount is less than zero';
  const totalData = {
    formatPrice: getFormatPrice(amountPrice),
    formatDiscPrice: getFormatPrice(amountDiscountPrice),
    formatTotalPrice: getFormatPrice(totalPrice),
  };
  return totalData;
};

const showTotalPrice = (object) => {
  const formPrices = calculateTotalPrice();
  object.amount.innerHTML = formPrices['formatPrice'];
  object.discount.innerHTML = `-${formPrices['formatDiscPrice']}`;
  object.totalPrice.innerHTML = formPrices['formatTotalPrice'];
  return formPrices;
};

const showTotalCount = (object) => {
  const len = basket.data.length;
  const counterPattern = `Товары (${len})`;
  object.counter.innerHTML = counterPattern;
  return counterPattern;
};

const shotTotalInfo = () => {
  const totalItems = getTotalElems('');
  const len = showTotalCount(totalItems);
  const totalInfo = showTotalPrice(totalItems);
  totalInfo.len = len;
  localStorage.setItem('baksetTotalInfo', JSON.stringify(totalInfo));
};

const replaceOrderInfo = () => {
  const data = JSON.parse(localStorage.getItem('baksetTotalInfo'));
  const orderItems = getTotalElems('Order');
  orderItems.amount.innerHTML = data.formatPrice;
  orderItems.discount.innerHTML = `-${data.formatDiscPrice}`;
  orderItems.totalPrice.innerHTML = data.formatTotalPrice;
  orderItems.counter.innerHTML = data.len;
};

const closeFunc = (item, event) => {
  const id = parseInt(item.dataset.cartid);

  event.preventDefault();
  basket.removeLocalStorage(id);
  item.remove();
  countItem();
  shotTotalInfo();
};

const closeSelfItem = (event) => {
  const currentItem = event.target.closest('.basket__item');
  closeFunc(currentItem, event);
};

const clearAllItems = (event) => {
  const items = document.querySelectorAll('.basket__item');
  for (const item of items) closeFunc(item, event);
};

const closeFunction = (className = '', callback) => {
  const items = document.querySelectorAll(className);
  for (const item of items) item.addEventListener('click', callback);
};

basketElems.addCartBtn && basketElems.addCartBtn.addEventListener('click', cartHandler);
if (basketElems.basketWrapper) {
  addToCart();
  closeFunction('.basket__close', closeSelfItem);
  closeFunction('.basket__clear', clearAllItems);
  countItem();
}

basketElems.basketOrder && shotTotalInfo();
export { replaceOrderInfo };
