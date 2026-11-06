const assert = require('node:assert/strict');
const location={origin:'https://catalogogastavalle.vercel.app',href:'https://catalogogastavalle.vercel.app/'};
const window={BMLVerifiedCoverV118:g=>g==='verified'?'covers/originais/real.jpg':undefined};
const rawFor=g=>g.raw;const placeholderCover=g=>'clean:'+g.titulo+' / '+g.autor;const RECREATED={};
 function strictCover(g){if(!g)return '';const mapped=window.BMLVerifiedCoverV118?.(g.key);const r=rawFor(g),u=String(r?.coverUrl||r?.cover_url||'').trim();try{const parsed=new URL(u,location.href);if(/\/covers\/completas\/[^/]+\.svg$/i.test(parsed.pathname)){if(mapped)return new URL(mapped,location.href).href;return typeof placeholderCover==='function'?placeholderCover(g):''}if((parsed.protocol==='https:'||parsed.origin===location.origin)&&!parsed.username&&!parsed.password&&u)return parsed.href}catch(_){}if(mapped)return new URL(mapped,location.href).href;return RECREATED[g.key]||((typeof placeholderCover==='function')?placeholderCover(g):'')}
const g={key:'old-key',titulo:'Dublinenses',autor:'James Joyce',raw:{cover_url:'https://catalogogastaovalle.netlify.app/covers/completas/old.svg'}};
assert.equal(strictCover(g),'clean:Dublinenses / James Joyce');
assert.equal(strictCover({...g,key:'verified'}),location.origin+'/covers/originais/real.jpg');
assert.equal(strictCover({...g,raw:{cover_url:'https://example.org/custom.jpg'}}),'https://example.org/custom.jpg');
assert.equal(strictCover({...g,raw:{cover_url:'/covers/completas/old.svg'}}),'clean:Dublinenses / James Joyce');
assert.equal(strictCover(null),'');
console.log('5 verificações de resolução de capas aprovadas');
