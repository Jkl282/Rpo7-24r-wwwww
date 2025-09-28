const menuToggle = document.getElementById('menuToggle');
const navList = document.getElementById('navList');
const navLinks = document.querySelectorAll('.nav-link');

menuToggle.addEventListener('click', () => {
  menuToggle.classList.toggle('active');
  navList.classList.toggle('active');
  document.body.style.overflow = navList.classList.contains('active') ? 'hidden' : '';
});

navLinks.forEach(link => {
  link.addEventListener('click', () => {
    menuToggle.classList.remove('active');
    navList.classList.remove('active');
    document.body.style.overflow = '';
  });
});

document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute('href'));
    if (target) {
      target.scrollIntoView({
        behavior: 'smooth',
        block: 'start'
      });
    }
  });
});

document.addEventListener("DOMContentLoaded", () => {
  const copyBtn = document.querySelector(".server-ip-btn");
  const msg = document.getElementById("copy-msg");

  copyBtn.addEventListener("click", () => {
    const ip = copyBtn.dataset.ip;
    navigator.clipboard.writeText(ip).then(() => {
      msg.style.display = "inline";
      setTimeout(() => msg.style.display = "none", 2000);
    }).catch(() => {
      alert("Не удалось скопировать IP 😢");
    });
  });
});

document.addEventListener("DOMContentLoaded", () => {
  const modal = document.getElementById("buyModal");
  const modalItemName = document.getElementById("modalItemName");
  const modalItemPrice = document.getElementById("modalItemPrice");
  const closeBtn = document.querySelector(".close");
  const buyBtns = document.querySelectorAll(".buy-btn");
  const paymentForm = document.getElementById("paymentForm");

  function showSuccessModal(itemName, itemPrice) {
    document.getElementById('successItemName').textContent = itemName;
    document.getElementById('successItemPrice').textContent = itemPrice;
    document.getElementById('successModal').style.display = 'flex';
  }

  document.querySelector('.success-close-btn').addEventListener('click', function() {
    document.getElementById('successModal').style.display = 'none';
  });

  window.addEventListener('click', function(event) {
    const successModal = document.getElementById('successModal');
    if (event.target === successModal) {
      successModal.style.display = 'none';
    }
  });

  buyBtns.forEach(btn => {
    btn.addEventListener("click", e => {
      e.preventDefault();
      modal.style.display = "flex";
      modalItemName.textContent = btn.dataset.item;
      modalItemPrice.textContent = btn.dataset.price;
    });
  });

  closeBtn.addEventListener("click", () => (modal.style.display = "none"));
  window.addEventListener("click", e => {
    if (e.target === modal) modal.style.display = "none";
  });

  paymentForm.addEventListener("submit", e => {
    e.preventDefault();
    
    modal.style.display = "none";
    
    showSuccessModal(modalItemName.textContent, modalItemPrice.textContent);
    
    paymentForm.reset();
  });
});

document.addEventListener('DOMContentLoaded', function() {
    const firstStoreSection = document.getElementById('store');
    const navLinks = document.querySelectorAll('.nav-link');
    
    function updateActiveMenu() {
        if (!firstStoreSection) return;
        
        const storeTop = firstStoreSection.offsetTop - 200;
        const isInAnyStoreSection = window.scrollY >= storeTop;
        
        navLinks.forEach(link => {
            link.classList.remove('privileges');
            
            if (isInAnyStoreSection) {
                if (link.innerHTML.includes('Магазин')) {
                    link.classList.add('privileges');
                }
            } else {
                if (link.innerHTML.includes('Главная')) {
                    link.classList.add('privileges');
                }
            }
        });
    }
    
    let scrollTimeout;
    window.addEventListener('scroll', function() {
        clearTimeout(scrollTimeout);
        scrollTimeout = setTimeout(updateActiveMenu, 50);
    });
    
    updateActiveMenu();
});