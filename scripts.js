// JavaScript Document

/*

Tooplate 2144 Parallax Depth

https://www.tooplate.com/view/2144-parallax-depth

*/

// Floating Particles Background
const starsContainer = document.getElementById('stars');
const particleCount = 50;

for (let i = 0; i < particleCount; i++) {
   const particle = document.createElement('div');
   particle.classList.add('particle');
   const size = Math.random() * 4 + 2;
   const tx1 = (Math.random() - 0.5) * 100 + 'px';
   const ty1 = (Math.random() - 0.5) * 100 + 'px';
   const tx2 = (Math.random() - 0.5) * 100 + 'px';
   const ty2 = (Math.random() - 0.5) * 100 + 'px';
   const tx3 = (Math.random() - 0.5) * 100 + 'px';
   const ty3 = (Math.random() - 0.5) * 100 + 'px';
   particle.style.setProperty('--size', size + 'px');
   particle.style.setProperty('--glow', (size * 2) + 'px');
   particle.style.setProperty('--opacity', (Math.random() * 0.4 + 0.1).toFixed(2));
   particle.style.setProperty('--duration', (Math.random() * 8 + 6) + 's');
   particle.style.setProperty('--delay', (Math.random() * 5) + 's');
   particle.style.setProperty('--tx1', tx1);
   particle.style.setProperty('--ty1', ty1);
   particle.style.setProperty('--tx2', tx2);
   particle.style.setProperty('--ty2', ty2);
   particle.style.setProperty('--tx3', tx3);
   particle.style.setProperty('--ty3', ty3);
   particle.style.left = Math.random() * 100 + '%';
   particle.style.top = Math.random() * 100 + '%';
   starsContainer.appendChild(particle);
}

// Hero content scroll fade
const heroContent = document.querySelector('.hero-content');

window.addEventListener('scroll', () => {
   const scrolled = window.pageYOffset;

   // Move hero content
   if (heroContent && scrolled < window.innerHeight) {
      heroContent.style.opacity = 1 - (scrolled / 800);
   }
});


// 3D Carousel Controls
const carousel = document.getElementById('carousel');
const prevBtn = document.getElementById('prevBtn');
const nextBtn = document.getElementById('nextBtn');
const indicatorsContainer = document.getElementById('indicators');
const featureCards = document.querySelectorAll('.feature-card-3d');

let currentRotation = 0;
let currentIndex = 0;

if (carousel && prevBtn && nextBtn && indicatorsContainer && featureCards.length > 0) {
   // Create indicators
   featureCards.forEach((_, index) => {
      const indicator = document.createElement('div');
      indicator.className = 'indicator';
      if (index === 0) indicator.classList.add('active');
      indicator.addEventListener('click', () => goToSlide(index));
      indicatorsContainer.appendChild(indicator);
   });

   const indicators = document.querySelectorAll('.indicator');

   // Update view - always use 3D rotation
   function updateView() {
      carousel.style.transform = `rotateY(${currentRotation}deg)`;
      updateIndicators();
   }

   // Update indicators
   function updateIndicators() {
      indicators.forEach((indicator, index) => {
         indicator.classList.toggle('active', index === currentIndex);
      });
   }

   // Go to specific slide
   function goToSlide(index) {
      currentIndex = index;
      currentRotation = -index * 60;
      updateView();
   }

   // Previous button
   prevBtn.addEventListener('click', () => {
      currentIndex = (currentIndex - 1 + featureCards.length) % featureCards.length;
      currentRotation += 60;
      updateView();
   });

   // Next button
   nextBtn.addEventListener('click', () => {
      currentIndex = (currentIndex + 1) % featureCards.length;
      currentRotation -= 60;
      updateView();
   });
}

// Touch support for mobile
let touchStartX = 0;
let touchEndX = 0;

if (carousel) {
   carousel.addEventListener('touchstart', (e) => {
      touchStartX = e.changedTouches[0].screenX;
   });

   carousel.addEventListener('touchend', (e) => {
      touchEndX = e.changedTouches[0].screenX;
      handleSwipe();
   });
}

function handleSwipe() {
   if (touchEndX < touchStartX - 50) {
      if (nextBtn) nextBtn.click();
   }
   if (touchEndX > touchStartX + 50) {
      if (prevBtn) prevBtn.click();
   }
}

// Smooth scroll for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
   anchor.addEventListener('click', function (e) {
      e.preventDefault();
      const target = document.querySelector(this.getAttribute('href'));
      if (target) {
         target.scrollIntoView({
            behavior: 'smooth',
            block: 'start'
         });
      }
   });
});

// Intersection Observer for fade-in animations
const observerOptions = {
   threshold: 0.1,
   rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
   entries.forEach(entry => {
      if (entry.isIntersecting) {
         entry.target.style.opacity = '1';
         entry.target.style.transform = 'translateY(0)';
      }
   });
}, observerOptions);

// Observe feature cards and gallery items
document.querySelectorAll('.gallery-item').forEach(item => {
   item.style.opacity = '0';
   item.style.transform = 'translateY(30px)';
   item.style.transition = 'all 0.6s ease';
   observer.observe(item);
});

// Form submission effect
const submitBtn = document.querySelector('.submit-btn');
if (submitBtn) {
   submitBtn.addEventListener('click', (e) => {
      e.preventDefault();

      // Create ripple effect
      const ripple = document.createElement('span');
      ripple.style.position = 'absolute';
      ripple.style.width = '10px';
      ripple.style.height = '10px';
      ripple.style.background = 'rgba(255, 255, 255, 0.5)';
      ripple.style.borderRadius = '50%';
      ripple.style.transform = 'translate(-50%, -50%)';
      ripple.style.pointerEvents = 'none';
      ripple.style.animation = 'ripple 0.6s ease-out';

      const rect = submitBtn.getBoundingClientRect();
      ripple.style.left = (e.clientX - rect.left) + 'px';
      ripple.style.top = (e.clientY - rect.top) + 'px';

      submitBtn.appendChild(ripple);

      setTimeout(() => ripple.remove(), 600);
   });
}

// Add ripple animation
const style = document.createElement('style');
style.textContent = `
            @keyframes ripple {
                to {
                    width: 300px;
                    height: 300px;
                    opacity: 0;
                }
            }
        `;
document.head.appendChild(style);

