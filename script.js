// script.js - Bubble Sort Visualizer
// Keep this file external and link with <script src="script.js" defer></script>

(() => {
  // DOM elements
  const sizeInput = document.getElementById('sizeInput');
  const speedInput = document.getElementById('speedInput');
  const generateBtn = document.getElementById('generateBtn');
  const shuffleBtn = document.getElementById('shuffleBtn');
  const stepBtn = document.getElementById('stepBtn');
  const sortBtn = document.getElementById('sortBtn');
  const stopBtn = document.getElementById('stopBtn');
  const visualContainer = document.getElementById('visualContainer');
  const comparisonsEl = document.getElementById('comparisons');
  const swapsEl = document.getElementById('swaps');

  let array = [];
  let generator = null;
  let running = false;
  let currentTimeout = null;
  let stats = { comparisons: 0, swaps: 0 };

  function randInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  function createArray(n = 20) {
    const arr = Array.from({ length: n }, () => randInt(10, 100));
    return arr;
  }

  function renderArray(arr, highlights = {}) {
    // highlights: {i: 'comparing'|'swapping', j: ...}
    visualContainer.innerHTML = '';
    const max = Math.max(...arr, 100);
    const size = arr.length;
    const barWidth = Math.max(6, Math.floor((visualContainer.clientWidth - (size - 1) * 4) / size));
    arr.forEach((v, i) => {
      const bar = document.createElement('div');
      bar.className = 'bar';
      if (highlights[i]) bar.classList.add(highlights[i]);
      bar.style.height = `${(v / max) * 100}%`;
      bar.style.width = `${barWidth}px`;
      bar.setAttribute('title', String(v));
      bar.setAttribute('aria-label', `Value ${v}`);
      bar.textContent = v;
      visualContainer.appendChild(bar);
    });
  }

  // Bubble sort implemented as a generator so we can step
  function* bubbleSortGen(arr) {
    const a = arr.slice();
    const n = a.length;
    let swapped;
    for (let pass = 0; pass < n - 1; pass++) {
      swapped = false;
      for (let i = 0; i < n - 1 - pass; i++) {
        yield { type: 'compare', i, j: i + 1, array: a.slice() };
        if (a[i] > a[i + 1]) {
          // swap
          [a[i], a[i + 1]] = [a[i + 1], a[i]];
          swapped = true;
          yield { type: 'swap', i, j: i + 1, array: a.slice() };
        }
      }
      if (!swapped) break;
    }
    return { type: 'done', array: a.slice() };
  }

  function resetStats() {
    stats = { comparisons: 0, swaps: 0 };
    comparisonsEl.textContent = stats.comparisons;
    swapsEl.textContent = stats.swaps;
  }

  function applyStep(result) {
    if (!result) return;
    if (result.type === 'compare') {
      stats.comparisons++;
      comparisonsEl.textContent = stats.comparisons;
      renderArray(result.array, { [result.i]: 'comparing', [result.j]: 'comparing' });
    } else if (result.type === 'swap') {
      stats.swaps++;
      swapsEl.textContent = stats.swaps;
      renderArray(result.array, { [result.i]: 'swapping', [result.j]: 'swapping' });
    } else if (result.type === 'done') {
      renderArray(result.array);
      running = false;
      toggleButtons(false);
      return true;
    }
    return false;
  }

  function toggleButtons(isRunning) {
    running = isRunning;
    sortBtn.disabled = isRunning;
    stepBtn.disabled = isRunning;
    generateBtn.disabled = isRunning;
    shuffleBtn.disabled = isRunning;
    stopBtn.disabled = !isRunning;
  }

  function scheduleNext(nextFn, delay) {
    if (currentTimeout) clearTimeout(currentTimeout);
    currentTimeout = setTimeout(nextFn, delay);
  }

  // Controls
  generateBtn.addEventListener('click', () => {
    const n = parseInt(sizeInput.value, 10) || 20;
    array = createArray(Math.max(5, Math.min(60, n)));
    resetStats();
    renderArray(array);
    generator = bubbleSortGen(array);
  });

  shuffleBtn.addEventListener('click', () => {
    // simple Fisher-Yates
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
    resetStats();
    renderArray(array);
    generator = bubbleSortGen(array);
  });

  stepBtn.addEventListener('click', () => {
    if (!generator) generator = bubbleSortGen(array);
    const { value, done } = generator.next();
    if (done) {
      applyStep(value);
      toggleButtons(false);
      return;
    }
    const finished = applyStep(value);
    if (finished) toggleButtons(false);
  });

  stopBtn.addEventListener('click', () => {
    if (currentTimeout) clearTimeout(currentTimeout);
    running = false;
    toggleButtons(false);
  });

  sortBtn.addEventListener('click', () => {
    if (!generator) generator = bubbleSortGen(array);
    toggleButtons(true);
    const delay = Math.max(10, parseInt(speedInput.value, 10) || 120);

    function loop() {
      if (!running) return;
      const { value, done } = generator.next();
      if (done) {
        if (value) applyStep(value);
        toggleButtons(false);
        running = false;
        return;
      }
      const finished = applyStep(value);
      if (finished || !running) {
        toggleButtons(false);
        running = false;
        return;
      }
      scheduleNext(loop, delay);
    }

    // start
    running = true;
    loop();
  });

  // Initialize on load
  window.addEventListener('DOMContentLoaded', () => {
    array = createArray(20);
    resetStats();
    renderArray(array);
    generator = bubbleSortGen(array);
  });

  // Clean up on page unload
  window.addEventListener('beforeunload', () => {
    if (currentTimeout) clearTimeout(currentTimeout);
  });
})();