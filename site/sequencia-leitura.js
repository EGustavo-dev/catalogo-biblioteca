/* Sequência editorial de referência. Não cria livros, não distribui quantidades e não grava no banco. */
(()=>{
'use strict';
const series=[{"volume": 1, "subtitle": "A estreia de Fani", "path": "covers/originais/2f5fbfb03878be5ae081.jpg", "isbn": "9788582356098"}, {"volume": 2, "subtitle": "Fani na terra da rainha", "path": "covers/originais/6a038052ad6ccd3feaa3.jpg", "isbn": "9788582356111"}, {"volume": 3, "subtitle": "O roteiro inesperado de Fani", "path": "covers/originais/e306102f5c1549546cb3.jpg", "isbn": "9788582356135"}, {"volume": 4, "subtitle": "Fani em busca do final feliz", "path": "covers/originais/9853ffb2eda7d35222cf.jpg", "isbn": "9788582356159"}];
window.BMLReadingOrder=Object.freeze(series.map(v=>Object.freeze({...v})));
const key='fazendo meu filme|paula pimenta';
const escText=s=>String(s).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
function cards(){
 for(const card of document.querySelectorAll('.book-card[data-book-key]')){
  if(card.dataset.bookKey!==key)continue;
  const host=card.querySelector('.book-cover-wrap');if(!host||host.classList.contains('bml-series-card'))continue;
  host.classList.add('bml-series-card');host.querySelector('.book-cover')?.setAttribute('aria-hidden','true');
  const panel=document.createElement('div');panel.className='bml-series-cover-grid';panel.setAttribute('aria-label','Capas da sequência principal de Fazendo Meu Filme, volumes 1 a 4');
  panel.innerHTML=series.map(v=>`<figure><img loading="lazy" decoding="async" src="${escText(v.path)}" alt="Fazendo Meu Filme ${v.volume}: ${escText(v.subtitle)}"><figcaption>${v.volume}</figcaption></figure>`).join('');
  host.append(panel);const label=document.createElement('span');label.className='bml-series-label';label.textContent='Sequência da série · 1 a 4';host.append(label);
  const note=document.createElement('p');note.className='bml-series-note';note.textContent='Volume dos exemplares não informado';card.querySelector('.book-main')?.append(note);
 }
}
let scheduled=false;
new MutationObserver(ms=>{if(scheduled||!ms.some(m=>m.addedNodes.length))return;scheduled=true;queueMicrotask(()=>{scheduled=false;cards()})}).observe(document.documentElement,{childList:true,subtree:true});
cards();
let currentKey='';const previous=window.openLocation;
if(previous)window.openLocation=function(bookKey){currentKey=bookKey;const result=previous.apply(this,arguments);setTimeout(()=>{
 if(currentKey!==bookKey)return;const body=document.getElementById('locationBody');if(!body)return;body.classList.toggle('bml-series-open',bookKey===key);body.querySelector('.bml-reading-order')?.remove();if(bookKey!==key)return;
 const section=document.createElement('section');section.className='bml-reading-order';section.setAttribute('aria-labelledby','bmlReadingOrderTitle');
 section.innerHTML='<h3 id="bmlReadingOrderTitle">Sequência de leitura</h3><p>Esta é a ordem dos quatro volumes principais. O cadastro atual não informa quais volumes correspondem aos exemplares disponíveis.</p><ol>'+series.map(v=>`<li><img loading="lazy" decoding="async" src="${escText(v.path)}" alt="Capa de Fazendo Meu Filme ${v.volume}"><strong>Volume ${v.volume}</strong><span>${escText(v.subtitle)}</span></li>`).join('')+'</ol>';
 const top=body.querySelector('.detail-top');if(top)top.after(section);else body.append(section);
 },0);return result};
})();
