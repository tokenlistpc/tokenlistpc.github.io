import{_ as T,o as f,c as F,F as q,g as N,f as e,n as C,t as D,x as A,u as R,j as P,e as c,h as l,y as t,a4 as G,l as p,B as z,m as S,A as r,I as Q,J as W}from"./index-7d5848cc.js";const Y={class:"step"},j=["onClick"],J={class:"text"},O={class:"desc"},H={__name:"Step2",props:{stepList:{type:Array,default:[]},current:{type:Number,default:0}},emits:["stepClick"],setup(V,{emit:y}){const m=V;function U(b){b<=m.current&&y("stepClick",b)}return(b,h)=>(f(),F("ul",Y,[(f(!0),F(q,null,N(m.stepList,(w,s)=>(f(),F("li",{key:s},[e("div",{class:C(["step-item",{"step-item-selected":s<=m.current}]),onClick:()=>U(s)},[e("div",{class:C(["num",{"num-selected":s<=m.current}])},D(s+1),3),e("div",J,[e("div",null,D(w.text),1),e("div",O,D(w.desc),1)])],10,j)]))),128))]))}},K=T(H,[["__scopeId","data-v-0bca27b8"]]);const i=V=>(Q("data-v-6a412e00"),V=V(),W(),V),M=i(()=>e("h3",{class:"title"},"创建预售",-1)),X={class:"form"},Z={class:"form-item"},x=i(()=>e("div",{class:"label"},"代币地址",-1)),ee={class:"body fl-sb"},le={key:1,class:"error"},ae={class:"option"},se={class:"form-item"},de=i(()=>e("div",{class:"label"},"选择底池",-1)),te={class:"body"},ie=i(()=>e("div",null,"用户将会支付BNB来获得你的代币",-1)),oe={class:"form-item"},ne=i(()=>e("div",{class:"label"},"交易所上币选项",-1)),ve={class:"body"},ue=i(()=>e("div",null,"用户将会支付BNB来获得你的代币",-1)),ce={class:"danger fl-line"},me=i(()=>e("div",{class:"text"},"如果代币有交易费用，请确保该代币具有“排除地址交易费用”功能。",-1)),_e={class:"form-item"},pe={class:"label fl-line"},re=i(()=>e("div",null,"预售价格",-1)),fe={class:"body"},be={class:"form-item"},he={class:"label fl-line"},Ve=i(()=>e("div",null,"白名单",-1)),ge={class:"body"},Fe={class:"fl-line"},De=i(()=>e("div",null,"白名单预售持续时间",-1)),ye=i(()=>e("div",null,"分钟",-1)),we={class:"form-item"},Ue={class:"label fl-line"},ke=i(()=>e("div",null,"软顶",-1)),Pe={class:"body"},Be={class:"form-item"},Ie={class:"label fl-line"},Ce=i(()=>e("div",null,"硬顶",-1)),ze={class:"body"},Se={class:"form-item"},Te={class:"label fl-line"},qe=i(()=>e("div",null,"最低投入金额",-1)),Ne={class:"body"},Le={class:"form-item"},Ee={class:"label fl-line"},$e=i(()=>e("div",null,"最高投入金额",-1)),Ae={class:"body"},Re={class:"form-item"},Ge={class:"label fl-line"},Qe=i(()=>e("div",null,"退款方式",-1)),We={class:"body"},Ye={class:"form-item"},je={class:"label fl-line"},Je=i(()=>e("div",null,"交易所",-1)),Oe={class:"body"},He={class:"form-item"},Ke={class:"label fl-line"},Me=i(()=>e("div",null,"流动性比例",-1)),Xe={class:"body"},Ze={class:"form-item"},xe={class:"label fl-line"},el=i(()=>e("div",null,"上市价格",-1)),ll={class:"body"},al={class:"form-item"},sl={class:"label fl-line"},dl=i(()=>e("div",null,"预售开始时间",-1)),tl={class:"body"},il={class:"form-item"},ol={class:"label fl-line"},nl=i(()=>e("div",null,"预售结束时间",-1)),vl={class:"body"},ul={class:"form-item"},cl=i(()=>e("div",{class:"label fl-line"},[e("div",null,"开启线性释放")],-1)),ml={class:"body"},_l={class:"form-item"},pl={class:"label fl-line"},rl=i(()=>e("div",null,"流动性锁定时间",-1)),fl={class:"body"},bl={class:"form-item"},hl={class:"label fl-line"},Vl=i(()=>e("div",null,"上传项目Logo",-1)),gl=i(()=>e("div",{class:"body"},null,-1)),Fl={class:"form-item"},Dl=i(()=>e("div",{class:"label"},"官方网站",-1)),yl={class:"body"},wl={class:"form-item"},Ul=i(()=>e("div",{class:"label"},"Twitter",-1)),kl={class:"body"},Pl={class:"form-item"},Bl=i(()=>e("div",{class:"label"},"Telegram",-1)),Il={class:"body"},Cl={class:"form-item"},zl=i(()=>e("div",{class:"label"},"Discord",-1)),Sl={class:"body"},Tl={class:"form-item"},ql=i(()=>e("div",{class:"label"},"Github",-1)),Nl={class:"body"},Ll={class:"form-item"},El=i(()=>e("div",{class:"label"},"Facebook",-1)),$l={class:"body"},Al={class:"form-item"},Rl=i(()=>e("div",{class:"label"},"Reddit",-1)),Gl={class:"body"},Ql={class:"form-item"},Wl=i(()=>e("div",{class:"label"},"Instagram",-1)),Yl={class:"body"},jl={class:"form-item"},Jl=i(()=>e("div",{class:"label"},"Youtube 视频",-1)),Ol={class:"body"},Hl={class:"form-item"},Kl=i(()=>e("div",{class:"label"},"项目介绍",-1)),Ml={class:"body"},Xl=G('<div class="confirm" data-v-6a412e00><div class="confirm-item" data-v-6a412e00><div class="label" data-v-6a412e00>项目Logo</div><div class="value" data-v-6a412e00>Test001</div></div><div class="confirm-item" data-v-6a412e00><div class="label" data-v-6a412e00>代币全称</div><div class="value" data-v-6a412e00>Test001</div></div><div class="confirm-item" data-v-6a412e00><div class="label" data-v-6a412e00>代币简称</div><div class="value" data-v-6a412e00>T001</div></div><div class="confirm-item" data-v-6a412e00><div class="label" data-v-6a412e00>代币精度</div><div class="value" data-v-6a412e00>18</div></div><div class="confirm-item" data-v-6a412e00><div class="label" data-v-6a412e00>代币地址</div><div class="value" data-v-6a412e00>0x103b24029Ffaf25654695709d015cE272224de88</div></div><div class="confirm-item" data-v-6a412e00><div class="label" data-v-6a412e00>发行总量</div><div class="value" data-v-6a412e00>100,000,000</div></div><div class="confirm-item" data-v-6a412e00><div class="label" data-v-6a412e00>募资代币</div><div class="value" data-v-6a412e00>1BNB = 1000 FIST</div></div><div class="confirm-item" data-v-6a412e00><div class="label" data-v-6a412e00>上市价格</div><div class="value" data-v-6a412e00>1BNB = 1000 FIST</div></div><div class="confirm-item" data-v-6a412e00><div class="label" data-v-6a412e00>软顶</div><div class="value" data-v-6a412e00>5 BNB</div></div><div class="confirm-item" data-v-6a412e00><div class="label" data-v-6a412e00>硬顶</div><div class="value" data-v-6a412e00>10 BNB</div></div><div class="confirm-item" data-v-6a412e00><div class="label" data-v-6a412e00>最低购买额度</div><div class="value" data-v-6a412e00>1 BNB</div></div><div class="confirm-item" data-v-6a412e00><div class="label" data-v-6a412e00>最高购买额度</div><div class="value" data-v-6a412e00>2 BNB</div></div><div class="confirm-item" data-v-6a412e00><div class="label" data-v-6a412e00>白名单持续时间</div><div class="value" data-v-6a412e00>100分钟</div></div><div class="confirm-item" data-v-6a412e00><div class="label" data-v-6a412e00>退款方式</div><div class="value" data-v-6a412e00>退款</div></div><div class="confirm-item" data-v-6a412e00><div class="label" data-v-6a412e00>交易所</div><div class="value" data-v-6a412e00>PancakeSwap</div></div><div class="confirm-item" data-v-6a412e00><div class="label" data-v-6a412e00>流动性比例</div><div class="value" data-v-6a412e00>51%</div></div><div class="confirm-item" data-v-6a412e00><div class="label" data-v-6a412e00>流动性锁定时间</div><div class="value" data-v-6a412e00>10天</div></div><div class="confirm-item" data-v-6a412e00><div class="label" data-v-6a412e00>预售开始时间(UTC)</div><div class="value" data-v-6a412e00>2023-9-13 12:00:00</div></div><div class="confirm-item" data-v-6a412e00><div class="label" data-v-6a412e00>预售结束时间(UTC)</div><div class="value" data-v-6a412e00>2023-9-13 12:00:00</div></div><div class="confirm-item" data-v-6a412e00><div class="label" data-v-6a412e00>是否开启线性释放</div><div class="value" data-v-6a412e00>是</div></div><div class="confirm-item" data-v-6a412e00><div class="label" data-v-6a412e00>首次释放百分比</div><div class="value" data-v-6a412e00>10%</div></div><div class="confirm-item" data-v-6a412e00><div class="label" data-v-6a412e00>释放周期</div><div class="value" data-v-6a412e00>1天</div></div><div class="confirm-item" data-v-6a412e00><div class="label" data-v-6a412e00>每个周期释放百分比</div><div class="value" data-v-6a412e00>10%</div></div><div class="confirm-item" data-v-6a412e00><div class="label" data-v-6a412e00>官方网站</div><div class="value" data-v-6a412e00>https://www.google.com</div></div><div class="confirm-item" data-v-6a412e00><div class="label" data-v-6a412e00>Twitter</div><div class="value" data-v-6a412e00>https://www.google.com</div></div><div class="confirm-item" data-v-6a412e00><div class="label" data-v-6a412e00>Telegram</div><div class="value" data-v-6a412e00>https://www.google.com</div></div><div class="confirm-item" data-v-6a412e00><div class="label" data-v-6a412e00>Discord</div><div class="value" data-v-6a412e00>https://www.google.com</div></div><div class="confirm-item" data-v-6a412e00><div class="label" data-v-6a412e00>Github</div><div class="value" data-v-6a412e00>https://www.google.com</div></div><div class="confirm-item" data-v-6a412e00><div class="label" data-v-6a412e00>Facebook</div><div class="value" data-v-6a412e00>https://www.google.com</div></div><div class="confirm-item" data-v-6a412e00><div class="label" data-v-6a412e00>Reddit</div><div class="value" data-v-6a412e00>https://www.google.com</div></div><div class="confirm-item" data-v-6a412e00><div class="label" data-v-6a412e00>Instagram</div><div class="value" data-v-6a412e00>https://www.google.com</div></div><div class="confirm-item" data-v-6a412e00><div class="label" data-v-6a412e00>Youtube</div><div class="value" data-v-6a412e00>https://www.google.com</div></div><div class="confirm-item" data-v-6a412e00><div class="label" data-v-6a412e00>项目介绍</div><div class="value" data-v-6a412e00>这个人很懒。。。这个人很懒。。。这个人很懒。。。这个人很懒。。。</div></div></div><div class="danger" data-v-6a412e00>如果您的代币机制中存在交易税率, 请把生成的合约地址 0x4F7A4FE63B8dCeF1294e81908566BE833Ef36829 以及工厂合约地址0x724dED62351e8306636f1a5688b23a7331B05498 放入转账白名单中, 使这两个合约在转 入转出代币时为0税率, 否则会造成预售合约创建失败</div>',2),Zl={class:"form-bottom-btns"},xl={__name:"Create",setup(V){const y=A.chainList.filter(s=>!!s.create),m=R(),U=P([{text:"验证代币",desc:"输入代币地址并验证"},{text:"预售信息",desc:"输入预售相关数据"},{text:"项目信息",desc:"提交你的项目相关信息"},{text:"完成",desc:"检查预售信息并完成提交"}]),b=P(0),h=P(0);function w(){b.value=b.value+1}return(s,d)=>{const B=c("TokenIcon"),L=c("el-option"),E=c("el-select"),o=c("el-input"),I=c("el-button"),g=c("el-radio"),k=c("el-radio-group"),$=c("Warning"),v=c("el-icon"),u=c("QuestionFilled"),n=c("el-col"),_=c("el-row");return f(),F("div",null,[M,e("div",null,[l(K,{"step-list":U.value,current:b.value,onStepClick:d[0]||(d[0]=a=>s.changeStep(a))},null,8,["step-list","current"])]),e("div",X,[e("div",Z,[x,e("div",ee,[l(o,{modelValue:s.tokenAddress,"onUpdate:modelValue":d[1]||(d[1]=a=>s.tokenAddress=a),placeholder:s.$t("tokenLPToken"),onInput:s.searchLockList,class:"input-with-select",clearable:""},{prepend:t(()=>[l(E,{class:"select-chain","model-value":p(m).chainId?p(m).chainId:" ",onChange:s.selectChain},{prefix:t(()=>[p(m).isConnecting&&p(m).chain&&p(y).some(a=>a.chainId==p(m).chainId)?(f(),z(B,{key:0,class:"token-icon",bigIcon:p(S)(p(m).chain)},null,8,["bigIcon"])):(f(),F("span",le,"ERROR"))]),default:t(()=>[(f(!0),F(q,null,N(p(y),a=>(f(),z(L,{key:a.chainId,label:a.chainShow,value:a.chainId},{default:t(()=>[e("div",ae,[l(B,{class:"token-icon",bigIcon:p(S)(a.chain.toLowerCase())},null,8,["bigIcon"]),e("span",null,D(a.chainShow),1)])]),_:2},1032,["label","value"]))),128))]),_:1},8,["model-value","onChange"])]),_:1},8,["modelValue","placeholder","onInput"]),l(I,{class:"btn btn-gradient create-token"},{default:t(()=>[r("创建代币")]),_:1})])]),e("div",se,[de,e("div",te,[l(k,{modelValue:h.value,"onUpdate:modelValue":d[2]||(d[2]=a=>h.value=a)},{default:t(()=>[l(g,{label:"1",size:"large"},{default:t(()=>[r("BNB")]),_:1}),l(g,{label:"2",size:"large"},{default:t(()=>[r("USDT")]),_:1})]),_:1},8,["modelValue"]),ie])]),e("div",oe,[ne,e("div",ve,[l(k,{modelValue:h.value,"onUpdate:modelValue":d[3]||(d[3]=a=>h.value=a)},{default:t(()=>[l(g,{label:"1",size:"large"},{default:t(()=>[r("手动上币")]),_:1}),l(g,{label:"2",size:"large"},{default:t(()=>[r("自动上币")]),_:1})]),_:1},8,["modelValue"]),ue])]),e("div",ce,[l(v,null,{default:t(()=>[l($)]),_:1}),me]),e("div",_e,[e("div",pe,[re,l(v,{class:"question",color:"#DFDFDF",size:16},{default:t(()=>[l(u)]),_:1})]),e("div",fe,[l(o,{modelValue:s.input,"onUpdate:modelValue":d[4]||(d[4]=a=>s.input=a),placeholder:"Please input"},null,8,["modelValue"])])]),e("div",be,[e("div",he,[Ve,l(v,{class:"question",color:"#DFDFDF",size:16},{default:t(()=>[l(u)]),_:1})]),e("div",ge,[l(k,{modelValue:h.value,"onUpdate:modelValue":d[5]||(d[5]=a=>h.value=a)},{default:t(()=>[l(g,{label:"1",size:"large"},{default:t(()=>[r("开启")]),_:1}),l(g,{label:"2",size:"large"},{default:t(()=>[r("禁用")]),_:1})]),_:1},8,["modelValue"]),e("div",Fe,[De,l(o,{modelValue:s.input,"onUpdate:modelValue":d[6]||(d[6]=a=>s.input=a),placeholder:"Please input"},null,8,["modelValue"]),ye])])]),l(_,{gutter:20},{default:t(()=>[l(n,{span:12},{default:t(()=>[e("div",we,[e("div",Ue,[ke,l(v,{class:"question",color:"#DFDFDF",size:16},{default:t(()=>[l(u)]),_:1})]),e("div",Pe,[l(o,{modelValue:s.input,"onUpdate:modelValue":d[7]||(d[7]=a=>s.input=a),placeholder:"Please input"},null,8,["modelValue"])])])]),_:1}),l(n,{span:12},{default:t(()=>[e("div",Be,[e("div",Ie,[Ce,l(v,{class:"question",color:"#DFDFDF",size:16},{default:t(()=>[l(u)]),_:1})]),e("div",ze,[l(o,{modelValue:s.input,"onUpdate:modelValue":d[8]||(d[8]=a=>s.input=a),placeholder:"Please input"},null,8,["modelValue"])])])]),_:1})]),_:1}),l(_,{gutter:20},{default:t(()=>[l(n,{span:12},{default:t(()=>[e("div",Se,[e("div",Te,[qe,l(v,{class:"question",color:"#DFDFDF",size:16},{default:t(()=>[l(u)]),_:1})]),e("div",Ne,[l(o,{modelValue:s.input,"onUpdate:modelValue":d[9]||(d[9]=a=>s.input=a),placeholder:"Please input"},null,8,["modelValue"])])])]),_:1}),l(n,{span:12},{default:t(()=>[e("div",Le,[e("div",Ee,[$e,l(v,{class:"question",color:"#DFDFDF",size:16},{default:t(()=>[l(u)]),_:1})]),e("div",Ae,[l(o,{modelValue:s.input,"onUpdate:modelValue":d[10]||(d[10]=a=>s.input=a),placeholder:"Please input"},null,8,["modelValue"])])])]),_:1})]),_:1}),l(_,{gutter:20},{default:t(()=>[l(n,{span:12},{default:t(()=>[e("div",Re,[e("div",Ge,[Qe,l(v,{class:"question",color:"#DFDFDF",size:16},{default:t(()=>[l(u)]),_:1})]),e("div",We,[l(o,{modelValue:s.input,"onUpdate:modelValue":d[11]||(d[11]=a=>s.input=a),placeholder:"Please input"},null,8,["modelValue"])])])]),_:1}),l(n,{span:12},{default:t(()=>[e("div",Ye,[e("div",je,[Je,l(v,{class:"question",color:"#DFDFDF",size:16},{default:t(()=>[l(u)]),_:1})]),e("div",Oe,[l(o,{modelValue:s.input,"onUpdate:modelValue":d[12]||(d[12]=a=>s.input=a),placeholder:"Please input"},null,8,["modelValue"])])])]),_:1})]),_:1}),l(_,{gutter:20},{default:t(()=>[l(n,{span:12},{default:t(()=>[e("div",He,[e("div",Ke,[Me,l(v,{class:"question",color:"#DFDFDF",size:16},{default:t(()=>[l(u)]),_:1})]),e("div",Xe,[l(o,{modelValue:s.input,"onUpdate:modelValue":d[13]||(d[13]=a=>s.input=a),placeholder:"Please input"},null,8,["modelValue"])])])]),_:1}),l(n,{span:12},{default:t(()=>[e("div",Ze,[e("div",xe,[el,l(v,{class:"question",color:"#DFDFDF",size:16},{default:t(()=>[l(u)]),_:1})]),e("div",ll,[l(o,{modelValue:s.input,"onUpdate:modelValue":d[14]||(d[14]=a=>s.input=a),placeholder:"Please input"},null,8,["modelValue"])])])]),_:1})]),_:1}),l(_,{gutter:20},{default:t(()=>[l(n,{span:12},{default:t(()=>[e("div",al,[e("div",sl,[dl,l(v,{class:"question",color:"#DFDFDF",size:16},{default:t(()=>[l(u)]),_:1})]),e("div",tl,[l(o,{modelValue:s.input,"onUpdate:modelValue":d[15]||(d[15]=a=>s.input=a),placeholder:"Please input"},null,8,["modelValue"])])])]),_:1}),l(n,{span:12},{default:t(()=>[e("div",il,[e("div",ol,[nl,l(v,{class:"question",color:"#DFDFDF",size:16},{default:t(()=>[l(u)]),_:1})]),e("div",vl,[l(o,{modelValue:s.input,"onUpdate:modelValue":d[16]||(d[16]=a=>s.input=a),placeholder:"Please input"},null,8,["modelValue"])])])]),_:1})]),_:1}),l(_,{gutter:20},{default:t(()=>[l(n,{span:12},{default:t(()=>[e("div",ul,[cl,e("div",ml,[l(o,{modelValue:s.input,"onUpdate:modelValue":d[17]||(d[17]=a=>s.input=a),placeholder:"Please input"},null,8,["modelValue"]),l(o,{modelValue:s.input,"onUpdate:modelValue":d[18]||(d[18]=a=>s.input=a),placeholder:"Please input"},null,8,["modelValue"]),l(o,{modelValue:s.input,"onUpdate:modelValue":d[19]||(d[19]=a=>s.input=a),placeholder:"Please input"},null,8,["modelValue"])])])]),_:1}),l(n,{span:12},{default:t(()=>[e("div",_l,[e("div",pl,[rl,l(v,{class:"question",color:"#DFDFDF",size:16},{default:t(()=>[l(u)]),_:1})]),e("div",fl,[l(o,{modelValue:s.input,"onUpdate:modelValue":d[20]||(d[20]=a=>s.input=a),placeholder:"Please input"},null,8,["modelValue"])])])]),_:1})]),_:1}),e("div",bl,[e("div",hl,[Vl,l(v,{class:"question",color:"#DFDFDF",size:16},{default:t(()=>[l(u)]),_:1})]),gl]),l(_,{gutter:20},{default:t(()=>[l(n,{span:12},{default:t(()=>[e("div",Fl,[Dl,e("div",yl,[l(o,{modelValue:s.input,"onUpdate:modelValue":d[21]||(d[21]=a=>s.input=a),placeholder:"Please input"},null,8,["modelValue"])])])]),_:1}),l(n,{span:12},{default:t(()=>[e("div",wl,[Ul,e("div",kl,[l(o,{modelValue:s.input,"onUpdate:modelValue":d[22]||(d[22]=a=>s.input=a),placeholder:"Please input"},null,8,["modelValue"])])])]),_:1})]),_:1}),l(_,{gutter:20},{default:t(()=>[l(n,{span:12},{default:t(()=>[e("div",Pl,[Bl,e("div",Il,[l(o,{modelValue:s.input,"onUpdate:modelValue":d[23]||(d[23]=a=>s.input=a),placeholder:"Please input"},null,8,["modelValue"])])])]),_:1}),l(n,{span:12},{default:t(()=>[e("div",Cl,[zl,e("div",Sl,[l(o,{modelValue:s.input,"onUpdate:modelValue":d[24]||(d[24]=a=>s.input=a),placeholder:"Please input"},null,8,["modelValue"])])])]),_:1})]),_:1}),l(_,{gutter:20},{default:t(()=>[l(n,{span:12},{default:t(()=>[e("div",Tl,[ql,e("div",Nl,[l(o,{modelValue:s.input,"onUpdate:modelValue":d[25]||(d[25]=a=>s.input=a),placeholder:"Please input"},null,8,["modelValue"])])])]),_:1}),l(n,{span:12},{default:t(()=>[e("div",Ll,[El,e("div",$l,[l(o,{modelValue:s.input,"onUpdate:modelValue":d[26]||(d[26]=a=>s.input=a),placeholder:"Please input"},null,8,["modelValue"])])])]),_:1})]),_:1}),l(_,{gutter:20},{default:t(()=>[l(n,{span:12},{default:t(()=>[e("div",Al,[Rl,e("div",Gl,[l(o,{modelValue:s.input,"onUpdate:modelValue":d[27]||(d[27]=a=>s.input=a),placeholder:"Please input"},null,8,["modelValue"])])])]),_:1}),l(n,{span:12},{default:t(()=>[e("div",Ql,[Wl,e("div",Yl,[l(o,{modelValue:s.input,"onUpdate:modelValue":d[28]||(d[28]=a=>s.input=a),placeholder:"Please input"},null,8,["modelValue"])])])]),_:1})]),_:1}),e("div",jl,[Jl,e("div",Ol,[l(o,{modelValue:s.input,"onUpdate:modelValue":d[29]||(d[29]=a=>s.input=a),placeholder:"Please input"},null,8,["modelValue"])])]),e("div",Hl,[Kl,e("div",Ml,[l(o,{modelValue:s.input,"onUpdate:modelValue":d[30]||(d[30]=a=>s.input=a),placeholder:"Please input"},null,8,["modelValue"])])]),Xl,e("div",Zl,[l(I,{class:"btn btn-gradient",onClick:w},{default:t(()=>[r(D(s.$t("nextStep")),1)]),_:1})])])])}}},la=T(xl,[["__scopeId","data-v-6a412e00"]]);export{la as default};
