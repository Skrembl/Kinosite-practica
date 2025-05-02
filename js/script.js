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

    if (full.style.maxHeight === "0px" || !full.style.maxHeight) {
        infoText.style.marginBottom = "-5px";
        full.style.maxHeight = full.scrollHeight + "px";
        link.style.display = "none";
        collapse.style.display = "block";
        hide.style.display = "none";
    } else {
        infoText.style.marginBottom = "";
        full.style.maxHeight = "0";
        link.style.display = "block";
        collapse.style.display = "none";
        hide.style.display = "contents";
    }
}

// ! Обработчик переключателя
const toggle = document.querySelector(".input");
const html = document.documentElement;

// ! Проверка сохраненной темы
const savedTheme = localStorage.getItem("theme") || "light";
html.setAttribute("data-theme", savedTheme);
toggle.checked = savedTheme === "dark";

// ! Изменения переключателя
toggle.addEventListener("change", function () {
    const theme = this.checked ? "dark" : "light";
    html.setAttribute("data-theme", theme);
    localStorage.setItem("theme", theme);
});

// ! Скролл для карточек-отзывов по айди
const containerIds = [
    "cardsContainer1",
    "cardsContainer2",
    "cardsContainer3",
    "cardsContainer4",
    "cardsContainer5",
    "cardsContainer6",
    "cardsContainer7",
    "cardsContainer8",
];

containerIds.forEach((id) => {
    const container = document.getElementById(id);
    if (!container) return;

    let isDown = false;
    let startX;
    let scrollLeft;

    container.addEventListener("mousedown", (e) => {
        isDown = true;
        container.classList.add("active");
        const rect = container.getBoundingClientRect();
        startX = e.pageX - rect.left;
        scrollLeft = container.scrollLeft;
    });

    container.addEventListener("mouseleave", () => {
        isDown = false;
        container.classList.remove("active");
    });

    container.addEventListener("mouseup", () => {
        isDown = false;
        container.classList.remove("active");
    });

    container.addEventListener("mousemove", (e) => {
        if (!isDown) return;
        e.preventDefault();
        const rect = container.getBoundingClientRect();
        const x = e.pageX - rect.left;
        const walk = (x - startX) * 2;
        container.scrollLeft = scrollLeft - walk;
    });
});

//! Форма отзывов
document.addEventListener("DOMContentLoaded", function () {
    const urlParams = new URLSearchParams(window.location.search);
    const movieId = urlParams.get("id");

    if (!movieId) {
        const reviewsBlock = document.getElementById("reviews");
        if (reviewsBlock) reviewsBlock.innerHTML = "<p>Фильм не найден.</p>";
        return;
    }

    const reviewForm = document.getElementById(`review-form-${movieId}`);
    const nameInput = document.getElementById(`name-${movieId}`);
    const messageInput = document.getElementById(`message-${movieId}`);
    const reviewsBlock = document.getElementById(`reviews-${movieId}`);

    function loadReviews() {
        if (!reviewsBlock) return;

        reviewsBlock.innerHTML = "";

        fetch(`server/get_reviews.php?id=${movieId}`)
            .then((res) => {
                if (!res.ok) throw new Error("Ошибка ответа сервера");
                return res.json();
            })
            .then((data) => {
                if (!Array.isArray(data) || data.length === 0) {
                    reviewsBlock.innerHTML = "<b>Пока нет отзывов.</b>";
                    return;
                }

                data.forEach((r) => {
                    const date = new Date(r.date).toLocaleDateString("ru-RU");
                    const fullText = r.review.replace(/\n/g, "<br>");
                    const shortText =
                        fullText.length > 220
                            ? fullText.slice(0, 220) + "..."
                            : fullText;

                    const html = `
              <div class="rc-one"> 
                <div class="raiting">
                  <div class="rc-info">
                    <h6>${r.name}</h6>
                    <span>${date}</span>
                  </div>
                </div>
                <p class="rc-text">${shortText}</p>
                ${fullText.length > 220 ? `<a href="#" class="read-more">Читать</a>` : ""}
              </div>`;
                    reviewsBlock.insertAdjacentHTML("beforeend", html);
                });
            })
            .catch((err) => {
                console.error("Ошибка загрузки отзывов:", err);
                reviewsBlock.innerHTML = "<b>Ошибка загрузки отзывов.</b>";
            });
    }

    if (reviewForm) {
        reviewForm.addEventListener("submit", function (event) {
            event.preventDefault();

            const name = nameInput.value.trim();
            const text = messageInput.value.trim();

            if (!name || !text) {
                alert("Пожалуйста, заполните все поля.");
                return;
            }

            const formData = new FormData();
            formData.append("name", name);
            formData.append("review", text);
            formData.append("movie_id", movieId);

            fetch("server/save_review.php", {
                method: "POST",
                body: formData,
            })
                .then((res) => {
                    if (!res.ok) throw new Error("Ошибка при отправке");
                    return res.json();
                })
                .then((data) => {
                    if (data.error) {
                        alert(data.error);
                    } else {
                        reviewForm.reset();
                        loadReviews();
                    }
                })
                .catch((err) => {
                    console.error("Ошибка отправки отзыва:", err);
                    alert("Не удалось отправить отзыв. Попробуйте позже.");
                });
        });
    }

    loadReviews();
});
