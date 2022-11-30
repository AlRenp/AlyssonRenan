const menuButton = document.querySelector(".onmenu");
const closedButton = document.querySelector(".offmenu");
const nav = document.querySelector("nav");
const container = document.querySelector(".container");
const link = document.querySelectorAll("nav a");
const menuItems = document.querySelectorAll('.menu a[href^="#"]');

menuButton.onclick = () => {
  addClass(closedButton);
  removeClass(menuButton);
  nav.classList.add("hide");
  addBlur(3);
};

closedButton.onclick = () => {
  addClass(menuButton);
  removeClass(closedButton);
  nav.classList.remove("hide");
  addBlur(0);
};

function addClass(element) {
  element.classList.add("open");
}

function removeClass(element) {
  element.classList.remove("open");
}

function addBlur(value) {
  container.style.filter = `blur(${value}px)`;
}

function removeHide() {
  nav.classList.remove("hide");
  addClass(menuButton);
  removeClass(closedButton);
  addBlur(0);
}

menuItems.forEach((item) => {
  item.addEventListener("click", removeHide);
});

// scroll

function getScrollTopByHref(element) {
  const id = element.getAttribute("href");
  return document.querySelector(id).offsetTop;
}

function scrollToPosition(to) {
  smoothScrollTo(0, to);
}

function scrollToIdOnClick(event) {
  event.preventDefault();
  const to = getScrollTopByHref(event.currentTarget) - 100;
  scrollToPosition(to);
}

menuItems.forEach((item) => {
  item.addEventListener("click", scrollToIdOnClick);
});

/**
 * Smooth scroll animation
 * @param {int} endX: destination x coordinate
 * @param {int} endY: destination y coordinate
 * @param {int} duration: animation duration in ms
 */
function smoothScrollTo(endX, endY, duration) {
  const startX = window.scrollX || window.pageXOffset;
  const startY = window.scrollY || window.pageYOffset;
  const distanceX = endX - startX;
  const distanceY = endY - startY;
  const startTime = new Date().getTime();

  duration = typeof duration !== "undefined" ? duration : 400;

  // Easing function
  const easeInOutQuart = (time, from, distance, duration) => {
    if ((time /= duration / 2) < 1)
      return (distance / 2) * time * time * time * time + from;
    return (-distance / 2) * ((time -= 2) * time * time * time - 2) + from;
  };

  const timer = setInterval(() => {
    const time = new Date().getTime() - startTime;
    const newX = easeInOutQuart(time, startX, distanceX, duration);
    const newY = easeInOutQuart(time, startY, distanceY, duration);
    if (time >= duration) {
      clearInterval(timer);
    }
    window.scroll(newX, newY);
  }, 1000 / 60); // 60 fps
}
