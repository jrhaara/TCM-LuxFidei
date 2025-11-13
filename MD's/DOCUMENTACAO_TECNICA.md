# 📚 Documentação Técnica - Lux Fidei

## Índice
1. [JavaScript](#javascript)
2. [CSS](#css)
3. [HTML](#html)
4. [Estrutura de Arquivos](#estrutura-de-arquivos)

---

## JavaScript

### 📁 Arquivos JavaScript

#### `js/HomePage_pt.js` e `js/homepage_us.js`
**Função:** Controla a página inicial (homepage)

**Principais Funcionalidades:**

##### 1. **Tela de Carregamento**
```javascript
const imgcrg = document.getElementById("imgcrg");
const crg = document.getElementById("crg");
```
- **Elementos:** Imagem e container da tela de carregamento
- **Comportamento:** 
  - Bloqueia scroll enquanto carrega (`body.classList.add("noscroll")`)
  - Ao clicar na imagem, remove a tela de carregamento
  - Usa `localStorage` para não mostrar a tela se visitado há menos de 1 hora

**Comandos:**
- `body.classList.add("noscroll")` - Bloqueia scroll da página
- `crg.classList.add("exit")` - Adiciona animação de saída
- `localStorage.getItem("ultimaVisitaLuxFidei")` - Verifica última visita
- `localStorage.setItem("ultimaVisitaLuxFidei", agora.toString())` - Salva timestamp

##### 2. **Menu Lateral (Mobile)**
```javascript
const menuBtn = document.querySelector(".headerbtn button");
const nav = document.getElementById("sideNav");
const closeNav = document.getElementById("closeNav");
```
- **Abrir Menu:**
  - `nav.classList.add("active")` - Mostra o menu
  - `body.classList.add("noscroll")` - Bloqueia scroll
  - `e.stopPropagation()` - Impede propagação do evento

- **Fechar Menu:**
  - `nav.classList.remove("active")` - Esconde o menu
  - `body.classList.remove("noscroll")` - Libera scroll
  - Fecha automaticamente ao clicar fora do menu

**Event Listeners:**
- `menuBtn.addEventListener("click", ...)` - Abre menu
- `closeNav.addEventListener("click", ...)` - Fecha menu
- `window.addEventListener("click", ...)` - Fecha ao clicar fora

##### 3. **Dica nos Vitrais (Desktop)**
```javascript
const vitrais = document.querySelectorAll(".vitex");
const dica = document.getElementById("dica");
```
- **Comportamento:** Mostra dica após 2 segundos com mouse sobre o vitral
- **Comandos:**
  - `dica.classList.add("active")` - Mostra dica
  - `dica.classList.remove("active")` - Esconde dica
  - `setTimeout(() => ..., 2000)` - Delay de 2 segundos
  - `clearTimeout(dicaTimeout)` - Cancela timeout

##### 4. **Botão "Voltar ao Topo"**
```javascript
const btntop = document.getElementById("btn");
const btndiv = document.getElementById("btndiv");
```
- **Comportamento:** Aparece quando scroll > 200px
- **Comandos:**
  - `window.scrollY` - Posição do scroll vertical
  - `btndiv.classList.toggle("active", window.scrollY > 200)` - Mostra/esconde botão
  - `window.scrollTo({ top: 0, behavior: "smooth" })` - Scroll suave para o topo

##### 5. **Carrossel de Vitrais (Mobile)**
```javascript
const vitraisCelulares = [
  { img: "Imagens/Vitral_Jesus.png", texto: "Dogmas sobre Jesus", link: "dogmasJesus_pt.html" },
  { img: "Imagens/Vitral_Deus.png", texto: "Dogmas Centrais", link: "menuDsobreFe_pt.html" },
  { img: "Imagens/Vitral_mariano.png", texto: "Dogmas Marianos", link: "dogmasMarianos_pt.html" }
];
```
- **Funcionalidades:**
  - Troca automática a cada 5 segundos
  - Navegação manual com botões anterior/próximo
  - Efeito fade-out/fade-in nas transições

**Comandos:**
- `indice = (indice + 1) % vitraisCelulares.length` - Próximo item (circular)
- `indice = (indice - 1 + vitraisCelulares.length) % vitraisCelulares.length` - Item anterior (circular)
- `setInterval(proximo, 5000)` - Loop automático a cada 5 segundos
- `clearInterval(intervalo)` - Para o loop
- `imgCel.classList.add("fade-out")` - Animação de saída
- `imgCel.classList.replace("fade-out", "fade-in")` - Animação de entrada

##### 6. **Intersection Observer (Animações ao Scroll)**
```javascript
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('show');
    }
  });
}, { threshold: 0.2 });
```
- **Função:** Detecta quando elementos entram na viewport
- **Comandos:**
  - `new IntersectionObserver(callback, options)` - Cria observador
  - `observer.observe(element)` - Observa um elemento
  - `entry.isIntersecting` - Verifica se está visível
  - `threshold: 0.2` - Dispara quando 20% do elemento está visível

---

#### `js/dogmas.js`
**Função:** Controla páginas de dogmas individuais

**Funcionalidades:**
- Menu lateral (mesma lógica do HomePage)
- Intersection Observer para animar seções de dogmas ao scroll
- Observa elementos com classe `.dogma-section`

**Comandos:**
- `document.querySelectorAll('.dogma-section')` - Seleciona todas as seções de dogmas
- Mesmos comandos de menu lateral do HomePage

---

#### `js/menuDsobreFe.js`
**Função:** Controla a página de menu de dogmas sobre a fé

**Funcionalidades:**
- Menu lateral
- Intersection Observer para animar grupos de vitrais (`.vitrais3`)

**Comandos:**
- `document.querySelectorAll('.vitrais3')` - Seleciona grupos de vitrais

---

#### `js/sobre.js`
**Função:** Controla a página "Sobre Nós"

**Funcionalidades:**
- Menu lateral
- Intersection Observer para animar seções (`.fd`)

**Comandos:**
- `document.querySelectorAll('.fd')` - Seleciona seções da página

---

#### `js/trabalheConosco.js`
**Função:** Controla o formulário "Trabalhe Conosco"

**Funcionalidades:**
- Menu lateral
- Intersection Observer para animar formulário
- Integração com Netlify Forms (`data-netlify="true"`)

**Comandos:**
- `document.querySelector(".forms")` - Seleciona formulário
- `data-netlify="true"` - Ativa processamento Netlify

---

#### `js/maintenance.js`
**Função:** Controla modo de manutenção do site

**Funcionalidades:**
- Verifica se modo de manutenção está ativo
- Redireciona para página de manutenção se necessário
- Função global `toggleMaintenance()` para ativar/desativar

**Comandos:**
- `localStorage.getItem('maintenance_mode')` - Verifica se manutenção está ativa
- `localStorage.setItem('maintenance_mode', 'true')` - Ativa manutenção
- `localStorage.removeItem('maintenance_mode')` - Desativa manutenção
- `window.location.href = maintenancePage` - Redireciona para página de manutenção
- `document.documentElement.lang` - Detecta idioma da página

**Uso:**
```javascript
// No console do navegador:
toggleMaintenance(true);  // Ativa
toggleMaintenance(false); // Desativa
```

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
```
- **Propriedades:**
  - `position: fixed` - Fixa na tela
  - `z-index: 1000` - Fica acima de tudo
  - `display: flex` - Centraliza conteúdo
  - `transition` - Animação suave

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

##### 7. **Header Fixo**
```css
header {
    position: fixed;
    width: 100vw;
    top: 0;
    left: 0;
    z-index: 999;
}
```
- Header sempre visível no topo
- `100vw` - Largura total da viewport

##### 8. **Menu Lateral**
```css
nav {
    position: fixed;
    top: 0;
    left: -700px;  /* Escondido à esquerda */
    height: 100%;
    background-color: rgba(0, 0, 0, 0.95);
    backdrop-filter: blur(8px);
    transition: left 0.3s ease;
}
nav.active {
    left: 0;  /* Visível */
}
```
- **Estado inicial:** `left: -700px` (fora da tela)
- **Estado ativo:** `left: 0` (visível)
- `backdrop-filter: blur(8px)` - Efeito de desfoque no fundo

##### 9. **Botão Voltar ao Topo**
```css
.voltar {
    position: fixed;
    bottom: 30px;
    right: 30px;
    opacity: 0;
    visibility: hidden;
    transition: all 0.3s ease;
}
.voltar.active {
    opacity: 1;
    visibility: visible;
}
```
- Aparece apenas quando necessário (scroll > 200px)

##### 10. **Vitrais (Desktop)**
```css
.vitrais {
    display: flex;
    justify-content: space-around;
    align-items: center;
    gap: 40px;
}
```
- Layout flexbox para vitrais lado a lado

##### 11. **Dica nos Vitrais**
```css
.dica {
    opacity: 0;
    transform: translateY(10px);
    transition: all 0.3s ease;
}
.dica.active {
    opacity: 1;
    transform: translateY(0);
}
```
- Aparece com animação ao passar mouse

##### 12. **Carrossel Mobile**
```css
.vitralcel-container {
    display: flex;
    align-items: center;
    gap: 20px;
}
.fade-out {
    opacity: 0;
    transform: scale(0.95);
    transition: all 0.3s ease;
}
.fade-in {
    opacity: 1;
    transform: scale(1);
    transition: all 0.3s ease;
}
```
- Transições suaves entre imagens

---

#### `css/dogmas.css`

##### 1. **Seção de Dogma**
```css
.dogma-section {
    display: flex;
    gap: 30px;
    margin-bottom: 50px;
    opacity: 0;
    transform: translateY(30px);
    transition: all 0.6s ease;
}
.dogma-section.show {
    opacity: 1;
    transform: translateY(0);
}
```
- Animação ao entrar na viewport (Intersection Observer)

##### 2. **Imagem do Dogma**
```css
.dogma-image {
    flex: 0 0 300px;
}
.dogma-image img {
    width: 100%;
    border-radius: 10px;
    box-shadow: 0 4px 15px rgba(0, 0, 0, 0.2);
}
```
- Largura fixa de 300px
- `flex: 0 0 300px` - Não cresce, não encolhe, largura 300px

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

##### 5. **Categoria**
```css
.dogma-category {
    color: var(--accent-color);
    font-family: 'SUSE Mono', 'Times New Roman', Times;
    font-size: 0.9vw;
    font-weight: bold;
    text-transform: uppercase;
    letter-spacing: 1px;
    margin-bottom: 5px;
}
```
- Texto em maiúsculas
- `letter-spacing` - Espaçamento entre letras

##### 6. **Descrição**
```css
.dogma-description {
    color: var(--text-color);
    font-size: 1.1vw;
    line-height: 1.8;
    margin-bottom: 15px;
}
```
- `line-height: 1.8` - Espaçamento entre linhas

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
- Estilo de citação com borda lateral

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

---

#### `css/menuDsobreFe.css`
**Estrutura similar ao HomePage.css com:**
- Grid de vitrais
- Animações de entrada
- Layout responsivo

---

#### `css/sobre.css`
**Estrutura similar com:**
- Seções de conteúdo
- Layout de duas colunas
- Animações de scroll

---

#### `css/trabaleConosco.css`
**Formulário com:**
- Campos de entrada estilizados
- Botões customizados
- Validação visual

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
    <link rel="stylesheet" href="css/[arquivo].css">
    <script src="js/[arquivo].js"></script>
</head>
```

**Elementos:**
- `<!DOCTYPE html>` - Declaração de tipo de documento
- `lang="pt-br"` - Idioma da página (ou `lang="en"` para inglês)
- `charset="UTF-8"` - Codificação de caracteres
- `viewport` - Configuração responsiva

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

#### 4. **Tela de Carregamento**
```html
<div class="carreg" id="crg">
    <img src="Imagens/Cruz_de_Vidro_e_Luz_Radiante.png" alt="Clique para entrar" id="imgcrg">
</div>
```
- Tela inicial antes do conteúdo

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
- `.dogma-section` - Container principal
- `.dogma-image` - Imagem do dogma
- `.dogma-content` - Conteúdo textual
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
├── dogmasMarianos_pt.html        # Dogmas Marianos (PT)
├── dogmasMarian_us.html          # Dogmas Marianos (EN)
├── dogmasPapaIgreja_pt.html      # Dogmas sobre Papa e Igreja (PT)
├── dogmasPopeChurch_us.html      # Dogmas sobre Papa e Igreja (EN)
├── dogmasSacramentos_pt.html      # Dogmas sobre Sacramentos (PT)
├── dogmasSacraments_us.html      # Dogmas sobre Sacramentos (EN)
├── dogmasUltimasCoisas_pt.html   # Dogmas sobre Últimas Coisas (PT)
├── dogmasLastThings_us.html      # Dogmas sobre Últimas Coisas (EN)
│
├── menuDsobreFe_pt.html           # Menu de dogmas (PT)
├── menuDsobreFe_us.html          # Menu de dogmas (EN)
├── sobre_pt.html                  # Sobre nós (PT)
├── sobre_us.html                  # Sobre nós (EN)
├── trabalheConosco_pt.html        # Trabalhe conosco (PT)
├── trabalheConosco_us.html        # Trabalhe conosco (EN)
│
├── css/
│   ├── HomePage.css              # Estilos da homepage
│   ├── dogmas.css                # Estilos das páginas de dogmas
│   ├── menuDsobreFe.css          # Estilos do menu de dogmas
│   ├── sobre.css                 # Estilos da página sobre
│   └── trabaleConosco.css        # Estilos do formulário
│
├── js/
│   ├── HomePage_pt.js            # Script da homepage (PT)
│   ├── homepage_us.js            # Script da homepage (EN)
│   ├── dogmas.js                 # Script das páginas de dogmas
│   ├── menuDsobreFe.js           # Script do menu de dogmas
│   ├── sobre.js                  # Script da página sobre
│   ├── trabalheConosco.js        # Script do formulário
│   └── maintenance.js            # Script de manutenção
│
└── Imagens/
    ├── file_00000000933861f789939c2c3f29ab35.png  # Logo
    ├── Vitral_Deus.png            # Vitral de Deus
    ├── Vitral_Jesus.png           # Vitral de Jesus
    ├── Vitral_mariano.png         # Vitral Mariano
    ├── Cruz_de_Vidro_e_Luz_Radiante.png  # Cruz de carregamento
    ├── eua.jpg                    # Bandeira EUA
    └── br.png                     # Bandeira Brasil
```

---

## Comandos JavaScript Principais

### Seletores
- `document.getElementById("id")` - Seleciona por ID
- `document.querySelector(".classe")` - Seleciona primeiro elemento com classe
- `document.querySelectorAll(".classe")` - Seleciona todos os elementos com classe

### Manipulação de Classes
- `element.classList.add("classe")` - Adiciona classe
- `element.classList.remove("classe")` - Remove classe
- `element.classList.toggle("classe", condição)` - Adiciona/remove baseado em condição
- `element.classList.replace("old", "new")` - Substitui classe

### Manipulação de Estilo
- `element.style.display = "none"` - Esconde elemento
- `element.style.display = "flex"` - Mostra como flex
- `element.style.opacity = "0"` - Torna transparente

### Eventos
- `element.addEventListener("click", função)` - Adiciona listener de clique
- `element.addEventListener("mouseenter", função)` - Mouse entra
- `element.addEventListener("mouseleave", função)` - Mouse sai
- `element.addEventListener("scroll", função)` - Scroll
- `window.addEventListener("load", função)` - Página carregada
- `e.stopPropagation()` - Impede propagação do evento

### Scroll
- `window.scrollY` - Posição vertical do scroll
- `window.scrollTo({ top: 0, behavior: "smooth" })` - Scroll suave para o topo

### LocalStorage
- `localStorage.setItem("chave", "valor")` - Salva valor
- `localStorage.getItem("chave")` - Recupera valor
- `localStorage.removeItem("chave")` - Remove valor

### Timers
- `setTimeout(função, tempo)` - Executa após tempo (ms)
- `setInterval(função, tempo)` - Executa repetidamente
- `clearTimeout(id)` - Cancela timeout
- `clearInterval(id)` - Cancela interval

### Intersection Observer
- `new IntersectionObserver(callback, options)` - Cria observador
- `observer.observe(element)` - Observa elemento
- `entry.isIntersecting` - Verifica se está visível

---

## Propriedades CSS Principais

### Layout
- `display: flex` - Layout flexbox
- `display: grid` - Layout grid
- `position: fixed` - Posição fixa na tela
- `position: relative` - Posição relativa
- `position: absolute` - Posição absoluta

### Flexbox
- `justify-content: space-around` - Espaça elementos
- `align-items: center` - Centraliza verticalmente
- `flex: 1` - Ocupa espaço disponível
- `gap: 20px` - Espaçamento entre elementos

### Dimensões
- `width: 100vw` - Largura total da viewport
- `height: 100vh` - Altura total da viewport
- `font-size: 2.5vw` - Tamanho responsivo (viewport width)

### Cores e Transparência
- `rgba(214, 147, 2, 0.1)` - Cor com opacidade
- `var(--accent-color)` - Usa variável CSS

### Animações
- `transition: all 0.3s ease` - Transição suave
- `@keyframes nome` - Define animação
- `animation: nome 1s ease forwards` - Aplica animação

### Efeitos
- `backdrop-filter: blur(8px)` - Desfoque no fundo
- `box-shadow: 0 4px 15px rgba(0,0,0,0.2)` - Sombra
- `border-radius: 10px` - Bordas arredondadas
- `transform: translateY(20px)` - Move elemento
- `opacity: 0` - Transparência

---

## Convenções de Nomenclatura

### Classes CSS
- `.dogma-section` - Seção de dogma
- `.dogma-title` - Título do dogma
- `.dogma-info` - Informações do dogma
- `.vitex` - Vitral (desktop)
- `.vitralcel` - Vitral (mobile)
- `.fadein` - Animação de entrada
- `.active` - Estado ativo
- `.show` - Estado visível

### IDs HTML
- `sideNav` - Menu lateral
- `closeNav` - Botão fechar menu
- `crg` - Tela de carregamento
- `imgcrg` - Imagem de carregamento
- `dica` - Dica nos vitrais
- `btn` - Botão voltar ao topo

### Variáveis CSS
- `--bg1-color` - Cor de fundo 1
- `--accent-color` - Cor de destaque
- `--text-color` - Cor do texto

---

## Boas Práticas Implementadas

1. **Responsividade:** Uso de unidades `vw`, `vh`, `%`
2. **Acessibilidade:** `aria-label`, `alt` em imagens
3. **Performance:** Lazy loading, Intersection Observer
4. **Manutenibilidade:** Variáveis CSS, código comentado
5. **UX:** Animações suaves, feedback visual
6. **SEO:** Estrutura semântica HTML5

---

## Notas Finais

- Todos os scripts usam `DOMContentLoaded` para garantir que o DOM está pronto
- Animações são desabilitadas em dispositivos com `prefers-reduced-motion`
- O site suporta dois idiomas: Português (PT) e Inglês (EN)
- Formulários são processados via Netlify Forms
- Modo de manutenção pode ser ativado via console ou localStorage

---

**Última atualização:** 2025