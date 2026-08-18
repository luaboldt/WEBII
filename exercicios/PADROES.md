# 🎨 Guia de Padrões e Design System — WEB II (IFFar)

Este documento estabelece as diretrizes visuais, regras de arquitetura, paleta de cores e componentes padrão para o projeto **`exercicios/`**. **Todos os novos exercícios devem seguir estritamente este guia.**

---

## 👤 Informações do Autor e Projeto
* **Autor:** **Luã Boldt**
* **Instituição:** Instituto Federal Farroupilha (IFFar)
* **Disciplina:** Desenvolvimento Web II
* **Meta Tag Obrigatória:** `<meta name="author" content="Luã Boldt">`

---

## 📁 1. Arquitetura e Estrutura de Pastas

Para cada novo exercício criado:
1. Deve ficar dentro de uma pasta no formato: `NN-nome-do-exercicio/` (ex: `03-mostrar-esconder-senha/`, `04-calculadora/`).
2. Conter 3 arquivos independentes:
   * `index.html` (com scripts e estilos principais também embutidos para garantir autonomia)
   * `style.css`
   * `script.js`
3. Incluir a importação dos utilitários globais de tema:
   * `<link rel="stylesheet" href="../global.css">`
   * `<script src="../tema.js"></script>`
4. Cadastrar o novo card no menu da Landing Page ([`index.html`](file:///c:/Users/Angela%20Boldt/Documents/IFFar/WEBII/exercicios/index.html)).

---

## 🎨 2. Paleta de Cores e Tokens CSS (`global.css`)

Todos os componentes devem consumir as variáveis CSS declaradas no `global.css`:

| Token CSS | Tema Claro | Tema Escuro | Finalidade |
| :--- | :--- | :--- | :--- |
| `--bg-app` | `#f8fafc` | `#0b1120` | Fundo principal da página |
| `--surface` | `#ffffff` | `#1e293b` | Fundo dos cards, header e footer |
| `--surface-alt` | `#f1f5f9` | `#0f172a` | Fundo secundário (containers de radio/tags) |
| `--text-main` | `#0f172a` | `#f8fafc` | Texto principal (títulos e labels) |
| `--text-muted` | `#64748b` | `#94a3b8` | Textos secundários, legendas e subtítulos |
| `--border-color` | `#e2e8f0` | `#334155` | Bordas de containers, cards e divisórias |
| `--input-bg` | `#ffffff` | `#0f172a` | Fundo padrão dos campos de entrada |
| `--input-border` | `#cbd5e1` | `#475569` | Borda neutra dos campos de entrada |
| `--primary` | `#4f46e5` | `#818cf8` | Cor primária / destaque (Índigo) |
| `--badge-bg` | `#eef2ff` | `#0f172a` | Fundo do número/badge de identificação |
| `--badge-text` | `#4f46e5` | `#a5b4fc` | Texto do número/badge |
| `--badge-border` | `#e0e7ff` | `#334155` | Borda do número/badge |

---

## 🛡️ 3. Padrão de Validação e Feedback dos Inputs

A validação dos formulários deve ser **automática ao digitar** ou preencher o campo:

### 🟢 Estado VÁLIDO
* **Comportamento:** Apenas o campo fica verde vibrante com anel de brilho. **Não exibe mensagem de texto de sucesso.**
* **Tema Claro:** `border: 2px solid #10b981 !important; background-color: #ecfdf5 !important; color: #065f46; box-shadow: 0 0 0 4px rgba(16, 185, 129, 0.25);`
* **Tema Escuro:** `border: 2px solid #34d399 !important; background-color: rgba(16, 185, 129, 0.22) !important; color: #ecfdf5; box-shadow: 0 0 16px rgba(52, 211, 153, 0.35);`

### 🔴 Estado INVÁLIDO
* **Comportamento:** O campo fica vermelho vibrante e **exibe a mensagem de erro** logo abaixo do input (`.feedback-msg.invalido`).
* **Tema Claro:** `border: 2px solid #ef4444 !important; background-color: #fef2f2 !important; color: #991b1b; box-shadow: 0 0 0 4px rgba(239, 68, 68, 0.25);`
* **Tema Escuro:** `border: 2px solid #f87171 !important; background-color: rgba(239, 68, 68, 0.22) !important; color: #fef2f2; box-shadow: 0 0 16px rgba(248, 113, 113, 0.35);`

### ⚪ Estado INCOMPLETO / NEUTRO
* Remove todas as classes de validação e limpa a mensagem de erro.

---

## 🧩 4. Componentes Estruturais Padrão

### 1. Barra de Navegação Superior (`.top-nav`)
Fica posicionada no topo da tela e contém o botão de retorno e a identificação do exercício:
```html
<header class="top-nav">
  <a href="../index.html" class="btn-voltar">
    ← Voltar aos Exercícios
  </a>
  <span class="badge-tag">Exercício NN • Nome da Categoria</span>
</header>
```

### 2. Card Centralizador (`.container` & `.card`)
Centraliza vertical e horizontalmente a atividade:
```html
<main class="container">
  <div class="card">
    <h1>Título da Atividade</h1>
    <p class="descricao">Descrição curta do que o exercício faz.</p>
    <!-- Conteúdo / Formulário / Botões -->
  </div>
</main>
```

### 3. Campo com Botão de Ação Acoplado (Ex: Mostrar/Esconder Senha)
Para inputs que possuem botões integrados no lado direito (como alternador de senha):
```html
<div class="form-group">
  <label for="campoSenha">Senha:</label>
  <div class="input-senha-wrapper">
    <input type="password" id="campoSenha" placeholder="Digite sua senha...">
    <button type="button" id="btnToggleSenha" class="btn-toggle-senha" onclick="alternarSenha()">
      👁️ Mostrar
    </button>
  </div>
</div>
```

### 4. Menu Lateral Deslizante (*Sidebar Drawer Navigation*)
Permite que o usuário navegue diretamente entre todos os exercícios do projeto sem precisar voltar à Landing Page:
- Injetado e controlado via `menu.js`.
- Fornece botão de abertura flutuante no topo esquerdo, painel deslizante com backdrop blur, lista de exercícios com identificadores, link rápido para a Home, indicador de página atual e suporte a fechar por `ESC` ou clique fora.
- Importação obrigatória no `<head>`:
  ```html
  <script src="../menu.js"></script>
  ```

---

## 🔄 5. Regra de Evolução Contínua dos Padrões (Auto-documentação)

Sempre que um novo exercício demandar elementos ou comportamentos não previstos anteriormente:
1. **Documentar Imediatamente:** O novo padrão (novo componente, novo estilo de tabela, novo layout de listagem, etc.) deve ser formalizado neste documento [`PADROES.md`](file:///c:/Users/Angela%20Boldt/Documents/IFFar/WEBII/exercicios/PADROES.md) e na regra interna [`.agents/rules/padroes-exercicios.md`](file:///c:/Users/Angela%20Boldt/Documents/IFFar/WEBII/.agents/rules/padroes-exercicios.md).
2. **Reaproveitamento Obrigatório:** Todos os exercícios subsequentes que utilizarem funcionalidade semelhante devem seguir o padrão que acabou de ser registrado.

---

## 📋 6. Template Boilerplate para Novos Exercícios

Copie a estrutura abaixo para criar rapidamente o próximo exercício (`04-...`):

### `index.html`:
```html
<!DOCTYPE html>
<html lang="pt-BR">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta name="author" content="Luã Boldt">
  <title>Exercício NN - Título do Exercício</title>

  <!-- Auto-ajuste de rota caso falte a barra -->
  <script>
    if (window.location.pathname && !window.location.pathname.endsWith('/') && !window.location.pathname.endsWith('.html')) {
      window.location.replace(window.location.pathname + '/' + window.location.search + window.location.hash);
    }
  </script>

  <!-- Google Fonts -->
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Outfit:wght@400;500;600;700&display=swap" rel="stylesheet">
  
  <!-- Sistema Global de Temas e Menu Lateral -->
  <link rel="stylesheet" href="../global.css">
  <script src="../tema.js"></script>
  <script src="../menu.js"></script>

  <link rel="stylesheet" href="./style.css">
</head>
<body>

  <!-- Barra Superior -->
  <header class="top-nav">
    <a href="../index.html" class="btn-voltar">
      ← Voltar aos Exercícios
    </a>
    <span class="badge-tag">Exercício NN • Categoria</span>
  </header>

  <!-- Conteúdo Principal -->
  <main class="container">
    <div class="card">
      <h1>Título do Exercício</h1>
      <p class="descricao">Descrição ou instrução da atividade.</p>

      <!-- Elementos do Exercício Aqui -->
    </div>
  </main>

  <script src="./script.js"></script>
</body>
</html>
```

---

## 📌 7. Card na Landing Page ([`index.html`](file:///c:/Users/Angela%20Boldt/Documents/IFFar/WEBII/exercicios/index.html))

Para cada novo exercício, adicione este bloco dentro de `<section class="menu-exercicios">`:

```html
<a href="NN-nome-do-exercicio/index.html" class="card-link">
  <div class="card-numero">NN</div>
  <div class="card-conteudo">
    <h2>Título do Exercício</h2>
    <p>Breve descrição do funcionamento.</p>
    <span class="tag">JavaScript • DOM</span>
  </div>
  <div class="card-icone">➔</div>
</a>
```
