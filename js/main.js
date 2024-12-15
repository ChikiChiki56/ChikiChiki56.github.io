//Закриття баннера
document.querySelector('.close-button').addEventListener('click', () => {
    const banner = document.querySelector('.banner');
    banner.style.display = 'none';
});


document.addEventListener('click', function (event) {
    const mobileMenu = document.getElementById('mobileMenu');
    const burgerMenu = document.querySelector('.burger-menu');

    // Перевіряємо, чи натиснуто за межами меню або кнопки
    if (!mobileMenu.contains(event.target) && !burgerMenu.contains(event.target)) {
        mobileMenu.classList.remove('open'); // Закриваємо меню
    }
});

function toggleMenu() {
    const mobileMenu = document.getElementById('mobileMenu');
    if (mobileMenu.classList.contains('open')) {
        mobileMenu.classList.remove('open'); // Закриваємо меню
    } else {
        mobileMenu.classList.add('open'); // Відкриваємо меню
    }
}

const swiper = new Swiper('.swiper-container', {
    loop: true, // Циклічний свайп
    slidesPerView: 1, // Одна картка на екрані
    centeredSlides: true, // Центрування активного слайда
    autoplay: {
      delay: 3000, // Автозапуск через 3 секунди
      disableOnInteraction: false, // Продовження після взаємодії
    },
    speed: 500, // Швидкість анімації свайпа
    navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev',
    },
    pagination: {
        el: '.swiper-pagination',
        clickable: true,
    },
    initialSlide: 0, // Починаємо зі слайда 0
});

document.addEventListener('DOMContentLoaded', () => {
    // Завантаження даних з JSON
    fetch('json/properties.json')
        .then(response => {
            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }
            return response.json();
        })
        .then(data => {
            // Витягування даних з JSON
            const creator = data.creator;
            const siteDescription = data.siteDescription;

            // Використання SweetAlert2 для модального вікна
            Swal.fire({
                title: `${creator.name} - ${creator.role}`,
                text: siteDescription,
                imageUrl: creator.image,
                imageWidth: 100,
                imageHeight: 100,
                imageAlt: 'Creator Image',
                confirmButtonText: 'OK',
                background: '#1a1a1a',
                color: '#fff'
            });
        })
        .catch(error => console.error('Помилка завантаження JSON:', error));
});
