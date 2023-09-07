import{_ as B}from"./noData-cd778682.js";import{T as j,C as T}from"./CopyText-db78f1e1.js";import{_ as z,u as M,s as Y,j as $,i as E,d as O,a as W,r as x,w as H,e as g,K as P,o as n,c as m,f as w,A as y,t as s,l as u,B as h,y as i,L as U,h as l,E as q,b as _,q as K,m as G,z as J,p as I,M as Q}from"./index-dc6c10c8.js";import"./TokenIcon-57dc7d68.js";/* empty css                                                          */import"./DoubleToken-38ca7978.js";const X={class:"token-list"},Z={key:0,class:"empty"},ee=["fit"],te={class:"info"},oe={key:1,class:"list"},ae={key:0},ne={key:1},se={key:2},le={key:3},re={key:4},ie={class:"pagination"},de={__name:"List",setup(ce){const o=M(),A=Y(),k=$(0),f=$(10),{t:L}=E();O();const C=W(),a=x({pageNumber:1,tokenList:[],loading:!1});async function N(){try{let e;o.create.v2?e=await _.wallet.metamask.contractTokenFactoryV2(o.create.tokenFactoryV2Address):e=await _.wallet.metamask.contractTokenFactory(o.create.tokenFactoryAddress);let r=await e.totalOwnRecordsForUser(o.walletAddress);k.value=Number(r)}catch(e){console.error(e)}}async function b(){if(!o.walletAddress){q.error(L("pleaseConnectWallet")),a.loading=!1;return}a.loading=!0;try{if(await N(),k.value==0)throw"noRecords";let e=k.value-((a.pageNumber-1)*f.value+f.value),r=k.value-(a.pageNumber-1)*f.value-1;e<0&&(e=0);let p;o.create.v2?p=await _.wallet.metamask.contractTokenFactoryV2(o.create.tokenFactoryV2Address):p=await _.wallet.metamask.contractTokenFactory(o.create.tokenFactoryAddress);let d=await p.getOwnRecords(o.walletAddress,e.toString(),r.toString());console.log(d),a.tokenList=[];for(let c of d){let v={tokenAddress:c[6].toLowerCase(),createTime:Number(c[0]),symbol:c[4],name:c[3],chain:o.chain,deployerId:Number(c[5]),owner:c[2]};a.tokenList.unshift(v)}console.log(a.tokenList)}catch(e){console.log(e)}finally{a.loading=!1}}H(()=>o.isConnecting,e=>{e&&(console.log(222),b())},{immediate:!0});function F(){b()}function D(){A.loginDialogVisible=!0}function V(){C.push("/token/create")}function R(e){C.push(`/token/manage/${e.deployerId}/${e.chain}/${e.tokenAddress}`)}return(e,r)=>{const p=g("el-button"),d=g("el-table-column"),c=g("el-table"),v=g("el-pagination"),S=P("loading");return n(),m("div",X,[!a.loading&&a.tokenList.length==0?(n(),m("div",Z,[w("img",{style:{width:"80px"},src:B,fit:e.fit},null,8,ee),w("div",te,[y(s(e.$t("noToken"))+"，",1),w("span",{onClick:b,style:{color:"#409eff",cursor:"pointer"}},s(e.$t("refresh")),1)]),u(o).isConnecting?(n(),h(p,{key:0,type:"primary",class:"btn-gradient create",onClick:r[0]||(r[0]=t=>V())},{default:i(()=>[y(s(e.$t("tokenCreate")),1)]),_:1})):(n(),h(p,{key:1,type:"primary",class:"btn-gradient create",onClick:r[1]||(r[1]=t=>D())},{default:i(()=>[y(s(e.$t("connectWallet")),1)]),_:1}))])):(n(),m("div",oe,[U((n(),h(c,{class:"table-mine",data:a.tokenList},{default:i(()=>[l(d,{label:e.$t("tokenName"),width:"150"},{default:i(t=>[l(j,{class:"token-name",symbol:t.row.symbol,name:t.row.name,bigIcon:u(K)(u(o).chain.toLowerCase(),t.row.tokenAddress.toLowerCase()),smallIcon:u(G)(u(o).chain.toLowerCase())},null,8,["symbol","name","bigIcon","smallIcon"])]),_:1},8,["label"]),l(d,{label:e.$t("template"),width:"150"},{default:i(t=>[t.row.deployerId==0||t.row.deployerId==5?(n(),m("span",ae,s(e.$t("freeTax")),1)):t.row.deployerId==1||t.row.deployerId==6?(n(),m("span",ne,s(e.$t("feeToken")),1)):t.row.deployerId==2||t.row.deployerId==7?(n(),m("span",se,s(e.$t("selfDividendToken")),1)):t.row.deployerId==3||t.row.deployerId==8?(n(),m("span",le,s(e.$t("addPoolDividend")),1)):t.row.deployerId==4?(n(),m("span",re,s(e.$t("dividendToken")),1)):J("",!0)]),_:1},8,["label"]),l(d,{label:e.$t("managerAddress")},{default:i(t=>[l(T,{text:t.row.owner,smallText:u(I)(t.row.owner)},null,8,["text","smallText"])]),_:1},8,["label"]),l(d,{label:e.$t("tokenAddress")},{default:i(t=>[l(T,{text:t.row.tokenAddress,smallText:u(I)(t.row.tokenAddress)},null,8,["text","smallText"])]),_:1},8,["label"]),l(d,{label:e.$t("createTime")},{default:i(t=>[y(s(u(Q).unix(t.row.createTime).format("YYYY-MM-DD HH:mm:ss")),1)]),_:1},8,["label"]),l(d,{label:e.$t("operate"),width:"90"},{default:i(t=>[l(p,{key:"primary",type:"primary",onClick:me=>R(t.row),link:""},{default:i(()=>[y(s(e.$t("view")),1)]),_:2},1032,["onClick"])]),_:1},8,["label"])]),_:1},8,["data"])),[[S,a.loading]]),w("div",ie,[l(v,{background:"",layout:"prev, pager, next",total:k.value,onCurrentChange:F,"page-size":f.value,"current-page":a.pageNumber,"onUpdate:currentPage":r[2]||(r[2]=t=>a.pageNumber=t)},null,8,["total","page-size","current-page"])])]))])}}},we=z(de,[["__scopeId","data-v-5f3cf443"]]);export{we as default};