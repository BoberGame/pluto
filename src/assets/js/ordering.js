import { replaceOrderInfo } from './basket';
import { setStorage, serialize, generateId } from './components';

const orderElems = {
  form: document.getElementById('orderForm'),
  id: document.getElementById('orderId'),
};

/* Function getting data for inputs,
save to local storage and open confirm page.
Dont have ajax request */
const submitHandler = () => {
  // event.preventDefault();
  const data = serialize(orderElems.form);
  setStorage('formData', data);
};

const generateOrderId = () => {
  const id = generateId(100000, 1000000).toString();
  const orderId = id.substring(0, 3) + ' ' + id.substring(3, 6);
  const orderIdPattern = `Номер заказа ${orderId}`;
  orderElems.id.innerHTML = orderIdPattern;
};

if (orderElems.form) {
  orderElems.form.addEventListener('submit', submitHandler);
  replaceOrderInfo();
}
orderElems.id && generateOrderId();
