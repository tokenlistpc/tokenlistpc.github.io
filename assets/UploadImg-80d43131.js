import{_ as D,j as u,e as n,o as I,c as V,h as l,x as s,n as E,f as a,l as F,a5 as M,y as N,F as S,E as U,I as A,J as L}from"./index-37ed4678.js";const y=d=>(A("data-v-247ade7f"),d=d(),L(),d),$=["src"],j={class:"el-upload-list__item-actions"},J=["onClick"],q=["onClick"],G={class:"content"},H=y(()=>a("div",null,"上传图片",-1)),K=y(()=>a("div",{class:"el-upload__tip"}," 长宽比例1：1，文件大小不超过1M ",-1)),O={class:"preview-box"},Q=["src"],T={__name:"UploadImg",props:{modelValue:{type:Array,default:[]}},emits:["update:modelValue"],setup(d,{emit:g}){const f=d,_=u(!1),v=u(""),r=u();u("");const p=u(f.modelValue.length>0);async function b(e){console.log(e);const o=await k(e),t=await x(o);if(t.width!=t.height)return U.error("图片长宽比例为1：1"),r.value.handleRemove(e),!1;if(e.size>1024*1024)return U.error("文件大小不超过1M"),r.value.handleRemove(e),!1;g("update:modelValue",[e]),p.value=!0}function k(e){const o=new FileReader;return o.readAsDataURL(e.raw),new Promise(t=>{o.onload=()=>{t(o.result)}})}function x(e){const o=new Image;return o.src=e,new Promise(t=>{o.onload=()=>{const c=o.width,m=o.height;t({width:c,height:m})}})}function h(){g("update:modelValue",[]),p.value=!1}const w=e=>{v.value=e.url,_.value=!0};return(e,o)=>{const t=n("zoom-in"),c=n("el-icon"),m=n("Delete"),C=n("Plus"),P=n("el-upload"),R=n("el-form-item"),B=n("el-dialog");return I(),V(S,null,[l(R,{prop:"modelValue"},{default:s(()=>[l(P,{class:E(["upload-box",{hideUpload:p.value}]),ref_key:"uploadRef",ref:r,"file-list":f.modelValue,accept:"image/*",action:"",name:"image","before-upload":e.beforeUploadImg,"on-preview":w,"on-change":b,"on-remove":h,"list-type":"picture-card","auto-upload":!1},{file:s(({file:i})=>[a("div",null,[a("img",{class:"el-upload-list__item-thumbnail",src:F(M)(i.raw),alt:""},null,8,$),a("span",j,[a("span",{class:"el-upload-list__item-preview",onClick:z=>w(i)},[l(c,null,{default:s(()=>[l(t)]),_:1})],8,J),e.disabled?N("",!0):(I(),V("span",{key:0,class:"el-upload-list__item-delete",onClick:z=>h(i)},[l(c,null,{default:s(()=>[l(m)]),_:1})],8,q))])])]),tip:s(()=>[K]),default:s(()=>[a("div",G,[l(c,null,{default:s(()=>[l(C)]),_:1}),H])]),_:1},8,["file-list","class","before-upload"])]),_:1}),l(B,{modelValue:_.value,"onUpdate:modelValue":o[0]||(o[0]=i=>_.value=i)},{default:s(()=>[a("div",O,[a("img",{class:"img","w-full":"",src:v.value,alt:"Preview Image"},null,8,Q)])]),_:1},8,["modelValue"])],64)}}},X=D(T,[["__scopeId","data-v-247ade7f"]]);export{X as U};