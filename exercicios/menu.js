/**
 * =======================================================
 * COMPONENTE DE MENU LATERAL (SIDEBAR DRAWER) - WEB II
 * =======================================================
 * Autor: Luã Boldt | IFFar Desenvolvimento Web II
 * 
 * Permite navegação direta entre qualquer exercício e a Landing Page,
 * com destaque automático para o exercício atualmente aberto.
 */

(function () {
  // Lista centralizada de exercícios cadastrados no projeto
  const EXERCICIOS = [
    {
      id: '01',
      slug: '01-tema-claro-escuro',
      titulo: 'Tema Claro e Escuro',
      descricao: 'Alternador de cores e temas em JavaScript',
      tag: 'DOM • Estilos',
      path: '01-tema-claro-escuro/index.html'
    },
    {
      id: '02',
      slug: '02-cpf-cnpj',
      titulo: 'Validação CPF / CNPJ',
      descricao: 'Alternância dinâmica e validação de documento',
      tag: 'Formulários • Regex',
      path: '02-cpf-cnpj/index.html'
    },
    {
      id: '03',
      slug: '03-mostrar-esconder-senha',
      titulo: 'Mostrar / Esconder Senha',
      descricao: 'Alternador de visibilidade de campo password',
      tag: 'DOM • Inputs',
      path: '03-mostrar-esconder-senha/index.html'
    },
    {
      id: '04',
      slug: '04-soma-numeros',
      titulo: 'Somatório de Números',
      descricao: 'Laços while e do...while para acumulação e média',
      tag: 'JavaScript • Laços',
      path: '04-soma-numeros/index.html'
    }
  ];

  document.addEventListener('DOMContentLoaded', () => {
    inicializarMenuLateral();
  });

  function inicializarMenuLateral() {
    // Evita duplicidade se já foi injetado
    if (document.getElementById('sidebarMenu')) return;

    // Detecta se estamos na raiz (landing page) ou dentro de uma subpasta de exercício
    const path = window.location.pathname.replace(/\\/g, '/');
    const estaEmSubpasta = EXERCICIOS.some(ex => path.includes(ex.slug));
    const prefixo = estaEmSubpasta ? '../' : './';
    const isLandingPage = !estaEmSubpasta;

    // 1. Criar o Botão de Abertura (Hambúrguer)
    const btnToggle = document.createElement('button');
    btnToggle.id = 'btnMenuLateralToggle';
    btnToggle.className = 'btn-menu-lateral-toggle';
    btnToggle.setAttribute('type', 'button');
    btnToggle.setAttribute('aria-label', 'Abrir menu de navegação dos exercícios');
    btnToggle.setAttribute('title', 'Navegar entre exercícios');
    btnToggle.innerHTML = `
      <svg class="icon-menu" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round">
        <line x1="3" y1="12" x2="21" y2="12"></line>
        <line x1="3" y1="6" x2="21" y2="6"></line>
        <line x1="3" y1="18" x2="21" y2="18"></line>
      </svg>
      <span class="btn-menu-text">Exercícios</span>
    `;

    // 2. Criar o Backdrop Overlay
    const backdrop = document.createElement('div');
    backdrop.id = 'sidebarMenuBackdrop';
    backdrop.className = 'sidebar-backdrop';
    backdrop.setAttribute('aria-hidden', 'true');

    // 3. Criar a Sidebar
    const sidebar = document.createElement('aside');
    sidebar.id = 'sidebarMenu';
    sidebar.className = 'sidebar-menu';
    sidebar.setAttribute('aria-label', 'Menu lateral de exercícios');
    sidebar.setAttribute('aria-hidden', 'true');

    // Renderiza a lista de exercícios
    let itensHtml = '';
    EXERCICIOS.forEach(ex => {
      const isAtivo = path.includes(ex.slug);
      const linkDestino = prefixo + ex.path;
      itensHtml += `
        <a href="${linkDestino}" class="sidebar-nav-item ${isAtivo ? 'ativo' : ''}" ${isAtivo ? 'aria-current="page"' : ''}>
          <div class="sidebar-item-num">${ex.id}</div>
          <div class="sidebar-item-info">
            <span class="sidebar-item-title">${ex.titulo}</span>
            <span class="sidebar-item-tag">${ex.tag}</span>
          </div>
          ${isAtivo ? '<span class="sidebar-ativo-pill">Aberto</span>' : '<span class="sidebar-item-arrow">➔</span>'}
        </a>
      `;
    });

    const linkHome = isLandingPage ? '#' : prefixo + 'index.html';

    sidebar.innerHTML = `
      <div class="sidebar-header">
        <div class="sidebar-branding">
          <span class="sidebar-badge">WEB II</span>
          <div>
            <h2 class="sidebar-title">Exercícios</h2>
            <span class="sidebar-author">Luã Boldt • IFFar</span>
          </div>
        </div>
        <button type="button" id="btnFecharSidebar" class="btn-fechar-sidebar" aria-label="Fechar menu lateral">✕</button>
      </div>

      <div class="sidebar-body">
        <a href="${linkHome}" class="sidebar-home-link ${isLandingPage ? 'ativo' : ''}">
          <span class="sidebar-home-icon">🏠</span>
          <div class="sidebar-item-info">
            <span class="sidebar-item-title">Início / Landing Page</span>
            <span class="sidebar-item-tag">Visão Geral dos Exercícios</span>
          </div>
          ${isLandingPage ? '<span class="sidebar-ativo-pill">Início</span>' : '<span class="sidebar-item-arrow">➔</span>'}
        </a>

        <div class="sidebar-divider"></div>

        <div class="sidebar-section-header">
          <span>LISTA DE ATIVIDADES</span>
          <span class="sidebar-count">${EXERCICIOS.length}</span>
        </div>

        <nav class="sidebar-nav-list">
          ${itensHtml}
        </nav>
      </div>

      <div class="sidebar-footer">
        <p class="sidebar-footer-text">Desenvolvimento Web II • <strong>Luã Boldt</strong></p>
      </div>
    `;

    // Adiciona ao DOM
    document.body.appendChild(btnToggle);
    document.body.appendChild(backdrop);
    document.body.appendChild(sidebar);

    // Eventos de Abertura e Fechamento
    function abrirSidebar() {
      sidebar.classList.add('aberto');
      backdrop.classList.add('aberto');
      sidebar.setAttribute('aria-hidden', 'false');
      document.body.classList.add('sidebar-ativa');
    }

    function fecharSidebar() {
      sidebar.classList.remove('aberto');
      backdrop.classList.remove('aberto');
      sidebar.setAttribute('aria-hidden', 'true');
      document.body.classList.remove('sidebar-ativa');
    }

    btnToggle.addEventListener('click', abrirSidebar);
    backdrop.addEventListener('click', fecharSidebar);

    const btnFechar = sidebar.querySelector('#btnFecharSidebar');
    if (btnFechar) {
      btnFechar.addEventListener('click', fecharSidebar);
    }

    // Fechar com tecla ESC
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && sidebar.classList.contains('aberto')) {
        fecharSidebar();
      }
    });
  }

  // Expõe API global
  window.MenuLateralWEBII = {
    exercicios: EXERCICIOS,
    abrir: function () {
      const sb = document.getElementById('sidebarMenu');
      const bd = document.getElementById('sidebarMenuBackdrop');
      if (sb && bd) {
        sb.classList.add('aberto');
        bd.classList.add('aberto');
        document.body.classList.add('sidebar-ativa');
      }
    },
    fechar: function () {
      const sb = document.getElementById('sidebarMenu');
      const bd = document.getElementById('sidebarMenuBackdrop');
      if (sb && bd) {
        sb.classList.remove('aberto');
        bd.classList.remove('aberto');
        document.body.classList.remove('sidebar-ativa');
      }
    }
  };
})();
