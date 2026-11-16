# Implementação e limites

## Proposta e motor

`core/v19Proposal.js` estende a análise existente. Categorias: A correspondência documental preliminar, B pesquisa, C dados insuficientes e D verificação prioritária. D inclui risco ou drenagem aparentemente lenta; nunca é aprovação de obra. Não há pontuação percentual. A elegibilidade automática continua exigindo luz/umidade documentadas, solo intermediário/rápido declarado, água por horas/até um dia e afastamento de construções, com avaliação local ainda necessária.

Agrupamento considera os oito campos normalizados, tipo/geometria da marca, notas, observações, alertas, verificações, estado, candidatas e prioridade. Áreas com risco, manutenção, espaço ou notas diferentes não se fundem. Números e IDs originais permanecem na imagem e na análise conjunta.

## Dois modos

Botânico: a função V18 preservada seleciona espécies documentadas do contexto correto; a V19 acrescenta metadados e controles. Não transporta Iowa para Brasil.

Exploratório: gera polígonos editáveis junto às marcas de acúmulo/área. Âmbar solicita investigação; vermelho indica manter sem escavação até avaliação; verde explora distribuição de vegetação sem especificar espécie. Drenagem lenta gera investigação; água persistente ou proximidade de construções gera exclusão. Na ausência de área marcada, há estudo geral central explicitamente ilustrativo. Nenhuma geometria é uma medida real de campo.

## Composição visual

`proposalImage.js` produz o mesmo SVG para tela, miniaturas A/B, PNG e PDF. A fotografia original é preservada e ajustada por `contain`. Elementos botânicos usam a foto licenciada da própria espécie em recorte oval, sombra e transformação visual. **Não há segmentação automática do fundo nem fotomontagem realista.** Escala e perspectiva são ilustrativas, sem parâmetros de porte adulto ou crescimento. Fotografias não são enviadas a APIs de IA nem a serviços externos.

Cada alternativa tem seleção, arraste, X/Y, escala, rotação, perspectiva visual, opacidade e remoção. O controle original/proposta recorta somente a sobreposição. Atualizar A não altera B. As alterações usam o histórico do projeto; a persistência ocorre ao acionar Salvar. PNG exporta a imagem composta localmente.

O editor original, restauração de cenários, caminhos, polígonos, diário, kit, herbário, InfiniteMenu, galeria cinética, idiomas e limpeza `utm_*` permanecem. O esquema de arquivo continua V12; a whitelist importa projetos V11/V12 e preserva os campos visuais seguros de cenários. IndexedDB mantém nome/tabela anteriores. Não é feita migração destrutiva nem limpeza dos projetos locais.

## Relatório

`reportPDF.js`, carregado somente ao baixar, usa jsPDF com DM Sans e Instrument Serif locais incorporadas. Texto é selecionável. Há paginação própria, numeração, foto original, anotada, análises agrupadas, quadro botânico, A/B, verificações e referências. Cabeçalhos/URLs automáticos do navegador não fazem parte desse PDF. A impressão HTML antiga continua disponível, com paginação dependente do navegador.

Cartões têm três colunas, fotos sem distorção, nome científico em itálico 13 pt, corpo 9 pt e crédito 8 pt; duas colunas existentes são centralizadas quando a linha tem duas plantas. Altura considera todos os blocos e títulos reservam espaço com a primeira linha. Não são criados cartões vazios nem uma página por planta. O teste principal brasileiro usa três cartões, o documentado de Iowa usa dois.

## Limites restantes

Não se valida instalação sem ensaio de solo, identificação botânica e avaliação técnica local. Fontes brasileiras não sustentam hoje seleção automática para o caso de Itapeva. Faltam fotografias verificadas para parte dos registros do catálogo. A representação é conceitual, não dimensionamento, simulação hidráulica ou previsão de crescimento. O PDF tem fontes e texto, mas não é um PDF marcado/UA para leitores de tela. Testes automatizados e inspeção de capturas não substituem validação humana de campo ou usabilidade com o grupo.

Registros sem fotografia verificada continuam acessíveis no herbário, mas não produzem cartões vazios nem elementos botânicos automáticos. Alterar condições/ região também reavalia o rótulo das composições salvas: se a correspondência não se sustenta mais, a imagem é preservada com aviso de reavaliação. Isso não modifica a fotografia ou a alternativa gravada.
