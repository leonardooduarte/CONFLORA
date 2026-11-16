# CONFLORA V16 — Melhorias de experiência

## Percurso preservado
Fotografia → marcação da água → condições específicas por área → Herbário com fontes → propostas conceituais A/B → plano → relatório.

## Alterações concretas
1. `ScenarioStudio` agora permite **Carregar para editar A/B**, além de Salvar/Atualizar. Se as propostas atuais forem diferentes, aparece confirmação antes de substituí-las; atualizar um slot existente também exige confirmação.
2. `restoreScenario` recupera somente marcas conceituais de jardim/espécies e preserva a fotografia e marcas originais, inclusive caminhos de água e condições.
3. O fluxo usa `change()` existente, mantendo desfazer/refazer da sessão para alterações de composição.
4. Legenda do cenário identifica espécies selecionadas e notas dos elementos.
5. `PersonalizedOutcome` adiciona resultado por área com observações declaradas, possíveis alternativas e checagem prioritária; aparece no planejamento e no relatório.
6. Traduções PT/EN e valores de condições em linguagem mais clara, com layout responsivo.
7. As composições ficam no projeto; o botão geral **Salvar** guarda o documento no navegador. Importação e exportação preservam A/B.

## Limites
Não foi realizado teste com usuários humanos. A recuperação A/B depende de confirmações no navegador; não carrega nem envia fotos para serviços externos. Comparações são conceituais, não escala real ou previsão de desempenho de drenagem.
