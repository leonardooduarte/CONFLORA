# Motor de seleção CONFLORA — critérios reproduzíveis

Arquivo operacional: `src/core/selection.js`.

1. Sanitizar opções informadas; entradas ausentes ou fora do vocabulário tornam-se `unknown`.
2. Exigir contexto documental BR ou IA e ao menos um parâmetro observado entre luz e umidade.
3. Restringir universo a plantas do contexto documental selecionado.
4. Eliminar contradições conhecidas nos campos luz/umidade, sem converter dado desconhecido em concordância.
5. Exigir ao menos uma correspondência efetivamente documentada em luz ou umidade.
6. Diferenciar evidência de guia regional de ensaio em vasos; nenhuma nota de eficácia ambiental.
7. Não transformar solo, tamanho, disponibilidade de manutenção ou duração da chuva em filtros sem tabela quantitativa específica por espécie. Registrá-los como verificações e alertas de segurança.
8. Acúmulo persistente junto a construções ativa aviso de avaliação profissional; não é medição hidráulica.
9. Cada área marcada mantém suas próprias condições; quando vinculada, elas prevalecem sobre as do projeto geral.
10. Caso nenhuma planta seja documentada para o cenário, retornar resultado inconclusivo com explicação. Para BR, mostrar claramente a insuficiência da base, sem importar espécies IA.

## Rastreabilidade
Campos candidatos: luz, umidade, região, fonte e tipo de evidência. Novas plantas só entram após revisão taxonômica e técnica; as regras não usam pontuações arbitrárias nem deduzem desempenho da foto.

## Não confundIR
`Seleção para investigação` ≠ prescrição de plantio, diagnóstico da drenagem, taxa de infiltração ou cálculo de retenção hídrica.
