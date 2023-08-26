import{_ as re}from"./noData-cd778682.js";import{T as O}from"./TokenIcon-e72a2230.js";import{T as K,C as W}from"./CopyText-0221fdb1.js";import{_ as ue,a as de}from"./Index-92768e12.js";import{K as me,_ as pe,i as fe,h as Le,a as ye,u as we,r as D,x as Te,w as he,d as I,H as ge,o as d,c as v,e as V,g as w,y as p,F as B,f as J,l,z as N,A as _,t as h,I as be,B as T,k as L,E as Q,J as z,C as G,q as U,m as X,n as ve,p as Z,a1 as M,a2 as _e}from"./index-b49da9d3.js";import{e as Ce}from"./ethers-9765cca3.js";import{f as R}from"./units-ed7533eb.js";/* empty css                                                          */import"./DoubleToken-83da4cea.js";import"./OperateSuccessDialog-eb114812.js";import"./SelectLockDate-3da61102.js";/* empty css                                                                */import"./wallet-7c233d9c.js";const Ie=me("list",{state:()=>({lockType:0,tokenType:null,pageSize:5,lockList:[{name:"allLock",pageNumber:1,list:[],loading:!1},{name:"myLock",pageNumber:1,list:[],loading:!1}],searchLockList:{list:[],loading:!1}}),actions:{}});const Ve={class:"lock-master"},Ae={key:1,class:"error"},Se={class:"option"},De={class:"operate"},Ne={key:0,class:"tab"},$e=["onClick"],Ee={key:0,class:"empty"},Ue=["fit"],Fe={class:"info"},xe={key:1,class:"list"},ze={class:"unlock-date"},Re={key:0,class:"pagination"},Ye={__name:"Index",setup(Be){const k=fe(),e=Ie(),{t:H}=Le(),ee=ye(),P=we(),A=D(""),$=D(0),g=D(!1),Y=Te.chainList.filter(o=>!!o.create);async function oe(o){if(console.log(o),o!=k.chainId)try{let n=Y.find(t=>t.chainId==o);await L.wallet.metamask.switchNetwork(n)}catch(n){const t=L.wallet.metamask.parseError(n);Q.error(H(t))}}const f=D(null),F=D(!1),x=D(!1);function te(){P.push("/lock/create/token"),console.dir(e)}async function q(){if(g.value=!1,!A.value){e.searchLockList.list=[];return}if(!/^0x[0-9a-fA-F]{40}(,\d*\.?\d+)?$/.test(A.value)){e.searchLockList.list=[];return}let t=e.tokenType;g.value=!0,e.searchLockList.loading=!0;try{let c,s,r,i,u=[];if(t=="lpTokenV3")c=await L.wallet.metamask.contractTokenLockV3(k.lock.tokenLockV3Address),i=await c.getLocksForToken(A.value,0n,10000n);else{if(c=await L.wallet.metamask.contractTokenLockV2(k.lock.tokenLockV2Address),s=await c.cumulativeLockInfo(A.value),r="0x0000000000000000000000000000000000000000",s.token==r)throw"tokenErr";if(s.factory==r&&t!=="token"||s.factory!==r&&t!=="lpToken")throw"typeErr";i=await c.getLocksForToken(s.token,0n,10000n),console.log(i)}for(let m of i){let y;t=="token"&&s.factory==r?y=await b(m,0):t=="lpToken"&&s.factory!==r?y=await b(m,1):t=="lpTokenV3"&&(y=await b(m,2)),u.push(y)}if(e.tokenType!==t)throw"tokenTypeErr";e.searchLockList.list=u}catch(c){e.searchLockList.list=[],console.log(c)}finally{e.searchLockList.loading=!1}}function le(o){(g.value?e.searchLockList.loading:e.lockList[e.lockType].loading)||(e.lockType=o,e.lockList[e.lockType].list.length==0&&E())}he(()=>{var o;return(o=ee.params)==null?void 0:o.tokenType},o=>{g.value=!1,A.value="",e.tokenType=o,e.lockType=0,$.value=0;for(let n in e.lockList)e.lockList[n].pageNumber=1,e.lockList[n].list=[],e.lockList[n].loading=!1;console.log(e.lockList),E()},{immediate:!0});function ae(o){console.log(o);let n="";e.tokenType=="token"?n="/lock/detail/token/"+o.id:e.tokenType=="lpToken"?n="/lock/detail/lpToken/"+o.id:e.tokenType=="lpTokenV3"&&(n="/lock/detail/lpTokenV3/"+o.id),P.push(n)}async function E(){e.lockType==0?await se():await ie()}function ne(){E()}async function se(){let o=e.tokenType;e.lockList[e.lockType].loading=!0;let n=(e.lockList[e.lockType].pageNumber-1)*e.pageSize,t=(e.lockList[e.lockType].pageNumber-1)*e.pageSize+e.pageSize-1;try{let c,s,r=[];if(o=="token"){s=await L.wallet.metamask.contractTokenLockV2(k.lock.tokenLockV2Address);let i=await s.allNormalTokenLockedCount();if(console.log(i),console.log(Number(i)),i==0n)throw"err";$.value=Number(i),c=await s.getCumulativeNormalTokenLockInfo(n,t);for(let u of c)r.push(s.getLocksForToken(u.token,0n,10000n))}else if(o=="lpToken"){s=await L.wallet.metamask.contractTokenLockV2(k.lock.tokenLockV2Address);let i=await s.allLpTokenLockedCount();if(i==0n)throw"err";$.value=Number(i),c=await s.getCumulativeLpTokenLockInfo(n,t);for(let u of c)r.push(s.getLocksForToken(u.token,0n,10000n))}else if(o=="lpTokenV3"){s=await L.wallet.metamask.contractTokenLockV3(k.lock.tokenLockV3Address);let i=await s.allTokenLockedCount();if(i==0n)throw"err";$.value=Number(i),c=await s.getAllTokenLockInfo(n,t);for(let u of c)r.push(u)}Promise.all(r).then(i=>{let u=[];if(console.log("resLockTokenArr",i),o=="lpTokenV3")for(let m of i)u.push(b(m,2));else for(let m of i)for(let y of m)o=="token"?u.push(b(y,0)):o=="lpToken"&&u.push(b(y,1));Promise.all(u).then(m=>{if(console.log("resTokenLockList",m),e.tokenType!==o)throw"tokenTypeErr";e.lockList[e.lockType].list=m}).catch(m=>{throw m}).finally(m=>{e.lockList[e.lockType].loading=!1})}).catch(i=>{throw i})}catch{e.lockList[e.lockType].loading=!1}}async function ie(){if(!k.isConnecting){Q.error(H("pleaseConnectWallet"));return}let o=e.tokenType;e.lockList[e.lockType].loading=!0;try{let n,t;o=="lpTokenV3"?(t=await L.wallet.metamask.contractTokenLockV3(k.lock.tokenLockV3Address),n=await t.locksForUser(k.walletAddress)):(t=await L.wallet.metamask.contractTokenLockV2(k.lock.tokenLockV2Address),o=="token"?n=await t.normalLocksForUser(k.walletAddress):o=="lpToken"&&(n=await t.lpLocksForUser(k.walletAddress))),console.log(n),e.lockList[e.lockType].list=[];let c=[];for(let s of n){let r;o=="token"?r=await b(s,0):o=="lpToken"?r=await b(s,1):o=="lpTokenV3"&&(r=await b(s,2)),c.push(r),e.lockList[e.lockType].list.push(r)}if(e.tokenType!==o)throw"tokenTypeErr";e.lockList[e.lockType].list=c}catch(n){console.log(n)}finally{e.lockList[e.lockType].loading=!1}}async function b(o,n){let t={};if(t.id=o.id,t.tokenAddress=o.token.toLowerCase(),t.owner=o.owner.toLowerCase(),t.lockDate=z.unix(G(Number(o.lockDate))).format("YYYY-MM-DD HH:mm:ss"),t.unlockDate=z.unix(G(Number(o.tgeDate))).format("YYYY-MM-DD HH:mm:ss"),n==0){let c=await L.wallet.metamask.contractERC20(o.token);t.tokenList=[],t.tokenSymbol=await c.symbol(),t.tokenIcon=U(k.chain,o.token.toLowerCase());const s=await c.decimals();t.decimals=s,t.amount=R(o.amount,s),t.unlockedAmount=R(o.unlockedAmount,s)}else if(n==1){let c=await L.wallet.metamask.contractLP(o.token),s=await c.token0(),i=await(await L.wallet.metamask.contractERC20(s)).symbol(),u=await c.token1(),y=await(await L.wallet.metamask.contractERC20(u)).symbol();t.tokenList=[],t.tokenList[0]={symbol:i.toUpperCase(),address:s.toLowerCase(),amount:0},t.tokenList[1]={symbol:y.toUpperCase(),address:u.toLowerCase(),amount:0},t.tokenSymbol=i+"/"+y,t.tokenIcon0=U(k.chain,s.toLowerCase()),t.tokenIcon1=U(k.chain,u.toLowerCase());const C=await c.decimals();t.decimals=C,t.amount=R(o.amount,C),t.unlockedAmount=R(o.unlockedAmount.toString(),C)}else if(n==2){console.log(o.id),t.tokenId=o.tokenId;let s=await(await L.wallet.metamask.contractNFT(o.token)).positions(t.tokenId);console.log(s.token0);let r=s.token0,u=await(await L.wallet.metamask.contractERC20(r)).symbol(),m=s.token1,C=await(await L.wallet.metamask.contractERC20(m)).symbol();t.tokenList=[],t.tokenList[0]={symbol:u.toUpperCase(),address:r.toLowerCase(),amount:0},t.tokenList[1]={symbol:C.toUpperCase(),address:m.toLowerCase(),amount:0},t.tokenSymbol=u+"/"+C,t.tokenIcon0=U(k.chain,r.toLowerCase()),t.tokenIcon1=U(k.chain,m.toLowerCase()),t.liquidity=s.liquidity}return t}function ce(o){f.value=o,F.value=!0}function ke(o){f.value=o,x.value=!0}function j(){g.value?q():E()}return(o,n)=>{const t=I("el-option"),c=I("el-select"),s=I("el-input"),r=I("el-button"),i=I("el-table-column"),u=I("el-tag"),m=I("el-table"),y=I("el-pagination"),C=ge("loading");return d(),v(B,null,[V("div",Ve,[w(s,{modelValue:A.value,"onUpdate:modelValue":n[0]||(n[0]=a=>A.value=a),placeholder:o.$t("tokenLPToken"),onInput:q,class:"input-with-select",clearable:""},{prepend:p(()=>[w(c,{class:"select-chain","model-value":l(k).chainId?l(k).chainId:" ",onChange:oe},{prefix:p(()=>[l(k).isConnecting&&l(k).chain&&l(Y).some(a=>a.chainId==l(k).chainId)?(d(),T(O,{key:0,class:"token-icon",bigIcon:l(X)(l(k).chain)},null,8,["bigIcon"])):(d(),v("span",Ae,"ERROR"))]),default:p(()=>[(d(!0),v(B,null,J(l(Y),a=>(d(),T(t,{key:a.chainId,label:a.chainShow,value:a.chainId},{default:p(()=>[V("div",Se,[w(O,{class:"token-icon",bigIcon:l(X)(a.chain.toLowerCase())},null,8,["bigIcon"]),V("span",null,h(a.chainShow),1)])]),_:2},1032,["label","value"]))),128))]),_:1},8,["model-value"])]),_:1},8,["modelValue","placeholder"]),V("div",De,[g.value?N("",!0):(d(),v("ul",Ne,[(d(!0),v(B,null,J(l(e).lockList,(a,S)=>(d(),v("li",{class:ve({"tab-item-selected":l(e).lockType==S}),key:S,onClick:()=>le(S)},h(o.$t(a.name)),11,$e))),128))])),w(r,{type:"primary",class:"btn-gradient lock",onClick:te},{default:p(()=>[_(h(o.$t("oneKeyLock")),1)]),_:1})]),g.value&&l(e).searchLockList.list.length==0&&!l(e).searchLockList.loading||l(e).lockList[l(e).lockType].list.length==0&&!l(e).lockList[l(e).lockType].loading?(d(),v("div",Ee,[V("img",{style:{width:"80px"},src:re,fit:o.fit},null,8,Ue),V("div",Fe,[_(h(o.$t("noLockToken"))+"，",1),V("span",{onClick:E,style:{color:"#409eff",cursor:"pointer"}},h(o.$t("refresh")),1)])])):(d(),v("div",xe,[be((d(),T(m,{class:"table-mine",data:g.value?l(e).searchLockList.list:l(e).lockList[l(e).lockType].list},{default:p(()=>[w(i,{label:o.$t("tokenName"),width:"180"},{default:p(a=>[l(e).tokenType=="token"?(d(),T(K,{key:0,class:"token-name",name:a.row.tokenSymbol,bigIcon:a.row.tokenIcon},null,8,["name","bigIcon"])):(d(),T(K,{key:1,class:"token-name",name:a.row.tokenSymbol,token1:a.row.tokenIcon0,token2:a.row.tokenIcon1},null,8,["name","token1","token2"]))]),_:1},8,["label"]),w(i,{label:o.$t("contractAddress"),width:"140"},{default:p(a=>[w(W,{text:a.row.tokenAddress,smallText:l(Z)(a.row.tokenAddress)},null,8,["text","smallText"])]),_:1},8,["label"]),l(e).tokenType=="lpTokenV3"?(d(),T(i,{key:0,prop:"amount",label:o.$t("lockNumber"),width:"180"},{default:p(a=>[_(h(l(Ce).formatEther(a.row.liquidity.toString())),1)]),_:1},8,["label"])):(d(),T(i,{key:1,prop:"amount",label:o.$t("lockNumber"),width:"180"},null,8,["label"])),w(i,{prop:"unlockDate",label:o.$t("unlockTime2")},{default:p(a=>[V("div",ze,[_(h(a.row.unlockDate)+" ",1),l(M)(a.row.unlockDate)?(d(),T(u,{key:0,class:"over-time tag",size:"small",type:"info"},{default:p(()=>[_(h(o.$t("expired")),1)]),_:1})):(d(),T(u,{key:1,class:"progress tag",size:"small",type:"info"},{default:p(()=>[_(h(o.$t("dayLeft",{day:l(_e)(a.row.unlockDate)})),1)]),_:2},1024))])]),_:1},8,["label"]),w(i,{prop:"address",label:o.$t("lockUser"),width:"150"},{default:p(a=>[w(W,{text:a.row.owner,smallText:l(Z)(a.row.owner)},null,8,["text","smallText"])]),_:1},8,["label"]),w(i,{prop:"address",label:o.$t("operate"),width:"150"},{default:p(a=>[w(r,{key:"primary",type:"primary",onClick:S=>ae(a.row),link:""},{default:p(()=>[_(h(o.$t("view")),1)]),_:2},1032,["onClick"]),l(M)(a.row.unlockDate)&&a.row.owner.toLowerCase()==l(k).walletAddress?(d(),T(r,{key:"primary",type:"primary",onClick:S=>ce(a.row),link:""},{default:p(()=>[_(h(o.$t("withdraw")),1)]),_:2},1032,["onClick"])):N("",!0),!l(M)(a.row.unlockDate)&&a.row.owner.toLowerCase()==l(k).walletAddress?(d(),T(r,{key:"primary",type:"primary",onClick:S=>ke(a.row),link:""},{default:p(()=>[_(h(o.$t("edit")),1)]),_:2},1032,["onClick"])):N("",!0)]),_:1},8,["label"])]),_:1},8,["data"])),[[C,g.value?l(e).searchLockList.loading:l(e).lockList[l(e).lockType].loading]]),!g.value&&l(e).lockType==0?(d(),v("div",Re,[w(y,{background:"",layout:"prev, pager, next",total:$.value,onCurrentChange:ne,"page-size":l(e).pageSize,"current-page":l(e).lockList[l(e).lockType].pageNumber,"onUpdate:currentPage":n[1]||(n[1]=a=>l(e).lockList[l(e).lockType].pageNumber=a)},null,8,["total","page-size","current-page"])])):N("",!0)]))]),F.value?(d(),T(ue,{key:0,onOperateSuccess:j,modelValue:F.value,"onUpdate:modelValue":n[2]||(n[2]=a=>F.value=a),lockId:f.value.id,isLockV2:l(e).tokenType!=="lpTokenV3",isLpToken:l(e).tokenType!=="token",unlockDate:l(z)(f.value.unlockDate).unix(),tokenList:f.value.tokenList,symbol:f.value.tokenSymbol,address:f.value.tokenAddress,amountString:f.value.amount,chain:l(k).chain,decimals:f.value.decimals},null,8,["modelValue","lockId","isLockV2","isLpToken","unlockDate","tokenList","symbol","address","amountString","chain","decimals"])):N("",!0),x.value?(d(),T(de,{key:1,onOperateSuccess:j,modelValue:x.value,"onUpdate:modelValue":n[3]||(n[3]=a=>x.value=a),lockId:f.value.id,isLockV2:l(e).tokenType!=="lpTokenV3",isLpToken:l(e).tokenType!=="token",unlockDate:l(z)(f.value.unlockDate).unix(),tokenList:f.value.tokenList,symbol:f.value.tokenSymbol,address:f.value.tokenAddress,amountString:f.value.amount,chain:l(k).chain,decimals:f.value.decimals},null,8,["modelValue","lockId","isLockV2","isLpToken","unlockDate","tokenList","symbol","address","amountString","chain","decimals"])):N("",!0)],64)}}},eo=pe(Ye,[["__scopeId","data-v-77ff47c9"]]);export{eo as default};
