/* V10.0: apresentação e acessibilidade; sem mudanças no contrato Supabase. */
(function(){
'use strict';
function init(){
 const d=document,modal=d.getElementById('authModal');if(!modal)return;
 const heading=modal.querySelector('.auth-brand-wordmark');
 if(heading&&!heading.querySelector('.bml-login-brand')){const brand=d.createElement('span');brand.className='bml-login-brand';brand.textContent='Monteiro Lobato';heading.append(brand)}
 const forms=modal.querySelector('.bml-auth-form-panel'),intro=modal.querySelector('.auth-dialog-intro'),register=d.getElementById('registerForm');
 if(forms&&!forms.querySelector('.bml-login-school')){const school=d.createElement('p');school.className='bml-login-school';school.textContent='Escola Estadual Prof. Gastão Valle';forms.append(school)}
 const syncIntro=()=>{if(!intro||!register)return;const signingUp=!register.classList.contains('hidden');const title=intro.querySelector('h2'),copy=intro.querySelector('p');const signedIn=typeof currentUser==='function'&&!!currentUser();const label=signedIn?'Minha conta':signingUp?'Criar conta':'Entrar na biblioteca';if(title&&title.textContent!==label)title.textContent=label;if(copy)copy.textContent=signedIn?'Acompanhe sua conta e continue explorando o acervo.':signingUp?'Preencha seus dados para criar uma conta de leitor.':''};
 if(register){new MutationObserver(syncIntro).observe(register,{attributes:true,attributeFilter:['class']});syncIntro()}const logged=d.getElementById('authLoggedIn');if(logged)new MutationObserver(syncIntro).observe(logged,{attributes:true,attributeFilter:['class']});
 // Movimento acompanha a preferência de acessibilidade do dispositivo, sem controle visual.
 const reduce=matchMedia('(prefers-reduced-motion: reduce)');
 const syncMotion=()=>{d.body.dataset.bmlMotion=reduce.matches?'off':'on';if(reduce.matches)window.BMLStopEditorial?.();else window.BMLStartEditorial?.()};
 syncMotion();if(reduce.addEventListener)reduce.addEventListener('change',syncMotion);
 // Estados de espera são anunciados sem trocar formulários ou enviar requisições.
 ['loginForm','registerForm'].forEach(id=>{const f=d.getElementById(id),submit=f?.querySelector('[type="submit"]');if(!f||!submit)return;const sync=()=>f.setAttribute('aria-busy',String(submit.disabled));new MutationObserver(sync).observe(submit,{attributes:true,attributeFilter:['disabled']});sync()});
 // Somente elementos novos recebem animação; listas longas não criam um loop.
 const results=d.getElementById('results');let frame=0;
 const observer='IntersectionObserver' in window?new IntersectionObserver(entries=>{for(const entry of entries){if(entry.isIntersecting){if(d.body.dataset.bmlMotion==='on')entry.target.classList.add('bml-reveal-in');observer.unobserve(entry.target)}}},{rootMargin:'0px 0px 20px 0px',threshold:.04}):null;
 function scan(){frame=0;if(!results)return;results.querySelectorAll('.book-card:not([data-bml-reveal])').forEach((card,i)=>{card.dataset.bmlReveal='1';if(observer&&i<30)observer.observe(card)})}
 if(results){new MutationObserver(()=>{if(!frame)frame=requestAnimationFrame(scan)}).observe(results,{childList:true});scan()}
 // As dicas de senha pertencem ao controle correspondente, inclusive por leitor de tela.
 const pwd=d.getElementById('regPassword'),helper=modal.querySelector('.auth-field-helper');if(pwd&&helper){helper.id='bmlPasswordHelp';pwd.setAttribute('aria-describedby',helper.id)}
}
if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',init,{once:true});else init();
})();
