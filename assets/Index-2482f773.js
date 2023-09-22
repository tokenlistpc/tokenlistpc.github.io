import{_ as ia}from"./noData-cd778682.js";import{_ as J,v as E,C as U,e as C,o as s,c as o,l as u,B as $,f as e,t as n,a0 as Z,j as V,U as aa,a1 as ca,z as f,h as d,m as ea,P as F,A as w,I as ua,J as da,r as R,a2 as G,K as ra,y as v,L as ma,b as pa,F as Y,g as j,M as Q}from"./index-a9c1d700.js";import{T as z}from"./TokenIcon-bbfef9ba.js";import{T as ha}from"./TokenName-316a539a.js";import{P as W}from"./Progress-33e80b44.js";import{e as g}from"./ethers-a6a3224b.js";import{f as K}from"./units-bc0e3134.js";/* empty css                                                          */import"./DoubleToken-c720afa1.js";import"./wallet-498c962c.js";const va={class:"progress-data"},_a={__name:"ProgressPro",props:{cumulateAmount:{type:String,default:"0"},topAmount:{type:String,default:"0"},symbol:{type:String,default:""}},setup(N){const p=N,t=E(()=>U(p.cumulateAmount).lte(p.topAmount)?U(p.cumulateAmount).dividedBy(p.topAmount).multipliedBy(100).toString():U(p.topAmount).dividedBy(p.cumulateAmount).multipliedBy(100).toString());return(S,b)=>{const k=C("el-progress");return s(),o("div",null,[u(U)(p.cumulateAmount).lte(p.topAmount)?(s(),$(k,{key:0,color:"rgba(72, 199, 116, 0.5)","show-text":!1,"stroke-width":10,percentage:Number(t.value)},null,8,["percentage"])):(s(),$(k,{key:1,class:"progress-bg-pro","show-text":!1,color:"#52c41a","stroke-width":10,percentage:Number(t.value)},null,8,["percentage"])),e("div",va,[e("text",null,n(p.cumulateAmount)+" "+n(p.symbol),1),e("text",null,n(p.topAmount)+" "+n(p.symbol),1)])])}}},ga=J(_a,[["__scopeId","data-v-f7de8cc4"]]),fa=Z("lp",{state:()=>({networks:[{name:"BSC",pinkName:"BSC",value:56,icon:"https://ave.s3.ap-east-1.amazonaws.com/chain/bsc.png"},{name:"ETH",pinkName:"ETH",value:1,icon:"https://ave.s3.ap-east-1.amazonaws.com/chain/eth.png"},{name:"Polygon",pinkName:"Matic",value:137,icon:"https://ave.s3.ap-east-1.amazonaws.com/chain/polygon.png"},{name:"Avalanche",pinkName:"AVAX",value:43114,icon:"https://ave.s3.ap-east-1.amazonaws.com/chain/avalanche.png"},{name:"Fantom",pinkName:"FTM",value:250,icon:"https://ave.s3.ap-east-1.amazonaws.com/chain/fantom.png"},{name:"Cronos",pinkName:"Cronos",value:25,icon:"https://www.pinksale.finance/static/media/ic-cronos.5a2dbab3.svg"},{name:"DogeChain",pinkName:"DogeChain",value:2e3,icon:"https://ave.s3.ap-east-1.amazonaws.com/chain/dogechain.png"},{name:"AlveyChain",pinkName:"Alvey",value:3797,icon:"https://ave.s3.ap-east-1.amazonaws.com/chain/alveychain.png"},{name:"Arbitrum",pinkName:"Arbitrum",value:42161,icon:"https://ave.s3.ap-east-1.amazonaws.com/chain/arbitrum.png"},{name:"PulseChain",pinkName:"PulseChain",value:369,icon:"https://www.pinksale.finance/static/media/ic-pulsechain.5ff7a9ba.png"},{name:"Bitrock",pinkName:"bitrock",value:7171,icon:"https://www.avestorage.cloud/chain/bitrock.png"},{name:"Base",pinkName:"",value:8453,icon:"https://www.avestorage.cloud/chain/base.png"},{name:"Core",pinkName:"",value:1116,icon:"https://ave.s3.ap-east-1.amazonaws.com/chain/core.png"}],platforms:[{name:"allPlatforms",value:"all",icon:""},{name:"PinkSale",value:"pinksale",icon:"/images/pinkswap.png"},{name:"Uncx",value:"uncx",icon:"/images/uncx.png"},{name:"DX",value:"dx",icon:"/images/dx.jpg"}],statusList:[{name:"allStatus",value:"all"},{name:"salelive",value:"salelive"},{name:"upcoming",value:"upcoming"},{name:"ended",value:"ended"},{name:"canceled",value:"canceled"}],checkedStatus:"all"}),actions:{}});const q=N=>(ua("data-v-cd57e856"),N=N(),da(),N),ya={class:"launch-pad-item"},ka={key:0,class:"status sale-live"},wa=q(()=>e("span",{class:"spot"},null,-1)),$a={key:1,class:"status upcoming"},ba=q(()=>e("span",{class:"spot"},null,-1)),Ia={key:2,class:"status ended"},Ca=q(()=>e("span",{class:"spot"},null,-1)),Aa={key:3,class:"status canceled"},Sa=q(()=>e("span",{class:"spot"},null,-1)),Na={class:"top"},Da={class:"left"},za={class:"right"},Ta={class:"tags"},Ua={key:0,class:"tag kyc",plain:"",type:"primary"},Ba={key:1,class:"tag safu",plain:"",type:"primary"},La={key:2,class:"tag audit",plain:"",type:"primary"},Pa={key:3,class:"tag doxx",plain:"",type:"primary"},Va={class:"content"},Fa={class:"token-info"},Ma={class:"token-name"},xa={class:"line1"},Oa={class:"price"},Xa={key:0},Ya={class:"small-title"},ja={class:"value"},Ea={key:1},qa={class:"small-title"},Ha={class:"value"},Ka={class:"sale-status"},Ja={key:0},Ra={class:"value"},Ga={key:1},Qa={class:"value"},Wa={key:2},Za={class:"value"},ae={key:3},ee={class:"value"},te={class:"progress"},ne={class:"small-title"},se={class:"line3"},le={class:"liquidity"},oe={class:"lastdays"},ie={key:0},ce={key:1},ue={class:"bottom"},de={class:"platform"},re={__name:"LaunchpadItem",props:{launchpadItem:Object},emits:["view"],setup(N,{emit:p}){const t=N,S=fa(),b=V("");let k=null;function h(i){return i<10?"0"+i.toString():i.toString()}function m(i){let _;i.status=="salelive"?_=i.endTime:i.status=="upcoming"&&(_=i.startTime),k=setInterval(function(){let I=parseInt(new Date().getTime()/1e3);if(I<_){let y=_-I;b.value=r(y)}else I>=_&&(clearInterval(k),b.value="00 : 00 : 00")},1e3)}function r(i){let _=Math.floor(i/86400),I=Math.floor(i/(60*60)%24),y=Math.floor(i/60%60),x=Math.floor(i%60);return _>0?h(_)+" : "+h(I)+" : "+h(y)+" : "+h(x):h(I)+" : "+h(y)+" : "+h(x)}aa(()=>{m(t.launchpadItem)});const M=E(()=>t.launchpadItem.hardCap!==""&&t.launchpadItem.hardCap!=="0"?K(t.launchpadItem.hardCap,t.launchpadItem.currencyDecimals):K(t.launchpadItem.softCap,t.launchpadItem.currencyDecimals)),O=E(()=>{var i;return console.log(t.launchpadItem.platform),(i=S.platforms.find(_=>_.value==t.launchpadItem.platform))==null?void 0:i.name}),B=E(()=>U(K(t.launchpadItem.cumulateAmount,t.launchpadItem.currencyDecimals)).dividedBy(M.value).multipliedBy(100).toFixed(2));ca(()=>{clearInterval(k)});function H(){p("view",t.launchpadItem)}return(i,_)=>(s(),o("div",ya,[t.launchpadItem.status=="salelive"?(s(),o("div",ka,[wa,e("span",null,n(i.$t(t.launchpadItem.status)),1)])):t.launchpadItem.status=="upcoming"?(s(),o("div",$a,[ba,e("span",null,n(i.$t(t.launchpadItem.status)),1)])):t.launchpadItem.status=="ended"?(s(),o("div",Ia,[Ca,e("span",null,n(i.$t(t.launchpadItem.status)),1)])):t.launchpadItem.status=="canceled"?(s(),o("div",Aa,[Sa,e("span",null,n(i.$t(t.launchpadItem.status)),1)])):f("",!0),e("div",Na,[e("div",Da,[d(z,{class:"token-icon",bigIcon:t.launchpadItem.icon?t.launchpadItem.icon:"error",smallIcon:u(ea)(u(S).networks.find(I=>I.value==t.launchpadItem.chainId).name)},null,8,["bigIcon","smallIcon"])]),e("div",za,[e("div",Ta,[t.launchpadItem.tags.indexOf("KYC")>-1?(s(),o("span",Ua,"KYC")):f("",!0),t.launchpadItem.tags.indexOf("SAFU")>-1?(s(),o("span",Ba,"SAFU")):f("",!0),t.launchpadItem.tags.indexOf("Audit")>-1?(s(),o("span",La,"Audit")):f("",!0),t.launchpadItem.tags.indexOf("DOXX")>-1?(s(),o("span",Pa,"DOXX")):f("",!0)])])]),e("div",Va,[e("div",Fa,[e("div",Ma,n(t.launchpadItem.tokenName),1)]),e("div",xa,[e("div",Oa,[t.launchpadItem.hardCap!==""&&t.launchpadItem.hardCap!=="0"?(s(),o("div",Xa,[e("div",Ya,n(i.$t("soft"))+"/"+n(i.$t("hard")),1),e("div",ja,n(u(F)(u(g).formatUnits(t.launchpadItem.softCap,t.launchpadItem.currencyDecimals)))+" "+n(t.launchpadItem.currencySymbol)+" - "+n(u(F)(u(g).formatUnits(t.launchpadItem.hardCap,t.launchpadItem.currencyDecimals)))+" "+n(t.launchpadItem.currencySymbol),1)])):(s(),o("div",Ea,[e("div",qa,n(i.$t("soft")),1),e("div",Ha,n(u(F)(u(g).formatUnits(t.launchpadItem.softCap,t.launchpadItem.currencyDecimals)))+" "+n(t.launchpadItem.currencySymbol),1)]))]),e("div",Ka,[t.launchpadItem.status=="salelive"?(s(),o("div",Ja,[e("div",null,n(i.$t("endsIn"))+":",1),e("div",Ra,n(b.value),1)])):t.launchpadItem.status=="upcoming"?(s(),o("div",Ga,[e("div",null,n(i.$t("startsIn"))+":",1),e("div",Qa,n(b.value),1)])):t.launchpadItem.status=="ended"?(s(),o("div",Wa,[e("div",Za,n(i.$t("saleEnded")),1)])):t.launchpadItem.status=="canceled"?(s(),o("div",ae,[e("div",ee,n(i.$t("saleCanceled")),1)])):f("",!0)])]),e("div",te,[e("div",ne,n(i.$t("progress"))+"("+n(B.value)+"%)",1),d(ga,{cumulateAmount:u(g).formatUnits(t.launchpadItem.cumulateAmount,t.launchpadItem.currencyDecimals),topAmount:M.value,symbol:t.launchpadItem.currencySymbol},null,8,["cumulateAmount","topAmount","symbol"])]),e("div",se,[e("div",le,[w(n(i.$t("liquidity"))+" ",1),e("span",null,n(t.launchpadItem.liquidityPercentage)+"%",1)]),e("div",oe,[t.launchpadItem.liquidityLockDays==0||t.launchpadItem.liquidityLockDays==""?(s(),o("text",ie,n(i.$t("unlocked")),1)):(s(),o("text",ce,[w(n(i.$t("locked"))+" ",1),e("span",null,n(t.launchpadItem.liquidityLockDays)+" "+n(i.$t("days")),1)]))])]),e("div",ue,[e("div",de,[w(n(i.$t("platform",{platform:O.value}))+" ",1),t.launchpadItem.platform=="pinksale"?(s(),$(z,{key:0,class:"token-icon",bigIcon:"/images/pinkswap.png"})):t.launchpadItem.platform=="uncx"?(s(),$(z,{key:1,class:"token-icon",bigIcon:"/images/uncx.png"})):t.launchpadItem.platform=="dx"?(s(),$(z,{key:2,class:"token-icon",bigIcon:"/images/dx.jpg"})):f("",!0)]),e("div",{class:"view",type:"primary",onClick:_[0]||(_[0]=I=>H())},n(i.$t("view")),1)])])]))}},me=J(re,[["__scopeId","data-v-cd57e856"]]),pe=Z("lp",{state:()=>({networks:[{name:"BSC",pinkName:"BSC",value:56,icon:"https://ave.s3.ap-east-1.amazonaws.com/chain/bsc.png"},{name:"ETH",pinkName:"ETH",value:1,icon:"https://ave.s3.ap-east-1.amazonaws.com/chain/eth.png"},{name:"Polygon",pinkName:"Matic",value:137,icon:"https://ave.s3.ap-east-1.amazonaws.com/chain/polygon.png"},{name:"Avalanche",pinkName:"AVAX",value:43114,icon:"https://ave.s3.ap-east-1.amazonaws.com/chain/avalanche.png"},{name:"Fantom",pinkName:"FTM",value:250,icon:"https://ave.s3.ap-east-1.amazonaws.com/chain/fantom.png"},{name:"Cronos",pinkName:"Cronos",value:25,icon:"https://www.pinksale.finance/static/media/ic-cronos.5a2dbab3.svg"},{name:"DogeChain",pinkName:"DogeChain",value:2e3,icon:"https://ave.s3.ap-east-1.amazonaws.com/chain/dogechain.png"},{name:"AlveyChain",pinkName:"Alvey",value:3797,icon:"https://ave.s3.ap-east-1.amazonaws.com/chain/alveychain.png"},{name:"Arbitrum",pinkName:"Arbitrum",value:42161,icon:"https://ave.s3.ap-east-1.amazonaws.com/chain/arbitrum.png"},{name:"PulseChain",pinkName:"PulseChain",value:369,icon:"https://www.pinksale.finance/static/media/ic-pulsechain.5ff7a9ba.png"},{name:"Bitrock",pinkName:"bitrock",value:7171,icon:"https://www.avestorage.cloud/chain/bitrock.png"},{name:"Base",pinkName:"",value:8453,icon:"https://www.avestorage.cloud/chain/base.png"},{name:"Core",pinkName:"",value:1116,icon:"https://ave.s3.ap-east-1.amazonaws.com/chain/core.png"}],platforms:[{name:"allPlatforms",value:"all",icon:""},{name:"PinkSale",value:"pinksale",icon:"/images/pinkswap.png"},{name:"Uncx",value:"uncx",icon:"/images/uncx.png"},{name:"DX",value:"dx",icon:"/images/dx.jpg"}],statusList:[{name:"allStatus",value:"all"},{name:"salelive",value:"salelive"},{name:"upcoming",value:"upcoming"},{name:"ended",value:"ended"},{name:"canceled",value:"canceled"}],checkedStatus:"all"}),actions:{}});const he={class:"launchpad"},ve={class:"top-operate"},_e={class:"form-input"},ge={class:"search"},fe={class:"item"},ye={class:"select"},ke={class:"item"},we={class:"label"},$e={class:"option"},be={class:"item"},Ie={class:"label"},Ce={class:"option option-platform"},Ae=["src"],Se={class:"item"},Ne={class:"label"},De={class:"form-btn"},ze={class:"sort"},Te={class:"arrow"},Ue={class:"arrow"},Be={class:"arrow"},Le={class:"launchpad-content"},Pe={key:0,class:"empty"},Ve=["fit"],Fe={class:"info"},Me={key:1,class:"list"},xe={key:0},Oe={key:1},Xe={key:0,class:"status sale-live"},Ye={key:1,class:"status upcoming"},je={key:2,class:"status ended"},Ee={key:3,class:"status canceled"},qe={class:"tags"},He={key:0,class:"tag kyc",plain:"",type:"primary"},Ke={key:1,class:"tag safu",plain:"",type:"primary"},Je={key:2,class:"tag audit",plain:"",type:"primary"},Re={key:3,class:"tag doxx",plain:"",type:"primary"},Ge={key:0},Qe={class:"value"},We={key:1},Ze={class:"value"},at={key:0},et={key:1},tt={class:"launch-platform"},nt={class:"pagination"},st={__name:"Index",setup(N){const p=pe(),t=V(""),S=V([]),b=V("all"),k=V("all"),h=V(""),m=R({type:"",isAsc:!1}),r=R({page:1,pageSize:30,total:0,launchpadList:[],loading:!1});h.value=G.get("launchpadShowType","block");function M(){h.value=="block"?r.pageSize=30:h.value=="list"&&(r.pageSize=50)}M();function O(l){l!=h.value&&(h.value=l,M(),G.set("launchpadShowType",l),y())}function B(l){if(l==m.type)if(l)m.isAsc=!m.isAsc;else return;else m.type=l,m.isAsc=!1;y()}function H(){y()}function i(){t.value="",S.value=[],b.value="all",k.value="all",y()}function _(){y()}function I(){y()}async function y(){r.loading=!0;let l="";t.value&&(l=t.value);let c="";S.value.length>0&&(c=S.value.toString());let L="";b.value!=="all"&&(L=b.value);let P="";k.value!=="all"&&(P=k.value);try{let A=await pa.launchpad.getLaunchpadList(r.page,r.pageSize,l,c,L,P,m);if(console.log(A),A.data.status==0){r.launchpadList=[],r.total=A.data.data.total;for(let X of A.data.data.list)r.launchpadList.push(X)}}catch(A){console.log(A)}finally{r.loading=!1}}aa(()=>{y()});function x(l){if(l.detailUrl)window.open(l.detailUrl);else if(l.platform=="pinksale")window.open("https://www.pinksale.finance/launchpad/"+l.address+"?chain="+p.networks.find(c=>c.value==l.chainId).pinkName);else if(l.platform=="uncx"){let c;l.chain=="eth"?c="uni-v2":l.chain=="bsc"&&(c="pancake-v2");let L="https://app.uncx.network/amm/"+c+"/ilo/"+l.address;window.open(L)}}return(l,c)=>{const L=C("el-input"),P=C("el-option"),A=C("el-select"),X=C("el-button"),D=C("svg-icon"),ta=C("el-col"),na=C("el-row"),T=C("el-table-column"),sa=C("el-table"),la=C("el-pagination"),oa=ra("loading");return s(),o("div",he,[e("div",ve,[e("div",_e,[e("div",ge,[e("div",fe,[d(L,{clearable:"",modelValue:t.value,"onUpdate:modelValue":c[0]||(c[0]=a=>t.value=a),placeholder:l.$t("enterTokenName")},null,8,["modelValue","placeholder"])])]),e("div",ye,[e("div",ke,[e("div",we,n(l.$t("network")),1),d(A,{class:"select-chain","collapse-tags":"",modelValue:S.value,"onUpdate:modelValue":c[1]||(c[1]=a=>S.value=a),placeholder:l.$t("selectNetwork"),multiple:""},{default:v(()=>[(s(!0),o(Y,null,j(u(p).networks,a=>(s(),$(P,{key:a.value,label:a.name,value:a.value},{default:v(()=>[e("div",$e,[d(z,{class:"token-icon",bigIcon:a.icon},null,8,["bigIcon"]),e("span",null,n(a.name),1)])]),_:2},1032,["label","value"]))),128))]),_:1},8,["modelValue","placeholder"])]),e("div",be,[e("div",Ie,n(l.$t("platform1")),1),d(A,{class:"select-platform",modelValue:b.value,"onUpdate:modelValue":c[2]||(c[2]=a=>b.value=a)},{default:v(()=>[(s(!0),o(Y,null,j(u(p).platforms,a=>(s(),$(P,{key:a.value,label:l.$t(a.name),value:a.value},{default:v(()=>[e("div",Ce,[a.icon?(s(),o("img",{key:0,class:"platform-icon",src:a.icon},null,8,Ae)):f("",!0),e("span",null,n(l.$t(a.name)),1)])]),_:2},1032,["label","value"]))),128))]),_:1},8,["modelValue"])]),e("div",Se,[e("div",Ne,n(l.$t("status")),1),d(A,{class:"select-status",modelValue:k.value,"onUpdate:modelValue":c[3]||(c[3]=a=>k.value=a)},{default:v(()=>[(s(!0),o(Y,null,j(u(p).statusList,a=>(s(),$(P,{key:a.value,label:l.$t(a.name),value:a.value},null,8,["label","value"]))),128))]),_:1},8,["modelValue"])])])]),e("div",De,[d(X,{type:"primary",class:"btn",onClick:c[4]||(c[4]=a=>H())},{default:v(()=>[w(n(l.$t("search1")),1)]),_:1}),d(X,{class:"btn",onClick:c[5]||(c[5]=a=>i())},{default:v(()=>[w(n(l.$t("reset")),1)]),_:1}),d(D,{name:h.value=="block"?"blockSelect":"block",class:"icon",onClick:c[6]||(c[6]=a=>O("block"))},null,8,["name"]),d(D,{name:h.value=="list"?"listSelect":"list",class:"icon",onClick:c[7]||(c[7]=a=>O("list"))},null,8,["name"])])]),e("div",ze,[e("div",{class:"item",onClick:c[8]||(c[8]=a=>B(""))},n(l.$t("defaultSort")),1),e("div",{class:"item",onClick:c[9]||(c[9]=a=>B("tagNum"))},[w(n(l.$t("kycTags"))+" ",1),e("div",Te,[d(D,{name:m.type=="tagNum"&&m.isAsc?"topSelect":"top",class:"icon"},null,8,["name"]),d(D,{name:m.type=="tagNum"&&!m.isAsc?"downSelect":"down",class:"icon"},null,8,["name"])])]),e("div",{class:"item",onClick:c[10]||(c[10]=a=>B("softcap"))},[w(n(l.$t("softCap"))+" ",1),e("div",Ue,[d(D,{name:m.type=="softcap"&&m.isAsc?"topSelect":"top",class:"icon"},null,8,["name"]),d(D,{name:m.type=="softcap"&&!m.isAsc?"downSelect":"down",class:"icon"},null,8,["name"])])]),e("div",{class:"item",onClick:c[11]||(c[11]=a=>B("startTime"))},[w(n(l.$t("startTime"))+" ",1),e("div",Be,[d(D,{name:m.type=="startTime"&&m.isAsc?"topSelect":"top",class:"icon"},null,8,["name"]),d(D,{name:m.type=="startTime"&&!m.isAsc?"downSelect":"down",class:"icon"},null,8,["name"])])])]),e("div",Le,[!r.loading&&r.launchpadList.length==0?(s(),o("div",Pe,[e("img",{style:{width:"80px"},src:ia,fit:l.fit},null,8,Ve),e("div",Fe,[w(n(l.$t("noLaunchpad"))+"，",1),e("span",{onClick:y,style:{color:"#409eff",cursor:"pointer"}},n(l.$t("refresh")),1)])])):ma((s(),o("div",Me,[h.value=="block"?(s(),o("div",xe,[d(na,{gutter:15},{default:v(()=>[(s(!0),o(Y,null,j(r.launchpadList,a=>(s(),$(ta,{lg:8,span:12,class:"item",key:a.address},{default:v(()=>[d(me,{launchpadItem:a,onView:x},null,8,["launchpadItem"])]),_:2},1024))),128))]),_:1})])):h.value=="list"?(s(),o("div",Oe,[d(sa,{class:"table-list",data:r.launchpadList,onRowClick:x},{default:v(()=>[d(T,{label:l.$t("projectToken"),width:"175"},{default:v(a=>[d(ha,{class:"token-name",symbol:a.row.tokenName,name:a.row.tokenSymbol,bigIcon:a.row.icon?a.row.icon:"error",smallIcon:u(ea)(a.row.chain.toLowerCase())},null,8,["symbol","name","bigIcon","smallIcon"])]),_:1},8,["label"]),d(T,{label:l.$t("status"),width:"94"},{default:v(a=>[a.row.status=="salelive"?(s(),o("div",Xe,[e("span",null,n(l.$t(a.row.status)),1)])):a.row.status=="upcoming"?(s(),o("div",Ye,[e("span",null,n(l.$t(a.row.status)),1)])):a.row.status=="ended"?(s(),o("div",je,[e("span",null,n(l.$t(a.row.status)),1)])):a.row.status=="canceled"?(s(),o("div",Ee,[e("span",null,n(l.$t(a.row.status)),1)])):f("",!0)]),_:1},8,["label"]),d(T,{label:l.$t("kycTag"),width:"203"},{default:v(a=>[e("div",qe,[a.row.tags.indexOf("KYC")>-1?(s(),o("span",He,"KYC")):f("",!0),a.row.tags.indexOf("SAFU")>-1?(s(),o("span",Ke,"SAFU")):f("",!0),a.row.tags.indexOf("Audit")>-1?(s(),o("span",Je,"Audit")):f("",!0),a.row.tags.indexOf("DOXX")>-1?(s(),o("span",Re,"DOXX")):f("",!0)])]),_:1},8,["label"]),d(T,{label:l.$t("softHard")},{default:v(a=>[a.row.hardCap!==""&&a.row.hardCap!=="0"?(s(),o("div",Ge,[e("div",Qe,n(u(F)(u(g).formatUnits(a.row.softCap,a.row.currencyDecimals)))+" - "+n(u(F)(u(g).formatUnits(a.row.hardCap,a.row.currencyDecimals)))+" "+n(a.row.currencySymbol),1)])):(s(),o("div",We,[e("div",Ze,n(u(F)(u(g).formatUnits(a.row.softCap,a.row.currencyDecimals)))+" "+n(a.row.currencySymbol),1)]))]),_:1},8,["label"]),d(T,{label:l.$t("progress1"),width:"90"},{default:v(a=>[a.row.hardCap!==""&&a.row.hardCap!=="0"?(s(),o("div",at,[w(n(u(U)(u(g).formatUnits(a.row.cumulateAmount,a.row.currencyDecimals)).dividedBy(u(g).formatUnits(a.row.hardCap,a.row.currencyDecimals)).multipliedBy(100).toFixed(2))+"% ",1),d(W,{cumulateAmount:u(g).formatUnits(a.row.cumulateAmount,a.row.currencyDecimals),topAmount:u(g).formatUnits(a.row.hardCap,a.row.currencyDecimals)},null,8,["cumulateAmount","topAmount"])])):(s(),o("div",et,[w(n(u(U)(u(g).formatUnits(a.row.cumulateAmount,a.row.currencyDecimals)).dividedBy(u(g).formatUnits(a.row.softCap,a.row.currencyDecimals)).multipliedBy(100).toFixed(2))+"% ",1),d(W,{cumulateAmount:u(g).formatUnits(a.row.cumulateAmount,a.row.currencyDecimals),topAmount:u(g).formatUnits(a.row.softCap,a.row.currencyDecimals)},null,8,["cumulateAmount","topAmount"])]))]),_:1},8,["label"]),d(T,{label:l.$t("platform2"),width:"88"},{default:v(a=>[e("div",tt,[a.row.platform=="pinksale"?(s(),$(z,{key:0,class:"token-icon",bigIcon:"/images/pinkswap.png"})):a.row.platform=="uncx"?(s(),$(z,{key:1,class:"token-icon",bigIcon:"/images/uncx.png"})):a.row.platform=="dx"?(s(),$(z,{key:2,class:"token-icon",bigIcon:"/images/dx.jpg"})):f("",!0)])]),_:1},8,["label"]),d(T,{label:l.$t("startEnd")},{default:v(a=>[w(n(u(Q).unix(a.row.startTime).format("YYYY.MM.DD"))+"-"+n(u(Q).unix(a.row.endTime).format("YYYY.MM.DD")),1)]),_:1},8,["label"])]),_:1},8,["data"])])):f("",!0)])),[[oa,r.loading]]),e("div",nt,[d(la,{background:"",layout:"sizes,prev, pager, next",total:r.total,onSizeChange:I,onCurrentChange:_,"page-size":r.pageSize,"onUpdate:pageSize":c[12]||(c[12]=a=>r.pageSize=a),"page-sizes":[10,20,30,50,100],"current-page":r.page,"onUpdate:currentPage":c[13]||(c[13]=a=>r.page=a)},null,8,["total","page-size","current-page"])])])])}}},vt=J(st,[["__scopeId","data-v-93ad978e"]]);export{vt as default};
