/* V126: metadados conferidos; identidades do acervo preservadas. */
(()=>{'use strict';
const corrections={
 'a barca dos amantes antonio barreto|':{titulo:'A barca dos amantes',autor:'Antônio Barreto'},
 '30 cronicas escolhidas manuel bandeira|':{titulo:'30 crônicas escolhidas',autor:'Manuel Bandeira'},
 '2 ou corpos no mesmo espaco|':{titulo:'2 ou + Corpos no Mesmo Espaço',autor:'Arnaldo Antunes',cover:'covers/originais/v126-2-corpos.jpg'},
 '50 poemas poemas escolhidos pelo autor|manuel bandeira':{titulo:'50 poemas escolhidos pelo autor',autor:'Manuel Bandeira',cover:'covers/originais/v126-50-poemas.jpg'},
 'bonjour vovo|leny werneck':{titulo:'Bonjour, vovó!',autor:'Leny Werneck'}
};
const verified=window.BMLVerifiedCoverV118;
window.BMLVerifiedCoverV118=key=>corrections[key]?.cover||verified?.(key)||'';
function raw(){if(typeof records==='undefined')return;for(const r of records){const c=corrections[r.book_key||r.bookKey||titleKey(r)];if(c?.cover)r.coverUrl=new URL(c.cover,location.href).href}}
function update(){if(typeof grouped==='undefined')return;for(const g of grouped){const c=corrections[g.key];if(!c)continue;g.titulo=c.titulo;g.autor=c.autor;g.titleNorm=norm(g.titulo);g.authorNorm=norm(g.autor);g.searchNorm=norm((g.searchNorm||'')+' '+g.titulo+' '+g.autor);g.words=(g.titleNorm+' '+g.authorNorm).split(' ').filter(Boolean)}}
const build=window.buildGroups;if(build)window.buildGroups=function(...args){raw();const result=build.apply(this,args);update();return result};raw();update();
})();
