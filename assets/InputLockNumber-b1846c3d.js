import{_ as m,v,C as n,d as b,o as k,c as _,g,e as t,a4 as r,F as y,Y as f,Z as N}from"./index-d569c10e.js";/* empty css                                                                */const p=s=>(f("data-v-f32eb391"),s=s(),N(),s),I={class:"progress-bar"},S=p(()=>t("div",null,"25%",-1)),B=p(()=>t("div",null,"50%",-1)),C=p(()=>t("div",null,"75%",-1)),$=p(()=>t("div",null,"100%",-1)),x={__name:"InputLockNumber",props:{total:String,amount:String,decimals:Number},emits:["update:amount"],setup(s,{emit:c}){const o=s,l=v(()=>{const a=o.amount?n(o.amount):n(0),e=o.total?n(o.total):n(0);return e.lte(n(0))?0:a.div(e).multipliedBy(100).toNumber()});function i(a){c("update:amount",n(n(o.total).multipliedBy(a).div(100).toFixed(o.decimals,1)).toString())}return(a,e)=>{const d=b("el-input");return k(),_(y,null,[g(d,{"model-value":o.amount,"onUpdate:modelValue":e[0]||(e[0]=u=>c("update:amount",u)),class:"input",type:"number",placeholder:a.$t("setNumberOfLock")},null,8,["model-value","placeholder"]),t("ul",I,[t("li",{onClick:e[1]||(e[1]=u=>i(25))},[t("div",{class:"block",style:r({"--percent":l.value<0?0:l.value<25?(l.value-0)/25*100:100})},null,4),S]),t("li",{onClick:e[2]||(e[2]=u=>i(50))},[t("div",{class:"block",style:r({"--percent":l.value<25?0:l.value<50?(l.value-25)/25*100:100})},null,4),B]),t("li",{onClick:e[3]||(e[3]=u=>i(75))},[t("div",{class:"block",style:r({"--percent":l.value<50?0:l.value<75?(l.value-50)/25*100:100})},null,4),C]),t("li",{onClick:e[4]||(e[4]=u=>i(100))},[t("div",{class:"block",style:r({"--percent":l.value<75?0:l.value<100?(l.value-75)/25*100:100})},null,4),$])])],64)}}},V=m(x,[["__scopeId","data-v-f32eb391"]]);export{V as I};
