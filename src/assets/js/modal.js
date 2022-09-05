/* eslint-disable max-len */
const $ = {};
window.$ = $;
export const animationSpeed = 300;

const _createModal = (options) => {
  const defaultWidth = '430px';
  const MODAL = document.createElement('div');
  const modalClose = '<span class="modal-close" data-close="true">&times;</span>';

  MODAL.classList.add('modal');
  MODAL.insertAdjacentHTML('afterbegin', `
  <div class="modal__overlay">
    <div class="modal__window" style="width: ${options.width || defaultWidth}">
        <div class="modal__header">
            <h2 class="modal__title">${options.title ? options.title : ''}</h2>
            ${options.closable ? modalClose : ''}
        </div>
        <div class="modal__wrapper" data-content>
          ${options.content || ''}
        </div>
    </div>
  </div>
`);
  document.body.appendChild(MODAL);
  return MODAL;
};

$.modal = function(options) {
  const $modal = _createModal(options);
  const modalWindow = $modal.querySelector('.modal__window');
  const scrollWidth = calcScroll();
  const header = document.querySelector('.header');
  let closing = false;
  let destroyed = false;
  const modal = {
    open() {
      if (destroyed) console.log('Modal destroyed');
      if (!closing) {
        $modal.classList.add('open');
        document.body.classList.add('no-scroll');
        document.body.style.marginRight = `${scrollWidth}px`;
        header.style.paddingRight = `${scrollWidth}px`;
      }
    },
    close() {
      closing = true;
      $modal.classList.remove('open');
      $modal.classList.add('hide');
      setTimeout(() => {
        $modal.classList.remove('hide');
        document.body.classList.remove('no-scroll');
        document.body.style.marginRight = '';
        header.style.paddingRight = '';
        closing = false;
      }, animationSpeed);
    },
  };

  function calcScroll() {
    const div = document.createElement('div');
    div.style.width = '50px';
    div.style.height = '50px';
    div.style.overflow = 'scroll';
    div.style.visibility = 'hidden';
    document.body.appendChild(div);
    const scrollWidth = div.offsetWidth - div.clientWidth;
    div.remove();
    return scrollWidth;
  }

  const listener = (event) => {
    const closestItem = event.target.closest('.modal__window');
    if (event.target.dataset.close) modal.close();
    if (closestItem !== modalWindow) modal.close();
  };

  $modal.addEventListener('click', listener);

  return Object.assign(modal, {
    destroy() {
      $modal.parentNode.removeChild($modal);
      $modal.removeEventListener('click', listener);
      destroyed = true;
    },
    setContent(html) {
      $modal.querySelector('[data-content').innerHTML = html;
    },
  });
};
