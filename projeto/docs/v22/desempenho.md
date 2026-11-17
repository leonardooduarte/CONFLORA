# Desempenho — comparação de produção V21.2 → V22

## Método

Duas execuções sequenciais por versão, no mesmo computador, Chromium e servidor HTTP Python na porta 5181. Build V21.2 preservado antes das alterações; build final V22 medido depois dos testes. Lighthouse 12.8.2, perfil móvel simulado de 412 × 823, DPR 1,75, lentidão de CPU 4× e rede móvel simulada. Chromium com SwiftShader, sem aceleração gráfica de hardware. Não houve testes de navegador executando em paralelo com as medições.

As medianas de duas execuções são a média dos dois valores. Pontuações não são medições de usuários reais. INP de campo não foi medido. O histórico fornecido pelo pedido (26/88/100/92) veio de outro ambiente; não foi usado como se fosse uma comparação equivalente.

| Medida | V21.2 antes | V22 depois |
|---|---:|---:|
| Performance | 25/100 | 25/100 |
| Acessibilidade automática | 88/100 | 100/100 |
| Boas práticas | 100/100 | 100/100 |
| SEO | 100/100 | 100/100 |
| first-contentful-paint | 8.48 s | 8.38 s |
| largest-contentful-paint | 13.35 s | 10.40 s |
| total-blocking-time | 74.80 s | 28.76 s |
| cumulative-layout-shift | 0.021 | 0.001 |
| speed-index | 27.69 s | 26.29 s |

## Investigação e alterações

O relatório inicial apontou custo elevado na thread principal, com predominância da categoria “Other”, além de estilo/layout e execução de scripts. Isso não permite atribuir todo o bloqueio a uma biblioteca ou ao globo. O ambiente usa renderização gráfica em software, que limita a extrapolação para celulares reais.

- Título e subtítulo passaram a texto imediatamente legível, sem a inicialização tipográfica SVG no hero.
- Fundos Topography/WebThreads originais são dispensados em telas menores ou com movimento reduzido e desmontados fora da área próxima ao viewport.
- Globo preservado: até 30 atualizações por segundo; sem redesenho contínuo quando pausado, fora da tela ou com movimento reduzido. Arraste e teclado invalidam a imagem e continuam funcionando.
- O COBE 2 já multiplica o tamanho pelo DPR; a aplicação deixou de aplicar essa multiplicação duas vezes. DPR limitado a 1,25 no celular e 1,5 no desktop.
- Menos fotos do globo com carregamento prioritário inicial; as 16 fotografias e seus créditos continuam presentes.
- Recursos gráficos iniciam depois da remoção da apresentação; o aplicativo monta em paralelo.
- Nenhuma dependência gráfica pesada foi acrescentada para a marca.

O TBT mediano caiu 61.5%. A pontuação geral permanece baixa e deve ser tratada como **P1 pendente para publicação oficial**. Não se declara que a V22 ficou rápida em dispositivos reais, nem que uma nota de acessibilidade automática representa conformidade WCAG.

## Evidências e continuação

[Valores por execução e configuração](medicoes-locais.json). Relatórios Lighthouse originais compactados: [antes 1](lighthouse/before-1.json.gz), [antes 2](lighthouse/before-2.json.gz), [depois 1](lighthouse/after-1.json.gz), [depois 2](lighthouse/after-2.json.gz).

Próximos passos: perfil de CPU/GPU em aparelho físico; análise dos custos de layout/âncoras CSS do globo e de inicialização do aplicativo; divisão adicional de módulos após medição; repetir auditorias na hospedagem pública com condições controladas. Otimizações futuras devem preservar o globo, as interações, a legibilidade e a integridade do editor.
