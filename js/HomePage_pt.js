// ===================================================
// HOME PAGE SCRIPT EXPLICADO
// ===================================================
// Esse script controla:
// - Tela de carregamento inicial
// - Dica ao passar o mouse nos vitrais
// - Botão "voltar ao topo"
// - Menu lateral (mobile)
// - Carrossel de vitrais (mobile)
// ===================================================

// Espera o DOM estar pronto antes de rodar
document.addEventListener("DOMContentLoaded", () => {

  // ---------------------------------------------------
  // ELEMENTOS PRINCIPAIS
  // ---------------------------------------------------
  const vitrais = document.querySelectorAll(".vitex");   // Vitrais principais (desktop)
  const dica = document.getElementById("dica");          // Mensagem de dica
  const btntop = document.getElementById("btn");         // Botão para voltar ao topo
  const btndiv = document.getElementById("btndiv");      // Div que contém o botão
  const imgcrg = document.getElementById("imgcrg");      // Imagem do carregamento
  const crg = document.getElementById("crg");            // Tela de carregamento
  const body = document.body;                            // Corpo da página
  const all = document.querySelector(".all");            // Conteúdo principal
  const menuBtn = document.querySelector(".headerbtn button"); // Botão de abrir menu
  const nav = document.getElementById("sideNav");        // Menu lateral
  const closeNav = document.getElementById("closeNav");  // Botão de fechar menu
  let dicaTimeout;                                       // Timeout da dica

  // ---------------------------------------------------
  // BLOQUEIA SCROLL ENQUANTO A PÁGINA CARREGA
  // ---------------------------------------------------
  body.classList.add("noscroll");

  // ---------------------------------------------------
  // SAÍDA DA TELA DE CARREGAMENTO
  // ---------------------------------------------------
  if (imgcrg && crg && all) {
    imgcrg.addEventListener("click", () => {
      crg.classList.add("exit"); // animação de saída
      setTimeout(() => {
        all.classList.add("vsl");       // mostra o conteúdo
        body.classList.remove("noscroll");
      }, 600);
      setTimeout(() => (crg.style.display = "none"), 1000);
    });
  }

  // ---------------------------------------------------
  // DICA AO PASSAR O MOUSE NOS VITRAIS (DESKTOP)
  // ---------------------------------------------------
  if (dica && vitrais.length > 0) {
    vitrais.forEach(vitral => {
      vitral.addEventListener("mouseenter", () => {
        dicaTimeout = setTimeout(() => dica.classList.add("active"), 2000);
      });
      vitral.addEventListener("mouseleave", () => {
        clearTimeout(dicaTimeout);
        dica.classList.remove("active");
      });
    });
  }

  // ---------------------------------------------------
  // BOTÃO "VOLTAR AO TOPO"
  // ---------------------------------------------------
  if (btntop && btndiv) {
    // Mostra o botão ao rolar a página
    window.addEventListener("scroll", () => {
      btndiv.classList.toggle("active", window.scrollY > 200);
    });

    // Faz a rolagem suave para o topo
    btntop.addEventListener("click", () => {
      window.scrollTo({ top: 0, behavior: "smooth" });
    });
  }

  // ---------------------------------------------------
  // ANIMAÇÃO DE ENTRADA DO CONTEÚDO
  // ---------------------------------------------------
  window.addEventListener("load", () => {
    setTimeout(() => all?.classList.add("vsl"), 800);
  });

  // ---------------------------------------------------
  // MENU LATERAL (MOBILE)
  // ---------------------------------------------------
  if (menuBtn && nav && closeNav) {
    menuBtn.addEventListener("click", e => {
      e.stopPropagation();
      nav.classList.add("active");
      body.classList.add("noscroll");
    });

    closeNav.addEventListener("click", () => {
      nav.classList.remove("active");
      body.classList.remove("noscroll");
    });

    nav.addEventListener("click", e => e.stopPropagation());

    // Fecha o menu ao clicar fora dele
    window.addEventListener("click", e => {
      const clicouFora = !nav.contains(e.target) && e.target !== menuBtn;
      if (nav.classList.contains("active") && clicouFora) {
        nav.classList.remove("active");
        body.classList.remove("noscroll");
      }
    });
  }

  // ---------------------------------------------------
  // LIMPA ESTADOS AO SAIR DA PÁGINA
  // ---------------------------------------------------
  window.addEventListener("beforeunload", () => {
    body.classList.remove("noscroll");
    nav?.classList.remove("active");
  });

  // ---------------------------------------------------
  // CARROSSEL DE VITRAIS (MOBILE)
  // ---------------------------------------------------
  const imgCel = document.getElementById("vitracel");
  const textCel = document.getElementById("textcel");
  const btnEsq = document.getElementById("btnesq");
  const btnDir = document.getElementById("btndir");

  if (imgCel && textCel && btnEsq && btnDir) {
    const vitraisCelulares = [
      { img: "Imagens/Vitral_Jesus.png", texto: "Dogmas sobre Jesus", link: "#" },
      { img: "Imagens/Vitral_Deus.png", texto: "Dogmas Centrais", link: "menuDsobreFe_pt.html" },
      { img: "Imagens/Vitral_mariano.png", texto: "Dogmas Marianos", link: "#" }
    ];

    let indice = 0;
    let intervalo;

    const atualizarVitral = () => {
      const { img, texto, link } = vitraisCelulares[indice];
      imgCel.classList.add("fade-out");

      // troca de imagem com efeito
      setTimeout(() => {
        imgCel.src = img;
        textCel.innerHTML = `<p>${texto}</p>`;
        imgCel.parentElement.href = link;
        imgCel.classList.replace("fade-out", "fade-in");
      }, 300);

      setTimeout(() => imgCel.classList.remove("fade-in"), 900);
    };

    const proximo = () => {
      indice = (indice + 1) % vitraisCelulares.length;
      atualizarVitral();
    };

    const anterior = () => {
      indice = (indice - 1 + vitraisCelulares.length) % vitraisCelulares.length;
      atualizarVitral();
    };

    btnDir.addEventListener("click", proximo);
    btnEsq.addEventListener("click", anterior);

    const iniciarLoop = () => intervalo = setInterval(proximo, 5000);
    const pararLoop = () => clearInterval(intervalo);

    // Interrompe o loop quando o usuário interage
    [btnDir, btnEsq].forEach(btn => {
      btn.addEventListener("click", () => {
        pararLoop();
        iniciarLoop();
      });
      btn.addEventListener("touchstart", () => {
        pararLoop();
        iniciarLoop();
      });
    });

    atualizarVitral();
    iniciarLoop();
  }

  // ---------------------------------------------------
  // CONTROLE DE EXIBIÇÃO DA TELA DE CARREGAMENTO
  // ---------------------------------------------------
  if (crg && imgcrg) {
    const ultimaVisita = localStorage.getItem("ultimaVisitaLuxFidei");
    const agora = Date.now();
    const umaHora = 60 * 10 * 1000; // 1 hora em milissegundos

    const podeMostrar = !ultimaVisita || agora - parseInt(ultimaVisita, 10) > umaHora;

    if (podeMostrar) {
      body.classList.add("noscroll");
      crg.style.display = "flex";

      imgcrg.addEventListener("click", () => {
        crg.classList.add("exit");
        localStorage.setItem("ultimaVisitaLuxFidei", agora.toString());

        setTimeout(() => {
          all.classList.add("vsl");
          body.classList.remove("noscroll");
          crg.style.display = "none";
        }, 1000);
      });
    } else {
      // pula o carregamento se foi visitado recentemente
      crg.style.display = "none";
      all.classList.add("vsl");
      body.classList.remove("noscroll");
    }
  }
});

  // ---------- Aparecer ao rolar (IntersectionObserver)
  const sections = document.querySelectorAll('.infos');

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('show');
        // se preferir que apareça só uma vez:
        // observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.2 });

  sections.forEach(sec => observer.observe(sec));