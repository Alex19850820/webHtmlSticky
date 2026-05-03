class MagneticButton {
  constructor(button) {
    if (!button) {
      console.warn('Magnetic button element not found');
      return;
    }

    this.button = button;
    this.originalX = button.offsetLeft;
    this.originalY = button.offsetTop;
    this.distance = 50;
    this.init();
  }

  init() {
    document.addEventListener('mousemove', (e) => this.handleMouseMove(e));
  }

  handleMouseMove(e) {
    const buttonRect = this.button.getBoundingClientRect();
    const mouseX = e.clientX;
    const mouseY = e.clientY;

    const dx = mouseX - (buttonRect.left + buttonRect.width / 2);
    const dy = mouseY - (buttonRect.top + buttonRect.height / 2);
    const distance = Math.sqrt(dx * dx + dy * dy);

    if (distance < this.distance) {
      const force = 1 - distance / this.distance;
      const moveX = dx * force * 0.3;
      const moveY = dy * force * 0.3;

      this.button.style.transform = `translate(${moveX}px, ${moveY}px)`;
    } else {
      this.button.style.transform = '';
    }
  }
}

// Инициализация с проверкой существования элемента
const magneticButton = document.querySelector('.magnetic-btn');
if (magneticButton) {
  new MagneticButton(magneticButton);
}