/* Corrige a apresentação sem mudar chaves de favoritos, empréstimos ou estoque. */
(()=>{'use strict';
function correct(){if(typeof grouped==='undefined')return;for(const g of grouped){const title=norm(g.titulo);if(title==='a arvore que dava dinheiro domingos pellegrini'){g.titulo='A árvore que dava dinheiro';g.autor='Domingos Pellegrini';g.titleNorm=norm(g.titulo);g.authorNorm=norm(g.autor);g.searchNorm=norm((g.searchNorm||'')+' '+g.titulo+' '+g.autor);g.words=(g.titleNorm+' '+g.authorNorm).split(' ').filter(Boolean)}}}
const build=window.buildGroups;if(build)window.buildGroups=function(...args){const result=build.apply(this,args);correct();return result};correct();
const open=window.openLocation;if(open)window.openLocation=function(key){const result=open(key);const button=document.querySelector('#locationBody [data-modal-fav]');if(button)button.onclick=async()=>{button.disabled=true;try{await toggleFavorite(key);if(currentUser()&&document.getElementById('locationModal').classList.contains('open'))window.openLocation(key)}catch(err){toast(err.message||'Não foi possível atualizar os favoritos.')}finally{button.disabled=false}};return result};
const card=window.card;if(card)window.card=function(g){return card(g).replace(/ title="Clique para ver detalhes e opções do livro"/g,'')};
})();
