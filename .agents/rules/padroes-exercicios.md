# Regra: Padrões de Projeto para Novos Exercícios (WEB II)

## 👤 Autor do Projeto
* **Autor Oficial:** `Luã Boldt`
* **Instituição / Disciplina:** `IFFar • Desenvolvimento Web II`
* *Nota:* Não utilizar o nome do usuário do sistema operacional da máquina nos metadados, `package.json`, rodapés, tags HTML `<meta name="author">` ou comentários de código. O autor é sempre **Luã Boldt**.

---

Ao criar ou atualizar qualquer exercício no projeto `exercicios/`:

1. **Estrutura de Pastas**:
   - Cada novo exercício deve ser criado em `exercicios/NN-nome-do-exercicio/` com `index.html`, `style.css` e `script.js`.
   - Adicionar uma entrada correspondente no menu da Landing Page (`exercicios/index.html`).
   - Incluir a tag `<meta name="author" content="Luã Boldt">` no `<head>` de todos os arquivos HTML.

2. **Tema Global e Menu Lateral Obrigatórios**:
   - Todo exercício deve importar no `<head>`:
     ```html
     <link rel="stylesheet" href="../global.css">
     <script src="../tema.js"></script>
     <script src="../menu.js"></script>
     ```
   - Utilizar as variáveis CSS de `global.css` (`--bg-app`, `--surface`, `--surface-alt`, `--text-main`, `--text-muted`, `--border-color`, `--input-bg`, `--input-border`, `--primary`, `--badge-bg`, `--badge-text`, `--badge-border`, `--tag-bg`, `--tag-text`, `--tag-border`).

3. **Layout e Componentes**:
   - Usar tipografia `'Outfit', sans-serif`.
   - Incluir a barra superior `.top-nav` com o botão `.btn-voltar` para `../index.html` e a `.badge-tag`.
   - O menu lateral de navegação deslizante (*Sidebar Drawer*) é injetado automaticamente via `menu.js` para permitir transição direta entre atividades.
   - Centralizar o conteúdo com `.container` e `.card`.

4. **Validações e Feedbacks**:
   - **Válido**: Borda verde esmeralda com fundo verde vibrante iluminado (`#ecfdf5` no claro / `rgba(16, 185, 129, 0.22)` no escuro) e anel de brilho. **Sem mensagem de texto**.
   - **Inválido**: Borda vermelha com fundo vermelho vibrante iluminado (`#fef2f2` no claro / `rgba(239, 68, 68, 0.22)` no escuro), anel de alerta e **mensagem de erro visível** em `.feedback-msg.invalido`.
   - **Incompleto**: Estado neutro limpo sem cores de erro/sucesso.

5. **Consistência Autônoma**:
   - Manter estilos e scripts principais também presentes em `index.html` com o script de auto-ajuste de rota caso a URL seja acessada sem barra final.

6. **Evolução Contínua dos Padrões (Auto-documentação Obrigatória)**:
   - Sempre que for criado ou implementado algo novo que o padrão atual ainda não previa (ex: novos componentes como modais, tabelas, alertas, contadores, seletores, novos padrões de formulário, animações, etc.), **deve-se obrigatoriamente registrar e documentar o novo padrão no arquivo `PADROES.md`** e atualizar esta regra interna para que as próximas atividades sigam esse novo padrão de forma consistente.
