import{_ as S}from"./noData-cd778682.js";import{T as B,C as V}from"./CopyText-6d95ee88.js";import{_ as j,j as Y,x as z,r as v,i as E,f as M,u as O,g as W,k as H,a as y,I as P,o as n,c as m,b as f,e as g,t as s,p as u,B as C,w as l,J as U,d as i,E as q,m as T,v as J,q as K,A as G,s as Q,K as X}from"./index-6217c161.js";import"./TokenIcon-6f670ab0.js";import"./TokenIcon.vuevuetypestyleindex0scopedc700f23blang-01358ba7.js";import"./DoubleToken-022adc77.js";const Z={class:"token-list"},x={key:0,class:"empty"},ee=["fit"],te={class:"info"},oe={key:1,class:"list"},ae={key:0},ne={key:1},se={key:2},re={key:3},le={class:"pagination"},ie={__name:"List",setup(ce){const r=Y(),$=z(),_=v(0),k=v(10),{t:I}=E();M();const h=O(),o=W({pageNumber:1,tokenList:[],loading:!1});async function N(){try{let a=await(await T.wallet.metamask.contractTokenFactory(r.create.tokenFactoryAddress)).totalOwnRecordsForUser(r.walletAddress);_.value=Number(a)}catch(e){console.error(e)}}async function w(){if(console.log("111"),!r.walletAddress){q({message:I("pleaseConnectWallet"),type:"error"}),o.loading=!1;return}o.loading=!0;let e=((o.pageNumber-1)*k.value).toString(),a=((o.pageNumber-1)*k.value+k.value-1).toString();try{if(await N(),_.value==0)throw"err";let c=await(await T.wallet.metamask.contractTokenFactory(r.create.tokenFactoryAddress)).getOwnRecords(r.walletAddress,e,a);console.log(c),o.tokenList=[];for(let d of c){let b={tokenAddress:d[6].toLowerCase(),createTime:Number(d[0]),symbol:d[4],name:d[3],deployerId:Number(d[5]),owner:d[2]};o.tokenList.push(b)}console.log(o.tokenList)}catch(p){console.log(p)}finally{o.loading=!1}}H(()=>r.isConnecting,e=>{e&&w()},{immediate:!0});function L(){w()}function A(){$.loginDialogVisible=!0}function D(){h.push("/token/create")}function F(e){h.push(`/token/manage/${e.deployerId}/${e.tokenAddress}`)}return(e,a)=>{const p=y("el-button"),c=y("el-table-column"),d=y("el-table"),b=y("el-pagination"),R=P("loading");return n(),m("div",Z,[!o.loading&&o.tokenList.length==0?(n(),m("div",x,[f("img",{style:{width:"80px"},src:S,fit:e.fit},null,8,ee),f("div",te,[g(s(e.$t("noToken"))+"，",1),f("span",{onClick:w,style:{color:"#409eff",cursor:"pointer"}},s(e.$t("refresh")),1)]),u(r).isConnecting?(n(),C(p,{key:0,type:"primary",class:"btn-gradient create",onClick:a[0]||(a[0]=t=>D())},{default:l(()=>[g(s(e.$t("tokenCreate")),1)]),_:1})):(n(),C(p,{key:1,type:"primary",class:"btn-gradient create",onClick:a[1]||(a[1]=t=>A())},{default:l(()=>[g(s(e.$t("connectWallet")),1)]),_:1}))])):(n(),m("div",oe,[U((n(),C(d,{class:"table-mine","header-row-class-name":e.table-e.head,data:o.tokenList},{default:l(()=>[i(c,{prop:"tokenName",label:e.$t("tokenName"),width:"150"},{default:l(t=>[i(B,{class:"token-name",symbol:t.row.symbol,name:t.row.name,bigIcon:u(J)(u(r).chain.toLowerCase(),t.row.tokenAddress.toLowerCase()),smallIcon:u(K)(u(r).chain.toLowerCase())},null,8,["symbol","name","bigIcon","smallIcon"])]),_:1},8,["label"]),i(c,{prop:"amount",label:e.$t("template"),width:"150"},{default:l(t=>[t.row.deployerId==0?(n(),m("span",ae,s(e.$t("freeTax")),1)):t.row.deployerId==1?(n(),m("span",ne,s(e.$t("feeToken")),1)):t.row.deployerId==2?(n(),m("span",se,s(e.$t("selfDividendToken")),1)):t.row.deployerId==3?(n(),m("span",re,s(e.$t("addPoolDividend")),1)):G("",!0)]),_:1},8,["label"]),i(c,{prop:"amount",label:e.$t("managerAddress")},{default:l(t=>[i(V,{text:t.row.owner,smallText:u(Q)(t.row.owner)},null,8,["text","smallText"])]),_:1},8,["label"]),i(c,{prop:"unlockDate",label:e.$t("createTime")},{default:l(t=>[g(s(u(X).unix(t.row.createTime).format("YYYY-MM-DD HH:mm:ss")),1)]),_:1},8,["label"]),i(c,{prop:"address",label:e.$t("operate"),width:"80"},{default:l(t=>[i(p,{key:"primary",type:"primary",onClick:de=>F(t.row),link:""},{default:l(()=>[g(s(e.$t("view")),1)]),_:2},1032,["onClick"])]),_:1},8,["label"])]),_:1},8,["header-row-class-name","data"])),[[R,o.loading]]),f("div",le,[i(b,{background:"",layout:"prev, pager, next",total:_.value,onCurrentChange:L,"page-size":k.value,"current-page":o.pageNumber,"onUpdate:currentPage":a[2]||(a[2]=t=>o.pageNumber=t)},null,8,["total","page-size","current-page"])])]))])}}},fe=j(ie,[["__scopeId","data-v-423a976a"]]);export{fe as default};