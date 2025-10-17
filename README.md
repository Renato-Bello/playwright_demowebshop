# 🧪 Playwright Demo Web Shop (Template)
Automação E2E com **Playwright + TypeScript**, arquitetura com **Page Object Model (POM)**, **fixtures** e artefatos configurados (**screenshots, trace e video on failure**).

## Scripts
- `npm install`
- `npx playwright install`
- `npm test` / `npm run test:ui`
- `npm run report`

## Artefatos (config padrão)
- `screenshot: 'only-on-failure'`
- `video: 'retain-on-failure'`
- `trace: 'retain-on-failure'`

## Estrutura
```
tests/
  fixtures/     # test + fixtures (page objects injeção)
  pages/        # Page Objects
  specs/        # Testes
  utils/        # dados/messages
playwright.config.ts
```

## Base URL
Defina `BASE_URL` se quiser trocar o alvo (default: https://demowebshop.tricentis.com).
