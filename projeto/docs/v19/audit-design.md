# Auditoria da V18 e direção de arte

## Base recuperada

Foram executados fetch/prune e inspeção de branches, histórico, divergência da main e documentação V18. A V18 em `a361bc4` contém o trabalho acumulado mais recente validado; a main (`f0c311f852db2e78bc877089359f6eded9744402`) é anterior. A V19 foi criada diretamente da V18.

O PDF original do usuário de 16/11 não estava anexado nesta execução. O caso descrito no pedido foi reproduzido em Chromium com 20 m², Itapeva, drenagem lenta, sol pleno, molhado e sete marcas. A imagem de teste é o esquema ilustrativo local `scene-garden.png`, não uma fotografia real do terreno. A reprodução V18 produziu três páginas; não é apresentada como o arquivo original do usuário.

## Causas encontradas e correções

| Problema | Causa | Correção V19 |
| --- | --- | --- |
| Resultado visual ausente no Brasil | A geração visual estava acoplada à seleção botânica | Estudo espacial exploratório independente, com legenda e limites próprios |
| Irrigação tratada como faixa ecológica | `seasonal` em registros do ensaio em vasos | Faixa removida, regime experimental descrito separadamente, sem participação na correspondência |
| Análises repetidas | Agrupamento parcial restrito à impressão | Assinatura completa compartilhada entre tela e relatórios |
| Edição A/B indireta | Precisava restaurar a composição no editor | Seleção, arraste e controles diretamente em cada alternativa; recuperação antiga preservada |
| Desenho divergente entre saídas | Tela, prévia e exportação tinham renderizadores diferentes | SVG de proposta compartilhado por tela, miniaturas, PNG e PDF |
| Texto pequeno e cabeçalho do navegador | Impressão HTML dependia das configurações de impressão | PDF local com fontes incorporadas, texto selecionável, rodapé próprio e paginação calculada |
| Título órfão / crédito sobreposto | Reserva de altura não considerava conteúdo completo | Reserva da primeira linha botânica e altura calculada por todos os blocos do cartão |
| Fontes pouco úteis no papel | Links sem referência impressa completa | Numeração, título, alcance, URL, taxonomia e autoria/licença das imagens |

## Regras visuais

Instrument Serif para títulos editoriais e nomes científicos; DM Sans para dados, textos e controles. Fontes locais preservadas. Verde profundo e papel claro continuam predominantes; âmbar identifica investigação e terracota indica restrição. Cor é acompanhada de texto, números e padrões.

A página de resultado abre com o terreno, localidade, área e condições do próprio projeto. As escolhas botânica/exploratória explicam o que cada ação produz. Controles de composição aparecem sob `Editar elementos`, sem ocupar permanentemente o painel. Hierarquia e espaçamento seguem a marca existente, sem reescrever a aplicação ou ocultar módulos.

No celular os dois modos viram uma coluna, cartões botânicos mostram imagem acima do texto e controles usam duas colunas. A comparação é acionável por teclado e toque. Durante edição aberta, o gesto na imagem move o elemento; fora dela, a página mantém sua rolagem. As novas funções não introduzem animações; movimento reduzido existente é preservado.

## Comparação visual

Os testes geram capturas desktop, notebook, tablet, 390 e 360 px, além de PDFs reais. A reprodução V18 e os exemplos V19 são material de teste com o mesmo esquema ilustrativo; não demonstram uma intervenção executada. Ver [validação](validation.md).

A proposta foi colocada antes do Stepper de planejamento, com abertura do relatório no próprio cabeçalho. O formulário anterior permanece disponível abaixo do resultado. Isso dá destaque ao resultado da análise sem remover o planejamento ou exigir que o usuário avance novamente por etapas já registradas.
