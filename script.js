'use strict';

///////////////////////////////////////
// Modal window

const modal = document.querySelector('.modal');
const overlay = document.querySelector('.overlay');
const btnCloseModal = document.querySelector('.btn--close-modal');
const btnsOpenModal = document.querySelectorAll('.btn--show-modal');

const tabContainer = document.querySelector('.operations__tab-container');
const btnRight = document.querySelector('.slider__btn--right');
const btnLeft = document.querySelector('.slider__btn--left');

const openModal = function () {
  modal.classList.remove('hidden');
  overlay.classList.remove('hidden');
};

const closeModal = function () {
  modal.classList.add('hidden');
  overlay.classList.add('hidden');
};

for (let i = 0; i < btnsOpenModal.length; i++)
  btnsOpenModal[i].addEventListener('click', openModal);

btnCloseModal.addEventListener('click', closeModal);
overlay.addEventListener('click', closeModal);

document.addEventListener('keydown', function (e) {
  if (e.key === 'Escape' && !modal.classList.contains('hidden')) {
    closeModal();
  }
});

/* learn more clickable link */
const scrollBtn = document.querySelector('.btn--scroll-to');
const section1 = document.querySelector('#section--1');
scrollBtn.addEventListener('click', function (e) {
  e.preventDefault();
  section1.scrollIntoView({ behavior: 'smooth' });
});

/* sticky nav bar */
const navBar = document.querySelector('.nav');
const navObserver = new IntersectionObserver(renderNav, {
  root: null,
  threshold: 0,
});

function renderNav(entries, observer) {
  const [entry] = entries;
  if (entry.isIntersecting) {
    entry.target.classList.add('sticky');
  }
}
navObserver.observe(navBar);

/* Lazy image loading - intersection observer*/
//src => img.data.src

const images = document.querySelectorAll('img[data-src]');
function renderImg(entries, observer) {
  //render callback function
  //array of intersectionObserverEntry objects
  const [entry] = entries;
  if (entry.isIntersecting) {
    entry.target.src = entry.target.dataset.src;
    entry.target.classList.remove('lazy-img');
    //avoid repeated observe the target
    observer.unobserve(entry);
  }
}

const imageObserver = new IntersectionObserver(renderImg, {
  root: null,
  threshold: 0, //target starts to be visiable
});
images.forEach(eachImg => imageObserver.observe(eachImg));

/* sliding image */
let curSlide = 0;
const slideList = document.querySelectorAll('.slide');
//calculation:
//all image translateX value = [0, 100, 200, 300....] = [index of image * 100]
//go to curSlide, each image should move steps, so that curSlide translateX value = 0%
//[0, 100, 200(curSlide), 300....] => [0 - 200, 100 - 200, 200 - 200, 300 - 200]
//each image translateX value = i * 100
//each image new translateX value => translateX value - curSlide translateX value = i * 100 - curSlide * 100;
function gotoSlide(curSlide) {
  slideList.forEach((eachImg, i) => {
    //i * 100 each image current translateX value
    //curSlide * 100, curSlide current translateX value
    //move to curSlide, meaning curSlide's translateX value === 0
    //so each image translateX value - curSlide * 100
    eachImg.style.transform = `translateX(${i * 100 - curSlide * 100}%)`;
  });
}
//initial
gotoSlide(0);

function goNext() {
  console.log(`go next`);
  curSlide = curSlide >= slideList.length - 1 ? 0 : curSlide + 1;
  gotoSlide(curSlide);
}

function goPrev() {
  console.log('go prev');
  curSlide = curSlide > 0 ? curSlide - 1 : slideList.length - 1;
  gotoSlide(curSlide);
}

/* Event handler */
tabContainer.addEventListener('click', function (e) {
  e.preventDefault();
  // console.log(e.target);
  if (e.target.classList.contains('btn')) {
    //remove active class in all tab
    // document
    //   .querySelectorAll('.operations__tab')
    //   .forEach(eachTab => eachTab.classList.remove('operations__tab--active'));

    //tab
    document
      .querySelector('.operations__tab--active')
      .classList.remove('operations__tab--active');
    //add operations__tab--active to active tab
    e.target.classList.add('operations__tab--active');
    // e.target.classList.add('operations__content--active');

    //tab content
    document
      .querySelector('.operations__content--active')
      .classList.remove('operations__content--active');
    //tab button only
    const activeTab = e.target.dataset.tab;

    document
      .querySelector(`.operations__content--${activeTab}`)
      .classList.add('operations__content--active');
  }
});

btnRight.addEventListener('click', function (e) {
  e.preventDefault();
  goNext();
});

btnLeft.addEventListener('click', function (e) {
  e.preventDefault();
  goPrev();
});
