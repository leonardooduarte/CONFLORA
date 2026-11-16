# Quadro fotográfico das espécies

Implementação: `src/features/V18Proposal.jsx`, `src/v18.css`.

## Regras
- Um quadro único, até 5 fichas, em 3 colunas no PDF A4; em telas menores, 2 ou 1 coluna.
- Cada ficha: fotografia 4:3 em tela / aproximadamente 26 mm de altura em A4; nome científico em itálico, nome popular documentado, motivo da presença, áreas associadas, referência, autor e licença da foto com links de origem.
- Imagens provenientes de `public/botanical/` e metadados `src/data/plants.json`. Não são usados Unsplash nem substituições por espécies erradas.
- Espécies com status de pesquisa recebem a faixa **Somente pesquisa**, em vez de "sugerida".
- Caso nenhuma ficha regional possua imagem e fonte verificadas, a interface apresenta mensagem em vez de cartões vazios.

## Limite interpretativo
A fotografia botânica auxilia o reconhecimento visual; não mostra necessariamente o porte adulto, forma de crescimento ou tamanho no terreno. Um estudo em vasos não valida implantação. A disposição ilustrada na proposta não determina eficácia no manejo da água.
