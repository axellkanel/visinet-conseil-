'use strict';
const menuButton=document.querySelector('.menu-toggle');
const navigation=document.getElementById('navigation');
const mobile=window.matchMedia('(max-width:1000px)');
function closeMenu(restoreFocus=false){navigation.hidden=mobile.matches;menuButton.setAttribute('aria-expanded','false');if(restoreFocus)menuButton.focus();}
function syncMenu(){menuButton.hidden=!mobile.matches;closeMenu();}
syncMenu();mobile.addEventListener('change',syncMenu);
menuButton.addEventListener('click',()=>{const open=menuButton.getAttribute('aria-expanded')!=='true';menuButton.setAttribute('aria-expanded',String(open));navigation.hidden=!open;});
navigation.addEventListener('click',event=>{const link=event.target.closest('a');if(link&&mobile.matches){closeMenu();const id=link.getAttribute('href');if(id&&id.startsWith('#')){const target=document.getElementById(id.slice(1));if(target){target.tabIndex=-1;target.focus({preventScroll:true});}}}});
document.addEventListener('keydown',event=>{if(event.key==='Escape'&&mobile.matches&&menuButton.getAttribute('aria-expanded')==='true')closeMenu(true);});
document.addEventListener('click',event=>{if(mobile.matches&&!event.target.closest('.site-header'))closeMenu();});

const reduced=window.matchMedia('(prefers-reduced-motion:reduce)');
if('IntersectionObserver' in window&&!reduced.matches){
 const observer=new IntersectionObserver(entries=>{entries.forEach(entry=>{if(entry.isIntersecting){entry.target.classList.add('visible');observer.unobserve(entry.target);}});},{threshold:.08});
 document.querySelectorAll('.expertise,.audience,.process li,.mission,.about-copy').forEach(element=>{element.classList.add('reveal');observer.observe(element);});
 document.documentElement.classList.add('reveal-ready');
}

const form=document.getElementById('contact-form');
const fields=Array.from(form.querySelectorAll('input:not([type="hidden"]):not(.honeypot),select,textarea'));
const formStatus=document.getElementById('form-status');
const submitButton=form.querySelector('button[type="submit"]');
form.noValidate=true;
fields.forEach(field=>{const error=document.createElement('p');error.id=field.id+'-error';error.className='field-error';field.closest('.field').append(error);field.setAttribute('aria-describedby',error.id);field.addEventListener('blur',()=>validateField(field));field.addEventListener('input',()=>{if(field.getAttribute('aria-invalid')==='true')validateField(field);});});
function validateField(field){
 field.setCustomValidity('');const value=field.value.trim();let message='';
 if(field.required&&!value)message='Veuillez renseigner ce champ.';
 else if(field.id==='fullname'&&value.length<2)message='Saisissez votre nom et prénom (au moins deux caractères).';
 else if(field.id==='email'&&field.validity.typeMismatch)message='Saisissez une adresse e-mail valide.';
 else if(field.id==='phone'&&value&&(!/^[+0-9().\s-]+$/.test(value)||value.replace(/\D/g,'').length<10||value.replace(/\D/g,'').length>15))message='Saisissez un téléphone de 10 à 15 chiffres, ou laissez ce champ vide.';
 else if(!field.validity.valid)message='Vérifiez les informations saisies dans ce champ.';
 field.setCustomValidity(message);field.setAttribute('aria-invalid',String(!!message));document.getElementById(field.id+'-error').textContent=message;return !message;
}
function showStatus(message,state){formStatus.textContent=message;formStatus.dataset.state=state;}
form.addEventListener('submit',async event=>{
 event.preventDefault();if(submitButton.disabled)return;
 fields.forEach(validateField);const invalid=fields.find(field=>!field.validity.valid);
 if(invalid){showStatus('Votre demande n’a pas été envoyée. Vérifiez les champs indiqués.','error');invalid.focus();return;}
 if(form.elements.botcheck.checked){showStatus('Votre demande n’a pas été envoyée. Contactez-nous par e-mail.','error');return;}
 const payload=Object.fromEntries(new FormData(form));
 // The request topic is always present, even when the optional message is empty.
 payload.message='Objet : '+payload.request+(payload.message.trim()?'\n\n'+payload.message.trim():'');
 payload.replyto=payload.email;payload.subject='VisiNet Conseil — '+payload.request;
 submitButton.disabled=true;submitButton.textContent='Envoi en cours…';form.setAttribute('aria-busy','true');showStatus('Envoi de votre demande en cours…','pending');
 const controller=new AbortController();const timeout=setTimeout(()=>controller.abort(),20000);
 try{
  const response=await fetch(form.action,{method:'POST',headers:{'Content-Type':'application/json',Accept:'application/json'},body:JSON.stringify(payload),signal:controller.signal});
  const result=await response.json();
  if(!response.ok||result.success!==true)throw new Error('Submission refused');
  showStatus('Votre demande a bien été envoyée. Merci, nous reviendrons vers vous pour convenir d’un premier échange.','success');form.reset();fields.forEach(field=>{field.setCustomValidity('');field.removeAttribute('aria-invalid');document.getElementById(field.id+'-error').textContent='';});
 }catch(error){showStatus(error.name==='AbortError'?'Le service n’a pas répondu à temps. Nous ne pouvons pas confirmer l’envoi. Contactez-nous par e-mail avant de renouveler votre demande.':'Nous ne pouvons pas confirmer l’envoi de votre demande. Vos informations restent dans le formulaire. Vous pouvez réessayer ou nous contacter directement par e-mail.','error');}
 finally{clearTimeout(timeout);submitButton.disabled=false;submitButton.textContent='Envoyer ma demande';form.removeAttribute('aria-busy');formStatus.focus();}
});
