# Validação executada — V12 piloto

Ambiente: Linux, Node 24, Chromium headless 156; WebGL por SwiftShader. Dados de teste são os esquemas ilustrativos do próprio projeto, não fotografias privadas do usuário.

| Verificação | Resultado |
|---|---|
| npm install | Passou, dependências existentes suficientes |
| Oito registros oficiais consultados novamente | Conteúdo JSX/CSS idêntico ao código instalado; official-verification.json |
| npm run build | Passou; maior chunk JS ~431 kB / ~145 kB gzip, sem aviso de chunk >500 kB |
| npm test | Estático e modelo passaram: V11→V12, whitelist, fotos locais, escape e regras condicionais |
| npm run test:browser | Suite anterior de animações e fluxos básicos passou |
| npm run test:video4 | Regressões anteriores passaram: proteção, erro de armazenamento, galeria lenta/erro/retry, plano e kit |
| npm run test:v12 | Percurso completo passou: foto, linha/polígono, vértices, camadas, filtros, espécie por área, plano, A4, diário e importação/exportação |
| npm run test:accessibility | Toque emulado, coordenadas SVG, zoom/pan, teclado/diálogo, reduced motion e seção da água sem WebGL passaram |
| Viewports 320, 390, 768, 1440 | Editor, diário, kit, cena de raízes, soluções e catálogo sem overflow horizontal da página |
| PT/EN | Percurso e textos dos novos módulos verificados; nomes científicos não traduzidos |
| Privacidade no percurso | Nenhum POST/PUT de fotos/dados observado; fontes e imagens da aplicação são locais |
| PDF | A4 de três páginas no projeto de teste; texto extraído e página renderizada inspecionada; dados e fontes reais do teste |
| Console | Nenhum pageerror nas suites registradas |

Capturas em evidencias/v12/. Os arquivos result.json e accessibility-result.json registram resultados; percurso-v12.mp4 mostra a execução da suite de interface. O vídeo é uma gravação de teste, não uma apresentação editada do produto.

## Limites da validação

Não foi feito teste em dispositivo físico, Safari, Firefox, leitor de tela, laboratório de usabilidade ou benchmark de rede móvel. As larguras e o toque são emulação. O PDF é gerado pelo mecanismo de impressão do Chromium, sem certificação PDF/UA. Comparação pixel a pixel com as demos do autor não foi certificada: preservação do código original e execução local foram verificadas separadamente. O número e o tamanho das páginas do relatório variam com fotos/notas/espécies do usuário.

As falhas iniciais da rodada foram corrigidas ou diagnosticadas: caminhos de seletores que mudaram com os novos módulos, necessidade do ffmpeg do Playwright para gravar vídeo, carregamento assíncrono da importação e limite intrínseco de largura dos selects no catálogo. Os testes finais usam as interfaces atuais, sem desativar os efeitos para aparentar sucesso.

O percurso V12 também passou sobre o build de produção servido em uma subpasta /CONFLORA/ (não apenas no servidor de desenvolvimento). Resultado separado em production-result.json. Isso verifica o carregamento relativo dos módulos, fontes e fotografias para a forma de hospedagem usada na entrega.
