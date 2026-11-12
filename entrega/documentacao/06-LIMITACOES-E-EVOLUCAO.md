# Limitações e evolução

## Limitações reais

1. A representação é uma maquete artística e qualitativa, sem calibração hidrológica. Tempos, setas, níveis de água, posições e espessuras são ilustrativos.
2. O ambiente não é uma reconstrução do terreno do usuário. O formulário contextualiza um roteiro, não gera geometria topográfica personalizada.
3. A identificação de risco depende das respostas. Não é um sistema de aprovação técnica nem uma inspeção.
4. As quatro intervenções são conceitos educativos. A disposição visual não determina distâncias seguras, volumes de armazenamento ou dimensões para execução.
5. O material original não inclui a prancha ou arquivo profissional da Proposta C. O símbolo é uma evolução do vetor provisório encontrado na V7, sujeita à aprovação da equipe.
6. A conexão com Clean Water Kit é um arquivo de contexto local. Não existe API de integração, catálogo botânico validado, venda, estoque ou promessa comercial.
7. Sem pesquisa regional validada, não são recomendadas espécies. Brasil/Iowa alteram o contexto declarado, não constituem regionalização técnica completa.
8. Não há autenticação própria, sincronização entre dispositivos, servidor de dados ou envio de avaliações. O armazenamento local pode ser apagado pelo navegador.
9. A renderização 3D requer WebGL. Na indisponibilidade, o sistema oferece uma planta educativa 2D. O fallback preserva estados e comparação, mas não tem a mesma materialidade ou iluminação.
10. O modo de tela cheia depende da Fullscreen API e da permissão do navegador. O botão de cópia depende da Clipboard API; o TXT é a alternativa.
11. PDF é gerado pelo fluxo nativo de impressão. O navegador do usuário pode variar fontes, quebras, cabeçalhos e margens. Exemplos A4 realmente gerados estão na entrega.
12. Testes automatizados não equivalem a conformidade WCAG 2.2 AA. Não houve auditoria completa com leitores de tela, usuários com deficiência, todos os critérios de alvo/zoom ou tecnologias assistivas.
13. Viewports de celular/tablet foram emulados no Chromium. Não houve teste em aparelhos físicos, Safari ou Firefox.
14. Não houve pesquisa de usabilidade com moradores/estudantes, avaliação de botânicos/engenheiros nem mensuração de Core Web Vitals em campo.
15. O ambiente de trabalho bloqueou navegação file:// e o relay do preview integrado falhou. O build foi exercitado no Chromium por interceptação de requisições de teste, com origem HTTPS isolada e arquivos idênticos aos de distribuição. Isso não é uma verificação de entrega pela rede de produção.

## Prioridades futuras

- Validar tarefas com moradores e estudantes de Brasil e EUA, nos dois idiomas, incluindo pessoas que usam teclado ou leitor de tela.
- Obter o arquivo oficial da marca e a aprovação das equipes para nome, identidade e apresentação institucional.
- Rever conteúdo e regras com profissionais de drenagem, geotecnia e ecologia regional. Só incorporar números se houver dados, método e validação.
- Definir com a equipe americana o contrato de dados e consentimento do Kit Studio; o JSON atual é somente uma proposta de contexto.
- Ampliar testes para Safari/iOS, Firefox, Android físico, zoom de 200–400%, leitores de tela e diferentes capacidades de GPU.
- Produzir uma biblioteca de vegetação regional verificada antes de qualquer recomendação botânica.
- Avaliar modelos ambientais calibrados em uma fase própria, separados da visualização educativa.
