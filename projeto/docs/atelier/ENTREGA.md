# CONFLORA — Ateliê de paisagens vivas

Esta revisão concentra o acabamento visual e a continuidade entre as ferramentas, preservando o modelo V12, a identidade aprovada e o código dos oito componentes React Bits.

## Mudanças funcionais

- A abertura mostra um folio interativo com três leituras: observar, seguir água e investigar uma área. É uma demonstração identificada, sem inserir registros falsos no projeto. O acesso abre o editor real.
- Barra de intenções no ateliê: Observar mantém a edição; Desenhar inicia um caminho; Investigar destaca o caderno da área e retira os ajustes de edição desse painel.
- Modo foco amplia a área de desenho. O botão e o atalho F alternam o modo; o atalho não intercepta a digitação em campos. Escape cancela o desenho/seleção, e Ctrl/Cmd+Z e Shift+Z acessam o histórico.
- Caderno da área reúne espécies de interesse e visitas realmente vinculadas à marcação. Registrar uma visita abre o diário com a área preenchida, preservando o texto do rascunho existente.
- Meu herbário filtra as espécies salvas no projeto. Não muda a classificação científica das fichas.
- Diário tem filtros independentes de área e atividade e uma composição de linha do tempo.
- Ajustes de precisão ficam em disclosure acessível; as ferramentas existentes permanecem disponíveis.

## Direção visual

Folio fotográfico na abertura, marca como selo complementar, linhas de referência, hierarquia editorial, controles mais discretos, imagem maior no editor e redução de caixas. Catálogo e diário compartilham a mesma linguagem. CSS desta revisão isolado em src/atelier.css, carregado após o legado, sem modificar o fornecedor.

## Validação

Build e testes de modelo/estáticos executados. Percurso V12 e teste de toque/teclado/reduced motion executados. tests/atelier.mjs cobre prévia interativa, herbário, visita vinculada e retorno ao caderno, foco/atalho, intenção de desenho e ausência de overflow nas larguras 320/390/768/1440. Capturas e resultado em evidencias/atelier/.

A versão continua sendo um piloto. Permanecem os limites botânicos e do kit documentados na V12. Não houve validação em hardware físico nem estudo formal de usabilidade; o termo premium é uma direção de design, não uma certificação. Recursos científicos e animações originais não foram substituídos por simulações.
