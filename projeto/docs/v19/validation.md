# Validação e entrega V19

## Método e evidências

Testes de modelo por Node e navegador Chromium/Playwright; exportação real por download, leitura via `pdfinfo`/`pdftotext` e inspeção visual das páginas rasterizadas com `pdftoppm`. A revisão visual foi feita em capturas do navegador e dos PDFs, não em uma sessão presencial de teste com usuários.

O cenário brasileiro reproduz as condições do pedido com o esquema ilustrativo `public/scene-garden.png`: Itapeva, 20 m², solo aparentemente lento, sol pleno, molhado, três pontos de acúmulo, três saídas de telhado e uma superfície pavimentada. O cenário regional documentado usa Iowa, solo intermediário, sol pleno, molhado, água por horas e afastamento declarado.

Os exemplos de PDF e imagens não são evidências de resultados ambientais; servem para verificar composição, texto e paginação.

## Comandos

```sh
npm install
npm run build
npm test
npm run test:selection
node tests/science.mjs
node tests/v14-analysis.mjs
node tests/v15-model.mjs
node tests/v16-model.mjs
node tests/v17-gallery.mjs
node tests/v18-model.mjs
npm run test:v19:model
# Com Vite rodando em 5176:
node tests/science-browser.mjs
node tests/v14-browser.mjs
node tests/v15-browser.mjs
node tests/v16-browser.mjs
npm run test:herbarium
node tests/v18-browser.mjs
CHROMIUM_PATH=/usr/bin/chromium npm run test:accessibility
npm run test:six
npm run test:v19:browser
node tests/v19-visual-regressions.mjs
```

O verificador de fontes React Bits confirma 26 componentes oficiais preservados; isso, isoladamente, não valida sua execução. Os testes de navegador exercitam os componentes relevantes, distinguindo visibilidade de canvas, mudança de quadros, interação e regressões funcionais nos resultados JSON.

Dois testes antigos foram ajustados à implementação atual, mantendo seus objetivos: V18 agora inspeciona elementos SVG botânicos no lugar do antigo DOM de fotos; o teste de acessibilidade abre as abas móveis Ferramentas/Imagem antes de acionar controles que já estavam organizados nesses painéis.

## Fluxos V19

- Agrupamento das áreas 01, 02 e 03; sete observações preservadas.
- Nenhuma seleção automática brasileira inventada.
- Estudo exploratório A/B com limites explícitos, arraste e controles.
- Independência entre alternativas, comparação original/proposta e PNG.
- Salvamento IndexedDB, reabertura e transporte por JSON em outro contexto do navegador.
- Composição botânica documentada de Iowa com fotos de Lobelia siphilitica e Carex vulpinoidea.
- PDF direto e impressão A4; conteúdo textual, fontes e bibliografia.
- 1440, 1280, 768, 390 e 360 px sem overflow nos cenários testados; zoom 200%, movimento reduzido e foco de modal por teclado.

Os JSON de resultados e PDFs de amostra são gerados em `work/v19/`, disponibilizados como artefato do workflow e copiados para `validation/` na entrega. O build mantém um aviso de chunk principal maior que 500 kB; a geração PDF é carregada sob demanda. Não houve auditoria Lighthouse, certificação WCAG ou validação técnica de campo.

## Publicação isolada

Workflow: `.github/workflows/preview-v19.yml`. Destino único: `gh-pages:previews/conflora-v19/`; `keep_files: true`. Os testes antecedem a publicação e o workflow guarda artefatos de validação. `version.json` identifica V19, base V18 e, em Actions, SHA do código de origem.

A verificação final compara a árvore da raiz de gh-pages e o hash do diretório V18 antes/depois, consulta o resultado real do Actions e testa o fluxo na URL pública. O estado final da publicação é registrado no arquivo de entrega.
