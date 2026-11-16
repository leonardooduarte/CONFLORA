# Plano de verificação da V18

## Automatizados
- `node tests/v18-model.mjs`: BR sem falsa recomendação, fotos licenciadas disponíveis, 2 áreas, bloqueio em risco, Iowa com correspondência documental, A/B, migração V12, região desconhecida.
- `node tests/v18-browser.mjs`: jornada de upload, condições brasileiras, quadro de fotos, bloqueio de proposta quando não segura, relatório no navegador, PDF A4 em Chromium, layout 390 px.
- Regressões existentes: `npm run build`, `npm test`, `npm run test:selection`, science, v14, v15, v16 e galeria v17.

## Não demonstrado
- Testes com pessoas reais.
- Validação profissional de campo ou dimensionamento hidrológico.
- Fotomontagem fotorealista.
- Reprodutibilidade em Safari/iOS físico e verificação visual de todas as páginas do PDF.

Sempre consultar o resultado da execução do GitHub Actions antes de afirmar aprovação.
