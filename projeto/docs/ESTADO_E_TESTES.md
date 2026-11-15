> Histórico do ZIP recebido. Para a revisão atual, leia AUDITORIA_E_CORRECOES.md.

# Estado da entrega e testes — CONFLORA React Bits

## Realizado neste ambiente

- [x] Inspecionado o pacote real da CONFLORA V11.
- [x] Obtidos os metadados dos oito registros oficiais JS-CSS do React Bits via GitHub, incluindo dependências e caminhos.
- [x] Criada estrutura React/Vite com componentes React do editor, comparador, Stepper de planejamento, checklist e relatório, sem iframe e sem dependência do HTML antigo em runtime.
- [x] Reaproveitadas funções de visualização SVG, importação de fotografias e armazenamento local do pacote original.
- [x] Criado instalador que obtém o código original e recusa substituições simplificadas.
- [x] Analisada sintaxe JSX por TypeScript `transpileModule` (sem verificar dependências ou execução).
- [x] Executados testes estáticos das funções do editor e modelo, e da estrutura do projeto (`npm run test:static` PASSOU).

## Não realizado — NÃO declarar aprovado

- [ ] `npm install` (falhou por DNS `EAI_AGAIN` ao acessar registry.npmjs.org).
- [ ] Download dos arquivos originais do React Bits no container local (bloqueado por rede; o instalador está incluído para execução em ambiente com Internet).
- [ ] `npm run build` (depende dos passos anteriores).
- [ ] Teste de renderização real dos oito componentes e comparação visual com demos oficiais.
- [ ] Testes de webcam/foto, localStorage/IndexedDB, formulários e exportação em um navegador com o app React rodando.
- [ ] Auditoria WCAG 2.2 AA e testes em dispositivos físicos.
- [ ] Publicação em GitHub (repositório original não foi modificado).

## Próxima validação obrigatória

Em uma máquina conectada:

1. Execute `npm install` e `npm run setup:reactbits`.
2. Compare `docs/reactbits-provenance.json` com os arquivos em `src/components/reactbits`.
3. Execute `npm run build` e `npm run preview`.
4. Realize testes de cada animação contra a página oficial com parâmetros equivalentes, incluindo WebGL.
5. Teste o fluxo foto → marcação → comparação → plano → impressão → salvar → reabrir.
6. Valide mobile, teclado, `prefers-reduced-motion` e desempenho.

**Status real:** migração de código-fonte preparada, integração real dependente de instalação e verificação. Não é uma versão de produção validada.
