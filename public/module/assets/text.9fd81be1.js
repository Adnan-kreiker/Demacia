import{a as z,c as f,b as d,d as T,u as w,g as u,at as B,e as g,i as s,j as R,h as c,au as P}from"./index.587b4b8b.js";var V=z("h",`
 font-size: var(--n-font-size);
 font-weight: var(--n-font-weight);
 margin: var(--n-margin);
 transition: color .3s var(--n-bezier);
 color: var(--n-text-color);
`,[f("&:first-child",{marginTop:0}),d("prefix-bar",{position:"relative",paddingLeft:"var(--n-prefix-width)"},[d("align-text",{paddingLeft:0},[f("&::before",{left:"calc(-1 * var(--n-prefix-width))"})]),f("&::before",`
 content: "";
 width: var(--n-bar-width);
 border-radius: calc(var(--n-bar-width) / 2);
 transition: background-color .3s var(--n-bezier);
 left: 0;
 top: 0;
 bottom: 0;
 position: absolute;
 `),f("&::before",{backgroundColor:"var(--n-bar-color)"})])]);const H=Object.assign(Object.assign({},u.props),{type:{type:String,default:"default"},prefix:String,alignText:Boolean});var l=e=>T({name:`H${e}`,props:H,setup(o){const{mergedClsPrefixRef:i,inlineThemeDisabled:r}=w(o),n=u("Typography","-h",V,B,o,i),t=g(()=>{const{type:h}=o,{common:{cubicBezierEaseInOut:b},self:{headerFontWeight:m,headerTextColor:x,[s("headerPrefixWidth",e)]:v,[s("headerFontSize",e)]:p,[s("headerMargin",e)]:C,[s("headerBarWidth",e)]:y,[s("headerBarColor",h)]:$}}=n.value;return{"--n-bezier":b,"--n-font-size":p,"--n-margin":C,"--n-bar-color":$,"--n-bar-width":y,"--n-font-weight":m,"--n-text-color":x,"--n-prefix-width":v}}),a=r?R(`h${e}`,g(()=>o.type[0]),t,o):void 0;return{mergedClsPrefix:i,cssVars:r?void 0:t,themeClass:a==null?void 0:a.themeClass,onRender:a==null?void 0:a.onRender}},render(){var o;const{prefix:i,alignText:r,mergedClsPrefix:n,cssVars:t,$slots:a}=this;return(o=this.onRender)===null||o===void 0||o.call(this),c(`h${e}`,{class:[`${n}-h`,`${n}-h${e}`,this.themeClass,{[`${n}-h--prefix-bar`]:i,[`${n}-h--align-text`]:r}],style:t},a)}});const j=l("1"),k=l("2"),D=l("3");l("4");l("5");l("6");var N=z("text",`
 transition: color .3s var(--n-bezier);
 color: var(--n-text-color);
`,[d("strong",`
 font-weight: var(--n-font-weight-strong);
 `),d("italic",{fontStyle:"italic"}),d("underline",{textDecoration:"underline"}),d("code",`
 line-height: 1.4;
 display: inline-block;
 font-family: var(--n-font-famliy-mono);
 transition: 
 color .3s var(--n-bezier),
 border-color .3s var(--n-bezier),
 background-color .3s var(--n-bezier);
 box-sizing: border-box;
 padding: .05em .35em 0 .35em;
 border-radius: var(--n-code-border-radius);
 font-size: .9em;
 color: var(--n-code-text-color);
 background-color: var(--n-code-color);
 border: var(--n-code-border);
 `)]);const O=Object.assign(Object.assign({},u.props),{code:Boolean,type:{type:String,default:"default"},delete:Boolean,strong:Boolean,italic:Boolean,underline:Boolean,depth:[String,Number],tag:String,as:{type:String,validator:()=>!0,default:void 0}});var _=T({name:"Text",props:O,setup(e){const{mergedClsPrefixRef:o,inlineThemeDisabled:i}=w(e),r=u("Typography","-text",N,B,e,o),n=g(()=>{const{depth:a,type:h}=e,b=h==="default"?a===void 0?"textColor":`textColor${a}Depth`:s("textColor",h),{common:{fontWeightStrong:m,fontFamilyMono:x,cubicBezierEaseInOut:v},self:{codeTextColor:p,codeBorderRadius:C,codeColor:y,codeBorder:$,[b]:S}}=r.value;return{"--n-bezier":v,"--n-text-color":S,"--n-font-weight-strong":m,"--n-font-famliy-mono":x,"--n-code-border-radius":C,"--n-code-text-color":p,"--n-code-color":y,"--n-code-border":$}}),t=i?R("text",g(()=>`${e.type[0]}${e.depth||""}`),n,e):void 0;return{mergedClsPrefix:o,compitableTag:P(e,["as","tag"]),cssVars:i?void 0:n,themeClass:t==null?void 0:t.themeClass,onRender:t==null?void 0:t.onRender}},render(){var e,o,i;const{mergedClsPrefix:r}=this;(e=this.onRender)===null||e===void 0||e.call(this);const n=[`${r}-text`,this.themeClass,{[`${r}-text--code`]:this.code,[`${r}-text--delete`]:this.delete,[`${r}-text--strong`]:this.strong,[`${r}-text--italic`]:this.italic,[`${r}-text--underline`]:this.underline}],t=(i=(o=this.$slots).default)===null||i===void 0?void 0:i.call(o);return this.code?c("code",{class:n,style:this.cssVars},this.delete?c("del",null,t):t):this.delete?c("del",{class:n,style:this.cssVars},t):c(this.compitableTag||"span",{class:n,style:this.cssVars},t)}});export{D as N,_ as a,j as b,k as c};
