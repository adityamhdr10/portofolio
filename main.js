// Navbar scroll effect
window.addEventListener("scroll", () => {
  const navbar = document.getElementById("navbar");
  if (window.scrollY > 100) {
    navbar.classList.add("scrolled");
  } else {
    navbar.classList.remove("scrolled");
  }
});

// Smooth scrolling
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", function (e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute("href"));
    if (target) {
      target.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
  });
});

// Scroll animations
const observerOptions = {
  threshold: 0.1,
  rootMargin: "0px 0px -50px 0px",
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add("animated");
    }
  });
}, observerOptions);

document.querySelectorAll(".animate-on-scroll").forEach((el) => {
  observer.observe(el);
});

// Parallax effect for background elements
window.addEventListener("scroll", () => {
  const scrolled = window.pageYOffset;
  const parallaxElements = document.querySelectorAll(".bg-layer, .shape");

  parallaxElements.forEach((element, index) => {
    const speed = (index + 1) * 0.1;
    element.style.transform = `translateY(${scrolled * speed}px)`;
  });
});

// Dynamic gradient animation
let gradientAngle = 0;
setInterval(() => {
  gradientAngle += 1;
  document.documentElement.style.setProperty(
    "--primary-gradient",
    `linear-gradient(${gradientAngle}deg, #667eea 0%, #764ba2 100%)`
  );
}, 50);

// Typing effect for hero subtitle
const subtitle = document.querySelector(".hero-subtitle");
if (subtitle) {
  const originalText = subtitle.textContent;
  subtitle.textContent = "";

  let i = 0;
  const typeWriter = () => {
    if (i < originalText.length) {
      subtitle.textContent += originalText.charAt(i);
      i++;
      setTimeout(typeWriter, 100);
    }
  };

  setTimeout(typeWriter, 2000);
}

// Interactive project cards
document.querySelectorAll(".project-card").forEach((card) => {
  card.addEventListener("mousemove", (e) => {
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    const rotateX = (y - centerY) / 10;
    const rotateY = (centerX - x) / 10;

    card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-20px) scale(1.05)`;
  });

  card.addEventListener("mouseleave", () => {
    card.style.transform =
      "perspective(1000px) rotateX(0deg) rotateY(0deg) translateY(0px) scale(1)";
  });
});

// Form submission
const form = document.querySelector("form");
if (form) {
  form.addEventListener("submit", (e) => {
    e.preventDefault();
    const submitBtn = document.querySelector(".submit-btn");
    const originalText = submitBtn.textContent;

    submitBtn.textContent = "Sending...";
    submitBtn.disabled = true;

    setTimeout(() => {
      submitBtn.textContent = "Message Sent!";
      setTimeout(() => {
        submitBtn.textContent = originalText;
        submitBtn.disabled = false;
        form.reset();
      }, 2000);
    }, 2000);
  });
}

// Particle system
function createParticles() {
  const particlesContainer = document.querySelector(".geometric-shapes");

  for (let i = 0; i < 50; i++) {
    const particle = document.createElement("div");
    particle.className = "particle";
    particle.style.cssText = `
      position: absolute;
      width: ${Math.random() * 4 + 1}px;
      height: ${Math.random() * 4 + 1}px;
      background: rgba(102, 126, 234, ${Math.random() * 0.5 + 0.1});
      border-radius: 50%;
      left: ${Math.random() * 100}%;
      top: ${Math.random() * 100}%;
      animation: float ${Math.random() * 20 + 10}s linear infinite;
      animation-delay: ${Math.random() * 5}s;
    `;
    particlesContainer.appendChild(particle);
  }
}

// Initialize particles
createParticles();

// Loading screen
window.addEventListener("load", () => {
  setTimeout(() => {
    const loadingOverlay = document.querySelector(".loading-overlay");
    if (loadingOverlay) {
      loadingOverlay.style.display = "none";
    }
  }, 2000);
});

// Add floating animation keyframes dynamically
const style = document.createElement("style");
style.textContent = `
  @keyframes float {
    0% { transform: translateY(100vh) rotate(0deg); opacity: 0; }
    10% { opacity: 1; }
    90% { opacity: 1; }
    100% { transform: translateY(-100vh) rotate(360deg); opacity: 0; }
  }
`;
document.head.appendChild(style);

// Performance optimization
let ticking = false;

function updateScrollEffects() {
  if (!ticking) {
    requestAnimationFrame(() => {
      ticking = false;
    });
    ticking = true;
  }
}

window.addEventListener("scroll", updateScrollEffects);

// Skill level animation when in view
const skillObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const levelFills = entry.target.querySelectorAll(".level-fill");
        levelFills.forEach((fill) => {
          const width = fill.style.width;
          fill.style.width = "0%";
          setTimeout(() => {
            fill.style.width = width;
          }, 100);
        });
      }
    });
  },
  { threshold: 0.5 }
);

// Smooth download button animation
const downloadBtn = document.querySelector('.cta-download');
if (downloadBtn) {
  downloadBtn.addEventListener('click', function() {
    this.style.transform = 'scale(0.95)';
    setTimeout(() => {
      this.style.transform = '';
    }, 200);
  });
}

document.querySelectorAll(".skill-card").forEach((card) => {
  skillObserver.observe(card);
});


