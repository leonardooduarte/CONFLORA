# CONFLORA V15 — Entrega de implementação

## Base
Branch `feat/conflora-v15-evidence-scenarios-20261116`, originada da V14 validada `feat/conflora-v14-area-intelligence-20261116`, commit `937280788ebb8fc5008dcdb201d8b8285cec225a`.

## Implementado
- Três novas fichas informativas brasileiras com estudos primários verificáveis; 18 fichas no catálogo, sem taxas fictícias ou imagens não licenciadas.
- Associação de fontes a taxonomia, região, luz/umidade e estudos por espécie em `evidenceClaims.json`.
- Consulta às correspondências, contradições e lacunas na interface do Herbário.
- Comparação visual de terreno observado, composição A e B, com snapshots não destrutivos guardados em projeto local.
- Cenários usados no editor, no plano e no relatório, com importação/exportação compatível.
- Imagens oficiais, identidade CONFLORA, galeria InfiniteMenu e componentes React Bits preservados.

## Restrições
- A maioria das novas espécies brasileiras continua sem critérios ecológicos transferíveis para seleção residencial: elas são registros de pesquisa, não recomendação de plantio.
- Não foi medida nem simulada a absorção de água das espécies.
- Não foi feita recomendação técnica para Itapeva e não há avaliação por especialista.
- Novas fotos de espécies: pendentes por falta de fonte/licença identificada.
- Publicação e aprovação de CI: conferir workflow antes de informar conclusão.
