import{_ as m,v as p,B as t,e as i,o,c as l,l as d,A as u,f as c,t as s,y as g}from"./index-f14fe284.js";/* empty css                                                         */const y={key:2,class:"progress-data"},f={__name:"Progress",props:{cumulateAmount:{type:String,default:"0"},topAmount:{type:String,default:"0"},symbol:{type:String,default:"BNB"},strokeWidth:{type:String,default:"6"},isShowData:{type:Boolean,default:!1}},setup(a){const e=a,r=p(()=>t(e.cumulateAmount).lte(e.topAmount)?t(e.cumulateAmount).dividedBy(e.topAmount).multipliedBy(100).toString():t(e.topAmount).dividedBy(e.cumulateAmount).multipliedBy(100).toString());return(_,A)=>{const n=i("el-progress");return o(),l("div",null,[d(t)(e.cumulateAmount).lte(e.topAmount)?(o(),u(n,{key:0,color:"rgba(72, 199, 116, 0.5)","show-text":!1,"stroke-width":e.strokeWidth,percentage:Number(r.value)},null,8,["stroke-width","percentage"])):(o(),u(n,{key:1,class:"progress-bg","show-text":!1,color:"#52c41a","stroke-width":6,percentage:Number(r.value)},null,8,["percentage"])),a.isShowData?(o(),l("div",y,[c("span",null,s(e.cumulateAmount)+" "+s(e.symbol),1),c("span",null,s(e.topAmount)+" "+s(e.symbol),1)])):g("",!0)])}}},k=m(f,[["__scopeId","data-v-a6a1c332"]]);export{k as P};
