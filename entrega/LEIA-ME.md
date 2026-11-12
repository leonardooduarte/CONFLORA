# CONFLORA — Ateliê da chuva / V8

Uma reconstrução da plataforma CONFLORA com paisagem residencial 3D interativa, comparação, anatomia, planejamento e roteiro educativo em português e inglês.

## Começar pela versão pronta

Na entrega completa, a pasta `executavel/` contém o build estático. Abra `index.html` em um navegador moderno que permita JavaScript local. Todos os recursos da experiência principal acompanham a pasta; não é necessário buscar Three.js, fontes ou modelos em CDNs. Fontes e arquivos auxiliares devem permanecer junto do HTML.

Se seu navegador ou sua organização bloquear arquivos locais, sirva a pasta por HTTP:

```sh
cd executavel
python3 -m http.server 8080
```

Abra http://localhost:8080. Abertura file:// não foi validada neste ambiente porque a política do Chromium a bloqueia. O build foi testado em uma origem HTTPS isolada pelo Playwright.

## Instalar e desenvolver

Requisitos: Node.js 22.12+ (ou versão 24 LTS) e npm. A conexão é necessária para instalar dependências; depois do build, a experiência principal não depende de serviços externos.

```sh
cd codigo-fonte
npm ci
npm run dev
```

Abra a URL informada pelo Vite. Para gerar e servir o build:

```sh
npm run build
npm run preview
```

## Testes reproduzíveis

```sh
npm ci
npx playwright install chromium
npm run build
npm test
```

O runner usa o Chromium do sistema quando disponível e, nas demais máquinas, o Chromium instalado pelo Playwright. `CHROMIUM_PATH` permite indicar outro executável. `TEST_OUTPUT` altera o destino de capturas e resultados (padrão: `test-results/`). O teste serve os arquivos de `dist/` por interceptação do Playwright; não necessita de servidor de desenvolvimento.

```sh
CHROMIUM_PATH=/caminho/do/chromium TEST_OUTPUT=./test-results npm test
```

## Experimente

1. Inicie a chuva ou ajuste sua intensidade.
2. Escolha uma das quatro transformações.
3. Abra “Condições do terreno” para superfície e drenagem aparente.
4. Ative “Comparar” e arraste a linha; as setas do teclado também funcionam.
5. Ative “Ver o solo” e explore os cinco componentes na seção seguinte.
6. Leve as escolhas ao plano, responda às quatro etapas e gere o roteiro.
7. Use “Imprimir / salvar PDF”, TXT, cópia ou exportação do contexto do kit.
8. Troque PT/EN para explorar as mesmas jornadas no outro idioma.

## Estrutura

- `src/state.ts`: tipos, estado, validação da persistência e critérios de incerteza.
- `src/content.ts`: conteúdo bilíngue e referências.
- `src/scene.ts`: renderização Three.js, transições, chuva, água e fallback.
- `src/diagrams.ts`: marca provisória, ícones, planta conceitual e anatomia.
- `src/planner.ts`: formulário progressivo, relatório e exportações.
- `src/layout.ts`: seções da interface, separadas por responsabilidade.
- `src/main.ts`: eventos e ligação entre experiência e plano.
- `src/style.css`: sistema visual, responsividade, movimento reduzido e impressão.
- `public/assets/`: fontes locais e licenças.
- `public/original/`: arquivos V7 preservados.
- `tests/run.mjs`: jornadas, capturas, PDFs e axe-core.
- `docs/`: diagnóstico, direção criativa, ciência, alterações, testes e limites.

Não há backend ou envio de dados do formulário. Respostas e idioma podem ficar em localStorage. A opção “Apagar minhas respostas” limpa os dados da versão nova. O relatório é educativo, preliminar e não é um projeto executivo.

## Documentação

Leia os arquivos em `documentacao/` na entrega completa ou `docs/` no código-fonte. A entrega inclui os resultados reais, capturas, exemplos de PDF/TXT/JSON e a versão original. Os testes anteriores da V7 permanecem apenas como arquivos históricos.

## Tecnologias e licenças

Three.js (MIT), Vite (MIT), TypeScript (Apache-2.0), DM Sans e Instrument Serif (SIL OFL). As licenças das fontes estão junto dos arquivos. A autoria e os direitos do material CONFLORA original permanecem com seus titulares.
