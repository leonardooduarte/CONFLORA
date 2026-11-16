# Entrega e revisão

- Origem: branch `feat/conflora-v18-personalized-plan-20261116`, commit `a361bc4371cdbf4ad9b8da6fce453832ed5a47f4`.
- Branch exclusiva: `feat/conflora-v19-visual-proposals`.
- [Código V19](https://github.com/leonardooduarte/CONFLORA/tree/feat/conflora-v19-visual-proposals)
- [Execuções do workflow](https://github.com/leonardooduarte/CONFLORA/actions/workflows/preview-v19.yml?query=branch%3Afeat%2Fconflora-v19-visual-proposals)
- [Prévia V19](https://leonardooduarte.github.io/CONFLORA/previews/conflora-v19/)
- [Identificação do build publicado](https://leonardooduarte.github.io/CONFLORA/previews/conflora-v19/version.json)

`sourceCommit` no build publicado deve ser igual ao SHA da execução concluída com sucesso. A prévia depende da execução real e da disponibilização pelo GitHub Pages. O resultado observado da publicação, SHA final e eventual PR são informados na entrega da sessão.

## Exemplos verificáveis

- [Reprodução V18 do caso de Itapeva](validation/v18-reproduced-itapeva.pdf)
- [PDF V19: Itapeva / modo exploratório](validation/itapeva-v19.pdf)
- [PDF V19: Iowa / modo botânico documental](validation/iowa-v19.pdf)
- [Resultado funcional automatizado](validation/browser-results.json)
- [Regressões visuais em execução](validation/visual-results.json)
- [Antes: V18](validation/v18-baseline.png)
- [Depois: V19](validation/v19-1440.png)
- [Celular: V19](validation/v19-390.png)
- [InfiniteMenu preservado](validation/infinite-menu.png)

São exemplos com o esquema ilustrativo do projeto; não fotografias reais de Itapeva nem validação ambiental. Os artefatos da execução guardam capturas e PDFs produzidos pelos testes no runner.

## Revisão pelo grupo

Abra a prévia, envie uma fotografia, marque observações e informe as condições. Em Plano, a proposta aparece antes do formulário de planejamento. Para o caso brasileiro, use `Criar estudo exploratório A/B`; abra `Editar elementos` para ajustar as camadas. Use `Salvar` para manter no navegador e exporte JSON para transportar o projeto. Em `Abrir relatório`, `Baixar relatório PDF` gera o documento local sem cabeçalhos do navegador.

Não é necessário instalar Node para usar a prévia publicada. O site oficial e V18 permanecem separados. Nenhuma promoção para main ou para a raiz foi configurada.
