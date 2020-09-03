/**
 * Define Global Variables
 * 
*/

/* global document */
/* global window */

const sections = document.querySelectorAll('section');
const navList = document.getElementById('navbar__list');
const navItems = [];


/**
 * End Global Variables
 * Start Helper Functions
 * 
*/

//Extract section ids as navigation items.
for (let i = 0; i < sections.length; i++) {
    const section = sections[i];
    navItems.push(section.getAttribute('id'));
}


/**
 * End Helper Functions
 * Begin Main Functions
 * 
*/

// build the nav
const nav = () => {
    for (let i = 1; i <= navItems.length; i++) {
        const newList = document.createElement('li');
        const newAnchor = document.createElement('a');
        newAnchor.setAttribute('class', 'menu__link');
        newAnchor.classList.add(`section${i}`);
        newAnchor.setAttribute('href', `#section${i}`);
        newAnchor.textContent = `Section ${i}`;
        newList.appendChild(newAnchor);
        navList.appendChild(newList);
    }
};


// Add class 'active' to section when near top of viewport
const isInViewport = element => {
    const position = element.getBoundingClientRect();
    return (position.top <= 150 && position.bottom >= 150) ? true : false;
};

const activeSection = () => {
    document.addEventListener('scroll', () => {
        for (const section of sections) {
            if (isInViewport(section)) {
                const id = section.getAttribute('id');
                document.querySelector(`.${id}`).classList.add('active');
                section.classList.add('your-active-class');
            } else {
                const id = section.getAttribute('id');
                document.querySelector(`.${id}`).classList.remove('active');
                section.classList.remove('your-active-class');
            }
        }
    });
};


// Scroll to anchor ID using scrollTO event
const scrollToSection = () => {
    document.addEventListener('click', e => {
        const target = e.target;
        if (!target.classList.contains('menu__link'))
            return;
        e.preventDefault();
        const targetId = target.hash;
        document.querySelector(targetId).scrollIntoView({
            behavior: 'smooth',
            block: 'start',
            inline: 'nearest',
        });
    });
};


// Show the pagetop button when the user scrolls down 100px from the top of the document 
const pageTopButton = document.getElementById('page__top');

const showButton = () => {
  let y = window.scrollY;
  if (y > 100) {
    pageTopButton.className = 'top__button show';
  } else {
    pageTopButton.className = 'top__button hide';
  }
};

const showPageTop = () => {
  window.addEventListener('scroll', showButton);
};


// Scroll to page top if the user click the page top button
const scrollToTop = () => {
  const c = document.documentElement.scrollTop || document.body.scrollTop;
  if (c > 0) {
    window.requestAnimationFrame(scrollToTop);
    window.scrollTo(0, c - c / 40);
  }
};

const goTop = () => {
  pageTopButton.onclick = function(e) {
  e.preventDefault();
  scrollToTop();
  }
}


/**
 * End Main Functions
 * Begin Events
 * 
*/

// Build menu 
//nav();

// Scroll to section on link click
scrollToSection();

// Set sections as active
activeSection();

// Show page top button
showPageTop();

// Scroll to page top
goTop();