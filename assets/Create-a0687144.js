import{_ as Se,h as Ve,i as Te,r as v,w as ol,j as Ce,k as G,d as B,o as n,c as r,g as i,e,F as q,f as $e,l as g,m as nl,t,p as ge,q as We,E as _,u as il,s as ul,b as rl,v as Z,x as dl,y as b,z as k,A as I,B as W,C as f,n as fe,D as cl,G as vl}from"./index-b49da9d3.js";import{S as ml}from"./Step-2f04625d.js";import{R as ce}from"./Rate-f3bb744e.js";import{T as pl}from"./TokenIcon-e72a2230.js";import{f as Oe,p as Me,a as ae}from"./units-ed7533eb.js";/* empty css                                                          */const fl={class:"token-list"},_l=["onClick"],hl={class:"item-left"},yl={class:"item-info"},kl={class:"up"},bl={class:"down"},wl={class:"item-right item-info"},gl={class:"up"},$l={class:"down"},Cl={__name:"SelectToken",emits:["select"],setup(Ie,{emit:p}){const{t:d}=Ve(),se=Te(),A=v(""),M=v([]),ee=v([]);ol(()=>[A.value,M.value],async()=>{ee.value=await le()});async function le(){if(A.value)if(A.value.startsWith("0x")){let $=M.value.filter(h=>h.tokenAddress.toLowerCase()==A.value.toLowerCase());if($.length==0&&Ce(A.value)){let h=await G.wallet.metamask.contractERC20(A.value);const y=A.value.toLowerCase(),C=await h.balanceOf(se.walletAddress),E=await h.decimals(),u=await h.name(),S=await h.symbol();let j={chain:se.chain,decimals:Number(E),name:u,symbol:S,tokenAddress:y,currentPriceUsd:0,value:Number(Oe(C.toString(),E)),icon:`https://ave.s3.ap-east-1.amazonaws.com/token_icon/${se.chain}/${y}.png`};console.log(j),$.push(j)}return $}else return M.value.filter($=>$.symbol.toLowerCase().indexOf(A.value.toLowerCase())>-1);else return M.value}async function F(){let $=se.chain,h=[];try{let y=await G.ave.getUserToken($,se.walletAddress);if(console.log(y),y.data.status==1){let E=y.data.data.filter(u=>new RegExp("^0x.*$","gi").test(u.token)&&u.value>0&&u.risk_score<60&&u.risk_level>=0&&u.flag!=="blacklist"&&u.symbol!==""&&u.flag!=="lp"&&u.token=="0xeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee").map(u=>({chain:u.chain,demical:u.decimals,name:u.name,symbol:u.symbol,tokenAddress:u.token.toLowerCase(),currentPriceUsd:u.current_price_usd,value:u.value?u.value:0,icon:We(u.chain.toLowerCase(),u.token.toLowerCase())}));h=h.concat(E)}else return;let C=await G.ave.getSwapTokens($);if(console.log(C),C.data.status==1){let E=C.data.data.filter(u=>new RegExp("^0x.*$","gi").test(u.token)&&h.findIndex(S=>S.tokenAddress==u.token)==-1&&u.risk_score<60&&u.risk_level>=0&&u.flag!=="blacklist"&&u.symbol!==""&&u.flag!=="lp"&&u.token=="0xeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee").map(u=>({chain:u.chain,demical:u.decimals,name:u.name,symbol:u.symbol,tokenAddress:u.token.toLowerCase(),currentPriceUsd:u.current_price_usd,value:u.value?u.value:0,icon:We(u.chain.toLowerCase(),u.token.toLowerCase())}));h=h.concat(E)}else return}catch(y){y&&y.message?_.error(y.message):_.error(d("unknowError")),h=[]}finally{}M.value=h}return F(),($,h)=>{const y=B("el-input");return n(),r(q,null,[i(y,{modelValue:A.value,"onUpdate:modelValue":h[0]||(h[0]=C=>A.value=C),placeholder:$.$t("pleaseEnterTokenAddress")},null,8,["modelValue","placeholder"]),e("ul",fl,[(n(!0),r(q,null,$e(ee.value,C=>(n(),r("li",{key:C.chain,onClick:()=>p("select",C)},[e("div",hl,[i(pl,{class:"token-icon-30",bigIcon:C.icon,smallIcon:g(nl)(C.chain)},null,8,["bigIcon","smallIcon"]),e("div",yl,[e("div",kl,t(C.symbol),1),e("div",bl,t(C.tokenAddress=="0xeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee"?" ":g(ge)(C.tokenAddress,8)),1)])]),e("div",wl,[e("div",gl,t(C.value),1),e("div",$l,t(C.currentPriceUsd?`$ ${C.currentPriceUsd}`:" "),1)])],8,_l))),128))])],64)}}},Sl=Se(Cl,[["__scopeId","data-v-c8edbc7d"]]);const Vl={class:"token-list"},Tl=["onClick"],Il={__name:"SelectSwap",emits:["select"],setup(Ie,{emit:p}){const{t:d}=Ve(),se=Te(),A=v([]);async function M(){let ee=se.chain,le=[];try{let F=await G.ave.getChainSwaps(ee);if(F.data.status==1){let $=F.data.data;if($&&$.length>0)for(let h of $){let y="https://www.avestorage.cloud/swap/"+h.name+".jpeg",C={chain:h.chain,factoryAddress:h.factory_address.toLowerCase(),isSwapSupported:h.is_swap_supported,name:h.name,routerAddress:h.router_address.toLowerCase(),showName:h.show_name,sortId:h.sort_id,swapUrl:h.swap_url,swapIcon:y};le.push(C)}}else _.error(d("unknowError"))}catch(F){F&&F.message?_.error(F.message):_.error(d("unknowError"))}finally{}A.value=le}return M(),(ee,le)=>{const F=B("icon-text");return n(),r("ul",Vl,[(n(!0),r(q,null,$e(A.value,$=>(n(),r("li",{key:$,onClick:()=>p("select",$)},[i(F,{icon:$.swapIcon,text:$.showName},null,8,["icon","text"])],8,Tl))),128))])}}},Nl=Se(Il,[["__scopeId","data-v-5ce7cb32"]]);const Fl={class:"form"},Ll={class:"form-item"},Al={class:"form-item-title"},El={class:"form-item-value"},Ul=["src"],Rl={class:"form-item"},Bl={class:"form-item-title"},Pl={class:"form-item-value"},Dl={class:"deployer-list"},Wl={key:0,class:"deployer-note"},Ml={key:1,class:"deployer-note"},Ol={key:2,class:"deployer-note"},zl={key:3,class:"deployer-note"},xl={class:"form-item"},Kl={class:"form-item-title"},Hl={class:"form-item-value"},ql={class:"form-item"},Gl={class:"form-item-title"},jl={class:"form-item-value"},Ql={class:"form-item"},Jl={class:"form-item-title"},Xl={class:"form-item-value"},Yl={class:"form-item"},Zl={class:"form-item-title"},et={class:"form-item-value"},lt={key:0,class:"form-item form-item-row"},tt={class:"form-item-title"},at={class:"title-note"},st={class:"form-item-value"},ot={key:1,class:"form-item"},nt={class:"form-item-title"},it={class:"form-item-value"},ut={class:"form-bottom"},rt={key:0,class:"fee"},dt={key:0,class:"form-bottom-btns"},ct={key:1,class:"form-bottom-btns"},vt={key:2,class:"form-bottom-btns"},mt={class:"form-item"},pt={class:"form-item-title"},ft={class:"form-item-value"},_t={key:1,class:"placeholder"},ht={class:"explain"},yt={class:"form-item"},kt={class:"form-item-title"},bt={class:"form-item-value"},wt={key:1,class:"placeholder"},gt={key:0,class:"form-item"},$t={class:"form-item-title"},Ct={class:"form-item-value"},St={class:"explain"},Vt={class:"form-item"},Tt={class:"form-item-title"},It={class:"form-item-value"},Nt={class:"rate-item"},Ft={class:"rate-item-title"},Lt={class:"rate-item"},At={class:"rate-item-title"},Et={key:0,class:"rate-item"},Ut={class:"rate-item-title"},Rt={key:1,class:"rate-item"},Bt={class:"rate-item-title"},Pt={class:"form-item"},Dt={class:"form-item-title"},Wt={class:"form-item-value"},Mt={class:"rate-item"},Ot={class:"rate-item-title"},zt={class:"rate-item"},xt={class:"rate-item-title"},Kt={key:0,class:"rate-item"},Ht={class:"rate-item-title"},qt={key:1,class:"rate-item"},Gt={class:"rate-item-title"},jt={class:"form-item"},Qt={class:"form-item-title"},Jt={class:"form-item-value"},Xt={class:"rate-item"},Yt={class:"rate-item-title"},Zt={class:"holder"},ea={class:"rate-item"},la={class:"rate-item-title"},ta={class:"form-bottom"},aa={class:"form-bottom-btns"},sa={class:"form-item item-switch"},oa={class:"title"},na={class:"note"},ia={class:"form-item item-switch"},ua={class:"title"},ra={key:0,class:"note"},da={class:"form-item item-switch"},ca={class:"title"},va={class:"note"},ma={class:"form-item item-switch"},pa={class:"title"},fa={class:"note"},_a={class:"form-item item-switch"},ha={class:"title"},ya={key:0,class:"note"},ka={class:"form-item item-switch"},ba={class:"title"},wa={key:0,class:"note"},ga={class:"form-bottom"},$a={class:"form-bottom-btns"},Ca={key:3,class:"create-success"},Sa={class:"text"},Va={class:"dlg-item"},Ta={class:"key"},Ia={class:"value"},Na={class:"key"},Fa={class:"value"},La={class:"key"},Aa={class:"value"},Ea={class:"key"},Ua={class:"value"},Ra={class:"key"},Ba={class:"value"},Pa={key:0},Da={class:"key"},Wa={class:"value"},Ma={key:1},Oa={class:"key"},za={class:"value"},xa={key:2},Ka={class:"key"},Ha={class:"value"},qa={class:"key"},Ga={key:0,class:"value"},ja={key:1,class:"value"},Qa={class:"key"},Ja={key:0,class:"value"},Xa={key:1,class:"value"},Ya={class:"key"},Za={class:"value"},es={key:3},ls={class:"key"},ts={class:"value"},as={key:4},ss={class:"key"},os={class:"value"},ns={key:5},is={class:"key"},us={class:"value"},rs={class:"key"},ds={class:"value"},cs={class:"tags"},vs={key:0,class:"fee"},ms={class:"dlg-bottom"},ps={class:"content"},H=20,fs={__name:"Create",setup(Ie){const{t:p}=Ve(),d=Te(),se=il(),A=ul(),M=v(!1),ee=v(!1),le=v(!1),F=v(!1),$=v(!1),h=v(!1),y=v(0);function C(l){console.log("changeStep",l)}const E=v(""),u=v(""),S=v(18),j=v(""),_e=v(!1),O=v(null),U=v(null),he=v(""),N=v(0),ie=v(0),L=v(0),oe=v(0),P=v(0),ye=v(0),z=v(0),ve=v(0),x=v(""),ne=v(!1),te=v(!1),Q=v(""),ke=v(!1),be=v(!1),ue=v(!1),J=v(""),re=v(!1),X=v(""),ze=v(""),Ne=rl([{deployerId:0,deployerName:"freeTax"},{deployerId:1,deployerName:"feeToken"},{deployerId:2,deployerName:"selfDividendToken"},{deployerId:3,deployerName:"addPoolDividend"}]),o=v(0);function xe(l){o.value=l}const Fe=Z(()=>o.value==0?["selectTemplate","createSuccess"]:["selectTemplate","taxSetting","issueControl","createSuccess"]),Le=Z(()=>d.selectedChain&&d.selectedChain.create?d.selectedChain.create.deployerList.find(l=>l.deployerId==o.value).baseFee:0),Ke=Z(()=>o.value==1?f(H).minus(ie.value).minus(L.value).toNumber():o.value==2||o.value==3?f(H).minus(oe.value).minus(L.value).toNumber():0),He=Z(()=>o.value==1?f(H).minus(N.value).minus(ie.value).toNumber():o.value==2||o.value==3?f(H).minus(N.value).minus(oe.value).toNumber():0),qe=Z(()=>{if(o.value==1)return f(H).minus(N.value).minus(L.value).toNumber()}),Ge=Z(()=>o.value==2||o.value==3?f(H).minus(N.value).minus(L.value).toNumber():0),je=Z(()=>o.value==1?f(H).minus(ye.value).minus(z.value).toNumber():o.value==2||o.value==3?f(H).minus(ve.value).minus(z.value).toNumber():0),Qe=Z(()=>o.value==1?f(H).minus(P.value).minus(ye.value).toNumber():o.value==2||o.value==3?f(H).minus(P.value).minus(ve.value).toNumber():0),Je=Z(()=>o.value==1?f(H).minus(P.value).minus(z.value).toNumber():0),Xe=Z(()=>o.value==2||o.value==3?f(H).minus(P.value).minus(z.value).toNumber():0),Ae=dl.chainList.filter(l=>!!l.create),me=Z(()=>d.selectedChain?Ae.find(l=>l.chainId==d.selectedChain.chainId):null);async function Ye(l){console.log(l);try{await d.changeSelectedChain(l)}catch(a){console.log(a);const w=G.wallet.metamask.parseError(a);_.error(p(w))}}function Ee(){if(y.value==0){if(!Re())return}else if(y.value==1&&!Be())return;y.value=y.value+1}function Ue(){y.value=y.value-1}function Ze(l){O.value=l,ee.value=!1}function el(l){U.value=l,le.value=!1}function ll(l){l&&ne.value==!1&&(ne.value=!0)}function Re(){return E.value?u.value?j.value?S.value?!0:(_.error(p("pleaseEnterDecimals")),!1):(_.error(p("pleaseEnterTotal")),!1):(_.error(p("pleaseEnterSymbol")),!1):(_.error(p("pleaseEnterName")),!1)}function Be(){if(!O.value)return _.error(p("pleaseSelectCurrency")),!1;if(!U.value)return _.error(p("pleaseSelectSwap")),!1;if(o.value===1){if(f(N.value).plus(ie.value).plus(L.value).plus(P.value).plus(ye.value).plus(z.value).lte(0))return _.error(p("taxMustGt0")),!1}else if(o.value===2){if(f(N.value).plus(L.value).plus(P.value).plus(z.value).lte(0))return _.error(p("taxlimit2")),!1}else if(o.value===3){if(!he.value)return _.error(p("dividendTokenError")),!1;if(!Ce(he.value))return _.error(p("pleaseEnterTrueAddress")),!1;if(f(N.value).plus(L.value).plus(oe.value).plus(P.value).plus(z.value).plus(ve.value).lte(0))return _.error(p("taxMustGt0")),!1}return(Number(N.value)>0||Number(P.value)>0)&&!x.value?(_.error(p("pleaseEnterMarketingAddress")),!1):x.value&&!Ce(x.value)?(_.error(p("pleaseEnterTrueAddress")),!1):!0}function tl(){return te.value&&(!Q.value||Number(Q.value)<=0)?(_.error(p("pleaseEnterKillBlockNumber")),!1):te.value==!0&&ne.value===!1?(_.error(p("enterKillBlockNumberMust")),!1):ue.value&&(!J.value||Number(J.value)<=0)?(_.error(p("pleaseEnterMaxWalletLimit")),!1):re.value&&(!X.value||Number(X.value)<=0)?(_.error(p("pleaseEnterMaxSwapLimit")),!1):!0}async function Pe(){if(!d.isConnecting){_.error(p("pleaseConnectWallet"));return}if(d.chainId!=me.value.chainId){_.error(p("switchNetwork"));return}if(!Re()||o.value!==0&&(!Be()||!tl()))return;F.value=!0;const l=d.create.deployerList.find(T=>T.deployerId==o.value).baseFee,a=Me(l.toString()),w=await G.wallet.metamask.getBalance(d.walletAddress);if(console.log("balance",w),w<a){_.error(p("balanceSlow2",{chainMianCoin:d.nativeCurrencySymbol,amount:l})),F.value=!1;return}M.value=!0,F.value=!1}async function al(){const l=d.create.deployerList.find(a=>a.deployerId==o.value).baseFee;$.value=!0;try{const a=await G.wallet.metamask.contractTokenFactory(d.create.tokenFactoryAddress),w=[],T=[],c=[],m=[];if(o.value==0)w[0]=E.value,w[1]=u.value,c[0]=parseInt(S.value),c[1]=ae(j.value,parseInt(S.value)),m[0]=_e.value;else if(o.value==1){w[0]=E.value,w[1]=u.value;let V=O.value.tokenAddress,R=!1;V==="0xeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee"&&(V=(await(await G.wallet.metamask.contractSwap(U.value.routerAddress)).WETH()).toLowerCase(),R=!0),T[0]=V,T[1]=U.value.routerAddress,T[2]=d.walletAddress,T[3]=x.value?x.value:"0x0000000000000000000000000000000000000000",c[0]=parseInt(S.value),c[1]=ae(j.value,parseInt(S.value)),c[2]=f(N.value).times(100).toNumber(),c[3]=f(ie.value).times(100).toNumber(),c[4]=f(L.value).times(100).toNumber(),c[5]=f(P.value).times(100).toNumber(),c[6]=f(ye.value).times(100).toNumber(),c[7]=f(z.value).times(100).toNumber(),c[8]=Q.value?f(Q.value).toNumber():0,c[9]=X.value?ae(X.value,parseInt(S.value)):0n,c[10]=J.value?ae(J.value,parseInt(S.value)):0n,m[0]=_e.value,m[1]=R,m[2]=ne.value,m[3]=te.value,m[4]=re.value,m[5]=ue.value,m[6]=ke.value,m[7]=be.value}else if(o.value==2){w[0]=E.value,w[1]=u.value;let V=O.value.tokenAddress,R=!1;V==="0xeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee"&&(V=(await(await G.wallet.metamask.contractSwap(U.value.routerAddress)).WETH()).toLowerCase(),R=!0),T[0]=V,T[1]=U.value.routerAddress,T[2]=d.walletAddress,T[3]=x.value?x.value:"0x0000000000000000000000000000000000000000",c[0]=parseInt(S.value),c[1]=ae(j.value,parseInt(S.value)),c[2]=f(N.value).times(100).toNumber(),c[3]=f(oe.value).times(100).toNumber(),c[4]=f(L.value).times(100).toNumber(),c[5]=f(P.value).times(100).toNumber(),c[6]=f(ve.value).times(100).toNumber(),c[7]=f(z.value).times(100).toNumber(),c[8]=Q.value?f(Q.value).toNumber():0,c[9]=X.value?ae(X.value,parseInt(S.value)):0n,c[10]=J.value?ae(J.value,parseInt(S.value)):0n,m[0]=R,m[1]=ne.value,m[2]=te.value,m[3]=re.value,m[4]=ue.value,m[5]=ke.value,m[6]=be.value}else if(o.value==3){w[0]=E.value,w[1]=u.value;let V=O.value.tokenAddress,R=!1;V==="0xeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee"&&(V=(await(await G.wallet.metamask.contractSwap(U.value.routerAddress)).WETH()).toLowerCase(),R=!0),T[0]=V,T[1]=U.value.routerAddress,T[2]=d.walletAddress,T[3]=x.value?x.value:"0x0000000000000000000000000000000000000000",T[4]=he.value,c[0]=parseInt(S.value),c[1]=ae(j.value,parseInt(S.value)),c[2]=f(N.value).times(100).toNumber(),c[3]=f(oe.value).times(100).toNumber(),c[4]=f(L.value).times(100).toNumber(),c[5]=f(P.value).times(100).toNumber(),c[6]=f(ve.value).times(100).toNumber(),c[7]=f(z.value).times(100).toNumber(),c[8]=Q.value?f(Q.value).toNumber():0,c[9]=X.value?ae(X.value,parseInt(S.value)):0n,c[10]=J.value?ae(J.value,parseInt(S.value)):0n,m[0]=R,m[1]=ne.value,m[2]=te.value,m[3]=re.value,m[4]=ue.value,m[5]=ke.value,m[6]=be.value,m[7]=_e.value}console.log(o.value,w,T,c,m);const K=Me(l.toString()),Y=await a.tokenCreate(o.value,w,T,c,m,{value:K});console.dir(Y),ze.value=Y.hash;let de;d.chain=="core"&&(de=cl.service({lock:!0,text:p("upChainNow")})),Y.wait().then(async V=>{if(console.log("upChainSuccessfully"),console.log(V),V.status===1&&(_.success(p("upChainSuccessfully")),d.chain=="core")){de&&(de.text=p("verityContractNow")),console.log(V.logs);const R=V.logs.find(D=>D.fragment&&D.fragment.name=="TokenCreated");console.log(R);const pe=R.args[1];console.log(pe);try{const D=await G.coredao.verifysourcecode(o.value,w,T,c,m,pe);await vl(500),await G.coredao.checkverifystatus(D),_.success(p("verityContractSuccess"))}catch{_.error(p("verityContractFail"))}finally{de&&de.close()}}}),sl()}catch(a){if(console.log(JSON.stringify(a)),a.info&&a.info.error&&a.info.error.code===4001)_.error(p("userCancelOperate"));else if(a.error&&a.error.message&&a.error.message=="Canceled")_.error(p("userCancelOperate"));else if(a.data&&a.data.code==-32e3){const w=a.data.message.match(/(\d+) want (\d+)/)[2];_.error(p("balanceSlow2",{chainMianCoin:O.value.nativeCurrencySymbol,amount:Oe(w)}))}else a.code==="INSUFFICIENT_FUNDS"?_.error(p("balanceSlow")):a.info&&a.info.error&&a.info.error.code==-32603&&a.info.error.data.message.endsWith("transfer amount exceeds balance")?_.error(p("balanceSlow2",{chainMianCoin:d.nativeCurrencySymbol,amount:l})):a.code=="CALL_EXCEPTION"&&a.info.error.message.endsWith("transfer amount exceeds balance")?_.error(p("balanceSlow2",{chainMianCoin:d.nativeCurrencySymbol,amount:l})):_.error(p("unkonwError"))}finally{M.value=!1,$.value=!1}}function sl(){y.value=Fe.value.length-1}return(l,a)=>{var De;const w=B("icon-text"),T=B("el-option"),c=B("el-select"),m=B("el-button"),K=B("el-input"),Y=B("el-switch"),de=B("ArrowDownBold"),V=B("el-icon"),R=B("QuestionFilled"),pe=B("svg-icon"),D=B("el-dialog"),we=B("el-tag");return n(),r(q,null,[e("div",null,[e("div",null,[i(ml,{"step-list":Fe.value,current:y.value,onStepClick:a[0]||(a[0]=s=>C(s))},null,8,["step-list","current"])]),e("div",Fl,[y.value==0?(n(),r(q,{key:0},[e("div",Ll,[e("div",Al,t(l.$t("selectChain")),1),e("div",El,[i(c,{"model-value":(De=me.value)==null?void 0:De.chainId,placeholder:l.$t("pleaseSelectChain"),class:"block",size:"large"},{prefix:b(()=>[me.value?(n(),r("img",{key:0,class:"select-icon",src:me.value.chainIcon,alt:""},null,8,Ul)):k("",!0)]),default:b(()=>[(n(!0),r(q,null,$e(g(Ae),s=>(n(),W(T,{key:s.chainId,label:s.chainShow,value:s.chainId,class:"select-option",onClick:_s=>Ye(s)},{default:b(()=>[i(w,{icon:s.chainIcon,text:s.chainShow},null,8,["icon","text"])]),_:2},1032,["label","value","onClick"]))),128))]),_:1},8,["model-value","placeholder"])])]),e("div",Rl,[e("div",Bl,t(l.$t("selectTemplate")),1),e("div",Pl,[e("div",Dl,[(n(!0),r(q,null,$e(Ne,s=>(n(),W(m,{class:fe(["btn-deployer",{"btn-gradient":s.deployerId==o.value}]),key:s.deployerId,onClick:()=>xe(s.deployerId)},{default:b(()=>[I(t(l.$t(s.deployerName)),1)]),_:2},1032,["class","onClick"]))),128))]),o.value==0?(n(),r("div",Wl,t(l.$t("freeTaxExplain")),1)):o.value==1?(n(),r("div",Ml,t(l.$t("feeTokenExplain")),1)):o.value==2?(n(),r("div",Ol,t(l.$t("selfDividendTokenExplain")),1)):o.value==3?(n(),r("div",zl,t(l.$t("addPoolDividendExplain")),1)):k("",!0)])]),e("div",xl,[e("div",Kl,t(l.$t("tokenName")),1),e("div",Hl,[i(K,{modelValue:E.value,"onUpdate:modelValue":a[1]||(a[1]=s=>E.value=s),placeholder:l.$t("lettersLimit"),class:"ipt",maxlength:"20"},null,8,["modelValue","placeholder"])])]),e("div",ql,[e("div",Gl,t(l.$t("tokenSymbol")),1),e("div",jl,[i(K,{modelValue:u.value,"onUpdate:modelValue":a[2]||(a[2]=s=>u.value=s),placeholder:l.$t("lettersLimit"),class:"ipt",maxlength:"20"},null,8,["modelValue","placeholder"])])]),e("div",Ql,[e("div",Jl,t(l.$t("tokenPrecision")),1),e("div",Xl,[i(K,{modelValue:S.value,"onUpdate:modelValue":a[3]||(a[3]=s=>S.value=s),type:"number",class:"ipt"},null,8,["modelValue"])])]),e("div",Yl,[e("div",Zl,t(l.$t("tokenAmount")),1),e("div",et,[i(K,{modelValue:j.value,"onUpdate:modelValue":a[4]||(a[4]=s=>j.value=s),type:"number",placeholder:l.$t("pleaseEnter"),class:"ipt"},null,8,["modelValue","placeholder"])])]),o.value!==2?(n(),r("div",lt,[e("div",tt,[I(t(l.$t("isMintToken")),1),e("span",at,"*"+t(l.$t("cannotClose")),1)]),e("div",st,[i(Y,{modelValue:_e.value,"onUpdate:modelValue":a[5]||(a[5]=s=>_e.value=s),size:"large"},null,8,["modelValue"])])])):k("",!0),o.value==0?(n(),r("div",ot,[e("div",nt,t(l.$t("holder")),1),e("div",it,[i(K,{"model-value":g(d).walletAddress,placeholder:l.$t("pleaseConnectWallet"),class:"ipt",disabled:""},null,8,["model-value","placeholder"])])])):k("",!0),e("div",ut,[g(d).selectedChain&&g(d).selectedChain.create?(n(),r("div",rt,t(l.$t("creationFee",{baseFeeAmount:Le.value,baseFeeSymbol:g(d).selectedChain.nativeCurrency.symbol})),1)):k("",!0),g(d).isConnecting?(n(),r(q,{key:1},[o.value==0?(n(),r("div",dt,[i(m,{class:"btn btn-gradient",onClick:Pe,loading:F.value},{default:b(()=>[I(t(l.$t("create")),1)]),_:1},8,["loading"])])):(n(),r("div",ct,[i(m,{class:"btn btn-gradient",onClick:Ee},{default:b(()=>[I(t(l.$t("nextStep")),1)]),_:1})]))],64)):(n(),r("div",vt,[i(m,{class:"btn btn-gradient",onClick:a[6]||(a[6]=()=>g(A).loginDialogVisible=!0)},{default:b(()=>[I(t(l.$t("connectWallet")),1)]),_:1})]))])],64)):o.value!=0&&y.value==1?(n(),r(q,{key:1},[e("div",mt,[e("div",pt,t(l.$t("poolToken")),1),e("div",ft,[e("div",{class:"select",onClick:a[7]||(a[7]=s=>ee.value=!0)},[O.value?(n(),W(w,{key:0,icon:O.value.icon,text:O.value.symbol},null,8,["icon","text"])):(n(),r("div",_t,t(l.$t("pleaseSelectToken1")),1)),i(V,null,{default:b(()=>[i(de)]),_:1})])]),e("div",ht,t(l.$t("currencyExplain")),1)]),e("div",yt,[e("div",kt,t(l.$t("choosePlatform")),1),e("div",bt,[e("div",{class:"select",onClick:a[8]||(a[8]=s=>le.value=!0)},[U.value?(n(),W(w,{key:0,icon:U.value.swapIcon,text:U.value.showName},null,8,["icon","text"])):(n(),r("div",wt,t(l.$t("pleaseChoosePlatform")),1)),i(V,null,{default:b(()=>[i(de)]),_:1})])])]),o.value==3?(n(),r("div",gt,[e("div",$t,t(l.$t("rewardToken")),1),e("div",Ct,[i(K,{modelValue:he.value,"onUpdate:modelValue":a[9]||(a[9]=s=>he.value=s),placeholder:l.$t("enterContract"),class:"ipt",maxlength:42},null,8,["modelValue","placeholder"])]),e("div",St,t(l.$t("rewardTokenInfo",{chainToken:g(d).nativeCurrencySymbol})),1)])):k("",!0),e("div",Vt,[e("div",Tt,[I(t(l.$t("buyTax",{max:20}))+" ",1),i(V,{class:"icon",onClick:a[10]||(a[10]=s=>h.value=!0)},{default:b(()=>[i(R)]),_:1})]),e("div",It,[e("div",Nt,[e("div",Ft,t(l.$t("marketingTax")),1),i(ce,{modelValue:N.value,"onUpdate:modelValue":a[11]||(a[11]=s=>N.value=s),max:Ke.value,min:0,step:1,precision:2},null,8,["modelValue","max"])]),e("div",Lt,[e("div",At,t(l.$t("liquidityTax")),1),i(ce,{modelValue:L.value,"onUpdate:modelValue":a[12]||(a[12]=s=>L.value=s),max:He.value,min:0,step:1,precision:2},null,8,["modelValue","max"])]),o.value==1?(n(),r("div",Et,[e("div",Ut,t(l.$t("burnTax")),1),i(ce,{modelValue:ie.value,"onUpdate:modelValue":a[13]||(a[13]=s=>ie.value=s),max:qe.value,min:0,step:1,precision:2},null,8,["modelValue","max"])])):k("",!0),o.value==2||o.value==3?(n(),r("div",Rt,[e("div",Bt,t(l.$t("rewardTax")),1),i(ce,{modelValue:oe.value,"onUpdate:modelValue":a[14]||(a[14]=s=>oe.value=s),max:Ge.value,min:0,step:1,precision:2},null,8,["modelValue","max"])])):k("",!0)])]),e("div",Pt,[e("div",Dt,[I(t(l.$t("sellTax",{max:20}))+" ",1),i(V,{class:"icon",onClick:a[15]||(a[15]=s=>h.value=!0)},{default:b(()=>[i(R)]),_:1})]),e("div",Wt,[e("div",Mt,[e("div",Ot,t(l.$t("marketingTax")),1),i(ce,{modelValue:P.value,"onUpdate:modelValue":a[16]||(a[16]=s=>P.value=s),max:je.value,min:0,step:1,precision:2},null,8,["modelValue","max"])]),e("div",zt,[e("div",xt,t(l.$t("liquidityTax")),1),i(ce,{modelValue:z.value,"onUpdate:modelValue":a[17]||(a[17]=s=>z.value=s),max:Qe.value,min:0,step:1,precision:2},null,8,["modelValue","max"])]),o.value==1?(n(),r("div",Kt,[e("div",Ht,t(l.$t("burnTax")),1),i(ce,{modelValue:ye.value,"onUpdate:modelValue":a[18]||(a[18]=s=>ye.value=s),max:Je.value,min:0,step:1,precision:2},null,8,["modelValue","max"])])):k("",!0),o.value==2||o.value==3?(n(),r("div",qt,[e("div",Gt,t(l.$t("rewardTax")),1),i(ce,{modelValue:ve.value,"onUpdate:modelValue":a[19]||(a[19]=s=>ve.value=s),max:Xe.value,min:0,step:1,precision:2},null,8,["modelValue","max"])])):k("",!0)])]),e("div",jt,[e("div",Qt,t(l.$t("addressSetting")),1),e("div",Jt,[e("div",Xt,[e("div",Yt,t(l.$t("holder")),1),e("div",Zt,t(g(d).walletAddress),1)]),e("div",ea,[e("div",la,t(l.$t("marketingAddress")),1),i(K,{class:"ipt-right",modelValue:x.value,"onUpdate:modelValue":a[20]||(a[20]=s=>x.value=s),placeholder:l.$t("pleaseEnter")},null,8,["modelValue","placeholder"])])])]),e("div",ta,[e("div",aa,[i(m,{class:"btn",onClick:Ue},{default:b(()=>[I(t(l.$t("previousStep")),1)]),_:1}),i(m,{class:"btn btn-gradient",onClick:Ee},{default:b(()=>[I(t(l.$t("nextStep")),1)]),_:1})])])],64)):o.value!=0&&y.value==2?(n(),r(q,{key:2},[e("div",sa,[e("div",null,[e("div",oa,t(l.$t("manuallyOpenTheTrading")),1),e("div",na,t(l.$t("manuallyOpenTheTradingInfo1"))+t(l.$t("manuallyOpenTheTradingInfo2"))+t(l.$t("manuallyOpenTheTradingInfo3")),1)]),i(Y,{modelValue:ne.value,"onUpdate:modelValue":a[21]||(a[21]=s=>ne.value=s),size:"large"},null,8,["modelValue"])]),e("div",ia,[e("div",null,[e("div",ua,t(l.$t("autoKillBlock")),1),te.value?(n(),W(K,{key:1,class:"ipt-switch",modelValue:Q.value,"onUpdate:modelValue":a[22]||(a[22]=s=>Q.value=s),type:"number",placeholder:l.$t("pleaseEnterTheNumberOfBlocks")},null,8,["modelValue","placeholder"])):(n(),r("div",ra,t(l.$t("autoKillBlockInfo")),1))]),i(Y,{modelValue:te.value,"onUpdate:modelValue":a[23]||(a[23]=s=>te.value=s),size:"large",onChange:ll},null,8,["modelValue"])]),e("div",da,[e("div",null,[e("div",ca,t(l.$t("taxSwitch")),1),e("div",va,t(l.$t("taxSwitchInfo")),1)]),i(Y,{modelValue:ke.value,"onUpdate:modelValue":a[24]||(a[24]=s=>ke.value=s),size:"large"},null,8,["modelValue"])]),e("div",ma,[e("div",null,[e("div",pa,t(l.$t("whiteList2")),1),e("div",fa,t(l.$t("whiteList2Info")),1)]),i(Y,{modelValue:be.value,"onUpdate:modelValue":a[25]||(a[25]=s=>be.value=s),size:"large"},null,8,["modelValue"])]),e("div",_a,[e("div",null,[e("div",ha,t(l.$t("maxWalletLimit")),1),ue.value?(n(),W(K,{key:1,class:"ipt-switch",modelValue:J.value,"onUpdate:modelValue":a[26]||(a[26]=s=>J.value=s),type:"number",placeholder:l.$t("pleaseEnterMaxWalletNumber")},null,8,["modelValue","placeholder"])):(n(),r("div",ya,t(l.$t("maxWalletLimitInfo")),1))]),i(Y,{modelValue:ue.value,"onUpdate:modelValue":a[27]||(a[27]=s=>ue.value=s),size:"large"},null,8,["modelValue"])]),e("div",ka,[e("div",null,[e("div",ba,t(l.$t("maxSwapLimit")),1),re.value?(n(),W(K,{key:1,class:"ipt-switch",modelValue:X.value,"onUpdate:modelValue":a[28]||(a[28]=s=>X.value=s),type:"number",placeholder:l.$t("pleaseEnterMaxSwapNumber")},null,8,["modelValue","placeholder"])):(n(),r("div",wa,t(l.$t("maxSwapLimitInfo")),1))]),i(Y,{modelValue:re.value,"onUpdate:modelValue":a[29]||(a[29]=s=>re.value=s),size:"large"},null,8,["modelValue"])]),e("div",ga,[e("div",$a,[i(m,{class:"btn",onClick:Ue},{default:b(()=>[I(t(l.$t("previousStep")),1)]),_:1}),i(m,{class:"btn btn-gradient",onClick:Pe,loading:F.value},{default:b(()=>[I(t(l.$t("create")),1)]),_:1},8,["loading"])])])],64)):o.value==0&&y.value==1||o.value!=0&&y.value==3?(n(),r("div",Ca,[i(pe,{name:"createSuccess"}),e("div",Sa,t(l.$t("createSuccess")),1),i(m,{onClick:a[30]||(a[30]=s=>g(se).push("/token/list"))},{default:b(()=>[I(t(l.$t("viewToken")),1)]),_:1})])):k("",!0)])]),i(D,{modelValue:ee.value,"onUpdate:modelValue":a[32]||(a[32]=s=>ee.value=s),title:l.$t("selectCurrency"),class:"dlg dlg-select-token","destroy-on-close":""},{default:b(()=>[i(Sl,{onSelect:a[31]||(a[31]=s=>Ze(s))})]),_:1},8,["modelValue","title"]),i(D,{modelValue:le.value,"onUpdate:modelValue":a[34]||(a[34]=s=>le.value=s),title:l.$t("selectSwap"),class:"dlg dlg-select-token","destroy-on-close":""},{default:b(()=>[i(Nl,{onSelect:a[33]||(a[33]=s=>el(s))})]),_:1},8,["modelValue","title"]),i(D,{modelValue:M.value,"onUpdate:modelValue":a[35]||(a[35]=s=>M.value=s),title:l.$t("confirmation"),class:"dlg dlg-lock-confirm"},{default:b(()=>[e("ul",Va,[e("li",null,[e("div",Ta,t(l.$t("contractChian")),1),e("div",Ia,[me.value?(n(),W(w,{key:0,icon:me.value.chainIcon,text:me.value.chainShow},null,8,["icon","text"])):k("",!0)])]),e("li",null,[e("div",Na,t(l.$t("createTemplate")),1),e("div",Fa,t(l.$t(Ne.find(s=>s.deployerId==o.value).deployerName)),1)]),e("li",null,[e("div",La,t(l.$t("tokenNameSymbol")),1),e("div",Aa,t(`${E.value}(${u.value})`),1)]),e("li",null,[e("div",Ea,t(l.$t("tokenPrecision")),1),e("div",Ua,t(S.value),1)]),e("li",null,[e("div",Ra,t(l.$t("tokenAmount")),1),e("div",Ba,t(j.value),1)]),o.value!=0?(n(),r(q,{key:0},[O.value?(n(),r("li",Pa,[e("div",Da,t(l.$t("poolToken")),1),e("div",Wa,[i(w,{icon:O.value.icon,text:O.value.symbol},null,8,["icon","text"])])])):k("",!0),U.value?(n(),r("li",Ma,[e("div",Oa,t(l.$t("swap")),1),e("div",za,[i(w,{icon:U.value.swapIcon,text:U.value.showName},null,8,["icon","text"])])])):k("",!0),o.value==3?(n(),r("li",xa,[e("div",Ka,t(l.$t("rewardToken")),1),e("div",Ha,t(g(ge)(he.value,6)),1)])):k("",!0),e("li",null,[e("div",qa,t(l.$t("buyTax1")),1),o.value==1?(n(),r("div",Ga,t(l.$t("buyTax1Detail",{buyFundFeeRate:N.value,buyLPFeeRate:L.value,buyBurnFeeRate:ie.value})),1)):(n(),r("div",ja,t(l.$t("buyTax1Detail1",{buyFundFeeRate:N.value,buyLPFeeRate:L.value,buyRewardFeeRate:oe.value})),1))]),e("li",null,[e("div",Qa,t(l.$t("sellTax1")),1),o.value==1?(n(),r("div",Ja,t(l.$t("buyTax1Detail",{buyFundFeeRate:N.value,buyLPFeeRate:L.value,buyBurnFeeRate:ie.value})),1)):(n(),r("div",Xa,t(l.$t("buyTax1Detail1",{buyFundFeeRate:N.value,buyLPFeeRate:L.value,buyRewardFeeRate:oe.value})),1))]),e("li",null,[e("div",Ya,t(l.$t("marketingAddress")),1),e("div",Za,t(g(ge)(x.value,6)),1)]),te.value?(n(),r("li",es,[e("div",ls,t(l.$t("autoKillBlock1")),1),e("div",ts,t(Q.value),1)])):k("",!0),ue.value?(n(),r("li",as,[e("div",ss,t(l.$t("maxWalletLimit")),1),e("div",os,t(J.value),1)])):k("",!0),re.value?(n(),r("li",ns,[e("div",is,t(l.$t("maxSwapLimit")),1),e("div",us,t(X.value),1)])):k("",!0)],64)):k("",!0),e("li",null,[e("div",rs,t(l.$t("ownerAddr")),1),e("div",ds,t(g(ge)(g(d).walletAddress,6)),1)])]),e("div",cs,[o.value!==2&&_e.value?(n(),W(we,{key:0,class:"tag"},{default:b(()=>[I(t(l.$t("canMint")),1)]),_:1})):k("",!0),o.value!=0?(n(),r(q,{key:1},[ne.value?(n(),W(we,{key:0,class:"tag"},{default:b(()=>[I(t(l.$t("manuallyOpenTheTrading")),1)]),_:1})):k("",!0),be.value?(n(),W(we,{key:1,class:"tag"},{default:b(()=>[I(t(l.$t("whiteList2")),1)]),_:1})):k("",!0),ke.value?(n(),W(we,{key:2,class:"tag"},{default:b(()=>[I(t(l.$t("taxSwitch")),1)]),_:1})):k("",!0),te.value?(n(),W(we,{key:3,class:"tag"},{default:b(()=>[I(t(l.$t("autoKillBlockTag")),1)]),_:1})):k("",!0)],64)):k("",!0)]),g(d).selectedChain&&g(d).selectedChain.create?(n(),r("div",vs,t(l.$t("creationFee",{baseFeeAmount:Le.value,baseFeeSymbol:g(d).selectedChain.nativeCurrency.symbol})),1)):k("",!0),e("div",ms,[i(m,{class:"btn-gradient btn-block",onClick:al,loading:$.value},{default:b(()=>[I(t(l.$t("confirmAndCreate")),1)]),_:1},8,["loading"])])]),_:1},8,["modelValue","title"]),i(D,{modelValue:h.value,"onUpdate:modelValue":a[36]||(a[36]=s=>h.value=s),width:"500",title:l.$t("taxInstruction"),class:"tax-instruction","destroy-on-close":""},{default:b(()=>[e("div",ps,[e("div",{class:fe(g(d).language)},t(l.$t("taxInstructionText1")),3),e("div",{class:fe(g(d).language)},t(l.$t("taxInstructionText2")),3),e("div",{class:fe(g(d).language)},t(l.$t("taxInstructionText3")),3),o.value==1?(n(),r("div",{key:0,class:fe(g(d).language)},t(l.$t("taxInstructionText4")),3)):k("",!0),o.value==2||o.value==3?(n(),r("div",{key:1,class:fe(g(d).language)},t(l.$t("taxInstructionText5")),3)):k("",!0),e("div",{class:fe(g(d).language)},t(l.$t("taxInstructionText6")),3)])]),_:1},8,["modelValue","title"])],64)}}},$s=Se(fs,[["__scopeId","data-v-5891deaf"]]);export{$s as default};