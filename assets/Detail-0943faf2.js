import{B as H}from"./Back-c6251f4f.js";import{T as $,C as E}from"./CopyText-51726bef.js";import{_ as R,h as q,g as z,i as I,r as F,S as P,b,H as j,o as n,c as f,d as t,f as u,I as G,B as p,l as i,t as a,L as J,z as g,A as T,y,F as K,k as m,E as O,J as S,q as x,m as A,x as Q,p as U,a2 as W}from"./index-5ec31237.js";/* empty css                                                          */import{e as X}from"./ethers-4f7e2f4c.js";import"./SelectLockDate-460be086.js";/* empty css                                                                */import"./DoubleToken-28cbdaf6.js";import{_ as Z,a as ee}from"./Index-17035199.js";import{f as N}from"./units-65198484.js";import"./TokenIcon-f5c39b71.js";import"./OperateSuccessDialog-f6a8c2ea.js";const te={class:"token-detail"},oe={class:"content"},se={key:0},ae={class:"top"},le={class:"right"},ne={class:"lock-date"},ie={class:"left"},ce={class:"right"},de={class:"left"},re={class:"right"},ke={key:0},me={class:"left"},ue={class:"right"},pe={class:"left"},ye={class:"right"},_e={key:0,class:"value"},he={key:1,class:"value"},fe={class:"left"},ge={class:"right"},we={class:"unlock-date"},ve={class:"left"},Le={class:"right"},be={key:1,class:"operate"},Te={__name:"Detail",props:{lockId:String,tokenType:String},setup(B){const c=B,w=q(),{t:Y}=z(),v=I(!1),C=I(!1),D=I(!1),e=F({id:c.lockId,address:"",amountString:"",tokenList:[],lockDate:0,unlockDate:0,isLpToken:!1,symbol:"",chain:"",isExpired:!1,chainCoinSymbol:"",decimals:0});async function M(){v.value=!1;let l;c.tokenType=="lpTokenV3"?l=await m.wallet.metamask.contractTokenLockV3(w.lock.tokenLockV3Address):l=await m.wallet.metamask.contractTokenLockV2(w.lock.tokenLockV2Address);let o;try{console.log(c.lockId),o=await l.getLockById(c.lockId)}catch{O({message:Y("failedToGetDetail"),type:"error"});return}if(e.lockDate=Number(o[4]),e.unlockDate=Number(o[5]),e.tokenId=o.tokenId,e.address=o[1],e.owner=o[2],e.isExpired=S().unix()>=e.unlockDate,e.chain=w.chain,e.chainCoinSymbol=w.chainCoinSymbol,c.tokenType=="lpToken")try{const s=await m.wallet.metamask.contractLP(e.address);let d=await s.decimals();e.decimals=d;let r=await s.token0(),_=await(await m.wallet.metamask.contractERC20(r)).symbol(),h=await s.token1(),L=await(await m.wallet.metamask.contractERC20(h)).symbol();e.isLpToken=!0,e.tokenList[0]={symbol:_.toUpperCase(),address:r.toLowerCase()},e.tokenList[1]={symbol:L.toUpperCase(),address:h.toLowerCase()},e.amountString=N(o[3],d),e.symbol=`${_}/${L}`}catch(s){console.log(s)}else if(c.tokenType=="token")try{const s=await m.wallet.metamask.contractERC20(e.address);let d=await s.symbol(),r=await s.decimals();e.decimals=r,e.tokenList=[],e.isLpToken=!1,e.symbol=d.toUpperCase(),e.amountString=N(o[3],r)}catch(s){console.log(s)}else if(c.tokenType=="lpTokenV3")try{let d=await(await m.wallet.metamask.contractNFT(e.address)).positions(e.tokenId);console.log(d.token0);let r=d.token0,_=await(await m.wallet.metamask.contractERC20(r)).symbol(),h=d.token1,L=await(await m.wallet.metamask.contractERC20(h)).symbol();e.isLpToken=!0,e.tokenList[0]={symbol:_.toUpperCase(),address:r.toLowerCase()},e.tokenList[1]={symbol:L.toUpperCase(),address:h.toLowerCase()},e.liquidity=d.liquidity,e.symbol=`${_}/${L}`}catch(s){console.log(s)}console.log(e),v.value=!0}return P(()=>{M()}),(l,o)=>{const s=b("el-tag"),d=b("EditPen"),r=b("el-icon"),V=b("el-button"),_=b("Unlock"),h=j("loading");return n(),f(K,null,[t("div",te,[u(H),G((n(),f("div",oe,[v.value?(n(),f("ul",se,[t("li",ae,[c.tokenType=="token"?(n(),p($,{key:0,class:"token-name",name:e.symbol,bigIcon:i(x)(e.chain,e.address.toLocaleLowerCase()),smallIcon:i(A)(e.chain)},null,8,["name","bigIcon","smallIcon"])):(n(),p($,{key:1,class:"token-name",name:e.symbol,token1:i(x)(e.chain,e.tokenList[0].address.toLocaleLowerCase()),token2:i(x)(e.chain,e.tokenList[1].address.toLocaleLowerCase())},null,8,["name","token1","token2"])),t("div",le,[t("span",ne,a(l.$t("unlockTime2"))+"："+a(i(S).unix(e.lockDate).format("YYYY-MM-DD HH:mm:ss")),1)])]),t("li",null,[t("div",ie,a(l.$t("contractChian")),1),t("div",ce,[u(J,{icon:i(A)(e.chain),text:i(Q).chainList.find(k=>k.chain==e.chain.toLowerCase()).chainShow},null,8,["icon","text"])])]),t("li",null,[t("div",de,a(l.$t("contractAddress")),1),t("div",re,[u(E,{smallText:i(U)(e.address),text:e.address},null,8,["smallText","text"])])]),c.tokenType=="lpTokenV3"?(n(),f("li",ke,[t("div",me,a(l.$t("tokenID")),1),t("div",ue,a(e.id),1)])):g("",!0),t("li",null,[t("div",pe,a(l.$t("lockNumber")),1),t("div",ye,[c.tokenType=="lpTokenV3"?(n(),f("div",_e,a(i(X).formatEther(e.liquidity.toString())),1)):(n(),f("div",he,a(e.amountString),1))])]),t("li",null,[t("div",fe,a(l.$t("unlockTime2")),1),t("div",ge,[t("div",we,[T(a(i(S).unix(e.unlockDate).format("YYYY-MM-DD HH:mm:ss"))+" ",1),e.isExpired?(n(),p(s,{key:0,class:"over-time tag",size:"small",type:"info"},{default:y(()=>[T(a(l.$t("expired")),1)]),_:1})):(n(),p(s,{key:1,class:"progress tag",size:"small",type:"info"},{default:y(()=>[T(a(l.$t("dayLeft",{day:i(W)(i(S).unix(e.unlockDate).toDate())})),1)]),_:1}))])])]),t("li",null,[t("div",ve,a(l.$t("lockUser")),1),t("div",Le,[u(E,{smallText:i(U)(e.owner),text:e.owner},null,8,["smallText","text"])])])])):g("",!0),v.value&&i(w).walletAddress&&e.owner.toLowerCase()==i(w).walletAddress.toLowerCase()?(n(),f("div",be,[e.isExpired?g("",!0):(n(),p(V,{key:0,class:"btn",text:"",bg:"",type:"primary",onClick:o[0]||(o[0]=k=>D.value=!0)},{icon:y(()=>[u(r,{style:{"font-size":"16px"}},{default:y(()=>[u(d)]),_:1})]),default:y(()=>[T(" "+a(l.$t("edit")),1)]),_:1})),e.isExpired?(n(),p(V,{key:1,class:"btn",text:"",bg:"",type:"primary",onClick:o[1]||(o[1]=k=>C.value=!0)},{icon:y(()=>[u(r,null,{default:y(()=>[u(_)]),_:1})]),default:y(()=>[T(" "+a(l.$t("withdraw")),1)]),_:1})):g("",!0)])):g("",!0)])),[[h,!v.value]])]),C.value?(n(),p(Z,{key:0,modelValue:C.value,"onUpdate:modelValue":o[2]||(o[2]=k=>C.value=k),lockId:e.id,isLockV2:c.tokenType!=="lpTokenV3",isLpToken:c.tokenType!=="token",unlockDate:e.unlockDate,tokenList:e.tokenList,symbol:e.symbol,address:e.address,amountString:e.amountString,chain:e.chain,decimals:e.decimals},null,8,["modelValue","lockId","isLockV2","isLpToken","unlockDate","tokenList","symbol","address","amountString","chain","decimals"])):g("",!0),D.value?(n(),p(ee,{key:1,modelValue:D.value,"onUpdate:modelValue":o[3]||(o[3]=k=>D.value=k),lockId:e.id,isLockV2:c.tokenType!=="lpTokenV3",isLpToken:c.tokenType!=="token",unlockDate:e.unlockDate,tokenList:e.tokenList,symbol:e.symbol,address:e.address,amountString:e.amountString,chain:e.chain,decimals:e.decimals},null,8,["modelValue","lockId","isLockV2","isLpToken","unlockDate","tokenList","symbol","address","amountString","chain","decimals"])):g("",!0)],64)}}},Ye=R(Te,[["__scopeId","data-v-e7644864"]]);export{Ye as default};
