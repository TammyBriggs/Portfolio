// toggle navbar icon (hamburger)
let menuIcon = document.querySelector("#menu-icon");
let navbar = document.querySelector(".navbar");

menuIcon.onclick = () => {
  menuIcon.classList.toggle("bx-x");
  navbar.classList.toggle("active");
};

// scroll sections active link
let sections = document.querySelectorAll("section");
let navLinks = document.querySelectorAll("header nav a");

window.onscroll = () => {
  sections.forEach((sec) => {
    let top = window.scrollY;
    let offset = sec.offsetTop - 150;
    let height = sec.offsetHeight;
    let id = sec.getAttribute("id");

    if (top >= offset && top < offset + height) {
      navLinks.forEach((links) => {
        links.classList.remove("active");
        document
          .querySelector("header nav a[href*=" + id + "]")
          .classList.add("active");
      });
    }
  });

  // sticky navbar
  let header = document.querySelector("header");

  header.classList.toggle("sticky", window.scrollY > 100);

  // remove toggle icon on click of navbar link (smaller screen)
  menuIcon.classList.remove("bx-x");
  navbar.classList.remove("active");
};

// handle changing of different tabs in about section
let tablinks = document.getElementsByClassName("tab-links");
let tabcontents = document.getElementsByClassName("tab-contents");

function opentab(tabname) {
  for (tablink of tablinks) {
    tablink.classList.remove("active-link");
  }
  for (tabcontent of tabcontents) {
    tabcontent.classList.remove("active-tab");
  }
  event.currentTarget.classList.add("active-link");
  document.getElementById(tabname).classList.add("active-tab");
}

document.addEventListener("DOMContentLoaded", () => {
  const wrapper = document.getElementById('servicesWrapper');
  const leftBtn = document.getElementById('leftBtn');
  const rightBtn = document.getElementById('rightBtn');

  if (wrapper && leftBtn && rightBtn) {
    // Function to check scroll position and toggle arrow visibility
    const handleArrowVisibility = () => {
      const maxScrollLeft = wrapper.scrollWidth - wrapper.clientWidth;
      
      // Show/hide left button
      if (wrapper.scrollLeft > 0) {
        leftBtn.style.display = 'flex';
      } else {
        leftBtn.style.display = 'none';
      }

      // Show/hide right button (using -2 to account for pixel rounding)
      if (wrapper.scrollLeft >= maxScrollLeft - 2) {
        rightBtn.style.display = 'none';
      } else {
        rightBtn.style.display = 'flex';
      }
    };

    // Scroll Right
    rightBtn.addEventListener('click', () => {
      const cardWidth = wrapper.querySelector('.service-card').offsetWidth + 20; // card width + gap
      wrapper.scrollBy({ left: cardWidth, behavior: 'smooth' });
    });

    // Scroll Left
    leftBtn.addEventListener('click', () => {
      const cardWidth = wrapper.querySelector('.service-card').offsetWidth + 20; // card width + gap
      wrapper.scrollBy({ left: -cardWidth, behavior: 'smooth' });
    });

    // Listen to scroll events (catches trackpad/touch swipes as well)
    wrapper.addEventListener('scroll', handleArrowVisibility);
    
    // Initial check on page load
    handleArrowVisibility();
  }
});

// scroll reveal
ScrollReveal({
  // reset: true,
  distance: "80px",
  duration: 2000,
  delay: 200,
});

ScrollReveal().reveal(".home-content, .heading", { origin: "top" });
ScrollReveal().reveal(
  ".home-img, .services-container, .portfolio-box, .contact form",
  { origin: "bottom" }
);
ScrollReveal().reveal(".home-content h1, .about-col-1", { origin: "left" });
ScrollReveal().reveal(".home-content, .about-col-2", { origin: "right" });

document
  .querySelector('form[name="submit-to-google-sheet"]')
  .addEventListener("submit", function (e) {
    e.preventDefault();

    const name = document.querySelector('input[name="Name"]').value.trim();
    const email = document.querySelector('input[name="Email"]').value.trim();
    const number = document.querySelector('input[name="Number"]').value.trim();
    const subject = document
      .querySelector('input[name="Subject"]')
      .value.trim();
    const message = document
      .querySelector('textarea[name="Message"]')
      .value.trim();

    if (!name || !email || !number || !subject || !message) {
      Toastify({
        text: "❌ All fields are required.",
        duration: 3000,
        gravity: "top",
        position: "right",
        style: {
          background: "linear-gradient(to right,#f0960f,#c44020)",
          fontSize: "1.6rem",
          padding: "1rem 1.6rem",
        },
      }).showToast();
      return;
    }

    if (!isValidEmail(email)) {
      Toastify({
        text: "❌ Invalid email address.",
        duration: 3000,
        gravity: "top",
        position: "right",
        style: {
          background: "linear-gradient(to right,#f0960f,#c44020)",
          fontSize: "1.6rem",
          padding: "1rem 1.6rem",
        },
      }).showToast();
      return;
    }

    if (!isValidPhoneNumber(number)) {
      Toastify({
        text: "❌ Invalid phone number. Must be 10 or 11 digits.",
        duration: 3000,
        gravity: "top",
        position: "right",
        style: {
          background: "linear-gradient(to right,#f0960f,#c44020)",
          fontSize: "1.6rem",
          padding: "1rem 1.6rem",
        },
      }).showToast();
      return;
    }

    if (!isValidFullName(name)) {
      Toastify({
        text: "❌ Invalid full name. Use only letters, hyphens, apostrophes, and spaces.",
        duration: 3000,
        gravity: "top",
        position: "right",
        style: {
          background: "linear-gradient(to right,#f0960f,#c44020)",
          fontSize: "1.6rem",
          padding: "1rem 1.6rem",
        },
      }).showToast();
      return;
    }

    Toastify({
      text: "✅ Message sent successfully!",
      duration: 3000,
      gravity: "top",
      position: "right",
      style: {
        background: "linear-gradient(to right, #00b09b, #96c93d)",
        fontSize: "1.6rem",
        padding: "1rem 1.6rem",
      },
    }).showToast();

    fetch(
      "https://script.google.com/macros/s/AKfycbyV7x0YYCcKcAxTdMgdGgy41oVHMxizCN0FWhzVWy50G5QLcm05fLW5eEyR4sF7bR3nbg/exec",
      {
        method: "POST",
        body: new FormData(e.target),
      }
    )
      .then((response) =>
        console.log("Form submitted to Google Sheets!", response)
      )
      .catch((error) =>
        console.error("Error submitting to Google Sheets!", error)
      );

    e.target.reset();
  });

// Helper functions
function isValidEmail(email) {
  if (!email || email.endsWith(".")) return false;
  if (!email.includes("@")) return false;
  const parts = email.split("@");
  if (parts.length !== 2) return false;
  const [localPart, domainPart] = parts;
  if (!localPart || !domainPart || !domainPart.includes(".")) return false;
  return true;
}

function isValidPhoneNumber(phone) {
  const cleanedPhone = phone.trim();
  const digitsOnly = /^\d{10,11}$/;
  return digitsOnly.test(cleanedPhone);
}

function isValidFullName(name) {
  const nameRegex = /^[\p{L}][\p{L}'\- ]*[\p{L}]$/u;
  const trimmed = name.trim();
  if (trimmed.length < 2) return false;
  return nameRegex.test(trimmed);
}
