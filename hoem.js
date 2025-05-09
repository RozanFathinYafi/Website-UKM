 feather.replace();

    const sidebar = document.querySelector(".sidebar");
    const toggleBtns = document.querySelectorAll(".sidebar-toggle-btn");
    const body = document.body;
    const logo = document.querySelector(".sidebar .logo");
    let toggleBtn = toggleBtns[0];
    let sidebarVisible = false;

    function updateUI() {
      if (sidebarVisible) {
        sidebar.classList.remove("hidden");
        body.classList.remove("sidebar-hidden");
        body.classList.add("sidebar-visible");
        toggleBtn.setAttribute("aria-expanded", "true");
        toggleBtn.innerHTML = "&#10005;";
        logo.classList.remove("hidden");
        toggleBtn.style.left = "232px";
        body.style.marginLeft = "220px";
      } else {
        sidebar.classList.add("hidden");
        body.classList.add("sidebar-hidden");
        body.classList.remove("sidebar-visible");
        toggleBtn.setAttribute("aria-expanded", "false");
        toggleBtn.innerHTML = "&#9776;";
        logo.classList.add("hidden");
        toggleBtn.style.left = "12px";
        body.style.marginLeft = "0";
      }
    }

    toggleBtns.forEach((btn) => {
      btn.addEventListener("click", () => {
        sidebarVisible = !sidebarVisible;
        toggleBtn = btn;
        updateUI();
      });

      btn.addEventListener("keydown", (e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          sidebarVisible = !sidebarVisible;
          toggleBtn = btn;
          updateUI();
        }
      });
    });

    updateUI();

    // Carousel functionality
    const slides = document.querySelectorAll(".carousel-slide");
    const prevBtn = document.querySelector(".carousel-control.prev");
    const nextBtn = document.querySelector(".carousel-control.next");
    const indicators = document.querySelectorAll(".carousel-indicators button");
    let currentIndex = 0;
    let slideInterval;

    function showSlide(index) {
      slides.forEach((slide, i) => {
        slide.classList.toggle("active", i === index);
        slide.setAttribute("aria-hidden", i !== index);
        slide.tabIndex = i === index ? 0 : -1;
        indicators[i].classList.toggle("active", i === index);
        indicators[i].setAttribute("aria-selected", i === index ? "true" : "false");
        indicators[i].tabIndex = i === index ? 0 : -1;
      });
      currentIndex = index;
    }

    function nextSlide() {
      const next = (currentIndex + 1) % slides.length;
      showSlide(next);
    }
    function prevSlideFn() {
      const prev = (currentIndex - 1 + slides.length) % slides.length;
      showSlide(prev);
    }

    prevBtn.addEventListener("click", () => {
      prevSlideFn();
      resetInterval();
    });
    nextBtn.addEventListener("click", () => {
      nextSlide();
      resetInterval();
    });

    indicators.forEach((btn, index) => {
      btn.addEventListener("click", () => {
        showSlide(index);
        resetInterval();
      });
      btn.addEventListener("keydown", (e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          showSlide(index);
          resetInterval();
        }
      });
    });
    showSlide(0);

    function resetInterval() {
      clearInterval(slideInterval);
      slideInterval = setInterval(nextSlide, 5000);
    }

    slideInterval = setInterval(nextSlide, 5000);

    resetInterval();

    // // Smooth scroll for sidebar nav anchors
    // document.querySelectorAll(".sidebar nav a").forEach((anchor) => {
    //   anchor.addEventListener("click", (e) => {
    //     e.preventDefault();
    //     const id = anchor.getAttribute("href");
    //     const target = document.querySelector(id);
    //     if (target) {
    //       target.scrollIntoView({ behavior: "smooth", block: "center" });
    //     }
    //   });
    // });

    // Responsive behavior on window resize
    function checkWindowSize() {
      if (window.innerWidth <= 768) {
        sidebarVisible = false;
        updateUI();
      }
    }
    window.addEventListener("resize", checkWindowSize);

    checkWindowSize();