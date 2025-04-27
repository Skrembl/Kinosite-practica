// ! Смена изображения при наведении на карточки(карусель)
document.addEventListener("DOMContentLoaded", function () {
    const cards = document.querySelectorAll(".card-all");
    const bodyBg = document.getElementById("body-bg");

    if (!bodyBg) {
        console.error("Элемент body-bg не найден");
        return;
    }

    const defaultBg = getComputedStyle(bodyBg).backgroundImage;
    const preloadImages = () => {
        const images = new Set();
        cards.forEach((card) => {
            const bg = card.dataset.bg;
            if (bg) images.add(bg);
        });
        images.forEach((src) => {
            new Image().src = src;
        });
    };
    
    preloadImages();
    cards.forEach((card) => {
        card.addEventListener("mouseenter", function () {
            const bgImage = this.dataset.bg;
            bodyBg.style.backgroundImage = `url(${bgImage})`;
        });

        card.addEventListener("mouseleave", function () {
            bodyBg.style.backgroundImage = defaultBg;
        });
    });
});

// ! Обработчик + вывод по айди
document.querySelectorAll(".card-all").forEach((card) => {
    card.addEventListener("click", () => {
        const movieId = card.getAttribute("data-id");
        const bgImage = card.getAttribute("data-bg");
        window.location.href = `movies.html?id=${movieId}&bg=${encodeURIComponent(bgImage)}`;
    });
});

// ! Вывод нужного блока по айди
const params = new URLSearchParams(window.location.search);
const id = params.get("id");

if (id) {
    document.querySelectorAll(".movie-card").forEach((card) => {
        if (card.id === id) {
            card.style.display = "block";
        } else {
            card.style.display = "none";
        }
    });

    document.querySelectorAll(".info-movie").forEach((info) => {
        if (info.id === id) {
            info.style.display = "block";
        } else {
            info.style.display = "none";
        }
    });
}

const usp = new URLSearchParams(window.location.search);
const idUsp = usp.get("id");
const bgUrl = usp.get("bg");

// ! Стили для bg
if (bgUrl) {
    const headerBg = document.getElementById("body-bg__movie");
    
    if (headerBg) {
        headerBg.style.position = "relative";
        headerBg.style.width = "100%";
        headerBg.style.height = "930px";
        headerBg.style.overflow = "hidden";

        headerBg.style.backgroundImage = `url(${decodeURIComponent(bgUrl)})`;
        headerBg.style.backgroundRepeat = "no-repeat";
        headerBg.style.backgroundSize = "cover";
        headerBg.style.backgroundPosition = "center";
        headerBg.style.backgroundAttachment = "fixed";
    }
}

// ! Обработчик рейтинга
document.querySelectorAll(".rating").forEach((ratingContainer) => {
    const inputs = ratingContainer.querySelectorAll('input[type="radio"]');

    inputs.forEach((input) => {
        input.addEventListener("change", function () {
            const cardId = this.closest(".movie-card").id;
            const ratingValue = this.value;
            console.log(`Оценка ${ratingValue} для карточки ${cardId}`);
        });
    });
});

// ! Скрытие и показ описания фильмов по айди
function toggleText(cardId) {
    const infoText = document.getElementById(`infoText-${cardId}`);
    const full = document.getElementById(`mcFull-${cardId}`);
    const link = document.getElementById(`link-text-${cardId}`);
    const collapse = document.getElementById(`linkCollapse-${cardId}`);
    const hide = document.getElementById(`span-hide-${cardId}`);

    if (full.style.display === 'none' || full.style.display === '') {
        infoText.style.marginBottom = '-10px';
        full.style.display = 'block';
        link.style.display = 'none';
        collapse.style.display = 'block';
        hide.style.display = 'none';
    } else {
        full.style.display = 'none';
        link.style.display = 'block';
        collapse.style.display = 'none';
        hide.style.display = 'contents';
    }
}