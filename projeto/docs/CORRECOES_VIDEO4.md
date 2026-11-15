# Correções da gravação conflora4.mp4

## Comportamento final

- **Plano concluído:** Stepper controlado pela aplicação, com resumo, campos preenchidos e botões para editar, salvar e reabrir relatório. Fechar o relatório não deixa a etapa vazia. A etapa permanece ao visitar editor/comparação/kit.
- **Trabalho em andamento:** novos projetos, importação e abertura de outro projeto passam por proteção quando há alterações ou rascunho do kit. É possível continuar editando, salvar antes de trocar ou descartar explicitamente. Se o armazenamento falhar, a troca não acontece. A abertura oferece “Continuar meu projeto”. O navegador recebe aviso de saída com alterações não salvas. Isso não é recuperação automática após uma falha do navegador.
- **Relatórios:** tela e PDF incluem cidade, área, solo, sol, acúmulo de água, observações e legenda numerada. A imagem PNG mantém as marcações numeradas, relacionadas à legenda do relatório. O JSON continua exportando todos os dados.
- **Galeria:** uma camada da aplicação pré-carrega as imagens e cobre a textura inicial do MorphSlider até detectar a primeira renderização com imagem. A interface apresenta carregamento, erro e nova tentativa. Nenhum código ou shader original foi modificado.
- **Fotografia legível:** marcações numeradas por padrão, nomes na seleção ou por opção “Nomes na imagem”, números correspondentes no painel lateral. “Adicionar no centro” distribui novos itens para evitar empilhamento exato; cliques na fotografia continuam respeitando a posição indicada pelo usuário.
- **Comparação:** explica que apenas jardins de chuva são intervenções do Depois; quando não há jardins, informa por que os lados são iguais e como desenhar uma possibilidade. Não inventa transformações na fotografia.
- **Experimente:** mostra a fotografia/esquema e as marcações do próprio projeto, com acesso ao editor e à comparação, em vez da imagem genérica.
- **Abertura:** a mídia do ScrollExpand usa contain, sem zoom adicional, e há faixa reservada para título/CTA, separada das legendas do esquema. A expansão, suavização e transições continuam sendo as oficiais.
- **Kit:** cartões alinhados ao conteúdo, menos preenchimento e mensagem de diário vazio. Rascunhos entram na proteção e na ação Salvar.
- **Diálogos:** foco inicial, contenção do Tab e cancelamento por Escape.

## Verificação

Instalação: `npm ci`.

```sh
npm run build
npm run test:static
# Com o Vite iniciado em outro terminal:
npm run test:browser
npm run test:video4
```

Instale o navegador com `npx playwright install chromium`, ou informe `CHROMIUM_PATH`. É possível usar `BASE_URL` (padrão http://localhost:5173) e `TEST_OUTPUT`.

Executado no ambiente: Chromium headless, desktop 1440×900 e viewport mobile 390×844, WebGL via SwiftShader. Evidências em `evidencias/video4/` e resultados de animações gerais em `evidencias/`.

O teste de regressão cobre cancelar/salvar/descartar, rascunho salvo e reabertura, armazenamento indisponível, edição após conclusão, campos em tela/impressão, imagem personalizada no passo Experimente, marcações numeradas, arraste/desfazer, comparação com e sem jardim, carregamento lento, falha/retry da galeria e transição original. Em viewport mobile foram percorridos editor, galeria, kit, formulário do plano, relatório e conclusão; não houve overflow horizontal nos módulos verificados.

O PDF foi aberto como imagem e seu texto foi extraído para conferir os campos. Os oito componentes oficiais continuam com os mesmos SHA-256 da instalação anterior, conferidos pelo build.

## Limites restantes

O build continua emitindo aviso de bundle maior que 500 kB. Dispositivos físicos, Safari e Firefox não foram testados. O salvamento é local ao navegador; o aviso de saída não substitui salvar/exportar. Marcações podem se sobrepor se o usuário as posicionar assim, mas nomes completos são opcionais. A animação da galeria depende de WebGL; se não iniciar, a interface informa erro em vez de afirmar que o efeito está funcionando. A publicação estática da raiz e a branch principal não foram alteradas.
