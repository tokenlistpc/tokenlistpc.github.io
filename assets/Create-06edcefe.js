import{_ as O,o as n,c,F as S,g as E,f as e,n as j,t as p,e as u,h as l,x as d,a as ae,v as H,u as te,j as m,l as g,y as U,A as B,a4 as de,C as J,k as ie,b as oe,z as I,I as ne,J as ve}from"./index-69c3b067.js";import{T as K}from"./TokenIcon-987642d3.js";import{e as M}from"./ethers-3cdbcc8f.js";/* empty css                                                          */import"./wallet-bfb46ea0.js";import"./units-f2e7ae9e.js";const ce={class:"step"},ue=["onClick"],_e={class:"text"},re={class:"desc"},me={__name:"Step2",props:{stepList:{type:Array,default:[]},current:{type:Number,default:0}},emits:["stepClick"],setup(k,{emit:F}){const w=k;function r(C){C<=w.current&&F("stepClick",C)}return(C,V)=>(n(),c("ul",ce,[(n(!0),c(S,null,E(w.stepList,(P,b)=>(n(),c("li",{key:b},[e("div",{class:j(["step-item",{"step-item-selected":b<=w.current}]),onClick:()=>r(b)},[e("div",{class:j(["num",{"num-selected":b<=w.current}])},p(b+1),3),e("div",_e,[e("div",null,p(P.text),1),e("div",re,p(P.desc),1)])],10,ue)]))),128))]))}},pe=O(me,[["__scopeId","data-v-0bca27b8"]]);const be={class:"help-tip"},he={__name:"HelpTip",props:{text:{type:String,default:""}},setup(k){const F=k;return(w,r)=>{const C=u("QuestionFilled"),V=u("el-icon"),P=u("el-tooltip");return n(),c("div",be,[l(P,{effect:"dark",content:F.text,placement:"top"},{default:d(()=>[l(V,{class:"question",color:"#DFDFDF",size:16},{default:d(()=>[l(C)]),_:1})]),_:1},8,["content"])])}}},_=O(he,[["__scopeId","data-v-a0b5d835"]]);const i=k=>(ne("data-v-e220b082"),k=k(),ve(),k),fe=i(()=>e("h3",{class:"title"},"创建预售",-1)),ye={class:"form"},Ve={class:"form-item"},ge=i(()=>e("div",{class:"label"},"代币地址",-1)),ke={class:"body fl-sb"},we={key:1,class:"error"},Ue={class:"option"},Ce={key:0,class:"verify-token-info"},Be={class:"token-info-item"},Ie=i(()=>e("div",{class:"key"},"名称",-1)),Se={class:"value"},Pe={class:"token-info-item"},Te=i(()=>e("div",{class:"key"},"简称",-1)),Fe={class:"value"},Le={class:"token-info-item"},Ne=i(()=>e("div",{class:"key"},"精度",-1)),$e={class:"value"},ze={class:"token-info-item"},De=i(()=>e("div",{class:"key"},"总供应量",-1)),Ae={class:"value"},Ee={class:"token-info-item"},Re=i(()=>e("div",{class:"key"},"总持有量",-1)),Qe={class:"value"},He={key:0,class:"form-item"},Oe=i(()=>e("div",{class:"label"},"选择底池",-1)),We={class:"body"},qe={class:"tips"},Ge={class:"form-item"},Ye=i(()=>e("div",{class:"label"},"交易所上币选项",-1)),je={class:"body"},Je={key:0,class:"tips"},Ke={key:1,class:"tips"},Me={class:"danger fl-line"},Xe=i(()=>e("div",{class:"text"},"如果代币有交易费用，请确保该代币具有“排除地址交易费用”功能。",-1)),Ze={class:"form-bottom-btns"},xe={class:"form-item"},el={class:"label fl-line"},ll=i(()=>e("div",null,"预售价格",-1)),sl={class:"body"},al={class:"form-item"},tl={class:"label fl-line"},dl=i(()=>e("div",null,"白名单",-1)),il={class:"body"},ol={key:0,class:"fl-line"},nl=i(()=>e("div",null,"白名单预售持续时间",-1)),vl=i(()=>e("div",null,"分钟",-1)),cl={class:"form-item"},ul={class:"label fl-line"},_l=i(()=>e("div",null,"软顶",-1)),rl={class:"body"},ml={class:"form-item"},pl={class:"label fl-line"},bl=i(()=>e("div",null,"硬顶",-1)),hl={class:"body"},fl={class:"form-item"},yl={class:"label fl-line"},Vl=i(()=>e("div",null,"最低投入金额",-1)),gl={class:"body"},kl={class:"form-item"},wl={class:"label fl-line"},Ul=i(()=>e("div",null,"最高投入金额",-1)),Cl={class:"body"},Bl={class:"form-item"},Il={class:"label fl-line"},Sl=i(()=>e("div",null,"退款方式",-1)),Pl={class:"body"},Tl={class:"form-item"},Fl={class:"label fl-line"},Ll=i(()=>e("div",null,"交易所",-1)),Nl={class:"body"},$l={class:"form-item"},zl={class:"label fl-line"},Dl=i(()=>e("div",null,"流动性比例",-1)),Al={class:"body"},El={class:"form-item"},Rl={class:"label fl-line"},Ql=i(()=>e("div",null,"上市价格",-1)),Hl={class:"body"},Ol={class:"form-item"},Wl={class:"label fl-line"},ql=i(()=>e("div",null,"预售开始时间",-1)),Gl={class:"body"},Yl={class:"form-item"},jl={class:"label fl-line"},Jl=i(()=>e("div",null,"预售结束时间",-1)),Kl={class:"body"},Ml={class:"form-item"},Xl={class:"label fl-line"},Zl=i(()=>e("div",null,"流动性锁定时间",-1)),xl={class:"body"},es={class:"form-item"},ls={class:"label fl-line"},ss=i(()=>e("div",null,"上传项目Logo",-1)),as=i(()=>e("div",{class:"body"},null,-1)),ts={class:"form-item"},ds=i(()=>e("div",{class:"label"},"官方网站",-1)),is={class:"body"},os={class:"form-item"},ns=i(()=>e("div",{class:"label"},"Twitter",-1)),vs={class:"body"},cs={class:"form-item"},us=i(()=>e("div",{class:"label"},"Telegram",-1)),_s={class:"body"},rs={class:"form-item"},ms=i(()=>e("div",{class:"label"},"Discord",-1)),ps={class:"body"},bs={class:"form-item"},hs=i(()=>e("div",{class:"label"},"Github",-1)),fs={class:"body"},ys={class:"form-item"},Vs=i(()=>e("div",{class:"label"},"Facebook",-1)),gs={class:"body"},ks={class:"form-item"},ws=i(()=>e("div",{class:"label"},"Reddit",-1)),Us={class:"body"},Cs={class:"form-item"},Bs=i(()=>e("div",{class:"label"},"Instagram",-1)),Is={class:"body"},Ss={class:"form-item"},Ps=i(()=>e("div",{class:"label"},"Youtube 视频",-1)),Ts={class:"body"},Fs={class:"form-item"},Ls=i(()=>e("div",{class:"label"},"项目介绍",-1)),Ns={class:"body"},$s=de('<div class="confirm" data-v-e220b082><div class="confirm-item" data-v-e220b082><div class="label" data-v-e220b082>项目Logo</div><div class="value" data-v-e220b082>Test001</div></div><div class="confirm-item" data-v-e220b082><div class="label" data-v-e220b082>代币全称</div><div class="value" data-v-e220b082>Test001</div></div><div class="confirm-item" data-v-e220b082><div class="label" data-v-e220b082>代币简称</div><div class="value" data-v-e220b082>T001</div></div><div class="confirm-item" data-v-e220b082><div class="label" data-v-e220b082>代币精度</div><div class="value" data-v-e220b082>18</div></div><div class="confirm-item" data-v-e220b082><div class="label" data-v-e220b082>代币地址</div><div class="value" data-v-e220b082>0x103b24029Ffaf25654695709d015cE272224de88</div></div><div class="confirm-item" data-v-e220b082><div class="label" data-v-e220b082>发行总量</div><div class="value" data-v-e220b082>100,000,000</div></div><div class="confirm-item" data-v-e220b082><div class="label" data-v-e220b082>募资代币</div><div class="value" data-v-e220b082>1BNB = 1000 FIST</div></div><div class="confirm-item" data-v-e220b082><div class="label" data-v-e220b082>上市价格</div><div class="value" data-v-e220b082>1BNB = 1000 FIST</div></div><div class="confirm-item" data-v-e220b082><div class="label" data-v-e220b082>软顶</div><div class="value" data-v-e220b082>5 BNB</div></div><div class="confirm-item" data-v-e220b082><div class="label" data-v-e220b082>硬顶</div><div class="value" data-v-e220b082>10 BNB</div></div><div class="confirm-item" data-v-e220b082><div class="label" data-v-e220b082>最低购买额度</div><div class="value" data-v-e220b082>1 BNB</div></div><div class="confirm-item" data-v-e220b082><div class="label" data-v-e220b082>最高购买额度</div><div class="value" data-v-e220b082>2 BNB</div></div><div class="confirm-item" data-v-e220b082><div class="label" data-v-e220b082>白名单持续时间</div><div class="value" data-v-e220b082>100分钟</div></div><div class="confirm-item" data-v-e220b082><div class="label" data-v-e220b082>退款方式</div><div class="value" data-v-e220b082>退款</div></div><div class="confirm-item" data-v-e220b082><div class="label" data-v-e220b082>交易所</div><div class="value" data-v-e220b082>PancakeSwap</div></div><div class="confirm-item" data-v-e220b082><div class="label" data-v-e220b082>流动性比例</div><div class="value" data-v-e220b082>51%</div></div><div class="confirm-item" data-v-e220b082><div class="label" data-v-e220b082>流动性锁定时间</div><div class="value" data-v-e220b082>10天</div></div><div class="confirm-item" data-v-e220b082><div class="label" data-v-e220b082>预售开始时间(UTC)</div><div class="value" data-v-e220b082>2023-9-13 12:00:00</div></div><div class="confirm-item" data-v-e220b082><div class="label" data-v-e220b082>预售结束时间(UTC)</div><div class="value" data-v-e220b082>2023-9-13 12:00:00</div></div><div class="confirm-item" data-v-e220b082><div class="label" data-v-e220b082>是否开启线性释放</div><div class="value" data-v-e220b082>是</div></div><div class="confirm-item" data-v-e220b082><div class="label" data-v-e220b082>首次释放百分比</div><div class="value" data-v-e220b082>10%</div></div><div class="confirm-item" data-v-e220b082><div class="label" data-v-e220b082>释放周期</div><div class="value" data-v-e220b082>1天</div></div><div class="confirm-item" data-v-e220b082><div class="label" data-v-e220b082>每个周期释放百分比</div><div class="value" data-v-e220b082>10%</div></div><div class="confirm-item" data-v-e220b082><div class="label" data-v-e220b082>官方网站</div><div class="value" data-v-e220b082>https://www.google.com</div></div><div class="confirm-item" data-v-e220b082><div class="label" data-v-e220b082>Twitter</div><div class="value" data-v-e220b082>https://www.google.com</div></div><div class="confirm-item" data-v-e220b082><div class="label" data-v-e220b082>Telegram</div><div class="value" data-v-e220b082>https://www.google.com</div></div><div class="confirm-item" data-v-e220b082><div class="label" data-v-e220b082>Discord</div><div class="value" data-v-e220b082>https://www.google.com</div></div><div class="confirm-item" data-v-e220b082><div class="label" data-v-e220b082>Github</div><div class="value" data-v-e220b082>https://www.google.com</div></div><div class="confirm-item" data-v-e220b082><div class="label" data-v-e220b082>Facebook</div><div class="value" data-v-e220b082>https://www.google.com</div></div><div class="confirm-item" data-v-e220b082><div class="label" data-v-e220b082>Reddit</div><div class="value" data-v-e220b082>https://www.google.com</div></div><div class="confirm-item" data-v-e220b082><div class="label" data-v-e220b082>Instagram</div><div class="value" data-v-e220b082>https://www.google.com</div></div><div class="confirm-item" data-v-e220b082><div class="label" data-v-e220b082>Youtube</div><div class="value" data-v-e220b082>https://www.google.com</div></div><div class="confirm-item" data-v-e220b082><div class="label" data-v-e220b082>项目介绍</div><div class="value" data-v-e220b082>这个人很懒。。。这个人很懒。。。这个人很懒。。。这个人很懒。。。</div></div></div><div class="danger" data-v-e220b082>如果您的代币机制中存在交易税率, 请把生成的合约地址 0x4F7A4FE63B8dCeF1294e81908566BE833Ef36829 以及工厂合约地址0x724dED62351e8306636f1a5688b23a7331B05498 放入转账白名单中, 使这两个合约在转 入转出代币时为0税率, 否则会造成预售合约创建失败</div>',2),zs={__name:"Create",setup(k){const F=ae(),w=H(()=>J.chainList.filter(a=>!!a.launchPad&&a.isTestChain==r.isTestChain)),r=te(),C=m([{text:"验证代币",desc:"输入代币地址并验证"},{text:"预售信息",desc:"输入预售相关数据"},{text:"项目信息",desc:"提交你的项目相关信息"},{text:"完成",desc:"检查预售信息并完成提交"}]),V=m(0);m(0);function P(){V.value=V.value+1}const b=m("");m("");const N=m(!1),h=m(null);async function X(){if(b.value)if(ie(b.value))try{const a=await oe.wallet.metamask.contractERC20(b.value),t=await a.name(),z=await a.symbol(),D=await a.decimals(),o=await a.totalSupply(),A=await a.balanceOf(r.walletAddress);h.value={name:t,symbol:z,decimals:D,totalSupply:o,balance:A},N.value=!1}catch{h.value=null,N.value=!0}else h.value=null,N.value=!0}const $=m(""),W=H(()=>{const a=J.chainList.find(t=>t.chain==r.chain);return a&&a.launchPad?($.value=a.launchPad.currencyList[0].address,a.launchPad.currencyList):[]}),f=H(()=>W.value.find(a=>a.address==$.value)),T=m(!0),R=m(!0),q=m(0),G=m(!0),Z=[{value:!0,label:"返还"},{value:!1,label:"销毁"}];return(a,t)=>{const z=u("el-option"),D=u("el-select"),o=u("el-input"),A=u("el-button"),x=u("el-alert"),L=u("el-radio"),Q=u("el-radio-group"),ee=u("Warning"),Y=u("el-icon"),le=u("el-input-number"),v=u("el-col"),y=u("el-row"),se=u("QuestionFilled");return n(),c("div",null,[fe,e("div",null,[l(pe,{"step-list":C.value,current:V.value,onStepClick:t[0]||(t[0]=s=>a.changeStep(s))},null,8,["step-list","current"])]),e("div",ye,[V.value==0?(n(),c(S,{key:0},[e("div",Ve,[ge,e("div",ke,[l(o,{modelValue:b.value,"onUpdate:modelValue":t[1]||(t[1]=s=>b.value=s),onBlur:X,class:"input-with-select",clearable:""},{prepend:d(()=>[l(D,{class:"select-chain","model-value":g(r).chainId?g(r).chainId:" ",onChange:a.selectChain},{prefix:d(()=>[g(r).isConnecting&&g(r).chain&&w.value.some(s=>s.chainId==g(r).chainId)?(n(),B(K,{key:0,class:"token-icon",bigIcon:g(r).chainIcon},null,8,["bigIcon"])):(n(),c("span",we,"ERROR"))]),default:d(()=>[(n(!0),c(S,null,E(w.value,s=>(n(),B(z,{key:s.chainId,label:s.chainShow,value:s.chainId},{default:d(()=>[e("div",Ue,[l(K,{class:"token-icon",bigIcon:s.chainIcon},null,8,["bigIcon"]),e("span",null,p(s.chainShow),1)])]),_:2},1032,["label","value"]))),128))]),_:1},8,["model-value","onChange"])]),_:1},8,["modelValue"]),l(A,{class:"btn btn-gradient create-token",onClick:t[2]||(t[2]=s=>g(F).push("/token/create"))},{default:d(()=>[I("创建代币")]),_:1})]),h.value?(n(),c("div",Ce,[e("div",Be,[Ie,e("div",Se,p(h.value.name),1)]),e("div",Pe,[Te,e("div",Fe,p(h.value.symbol),1)]),e("div",Le,[Ne,e("div",$e,p(h.value.decimals),1)]),e("div",ze,[De,e("div",Ae,p(g(M).formatUnits(h.value.totalSupply,h.value.decimals)),1)]),e("div",Ee,[Re,e("div",Qe,p(g(M).formatUnits(h.value.balance,h.value.decimals)),1)])])):U("",!0),N.value?(n(),B(x,{key:1,class:"token-address-error",title:"无法查询代币信息, 请确认代币地址输入是否正确",type:"error","show-icon":"",closable:!1})):U("",!0)]),f.value?(n(),c("div",He,[Oe,e("div",We,[l(Q,{modelValue:$.value,"onUpdate:modelValue":t[3]||(t[3]=s=>$.value=s)},{default:d(()=>[(n(!0),c(S,null,E(W.value,s=>(n(),B(L,{label:s.address,size:"large"},{default:d(()=>[I(p(s.symbol),1)]),_:2},1032,["label"]))),256))]),_:1},8,["modelValue"]),e("div",qe,"用户将会支付"+p(f.value.symbol)+"来获得你的代币",1)])])):U("",!0),e("div",Ge,[Ye,e("div",je,[l(Q,{modelValue:T.value,"onUpdate:modelValue":t[4]||(t[4]=s=>T.value=s)},{default:d(()=>[l(L,{label:!1,size:"large"},{default:d(()=>[I("手动上币")]),_:1}),l(L,{label:!0,size:"large"},{default:d(()=>[I("自动上币")]),_:1})]),_:1},8,["modelValue"]),T.value?(n(),c("div",Je,"在预售结束之后将自动将流动性添加到交易所中, 并会锁定LP")):(n(),c("div",Ke,"TokenList 不会收取流动性代币费用。预售结束后, 您可以提取BNB, 然后自行上币交易所。"))])]),e("div",Me,[l(Y,null,{default:d(()=>[l(ee)]),_:1}),Xe]),e("div",Ze,[l(A,{class:"btn btn-gradient",onClick:P},{default:d(()=>[I(p(a.$t("nextStep")),1)]),_:1})])],64)):V.value==1?(n(),c(S,{key:1},[e("div",xe,[e("div",el,[ll,l(_,{class:"help",text:`表示花费1 ${f.value.symbol} 能获得多少代币的数量`},null,8,["text"])]),e("div",sl,[l(o,{class:"h40",modelValue:a.input,"onUpdate:modelValue":t[5]||(t[5]=s=>a.input=s)},null,8,["modelValue"])])]),e("div",al,[e("div",tl,[dl,l(_,{class:"help",text:"可指定白名单用户优先参与预售, 在指定的白名单预售持续时间结束之后, 转为公开预售。如持续时间不填写或填写0则永远不会转为公开预售。"})]),e("div",il,[l(Q,{modelValue:R.value,"onUpdate:modelValue":t[6]||(t[6]=s=>R.value=s)},{default:d(()=>[l(L,{label:!0,size:"large"},{default:d(()=>[I("开启")]),_:1}),l(L,{label:!1,size:"large"},{default:d(()=>[I("禁用")]),_:1})]),_:1},8,["modelValue"]),R.value?(n(),c("div",ol,[nl,l(le,{class:"whitelist-duration",modelValue:q.value,"onUpdate:modelValue":t[7]||(t[7]=s=>q.value=s),size:"large",precision:0,min:0,controls:!1},null,8,["modelValue"]),vl])):U("",!0)])]),l(y,{gutter:20},{default:d(()=>[l(v,{span:12},{default:d(()=>[e("div",cl,[e("div",ul,[_l,l(_,{class:"help",text:"最低募资金额, 预售结束后如果低于该金额，预售会失败"})]),e("div",rl,[l(o,{class:"h40",modelValue:a.input,"onUpdate:modelValue":t[8]||(t[8]=s=>a.input=s),placeholder:f.value.symbol},null,8,["modelValue","placeholder"])])])]),_:1}),l(v,{span:12},{default:d(()=>[e("div",ml,[e("div",pl,[bl,l(_,{class:"help",text:"最高募资金额"})]),e("div",hl,[l(o,{class:"h40",modelValue:a.input,"onUpdate:modelValue":t[9]||(t[9]=s=>a.input=s),placeholder:f.value.symbol},null,8,["modelValue","placeholder"])])])]),_:1})]),_:1}),l(y,{gutter:20},{default:d(()=>[l(v,{span:12},{default:d(()=>[e("div",fl,[e("div",yl,[Vl,l(_,{class:"help",text:`每个用户最低购买的 ${f.value.symbol} 数量`},null,8,["text"])]),e("div",gl,[l(o,{class:"h40",modelValue:a.input,"onUpdate:modelValue":t[10]||(t[10]=s=>a.input=s),placeholder:f.value.symbol},null,8,["modelValue","placeholder"])])])]),_:1}),l(v,{span:12},{default:d(()=>[e("div",kl,[e("div",wl,[Ul,l(_,{class:"help",text:`每个用户最高购买的 ${f.value.symbol} 数量`},null,8,["text"])]),e("div",Cl,[l(o,{class:"h40",modelValue:a.input,"onUpdate:modelValue":t[11]||(t[11]=s=>a.input=s),placeholder:f.value.symbol},null,8,["modelValue","placeholder"])])])]),_:1})]),_:1}),l(y,{gutter:20},{default:d(()=>[l(v,{span:12},{default:d(()=>[e("div",Bl,[e("div",Il,[Sl,l(_,{class:"help",text:"预售完成后，预售合约内剩余代币的处理方式"})]),e("div",Pl,[l(D,{class:"h40 line-select",modelValue:G.value,"onUpdate:modelValue":t[12]||(t[12]=s=>G.value=s),size:"large"},{default:d(()=>[(n(),c(S,null,E(Z,s=>l(z,{key:s.value,label:s.label,value:s.value},null,8,["label","value"])),64))]),_:1},8,["modelValue"])])])]),_:1}),T.value?(n(),B(v,{key:0,span:12},{default:d(()=>[e("div",Tl,[e("div",Fl,[Ll,l(_,{class:"help",text:"选择上币发行的交易所"})]),e("div",Nl,[l(o,{class:"h40",modelValue:a.input,"onUpdate:modelValue":t[13]||(t[13]=s=>a.input=s),placeholder:"Please input"},null,8,["modelValue"])])])]),_:1})):U("",!0)]),_:1}),T.value?(n(),B(y,{key:0,gutter:20},{default:d(()=>[l(v,{span:12},{default:d(()=>[e("div",$l,[e("div",zl,[Dl,l(_,{class:"help",text:"预售完成后, 将募集金额中该比例对应的BNB加入流动池, 最低为51%"})]),e("div",Al,[l(o,{class:"h40",modelValue:a.input,"onUpdate:modelValue":t[14]||(t[14]=s=>a.input=s),placeholder:"%"},null,8,["modelValue"])])])]),_:1}),l(v,{span:12},{default:d(()=>[e("div",El,[e("div",Rl,[Ql,l(_,{class:"help",text:`预售完成后向交易所中添加流动性时的价格,即1 ${f.value.symbol} 可兑换的代币数量, 此数量必须小于等于预售价格填写的数量`},null,8,["text"])]),e("div",Hl,[l(o,{class:"h40",modelValue:a.input,"onUpdate:modelValue":t[15]||(t[15]=s=>a.input=s),placeholder:"Please input"},null,8,["modelValue"])])])]),_:1})]),_:1})):U("",!0),l(y,{gutter:20},{default:d(()=>[l(v,{span:12},{default:d(()=>[e("div",Ol,[e("div",Wl,[ql,l(_,{class:"help",text:"不得早于当前时间后的10分钟"})]),e("div",Gl,[l(o,{class:"h40",modelValue:a.input,"onUpdate:modelValue":t[16]||(t[16]=s=>a.input=s),placeholder:"Please input"},null,8,["modelValue"])])])]),_:1}),l(v,{span:12},{default:d(()=>[e("div",Yl,[e("div",jl,[Jl,l(_,{class:"help",text:"不得早于预售开始时间后的1小时"})]),e("div",Kl,[l(o,{class:"h40",modelValue:a.input,"onUpdate:modelValue":t[17]||(t[17]=s=>a.input=s),placeholder:"Please input"},null,8,["modelValue"])])])]),_:1})]),_:1}),T.value?(n(),B(y,{key:1,gutter:20},{default:d(()=>[l(v,{span:12},{default:d(()=>[e("div",Ml,[e("div",Xl,[Zl,l(_,{class:"help",text:"最低1天"})]),e("div",xl,[l(o,{class:"h40",modelValue:a.input,"onUpdate:modelValue":t[18]||(t[18]=s=>a.input=s),placeholder:"天"},null,8,["modelValue"])])])]),_:1})]),_:1})):U("",!0)],64)):V.value==2?(n(),c(S,{key:2},[e("div",es,[e("div",ls,[ss,l(Y,{class:"question",color:"#DFDFDF",size:16},{default:d(()=>[l(se)]),_:1})]),as]),l(y,{gutter:20},{default:d(()=>[l(v,{span:12},{default:d(()=>[e("div",ts,[ds,e("div",is,[l(o,{modelValue:a.input,"onUpdate:modelValue":t[19]||(t[19]=s=>a.input=s),placeholder:"Please input"},null,8,["modelValue"])])])]),_:1}),l(v,{span:12},{default:d(()=>[e("div",os,[ns,e("div",vs,[l(o,{modelValue:a.input,"onUpdate:modelValue":t[20]||(t[20]=s=>a.input=s),placeholder:"Please input"},null,8,["modelValue"])])])]),_:1})]),_:1}),l(y,{gutter:20},{default:d(()=>[l(v,{span:12},{default:d(()=>[e("div",cs,[us,e("div",_s,[l(o,{modelValue:a.input,"onUpdate:modelValue":t[21]||(t[21]=s=>a.input=s),placeholder:"Please input"},null,8,["modelValue"])])])]),_:1}),l(v,{span:12},{default:d(()=>[e("div",rs,[ms,e("div",ps,[l(o,{modelValue:a.input,"onUpdate:modelValue":t[22]||(t[22]=s=>a.input=s),placeholder:"Please input"},null,8,["modelValue"])])])]),_:1})]),_:1}),l(y,{gutter:20},{default:d(()=>[l(v,{span:12},{default:d(()=>[e("div",bs,[hs,e("div",fs,[l(o,{modelValue:a.input,"onUpdate:modelValue":t[23]||(t[23]=s=>a.input=s),placeholder:"Please input"},null,8,["modelValue"])])])]),_:1}),l(v,{span:12},{default:d(()=>[e("div",ys,[Vs,e("div",gs,[l(o,{modelValue:a.input,"onUpdate:modelValue":t[24]||(t[24]=s=>a.input=s),placeholder:"Please input"},null,8,["modelValue"])])])]),_:1})]),_:1}),l(y,{gutter:20},{default:d(()=>[l(v,{span:12},{default:d(()=>[e("div",ks,[ws,e("div",Us,[l(o,{modelValue:a.input,"onUpdate:modelValue":t[25]||(t[25]=s=>a.input=s),placeholder:"Please input"},null,8,["modelValue"])])])]),_:1}),l(v,{span:12},{default:d(()=>[e("div",Cs,[Bs,e("div",Is,[l(o,{modelValue:a.input,"onUpdate:modelValue":t[26]||(t[26]=s=>a.input=s),placeholder:"Please input"},null,8,["modelValue"])])])]),_:1})]),_:1}),e("div",Ss,[Ps,e("div",Ts,[l(o,{modelValue:a.input,"onUpdate:modelValue":t[27]||(t[27]=s=>a.input=s),placeholder:"Please input"},null,8,["modelValue"])])]),e("div",Fs,[Ls,e("div",Ns,[l(o,{modelValue:a.input,"onUpdate:modelValue":t[28]||(t[28]=s=>a.input=s),placeholder:"Please input"},null,8,["modelValue"])])]),$s],64)):U("",!0)])])}}},Os=O(zs,[["__scopeId","data-v-e220b082"]]);export{Os as default};