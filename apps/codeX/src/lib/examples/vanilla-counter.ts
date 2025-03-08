export const vanillaCounterExample = {
  js: `// A simple counter implementation in vanilla JavaScript
class Counter {
  constructor(rootElement) {
    this.count = 0;
    this.root = rootElement;
    this.render();
    this.attachEvents();
  }

  increment() {
    this.count++;
    this.updateDisplay();
  }

  decrement() {
    this.count--;
    this.updateDisplay();
  }

  updateDisplay() {
    const display = this.root.querySelector('.counter-display');
    if (display) {
      display.textContent = this.count;
    }
  }

  render() {
    this.root.innerHTML = \`
      <div class="counter-container">
        <h2>Vanilla JS Counter</h2>
        <div class="counter-controls">
          <button class="counter-button decrement">-</button>
          <span class="counter-display">0</span>
          <button class="counter-button increment">+</button>
        </div>
      </div>
    \`;
  }

  attachEvents() {
    const incrementBtn = this.root.querySelector('.increment');
    const decrementBtn = this.root.querySelector('.decrement');

    incrementBtn.addEventListener('click', () => this.increment());
    decrementBtn.addEventListener('click', () => this.decrement());
  }
}

// Initialize the counter when the DOM is ready
document.addEventListener('DOMContentLoaded', () => {
  const root = document.getElementById('root');
  new Counter(root);
});`,

  css: `.counter-container {
  max-width: 300px;
  margin: 2rem auto;
  padding: 2rem;
  text-align: center;
  background: white;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.counter-container h2 {
  margin-bottom: 1.5rem;
  color: #333;
}

.counter-controls {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 1rem;
}

.counter-button {
  background: #4a90e2;
  color: white;
  border: none;
  border-radius: 4px;
  padding: 0.5rem 1rem;
  font-size: 1.25rem;
  cursor: pointer;
  transition: background-color 0.2s;
}

.counter-button:hover {
  background: #357abd;
}

.counter-display {
  font-size: 2rem;
  font-weight: bold;
  min-width: 3rem;
  color: #333;
}`
}