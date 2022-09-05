const historyBack = () => {
  const btnSelector = '#linkBack';
  const callBtns = document.querySelectorAll(btnSelector);

  const backClickHandler = (event) => {
    event.preventDefault();
    history.back();
  };
  for (const btn of callBtns) {
    btn && btn.addEventListener('click', backClickHandler);
  }
};

historyBack();
