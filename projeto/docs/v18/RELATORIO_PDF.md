# Relatório V18 — contrato editorial

- Composição própria (`V18Report.jsx`) dentro do modo de impressão, não impressão integral de formulário e controles.
- Fotografia original, localização/data, síntese de observações sem lista redundante, áreas com ressalvas, quadros botânicos compactos (3 colunas em A4), e proposta A/B apenas quando salva.
- Fotos dos registros de pesquisa aparecem em um quadro único, **sem receber rótulo de recomendação**. Créditos e fonte seguem associados a cada ficha.
- A folha A4 utiliza CSS `@page`, tamanho adaptativo, `break-inside: avoid` para cartões e espaço de foto limitado em milímetros.
- Cabeçalhos e rodapés **nativos do navegador** podem ser controlados pelo diálogo de impressão do usuário; CSS da página não consegue suprimi-los com garantia.
- Fotocolagem conceitual com imagens de referência mascaradas; não é reconstrução fotorealista nem previsão do crescimento real.
- Testes de Chromium renderizam um PDF e confirmam geração; uma inspeção editorial manual das páginas e testes no diálogo de impressão de outros navegadores continuam necessários.
