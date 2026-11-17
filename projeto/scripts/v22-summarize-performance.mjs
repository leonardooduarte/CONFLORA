import fs from 'node:fs';
import {gzipSync} from 'node:zlib';
import {execFileSync} from 'node:child_process';
const keys=['first-contentful-paint','largest-contentful-paint','total-blocking-time','cumulative-layout-shift','speed-index'];
const summary={afterMeasuredCommit:'c8d3a11ae6a4f091d8c84755bc09ed3c5b7f06ed',method:'Two sequential mobile simulated production Lighthouse runs per version, same host, same Python HTTP server port 5181, same Chromium/flags; no browser tests in parallel. SwiftShader software graphics. Synthetic lab values, not field INP.',chrome:execFileSync('/usr/bin/chromium',['--version'],{encoding:'utf8'}).trim(),before:[],after:[]};
fs.mkdirSync('docs/v22/lighthouse',{recursive:true});
for(const phase of ['before','after'])for(const run of [1,2]){
 const file=`work/v22/lighthouse-${phase}-${run}.json`,raw=fs.readFileSync(file),j=JSON.parse(raw);
 if(j.runtimeError)throw new Error(file+': '+j.runtimeError.message);
 summary[phase].push({run,lighthouseVersion:j.lighthouseVersion,fetchTime:j.fetchTime,source:phase==='before'?'30aa2c21b74d77aa4633a63d40ba215d4f5f8279':'feat/conflora-v22-release-candidate; final application build',scores:Object.fromEntries(Object.entries(j.categories).map(([k,v])=>[k,Math.round(v.score*100)])),metrics:Object.fromEntries(keys.map(k=>[k,j.audits[k]?.numericValue??null])),config:j.configSettings,failedAccessibility:j.categories.accessibility.auditRefs.filter(x=>j.audits[x.id]?.score===0).map(x=>x.id)});
 fs.writeFileSync(`docs/v22/lighthouse/${phase}-${run}.json.gz`,gzipSync(raw,{mtime:0}));
}
const median=values=>values.sort((a,b)=>a-b).reduce((acc,_,i,a)=>acc+(i===Math.floor((a.length-1)/2)||i===Math.ceil((a.length-1)/2)?a[i]/(a.length%2?1:2):0),0);
summary.medians=Object.fromEntries(['before','after'].map(phase=>[phase,{scores:Object.fromEntries(Object.keys(summary[phase][0].scores).map(k=>[k,median(summary[phase].map(x=>x.scores[k]))])),metrics:Object.fromEntries(keys.map(k=>[k,median(summary[phase].map(x=>x.metrics[k]))]))}]));
fs.writeFileSync('docs/v22/medicoes-locais.json',JSON.stringify(summary,null,2)+'\n');
const before=summary.medians.before,after=summary.medians.after;
const m=(phase,k)=>k==='cumulative-layout-shift'?phase.metrics[k].toFixed(3):(phase.metrics[k]/1000).toFixed(2)+' s';
fs.writeFileSync('docs/v22/desempenho.md',`# Desempenho — comparação de produção V21.2 → V22

Medições da abertura no commit c8d3a11ae6a4f091d8c84755bc09ed3c5b7f06ed. As correções posteriores de rótulos após troca de idioma e da fonte do título do PDF foram testadas, mas não motivaram outra rodada de Lighthouse; não se apresentam novas pontuações para esses ajustes.

## Método

Duas execuções sequenciais por versão, no mesmo computador, Chromium e servidor HTTP Python na porta 5181. Build V21.2 preservado antes das alterações; build final V22 medido depois dos testes. Lighthouse ${summary.after[0].lighthouseVersion}, perfil móvel simulado de 412 × 823, DPR 1,75, lentidão de CPU 4× e rede móvel simulada. Chromium com SwiftShader, sem aceleração gráfica de hardware. Não houve testes de navegador executando em paralelo com as medições.

As medianas de duas execuções são a média dos dois valores. Pontuações não são medições de usuários reais. INP de campo não foi medido. O histórico fornecido pelo pedido (26/88/100/92) veio de outro ambiente; não foi usado como se fosse uma comparação equivalente.

| Medida | V21.2 antes | V22 depois |
|---|---:|---:|
| Performance | ${before.scores.performance}/100 | ${after.scores.performance}/100 |
| Acessibilidade automática | ${before.scores.accessibility}/100 | ${after.scores.accessibility}/100 |
| Boas práticas | ${before.scores['best-practices']}/100 | ${after.scores['best-practices']}/100 |
| SEO | ${before.scores.seo}/100 | ${after.scores.seo}/100 |
${keys.map(k=>`| ${k} | ${m(before,k)} | ${m(after,k)} |`).join('\n')}

## Investigação e alterações

O relatório inicial apontou custo elevado na thread principal, com predominância da categoria “Other”, além de estilo/layout e execução de scripts. Isso não permite atribuir todo o bloqueio a uma biblioteca ou ao globo. O ambiente usa renderização gráfica em software, que limita a extrapolação para celulares reais.

- Título e subtítulo passaram a texto imediatamente legível, sem a inicialização tipográfica SVG no hero.
- Fundos Topography/WebThreads originais são dispensados em telas menores ou com movimento reduzido e desmontados fora da área próxima ao viewport.
- Globo preservado: até 30 atualizações por segundo; sem redesenho contínuo quando pausado, fora da tela ou com movimento reduzido. Arraste e teclado invalidam a imagem e continuam funcionando.
- O COBE 2 já multiplica o tamanho pelo DPR; a aplicação deixou de aplicar essa multiplicação duas vezes. DPR limitado a 1,25 no celular e 1,5 no desktop.
- Menos fotos do globo com carregamento prioritário inicial; as 16 fotografias e seus créditos continuam presentes.
- Recursos gráficos iniciam depois da remoção da apresentação; o aplicativo monta em paralelo.
- Nenhuma dependência gráfica pesada foi acrescentada para a marca.

O TBT mediano caiu ${(100*(1-after.metrics['total-blocking-time']/before.metrics['total-blocking-time'])).toFixed(1)}%. A pontuação geral permanece baixa e deve ser tratada como **P1 pendente para publicação oficial**. Não se declara que a V22 ficou rápida em dispositivos reais, nem que uma nota de acessibilidade automática representa conformidade WCAG.

## Evidências e continuação

[Valores por execução e configuração](medicoes-locais.json). Relatórios Lighthouse originais compactados: [antes 1](lighthouse/before-1.json.gz), [antes 2](lighthouse/before-2.json.gz), [depois 1](lighthouse/after-1.json.gz), [depois 2](lighthouse/after-2.json.gz).

Próximos passos: perfil de CPU/GPU em aparelho físico; análise dos custos de layout/âncoras CSS do globo e de inicialização do aplicativo; divisão adicional de módulos após medição; repetir auditorias na hospedagem pública com condições controladas. Otimizações futuras devem preservar o globo, as interações, a legibilidade e a integridade do editor.
`);
console.log(JSON.stringify(summary.medians,null,2));
