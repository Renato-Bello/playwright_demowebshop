# 🧪 Playwright Demo Web Shop

Este projeto realiza **testes automatizados end-to-end (E2E)** no site [Demo Web Shop](https://demowebshop.tricentis.com/) utilizando **Playwright com TypeScript**.

---

## 🚀 Tecnologias utilizadas
- [Playwright](https://playwright.dev/)
- TypeScript
- Node.js

---

## 🧱 Estrutura do projeto

```
playwright_demowebshop/
├── tests/
│   ├── pages/         # Page Objects (LoginPage, CartPage, etc.)
│   ├── specs/         # Casos de teste (login.spec.ts, cart.spec.ts, logout.spec.ts)
│   └── tests-examples/
├── playwright.config.ts
├── package.json
├── .gitignore
└── README.md
```

---

## ⚙️ Instalação

1. Instale as dependências:
```bash
npm install
```

2. Para garantir que o Playwright baixe os navegadores necessários:
```bash
npx playwright install
```

---

## ▶️ Execução dos testes

Executar todos os testes (modo headless):
```bash
npx playwright test
```

Executar os testes com navegador visível:
```bash
npx playwright test --headed
```

Abrir o modo visual interativo (UI):
```bash
npx playwright test --ui
```

Gerar e abrir relatório HTML:
```bash
npx playwright show-report
```

---

## 🧩 Testes implementados

### 🔐 Login
- Login bem-sucedido com credenciais válidas  
- Login inválido com e-mail ou senha incorretos  
- Validação de campos obrigatórios vazios

### 🛒 Carrinho
- Adicionar produto ao carrinho  
- Remover produtos do carrinho  
- Validação de mensagem quando campo obrigatório não é preenchido

### 🚪 Logout
- Logout realizado com sucesso

---

## 🧰 Autor
**Renato Stabelino Dal Bello**  
📍 São Paulo – SP  
💼 Projeto para estudos em automação de testes com Playwright  
🔗 [LinkedIn](https://www.linkedin.com/in/renato-bello/)

---

## 🧾 Licença
Este projeto é de uso livre para fins de estudo e aprendizado.
