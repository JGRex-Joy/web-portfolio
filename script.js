// Плавный скролл по секциям 
document.querySelectorAll('.nav-links a').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute('href'));
    target.scrollIntoView({ behavior: 'smooth' });
  });
});


// Неоновое свечение при наведении на кнопки и типо лого
const glowTargets = document.querySelectorAll('.btn, .btn-outline, .logo');
glowTargets.forEach(el => {
  el.addEventListener('mouseenter', () => {
    el.style.textShadow = '0 0 10px #d3e97a, 0 0 20px #d3e97a';
  });
  el.addEventListener('mouseleave', () => {
    el.style.textShadow = 'none';
  });
});

// Эффект печатающегося текста в заголовке 
const typingText = document.querySelector('.header-text h1 span');
const textContent = typingText.textContent;
typingText.textContent = '';
let i = 0;

function typeEffect() {
  if (i < textContent.length) {
    typingText.textContent += textContent.charAt(i);
    i++;
    setTimeout(typeEffect, 100);
  }
}
window.addEventListener('load', typeEffect);

// Частички на заднем фоне
const canvas = document.createElement('canvas');
canvas.id = 'particle-bg';
document.body.appendChild(canvas);
const ctx = canvas.getContext('2d');

canvas.style.position = 'fixed';
canvas.style.top = 0;
canvas.style.left = 0;
canvas.style.width = '100%';
canvas.style.height = '100%';
canvas.style.zIndex = '-1';
canvas.style.pointerEvents = 'none';
canvas.style.opacity = '0.4'; 

let particles = [];
const particleCount = 50;

function resizeCanvas() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
}
window.addEventListener('resize', resizeCanvas);
resizeCanvas();

for (let i = 0; i < particleCount; i++) {
  particles.push({
    x:          Math.random() * canvas.width,
    y:          Math.random() * canvas.height,
    size:       Math.random() * 2 + 1,
    speedX:     (Math.random() - 0.5) * 0.5,
    speedY:     (Math.random() - 0.5) * 0.5
  });
}

function animateParticles() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.fillStyle = '#d3e97a';
  particles.forEach(p => {
    ctx.beginPath();
    ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
    ctx.fill();
    p.x += p.speedX;
    p.y += p.speedY;
    if (p.x < 0 || p.x > canvas.width) p.speedX *= -1;
    if (p.y < 0 || p.y > canvas.height) p.speedY *= -1;
  });
  requestAnimationFrame(animateParticles);
}
animateParticles();

// Валидация формы 
function handleSubmit(event) {
  event.preventDefault();
  const name = document.querySelector('.contact-form input[type="text"]').value.trim();
  const email = document.querySelector('.contact-form input[type="email"]').value.trim();
  const message = document.querySelector('.contact-form textarea').value.trim();

  if (!name || !email || !message) {
    alert('Please fill in all fields.');
    return false;
  }

  const emailPattern = /^[^ ]+@[^ ]+\.[a-z]{2,3}$/;
  if (!email.match(emailPattern)) {
    alert('Invalid email address.');
    return false;
  }

  alert(`✅ Thank you, ${name}! Your message has been sent successfully.`);
  event.target.reset();
  return true;
}
