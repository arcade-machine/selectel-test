var slides = document.querySelectorAll(".slider__item");
var dots = document.querySelectorAll(".slider-controls__dot");
var currentSlide = 0;
var slideInterval = setInterval(nextSlide, 5000);
var next = document.querySelector(".slider-controls__button--next");
var previous = document.querySelector(".slider-controls__button--previous");
var header = document.querySelector(".main-header");

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

function dotsClick(n) {
    slides[currentSlide].className = 'slider__item';
    currentSlide = (n+slides.length - 1)%slides.length;
    slides[currentSlide].className = 'slider__item slider__item--current';
    for (i = 0; i < dots.length; i++) {
        dots[i].className = "slider-controls__dot";
    }
    dots[currentSlide].className = "slider-controls__dot slider-controls__dot--current";
    setColor(n);
}

next.onclick = function() {
    nextSlide();
};
previous.onclick = function() {
    previousSlide();
};
