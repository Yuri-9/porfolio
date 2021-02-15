const btnShow = document.querySelectorAll('.btn-show');
const slides = document.querySelectorAll('.slide');
const btnDescrSwipe = document.querySelectorAll('.btn-swipe-description');
const btnNext = document.querySelector('.arrow__direction_next');
const btnPrev = document.querySelector('.arrow__direction_prev');
let currentSlide = 0;
let isEnable = true;


btnShow.forEach((item) => {
  item.addEventListener('click', ({ target }) => {
    const list = target.closest('.more-inf').querySelector('.inf-list');
    target.classList.toggle('active');
    list.classList.toggle('inf-list_show');
  });
});

function changeCurrentSlide(n) {
  currentSlide = (n + slides.length) % slides.length;
}

function hideSlide(direction) {
  isEnable = false;
  slides[currentSlide].classList.add(direction);
  slides[currentSlide].addEventListener('animationend', function a() {
    this.classList.remove('slide_active', direction);
  });
}

function showSlide(direction) {
  slides[currentSlide].classList.add('slide_next', direction);
  slides[currentSlide].addEventListener('animationend', function b() {
    this.classList.remove('slide_next', direction);
    this.classList.add('slide_active');
    isEnable = true;
  });
}

function nextSlide(n) {
  hideSlide('to-left');
  changeCurrentSlide(n + 1);
  showSlide('from-right');
}

function prevSlide(n) {
  hideSlide('to-right');
  changeCurrentSlide(n - 1);
  showSlide('from-left');
}

btnNext.addEventListener('click', () => {
  if (isEnable) nextSlide(currentSlide);
});

btnPrev.addEventListener('click', () => {
  if (isEnable) prevSlide(currentSlide);
});

function swipeDetect(el) {
  const surface = el;
  let startX = 0;
  let startY = 0;
  let distX = 0;
  let distY = 0;
  let startTime = 0;
  let elepsedTime = 0;
  const threshold = 150;
  const restraint = 100;
  const allowedTime = 600;

  surface.addEventListener('mousedown', (e) => {
    startX = e.pageX;
    startY = e.pageY;
    startTime = new Date().getTime();
    e.preventDefault();
  }, false);

  surface.addEventListener('mouseup', (e) => {
    distX = e.pageX - startX;
    distY = e.pageY - startY;
    elepsedTime = new Date().getTime() - startTime;
    if (elepsedTime <= allowedTime) {
      if (Math.abs(distX) >= threshold && Math.abs(distY) <= restraint) {
        if (distX > 0 && isEnable) prevSlide(currentSlide);
        else if (isEnable) nextSlide(currentSlide);
      }
    }
  });

  surface.addEventListener('touchstart', (e) => {
    const { target } = e;
    if (target.classList.contains('arrow__direction') || target.classList.contains('arrow')) {
      if (target.classList.contains('arrow__direction_prev') && isEnable) prevSlide(currentSlide);
      else if (isEnable) nextSlide(currentSlide);
    }

    const touchItem = e.changedTouches[0];
    startX = touchItem.pageX;
    startY = touchItem.pageY;
    startTime = new Date().getTime();
  }, false);


  surface.addEventListener('touchend', (e) => {
    const touchItem = e.changedTouches[0];
    distX = touchItem.pageX - startX;
    distY = touchItem.pageY - startY;
    elepsedTime = new Date().getTime() - startTime;

    if (elepsedTime <= allowedTime) {
      if (Math.abs(distX) >= threshold && Math.abs(distY) <= restraint) {
        if (distX > 0 && isEnable) prevSlide(currentSlide);
        else if (isEnable) nextSlide(currentSlide);
      }
    }
  }, false);
}
const el = document.querySelector('.slider');
swipeDetect(el);

btnDescrSwipe.forEach((item) => {
  item.addEventListener('click', ({ target }) => {
    const swipeList = target.closest('.slide').querySelector('.slide__description');

    target.classList.toggle('active');
    swipeList.classList.toggle('slide__description_show');
  });
});
