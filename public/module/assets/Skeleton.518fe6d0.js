import{av as B,c as f,a as R,d as N,u as A,g as y,e as E,i as H,ad as b,h as p,a4 as L,F as O}from"./index.587b4b8b.js";let v=!1;function V(){if(typeof window!="undefined"&&!!window.CSS&&!v&&(v=!0,"registerProperty"in(window==null?void 0:window.CSS)))try{CSS.registerProperty({name:"--n-color-start",syntax:"<color>",inherits:!1,initialValue:"#0000"}),CSS.registerProperty({name:"--n-color-end",syntax:"<color>",inherits:!1,initialValue:"#0000"})}catch{}}const _=e=>{const{heightSmall:o,heightMedium:i,heightLarge:r,borderRadius:n}=e;return{color:"#eee",colorEnd:"#ddd",borderRadius:n,heightSmall:o,heightMedium:i,heightLarge:r}},j={name:"Skeleton",common:B,self:_};var F=f([R("skeleton",`
 height: 1em;
 width: 100%;
 transition: background-color .3s var(--n-bezier);
 transition:
 --n-color-start .3s var(--n-bezier),
 --n-color-end .3s var(--n-bezier),
 background-color .3s var(--n-bezier);
 animation: 2s skeleton-loading infinite cubic-bezier(0.36, 0, 0.64, 1);
 background-color: var(--n-color-start);
 `),f("@keyframes skeleton-loading",`
 0% {
 background: var(--n-color-start);
 }
 40% {
 background: var(--n-color-end);
 }
 80% {
 background: var(--n-color-start);
 }
 100% {
 background: var(--n-color-start);
 }
 `)]);const T=Object.assign(Object.assign({},y.props),{text:Boolean,round:Boolean,circle:Boolean,height:[String,Number],width:[String,Number],size:String,repeat:{type:Number,default:1},animated:{type:Boolean,default:!0},sharp:{type:Boolean,default:!0}});var I=N({name:"Skeleton",inheritAttrs:!1,props:T,setup(e){V();const{mergedClsPrefixRef:o}=A(e),i=y("Skeleton","-skeleton",F,j,e,o);return{mergedClsPrefix:o,style:E(()=>{var r,n;const a=i.value,{common:{cubicBezierEaseInOut:k}}=a,g=a.self,{color:S,colorEnd:w,borderRadius:x}=g;let s;const{circle:l,sharp:z,round:C,width:t,height:d,size:h,text:m,animated:P}=e;h!==void 0&&(s=g[H("height",h)]);const c=l?(r=t!=null?t:d)!==null&&r!==void 0?r:s:t,u=(n=l&&t!=null?t:d)!==null&&n!==void 0?n:s;return{display:m?"inline-block":"",verticalAlign:m?"-0.125em":"",borderRadius:l?"50%":C?"4096px":z?"":x,width:typeof c=="number"?b(c):c,height:typeof u=="number"?b(u):u,animation:P?"":"none","--n-bezier":k,"--n-color-start":S,"--n-color-end":w}})}},render(){const{repeat:e,style:o,mergedClsPrefix:i,$attrs:r}=this,n=p("div",L({class:`${i}-skeleton`,style:o},r));return e>1?p(O,null,Array.apply(null,{length:e}).map(a=>[n,`
`])):n}});export{I as N};
