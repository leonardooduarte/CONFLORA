import React from 'react';
import MagicBento from '../components/reactbits/MagicBento.jsx';
import {asset} from '../core/knowledge.js';
export default function ProjectBento({project,lang,onEditor,onPlants,onPlan}){const pt=lang==='pt',latest=[...project.journal].sort((a,b)=>b.date.localeCompare(a.date))[0];return <section className="project-bento"><span className="eyebrow">CONFLORA / {pt?'SEU LUGAR, AGORA':'YOUR PLACE, NOW'}</span><MagicBento columns={4} rowHeight={190} gap={12} radius={14} theme="light" glowColor="148, 111, 67" textAutoHide={false} enableSpotlight enableBorderGlow clickEffect items={[
{id:'place',title:project.name,label:pt?'MEU TERRITÓRIO':'MY TERRITORY',description:pt?'Retorne à fotografia e às suas marcações.':'Return to your photograph and markers.',image:project.image||asset('scene-garden.png'),colSpan:2,rowSpan:2,onClick:onEditor},
{id:'observations',title:String(project.annotations.length),label:pt?'OBSERVAÇÕES':'OBSERVATIONS',description:pt?'Marcas que ajudam a formular perguntas.':'Markers that help formulate questions.',onClick:onEditor},
{id:'plants',title:String(new Set(project.plantInterests.map(x=>x.id)).size),label:pt?'ESPÉCIES EM INVESTIGAÇÃO':'SPECIES TO INVESTIGATE',description:pt?'Revisar meu herbário ↗':'Review my herbarium ↗',onClick:onPlants},
{id:'visits',title:latest?latest.date:(pt?'A primeira visita':'The first visit'),label:pt?'CADERNO VIVO':'LIVING NOTEBOOK',description:latest?.text||(pt?'Comece o registro abaixo. O tempo também faz parte da paisagem.':'Start recording below. Time is part of the landscape.'),colSpan:1},
{id:'plan',title:pt?'O próximo passo':'The next step',label:pt?'PLANEJAMENTO':'PLANNING',description:pt?'Reúna observações e perguntas no seu plano.':'Bring observations and questions into your plan.',onClick:onPlan}
]}/></section>}
