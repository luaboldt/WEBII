# 📚 Exercícios de Desenvolvimento Web II (IFFar)

Landing page principal que serve como menu de acesso para todas as atividades práticas e exercícios da disciplina.

---

## 📁 Estrutura do Projeto

```
exercicios/
├── index.html                   # 🏠 Landing Page com o Menu de Exercícios
├── style.css                    # Estilos da Landing Page
├── package.json                 # Scripts do Node.js (npm start)
│
└── 01-tema-claro-escuro/        # ☀️🌙 Exercício 01
    ├── index.html
    ├── style.css
    └── script.js
```

---

## ➕ Como Adicionar um Novo Exercício ao Menu

1. Crie uma pasta para o novo exercício (exemplo: `02-nome-do-exercicio/`):
   * `02-nome-do-exercicio/index.html`
   * `02-nome-do-exercicio/style.css`
   * `02-nome-do-exercicio/script.js`

2. Adicione uma nova entrada no arquivo [`index.html`](file:///c:/Users/Angela%20Boldt/Documents/IFFar/WEBII/exercicios/index.html) dentro de `<section class="menu-exercicios">`:
   ```html
   <a href="02-nome-do-exercicio/index.html" class="card-link">
     <div class="card-numero">02</div>
     <div class="card-conteudo">
       <h2>Nome do Exercício</h2>
       <p>Breve descrição do que o exercício faz.</p>
       <span class="tag">JavaScript</span>
     </div>
     <div class="card-icone">➔</div>
   </a>
   ```

---

## 🚀 Como Executar

No terminal, dentro da pasta `exercicios`:
```bash
npm start
```
ou simplesmente abra o arquivo [`index.html`](file:///c:/Users/Angela%20Boldt/Documents/IFFar/WEBII/exercicios/index.html) no navegador.
