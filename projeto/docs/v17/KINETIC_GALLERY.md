# CONFLORA V17 — Galeria cinética (integração parcial)

Fonte: branch `feat/conflora-v17-personalized-visual-20261116`, baseada na V16 validada (`11853a56d8a1ab6a12ae9949c22db36462f2c685`).

## Escopo entregue
- Galeria de 9 imagens já pertencentes ao repositório, com informações PT/EN e identificação explícita dos registros botânicos.
- Efeito de inclinação suave proporcional à **velocidade real** de rolagem (`motion/react`: `useScroll` + `useVelocity` + `useSpring` + `useTransform`).
- Uso de Motion já instalado no projeto, sem Tailwind/shadcn/TypeScript ou dependências novas.
- Design editorial responsivo com 3, 2 ou 1 colunas, modo movimento reduzido e botão de acesso ao Herbário.
- Nova seção na página inicial, sem remover InfiniteMenu do Herbário.

## Limites
- Esta implementação é **somente a galeria visual**, não é conclusão funcional da V17 de propostas botânicas, fotocomposição e relatório.
- Fotos conceituais não são evidência de adequação de espécies nem de desempenho de manejo de águas pluviais.
- A prévia é independente do site oficial.

## Verificação
- `node tests/v17-gallery.mjs`: integração, Motion, movimento reduzido, fontes visuais locais e existência dos arquivos.
- Pipeline completo na prévia V17 roda testes anteriores e regressões Chromium. Revisões manuais em Safari/iOS e testes com usuários seguem pendentes.

## Prévia
https://leonardooduarte.github.io/CONFLORA/previews/conflora-v17/
