# Seleção e explicação — V15

## Arquitetura
- `core/selection.js` permanece o motor conservador original, separado do agrupamento interpretativo.
- `data/evidenceClaims.json` especifica, por espécie, as fontes e campos com documentação. Uma citação genérica não torna todos os atributos comprovados.
- `core/evidence.js` contém `evaluatePlantEvidence` e `evaluateAllEvidence`. Classificações: correspondência documentada, possibilidade a investigar, dados insuficientes, contradição documentada, fora do contexto regional e ficha de pesquisa não elegível.
- `features/EvidenceInspector.jsx` disponibiliza uma auditoria expansível das correspondências e divergências e liga o atributo à fonte relevante.

## Regras
1. Não classificar plantas de outro contexto documental como equivalentes à região do usuário.
2. Campos desconhecidos não viram compatibilidade, eficácia ou contradição.
3. Contradição exige parâmetro **comparável, conhecido e com fonte específica**.
4. A fonte que permite `matching:true` deve ser um guia técnico regional com dados utilizáveis; estudos ecológicos e de vasos permanecem informativos até validação.
5. A presença de campos conhecidos permite correspondências documentais, **não recomendações profissionais de plantio**.
6. Não atribuir valores de infiltração, litros absorvidos, velocidade de drenagem nem percentuais de eficiência.
7. `siteAnalysis.js` continua alertando sobre água persistente, construções próximas e solo aparentemente lento.

## Limites
Essa é curadoria de evidência, não algoritmo hidráulico. As lacunas brasileiras permanecem grandes, e campos futuros precisam de curadoria científica antes de afetarem a seleção.
