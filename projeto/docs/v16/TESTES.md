# CONFLORA V16 — Validação

Testes novos:
- `node tests/v16-model.mjs`: taxonomia de ingá, limites da evidência, incompatibilidade com recomendação automática, restauração A/B, preservação de foto/marcações/caminhos, migração de projeto e fontes.
- `node tests/v16-browser.mjs`: fotografia, criar A, criar B, recuperar A após confirmação, preservar B, plano individual, catálogo com 19 fichas, galeria e mobile.
- Regressões V12–V15, build React Bits, seleção, Herbario e modo Chromium.

## Validação executada com sucesso
- [GitHub Actions V16 — Validated preview #43901755909](https://github.com/leonardooduarte/CONFLORA/actions/runs/43901755909)
- Commit efetivamente testado e publicado: `7d0e68193d3d3d0f7884319017f111b7deb460a6`
- Execução rápida [#43901722867](https://github.com/leonardooduarte/CONFLORA/actions/runs/43901722867): concluída com sucesso.
- Compilação (`npm run build`, incluindo verificação React Bits) e suites `npm test`, `npm run test:selection`, `node tests/science.mjs`, `node tests/v14-analysis.mjs`, `node tests/v15-model.mjs`, `node tests/v16-model.mjs`: **PASSOU**.
- Chromium: `node tests/science-browser.mjs`, `node tests/v14-browser.mjs`, `node tests/v15-browser.mjs`, `node tests/v16-browser.mjs`, `npm run test:herbarium`: **PASSOU**.
- O teste V16 falhou inicialmente no roteiro que tentou adicionar uma segunda marca exatamente no mesmo ponto e pressupôs duas marcas no cenário B. Corrigimos o teste para modificar efetivamente a proposta e verificar recuperação de A, atualização de A e preservação de B. A execução posterior passou.
- Bundle principal ainda apresentou aviso não bloqueante de tamanho; a versão não foi testada manualmente em iOS/Safari nem por participantes humanos.

## Publicação verificada
- Prévia isolada: https://leonardooduarte.github.io/CONFLORA/previews/conflora-v16/
- Confirmados pela API do GitHub Pages: `previews/conflora-v16/index.html`, `assets/` com JS e CSS de produção e fotos.
- Os cinco arquivos `conflora-courtyard.webp`, `conflora-groundcover.webp`, `conflora-observe.webp`, `conflora-paving.webp` e `conflora-water-roots.webp` têm SHA idêntico ao da raiz oficial publicada.
- O GitHub Pages principal não foi substituído; novo build publicado em subdiretório.

## Limites
CI automatizado em Chromium não substitui inspeção no dispositivo real, avaliação botânica de campo, projeto executivo de drenagem ou aferição de benefícios hidrológicos. Não há medição de litros absorvidos por espécie.
