const p=(r,...e)=>{const t=e.length;for(let s=0;s<t;s++){const i=e[s]||{};Object.entries(i).forEach(([n,o])=>{const a=Array.isArray(o)?[]:{};var l;r[n]||Object.assign(r,{[n]:a}),typeof(l=o)=="object"&&l!==null&&l.constructor===Object&&Object.prototype.toString.call(l)==="[object Object]"?Object.assign(r[n],p(a,o)):Array.isArray(o)?Object.assign(r,{[n]:[...o]}):Object.assign(r,{[n]:o})})}return r},c=function(r,e){return r.split(".").reduce((t,s)=>typeof t=="object"?t[s]:void 0,e)};class u{constructor(e={}){Object.defineProperty(this,"options",{enumerable:!0,configurable:!0,writable:!0,value:e}),Object.defineProperty(this,"events",{enumerable:!0,configurable:!0,writable:!0,value:new Map}),this.setOptions(e);for(const t of Object.getOwnPropertyNames(Object.getPrototypeOf(this)))t.startsWith("on")&&typeof this[t]=="function"&&(this[t]=this[t].bind(this))}setOptions(e){this.options=e?p({},this.constructor.defaults,e):{};for(const[t,s]of Object.entries(this.option("on")||{}))this.on(t,s)}option(e,...t){let s=c(e,this.options);return s&&typeof s=="function"&&(s=s.call(this,this,...t)),s}optionFor(e,t,s,...i){let n=c(t,e);var o;typeof(o=n)!="string"||isNaN(o)||isNaN(parseFloat(o))||(n=parseFloat(n)),n==="true"&&(n=!0),n==="false"&&(n=!1),n&&typeof n=="function"&&(n=n.call(this,this,e,...i));let a=c(t,this.options);return a&&typeof a=="function"?n=a.call(this,this,e,...i,n):n===void 0&&(n=a),n===void 0?s:n}cn(e){const t=this.options.classes;return t&&t[e]||""}localize(e,t=[]){e=String(e).replace(/\{\{(\w+).?(\w+)?\}\}/g,(s,i,n)=>{let o="";return n?o=this.option(`${i[0]+i.toLowerCase().substring(1)}.l10n.${n}`):i&&(o=this.option(`l10n.${i}`)),o||(o=s),o});for(let s=0;s<t.length;s++)e=e.split(t[s][0]).join(t[s][1]);return e=e.replace(/\{\{(.*?)\}\}/g,(s,i)=>i)}on(e,t){let s=[];typeof e=="string"?s=e.split(" "):Array.isArray(e)&&(s=e),this.events||(this.events=new Map),s.forEach(i=>{let n=this.events.get(i);n||(this.events.set(i,[]),n=[]),n.includes(t)||n.push(t),this.events.set(i,n)})}off(e,t){let s=[];typeof e=="string"?s=e.split(" "):Array.isArray(e)&&(s=e),s.forEach(i=>{const n=this.events.get(i);if(Array.isArray(n)){const o=n.indexOf(t);o>-1&&n.splice(o,1)}})}emit(e,...t){[...this.events.get(e)||[]].forEach(s=>s(this,...t)),e!=="*"&&this.emit("*",e,...t)}}Object.defineProperty(u,"version",{enumerable:!0,configurable:!0,writable:!0,value:"5.0.19"}),Object.defineProperty(u,"defaults",{enumerable:!0,configurable:!0,writable:!0,value:{}});class g extends u{constructor(e,t){super(t),Object.defineProperty(this,"instance",{enumerable:!0,configurable:!0,writable:!0,value:e})}attach(){}detach(){}}const f=r=>`${r||""}`.split(" ").filter(e=>!!e),h=(r,e)=>{r&&f(e).forEach(t=>{r.classList.add(t)})};class v extends g{constructor(){super(...arguments),Object.defineProperty(this,"state",{enumerable:!0,configurable:!0,writable:!0,value:"ready"}),Object.defineProperty(this,"inHover",{enumerable:!0,configurable:!0,writable:!0,value:!1}),Object.defineProperty(this,"timer",{enumerable:!0,configurable:!0,writable:!0,value:null}),Object.defineProperty(this,"progressBar",{enumerable:!0,configurable:!0,writable:!0,value:null})}get isActive(){return this.state!=="ready"}onReady(e){this.option("autoStart")&&(e.isInfinite||e.page<e.pages.length-1)&&this.start()}onChange(){var e;!((e=this.instance.panzoom)===null||e===void 0)&&e.isResting||(this.removeProgressBar(),this.pause())}onSettle(){this.resume()}onVisibilityChange(){document.visibilityState==="visible"?this.resume():this.pause()}onMouseEnter(){this.inHover=!0,this.pause()}onMouseLeave(){var e;this.inHover=!1,!((e=this.instance.panzoom)===null||e===void 0)&&e.isResting&&this.resume()}onTimerEnd(){const e=this.instance;this.state==="play"&&(e.isInfinite||e.page!==e.pages.length-1?e.slideNext():e.slideTo(0))}removeProgressBar(){this.progressBar&&(this.progressBar.remove(),this.progressBar=null)}createProgressBar(){var e;if(!this.option("showProgress"))return null;this.removeProgressBar();const t=this.instance,s=((e=t.pages[t.page])===null||e===void 0?void 0:e.slides)||[];let i=this.option("progressParentEl");if(i||(i=(s.length===1?s[0].el:null)||t.viewport),!i)return null;const n=document.createElement("div");return h(n,"f-progress"),i.prepend(n),this.progressBar=n,n.offsetHeight,n}set(){const e=this,t=e.instance;if(t.pages.length<2||e.timer)return;const s=e.option("timeout");e.state="play",h(t.container,"has-autoplay");let i=e.createProgressBar();i&&(i.style.transitionDuration=`${s}ms`,i.style.transform="scaleX(1)"),e.timer=setTimeout(()=>{e.timer=null,e.inHover||e.onTimerEnd()},s),e.emit("set")}clear(){const e=this;e.timer&&(clearTimeout(e.timer),e.timer=null),e.removeProgressBar()}start(){const e=this;if(e.set(),e.state!=="ready"){if(e.option("pauseOnHover")){const t=e.instance.container;t.addEventListener("mouseenter",e.onMouseEnter,!1),t.addEventListener("mouseleave",e.onMouseLeave,!1)}document.addEventListener("visibilitychange",e.onVisibilityChange,!1),e.emit("start")}}stop(){const e=this,t=e.state,s=e.instance.container;var i,n;e.clear(),e.state="ready",s.removeEventListener("mouseenter",e.onMouseEnter,!1),s.removeEventListener("mouseleave",e.onMouseLeave,!1),document.removeEventListener("visibilitychange",e.onVisibilityChange,!1),n="has-autoplay",(i=s)&&f(n).forEach(o=>{i.classList.remove(o)}),t!=="ready"&&e.emit("stop")}pause(){const e=this;e.state==="play"&&(e.state="pause",e.clear(),e.emit("pause"))}resume(){const e=this,t=e.instance;if(t.isInfinite||t.page!==t.pages.length-1)if(e.state!=="play"){if(e.state==="pause"&&!e.inHover){const s=new Event("resume",{bubbles:!0,cancelable:!0});e.emit("resume",s),s.defaultPrevented||e.set()}}else e.set();else e.stop()}toggle(){this.state==="play"||this.state==="pause"?this.stop():this.start()}attach(){const e=this,t=e.instance;t.on("ready",e.onReady),t.on("Panzoom.startAnimation",e.onChange),t.on("Panzoom.endAnimation",e.onSettle),t.on("Panzoom.touchMove",e.onChange)}detach(){const e=this,t=e.instance;t.off("ready",e.onReady),t.off("Panzoom.startAnimation",e.onChange),t.off("Panzoom.endAnimation",e.onSettle),t.off("Panzoom.touchMove",e.onChange),e.stop()}}Object.defineProperty(v,"defaults",{enumerable:!0,configurable:!0,writable:!0,value:{autoStart:!0,pauseOnHover:!0,progressParentEl:null,showProgress:!0,timeout:3e3}});export{v as r};