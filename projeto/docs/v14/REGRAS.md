# CONFLORA V14 — Regras explicáveis de leitura da área

Arquivo: `src/core/siteAnalysis.js`.

1. Entradas desconhecidas ficam `unknown` (usando `cleanConditions` da V13); nenhuma inferência é feita a partir da fotografia.
2. A área utiliza os próprios campos `conditions`, sobrescrevendo apenas os campos respectivos do projeto, mantendo a compatibilidade com versões antigas.
3. Quando há duração persistente ou proximidade de construções, o resultado prioriza avaliação de riscos; **não** apresenta uma proposta de jardim de chuva como indicação segura.
4. Drenagem aparentemente lenta também impede a apresentação de jardim de chuva como hipótese sem análise do solo; cobertura vegetada aparece só como tema para investigação.
5. Em caso exploratório com região e luz/umidade conhecida, podem aparecer apenas **hipóteses condicionadas**: cobertura vegetada e, se não houver contraindicação informada, investigação de jardim de chuva.
6. O número de candidatas documentais é calculado por `selectPlants` da V13. A leitura ambiental não altera a base de elegibilidade botânica nem atribui métricas de absorção.
7. Duas áreas com observações distintas devem produzir alertas e próximos passos distintos, preservados no plano. Não há diagnóstico hidráulico ou comparação de eficácia de cenários.

## Alertas
A leitura não mede infiltração, vazão, declividade, níveis freáticos ou a proximidade real de fundações. São informações declaradas pelo usuário. A avaliação de drenagem por profissional habilitado é necessária em contextos com riscos ou para execução de uma solução.
