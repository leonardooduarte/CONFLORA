# Auditoria CONFLORA — 15/11/2026

## Estado recebido
O ZIP tinha src/components/reactbits vazio. Os oito imports existiam, assim como scripts para baixar e conferir os arquivos, mas nenhum componente estava instalado. As dependências estavam declaradas, sem lockfile. O vídeo conflora3.mp4 foi inspecionado como referência: abertura com trecho vazio e Stepper estreito e cinza.

## Consulta oficial e instalação
Cada registro https://reactbits.dev/r/NOME-JS-CSS.json foi consultado diretamente:

| Componente | Recebido | Integração nesta revisão / verificação |
|---|---|---|
| ScrollExpand | Ausente | Original instalado; clip-path antes/depois e posição sticky conferidos no Chromium |
| Stepper | Ausente; defaults inadequados no App | Original instalado; tema claro, largura total, cores CONFLORA; quatro passos e conclusão testados |
| AnimatedContent | Ausente | Original instalado; entrada por scroll e opacidade final verificadas |
| MorphSlider | Ausente | Original instalado; canvas e mudança para segundo slide testados |
| SplitText | Ausente; tag padrão p dentro de h1 | Original instalado; tag span e herança tipográfica; título renderizado conferido |
| RippleDistortion | Ausente | Original instalado; canvas, interação com ponteiro e captura com ondas inspecionados |
| SpringCheck | Ausente | Original instalado; clique e teclado alteram aria-checked e estado do projeto |
| CircularText | Ausente | Original instalado; transformação de rotação muda entre amostras |

Arquivos oficiais JSX/CSS preservados sem alterações. docs/reactbits-provenance.json guarda URLs, dependências e SHA-256. O build verifica os hashes. Licença original em docs/REACT_BITS_LICENSE.
npm install executado e package-lock.json gerado. O primeiro setup falhou porque fetch não usava o proxy do ambiente; NODE_USE_ENV_PROXY=1 npm run setup:reactbits concluiu o download. Em rede sem proxy, use npm run setup:reactbits normalmente. As dependências dos registros já estavam todas declaradas.

## Correções na aplicação
- overflow:clip no contêiner, permitindo sticky com scroll da janela; overflow:hidden criava um ancestral de rolagem incompatível.
- ScrollExpand: quadro inicial de 78% × 72%, zoom 1.08, expansão 0.8 viewport e pausa 0.15. Implementação e interpolação originais.
- Stepper: tema light, largura 100%, raio 13, variáveis de cores oficiais com identidade CONFLORA, botão final traduzido.
- Removida regra [class*="stepper"] que aplicava max-width e margin:auto indiscriminadamente aos descendentes.
- SplitText usa span no título; fonte, margem e line-height herdados.
- Menos espaço vertical na abertura, seções e plano; ajustes em telas estreitas.
- Corrigidas legendas que exibiam literalmente {text.plan}, {text.compare} e {text.kit}.
- Editor, armazenamento, relatórios, comparação, diário e modelo V11 preservados. Nenhum arquivo src/core foi alterado.

## Verificação executada
- npm install: passou.
- npm run setup:reactbits com suporte ao proxy: passou, oito registros.
- npm run build: passou; aviso de bundle JS de ~645 kB (~216 kB gzip).
- npm run test:static: passou. O aviso final desse teste descreve apenas os limites do próprio teste estático.
- tests/browser-check.mjs: passou no Chromium headless do ambiente com WebGL via SwiftShader, sem pageerror.
- Upload de fotografia, adicionar marcação, desfazer/refazer, comparação com fração 30%, salvar e listar projeto, quatro passos, edição de contexto, download JSON, relatório PNG 1400 px, geração de PDF, checklist por clique/teclado e diário testados.
- Capturas desktop 1440×900 e abertura mobile 390×844; sem overflow horizontal na abertura mobile.
- Evidências em evidencias/ no ZIP. O PDF foi gerado via Chromium; não equivale a testar a caixa de diálogo nativa de impressão do Windows.

Para repetir: npm ci; npm run build; npm run test:static. Inicie npm run dev -- --port 5173 e, em outro terminal, execute npm run test:browser. Instale o Chromium Playwright com npx playwright install chromium, ou defina CHROMIUM_PATH para o navegador local (no ambiente foi /usr/bin/chromium).

## Limites e pendências
- Não é certificação de equivalência pixel a pixel às demos oficiais, nem teste de todas as propriedades opcionais dos componentes.
- GPU física, Safari, Firefox e celular real não foram testados. WebGL precisa ser validado nesses dispositivos.
- Mobile: a abertura foi inspecionada; todos os módulos ainda precisam de uma rodada completa em celular.
- Otimização do bundle continua pendente; não impede o build.
- Fontes Google continuam externas; aparência offline depende dos fallbacks.
- Importação JSON, exclusão de projeto e arraste de marcações não foram cobertos nesta rodada de regressão.
- O módulo do kit continua demonstrativo, como no projeto recebido.
- O ZIP recebido não contém .git nem vínculo com repositório remoto. Esta revisão foi adicionada em projeto/ numa branch separada; a publicação estática e a branch principal foram preservadas.
