# Auditoria V17 → V18

## Resultado observado no PDF de referência (16/11/2026)
O PDF tinha sete páginas: capa/foto excessivamente vazia; contexto e marcações isoladas; dois espaços de cenários A/B não salvos; blocos repetitivos para três áreas; ausência de foto individual de espécies; links genéricos de Iowa em caso brasileiro; conclusão fragmentada em página quase vazia.

## Causas no código
- A rotina de relatório imprimia os componentes de tela (`ScenarioStudio`, `PlanEvidence`), inclusive placeholders.
- O catálogo brasileiro usa `moisture: seasonal` para contextos experimentais; `selection.js` aceita `wet/moist/mesic/dry`. A não correspondência é *cientificamente significativa*, não um erro a corrigir por atribuição de tolerâncias fictícias.
- A renderização visual de `Ed.svgContent` representa símbolos e anotações; não é fotomontagem botânica.
- Alguns links científicos não são específicos de espécies; fontes de Iowa não sustentam adequação de espécies para Itapeva.

## Solução implementada no escopo atual
- `V18Report.jsx` substitui a impressão das telas de análise por composição editorial própria.
- `V18Proposal.jsx` usa um quadro botânico unificado, com foto identificada, fonte, crédito e aviso explícito para registros de pesquisa.
- `v18Proposal.js` produz análise por área, integra seleção de evidências e bloqueia a criação automática de proposta vegetal diante de evidência ou dados de segurança insuficientes.
- `V18Visual.jsx` oferece uma fotocolagem com referências botânicas identificadas para propostas A/B salvas, sem alegar fotorealismo ou previsão de crescimento.

## Limites
A pesquisa ainda não demonstrou candidatos brasileiros suficientes para plantio sob as condições do exemplo (Itapeva, solo aparentemente lento, luz forte e umidade molhada). A V18 **não** converte automaticamente o estudo experimental de Bauru em indicação de plantio residencial. A imagem de proposta usa fotografias de referência mascaradas, não recortes botânicos fisicamente precisos.

O refino editorial mantém a marca, duas famílias tipográficas e as galerias atuais. Ainda não foram realizados testes com participantes humanos ou validação hidráulica.
