# React Bits: proveniência e licença

Este projeto foi preparado para instalar **o código-fonte original** dos oito componentes, sem reimplementações locais. A instalação é feita por `npm run setup:reactbits` diretamente a partir dos registros oficiais `https://reactbits.dev/r/<Componente>-JS-CSS.json`. O instalador lê `files[].content`, escreve os `.jsx`/`.css` sem modificações internas e gera `docs/reactbits-provenance.json` com URLs, dependências e SHA-256 de cada arquivo.

Repositório do autor: https://github.com/DavidHDev/react-bits

**Licença:** React Bits indica **MIT + Commons Clause**; leia a licença original no repositório antes de redistribuir os componentes. Os oito componentes estão incluídos nesta revisão, baixados dos registros oficiais; os hashes são verificados durante o build. A licença original foi salva em REACT_BITS_LICENSE. O instalador só gera os arquivos de origem quando consegue efetivamente baixá-los, e em caso de falha interrompe com erro (não substitui por clones).

## Dependências listadas nos registros oficiais em 15 de novembro de 2026

| Componente | Bibliotecas adicionais |
|---|---|
| ScrollExpand | Nenhuma além de React |
| Stepper | @hugeicons/react, @hugeicons/core-free-icons |
| AnimatedContent | gsap |
| MorphSlider | ogl, gsap |
| SplitText | gsap, @gsap/react |
| RippleDistortion | ogl |
| SpringCheck | motion, @hugeicons/core-free-icons |
| CircularText | motion |

Essa lista foi verificada nos registros por meio do repositório oficial. O instalador consulta novamente a origem no momento da execução. Versões e comportamento podem mudar; preserve os hashes produzidos.

**Importante:** a instalação não equivale a testes. Sem execução no navegador e testes visuais não é correto afirmar equivalência com as demonstrações.
