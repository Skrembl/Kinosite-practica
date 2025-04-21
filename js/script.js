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

    if(bgUrl) {
        const headerBg = document.getElementById("body-bg__movie");
        headerBg.style.backgroundImage = `url(${decodeURIComponent(bgUrl)})`;
        headerBg.style.backgroundSize = "cover";
        headerBg.style.backgroundPosition = "center";
        headerBg.style.height = "930px";
    }

    if(id) {
        document.querySelectorAll(".movie-card").forEach((card) => {
            card.style.display = card.id === id ? "block" : "none";
        });
    }