// Функція для перевірки сторінки
function isIndexPage() {
    return window.location.pathname.endsWith('index.html') || window.location.pathname === '/';
}

// Закриття банера
const closeButton = document.querySelector('.close-button');
if (closeButton) {
    closeButton.addEventListener('click', () => {
        const banner = document.querySelector('.banner');
        if (banner) banner.style.display = 'none';
    });
}

// Функція для мобільного меню
function toggleMenu() {
    const mobileMenu = document.getElementById('mobileMenu');
    if (mobileMenu) {
        mobileMenu.classList.toggle('open');
        document.body.classList.toggle('no-scroll');
    }
}

// Закриття мобільного меню при кліку поза межами
document.addEventListener('click', (event) => {
    const mobileMenu = document.getElementById('mobileMenu');
    const burgerMenu = document.querySelector('.burger-menu');
    if (mobileMenu && burgerMenu && !mobileMenu.contains(event.target) && !burgerMenu.contains(event.target)) {
        mobileMenu.classList.remove('open');
        document.body.classList.remove('no-scroll');
    }
});

// Додаємо розмиття фону
function addBlurEffect() {
    const overlay = document.querySelector('.modal-blur-overlay');
    if (overlay) overlay.style.display = 'block';
}

// Видаляємо розмиття фону
function removeBlurEffect() {
    const overlay = document.querySelector('.modal-blur-overlay');
    if (overlay) overlay.style.display = 'none';
}

// Логіка для модальних вікон ТІЛЬКИ на головній сторінці
if (isIndexPage()) {
    document.addEventListener('DOMContentLoaded', () => {
        fetch('json/properties.json')
            .then(response => response.json())
            .then(data => {
                const creator = data.creator;
                const siteDescription = data.siteDescription;

                addBlurEffect();
                Swal.fire({
                    title: `${creator.name} - ${creator.role}`,
                    text: `${siteDescription}\n${creator.description}`,
                    imageUrl: creator.image || 'img/default.jpg',
                    imageWidth: 100,
                    imageHeight: 100,
                    confirmButtonText: 'OK',
                    background: '#1a1a1a',
                    color: '#fff',
                    didClose: () => removeBlurEffect(),
                });

                // Додаємо модальні вікна для кнопок "View Property Details"
                const properties = data.properties;
                document.querySelectorAll('.view-details6').forEach((button, index) => {
                    button.addEventListener('click', () => {
                        const property = properties[index];
                        Swal.fire({
                            title: property.name,
                            text: property.details,
                            imageUrl: property.image,
                            imageWidth: 300,
                            imageHeight: 200,
                            confirmButtonText: 'Close',
                            background: '#1a1a1a',
                            color: '#fff'
                        });
                    });
                });
            })
            .catch(error => console.error('Error loading JSON:', error));
    });
}

// Ініціалізація Swiper лише для мобільних
function initSwiper() {
    if (window.innerWidth <= 768 && document.querySelector('.swiper-container')) {
        new Swiper('.swiper-container', {
            loop: true,
            slidesPerView: 1,
            centeredSlides: true,
            autoplay: { delay: 3000, disableOnInteraction: false },
            speed: 500,
            navigation: { nextEl: '.swiper-button-next', prevEl: '.swiper-button-prev' },
            pagination: { el: '.swiper-pagination', clickable: true },
        });
    }
}

// Тема: темна/світла збереження в localStorage
const themeSwitch = document.getElementById('theme-switch');
const themeText = document.getElementById('theme-text');

function loadTheme() {
    const isDarkMode = localStorage.getItem('dark-mode') === 'true';
    if (themeSwitch) themeSwitch.checked = isDarkMode;
    applyTheme(isDarkMode);
}

function applyTheme(isDarkMode) {
    if (isDarkMode) {
        document.body.classList.add('dark-theme');
        document.body.classList.remove('light-theme');
        if (themeText) themeText.textContent = 'Dark Mode: ON';
    } else {
        document.body.classList.add('light-theme');
        document.body.classList.remove('dark-theme');
        if (themeText) themeText.textContent = 'Dark Mode: OFF';
    }
}

if (themeSwitch) {
    themeSwitch.addEventListener('change', () => {
        const isDarkMode = themeSwitch.checked;
        applyTheme(isDarkMode);
        localStorage.setItem('dark-mode', isDarkMode);
    });
}

document.addEventListener('DOMContentLoaded', () => {
    loadTheme();
    initSwiper();
});

// Додаємо клас для прозорості navbar при прокрутці
document.addEventListener('DOMContentLoaded', () => {
    const navbar = document.querySelector('.navbar');
    if (navbar) {
        window.addEventListener('scroll', () => {
            if (window.scrollY > 50) {
                navbar.classList.add('transparent');
            } else {
                navbar.classList.remove('transparent');
            }
        });
    }
});
