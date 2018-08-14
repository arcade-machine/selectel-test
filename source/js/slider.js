// объявление переменных
const slides = document.querySelectorAll(".slider__item");
const dots = document.querySelectorAll(".slider-controls__dot");
var currentSlide = 0;
const slideInterval = setInterval(nextSlide, 5000);
const next = document.querySelector(".slider-controls__button--next");
const previous = document.querySelector(".slider-controls__button--previous");
const header = document.querySelector(".main-header");
const media = window.matchMedia("(min-width: 1168px)");

// логика для слайдера
function setColor(n) {
    if (n === 1) {
        header.style.background = "linear-gradient(180deg, #2F3F66 0%, #314579 100%)";
    } else if (n === 2) {
        header.style.background = "linear-gradient(180deg, #2F4966 0%, #34557C 100%)";
    } else if (n === 3) {
        header.style.background = "linear-gradient(180deg, #2F6066 0%, #327179 100%)";
    } else if (n = 4) {
        header.style.background = "linear-gradient(180deg, #4E2F66 0%, #603285 100%)";
    }
}

function nextSlide() {
    goToSlide(currentSlide + 1);
    dotsClick(currentSlide + 1);
}

function previousSlide() {
    goToSlide(currentSlide - 1);
}

function goToSlide(n) {
    slides[currentSlide].className = 'slider__item';
    currentSlide = (n+slides.length)%slides.length;
    slides[currentSlide].className = 'slider__item slider__item--current';
    setColor(n);
}
// клик по кнопкам в мобильной версии
next.onclick = function() {
    nextSlide();
};
previous.onclick = function() {
    previousSlide();
};

// клик по точкам в десктоп версии
function dotsClick(n) {
    slides[currentSlide].className = 'slider__item';
    currentSlide = (n+slides.length - 1)%slides.length;
    slides[currentSlide].className = 'slider__item slider__item--current';
    for (var i = 0; i < dots.length; i++) {
        dots[i].className = "slider-controls__dot";
    }
    dots[currentSlide].className = "slider-controls__dot slider-controls__dot--current";
    setColor(n);
}

// свайп влево/вправо на мобильной версии
let touchStartX = 0;
let touchEndX = 0;

header.addEventListener('touchstart', function(event) {
    touchStartX = event.changedTouches[0].screenX;
}, false);

header.addEventListener('touchend', function(event) {
    touchEndX = event.changedTouches[0].screenX;
    handleGesture();
}, false);

function handleGesture() {
    if (media.matches === false) {
        if (touchEndX <= touchStartX) {
            previousSlide()
        }

        if (touchEndX >= touchStartX) {
            nextSlide()
        }
    }
}
