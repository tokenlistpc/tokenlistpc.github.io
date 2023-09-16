import{_ as C}from"./noData-cd778682.js";import{_ as L,u as H,r as T,v as x,w as N,e as h,K as S,o as i,c as p,f,A as g,t as l,L as $,B as I,y as c,h as r,b as D,x as M,l as d,q as A,m as B,M as z,p as E}from"./index-93d809cf.js";import{T as R}from"./TokenName-1bceeda2.js";import{C as Y}from"./CopyText-7026e635.js";import{u as F}from"./index-ee6c3717.js";import{e as V}from"./ethers-fe4ea8ca.js";import"./TokenIcon-c1cb4a69.js";/* empty css                                                          */import"./DoubleToken-df9ff6ae.js";import"./wallet-d0f19440.js";import"./units-d19c65d4.js";const j={class:"transfer-history"},U={key:0,class:"empty"},q=["fit"],K={class:"info"},P={key:1,class:"list"},W={key:0,class:"status finish"},G={key:1,class:"status fail"},J={key:2,class:"status wait"},O={class:"pagination"},Q={__name:"History",setup(X){const u=H(),m=F(),s=T({loading:!1,transferList:[],pageSize:15,pageNumber:1,totalRecords:0}),b=x(()=>s.pageNumber==1?m.transferringList.concat(s.transferList):s.transferList);async function _(){s.loading=!0;try{const e=await D.multiSend.getMultiSendHistory(u.walletAddress,s.pageSize,s.pageNumber,u.chain);if(console.log(e),e.data.status==0){if(s.totalRecords=e.data.data.total,s.transferList=e.data.data.list,m.transferringList.length>0&&e.data.data.list.length>0)for(let n in m.transferringList)e.data.data.list.find(o=>o.txHash==m.transferringList[n].txHash)&&m.transferringList.splice(n,1)}else error.value=!0}catch(e){console.log(e)}finally{s.loading=!1}}function y(e){let n=M.chainList.find(o=>o.chain==e.chain);n?window.open(n.txBlockExplorerUrl+e.txHash,"_blank"):ElMessage.error(t("unsupportedNetwork"))}return N(()=>u.isConnecting,e=>{e&&(console.log(222),_())},{immediate:!0}),(e,n)=>{const o=h("el-table-column"),w=h("el-table"),k=h("el-pagination"),v=S("loading");return i(),p("div",j,[b.value.length==0&&!s.loading?(i(),p("div",U,[f("img",{style:{width:"80px"},src:C,fit:e.fit},null,8,q),f("div",K,[g(l(e.$t("noToken"))+"，",1),f("span",{onClick:_,style:{color:"#409eff",cursor:"pointer"}},l(e.$t("refresh")),1)])])):(i(),p("div",P,[$((i(),I(w,{class:"table-mine",onRowClick:y,data:b.value},{default:c(()=>[r(o,{prop:"tokenName",label:e.$t("tokenName"),width:"150"},{default:c(a=>[r(R,{class:"token-name",symbol:a.row.tokenSymbol,bigIcon:d(A)(d(u).chain.toLowerCase(),a.row.tokenAddress.toLowerCase()),smallIcon:d(B)(d(u).chain.toLowerCase())},null,8,["symbol","bigIcon","smallIcon"])]),_:1},8,["label"]),r(o,{prop:"amount",label:e.$t("addressCount")},{default:c(a=>[g(l(a.row.receiverCount),1)]),_:1},8,["label"]),r(o,{prop:"amount",label:e.$t("transferAmount")},{default:c(a=>[g(l(d(V).formatEther(a.row.sendAmount)),1)]),_:1},8,["label"]),r(o,{prop:"address",label:e.$t("transferTime")},{default:c(a=>[g(l(d(z).unix(a.row.sendTime).format("YYYY-MM-DD HH:mm")),1)]),_:1},8,["label"]),r(o,{prop:"address",label:e.$t("status")},{default:c(a=>[a.row.status==0?(i(),p("span",W,l(e.$t("transferFinish")),1)):a.row.status==1?(i(),p("span",G,l(e.$t("mulTransferFail")),1)):(i(),p("span",J,l(e.$t("transferWait")),1))]),_:1},8,["label"]),r(o,{prop:"unlockDate",label:e.$t("txHash")},{default:c(a=>[r(Y,{smallText:d(E)(a.row.txHash,6),text:a.row.txHash},null,8,["smallText","text"])]),_:1},8,["label"])]),_:1},8,["data"])),[[v,s.loading]]),f("div",O,[r(k,{background:"",layout:"prev, pager, next",total:s.totalRecords,onCurrentChange:_,"page-size":s.pageSize,"current-page":s.pageNumber,"onUpdate:currentPage":n[0]||(n[0]=a=>s.pageNumber=a)},null,8,["total","page-size","current-page"])])]))])}}},dt=L(Q,[["__scopeId","data-v-7e757e98"]]);export{dt as default};