// ================================
// SEGENAP JIWA COFFEE SHOP
// JavaScript - Interaktivitas
// ================================

// === INITIALIZATION ===
document.addEventListener("DOMContentLoaded", function () {
  initNavigation();
  initScrollEffects();
  initProductButtons();
  initSmoothScroll();
  initAnimations();
  initMenuImageAnimations(); // Animasi khusus gambar menu
});

// === MENU IMAGE ANIMATIONS ===
function initMenuImageAnimations() {
  const menuShowcases = document.querySelectorAll(".menu-showcase");
  if (!menuShowcases.length) return;

  const observer = new IntersectionObserver(
    function (entries) {
      entries.forEach((entry, index) => {
        if (entry.isIntersecting) {
          setTimeout(() => {
            entry.target.classList.add("is-visible");
          }, index * 150);
          observer.unobserve(entry.target);
        }
      });
    },
    {
      threshold: 0.05,
      rootMargin: "0px 0px -50px 0px",
    },
  );

  menuShowcases.forEach((showcase) => {
    // Cek apakah elemen sudah di viewport saat halaman load
    const rect = showcase.getBoundingClientRect();
    const isAlreadyVisible = rect.top < window.innerHeight && rect.bottom > 0;

    if (isAlreadyVisible) {
      // Langsung tampil tanpa animasi jika sudah terlihat
      showcase.classList.add("is-visible");
    } else {
      // Baru pasang animasi jika belum terlihat
      showcase.classList.add("animate-ready");
      observer.observe(showcase);
    }
  });
}

// === NAVIGATION ===
function initNavigation() {
  const mobileMenuToggle = document.getElementById("mobileMenuToggle");
  const navMenu = document.getElementById("navMenu");
  const navLinks = document.querySelectorAll(".nav-link");

  // Toggle mobile menu
  if (mobileMenuToggle) {
    mobileMenuToggle.addEventListener("click", function () {
      navMenu.classList.toggle("active");

      // Change icon
      const icon = this.querySelector(".material-icons");
      icon.textContent = navMenu.classList.contains("active")
        ? "close"
        : "menu";
    });
  }

  // Active link on scroll
  window.addEventListener("scroll", function () {
    let current = "";
    const sections = document.querySelectorAll("section[id]");

    sections.forEach((section) => {
      const sectionTop = section.offsetTop;
      const sectionHeight = section.clientHeight;

      if (scrollY >= sectionTop - 200) {
        current = section.getAttribute("id");
      }
    });

    navLinks.forEach((link) => {
      link.classList.remove("active");
      if (link.getAttribute("href").includes(current)) {
        link.classList.add("active");
      }
    });
  });

  // Close mobile menu when link is clicked
  navLinks.forEach((link) => {
    link.addEventListener("click", function () {
      if (window.innerWidth < 768) {
        navMenu.classList.remove("active");
        mobileMenuToggle.querySelector(".material-icons").textContent = "menu";
      }
    });
  });
}

// === SCROLL EFFECTS ===
function initScrollEffects() {
  const navbar = document.querySelector(".nav-bar");

  window.addEventListener("scroll", function () {
    if (window.scrollY > 50) {
      navbar.style.background = "rgba(34, 25, 16, 0.95)";
    } else {
      navbar.style.background = "rgba(34, 25, 16, 0.8)";
    }
  });
}

// === PRODUCT BUTTONS ===
function initProductButtons() {
  const productButtons = document.querySelectorAll(".product-button");
  if (!productButtons.length) return; // Skip jika tidak ada

  productButtons.forEach((button) => {
    button.addEventListener("click", function () {
      const card = this.closest(".product-card");
      const productName = card
        ? card.querySelector(".product-name").textContent
        : "Item";
      showNotification(`${productName} ditambahkan ke pesanan!`);
      this.classList.add("clicked");
      setTimeout(() => this.classList.remove("clicked"), 300);
    });
  });
}

// === SMOOTH SCROLL ===
function initSmoothScroll() {
  const links = document.querySelectorAll('a[href^="#"]');

  links.forEach((link) => {
    link.addEventListener("click", function (e) {
      const href = this.getAttribute("href");

      // Skip if href is just "#"
      if (href === "#") return;

      e.preventDefault();

      const target = document.querySelector(href);
      if (target) {
        const offsetTop = target.offsetTop - 80; // Navbar height

        window.scrollTo({
          top: offsetTop,
          behavior: "smooth",
        });
      }
    });
  });
}

// === ANIMATIONS ===
function initAnimations() {
  const observerOptions = {
    threshold: 0.1,
    rootMargin: "0px 0px -100px 0px",
  };

  const observer = new IntersectionObserver(function (entries) {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("fade-in");
        observer.unobserve(entry.target);
      }
    });
  }, observerOptions);

  // Observe elements
  const animateElements = document.querySelectorAll(
    ".product-card, .about-grid > *, .location-card",
  );
  animateElements.forEach((el) => observer.observe(el));
}

// === NOTIFICATION SYSTEM ===
function showNotification(message) {
  // Remove existing notification
  const existing = document.querySelector(".notification");
  if (existing) {
    existing.remove();
  }

  // Create notification
  const notification = document.createElement("div");
  notification.className = "notification";
  notification.innerHTML = `
        <span class="material-icons">check_circle</span>
        <span>${message}</span>
    `;

  // Style notification
  notification.style.cssText = `
        position: fixed;
        top: 100px;
        right: 20px;
        background: #E8A84E;
        color: #1a1410;
        padding: 1rem 1.5rem;
        border-radius: 0.5rem;
        display: flex;
        align-items: center;
        gap: 0.5rem;
        font-weight: 700;
        box-shadow: 0 10px 25px rgba(0, 0, 0, 0.3);
        z-index: 1000;
        animation: slideIn 0.3s ease-out;
    `;

  document.body.appendChild(notification);

  // Auto remove after 3 seconds
  setTimeout(() => {
    notification.style.animation = "slideOut 0.3s ease-out";
    setTimeout(() => {
      notification.remove();
    }, 300);
  }, 3000);
}

// === UTILITY FUNCTIONS ===

// Debounce function for scroll events
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

// Check if element is in viewport
function isInViewport(element) {
  const rect = element.getBoundingClientRect();
  return (
    rect.top >= 0 &&
    rect.left >= 0 &&
    rect.bottom <=
      (window.innerHeight || document.documentElement.clientHeight) &&
    rect.right <= (window.innerWidth || document.documentElement.clientWidth)
  );
}

// === ANIMATIONS CSS (added via JS) ===
const style = document.createElement("style");
style.textContent = `
    @keyframes slideIn {
        from {
            transform: translateX(400px);
            opacity: 0;
        }
        to {
            transform: translateX(0);
            opacity: 1;
        }
    }
    
    @keyframes slideOut {
        from {
            transform: translateX(0);
            opacity: 1;
        }
        to {
            transform: translateX(400px);
            opacity: 0;
        }
    }
    
    .product-button.clicked {
        transform: scale(0.95);
    }
    
    /* Mobile Menu Styles */
    @media (max-width: 767px) {
        .nav-menu {
            position: fixed;
            top: 80px;
            left: 0;
            right: 0;
            background: rgba(34, 25, 16, 0.98);
            backdrop-filter: blur(12px);
            padding: 2rem;
            flex-direction: column;
            align-items: flex-start;
            border-bottom: 1px solid rgba(255, 255, 255, 0.05);
            transform: translateY(-100%);
            opacity: 0;
            transition: all 0.3s ease;
            pointer-events: none;
        }
        
        .nav-menu.active {
            display: flex;
            transform: translateY(0);
            opacity: 1;
            pointer-events: all;
        }
        
        .nav-link {
            font-size: 1.125rem;
            padding: 0.5rem 0;
        }
    }
`;
document.head.appendChild(style);

// === CONSOLE MESSAGE ===
console.log(
  "%c🌅 Segenap Jiwa Coffee Shop - SENJA",
  "color: #E8A84E; font-size: 20px; font-weight: bold;",
);
console.log("%cWebsite developed with ❤️", "color: #d6d3d1; font-size: 12px;");
