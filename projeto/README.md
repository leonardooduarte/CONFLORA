# CONFLORA V12

[Execução, funcionalidades e limites](docs/v12/ENTREGA.md) · [Auditoria](docs/v12/AUDITORIA.md) · [Pesquisa e fontes](docs/v12/PESQUISA.md)

A documentação abaixo descreve revisões anteriores e foi preservada como histórico.

# Revisão de integração React Bits

Atualização da gravação conflora4: [correções e testes](docs/CORRECOES_VIDEO4.md).

Veja docs/AUDITORIA_E_CORRECOES.md para o estado atual, testes, evidências e limitações. Os oito componentes oficiais estão incluídos e o build verifica sua integridade.

---

# Documentação recebida (histórica; pode descrever limitações já resolvidas)

# CONFLORA — React + React Bits original (integração em preparação)

Esta é a migração de código-fonte da CONFLORA V11 para **React 19 + Vite**, estruturada para utilizar os oito **componentes originais** do React Bits, variante JS-CSS. O editor, o comparador, o planejamento, o PDF por impressão, o JSON, o IndexedDB, as traduções e o módulo demonstrativo do kit foram reconstruídos como interfaces React, preservando funções e regras da V11. **A migração ainda não passou por build ou execução completa**, pois o ambiente de desenvolvimento disponível não consegue conectar ao npm/registro de componentes. Leia `docs/ESTADO_E_TESTES.md`.

## Instalação (requer internet, Node 20.19+ ou 22.12+)

```bash
npm install
npm run setup:reactbits
npm run check:reactbits
npm run dev
```

Acesse a URL do Vite (normalmente http://localhost:5173). Para produção:

```bash
npm run build
npm run preview
```

> `npm run setup:reactbits` é obrigatório. Não há imitações substituindo os componentes. O script faz GET aos registros oficiais `https://reactbits.dev/r/Nome-JS-CSS.json`, verifica a forma do JSON, grava o conteúdo `.jsx` e `.css` original e registra SHA-256 em `docs/reactbits-provenance.json`. Se a rede estiver indisponível, **falha**. Não rode `npm run build` antes disso. Se preferir, instale cada componente com `npx shadcn@latest add @react-bits/ScrollExpand-JS-CSS` etc, mas observe a pasta esperada em `src/components/reactbits/`.

## Onde cada componente foi usado

- **SplitText** na chamada principal do site;
- **CircularText** como detalhe ao redor do símbolo oficial, sem substituir o logotipo;
- **ScrollExpand** na passagem entre a abertura e a imagem de referência;
- **AnimatedContent** em uma apresentação editorial;
- **RippleDistortion** em uma área ilustrativa de água, não sobre a foto do usuário;
- **MorphSlider** em uma galeria de representações conceituais, não como comparação técnica;
- **Stepper** no planejamento progressivo com dados reais do projeto;
- **SpringCheck** no checklist pessoal do kit, conectado ao mesmo estado persistido no IndexedDB.

## Fluxos principais previstos

1. **Começar com foto ou sem foto** → editor com marcações reais de observações feitas pelo usuário, sem inferência automática.
2. **Marcar** água acumulada, telhado, piso, vegetação, área livre e jardim de chuva conceitual; selecionar, arrastar, ajustar via teclado ou formulário, adicionar notas, desfazer/refazer.
3. **Comparar** cenário original e jardim representado, usando divisor funcional (não é o MorphSlider).
4. **Planejar** em quatro etapas conectadas ao projeto; imprimir relatório com imagem e cuidados; exportar JSON e imagem PNG.
5. **Meu kit**: checklist com SpringCheck, código e diário com imagem; orientações específicas seguem como conteúdo demonstrativo, aguardando confirmação da equipe americana.
6. **Salvar e abrir**: IndexedDB local. No modo privado ou armazenamento indisponível, use JSON.
7. **PT/EN**: troca de idioma na interface sem redefinir o projeto.

### Privacidade

Não há upload de fotos, analytics ou backend. As fotos são convertidas em Data URLs e guardadas localmente; o JSON exportado pode conter fotos pessoais. O conteúdo do kit é provisório. Não são feitos cálculos de infiltração, vazão, dimensões ou garantia de desempenho ambiental.

## Limites conhecidos

- O React Bits não está *vendorizado* neste ZIP: deve ser obtido oficialmente com `npm run setup:reactbits`. Sem Internet e npm não foi possível instalar dependências nem rodar o build/preview. Isso é um bloqueio de infraestrutura, não uma decisão de substituir os originais.
- O `Stepper` da biblioteca tem navegação própria; nenhuma questão do plano foi definida como obrigatória além de iniciar um projeto, portanto a migração não bloqueia avanço por campos opcionais.
- O editor SVG foi reutilizado sem alterações substanciais; os eventos de edição foram convertidos para React. Requer verificação manual de arrasto, zoom, teclado, foco e gestos em hardware real.
- A versão React do relatório usa a função de exportação PNG da V11 e CSS de impressão; requer testes reais de PDF.
- A visualização das fotos é uma sobreposição ilustrativa, **não** renderização fotográfica realista ou previsão técnica.
- Sem acesso ao logotipo vetorial final, utiliza a aplicação raster aprovada já presente no pacote anterior.
- Algumas fontes estão disponíveis via Google Fonts; em funcionamento offline há fallback local serifado/sans.

## Proveniência

Código base derivado dos arquivos da V11 fornecida na conversa. Cópia da versão anterior em `docs/CONFLORA_V11_ORIGINAL.html`. Consulte `docs/ORIGEM_REACTBITS.md`.
