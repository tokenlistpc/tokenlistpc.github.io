import{B as z}from"./Back-90c90dc7.js";import{T as A}from"./TokenName-6cda0a0b.js";import{C as N}from"./CopyText-2c36b987.js";import{_ as H,u as F,i as O,j as S,r as P,U as j,e as v,K as G,o as c,c as g,f as t,h as m,L as K,A as p,l as d,t as a,N as J,y as _,z as b,x as u,F as Q,b as y,E as W,M as I,q as E,m as Y,C as X,p as B,a9 as Z}from"./index-1a6d1bbc.js";import{_ as ee,b as te,a as oe}from"./Index-d2b7934c.js";import{e as se}from"./ethers-e9d4ae29.js";import{f as M}from"./units-963d647b.js";import"./TokenIcon-c35c83ff.js";/* empty css                                                          */import"./DoubleToken-dd452491.js";/* empty css                                                            *//* empty css                                                          */import"./OperateSuccessDialog-5facfac0.js";import"./SelectLockDate-1e40d200.js";/* empty css                                                                */import"./wallet-ca812aa1.js";const ae={class:"token-detail"},ne={class:"content"},le={key:0},ie={class:"top"},ce={class:"right"},de={class:"lock-date"},re={class:"left"},ke={class:"right"},me={class:"left"},ue={class:"right"},pe={key:0},ye={class:"left"},_e={class:"right"},fe={class:"left"},he={class:"right"},ge={key:0,class:"value"},Le={key:1,class:"value"},ve={class:"left"},be={class:"right"},we={class:"unlock-date"},Te={class:"left"},Ce={class:"right"},De={key:1,class:"operate"},Ve={__name:"Detail",props:{lockId:String,tokenType:String},setup(R){const n=R,L=F(),{t:q}=O(),w=S(!1),C=S(!1),D=S(!1),V=S(!1),e=P({id:n.lockId,address:"",amountString:"",tokenList:[],lockDate:0,unlockDate:0,isLpToken:!1,symbol:"",chain:"",isExpired:!1,chainCoinSymbol:"",decimals:0});async function U(){w.value=!1;let l;n.tokenType=="lpTokenV3"?l=await y.wallet.metamask.contractTokenLockV3(L.lock.tokenLockV3Address):l=await y.wallet.metamask.contractTokenLockV2(L.lock.tokenLockV2Address);let o;try{console.log(n.lockId),o=await l.getLockById(n.lockId)}catch{W.error(q("failedToGetDetail"));return}if(e.lockDate=Number(o[4]),e.unlockDate=Number(o[5]),e.tokenId=o.tokenId,e.address=o[1],e.owner=o[2],e.isExpired=I().unix()>=e.unlockDate,e.chain=L.chain,e.chainCoinSymbol=L.chainCoinSymbol,n.tokenType=="lpToken")try{const s=await y.wallet.metamask.contractLP(e.address);let k=await s.decimals();e.decimals=k;let r=await s.token0(),f=await(await y.wallet.metamask.contractERC20(r)).symbol(),h=await s.token1(),i=await(await y.wallet.metamask.contractERC20(h)).symbol();e.isLpToken=!0,e.tokenList[0]={symbol:f.toUpperCase(),address:r.toLowerCase()},e.tokenList[1]={symbol:i.toUpperCase(),address:h.toLowerCase()},e.amountString=M(o[3],k),e.symbol=`${f}/${i}`}catch(s){console.log(s)}else if(n.tokenType=="token")try{const s=await y.wallet.metamask.contractERC20(e.address);let k=await s.symbol(),r=await s.decimals();e.decimals=r,e.tokenList=[],e.isLpToken=!1,e.symbol=k.toUpperCase(),e.amountString=M(o[3],r)}catch(s){console.log(s)}else if(n.tokenType=="lpTokenV3")try{let k=await(await y.wallet.metamask.contractNFT(e.address)).positions(e.tokenId);console.log(k.token0);let r=k.token0,f=await(await y.wallet.metamask.contractERC20(r)).symbol(),h=k.token1,i=await(await y.wallet.metamask.contractERC20(h)).symbol();e.isLpToken=!0,e.tokenList[0]={symbol:f.toUpperCase(),address:r.toLowerCase()},e.tokenList[1]={symbol:i.toUpperCase(),address:h.toLowerCase()},e.liquidity=k.liquidity,e.symbol=`${f}/${i}`}catch(s){console.log(s)}console.log(e),w.value=!0}j(()=>{U()});function $(){U()}return(l,o)=>{const s=v("el-tag"),k=v("EditPen"),r=v("el-icon"),T=v("el-button"),f=v("Unlock"),h=v("Right"),x=G("loading");return c(),g(Q,null,[t("div",ae,[m(z),K((c(),g("div",ne,[w.value?(c(),g("ul",le,[t("li",ie,[n.tokenType=="token"?(c(),p(A,{key:0,class:"token-name",name:e.symbol,bigIcon:d(E)(e.chain,e.address.toLocaleLowerCase()),smallIcon:d(Y)(e.chain)},null,8,["name","bigIcon","smallIcon"])):(c(),p(A,{key:1,class:"token-name",name:e.symbol,token1:d(E)(e.chain,e.tokenList[0].address.toLocaleLowerCase()),token2:d(E)(e.chain,e.tokenList[1].address.toLocaleLowerCase())},null,8,["name","token1","token2"])),t("div",ce,[t("span",de,a(l.$t("unlockTime2"))+"："+a(d(I).unix(e.lockDate).format("YYYY-MM-DD HH:mm:ss")),1)])]),t("li",null,[t("div",re,a(l.$t("contractChian")),1),t("div",ke,[m(J,{icon:d(Y)(e.chain),text:d(X).chainList.find(i=>i.chain==e.chain.toLowerCase()).chainShow},null,8,["icon","text"])])]),t("li",null,[t("div",me,a(l.$t("contractAddress")),1),t("div",ue,[m(N,{smallText:d(B)(e.address),text:e.address},null,8,["smallText","text"])])]),n.tokenType=="lpTokenV3"?(c(),g("li",pe,[t("div",ye,a(l.$t("tokenID")),1),t("div",_e,a(e.id),1)])):_("",!0),t("li",null,[t("div",fe,a(l.$t("lockNumber")),1),t("div",he,[n.tokenType=="lpTokenV3"?(c(),g("div",ge,a(d(se).formatEther(e.liquidity.toString())),1)):(c(),g("div",Le,a(e.amountString),1))])]),t("li",null,[t("div",ve,a(l.$t("unlockTime2")),1),t("div",be,[t("div",we,[b(a(d(I).unix(e.unlockDate).format("YYYY-MM-DD HH:mm:ss"))+" ",1),e.isExpired?(c(),p(s,{key:0,class:"over-time tag",size:"small",type:"info"},{default:u(()=>[b(a(l.$t("expired")),1)]),_:1})):(c(),p(s,{key:1,class:"progress tag",size:"small",type:"info"},{default:u(()=>[b(a(l.$t("dayLeft",{day:d(Z)(d(I).unix(e.unlockDate).toDate())})),1)]),_:1}))])])]),t("li",null,[t("div",Te,a(l.$t("lockUser")),1),t("div",Ce,[m(N,{smallText:d(B)(e.owner),text:e.owner},null,8,["smallText","text"])])])])):_("",!0),w.value&&d(L).walletAddress&&e.owner.toLowerCase()==d(L).walletAddress.toLowerCase()?(c(),g("div",De,[e.isExpired?_("",!0):(c(),p(T,{key:0,class:"btn",text:"",bg:"",type:"primary",onClick:o[0]||(o[0]=i=>D.value=!0)},{icon:u(()=>[m(r,{style:{"font-size":"16px"}},{default:u(()=>[m(k)]),_:1})]),default:u(()=>[b(" "+a(l.$t("edit")),1)]),_:1})),e.isExpired?(c(),p(T,{key:1,class:"btn",text:"",bg:"",type:"primary",onClick:o[1]||(o[1]=i=>C.value=!0)},{icon:u(()=>[m(r,null,{default:u(()=>[m(f)]),_:1})]),default:u(()=>[b(" "+a(l.$t("withdraw")),1)]),_:1})):_("",!0),m(T,{class:"btn",text:"",bg:"",type:"primary",onClick:o[2]||(o[2]=i=>V.value=!0)},{icon:u(()=>[m(r,null,{default:u(()=>[m(h)]),_:1})]),default:u(()=>[b(" "+a(l.$t("transfer")),1)]),_:1})])):_("",!0)])),[[x,!w.value]])]),C.value?(c(),p(ee,{key:0,onOperateSuccess:$,modelValue:C.value,"onUpdate:modelValue":o[3]||(o[3]=i=>C.value=i),lockId:e.id,isLockV2:n.tokenType!=="lpTokenV3",isLpToken:n.tokenType!=="token",unlockDate:e.unlockDate,tokenList:e.tokenList,symbol:e.symbol,address:e.address,amountString:e.amountString,chain:e.chain,decimals:e.decimals},null,8,["modelValue","lockId","isLockV2","isLpToken","unlockDate","tokenList","symbol","address","amountString","chain","decimals"])):_("",!0),D.value?(c(),p(te,{key:1,onOperateSuccess:$,modelValue:D.value,"onUpdate:modelValue":o[4]||(o[4]=i=>D.value=i),lockId:e.id,isLockV2:n.tokenType!=="lpTokenV3",isLpToken:n.tokenType!=="token",unlockDate:e.unlockDate,tokenList:e.tokenList,symbol:e.symbol,address:e.address,amountString:e.amountString,chain:e.chain,decimals:e.decimals},null,8,["modelValue","lockId","isLockV2","isLpToken","unlockDate","tokenList","symbol","address","amountString","chain","decimals"])):_("",!0),V.value?(c(),p(oe,{key:2,onOperateSuccess:$,modelValue:V.value,"onUpdate:modelValue":o[5]||(o[5]=i=>V.value=i),lockId:e.id,isLockV2:n.tokenType!=="lpTokenV3",isLpToken:n.tokenType!=="token",unlockDate:e.unlockDate,tokenList:e.tokenList,symbol:e.symbol,address:e.address,amountString:e.amountString,chain:e.chain,decimals:e.decimals},null,8,["modelValue","lockId","isLockV2","isLpToken","unlockDate","tokenList","symbol","address","amountString","chain","decimals"])):_("",!0)],64)}}},Oe=H(Ve,[["__scopeId","data-v-d8ff4917"]]);export{Oe as default};
