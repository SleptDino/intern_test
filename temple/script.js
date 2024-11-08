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
  const columnSelector = document.getElementById('columnSelector'); 
  const galleryContainer = document.getElementById('galleryContainer'); 
  const columns = columnSelector.value; 
  
 
  galleryContainer.style.gridTemplateColumns = `repeat(${columns}, 1fr)`;
}
