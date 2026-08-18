/**
 * =======================================================
 * GERENCIADOR GLOBAL DE TEMAS (CLARO / ESCURO) - WEB II
 * =======================================================
 * Este script cuida de:
 * 1. Lembrar a preferência do usuário (localStorage)
 * 2. Aplicar o tema em qualquer página aberta
 * 3. Inserir automaticamente o botão de alternar tema no topo
 */

(function () {
  // 1. Aplica o tema salvo imediatamente para evitar piscada de tela
  const temaSalvo = localStorage.getItem('tema_webii') || 'claro';
  aplicarTemaNoDOM(temaSalvo);

  // 2. Quando o DOM estiver pronto, adiciona o botão flutuante e assegura menu.js
  document.addEventListener('DOMContentLoaded', () => {
    // Aplica novamente no body caso o DOM tenha acabado de carregar
    aplicarTemaNoDOM(localStorage.getItem('tema_webii') || 'claro');
    criarBotaoAlternador();

    // Carrega o menu lateral caso não tenha sido inserido diretamente via tag script
    if (!window.MenuLateralWEBII && !document.getElementById('sidebarMenu')) {
      const path = window.location.pathname.replace(/\\/g, '/');
      const estaEmSubpasta = path.includes('/01-') || path.includes('/02-') || path.includes('/03-') || path.includes('/04-') || path.includes('/05-');
      const scriptMenu = document.createElement('script');
      scriptMenu.src = (estaEmSubpasta ? '../' : './') + 'menu.js';
      document.head.appendChild(scriptMenu);
    }
  });

  /**
   * Aplica as classes e atributos de tema no HTML e Body
   */
  function aplicarTemaNoDOM(tema) {
    if (tema === 'escuro') {
      document.documentElement.setAttribute('data-tema', 'escuro');
      if (document.body) {
        document.body.classList.add('tema-escuro');
      }
    } else {
      document.documentElement.setAttribute('data-tema', 'claro');
      if (document.body) {
        document.body.classList.remove('tema-escuro');
      }
    }
  }

  /**
   * Cria e insere o botão de alternar tema automaticamente no canto superior direito
   */
  function criarBotaoAlternador() {
    // Se já existir o botão nesta página, não duplica
    if (document.getElementById('btnTemaGlobal')) return;

    const btn = document.createElement('button');
    btn.id = 'btnTemaGlobal';
    btn.className = 'btn-toggle-tema-global';
    btn.setAttribute('type', 'button');
    btn.setAttribute('aria-label', 'Alternar tema claro/escuro');

    atualizarTextoBotao(btn, localStorage.getItem('tema_webii') || 'claro');

    btn.addEventListener('click', () => {
      const temaAtual = localStorage.getItem('tema_webii') || 'claro';
      const novoTema = temaAtual === 'claro' ? 'escuro' : 'claro';

      localStorage.setItem('tema_webii', novoTema);
      aplicarTemaNoDOM(novoTema);
      atualizarTextoBotao(btn, novoTema);
    });

    document.body.appendChild(btn);
  }

  function atualizarTextoBotao(btn, tema) {
    if (tema === 'escuro') {
      btn.innerHTML = '☀️ Tema Claro';
    } else {
      btn.innerHTML = '🌙 Tema Escuro';
    }
  }

  // Torna a função acessível globalmente se alguma página quiser chamar direto
  window.alternarTemaGlobal = function () {
    const temaAtual = localStorage.getItem('tema_webii') || 'claro';
    const novoTema = temaAtual === 'claro' ? 'escuro' : 'claro';
    localStorage.setItem('tema_webii', novoTema);
    aplicarTemaNoDOM(novoTema);
    const btn = document.getElementById('btnTemaGlobal');
    if (btn) atualizarTextoBotao(btn, novoTema);
  };
})();
