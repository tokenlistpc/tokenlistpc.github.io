import{_ as O}from"./noData-cd778682.js";import{T as Q}from"./TokenIcon-bf3d2694.js";import{u as R,L as W}from"./index-e831cb84.js";import{_ as X,j as y,r as F,a1 as K,V as Z,e as u,K as x,o as s,c as r,f as t,h as n,t as m,y as c,A as h,B as p,z as v,L as ee,b as te,F as T,g as $,l as N}from"./index-fbe4e919.js";/* empty css                                                          */import"./ethers-0cb36f0d.js";import"./wallet-e007cd21.js";import"./units-4a879e1d.js";const le={class:"launchpad"},ae={class:"top-operate"},se={class:"form-input"},oe={class:"search"},ne={class:"item"},ie={class:"select"},ce={class:"item"},ue={class:"label"},de={class:"option"},re={class:"item"},pe={class:"label"},_e={class:"option option-platform"},ve=["src"],me={class:"item"},fe={class:"label"},ge={class:"form-btn"},he={class:"sort"},ke={class:"launchpad-content"},ye={key:0,class:"empty"},be=["fit"],Ce={class:"info"},Se={key:1,class:"list"},Ve={key:0},Le={key:1},Te={class:"pagination"},$e={__name:"Test",setup(we){const w=R(),I=y(""),b=y([]),C=y("all"),S=y("all"),_=y(""),i=F({type:"",isAsc:!1}),o=F({page:1,pageSize:12,total:0,launchpadList:[],loading:!1});_.value=K.get("launchpadShowType","block");function B(){_.value=="block"?o.pageSize=12:_.value=="list"&&(o.pageSize=50)}B(),o.pageSize;function U(a){a!=_.value&&(_.value=a,B(),K.set("launchpadShowType",a))}function V(a){a==i.type?i.isAsc=!i.isAsc:(i.type=a,i.isAsc=!1)}function j(){f()}function E(){f()}function M(){f()}function Y(){f()}async function f(){o.loading=!0;let a;b.value.length>0&&(a=b.value.toString());let l="";C.value!=="all"&&(l=C.value);let L="";S.value!=="all"&&(L=S.value);try{let d=await te.launchpad.getLaunchpadList(o.page,o.pageSize,a,l,L);if(console.log(d),d.data.status==0){o.launchpadList=[],o.total=d.data.data.total;for(let k of d.data.data.list)o.launchpadList.push(k)}}catch(d){console.log(d)}finally{o.loading=!1}}return Z(()=>{f()}),(a,l)=>{const L=u("el-input"),d=u("el-option"),k=u("el-select"),P=u("el-button"),D=u("svg-icon"),A=u("CaretBottom"),g=u("el-icon"),z=u("CaretTop"),q=u("el-col"),G=u("el-row"),H=u("el-pagination"),J=x("loading");return s(),r("div",le,[t("div",ae,[t("div",se,[t("div",oe,[t("div",ne,[n(L,{clearable:"",modelValue:I.value,"onUpdate:modelValue":l[0]||(l[0]=e=>I.value=e),placeholder:"输入名字或代币"},null,8,["modelValue"])])]),t("div",ie,[t("div",ce,[t("div",ue,m(a.$t("network")),1),n(k,{class:"select-chain","collapse-tags":"",modelValue:b.value,"onUpdate:modelValue":l[1]||(l[1]=e=>b.value=e),onChange:j,placeholder:a.$t("selectNetwork"),multiple:""},{default:c(()=>[(s(!0),r(T,null,$(N(w).networks,e=>(s(),p(d,{key:e.value,label:e.name,value:e.value},{default:c(()=>[t("div",de,[n(Q,{class:"token-icon",bigIcon:e.icon},null,8,["bigIcon"]),t("span",null,m(e.name),1)])]),_:2},1032,["label","value"]))),128))]),_:1},8,["modelValue","placeholder"])]),t("div",re,[t("div",pe,m(a.$t("platform1")),1),n(k,{class:"select-platform",modelValue:C.value,"onUpdate:modelValue":l[2]||(l[2]=e=>C.value=e),onChange:E},{default:c(()=>[(s(!0),r(T,null,$(N(w).platforms,e=>(s(),p(d,{key:e.value,label:a.$t(e.name),value:e.value},{default:c(()=>[t("div",_e,[e.icon?(s(),r("img",{key:0,class:"platform-icon",src:e.icon},null,8,ve)):v("",!0),t("span",null,m(a.$t(e.name)),1)])]),_:2},1032,["label","value"]))),128))]),_:1},8,["modelValue"])]),t("div",me,[t("div",fe,m(a.$t("status")),1),n(k,{class:"select-status",modelValue:S.value,"onUpdate:modelValue":l[3]||(l[3]=e=>S.value=e),onChange:M},{default:c(()=>[(s(!0),r(T,null,$(N(w).statusList,e=>(s(),p(d,{key:e.value,label:a.$t(e.name),value:e.value},null,8,["label","value"]))),128))]),_:1},8,["modelValue"])])])]),t("div",ge,[n(P,{type:"primary",class:"btn"},{default:c(()=>[h("筛选")]),_:1}),n(P,{class:"btn"},{default:c(()=>[h("重置")]),_:1}),n(D,{name:_.value=="block"?"blockSelect":"block",class:"icon",onClick:l[4]||(l[4]=e=>U("block"))},null,8,["name"]),n(D,{name:_.value=="list"?"listSelect":"list",class:"icon",onClick:l[5]||(l[5]=e=>U("list"))},null,8,["name"])])]),t("div",he,[t("div",{class:"item",onClick:l[6]||(l[6]=e=>V(""))}," 默认排序 "),t("div",{class:"item",onClick:l[7]||(l[7]=e=>V("tagNum"))},[h(" KYC标签数 "),i.type=="tagNum"&&!i.isAsc?(s(),p(g,{key:0},{default:c(()=>[n(A)]),_:1})):v("",!0),i.type=="tagNum"&&i.isAsc?(s(),p(g,{key:1},{default:c(()=>[n(z)]),_:1})):v("",!0)]),t("div",{class:"item",onClick:l[8]||(l[8]=e=>V("softcap"))},[h(" 软顶 "),i.type=="softcap"&&!i.isAsc?(s(),p(g,{key:0},{default:c(()=>[n(A)]),_:1})):v("",!0),i.type=="softcap"&&i.isAsc?(s(),p(g,{key:1},{default:c(()=>[n(z)]),_:1})):v("",!0)]),t("div",{class:"item",onClick:l[9]||(l[9]=e=>V("createTime"))},[h(" 开始时间 "),i.type=="createTime"&&!i.isAsc?(s(),p(g,{key:0},{default:c(()=>[n(A)]),_:1})):v("",!0),i.type=="createTime"&&i.isAsc?(s(),p(g,{key:1},{default:c(()=>[n(z)]),_:1})):v("",!0)])]),t("div",ke,[!o.loading&&o.launchpadList.length==0?(s(),r("div",ye,[t("img",{style:{width:"80px"},src:O,fit:a.fit},null,8,be),t("div",Ce,[h(m(a.$t("noLaunchpad"))+"，",1),t("span",{onClick:f,style:{color:"#409eff",cursor:"pointer"}},m(a.$t("refresh")),1)])])):ee((s(),r("div",Se,[_.value=="block"?(s(),r("div",Ve,[n(G,{gutter:15},{default:c(()=>[(s(!0),r(T,null,$(o.launchpadList,e=>(s(),p(q,{lg:8,span:12,class:"item",key:e.address},{default:c(()=>[n(W,{launchpadItem:e},null,8,["launchpadItem"])]),_:2},1024))),128))]),_:1})])):_.value=="list"?(s(),r("div",Le)):v("",!0)])),[[J,o.loading]]),t("div",Te,[n(H,{background:"",layout:"prev, pager, next",total:o.total,onCurrentChange:Y,"page-size":o.pageSize,"current-page":o.page,"onUpdate:currentPage":l[10]||(l[10]=e=>o.page=e)},null,8,["total","page-size","current-page"])])])])}}},Fe=X($e,[["__scopeId","data-v-6c199570"]]);export{Fe as default};