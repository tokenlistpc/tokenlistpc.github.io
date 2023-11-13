import{_ as Ke,i as He,u as qe,j as p,w as pl,k as Ve,b as K,e as M,o as n,c as i,h as r,f as a,F as le,g as Ie,l as k,m as fl,t as s,p as Se,q as $e,E as h,a as hl,s as _l,v as O,x as b,y as _,z as I,A as D,B as c,C as yl,n as ue,D as kl,G as bl,H as Oe,I as wl,J as gl}from"./index-00af62d0.js";import{S as Cl}from"./Step-b07168f3.js";import{R as me}from"./Rate-8fb245e4.js";import{T as $l}from"./TokenIcon-1f120c0a.js";import{f as Ge,p as ze,a as z}from"./units-e1a371c5.js";import{S as Tl}from"./SelectSwap-3720b10d.js";/* empty css                                                          */const Vl={class:"token-list"},Sl=["onClick"],Nl={class:"item-left"},Il={class:"item-info"},Fl={class:"up"},Ll={class:"down"},Al={class:"item-right item-info"},El={class:"up"},Rl={class:"down"},Ul={__name:"SelectToken",emits:["select"],setup(be,{emit:f}){const{t:d}=He(),ie=qe(),P=p(""),ae=p([]),we=p([]);pl(()=>[P.value,ae.value],async()=>{we.value=await he()});async function he(){if(P.value)if(P.value.startsWith("0x")){let R=ae.value.filter($=>$.tokenAddress.toLowerCase()==P.value.toLowerCase());if(R.length==0&&Ve(P.value)){let $=await K.wallet.metamask.contractERC20(P.value);const A=P.value.toLowerCase(),y=await $.balanceOf(ie.walletAddress),re=await $.decimals(),v=await $.name(),w=await $.symbol();let C={chain:ie.chain,decimals:Number(re),name:v,symbol:w,tokenAddress:A,currentPriceUsd:0,value:Number(Ge(y.toString(),re)),icon:`https://ave.s3.ap-east-1.amazonaws.com/token_icon/${ie.chain}/${A}.png`};console.log(C),R.push(C)}return R}else return ae.value.filter(R=>R.symbol.toLowerCase().indexOf(P.value.toLowerCase())>-1);else return ae.value}async function _e(){let R=ie.chain,$=[];try{let A=await K.ave.getUserToken(R,ie.walletAddress);if(console.log(A),A.data.status==1){let re=A.data.data.filter(v=>new RegExp("^0x.*$","gi").test(v.token)&&v.value>0&&v.risk_score<60&&v.risk_level>=0&&v.flag!=="blacklist"&&v.symbol!==""&&v.flag!=="lp"&&v.token=="0xeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee").map(v=>({chain:v.chain,demical:v.decimals,name:v.name,symbol:v.symbol,tokenAddress:v.token.toLowerCase(),currentPriceUsd:v.current_price_usd,value:v.value?v.value:0,icon:$e(v.chain.toLowerCase(),v.token.toLowerCase())}));$=$.concat(re)}else return;let y=await K.ave.getSwapTokens(R);if(console.log(y),y.data.status==1){let re=y.data.data.filter(v=>new RegExp("^0x.*$","gi").test(v.token)&&$.findIndex(w=>w.tokenAddress==v.token)==-1&&v.risk_score<60&&v.risk_level>=0&&v.flag!=="blacklist"&&v.symbol!==""&&v.flag!=="lp"&&v.token=="0xeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee").map(v=>({chain:v.chain,demical:v.decimals,name:v.name,symbol:v.symbol,tokenAddress:v.token.toLowerCase(),currentPriceUsd:v.current_price_usd,value:v.value?v.value:0,icon:$e(v.chain.toLowerCase(),v.token.toLowerCase())}));if($=$.concat(re),ie.currentChain.chain=="bsc"){let v=y.data.data.filter(w=>w.token=="0x55d398326f99059ff775485246999027b3197955"||w.token=="0x8ac76a51cc950d9822d68b83fe1ad97b32cd580d"||w.token=="0xe9e7cea3dedca5984780bafc599bd69add087d56").map(w=>({chain:w.chain,demical:w.decimals,name:w.name,symbol:w.symbol,tokenAddress:w.token.toLowerCase(),currentPriceUsd:w.current_price_usd,value:w.value?w.value:0,icon:$e(w.chain.toLowerCase(),w.token.toLowerCase())}));$=$.concat(v)}}else return}catch(A){A&&A.message?h.error(A.message):h.error(d("unknowError")),$=[]}finally{}ae.value=$}return _e(),(R,$)=>{const A=M("el-input");return n(),i(le,null,[r(A,{modelValue:P.value,"onUpdate:modelValue":$[0]||($[0]=y=>P.value=y),placeholder:R.$t("searchTokenOrName")},null,8,["modelValue","placeholder"]),a("ul",Vl,[(n(!0),i(le,null,Ie(we.value,y=>(n(),i("li",{key:y.chain,onClick:()=>f("select",y)},[a("div",Nl,[r($l,{class:"token-icon-30",bigIcon:y.icon,smallIcon:k(fl)(y.chain)},null,8,["bigIcon","smallIcon"]),a("div",Il,[a("div",Fl,s(y.symbol),1),a("div",Ll,s(y.tokenAddress=="0xeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee"?" ":k(Se)(y.tokenAddress,8)),1)])]),a("div",Al,[a("div",El,s(y.value),1),a("div",Rl,s(y.currentPriceUsd?`$ ${y.currentPriceUsd}`:" "),1)])],8,Sl))),128))])],64)}}},Pl=Ke(Ul,[["__scopeId","data-v-9f211bc5"]]);const Fe=be=>(wl("data-v-e5fd41d2"),be=be(),gl(),be),Bl={class:"form"},Dl={class:"form-item"},Ml={class:"form-item-title"},Wl={class:"form-item-value"},Ol=["src"],zl={class:"form-item"},Kl={class:"form-item-title"},Hl={class:"form-item-value"},ql={class:"deployer-list"},Gl={key:0,class:"deployer-note"},Jl={key:1,class:"deployer-note"},Ql={key:2,class:"deployer-note"},jl={key:3,class:"deployer-note"},Xl={key:4,class:"deployer-note"},Yl={key:5,class:"deployer-note"},xl={key:6,class:"deployer-note"},Zl={key:7,class:"deployer-note"},ea={class:"form-item"},la={class:"form-item-title"},aa={class:"form-item-value"},ta={class:"form-item"},sa={class:"form-item-title"},oa={class:"form-item-value"},na={class:"form-item"},ua={class:"form-item-title"},ia={class:"form-item-value"},ra={class:"form-item"},da={class:"form-item-title"},va={class:"form-item-value"},ca={key:0,class:"form-item form-item-row"},ma={class:"form-item-title"},pa={class:"title-note"},fa={class:"form-item-value"},ha={key:1,class:"form-item"},_a={class:"form-item-title"},ya={class:"form-item-value"},ka={class:"form-bottom"},ba={key:0,class:"fee"},wa={key:0,class:"form-bottom-btns"},ga={key:1,class:"form-bottom-btns"},Ca={key:2,class:"form-bottom-btns"},$a={key:0,class:"form-item"},Ta={class:"form-item-title"},Va={class:"form-item-value"},Sa={key:1,class:"placeholder"},Na={class:"explain"},Ia={key:1,class:"form-item"},Fa={class:"form-item-title"},La={class:"form-item-value disabled"},Aa={class:"select"},Ea={class:"explain"},Ra={class:"form-item"},Ua={class:"form-item-title"},Pa={class:"form-item-value"},Ba={key:1,class:"placeholder"},Da={key:2,class:"form-item"},Ma={class:"form-item-title"},Wa={class:"form-item-value"},Oa={key:0,class:"explain"},za={key:1,class:"explain"},Ka={key:3,class:"form-item"},Ha={class:"form-item-title"},qa={class:"form-item-value"},Ga={class:"explain"},Ja={class:"form-item"},Qa={class:"form-item-title"},ja={class:"form-item-value"},Xa={class:"rate-item"},Ya={class:"rate-item-title"},xa={class:"rate-item"},Za={class:"rate-item-title"},et={key:0,class:"rate-item"},lt={class:"rate-item-title"},at={key:1,class:"rate-item"},tt={class:"rate-item-title"},st={class:"form-item"},ot={class:"form-item-title"},nt={class:"form-item-value"},ut={class:"rate-item"},it={class:"rate-item-title"},rt={class:"rate-item"},dt={class:"rate-item-title"},vt={key:0,class:"rate-item"},ct={class:"rate-item-title"},mt={key:1,class:"rate-item"},pt={class:"rate-item-title"},ft={class:"form-item"},ht={class:"form-item-title"},_t={class:"form-item-value"},yt={class:"rate-item"},kt={class:"rate-item-title"},bt={class:"holder"},wt={class:"rate-item fund-address"},gt={class:"rate-item-title"},Ct={class:"form-bottom"},$t={class:"form-bottom-btns"},Tt={class:"form-item item-switch"},Vt={class:"title"},St={class:"note"},Nt={class:"form-item item-switch"},It={class:"title"},Ft={key:0,class:"note"},Lt={class:"form-item item-switch"},At={class:"title"},Et={class:"note"},Rt={class:"form-item item-switch"},Ut={class:"title"},Pt={class:"note"},Bt={class:"form-item item-switch"},Dt={class:"title"},Mt={key:0,class:"note"},Wt={class:"form-item item-switch"},Ot={class:"title"},zt={key:0,class:"note"},Kt={class:"form-bottom"},Ht={class:"form-bottom-btns"},qt={key:3,class:"create-success"},Gt={class:"text"},Jt={class:"dlg-item"},Qt={class:"key"},jt={class:"value"},Xt={class:"key"},Yt={class:"value"},xt={class:"key"},Zt={class:"value"},es={class:"key"},ls={class:"value"},as={class:"key"},ts={class:"value"},ss={key:0},os={class:"key"},ns={class:"value"},us={key:1},is={class:"key"},rs={class:"value"},ds={key:2},vs={class:"key"},cs={class:"value"},ms={class:"key"},ps={key:0,class:"value"},fs={key:1,class:"value"},hs={key:2,class:"value"},_s={class:"key"},ys={key:0,class:"value"},ks={key:1,class:"value"},bs={key:2,class:"value"},ws={class:"key"},gs={class:"value"},Cs={key:3},$s={class:"key"},Ts={class:"value"},Vs={key:4},Ss={class:"key"},Ns={class:"value"},Is={key:5},Fs={class:"key"},Ls={class:"value"},As={class:"key"},Es={class:"value"},Rs=Fe(()=>a("div",{class:"open-source-item"},[a("div",{class:"open-source-item-item"},"Optimization: Yes"),a("div",null,"Runs: 200")],-1)),Us=Fe(()=>a("div",{class:"open-source-item"}," Solidity Version: v0.8.4+commit.c7e474f2 ",-1)),Ps=Fe(()=>a("div",{class:"open-source-item"}," License: MIT ",-1)),Bs={class:"flex-sb open-source-item"},Ds={class:"tags"},Ms={key:0,class:"fee"},Ws={class:"dlg-bottom"},Os={class:"content"},zs={__name:"Create",setup(be){const{t:f}=He(),d=qe(),ie=hl(),P=_l(),ae=p(!1),we=p(!1),he=p(!1),_e=p(!1),R=p(!1),$=p(!1),A=p(!1),y=p(0);function re(e){console.log("changeStep",e)}const v=p(""),w=p(""),C=p(18),ne=p(""),ye=p(!1),X=p(null),B=p(null),pe=p(""),ke=p(""),S=p(0),Y=p(0),F=p(0),H=p(0),N=p(0),x=p(0),L=p(0),q=p(0),W=p(""),ee=p(!1),Z=p(!1),G=p(""),de=p(!1),ve=p(!1),te=p(!1),J=p(""),se=p(!1),Q=p(""),Je=p(""),Ne=O(()=>{const e=[];return e.push({deployerId:4,deployerName:"dividendToken",isNew:!0}),d.selectedChain&&d.selectedChain.create.deployerList.some(t=>t.deployerId==5)?(e.push({deployerId:5,deployerName:"freeTax"}),e.push({deployerId:6,deployerName:"feeToken"}),e.push({deployerId:7,deployerName:"selfDividendToken"}),e.push({deployerId:8,deployerName:"addPoolDividend"})):(e.push({deployerId:0,deployerName:"freeTax"}),e.push({deployerId:1,deployerName:"feeToken"}),e.push({deployerId:2,deployerName:"selfDividendToken"}),e.push({deployerId:3,deployerName:"addPoolDividend"})),e}),l=p(4);function Qe(e){console.log("changeCurrentDeployerId",e),e==4&&(C.value=18),l.value=e}const Le=O(()=>l.value==0||l.value==5?["selectTemplate","createSuccess"]:["selectTemplate","taxSetting","issueControl","createSuccess"]),Ae=O(()=>{if(d.selectedChain&&d.selectedChain.create){let e=d.selectedChain.create.deployerList.find(t=>t.deployerId==l.value);return e||(l.value=Ne.value[0].deployerId,e=d.selectedChain.create.deployerList.find(t=>t.deployerId==l.value)),e.baseFee}return 0}),V=O(()=>l.value==4?25:20),je=O(()=>l.value==1||l.value==6?c(V.value).minus(Y.value).minus(F.value).toNumber():l.value==2||l.value==3||l.value==7||l.value==8?c(V.value).minus(H.value).minus(F.value).toNumber():l.value==4?c(V.value).minus(H.value).minus(F.value).minus(Y.value).toNumber():0),Xe=O(()=>l.value==1||l.value==6?c(V.value).minus(S.value).minus(Y.value).toNumber():l.value==2||l.value==3||l.value==7||l.value==8?c(V.value).minus(S.value).minus(H.value).toNumber():l.value==4?c(V.value).minus(H.value).minus(S.value).minus(Y.value).toNumber():0),Ye=O(()=>{if(l.value==1||l.value==6)return c(V.value).minus(S.value).minus(F.value).toNumber();if(l.value==4)return c(V.value).minus(H.value).minus(S.value).minus(F.value).toNumber()}),xe=O(()=>l.value==2||l.value==3||l.value==7||l.value==8?c(V.value).minus(S.value).minus(F.value).toNumber():l.value==4?c(V.value).minus(Y.value).minus(S.value).minus(F.value).toNumber():0),Ze=O(()=>l.value==1||l.value==6?c(V.value).minus(x.value).minus(L.value).toNumber():l.value==2||l.value==3||l.value==7||l.value==8?c(V.value).minus(q.value).minus(L.value).toNumber():l.value==4?c(V.value).minus(x.value).minus(q.value).minus(L.value).toNumber():0),el=O(()=>l.value==1||l.value==6?c(V.value).minus(N.value).minus(x.value).toNumber():l.value==2||l.value==3||l.value==7||l.value==8?c(V.value).minus(N.value).minus(q.value).toNumber():l.value==4?c(V.value).minus(N.value).minus(q.value).minus(x.value).toNumber():0),ll=O(()=>l.value==1||l.value==6?c(V.value).minus(N.value).minus(L.value).toNumber():l.value==4?c(V.value).minus(N.value).minus(q.value).minus(L.value).toNumber():0),al=O(()=>l.value==2||l.value==3||l.value==7||l.value==8?c(V.value).minus(N.value).minus(L.value).toNumber():l.value==4?c(V.value).minus(N.value).minus(x.value).minus(L.value).toNumber():0),Ee=O(()=>yl.chainList.filter(e=>!!e.create&&e.isTestChain==d.isTestChain)),fe=O(()=>d.selectedChain?Ee.value.find(e=>e.chainId==d.selectedChain.chainId):null);async function tl(e){console.log(e);try{await d.changeSelectedChain(e)}catch(t){console.log(t);const u=K.wallet.metamask.parseError(t);h.error(f(u))}}function Re(){if(y.value==0){if(!Pe())return}else if(y.value==1&&!Be())return;y.value=y.value+1}function Ue(){y.value=y.value-1}function sl(e){X.value=e,he.value=!1}function ol(e){B.value=e,_e.value=!1}function nl(e){e&&ee.value==!1&&(ee.value=!0)}function Pe(){return v.value?w.value?ne.value?C.value?!0:(h.error(f("pleaseEnterDecimals")),!1):(h.error(f("pleaseEnterTotal")),!1):(h.error(f("pleaseEnterSymbol")),!1):(h.error(f("pleaseEnterName")),!1)}function Be(){if(l.value!=4&&!X.value)return h.error(f("pleaseSelectCurrency")),!1;if(!B.value)return h.error(f("pleaseSelectSwap")),!1;if(l.value===1||l.value==6){if(c(S.value).plus(Y.value).plus(F.value).plus(N.value).plus(x.value).plus(L.value).lte(0))return h.error(f("taxMustGt0")),!1}else if(l.value===2||l.value==7){if(c(S.value).plus(F.value).plus(N.value).plus(L.value).lte(0))return h.error(f("taxlimit2")),!1}else if(l.value===3||l.value==8){if(!pe.value)return h.error(f("dividendTokenError")),!1;if(!Ve(pe.value))return h.error(f("pleaseEnterTrueAddress")),!1;if(c(S.value).plus(F.value).plus(H.value).plus(N.value).plus(L.value).plus(q.value).lte(0))return h.error(f("taxMustGt0")),!1}else if(l.value===4){if(!ke.value)return h.error(f("EnterMinDividend")),!1;if(Number(ke.value)<=0)return h.error(f("minDividendBt0")),!1}return(Number(S.value)>0||Number(N.value)>0)&&!W.value?(h.error(f("pleaseEnterMarketingAddress")),!1):W.value&&!Ve(W.value)?(h.error(f("pleaseEnterTrueAddress")),!1):!0}function ul(){return Z.value&&(!G.value||Number(G.value)<=0)?(h.error(f("pleaseEnterKillBlockNumber")),!1):Z.value==!0&&ee.value===!1?(h.error(f("enterKillBlockNumberMust")),!1):te.value&&(!J.value||Number(J.value)<=0)?(h.error(f("pleaseEnterMaxWalletLimit")),!1):se.value&&(!Q.value||Number(Q.value)<=0)?(h.error(f("pleaseEnterMaxSwapLimit")),!1):!0}async function De(){if(!d.isConnecting){h.error(f("pleaseConnectWallet"));return}if(d.chainId!=fe.value.chainId){h.error(f("switchNetwork"));return}if(!Pe()||(l.value==1||l.value==2||l.value==3||l.value==4||l.value==6||l.value==7||l.value==8)&&(!Be()||!ul()))return;R.value=!0;const e=d.create.deployerList.find(m=>m.deployerId==l.value).baseFee,t=ze(e.toString()),u=await K.wallet.metamask.getBalance(d.walletAddress);if(console.log("balance",u),u<t){h.error(f("balanceSlow2",{chainMianCoin:d.nativeCurrencySymbol,amount:e})),R.value=!1;return}ae.value=!0,R.value=!1}async function Me(){const e=[],t=[],u=[],m=[];if(l.value==0||l.value==5)e[0]=v.value,e[1]=w.value,u[0]=parseInt(C.value),u[1]=z(ne.value,parseInt(C.value)),l.value==0&&(m[0]=ye.value);else if(l.value==1||l.value==6){e[0]=v.value,e[1]=w.value;let T=X.value.tokenAddress,g=!1;T==="0xeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee"&&(T=(await(await K.wallet.metamask.contractSwap(B.value.routerAddress)).WETH()).toLowerCase(),g=!0),t[0]=T,t[1]=B.value.routerAddress,t[2]=d.walletAddress,t[3]=W.value?W.value:"0x0000000000000000000000000000000000000000",u[0]=parseInt(C.value),u[1]=z(ne.value,parseInt(C.value)),u[2]=c(S.value).times(100).toNumber(),u[3]=c(Y.value).times(100).toNumber(),u[4]=c(F.value).times(100).toNumber(),u[5]=c(N.value).times(100).toNumber(),u[6]=c(x.value).times(100).toNumber(),u[7]=c(L.value).times(100).toNumber(),u[8]=G.value?c(G.value).toNumber():0,u[9]=Q.value?z(Q.value,parseInt(C.value)):0n,u[10]=J.value?z(J.value,parseInt(C.value)):0n,l.value==1?(m[0]=ye.value,m[1]=g,m[2]=ee.value,m[3]=Z.value,m[4]=se.value,m[5]=te.value,m[6]=de.value,m[7]=ve.value):(m[0]=g,m[1]=ee.value,m[2]=Z.value,m[3]=se.value,m[4]=te.value,m[5]=de.value,m[6]=ve.value)}else if(l.value==2||l.value==7){e[0]=v.value,e[1]=w.value;let T=X.value.tokenAddress,g=!1;T==="0xeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee"&&(T=(await(await K.wallet.metamask.contractSwap(B.value.routerAddress)).WETH()).toLowerCase(),g=!0),t[0]=T,t[1]=B.value.routerAddress,t[2]=d.walletAddress,t[3]=W.value?W.value:"0x0000000000000000000000000000000000000000",u[0]=parseInt(C.value),u[1]=z(ne.value,parseInt(C.value)),u[2]=c(S.value).times(100).toNumber(),u[3]=c(H.value).times(100).toNumber(),u[4]=c(F.value).times(100).toNumber(),u[5]=c(N.value).times(100).toNumber(),u[6]=c(q.value).times(100).toNumber(),u[7]=c(L.value).times(100).toNumber(),u[8]=G.value?c(G.value).toNumber():0,u[9]=Q.value?z(Q.value,parseInt(C.value)):0n,u[10]=J.value?z(J.value,parseInt(C.value)):0n,m[0]=g,m[1]=ee.value,m[2]=Z.value,m[3]=se.value,m[4]=te.value,m[5]=de.value,m[6]=ve.value}else if(l.value==3||l.value==8){e[0]=v.value,e[1]=w.value;let T=X.value.tokenAddress,g=!1;T==="0xeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee"&&(T=(await(await K.wallet.metamask.contractSwap(B.value.routerAddress)).WETH()).toLowerCase(),g=!0),t[0]=T,t[1]=B.value.routerAddress,t[2]=d.walletAddress,t[3]=W.value?W.value:"0x0000000000000000000000000000000000000000",t[4]=pe.value,u[0]=parseInt(C.value),u[1]=z(ne.value,parseInt(C.value)),u[2]=c(S.value).times(100).toNumber(),u[3]=c(H.value).times(100).toNumber(),u[4]=c(F.value).times(100).toNumber(),u[5]=c(N.value).times(100).toNumber(),u[6]=c(q.value).times(100).toNumber(),u[7]=c(L.value).times(100).toNumber(),u[8]=G.value?c(G.value).toNumber():0,u[9]=Q.value?z(Q.value,parseInt(C.value)):0n,u[10]=J.value?z(J.value,parseInt(C.value)):0n,m[0]=g,m[1]=ee.value,m[2]=Z.value,m[3]=se.value,m[4]=te.value,m[5]=de.value,m[6]=ve.value,l.value==3&&(m[7]=ye.value)}else l.value==4&&(e[0]=v.value,e[1]=w.value,t[0]=W.value?W.value:"0x0000000000000000000000000000000000000000",t[1]=pe.value,t[2]=B.value.routerAddress,u[0]=Q.value?z(Q.value,parseInt(C.value)):0n,u[1]=J.value?z(J.value,parseInt(C.value)):0n,u[2]=c(S.value).times(100).toNumber(),u[3]=c(F.value).times(100).toNumber(),u[4]=c(H.value).times(100).toNumber(),u[5]=c(Y.value).times(100).toNumber(),u[6]=c(N.value).times(100).toNumber(),u[7]=c(L.value).times(100).toNumber(),u[8]=c(q.value).times(100).toNumber(),u[9]=c(x.value).times(100).toNumber(),u[10]=z(ne.value,parseInt(C.value)),u[11]=ke.value?z(ke.value,parseInt(C.value)):0n,u[12]=G.value?c(G.value).toNumber():0,m[0]=ee.value,m[1]=Z.value,m[2]=se.value,m[3]=te.value,m[4]=de.value,m[5]=ve.value);return{stringParams:e,addressParams:t,numberParams:u,boolParams:m}}async function il(){const e=d.create.deployerList.find(t=>t.deployerId==l.value).baseFee;$.value=!0;try{let t;d.create.v2?t=await K.wallet.metamask.contractTokenFactoryV2(d.create.tokenFactoryV2Address):t=await K.wallet.metamask.contractTokenFactory(d.create.tokenFactoryAddress);const{stringParams:u,addressParams:m,numberParams:T,boolParams:g}=await Me(),E=ze(e.toString());let U;if(d.create.v2){let j="0x0000000000000000000000000000000000000000";P.utm&&Ve(P.utm)&&(j=P.utm),console.log("create v2"),console.log(t),console.log(l.value,j,u,m,T,g),U=await t.tokenCreate(l.value,j,u,m,T,g,{value:E})}else console.log(l.value,u,m,T,g),U=await t.tokenCreate(l.value,u,m,T,g,{value:E});console.dir(U),Je.value=U.hash;let ce;d.chain=="core"&&(ce=kl.service({lock:!0,text:f("upChainNow")})),U.wait().then(async j=>{if(console.log("upChainSuccessfully"),console.log(j),j.status===1&&(h.success(f("upChainSuccessfully")),d.chain=="core")){ce&&(ce.text=f("verityContractNow")),console.log(j.logs);const ge=j.logs.find(oe=>oe.fragment&&oe.fragment.name=="TokenCreated");console.log(ge);const Te=ge.args[1];console.log(Te);try{const oe=await K.coredao.verifysourcecode(l.value,u,m,T,g,Te);await bl(500),await K.coredao.checkverifystatus(oe),h.success(f("verityContractSuccess"))}catch{h.error(f("verityContractFail"))}finally{ce&&ce.close()}}}),rl()}catch(t){if(console.log(JSON.stringify(t)),t.info&&t.info.error&&t.info.error.code===4001)h.error(f("userCancelOperate"));else if(t.error&&t.error.message&&t.error.message=="Canceled")h.error(f("userCancelOperate"));else if(t.data&&t.data.code==-32e3){const u=t.data.message.match(/(\d+) want (\d+)/)[2];h.error(f("balanceSlow2",{chainMianCoin:X.value.nativeCurrencySymbol,amount:Ge(u)}))}else t.code==="INSUFFICIENT_FUNDS"?h.error(f("balanceSlow")):t.info&&t.info.error&&t.info.error.code==-32603&&t.info.error.data.message.endsWith("transfer amount exceeds balance")?h.error(f("balanceSlow2",{chainMianCoin:d.nativeCurrencySymbol,amount:e})):t.code=="CALL_EXCEPTION"&&t.info.error.message.endsWith("transfer amount exceeds balance")?h.error(f("balanceSlow2",{chainMianCoin:d.nativeCurrencySymbol,amount:e})):h.error(f("unkonwError"))}finally{ae.value=!1,$.value=!1}}function rl(){y.value=Le.value.length-1}async function dl(){let e=await K.tools.getSourceCode(l.value);Oe(e)}async function vl(){const{stringParams:e,addressParams:t,numberParams:u,boolParams:m}=await Me();let T=K.tools.getConstructorArguments(e,t,u,m);T=T.slice(2),Oe(T)}return(e,t)=>{var We;const u=M("icon-text"),m=M("el-option"),T=M("el-select"),g=M("el-button"),E=M("el-input"),U=M("el-switch"),ce=M("ArrowDownBold"),j=M("el-icon"),ge=M("QuestionFilled"),Te=M("svg-icon"),oe=M("el-dialog"),cl=M("el-collapse-item"),ml=M("el-collapse"),Ce=M("el-tag");return n(),i(le,null,[a("div",null,[a("div",null,[r(Cl,{"step-list":Le.value,current:y.value,onStepClick:t[0]||(t[0]=o=>re(o))},null,8,["step-list","current"])]),a("div",Bl,[y.value==0?(n(),i(le,{key:0},[a("div",Dl,[a("div",Ml,s(e.$t("selectChain")),1),a("div",Wl,[r(T,{"model-value":(We=fe.value)==null?void 0:We.chainId,placeholder:e.$t("pleaseSelectChain"),class:"block",size:"large"},{prefix:b(()=>[fe.value?(n(),i("img",{key:0,class:"select-icon",src:fe.value.chainIcon,alt:""},null,8,Ol)):_("",!0)]),default:b(()=>[(n(!0),i(le,null,Ie(Ee.value,o=>(n(),D(m,{key:o.chainId,label:o.chainShow,value:o.chainId,class:"select-option",onClick:Ks=>tl(o)},{default:b(()=>[r(u,{icon:o.chainIcon,text:o.chainShow},null,8,["icon","text"])]),_:2},1032,["label","value","onClick"]))),128))]),_:1},8,["model-value","placeholder"])])]),a("div",zl,[a("div",Kl,s(e.$t("selectTemplate")),1),a("div",Hl,[a("div",ql,[(n(!0),i(le,null,Ie(Ne.value,o=>(n(),D(g,{class:ue(["btn-deployer",{"btn-gradient":o.deployerId==l.value}]),key:o.deployerId,onClick:()=>Qe(o.deployerId)},{default:b(()=>[a("span",{class:ue(["name",{"new-name":o.isNew}])},[I(s(e.$t(o.deployerName))+" ",1),o.isNew?(n(),i("span",{key:0,class:ue(["new",{"new-select":o.deployerId==l.value}])},"NEW",2)):_("",!0)],2)]),_:2},1032,["class","onClick"]))),128))]),l.value==0?(n(),i("div",Gl,s(e.$t("freeTaxExplain")),1)):_("",!0),l.value==5?(n(),i("div",Jl,s(e.$t("freeTaxV2Explain")),1)):l.value==1?(n(),i("div",Ql,s(e.$t("feeTokenExplain")),1)):l.value==6?(n(),i("div",jl,s(e.$t("feeTokenV2Explain")),1)):l.value==2||l.value==7?(n(),i("div",Xl,s(e.$t("selfDividendTokenExplain")),1)):l.value==3?(n(),i("div",Yl,s(e.$t("addPoolDividendExplain")),1)):l.value==8?(n(),i("div",xl,s(e.$t("addPoolDividendV2Explain")),1)):l.value==4?(n(),i("div",Zl,s(e.$t("dividendTokenExplain")),1)):_("",!0)])]),a("div",ea,[a("div",la,s(e.$t("tokenName")),1),a("div",aa,[r(E,{modelValue:v.value,"onUpdate:modelValue":t[1]||(t[1]=o=>v.value=o),placeholder:e.$t("lettersLimit"),class:"ipt",maxlength:"20"},null,8,["modelValue","placeholder"])])]),a("div",ta,[a("div",sa,s(e.$t("tokenSymbol")),1),a("div",oa,[r(E,{modelValue:w.value,"onUpdate:modelValue":t[2]||(t[2]=o=>w.value=o),placeholder:e.$t("lettersLimit"),class:"ipt",maxlength:"20"},null,8,["modelValue","placeholder"])])]),a("div",na,[a("div",ua,s(e.$t("tokenPrecision")),1),a("div",ia,[r(E,{modelValue:C.value,"onUpdate:modelValue":t[3]||(t[3]=o=>C.value=o),type:"number",class:"ipt",disabled:l.value==4},null,8,["modelValue","disabled"])])]),a("div",ra,[a("div",da,s(e.$t("tokenAmount")),1),a("div",va,[r(E,{modelValue:ne.value,"onUpdate:modelValue":t[4]||(t[4]=o=>ne.value=o),type:"number",placeholder:e.$t("pleaseEnter"),class:"ipt"},null,8,["modelValue","placeholder"])])]),l.value!==2&&l.value<4?(n(),i("div",ca,[a("div",ma,[I(s(e.$t("isMintToken")),1),a("span",pa,"*"+s(e.$t("cannotClose")),1)]),a("div",fa,[r(U,{modelValue:ye.value,"onUpdate:modelValue":t[5]||(t[5]=o=>ye.value=o),size:"large"},null,8,["modelValue"])])])):_("",!0),l.value==0||l.value==5?(n(),i("div",ha,[a("div",_a,s(e.$t("holder")),1),a("div",ya,[r(E,{"model-value":k(d).walletAddress,placeholder:e.$t("pleaseConnectWallet"),class:"ipt",disabled:""},null,8,["model-value","placeholder"])])])):_("",!0),a("div",ka,[k(d).selectedChain&&k(d).selectedChain.create?(n(),i("div",ba,s(e.$t("creationFee",{baseFeeAmount:Ae.value,baseFeeSymbol:k(d).selectedChain.nativeCurrency.symbol})),1)):_("",!0),k(d).isConnecting?(n(),i(le,{key:1},[l.value==0||l.value==5?(n(),i("div",wa,[r(g,{class:"btn btn-gradient",onClick:De,loading:R.value},{default:b(()=>[I(s(e.$t("create")),1)]),_:1},8,["loading"])])):(n(),i("div",ga,[r(g,{class:"btn btn-gradient",onClick:Re},{default:b(()=>[I(s(e.$t("nextStep")),1)]),_:1})]))],64)):(n(),i("div",Ca,[r(g,{class:"btn btn-gradient",onClick:t[6]||(t[6]=()=>k(P).loginDialogVisible=!0)},{default:b(()=>[I(s(e.$t("connectWallet")),1)]),_:1})]))])],64)):l.value!=0&&l.value!=5&&y.value==1?(n(),i(le,{key:1},[l.value!=4?(n(),i("div",$a,[a("div",Ta,s(e.$t("poolToken")),1),a("div",Va,[a("div",{class:"select",onClick:t[7]||(t[7]=o=>he.value=!0)},[X.value?(n(),D(u,{key:0,icon:X.value.icon,text:X.value.symbol},null,8,["icon","text"])):(n(),i("div",Sa,s(e.$t("pleaseSelectToken1")),1)),r(j,null,{default:b(()=>[r(ce)]),_:1})])]),a("div",Na,s(e.$t("currencyExplain")),1)])):(n(),i("div",Ia,[a("div",Fa,s(e.$t("poolToken")),1),a("div",La,[a("div",Aa,[k(d).currentChain.chain=="bsc_testnet"?(n(),D(u,{key:0,icon:k($e)("bsc","0xeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee"),text:k(d).currentChain.nativeCurrency.symbol},null,8,["icon","text"])):(n(),D(u,{key:1,icon:k($e)(k(d).currentChain.chain,"0xeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee"),text:k(d).currentChain.nativeCurrency.symbol},null,8,["icon","text"]))])]),a("div",Ea,s(e.$t("dividendTokenCurrencyExplain",{currencyToken:k(d).currentChain.nativeCurrency.symbol})),1)])),a("div",Ra,[a("div",Ua,s(e.$t("choosePlatform")),1),a("div",Pa,[a("div",{class:"select",onClick:t[8]||(t[8]=o=>_e.value=!0)},[B.value?(n(),D(u,{key:0,icon:B.value.swapIcon,text:B.value.showName},null,8,["icon","text"])):(n(),i("div",Ba,s(e.$t("pleaseChoosePlatform")),1)),r(j,null,{default:b(()=>[r(ce)]),_:1})])])]),l.value==3||l.value==4||l.value==8?(n(),i("div",Da,[a("div",Ma,s(e.$t("rewardToken")),1),a("div",Wa,[r(E,{modelValue:pe.value,"onUpdate:modelValue":t[9]||(t[9]=o=>pe.value=o),placeholder:e.$t("enterContract"),class:"ipt",maxlength:42},null,8,["modelValue","placeholder"])]),l.value==3||l.value==8?(n(),i("div",Oa,s(e.$t("rewardTokenInfo",{chainToken:k(d).nativeCurrencySymbol})),1)):l.value==4?(n(),i("div",za,[a("span",null,s(e.$t("rewardTokenExplain",{token:k(d).nativeCurrencySymbol,wToken:"W"+k(d).nativeCurrencySymbol})),1)])):_("",!0)])):_("",!0),l.value==4?(n(),i("div",Ka,[a("div",Ha,s(e.$t("minDividend")),1),a("div",qa,[r(E,{modelValue:ke.value,"onUpdate:modelValue":t[10]||(t[10]=o=>ke.value=o),type:"number",placeholder:e.$t("EnterMinDividend"),class:"ipt"},null,8,["modelValue","placeholder"])]),a("div",Ga,s(e.$t("minDividendExplain")),1)])):_("",!0),a("div",Ja,[a("div",Qa,[I(s(e.$t("buyTax",{max:V.value}))+" ",1),r(j,{class:"icon",onClick:t[11]||(t[11]=o=>A.value=!0)},{default:b(()=>[r(ge)]),_:1})]),a("div",ja,[a("div",Xa,[a("div",Ya,s(e.$t("marketingTax")),1),r(me,{modelValue:S.value,"onUpdate:modelValue":t[12]||(t[12]=o=>S.value=o),max:je.value,min:0,step:1,precision:2},null,8,["modelValue","max"])]),a("div",xa,[a("div",Za,s(e.$t("liquidityTax")),1),r(me,{modelValue:F.value,"onUpdate:modelValue":t[13]||(t[13]=o=>F.value=o),max:Xe.value,min:0,step:1,precision:2},null,8,["modelValue","max"])]),l.value==2||l.value==3||l.value==4||l.value==7||l.value==8?(n(),i("div",et,[a("div",lt,s(e.$t("rewardTax")),1),r(me,{modelValue:H.value,"onUpdate:modelValue":t[14]||(t[14]=o=>H.value=o),max:xe.value,min:0,step:1,precision:2},null,8,["modelValue","max"])])):_("",!0),l.value==1||l.value==4||l.value==6?(n(),i("div",at,[a("div",tt,s(e.$t("burnTax")),1),r(me,{modelValue:Y.value,"onUpdate:modelValue":t[15]||(t[15]=o=>Y.value=o),max:Ye.value,min:0,step:1,precision:2},null,8,["modelValue","max"])])):_("",!0)])]),a("div",st,[a("div",ot,[I(s(e.$t("sellTax",{max:V.value}))+" ",1),r(j,{class:"icon",onClick:t[16]||(t[16]=o=>A.value=!0)},{default:b(()=>[r(ge)]),_:1})]),a("div",nt,[a("div",ut,[a("div",it,s(e.$t("marketingTax")),1),r(me,{modelValue:N.value,"onUpdate:modelValue":t[17]||(t[17]=o=>N.value=o),max:Ze.value,min:0,step:1,precision:2},null,8,["modelValue","max"])]),a("div",rt,[a("div",dt,s(e.$t("liquidityTax")),1),r(me,{modelValue:L.value,"onUpdate:modelValue":t[18]||(t[18]=o=>L.value=o),max:el.value,min:0,step:1,precision:2},null,8,["modelValue","max"])]),l.value==2||l.value==3||l.value==4||l.value==7||l.value==8?(n(),i("div",vt,[a("div",ct,s(e.$t("rewardTax")),1),r(me,{modelValue:q.value,"onUpdate:modelValue":t[19]||(t[19]=o=>q.value=o),max:al.value,min:0,step:1,precision:2},null,8,["modelValue","max"])])):_("",!0),l.value==1||l.value==4||l.value==6?(n(),i("div",mt,[a("div",pt,s(e.$t("burnTax")),1),r(me,{modelValue:x.value,"onUpdate:modelValue":t[20]||(t[20]=o=>x.value=o),max:ll.value,min:0,step:1,precision:2},null,8,["modelValue","max"])])):_("",!0)])]),a("div",ft,[a("div",ht,s(e.$t("addressSetting")),1),a("div",_t,[a("div",yt,[a("div",kt,s(e.$t("holder")),1),a("div",bt,s(k(d).walletAddress),1)]),a("div",wt,[a("div",gt,s(e.$t("marketingAddress")),1),r(E,{class:"ipt-right",modelValue:W.value,"onUpdate:modelValue":t[21]||(t[21]=o=>W.value=o),placeholder:e.$t("pleaseEnter")},null,8,["modelValue","placeholder"])])])]),a("div",Ct,[a("div",$t,[r(g,{class:"btn",onClick:Ue},{default:b(()=>[I(s(e.$t("previousStep")),1)]),_:1}),r(g,{class:"btn btn-gradient",onClick:Re},{default:b(()=>[I(s(e.$t("nextStep")),1)]),_:1})])])],64)):l.value!=0&&l.value!=5&&y.value==2?(n(),i(le,{key:2},[a("div",Tt,[a("div",null,[a("div",Vt,s(e.$t("manuallyOpenTheTrading")),1),a("div",St,s(e.$t("manuallyOpenTheTradingInfo1"))+s(e.$t("manuallyOpenTheTradingInfo2"))+s(e.$t("manuallyOpenTheTradingInfo3")),1)]),r(U,{modelValue:ee.value,"onUpdate:modelValue":t[22]||(t[22]=o=>ee.value=o),size:"large"},null,8,["modelValue"])]),a("div",Nt,[a("div",null,[a("div",It,s(e.$t("autoKillBlock")),1),Z.value?(n(),D(E,{key:1,class:"ipt-switch",modelValue:G.value,"onUpdate:modelValue":t[23]||(t[23]=o=>G.value=o),type:"number",placeholder:e.$t("pleaseEnterTheNumberOfBlocks")},null,8,["modelValue","placeholder"])):(n(),i("div",Ft,s(e.$t("autoKillBlockInfo")),1))]),r(U,{modelValue:Z.value,"onUpdate:modelValue":t[24]||(t[24]=o=>Z.value=o),size:"large",onChange:nl},null,8,["modelValue"])]),a("div",Lt,[a("div",null,[a("div",At,s(e.$t("taxSwitch")),1),a("div",Et,s(e.$t("taxSwitchInfo")),1)]),r(U,{modelValue:de.value,"onUpdate:modelValue":t[25]||(t[25]=o=>de.value=o),size:"large"},null,8,["modelValue"])]),a("div",Rt,[a("div",null,[a("div",Ut,s(e.$t("whiteList2")),1),a("div",Pt,s(e.$t("whiteList2Info")),1)]),r(U,{modelValue:ve.value,"onUpdate:modelValue":t[26]||(t[26]=o=>ve.value=o),size:"large"},null,8,["modelValue"])]),a("div",Bt,[a("div",null,[a("div",Dt,s(e.$t("maxWalletLimit")),1),te.value?(n(),D(E,{key:1,class:"ipt-switch",modelValue:J.value,"onUpdate:modelValue":t[27]||(t[27]=o=>J.value=o),type:"number",placeholder:e.$t("pleaseEnterMaxWalletNumber")},null,8,["modelValue","placeholder"])):(n(),i("div",Mt,s(e.$t("maxWalletLimitInfo")),1))]),r(U,{modelValue:te.value,"onUpdate:modelValue":t[28]||(t[28]=o=>te.value=o),size:"large"},null,8,["modelValue"])]),a("div",Wt,[a("div",null,[a("div",Ot,s(e.$t("maxSwapLimit")),1),se.value?(n(),D(E,{key:1,class:"ipt-switch",modelValue:Q.value,"onUpdate:modelValue":t[29]||(t[29]=o=>Q.value=o),type:"number",placeholder:e.$t("pleaseEnterMaxSwapNumber")},null,8,["modelValue","placeholder"])):(n(),i("div",zt,s(e.$t("maxSwapLimitInfo")),1))]),r(U,{modelValue:se.value,"onUpdate:modelValue":t[30]||(t[30]=o=>se.value=o),size:"large"},null,8,["modelValue"])]),a("div",Kt,[a("div",Ht,[r(g,{class:"btn",onClick:Ue},{default:b(()=>[I(s(e.$t("previousStep")),1)]),_:1}),r(g,{class:"btn btn-gradient",onClick:De,loading:R.value},{default:b(()=>[I(s(e.$t("create")),1)]),_:1},8,["loading"])])])],64)):(l.value==0||l.value==5)&&y.value==1||l.value!=0&&l.value!=5&&y.value==3?(n(),i("div",qt,[r(Te,{name:"createSuccess"}),a("div",Gt,s(e.$t("createSuccess")),1),r(g,{onClick:t[31]||(t[31]=o=>k(ie).push("/token/list"))},{default:b(()=>[I(s(e.$t("viewToken")),1)]),_:1})])):_("",!0)])]),r(oe,{modelValue:he.value,"onUpdate:modelValue":t[33]||(t[33]=o=>he.value=o),title:e.$t("selectCurrency"),class:"dlg dlg-select-token","destroy-on-close":""},{default:b(()=>[r(Pl,{onSelect:t[32]||(t[32]=o=>sl(o))})]),_:1},8,["modelValue","title"]),r(oe,{modelValue:_e.value,"onUpdate:modelValue":t[35]||(t[35]=o=>_e.value=o),title:e.$t("selectSwap"),class:"dlg dlg-select-token","destroy-on-close":""},{default:b(()=>[r(Tl,{onSelect:t[34]||(t[34]=o=>ol(o))})]),_:1},8,["modelValue","title"]),r(oe,{modelValue:ae.value,"onUpdate:modelValue":t[37]||(t[37]=o=>ae.value=o),title:e.$t("confirmation"),class:"dlg dlg-lock-confirm"},{default:b(()=>[a("ul",Jt,[a("li",null,[a("div",Qt,s(e.$t("contractChian")),1),a("div",jt,[fe.value?(n(),D(u,{key:0,icon:fe.value.chainIcon,text:fe.value.chainShow},null,8,["icon","text"])):_("",!0)])]),a("li",null,[a("div",Xt,s(e.$t("createTemplate")),1),a("div",Yt,s(e.$t(Ne.value.find(o=>o.deployerId==l.value).deployerName)),1)]),a("li",null,[a("div",xt,s(e.$t("tokenNameSymbol")),1),a("div",Zt,s(`${v.value}(${w.value})`),1)]),a("li",null,[a("div",es,s(e.$t("tokenPrecision")),1),a("div",ls,s(C.value),1)]),a("li",null,[a("div",as,s(e.$t("tokenAmount")),1),a("div",ts,s(ne.value),1)]),l.value!=0&&l.value!=5?(n(),i(le,{key:0},[X.value?(n(),i("li",ss,[a("div",os,s(e.$t("poolToken")),1),a("div",ns,[r(u,{icon:X.value.icon,text:X.value.symbol},null,8,["icon","text"])])])):_("",!0),B.value?(n(),i("li",us,[a("div",is,s(e.$t("swap")),1),a("div",rs,[r(u,{icon:B.value.swapIcon,text:B.value.showName},null,8,["icon","text"])])])):_("",!0),l.value==3||l.value==8?(n(),i("li",ds,[a("div",vs,s(e.$t("rewardToken")),1),a("div",cs,s(k(Se)(pe.value,6)),1)])):_("",!0),a("li",null,[a("div",ms,s(e.$t("buyTax1")),1),l.value==1||l.value==6?(n(),i("div",ps,s(e.$t("buyTax1Detail",{buyFundFeeRate:S.value,buyLPFeeRate:F.value,buyBurnFeeRate:Y.value})),1)):l.value==2||l.value==3||l.value==7||l.value==8?(n(),i("div",fs,s(e.$t("buyTax1Detail1",{buyFundFeeRate:S.value,buyLPFeeRate:F.value,buyRewardFeeRate:H.value})),1)):l.value==4?(n(),i("div",hs,s(e.$t("buyTax1Detail2",{buyFundFeeRate:S.value,buyLPFeeRate:F.value,buyRewardFeeRate:H.value,buyBurnFeeRate:Y.value})),1)):_("",!0)]),a("li",null,[a("div",_s,s(e.$t("sellTax1")),1),l.value==1||l.value==6?(n(),i("div",ys,s(e.$t("buyTax1Detail",{buyFundFeeRate:N.value,buyLPFeeRate:L.value,buyBurnFeeRate:x.value})),1)):l.value==2||l.value==3||l.value==7||l.value==8?(n(),i("div",ks,s(e.$t("buyTax1Detail1",{buyFundFeeRate:N.value,buyLPFeeRate:L.value,buyRewardFeeRate:q.value})),1)):l.value==4?(n(),i("div",bs,s(e.$t("buyTax1Detail2",{buyFundFeeRate:N.value,buyLPFeeRate:L.value,buyRewardFeeRate:q.value,buyBurnFeeRate:x.value})),1)):_("",!0)]),a("li",null,[a("div",ws,s(e.$t("marketingAddress")),1),a("div",gs,s(k(Se)(W.value,6)),1)]),Z.value?(n(),i("li",Cs,[a("div",$s,s(e.$t("autoKillBlock1")),1),a("div",Ts,s(G.value),1)])):_("",!0),te.value?(n(),i("li",Vs,[a("div",Ss,s(e.$t("maxWalletLimit")),1),a("div",Ns,s(J.value),1)])):_("",!0),se.value?(n(),i("li",Is,[a("div",Fs,s(e.$t("maxSwapLimit")),1),a("div",Ls,s(Q.value),1)])):_("",!0)],64)):_("",!0),a("li",null,[a("div",As,s(e.$t("ownerAddr")),1),a("div",Es,s(k(Se)(k(d).walletAddress,6)),1)])]),a("div",null,[r(ml,{modelValue:we.value,"onUpdate:modelValue":t[36]||(t[36]=o=>we.value=o)},{default:b(()=>[r(cl,{title:e.$t("openSourceConfig"),name:"1"},{default:b(()=>[Rs,Us,Ps,a("div",Bs,[r(g,{onClick:dl},{default:b(()=>[I(s(e.$t("copySourceCode")),1)]),_:1}),r(g,{onClick:vl},{default:b(()=>[I(s(e.$t("copyConstructorArguments")),1)]),_:1})])]),_:1},8,["title"])]),_:1},8,["modelValue"])]),a("div",Ds,[l.value!==2&&ye.value&&l.value<4?(n(),D(Ce,{key:0,class:"tag"},{default:b(()=>[I(s(e.$t("canMint")),1)]),_:1})):_("",!0),l.value!=0&&l.value!=5?(n(),i(le,{key:1},[ee.value?(n(),D(Ce,{key:0,class:"tag"},{default:b(()=>[I(s(e.$t("manuallyOpenTheTrading")),1)]),_:1})):_("",!0),ve.value?(n(),D(Ce,{key:1,class:"tag"},{default:b(()=>[I(s(e.$t("whiteList2")),1)]),_:1})):_("",!0),de.value?(n(),D(Ce,{key:2,class:"tag"},{default:b(()=>[I(s(e.$t("taxSwitch")),1)]),_:1})):_("",!0),Z.value?(n(),D(Ce,{key:3,class:"tag"},{default:b(()=>[I(s(e.$t("autoKillBlockTag")),1)]),_:1})):_("",!0)],64)):_("",!0)]),k(d).selectedChain&&k(d).selectedChain.create?(n(),i("div",Ms,s(e.$t("creationFee",{baseFeeAmount:Ae.value,baseFeeSymbol:k(d).selectedChain.nativeCurrency.symbol})),1)):_("",!0),a("div",Ws,[r(g,{class:"btn-gradient btn-block",onClick:il,loading:$.value},{default:b(()=>[I(s(e.$t("confirmAndCreate")),1)]),_:1},8,["loading"])])]),_:1},8,["modelValue","title"]),r(oe,{modelValue:A.value,"onUpdate:modelValue":t[38]||(t[38]=o=>A.value=o),width:"500",title:e.$t("taxInstruction"),class:"tax-instruction","destroy-on-close":""},{default:b(()=>[a("div",Os,[a("div",{class:ue(k(d).language)},s(e.$t("taxInstructionText1")),3),a("div",{class:ue(k(d).language)},s(e.$t("taxInstructionText2")),3),a("div",{class:ue(k(d).language)},s(e.$t("taxInstructionText3")),3),l.value==1||l.value==6?(n(),i("div",{key:0,class:ue(k(d).language)},s(e.$t("taxInstructionText4")),3)):_("",!0),l.value==2||l.value==3||l.value==7||l.value==8?(n(),i("div",{key:1,class:ue(k(d).language)},s(e.$t("taxInstructionText5")),3)):_("",!0),a("div",{class:ue(k(d).language)},s(e.$t("taxInstructionText6")),3)])]),_:1},8,["modelValue","title"])],64)}}},Ys=Ke(zs,[["__scopeId","data-v-e5fd41d2"]]);export{Ys as default};