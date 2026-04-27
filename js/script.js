// Mobile Navigation
const navToggle = document.querySelector(".nav-toggle");
const navLinks = document.querySelector(".nav-links");
const navItems = document.querySelectorAll(".nav-links a");

navToggle.addEventListener("click", () => {
  const isOpen = navLinks.classList.toggle("open");
  navToggle.setAttribute("aria-expanded", isOpen);
});

navItems.forEach((link) => {
  link.addEventListener("click", () => {
    navLinks.classList.remove("open");
    navToggle.setAttribute("aria-expanded", "false");
  });
});

// Terminal Typing Animation
const typedText = document.getElementById("typedText");
const commands = [
  "nmap -sV target.local",
  "gobuster dir -u http://target -w wordlist.txt",
  "burpsuite --intercept",
  "python3 exploit_notes.py",
  "cat report.md | grep remediation",
];

let commandIndex = 0;
let charIndex = 0;
let deleting = false;

function typeLoop() {
  const current = commands[commandIndex];

  if (!deleting) {
    typedText.textContent = current.slice(0, charIndex + 1);
    charIndex++;

    if (charIndex === current.length) {
      deleting = true;
      setTimeout(typeLoop, 1300);
      return;
    }
  } else {
    typedText.textContent = current.slice(0, charIndex - 1);
    charIndex--;

    if (charIndex === 0) {
      deleting = false;
      commandIndex = (commandIndex + 1) % commands.length;
    }
  }

  setTimeout(typeLoop, deleting ? 35 : 72);
}

typeLoop();

// Scroll Reveal
const revealElements = document.querySelectorAll(".reveal");
const revealObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
        revealObserver.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.14 },
);

revealElements.forEach((element) => revealObserver.observe(element));

// Active Nav Link
const sections = document.querySelectorAll("section[id]");
const navObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        document.querySelectorAll(".nav-links a").forEach((link) => {
          link.classList.remove("active");
          if (link.getAttribute("href") === `#${entry.target.id}`) {
            link.classList.add("active");
          }
        });
      }
    });
  },
  { threshold: 0.35 },
);

sections.forEach((section) => navObserver.observe(section));

// Project Filter
const filterButtons = document.querySelectorAll(".filter-btn");
const projectCards = document.querySelectorAll(".project-card");

filterButtons.forEach((button) => {
  button.addEventListener("click", () => {
    filterButtons.forEach((btn) => btn.classList.remove("active"));
    button.classList.add("active");

    const filter = button.dataset.filter;

    projectCards.forEach((card) => {
      const categories = card.dataset.category;
      const shouldShow = filter === "all" || categories.includes(filter);
      card.style.display = shouldShow ? "flex" : "none";
    });
  });
});

// Matrix Background Canvas
const canvas = document.getElementById("matrixCanvas");
const ctx = canvas.getContext("2d");

let width;
let height;
let columns;
let drops;
const chars = "01NEHALCYBERSECURITYVAPTOSINTCTFROOTACCESS";

function resizeCanvas() {
  width = canvas.width = window.innerWidth;
  height = canvas.height = window.innerHeight;
  columns = Math.floor(width / 18);
  drops = Array.from({ length: columns }, () => Math.random() * height);
}

function drawMatrix() {
  ctx.fillStyle = "rgba(5, 8, 7, 0.11)";
  ctx.fillRect(0, 0, width, height);

  ctx.fillStyle = "#00ff88";
  ctx.font = "14px JetBrains Mono, monospace";

  for (let i = 0; i < drops.length; i++) {
    const text = chars[Math.floor(Math.random() * chars.length)];
    ctx.fillText(text, i * 18, drops[i] * 18);

    if (drops[i] * 18 > height && Math.random() > 0.975) {
      drops[i] = 0;
    }

    drops[i]++;
  }
}

resizeCanvas();
setInterval(drawMatrix, 60);
window.addEventListener("resize", resizeCanvas);

// ============================================
// DYNAMIC EFFECTS & INTERACTIONS
// ============================================

/* Scroll Progress Indicator */
const scrollProgress = document.getElementById("scrollProgress");
window.addEventListener("scroll", () => {
  const scrollTop = window.scrollY;
  const docHeight = document.documentElement.scrollHeight - window.innerHeight;
  const scrolled = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
  scrollProgress.style.width = scrolled + "%";
});

/* Cursor Glow Effect */
const cursorGlow = document.getElementById("cursorGlow");
let mouseX = 0;
let mouseY = 0;
let isOnPage = false;

document.addEventListener("mouseenter", () => {
  isOnPage = true;
  cursorGlow.classList.add("active");
});

document.addEventListener("mouseleave", () => {
  isOnPage = false;
  cursorGlow.classList.remove("active");
});

document.addEventListener("mousemove", (e) => {
  mouseX = e.clientX;
  mouseY = e.clientY;

  if (isOnPage) {
    cursorGlow.style.left = mouseX - 20 + "px";
    cursorGlow.style.top = mouseY - 20 + "px";
  }
});

/* Animated Counters */
function animateCounter(element, target, duration = 2000) {
  const start = 0;
  const increment = target / (duration / 16);
  let current = start;

  const counter = setInterval(() => {
    current += increment;
    if (current >= target) {
      element.textContent = target + "+";
      clearInterval(counter);
    } else {
      element.textContent = Math.floor(current);
    }
  }, 16);
}

const counterObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const target = parseInt(entry.target.getAttribute("data-target"));
        if (!entry.target.classList.contains("counted")) {
          animateCounter(entry.target, target);
          entry.target.classList.add("counted");
        }
        counterObserver.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.5 },
);

document.querySelectorAll(".counter-value").forEach((counter) => {
  counterObserver.observe(counter);
});

/* Parallax Scroll Effect */
const heroContent = document.querySelector(".hero-content");
const profilePanel = document.querySelector(".profile-panel");

if (heroContent && profilePanel) {
  window.addEventListener("scroll", () => {
    const scrolled = window.scrollY;
    const heroSection = document.querySelector(".hero");

    if (heroSection) {
      const heroTop = heroSection.offsetTop;
      const heroHeight = heroSection.offsetHeight;

      if (scrolled < heroTop + heroHeight) {
        const offset = (scrolled - heroTop) * 0.5;
        heroContent.style.transform = `translateY(${offset}px)`;
        profilePanel.style.transform = `translateY(${offset * 0.3}px)`;
      }
    }
  });
}

/* Enhanced Project Filter with Animation */
const filterBtns = document.querySelectorAll(".filter-btn");
const projects = document.querySelectorAll(".project-card");

filterBtns.forEach((btn) => {
  btn.addEventListener("click", () => {
    filterBtns.forEach((b) => b.classList.remove("active"));
    btn.classList.add("active");

    const filter = btn.dataset.filter;

    projects.forEach((project) => {
      const category = project.dataset.category;
      if (filter === "all" || category.includes(filter)) {
        project.style.display = "flex";
        project.style.animation = "none";
        setTimeout(() => {
          project.style.animation = "revealStagger 0.5s ease-out forwards";
        }, 10);
      } else {
        project.style.display = "none";
      }
    });
  });
});

/* Smooth Scroll Reveal with Enhanced Animation */
const observerOptions = {
  threshold: 0.15,
  rootMargin: "0px 0px -50px 0px",
};

const revealObserverEnhanced = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add("visible");

      // Stagger child animations
      const children = entry.target.querySelectorAll(
        ".skill-card, .project-card, .cert-card, .edu-card",
      );
      children.forEach((child, index) => {
        child.style.animation = `revealStagger 0.6s ease-out ${index * 0.1}s backwards`;
      });

      revealObserverEnhanced.unobserve(entry.target);
    }
  });
}, observerOptions);

document.querySelectorAll(".reveal").forEach((el) => {
  revealObserverEnhanced.observe(el);
});

/* Interactive Button Hover State */
const buttons = document.querySelectorAll(".btn");
buttons.forEach((btn) => {
  btn.addEventListener("mouseenter", (e) => {
    const ripple = document.createElement("span");
    ripple.style.position = "absolute";
    ripple.style.background = "rgba(255, 255, 255, 0.5)";
    ripple.style.borderRadius = "50%";
    ripple.style.pointerEvents = "none";

    const rect = btn.getBoundingClientRect();
    const size = Math.max(rect.width, rect.height);
    const x = e.clientX - rect.left - size / 2;
    const y = e.clientY - rect.top - size / 2;

    ripple.style.width = size + "px";
    ripple.style.height = size + "px";
    ripple.style.left = x + "px";
    ripple.style.top = y + "px";
    ripple.style.animation = "pulse-ring 0.6s ease-out";

    btn.appendChild(ripple);
    setTimeout(() => ripple.remove(), 600);
  });
});

/* Dynamic Skill Card Glow on Hover */
const skillCards = document.querySelectorAll(".skill-card");
skillCards.forEach((card) => {
  card.addEventListener("mousemove", (e) => {
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    card.style.setProperty("--mouse-x", x + "px");
    card.style.setProperty("--mouse-y", y + "px");
  });
});

/* Add Glow Property to Cards */
const style = document.createElement("style");
style.innerHTML = `
  .skill-card {
    --mouse-x: 0;
    --mouse-y: 0;
  }
`;
document.head.appendChild(style);

/* Keyboard Navigation Enhancement */
document.addEventListener("keydown", (e) => {
  if (e.key === "Escape") {
    const navLinks = document.querySelector(".nav-links");
    if (navLinks && navLinks.classList.contains("open")) {
      navLinks.classList.remove("open");
    }
  }
});

/* Page Load Animation */
window.addEventListener("load", () => {
  document.body.style.opacity = "1";

  // Trigger counter animations if hero is visible
  const counters = document.querySelectorAll(".counter-value");
  counters.forEach((counter) => {
    if (window.scrollY < 500) {
      const target = parseInt(counter.getAttribute("data-target"));
      animateCounter(counter, target);
      counter.classList.add("counted");
    }
  });
});
