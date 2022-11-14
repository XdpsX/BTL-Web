$(document).ready(function () {
  $(".image-slider").slick({
    centerMode: true,
    centerPadding: "20px",
    slidesToShow: 5,
    speed: 600,
    prevArrow:
      '<button class="slide-arrow prev-arrow"><ion-icon class="slide-icon" name="chevron-back-outline"></ion-icon></button>',
    nextArrow:
      '<button class="slide-arrow next-arrow"><ion-icon class="slide-icon" name="chevron-forward-outline"></ion-icon></button>',
    focusOnSelect: true,
    responsive: [
      {
        breakpoint: 768,
        settings: {
          arrows: false,
          centerMode: true,
          centerPadding: "40px",
          slidesToShow: 3,
        },
      },
      {
        breakpoint: 480,
        settings: {
          arrows: false,
          centerMode: true,
          centerPadding: "40px",
          slidesToShow: 1,
        },
      },
    ],
  });
});

const navSecondList = document.querySelector(".nav-secondary__list");

const platformList = document.querySelector(".platform-operation-container");
const platformBtn = document.querySelectorAll(".platform-operation");
const cardsContainer = document.querySelectorAll(".cards-box");
const cardBoxs = document.querySelectorAll(".cards-box");

const yearLabel = document.querySelector(".footer__year");

const allSections = document.querySelectorAll(".section");
const allNavSecLink = document.querySelectorAll(".nav-secondary__link");

// External buttons
const btnsExternal = document.querySelector(".external-btns");
btnsExternal.classList.add("section--hidden");

// Smooth scroll
navSecondList.addEventListener("click", function (e) {
  e.preventDefault();

  const clicked = e.target;
  if (!clicked.classList.contains("nav-secondary__link")) return;

  const id = clicked.getAttribute("href");
  document.querySelector(id).scrollIntoView({ behavior: "smooth" });
});

// Platform tabbed content
platformList.addEventListener("click", function (e) {
  const clicked = e.target.closest(".platform-operation");

  if (!clicked) return;
  platformBtn.forEach((btn) => btn.classList.remove("platform-active"));
  cardsContainer.forEach((container) =>
    container.classList.remove("cards-box--active")
  );

  clicked.classList.add("platform-active");
  document
    .querySelector(`.cards-box--${clicked.dataset.card}`)
    .classList.add("cards-box--active");

  const displayCard = (opacity) => {
    cardBoxs.forEach((card) => (card.style.opacity = opacity));
  };

  displayCard(0.6);
  setTimeout(() => displayCard(1), 600);
});

// Year in copyright
const now = new Date();
yearLabel.innerHTML = now.getFullYear();

//
window.addEventListener("scroll", function () {
  let current;
  allSections.forEach((section) => {
    const sectionTop = section.offsetTop;
    if (this.window.scrollY >= sectionTop - (80 + 1)) {
      current = section.getAttribute("id");
    }
  });
  allNavSecLink.forEach((link) => {
    link.classList.remove("nav-secondary__link--active");

    if (link.getAttribute("href") === `#${current}`) {
      link.classList.add("nav-secondary__link--active");
    }
  });

  // btn
  btnsExternal.classList.remove("section--hidden");
});

// Reveal Section
const revealSection = (entries, observe) => {
  const [entry] = entries;
  console.log("Reveal");
  console.log(entry.target);
  if (!entry.isIntersecting) return;
  entry.target.classList.remove("section--hidden");
  observe.unobserve(entry.target);
};
const sectionObserver = new IntersectionObserver(revealSection, {
  root: null,
  threshold: 0,
});

allSections.forEach((section) => {
  sectionObserver.observe(section);
  section.classList.add("section--hidden");
});