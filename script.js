/* ==================== MENU SHOW Y HIDDEN ==================== */
const navMenu = document.getElementById('nav-menu'),
      navToggle = document.getElementById('nav-toggle'),
      navClose = document.getElementById('nav-close');

/* Valida se a constante existe antes de aplicar evento */
if(navToggle) {
    navToggle.addEventListener('click', () => {
        navMenu.classList.add('show-menu');
    });
}

/* Esconder MENU */
if(navClose) {
    navClose.addEventListener('click', () => {
        navMenu.classList.remove('show-menu');
    });
}

/* ==================== REMOVE MENU MOBILE ==================== */
const navLink = document.querySelectorAll('.nav__link');

function linkAction() {
    const navMenu = document.getElementById('nav-menu');
    navMenu.classList.remove('show-menu');
}
navLink.forEach(n => n.addEventListener('click', linkAction));

/* ==================== CHANGE BACKGROUND HEADER ==================== */
function scrollHeader() {
    const header = document.getElementById('header');
    const headerObj = document.querySelector('.header');
    
    if(this.scrollY >= 50) {
        headerObj.classList.add('scroll-header');
    } else {
        headerObj.classList.remove('scroll-header');
    }
}
window.addEventListener('scroll', scrollHeader);

/* ==================== SCROLL SECTIONS ACTIVE LINK ==================== */
const sections = document.querySelectorAll('section[id]');

function scrollActive() {
    const scrollY = window.pageYOffset;

    sections.forEach(current => {
        const sectionHeight = current.offsetHeight;
        const sectionTop = current.offsetTop - 50;
        let sectionId = current.getAttribute('id');

        if(scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
            document.querySelector('.nav__menu a[href*=' + sectionId + ']').classList.add('active-link');
        } else {
            document.querySelector('.nav__menu a[href*=' + sectionId + ']').classList.remove('active-link');
        }
    });
}
window.addEventListener('scroll', scrollActive);

/* ==================== SCROLL UP ==================== */
function scrollUp() {
    const scrollUp = document.getElementById('scroll-up');
    if(this.scrollY >= 350) scrollUp.classList.add('show-scroll');
    else scrollUp.classList.remove('show-scroll');
}
window.addEventListener('scroll', scrollUp);

/* ==================== DARK LIGHT THEME ==================== */
const themeButton = document.getElementById('theme-button');
const themeStr = 'data-theme';

// Se o usuário já escolheu algo antes
const selectedTheme = localStorage.getItem('selected-theme');
const selectedIcon = localStorage.getItem('selected-icon');

const getCurrentTheme = () => document.documentElement.getAttribute(themeStr) === 'dark' ? 'dark' : 'light';
const getCurrentIcon = () => themeButton.classList.contains('bx-sun') ? 'bx-sun' : 'bx-moon';

if(selectedTheme) {
    document.documentElement.setAttribute(themeStr, selectedTheme);
    themeButton.classList.remove('bx-sun', 'bx-moon');
    themeButton.classList.add(selectedIcon);
}

themeButton.addEventListener('click', () => {
    // Alterna o tema
    let htmlEl = document.documentElement;
    if(htmlEl.getAttribute(themeStr) === 'dark') {
        htmlEl.setAttribute(themeStr, 'light');
        themeButton.classList.remove('bx-sun');
        themeButton.classList.add('bx-moon');
    } else {
        htmlEl.setAttribute(themeStr, 'dark');
        themeButton.classList.remove('bx-moon');
        themeButton.classList.add('bx-sun');
    }
    
    // Salva a escolha do usuário
    localStorage.setItem('selected-theme', getCurrentTheme());
    localStorage.setItem('selected-icon', getCurrentIcon());
});

/* ==================== REVEAL ANIMATIONS (INTERSECTION OBSERVER) ==================== */
const observerOptions = {
    root: null,
    rootMargin: '0px',
    threshold: 0.15
};

const observer = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
        if(entry.isIntersecting) {
            entry.target.classList.add('reveal-visible');
            // observer.unobserve(entry.target); // Descomente para animar apenas uma vez
        } else {
            // Remove a classe para repetir a animação ao scrollar para cima
            entry.target.classList.remove('reveal-visible');
        }
    });
}, observerOptions);

const revealElements = document.querySelectorAll('.reveal-up, .reveal-left, .reveal-right');
revealElements.forEach(el => observer.observe(el));

/* ==================== CONTACT FORM FAKE SUBMIT ==================== */
const contactForm = document.getElementById('contact-form');
const contactMessage = document.getElementById('contact-message');

if(contactForm) {
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        // Simulação de envio
        contactMessage.textContent = 'Mensagem enviada com sucesso! (Demonstração)';
        
        // Limpar o formulário
        contactForm.reset();
        
        setTimeout(() => {
            contactMessage.textContent = '';
        }, 5000);
    });
}

/* ==================== CUSTOM FULLSCREEN FOR POWER BI ==================== */
function toggleFullscreen(element) {
    if (!document.fullscreenElement) {
        if (element.requestFullscreen) {
            element.requestFullscreen();
        } else if (element.webkitRequestFullscreen) { /* Safari */
            element.webkitRequestFullscreen();
        } else if (element.msRequestFullscreen) { /* IE11 */
            element.msRequestFullscreen();
        }
    } else {
        if (document.exitFullscreen) {
            document.exitFullscreen();
        }
    }
}
