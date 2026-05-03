class SmartMarquee {
  constructor(element) {
    this.element = element;
    this.text = element.querySelector('.marquee-text');
    this.lastScrollY = window.pageYOffset;
    this.isResetting = false;
    this.animationFrame = null; // Храним ID requestAnimationFrame

    if (!this.text) {
      console.error('❌ .marquee-text не найден!');
      return;
    }

    console.log('✅ SmartMarquee готов к работе');
    this.resetPosition();

    // Добавляем обработчики событий
    window.addEventListener('scroll', this.handleScroll.bind(this), { passive: true });
    window.addEventListener('resize', this.resetPosition.bind(this));
  }

  resetPosition() {
    this.isResetting = true;

    const containerWidth = this.element.offsetWidth;
    const textWidth = this.text.offsetWidth;

    this.currentPosition = containerWidth + textWidth * 0.1; // Буфер 10 %
    this.updateTransform();

    setTimeout(() => {
      this.isResetting = false;
      console.log('✅ Сброс позиции завершён');
    }, 100);
  }

  handleScroll() {
    if (this.isResetting) return;

    const scrollY = window.pageYOffset;
    const delta = scrollY - this.lastScrollY;
    const speed = Math.abs(delta) * 1; // Скорость: 2 px за 1 px скролла

    this.currentPosition += delta > 0 ? -speed : speed;

    // Проверяем, не ушёл ли текст слишком далеко влево
    const maxLeft = -(this.text.offsetWidth * 1.2); // Буфер увеличен до 20 % для надёжности
    if (this.currentPosition < maxLeft) {
      console.log('🔁 Сбрасываем позицию — текст ушёл слишком далеко!');
      this.resetPosition();
      return;
    }

    // Запускаем анимацию через requestAnimationFrame
    this.scheduleAnimation();

    this.lastScrollY = scrollY;
  }

  scheduleAnimation() {
    // Если уже запланирован кадр, не планируем новый
    if (this.animationFrame) return;

    this.animationFrame = requestAnimationFrame(() => {
      this.updateTransform();
      this.animationFrame = null; // Сбрасываем флаг после выполнения
    });
  }

  updateTransform() {
    this.text.style.transform = `translateX(${this.currentPosition}px)`;
  }

  destroy() {
    window.removeEventListener('scroll', this.handleScroll.bind(this));
    window.removeEventListener('resize', this.resetPosition.bind(this));
    if (this.animationFrame) {
      cancelAnimationFrame(this.animationFrame);
    }
  }
}

document.addEventListener('DOMContentLoaded', () => {
  const marqueeElement = document.querySelector('.smart-marquee');

  if (marqueeElement) {
    new SmartMarquee(marqueeElement);
    console.log('✅ Объект SmartMarquee создан и инициализирован');
  } else {
    console.error('❌ Элемент .smart-marquee не найден в DOM');
  }
});
