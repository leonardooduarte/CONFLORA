import V20Insight,{V20Comparison} from './V20Insight.jsx';
import V21Botanical from './V21Botanical.jsx';
import React from 'react';
import V18Proposal from './V18Proposal.jsx';
import V19Visual from './V19Visual.jsx';
import {buildV19Proposal} from '../core/v19Proposal.js';
import {labels} from '../core/knowledge.js';
export default function V19Proposal({project,lang='pt',onGenerate,onExplore,onEdit,onReport,change,report=false,referenceNumbers}){
 const pt=lang==='pt',proposal=buildV19Proposal(project,lang);
 return <section className="v19-proposal" data-version="19">
 {!report&&<header className="v19-result-intro"><span className="eyebrow">CONFLORA V19 / {pt?'DA ANÁLISE À PROPOSTA VISUAL':'FROM OBSERVATION TO VISUAL PROPOSAL'}</span><h1>{project.name}</h1><p>{project.context.region|| (pt?'Localidade não informada':'Location not reported')} · {project.context.area?project.context.area+' m² · ':''}{labels[lang][project.context.sun]} · {labels[lang][project.context.moisture]}</p>{project.image&&<img src={project.image} alt={pt?'Fotografia original do seu terreno':'Original photograph of your site'}/>}<p>{pt?'Escolha uma composição botânica quando houver evidência e condições suficientes, ou um estudo espacial sem indicação de espécies.':'Choose a botanical composition when evidence and conditions suffice, or a spatial study without species recommendations.'}</p>{onReport&&<button className="btn" onClick={onReport}>{pt?'Abrir relatório':'Open report'} ↗</button>}</header>}
 {!report&&<V20Insight project={project} lang={lang} onEdit={onEdit} onReport={onReport}/>}
 <V18Proposal project={project} lang={lang} proposalData={proposal} VisualComponent={V19Visual} change={change} report={report} onGenerate={onGenerate} onEdit={onEdit} referenceNumbers={referenceNumbers} extraActions={<div className="v19-mode-choice"><div><strong>{pt?'Estudo visual exploratório':'Exploratory visual study'}</strong><p>{pt?'Disponível mesmo com seleção inconclusiva. Zonas âmbar pedem investigação; zonas vermelhas permanecem sem escavação até avaliação.':'Available even with inconclusive selection. Amber zones need investigation; red zones remain undisturbed before assessment.'}</p><div className="btn-row">{['A','B'].map(slot=><button key={slot} className="btn" disabled={!project.image} onClick={()=>onExplore?.(slot)}>{pt?'Criar estudo exploratório ':'Create exploratory study '}{slot}</button>)}</div></div><div><strong>{pt?'Composição botânica documental':'Documented botanical composition'}</strong><p>{proposal.canDraft?(pt?'Há correspondências documentais e dados mínimos para um esboço, sujeito a verificação local.':'Documented matches and minimum data allow a draft, subject to local verification.'):(pt?'Dados atuais não permitem gerar plantio automático. As fichas de pesquisa continuam disponíveis.':'Current data do not allow automatic planting. Research records remain available.')}</p></div></div>}/>
 {!report&&<V21Botanical project={project} lang={lang}/>}
 {!report&&<V20Comparison project={project} lang={lang}/>}
 </section>;
}
