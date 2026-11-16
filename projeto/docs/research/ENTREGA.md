# CONFLORA — Análise de terreno e pesquisa botânica, edição 16/11/2026

## Alterações
- Jornada orientada no editor para fotografia, marcação, condições por área, Herbário e plano; reutiliza funções de marcação e persistência existentes.
- Herbário reforça o caminho `Encontrar plantas para meu terreno` preservando a galeria InfiniteMenu aberta após a busca e seleção regional.
- Quatro registros de Iowa introduzidos com dados conservadores e taxonomia consultada: Penstemon digitalis, Zizia aurea, Mertensia virginica, Panicum virgatum. Sem fotografias licenciadas nesta edição.
- Matriz inicial de quinze candidatas novas, sete documentos de pesquisa e limites. Onze candidatas ainda não integram o motor de seleção.
- Mensagem específica de evidência insuficiente para cenários brasileiros, sem converter dados do ensaio em parâmetros inexistentes.
- Projeto local, editor, relatório, kit, diário, React Bits e fotografias recentes preservados.

## Publicação e limites
A versão oficial https://leonardooduarte.github.io/CONFLORA/ não deve ser substituída. A prévia é publicada pelo workflow da branch de trabalho em caminho separado. Documentos de validação só afirmam testes concluídos após confirmação dos resultados do Actions. Esta entrega não é projeto executivo ou recomendação profissional.

## Evolução V14 (complemento)
A versão V14 foi desenvolvida em branch própria: leitura de risco e alternativas condicionadas por área, comparação qualitativa entre locais e ficha brasileira informativa *Cyperus giganteus*. Catálogo com 15 fichas, sem assumir elegibilidade da espécie para seleção. Documentação detalhada em `../v14/ENTREGA.md`. Os testes/publicação da V14 precisam ser conferidos no workflow dedicado antes de confirmação.

## Evolução V15 — evidências e comparação de cenários
A V15 registrou 18 fichas botânicas, com as três novas espécies brasileiras `Alternanthera brasiliana`, `Rhynchanthera grandiflora` e `Arachis repens` tratadas como **pesquisa**, não como indicação automática de plantio. As evidências por campo estão em `src/data/evidenceClaims.json`. O editor e o plano oferecem agora cenários conceituais A/B sem substituir a foto original, com importação/exportação compatível. Consulte `../v15/REVISAO_BOTANICA.md`, `../v15/MOTOR_SELECAO.md` e `../v15/TESTES.md` para limites e validação.
