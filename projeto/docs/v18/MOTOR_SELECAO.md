# Motor V18 — seleção e geração

Código: `src/core/v18Proposal.js`.

## Classes
- **candidate**: região pertinente, luz **e** umidade informadas e `evaluatePlantEvidence` com status `documented`. O estado ainda exige avaliação local.
- **research**: registros brasileiros do experimento em Bauru com imagem/licença verificadas e fonte `br`, *sem* equivaler a recomendação.
- **risk**: área com `assessSite().needsAssessment` ou solo aparentemente lento; bloqueia desenho automático de plantio.

## Pré-condições para esboço A/B
A marcação deve ter pelo menos uma candidata documentada; avaliação `exploratory`; solo `medium` ou `fast`; duração da água `hours` ou `day`; construções afastadas (`building='away'`). Riscos prioritários bloqueiam a operação. Se insuficiente, a interface exibe o motivo e mantém a foto original intacta.

## Persistência
Usa o esquema V12 de `project.scenarios.A/B.markers` já suportado por `normalizeProject`, evitando novas migrações. IDs determinísticos de rascunho; cada cenário é independente e editável após carregamento no editor.

## Ciência
Sem pontuação arbitrária de eficácia, sem análise automatizada de fotografias, sem simular hidrogeologia ou crescimento vegetal.
