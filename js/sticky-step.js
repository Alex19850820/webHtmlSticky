class StickyStepBlock {
  constructor(container) {
    this.container = container;
    this.titles = container.querySelectorAll('.title');
    this.images = container.querySelectorAll('.image-slide');
    this.scrollContainer = container.querySelector('.images-container');
    this.currentActiveIndex = 0;

    this.init();
  }

  init() {
    window.addEventListener('load', () => {
      
      setTimeout(() => {
        this.setupScrollHandler();
        // Гарантированно устанавливаем первый заголовок активным
        this.setActiveTitle(0);
        
        // Сразу проверяем позицию
        this.updateActiveTitle();
      }, 500);
    });
  }

  setupScrollHandler() {
    if (!this.scrollContainer) {
      console.error('❌ Контейнера скролла не найдено!');
      return;
    }


    // ВЕШАЕМ ОБРАБОТЧИК НА ОКНО, А НЕ НА КОНТЕЙНЕР
    window.addEventListener('scroll', () => {
      this.updateActiveTitle();
    }, { passive: true });

    // Также отслеживаем resize
    window.addEventListener('resize', () => {
      setTimeout(() => this.updateActiveTitle(), 100);
    });
  }

  updateActiveTitle() {
    // Используем window.scrollY для позиции скролла
    const scrollTop = window.scrollY;

    let newActiveIndex = 0;
    let bestMatchDistance = Infinity;

    // Проходим по всем изображениям
    this.images.forEach((image, index) => {
      const imageRect = image.getBoundingClientRect();

      // Вычисляем абсолютную позицию изображения
      const imageAbsoluteTop = imageRect.top + scrollTop;
      const distanceToScroll = Math.abs(imageAbsoluteTop - scrollTop);


      if (distanceToScroll < bestMatchDistance) {
        bestMatchDistance = distanceToScroll;
        newActiveIndex = index;
      }
    });


    // Обновляем активный заголовок, только если индекс изменился
    if (newActiveIndex !== this.currentActiveIndex) {
      this.setActiveTitle(newActiveIndex);
    }
  }

  setActiveTitle(index) {

    // Удаляем класс active у всех заголовков
    this.titles.forEach(title => title.classList.remove('active'));

    // Добавляем класс active новому заголовку
    const targetTitle = this.titles[index];
    if (targetTitle) {
      targetTitle.classList.add('active');
      this.currentActiveIndex = index;
    } else {
      console.error(`❌ Заголовок ${index} не найден в DOM!`);
    }
  }
}

// Инициализация
document.addEventListener('DOMContentLoaded', () => {

  const block = document.querySelector('.sticky-step-block');
  if (block) {
    new StickyStepBlock(block);
  } else {
    console.error('❌ Блок .sticky-step-block не найден в DOM!');
  }
});
