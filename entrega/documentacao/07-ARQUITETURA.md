# Arquitetura e decisões técnicas

## Por que TypeScript + Vite + Three.js

A plataforma não precisa de backend, autenticação própria ou dados remotos para as tarefas solicitadas. Foi adotada uma aplicação estática em módulos TypeScript. O estado tipado e explícito liga o renderizador, os controles e o planejador, sem introduzir um framework de interface para uma necessidade que não o exige.

Vite organiza desenvolvimento e build. O plugin de arquivo único incorpora JavaScript e CSS ao HTML final, mantendo fontes, originais e entregáveis como arquivos locais. O resultado pode ser servido por qualquer hospedagem estática.

Three.js atende a tarefa central: um ambiente geométrico real que responde a transformações. Não foram utilizados modelos ou texturas de terceiros. O custo principal de visualização fica nas sombras e na vegetação instanciada; a densidade e a resolução são limitadas. Não se afirma desempenho validado em todo hardware.

## Fluxo de dados

```text
Controles / formulário
        ↓
Estado tipado + persistência local opcional
        ├── renderizador 3D / fallback 2D
        ├── observações e anatomia
        └── roteiro → impressão, TXT, cópia e JSON do contexto
```

As escolhas de solo e solução usam o mesmo estado ao longo da jornada. A intensidade visual da chuva não é transformada em um dado de projeto. O formulário coleta contexto, mas não interpreta área como dimensão hidráulica.

## Responsabilidades

- `state.ts`: contratos, valores padrão, recuperação defensiva de dados salvos e identificação de condições não confirmadas.
- `content.ts`: dicionários PT/EN, componentes e textos educativos, fontes.
- `layout.ts`: construção das seções independentes da interface.
- `main.ts`: eventos, sincronização de estados, navegação, guia e acessibilidade de foco.
- `scene.ts`: materiais, iluminação, geometria, chuva, percursos, scissor, mudança de solução, adição de plantas e perda de WebGL.
- `diagrams.ts`: marca provisória, ícones e diagramas conceituais independentes do 3D.
- `planner.ts`: etapas, validações, relatório, serialização e downloads.
- `style.css`: sistema visual, telas, responsividade, foco, movimento reduzido e mídia de impressão.

## Dados e resiliência

- Não há banco, envio de formulário, rastreamento próprio ou chamada de API do kit.
- localStorage usa uma chave nova (`conflora-atelier-v8`), preservando dados históricos das versões antigas.
- Dados recuperados têm enums verificados; textos de usuário são escapados antes da inserção no relatório.
- Falhas de armazenamento não bloqueiam uso ou limpeza do estado em memória.
- Exportações usam Blob/Object URL e liberam os URLs depois do download.
- A Clipboard API tem alternativa por TXT em caso de falha; Fullscreen API tem mensagem de alternativa.
- Perda ou ausência de WebGL troca para um esquema de planta interativo. O relatório não depende do canvas.

## Publicação

Hospedagem estática, sem configuração de segredos. Instalar dependências exige rede; a experiência pronta não usa CDN. Os links de pesquisa abrem fontes externas apenas quando acionados.
