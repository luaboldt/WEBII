/**
 * Exercício 03: Mostrar/Esconder Senha
 * 
 * Alterna o atributo type do input entre "password" e "text".
 */
function alternarSenha() {
  const campoSenha = document.getElementById('campoSenha');
  const btnToggle = document.getElementById('btnToggleSenha');
  const statusTipo = document.getElementById('statusTipo');

  if (campoSenha.type === 'password') {
    // Altera para texto visível
    campoSenha.type = 'text';
    btnToggle.innerHTML = '🙈 Esconder';
    if (statusTipo) {
      statusTipo.innerHTML = 'Tipo atual do input: <code>type="text"</code> (Visível)';
    }
  } else {
    // Altera para senha oculta
    campoSenha.type = 'password';
    btnToggle.innerHTML = '👁️ Mostrar';
    if (statusTipo) {
      statusTipo.innerHTML = 'Tipo atual do input: <code>type="password"</code> (Oculto)';
    }
  }
}
