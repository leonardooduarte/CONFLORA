# Auditoria final — CONFLORA V22

Escopo: aplicação completa em PT/EN, revisão de código, navegação real, conteúdo condicional, estados vazios/erro, editor, fontes, fotografias, exportação e persistência. A classificação abaixo distingue defeitos corrigidos de limitações remanescentes.

## P0 — bloqueadores

Nenhum bloqueador conhecido de integridade dos projetos, seleção científica ou exportação foi identificado nas verificações registradas. A publicação é condicionada ao sucesso dos testes essenciais no workflow. Não se transforma a candidata em versão oficial com este trabalho.

## P1 — corrigidos

| Problema | Correção/verificação |
|---|---|
| Ensaio irrigado descrito em inglês como alagamento em vasos | Redação corrigida; irrigação não comprova tolerância ao encharcamento. Critérios e fontes preservados. |
| Rótulo `seasonal` implicava ensaio de alagamento mesmo em pesquisa ecológica | “Umidade sazonal documentada” / “Documented seasonal moisture”. Enum científico inalterado. |
| Escopo da consulta à tese brasileira incompleto em inglês | Explicitada a revisão do registro/resumo e o limite de transferência para Itapeva, já presentes no português. |
| Campos internos expostos na jornada | Nomes de campos localizados substituem `regionCode`, `sun` e `moisture`. |
| Menu fechado com links ainda focalizáveis | Painel com `inert`; nomes acessíveis localizados; fechamento por Escape e retorno de foco. |
| Contraste de rótulos pequenos | Cores ajustadas nas superfícies reais, incluindo apresentação, narrativa, método e legenda da captura do editor. |
| Globo sem alternativa quando COBE devolvia instância vazia em vez de lançar erro | Detecção explícita do contexto; fallback verificado com WebGL indisponível. Não se afirma que o fallback é um globo 3D. |
| Resolução do globo multiplicada antes e dentro do COBE 2 | Largura/altura em pixels CSS, com multiplicação interna única pelo DPR. Limites por viewport e atualização de até 30 fps. |
| Fundos decorativos continuavam montados depois de sair da tela | Montagem vinculada à visibilidade, largura e preferência de movimento. Componentes originais mantidos. |
| Inicialização gráfica concorria com o encerramento da marca | Aplicação monta em paralelo; inicialização gráfica é liberada ao remover a sobreposição. |

Na conferência pública, foram corrigidos também o fechamento do menu que mantinha “Fechar” após a troca para inglês, o valor regional “Brasil” no resultado inglês e a perda de “²” no nome do projeto no PDF. Testes de regressão verificam os textos visíveis, o contexto em inglês e o nome completo extraído do PDF.

## P2 — corrigidos

Título inicial e subtítulo mais claros; composição 42/58; páginas com linguagem mais direta; pluralização em contagens; cidades do experimento separadas do contexto do catálogo; Brasil/Brazil e EUA/USA localizados; porte botânico com notação e notas em inglês; nomes acessíveis de controles originais; texto embutido no esquema editável e nos três SVGs educativos; versão e nome do PDF atualizados. Mensagens de arquivo e armazenamento explicam como retomar a tarefa.

## P1 — pendente para publicação oficial

A nota de performance móvel simulada permaneceu 25/100. O TBT mediano caiu de 74,80 s para 28,76 s e o LCP de 13,35 s para 10,40 s; ainda são valores altos. Acessibilidade automática passou de 88 para 100. Esses ganhos não encerram o trabalho de desempenho nem substituem medição em aparelho físico. A versão permanece candidata, não definitiva.

## Preservação

- 19 espécies e fotografias locais com créditos/licenças, 16 registros do globo, citações, URLs, nomes científicos e ressalvas preservados.
- Somente redação de escopo/ocorrência em inglês foi ajustada nos dados de fontes/plantas; luz, umidade, origem, elegibilidade e critérios de seleção não foram ampliados.
- Itapeva permanece inconclusiva quando faltam evidências; dados de Iowa não se tornam indicação para o Brasil. Pesquisa não equivale a plantio validado.
- Editor, marcações, condições específicas, propostas A/B, interesses, diário, kit, exportação e JSON mantêm o modelo de projeto existente.
- Fotografias corretas não foram trocadas. As três ilustrações em inglês mantêm formas, medidas ilustrativas e composição dos SVGs de origem.
- O PNG da marca e os arquivos originais do React Bits não foram redesenhados nem substituídos.

## Limitações e prontidão

O desempenho móvel deve ser avaliado pelos números em [desempenho.md](desempenho.md), não apenas pela sensação em desktop. A pontuação de acessibilidade não representa certificação WCAG; não houve sessão com leitores de tela externos nem ensaio em aparelhos físicos/Safari.

A apresentação tem temporizador de 1,85 s. Em CPU ocupada, a remoção pode ocorrer depois desse valor; a duração observada está no relatório do teste. Quando o armazenamento de sessão é bloqueado, existe apenas memória da página: recarregar pode reapresentar a marca. O botão de pular, o teclado e a preferência por movimento reduzido permanecem disponíveis.

As instruções oficiais do Clean Water Kit e seu acesso por QR ainda dependem da equipe. Lacunas de evidência vegetal e validação de campo são limites reais do projeto; não foram preenchidas por estimativas.

Todos os textos conhecidos foram avaliados editorialmente, incluindo mensagens de ramos não disparados. Falhas efetivamente produzidas em PT/EN: JSON inválido, foto inválida, armazenamento indisponível, fonte do PDF indisponível e WebGL indisponível. Falhas de quota real, interrupção física de dispositivo e impressão em impressora não foram reproduzidas; suas mensagens receberam revisão de código.

A candidata pode ser apresentada como ferramenta acadêmica de observação e planejamento conceitual, com suas ressalvas. A aprovação de publicação oficial exige considerar o desempenho restante, uma revisão humana do conteúdo e testes de campo/dispositivos. Não constitui ferramenta de dimensionamento hidráulico ou recomendação técnica definitiva de plantio.
