import{B as R}from"./Back-0e5f0877.js";import{T as A,C as U}from"./CopyText-e2f3aba6.js";import{_ as q,h as z,g as F,i as I,r as P,S as O,b,H as j,o as l,c as f,d as t,f as u,I as G,B as p,l as i,t as a,L as J,z as g,A as T,y,F as K,k as m,E as Q,J as V,q as x,m as N,x as W,p as B,a2 as X}from"./index-3aaa9401.js";import{_ as Z,a as ee}from"./Index-28d8f9e4.js";import{e as te}from"./ethers-79090f03.js";import{f as Y}from"./units-47b911cb.js";import"./TokenIcon-a392f563.js";/* empty css                                                          */import"./DoubleToken-d6b1e6e8.js";import"./OperateSuccessDialog-98db6d8a.js";import"./SelectLockDate-8e8806ad.js";/* empty css                                                                */const oe={class:"token-detail"},se={class:"content"},ae={key:0},ne={class:"top"},le={class:"right"},ie={class:"lock-date"},ce={class:"left"},de={class:"right"},re={class:"left"},ke={class:"right"},me={key:0},ue={class:"left"},pe={class:"right"},ye={class:"left"},_e={class:"right"},he={key:0,class:"value"},fe={key:1,class:"value"},ge={class:"left"},we={class:"right"},Le={class:"unlock-date"},ve={class:"left"},be={class:"right"},Te={key:1,class:"operate"},Ce={__name:"Detail",props:{lockId:String,tokenType:String},setup(M){const c=M,w=z(),{t:H}=F(),L=I(!1),C=I(!1),D=I(!1),e=P({id:c.lockId,address:"",amountString:"",tokenList:[],lockDate:0,unlockDate:0,isLpToken:!1,symbol:"",chain:"",isExpired:!1,chainCoinSymbol:"",decimals:0});async function $(){L.value=!1;let n;c.tokenType=="lpTokenV3"?n=await m.wallet.metamask.contractTokenLockV3(w.lock.tokenLockV3Address):n=await m.wallet.metamask.contractTokenLockV2(w.lock.tokenLockV2Address);let o;try{console.log(c.lockId),o=await n.getLockById(c.lockId)}catch{Q.error(H("failedToGetDetail"));return}if(e.lockDate=Number(o[4]),e.unlockDate=Number(o[5]),e.tokenId=o.tokenId,e.address=o[1],e.owner=o[2],e.isExpired=V().unix()>=e.unlockDate,e.chain=w.chain,e.chainCoinSymbol=w.chainCoinSymbol,c.tokenType=="lpToken")try{const s=await m.wallet.metamask.contractLP(e.address);let d=await s.decimals();e.decimals=d;let r=await s.token0(),_=await(await m.wallet.metamask.contractERC20(r)).symbol(),h=await s.token1(),v=await(await m.wallet.metamask.contractERC20(h)).symbol();e.isLpToken=!0,e.tokenList[0]={symbol:_.toUpperCase(),address:r.toLowerCase()},e.tokenList[1]={symbol:v.toUpperCase(),address:h.toLowerCase()},e.amountString=Y(o[3],d),e.symbol=`${_}/${v}`}catch(s){console.log(s)}else if(c.tokenType=="token")try{const s=await m.wallet.metamask.contractERC20(e.address);let d=await s.symbol(),r=await s.decimals();e.decimals=r,e.tokenList=[],e.isLpToken=!1,e.symbol=d.toUpperCase(),e.amountString=Y(o[3],r)}catch(s){console.log(s)}else if(c.tokenType=="lpTokenV3")try{let d=await(await m.wallet.metamask.contractNFT(e.address)).positions(e.tokenId);console.log(d.token0);let r=d.token0,_=await(await m.wallet.metamask.contractERC20(r)).symbol(),h=d.token1,v=await(await m.wallet.metamask.contractERC20(h)).symbol();e.isLpToken=!0,e.tokenList[0]={symbol:_.toUpperCase(),address:r.toLowerCase()},e.tokenList[1]={symbol:v.toUpperCase(),address:h.toLowerCase()},e.liquidity=d.liquidity,e.symbol=`${_}/${v}`}catch(s){console.log(s)}console.log(e),L.value=!0}O(()=>{$()});function E(){$()}return(n,o)=>{const s=b("el-tag"),d=b("EditPen"),r=b("el-icon"),S=b("el-button"),_=b("Unlock"),h=j("loading");return l(),f(K,null,[t("div",oe,[u(R),G((l(),f("div",se,[L.value?(l(),f("ul",ae,[t("li",ne,[c.tokenType=="token"?(l(),p(A,{key:0,class:"token-name",name:e.symbol,bigIcon:i(x)(e.chain,e.address.toLocaleLowerCase()),smallIcon:i(N)(e.chain)},null,8,["name","bigIcon","smallIcon"])):(l(),p(A,{key:1,class:"token-name",name:e.symbol,token1:i(x)(e.chain,e.tokenList[0].address.toLocaleLowerCase()),token2:i(x)(e.chain,e.tokenList[1].address.toLocaleLowerCase())},null,8,["name","token1","token2"])),t("div",le,[t("span",ie,a(n.$t("unlockTime2"))+"："+a(i(V).unix(e.lockDate).format("YYYY-MM-DD HH:mm:ss")),1)])]),t("li",null,[t("div",ce,a(n.$t("contractChian")),1),t("div",de,[u(J,{icon:i(N)(e.chain),text:i(W).chainList.find(k=>k.chain==e.chain.toLowerCase()).chainShow},null,8,["icon","text"])])]),t("li",null,[t("div",re,a(n.$t("contractAddress")),1),t("div",ke,[u(U,{smallText:i(B)(e.address),text:e.address},null,8,["smallText","text"])])]),c.tokenType=="lpTokenV3"?(l(),f("li",me,[t("div",ue,a(n.$t("tokenID")),1),t("div",pe,a(e.id),1)])):g("",!0),t("li",null,[t("div",ye,a(n.$t("lockNumber")),1),t("div",_e,[c.tokenType=="lpTokenV3"?(l(),f("div",he,a(i(te).formatEther(e.liquidity.toString())),1)):(l(),f("div",fe,a(e.amountString),1))])]),t("li",null,[t("div",ge,a(n.$t("unlockTime2")),1),t("div",we,[t("div",Le,[T(a(i(V).unix(e.unlockDate).format("YYYY-MM-DD HH:mm:ss"))+" ",1),e.isExpired?(l(),p(s,{key:0,class:"over-time tag",size:"small",type:"info"},{default:y(()=>[T(a(n.$t("expired")),1)]),_:1})):(l(),p(s,{key:1,class:"progress tag",size:"small",type:"info"},{default:y(()=>[T(a(n.$t("dayLeft",{day:i(X)(i(V).unix(e.unlockDate).toDate())})),1)]),_:1}))])])]),t("li",null,[t("div",ve,a(n.$t("lockUser")),1),t("div",be,[u(U,{smallText:i(B)(e.owner),text:e.owner},null,8,["smallText","text"])])])])):g("",!0),L.value&&i(w).walletAddress&&e.owner.toLowerCase()==i(w).walletAddress.toLowerCase()?(l(),f("div",Te,[e.isExpired?g("",!0):(l(),p(S,{key:0,class:"btn",text:"",bg:"",type:"primary",onClick:o[0]||(o[0]=k=>D.value=!0)},{icon:y(()=>[u(r,{style:{"font-size":"16px"}},{default:y(()=>[u(d)]),_:1})]),default:y(()=>[T(" "+a(n.$t("edit")),1)]),_:1})),e.isExpired?(l(),p(S,{key:1,class:"btn",text:"",bg:"",type:"primary",onClick:o[1]||(o[1]=k=>C.value=!0)},{icon:y(()=>[u(r,null,{default:y(()=>[u(_)]),_:1})]),default:y(()=>[T(" "+a(n.$t("withdraw")),1)]),_:1})):g("",!0)])):g("",!0)])),[[h,!L.value]])]),C.value?(l(),p(Z,{key:0,onOperateSuccess:E,modelValue:C.value,"onUpdate:modelValue":o[2]||(o[2]=k=>C.value=k),lockId:e.id,isLockV2:c.tokenType!=="lpTokenV3",isLpToken:c.tokenType!=="token",unlockDate:e.unlockDate,tokenList:e.tokenList,symbol:e.symbol,address:e.address,amountString:e.amountString,chain:e.chain,decimals:e.decimals},null,8,["modelValue","lockId","isLockV2","isLpToken","unlockDate","tokenList","symbol","address","amountString","chain","decimals"])):g("",!0),D.value?(l(),p(ee,{key:1,onOperateSuccess:E,modelValue:D.value,"onUpdate:modelValue":o[3]||(o[3]=k=>D.value=k),lockId:e.id,isLockV2:c.tokenType!=="lpTokenV3",isLpToken:c.tokenType!=="token",unlockDate:e.unlockDate,tokenList:e.tokenList,symbol:e.symbol,address:e.address,amountString:e.amountString,chain:e.chain,decimals:e.decimals},null,8,["modelValue","lockId","isLockV2","isLpToken","unlockDate","tokenList","symbol","address","amountString","chain","decimals"])):g("",!0)],64)}}},Me=q(Ce,[["__scopeId","data-v-4884ae70"]]);export{Me as default};
