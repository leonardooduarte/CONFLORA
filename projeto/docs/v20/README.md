# CONFLORA V20 — Jornada de planejamento (prévia isolada)

Base oficial e preservada: feat/conflora-herbarium-completeness @ ea79ff3bb864e5be659f5dde77d0cea1cca8cee3. A V20 tem branch exclusiva feat/conflora-v20-planning-journey e não altera a raiz oficial.

## Implementações

- src/core/v20Insight.js: explicação determinística das observações, com lacunas, cuidados e tarefas de acompanhamento. Reutiliza o motor de evidências V19. Não infere foto, não mede água, não pontua adequação e não recomenda plantio sem documentação.
- src/features/V20Insight.jsx e V20Insight.css: síntese contextual, evidência, próximos passos com motivo e instrução, indicação da origem das condições (terreno, área, desconhecido).
- Comparativo A/B baseado exclusivamente nos elementos e observações efetivamente salvos, sem classificação hidráulica.
- StudioJourney: etapa 04 de análise e explicitação das condições locais e herdadas.
- App: atalhos para ferramentas essenciais sem remover controles anteriores.
- reportPDF.js: PDF direto inclui síntese e verificações V20; referências e anexos anteriores permanecem.

## Caso de aceitação

Itapeva/SP, 20 m², sol pleno declarado, solo aparentemente lento, umidade molhada, 3 marcas de água acumulada, 3 saídas do telhado e 1 pavimentação. Deve exibir observações e verificações úteis **sem espécie inventada nem declaração de melhora de drenagem**.

## Testes

Node: tests/v20-model.mjs. Chromium: tests/v20-browser.mjs com tela 1440/768/390/320, editor, orientação, A/B, idiomas e PDF. Regressões com V19-model, V19-browser, navegador botânico, acessibilidade e build. Capturas são disponibilizadas apenas quando a execução termina com sucesso.

Esta alteração não toca o globo nem as experiências visuais experimentais. A promoção à versão oficial depende de revisão visual e aprovação explícita.
