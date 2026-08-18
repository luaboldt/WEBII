/**
 * Exercício 01: Alternador de Tema
 * 
 * Função que troca a cor de fundo e a cor do texto da página
 * @param {string} tema - 'claro' ou 'escuro'
 */
function trocarTema(tema) {
  const corpo = document.body;
  const statusTema = document.getElementById('statusTema');

  if (tema === 'claro') {
    // Aplica as cores do tema claro
    corpo.style.backgroundColor = '#f8fafc';
    corpo.style.color = '#1e293b';
    corpo.classList.remove('tema-escuro');

    if (statusTema) {
      statusTema.innerHTML = 'Tema atual: <strong>Claro ☀️</strong>';
    }
  } else if (tema === 'escuro') {
    // Aplica as cores do tema escuro
    corpo.style.backgroundColor = '#0f172a';
    corpo.style.color = '#f8fafc';
    corpo.classList.add('tema-escuro');

    if (statusTema) {
      statusTema.innerHTML = 'Tema atual: <strong>Escuro 🌙</strong>';
    }
  }
}
