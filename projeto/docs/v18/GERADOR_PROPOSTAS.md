# Gerador de proposta — escopo V18

A ação **Gerar composição A/B** no painel do plano chama `makeV18Scenario(project,slot)`. Quando permitida:
1. Seleciona áreas com avaliações válidas.
2. Liga marcadores visuais a espécies documentalmente compatíveis.
3. Gera posições aproximadas próximas às áreas observadas, com variação entre A/B.
4. Salva o resultado como instantâneo independente, sem sobrescrever marcadores originais.
5. Permite carregar para editar manualmente por meio da infraestrutura já existente (`ScenarioStudio`).

O gerador não executa projeto paisagístico de engenharia. A posição é ilustrativa, sem escala verificável ou validação de instalações subterrâneas, fundações, relevo, drenagem ou crescimento.

Para o exemplo real de Itapeva, o gerador **não** produz plantio automático: o motor identifica falta de evidências comparáveis e drenagem aparentemente lenta. Como alternativa útil, fornece fotos e fontes de espécies para pesquisa e orientações de verificação.
