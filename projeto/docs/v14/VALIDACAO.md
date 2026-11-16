# CONFLORA V14 — Validação registrada em 16/11/2026

## Execução verificada
- Workflow: https://github.com/leonardooduarte/CONFLORA/actions/runs/43887671286
- Commit testado e publicado: `6a8de7cceb5e422da4c47dcfb67b9b970750cbf2`
- Resultado: **success**, após execução completa do GitHub Actions no Ubuntu / Node.js 22.

## Testes executados e aprovados
- `npm ci`
- `npm run build`, inclusive checagem da integridade dos componentes React Bits
- `npm test` — verificações estáticas e modelo
- `npm run test:selection`
- `node tests/science.mjs` — quinze espécies, evidência regional, origem de imagem
- `node tests/v14-analysis.mjs` — riscos por área, solo, ausência de dados, dois contextos de terreno, migração
- `node tests/science-browser.mjs` — jornada da fotografia ao Herbário em Chromium
- `node tests/v14-browser.mjs` — foto, condições, avisos, espécie documental, galeria, largura móvel
- `npm run test:herbarium` — regressão do Herbário e percursos associados em Chromium

## Publicação
Prévia publicada em `https://leonardooduarte.github.io/CONFLORA/previews/conflora-v14/`.
Foi confirmado via API do GitHub, após o workflow, que a branch `gh-pages` contém `previews/conflora-v14/index.html` e os artefatos JavaScript, CSS e fotografias. Os SHA dos cinco arquivos visuais `conflora-*.webp` da prévia são idênticos aos da raiz do site oficial. O HTML principal não foi substituído.

## Limitações
- Os testes foram executados em ambiente automatizado; não houve inspeção manual da prévia publicada em dispositivo físico nem teste independente de Safari/iOS.
- O navegador de pesquisa desta sessão não conseguiu acessar o endereço público diretamente, embora a publicação e os artefatos sejam confirmados no GitHub Pages.
- O sistema não mede infiltração, vazão, retenção, evapotranspiração de cada planta ou resultados reais de drenagem.
- Uma única espécie brasileira foi adicionada como **ficha de pesquisa**, não indicação de plantio. A seleção brasileira ainda requer dados experimentais mais diretamente aplicáveis.
- A aparência final e o uso por residentes não foram formalmente avaliados por especialistas ou em campo.

Não representar esta validação como certificação de engenharia, botânica ou desempenho hidrológico.
