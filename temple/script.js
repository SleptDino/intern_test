let autoplayInterval;
let currentIndex = 0;
const gallery = document.getElementById('galleryContainer');
const items = document.querySelectorAll('.wat');
const totalItems = items.length;

function slideToIndex(index) {
  gallery.style.transform = `translateX(-${index * 100}%)`;
}

function nextSlide() {
  currentIndex = (currentIndex + 1) % totalItems;
  slideToIndex(currentIndex);
}

function toggleAutoplay() {
  const isAutoplay = document.getElementById('autoplayToggle').checked;

  if (isAutoplay) {
    autoplayInterval = setInterval(nextSlide, 2000); 
  } else {
    clearInterval(autoplayInterval);
  }
}

function setColumns() {
  const columnCount = document.getElementById('columnSelector').value;
  gallery.style.gridTemplateColumns = `repeat(${columnCount}, 1fr)`;
}
