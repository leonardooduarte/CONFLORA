# Seis componentes adicionais — React Bits JS-CSS

Foram obtidos diretamente os registros oficiais de LineSidebar, AnimatedList, Masonry, AccordionGallery, StaggeredMenu e SpecularButton. JSX/CSS foram copiados sem alterações internas. O manifesto docs/reactbits-provenance.json contém fontes, dependências e hashes dos 14 componentes; o build verifica sua integridade. O instalador do projeto também foi atualizado para os 14 registros. A instalação usou os registros diretamente, sem executar shadcn sobre a estrutura existente.

Todas as dependências listadas já estavam declaradas e npm install foi executado. Cores e medidas são configurações da aplicação: verde-floresta, marfim e lima, em vez dos exemplos roxos/cinzas. Nenhum arquivo demonstrativo, imagem aleatória ou rede social fictícia foi adicionado.

- LineSidebar: ferramentas reais de marcação; adaptação externa acrescenta foco e ativação Enter/Espaço, pois o código oficial usa li clicável sem teclado.
- AnimatedList: lista de marcações; seleção abre o inspetor correspondente, com tema claro.
- Masonry: fotos dos registros do diário, datas nas legendas e lightbox original. A reorganização por arraste é visual; a linha do tempo continua ordenada pela data.
- AccordionGallery: três soluções com links para a explicação técnica na mesma página. Expansão por hover/foco e clique original.
- StaggeredMenu: navegação móvel real. A camada da aplicação roteia links, fecha a instância após seleção, contém foco, bloqueia scroll e trata Escape.
- SpecularButton: ação de abrir/retomar o ateliê, com parâmetros de luz discretos e identidade CONFLORA.

Validação: build, testes estático/modelo e suite tests/six.mjs passaram no Chromium headless com SwiftShader. O teste executa os seis componentes: seleção de ferramenta, seleção de marcação, fotografia do usuário em lightbox, expansão da galeria, menu móvel/navegação/Escape e botão principal. Capturas em evidencias/reactbits-six/. Não foi certificado comportamento em hardware físico, Safari/Firefox ou equivalência pixel a pixel às demonstrações. O menu mobile substitui a navegação horizontal anterior; suites históricas que procuram botões ocultos no celular precisam abrir o menu e selecionar links.
