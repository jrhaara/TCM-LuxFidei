// ====== ELEMENTOS PRINCIPAIS ======
const menuBtn = document.querySelector(".headerbtn button");
const nav = document.getElementById("sideNav");
const closeNav = document.getElementById("closeNav");
const form = document.querySelector(".forms");
const submitBtn = document.querySelector(".btn");

  // ===== MENU LATERAL =====
  if (menuBtn && nav && closeNav) {
    // abrir menu
    menuBtn.addEventListener("click", (e) => {
      e.stopPropagation();
      nav.classList.add("active");
      body.classList.add("noscroll");
    });

    // fechar menu
    closeNav.addEventListener("click", () => {
      nav.classList.remove("active");
      body.classList.remove("noscroll");
    });

    // impedir clique dentro do menu de fechar ele
    nav.addEventListener("click", (e) => {
      e.stopPropagation();
    });

    // fechar menu ao clicar fora
    window.addEventListener("click", (e) => {
      const isClickOutside = !nav.contains(e.target) && e.target !== menuBtn;
      if (nav.classList.contains("active") && isClickOutside) {
        nav.classList.remove("active");
        body.classList.remove("noscroll");
      }
    });
  }
