
"use strict";
/* start Header Fixed ============ */
document.addEventListener("DOMContentLoaded", function () {
  let lastScrollTop = 0;
  const navBarOne = document.querySelector(".upper-navbar");
  const navBarMenu = document.querySelector(".main-navbar");

  window.addEventListener("scroll", function () {
    const currentScroll = window.scrollY;

    if (currentScroll < lastScrollTop && currentScroll > 70) {
      navBarOne && (navBarOne.style.display = "none");
      navBarMenu && navBarMenu.classList.add("is-fixed");
    } else {
      navBarOne && (navBarOne.style.display = "block");
      navBarMenu && navBarMenu.classList.remove("is-fixed");
    }

    lastScrollTop = currentScroll;
  });
});
/* End Header Fixed ============ */


/**
 * Handles navigation clicks for dropdown menus on smaller screens.
 *
 * @param {number} screenWidth - The current width of the screen.
 */
function handleNavClicks(screenWidth) {
  if (screenWidth <= 991) {
    const navLinks = document.querySelectorAll(".navbar-nav > li > a, .sub-menu > li > a");
    navLinks.forEach(link => {
      link.removeEventListener('click', handleClick);
      link.addEventListener('click', handleClick);
    });

    function handleClick(e) {
      // Behavior when clicking links - empty logic based on your jQuery
      console.log("sub-menu clicked");
    }
  }
}

document.addEventListener("DOMContentLoaded", function () {
  const screenWidth = window.innerWidth;
  handleNavClicks(screenWidth);
});


// start Side Menu mobile //
const btnOpenSideMenu = document.querySelector(".navbar-toggler");
const sideMenuItem = document.querySelector(".side-menu");
const closeSidebarOverLay = document.querySelector(".close-menu-sidebar");
const btnCloseSideMenu = document.querySelector(".close-side-menu");
const body = document.body;

function toggleMenu(open) {
  console.log("Toggle menu called with open:", open);
  if (sideMenuItem) sideMenuItem.classList.toggle("open", open);
  if (closeSidebarOverLay) closeSidebarOverLay.classList.toggle("open", open);
  body.style.overflow = open ? "hidden" : "auto";
  console.log("Body overflow set to:", body.style.overflow);
}

if (btnOpenSideMenu) {
  btnOpenSideMenu.addEventListener("click", function (e) {
    e.preventDefault();
    toggleMenu(!sideMenuItem.classList.contains("open"));
  });
}

[closeSidebarOverLay, btnCloseSideMenu].forEach(el => {
  if (el) {
    el.addEventListener("click", function (e) {
      e.preventDefault();
      toggleMenu(false);
    });
  }
});
// end Side Menu mobile //


// start Show more and Show less Function
document.addEventListener("DOMContentLoaded", function () {
  const showMoreBtns = document.querySelectorAll(".showMore-btn");
  const sectionParas = document.querySelectorAll(".section-title-para");

  function toggleShowMoreButton(para, btn) {
    if (!para || !btn) return;
    const paragraphHeight = para.scrollHeight;
    if (paragraphHeight > 150) {
      btn.style.display = "inline-block";
    } else {
      btn.style.display = "none";
    }
  }

  // Initialize each show more button
  showMoreBtns.forEach((btn, index) => {
    const para = sectionParas[index];
    if (para && btn) {
      toggleShowMoreButton(para, btn);

      btn.addEventListener("click", function () {
        para.classList.toggle("show");
        btn.textContent = para.classList.contains("show") ? "Show Less" : "Show More";
        toggleShowMoreButton(para, btn);
      });

      if (window.ResizeObserver) {
        let resizeObserver = new ResizeObserver(() => toggleShowMoreButton(para, btn));
        resizeObserver.observe(para);
      }
    }
  });
});
// end Show more and Show less Function


// Mobile submenu toggle
document.addEventListener("DOMContentLoaded", function () {
  const dropdownIcons = document.querySelectorAll(".nav-item.mobile.has-dropdown .icon-down");

  dropdownIcons.forEach(icon => {
    icon.addEventListener("click", function (e) {
      e.preventDefault();
      const parentItem = this.closest(".nav-item.mobile.has-dropdown");
      const submenu = parentItem.querySelector(".mobile.sub-menu");

      document.querySelectorAll(".nav-item.mobile.has-dropdown .mobile.sub-menu").forEach(sub => {
        if (sub !== submenu) {
          sub.classList.remove("sub-menu-collapsed");
        }
      });

      submenu.classList.toggle("sub-menu-collapsed");

      // Toggle active class on clicked icon
      this.classList.toggle("active");

      // Remove active from other icons
      dropdownIcons.forEach(otherIcon => {
        if (otherIcon !== this) {
          otherIcon.classList.remove("active");
        }
      });
    });
  });
});


// Page Scroll Percentage
function scrollTopPercentage() {
  const scrollElementWrap = document.getElementById("scroll-top");
  const scrollTopValue = document.getElementById("scroll-top-value");

  const scrollPercentage = () => {
    const scrollTopPos = document.documentElement.scrollTop;
    const calcHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    const scrollValue = Math.round((scrollTopPos / calcHeight) * 100);

    if (scrollElementWrap) {
      scrollElementWrap.style.background = `conic-gradient(var(--main-color) ${scrollValue}%, var(--second-color) ${scrollValue}%)`;

      if (scrollTopPos > 100) {
        scrollElementWrap.classList.add("active");
      } else {
        scrollElementWrap.classList.remove("active");
      }
    }

    if (scrollTopValue) {
      if (scrollValue < 96) {
        scrollTopValue.textContent = `${scrollValue}%`;
      } else {
        scrollTopValue.innerHTML = '<i class="fas fa-arrow-up"></i>';
      }
    }
  };

  window.onscroll = scrollPercentage;
  window.onload = scrollPercentage;

  if (scrollElementWrap) {
    scrollElementWrap.addEventListener("click", function () {
      document.documentElement.scrollTo({
        top: 0,
        behavior: "smooth",
      });
    });
  }
}
scrollTopPercentage();


// Toggle open class on close button
const toggleBtn = document.querySelector(".close-btn");

if (toggleBtn) {
  toggleBtn.addEventListener("click", () => {
    toggleBtn.classList.toggle("open");
  });
}


// Animated generate buttons
document.querySelectorAll(".generate-button").forEach((button) => {
  const width = button.offsetWidth;
  const height = button.offsetHeight;
  const style = getComputedStyle(button);

  const strokeGroup = document.createElement("div");
  strokeGroup.classList.add("stroke");

  const { svg: stroke } = createSVG(width, height, "stroke-line", "rect", {
    x: "0",
    y: "0",
    width: "100%",
    height: "100%",
    rx: parseInt(style.borderRadius, 10),
    ry: parseInt(style.borderRadius, 10),
    pathLength: "30"
  });

  strokeGroup.appendChild(stroke);
  button.appendChild(strokeGroup);

  const stars = gsap.to(button, {
    repeat: -1,
    repeatDelay: 0.5,
    paused: true,
    keyframes: [
      {
        "--generate-button-star-2-scale": ".5",
        "--generate-button-star-2-opacity": ".25",
        "--generate-button-star-3-scale": "1.25",
        "--generate-button-star-3-opacity": "1",
        duration: 0.3
      },
      {
        "--generate-button-star-1-scale": "1.5",
        "--generate-button-star-1-opacity": ".5",
        "--generate-button-star-2-scale": ".5",
        "--generate-button-star-3-scale": "1",
        "--generate-button-star-3-opacity": ".5",
        duration: 0.3
      },
      {
        "--generate-button-star-1-scale": "1",
        "--generate-button-star-1-opacity": ".25",
        "--generate-button-star-2-scale": "1.15",
        "--generate-button-star-2-opacity": "1",
        duration: 0.3
      },
      {
        "--generate-button-star-2-scale": "1",
        duration: 0.35
      }
    ]
  });

  button.addEventListener("pointerenter", () => {
    gsap.to(button, {
      "--generate-button-dots-opacity": "1",
      duration: 0.5,
      onStart: () => {
        setTimeout(() => stars.restart().play(), 500);
      }
    });
  });

  button.addEventListener("pointerleave", () => {
    gsap.to(button, {
      "--generate-button-dots-opacity": "0",
      "--generate-button-star-1-opacity": ".25",
      "--generate-button-star-1-scale": "1",
      "--generate-button-star-2-opacity": "1",
      "--generate-button-star-2-scale": "1",
      "--generate-button-star-3-opacity": ".5",
      "--generate-button-star-3-scale": "1",
      duration: 0.15,
      onComplete: () => {
        stars.pause();
      }
    });
  });
});






document.getElementById("csyear").textContent = new Date().getFullYear();




/* =============================== Start Partner One Carousel =============================== */

if ($(".partners__carousel").length) {
  $(".partners__carousel").owlCarousel({
    loop: true,
    margin: 20,
    nav: false,
    smartSpeed: 500,
    autoHeight: false,
    autoplay: true,
    dots: false,
    autoplayTimeout: 10000,
    navText: [
      '<span class="icon-right-arrow left"></span>',
      '<span class="icon-right-arrow"></span>',
    ],
    responsive: {
      0: {
        items: 1,
      },
      600: {
        items: 2,
      },
      800: {
        items: 3,
      },
      1024: {
        items: 4,
      },
      1200: {
        items: 6,
      },
    },
  });
}

/* =============================== Start Partner One Carousel =============================== */


$(document).ready(function () {
  // Accordion
  if ($(".accrodion-grp").length) {
    $(".accrodion-grp").each(function () {
      var accrodionName = $(this).data("grp-name");
      var accordion = $(this).find(".accrodion");

      $(this).addClass(accrodionName).find(".accrodion-content").hide();
      $(this).find(".accrodion.active").find(".accrodion-content").show();

      accordion.each(function () {
        $(this).find(".accrodion-title").on("click", function () {
          var parentAcc = $(this).parent();

          if (parentAcc.hasClass("active")) {
            // إذا كانت مفتوحة، اقفلها
            parentAcc.removeClass("active").find(".accrodion-content").slideUp();
          } else {
            // اقفل الباقي وافتح الحالية
            $(".accrodion-grp." + accrodionName)
              .find(".accrodion")
              .removeClass("active")
              .find(".accrodion-content")
              .slideUp();

            parentAcc.addClass("active").find(".accrodion-content").slideDown();
          }
        });
      });
    });
  }
});



  // Testimonials Carousel
  $(".testimonials-owl").owlCarousel({
    items: 3,
    margin: 30,
    center: true,
    autoplay: true,
    autoplayTimeout: 6000,
    smartSpeed: 700,
    loop: true,
    nav: false,
    dots: false,
    responsive: {
      0: { items: 1 },
      768: { items: 2 },
      1200: { items: 3, dots: false },
    },
  });




