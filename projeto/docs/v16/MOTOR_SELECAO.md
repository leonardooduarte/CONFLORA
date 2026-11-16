# CONFLORA V16 — Seleção explicável

O motor conservador `src/core/selection.js` e a categorização por campo em `src/core/evidence.js` foram preservados.

- `src/data/evidenceClaims.json` inclui o estudo de inundação controlada de *Inga affinis* como `floodResponse`, evidência de **resposta de mudas**, com `matching:false` para não virar falsa elegibilidade.
- `src/core/siteAnalysis.js` continua tratando acúmulo persistente, construções próximas e drenagem lenta como razões para priorizar avaliação técnica.
- `src/features/PersonalizedOutcome.jsx` organiza as observações por área, calcula o estado individual com `assessSite`, informa hipóteses condicionadas, explica lacunas e vincula as espécies realmente documentadas às fontes.
- Espécies de interesse salvas pelo usuário não são tratadas como plantas efetivamente instaladas.
- Quando não há dados apropriados para espécie brasileira, a ausência de correspondências é informada; nenhuma taxa de absorção de água foi inventada.

**Limitação:** a pesquisa adicional desta rodada não resolveu a ausência de parâmetros transferíveis para espécies brasileiras. Isso impede ampliar de modo responsável as sugestões locais automáticas.
