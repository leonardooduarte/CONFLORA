# Revisão após vídeo conflora6

- InfiniteMenu original preservado em components/reactbits com hashes inalterados. Derivação em components/conflora altera apenas transporte do índice do atlas (flat) e arredondamento do índice antes de mod/floor, além do import de CSS. Índices discretos não devem ser interpolados entre fragmentos: valores próximos ao limite de célula podem selecionar outra linha da textura. Não há alteração de fotos, cores, rotação, física ou interação. Patch é comum à seleção de índices, não um filtro cosmético aplicado às fotos corretas.
- Carregamento das fotografias no atlas recebe status acessível, inclusive em falha de arquivo (catálogo continua disponível). É um indicador de carregamento de imagem, não garantia de conclusão de renderização da GPU.
- Narrativa: observação com caderno de campo; destaque de Asclepias com crédito; cobertura vegetal em vez do esquema genérico. Novas ilustrações editoriais são conceituais e não identificam espécies.
- Galeria de soluções: observação/cobertura/pavimento recebem imagens distintas. Accordion mantém jardim/cobertura/pavimento separados. Ilustrações geradas para o CONFLORA, sem dimensionamento ou promessa de desempenho.
- Seção de entrada do editor substitui imagem repetida por sequência textual curta.
- Comparação informa junto ao controle quando nenhuma intervenção (jardim ou espécie conceitual) foi desenhada.

Verificação: build e testes de modelo; suíte herbarium; smoke galeria/móvel; inspeção de capturas de Monarda e Trimezia; soluções distintas e aviso de comparação. Não certifica todos os drivers WebGL/Safari ou dispositivo físico. Fontes botânicas e fotografias científicas permanecem intactas. Main do GitHub não é alterada.
