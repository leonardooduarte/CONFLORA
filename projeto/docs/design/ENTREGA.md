# CONFLORA — Caderno de território

## Direção e revisão
Unificar apresentação e ferramentas com papel quente, verde profundo, cobre e tipografia editorial local (Instrument Serif para títulos, DM Sans para controles). Substituir a competição entre tratamentos por regras compartilhadas de superfície, borda, foco e densidade.

Problemas observados: tratamentos divergentes de títulos e cartões; botão Salvar repetido no editor; navegação do plano dispersa; orientações longas do kit sempre expostas; editor móvel com ferramentas e notas empilhadas; fotografia abaixo de muitas instruções. Capturas antes/depois registradas no workspace em work/design; comparação do editor em ../../evidencias/design/editor-antes-depois.jpg.

## Implementação
- Barra do projeto com contexto e etapas Espaço / Herbário / Plano / Registros, conectadas às funções existentes e indicação da etapa ativa.
- Editor móvel recomposto em Imagem / Ferramentas / Caderno; a seleção de uma marca mantém a imagem estável, sem troca forçada de painel. Instrução extensa continua no desktop e no caderno; no celular a ação depende do painel escolhido.
- Kit: informações de composição e orientações em disclosure nativo, conservando fontes e limites; checklist e diário continuam acessíveis.
- Sistema comum de títulos, campos, botões, foco visível, estados desabilitados, mensagens, modais, crédito fotográfico e cartões em todas as telas.
- Abertura mais compacta, menor altura da fotografia e menos espaço nas transições; tipografia local compartilhada com o aplicativo.
- Catálogo e fontes com superfícies de leitura; diário e planejador com a mesma hierarquia e materiais. Nenhum indicador ambiental foi criado.
- Fontes oficiais dos 26 componentes preservadas; hashes conferidos pelo build. Preferência de movimento reduzido mantida; transições próprias removidas nesse modo.

## Validação
npm run build e npm test aprovados. test:browser aprovado (editor, comparação, Stepper, relatório e downloads). Nova suíte tests/design.mjs cobre navegação entre etapas, persistência da nota ao trocar telas, disclosure do kit, modal de projetos, painéis móveis, ausência de overflow a 390px e interface em inglês. Capturas de abertura, editor, diário, kit, plano e modal examinadas. Resultados em ../../evidencias/design/.

Limites: Chromium desktop/emulação de 390px; Safari/iOS e dispositivos físicos ainda precisam de validação. Não foi realizada auditoria completa de acessibilidade nem medição de FPS. Aviso de chunk principal acima de 500kB permanece. Esta revisão preserva mecanismos nativos de confirmação existentes; não os substitui por novos fluxos. main não foi modificada.
