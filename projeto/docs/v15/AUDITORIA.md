# CONFLORA V15 — Auditoria da base

## Fonte de código
A V15 foi criada de `feat/conflora-v14-area-intelligence-20261116`, commit `937280788ebb8fc5008dcdb201d8b8285cec225a`, sem copiar a distribuição de `gh-pages` nem alterar `main`. A V14 já tinha build/CI Chromium aprovados, catálogo de 15 fichas, jornada fotográfica e leitura contextual por área.

## O que a V14 já possuía
- Foto local convertida em imagem data URI e guardada em IndexedDB; editor com pontos, regiões, caminhos, etiquetas e opções de vegetação.
- Condições por marcação; `siteAnalysis.js` com alertas por acúmulo persistente, solo aparentemente lento e construções próximas.
- `selection.js` filtrando por região, luz/umidade documentadas; 4 estudos brasileiros originais, 6 fichas iniciais de Iowa, 4 adições posteriores de Iowa e *Cyperus giganteus* de pesquisa.
- Galeria InfiniteMenu aberta logo depois da busca, editor foto SVG, planejador, relatório e diário. Imagens oficiais recentes e React Bits originais a preservar.

## Lacunas abordadas
- As referências das fichas eram gerais, sem associação explícita a cada parâmetro específico.
- O usuário não podia guardar duas versões independentes de marcações hipotéticas e rever uma comparação com a fotografia original.
- Base brasileira escassa; acrescentar apenas pesquisas que tenham identificação taxonômica e estudos pertinentes, sem impor seleção de plantio sem dados adequados.

## Restrições
- Os dados de usuários permanecem locais; nenhuma imagem foi enviada a serviços externos.
- `main` não foi modificada; a versão principal do GitHub Pages é mantida.
- A produção agrícola/hidrológica real, adequação municipal e desempenho de chuva não são quantificados neste aplicativo.
