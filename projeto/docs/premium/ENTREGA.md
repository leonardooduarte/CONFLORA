# CONFLORA — Território vivo

Branch de trabalho: feat/conflora-immersive-atlas. A main permanece intacta.

## Integração
Os 12 registros oficiais JS-CSS foram obtidos diretamente de https://reactbits.dev/r/, com JSX e CSS preservados integralmente. O endereço undefined do prompt FlipCard foi corrigido para FlipCard-JS-CSS.json. WebThreads é o componente solicitado no último prompt (distinto de Threads). Origem, dependências e SHA-256 estão em ../reactbits-provenance.json. Nenhuma dependência adicional foi exigida: npm install executado.

- Topography, StrokeText e BlurText: abertura territorial em verde profundo, papel e cobre, fotografia com crédito e ações reais para criar/retomar projeto e abrir atlas.
- GlassSurface e GradualBlur: controle sobre a fotografia; blur abaixo do controle para preservar leitura.
- ScrollStack: três capítulos com ações para editor e atlas; WebThreads fecha a narrativa.
- InfiniteMenu: espécies documentadas, fotografias locais licenciadas, seleção por mouse/teclado, pausa e abertura da ficha existente. Os filtros da biblioteca atualizam a esfera. A espécie sem fotografia continua na lista documental, sem imagem substituta falsa.
- TiltedCard: espécime em foco e camadas de legenda.
- FlipCard: pergunta educativa e condições documentadas da espécie.
- FluidGlass: experiência opcional de refração da fotografia em foco; não é ferramenta científica de ampliação ou identificação.
- MagicBento: painel no Meu jardim com dados atuais do projeto, marcas, espécies e última visita; ações conectadas às páginas existentes.

Fontes oficiais não foram editadas. Composição e estilos são próprios do CONFLORA. As cores dos exemplos foram adaptadas à identidade do projeto. Importações WebGL são separadas; Topography e WebThreads carregam ao se aproximar da região visível. Lente só carrega quando solicitada.

## Preservação e limites
Editor, marcações/caminhos/polígonos, desfazer/refazer, projetos locais, importação/exportação, relatório, planejador, kit, biblioteca e diário permanecem. O painel não inventa indicadores ambientais. Dados e fotografias botânicas são do catálogo existente; a identificação deve ser confirmada localmente. Prévia móvel no Chromium não substitui dispositivo físico/Safari. WebGL exige suporte do navegador; catálogo textual continua disponível.

## Reprodução
npm install
npm run build
npm test
npm run dev -- --port 5176
npm run test:premium
BASE_URL=http://localhost:5176 CHROMIUM_PATH=/usr/bin/chromium npm run test:browser
npm run test:six

Resultados dos testes em evidencias/premium; capturas de inspeção no workspace em work/premium. Ver VALIDACAO.md para resultados efetivamente executados.
