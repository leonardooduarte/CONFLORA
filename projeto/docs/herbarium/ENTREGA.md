# Herbário e seleção fundamentada

## Entrega
Herbário no menu principal e móvel, dois caminhos na abertura, seção editorial botânica imediatamente após abertura. Busca e contexto regional acessíveis antes de formulários/animações. Galeria InfiniteMenu original aberta imediatamente após a busca e o contexto regional; catálogo e filtros independentes. Ficha rápida, leitura científica expansível, comparação de até três espécies.

Condições do espaço/área: região, luz, drenagem observada, umidade, duração do acúmulo, proximidade de construções, espaço e disponibilidade de manutenção, todos com Não sei. Localização aproximada/área numérica continuam no planejador. Interesses permanecem ligados à área. Prévia adiciona marca de vegetação com espécie identificada: arrastar, escala e visibilidade são os controles existentes. É uma representação esquemática, sem escala física/crescimento.

Planejador e relatório reutilizam as seleções do espaço e áreas, hipóteses, limites e referências. Diário agora registra espécie e distingue o evento Plantio dos interesses. Importação/exportação preservam condições, espécie da marca, espécie do diário e rascunho, com whitelisting. Kit não recebeu espécies nem instruções inventadas.

## Regras (core/selection.js)
1. Região conhecida e pelo menos luz ou umidade informada são necessárias.
2. Apenas espécies do mesmo contexto documental (Brasil/Bauru-SP ou Iowa) entram na seleção.
3. Exclui contradições conhecidas de luz/umidade. Campo botânico desconhecido não vira correspondência.
4. É necessária ao menos uma correspondência documentada de luz/umidade.
5. Alagamento episódico de estudo em vasos não equivale a solo permanentemente molhado.
6. Guia regional e estudo em protótipos são tipos de evidência distintos, sem pontuação nem garantia. Não há ranking de eficiência.
7. Solo, espaço e manutenção são registrados e listados como verificações; não há dados quantitativos suficientes para filtrá-los honestamente. Origem nativa, ocorrência, posição documentada e limites são exibidos, não convertidos em garantia local.
8. Água persistente informada junto a construções exibe alerta para avaliação profissional. A categoria é observacional; não é um limiar hidráulico calculado.

## Base e fontes
Mantidas dez espécies, sem adicionar nomes para inflar catálogo. Revisadas as entradas do guia ISWEP já arquivado no workspace (Apêndice A: Monarda, Asclepias, Rudbeckia) e os limites do estudo brasileiro em protótipos. A página educativa EPA foi acessada. O link do PDF Iowa State RG605 retornou 404 em 16/11/2026; a referência agora aponta claramente ao portal institucional (HTTP200), preserva originalUrl e informa a indisponibilidade, sem fingir acesso ao PDF.

Brasil: dados insuficientes de luz/umidade podem gerar seleção vazia. Isso é um resultado honesto, não uma indicação automática de espécies de Iowa. Pesquisa botânica adicional e validação regional continuam necessárias. Não há inferência automática da foto nem recomendação profissional de plantio.

## Verificação e limites
Build, testes estáticos/modelo, teste de seleção e suíte de navegador específica executados; resultados finais em evidencias/herbarium. Suíte cobre foto, área, condições, alerta, interesse, comparação, prévia, plano, registro de plantio, salvamento e busca móvel. Regressão geral inclui editor/Step­per/relatório/downloads. Não foram executadas todas as variantes históricas de testes nem auditoria completa de acessibilidade/Safari/hardware físico. Aviso de bundle >500kB persiste. Fontes originais React Bits preservadas com hashes do build. main intacta.

Revisão da galeria: removido o disclosure e promovida a galeria antes das condições do terreno, sem alterar animação ou fontes oficiais.
