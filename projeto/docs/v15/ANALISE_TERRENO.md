# Visualizações conceituais A/B — CONFLORA V15

## Componentes
- `core/scenarios.js`: captura apenas as marcações hipotéticas de jardim e plantas com espécie identificada. Não copia a foto nem substitui as observações.
- `features/ScenarioStudio.jsx`: mostra terreno observado, composição A e composição B com a mesma base fotográfica, conforme marcações do usuário.
- `core/project.js`: importa A/B por allowlist de marcações existente, preservando versões 11 e 12 do formato de projeto e rejeitando atributos arbitrários.
- `core/store.js`: inclui os campos opcionais de A/B para novos projetos, mantendo a versão 12.
- `App.jsx`: exibe cenários no editor, no plano e em relatórios visualizados/impressos. A edição das marcações continua na ferramenta existente.

## Fluxo
1. Enviar fotografia (opcional) e adicionar marcações de observação.
2. Inserir marcações hipotéticas de jardim/plantas no editor, posicionando e ajustando visualmente com os controles já existentes.
3. Salvar a composição atual como A.
4. Alterar as marcas hipotéticas e salvar a nova composição como B.
5. Comparar com a foto original e levar as duas composições ao plano e relatório.

A versão de projeto permanece idêntica para o usuário, exceto pelos cenários opcionais. Nenhum dado de fotografia é duplicado nos cenários; a imagem continua local no navegador. Não há previsão de crescimento, escala física, volumes ou resultado hidráulico. O usuário precisa confirmar identificação e condições locais.
