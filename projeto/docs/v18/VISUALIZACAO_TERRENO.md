# Visualização V18 — alcance e limites

`V18Visual.jsx` compara a foto **original preservada** com uma composição da mesma foto contendo camadas identificadas de referência botânica. Em cada camada:
- `speciesId` deve existir no catálogo e possuir uma foto licenciada em `public/botanical/`.
- Posição (`x/y`) e tamanho aproximado vêm dos marcadores A/B.
- As imagens são apresentadas em formato de recorte oval suave e vinculadas a legendas.

## Importante
Esta é uma **fotocolagem conceitual com imagens de referência**. Não remove automaticamente fundos complexos, não reconstrói perspectiva tridimensional, não identifica espécies por fotografia nem produz fotorealismo. A imagem não prova que um plantio é viável ou que reduzirá o alagamento.

A edição de posição ocorre no ateliê ao carregar a composição, e sua alteração aparece na prévia após salvar. Um serviço externo de geração de imagem não foi adicionado para proteger a privacidade e evitar custos não autorizados.

Não afirmar que houve processamento de imagens por IA.
