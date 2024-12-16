// Закриття банера
document.querySelector('.close-button').addEventListener('click', () => {
    const banner = document.querySelector('.banner');
    banner.style.display = 'none';
});

// Закриття мобільного меню при кліку поза межами
document.addEventListener('click', function (event) {
    const mobileMenu = document.getElementById('mobileMenu');
    const burgerMenu = document.querySelector('.burger-menu');

    if (!mobileMenu.contains(event.target) && !burgerMenu.contains(event.target)) {
        mobileMenu.classList.remove('open');
    }
});

function toggleMenu() {
    const mobileMenu = document.getElementById('mobileMenu');
    if (mobileMenu.classList.contains('open')) {
        mobileMenu.classList.remove('open');
    } else {
        mobileMenu.classList.add('open');
    }
}

// Ініціалізація Swiper тільки для мобільних пристроїв
function initSwiper() {
    if (window.innerWidth <= 768) { // Умова для мобільної версії
        const swiper = new Swiper('.swiper-container', {
            loop: true,
            slidesPerView: 1,
            centeredSlides: true,
            autoplay: {
                delay: 3000,
                disableOnInteraction: false,
            },
            speed: 500,
            navigation: {
                nextEl: '.swiper-button-next',
                prevEl: '.swiper-button-prev',
            },
            pagination: {
                el: '.swiper-pagination',
                clickable: true,
            },
            initialSlide: 0,
        });
    }
}

// Додаємо розмиття фону
function addBlurEffect() {
    const blurOverlay = document.querySelector('.modal-blur-overlay');
    blurOverlay.style.display = 'block';
}

// Видаляємо розмиття фону
function removeBlurEffect() {
    const blurOverlay = document.querySelector('.modal-blur-overlay');
    blurOverlay.style.display = 'none';
}

// Запуск SweetAlert2 модального вікна з розмиттям фону
document.addEventListener('DOMContentLoaded', () => {
    console.log('main.js loaded!');

    fetch('json/properties.json')
        .then(response => {
            console.log('Response status:', response.status);
            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }
            return response.json();
        })
        .then(data => {
            console.log('Fetched data:', data);

            const creator = data.creator;
            const siteDescription = data.siteDescription;

            // Додаємо розмиття перед показом модального вікна
            addBlurEffect();

            Swal.fire({
                title: `${creator.name} - ${creator.role}`,
                text: `${siteDescription}\n${creator.description}`,
                imageUrl: creator.image || 'img/default.jpg',
                imageWidth: 100,
                imageHeight: 100,
                imageAlt: 'Creator Image',
                confirmButtonText: 'OK',
                background: '#1a1a1a',
                color: '#fff',
                didClose: () => {
                    removeBlurEffect(); // Видалити розмиття після закриття
                }
            });
        })
        .catch(error => {
            console.error('Error loading JSON:', error);
            Swal.fire({
                title: 'Error!',
                text: 'Failed to load data.',
                icon: 'error',
                confirmButtonText: 'OK'
            });
        });
});

document.addEventListener('DOMContentLoaded', () => {
    console.log('main.js loaded!');

    // Функція для завантаження даних з JSON
    function fetchProperties() {
        return fetch('json/properties.json')
            .then(response => {
                if (!response.ok) {
                    throw new Error(`HTTP error! Status: ${response.status}`);
                }
                return response.json();
            });
    }

    // Функція для показу модального вікна з інформацією
    function showPropertyModal(property) {
        Swal.fire({
            title: property.name,
            text: property.details,
            imageUrl: property.image,
            imageWidth: 300,
            imageHeight: 200,
            imageAlt: property.name,
            confirmButtonText: 'Close',
            background: '#1a1a1a',
            color: '#fff'
        });
    }

    // Додаємо обробники подій для кнопок
    fetchProperties().then(data => {
        const properties = data.properties;

        // Додаємо обробники на кнопки "View Property Details"
        document.querySelectorAll('.view-details6').forEach((button, index) => {
            button.addEventListener('click', () => {
                const property = properties[index];
                showPropertyModal(property);
            });
        });
    }).catch(error => console.error('Error loading JSON:', error));
});

document.addEventListener('DOMContentLoaded', () => {
    const navbar = document.querySelector('.navbar');

    // Додаємо клас при прокрутці
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) { // Якщо прокрутка більше 50px
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });

    // Ваш існуючий код для мобільного меню
    document.addEventListener('click', function (event) {
        const mobileMenu = document.getElementById('mobileMenu');
        const burgerMenu = document.querySelector('.burger-menu');

        if (!mobileMenu.contains(event.target) && !burgerMenu.contains(event.target)) {
            mobileMenu.classList.remove('open');
        }
    });

    function toggleMenu() {
        const mobileMenu = document.getElementById('mobileMenu');
        if (mobileMenu.classList.contains('open')) {
            mobileMenu.classList.remove('open');
        } else {
            mobileMenu.classList.add('open');
        }
    }
});

const themeSwitch = document.getElementById('theme-switch');
const themeText = document.getElementById('theme-text');

// Перевіряємо стан теми при завантаженні
document.body.classList.add('dark-theme');

// Обробник зміни теми
themeSwitch.addEventListener('change', () => {
    if (themeSwitch.checked) {
        document.body.classList.remove('light-theme');
        themeText.textContent = 'Dark Mode: ON';
    } else {
        document.body.classList.add('light-theme');
        themeText.textContent = 'Dark Mode: OFF';
    }
});
