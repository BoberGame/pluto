// eslint-disable-next-line max-len
import { addClass, checkClassList, removeClass, HIDDEN_CLASS } from './components';

const ORDERS_BUTTONS = document.querySelectorAll('.profile__orders__btn');

const getSubTable = (array, id) => {
  for (const key in array) {
    const subTable = array[key];
    if (subTable.dataset.order === id) return subTable;
  }
};

const ordersHandler = (event) => {
  event.preventDefault();
  const orderBtnText = {
    hidden: 'Смотреть состав заказа',
    show: 'Скрыть состав заказа',
  };
  const currentBtn = event.target;
  const currentOrder = currentBtn.closest('.profile__orders__main--with-btn');
  const orderId = currentOrder.dataset.order;
  const subTables = document.querySelectorAll('.profile__orders--sub');
  const subTable = getSubTable(subTables, orderId);

  if (!checkClassList(subTable, HIDDEN_CLASS)) {
    addClass(HIDDEN_CLASS, subTable);
    currentBtn.innerHTML = orderBtnText.hidden;
  } else {
    removeClass(HIDDEN_CLASS, subTable);
    currentBtn.innerHTML = orderBtnText.show;
  }
};

ORDERS_BUTTONS.forEach((btn) => {
  btn.addEventListener('click', ordersHandler);
});
