/* V127: Open Library Covers API. Apenas referências conferidas e ISBNs válidos. */
(()=>{'use strict';
const confirmed={};
const previousVerified=window.BMLVerifiedCoverV118;
window.BMLVerifiedCoverV118=key=>confirmed[key]?.url||previousVerified?.(key)||'';
const attempted=new Set();
function provisional(url){return !url||String(url).startsWith('data:')||/covers\/(completas|recriados)\//.test(String(url))}
function validISBN(value){const s=String(value||'').replace(/[^0-9X]/gi,'').toUpperCase();if(s.length===13&&/^\d{13}$/.test(s))return [...s].reduce((n,v,i)=>n+Number(v)*(i%2?3:1),0)%10===0?s:'';if(s.length===10&&/^\d{9}[\dX]$/.test(s))return [...s].reduce((n,v,i)=>n+(v==='X'?10:Number(v))*(10-i),0)%11===0?s:'';return ''}
function covers(){if(typeof records==='undefined')return;for(const r of records){const key=r.book_key||titleKey(r),entry=confirmed[key];if(entry){r.coverUrl=entry.url;continue}const current=r.coverUrl||r.cover_url||'';if(!provisional(current)||window.BMLVerifiedCoverV118?.(key))continue;const isbn=validISBN(r.isbn);if(!isbn)continue;const url='https://covers.openlibrary.org/b/isbn/'+isbn+'-L.jpg?default=false';if(attempted.has(url))continue;attempted.add(url);const img=new Image();img.referrerPolicy='no-referrer';img.onload=()=>{if(img.naturalWidth<=1||img.naturalHeight<=1)return;for(const other of records){if(validISBN(other.isbn)===isbn&&provisional(other.coverUrl||other.cover_url||''))other.coverUrl=url}if(typeof loadVisibleCovers==='function')loadVisibleCovers()};img.onerror=()=>{};img.src=url}}
const build=window.buildGroups;if(build)window.buildGroups=function(...args){covers();return build.apply(this,args)};covers();
function credit(){const footer=document.querySelector('footer');if(!footer||footer.querySelector('[data-openlibrary-credit]'))return;const p=document.createElement('p'),a=document.createElement('a');a.dataset.openlibraryCredit='';a.href='https://openlibrary.org/';a.textContent='Capas também fornecidas pela Open Library';a.target='_blank';a.rel='noopener noreferrer';a.style.color='inherit';p.append(a);footer.append(p)}
if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',credit,{once:true});else credit();
})();
