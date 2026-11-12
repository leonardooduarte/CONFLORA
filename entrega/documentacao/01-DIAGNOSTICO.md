# Diagnóstico da V7

O arquivo recebido foi tratado como material de referência. O pedido foi lido no “Texto colado.txt”. Nenhuma instrução interna do ZIP substituiu esse pedido.

## Inventário inspecionado

O pacote contém um HTML de 265.169 bytes, README, registro de mudanças, relatórios de teste JSON/Markdown e quatro capturas PNG. O HTML incorpora as experiências V3/V4, um estúdio Canvas da V5 e uma abertura SVG/Canvas V7. Foram inspecionados os controles, funções de tradução, estado, planejador, critérios de risco, exportações, anatomia e os três renderizadores. Os relatórios antigos são evidência histórica, não testes desta entrega.

## Conhecimento e comportamento preservados

| Recurso V7 | Destino V8 |
|---|---|
| Chuva controlável, superfícies e drenagem aparente | Experiência única com quatro estados de chuva, três superfícies e três condições de solo |
| Jardim, faixa vegetada, vala e piso permeável | Quatro intervenções com geometrias próprias; todas chegam ao roteiro |
| Comparação contínua | Dois estados 3D do mesmo terreno, recortados por scissor; controle nativo por teclado/toque |
| Raio X e cinco componentes | Geologia na cena e anatomia com cinco componentes e explicações |
| Adição ilustrativa de plantas | Raycasting na paisagem e alternativa por botão; remoção funcional |
| Luz do dia/entardecer e modo imersivo | Iluminação 3D alterável, pausa e Fullscreen API |
| Demonstração guiada | Guia em quatro passos que altera os estados reais |
| Planejador de quatro etapas | Formulário progressivo, área validada e estado compartilhado com a cena |
| Região, propriedade, origem da água, solo, declividade, sol, umidade e riscos | Campos preservados; objetivo acrescentado para o contexto do Kit Studio |
| Risco, incerteza, critérios de segurança | Resultado cauteloso; nenhuma classificação autoriza instalação |
| TXT, cópia e impressão/PDF | Exportações implementadas e layout de impressão específico |
| Avaliação local e exportação | Feedback sem envio a servidor |
| Tradução PT/EN | Interface, formulários, opções, explicações, relatórios e exportações |
| Kit físico e referências | Contexto exportável em JSON e estado de integração explicitamente em desenvolvimento |
| Laboratórios e construtores históricos | V7 completa, intacta, acessível no rodapé e incluída no pacote |

## Problemas que justificaram reconstrução

- Três sistemas visuais e controladores de cena sobrepostos; estados da abertura e do laboratório divergiam.
- Um único HTML reunia conteúdo, CSS, renderização, exportação e evoluções históricas.
- O piso permeável era explorável, mas não fazia parte do resultado do motor antigo.
- Água, vegetação e transformações tinham pouca materialidade e profundidade.
- A navegação apresentava modos diferentes para a mesma ideia, aumentando a carga de aprendizado.
- O formulário não oferecia uma entrada numérica de área com validação explícita.

## Preservação

A pasta `original/` da entrega contém todos os arquivos do ZIP sem alterações. O ZIP recebido também acompanha o pacote. A construção nova não edita os originais. Os hashes SHA-256 estão em `ORIGINAIS-SHA256.json`.
