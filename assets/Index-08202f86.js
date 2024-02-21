/* empty css                                                          */import{_ as R,u as W,i as j,j as g,e as C,o as h,c as M,f as t,t as c,A,l as k,q as D,z as H,h as L,x as G,F as z,D as O,b as r,E as m,M as T,a9 as X,y as K,B as Y,k as ee}from"./index-37ed4678.js";import{_ as q}from"./OperateSuccessDialog-0ab4b3cd.js";import{e as Z}from"./ethers-bed9c98e.js";import{S as te}from"./SelectLockDate-dc2de821.js";/* empty css                                                                */import{D as J}from"./DoubleToken-c144cc3c.js";import{b as U,a as Q,f as ae}from"./units-634f08db.js";const oe={class:"info"},le={class:"key"},se={class:"value"},ne={class:"key"},ce={class:"value"},ie={class:"key"},re={class:"value"},ue={class:"key"},de={class:"value"},ke={class:"dlg-bottom"},me={__name:"Unlock",props:{lockId:{type:String,default:""},isLockV2:{type:Boolean,default:!1},isLpToken:{type:Boolean,default:!1},unlockDate:Number,tokenList:Array,symbol:{type:String,default:""},address:{type:String,default:""},amountString:{type:String,default:""},chain:{type:String,default:""},decimals:{type:Number,default:18}},emits:["close","operateSuccess"],setup(y,{emit:u}){const e=y,o=W(),{t:n}=j(),a=g(0n),p=g(0),i=g(!1),I=g("");async function x(){const s=await r.wallet.metamask.getGasPrice(),l=await r.wallet.metamask.getBalance(o.walletAddress);console.log("balance",l);let d;if(e.isLockV2){const S=await r.wallet.metamask.contractTokenLockV2(o.lock.tokenLockV2Address);a.value=await S.withdrawFee(),l<a.value&&m.error(n("balanceSlow2",{chainMianCoin:o.nativeCurrencySymbol,amount:U(a.value)})),d=await S.unlock.estimateGas(e.lockId,{value:a.value})}else{const S=await r.wallet.metamask.contractTokenLockV3(o.lock.tokenLockV3Address);a.value=await S.withdrawFee(),l<a.value&&m.error(n("balanceSlow2",{chainMianCoin:o.nativeCurrencySymbol,amount:U(a.value)})),d=await S.unlock.estimateGas(e.lockId,{value:a.value})}console.dir(d),p.value=U(d*s).toString(),console.log(p.value)}async function B(){const s=O.service({lock:!0,text:"Loading..."});if(e.isLockV2)try{const l=await r.wallet.metamask.contractTokenLockV2(o.lock.tokenLockV2Address);a.value=await l.withdrawFee();let d=await l.unlock(e.lockId,{value:a.value});console.dir(d),I.value=d.hash,i.value=!0,await d.wait(),u("operateSuccess")}catch(l){let d=r.wallet.metamask.parseError(l);m.error(n(d)),console.log(l)}finally{s.close()}else try{const l=await r.wallet.metamask.contractTokenLockV3(o.lock.tokenLockV3Address);a.value=await l.withdrawFee();let d=await l.unlock(e.lockId,{value:a.value});console.dir(d),I.value=d.hash,i.value=!0,await d.wait(),u("operateSuccess")}catch(l){let d=r.wallet.metamask.parseError(l);m.error(n(d)),console.log(l)}finally{s.close()}}async function E(){if(!o.isConnecting){m.error(n("pleaseConnectWallet")),_();return}const s=O.service({lock:!0,text:"Loading..."});try{await x()}catch(l){console.log(l)}finally{s.close()}}function _(){u("close")}return E(),(s,l)=>{const d=C("icon-text"),S=C("el-button");return h(),M(z,null,[t("ul",oe,[t("li",null,[t("div",le,c(s.$t("withdrawAssets")),1),t("div",se,[e.isLpToken?(h(),A(J,{key:0,class:"token-icon-20 image",token1:k(D)(e.chain,e.tokenList[0].address),token2:k(D)(e.chain,e.tokenList[1].address)},null,8,["token1","token2"])):(h(),A(d,{key:1,icon:k(D)(e.chain,e.address),text:e.symbol},null,8,["icon","text"]))])]),t("li",null,[t("div",ne,c(s.$t("withdrawNumber")),1),t("div",ce,[t("span",null,c(s.$t("toBeWithdrawNumber")+": "),1),H(c(y.amountString),1)])]),t("li",null,[t("div",ie,c(s.$t("withdrawFee")),1),t("div",re,c(`${a.value?k(Z).formatEther(a.value):"--"}
                            ${k(o).nativeCurrencySymbol}`),1)]),t("li",null,[t("div",ue,c(s.$t("gas")),1),t("div",de,c(`${p.value?p.value:"--"} ${k(o).nativeCurrencySymbol}`),1)])]),t("div",ke,[L(S,{class:"btn-gradient btn-block",block:"",onClick:B},{default:G(()=>[H(c(s.$t("withdraw")),1)]),_:1})]),L(q,{modelValue:i.value,"onUpdate:modelValue":l[0]||(l[0]=F=>i.value=F),txHash:s.lockTxHash,onClose:_},null,8,["modelValue","txHash"])],64)}}},pe=R(me,[["__scopeId","data-v-1034d84e"]]),Ze={__name:"Index",props:{modelValue:{type:Boolean,default:!1},lockId:{type:String,default:""},isLockV2:{type:Boolean,default:!1},isLpToken:{type:Boolean,default:!1},unlockDate:Number,tokenList:Array,symbol:{type:String,default:""},address:{type:String,default:""},amountString:{type:String,default:""},chain:{type:String,default:""},decimals:{type:Number,default:18}},emits:["update:model-value","operateSuccess"],setup(y,{emit:u}){const e=y;function o(){u("update:model-value",!1)}function n(){u("operateSuccess")}return(a,p)=>{const i=C("el-dialog");return h(),A(i,{"model-value":e.modelValue,title:a.$t("withdrawAssets"),class:"dlg","destroy-on-close":"",onClose:o},{default:G(()=>[L(pe,{lockId:e.lockId,isLockV2:e.isLockV2,isLpToken:e.isLpToken,unlockDate:e.unlockDate,tokenList:e.tokenList,symbol:e.symbol,address:y.address,amountString:e.amountString,chain:e.chain,decimals:e.decimals,onClose:o,onOperateSuccess:n},null,8,["lockId","isLockV2","isLpToken","unlockDate","tokenList","symbol","address","amountString","chain","decimals"])]),_:1},8,["model-value","title"])}}};const fe={key:0,class:"info"},ve={class:"key"},ye={class:"value"},_e={class:"key"},ge={class:"value"},we={class:"blue-font"},he={class:"key"},Le={class:"value"},Se={class:"key"},be={class:"value"},Ve={class:"select-date"},Ce={class:"key"},$e={class:"value"},Te={key:1,class:"change-amount"},De={class:"key"},Ae={class:"value"},Ie={class:"dlg-bottom"},xe={__name:"Edit",props:{lockId:{type:String,default:""},isLockV2:{type:Boolean,default:!1},isLpToken:{type:Boolean,default:!1},unlockDate:Number,tokenList:Array,symbol:{type:String,default:""},address:{type:String,default:""},amountString:{type:String,default:""},chain:{type:String,default:""},decimals:{type:Number,default:18}},emits:["close","operateSuccess"],setup(y,{emit:u}){const e=y,o=W(),{t:n}=j(),a=g(0n),p=g(T.unix(e.unlockDate).toDate()),i=g(e.amountString),I=g(""),x=g(""),B=g(!1),E=g("");async function _(){const v=await(await r.wallet.metamask.contractERC20(e.address)).balanceOf(o.walletAddress);I.value=ae(v,e.decimals),console.log("value:"+I.value),v==0n&&(m.error(n("balanceSlow")),u("error"))}async function s(){console.log("estimateGas");const f=T.unix(e.unlockDate).add(1,"day").unix(),v=await r.wallet.metamask.getGasPrice(),b=await r.wallet.metamask.getBalance(o.walletAddress);console.log("balance",b);let w;if(e.isLockV2){const V=await r.wallet.metamask.contractTokenLockV2(o.lock.tokenLockV2Address),N=await(await r.wallet.metamask.contractERC20(e.address)).decimals(),P=Q(e.amountString,N);a.value=await V.editFee(),b<a.value&&m.error(n("balanceSlow2",{chainMianCoin:o.nativeCurrencySymbol,amount:U(a.value)})),w=await V.editLock.estimateGas(e.lockId,P.toString(),f,{value:a.value})}else{const V=await r.wallet.metamask.contractTokenLockV3(o.lock.tokenLockV3Address);a.value=await V.editFee(),b<a.value&&m.error(n("balanceSlow2",{chainMianCoin:o.nativeCurrencySymbol,amount:U(a.value)})),w=await V.editLock.estimateGas(e.lockId,f,{value:a.value})}console.dir(w),x.value=U(w*v).toString(),console.log(x.value)}function l(){console.log(i.value),(Y(i.value).lt(e.amountString)||!i.value)&&(i.value=e.amountString)}async function d(){if(!p.value){m.error(n("selectUnlockTime"));return}if(Y(i.value).lt(e.amountString)||!i.value){m.error(n("newLockedAmountLimit"));return}if(Y(i.value).minus(e.amountString).gt(Y(I.value))){m.error(e.symbol+n("balanceSlow"));return}const f=O.service({lock:!0,text:"Loading..."}),v=T(p.value).unix();if(e.isLockV2){const b=await r.wallet.metamask.contractTokenLockV2(o.lock.tokenLockV2Address),V=await(await r.wallet.metamask.contractERC20(e.address)).decimals(),$=Q(i.value,V);console.log($);try{a.value=await b.editFee();let N=await b.editLock(e.lockId.toString(),$.toString(),v,{value:a.value});console.dir(N),E.value=N.hash,B.value=!0,await N.wait(),u("operateSuccess")}catch(N){let P=r.wallet.metamask.parseError(N);m.error(n(P)),console.log(N)}finally{f.close()}}else{const b=await r.wallet.metamask.contractTokenLockV3(o.lock.tokenLockV3Address);try{a.value=await b.editFee();let w=await b.editLock(e.lockId.toString(),v,{value:a.value});console.dir(w),E.value=w.hash,B.value=!0,await w.wait(),u("operateSuccess")}catch(w){let V=r.wallet.metamask.parseError(w);m.error(n(V)),console.log(w)}finally{f.close()}}}async function S(){if(!o.isConnecting){m.error(n("pleaseConnectWallet")),u("close");return}const f=O.service({lock:!0,text:"Loading..."});try{p.value=T.unix(e.unlockDate).add(1,"day").endOf("day").toDate(),await _(),await s()}catch(v){console.log(v)}finally{f.close()}}function F(){u("close")}return S(),(f,v)=>{const b=C("icon-text"),w=C("el-input"),V=C("el-button");return h(),M(z,null,[e.chain?(h(),M("ul",fe,[t("li",null,[t("div",ve,c(f.$t("lockAssets")),1),t("div",ye,[e.isLpToken?(h(),A(J,{key:0,class:"token-icon-20 image",token1:k(D)(e.chain,e.tokenList[0].address),token2:k(D)(e.chain,e.tokenList[1].address)},null,8,["token1","token2"])):(h(),A(b,{key:1,icon:k(D)(e.chain,e.address),text:e.symbol},null,8,["icon","text"]))])]),t("li",null,[t("div",_e,c(f.$t("unlockTime")),1),t("div",ge,[t("span",null,c(k(T).unix(e.unlockDate).format("YYYY-MM-DD HH:mm:ss")),1),t("span",null,[H("("),t("span",we,c(f.$t("dayLeft",{day:k(X)(k(T).unix(e.unlockDate).toDate())})),1),H(")")])])]),t("li",null,[t("div",he,c(f.$t("editFee")),1),t("div",Le,c(`${a.value?k(Z).formatEther(a.value):"--"} ${k(o).nativeCurrencySymbol}`),1)]),t("li",null,[t("div",Se,c(f.$t("gas")),1),t("div",be,c(`${x.value?x.value:"--"} ${k(o).nativeCurrencySymbol}`),1)])])):K("",!0),t("div",Ve,[t("div",Ce,c(f.$t("setDelayDate")),1),t("div",$e,[L(te,{modelValue:p.value,"onUpdate:modelValue":v[0]||(v[0]=$=>p.value=$),"min-date":k(T).unix(e.unlockDate).add(1,"day").endOf("day").toDate()},null,8,["modelValue","min-date"])])]),e.isLockV2?(h(),M("div",Te,[t("div",De,c(f.$t("newLockedAmount")),1),t("div",Ae,[L(w,{size:"large",type:"number",modelValue:i.value,"onUpdate:modelValue":v[1]||(v[1]=$=>i.value=$),onBlur:l,placeholder:f.$t("pleaseEnter"),clearable:""},null,8,["modelValue","placeholder"])])])):K("",!0),t("div",Ie,[L(V,{class:"btn-gradient btn-block",block:"",onClick:d},{default:G(()=>[H(c(f.$t("confirmAndLock")),1)]),_:1})]),L(q,{modelValue:B.value,"onUpdate:modelValue":v[2]||(v[2]=$=>B.value=$),txHash:E.value,onClose:F},null,8,["modelValue","txHash"])],64)}}},Be=R(xe,[["__scopeId","data-v-9f11b17f"]]),et={__name:"Index",props:{modelValue:{type:Boolean,default:!1},lockId:{type:String,default:""},isLockV2:{type:Boolean,default:!1},isLpToken:{type:Boolean,default:!1},unlockDate:Number,tokenList:Array,symbol:{type:String,default:""},address:{type:String,default:""},amountString:{type:String,default:""},chain:{type:String,default:""},decimals:{type:Number,default:18}},emits:["update:model-value","operateSuccess"],setup(y,{emit:u}){const e=y;function o(){u("update:model-value",!1)}function n(){u("operateSuccess")}return(a,p)=>{const i=C("el-dialog");return h(),A(i,{"model-value":e.modelValue,title:a.$t("editLock"),class:"dlg","destroy-on-close":"",onClose:o},{default:G(()=>[L(Be,{lockId:e.lockId,isLockV2:e.isLockV2,isLpToken:e.isLpToken,unlockDate:e.unlockDate,tokenList:e.tokenList,symbol:e.symbol,address:y.address,amountString:e.amountString,chain:e.chain,decimals:e.decimals,onClose:o,onOperateSuccess:n},null,8,["lockId","isLockV2","isLpToken","unlockDate","tokenList","symbol","address","amountString","chain","decimals"])]),_:1},8,["model-value","title"])}}};const Ee={class:"info"},Ne={class:"key"},He={class:"value"},Fe={class:"key"},Ue={class:"value"},Ge={class:"blue-font"},Me={class:"transfer-address"},Oe={class:"owner-address"},Ye={class:"dlg-bottom"},Pe={__name:"Transfer",props:{lockId:{type:String,default:""},isLockV2:{type:Boolean,default:!1},isLpToken:{type:Boolean,default:!1},unlockDate:Number,tokenList:Array,symbol:{type:String,default:""},address:{type:String,default:""},amountString:{type:String,default:""},chain:{type:String,default:""},decimals:{type:Number,default:18}},emits:["close","operateSuccess"],setup(y,{emit:u}){const e=y,o=W(),{t:n}=j(),a=g("");g(0);const p=g(!1),i=g("");function I(){a.value=a.value.trim()}async function x(){if(!ee(a.value))return m.error(n("pleaseEnterTrueAddress")),!1;if(a.value.toLowerCase()==o.walletAddress.toLowerCase())return m.error(n("transferConsistentOwner")),!1;const _=O.service({lock:!0,text:"Loading..."});if(e.isLockV2)try{let l=await(await r.wallet.metamask.contractTokenLockV2(o.lock.tokenLockV2Address)).transferLockOwnership(e.lockId,a.value);console.dir(l),i.value=l.hash,p.value=!0,await l.wait(),u("operateSuccess")}catch(s){let l=r.wallet.metamask.parseError(s);m.error(n(l)),console.log(s)}finally{_.close()}else try{let l=await(await r.wallet.metamask.contractTokenLockV3(o.lock.tokenLockV3Address)).transferLockOwnership(e.lockId,a.value);console.dir(l),i.value=l.hash,p.value=!0,await l.wait(),u("operateSuccess")}catch(s){let l=r.wallet.metamask.parseError(s);m.error(n(l)),console.log(s)}finally{_.close()}}async function B(){if(!o.isConnecting){m.error(n("pleaseConnectWallet")),E();return}}function E(){u("close")}return B(),(_,s)=>{const l=C("icon-text"),d=C("el-input"),S=C("el-button");return h(),M(z,null,[t("ul",Ee,[t("li",null,[t("div",Ne,c(_.$t("withdrawAssets")),1),t("div",He,[e.isLpToken?(h(),A(J,{key:0,class:"token-icon-20 image",token1:k(D)(e.chain,e.tokenList[0].address),token2:k(D)(e.chain,e.tokenList[1].address)},null,8,["token1","token2"])):(h(),A(l,{key:1,icon:k(D)(e.chain,e.address),text:e.symbol},null,8,["icon","text"]))])]),t("li",null,[t("div",Fe,c(_.$t("unlockTime")),1),t("div",Ue,[t("span",null,c(k(T).unix(e.unlockDate).format("YYYY-MM-DD HH:mm:ss")),1),t("span",null,[H("("),t("span",Ge,c(_.$t("dayLeft",{day:k(X)(k(T).unix(e.unlockDate).toDate())})),1),H(")")])])]),t("li",Me,[t("div",null,c(_.$t("transferLockedTo")),1),t("div",Oe,[L(d,{modelValue:a.value,"onUpdate:modelValue":s[0]||(s[0]=F=>a.value=F),onBlur:I,placeholder:_.$t("enterReceivingAddress"),class:"ipt"},null,8,["modelValue","placeholder"])])])]),t("div",Ye,[L(S,{class:"btn-gradient btn-block",block:"",onClick:x},{default:G(()=>[H(c(_.$t("confirmTransfer")),1)]),_:1})]),L(q,{modelValue:p.value,"onUpdate:modelValue":s[1]||(s[1]=F=>p.value=F),txHash:_.lockTxHash,onClose:E},null,8,["modelValue","txHash"])],64)}}},Re=R(Pe,[["__scopeId","data-v-8e189da6"]]),tt={__name:"Index",props:{modelValue:{type:Boolean,default:!1},lockId:{type:String,default:""},isLockV2:{type:Boolean,default:!1},isLpToken:{type:Boolean,default:!1},unlockDate:Number,tokenList:Array,symbol:{type:String,default:""},address:{type:String,default:""},amountString:{type:String,default:""},chain:{type:String,default:""},decimals:{type:Number,default:18}},emits:["update:model-value","operateSuccess"],setup(y,{emit:u}){const e=y;function o(){u("update:model-value",!1)}function n(){u("operateSuccess")}return(a,p)=>{const i=C("el-dialog");return h(),A(i,{"model-value":e.modelValue,title:a.$t("editLock"),class:"dlg","destroy-on-close":"",onClose:o},{default:G(()=>[L(Re,{lockId:e.lockId,isLockV2:e.isLockV2,isLpToken:e.isLpToken,unlockDate:e.unlockDate,tokenList:e.tokenList,symbol:e.symbol,address:y.address,amountString:e.amountString,chain:e.chain,decimals:e.decimals,onClose:o,onOperateSuccess:n},null,8,["lockId","isLockV2","isLpToken","unlockDate","tokenList","symbol","address","amountString","chain","decimals"])]),_:1},8,["model-value","title"])}}};export{Ze as _,tt as a,et as b};