# Validação executada

- npm install: aprovado, dependências já atendiam os 12 registros.
- npm run build: aprovado; verificação SHA-256 dos 26 componentes oficiais aprovada. Aviso do Vite: chunk principal de aproximadamente 512 kB antes de gzip; vale aprofundar a divisão em uma etapa de desempenho.
- npm test: verificações estáticas, migração/importação e modelo aprovados.
- npm run test:browser: aprovado no Chromium, incluindo ScrollExpand, editor, desfazer/refazer, comparação, Stepper, relatório e downloads. Atualizada a expectativa do título após a troca da abertura.
- npm run test:six: aprovado, incluindo sidebar, lista animada, Masonry com foto real, lightbox, AccordionGallery e menu móvel.
- npm run test:premium: aprovado. Canvas de Topography e WebThreads visíveis; ScrollStack altera o empilhamento durante a rolagem; painel usa os dados atuais; atlas renderiza; TiltedCard recebe hover; FlipCard abre o verso; interesse atualiza a biblioteca; FluidGlass renderiza e foi inspecionado em captura; ficha e busca funcionam; abertura e atlas sem overflow a 390 px; nenhum pageerror.

Capturas desktop/móvel foram examinadas. Os testes usam Chromium com SwiftShader, não hardware móvel físico. Safari/iOS e medição de FPS em dispositivo real continuam pendentes. Nem todas as variantes/configurações possíveis da biblioteca foram testadas. Suítes históricas v12/atelier/video4/accessibility não compõem a validação final desta entrega; algumas dependem da navegação anterior.

Correções encontradas durante a validação: largura numérica obrigatória do FlipCard; sobreposição do desfoque no controle de vidro; espaço excessivo antes da esfera; área e resolução do fundo Topography para conter o custo de renderização. Nenhuma modificação nos arquivos oficiais foi necessária.
