# CONFLORA V15 — Plano de validação

A implementação introduz:
- `tests/v15-model.mjs`: evidência por campo, 18 fichas, não elegibilidade de pesquisas brasileiras, A/B independentes e migração de projetos 11/12.
- `tests/v15-browser.mjs`: foto, salvamento de composição A, navegação ao planejamento, catálogo e evidências, responsividade.
- Regressão: V13 ciência, V14 áreas, Herbário e build React Bits.

## Execução confirmada
[GitHub Actions #43895584137](https://github.com/leonardooduarte/CONFLORA/actions/runs/43895584137), commit `7e9020f6e331f9897085cc0ad23f5d665910d823`: **concluída com sucesso**. Antes dela houve duas tentativas com falhas no roteiro V15: uma tentou abrir a auditoria sem expandir o painel existente e outra deixou de selecionar a região do terreno; o roteiro e a mensagem de contexto desconhecido foram corrigidos. O fluxo principal da V14 havia passado nessas duas tentativas.

Comandos realmente aprovados na execução final:
- `npm ci`; `npm run build` e verificação dos componentes React Bits
- `npm test`; `npm run test:selection`
- `node tests/science.mjs`; `node tests/v14-analysis.mjs`; `node tests/v15-model.mjs`
- `node tests/science-browser.mjs`; `node tests/v14-browser.mjs`; `node tests/v15-browser.mjs`; `npm run test:herbarium` em Chromium
- Publicação isolada da prévia.

A saída do build emitiu aviso não bloqueante sobre bundle principal grande.

## Publicação verificada
https://leonardooduarte.github.io/CONFLORA/previews/conflora-v15/

Após publicação, foram confirmados por API na branch `gh-pages`: `previews/conflora-v15/index.html`, ativos JS/CSS e fotografias. Os SHA dos cinco arquivos visuais `conflora-*.webp` coincidem com a raiz oficial do site. A raiz publicada foi mantida; apenas uma nova subpasta foi criada.

## Limites
A execução é automatizada no Chromium, sem inspeção manual no navegador público ou Safari/iOS físico. Não prova adequação hidrológica, botânica nem desempenho de infiltração ou teste com pessoas reais.
