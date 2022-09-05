/* eslint-disable max-len */

import { animationSpeed } from './modal';

const signBtn = document.getElementById('modalSignBtn');

const signInModal = $.modal({
  title: 'Записаться на Бра-фиттинг',
  closable: false,
  content: `
<div class="modal__text">Оставьте свои контактные данные и мы перезвоним за 30 минут</div>
<form method="get" id="modalSignForm">
  <div class="modal__body" >
        <div class="modal__item">
            <input 
                class="form__input form__input--mb-0" 
                type="text" 
                placeholder="Имя"
                title="Имя"
                id="modalName"
                required>
        </div>
        <div class="modal__item">
            <label class="form__label form__label--checkbox" for="modalNameAnon">
                <input 
                    class="form__checkbox" 
                    type="checkbox" 
                    name="modalNameAnon" 
                    id="modalNameAnon">
                <span class="form__name">Анонимно</span>
            </label>
        </div>
        <div class="modal__item">
            <input 
                class="form__input" 
                type="tel" 
                placeholder="Телефон"
                id="modalPhone"
                required>
        </div>
    </div>
    <div class="modal__footer">
        <button class="btn btn--brand btn--100" type="submit">Отправить</button>
        <div class="modal__item">
            <label class="form__label form__label--checkbox" for="modalAgreement">
                <input 
                    class="form__checkbox" 
                    type="checkbox" 
                    name="modalAgreement" id="modalAgreement" 
                    required>
                <span class="form__name">Отправляя это сообщение, вы соглашаетись с <a href="#">политикой конфиденциальности</a></span>
            </label>
        </div>
    </div>
</form>
`,
});

const successModal = $.modal({
  title: '',
  closable: false,
  content: `
<div class="modal__body success text-center">
      <div class="modal__icon">
        <svg fill="none" viewBox="0 0 89 89"><path fill="#555" d="M44 88.48c24.3 0 44-19.8 44-44.24C88 19.81 68.3 0 44 0S0 19.8 0 44.24s19.7 44.24 44 44.24Z"/><path fill="#fff" d="M39.8 62.92 26.65 45.89l7.66-5.99 6.23 8.06L61.6 25.6l7.04 6.71-28.83 30.6Z"/></svg>
      </div>
      <h2 class="modal__title">Успешно отправлено</h2>
      <div class="modal__text">Мы уже получили ваше обращение и свяжемся с вам в назначеннное время</div>
  </div>
  <div class="modal__footer text-center">
      <button class="btn btn--brand" type="button" data-close="true">Хорошо</button>
  </div>
`,
});

window.signInModal = signInModal;
window.successModal = successModal;

signBtn && signBtn.addEventListener('click', signInModal.open);

document.addEventListener('click', (event) => {
  const target = event.target.closest('#modalSuccessBtn');
  if (target) {
    signInModal.close();
    setTimeout(() => successModal.open(), animationSpeed);
  }
});
