# CONFLORA V16 — Composições A/B editáveis

## Modelo
`core/scenarios.js`: `captureScenario(project,slot)` salva marcas hipotéticas; `restoreScenario(project,slot)` recupera uma composição no editor **sem modificar** observações, caminhos da água, notas, condições ambientais e `project.image`. `renderScenarioProject` mostra separadamente situação observada, A e B.

## Exemplo de operação
1. Fotografe o terreno, desenhe as observações e adicione a primeira hipótese de jardim/plantas.
2. Salve A. Atualize a hipótese no editor, salve B.
3. Clique em **Carregar para editar A**; confirme a substituição dos elementos hipotéticos atuais (se forem diferentes). O slot B não muda.
4. Edite as posições/elementos A; clique em **Atualizar composição A** e confirme a substituição do snapshot antigo.
5. Clique no botão geral **Salvar** do projeto para persistir os dois slots, ou exporte JSON.
6. Consulte os cenários no planejador e relatório.

## Segurança
O importador `normalizeProject` sanitiza campos, tipos e coordenadas das composições A/B e continua aceitando projetos antigos sem cenários. Uma colisão inesperada de identificadores de marcas lança erro em vez de sobrescrever observações.
