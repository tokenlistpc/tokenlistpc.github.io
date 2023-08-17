import{T as F}from"./TokenIcon-6cd22654.js";import{_ as O,v as z,C as b,b as w,o as n,c as o,l as p,B as I,d as e,t as s,J as X,i as L,$ as E,z as f,f as v,m as H,M as P,A as U,X as Y,Y as K,r as j,R as G,G as J,y as k,H as R,k as Q,F as S,e as A}from"./index-1bebee79.js";import{e as N}from"./ethers-5d8e554e.js";import{f as M}from"./units-bc6c6fc9.js";/* empty css                                                          */const W={class:"progress-data"},Z={__name:"Progress",props:{cumulateAmount:{type:String,default:"0"},topAmount:{type:String,default:"0"},symbol:{type:String,default:""}},setup(_){const a=_,d=z(()=>b(a.cumulateAmount).lte(a.topAmount)?b(a.cumulateAmount).dividedBy(a.topAmount).multipliedBy(100).toString():b(a.topAmount).dividedBy(a.cumulateAmount).multipliedBy(100).toString());return(m,h)=>{const c=w("el-progress");return n(),o("div",null,[p(b)(a.cumulateAmount).lte(a.topAmount)?(n(),I(c,{key:0,color:"rgba(72, 199, 116, 0.5)","show-text":!1,"stroke-width":10,percentage:Number(d.value)},null,8,["percentage"])):(n(),I(c,{key:1,class:"progress-bg","show-text":!1,color:"#52c41a","stroke-width":10,percentage:Number(d.value)},null,8,["percentage"])),e("div",W,[e("text",null,s(a.cumulateAmount)+" "+s(a.symbol),1),e("text",null,s(a.topAmount)+" "+s(a.symbol),1)])])}}},aa=O(Z,[["__scopeId","data-v-d76be2e6"]]),ea=X("lp",{state:()=>({networks:[{name:"bsc",pinkName:"BSC",value:56,icon:"https://ave.s3.ap-east-1.amazonaws.com/chain/bsc.png"},{name:"eth",pinkName:"ETH",value:1,icon:"https://ave.s3.ap-east-1.amazonaws.com/chain/eth.png"},{name:"polygon",pinkName:"Matic",value:137,icon:"https://ave.s3.ap-east-1.amazonaws.com/chain/polygon.png"},{name:"avalanche",pinkName:"AVAX",value:43114,icon:"https://ave.s3.ap-east-1.amazonaws.com/chain/avalanche.png"},{name:"fantom",pinkName:"FTM",value:250,icon:"https://ave.s3.ap-east-1.amazonaws.com/chain/fantom.png"},{name:"cronos",pinkName:"Cronos",value:25,icon:"https://ave.s3.ap-east-1.amazonaws.com/chain/cronos.png"},{name:"dogechain",pinkName:"DogeChain",value:2e3,icon:"https://ave.s3.ap-east-1.amazonaws.com/chain/dogechain.png"},{name:"alveychain",pinkName:"Alvey",value:3797,icon:"https://ave.s3.ap-east-1.amazonaws.com/chain/alveychain.png"},{name:"arbitrum",pinkName:"Arbitrum",value:42161,icon:"https://ave.s3.ap-east-1.amazonaws.com/chain/arbitrum.png"},{name:"pulse",pinkName:"PulseChain",value:369,icon:"https://ave.s3.ap-east-1.amazonaws.com/chain/pulse.png"}],platforms:[{name:"allPlatforms",value:"all",icon:""},{name:"PinkSale",value:"pinksale",icon:"./assets/imgs/pinkswap.png"}],statusList:[{name:"allStatus",value:"all"},{name:"salelive",value:"salelive"},{name:"upcoming",value:"upcoming"},{name:"ended",value:"ended"},{name:"canceled",value:"canceled"}],checkedStatus:"all"}),actions:{}});const D=_=>(Y("data-v-a47ad2a4"),_=_(),K(),_),ta={class:"launch-pad-item"},sa={key:0,class:"status sale-live"},na=D(()=>e("span",{class:"spot"},null,-1)),la={key:1,class:"status upcoming"},oa=D(()=>e("span",{class:"spot"},null,-1)),ca={key:2,class:"status ended"},ia=D(()=>e("span",{class:"spot"},null,-1)),ua={key:3,class:"status canceled"},pa=D(()=>e("span",{class:"spot"},null,-1)),da={class:"top"},ma={class:"left"},ra={class:"right"},ha={class:"tags"},va={key:0,class:"tag kyc",plain:"",type:"primary"},_a={key:1,class:"tag safu",plain:"",type:"primary"},ga={key:2,class:"tag audit",plain:"",type:"primary"},fa={key:3,class:"tag doxx",plain:"",type:"primary"},ya={class:"content"},ka={class:"token-info"},Ia={class:"token-name"},wa={class:"line1"},ba={class:"price"},$a={key:0},Ca={class:"small-title"},Sa={class:"value"},Aa={key:1},Na={class:"small-title"},za={class:"value"},La={class:"sale-status"},Da={key:0},Ba={class:"value"},Ta={key:1},Va={class:"value"},Pa={key:2},Ua={class:"value"},Ma={key:3},Fa={class:"value"},Oa={class:"progress"},Xa={class:"small-title"},qa={class:"line3"},xa={class:"liquidity"},Ea={class:"lastdays"},Ha={key:0},Ya={key:1},Ka={class:"bottom"},ja={class:"platform"},Ga={__name:"LaunchpadItem",props:{launchpadItem:Object},setup(_){const a=_,d=ea(),m=L("");let h=null;function c(t){return t<10?"0"+t.toString():t.toString()}function B(t){let u;t.status=="salelive"?u=t.endTime:t.status=="upcoming"&&(u=t.startTime),h=setInterval(function(){let i=Math.floor(b(new Date().getTime()).div(1e3).toNumber());if(i<u){let g=u-i;m.value=T(g)}else i>=u&&(clearInterval(h),m.value="00 : 00 : 00")},1e3)}function T(t){let u=Math.floor(t/86400),i=Math.floor(t/(60*60)%24),g=Math.floor(t/60%60),C=Math.floor(t%60);return u>0?c(u)+" : "+c(i)+" : "+c(g)+" : "+c(C):c(i)+" : "+c(g)+" : "+c(C)}B(a.launchpadItem);const $=z(()=>a.launchpadItem.hardCap!==""&&a.launchpadItem.hardCap!=="0"?M(a.launchpadItem.hardCap,a.launchpadItem.currencyDecimals):M(a.launchpadItem.softCap,a.launchpadItem.currencyDecimals)),V=z(()=>d.platforms.find(t=>t.value==a.launchpadItem.platform).name),y=z(()=>b(M(a.launchpadItem.cumulateAmount,a.launchpadItem.currencyDecimals)).dividedBy($.value).multipliedBy(100).toFixed(2));E(()=>{clearInterval(h)});function r(){a.launchpadItem.platform=="pinksale"&&window.open("https://www.pinksale.finance/launchpad/"+a.launchpadItem.address+"?chain="+d.networks.find(t=>t.value==a.launchpadItem.chainId).pinkName)}return(t,u)=>(n(),o("div",ta,[a.launchpadItem.status=="salelive"?(n(),o("div",sa,[na,e("span",null,s(t.$t(a.launchpadItem.status)),1)])):a.launchpadItem.status=="upcoming"?(n(),o("div",la,[oa,e("span",null,s(t.$t(a.launchpadItem.status)),1)])):a.launchpadItem.status=="ended"?(n(),o("div",ca,[ia,e("span",null,s(t.$t(a.launchpadItem.status)),1)])):a.launchpadItem.status=="canceled"?(n(),o("div",ua,[pa,e("span",null,s(t.$t(a.launchpadItem.status)),1)])):f("",!0),e("div",da,[e("div",ma,[v(F,{class:"token-icon",bigIcon:a.launchpadItem.icon,smallIcon:p(H)(p(d).networks.find(i=>i.value==a.launchpadItem.chainId).name)},null,8,["bigIcon","smallIcon"])]),e("div",ra,[e("div",ha,[a.launchpadItem.tags.indexOf("KYC")>-1?(n(),o("span",va,"KYC")):f("",!0),a.launchpadItem.tags.indexOf("SAFU")>-1?(n(),o("span",_a,"SAFU")):f("",!0),a.launchpadItem.tags.indexOf("Audit")>-1?(n(),o("span",ga,"Audit")):f("",!0),a.launchpadItem.tags.indexOf("DOXX")>-1?(n(),o("span",fa,"DOXX")):f("",!0)])])]),e("div",ya,[e("div",ka,[e("div",Ia,s(a.launchpadItem.tokenName),1)]),e("div",wa,[e("div",ba,[a.launchpadItem.hardCap!==""&&a.launchpadItem.hardCap!=="0"?(n(),o("div",$a,[e("div",Ca,s(t.$t("soft"))+"/"+s(t.$t("hard")),1),e("div",Sa,s(p(P)(p(N).formatUnits(a.launchpadItem.softCap,a.launchpadItem.currencyDecimals)))+" "+s(a.launchpadItem.currencySymbol)+" - "+s(p(P)(p(N).formatUnits(a.launchpadItem.hardCap,a.launchpadItem.currencyDecimals)))+" "+s(a.launchpadItem.currencySymbol),1)])):(n(),o("div",Aa,[e("div",Na,s(t.$t("soft")),1),e("div",za,s(p(P)(p(N).formatUnits(a.launchpadItem.softCap,a.launchpadItem.currencyDecimals)))+" "+s(a.launchpadItem.currencySymbol),1)]))]),e("div",La,[a.launchpadItem.status=="salelive"?(n(),o("div",Da,[e("div",null,s(t.$t("endsIn"))+":",1),e("div",Ba,s(m.value),1)])):a.launchpadItem.status=="upcoming"?(n(),o("div",Ta,[e("div",null,s(t.$t("startsIn"))+":",1),e("div",Va,s(m.value),1)])):a.launchpadItem.status=="ended"?(n(),o("div",Pa,[e("div",Ua,s(t.$t("saleEnded")),1)])):a.launchpadItem.status=="canceled"?(n(),o("div",Ma,[e("div",Fa,s(t.$t("saleCanceled")),1)])):f("",!0)])]),e("div",Oa,[e("div",Xa,s(t.$t("progress"))+"("+s(y.value)+"%)",1),v(aa,{cumulateAmount:p(N).formatUnits(a.launchpadItem.cumulateAmount,a.launchpadItem.currencyDecimals),topAmount:$.value,symbol:a.launchpadItem.currencySymbol},null,8,["cumulateAmount","topAmount","symbol"])]),e("div",qa,[e("div",xa,[U(s(t.$t("liquidity"))+" ",1),e("span",null,s(a.launchpadItem.liquidityPercentage)+"%",1)]),e("div",Ea,[a.launchpadItem.liquidityLockDays==0||a.launchpadItem.liquidityLockDays==""?(n(),o("text",Ha,s(t.$t("unlocked")),1)):(n(),o("text",Ya,[U(s(t.$t("locked"))+" ",1),e("span",null,s(a.launchpadItem.liquidityLockDays)+" "+s(t.$t("days")),1)]))])]),e("div",Ka,[e("div",ja,[U(s(t.$t("platform",{platform:V.value}))+" ",1),a.launchpadItem.platform=="pinksale"?(n(),I(F,{key:0,class:"token-icon",bigIcon:"/assets/imgs/pinkswap.png"})):f("",!0)]),e("div",{class:"view",type:"primary",onClick:r},s(t.$t("view")),1)])])]))}},Ja=O(Ga,[["__scopeId","data-v-a47ad2a4"]]),Ra=X("lp",{state:()=>({networks:[{name:"bsc",pinkName:"BSC",value:56,icon:"https://ave.s3.ap-east-1.amazonaws.com/chain/bsc.png"},{name:"eth",pinkName:"ETH",value:1,icon:"https://ave.s3.ap-east-1.amazonaws.com/chain/eth.png"},{name:"polygon",pinkName:"Matic",value:137,icon:"https://ave.s3.ap-east-1.amazonaws.com/chain/polygon.png"},{name:"avalanche",pinkName:"AVAX",value:43114,icon:"https://ave.s3.ap-east-1.amazonaws.com/chain/avalanche.png"},{name:"fantom",pinkName:"FTM",value:250,icon:"https://ave.s3.ap-east-1.amazonaws.com/chain/fantom.png"},{name:"cronos",pinkName:"Cronos",value:25,icon:"https://ave.s3.ap-east-1.amazonaws.com/chain/cronos.png"},{name:"dogechain",pinkName:"DogeChain",value:2e3,icon:"https://ave.s3.ap-east-1.amazonaws.com/chain/dogechain.png"},{name:"alveychain",pinkName:"Alvey",value:3797,icon:"https://ave.s3.ap-east-1.amazonaws.com/chain/alveychain.png"},{name:"arbitrum",pinkName:"Arbitrum",value:42161,icon:"https://ave.s3.ap-east-1.amazonaws.com/chain/arbitrum.png"},{name:"pulse",pinkName:"PulseChain",value:369,icon:"https://ave.s3.ap-east-1.amazonaws.com/chain/pulse.png"}],platforms:[{name:"allPlatforms",value:"all",icon:""},{name:"PinkSale",value:"pinksale",icon:"./assets/imgs/pinkswap.png"}],statusList:[{name:"allStatus",value:"all"},{name:"salelive",value:"salelive"},{name:"upcoming",value:"upcoming"},{name:"ended",value:"ended"},{name:"canceled",value:"canceled"}],checkedStatus:"all"}),actions:{}});const Qa={class:"launchpad"},Wa={class:"select"},Za={class:"item"},ae={class:"label"},ee={class:"option"},te={class:"item"},se={class:"label"},ne={class:"option option-platform"},le=["src"],oe={class:"item"},ce={class:"label"},ie={class:"launchpad-content"},ue={class:"list"},pe={class:"pagination"},de={__name:"Index",setup(_){const a=Ra(),d=L([]),m=L("all"),h=L("all"),c=j({page:1,pageSize:6,total:0,launchpadList:[],loading:!1});function B(){y()}function T(){y()}function $(){y()}function V(){y()}async function y(){c.loading=!0;let r;d.value.length>0&&(r=d.value.toString());let t="";m.value!=="all"&&(t=m.value);let u="";h.value!=="all"&&(u=h.value);try{let i=await Q.launchpad.getLaunchpadList(c.page,c.pageSize,r,t,u);if(console.log(i),i.data.status==0){c.launchpadList=[],c.total=i.data.data.total;for(let g of i.data.data.list)c.launchpadList.push(g)}}catch(i){console.log(i)}finally{c.loading=!1}}return G(()=>{y()}),(r,t)=>{const u=w("el-option"),i=w("el-select"),g=w("el-col"),C=w("el-row"),q=w("el-pagination"),x=J("loading");return n(),o("div",Qa,[e("div",Wa,[e("div",Za,[e("div",ae,s(r.$t("network")),1),v(i,{class:"select-chain","collapse-tags":"",modelValue:d.value,"onUpdate:modelValue":t[0]||(t[0]=l=>d.value=l),onChange:B,multiple:""},{default:k(()=>[(n(!0),o(S,null,A(p(a).networks,l=>(n(),I(u,{key:l.value,label:l.name.toUpperCase(),value:l.value},{default:k(()=>[e("div",ee,[v(F,{class:"token-icon",bigIcon:l.icon},null,8,["bigIcon"]),e("span",null,s(l.name.toUpperCase()),1)])]),_:2},1032,["label","value"]))),128))]),_:1},8,["modelValue"])]),e("div",te,[e("div",se,s(r.$t("platform1")),1),v(i,{class:"select-platform",modelValue:m.value,"onUpdate:modelValue":t[1]||(t[1]=l=>m.value=l),onChange:T},{default:k(()=>[(n(!0),o(S,null,A(p(a).platforms,l=>(n(),I(u,{key:l.value,label:r.$t(l.name),value:l.value},{default:k(()=>[e("div",ne,[l.icon?(n(),o("img",{key:0,class:"platform-icon",src:l.icon},null,8,le)):f("",!0),e("span",null,s(l.name),1)])]),_:2},1032,["label","value"]))),128))]),_:1},8,["modelValue"])]),e("div",oe,[e("div",ce,s(r.$t("status")),1),v(i,{class:"select-status",modelValue:h.value,"onUpdate:modelValue":t[2]||(t[2]=l=>h.value=l),onChange:$},{default:k(()=>[(n(!0),o(S,null,A(p(a).statusList,l=>(n(),I(u,{key:l.value,label:r.$t(l.name),value:l.value},null,8,["label","value"]))),128))]),_:1},8,["modelValue"])])]),e("div",ie,[R((n(),o("div",ue,[v(C,{gutter:20},{default:k(()=>[(n(!0),o(S,null,A(c.launchpadList,l=>(n(),I(g,{span:8},{default:k(()=>[v(Ja,{class:"item",launchpadItem:l},null,8,["launchpadItem"])]),_:2},1024))),256))]),_:1})])),[[x,c.loading]]),e("div",pe,[v(q,{background:"",layout:"prev, pager, next",total:c.total,onCurrentChange:V,"page-size":c.pageSize,"current-page":c.page,"onUpdate:currentPage":t[3]||(t[3]=l=>c.page=l)},null,8,["total","page-size","current-page"])])])])}}},ge=O(de,[["__scopeId","data-v-d87b6cef"]]);export{ge as default};
