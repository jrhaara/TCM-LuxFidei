# ✅ Lista de Tarefas e Ideias - Lux Fidei

## 🔴 ALTA PRIORIDADE (Fazer Primeiro)

### 1. Conteúdo Real
  - [ ] **Substituir Lorem Ipsum em `sobre_pt.html`**
  - [ ] Seção "joao" (linhas 44-50): Escrever sobre João (fundador/membro da equipe)
  - [ ] Seção "paroquia" (linhas 58-64): Escrever sobre a paróquia/história
  - [ ] Seção "font" (linhas 69-73): Escrever sobre fontes/creditos
  - [ ] Fazer o mesmo para `sobre_us.html` (versão em inglês)

### 2. Links Funcionais
- [ ] **Criar páginas ou remover links vazios**
  - [ ] `index.html` linha 36: "Dogmas sobre Deus" → Criar página ou remover
  - [ ] `index.html` linha 37: "Dogmas sobre Jesus Cristo" → Criar página ou remover
  - [ ] `index.html` linha 38: "Dogmas sobre a Criação do Mundo" → Criar página ou remover
  - [ ] `index.html` linha 39: "Dogmas sobre o Ser Humano" → Criar página ou remover
  - [ ] `index.html` linha 40: "Dogmas Marianos" → Criar página ou remover
  - [ ] `index.html` linha 41: "Dogmas sobre o Papa e a Igreja" → Criar página ou remover
  - [ ] `index.html` linha 42: "Dogmas sobre os Sacramentos" → Criar página ou remover
  - [ ] `index.html` linha 43: "Dogmas sobre as Últimas Coisas" → Criar página ou remover
  - [ ] `index.html` linha 55: Vitral de Jesus → Criar página ou remover link
  - [ ] `index.html` linha 73: Vitral Mariano → Criar página ou remover link
  - [ ] Replicar correções em `index_us.html`

### 3. Atributos Alt em Imagens
- [ ] **Adicionar descrições descritivas**
  - [ ] `sobre_pt.html` linha 41: Imagem de João → "Foto de [nome], [descrição]"
  - [ ] `sobre_pt.html` linha 55: Imagem da paróquia → "Foto da [nome da paróquia]"
  - [ ] Verificar todas as outras imagens no site
  - [ ] Fazer o mesmo para versões em inglês

### 4. Meta Tags SEO Básicas
- [ ] **Adicionar em todos os arquivos HTML**
  ```html
  <meta name="description" content="Descrição única da página">
  <meta name="keywords" content="dogmas, catolicismo, igreja, fé">
  <meta name="author" content="Lux Fidei">
  ```
  - [ ] `index.html`
  - [ ] `index_us.html`
  - [ ] `sobre_pt.html`
  - [ ] `sobre_us.html`
  - [ ] `menuDsobreFe_pt.html`
  - [ ] `menuDsobreFe_us.html`
  - [ ] `trabalheConosco_pt.html`
  - [ ] `trabalheConosco_us.html`

---

## 🟡 MÉDIA PRIORIDADE (Fazer Depois)

### 5. Acessibilidade (WCAG)
- [ ] **Navegação por Teclado**
  - [ ] Adicionar `tabindex` onde necessário
  - [ ] Garantir que todos os botões sejam focáveis
  - [ ] Adicionar `:focus-visible` styles no CSS
  - [ ] Testar navegação completa com Tab, Enter, Esc

- [ ] **ARIA Labels**
  - [ ] Adicionar `aria-label` em botões sem texto (☰, ×, ◀, ▶)
  - [ ] Adicionar `aria-expanded` no menu lateral
  - [ ] Adicionar `aria-hidden` em elementos decorativos

- [ ] **Contraste de Cores**
  - [ ] Verificar contraste texto/fundo (usar ferramenta online)
  - [ ] Garantir mínimo WCAG AA (4.5:1 para texto normal)
  - [ ] Ajustar cores se necessário

- [ ] **Skip to Main Content**
  - [ ] Adicionar link invisível no topo: `<a href="#main" class="skip-link">Pular para conteúdo</a>`
  - [ ] Adicionar CSS para mostrar no foco

### 6. Otimização de Imagens
- [ ] **Converter para WebP**
  - [ ] `Cruz_de_Vidro_e_Luz_Radiante.png`
  - [ ] `Vitral_Deus.png`
  - [ ] `Vitral_Jesus.png`
  - [ ] `Vitral_mariano.png`
  - [ ] `file_00000000933861f789939c2c3f29ab35.png`
  - [ ] `IMG-20250921-WA0011.jpg`
  - [ ] Manter versões PNG/JPG como fallback

- [ ] **Comprimir Imagens**
  - [ ] Usar ferramenta como TinyPNG ou ImageOptim
  - [ ] Reduzir tamanho sem perder qualidade visível
  - [ ] Verificar tamanhos de arquivo (ideal: < 200KB por imagem)

- [ ] **Lazy Loading**
  - [ ] Adicionar `loading="lazy"` em imagens abaixo da dobra
  - [ ] Implementar IntersectionObserver para imagens críticas

### 7. Tratamento de Erros JavaScript
- [ ] **Adicionar try-catch onde necessário**
  - [ ] `HomePage_pt.js`: Wrapper em funções críticas
  - [ ] `sobre.js`: Verificar se elementos existem antes de usar
  - [ ] `menuDsobreFe.js`: Adicionar validações
  - [ ] Adicionar console.error para debug

- [ ] **Fallbacks**
  - [ ] Verificar se localStorage está disponível
  - [ ] Fallback para IntersectionObserver (polyfill ou alternativa)
  - [ ] Verificar suporte de recursos modernos

### 8. Open Graph e Twitter Cards
- [ ] **Adicionar meta tags sociais**
  ```html
  <!-- Open Graph -->
  <meta property="og:title" content="Título da Página">
  <meta property="og:description" content="Descrição">
  <meta property="og:image" content="URL da imagem">
  <meta property="og:url" content="URL da página">
  <meta property="og:type" content="website">
  
  <!-- Twitter Card -->
  <meta name="twitter:card" content="summary_large_image">
  <meta name="twitter:title" content="Título">
  <meta name="twitter:description" content="Descrição">
  <meta name="twitter:image" content="URL da imagem">
  ```
  - [ ] Adicionar em todas as páginas principais

---

## 🟢 BAIXA PRIORIDADE (Melhorias Futuras)

### 9. Performance Avançada
- [ ] **Minificação**
  - [ ] Minificar CSS para produção
  - [ ] Minificar JavaScript para produção
  - [ ] Considerar usar ferramenta de build (Webpack, Vite, Parcel)

- [ ] **Preload de Recursos**
  - [ ] Adicionar `<link rel="preload">` para fontes críticas
  - [ ] Preload de imagens acima da dobra
  - [ ] Preconnect para Google Fonts (já feito ✅)

- [ ] **Will-Change**
  - [ ] Adicionar `will-change` em elementos animados
  - [ ] Remover após animação completar

### 10. PWA (Progressive Web App)
- [ ] **Service Worker**
  - [ ] Criar `sw.js` para cache offline
  - [ ] Registrar service worker
  - [ ] Implementar estratégia de cache

- [ ] **Manifest**
  - [ ] Criar `manifest.json`
  - [ ] Adicionar ícones (192x192, 512x512)
  - [ ] Configurar cores do tema

### 11. Funcionalidades Extras
- [ ] **Modo Escuro/Claro**
  - [ ] Adicionar toggle no header
  - [ ] Salvar preferência no localStorage
  - [ ] Usar `prefers-color-scheme` como padrão

- [ ] **Busca**
  - [ ] Adicionar barra de busca no header
  - [ ] Implementar busca simples em JavaScript
  - [ ] Destacar resultados

- [ ] **Breadcrumbs**
  - [ ] Adicionar navegação breadcrumb
  - [ ] Melhorar UX de navegação

### 12. Analytics e Monitoramento
- [ ] **Google Analytics**
  - [ ] Criar conta Google Analytics
  - [ ] Adicionar script de tracking
  - [ ] Configurar eventos importantes

- [ ] **Google Search Console**
  - [ ] Verificar propriedade do site
  - [ ] Enviar sitemap.xml
  - [ ] Monitorar erros de indexação

### 13. Documentação
- [ ] **README.md**
  - [ ] Descrição do projeto
  - [ ] Instruções de instalação/execução
  - [ ] Estrutura de pastas
  - [ ] Como contribuir

- [ ] **Comentários no Código**
  - [ ] Documentar funções complexas
  - [ ] Explicar lógica não óbvia
  - [ ] Adicionar JSDoc em funções JavaScript

---

## 💡 IDEIAS E MELHORIAS CRIATIVAS

### Design e UX
- [ ] **Animações de Entrada**
  - [ ] Adicionar animação de fade-in mais suave
  - [ ] Animar elementos sequencialmente (stagger)
  - [ ] Considerar animações de partículas no background

- [ ] **Microinterações**
  - [ ] Feedback visual ao clicar em botões
  - [ ] Efeito de ripple em cliques
  - [ ] Hover effects mais elaborados

- [ ] **Loading States**
  - [ ] Skeleton screens durante carregamento
  - [ ] Spinner customizado
  - [ ] Progress bar para carregamento de página

### Conteúdo
- [ ] **Galeria de Imagens**
  - [ ] Lightbox para vitrais
  - [ ] Zoom em imagens
  - [ ] Galeria de fotos da paróquia

- [ ] **Vídeos**
  - [ ] Vídeo introdutório sobre dogmas
  - [ ] Embed de vídeos do YouTube
  - [ ] Player customizado

- [ ] **Blog/Notícias**
  - [ ] Seção de artigos sobre dogmas
  - [ ] Sistema de categorias
  - [ ] Busca por tags

### Interatividade
- [ ] **Quiz Interativo**
  - [ ] Quiz sobre conhecimento dos dogmas
  - [ ] Sistema de pontuação
  - [ ] Compartilhamento de resultados

- [ ] **Timeline**
  - [ ] Timeline histórica dos dogmas
  - [ ] Visualização interativa
  - [ ] Filtros por período

- [ ] **Mapa Interativo**
  - [ ] Mapa de paróquias (se aplicável)
  - [ ] Localização da paróquia principal
  - [ ] Integração com Google Maps

### Técnico
- [ ] **Sistema de Build**
  - [ ] Configurar Webpack ou Vite
  - [ ] Automação de minificação
  - [ ] Hot reload para desenvolvimento

- [ ] **Versionamento**
  - [ ] Inicializar Git (se não tiver)
  - [ ] Criar .gitignore apropriado
  - [ ] Commits organizados

- [ ] **Testes**
  - [ ] Testes de acessibilidade (axe-core)
  - [ ] Testes de performance (Lighthouse CI)
  - [ ] Testes de compatibilidade cross-browser

---

## 📋 CHECKLIST RÁPIDO POR PÁGINA

### index.html / index_us.html
- [ ] Meta tags SEO
- [ ] Open Graph tags
- [ ] Links funcionais no menu
- [ ] Links funcionais nos vitrais
- [ ] Alt texts em todas as imagens
- [ ] Testar carrossel mobile
- [ ] Testar tela de carregamento

### sobre_pt.html / sobre_us.html
- [ ] Substituir Lorem Ipsum
- [ ] Meta tags SEO
- [ ] Open Graph tags
- [ ] Alt texts descritivos
- [ ] Verificar animações ao scroll
- [ ] Testar responsividade

### menuDsobreFe_pt.html / menuDsobreFe_us.html
- [ ] Conteúdo real nos vitrais
- [ ] Links funcionais
- [ ] Meta tags SEO
- [ ] Alt texts
- [ ] Verificar layout responsivo

### trabalheConosco_pt.html / trabalheConosco_us.html
- [ ] Formulário funcional (se houver)
- [ ] Validação de campos
- [ ] Meta tags SEO
- [ ] Conteúdo completo

---

## 🎯 METAS E PRAZOS

### Semana 1 (Urgente)
- [ ] Conteúdo real substituindo Lorem Ipsum
- [ ] Links funcionais ou removidos
- [ ] Alt texts em todas as imagens
- [ ] Meta tags SEO básicas

### Semana 2 (Importante)
- [ ] Melhorias de acessibilidade
- [ ] Otimização de imagens
- [ ] Open Graph tags
- [ ] Tratamento de erros JS

### Semana 3+ (Opcional)
- [ ] PWA
- [ ] Analytics
- [ ] Funcionalidades extras
- [ ] Documentação completa

---

## 📊 FERRAMENTAS ÚTEIS

### Validação e Testes
- [ ] **HTML Validator**: https://validator.w3.org/
- [ ] **CSS Validator**: https://jigsaw.w3.org/css-validator/
- [ ] **Lighthouse**: Chrome DevTools
- [ ] **axe DevTools**: Extensão Chrome para acessibilidade
- [ ] **WAVE**: https://wave.webaim.org/ (acessibilidade)

### Otimização
- [ ] **TinyPNG**: https://tinypng.com/ (compressão de imagens)
- [ ] **Squoosh**: https://squoosh.app/ (conversão WebP)
- [ ] **PageSpeed Insights**: https://pagespeed.web.dev/

### Design
- [ ] **Coolors**: https://coolors.co/ (paleta de cores)
- [ ] **Font Pair**: https://www.fontpair.co/ (combinações de fontes)
- [ ] **Unsplash**: https://unsplash.com/ (imagens gratuitas)

---

## 📝 NOTAS

- ✅ = Concluído
- 🔄 = Em progresso
- ⏸️ = Pausado
- ❌ = Cancelado

**Última atualização**: Janeiro 2025

---

## 🚀 COMEÇAR AGORA

**Primeiras 3 tarefas para fazer HOJE:**
1. Substituir Lorem Ipsum em `sobre_pt.html`
2. Adicionar meta tags SEO em `index.html`
3. Adicionar alt texts descritivos nas imagens

**Boa sorte com o desenvolvimento! 🎉**

