
"use strict";

const mainListDiv = document.getElementById("mainListDiv"),
    mediaButton = document.getElementById("mediaButton");

const header = document.querySelector('.header');
const nav = document.querySelector('.nav');
const navHeight = nav.getBoundingClientRect().height;
const logo = document.querySelector('.logo-link');
const mediaBtnChildren = document.querySelectorAll('.media-button-span');
const navLinks = document.querySelector('.nav-links');
const allSections = document.querySelectorAll('.section');

// ///////////////////////////////////////
// Functions

const mediaBtnActive = function () {
    nav.classList.add('sticky');
    logo.classList.add('logoColor');
    mediaBtnChildren.forEach(child => child.style.backgroundColor = 'white');
};

const mediaBtnDeactive = function () {
    nav.classList.remove('sticky');
    logo.classList.remove('logoColor');
    mediaBtnChildren.forEach(child => child.style.backgroundColor = 'var(--theme-color-logo)');
};

const removeNavLinkClick = function () {
    document.querySelectorAll('.nav-link').forEach(navLink => navLink.classList.remove('clicked'));
};

///////////////////////////////////////
// burger menu click event
mediaButton.addEventListener('click', function () {
    mainListDiv.classList.toggle("show_list");
    mediaButton.classList.toggle("active");
    mediaBtnActive();
});

///////////////////////////////////////
// Sticky navigation: Intersection Observer API

const stickyNav = function (entries) {
    const [entry] = entries;
    if (!entry.isIntersecting) {
        mediaBtnActive();
    }
    else {
        mainListDiv.classList.remove("show_list");
        mediaButton.classList.remove("active");
        mediaBtnDeactive();
        removeNavLinkClick();
    }
}

const headerObserver = new IntersectionObserver(stickyNav, {
    root: null,
    threshold: 0,
    rootMargin: `${navHeight}px`,
});

headerObserver.observe(header);

///////////////////////////////////////
// Smooth Scrolling

navLinks.addEventListener('click', function (e) {
    e.preventDefault();
    removeNavLinkClick();

    e.target.classList.add('clicked');
    if (e.target.classList.contains('nav-link')) {
        const id = e.target.getAttribute('href');
        document.querySelector(id).scrollIntoView({ behavior: 'smooth' });
    }
});

///////////////////////////////////////
// Reveal sections
const revealSection = function (entries, observer) {
    const [entry] = entries;

    if (!entry.isIntersecting) return;
    entry.target.classList.remove('section-hidden');
    observer.unobserve(entry.target);
};

const sectionObserver = new IntersectionObserver(revealSection, {
    root: null,
    threshold: 0.15,
});

allSections.forEach(section => {
    sectionObserver.observe(section);
    section.classList.add('section-hidden');
});