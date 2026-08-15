const canvas = document.getElementById('space-bg');
const ctx = canvas.getContext('2d');

let stars = [];
const numStars = 150; // Liczba gwiazd na ekranie

// Dopasowanie rozmiaru canvasu do okna przeglądarki
function resizeCanvas() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
}

// Generowanie losowych gwiazd
function createStars() {
  stars = [];
  for (let i = 0; i < numStars; i++) {
    stars.push({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      radius: Math.random() * 1.2 + 0.3, // Promień gwiazdy (drobne punkty)
      alpha: Math.random(),               // Początkowa jasność
      speed: Math.random() * 0.015 + 0.003, // Szybkość migotania
      dir: Math.random() < 0.5 ? 1 : -1    // 1 = rozjaśnianie, -1 = ściemnianie
    });
  }
}

// Pętla animacji (wykonuje się na każdym klatkowaniu)
function animate() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  stars.forEach(star => {
    // Zmiana przezroczystości (efekt płynnego pojawiania i znikania)
    star.alpha += star.speed * star.dir;

    if (star.alpha >= 1) {
      star.alpha = 1;
      star.dir = -1;
    } else if (star.alpha <= 0) {
      star.alpha = 0;
      star.dir = 1;
    }

    // Rysowanie pojedynczego punktu
    ctx.beginPath();
    ctx.arc(star.x, star.y, star.radius, 0, Math.PI * 2);
    ctx.fillStyle = `rgba(255, 255, 255, ${Math.max(0, star.alpha)})`;
    ctx.fill();
  });

  requestAnimationFrame(animate);
}

// Aktualizacja po zmianie rozmiaru okna
window.addEventListener('resize', () => {
  resizeCanvas();
  createStars();
});

// Inicjalizacja
resizeCanvas();
createStars();
animate();
