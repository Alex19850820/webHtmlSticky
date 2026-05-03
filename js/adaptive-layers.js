class AdaptiveLayers {
  constructor(container) {
    if (!container) {
      console.warn('Adaptive layers container not found');
      return;
    }

    this.container = container;
    this.photos = container.querySelectorAll('.photo');
    this.init();
  }

  init() {
    this.photos.forEach(photo => {
      photo.addEventListener('mouseenter', () => this.onPhotoHover(photo));
      photo.addEventListener('mouseleave', () => this.onPhotoLeave());
    });
  }

  onPhotoHover(hoveredPhoto) {
    hoveredPhoto.style.zIndex = '10';

    this.photos.forEach(photo => {
      if (photo !== hoveredPhoto) {
        photo.style.opacity = '0.7';
        photo.style.transform = 'scale(0.95)';
      }
    });

    const title = this.container.querySelector('.main-title');
    if (title) {
      title.style.textShadow = '0 2px 15px rgba(0, 0, 0, 0.8)';
    }
  }

  onPhotoLeave() {
    this.photos.forEach((photo, index) => {
      photo.style.zIndex = (index + 3).toString();
      photo.style.opacity = '1';
      photo.style.transform = '';
    });

    const title = this.container.querySelector('.main-title');
    if (title) {
      title.style.textShadow = '0 2px 10px rgba(0, 0, 0, 0.5)';
    }
  }
}

// Инициализация с проверкой
const adaptiveContainer = document.querySelector('.adaptive-layers');
if (adaptiveContainer) {
  new AdaptiveLayers(adaptiveContainer);
}
