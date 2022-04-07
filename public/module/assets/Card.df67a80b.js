import{c as t,a as b,b as d,L as n,O as W,P as D,az as I,d as q,u as G,g as u,aA as J,A as Q,e as m,i as h,aB as U,j as X,h as i,a7 as g,aC as Y,K as Z}from"./index.587b4b8b.js";var ee=t([b("card",`
 font-size: var(--n-font-size);
 line-height: var(--n-line-height);
 display: flex;
 flex-direction: column;
 width: 100%;
 box-sizing: border-box;
 position: relative;
 border-radius: var(--n-border-radius);
 background-color: var(--n-color);
 color: var(--n-text-color);
 transition: 
 color .3s var(--n-bezier),
 background-color .3s var(--n-bezier),
 box-shadow .3s var(--n-bezier),
 border-color .3s var(--n-bezier);
 `,[d("hoverable",[t("&:hover","box-shadow: var(--n-box-shadow);")]),d("content-segmented",[t(">",[n("content",{paddingTop:"var(--n-padding-bottom)"})])]),d("content-soft-segmented",[t(">",[n("content",`
 margin: 0 var(--n-padding-left);
 padding: var(--n-padding-bottom) 0;
 `)])]),d("footer-segmented",[t(">",[n("footer",{paddingTop:"var(--n-padding-bottom)"})])]),d("footer-soft-segmented",[t(">",[n("footer",`
 padding: var(--n-padding-bottom) 0;
 margin: 0 var(--n-padding-left);
 `)])]),t(">",[b("card-header",`
 box-sizing: border-box;
 display: flex;
 align-items: center;
 font-size: var(--n-title-font-size);
 padding:
 var(--n-padding-top)
 var(--n-padding-left)
 var(--n-padding-bottom)
 var(--n-padding-left);
 `,[n("main",`
 font-weight: var(--n-title-font-weight);
 transition: color .3s var(--n-bezier);
 flex: 1;
 color: var(--n-title-text-color);
 `),n("extra",`
 display: flex;
 align-items: center;
 font-size: var(--n-font-size);
 font-weight: 400;
 transition: color .3s var(--n-bezier);
 color: var(--n-text-color);
 `),n("close",`
 font-size: var(--n-close-size);
 transition: color .3s var(--n-bezier);
 `)]),n("action",`
 box-sizing: border-box;
 transition:
 background-color .3s var(--n-bezier),
 border-color .3s var(--n-bezier);
 background-clip: padding-box;
 background-color: var(--n-action-color);
 `),n("content","flex: 1;"),n("content, footer",`
 box-sizing: border-box;
 padding: 0 var(--n-padding-left) var(--n-padding-bottom) var(--n-padding-left);
 font-size: var(--n-font-size);
 `,[t("&:first-child",{paddingTop:"var(--n-padding-bottom)"})]),n("action",`
 background-color: var(--n-action-color);
 padding: var(--n-padding-bottom) var(--n-padding-left);
 border-bottom-left-radius: var(--n-border-radius);
 border-bottom-right-radius: var(--n-border-radius);
 `)]),b("card-cover",`
 overflow: hidden;
 width: 100%;
 border-radius: var(--n-border-radius) var(--n-border-radius) 0 0;
 `,[t("img",`
 display: block;
 width: 100%;
 `)]),d("bordered",`
 border: 1px solid var(--n-border-color);
 `,[t("&:target","border-color: var(--n-color-target);")]),d("action-segmented",[t(">",[n("action",[t("&:not(:first-child)",{borderTop:"1px solid var(--n-border-color)"})])])]),d("content-segmented, content-soft-segmented",[t(">",[n("content",{transition:"border-color 0.3s var(--n-bezier)"},[t("&:not(:first-child)",{borderTop:"1px solid var(--n-border-color)"})])])]),d("footer-segmented, footer-soft-segmented",[t(">",[n("footer",{transition:"border-color 0.3s var(--n-bezier)"},[t("&:not(:first-child)",{borderTop:"1px solid var(--n-border-color)"})])])])]),W(b("card",{background:"var(--n-color-modal)"})),D(b("card",{background:"var(--n-color-popover)"})),b("card",[I({background:"var(--n-color-modal)"})])]);const oe={title:String,contentStyle:[Object,String],headerStyle:[Object,String],headerExtraStyle:[Object,String],footerStyle:[Object,String],embedded:Boolean,segmented:{type:[Boolean,Object],default:!1},size:{type:String,default:"medium"},bordered:{type:Boolean,default:!0},closable:{type:Boolean,default:!1},hoverable:Boolean,role:String,onClose:[Function,Array]},re=Object.assign(Object.assign({},u.props),oe);var ne=q({name:"Card",props:re,setup(e){const v=()=>{const{onClose:c}=e;c&&Z(c)},{inlineThemeDisabled:f,mergedClsPrefixRef:o,mergedRtlRef:p}=G(e),l=u("Card","-card",ee,J,e,o),s=Q("Card",p,o),r=m(()=>{const{size:c}=e,{self:{color:x,colorModal:z,colorTarget:C,textColor:y,titleTextColor:S,titleFontWeight:$,borderColor:k,actionColor:w,borderRadius:T,closeColor:_,closeColorHover:B,closeColorPressed:R,lineHeight:P,closeSize:O,boxShadow:j,colorPopover:E,colorEmbedded:M,[h("padding",c)]:F,[h("fontSize",c)]:A,[h("titleFontSize",c)]:H},common:{cubicBezierEaseInOut:L}}=l.value,{top:N,left:V,bottom:K}=U(F);return{"--n-bezier":L,"--n-border-radius":T,"--n-color":e.embedded?M:x,"--n-color-modal":z,"--n-color-popover":E,"--n-color-target":C,"--n-text-color":y,"--n-line-height":P,"--n-action-color":w,"--n-title-text-color":S,"--n-title-font-weight":$,"--n-close-color":_,"--n-close-color-hover":B,"--n-close-color-pressed":R,"--n-border-color":k,"--n-box-shadow":j,"--n-padding-top":N,"--n-padding-bottom":K,"--n-padding-left":V,"--n-font-size":A,"--n-title-font-size":H,"--n-close-size":O}}),a=f?X("card",m(()=>e.size[0]),r,e):void 0;return{rtlEnabled:s,mergedClsPrefix:o,mergedTheme:l,handleCloseClick:v,cssVars:f?void 0:r,themeClass:a==null?void 0:a.themeClass,onRender:a==null?void 0:a.onRender}},render(){const{segmented:e,bordered:v,hoverable:f,mergedClsPrefix:o,rtlEnabled:p,onRender:l,$slots:s}=this;return l==null||l(),i("div",{class:[`${o}-card`,this.themeClass,{[`${o}-card--rtl`]:p,[`${o}-card--content${typeof e!="boolean"&&e.content==="soft"?"-soft":""}-segmented`]:e===!0||e!==!1&&e.content,[`${o}-card--footer${typeof e!="boolean"&&e.footer==="soft"?"-soft":""}-segmented`]:e===!0||e!==!1&&e.footer,[`${o}-card--action-segmented`]:e===!0||e!==!1&&e.action,[`${o}-card--bordered`]:v,[`${o}-card--hoverable`]:f}],style:this.cssVars,role:this.role},g(s.cover,r=>r&&i("div",{class:`${o}-card-cover`,role:"none"},r)),g(s.header,r=>r||this.title||this.closable?i("div",{class:`${o}-card-header`,style:this.headerStyle},i("div",{class:`${o}-card-header__main`,role:"heading"},r||[this.title]),g(s["header-extra"],a=>a&&i("div",{class:`${o}-card-header__extra`,style:this.headerExtraStyle},a)),this.closable?i(Y,{clsPrefix:o,class:`${o}-card-header__close`,onClick:this.handleCloseClick}):null):null),g(s.default,r=>r&&i("div",{class:`${o}-card__content`,style:this.contentStyle,role:"none"},r)),g(s.footer,r=>r&&[i("div",{class:`${o}-card__footer`,style:this.footerStyle,role:"none"},r)]),g(s.action,r=>r&&i("div",{class:`${o}-card__action`,role:"none"},r)))}});export{ne as N};
