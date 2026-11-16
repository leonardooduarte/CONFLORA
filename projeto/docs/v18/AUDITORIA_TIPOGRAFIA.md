# Auditoria tipográfica — V18

## Estado anterior
`src/fonts.css`: DM Sans (400–700) e Instrument Serif (normal/italic). Alguns componentes antigos utilizam diretamente Georgia como família principal, apesar de `--serif` apontar para Instrument Serif. Há rótulos de 8–12px nos arquivos legados `style.css`, `atelier.css`, `editorial.css` e `premium.css`.

## V18
- Proposta e PDF: `Instrument Serif` nos títulos editoriais, `DM Sans` em conteúdo, dados, cartões botânicos, legenda e controles.
- Na tela: texto principal 16px, cartões resumidos 13–14px, cabeçalhos responsivos `clamp()`, contraste escuro sobre fundos claros.
- Para A4: corpo da narrativa 9,4–10pt; informações e nomes científicos compactos, mas cartões sem divisão automática entre páginas.
- CSS específico em `src/v18.css`, preservando os estilos anteriores e sem sobrescrever bibliotecas de animação.

## Limitação
O restante do site mantém regras legadas, portanto **não** se declara uma consolidação global de tokens tipográficos nesta etapa.
