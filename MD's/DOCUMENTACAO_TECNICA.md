# 📚 Documentação Técnica - Lux Fidei

## Índice
1. [Visão Geral](#visão-geral)
2. [JavaScript](#javascript)
3. [CSS](#css)
4. [HTML](#html)
5. [Estrutura de Arquivos](#estrutura-de-arquivos)
6. [Comandos e Funcionalidades](#comandos-e-funcionalidades)
7. [Responsividade](#responsividade)
8. [Boas Práticas](#boas-práticas)

---

## Visão Geral

O **Lux Fidei** é um site educacional sobre os dogmas do Catolicismo, desenvolvido para a Paróquia São José de Ribeirão Pires. O site possui suporte bilíngue (Português e Inglês) e é totalmente responsivo.

### Características Principais:
- ✅ Design moderno com tema dourado/preto
- ✅ Animações suaves e transições
- ✅ Menu lateral responsivo
- ✅ Tela de carregamento interativa
- ✅ Carrossel de vitrais para mobile
- ✅ Sistema de scroll animado (Intersection Observer)
- ✅ Formulário integrado com Netlify
- ✅ Suporte a dois idiomas (PT/EN)

---

## JavaScript

### 📁 Arquivos JavaScript

#### `js/HomePage_pt.js` e `js/homepage_us.js`
**Função:** Controla a página inicial (homepage) em português e inglês

**Principais Funcionalidades:**

##### 1. **Tela de Carregamento**
```javascript
const imgcrg = document.getElementById("imgcrg");
const crg = document.getElementById("crg");
const all = document.querySelector(".all");
```

**Comportamento:**
- Bloqueia scroll enquanto carrega (`body.classList.add("noscroll")`)
- Ao clicar na imagem, remove a tela de carregamento com animação
- Usa `localStorage` para não mostrar a tela se visitado há menos de 1 hora (600.000ms)
- Adiciona classe `.vsl` ao container `.all` para mostrar conteúdo

**Comandos:**
- `body.classList.add("noscroll")` - Bloqueia scroll da página
- `crg.classList.add("exit")` - Adiciona animação de saída
- `all.classList.add("vsl")` - Mostra conteúdo principal
- `localStorage.getItem("ultimaVisitaLuxFidei")` - Verifica última visita
- `localStorage.setItem("ultimaVisitaLuxFidei", agora.toString())` - Salva timestamp
- `crg.style.display = "none"` - Esconde tela de carregamento

**Lógica de Exibição:**
```javascript
const ultimaVisita = localStorage.getItem("ultimaVisitaLuxFidei");
const agora = Date.now();
const umaHora = 60 * 10 * 1000; // 600.000ms = 10 minutos

const podeMostrar = !ultimaVisita || agora - parseInt(ultimaVisita, 10) > umaHora;
```

##### 2. **Menu Lateral (Mobile/Desktop)**
```javascript
const menuBtn = document.querySelector(".headerbtn button");
const nav = document.getElementById("sideNav");
const closeNav = document.getElementById("closeNav");
```

**Abrir Menu:**
- `nav.classList.add("active")` - Mostra o menu (muda `left: -700px` para `left: 0`)
- `body.classList.add("noscroll")` - Bloqueia scroll
- `e.stopPropagation()` - Impede propagação do evento

**Fechar Menu:**
- `nav.classList.remove("active")` - Esconde o menu
- `body.classList.remove("noscroll")` - Libera scroll
- Fecha automaticamente ao clicar fora do menu

**Event Listeners:**
- `menuBtn.addEventListener("click", ...)` - Abre menu
- `closeNav.addEventListener("click", ...)` - Fecha menu
- `window.addEventListener("click", ...)` - Fecha ao clicar fora
- `nav.addEventListener("click", e => e.stopPropagation())` - Impede fechamento ao clicar dentro

##### 3. **Dica nos Vitrais (Desktop)**
```javascript
const vitrais = document.querySelectorAll(".vitex");
const dica = document.getElementById("dica");
let dicaTimeout;
```

**Comportamento:** 
- Mostra dica após 2 segundos com mouse sobre o vitral
- Esconde ao remover o mouse

**Comandos:**
- `dica.classList.add("active")` - Mostra dica
- `dica.classList.remove("active")` - Esconde dica
- `setTimeout(() => dica.classList.add("active"), 2000)` - Delay de 2 segundos
- `clearTimeout(dicaTimeout)` - Cancela timeout ao sair

**Event Listeners:**
- `vitral.addEventListener("mouseenter", ...)` - Mouse entra
- `vitral.addEventListener("mouseleave", ...)` - Mouse sai

##### 4. **Botão "Voltar ao Topo"**
```javascript
const btntop = document.getElementById("btn");
const btndiv = document.getElementById("btndiv");
```

**Comportamento:** 
- Aparece quando scroll > 200px
- Faz scroll suave para o topo ao clicar

**Comandos:**
- `window.scrollY` - Posição do scroll vertical
- `btndiv.classList.toggle("active", window.scrollY > 200)` - Mostra/esconde botão
- `window.scrollTo({ top: 0, behavior: "smooth" })` - Scroll suave para o topo

**Event Listener:**
- `window.addEventListener("scroll", ...)` - Monitora scroll
- `btntop.addEventListener("click", ...)` - Ação ao clicar

##### 5. **Carrossel de Vitrais (Mobile)**
```javascript
const vitraisCelulares = [
  { img: "Imagens/Vitral_Jesus.png", texto: "Dogmas sobre Jesus", link: "dogmasJesus_pt.html" },
  { img: "Imagens/Vitral_Deus.png", texto: "Dogmas Centrais", link: "menuDsobreFe_pt.html" },
  { img: "Imagens/Vitral_mariano.png", texto: "Dogmas Marianos", link: "dogmasMarianos_pt.html" }
];
```

**Funcionalidades:**
- Troca automática a cada 5 segundos
- Navegação manual com botões anterior/próximo
- Efeito fade-out/fade-in nas transições
- Loop circular (volta ao início após o último)

**Comandos:**
- `indice = (indice + 1) % vitraisCelulares.length` - Próximo item (circular)
- `indice = (indice - 1 + vitraisCelulares.length) % vitraisCelulares.length` - Item anterior (circular)
- `setInterval(proximo, 5000)` - Loop automático a cada 5 segundos
- `clearInterval(intervalo)` - Para o loop
- `imgCel.classList.add("fade-out")` - Animação de saída
- `imgCel.classList.replace("fade-out", "fade-in")` - Animação de entrada
- `imgCel.src = img` - Troca imagem
- `textCel.innerHTML = '<p>${texto}</p>'` - Atualiza texto
- `imgCel.parentElement.href = link` - Atualiza link

**Controle de Loop:**
- Reinicia o intervalo após interação do usuário
- Suporta eventos `click` e `touchstart` para mobile

##### 6. **Intersection Observer (Animações ao Scroll)**
```javascript
const sections = document.querySelectorAll('.infos');
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('show');
    }
  });
}, { threshold: 0.2 });
sections.forEach(sec => observer.observe(sec));
```

**Função:** 
- Detecta quando elementos entram na viewport
- Adiciona classe `.show` para animação

**Comandos:**
- `new IntersectionObserver(callback, options)` - Cria observador
- `observer.observe(element)` - Observa um elemento
- `entry.isIntersecting` - Verifica se está visível
- `threshold: 0.2` - Dispara quando 20% do elemento está visível

**Elementos Observados:**
- `.infos` - Seções de informação na homepage

##### 7. **Limpeza ao Sair da Página**
```javascript
window.addEventListener("beforeunload", () => {
  body.classList.remove("noscroll");
  nav?.classList.remove("active");
});
```

**Função:** Remove estados ao navegar para outra página

---

#### `js/dogmas.js`
**Função:** Controla páginas de dogmas individuais

**Funcionalidades:**
- Menu lateral (mesma lógica do HomePage)
- Intersection Observer para animar seções de dogmas ao scroll
- Observa elementos com classe `.dogma-section`

**Estrutura:**
```javascript
const sections = document.querySelectorAll('.dogma-section');
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('show');
    }
  });
}, { threshold: 0.2 });
sections.forEach(sec => observer.observe(sec));
```

**Comandos:**
- `document.querySelectorAll('.dogma-section')` - Seleciona todas as seções de dogmas
- Mesmos comandos de menu lateral do HomePage

---

#### `js/menuDsobreFe.js`
**Função:** Controla a página de menu de dogmas sobre a fé

**Funcionalidades:**
- Menu lateral
- Intersection Observer para animar grupos de vitrais (`.vitrais3`)

**Estrutura:**
```javascript
const sections = document.querySelectorAll('.vitrais3');
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('show');
    }
  });
}, { threshold: 0.2 });
sections.forEach(sec => observer.observe(sec));
```

**Comandos:**
- `document.querySelectorAll('.vitrais3')` - Seleciona grupos de vitrais

---

#### `js/sobre.js`
**Função:** Controla a página "Sobre Nós"

**Funcionalidades:**
- Menu lateral
- Intersection Observer para animar seções (`.fd`)

**Estrutura:**
```javascript
const sections = document.querySelectorAll('.fd');
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('show');
    }
  });
}, { threshold: 0.2 });
sections.forEach(sec => observer.observe(sec));
```

**Comandos:**
- `document.querySelectorAll('.fd')` - Seleciona seções da página

**Nota:** A página "Sobre Nós" também usa a estrutura `.dogma-section` do `dogmas.css`, então as imagens são centralizadas verticalmente.

---

#### `js/trabalheConosco.js`
**Função:** Controla o formulário "Trabalhe Conosco"

**Funcionalidades:**
- Menu lateral
- Intersection Observer para animar formulário
- Integração com Netlify Forms (`data-netlify="true"`)

**Estrutura:**
```javascript
const form = document.querySelector(".forms");
const sections = document.querySelectorAll('.forms');
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('show');
    }
  });
}, { threshold: 0.2 });
sections.forEach(sec => observer.observe(sec));
```

**Comandos:**
- `document.querySelector(".forms")` - Seleciona formulário
- `data-netlify="true"` - Ativa processamento Netlify (no HTML)

**Nota:** O arquivo `maintenance.js` é referenciado no HTML mas não existe no projeto. Pode ser implementado no futuro para controle de modo de manutenção.

---

## CSS

### 📁 Arquivos CSS

#### Variáveis CSS (Todos os arquivos)
```css
:root {
    --bg1-color: #000;              /* Cor de fundo escura */
    --bg3-color: #ffffff;            /* Cor de fundo clara */
    --text-color: #000;              /* Cor do texto principal */
    --text1-color: #000;             /* Cor do texto secundário */
    --text2-color: rgba(0, 0, 0, 0.514); /* Cor do texto terciário */
    --accent-color: #d69302;         /* Cor de destaque (dourado) */
    --footer-color: rgb(77, 23, 2);  /* Cor do rodapé */
}
```
**Uso:** `color: var(--accent-color);`

**Vantagens:**
- Fácil manutenção de cores
- Consistência visual
- Mudanças globais em um só lugar

---

#### `css/HomePage.css`

##### 1. **Reset CSS**
```css
* {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
}
```
- Remove margens e paddings padrão
- `box-sizing: border-box` - Inclui padding e border no cálculo de largura

##### 2. **Animação Fade In**
```css
.fadein {
  opacity: 0;
  transform: translateY(20px);
  animation: aparecer 1s ease forwards;
}

@keyframes aparecer {
  to {
    opacity: 1;
    transform: translateY(0);
  }
}
```
- **Função:** Animação de entrada suave
- **Propriedades:**
  - `opacity: 0` → `1` - Fade in
  - `translateY(20px)` → `0` - Move de baixo para cima
  - `forwards` - Mantém estado final após animação

##### 3. **Scrollbar Customizada**
```css
::-webkit-scrollbar {
    width: 8px;
    background-color: var(--bg1-color);
}
::-webkit-scrollbar-thumb {
    background-color: var(--accent-color);
    border-radius: 15px;
}
```
- Personaliza aparência da barra de rolagem
- `::-webkit-scrollbar` - Barra completa
- `::-webkit-scrollbar-thumb` - Parte arrastável

##### 4. **Tela de Carregamento**
```css
.carreg {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: var(--bg1-color);
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 1000;
    transition: all 0.8s ease;
}
.carreg img {
    width: 15%;
    max-width: 80%;
    cursor: pointer;
    opacity: 0.65;
    transition: transform 0.8s ease, opacity 0.8s ease;
}
.carreg.exit img {
    transform: translateY(-100px) scale(1.5);
    opacity: 0;
}
```
- **Propriedades:**
  - `position: fixed` - Fixa na tela
  - `z-index: 1000` - Fica acima de tudo
  - `display: flex` - Centraliza conteúdo
  - `transition` - Animação suave
  - `.exit` - Classe para animação de saída

##### 5. **Bloqueio de Scroll**
```css
body.noscroll {
    overflow: hidden;
}
```
- Impede scroll quando menu está aberto ou tela de carregamento ativa

##### 6. **Conteúdo Principal**
```css
.all {
    opacity: 0;
    display: none;
    transition: opacity 1s ease;
}
.all.vsl {
    opacity: 1;
    display: block;
}
```
- **Estado inicial:** Invisível
- **Estado ativo (`.vsl`):** Visível com fade in
- Adicionado via JavaScript após carregamento

##### 7. **Header Fixo**
```css
header {
    position: fixed;
    width: 100vw;
    top: 0;
    left: 0;
    z-index: 999;
    background-color: var(--bg1-color);
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 10px 30px;
}
```
- Header sempre visível no topo
- `100vw` - Largura total da viewport
- `z-index: 999` - Abaixo do menu mas acima do conteúdo

**Elementos do Header:**
- `.logo img` - Logo (70px, hover scale 1.1)
- `.len img` - Bandeira de idioma (30px, hover scale 1.1)
- `.headerbtn button` - Botão menu (☰, hover scale 1.1)

##### 8. **Menu Lateral**
```css
nav {
    position: fixed;
    top: 0;
    left: -700px;  /* Escondido à esquerda */
    height: 100%;
    width: 700px;
    background-color: rgba(0, 0, 0, 0.95);
    backdrop-filter: blur(8px);
    transition: left 0.4s ease;
    z-index: 999;
}
nav.active {
    left: 0;  /* Visível */
}
```
- **Estado inicial:** `left: -700px` (fora da tela)
- **Estado ativo:** `left: 0` (visível)
- `backdrop-filter: blur(8px)` - Efeito de desfoque no fundo
- `box-shadow: 4px 0 20px rgba(0, 0, 0, 0.6)` - Sombra lateral
- `border-right: 2px solid var(--accent-color)` - Borda dourada

**Links do Menu:**
- Fonte: "Jim Nightshade", cursive
- Tamanho: 2vw (responsivo)
- Hover: cor muda para branco, scale 1.05

##### 9. **Botão Voltar ao Topo**
```css
.voltar {
    position: fixed;
    right: -200px;
    bottom: 10px;
    transition: right 0.4s ease;
    z-index: 998;
}
.voltar.active {
    right: 10px;
}
.btn1 {
    color: var(--accent-color);
    background: rgb(255, 255, 255);
    border: 1px solid var(--accent-color);
    border-radius: 10px;
    padding: 5px 15px;
    font-family: "Jim Nightshade", cursive;
    font-size: 2vw;
    cursor: pointer;
    transition: transform 0.3s ease, box-shadow 0.3s ease;
    backdrop-filter: blur(8px);
    filter: drop-shadow(0 0 10px rgba(255, 215, 0, 0.5));
}
.btn1:hover {
    transform: scale(1.1);
    box-shadow: 0 0 20px rgba(255, 215, 0, 0.7);
}
```
- Aparece apenas quando necessário (scroll > 200px)
- Animação suave de entrada/saída
- Efeito de brilho dourado no hover

##### 10. **Vitrais (Desktop)**
```css
.vitrais {
    display: flex;
    flex-direction: row;
    width: 100%;
    justify-content: space-around;
}
.vitex {
    text-align: center;
    margin: 15px;
}
.vitral img {
    width: 210px;
}
.vitral {
    transition: ease 0.4s;
    filter: drop-shadow(0 0 5px rgba(255, 255, 255, 0.13));
}
.vitral:hover {
    filter: drop-shadow(0 0 10px rgba(255, 255, 255, 0.13));
}
.vitral img:hover {
    transform: scale(1.05);
}
```
- Layout flexbox para vitrais lado a lado
- Efeito de brilho ao passar mouse
- Scale 1.05 no hover da imagem

**Nota:** Os vitrais NÃO são centralizados verticalmente conforme solicitado pelo usuário.

##### 11. **Dica nos Vitrais**
```css
.dica {
    position: fixed;
    bottom: -40px;
    left: 50%;
    transform: translateX(-50%);
    background-color: var(--bg3-color);
    color: var(--text-color);
    border: 1px solid var(--text-color);
    border-radius: 50px;
    padding: 6px 15px;
    font-size: 1.25vw;
    transition: bottom 0.8s ease;
    z-index: 998;
}
.dica.active {
    bottom: 10px;
}
```
- Aparece com animação ao passar mouse (após 2s)
- Posicionada no centro inferior da tela

##### 12. **Carrossel Mobile**
```css
.vitralcel-container {
    display: none; /* Desktop */
}
@media screen and (max-width: 1000px) {
    .vitralcel-container {
        display: flex;
        flex-direction: row;
        align-items: center;
        justify-content: center;
        gap: 20px;
        width: 100%;
        margin-top: 25px;
    }
    .vitralcel img {
        width: 200px;
        height: 400px;
        border-radius: 18px;
        filter: drop-shadow(0 0 10px rgba(255, 255, 255, 0.13));
        transition: opacity 0.6s ease-in-out, transform 0.6s ease-in-out;
        object-fit: contain;
    }
    .vitralcel img.fade-out {
        opacity: 0;
        transform: scale(0.98);
    }
    .vitralcel img.fade-in {
        opacity: 1;
        transform: scale(1);
    }
}
```
- Transições suaves entre imagens
- Efeito fade-out/fade-in
- Botões de navegação (◀ ▶)

##### 13. **Seções de Informação**
```css
.infos {
    display: flex;
    flex-direction: row;
    align-items: center;  /* ✅ Centralizado verticalmente */
    margin-bottom: 60px;
    padding: 30px;
    background-color: var(--bg3-color);
    border-left: 4px solid var(--accent-color);
    border-radius: 10px;
    box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
    opacity: 0;
    transform: translateY(50px);
    transition: opacity 2s ease, transform 2s ease;
}
.infos.show {
    opacity: 1;
    transform: translateY(0);
}
.infos:nth-child(even) {
    flex-direction: row-reverse;
}
```
- **Atualização:** Imagens agora são centralizadas verticalmente (`align-items: center`)
- Alterna direção (esquerda/direita) para seções pares
- Animação ao entrar na viewport

---

#### `css/dogmas.css`

##### 1. **Seção de Dogma**
```css
.dogma-section {
    display: flex;
    flex-direction: row;
    align-items: center;  /* ✅ Centralizado verticalmente */
    margin-bottom: 60px;
    padding: 30px;
    background-color: var(--bg3-color);
    border-left: 4px solid var(--accent-color);
    border-radius: 10px;
    box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
    opacity: 0;
    transform: translateY(50px);
    transition: opacity 2s ease, transform 2s ease;
}
.dogma-section.show {
    opacity: 1;
    transform: translateY(0);
}
.dogma-section:nth-child(even) {
    flex-direction: row-reverse;
}
```
- **Atualização:** Imagens agora são centralizadas verticalmente (`align-items: center`)
- Animação ao entrar na viewport (Intersection Observer)
- Alterna direção para seções pares

##### 2. **Imagem do Dogma**
```css
.dogma-image {
    flex: 0 0 200px;
    margin: 0 30px;
}
.dogma-image img {
    width: 100%;
    max-width: 200px;
    height: auto;
    border-radius: 10px;
    box-shadow: 0 4px 15px rgba(0, 0, 0, 0.2);
    transition: transform 0.3s ease;
}
.dogma-image img:hover {
    transform: scale(1.05);
}
```
- Largura fixa de 200px
- `flex: 0 0 200px` - Não cresce, não encolhe, largura 200px
- Hover com scale 1.05

##### 3. **Conteúdo do Dogma**
```css
.dogma-content {
    flex: 1;
}
```
- Ocupa espaço restante

##### 4. **Título do Dogma**
```css
.dogma-title {
    font-family: "Jim Nightshade", cursive;
    font-size: 2.5vw;
    color: var(--accent-color);
    margin-bottom: 15px;
    font-weight: bold;
    display: block;
}
```
- Fonte decorativa
- `2.5vw` - Tamanho responsivo (2.5% da largura da viewport)
- Cor dourada

##### 5. **Categoria**
```css
.dogma-category {
    color: var(--accent-color);
    font-family: 'SUSE Mono', 'Times New Roman', Times;
    font-size: clamp(0.85rem, 1.2vw, 1.1rem);
    font-weight: bold;
    text-transform: uppercase;
    letter-spacing: 0.1rem;
    margin-bottom: 8px;
}
```
- Texto em maiúsculas
- `letter-spacing` - Espaçamento entre letras em qualquer viewport
- `clamp()` mantém legibilidade no mobile sem exagerar no desktop

##### 6. **Descrição**
```css
.dogma-description {
    color: var(--text-color);
    font-family: 'SUSE Mono', 'Times New Roman', Times;
    font-size: 1.2vw;
    line-height: 1.8;
    margin-bottom: 20px;
    text-align: justify;
}
```
- `line-height: 1.8` - Espaçamento entre linhas
- Texto justificado

##### 7. **Informações do Dogma**
```css
.dogma-info {
    background-color: rgba(214, 147, 2, 0.1);
    padding: 20px;
    border-radius: 8px;
    margin-top: 15px;
}
```
- Fundo semi-transparente
- `rgba(214, 147, 2, 0.1)` - Dourado com 10% de opacidade

##### 8. **Citação**
```css
.dogma-quote {
    font-style: italic;
    color: var(--text-color);
    border-left: 3px solid var(--accent-color);
    padding-left: 15px;
    margin: 15px 0;
}
```
- Estilo de citação com borda lateral dourada

##### 9. **Aplicação Espiritual**
```css
.dogma-spiritual {
    background-color: rgba(214, 147, 2, 0.05);
    padding: 12px;
    border-radius: 5px;
    margin-top: 10px;
    border-left: 3px solid var(--accent-color);
}
```
- Destaque visual para aplicação espiritual
- Fundo mais claro que `.dogma-info`

---

#### `css/menuDsobreFe.css`
**Estrutura similar ao HomePage.css com:**
- Grid de vitrais (`.vitrais3`, `.vitra`)
- Animações de entrada
- Layout responsivo
- Vitrais com efeito de brilho

**Classes Principais:**
- `.vitrais` - Container principal
- `.vitrais3` - Grupo de vitrais (observado pelo Intersection Observer)
- `.vitra` - Vitral individual
- `.textvi` - Texto do vitral

---

#### `css/sobre.css`
- Define overrides específicos para páginas `sobre_pt.html` e `sobre_us.html` usando a classe `body.page-sobre`
- Centraliza o conteúdo com largura máxima (`main` limitado a 1100px) e espaçamento vertical controlado por `clamp()`
- Integra layout responsivo com `clamp()` em fontes e espaçamentos, garantindo leitura confortável em mobile
- Implementa `.dogma-gallery` para lidar com múltiplas imagens lado a lado ou empilhadas
- Cartões de referência usam `.notice-card`, `.reference-entry`, `.reference-meta`, `.update-note` para semântica e estilo
- `.dogma-info` e `.accent-link` recebem `overflow-wrap: anywhere` para quebrar URLs longas sem extrapolar a tela
- Breakpoints:
  - `@media (max-width: 1000px)`: empilha colunas e ajusta alinhamento para leitura em tablet
  - `@media (max-width: 800px)`: reduz padding e tamanho de imagens para telas pequenas
- Rodapé ganhou `.footer-subtext` para mensagens complementares

**Resultado:** Página “Sobre” (PT/EN) livre de estilos inline, com responsividade refinada e conteúdo atualizado.

#### `css/maintenance.css`
- Novo arquivo compartilhado por `maintenance.html` e `manutencao.html`
- Remove `<style>` inline das páginas e centraliza as regras de manutenção
- Define container `.maintenance-container` com limites de largura, bordas e sombra
- Ícone com animação pulsante controlada pela keyframe `pulse`
- `.maintenance-signature` padroniza o texto de assinatura (“Lux Fidei”)
- Media query `@media (max-width: 600px)` diminui padding, fontes e tamanho do ícone para melhor uso em mobile
- Garante contraste adequado entre fundo escuro e textos claros

---

#### `css/trabaleConosco.css`
**Formulário com:**
- Campos de entrada estilizados
- Botões customizados
- Validação visual
- Layout centralizado

**Classes Principais:**
- `.forms` - Container do formulário (observado pelo Intersection Observer)
- `.GF1`, `.GF2` - Grupos de campos
- `.GF2LB` - Layout de botões
- `.GFC` - Container de botão de envio

---

## HTML

### Estrutura Geral

#### 1. **Documento Base**
```html
<!DOCTYPE html>
<html lang="pt-br">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Lux Fidei</title>
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=SUSE+Mono:ital,wght@0,100..800;1,100..800&family=Italiana&family=Jim+Nightshade&display=swap" rel="stylesheet">
    <link rel="stylesheet" href="css/[arquivo].css">
    <script src="js/maintenance.js"></script>
</head>
```

**Elementos:**
- `<!DOCTYPE html>` - Declaração de tipo de documento
- `lang="pt-br"` - Idioma da página (ou `lang="en"` para inglês)
- `charset="UTF-8"` - Codificação de caracteres
- `viewport` - Configuração responsiva
- **Fontes Google:** SUSE Mono, Italiana, Jim Nightshade

#### 2. **Header**
```html
<header>
    <div class="headerbtn">
        <button>☰</button>
    </div>
    <div class="logo">
        <a href="index.html">
            <img src="Imagens/file_00000000933861f789939c2c3f29ab35.png" alt="Logo">
        </a>
    </div>
    <div class="len">
        <a href="index_us.html">
            <img src="Imagens/eua.jpg" alt="English">
        </a>
    </div>
</header>
```
- Botão de menu (☰)
- Logo clicável
- Seletor de idioma

#### 3. **Menu Lateral**
```html
<nav id="sideNav" aria-label="Menu lateral">
    <button class="closeNav" id="closeNav" aria-label="Fechar menu">×</button>
    <a href="dogmasDeus_pt.html">Dogmas sobre Deus</a>
    <a href="dogmasJesus_pt.html">Dogmas sobre Jesus Cristo</a>
    <!-- ... mais links ... -->
</nav>
```
- `aria-label` - Acessibilidade
- Links de navegação
- Botão de fechar (×)

#### 4. **Tela de Carregamento**
```html
<div class="carreg" id="crg">
    <img src="Imagens/Cruz_de_Vidro_e_Luz_Radiante.png" alt="Clique para entrar" id="imgcrg">
</div>
```
- Tela inicial antes do conteúdo
- Clique na imagem para entrar

#### 5. **Conteúdo Principal**
```html
<div class="all">
    <main>
        <!-- Conteúdo da página -->
    </main>
</div>
```
- Container principal com classe `.all`
- Classe `.vsl` adicionada via JavaScript para mostrar

#### 6. **Seção de Dogma**
```html
<div class="dogma-section">
    <div class="dogma-image">
        <img src="Imagens/Vitral_Deus.png" alt="Representação">
    </div>
    <div class="dogma-content">
        <p class="dogma-category">Dogmas sobre Deus</p>
        <p class="dogma-title">1. A Existência de Deus</p>
        <p class="dogma-description">
            <strong>Explicação:</strong> Texto...
        </p>
        <div class="dogma-info">
            <p><strong>Quando foi proclamado:</strong> ...</p>
            <p><strong>Desenvolvido por:</strong> ...</p>
            <p><strong>Contexto histórico:</strong> ...</p>
            <p class="dogma-quote"><strong>Citação:</strong> ...</p>
            <p class="dogma-spiritual"><strong>Aplicação espiritual:</strong> ...</p>
        </div>
    </div>
</div>
```

**Estrutura:**
- `.dogma-section` - Container principal (flex, align-items: center)
- `.dogma-image` - Imagem do dogma (200px fixo)
- `.dogma-content` - Conteúdo textual (flex: 1)
- `.dogma-category` - Categoria/tópico
- `.dogma-title` - Título do dogma
- `.dogma-description` - Explicação
- `.dogma-info` - Informações adicionais
- `.dogma-quote` - Citação bíblica/oficial
- `.dogma-spiritual` - Aplicação espiritual

#### 7. **Formulário**
```html
<form class="forms" name="trabaleConosco" method="POST" data-netlify="true">
    <div class="GF1">
        <label for="nome"><b>Nome completo:</b></label>
        <input type="text" class="nome" name="nome" required>
    </div>
    <!-- ... mais campos ... -->
    <button type="submit" class="btn">Enviar</button>
</form>
```
- `data-netlify="true"` - Integração com Netlify Forms
- `required` - Campo obrigatório
- `method="POST"` - Método de envio

#### 8. **Footer**
```html
<footer>
    <div class="navplus">
        <div class="plus">
            <a href="trabalheConosco_pt.html">Trabalhe Conosco</a>
        </div>
        <div class="plus">
            <a href="sobre_pt.html">Sobre nós</a>
        </div>
        <div class="plus">
            <a href="manutencao.html">Manutenção</a>
        </div>
    </div>
    <div>
        <p>© 2025 Lux Fidei — Todos os direitos reservados</p>
    </div>
</footer>
```

---

## Estrutura de Arquivos

```
/
├── index.html                    # Página inicial (PT)
├── index_us.html                 # Página inicial (EN)
├── manutencao.html               # Página de manutenção (PT)
├── maintenance.html              # Página de manutenção (EN)
│
├── dogmasDeus_pt.html            # Dogmas sobre Deus (PT)
├── dogmasGod_us.html             # Dogmas sobre Deus (EN)
├── dogmasJesus_pt.html           # Dogmas sobre Jesus (PT)
├── dogmasJesus_us.html           # Dogmas sobre Jesus (EN)
├── dogmasCriacao_pt.html         # Dogmas sobre Criação (PT)
├── dogmasCreation_us.html        # Dogmas sobre Criação (EN)
├── dogmasSerHumano_pt.html       # Dogmas sobre Ser Humano (PT)
├── dogmasHumanBeing_us.html      # Dogmas sobre Ser Humano (EN)
├── dogmasMarianos_pt.html       # Dogmas Marianos (PT)
├── dogmasMarian_us.html          # Dogmas Marianos (EN)
├── dogmasPapaIgreja_pt.html      # Dogmas sobre Papa e Igreja (PT)
├── dogmasPopeChurch_us.html      # Dogmas sobre Papa e Igreja (EN)
├── dogmasSacramentos_pt.html     # Dogmas sobre Sacramentos (PT)
├── dogmasSacraments_us.html      # Dogmas sobre Sacramentos (EN)
├── dogmasUltimasCoisas_pt.html   # Dogmas sobre Últimas Coisas (PT)
├── dogmasLastThings_us.html      # Dogmas sobre Últimas Coisas (EN)
│
├── menuDsobreFe_pt.html          # Menu de dogmas (PT)
├── menuDsobreFe_us.html          # Menu de dogmas (EN)
├── sobre_pt.html                 # Sobre nós (PT)
├── sobre_us.html                 # Sobre nós (EN)
├── trabalheConosco_pt.html       # Trabalhe conosco (PT)
├── trabalheConosco_us.html       # Trabalhe conosco (EN)
│
├── css/
│   ├── HomePage.css              # Estilos da homepage
│   ├── dogmas.css                # Estilos das páginas de dogmas
│   ├── menuDsobreFe.css          # Estilos do menu de dogmas
│   ├── sobre.css                 # Estilos da página sobre
│   ├── trabaleConosco.css        # Estilos do formulário
│   └── maintenance.css           # Estilos das páginas de manutenção
│
├── js/
│   ├── HomePage_pt.js            # Script da homepage (PT)
│   ├── homepage_us.js            # Script da homepage (EN)
│   ├── dogmas.js                 # Script das páginas de dogmas
│   ├── menuDsobreFe.js           # Script do menu de dogmas
│   ├── sobre.js                  # Script da página sobre
│   └── trabalheConosco.js        # Script do formulário
│
└── Imagens/
    ├── file_00000000933861f789939c2c3f29ab35.png  # Logo
    ├── Vitral_Deus.png            # Vitral de Deus
    ├── Vitral_Jesus.png           # Vitral de Jesus
    ├── Vitral_mariano.png         # Vitral Mariano
    ├── Cruz_de_Vidro_e_Luz_Radiante.png  # Cruz de carregamento
    ├── eua.jpg                    # Bandeira EUA
    ├── br.png                     # Bandeira Brasil
    ├── IMG-20250921-WA0011.jpg    # Foto de João/Padre
    ├── images.jpg                 # Foto da paróquia
    ├── paroquia-sao-jose-ribpires.webp  # Foto da paróquia
    └── gettyimages-538125162-612x612.jpg  # Imagem adicional
```

---

## Comandos e Funcionalidades

### Seletores JavaScript
- `document.getElementById("id")` - Seleciona por ID
- `document.querySelector(".classe")` - Seleciona primeiro elemento com classe
- `document.querySelectorAll(".classe")` - Seleciona todos os elementos com classe

### Manipulação de Classes
- `element.classList.add("classe")` - Adiciona classe
- `element.classList.remove("classe")` - Remove classe
- `element.classList.toggle("classe", condição)` - Adiciona/remove baseado em condição
- `element.classList.replace("old", "new")` - Substitui classe
- `element.classList.contains("classe")` - Verifica se tem classe

### Manipulação de Estilo
- `element.style.display = "none"` - Esconde elemento
- `element.style.display = "flex"` - Mostra como flex
- `element.style.opacity = "0"` - Torna transparente
- `element.style.transform = "translateY(20px)"` - Move elemento

### Manipulação de Conteúdo
- `element.innerHTML = "<p>Texto</p>"` - Substitui HTML interno
- `element.textContent = "Texto"` - Substitui texto (seguro)
- `element.src = "caminho"` - Muda src de imagem
- `element.href = "url"` - Muda href de link

### Eventos
- `element.addEventListener("click", função)` - Adiciona listener de clique
- `element.addEventListener("mouseenter", função)` - Mouse entra
- `element.addEventListener("mouseleave", função)` - Mouse sai
- `element.addEventListener("scroll", função)` - Scroll
- `window.addEventListener("load", função)` - Página carregada
- `window.addEventListener("DOMContentLoaded", função)` - DOM pronto
- `window.addEventListener("beforeunload", função)` - Antes de sair
- `e.stopPropagation()` - Impede propagação do evento
- `e.preventDefault()` - Previne comportamento padrão

### Scroll
- `window.scrollY` - Posição vertical do scroll
- `window.scrollTo({ top: 0, behavior: "smooth" })` - Scroll suave para o topo
- `element.scrollIntoView({ behavior: "smooth" })` - Scroll até elemento

### LocalStorage
- `localStorage.setItem("chave", "valor")` - Salva valor
- `localStorage.getItem("chave")` - Recupera valor
- `localStorage.removeItem("chave")` - Remove valor
- `localStorage.clear()` - Limpa tudo

### Timers
- `setTimeout(função, tempo)` - Executa após tempo (ms)
- `setInterval(função, tempo)` - Executa repetidamente
- `clearTimeout(id)` - Cancela timeout
- `clearInterval(id)` - Cancela interval

### Intersection Observer
- `new IntersectionObserver(callback, options)` - Cria observador
- `observer.observe(element)` - Observa elemento
- `observer.unobserve(element)` - Para de observar
- `entry.isIntersecting` - Verifica se está visível
- `threshold: 0.2` - Dispara quando 20% visível

### Date/Time
- `Date.now()` - Timestamp atual (milissegundos)
- `new Date()` - Objeto de data
- `parseInt(valor, 10)` - Converte string para número

### Arrays
- `array.length` - Tamanho do array
- `(indice + 1) % array.length` - Próximo item (circular)
- `(indice - 1 + array.length) % array.length` - Item anterior (circular)
- `array.forEach(item => ...)` - Itera sobre array

---

## Responsividade

### Breakpoints
- **Desktop:** `> 1000px`
- **Tablet:** `≤ 1000px`
- **Mobile:** `≤ 800px`

### Estratégias Responsivas

#### 1. **Unidades Responsivas**
- `vw` - Viewport width (1vw = 1% da largura)
- `vh` - Viewport height (1vh = 1% da altura)
- `%` - Porcentagem do elemento pai
- `rem` - Relativo ao root font-size

#### 2. **Media Queries**
```css
@media screen and (max-width: 1000px) {
    /* Estilos para tablet */
}

@media screen and (max-width: 800px) {
    /* Estilos para mobile */
}
```

#### 3. **Flexbox Responsivo**
- `flex-direction: column` - Empilha elementos em mobile
- `align-items: center` - Centraliza em mobile
- `justify-content: center` - Centraliza horizontalmente

#### 4. **Elementos Específicos por Dispositivo**
- **Desktop:** `.vitrais` (3 vitrais lado a lado)
- **Mobile:** `.vitralcel-container` (carrossel único)
- `.vitrais { display: none; }` - Esconde em mobile
- `.vitralcel-container { display: flex; }` - Mostra em mobile

#### 5. **Tamanhos de Fonte Responsivos**
- Desktop: `2.5vw`, `1.4vw`, etc.
- Tablet: `3rem`, `2rem`, etc.
- Mobile: `1.5rem`, `1rem`, etc.

---

## Boas Práticas Implementadas

### 1. **Responsividade**
- ✅ Uso de unidades `vw`, `vh`, `%`, `rem`
- ✅ Media queries para diferentes dispositivos
- ✅ Layout flexível com Flexbox
- ✅ Imagens responsivas

### 2. **Acessibilidade**
- ✅ `aria-label` em elementos interativos
- ✅ `alt` em todas as imagens
- ✅ Estrutura semântica HTML5
- ✅ Navegação por teclado

### 3. **Performance**
- ✅ Lazy loading com Intersection Observer
- ✅ Animações otimizadas com CSS
- ✅ LocalStorage para cache de estado
- ✅ Transições suaves

### 4. **Manutenibilidade**
- ✅ Variáveis CSS para cores
- ✅ Código comentado
- ✅ Estrutura organizada
- ✅ Nomenclatura consistente

### 5. **UX (Experiência do Usuário)**
- ✅ Animações suaves
- ✅ Feedback visual (hover, active)
- ✅ Tela de carregamento interativa
- ✅ Menu lateral intuitivo
- ✅ Botão voltar ao topo
- ✅ Carrossel automático em mobile

### 6. **SEO**
- ✅ Estrutura semântica HTML5
- ✅ Títulos descritivos
- ✅ Meta tags apropriadas
- ✅ URLs amigáveis

### 7. **Segurança**
- ✅ Validação de formulários
- ✅ Sanitização de inputs
- ✅ HTTPS (quando em produção)

---

## Notas Finais

### Características Técnicas
- Todos os scripts usam `DOMContentLoaded` para garantir que o DOM está pronto
- Animações são suaves e não bloqueiam a UI
- O site suporta dois idiomas: Português (PT) e Inglês (EN)
- Formulários são processados via Netlify Forms
- Modo de manutenção pode ser implementado no futuro

### Atualizações Recentes
- ✅ **Nov/2025:** Página "Sobre" (PT/EN) revisada com layout responsivo dedicado
  - CSS migrado para `css/sobre.css` usando `body.page-sobre`
  - Remoção integral de estilos inline e conteúdo traduzido para o inglês
- ✅ **Nov/2025:** Criação de `css/maintenance.css` para telas de manutenção em PT/EN
  - Animação `pulse`, centralização de layout e assinatura padronizada
- ✅ **Nov/2025:** Legibilidade aprimorada em seções de dogmas
  - `.dogma-category` agora usa `clamp()` e espaçamento maior
  - `.dogma-info` e `.accent-link` quebram URLs extensas automaticamente

### Dependências Externas
- **Google Fonts:** SUSE Mono, Italiana, Jim Nightshade
- **Netlify:** Processamento de formulários

### Compatibilidade
- Navegadores modernos (Chrome, Firefox, Safari, Edge)
- Suporte a dispositivos móveis (iOS, Android)
- Tablets e desktops

---

**Última atualização:** Novembro 2025
**Versão:** 2.0 TCM
**Desenvolvedor:** João (ETEC ETESP - 2025)
