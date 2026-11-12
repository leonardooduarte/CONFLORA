# Relatório de testes — CONFLORA V7

**Ambiente:** Chromium automatizado pelo Playwright, HTML carregado em um documento de teste. Teste realizado sobre o código final; a execução direta por URL/arquivo ficou bloqueada pelas restrições do ambiente de teste.

**Resultado:** 25 verificações automatizadas aprovadas, zero falhas observadas nos testes executados.

### Resoluções
- 1440 × 900: HTML, cenas, interação, ausência de overflow horizontal.
- 768 × 1024: carregamento e ausência de overflow.
- 390 × 844 e 320 × 720: carregamento, menus móveis e ausência de overflow.

### Fluxos verificados
- Intensidade de chuva e leitura da porcentagem.
- Jardim de chuva, faixa vegetada e piso permeável.
- Comparação arrastável e Raio X.
- Plantio direto na cena.
- Alternância português/inglês do novo módulo.
- Abertura e fechamento do modo imersivo preservado.
- Passagem ao planejador original.
- Laboratório legado e conclusão do fluxo de quatro etapas do planejador.
- Ausência de exceções JavaScript observadas nos fluxos acima.

### Não verificado / pendências
- Dispositivos físicos, navegadores além do Chromium, leitores de tela, auditoria formal WCAG, Core Web Vitals em produção.
- Geração de PDF e impressão em diferentes sistemas operacionais (função original preservada, não revalidada em todos os dispositivos).
- Precisão de respostas para aplicações ambientais reais, que demandaria estudo e dados empíricos.

**Interpretação:** os testes indicam que os fluxos selecionados funcionaram no ambiente citado; não representam certificação de qualidade ou ausência absoluta de erros.
