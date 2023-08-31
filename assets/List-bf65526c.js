import{_ as V}from"./noData-cd778682.js";import{T as z,C as v}from"./CopyText-71a9db4f.js";import{_ as Y,i as j,s as E,r as T,h as H,a as M,u as O,b as W,w as x,d as y,H as P,o as a,c as m,e as f,A as k,t as n,l as u,B as h,y as i,I as U,g as s,E as q,k as $,q as J,m as G,z as K,p as I,J as Q}from"./index-0f0f7870.js";import"./TokenIcon-619bae70.js";/* empty css                                                          */import"./DoubleToken-7d98970f.js";const X={class:"token-list"},Z={key:0,class:"empty"},ee=["fit"],te={class:"info"},oe={key:1,class:"list"},ae={key:0},ne={key:1},se={key:2},re={key:3},le={key:4},ie={class:"pagination"},de={__name:"List",setup(ce){const r=j(),N=E(),_=T(0),g=T(10),{t:A}=H();M();const C=O(),o=W({pageNumber:1,tokenList:[],loading:!1});async function L(){try{let l=await(await $.wallet.metamask.contractTokenFactory(r.create.tokenFactoryAddress)).totalOwnRecordsForUser(r.walletAddress);_.value=Number(l)}catch(e){console.error(e)}}async function w(){if(console.log("111"),!r.walletAddress){q.error(A("pleaseConnectWallet")),o.loading=!1;return}o.loading=!0;let e=((o.pageNumber-1)*g.value).toString(),l=((o.pageNumber-1)*g.value+g.value-1).toString();try{if(await L(),_.value==0)throw"err";let d=await(await $.wallet.metamask.contractTokenFactory(r.create.tokenFactoryAddress)).getOwnRecords(r.walletAddress,e,l);console.log(d),o.tokenList=[];for(let c of d){let b={tokenAddress:c[6].toLowerCase(),createTime:Number(c[0]),symbol:c[4],name:c[3],chain:r.chain,deployerId:Number(c[5]),owner:c[2]};o.tokenList.push(b)}console.log(o.tokenList)}catch(p){console.log(p)}finally{o.loading=!1}}x(()=>r.isConnecting,e=>{e&&(console.log(222),w())},{immediate:!0});function D(){w()}function F(){N.loginDialogVisible=!0}function R(){C.push("/token/create")}function S(e){C.push(`/token/manage/${e.deployerId}/${e.chain}/${e.tokenAddress}`)}return(e,l)=>{const p=y("el-button"),d=y("el-table-column"),c=y("el-table"),b=y("el-pagination"),B=P("loading");return a(),m("div",X,[!o.loading&&o.tokenList.length==0?(a(),m("div",Z,[f("img",{style:{width:"80px"},src:V,fit:e.fit},null,8,ee),f("div",te,[k(n(e.$t("noToken"))+"，",1),f("span",{onClick:w,style:{color:"#409eff",cursor:"pointer"}},n(e.$t("refresh")),1)]),u(r).isConnecting?(a(),h(p,{key:0,type:"primary",class:"btn-gradient create",onClick:l[0]||(l[0]=t=>R())},{default:i(()=>[k(n(e.$t("tokenCreate")),1)]),_:1})):(a(),h(p,{key:1,type:"primary",class:"btn-gradient create",onClick:l[1]||(l[1]=t=>F())},{default:i(()=>[k(n(e.$t("connectWallet")),1)]),_:1}))])):(a(),m("div",oe,[U((a(),h(c,{class:"table-mine",data:o.tokenList},{default:i(()=>[s(d,{prop:"tokenName",label:e.$t("tokenName"),width:"150"},{default:i(t=>[s(z,{class:"token-name",symbol:t.row.symbol,name:t.row.name,bigIcon:u(J)(u(r).chain.toLowerCase(),t.row.tokenAddress.toLowerCase()),smallIcon:u(G)(u(r).chain.toLowerCase())},null,8,["symbol","name","bigIcon","smallIcon"])]),_:1},8,["label"]),s(d,{prop:"amount",label:e.$t("template"),width:"150"},{default:i(t=>[t.row.deployerId==0?(a(),m("span",ae,n(e.$t("freeTax")),1)):t.row.deployerId==1?(a(),m("span",ne,n(e.$t("feeToken")),1)):t.row.deployerId==2?(a(),m("span",se,n(e.$t("selfDividendToken")),1)):t.row.deployerId==3?(a(),m("span",re,n(e.$t("addPoolDividend")),1)):t.row.deployerId==4?(a(),m("span",le,n(e.$t("dividendToken")),1)):K("",!0)]),_:1},8,["label"]),s(d,{prop:"amount",label:e.$t("managerAddress")},{default:i(t=>[s(v,{text:t.row.owner,smallText:u(I)(t.row.owner)},null,8,["text","smallText"])]),_:1},8,["label"]),s(d,{prop:"amount",label:e.$t("tokenAddress")},{default:i(t=>[s(v,{text:t.row.tokenAddress,smallText:u(I)(t.row.tokenAddress)},null,8,["text","smallText"])]),_:1},8,["label"]),s(d,{prop:"unlockDate",label:e.$t("createTime")},{default:i(t=>[k(n(u(Q).unix(t.row.createTime).format("YYYY-MM-DD HH:mm:ss")),1)]),_:1},8,["label"]),s(d,{prop:"address",label:e.$t("operate"),width:"90"},{default:i(t=>[s(p,{key:"primary",type:"primary",onClick:me=>S(t.row),link:""},{default:i(()=>[k(n(e.$t("view")),1)]),_:2},1032,["onClick"])]),_:1},8,["label"])]),_:1},8,["data"])),[[B,o.loading]]),f("div",ie,[s(b,{background:"",layout:"prev, pager, next",total:_.value,onCurrentChange:D,"page-size":g.value,"current-page":o.pageNumber,"onUpdate:currentPage":l[2]||(l[2]=t=>o.pageNumber=t)},null,8,["total","page-size","current-page"])])]))])}}},_e=Y(de,[["__scopeId","data-v-9640e0f7"]]);export{_e as default};