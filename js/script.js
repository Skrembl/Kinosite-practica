const cards = document.querySelectorAll('.card');
const background = document.querySelector('.background');

cards.forEach(card => {
  card.addEventListener('mouseenter', () => {
    const bg = card.getAttribute('data-bg');
    background.style.backgroundImage = `url(${bg})`;
    background.style.opacity = 1;
  });

  card.addEventListener('mouseleave', () => {
    background.style.opacity = 0;
  });
});


