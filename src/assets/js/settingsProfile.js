import { serialize, setStorage } from './components';

const settingsElems = {
  settingsForm: document.getElementById('settingsForm'),
  enterForm: document.getElementById('enterForm'),
  settingsPhone: document.getElementById('settingsPhone'),
  name: 'enterPhone',
};

const getPhone = ({ enterForm, name }) => {
  enterForm.addEventListener('submit', () => {
    const { enterTel } = serialize(enterForm);
    setStorage(name, enterTel);
  });
};

const setPhone = ({ name, settingsPhone }) => {
  const phone = JSON.parse(localStorage.getItem(name));
  if (phone === null) return;
  settingsPhone.value = phone;
};

settingsElems.enterForm && getPhone(settingsElems);

if (settingsElems.settingsForm) {
  setPhone(settingsElems);
  settingsElems.settingsForm.addEventListener('submit', (event) => {
    event.preventDefault();
    const data = serialize(settingsElems.settingsForm);
    setStorage('settingsInfo', data);
  });
}

const countdown = (time) => {
  const displayTime = document.getElementById('resendCode');
  if (displayTime) {
    const delay = 1000;
    let countTime = time - 1;
    setInterval(() => {
      let pattern = `00:${countTime}`;
      if (countTime !== 0) countTime--;
      if (countTime < 10) pattern = `00:0${countTime}`;
      displayTime.innerHTML = pattern;
    }, delay);
  }
};
countdown(60);
