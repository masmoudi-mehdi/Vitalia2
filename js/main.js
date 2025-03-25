/**
 * Vitalia - Centre d'Amincissement
 * Main JavaScript File
 * Version: 1.0
 */

// Wait for the DOM to be fully loaded
document.addEventListener("DOMContentLoaded", function () {
  // Initialize the navigation
  initNavigation();

  // Initialize the FAQ accordions
  initFaqAccordions();

  // Initialize the header scroll effect
  initHeaderScroll();

  // Initialize animations
  initAnimations();
});

/**
 * Mobile Navigation Toggle
 */
function initNavigation() {
  const mobileMenuBtn = document.querySelector(".mobile-menu-btn");
  const navMenu = document.querySelector(".nav-menu");
  const body = document.body;

  if (mobileMenuBtn && navMenu) {
    // Gérer le clic sur le bouton du menu
    mobileMenuBtn.addEventListener("click", function (e) {
      e.preventDefault();

      const icon = this.querySelector("i");
      const isOpen = navMenu.classList.contains("active");

      // Toggle les classes
      this.classList.toggle("active");
      navMenu.classList.toggle("active");
      body.classList.toggle("menu-open");

      // Changer l'icône
      if (icon) {
        icon.className = isOpen ? "fas fa-bars" : "fas fa-times";
      }

      // Gérer le scroll
      body.style.overflow = isOpen ? "" : "hidden";
    });

    // Fermer le menu quand on clique sur un lien
    navMenu.querySelectorAll("a").forEach((link) => {
      link.addEventListener("click", () => {
        navMenu.classList.remove("active");
        mobileMenuBtn.classList.remove("active");
        body.classList.remove("menu-open");
        body.style.overflow = "";

        const icon = mobileMenuBtn.querySelector("i");
        if (icon) {
          icon.className = "fas fa-bars";
        }
      });
    });

    // Fermer le menu si on clique en dehors
    document.addEventListener("click", (e) => {
      if (
        !navMenu.contains(e.target) &&
        !mobileMenuBtn.contains(e.target) &&
        navMenu.classList.contains("active")
      ) {
        navMenu.classList.remove("active");
        mobileMenuBtn.classList.remove("active");
        body.classList.remove("menu-open");
        body.style.overflow = "";

        const icon = mobileMenuBtn.querySelector("i");
        if (icon) {
          icon.className = "fas fa-bars";
        }
      }
    });
  }
}

/**
 * FAQ Accordions
 */
function initFaqAccordions() {
  const faqItems = document.querySelectorAll(".faq-item");

  if (faqItems.length > 0) {
    faqItems.forEach((item) => {
      const question = item.querySelector(".faq-question");
      const answer = item.querySelector(".faq-answer");
      const icon = item.querySelector(".faq-icon i");

      question.addEventListener("click", () => {
        // Check if this item is already active
        const isActive = item.classList.contains("active");

        // Close all FAQ items
        faqItems.forEach((faq) => {
          faq.classList.remove("active");
          const faqIcon = faq.querySelector(".faq-icon i");
          if (faqIcon) {
            faqIcon.className = "fas fa-plus";
          }
        });

        // Open this item if it wasn't already active
        if (!isActive) {
          item.classList.add("active");
          if (icon) {
            icon.className = "fas fa-minus";
          }
        }
      });
    });

    // Open the first FAQ item by default
    if (faqItems.length > 0) {
      faqItems[0].classList.add("active");
      const firstIcon = faqItems[0].querySelector(".faq-icon i");
      if (firstIcon) {
        firstIcon.className = "fas fa-minus";
      }
    }
  }
}

/**
 * Header Scroll Effect
 */
function initHeaderScroll() {
  const header = document.getElementById("header");

  if (header) {
    window.addEventListener("scroll", () => {
      if (window.scrollY > 50) {
        header.classList.add("scrolled-header");
      } else {
        header.classList.remove("scrolled-header");
      }
    });

    // Check scroll position on page load
    if (window.scrollY > 50) {
      header.classList.add("scrolled-header");
    }
  }
}

/**
 * Animations
 */
function initAnimations() {
  // Add animation classes to elements when they come into view
  const animatedElements = document.querySelectorAll(
    ".service-card, .stat-item, .value-card, .facility-card, .certificate-card, .team-member, .info-card, .share-option, .appointment-option"
  );

  if (animatedElements.length > 0) {
    // Create an intersection observer
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("animate-fadeIn");
            // Unobserve the element after animating it
            observer.unobserve(entry.target);
          }
        });
      },
      {
        root: null, // Use the viewport as the root
        threshold: 0.1, // Trigger when at least 10% of the element is visible
        rootMargin: "0px 0px -50px 0px", // Adjust the trigger point
      }
    );

    // Observe each element
    animatedElements.forEach((element) => {
      observer.observe(element);
    });
  }

  // Pulse animation for CTA buttons
  const ctaButtons = document.querySelectorAll("#cta .btn-primary");
  if (ctaButtons.length > 0) {
    ctaButtons.forEach((button) => {
      button.classList.add("animate-pulse");
    });
  }
}

/**
 * Smooth Scroll to Anchor Links
 */
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", function (e) {
    e.preventDefault();

    // Check if the href is just "#" (often used for buttons with JS actions)
    if (this.getAttribute("href") === "#") return;

    const targetId = this.getAttribute("href");
    const targetElement = document.querySelector(targetId);

    if (targetElement) {
      // Close mobile menu if open
      const navMenu = document.querySelector(".nav-menu");
      const mobileMenuBtn = document.querySelector(".mobile-menu-btn");

      if (navMenu && navMenu.classList.contains("active")) {
        navMenu.classList.remove("active");
        if (mobileMenuBtn) {
          mobileMenuBtn.classList.remove("active");
          const icon = mobileMenuBtn.querySelector("i");
          if (icon) {
            icon.classList.remove("fa-times");
            icon.classList.add("fa-bars");
          }
        }
        document.body.classList.remove("menu-open");
      }

      // Get the header height for offset
      const headerHeight = document.getElementById("header")?.offsetHeight || 0;

      // Scroll to the target
      window.scrollTo({
        top: targetElement.offsetTop - headerHeight,
        behavior: "smooth",
      });
    }
  });
});
