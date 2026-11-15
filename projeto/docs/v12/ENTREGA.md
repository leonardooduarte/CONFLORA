# CONFLORA V12 — entrega e execução

Código-fonte na pasta projeto/. Versão piloto 12.0.0-beta.2. Não é um projeto executivo nem uma recomendação agronômica validada.

## Executar

```sh
cd projeto
npm ci
npm run dev
```

Abra a porta indicada pelo Vite. Pelo Chrome/Codespaces, use Open in Browser na aba Ports. Para produção: `npm run build` gera dist/. Os caminhos são relativos, compatíveis com publicação em subpasta.

## Validar

```sh
npm test
npm run build
# Inicie o Vite em outro terminal; padrão dos testes V12: localhost:5176
npm run dev -- --port 5176
# Em outro terminal:
BASE_URL=http://localhost:5176 npm run test:v12
BASE_URL=http://localhost:5176 npm run test:accessibility
BASE_URL=http://localhost:5176 npm run test:browser
BASE_URL=http://localhost:5176 npm run test:video4
```

Instale o navegador padrão com `npx playwright install chromium ffmpeg`, ou defina CHROMIUM_PATH para um Chromium instalado. Os testes V12 gravam vídeo e capturas em work/ (ignorado pelo Git). BASE_URL e TEST_OUTPUT podem ser personalizados. No Windows, variáveis podem ser definidas pelo PowerShell antes do comando npm.

Dependências de execução e testes constam em package.json e package-lock.json. Fontes DM Sans/Instrument Serif são locais. Não foi adicionada uma biblioteca de desenho: o SVG existente foi estendido com geometrias no mesmo sistema de coordenadas.

## Funcionalidades entregues

| Percurso | Situação nesta edição |
|---|---|
| Criar espaço, enviar foto, anotar e editar | Funcional; quadro normalizado, tamanho, notas, exclusão, desfazer/refazer |
| Caminhos de água | Linhas com vértices editáveis, seta e reprodução seguindo os pontos do usuário |
| Áreas e superfícies | Polígonos associados ao tipo de marcação; pontos por mouse/toque ou campos X/Y |
| Zoom e deslocamento | Zoom e controles de deslocamento/enquadramento; não há gesto de pinça |
| Camadas | Ocultar/mostrar e trazer para frente; exportação inclui todos os registros |
| Plantas | 10 fichas, 9 fotos, filtros e lista de interesse vinculada à marcação/projeto |
| Soluções | Três conceitos documentados, interesse salvo no plano e galeria oficial |
| Água | Fotografia licenciada, quatro temas interativos, Ripple original e alternativa estática |
| Planejamento | Regras explícitas por observações, caminhos, intervenção e espécies; dados desconhecidos |
| Relatório | A4, imagem/legenda, contexto, regras, plantas, referências e próximos passos |
| Diário | Registros datados por tipo/área, fotos, comparação de datas, checklist e rascunho preservado |
| Projetos | IndexedDB, exportação/importação V12, leitura de V11, exclusão e estimativa de quota |
| Kit | Identificação, tarefas, diário, acesso à biblioteca e registro de conteúdo oficial vazio |
| Raízes | Cena educativa em quatro etapas e duas superfícies; não simulação |
| PT/EN | Novos módulos traduzidos; nomes científicos preservados |

## Pendências e limites

- Foto identificada e licenciada de Syngonium angustatum ainda pendente; a interface informa a ausência.
- Campos de cultivo das espécies brasileiras sem evidência transferível continuam “não verificado”. A lista não é prescrição de plantio.
- Conteúdo definitivo, espécies e instruções do kit dependem da equipe americana. QR Code é planejamento de integração, não distribuição oficial.
- Safari, Firefox e dispositivos físicos não foram testados. Emulação de toque e viewports não substitui teste em hardware real.
- Comparação visual pixel a pixel com os sites de demonstração React Bits não foi certificada. Código oficial foi conferido por hashes e efeitos utilizados foram executados no Chromium.
- O editor trabalha em um quadro normalizado da fotografia, sem escala de engenharia. Não mede área real nem calcula água, declividade ou eficiência.
- Salvamento é local à origem/navegador. Salvar/exportar é necessário; não há sincronização entre computadores. A estimativa de quota vem do navegador e pode variar.
- A refatoração do App legado é parcial; novas funcionalidades foram isoladas em módulos. Não há arraste para reordenar camadas nem gesto de pinça; há controles funcionais equivalentes para as ações entregues.

## Próximas evoluções fundamentadas

Validar o catálogo com botânico regional, obter manual confirmado do kit, testar hardware/Safari/Firefox e auditar acessibilidade com leitores de tela. Manter campos/fonte/data por ficha. Expansão do catálogo deve preservar separação de contexto e origem; não preencher automaticamente campos científicos vazios.
