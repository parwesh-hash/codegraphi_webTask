const menuBtn = document.getElementById("menu-btn");
const mobileMenu = document.getElementById("mobile-menu");
const overlay = document.getElementById("overlay");
const closeMenu = document.getElementById("close-menu");
const mobileServicesBtn = document.getElementById("mobile-services-btn");
const mobileServices = document.getElementById("mobile-services");
const header = document.querySelector("header");
const track = document.querySelector(".carousel-track");
//  const observer = document.querySelectorAll('.timeline-card');

// Optional: Animate numbers counting up
document.addEventListener("DOMContentLoaded", () => {
  const counters = document.querySelectorAll(".stat-number");
  counters.forEach((counter) => {
    const updateCount = () => {
      const target = +counter.textContent.replace(/[^\d.]/g, "");
      let count = 0;
      const increment = target / 100;
      const interval = setInterval(() => {
        count += increment;
        if (count >= target) {
          counter.textContent = counter.textContent.match(/\D+$/)
            ? target + counter.textContent.replace(/[\d.]/g, "")
            : target;
          clearInterval(interval);
        } else {
          counter.textContent =
            Math.floor(count) +
            (counter.textContent.match(/\D+$/)
              ? counter.textContent.replace(/[\d.]/g, "")
              : "");
        }
      }, 20);
    };
    updateCount();
  });
});

//   <!-- Animation Script -->

const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.remove("opacity-0", "translate-y-12");
        entry.target.classList.add("opacity-100", "translate-y-0");
      }
    });
  },
  { threshold: 0.2 }
);

document
  .querySelectorAll(".timeline-card")
  .forEach((card) => observer.observe(card));

// Scroll event for header background change
window.addEventListener("scroll", () => {
  if (window.scrollY > 50) {
    header.classList.add("scrolled");
  } else {
    header.classList.remove("scrolled");
  }
});

menuBtn.addEventListener("click", () => {
  mobileMenu.classList.remove("translate-x-full");
  overlay.classList.remove("hidden");
});
closeMenu.addEventListener("click", () => {
  mobileMenu.classList.add("translate-x-full");
  overlay.classList.add("hidden");
});
overlay.addEventListener("click", () => {
  mobileMenu.classList.add("translate-x-full");
  overlay.classList.add("hidden");
});
mobileServicesBtn.addEventListener("click", () => {
  mobileServices.classList.toggle("hidden");
});

// Active link highlight
const navLinks = document.querySelectorAll(".nav-link");
navLinks.forEach((link) => {
  link.addEventListener("click", () => {
    navLinks.forEach((l) => l.classList.remove("active"));
    link.classList.add("active");
  });
});

//  <!-- {{-- trusted by  --}} -->

let scrollAmount = 0;
let animationId;

function animateCarousel() {
  scrollAmount += 1; // scroll speed
  if (scrollAmount >= track.scrollWidth / 2) {
    scrollAmount = 0; // reset for seamless scroll
  }
  track.style.transform = `translateX(-${scrollAmount}px)`;
  animationId = requestAnimationFrame(animateCarousel);
}

// Start animation
animateCarousel();

// Pause on hover
track.parentElement.addEventListener("mouseenter", () => {
  cancelAnimationFrame(animationId);
});

// Resume on mouse leave
track.parentElement.addEventListener("mouseleave", () => {
  animateCarousel();
});

// // Optional: Animate numbers counting up
// document.addEventListener('DOMContentLoaded', () => {
//   const counters = document.querySelectorAll('.stat-number');
//   counters.forEach(counter => {
//     const updateCount = () => {
//       const target = +counter.textContent.replace(/[^\d.]/g, '');
//       let count = 0;
//       const increment = target / 100;
//       const interval = setInterval(() => {
//         count += increment;
//         if (count >= target) {
//           counter.textContent = counter.textContent.match(/\D+$/) ? target + counter.textContent.replace(/[\d.]/g, '') : target;
//           clearInterval(interval);
//         } else {
//           counter.textContent = Math.floor(count) + (counter.textContent.match(/\D+$/) ? counter.textContent.replace(/[\d.]/g, '') : '');
//         }
//       }, 20);
//     };
//     updateCount();
//   });
// });

// Service tabs functionality
const serviceTabs = document.querySelectorAll(".service-tab");

function updateActiveTab() {
  const scrollPosition = window.scrollY;

  // Get all section positions
  const aepsSection = document.getElementById("aeps");
  const bbpsSection = document.getElementById("bbps");
  const dmtSection = document.getElementById("dmt");
  const travelSection = document.getElementById("travel");
  const insuranceSection = document.getElementById("insurance");
  const loanSection = document.getElementById("loan");

  const sections = [
    { id: "aeps", element: aepsSection, offset: aepsSection.offsetTop - 100 },
    { id: "bbps", element: bbpsSection, offset: bbpsSection.offsetTop - 100 },
    { id: "dmt", element: dmtSection, offset: dmtSection.offsetTop - 100 },
    {
      id: "travel",
      element: travelSection,
      offset: travelSection.offsetTop - 100,
    },
    {
      id: "insurance",
      element: insuranceSection,
      offset: insuranceSection.offsetTop - 100,
    },
    { id: "loan", element: loanSection, offset: loanSection.offsetTop - 100 },
  ];

  // Find the current active section
  let currentSection = "aeps";

  for (const section of sections) {
    if (scrollPosition >= section.offset) {
      currentSection = section.id;
    }
  }

  // Update active tab
  serviceTabs.forEach((tab) => {
    tab.classList.remove("active");
    if (tab.getAttribute("href") === `#${currentSection}`) {
      tab.classList.add("active");
    }
  });
}

// Initialize active tab on page load
document.addEventListener("DOMContentLoaded", () => {
  updateActiveTab();
});

// Smooth scroll for service tabs
serviceTabs.forEach((tab) => {
  tab.addEventListener("click", (e) => {
    e.preventDefault();
    const targetId = tab.getAttribute("href");
    const targetSection = document.querySelector(targetId);

    window.scrollTo({
      top: targetSection.offsetTop - 120,
      behavior: "smooth",
    });
  });
});

//<!-- JS for FAQ Toggle -->

const questions = document.querySelectorAll(".faq-question");
questions.forEach((btn) => {
  btn.addEventListener("click", () => {
    const answer = btn.nextElementSibling;
    btn.classList.toggle("active");
    answer.classList.toggle("hidden");
  });
});
