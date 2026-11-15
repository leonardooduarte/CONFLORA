# Auditoria da base recebida — CONFLORA V12

Base: commit 0709c34, branch fix/integracao-reactbits-conflora. A revisão V12 foi isolada em feat/conflora-v12. Main e original/ preservados.

| Gravidade | Achado na base | Decisão |
|---|---|---|
| Alta | Importação espalhava propriedades arbitrárias do JSON no projeto; campos novos não tinham migração | Modelo V12 e whitelist, migração V11, limites e validação de imagens locais |
| Alta | Inexistência de catálogo, vínculos de espécies, geometrias e diário do jardim | Novos módulos com dados persistentes; não substituir o editor existente |
| Alta | Plano tinha verificações genéricas; não interpretava registros específicos | Regras transparentes, observações separadas de verificações e desconhecidos |
| Média | Água era painel abstrato sem interpretação contextual | Fotografia licenciada, Ripple original e pontos com alternativas de teclado |
| Média | WebGL e movimento não tinham alternativa adequada na seção educativa | Imagem estática para ausência de WebGL/reduced motion e ativação por visibilidade |
| Média | Fontes externas e carregamento JS concentrado | Fontes locais com OFL, rotas sob demanda e chunks separados |
| Média | Editor permitia apenas pontos, com precisão limitada ao mover observações complexas | Polígonos, linhas, vértices por coordenadas, camadas, pan e reprodução vinculada ao caminho |
| Média | PT/EN e CSS centralizados em App, algumas legendas técnicas ambíguas | Novos módulos isolados e nomes de caminhos explícitos; monólito legado parcialmente preservado |
| Baixa | Componentes oficiais instalados, hashes existentes e build funcional | Preservados sem modificações; conferidos novamente contra os oito registros oficiais |

## O que foi preservado

Modelo local IndexedDB, banco con flora V11 (nome preservado para compatibilidade), uploads por FileReader/canvas, motor SVG, desfazer/refazer, proteção de alterações, biblioteca de projetos, kit, comparação, relatórios e oito efeitos oficiais. O código do fornecedor não foi reescrito.

## Arquitetura final

- src/core/project.js: fronteira de importação e migração.
- src/core/knowledge.js: referências, vocabulário e regras de planejamento.
- src/data/: plantas, referências e registro vazio do kit confirmado.
- src/features/: plantas, soluções, diário, raízes, água e evidências do plano.
- src/components/EnvironmentalImage.jsx: ativação WebGL por visibilidade e fallback estático.
- src/core/editor.js: renderização das geometrias normalizadas no quadro 1000 × 650.

O App ainda concentra navegação/estado e parte do editor legado. Não houve substituição integral da aplicação. A divisão futura do editor/relatório pode ser feita sem migrar novamente os projetos.
