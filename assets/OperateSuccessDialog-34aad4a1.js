import{u as h,e as a,o as f,B as g,y as d,f as o,h as r,t as n,l as x,a4 as B,A as C}from"./index-923fe510.js";const y={class:"content"},S={class:"transfer-icon"},V={class:"title"},k={class:"btn"},$={__name:"OperateSuccessDialog",props:{modelValue:Boolean,txHash:{type:String,default:""}},emits:["update:model-value","close"],setup(l,{emit:c}){const i=l,u=h();function p(){window.open(u.txBlockExplorerUrl+i.txHash)}return(s,e)=>{const m=a("svg-icon"),_=a("el-button"),v=a("el-dialog");return f(),g(v,{onClose:e[1]||(e[1]=t=>c("close")),"model-value":i.modelValue,"onUpdate:modelValue":e[2]||(e[2]=t=>c("update:model-value",t)),title:"",class:"dlg dlg-up-chain-success"},{default:d(()=>[o("div",y,[o("div",S,[r(m,{name:"createSuccess"})]),o("div",V,n(s.$t("operationSuccess")),1),o("div",{class:"copy-tx-hash",onClick:e[0]||(e[0]=t=>x(B)(l.txHash))},n(s.$t("copyTxHash")),1),o("div",k,[r(_,{class:"jump-btn",onClick:p},{default:d(()=>[C(n(s.$t("openChainBrowser")),1)]),_:1})])])]),_:1},8,["model-value"])}}};export{$ as _};