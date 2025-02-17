(function(){const o=document.createElement("link").relList;if(o&&o.supports&&o.supports("modulepreload"))return;for(const e of document.querySelectorAll('link[rel="modulepreload"]'))c(e);new MutationObserver(e=>{for(const t of e)if(t.type==="childList")for(const s of t.addedNodes)s.tagName==="LINK"&&s.rel==="modulepreload"&&c(s)}).observe(document,{childList:!0,subtree:!0});function n(e){const t={};return e.integrity&&(t.integrity=e.integrity),e.referrerPolicy&&(t.referrerPolicy=e.referrerPolicy),e.crossOrigin==="use-credentials"?t.credentials="include":e.crossOrigin==="anonymous"?t.credentials="omit":t.credentials="same-origin",t}function c(e){if(e.ep)return;e.ep=!0;const t=n(e);fetch(e.href,t)}})();const p=r=>{const o=document.querySelector(r),n=(e=null)=>{if(!o)return;const t=window.innerWidth;if(t<767.98){o.style.backgroundPosition="center";return}const d=(e?e.clientX:0)/t*3;o.style.backgroundPosition=`${d}%`,o.style.backgroundSize=t>1900?"127%":"cover"};(()=>{window.addEventListener("resize",()=>n()),window.addEventListener("mousemove",e=>{window.innerWidth>=767.98&&n(e)}),n()})()},h=(r,o,n)=>{const c=document.querySelector(r),e=document.querySelector(o),t=document.querySelector(n),s=document.body,d=()=>{e.classList.toggle("header--active"),t.classList.toggle("header__nav--active"),c.classList.toggle("header__burger--active"),s.classList.toggle("menu-open")};c&&e&&t&&c.addEventListener("click",()=>d())},_=(r,o,n=30)=>{const c=document.querySelector(r),e=document.querySelector(o);let t=0;const s=(a,u)=>{const i=document.createElement("div");i.classList.add("card");const y=`https://loremflickr.com/537/519?lock=${a.id}`,m=new Date,l={year:"numeric",month:"long",day:"numeric"},f=m.toLocaleDateString("en-US",l),g=a.category?`<p class="card__category">${a.category}</p>`:'<p class="card__category" style="visibility: hidden;">.</p>';i.innerHTML=`
			<div class="card__image">
				<img src="${y}" alt="Image for ${a.title}" class="card__image-img">
			</div>
			<div class="card__body">
				<div class="card__category">${g}</div> 
				<h3 class="card__title">${a.title}</h3>
				<p class="card__description">${a.body}</p>
				<p class="card__author">Posted by <strong>${u.name}</strong>, on ${f}</p>
				<a href="#" class="card__btn btn btn--secondary">Continue reading</a>
			</div>
		`,c.appendChild(i)},d=async()=>{if(t>=n){e.style.display="none";return}try{const u=await(await fetch(`https://jsonplaceholder.typicode.com/posts?_start=${t}&_limit=5`)).json();for(let i of u){const m=await(await fetch(`https://jsonplaceholder.typicode.com/users/${i.userId}`)).json(),l=["Water","Bridge","Forest","Nature"];i.category=Math.random()>.5?l[Math.floor(Math.random()*l.length)]:"",s(i,m),t++}e.style.display=t<n?"inline-block":"none"}catch(a){console.error("Ошибка загрузки данных:",a)}};(()=>{e&&e.addEventListener("click",()=>d()),d()})()},v=()=>{const r=document.getElementById("modal"),o=document.querySelectorAll("[data-modal-open]"),n=r.querySelector(".modal__close"),c=()=>{r.classList.add("modal--active"),document.body.style.overflow="hidden"},e=()=>{r.classList.remove("modal--active"),document.body.style.overflow=""};o.forEach(t=>{t.addEventListener("click",s=>{s.preventDefault(),c()})}),n.addEventListener("click",e),r.addEventListener("click",t=>{(t.target===r||t.target.classList.contains("modal__overlay"))&&e()}),document.addEventListener("keydown",t=>{t.key==="Escape"&&e()})};p(".hero");h(".header__burger",".header",".header__nav");_("#card-container","#load-more");v();
