# CONFLORA V16 — Auditoria da V15 (16/11/2026)

## Versão e escopo
Fonte: branch `feat/conflora-v15-evidence-scenarios-20261116`, commit `5109ab9b2ea77b4b011b708661795a2499b21607` (último CI V15: concluído com sucesso). A V16 foi criada em `feat/conflora-v16-usability-science-20261116`. O site oficial e a raiz de `gh-pages` não são fontes React e não podem ser substituídos.

## Resultados da auditoria do código
- Foto local, marcações, condições por área, alertas de acúmulo e registro de plantas já existem. Não reconstruir.
- Cenários V15 A/B são snapshots independentes: podem ser salvos e comparados, porém **não havia ação para restaurar cenário A/B ao editor para revisá-lo**.
- O planejador lista observações e fontes em sequência longa, mas carece de síntese clara por área com próximos passos; os usuários precisam interpretá-la sozinhos.
- O Herbário contém 18 fichas; espécies brasileiras adicionais estão corretamente como estudos informativos e ainda faltam evidências transferíveis sobre luz e regimes de encharcamento para indicação local.
- React Bits e InfiniteMenu precisam continuar visíveis. Fotografias devem manter identidade e licença. O projeto é local-first (IndexedDB/JSON).
- Workflows anteriores disparavam suites completas em cada commit relevante, gerando e-mails de execuções falhas/canceladas durante iteração.

## Mudanças prioritárias
1. Recuperar/corrigir propostas A/B mantendo marcas originais e histórico de desfazer/refazer do `change()`; confirmação antes de substituir propostas locais e antes de regravar slot existente.
2. Visualizar legenda das espécies e intervenção, além de permitir retornar ao editor.
3. Criar resumo integrado por marcação no plano/relatório, com verificações e evidências; não calcular hidrologia.
4. Adicionar uma pesquisa brasileira com ensaio de alagamento controlado, mantendo status não elegível para indicação paisagística.
5. Separar CI rápido de execução completa de publicação, evitando disparos de testes pesados só por mudanças documentais.

Não foi realizado teste com participantes humanos nem revisão profissional de engenharia.
