const k="astro:before-preparation",W="astro:after-preparation",O="astro:before-swap",U="astro:after-swap",j=e=>document.dispatchEvent(new Event(e));class N extends Event{from;to;direction;navigationType;sourceElement;info;newDocument;constructor(t,n,r,i,l,d,m,o,f){super(t,n),this.from=r,this.to=i,this.direction=l,this.navigationType=d,this.sourceElement=m,this.info=o,this.newDocument=f,Object.defineProperties(this,{from:{enumerable:!0},to:{enumerable:!0,writable:!0},direction:{enumerable:!0,writable:!0},navigationType:{enumerable:!0},sourceElement:{enumerable:!0},info:{enumerable:!0},newDocument:{enumerable:!0,writable:!0}})}}const re=e=>e.type===k;class V extends N{formData;loader;constructor(t,n,r,i,l,d,m,o,f){super(k,{cancelable:!0},t,n,r,i,l,d,m),this.formData=o,this.loader=f.bind(this,this),Object.defineProperties(this,{formData:{enumerable:!0},loader:{enumerable:!0,writable:!0}})}}const oe=e=>e.type===O;class K extends N{direction;viewTransition;swap;constructor(t,n,r){super(O,void 0,t.from,t.to,t.direction,t.navigationType,t.sourceElement,t.info,t.newDocument),this.direction=t.direction,this.viewTransition=n,this.swap=r.bind(this,this),Object.defineProperties(this,{direction:{enumerable:!0},viewTransition:{enumerable:!0},swap:{enumerable:!0,writable:!0}})}}async function z(e,t,n,r,i,l,d,m){const o=new V(e,t,n,r,i,l,window.document,d,m);return document.dispatchEvent(o)&&(await o.loader(),o.defaultPrevented||(j(W),o.navigationType!=="traverse"&&P({scrollX,scrollY}))),o}async function G(e,t,n){const r=new K(e,t,n);return document.dispatchEvent(r),r.swap(),r}const J=history.pushState.bind(history),g=history.replaceState.bind(history),P=e=>{history.state&&(history.scrollRestoration="manual",g({...history.state,...e},""))},X=!!document.startViewTransition,D=()=>!!document.querySelector('[name="astro-view-transitions-enabled"]'),Y=(e,t)=>e.pathname===t.pathname&&e.search===t.search;let S,p,x=!1,F;const H=e=>document.dispatchEvent(new Event(e)),M=()=>H("astro:page-load"),Q=()=>{let e=document.createElement("div");e.setAttribute("aria-live","assertive"),e.setAttribute("aria-atomic","true"),e.className="astro-route-announcer",document.body.append(e),setTimeout(()=>{let t=document.title||document.querySelector("h1")?.textContent||location.pathname;e.textContent=t},60)},y="data-astro-transition-persist",_="data-astro-transition",q="data-astro-transition-fallback";let I,A=0;history.state?(A=history.state.index,scrollTo({left:history.state.scrollX,top:history.state.scrollY})):D()&&(g({index:A,scrollX,scrollY},""),history.scrollRestoration="manual");async function Z(e,t){try{const n=await fetch(e,t),i=(n.headers.get("content-type")??"").split(";",1)[0].trim();return i!=="text/html"&&i!=="application/xhtml+xml"?null:{html:await n.text(),redirected:n.redirected?n.url:void 0,mediaType:i}}catch{return null}}function $(){const e=document.querySelector('[name="astro-view-transitions-fallback"]');return e?e.getAttribute("content"):"animate"}function ee(){let e=Promise.resolve();for(const t of Array.from(document.scripts)){if(t.dataset.astroExec==="")continue;const n=t.getAttribute("type");if(n&&n!=="module"&&n!=="text/javascript")continue;const r=document.createElement("script");r.innerHTML=t.innerHTML;for(const i of t.attributes){if(i.name==="src"){const l=new Promise(d=>{r.onload=r.onerror=d});e=e.then(()=>l)}r.setAttribute(i.name,i.value)}r.dataset.astroExec="",t.replaceWith(r)}return e}const B=(e,t,n,r,i)=>{const l=Y(t,e),d=document.title;document.title=r;let m=!1;if(e.href!==location.href&&!i)if(n.history==="replace"){const o=history.state;g({...n.state,index:o.index,scrollX:o.scrollX,scrollY:o.scrollY},"",e.href)}else J({...n.state,index:++A,scrollX:0,scrollY:0},"",e.href);if(document.title=d,S=e,l||(scrollTo({left:0,top:0,behavior:"instant"}),m=!0),i)scrollTo(i.scrollX,i.scrollY);else{if(e.hash){history.scrollRestoration="auto";const o=history.state;location.href=e.href,history.state||(g(o,""),l&&window.dispatchEvent(new PopStateEvent("popstate")))}else m||scrollTo({left:0,top:0,behavior:"instant"});history.scrollRestoration="manual"}};function te(e){const t=[];for(const n of e.querySelectorAll("head link[rel=stylesheet]"))if(!document.querySelector(`[${y}="${n.getAttribute(y)}"], link[rel=stylesheet][href="${n.getAttribute("href")}"]`)){const r=document.createElement("link");r.setAttribute("rel","preload"),r.setAttribute("as","style"),r.setAttribute("href",n.getAttribute("href")),t.push(new Promise(i=>{["load","error"].forEach(l=>r.addEventListener(l,i)),document.head.append(r)}))}return t}async function R(e,t,n,r){const i=(s,c)=>{const h=s.getAttribute(y),b=h&&c.head.querySelector(`[${y}="${h}"]`);if(b)return b;if(s.matches("link[rel=stylesheet]")){const E=s.getAttribute("href");return c.head.querySelector(`link[rel=stylesheet][href="${E}"]`)}return null},l=()=>{const s=document.activeElement;if(s?.closest(`[${y}]`)){if(s instanceof HTMLInputElement||s instanceof HTMLTextAreaElement){const c=s.selectionStart,h=s.selectionEnd;return{activeElement:s,start:c,end:h}}return{activeElement:s}}else return{activeElement:null}},d=({activeElement:s,start:c,end:h})=>{s&&(s.focus(),(s instanceof HTMLInputElement||s instanceof HTMLTextAreaElement)&&(s.selectionStart=c,s.selectionEnd=h))},m=s=>{const c=s.dataset.astroTransitionPersistProps;return c==null||c==="false"},o=s=>{const c=document.documentElement,h=[...c.attributes].filter(({name:a})=>(c.removeAttribute(a),a.startsWith("data-astro-")));[...s.newDocument.documentElement.attributes,...h].forEach(({name:a,value:u})=>c.setAttribute(a,u));for(const a of document.scripts)for(const u of s.newDocument.scripts)if(!u.hasAttribute("data-astro-rerun")&&(!a.src&&a.textContent===u.textContent||a.src&&a.type===u.type&&a.src===u.src)){u.dataset.astroExec="";break}for(const a of Array.from(document.head.children)){const u=i(a,s.newDocument);u?u.remove():a.remove()}document.head.append(...s.newDocument.head.children);const b=document.body,E=l();document.body.replaceWith(s.newDocument.body);for(const a of b.querySelectorAll(`[${y}]`)){const u=a.getAttribute(y),v=document.querySelector(`[${y}="${u}"]`);v&&(v.replaceWith(a),v.localName==="astro-island"&&m(a)&&(a.setAttribute("ssr",""),a.setAttribute("props",v.getAttribute("props"))))}d(E)};async function f(s){function c(a){const u=a.effect;return!u||!(u instanceof KeyframeEffect)||!u.target?!1:window.getComputedStyle(u.target,u.pseudoElement).animationIterationCount==="infinite"}const h=document.getAnimations();document.documentElement.setAttribute(q,s);const E=document.getAnimations().filter(a=>!h.includes(a)&&!c(a));return Promise.all(E.map(a=>a.finished))}if(!x)document.documentElement.setAttribute(_,e.direction),r==="animate"&&await f("old");else throw new DOMException("Transition was skipped");const T=document.title,w=await G(e,p,o);B(w.to,w.from,t,T,n),H(U),r==="animate"&&!x&&f("new").then(()=>F())}async function C(e,t,n,r,i){if(!D()||location.origin!==n.origin){location.href=n.href;return}const l=i?"traverse":r.history==="replace"?"replace":"push";if(l!=="traverse"&&P({scrollX,scrollY}),Y(t,n)&&(e!=="back"&&n.hash||e==="back"&&t.hash)){B(n,t,r,document.title,i);return}const d=await z(t,n,e,l,r.sourceElement,r.info,r.formData,m);if(d.defaultPrevented){location.href=n.href;return}async function m(o){const f=o.to.href,T={};if(o.formData){T.method="POST";const c=o.sourceElement instanceof HTMLFormElement?o.sourceElement:o.sourceElement instanceof HTMLElement&&"form"in o.sourceElement?o.sourceElement.form:o.sourceElement?.closest("form");T.body=c?.attributes.getNamedItem("enctype")?.value==="application/x-www-form-urlencoded"?new URLSearchParams(o.formData):o.formData}const w=await Z(f,T);if(w===null){o.preventDefault();return}if(w.redirected&&(o.to=new URL(w.redirected)),I??=new DOMParser,o.newDocument=I.parseFromString(w.html,w.mediaType),o.newDocument.querySelectorAll("noscript").forEach(c=>c.remove()),!o.newDocument.querySelector('[name="astro-view-transitions-enabled"]')&&!o.formData){o.preventDefault();return}const s=te(o.newDocument);s.length&&await Promise.all(s)}if(x=!1,X)p=document.startViewTransition(async()=>await R(d,r,i));else{const o=(async()=>{await new Promise(f=>setTimeout(f)),await R(d,r,i,$())})();p={updateCallbackDone:o,ready:o,finished:new Promise(f=>F=f),skipTransition:()=>{x=!0}}}p.ready.then(async()=>{await ee(),M(),Q()}),p.finished.then(()=>{document.documentElement.removeAttribute(_),document.documentElement.removeAttribute(q)}),await p.ready}async function se(e,t){await C("forward",S,new URL(e,location.href),t??{})}function ne(e){if(!D()&&e.state){location.reload();return}if(e.state===null)return;const t=history.state,n=t.index,r=n>A?"forward":"back";A=n,C(r,S,new URL(location.href),{},t)}const L=()=>{history.state&&(scrollX!==history.state.scrollX||scrollY!==history.state.scrollY)&&P({scrollX,scrollY})};{if(X||$()!=="none")if(S=new URL(location.href),addEventListener("popstate",ne),addEventListener("load",M),"onscrollend"in window)addEventListener("scrollend",L);else{let e,t,n,r;const i=()=>{if(r!==history.state?.index){clearInterval(e),e=void 0;return}if(t===scrollY&&n===scrollX){clearInterval(e),e=void 0,L();return}else t=scrollY,n=scrollX};addEventListener("scroll",()=>{e===void 0&&(r=history.state.index,t=scrollY,n=scrollX,e=window.setInterval(i,50))},{passive:!0})}for(const e of document.scripts)e.dataset.astroExec=""}export{O as T,k as a,re as b,oe as i,se as n,X as s};
