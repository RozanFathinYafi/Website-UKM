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
    // function checkWindowSize() {
    //   if (window.innerWidth <= 768) {
    //     sidebarVisible = false;
    //     updateUI();
    //   }
    // }
    // window.addEventListener("resize", checkWindowSize);

    // checkWindowSize();


    function searchMenu() {
  const input = document.getElementById('searchInput').value.toLowerCase();
  const cards = document.querySelectorAll('.cards-container .card');

  cards.forEach((card) => {
    const title = card.querySelector('.card-title').textContent.toLowerCase();
    if (title.includes(input)) {
      card.style.display = '';
    } else {
      card.style.display = 'none';
    }
  });
}

// Keranjang Belanja Array
let cart = [];

function toggleCart() {
  const cartModal = document.getElementById("cartModal");
  if (cartModal.style.display === "none" || cartModal.style.display === "") {
    cartModal.style.display = "flex";
  } else {
    cartModal.style.display = "none";
  }
  updateCart();
}

// Update Keranjang
function updateCart() {
  const cartItemsElement = document.getElementById("cartItems");
  const cartTotalElement = document.getElementById("cartTotal");
  const cartTotalModalElement = document.getElementById("cartTotalModal");

  cartItemsElement.innerHTML = ""; // Bersihkan item keranjang

  let total = 0;
  cart.forEach((item, index) => {
    const li = document.createElement("li");
    li.textContent = `${item.name} - Rp ${item.price}`;
    
    // Tombol hapus
    const removeBtn = document.createElement("button");
    removeBtn.textContent = "Hapus";
    removeBtn.classList.add("remove-btn");
    removeBtn.onclick = () => removeFromCart(index);
    li.appendChild(removeBtn);
    
    cartItemsElement.appendChild(li);
    total += item.price;
  });

  cartTotalElement.textContent = total;
  cartTotalModalElement.textContent = total;
}

// Tambah Item ke Keranjang
function addToCart(item) {
  cart.push(item);
  updateCart();
}

// Hapus Item dari Keranjang
function removeFromCart(index) {
  cart.splice(index, 1); // Menghapus item berdasarkan index
  updateCart();
}

// Checkout
function checkout() {
  if (cart.length === 0) {
    alert("Keranjang masih kosong.");
    return;
  }

  const paymentMethod = prompt("Pilih Metode Pembayaran: (1) COD, (2) Transfer, (3) QRIS");

  if (paymentMethod === "1") {
    alert("Metode pembayaran COD dipilih.");
  } else if (paymentMethod === "2") {
    alert("Metode pembayaran Transfer dipilih.");
  } else if (paymentMethod === "3") {
    alert("Metode pembayaran QRIS dipilih.");
  } else {
    alert("Metode pembayaran tidak valid.");
    return;
  }

  // Setelah checkout, keranjang kosong
  cart = [];
  updateCart();
  toggleCart();  // Menutup modal keranjang setelah checkout
  alert("Pembayaran berhasil! Terima kasih.");
}
