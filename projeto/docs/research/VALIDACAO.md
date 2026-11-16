# Validação — CONFLORA, 16/11/2026

## Evidência de execução

Execução do GitHub Actions [43807905116](https://github.com/leonardooduarte/CONFLORA/actions/runs/43807905116), commit `c8f16e411a551e2ed2f8e810630508d369eb2c21`: **concluída com sucesso**. A primeira execução (43807464672) falhou em uma asserção antiga de seleção que exigia correspondência simultânea de todos os campos botânicos; a asserção foi ajustada para aceitar campo desconhecido somente quando há ao menos uma correspondência conhecida, sem permitir contradição conhecida.

Comandos efetivamente aprovados na execução 43807905116:

- `npm ci`
- `npm run build` (incluindo verificação dos componentes React Bits)
- `npm test` (checagens estáticas e migração/modelo)
- `npm run test:selection`
- `node tests/science.mjs`
- `node tests/science-browser.mjs` (Chromium, passou)
- `npm run test:herbarium` (Chromium, passou)

O build ainda emitiu o aviso de chunk principal acima de 500 kB; é uma pendência de desempenho, não falha de compilação.

## Publicação

A prévia foi compilada e publicada em:

https://leonardooduarte.github.io/CONFLORA/previews/conflora-science-v13/

A presença de `index.html` e `assets/` na branch `gh-pages` foi verificada após o workflow 43807905116. O SHA dos cinco arquivos visuais `conflora-*.webp` no diretório da prévia coincide com o do diretório principal publicado, sem substituir a página oficial. O endereço público ainda requer inspeção manual no navegador do usuário para validação de aparência e comportamento fora do Chromium automatizado.

## Cobertura e limites

- Os testes automatizados cobrem caminhos específicos do fluxo, regras de seleção, alertas de segurança e parte da regressão do Herbário.
- O banco operacional contém 14 espécies (10 anteriores + 4 novas de Iowa) e a matriz documental lista 15 candidatas, das quais 11 permanecem pendentes.
- A classificação de região/luz/umidade não prova adequação local nem desempenho hidráulico. Dados brasileiros continuam insuficientes para muitas combinações.
- Não foram auditados todos os dispositivos físicos, Safari/iOS, leitores de tela nem todas as combinações possíveis de dados/importação.
- As novas espécies sem fotografia identificada/licenciada permanecem sem foto, evitando imagens incorretas.
- O editor não calcula infiltração, vazão, armazenamento ou redução de alagamento.

**Não apresentar o resultado como certificação técnica, projeto executivo ou validação agronômica.**
