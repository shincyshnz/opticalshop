
"use strict";

const mainListDiv = document.getElementById("mainListDiv"),
    mediaButton = document.getElementById("mediaButton");

const header = document.querySelector('.header');
const nav = document.querySelector('.nav');
const navHeight = nav.getBoundingClientRect().height;
const logo = document.querySelector('.logo-link');

///////////////////////////////////////
// burger menu
mediaButton.onclick = function () {
    mainListDiv.classList.toggle("show_list");
    mediaButton.classList.toggle("active");

};

///////////////////////////////////////
// Sticky navigation: Intersection Observer API

const stickyNav = function (entries) {
    const [entry] = entries;
    if (!entry.isIntersecting) {
        nav.classList.add('sticky');
        logo.classList.add('logoColor');
    }
    else {
        nav.classList.remove('sticky');
        logo.classList.remove('logoColor');
    }
}

const headerObserver = new IntersectionObserver(stickyNav, {
    root: null,
    threshold: 0,
    rootMargin: `${navHeight}px`,
});

headerObserver.observe(header);