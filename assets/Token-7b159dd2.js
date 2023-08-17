import{_ as J,g as Q,h as X,i as d,x as Z,w as j,j as se,k as v,b as I,o as _,c as A,f,d as e,F as U,e as ee,l as w,m as ne,t as l,p as ce,q as ie,E as h,s as re,I as W,v as ue,y as $,B as x,z as de,A as T,a1 as me,D as ve}from"./index-1bebee79.js";import{I as ke}from"./InputLockNumber-5e2a5989.js";import{S as fe}from"./SelectLockDate-48e247f4.js";import{_ as _e}from"./OperateSuccessDialog-e4956a65.js";import{T as he}from"./TokenIcon-6cd22654.js";import{f as pe,a as K,b as we}from"./units-bc6c6fc9.js";/* empty css                                                                *//* empty css                                                          */const ge={class:"token-list"},ye=["onClick"],Ce={class:"item-left"},be={class:"item-info"},$e={class:"up"},Le={class:"down"},Ie={class:"item-right item-info"},Ae={class:"up"},Te={class:"down"},Se={__name:"SelectToken",emits:["select"],setup(te,{emit:k}){const{t:c}=Q(),g=X(),m=d(""),o=d([]),y=d([]),S=Z.chainList.filter(n=>!!n.lock),C=d(S.find(n=>n.chainId==g.chainId)?S.find(n=>n.chainId==g.chainId):S[0]);j(()=>[m.value,o.value],async()=>{y.value=await L()});async function L(){if(console.log("searchTokenListWatch",o.value),m.value)if(m.value.startsWith("0x")){let n=o.value.filter(i=>i.address.toLowerCase()==m.value.toLowerCase());if(n.length==0&&se(m.value)){let i=await v.wallet.metamask.contractERC20(m.value);const a=m.value.toLowerCase(),u=await i.balanceOf(g.walletAddress),O=await i.decimals(),Y=await i.name(),z=await i.symbol();let F={address:a,amount:Number(pe(u.toString(),O)),chain:g.chain,nativeCurrencySymbol:g.nativeCurrencySymbol,decimals:Number(O),icon:`https://ave.s3.ap-east-1.amazonaws.com/token_icon/${g.chain}/${a}.png`,name:Y,price:0,symbol:z,tokenId:`${a}-${g.chain}`,tokenType:0};n.push(F)}return n}else return o.value.filter(n=>n.symbol.toLowerCase().indexOf(m.value.toLowerCase())>-1);else return o.value}async function V(){let n=[];try{const i=await v.debank.getTokenList(g.walletAddress,C.value.chain);for(let a of i.data.data){if(a.token=="0xeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee"){a.token=v.wallet.MAIN_COIN_ADDRESS;continue}if(new RegExp("^0x.*$","gi").test(a.token)&&a.value>0&&a.risk_score<60&&a.risk_level>=0&&a.flag!=="blacklist"&&a.symbol!==""){if(a.token=="0xc748673057861a797275cd8a068abb95a902e8de")continue;a.flag!="lp"&&n.push({address:a.token.toLowerCase(),tokenId:`${a.token}-${a.chain}`.toLowerCase(),chain:a.chain.toLowerCase(),symbol:a.symbol,decimals:a.decimals,icon:ie(a.chain.toLowerCase(),a.token.toLowerCase()),amount:a.value,price:a.current_price_usd,tokenType:0,nativeCurrencySymbol:C.value.nativeCurrency.symbol,name:a.name})}}}catch(i){i&&i.message?h.error(i.message):h.error(c("unknowError")),n=[]}finally{}o.value=n}return V(),(n,i)=>{const a=I("el-input");return _(),A(U,null,[f(a,{modelValue:m.value,"onUpdate:modelValue":i[0]||(i[0]=u=>m.value=u),placeholder:"Please input"},null,8,["modelValue"]),e("ul",ge,[(_(!0),A(U,null,ee(y.value,u=>(_(),A("li",{onClick:()=>k("select",u)},[e("div",Ce,[f(he,{class:"token-icon-30",bigIcon:u.icon,smallIcon:w(ne)(u.chain)},null,8,["bigIcon","smallIcon"]),e("div",be,[e("div",$e,l(u.symbol.toUpperCase()),1),e("div",Le,l(u.address==w(v).wallet.MAIN_COIN_ADDRESS?" ":w(ce)(u.address,8)),1)])]),e("div",Ie,[e("div",Ae,l(u.amount),1),e("div",Te,l(u.price?`$ ${u.price}`:" "),1)])],8,ye))),256))])],64)}}},Ve=J(Se,[["__scopeId","data-v-8a9ee926"]]);const De={class:"form"},Ee={class:"form-item"},Ne={class:"form-item-title"},xe={class:"form-item-value"},Ue=["src"],Oe={class:"form-item"},Me={class:"form-item-title"},Be={class:"form-item-value"},Re={key:1,class:"placeholder"},We={class:"form-item"},Ye={class:"form-item-title"},ze={class:"title-note"},Fe={class:"form-item-value"},Ge={class:"form-item"},He={class:"form-item-title"},Pe={class:"form-item-value"},je={class:"form-bottom"},qe={class:"form-bottom-btns"},Ke={class:"dlg-item"},Je={class:"key"},Qe={class:"value"},Xe={class:"key"},Ze={class:"value"},et={class:"key"},tt={class:"value"},at={class:"key"},ot={class:"value"},lt={class:"key"},st={class:"value"},nt={class:"tips"},ct={class:"dlg-bottom"},it={__name:"Token",setup(te){const{t:k}=Q(),c=X(),g=re(),m=d(!1),o=d(null),y=d(""),S=W().add(1,"day").endOf("day").toDate(),C=d(S),L=d(!1),V=d(!1),n=d(null),i=d(""),a=Z.chainList.filter(t=>!!t.create);j(()=>c.isConnecting,t=>{console.log(t),t&&a.some(s=>s.chainId==c.chainId)&&n.value!=c.chainId&&(n.value=c.chainId,o.value=null)},{immediate:!0});const u=ue(()=>n.value?a.find(t=>t.chainId==n.value):null);async function O(t){if(c.isConnecting){if(c.walletType=="metamask"){let s=a.find(b=>b.chainId==t);await v.wallet.metamask.switchNetwork(s)}}else h.error(k("pleaseConnectWallet"))}j(()=>[o.value],async()=>{y.value="",o.value?await q():L.value=!1});function Y(t){o.value=t,m.value=!1}function z(){if(!c.isConnecting){h.error(k("pleaseConnectWallet"));return}if(!n.value){h.error(k("pleaseSelectChain"));return}m.value=!0}async function F(){V.value=!0;try{let t=await v.wallet.metamask.approveMaxAmount(o.value.address,c.lock.tokenLockV2Address);console.log(t),await t.wait(),L.value=!1}catch(t){console.log(t);let s=v.wallet.metamask.parseError(t);h.error(k(s))}finally{V.value=!1}}const G=d(!1),H=d(""),M=d(!1);async function q(){if(!o.value)return;if(o.value.address==v.wallet.MAIN_COIN_ADDRESS){L.value=!1;return}await v.wallet.metamask.isAllowanceEnough(c.lock.tokenLockV2Address,o.value.address,c.walletAddress)?L.value=!1:L.value=!0}async function ae(){G.value=!0,H.value="";try{if(!o.value){h.error(k("pleaseSelectToken"));return}if(!y.value){h.error(k("enterAmount"));return}if(!C.value){h.error(k("selectUnlockTime"));return}if(o.value.chain!==c.chain){h.error(k("networkNotMatch"));return}if(await q(),L.value){h.error(k("approveFirst"));return}await oe()}catch(t){console.log(t)}finally{G.value=!1}}async function oe(){const t=await v.wallet.metamask.getGasPrice();let s;const b=W(C.value).endOf("day").unix(),D=o.value.address,E=await(await v.wallet.metamask.contractERC20(D)).decimals(),N=K(y.value,E);s=await(await v.wallet.metamask.contractTokenLockV2(c.lock.tokenLockV2Address)).lock.estimateGas(c.walletAddress,D,!1,N.toString(),b,""),console.dir(s),i.value=we(s*t),M.value=!0}const P=d(!1);async function le(){const t=ve.service({lock:!0,text:k("upChainNow")}),s=W(C.value).endOf("day").unix(),b=o.value.address,B=await(await v.wallet.metamask.contractERC20(b)).decimals(),E=K(y.value,B),N=await v.wallet.metamask.contractTokenLockV2(c.lock.tokenLockV2Address);try{let p=await N.lock(c.walletAddress,b,!1,E.toString(),s,"");console.dir(p),H.value=p.hash,P.value=!0,M.value=!1}catch(p){let R=v.wallet.metamask.parseError(p);h.error(k(R)),console.log(p)}finally{t.close()}}return(t,s)=>{const b=I("icon-text"),D=I("el-option"),B=I("el-select"),E=I("ArrowDownBold"),N=I("el-icon"),p=I("el-button"),R=I("el-dialog");return _(),A(U,null,[e("div",De,[e("div",Ee,[e("div",Ne,l(t.$t("selectChain")),1),e("div",xe,[f(B,{"model-value":n.value,placeholder:t.$t("pleaseSelectChain"),class:"block",size:"large",onChange:O},{prefix:$(()=>[u.value?(_(),A("img",{key:0,class:"select-icon",src:u.value.chainIcon,alt:""},null,8,Ue)):de("",!0)]),default:$(()=>[(_(!0),A(U,null,ee(w(a),r=>(_(),x(D,{key:r.chainId,label:r.chainShow,value:r.chainId,class:"select-option"},{default:$(()=>[f(b,{icon:r.chainIcon,text:r.chainShow},null,8,["icon","text"])]),_:2},1032,["label","value"]))),128))]),_:1},8,["model-value","placeholder"])])]),e("div",Oe,[e("div",Me,l(t.$t("selectToken")),1),e("div",Be,[e("div",{class:"select",onClick:z},[o.value?(_(),x(b,{key:0,icon:o.value.icon,text:o.value.symbol},null,8,["icon","text"])):(_(),A("div",Re,l(t.$t("pleaseSelectToken1")),1)),f(N,null,{default:$(()=>[f(E)]),_:1})])])]),e("div",We,[e("div",Ye,[e("div",null,l(w(k)("setNumberOfLock")),1),e("div",ze,l(t.$t("balance"))+": "+l(o.value?o.value.amount:"- -"),1)]),e("div",Fe,[f(ke,{amount:y.value,"onUpdate:amount":s[0]||(s[0]=r=>y.value=r),total:o.value?o.value.amount:"0",decimals:o.value?o.value.decimals:18},null,8,["amount","total","decimals"])])]),e("div",Ge,[e("div",He,l(t.$t("setDate")),1),e("div",Pe,[f(fe,{modelValue:C.value,"onUpdate:modelValue":s[1]||(s[1]=r=>C.value=r)},null,8,["modelValue"])])]),e("div",je,[e("div",qe,[w(c).isConnecting?(_(),A(U,{key:0},[L.value?(_(),x(p,{key:0,class:"btn-gradient",onClick:F,loading:V.value},{default:$(()=>[T("Approve")]),_:1},8,["loading"])):(_(),x(p,{key:1,class:"btn-gradient",onClick:ae,loading:G.value},{default:$(()=>[T(l(t.$t("oneKeyLock")),1)]),_:1},8,["loading"]))],64)):(_(),x(p,{key:1,class:"btn btn-gradient",onClick:s[2]||(s[2]=()=>w(g).loginDialogVisible=!0)},{default:$(()=>[T(l(t.$t("connectWallet")),1)]),_:1}))])])]),f(R,{modelValue:m.value,"onUpdate:modelValue":s[4]||(s[4]=r=>m.value=r),title:t.$t("selectToken"),class:"dlg dlg-select-token","destroy-on-close":""},{default:$(()=>[f(Ve,{onSelect:s[3]||(s[3]=r=>Y(r))})]),_:1},8,["modelValue","title"]),f(R,{modelValue:M.value,"onUpdate:modelValue":s[5]||(s[5]=r=>M.value=r),title:t.$t("lockConfirm"),class:"dlg dlg-lock-confirm"},{default:$(()=>[e("ul",Ke,[e("li",null,[e("div",Je,l(t.$t("lockAssets")),1),e("div",Qe,[f(b,{icon:o.value.icon,text:o.value.symbol},null,8,["icon","text"])])]),e("li",null,[e("div",Xe,l(t.$t("lockNumber")),1),e("div",Ze,l(y.value),1)]),e("li",null,[e("div",et,l(t.$t("contractChian")),1),e("div",tt,l(w(c).chain),1)]),e("li",null,[e("div",at,l(t.$t("unlockTime")),1),e("div",ot,[T(l(w(W)(C.value).format("YYYY-MM-DD"))+"(",1),e("span",null,l(t.$t("dayLeft",{day:w(me)(C.value)})),1),T(")")])]),e("li",null,[e("div",lt,l(t.$t("gas")),1),e("div",st,l(`${i.value} ${w(c).nativeCurrencySymbol}`),1)])]),e("div",nt,[e("p",null,"*"+l(t.$t("attention")),1),e("p",null,l(t.$t("createTips1")),1),e("p",null,l(t.$t("createTips2")),1),e("p",null,l(t.$t("createTips3")),1)]),e("div",ct,[f(p,{class:"btn-gradient btn-block",onClick:le},{default:$(()=>[T(l(t.$t("confirmAndLock")),1)]),_:1})])]),_:1},8,["modelValue","title"]),f(_e,{modelValue:P.value,"onUpdate:modelValue":s[6]||(s[6]=r=>P.value=r),txHash:H.value},null,8,["modelValue","txHash"])],64)}}},ht=J(it,[["__scopeId","data-v-2aa0cf27"]]);export{ht as default};
