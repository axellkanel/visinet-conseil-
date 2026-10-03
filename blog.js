'use strict';
// Navigation responsive du blog, sans formulaire ni collecte de données.
const menuButton=document.querySelector('.menu-toggle');
const navigation=document.getElementById('navigation');
const mobile=window.matchMedia('(max-width:1000px)');
function closeMenu(restoreFocus=false){navigation.hidden=mobile.matches;menuButton.setAttribute('aria-expanded','false');if(restoreFocus)menuButton.focus();}
function syncMenu(){menuButton.hidden=!mobile.matches;closeMenu();}
syncMenu();mobile.addEventListener('change',syncMenu);
menuButton.addEventListener('click',()=>{const open=menuButton.getAttribute('aria-expanded')!=='true';menuButton.setAttribute('aria-expanded',String(open));navigation.hidden=!open;});
navigation.addEventListener('click',event=>{if(event.target.closest('a')&&mobile.matches)closeMenu();});
document.addEventListener('keydown',event=>{if(event.key==='Escape'&&mobile.matches&&menuButton.getAttribute('aria-expanded')==='true')closeMenu(true);});
document.addEventListener('click',event=>{if(mobile.matches&&!event.target.closest('.site-header'))closeMenu();});
