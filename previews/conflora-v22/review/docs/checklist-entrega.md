# Checklist de entrega — V22

## Revisão editorial

- [x] Todas as áreas conhecidas da aplicação avaliadas em PT/EN, inclusive conteúdo condicional, formulários, botões, menus, mensagens e rodapé.
- [x] 19 fichas botânicas, textos de fontes/limites, contagens e contextos regionais avaliados.
- [x] Textos dentro do esquema SVG/PNG e dos SVGs educativos avaliados e localizados.
- [x] Relatório HTML, PDF, bibliografia, créditos, versão e nome do arquivo avaliados.
- [x] Registro de antes/depois/justificativa e cobertura por arquivo entregue.
- [x] Referências, nomes científicos, critérios e textos pessoais preservados.

## Implementação e validação

- [x] `npm install` executado.
- [x] Build de produção, verificação dos 26 componentes originais e testes estáticos/modelos executados.
- [x] Modelos de seleção, V19, V20, V21, V21.1, V21.2 e completude do herbário executados.
- [x] Navegação real PT/EN e abertura individual das 19 fichas por idioma.
- [x] Capturas em 320, 390, 768, 1024 e 1440 px; revisão visual de desktop e celular.
- [x] Marca original, remoção automática, pular com clique/Escape/Enter/Espaço, sem repetição na sessão e movimento reduzido.
- [x] Globo real com 16 Polaroids, créditos, teclado e teste de ausência de WebGL.
- [x] Editor, toque, condições por área, resultados integrados, Itapeva, Iowa e dados incompletos.
- [x] Propostas A/B, arraste, PNG, JSON, projetos salvos/reabertos e PDF analisado com Poppler.
- [x] Galeria imersiva, animações visuais e componentes de navegação/galeria exercitados pelos testes de regressão.
- [x] Estados vazios e falhas forçadas em PT/EN: foto, JSON, armazenamento, fonte do PDF, WebGL e nova tentativa da galeria.
- [x] Medições Lighthouse de produção antes/depois em duas execuções por versão, mesmo servidor e configuração; valores registrados em `desempenho.md`.

O workflow executa novamente os testes críticos e só publica se passarem. A evidência corresponde à execução associada ao `sourceCommit` de `version.json`. Testes antigos que selecionavam o botão por um rótulo fixo em português passaram a usar o controle da marca/idioma; as asserções científicas e os cenários não foram reduzidos.

## Limites declarados

- [ ] Homologação em aparelhos físicos, Safari e leitores de tela externos.
- [ ] Avaliação de campo e fechamento das lacunas botânicas brasileiras.
- [ ] Instruções finais e QR oficial do kit confirmados pela equipe.
- [ ] Aprovação humana para transformar a candidata em versão oficial.

Não foi declarada conformidade WCAG integral, desempenho em dispositivos reais, solução de alagamento, dimensionamento hidráulico ou adequação definitiva de plantio. As limitações de desempenho e duração da apresentação sob carga permanecem visíveis na auditoria.

## Isolamento da publicação

O destino autorizado é apenas `/CONFLORA/previews/conflora-v22/`. `protected-paths-before.json` registra `main`, arquivos da raiz de `gh-pages` e as 16 prévias já existentes antes desta entrega. A conferência posterior compara esses objetos; não há merge ou push para `main` no workflow da V22.
