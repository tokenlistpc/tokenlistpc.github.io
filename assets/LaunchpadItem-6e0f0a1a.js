import{_ as B,v as I,B as v,e as U,o as n,c as o,l as u,A as _,f as e,t as s,a1 as L,j as F,U as M,a2 as O,y as m,h as $,P as b,z as A,I as q,J as X}from"./index-1a6d1bbc.js";import{e as y}from"./ethers-e9d4ae29.js";import{T as f}from"./TokenIcon-c35c83ff.js";import{f as C}from"./units-963d647b.js";const V={class:"progress-data"},j={__name:"ProgressPro",props:{cumulateAmount:{type:String,default:"0"},topAmount:{type:String,default:"0"},symbol:{type:String,default:""}},setup(d){const l=d,a=I(()=>v(l.cumulateAmount).lte(l.topAmount)?v(l.cumulateAmount).dividedBy(l.topAmount).multipliedBy(100).toString():v(l.topAmount).dividedBy(l.cumulateAmount).multipliedBy(100).toString());return(w,h)=>{const r=U("el-progress");return n(),o("div",null,[u(v)(l.cumulateAmount).lte(l.topAmount)?(n(),_(r,{key:0,color:"rgba(72, 199, 116, 0.5)","show-text":!1,"stroke-width":10,percentage:Number(a.value)},null,8,["percentage"])):(n(),_(r,{key:1,class:"progress-bg-pro","show-text":!1,color:"#52c41a","stroke-width":10,percentage:Number(a.value)},null,8,["percentage"])),e("div",V,[e("text",null,s(l.cumulateAmount)+" "+s(l.symbol),1),e("text",null,s(l.topAmount)+" "+s(l.symbol),1)])])}}},E=B(j,[["__scopeId","data-v-f7de8cc4"]]),H=L("lp",{state:()=>({networks:[{name:"BSC",pinkName:"BSC",value:56,icon:"https://ave.s3.ap-east-1.amazonaws.com/chain/bsc.png"},{name:"ETH",pinkName:"ETH",value:1,icon:"https://ave.s3.ap-east-1.amazonaws.com/chain/eth.png"},{name:"Polygon",pinkName:"Matic",value:137,icon:"https://ave.s3.ap-east-1.amazonaws.com/chain/polygon.png"},{name:"Avalanche",pinkName:"AVAX",value:43114,icon:"https://ave.s3.ap-east-1.amazonaws.com/chain/avalanche.png"},{name:"Fantom",pinkName:"FTM",value:250,icon:"https://ave.s3.ap-east-1.amazonaws.com/chain/fantom.png"},{name:"Cronos",pinkName:"Cronos",value:25,icon:"https://www.pinksale.finance/static/media/ic-cronos.5a2dbab3.svg"},{name:"DogeChain",pinkName:"DogeChain",value:2e3,icon:"https://ave.s3.ap-east-1.amazonaws.com/chain/dogechain.png"},{name:"AlveyChain",pinkName:"Alvey",value:3797,icon:"https://ave.s3.ap-east-1.amazonaws.com/chain/alveychain.png"},{name:"Arbitrum",pinkName:"Arbitrum",value:42161,icon:"https://ave.s3.ap-east-1.amazonaws.com/chain/arbitrum.png"},{name:"PulseChain",pinkName:"PulseChain",value:369,icon:"https://www.pinksale.finance/static/media/ic-pulsechain.5ff7a9ba.png"},{name:"Bitrock",pinkName:"bitrock",value:7171,icon:"https://www.avestorage.cloud/chain/bitrock.png"},{name:"Base",pinkName:"",value:8453,icon:"https://www.avestorage.cloud/chain/base.png"},{name:"Core",pinkName:"",value:1116,icon:"https://ave.s3.ap-east-1.amazonaws.com/chain/core.png"}],platforms:[{name:"allPlatforms",value:"all",icon:""},{name:"PinkSale",value:"pinksale",icon:"/images/pinkswap.png"},{name:"Uncx",value:"uncx",icon:"/images/uncx.png"},{name:"DX",value:"dx",icon:"/images/dx.jpg"}],statusList:[{name:"allStatus",value:"all"},{name:"salelive",value:"salelive"},{name:"upcoming",value:"upcoming"},{name:"ended",value:"ended"},{name:"canceled",value:"canceled"}],checkedStatus:"all"}),actions:{}});const k=d=>(q("data-v-83ff4ccd"),d=d(),X(),d),K={class:"launch-pad-item"},Y={key:0,class:"status sale-live"},J=k(()=>e("span",{class:"spot"},null,-1)),G={key:1,class:"status upcoming"},Q=k(()=>e("span",{class:"spot"},null,-1)),R={key:2,class:"status ended"},W=k(()=>e("span",{class:"spot"},null,-1)),Z={key:3,class:"status canceled"},aa=k(()=>e("span",{class:"spot"},null,-1)),ea={class:"top"},ta={class:"left"},sa={class:"right"},na={class:"tags"},oa={key:0,class:"tag kyc",plain:"",type:"primary"},la={key:1,class:"tag safu",plain:"",type:"primary"},ca={key:2,class:"tag audit",plain:"",type:"primary"},ia={key:3,class:"tag doxx",plain:"",type:"primary"},ua={class:"content"},da={class:"token-info"},pa={class:"token-name"},ma={class:"line1"},ra={class:"price"},ha={key:0},va={class:"small-title"},_a={class:"value"},ga={key:1},ya={class:"small-title"},fa={class:"value"},Ia={class:"sale-status"},ka={key:0},wa={class:"value"},ba={key:1},Aa={class:"value"},Ca={key:2},Sa={class:"value"},Na={key:3},$a={class:"value"},Ba={class:"progress"},Da={class:"small-title"},Pa={class:"line3"},Ta={class:"liquidity"},xa={class:"lastdays"},za={key:0},Ua={key:1},La={class:"bottom"},Fa={class:"platform"},Ma={__name:"LaunchpadItem",props:{launchpadItem:Object},emits:["view"],setup(d,{emit:l}){const a=d,w=H(),h=F("");let r=null;function p(t){return t<10?"0"+t.toString():t.toString()}function D(t){let c;t.status=="salelive"?c=t.endTime:t.status=="upcoming"&&(c=t.startTime),r=setInterval(function(){let i=parseInt(new Date().getTime()/1e3);if(i<c){let g=c-i;h.value=P(g)}else i>=c&&(clearInterval(r),h.value="00 : 00 : 00")},1e3)}function P(t){let c=Math.floor(t/86400),i=Math.floor(t/(60*60)%24),g=Math.floor(t/60%60),N=Math.floor(t%60);return c>0?p(c)+" : "+p(i)+" : "+p(g)+" : "+p(N):p(i)+" : "+p(g)+" : "+p(N)}M(()=>{D(a.launchpadItem)});const S=I(()=>a.launchpadItem.hardCap!==""&&a.launchpadItem.hardCap!=="0"?C(a.launchpadItem.hardCap,a.launchpadItem.currencyDecimals):C(a.launchpadItem.softCap,a.launchpadItem.currencyDecimals)),T=I(()=>{var t;return console.log(a.launchpadItem.platform),(t=w.platforms.find(c=>c.value==a.launchpadItem.platform))==null?void 0:t.name}),x=I(()=>v(C(a.launchpadItem.cumulateAmount,a.launchpadItem.currencyDecimals)).dividedBy(S.value).multipliedBy(100).toFixed(2));O(()=>{clearInterval(r)});function z(){l("view",a.launchpadItem)}return(t,c)=>(n(),o("div",K,[a.launchpadItem.status=="salelive"?(n(),o("div",Y,[J,e("span",null,s(t.$t(a.launchpadItem.status)),1)])):a.launchpadItem.status=="upcoming"?(n(),o("div",G,[Q,e("span",null,s(t.$t(a.launchpadItem.status)),1)])):a.launchpadItem.status=="ended"?(n(),o("div",R,[W,e("span",null,s(t.$t(a.launchpadItem.status)),1)])):a.launchpadItem.status=="canceled"?(n(),o("div",Z,[aa,e("span",null,s(t.$t(a.launchpadItem.status)),1)])):m("",!0),e("div",ea,[e("div",ta,[$(f,{class:"token-icon",bigIcon:a.launchpadItem.icon?a.launchpadItem.icon:"error",smallIcon:u(w).networks.find(i=>i.value==a.launchpadItem.chainId).icon},null,8,["bigIcon","smallIcon"])]),e("div",sa,[e("div",na,[a.launchpadItem.tags.indexOf("KYC")>-1?(n(),o("span",oa,"KYC")):m("",!0),a.launchpadItem.tags.indexOf("SAFU")>-1?(n(),o("span",la,"SAFU")):m("",!0),a.launchpadItem.tags.indexOf("Audit")>-1?(n(),o("span",ca,"Audit")):m("",!0),a.launchpadItem.tags.indexOf("DOXX")>-1?(n(),o("span",ia,"DOXX")):m("",!0)])])]),e("div",ua,[e("div",da,[e("div",pa,s(a.launchpadItem.tokenName),1)]),e("div",ma,[e("div",ra,[a.launchpadItem.hardCap!==""&&a.launchpadItem.hardCap!=="0"?(n(),o("div",ha,[e("div",va,s(t.$t("soft"))+"/"+s(t.$t("hard")),1),e("div",_a,s(u(b)(u(y).formatUnits(a.launchpadItem.softCap,a.launchpadItem.currencyDecimals)))+" "+s(a.launchpadItem.currencySymbol)+" - "+s(u(b)(u(y).formatUnits(a.launchpadItem.hardCap,a.launchpadItem.currencyDecimals)))+" "+s(a.launchpadItem.currencySymbol),1)])):(n(),o("div",ga,[e("div",ya,s(t.$t("soft")),1),e("div",fa,s(u(b)(u(y).formatUnits(a.launchpadItem.softCap,a.launchpadItem.currencyDecimals)))+" "+s(a.launchpadItem.currencySymbol),1)]))]),e("div",Ia,[a.launchpadItem.status=="salelive"?(n(),o("div",ka,[e("div",null,s(t.$t("endsIn"))+":",1),e("div",wa,s(h.value),1)])):a.launchpadItem.status=="upcoming"?(n(),o("div",ba,[e("div",null,s(t.$t("startsIn"))+":",1),e("div",Aa,s(h.value),1)])):a.launchpadItem.status=="ended"?(n(),o("div",Ca,[e("div",Sa,s(t.$t("saleEnded")),1)])):a.launchpadItem.status=="canceled"?(n(),o("div",Na,[e("div",$a,s(t.$t("saleCanceled")),1)])):m("",!0)])]),e("div",Ba,[e("div",Da,s(t.$t("progress"))+"("+s(x.value)+"%)",1),$(E,{cumulateAmount:u(y).formatUnits(a.launchpadItem.cumulateAmount,a.launchpadItem.currencyDecimals),topAmount:S.value,symbol:a.launchpadItem.currencySymbol},null,8,["cumulateAmount","topAmount","symbol"])]),e("div",Pa,[e("div",Ta,[A(s(t.$t("liquidity"))+" ",1),e("span",null,s(a.launchpadItem.liquidityPercentage)+"%",1)]),e("div",xa,[a.launchpadItem.liquidityLockDays==0||a.launchpadItem.liquidityLockDays==""?(n(),o("text",za,s(t.$t("unlocked")),1)):(n(),o("text",Ua,[A(s(t.$t("locked"))+" ",1),e("span",null,s(a.launchpadItem.liquidityLockDays)+" "+s(t.$t("days")),1)]))])]),e("div",La,[e("div",Fa,[A(s(t.$t("platform",{platform:T.value}))+" ",1),a.launchpadItem.platform=="pinksale"?(n(),_(f,{key:0,class:"token-icon",bigIcon:"/images/pinkswap.png"})):a.launchpadItem.platform=="uncx"?(n(),_(f,{key:1,class:"token-icon",bigIcon:"/images/uncx.png"})):a.launchpadItem.platform=="dx"?(n(),_(f,{key:2,class:"token-icon",bigIcon:"/images/dx.jpg"})):m("",!0)]),e("div",{class:"view",type:"primary",onClick:c[0]||(c[0]=i=>z())},s(t.$t("view")),1)])])]))}},ja=B(Ma,[["__scopeId","data-v-83ff4ccd"]]);export{ja as L};