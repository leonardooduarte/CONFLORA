# Revisão editorial integral — CONFLORA V22

Base: V21.2, `30aa2c21b74d77aa4633a63d40ba215d4f5f8279`. Revisão de português e inglês sobre o código da aplicação, incluindo conteúdo condicional e mensagens que não aparecem na abertura.

## Critérios adotados

Descrever tarefas concretas: observar, marcar, consultar, comparar, registrar, salvar e verificar. Distinguir observação declarada, hipótese visual e evidência documental. Evitar afirmações de diagnóstico automático, previsão hidráulica ou plantio validado. Inglês escrito para a tarefa e seu contexto, sem seguir literalmente as metáforas do português. Mensagens de falha explicam como retomar a tarefa ou preservar uma cópia.

Mantidos: nomes científicos e populares documentados, autores, títulos de publicações, licenças, URLs, valores e critérios científicos. Nomes de projetos, notas e demais textos escritos pelo usuário não são traduzidos nem reescritos. Bauru continua nas descrições do experimento brasileiro, mas não identifica a abrangência do catálogo: os cartões mostram Brasil/Brazil.

## Cobertura de telas e estados

| Área | Conteúdo avaliado em PT e EN |
|---|---|
| Abertura e apresentação da marca | Título, subtítulo, ações, retomada, globo, instruções, pausa, créditos, pular e nome acessível da apresentação |
| Página inicial inteira | Herbário em destaque, nove retratos, narrativa em cartões, relações água/solo/vegetação, pontos educativos, demonstração real do editor e rodapé |
| Navegação | Cabeçalho, nomes acessíveis, idioma de destino, menu móvel aberto/fechado, fechamento pelo teclado, links e estados ativos |
| Editor | Criação com/sem foto, esquema SVG, ferramentas, marcações, caminhos, polígonos, precisão, zoom, camadas, visualização limpa, instruções, contagens, observações e avisos |
| Jornada e condições | Cinco etapas, estado pendente/concluído/opcional, contexto geral/específico, origem das respostas, campos desconhecidos, advertências e próxima ação |
| Comparação e alternativas | Antes/depois, legendas, propostas documentais, estudo exploratório, composição desatualizada, A/B, edição, exclusão, confirmação, PNG e limites da representação |
| Planejador | Todas as etapas do Stepper, formulários, conclusão, verificações, resumo, ações, contexto regional e ausência de dados |
| Resultados integrados | Itapeva/Brasil, Iowa, áreas distintas/agrupadas, contexto herdado, correspondência documental, pesquisa, contradições, lacunas e ausência de dados |
| Herbário | Busca, filtros, zero/um/vários resultados, interesses, comparação de espécies, 19 fichas e respectivos textos PT/EN, porte, perfis, fontes e créditos |
| Atlas imersivo | Instruções, seleção, pausa, leitura da ficha, cartão educativo, lente, carregamento e limites de identificação |
| Evidências | Inspetor, seleção preliminar, síntese V20, painel botânico V21, dossiê de área, fontes, ressalvas e alertas |
| Explorar | Três soluções educativas, galeria de acordeão, galeria MorphSlider, legendas, carregamento, falha e nova tentativa |
| Chuva às raízes | Quatro etapas do corte, superfície, água, raízes, solo, navegação e ressalva sobre ausência de simulação |
| Meu jardim | Formulário, tipos de registro, data, foto, associação a área/espécie, rascunho, linha do tempo, filtros, cuidados, comparação de fotos, galeria ampliada e exclusão |
| Clean Water Kit | Identificação, checklist, instruções provisórias, QR ainda indisponível, diário, anexos, estado vazio e salvamento |
| Projetos | Lista vazia/preenchida, armazenamento local, criação, abertura, salvamento, substituição, exclusão e confirmações |
| Arquivos e erros | JSON válido/incompatível/inválido/grande, foto inválida/grande, armazenamento indisponível, preparação da imagem, geração do PDF, importação/exportação e mensagens de recuperação |
| Relatórios | Prévia HTML, composição A4, PDF com texto selecionável, contexto, observações, evidências, alternativas, bibliografia, fotos, créditos, numeração, rodapé e nome do arquivo |
| Componentes originais | Valores recebidos do produto, textos padrão alcançáveis e nomes acessíveis de Stepper, Masonry, MorphSlider, AccordionGallery, InfiniteMenu, menu e cartões. Traduções no adaptador; fontes originais preservadas |
| Documento e exportações | Título da aba, descrição para busca, textos dentro do SVG/PNG e legendas embutidas nas três ilustrações da galeria, identificação da edição do PDF e ausência de dados internos expostos |

Não há uma tela ou mensagem conhecida deixada sem avaliação editorial. Isso **não significa** que todo ramo de erro tenha sido produzido em todos os dispositivos. A avaliação editorial inclui leitura do código; as execuções reais constam dos relatórios de teste, separadamente. Mensagens nativas do navegador, conteúdo externo e textos de usuários não são controlados pela CONFLORA.

## Registro de alterações

O registro completo, com arquivo, texto anterior, novo texto e justificativa, está em [alteracoes-editoriais.csv](alteracoes-editoriais.csv) e [editorial-changes.json](editorial-changes.json). Frases compostas em vários elementos foram reunidas para facilitar a leitura; linhas de rótulos apresentam a família de controles e seu contexto. A introdução tem textos novos identificados por “—”.

Exemplos representativos:

| Área/idioma | Anterior | Novo | Justificativa |
|---|---|---|---|
| Abertura/PT | Todo lugar pode ganhar mais vida. | Entenda a chuva no seu terreno. | Explica o objetivo sem prometer um resultado ambiental. |
| Abertura/EN | Every place can gain more life. | Understand rain on your site. | Evita tradução literal do slogan e define a tarefa. |
| Editor/PT | Uma fotografia. Muitas perguntas para acompanhar. | Marque o que observou e registre as condições do terreno. | Orienta a ação disponível. |
| Editor/EN | One photograph. Questions to follow over time. | Mark your observations and record the site conditions. | Troca uma formulação vaga por instrução direta. |
| Resultados/PT | Seu terreno, em uma única leitura. | O que você registrou sobre o terreno. | Deixa clara a origem das informações. |
| Resultados/EN | Your site, one clear picture. | Your site observations, brought together. | Evita sugerir uma leitura automática do terreno. |
| Evidência/EN | Seasonal flooding in pots is not permanent saturation. | Irrigated pot trials do not establish waterlogging tolerance. | O ensaio citado usa irrigação; não deve ser apresentado como ensaio de alagamento. |
| Diário/PT | Comece o registro abaixo. O tempo também faz parte da paisagem. | Registre visitas, chuvas e cuidados para comparar suas observações ao longo do tempo. | Explica o que registrar e por quê. |
| Armazenamento/EN | Estimated storage for this origin: | Estimated storage used by this site: | Remove jargão de desenvolvimento. |
| Erro de importação/PT | Não foi possível abrir o arquivo. Verifique o formato. | Não foi possível abrir o projeto. Escolha um arquivo JSON exportado pelo CONFLORA. | Informa a falha e a ação de recuperação. |

A revisão preservou textos úteis. Por exemplo, “O que você observou?”, “Desfazer”, “Refazer”, “No entries yet. Start with an observation or photo.” e as ressalvas sobre ausência de dimensionamento continuam adequados ao contexto. Não se buscou mudar todas as frases.

## Rastreabilidade

[cobertura-editorial.csv](cobertura-editorial.csv) relaciona todos os arquivos de produto avaliados. [inventario-editorial.json](inventario-editorial.json) permite localizar ocorrências e seu tipo. O inventário inclui metadados científicos e strings técnicas: seu total não representa o número de frases visíveis nem uma métrica de qualidade.

O teste `tests/v22-browser.mjs` registra o texto renderizado dos módulos nos dois idiomas e abre individualmente as 19 fichas por idioma. Os testes anteriores exercitam editor, relatórios/PDF, armazenamento, A/B, dados incompletos e contextos regionais. Testes forçados de falha e limitações estão discriminados na auditoria final.

As descrições de ocorrência agora usam “southeastern Brazil” no inglês, sem mudar a distribuição documentada. O rótulo `seasonal` passou a “Umidade sazonal documentada” / “Documented seasonal moisture”, pois também é usado em pesquisa ecológica e não identifica por si só um ensaio de alagamento. O escopo inglês da tese brasileira explicita a consulta ao registro/resumo, em concordância com o português.
