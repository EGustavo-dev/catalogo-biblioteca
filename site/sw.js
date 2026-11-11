/* Biblioteca Monteiro Lobato PWA v11.2 — NO cache for account, book data, API or login. */
'use strict';
const STATIC_CACHE='monteiro-app-static-v153-2';
const SHELL=["./offline.html","./icone-192.png"];
const STATIC_NAMES=new Set(["bml-sinopses.js","footer.css","bml-v141.css","bml-v141.js","bml-v140.css","login-assets/login-v139-header.css","catalogo-v138.css","login-assets/login-v137.css","login-assets/google.svg","analytics-config.js","analytics.js","privacidade.css","privacidade-pagina.css","bml-v135.css","bml-v134.css","bml-v133.css","bml-v133.js","bml-v131.css","covers/ilustrativas/v128-27.svg", "covers/ilustrativas/v128-28.svg", "covers/ilustrativas/v128-402.svg", "covers/ilustrativas/v128-442.svg", "covers/ilustrativas/v128-483.svg", "covers/ilustrativas/v128-503.svg", "covers/ilustrativas/v128-539.svg", "covers/ilustrativas/v128-549.svg", "covers/ilustrativas/v128-551.svg", "covers/ilustrativas/v128-564.svg", "covers/ilustrativas/v128-572.svg", "covers/ilustrativas/v128-577.svg", "covers/ilustrativas/v128-617.svg", "covers/ilustrativas/v128-623.svg", "covers/ilustrativas/v128-624.svg", "covers/ilustrativas/v128-626.svg", "covers/ilustrativas/v128-635.svg", "covers/ilustrativas/v128-637.svg", "covers/ilustrativas/v128-638.svg", "covers/ilustrativas/v128-639.svg", "covers/ilustrativas/v128-647.svg", "covers/ilustrativas/v128-653.svg", "covers/ilustrativas/v128-654.svg", "covers/ilustrativas/v128-655.svg", "covers/ilustrativas/v128-659.svg", "covers/ilustrativas/v128-663.svg", "covers/ilustrativas/v128-668.svg", "covers/ilustrativas/v128-671.svg", "covers/ilustrativas/v128-675.svg", "covers/ilustrativas/v128-677.svg", "covers/ilustrativas/v128-678.svg", "covers/ilustrativas/v128-681.svg", "covers/ilustrativas/v128-684.svg", "covers/ilustrativas/v128-690.svg", "covers/ilustrativas/v128-691.svg", "covers/ilustrativas/v128-692.svg", "covers/ilustrativas/v128-695.svg", "covers/ilustrativas/v128-700.svg", "covers/ilustrativas/v128-731.svg", "covers/ilustrativas/v128-749.svg", "covers/ilustrativas/v128-759.svg", "covers/ilustrativas/v128-761.svg", "covers/ilustrativas/v128-765.svg", "covers/ilustrativas/v128-776.svg", "covers/ilustrativas/v128-797.svg", "covers/ilustrativas/v128-816.svg", "covers/ilustrativas/v128-831.svg", "covers/ilustrativas/v128-847.svg", "covers/ilustrativas/v128-851.svg", "covers/ilustrativas/v128-855.svg", "covers/ilustrativas/v128-878.svg", "covers/ilustrativas/v128-949.svg", "covers/ilustrativas/v128-953.svg", "covers/ilustrativas/v128-965.svg", "covers/ilustrativas/v128-985.svg", "covers/ilustrativas/v128-987.svg", "covers/ilustrativas/v137-1018.svg", "covers/ilustrativas/v137-1077.svg", "covers/ilustrativas/v137-1083.svg", "covers/ilustrativas/v137-1102.svg", "covers/ilustrativas/v137-1212.svg", "covers/ilustrativas/v137-1238.svg", "covers/ilustrativas/v137-1273.svg", "covers/ilustrativas/v137-1297.svg", "covers/ilustrativas/v137-1304.svg", "covers/ilustrativas/v137-1431.svg", "covers/ilustrativas/v137-1432.svg", "covers/ilustrativas/v137-1433.svg", "covers/originais/v128-bonjour.jpg", "covers/originais/v128-30-cronicas.jpg","bml-v128.js","bml-v127.js","bml-v126.js","bml-v125.css","bml-v125.js","bml-v124.js","bml-v123.js","colecoes.js","colecoes.css","capas-estimadas.js","sequencia-leitura.js","sequencia-leitura.css","capas-v117.js","interface-v118.js","interface-v118.css","interface-tailwind.css","offline.html","manifest.webmanifest","icone-192.png","icone-512.png","icone-180.png","icone-maskable-512.png","livro-azul-cabecalho.png","banner-biblioteca.jpg","logo-biblioteca.svg","v98-modern.css","v98-modern.js","bml-v118.css","bml-v101.js","bml-v118.js","qr_catalogo_gastao_valle.png","covers/recriados/a-caminhada-de-um-lider-operario.svg","covers/recriados/a-filha-do-maquinista.svg","covers/recriados/a-grande-pedra-de-historias.svg","covers/recriados/ele-nunca-ja-nem-se-lembra.svg","covers/recriados/estrada-da-vida-inteira.svg","covers/recriados/jogos-de-corrida-de-luta-e-de-bola.svg","covers/recriados/mancadas-nossas.svg","covers/recriados/mas-as-coisas-findas-muito-mais-que-lindas.svg","covers/recriados/na-marcacao-da-ideia-do-juizo-da-pena.svg","covers/recriados/nao-perdas.svg","covers/recriados/o-brasil-e-as-cobras-na-historia-do-butantan.svg","covers/recriados/o-maior-manifesto.svg","covers/recriados/poesia-brejeira-de-hoje.svg","covers/recriados/relatos-narrados.svg","covers/recriados/rios-do-meu-tempo.svg","covers/recriados/rumula-na-terra-do-boi.svg","covers/recriados/sertao-bruto-e-romantico.svg","covers/recriados/triste-horizonte.svg","covers/recriados/uma-noite-de-recordacoes.svg","covers/recriados/vai-vai-balao.svg","covers/recriados/relembro-tramas-de-familia.svg"]);
self.addEventListener('install',(event)=>{
  event.waitUntil((async()=>{
    const cache=await caches.open(STATIC_CACHE);
    await cache.addAll(SHELL);
    await self.skipWaiting();
  })());
});
self.addEventListener('activate',(event)=>{
  event.waitUntil((async()=>{
    const names=await caches.keys();
    await Promise.all(names.filter(n=>(n.startsWith('gastao-app-static-')||n.startsWith('monteiro-app-static-'))&&n!==STATIC_CACHE).map(n=>caches.delete(n)));
    await self.clients.claim();
  })());
});
self.addEventListener('fetch',(event)=>{
  const req=event.request;
  if(req.method!=='GET')return;
  const url=new URL(req.url);
  if(url.origin!==self.location.origin)return; // Supabase and other external APIs: always network-only.
  // Authenticated catalog HTML must not be stored (including HTTP/browser caches we can control).
  if(req.mode==='navigate'){
    event.respondWith(fetch(req,{cache:'no-store'}).catch(async()=>{
      return (await caches.match('./offline.html')) || Response.error();
    }));
    return;
  }
  const scopePath=new URL(self.registration.scope).pathname;
  if(!url.pathname.startsWith(scopePath))return;
  const basename=url.pathname.slice(scopePath.length);
  if(!STATIC_NAMES.has(basename)&&!/^covers\/(?:completas\/[a-f0-9]{20}\.svg|originais\/[a-f0-9]{20}\.jpg)$/.test(basename))return;
  event.respondWith((async()=>{
    const cache=await caches.open(STATIC_CACHE);
    const cached=await cache.match(req,{ignoreSearch:true});
    if(cached)return cached;
    const response=await fetch(req);
    if(response.ok&&response.type==='basic')await cache.put(req,response.clone());
    return response;
  })());
});
