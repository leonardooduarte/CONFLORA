# Direção criativa — Ateliê da chuva

## Três direções consideradas

| Direção | Identidade | Clareza para leigos | Transformação | Custo / risco |
|---|---|---|---|---|
| Atlas de água: cartografia técnica 2D, isolinhas e diagramas | Forte e editorial | Exigiria explicar o terreno abstrato | Excelente para fluxos; residência menos reconhecível | Leve, mas próximo dos laboratórios anteriores |
| Jardim cinematográfico: câmera ao nível do chão, materiais fotográficos e vegetação densa | Imersiva | Casa e jardim imediatamente reconhecíveis | Comparação e solo exigiriam novas câmeras | Modelos e texturas externos, GPU e carregamento maiores |
| Ateliê material: maquete residencial 3D com linguagem de paisagismo | Autoral, calma e coerente com projeto conceitual | Mostra casa, varanda, quintal e percurso numa única vista | Comparação alinhada e geologia legível | Geometria procedural, sem modelos externos; fallback viável |

Escolhida: **Ateliê material**. Os critérios são julgamentos de projeto, não resultados de teste com usuários. A direção permite relacionar ação, paisagem e explicação no mesmo enquadramento. A cena não tenta representar uma residência real nem prometer fotorrealismo.

## Sistema visual

- Floresta #0B241D para controles e estrutura; marfim #F6F5EF como papel do ateliê.
- Água #84CAC8 para percursos; lima #D9FA90 para ações no fundo escuro; terracota #C38C6D para materialidade arquitetônica.
- Instrument Serif para expressão editorial e títulos; DM Sans para controles, leitura e dados. Fontes hospedadas localmente com licenças OFL.
- Linhas, índices e faixas contínuas organizam a informação. O conteúdo não depende de uma coleção de cartões.
- O símbolo C deriva do vetor provisório existente. O pacote não contém a prancha profissional “Proposta C — Icônico”, portanto não é possível afirmar reprodução exata da marca aprovada.

## Renderização

Three.js com câmera em perspectiva, geometrias próprias, sombra direcional, luz hemisférica, texturas procedurais de solo e grama, casa com telhado e detalhes de varanda, folhas e vegetação instanciadas. Geometrias estáticas compatíveis são agrupadas para reduzir chamadas de desenho. Não há fotografias fingindo transformação.

A comparação renderiza a mesma câmera duas vezes, com estados de intervenção diferentes e recortes complementares. Chuva, caminhos, água superficial, hipóteses de infiltração, plantas adicionadas e iluminação recebem estados reais da aplicação. Os símbolos de água não são partículas de um solver físico.

A animação é limitada a aproximadamente 30 atualizações por segundo e suspensa quando a cena sai da área visível ou a aba fica oculta. Em repouso sem chuva não há redesenho contínuo. Movimento reduzido mantém o estado visível sem deslocar chuva e partículas.

## Jornada

1. Entender a ideia e iniciar a chuva.
2. Escolher uma transformação, com condições do terreno disponíveis por revelação progressiva.
3. Comparar e explorar o solo sem sair da paisagem.
4. Ler mecanismos na anatomia e transportar a escolha para o formulário.
5. Reunir informações e receber um roteiro de investigação.
6. Imprimir, baixar ou discutir o contexto de um possível kit com a equipe.

No celular, os controles de chuva vêm antes da cena; condições e ferramentas secundárias se expandem por intenção. As transformações formam uma faixa 2×2 e o planejador usa um indicador compacto de etapas.
