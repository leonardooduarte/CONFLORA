# CONFLORA V22 — candidata à entrega

Prévia isolada: https://leonardooduarte.github.io/CONFLORA/previews/conflora-v22/

Evidências e comparações: https://leonardooduarte.github.io/CONFLORA/previews/conflora-v22/review/

Branch: `feat/conflora-v22-release-candidate`. Base confirmada: `feat/conflora-v21-2-integrated-experience`, HEAD `30aa2c21b74d77aa4633a63d40ba215d4f5f8279`.

## Entrega

- Revisão editorial de todos os módulos, estados e mensagens conhecidos em português e inglês. Registro de 174 alterações/contextos; inventário de 67 arquivos, com distinção entre interface, metadados, fontes e textos embutidos.
- Título visível imediatamente: “Entenda a chuva no seu terreno.” / “Understand rain on your site.” Texto e globo em proporção aproximada de 42/58 no desktop e composição própria no celular.
- Apresentação da marca com o PNG original e nome em branco, duração programada de 1,85 s, botão para pular, teclado, preferência por movimento reduzido e controle por sessão.
- Globo COBE e 16 Polaroids preservados, com teclado, pausa, arraste, renderização limitada a 30 fps, escala de pixels aplicada uma única vez e detecção de WebGL indisponível.
- Fundos decorativos originais carregados apenas no desktop, com movimento permitido e dentro/próximos da área visível. Inicialização gráfica após a apresentação da marca; aplicação e recursos carregam em paralelo.
- Ajustes de contraste, alvos de toque, foco e rótulos acessíveis. Traduções dos controles originais no adaptador, sem reescrever as animações do React Bits.
- Três SVGs educativos em inglês, derivados dos originais, inclusive legendas dentro das figuras.

Não houve reconstrução do aplicativo, alteração da versão dos projetos locais, migração de banco nem mudança de critérios de seleção científica. Permanecem o editor, A/B, herbário, diário, kit, PNG, JSON e PDF. A versão é uma **candidata**, não uma publicação oficial definitiva.

## Documentos

- [Revisão editorial, cobertura e exemplos](revisao-editorial.md)
- [Antes, novo texto e justificativa — CSV completo](alteracoes-editoriais.csv)
- [Cobertura por arquivo](cobertura-editorial.csv)
- [Auditoria final e prioridades](auditoria-final.md)
- [Desempenho: método e medições](desempenho.md)
- [Checklist e limites da validação](checklist-entrega.md)

## Reproduzir

Em `projeto/`, com Node 22 ou superior:

```sh
npm install
npm run dev
npm run build
npm test
npm run test:selection
npm run audit:editorial
```

A prévia de produção pode ser servida com `npm run preview`. Os scripts de navegador locais usam `http://127.0.0.1:5176/`, Chromium em `/usr/bin/chromium` e Poppler para analisar os PDFs. Alternativa de servidor para reproduzir exatamente a validação:

```sh
python3 -m http.server 5176 --bind 127.0.0.1 --directory dist
```

Em outro terminal:

```sh
node tests/v22-browser.mjs
node tests/v22-states.mjs
```

O workflow `.github/workflows/preview-v22.yml` executa também os modelos e regressões das versões V19, V20, V21, V21.1 e V21.2. Só publica após os testes, exclusivamente em `previews/conflora-v22`, com preservação dos demais arquivos.

O commit da aplicação publicada consta de `version.json`; os resultados, textos capturados, vídeos e capturas adicionais ficam em `review/` e no artefato `conflora-v22-validation` da execução do GitHub Actions.
