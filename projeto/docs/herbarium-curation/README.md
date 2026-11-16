# Herbário — curadoria e completude (16/11/2026)

Base: V19 `6ef6c77a7439f42da5199884ea06d48ce025c335`. Branch separada `feat/conflora-herbarium-completeness`. Mantidas 19 espécies; fotografias passam de nove para dezenove. Não foram criadas recomendações ou faixas de compatibilidade para preencher lacunas.

## Fotografias

Dez arquivos locais acrescentados, com espécie, autoria, licença, URL de origem e hash SHA-256. Metadados consultados pela API Wikimedia Commons; arquivos inspecionados visualmente. Essa verificação documental/visual não é autenticação por especialista botânico. Ver `photo-provenance.json` e registros em `src/data/plants.json`.

Novas fotos: Syngonium angustatum, Penstemon digitalis, Zizia aurea, Mertensia virginica, Panicum virgatum, Cyperus giganteus, Rhynchanthera grandiflora, Arachis repens Alternanthera brasiliana e Inga affinis. Arquivos de domínio público/CC0/CC BY/CC BY-SA; imagens do Plant Toolbox não foram reutilizadas.

Foram rejeitados: uma imagem rotulada Arachis repens com flores visualmente incompatíveis; a exsicata de raízes de Cyperus para a apresentação imersiva; ilustrações históricas quando se procurava fotografia; fotografias de madeira com Inga feuilleei e sinônimos conflitantes. A busca posterior no iNaturalist encontrou a observação 410985562, research grade, taxon 287893 (Inga affinis), duas identificações, de 26/10/2026, em Maia/PB. Foi utilizada a foto 755975670 de cristianol1456, com CC BY-SA 4.0 confirmada na própria página da fotografia. Isso não é autenticação por especialista, ocorrência em Itapeva ou recomendação de plantio. Nenhuma foto de Inga edulis ou Inga vera em sentido amplo foi usada.

## Informações aprofundadas

NC State Extension Plant Toolbox consultado em 16/11/2026, com conteúdo botânico disponível e HTTP 200:

- https://plants.ces.ncsu.edu/plants/penstemon-digitalis/ — flores tubulares, hábito, distinção de Digitalis e drenagem do solo.
- https://plants.ces.ncsu.edu/plants/zizia-aurea/ — umbelas amarelas, colônias, planta hospedeira e condições de cultivo. Diferença de porte entre fontes explicitada, sem fundir faixas.
- https://plants.ces.ncsu.edu/plants/mertensia-virginica/ — botões rosados, flores azuis em sino, dormência de verão, sombra e matéria orgânica.
- https://plants.ces.ncsu.edu/plants/panicum-virgatum/ — touceira, panículas, variação entre cultivares e umidade/alagamento ocasional.

Esses atributos são descrições suplementares de contexto norte-americano. Não alteram o motor de seleção, não são transferidos ao Brasil e não medem eficácia hidráulica. URLs de tentativa de Commelina/Alternanthera no Plant Toolbox retornaram 404 e não foram incorporadas.

## Interface

Todas as fichas mostram um resumo ecológico antes da expansão. Removida a sequência pouco útil de valores desconhecidos do cabeçalho. Campos sem faixa comparável recebem explicação textual; não ficam vazios. As quatro fichas de extensão têm um bloco editorial de descrição/cultivo e fonte. Português e inglês preservados. A ficha sem foto continua acessível com a razão da pendência.

O novo retrato de Syngonium não muda sua classificação: registro de pesquisa e espécie não nativa do Brasil segundo POWO; o quadro brasileiro permanece restrito às espécies nativas estudadas em vasos. Adicionar uma fotografia não promove uma espécie introduzida para o quadro da proposta.

## Validação

Build, npm test, seleção, ciência, modelos V15/V19 e teste novo `tests/herbarium-complete.mjs`. Testes históricos que pressupunham ausência permanente de foto foram substituídos por verificações positivas de autoria/licença/procedência; a exigência de pesquisa sem indicação de plantio permanece.

Chromium: todas as 19 fotografias carregadas, 19 fichas, perfil Mertensia PT/EN, 360 px sem overflow. Jornada V19 A/B, persistência, PNG e PDFs: Itapeva e Iowa são verificados por exportação real, sem forçar contagem de páginas. O workflow mantém as regressões anteriores e publica apenas a prévia V19; main e raiz oficial não são destinos.
