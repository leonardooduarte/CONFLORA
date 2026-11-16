# Auditoria de design — V18 (escopo implementado)

## Diagnóstico
A página inicial da V17 possui direção editorial forte; as telas de editor e PDF acumulavam informação densa, rótulos pequenos e cartões técnicos repetitivos. O relatório A4 original imprimia a própria hierarquia de componentes do aplicativo, resultando em espaços vazios e cenários ausentes.

## Decisões executadas
- Um painel de análise final (`V18Proposal.jsx`), ao lado do plano, evita que o leitor precise reconstruir informações espalhadas.
- Quadro fotográfico compacto identifica plantas por nome científico, autor, fonte e estágio de evidência.
- Relatório novo (`V18Report.jsx`) usa fotografia original, indicadores, condições, análise agrupada, quadro de fotos e cenários **somente quando salvos**.
- No relatório, ocorrências com mesma situação ambiental, alerta, fontes e ausência de nota são consolidadas em uma única leitura com vários números de área.
- Fotografias dos usuários não são alteradas. A representação opcional mostra sobreposições botânicas ilustrativas, não imagens artificialmente transformadas.

## Não alterado nesta etapa
- Hero, paleta/identidade, InfiniteMenu, React Bits, galeria cinética, navegação e componentes de edição originais.
- Não foi aplicado redesign integral das telas anteriores por risco de regressão.

## Pendências
Auditoria de navegação com usuários reais, revisão formal de contraste em todos os módulos, testes visuais físicos em Android/Safari, acessibilidade assistiva e inspeção editorial de todos os PDFs por um humano.
