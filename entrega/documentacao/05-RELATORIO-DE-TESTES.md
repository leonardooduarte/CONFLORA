# Relatório de testes — CONFLORA V8

Executado em 2026-11-12T16:11:55.313Z. Chromium 156.0.8078.79, Linux, Playwright.

**26 testes aprovados; 0 falhas na rodada final.**

## Método

Foi executado o build de produção, com TypeScript e Vite. O Chromium carregou os arquivos de `dist/` em uma origem HTTPS de teste, usando `route.fulfill` do Playwright. A política local bloqueou navegação file:// e o relay do preview integrado não ficou disponível. Não houve substituição da aplicação por mockup: JavaScript, WebGL, fontes, downloads e impressão do build real foram executados no navegador.

Os viewports foram emulados. Não representam testes em dispositivos físicos. A renderização de teste usa Chromium com suporte a SwiftShader; estes resultados não são medições de desempenho em GPU de usuário.

## Resultados

| Verificação | Resultado |
|---|---|
| Desktop: 3D real, primeira interação e captura | APROVADO |
| Intensidade acessível por teclado: sem chuva, leve, moderada e intensa | APROVADO |
| Solo e superfície alteram o estado e as explicações | APROVADO |
| Quatro intervenções com geometria diferente e estado compartilhado | APROVADO |
| Comparador contínuo por teclado altera a imagem nos extremos | APROVADO |
| Percursos, pausa, luz e reinício possuem comportamento | APROVADO |
| Tela cheia nativa abre e fecha a mesma paisagem | APROVADO |
| Plantio com alternativa de teclado e remoção | APROVADO |
| Guia funcional percorre chuva, comparação e solo | APROVADO |
| Anatomia: todos os cinco componentes abrem e mudam destaque | APROVADO |
| Transferência de solução e solo ao planejador | APROVADO |
| Validação de área impede avanço inválido e leva foco ao campo | APROVADO |
| Planejador completo PT, riscos exclusivos e relatório coerente | APROVADO |
| Exportações reais: TXT, JSON do kit e avaliação | APROVADO |
| Impressão real e PDF A4 contêm apenas o relatório | APROVADO |
| Cópia de resumo usa a área de transferência ou informa a alternativa | APROVADO |
| Troca completa para inglês com relatório e opções traduzidos | APROVADO |
| Persistência local de idioma e respostas após recarga | APROVADO |
| Jornada EN completa e estado sem riscos identificados exige revisão | APROVADO |
| Acessibilidade automatizada desktop: WCAG 2 A/AA e 2.1 A/AA | APROVADO |
| Celular, tablet e desktop: sem rolagem horizontal e capturas reais | APROVADO |
| Movimento reduzido: cena continua estável e controles funcionam | APROVADO |
| Sem WebGL: esquema interativo, comparação e planejamento | APROVADO |
| Armazenamento bloqueado: aplicação e apagamento continuam utilizáveis | APROVADO |
| Versão V7 original preservada e comparação visual na mesma resolução | APROVADO |
| Zero exceções não tratadas nas jornadas principais | APROVADO |

## Acessibilidade

axe-core executou as regras com tags WCAG 2 A/AA e WCAG 2.1 A/AA no desktop com jornada em inglês e no celular com jornada em português. A rodada final encontrou **zero violações nessas regras**. Uma verificação adicional em 1440, 768, 390 e 320 px também passou após correções de contraste.

Foram exercitados foco em erros, sliders por teclado, opções nativas de formulário, redução de movimento e comparação por toque. Isso **não é uma auditoria completa WCAG 2.2 AA**. Não houve avaliação com leitores de tela ou usuários com deficiência.

## Capturas e exportações

- Desktop: 1440×1000 e 1920×1080.
- Tablet: 768×1024 e 1024×768.
- Celular: 390×844, 360×800 e 320×700.
- Estados: chuva, comparação, solo, anatomia, piso permeável, relatório PT, interface EN e fallback sem WebGL.
- A V7 foi aberta e capturada novamente a 1440×1000 para comparação visual; os arquivos originais foram verificados por SHA-256.
- Foram baixados TXT, contexto JSON e avaliação. Os PDFs PT e EN foram realmente produzidos pelo Chromium.

- `exemplo-relatorio-pt.pdf`: 1 página(s), 1928 caracteres de texto extraível.
- `exemplo-relatorio-en.pdf`: 1 página(s), 1734 caracteres de texto extraível.

## Falhas encontradas e corrigidas

A primeira rodada identificou contraste insuficiente em índices secundários e uma configuração de teste sem suporte a toque. As cores foram escurecidas e o contexto móvel passou a usar `hasTouch`/`isMobile`. A rodada final completa foi executada novamente. O layout de impressão foi ajustado para evitar uma página adicional apenas com as limitações.

## Limites da conclusão

- Nenhuma exceção JavaScript não tratada nas jornadas principais executadas.
- Sem rolagem horizontal nas larguras examinadas.
- Sem testes Safari, Firefox, aparelhos físicos, campo hidrológico, carga de backend ou Core Web Vitals em produção.
- Tela cheia e cópia continuam sujeitas às APIs/permissões do navegador do visitante.
- O teste do original preserva sua visualização histórica e não certifica todos os modos antigos.

O JSON bruto está em `testes/resultados.json`; capturas e exemplos acompanham a entrega.

## Verificação adicional do build final

A jornada completa em inglês também foi exercitada em celular de 390×844, incluindo geração do relatório e acesso à galeria de entregáveis. A verificação passou, sem exceções JavaScript. O link de entrega foi corrigido para abrir a galeria em vez de baixar seu HTML. O build final passou novamente pela checagem TypeScript e pelo Vite.

SHA-256 do HTML final: `bf3f2c479f17cf2950334f218d05407425ace6f269fa9393cbc99c1d12b58982`. A cópia dentro da versão executável é verificada contra esse arquivo antes da publicação.
