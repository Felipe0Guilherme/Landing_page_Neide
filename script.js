// ==========================================
// Scroll Suave para Seções
// ==========================================
function scrollToSection(sectionId) {
  const element = document.getElementById(sectionId);
  if (element) {
    element.scrollIntoView({ behavior: 'smooth' });
  }
}

// ==========================================
// Abrir WhatsApp
// ==========================================
function openWhatsApp() {
  window.open('https://wa.me/5511999999999?text=Olá! Gostaria de agendar uma avaliação ortodôntica.', '_blank');
}

// ==========================================
// Animações ao Scroll
// ==========================================
const observerOptions = {
  threshold: 0.1,
  rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
    }
  });
}, observerOptions);

// Observar todos os elementos com classe animate-on-scroll
document.addEventListener('DOMContentLoaded', () => {
  const animatedElements = document.querySelectorAll('.animate-on-scroll');
  animatedElements.forEach(el => observer.observe(el));
});

// ==========================================
// Slider Antes e Depois
// ==========================================
const beforeAfterSlider = document.getElementById('beforeAfterSlider');
const afterImage = document.getElementById('afterImage');
const sliderLine = document.getElementById('sliderLine');

if (beforeAfterSlider && afterImage && sliderLine) {
  beforeAfterSlider.addEventListener('input', (e) => {
    const value = e.target.value;

    // Atualizar a posição da imagem "depois"
    afterImage.style.clipPath = `inset(0 ${100 - value}% 0 0)`;

    // Atualizar a posição da linha divisória
    sliderLine.style.left = `${value}%`;
  });
}

// ==========================================
// Carrossel de Depoimentos
// ==========================================
let currentTestimonial = 0;
const testimonialCards = document.querySelectorAll('.testimonial-card');
const testimonialTrack = document.getElementById('testimonialTrack');
const dots = document.querySelectorAll('.dot');
const totalTestimonials = testimonialCards.length;

// Auto-play do carrossel
let testimonialInterval;

function updateTestimonialCarousel() {
  // Remover classe active de todos os cards
  testimonialCards.forEach(card => {
    card.classList.remove('active');
  });

  // Adicionar classe active ao card atual
  if (testimonialCards[currentTestimonial]) {
    testimonialCards[currentTestimonial].classList.add('active');
  }

  // Mover o track
  if (testimonialTrack) {
    testimonialTrack.style.transform = `translateX(-${currentTestimonial * 100}%)`;
  }

  // Atualizar dots
  dots.forEach((dot, index) => {
    if (index === currentTestimonial) {
      dot.classList.add('active');
    } else {
      dot.classList.remove('active');
    }
  });
}

function changeTestimonial(direction) {
  currentTestimonial += direction;

  // Loop infinito
  if (currentTestimonial < 0) {
    currentTestimonial = totalTestimonials - 1;
  } else if (currentTestimonial >= totalTestimonials) {
    currentTestimonial = 0;
  }

  updateTestimonialCarousel();
  resetTestimonialInterval();
}

function goToTestimonial(index) {
  currentTestimonial = index;
  updateTestimonialCarousel();
  resetTestimonialInterval();
}

function startTestimonialAutoPlay() {
  testimonialInterval = setInterval(() => {
    changeTestimonial(1);
  }, 5000);
}

function resetTestimonialInterval() {
  clearInterval(testimonialInterval);
  startTestimonialAutoPlay();
}

// Iniciar auto-play quando a página carregar
document.addEventListener('DOMContentLoaded', () => {
  updateTestimonialCarousel();
  startTestimonialAutoPlay();
});

// Pausar auto-play quando o usuário interage
const carouselContainer = document.querySelector('.testimonials-carousel');
if (carouselContainer) {
  carouselContainer.addEventListener('mouseenter', () => {
    clearInterval(testimonialInterval);
  });

  carouselContainer.addEventListener('mouseleave', () => {
    startTestimonialAutoPlay();
  });
}

// ==========================================
// Suporte para teclado no carrossel
// ==========================================
document.addEventListener('keydown', (e) => {
  if (e.key === 'ArrowLeft') {
    changeTestimonial(-1);
  } else if (e.key === 'ArrowRight') {
    changeTestimonial(1);
  }
});

// ==========================================
// Smooth Scroll para todos os links âncora
// ==========================================
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    e.preventDefault();
    const targetId = this.getAttribute('href').substring(1);
    const targetElement = document.getElementById(targetId);

    if (targetElement) {
      targetElement.scrollIntoView({
        behavior: 'smooth',
        block: 'start'
      });
    }
  });
});

// ==========================================
// Animação do botão flutuante WhatsApp
// ==========================================
window.addEventListener('scroll', () => {
  const whatsappFloat = document.querySelector('.whatsapp-float');

  if (window.scrollY > 300) {
    whatsappFloat.style.opacity = '1';
    whatsappFloat.style.visibility = 'visible';
  } else {
    whatsappFloat.style.opacity = '0.8';
  }
});

// ==========================================
// Parallax suave no Hero
// ==========================================
window.addEventListener('scroll', () => {
  const scrolled = window.pageYOffset;
  const hero = document.querySelector('.hero-content');

  if (hero && scrolled < window.innerHeight) {
    hero.style.transform = `translateY(${scrolled * 0.5}px)`;
    hero.style.opacity = 1 - (scrolled / 600);
  }
});

// ==========================================
// Adicionar interatividade aos cards de serviço
// ==========================================
const serviceCards = document.querySelectorAll('.service-card');

serviceCards.forEach(card => {
  card.addEventListener('mouseenter', function() {
    // Adicionar efeito de "destaque" removendo opacidade dos outros cards
    serviceCards.forEach(c => {
      if (c !== this) {
        c.style.opacity = '0.6';
      }
    });
  });

  card.addEventListener('mouseleave', function() {
    // Restaurar opacidade de todos os cards
    serviceCards.forEach(c => {
      c.style.opacity = '1';
    });
  });
});

// ==========================================
// Contador de visitantes (simulado)
// ==========================================
let visitorCount = localStorage.getItem('visitorCount') || 0;
visitorCount = parseInt(visitorCount) + 1;
localStorage.setItem('visitorCount', visitorCount);

// ==========================================
// Preloader para imagens
// ==========================================
window.addEventListener('load', () => {
  document.body.classList.add('loaded');
});

// ==========================================
// Detecção de mobile para ajustes
// ==========================================
const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);

if (isMobile) {
  // Ajustar experiência para mobile
  document.body.classList.add('is-mobile');

  // Remover hover effects em mobile
  const hoverElements = document.querySelectorAll('.service-card, .feature-card, .contact-card');
  hoverElements.forEach(el => {
    el.addEventListener('touchstart', function() {
      this.classList.add('touch-active');
    });

    el.addEventListener('touchend', function() {
      setTimeout(() => {
        this.classList.remove('touch-active');
      }, 300);
    });
  });
}

// ==========================================
// Easter Egg: Clique triplo no emoji hero
// ==========================================
let clickCount = 0;
let clickTimer;

const heroEmoji = document.querySelector('.hero-emoji');
if (heroEmoji) {
  heroEmoji.addEventListener('click', () => {
    clickCount++;

    if (clickCount === 3) {
      // Mudar emoji temporariamente
      const originalEmoji = heroEmoji.textContent;
      heroEmoji.textContent = '🎉';

      // Adicionar confete (simulado com animação)
      heroEmoji.style.transform = 'scale(1.5) rotate(360deg)';

      setTimeout(() => {
        heroEmoji.textContent = originalEmoji;
        heroEmoji.style.transform = '';
      }, 1000);

      clickCount = 0;
    }

    clearTimeout(clickTimer);
    clickTimer = setTimeout(() => {
      clickCount = 0;
    }, 500);
  });
}

// ==========================================
// Formulário de contato (se adicionado no futuro)
// ==========================================
function handleContactForm(e) {
  e.preventDefault();
  // Lógica para enviar formulário
  console.log('Formulário enviado!');
}

// ==========================================
// Lazy Loading para iframe do mapa
// ==========================================
const mapIframe = document.querySelector('.map-container iframe');
if (mapIframe) {
  const mapObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        // O iframe já tem o src, mas podemos adicionar uma classe para animação
        entry.target.classList.add('loaded');
        mapObserver.unobserve(entry.target);
      }
    });
  });

  mapObserver.observe(mapIframe);
}

// ==========================================
// Console Easter Egg
// ==========================================
console.log('%c🦷 Desenvolvido com ❤️ para Dra. Dalvoneide da Silva',
  'background: linear-gradient(135deg, #3b82f6, #10b981); color: white; padding: 10px 20px; border-radius: 5px; font-size: 14px; font-weight: bold;'
);

// ==========================================
// Acessibilidade: Foco visível
// ==========================================
document.addEventListener('keydown', (e) => {
  if (e.key === 'Tab') {
    document.body.classList.add('keyboard-navigation');
  }
});

document.addEventListener('mousedown', () => {
  document.body.classList.remove('keyboard-navigation');
});

// ==========================================
// Performance: Debounce para scroll events
// ==========================================
function debounce(func, wait) {
  let timeout;
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
}

// Aplicar debounce nos event listeners de scroll
const debouncedScrollHandler = debounce(() => {
  // Scroll handlers já definidos acima
}, 10);

window.addEventListener('scroll', debouncedScrollHandler);

// ==========================================
// Analytics tracking (placeholder)
// ==========================================
function trackEvent(eventName, eventData) {
  // Integrar com Google Analytics ou similar
  console.log('Event tracked:', eventName, eventData);
}

// Track cliques nos CTAs
document.querySelectorAll('.cta-button, .cta-button-large').forEach(button => {
  button.addEventListener('click', () => {
    trackEvent('cta_click', { button: button.textContent });
  });
});

// ==========================================
// Mensagem de boas-vindas no console
// ==========================================
console.log('%cBem-vindo(a) à nossa landing page! 😊',
  'color: #3b82f6; font-size: 16px; font-weight: bold;'
);
