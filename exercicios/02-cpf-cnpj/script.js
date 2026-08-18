/**
 * Exercício 02: CPF ou CNPJ com Validação Automática
 */

/**
 * Alterna a visibilidade dos campos CPF e CNPJ
 */
function alternarDocumento() {
  const radioCpf = document.getElementById('radioCpf');
  const campoCpf = document.getElementById('campoCpf');
  const campoCnpj = document.getElementById('campoCnpj');

  limparFeedback();

  if (radioCpf.checked) {
    campoCpf.classList.remove('escondido');
    campoCnpj.classList.add('escondido');
  } else {
    campoCpf.classList.add('escondido');
    campoCnpj.classList.remove('escondido');
  }
}

/**
 * Formata CPF e valida automaticamente ao atingir 11 dígitos
 */
function formatarCPF(input) {
  let valor = input.value.replace(/\D/g, '');
  if (valor.length > 11) valor = valor.slice(0, 11);

  valor = valor.replace(/(\d{3})(\d)/, '$1.$2');
  valor = valor.replace(/(\d{3})(\d)/, '$1.$2');
  valor = valor.replace(/(\d{3})(\d{1,2})$/, '$1-$2');

  input.value = valor;

  const digitos = input.value.replace(/\D/g, '');
  if (digitos.length === 11) {
    validarCPF(digitos);
  } else {
    removerValidacao(input, document.getElementById('feedbackCpf'));
  }
}

/**
 * Formata CNPJ e valida automaticamente ao atingir 14 dígitos
 */
function formatarCNPJ(input) {
  let valor = input.value.replace(/\D/g, '');
  if (valor.length > 14) valor = valor.slice(0, 14);

  valor = valor.replace(/^(\d{2})(\d)/, '$1.$2');
  valor = valor.replace(/^(\d{2})\.(\d{3})(\d)/, '$1.$2.$3');
  valor = valor.replace(/\.(\d{3})(\d)/, '.$1/$2');
  valor = valor.replace(/(\d{4})(\d)/, '$1-$2');

  input.value = valor;

  const digitos = input.value.replace(/\D/g, '');
  if (digitos.length === 14) {
    validarCNPJ(digitos);
  } else {
    removerValidacao(input, document.getElementById('feedbackCnpj'));
  }
}

/**
 * Validação matemática dos dígitos do CPF
 */
function validarCPF(cpf) {
  const input = document.getElementById('inputCpf');
  const feedback = document.getElementById('feedbackCpf');

  if (/^(\d)\1+$/.test(cpf) || cpf.length !== 11) {
    aplicarStatus(input, feedback, false, 'CPF inválido');
    return;
  }

  let soma = 0;
  for (let i = 0; i < 9; i++) soma += parseInt(cpf.charAt(i)) * (10 - i);
  let resto = (soma * 10) % 11;
  if (resto === 10 || resto === 11) resto = 0;
  if (resto !== parseInt(cpf.charAt(9))) {
    aplicarStatus(input, feedback, false, 'CPF inválido');
    return;
  }

  soma = 0;
  for (let i = 0; i < 10; i++) soma += parseInt(cpf.charAt(i)) * (11 - i);
  resto = (soma * 10) % 11;
  if (resto === 10 || resto === 11) resto = 0;
  if (resto !== parseInt(cpf.charAt(10))) {
    aplicarStatus(input, feedback, false, 'CPF inválido');
    return;
  }

  // Quando Válido: apenas fica verde, sem texto de mensagem
  aplicarStatus(input, feedback, true);
}

/**
 * Validação matemática dos dígitos do CNPJ
 */
function validarCNPJ(cnpj) {
  const input = document.getElementById('inputCnpj');
  const feedback = document.getElementById('feedbackCnpj');

  if (/^(\d)\1+$/.test(cnpj) || cnpj.length !== 14) {
    aplicarStatus(input, feedback, false, 'CNPJ inválido');
    return;
  }

  let tamanho = cnpj.length - 2;
  let numeros = cnpj.substring(0, tamanho);
  let digitos = cnpj.substring(tamanho);
  let soma = 0;
  let pos = tamanho - 7;

  for (let i = tamanho; i >= 1; i--) {
    soma += parseInt(numeros.charAt(tamanho - i)) * pos--;
    if (pos < 2) pos = 9;
  }

  let resultado = soma % 11 < 2 ? 0 : 11 - (soma % 11);
  if (resultado !== parseInt(digitos.charAt(0))) {
    aplicarStatus(input, feedback, false, 'CNPJ inválido');
    return;
  }

  tamanho = tamanho + 1;
  numeros = cnpj.substring(0, tamanho);
  soma = 0;
  pos = tamanho - 7;

  for (let i = tamanho; i >= 1; i--) {
    soma += parseInt(numeros.charAt(tamanho - i)) * pos--;
    if (pos < 2) pos = 9;
  }

  resultado = soma % 11 < 2 ? 0 : 11 - (soma % 11);
  if (resultado !== parseInt(digitos.charAt(1))) {
    aplicarStatus(input, feedback, false, 'CNPJ inválido');
    return;
  }

  // Quando Válido: apenas fica verde, sem texto de mensagem
  aplicarStatus(input, feedback, true);
}

/**
 * Aplica os estados visuais de erro ou sucesso
 */
function aplicarStatus(input, feedbackEl, ehValido, msgErro = '') {
  input.classList.remove('valido', 'invalido');
  feedbackEl.classList.remove('invalido');

  if (ehValido) {
    input.classList.add('valido');
    feedbackEl.innerText = ''; // Não exibe mensagem de texto quando estiver OK
  } else {
    input.classList.add('invalido');
    feedbackEl.classList.add('invalido');
    feedbackEl.innerText = msgErro; // Exibe mensagem de erro quando for inválido
  }
}

/**
 * Remove estados de validação quando o campo estiver incompleto
 */
function removerValidacao(input, feedbackEl) {
  input.classList.remove('valido', 'invalido');
  feedbackEl.classList.remove('invalido');
  feedbackEl.innerText = '';
}

/**
 * Limpa todos os feedbacks ao alternar entre CPF e CNPJ
 */
function limparFeedback() {
  removerValidacao(document.getElementById('inputCpf'), document.getElementById('feedbackCpf'));
  removerValidacao(document.getElementById('inputCnpj'), document.getElementById('feedbackCnpj'));
}
