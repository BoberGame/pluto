/* eslint-disable no-unused-vars */
import Swiper, { Navigation, Pagination, Keyboard } from 'swiper';

const adaptiveSlider = (swiper, width, swiperSelector = '') => {
  const elem = document.querySelector(swiperSelector);
  if (elem === null) return;
  const minWidth = width;
  if (window.innerWidth >= minWidth) swiper.destroy(true, true);
  else swiper.enable();
};

const initSliders = () => {
  const swiperCard1 = new Swiper('.swiper-card1', {
    modules: [Navigation, Keyboard],
    spaceBetween: 16,
    keyboard: {
      enabled: true,
      pageUpDown: true,
    },
    navigation: {
      nextEl: '.swiper-card-next1',
      prevEl: '.swiper-card-prev1',
    },
    breakpoints: {
      300: {
        slidesPerView: 1,
      },
      375: {
        slidesPerView: 1.6,
      },
      446: {
        slidesPerView: 2,
      },
      768: {
        slidesPerView: 3,
        spaceBetween: 32,
      },
      991: {
        slidesPerView: 4,
        spaceBetween: 32,
      },
    },
  });

  const swiperCard2 = new Swiper('.swiper-card2', {
    modules: [Navigation, Keyboard],
    spaceBetween: 16,
    keyboard: {
      enabled: true,
      pageUpDown: true,
    },
    navigation: {
      nextEl: '.swiper-card-next2',
      prevEl: '.swiper-card-prev2',
    },
    breakpoints: {
      300: {
        slidesPerView: 1,
      },
      375: {
        slidesPerView: 1.6,
      },
      446: {
        slidesPerView: 2,
      },
      768: {
        slidesPerView: 3,
        spaceBetween: 32,
      },
      991: {
        slidesPerView: 4,
        spaceBetween: 32,
      },
    },
  });

  const swiperCard3 = new Swiper('.swiper-card3', {
    modules: [Navigation, Keyboard],
    spaceBetween: 16,
    keyboard: {
      enabled: true,
      pageUpDown: true,
    },
    navigation: {
      nextEl: '.swiper-card-next3',
      prevEl: '.swiper-card-prev3',
    },
    breakpoints: {
      300: {
        slidesPerView: 1,
      },
      375: {
        slidesPerView: 1.6,
      },
      446: {
        slidesPerView: 2,
      },
      768: {
        slidesPerView: 3,
        spaceBetween: 32,
      },
      991: {
        slidesPerView: 4,
        spaceBetween: 32,
      },
    },
  });

  const swiperReviews = new Swiper('.swiper-reviews', {
    modules: [Navigation, Keyboard, Pagination],
    spaceBetween: 30,
    keyboard: {
      enabled: true,
      pageUpDown: true,
    },
    pagination: {
      el: '.swiper-reviews-pagination',
      dynamicBullets: true,
    },
    navigation: {
      nextEl: '.swiper-reviews-next',
      prevEl: '.swiper-reviews-prev',
    },
    breakpoints: {
      300: {
        slidesPerView: 1,
      },
      375: {
        slidesPerView: 1.6,
      },
      446: {
        slidesPerView: 2,
      },
      768: {
        slidesPerView: 3,
      },
      991: {
        slidesPerView: 4,
      },
    },
  });

  const swiperBlog = new Swiper('.swiper-blog', {
    modules: [Navigation, Keyboard],
    spaceBetween: 30,
    keyboard: {
      enabled: true,
      pageUpDown: true,
    },
    navigation: {
      nextEl: '.swiper-blog-next',
      prevEl: '.swiper-blog-prev',
    },
    breakpoints: {
      300: {
        slidesPerView: 1,
      },
      375: {
        slidesPerView: 1.6,
      },
      446: {
        slidesPerView: 2,
      },
      768: {
        slidesPerView: 3,
      },
      991: {
        slidesPerView: 4,
      },
    },
  });

  const swiperBasket = new Swiper('.swiper-basket', {
    modules: [Navigation, Keyboard],
    spaceBetween: 10,
    keyboard: {
      enabled: true,
      pageUpDown: true,
    },
    navigation: { nextEl: '.swiper-basket-next', },
    breakpoints: {
      300: {
        slidesPerView: 1,
      },
      375: {
        slidesPerView: 1.6,
      },
      446: {
        slidesPerView: 2,
      },
      576: {
        slidesPerView: 2.6,
      },
      768: {
        slidesPerView: 4,
      },
      991: {
        slidesPerView: 5,
      },
    },
  });

  const swiperPreview = new Swiper('.swiper-preview', {
    modules: [Keyboard, Pagination],
    spaceBetween: 12,
    enabled: false,
    keyboard: { enabled: true, pageUpDown: true, },
    pagination: {
      el: '.swiper-preview-pagination',
      dynamicBullets: true,
    },
    breakpoints: {
      300: {
        slidesPerView: 1.6,
        enabled: true,
      },
      446: {
        slidesPerView: 2,
      },
      576: {
        slidesPerView: 2.3,
      },
      768: {
        enabled: false,
      },
    },
  });

  adaptiveSlider(swiperPreview, 768, '.swiper-preview');
  window.addEventListener('resize', () => {
    adaptiveSlider(swiperPreview, 768, '.swiper-preview');
  });
};

initSliders();
