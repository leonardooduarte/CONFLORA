# CONFLORA V14 — Leitura preliminar das áreas e evidências brasileiras

Base de código: `feat/conflora-evidence-analysis-20261116`, commit inicial `9b19ffaabc9d6cce0d255ac1d0ddf185959a350f`. Desenvolvimento isolado em `feat/conflora-v14-area-intelligence-20261116`.

## Funcionalidades efetivamente implementadas
- `src/core/siteAnalysis.js`: leitura reproduzível de observações por área, com distinção entre acúmulo relatado por horas, até um dia, persistente, drenagem aparentemente lenta e proximidade de construções.
- Alertas prioritários para água persistente próxima de edifícios; sem propor intervenção como solução segura nesses cenários.
- Alternativas vegetadas apresentadas como hipóteses condicionadas, com checagens de infiltração, fundações, redes e extravasamento; não são prescrições.
- `SiteReview.jsx`: resumo explicável na jornada fotográfica e no planejamento; `AreaComparison.jsx`: quadro comparativo qualitativo quando duas áreas têm condições diferentes.
- Uma ficha documental brasileira adicional, *Cyperus giganteus Vahl*, com duas fontes primárias, taxonomia aceita, fotografia ausente e limitações; não elegível à seleção de plantio por falta de parâmetros transferíveis.
- Catálogo passa de 14 para 15 fichas documentais, permanecendo as limitações de dados brasileiros. As imagens e componentes React Bits existentes não foram modificados.
- Regras puras sem imagens/IA, sem cálculos de vazão, volume retido ou taxas fictícias; dados dos projetos mantidos em IndexedDB e no formato anterior.

## Ações pendentes
- Não foi validada adequação de plantio para Itapeva; o estudo ecológico da nova espécie não mede desempenho de jardim de chuva.
- Outras candidatas brasileiras da matriz exigem acesso a estudos primários com parâmetros transferíveis; não foram cadastradas sem evidências.
- A comparação é documental, não uma previsão hidráulica de cenários. Não implementa dimensionamento de jardins de chuva.
- O uso em Safari, hardware físico e a revisão por botânico/engenheiro ainda exigem trabalho adicional.

## Validação
Resultados de CI e endereço de prévia devem ser conferidos na execução real do GitHub Actions antes de serem declarados aprovados.
