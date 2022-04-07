var ie=Object.defineProperty,ae=Object.defineProperties;var ne=Object.getOwnPropertyDescriptors;var j=Object.getOwnPropertySymbols;var le=Object.prototype.hasOwnProperty,oe=Object.prototype.propertyIsEnumerable;var V=(e,a,n)=>a in e?ie(e,a,{enumerable:!0,configurable:!0,writable:!0,value:n}):e[a]=n,I=(e,a)=>{for(var n in a||(a={}))le.call(a,n)&&V(e,n,a[n]);if(j)for(var n of j(a))oe.call(a,n)&&V(e,n,a[n]);return e},G=(e,a)=>ae(e,ne(a));import{N as T}from"./Skeleton.518fe6d0.js";import{c as _,a as f,b as $,d as C,e as y,f as P,h as r,N as U,u as se,g as Z,p as ce,i as X,j as ue,o as b,k as W,l as S,m as v,F as K,r as ge,n as E,q as w,w as M,s as z,R as de,t as A,v as H,x as pe,y as he}from"./index.587b4b8b.js";import{N as fe,a as me}from"./DataTable.e5baa4be.js";import{S as J,E as Q,W as ee,I as re}from"./Warning.2cb14fb4.js";import{u as ve,N as ye}from"./index.c12c71ce.js";import{N as xe,a as be}from"./text.9fd81be1.js";import"./get-slot.dbe6e0f6.js";var ke=_([f("progress",{display:"inline-block"},[f("progress-icon",`
 color: var(--n-icon-color);
 transition: color .3s var(--n-bezier);
 `),$("line",`
 width: 100%;
 display: block;
 `,[f("progress-content",`
 display: flex;
 align-items: center;
 `,[f("progress-graph",{flex:1})]),f("progress-custom-content",{marginLeft:"14px"}),f("progress-icon",`
 width: 30px;
 padding-left: 14px;
 height: var(--n-icon-size-line);
 line-height: var(--n-icon-size-line);
 font-size: var(--n-icon-size-line);
 `,[$("as-text",`
 color: var(--n-text-color-line-outer);
 text-align: center;
 width: 40px;
 font-size: var(--n-font-size);
 padding-left: 4px;
 transition: color .3s var(--n-bezier);
 `)])]),$("circle, dashboard",{width:"120px"},[f("progress-custom-content",`
 position: absolute;
 left: 50%;
 top: 50%;
 transform: translateX(-50%) translateY(-50%);
 display: flex;
 align-items: center;
 justify-content: center;
 `),f("progress-text",`
 position: absolute;
 left: 50%;
 top: 50%;
 transform: translateX(-50%) translateY(-50%);
 display: flex;
 align-items: center;
 color: inherit;
 font-size: var(--n-font-size-circle);
 color: var(--n-text-color-circle);
 font-weight: var(--n-font-weight-circle);
 transition: color .3s var(--n-bezier);
 white-space: nowrap;
 `),f("progress-icon",`
 position: absolute;
 left: 50%;
 top: 50%;
 transform: translateX(-50%) translateY(-50%);
 display: flex;
 align-items: center;
 color: var(--n-icon-color);
 font-size: var(--n-icon-size-circle);
 `)]),$("multiple-circle",`
 width: 200px;
 color: inherit;
 `,[f("progress-text",`
 font-weight: var(--n-font-weight-circle);
 color: var(--n-text-color-circle);
 position: absolute;
 left: 50%;
 top: 50%;
 transform: translateX(-50%) translateY(-50%);
 display: flex;
 align-items: center;
 justify-content: center;
 transition: color .3s var(--n-bezier);
 `)]),f("progress-content",{position:"relative"}),f("progress-graph",{position:"relative"},[f("progress-graph-circle",[_("svg",{verticalAlign:"bottom"}),f("progress-graph-circle-fill",`
 stroke: var(--n-fill-color);
 transition:
 opacity .3s var(--n-bezier),
 stroke .3s var(--n-bezier),
 stroke-dasharray .3s var(--n-bezier);
 `,[$("empty",{opacity:0})]),f("progress-graph-circle-rail",`
 transition: stroke .3s var(--n-bezier);
 overflow: hidden;
 stroke: var(--n-rail-color);
 `)]),f("progress-graph-line",[$("indicator-inside",[f("progress-graph-line-rail",`
 height: 16px;
 line-height: 16px;
 border-radius: 10px;
 `,[f("progress-graph-line-fill",`
 height: inherit;
 border-radius: 10px;
 `),f("progress-graph-line-indicator",`
 background: #0000;
 white-space: nowrap;
 text-align: right;
 margin-left: 14px;
 margin-right: 14px;
 height: inherit;
 font-size: 12px;
 color: var(--n-text-color-line-inner);
 transition: color .3s var(--n-bezier);
 `)])]),$("indicator-inside-label",`
 height: 16px;
 display: flex;
 align-items: center;
 `,[f("progress-graph-line-rail",`
 flex: 1;
 transition: background-color .3s var(--n-bezier);
 `),f("progress-graph-line-indicator",`
 background: var(--n-fill-color);
 font-size: 12px;
 transform: translateZ(0);
 display: flex;
 vertical-align: middle;
 height: 16px;
 line-height: 16px;
 padding: 0 10px;
 border-radius: 10px;
 position: absolute;
 white-space: nowrap;
 color: var(--n-text-color-line-inner);
 transition:
 right .2s var(--n-bezier),
 color .3s var(--n-bezier),
 background-color .3s var(--n-bezier);
 `)]),f("progress-graph-line-rail",`
 position: relative;
 overflow: hidden;
 height: var(--n-rail-height);
 border-radius: 5px;
 background-color: var(--n-rail-color);
 transition: background-color .3s var(--n-bezier);
 `,[f("progress-graph-line-fill",`
 background: var(--n-fill-color);
 position: relative;
 border-radius: 5px;
 height: inherit;
 width: 100%;
 max-width: 0%;
 transition:
 background-color .3s var(--n-bezier),
 max-width .2s var(--n-bezier);
 `,[$("processing",[_("&::after",`
 content: "";
 background-image: var(--n-line-bg-processing);
 animation: progress-processing-animation 2s var(--n-bezier) infinite;
 `)])])])])])]),_("@keyframes progress-processing-animation",`
 0% {
 position: absolute;
 left: 0;
 top: 0;
 bottom: 0;
 right: 100%;
 opacity: 1;
 }
 66% {
 position: absolute;
 left: 0;
 top: 0;
 bottom: 0;
 right: 0;
 opacity: 0;
 }
 100% {
 position: absolute;
 left: 0;
 top: 0;
 bottom: 0;
 right: 0;
 opacity: 0;
 }
 `)]);const $e={success:r(J,null),error:r(Q,null),warning:r(ee,null),info:r(re,null)};var Se=C({name:"ProgressLine",props:{clsPrefix:{type:String,required:!0},percentage:{type:Number,default:0},railColor:String,railStyle:[String,Object],fillColor:String,status:{type:String,required:!0},indicatorPlacement:{type:String,required:!0},indicatorTextColor:String,unit:{type:String,default:"%"},processing:{type:Boolean,required:!0},showIndicator:{type:Boolean,required:!0},height:[String,Number],railBorderRadius:[String,Number],fillBorderRadius:[String,Number]},setup(e,{slots:a}){const n=y(()=>P(e.height)),l=y(()=>e.railBorderRadius!==void 0?P(e.railBorderRadius):e.height!==void 0?P(e.height,{c:.5}):""),o=y(()=>e.fillBorderRadius!==void 0?P(e.fillBorderRadius):e.railBorderRadius!==void 0?P(e.railBorderRadius):e.height!==void 0?P(e.height,{c:.5}):"");return()=>{const{indicatorPlacement:s,railColor:h,railStyle:u,percentage:g,unit:i,indicatorTextColor:p,status:d,showIndicator:c,fillColor:t,processing:x,clsPrefix:m}=e;return r("div",{class:`${m}-progress-content`,role:"none"},r("div",{class:`${m}-progress-graph`,"aria-hidden":!0},r("div",{class:[`${m}-progress-graph-line`,{[`${m}-progress-graph-line--indicator-${s}`]:!0}]},r("div",{class:`${m}-progress-graph-line-rail`,style:[{backgroundColor:h,height:n.value,borderRadius:l.value},u]},r("div",{class:[`${m}-progress-graph-line-fill`,x&&`${m}-progress-graph-line-fill--processing`],style:{maxWidth:`${e.percentage}%`,backgroundColor:t,height:n.value,lineHeight:n.value,borderRadius:o.value}},s==="inside"?r("div",{class:`${m}-progress-graph-line-indicator`},g,i):null)))),c&&s==="outside"?r("div",null,a.default?r("div",{class:`${m}-progress-custom-content`,style:{color:p},role:"none"},a.default()):d==="default"?r("div",{role:"none",class:`${m}-progress-icon ${m}-progress-icon--as-text`,style:{color:p}},g,i):r("div",{class:`${m}-progress-icon`,"aria-hidden":!0},r(U,{clsPrefix:m},{default:()=>$e[d]}))):null)}}});const we={success:r(J,null),error:r(Q,null),warning:r(ee,null),info:r(re,null)};var Ce=C({name:"ProgressCircle",props:{clsPrefix:{type:String,required:!0},status:{type:String,required:!0},strokeWidth:{type:Number,required:!0},fillColor:String,railColor:String,railStyle:[String,Object],percentage:{type:Number,default:0},offsetDegree:{type:Number,default:0},showIndicator:{type:Boolean,required:!0},indicatorTextColor:String,unit:String,viewBoxWidth:{type:Number,required:!0},gapDegree:{type:Number,required:!0},gapOffsetDegree:{type:Number,default:0}},setup(e,{slots:a}){function n(l,o,s){const{gapDegree:h,viewBoxWidth:u}=e,g=50,i=0,p=g,d=0,c=2*g,t=`M 55,55 m ${i},${p}
      a ${g},${g} 0 1 1 ${d},${-c}
      a ${g},${g} 0 1 1 ${-d},${c}`,x=Math.PI*2*g,m={stroke:s,strokeDasharray:`${l/100*(x-h)}px ${u*8}px`,strokeDashoffset:`-${h/2+Math.PI/3.6*o}px`};return{pathString:t,pathStyle:m}}return()=>{const{fillColor:l,railColor:o,strokeWidth:s,offsetDegree:h,status:u,percentage:g,showIndicator:i,indicatorTextColor:p,unit:d,gapOffsetDegree:c,clsPrefix:t}=e,{pathString:x,pathStyle:m}=n(100,0,o),{pathString:R,pathStyle:N}=n(g,h,l);return r("div",{class:`${t}-progress-content`,role:"none"},r("div",{class:`${t}-progress-graph`,"aria-hidden":!0},r("div",{class:`${t}-progress-graph-circle`,style:{transform:c?`rotate(${c}deg)`:void 0}},r("svg",{viewBox:"0 0 110 110"},r("g",null,r("path",{class:`${t}-progress-graph-circle-rail`,d:x,"stroke-width":s,"stroke-linecap":"round",fill:"none",style:m})),r("g",null,r("path",{class:[`${t}-progress-graph-circle-fill`,g===0&&`${t}-progress-graph-circle-fill--empty`],d:R,"stroke-width":s,"stroke-linecap":"round",fill:"none",style:N}))))),i?r("div",null,a.default?r("div",{class:`${t}-progress-custom-content`,role:"none"},a.default()):u!=="default"?r("div",{class:`${t}-progress-icon`,"aria-hidden":!0},r(U,{clsPrefix:t},{default:()=>we[u]})):r("div",{class:`${t}-progress-text`,style:{color:p},role:"none"},r("span",{class:`${t}-progress-text__percentage`},g),r("span",{class:`${t}-progress-text__unit`},d))):null)}}});function Y(e,a,n=100){return`m ${n/2} ${n/2-e} a ${e} ${e} 0 1 1 0 ${2*e} a ${e} ${e} 0 1 1 0 -${2*e}`}var Pe=C({name:"ProgressMultipleCircle",props:{clsPrefix:{type:String,required:!0},viewBoxWidth:{type:Number,required:!0},percentage:{type:Array,default:[0]},strokeWidth:{type:Number,required:!0},circleGap:{type:Number,required:!0},showIndicator:{type:Boolean,required:!0},fillColor:{type:Array,default:()=>[]},railColor:{type:Array,default:()=>[]},railStyle:{type:Array,default:()=>[]}},setup(e,{slots:a}){const n=y(()=>e.percentage.map((o,s)=>`${Math.PI*o/100*(e.viewBoxWidth/2-e.strokeWidth/2*(1+2*s)-e.circleGap*s)*2}, ${e.viewBoxWidth*8}`));return()=>{const{viewBoxWidth:l,strokeWidth:o,circleGap:s,showIndicator:h,fillColor:u,railColor:g,railStyle:i,percentage:p,clsPrefix:d}=e;return r("div",{class:`${d}-progress-content`,role:"none"},r("div",{class:`${d}-progress-graph`,"aria-hidden":!0},r("div",{class:`${d}-progress-graph-circle`},r("svg",{viewBox:`0 0 ${l} ${l}`},p.map((c,t)=>r("g",{key:t},r("path",{class:`${d}-progress-graph-circle-rail`,d:Y(l/2-o/2*(1+2*t)-s*t,o,l),"stroke-width":o,"stroke-linecap":"round",fill:"none",style:[{strokeDashoffset:0,stroke:g[t]},i[t]]}),r("path",{class:[`${d}-progress-graph-circle-fill`,c===0&&`${d}-progress-graph-circle-fill--empty`],d:Y(l/2-o/2*(1+2*t)-s*t,o,l),"stroke-width":o,"stroke-linecap":"round",fill:"none",style:{strokeDasharray:n.value[t],strokeDashoffset:0,stroke:u[t]}})))))),h&&a.default?r("div",null,r("div",{class:`${d}-progress-text`},a.default())):null)}}});const Re=Object.assign(Object.assign({},Z.props),{processing:Boolean,type:{type:String,default:"line"},gapDegree:Number,gapOffsetDegree:Number,status:{type:String,default:"default"},railColor:[String,Array],railStyle:[String,Array],color:[String,Array],viewBoxWidth:{type:Number,default:100},strokeWidth:{type:Number,default:7},percentage:[Number,Array],unit:{type:String,default:"%"},showIndicator:{type:Boolean,default:!0},indicatorPosition:{type:String,default:"outside"},indicatorPlacement:{type:String,default:"outside"},indicatorTextColor:String,circleGap:{type:Number,default:1},height:Number,borderRadius:[String,Number],fillBorderRadius:[String,Number],offsetDegree:Number});var Ne=C({name:"Progress",props:Re,setup(e){const a=y(()=>e.indicatorPlacement||e.indicatorPosition),n=y(()=>{if(e.gapDegree||e.gapDegree===0)return e.gapDegree;if(e.type==="dashboard")return 75}),{mergedClsPrefixRef:l,inlineThemeDisabled:o}=se(e),s=Z("Progress","-progress",ke,ce,e,l),h=y(()=>{const{status:g}=e,{common:{cubicBezierEaseInOut:i},self:{fontSize:p,fontSizeCircle:d,railColor:c,railHeight:t,iconSizeCircle:x,iconSizeLine:m,textColorCircle:R,textColorLineInner:N,textColorLineOuter:k,lineBgProcessing:D,fontWeightCircle:L,[X("iconColor",g)]:q,[X("fillColor",g)]:B}}=s.value;return{"--n-bezier":i,"--n-fill-color":B,"--n-font-size":p,"--n-font-size-circle":d,"--n-font-weight-circle":L,"--n-icon-color":q,"--n-icon-size-circle":x,"--n-icon-size-line":m,"--n-line-bg-processing":D,"--n-rail-color":c,"--n-rail-height":t,"--n-text-color-circle":R,"--n-text-color-line-inner":N,"--n-text-color-line-outer":k}}),u=o?ue("progress",y(()=>e.status[0]),h,e):void 0;return{mergedClsPrefix:l,mergedIndicatorPlacement:a,gapDeg:n,cssVars:o?void 0:h,themeClass:u==null?void 0:u.themeClass,onRender:u==null?void 0:u.onRender}},render(){const{type:e,cssVars:a,indicatorTextColor:n,showIndicator:l,status:o,railColor:s,railStyle:h,color:u,percentage:g,viewBoxWidth:i,strokeWidth:p,mergedIndicatorPlacement:d,unit:c,borderRadius:t,fillBorderRadius:x,height:m,processing:R,circleGap:N,mergedClsPrefix:k,gapDeg:D,gapOffsetDegree:L,themeClass:q,$slots:B,onRender:O}=this;return O==null||O(),r("div",{class:[q,`${k}-progress`,`${k}-progress--${e}`,`${k}-progress--${o}`],style:a,"aria-valuemax":100,"aria-valuemin":0,"aria-valuenow":g,role:e==="circle"||e==="line"||e==="dashboard"?"progressbar":"none"},e==="circle"||e==="dashboard"?r(Ce,{clsPrefix:k,status:o,showIndicator:l,indicatorTextColor:n,railColor:s,fillColor:u,railStyle:h,offsetDegree:this.offsetDegree,percentage:g,viewBoxWidth:i,strokeWidth:p,gapDegree:D===void 0?e==="dashboard"?75:0:D,gapOffsetDegree:L,unit:c},B):e==="line"?r(Se,{clsPrefix:k,status:o,showIndicator:l,indicatorTextColor:n,railColor:s,fillColor:u,railStyle:h,percentage:g,processing:R,indicatorPlacement:d,unit:c,fillBorderRadius:x,railBorderRadius:t,height:m},B):e==="multiple-circle"?r(Pe,{clsPrefix:k,strokeWidth:p,railColor:s,fillColor:u,railStyle:h,viewBoxWidth:i,percentage:g,showIndicator:l,circleGap:N},B):null)}});const Be={class:"flex justify-center"},te=C({setup(e){return(a,n)=>(b(),W(K,null,[S(v(T),{class:"mx-auto",height:"40px",width:"92%"}),(b(),W(K,null,ge(10,l=>E("div",{class:"my-4",key:l},[E("div",Be,[S(v(T),{class:"mr-4",height:"50px",circle:""}),S(v(T),{height:"50px",width:"85%"})])])),64))],64))}}),ze=C({props:{challengerPlayers:null,page:null,rank:null},setup(e){const a=e,n=y(()=>{switch(a.rank){case"challengerleagues":return"Challenger";case"grandmasterleagues":return"Grandmaster";case"masterleagues":return"Master"}}),l=w([]),o=y(()=>l.value?l.value.sort((i,p)=>p.leaguePoints-i.leaguePoints):[]);(async()=>{if(a.challengerPlayers){const i=[];await Promise.allSettled(a.challengerPlayers.map(async p=>{const c=await(await fetch(`https://league-of-legends-wikis-backend.vercel.app/api/get-summoner/${ve(p.summonerName)}`)).json();i.push(I(I({},p),c))})),l.value=i}})();const h=w(null),u=y(()=>h.value?h.value.length===0:!1);M(o,()=>{o.value&&(h.value=o.value.map(i=>({rank:i.idx,summoner:i.summonerName,tier:n.value,lp:i.leaguePoints,level:i.summonerLevel,winRatio:Math.floor(i.wins/(i.wins+i.losses)*100),icon:i.profileIconId})))},{immediate:!0});const g=[{title:"Rank",key:"rank",align:"center"},{title:"Summoner",key:"summoner",width:"200px",render(i){const p=i.icon;return r(de,{to:`/summoner-info/${i.summoner}`,props:{custom:!0,vSlot:"navigate"},style:{display:"flex",alignItems:"center"},key:i.summoner},{default:()=>[r("img",{src:`https://ddragon.leagueoflegends.com/cdn/12.6.1/img/profileicon/${p}.png`,height:"40",width:"40",style:{borderRadius:"50%"}}),r("span",{style:{marginLeft:"15px"}},i.summoner)]})},ellipsis:{tooltip:!0}},{title:"Tier",key:"tier",align:"center"},{title:"LP",key:"lp",align:"center"},{title:"Level",key:"level",align:"center"},{title:"Win Ratio",key:"winRatio",align:"center",render(i){const p=i.winRatio;return r(Ne,{style:{height:"24px",borderRadius:"4"},type:"line",railColor:"#ee5a52",percentage:p})}}];return(i,p)=>(b(),W("div",null,[h.value?(b(),z(v(fe),{key:0,loading:v(u),columns:g,"scroll-x":"800",data:h.value,"min-height":"350"},null,8,["loading","data"])):(b(),z(te,{key:1}))]))}});var F={};const De={class:"min-h-screen"},Ie=he(" Choose queue type "),_e={class:"flex justify-center mt-5"},We=C({setup(e){const a=[{label:"RANKED SOLO 5x5",value:"RANKED_SOLO_5x5"},{label:"RANKED FLEX SR",value:"RANKED_FLEX_SR"}],n=[{label:"CHALLENGER",value:"challengerleagues"},{label:"GRANDMASTER",value:"grandmasterleagues"},{label:"MASTER",value:"masterleagues"}],l=w("RANKED_SOLO_5x5"),o=w("challengerleagues"),s=w([]);g();const h=y(()=>{let d=u.value*10;return s.value?[...s.value].sort((c,t)=>t.leaguePoints-c.leaguePoints).map((c,t)=>G(I({},c),{idx:t+1})).slice(d-10,d):[]}),u=w(1);async function g(){s.value=[];const c=await(await fetch(`https://league-of-legends-wikis-backend.vercel.app/api/get-leaderboards-players/${o.value}/${l.value}`)).json();s.value=c.entries,i.value++}const i=w(0);M([l,o],()=>{g(),u.value=1}),M(u,()=>{i.value++});const p=d=>{u.value=d,i.value++};return(d,c)=>(b(),W("div",De,[S(v(ye),null,{default:A(()=>[S(v(xe),{class:"mx-4",prefix:"bar","align-text":"",type:"success"},{default:A(()=>[S(v(be),{type:"success"},{default:A(()=>[Ie]),_:1})]),_:1}),S(v(H),{class:"min-w-56 pr-4",value:l.value,"onUpdate:value":c[0]||(c[0]=t=>l.value=t),options:a},null,8,["value"]),S(v(H),{class:"min-w-56",value:o.value,"onUpdate:value":c[1]||(c[1]=t=>o.value=t),options:n},null,8,["value"])]),_:1}),s.value&&s.value.length>0?(b(),z(ze,{rank:o.value,"challenger-players":v(h),key:i.value,page:u.value},null,8,["rank","challenger-players","page"])):(b(),z(te,{key:1})),E("div",_e,[s.value&&s.value.length>0?(b(),z(v(me),{key:0,modelValue:u.value,"onUpdate:modelValue":c[2]||(c[2]=t=>u.value=t),"default-page":1,"page-count":Math.ceil(s.value.length/10),onUpdatePage:c[3]||(c[3]=t=>p(t))},null,8,["modelValue","page-count"])):pe("",!0)])]))}});typeof F=="function"&&F(We);export{We as default};
