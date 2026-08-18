/**
 * =======================================================
 * LÓGICA JAVASCRIPT - EXERCÍCIO 04: SOMATÓRIO (WHILE & DO...WHILE)
 * Autor: Luã Boldt • IFFar Desenvolvimento Web II
 * =======================================================
 */

let listaNumeros = [];

document.addEventListener('DOMContentLoaded', () => {
  const inputNumero = document.getElementById('inputNumero');
  const btnAdicionar = document.getElementById('btnAdicionar');
  const btnFinalizar = document.getElementById('btnFinalizar');
  const btnLimpar = document.getElementById('btnLimpar');
  const btnModoDialogo = document.getElementById('btnModoDialogo');

  if (inputNumero) {
    inputNumero.focus();
    inputNumero.addEventListener('keydown', (e) => {
      if (e.key === 'Enter') {
        e.preventDefault();
        adicionarNumero();
      }
    });
  }

  if (btnAdicionar) btnAdicionar.addEventListener('click', adicionarNumero);
  if (btnFinalizar) btnFinalizar.addEventListener('click', finalizarESomar);
  if (btnLimpar) btnLimpar.addEventListener('click', limparTudo);
  if (btnModoDialogo) btnModoDialogo.addEventListener('click', executarModoDialogo);
});

/**
 * Adiciona o número digitado ao array de números
 */
function adicionarNumero() {
  const input = document.getElementById('inputNumero');
  const valorStr = input.value.trim();

  if (valorStr === '' || isNaN(Number(valorStr))) {
    input.classList.add('invalido');
    setTimeout(() => input.classList.remove('invalido'), 600);
    return;
  }

  const numero = parseFloat(valorStr);
  listaNumeros.push(numero);

  input.value = '';
  input.focus();

  atualizarListaChips();
  ocultarResultados();
}

/**
 * Remove um número pelo índice
 */
function removerNumero(indice) {
  listaNumeros.splice(indice, 1);
  atualizarListaChips();
  if (listaNumeros.length === 0) {
    ocultarResultados();
  } else {
    finalizarESomar();
  }
}

/**
 * Atualiza os chips visuais de números na tela
 */
function atualizarListaChips() {
  const container = document.getElementById('chipsContainer');
  const badgeQtd = document.getElementById('badgeQtd');
  const btnFinalizar = document.getElementById('btnFinalizar');

  if (!container) return;

  if (listaNumeros.length === 0) {
    container.innerHTML = '<span class="lista-vazia-txt">Nenhum número adicionado ainda. Digite um valor acima.</span>';
    if (badgeQtd) badgeQtd.innerText = '0 números';
    if (btnFinalizar) btnFinalizar.disabled = true;
    return;
  }

  if (badgeQtd) {
    badgeQtd.innerText = `${listaNumeros.length} ${listaNumeros.length === 1 ? 'número' : 'números'}`;
  }
  if (btnFinalizar) btnFinalizar.disabled = false;

  let html = '';
  listaNumeros.forEach((num, index) => {
    html += `
      <div class="chip-numero">
        <span>${num}</span>
        <button type="button" class="btn-remover-chip" title="Remover número" onclick="removerNumero(${index})">✕</button>
      </div>
    `;
  });

  container.innerHTML = html;
}

/**
 * Executa o cálculo da soma com laço WHILE e estatísticas com DO...WHILE
 */
function finalizarESomar() {
  if (listaNumeros.length === 0) {
    alert('Por favor, adicione ao menos um número antes de finalizar!');
    return;
  }

  // 1. CÁLCULO DA SOMA USANDO LAÇO WHILE
  let somaTotal = 0;
  let i = 0;
  while (i < listaNumeros.length) {
    somaTotal += listaNumeros[i];
    i++;
  }

  // 2. CÁLCULO DE ESTATÍSTICAS USANDO LAÇO DO...WHILE
  let j = 0;
  let maior = listaNumeros[0];
  let menor = listaNumeros[0];
  do {
    if (listaNumeros[j] > maior) maior = listaNumeros[j];
    if (listaNumeros[j] < menor) menor = listaNumeros[j];
    j++;
  } while (j < listaNumeros.length);

  const media = somaTotal / listaNumeros.length;

  // Atualização dos elementos no DOM
  const painel = document.getElementById('painelResultados');
  const txtSoma = document.getElementById('txtSomaTotal');
  const txtQtd = document.getElementById('txtQtdNumeros');
  const txtMedia = document.getElementById('txtMedia');
  const txtMaiorMenor = document.getElementById('txtMaiorMenor');

  if (txtSoma) txtSoma.innerText = Number.isInteger(somaTotal) ? somaTotal : somaTotal.toFixed(2);
  if (txtQtd) txtQtd.innerText = listaNumeros.length;
  if (txtMedia) txtMedia.innerText = Number.isInteger(media) ? media : media.toFixed(2);
  if (txtMaiorMenor) txtMaiorMenor.innerText = `${maior} / ${menor}`;

  if (painel) {
    painel.classList.remove('escondido');
  }
}

/**
 * Modo Diálogo Interativo acadêmico com laço DO...WHILE
 */
function executarModoDialogo() {
  let coletados = [];
  let continuar = true;

  // Laço do...while solicitando números até confirmação de parada
  do {
    const entrada = prompt('Digite um número para somar:');
    
    // Se o usuário clicou em cancelar no prompt
    if (entrada === null) {
      break;
    }

    const valorLimpo = entrada.trim().replace(',', '.');
    if (valorLimpo !== '' && !isNaN(Number(valorLimpo))) {
      coletados.push(parseFloat(valorLimpo));
    } else if (valorLimpo !== '') {
      alert('Valor inválido! Por favor, digite apenas números.');
    }

    continuar = confirm('Deseja inserir mais um número?');
  } while (continuar);

  if (coletados.length > 0) {
    listaNumeros = coletados;
    atualizarListaChips();
    finalizarESomar();
  }
}

/**
 * Oculta o painel de resultados
 */
function ocultarResultados() {
  const painel = document.getElementById('painelResultados');
  if (painel) painel.classList.add('escondido');
}

/**
 * Reseta o estado da aplicação
 */
function limparTudo() {
  listaNumeros = [];
  atualizarListaChips();
  ocultarResultados();
  const input = document.getElementById('inputNumero');
  if (input) {
    input.value = '';
    input.focus();
  }
}
