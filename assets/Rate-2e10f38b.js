import{j as D,_ as W,R as K,v as V,S as b,r as $,T as S,U as w,w as L,V as j,W as G,e as R,o as H,c as J,h as C,l as k,X,f as O,Y as A,Z as F,$ as Y,I as Z,J as q,a0 as z}from"./index-fbe4e919.js";function Q(s){const l=D();function r(){if(s.value==null)return;const{selectionStart:i,selectionEnd:c,value:a}=s.value;if(i==null||c==null)return;const f=a.slice(0,Math.max(0,i)),d=a.slice(Math.max(0,c));l.value={selectionStart:i,selectionEnd:c,value:a,beforeTxt:f,afterTxt:d}}function p(){if(s.value==null||l.value==null)return;const{value:i}=s.value,{beforeTxt:c,afterTxt:a,selectionStart:f}=l.value;if(c==null||a==null||f==null)return;let d=i.length;if(i.endsWith(a))d=i.length-a.length;else if(i.startsWith(c))d=c.length;else{const N=c[f-1],h=i.indexOf(N,f-1);h!==-1&&(d=h+1)}s.value.setSelectionRange(d,d)}return[r,p]}const ee=s=>(Z("data-v-f949d2cd"),s=s(),q(),s),te={class:"rate"},ne={class:"value-show"},re=ee(()=>O("div",null,"%",-1)),y="update:modelValue",ue="change",E="input",ae={__name:"Rate",props:{modelValue:{type:String,default:""},max:{type:Number,default:100},min:{type:Number,default:0},step:{type:Number,default:1},precision:{type:Number,default:0},disabled:{type:Boolean,default:!1}},emits:["update:modelValue"],setup(s,{emit:l}){const r=s,p=K();V(()=>p.value),Q(p);const i=V(()=>b(r.modelValue)&&r.modelValue<=r.min),c=V(()=>b(r.modelValue)&&r.modelValue>=r.max),a=$({currentValue:r.modelValue,userInput:null}),f=V(()=>{if(a.userInput!==null)return a.userInput;let e=a.currentValue;if(S(e))return"";if(b(e)){if(Number.isNaN(e))return"";w(r.precision)||(e=Number(e).toFixed(r.precision))}return e}),d=(e,t)=>{if(w(t)&&(t=h.value),t===0)return Math.round(e);let n=String(e);const u=n.indexOf(".");if(u===-1||!n.replace(".","").split("")[u+t])return e;const _=n.length;return n.charAt(_-1)==="5"&&(n=`${n.slice(0,Math.max(0,_-1))}6`),Number.parseFloat(Number(n).toFixed(t))},N=e=>{if(S(e))return 0;const t=e.toString(),n=t.indexOf(".");let u=0;return n!==-1&&(u=t.length-n-1),u},h=V(()=>{const e=N(r.step);return w(r.precision)?Math.max(N(r.modelValue),e):(e>r.precision,r.precision)}),P=(e,t=1)=>b(e)?d(e+r.step*t):a.currentValue,T=()=>{if(r.readonly||r.disabled||c.value)return;const e=Number(f.value)||0,t=P(e);x(t),l(E,a.currentValue)},M=()=>{if(r.readonly||r.disabled||i.value)return;const e=Number(f.value)||0,t=P(e,-1);x(t),l(E,a.currentValue)},I=(e,t)=>{const{max:n,min:u,step:v,precision:m,stepStrictly:_,valueOnClear:g}=r;if(n<u)return null;let o=Number(e);if(S(e)||Number.isNaN(o))return null;if(e===""){if(g===null)return null;o=z(g)?{min:u,max:n}[g]:g}return _&&(o=d(Math.round(o/v)*v,m)),w(m)||(o=d(o,m)),(o>n||o<u)&&(o=o>n?n:u,t&&l(y,o)),o},x=(e,t=!0)=>{const n=a.currentValue,u=I(e);if(!t){l(y,u);return}n!==u&&(a.userInput=null,l(y,u),l(ue,u,n),a.currentValue=u)},U=e=>{a.userInput=e;const t=e===""?null:Number(e);l(E,t),x(t,!1)},B=e=>{const t=e!==""?Number(e):0;(b(t)&&!Number.isNaN(t)||e==="")&&x(t),a.userInput=null};return L(()=>r.modelValue,e=>{const t=I(a.userInput),n=I(e,!0);!b(t)&&(!t||t!==n)&&(a.currentValue=n,a.userInput=null)},{immediate:!0}),j(()=>{var v;const{min:e,max:t,modelValue:n}=r,u=(v=p.value)==null?void 0:v.input;if(u.setAttribute("role","spinbutton"),Number.isFinite(t)?u.setAttribute("aria-valuemax",String(t)):u.removeAttribute("aria-valuemax"),Number.isFinite(e)?u.setAttribute("aria-valuemin",String(e)):u.removeAttribute("aria-valuemin"),u.setAttribute("aria-valuenow",String(a.currentValue)),u.setAttribute("aria-disabled",String(r.disabled)),!b(n)&&n!=null){let m=Number(n);Number.isNaN(m)&&(m=null),l(y,m)}}),G(()=>{var t;const e=(t=p.value)==null?void 0:t.input;e==null||e.setAttribute("aria-valuenow",`${a.currentValue}`)}),(e,t)=>{const n=R("el-button"),u=R("el-input");return H(),J("div",te,[C(n,{icon:k(X),class:"rate-btn",onClick:M,circle:"",disabled:i.value},null,8,["icon","disabled"]),O("div",ne,[C(u,{class:"ipt-num",ref_key:"input",ref:p,type:"number",step:s.step,"model-value":f.value,readonly:r.readonly,disabled:r.disabled,max:s.max,min:s.min,"validate-event":!1,onWheel:t[0]||(t[0]=A(()=>{},["prevent"])),onKeydown:[F(A(T,["prevent"]),["up"]),F(A(M,["prevent"]),["down"])],onInput:U,onChange:B},null,8,["step","model-value","readonly","disabled","max","min","onKeydown"]),re]),C(n,{icon:k(Y),class:"rate-btn",onClick:T,circle:"",disabled:c.value},null,8,["icon","disabled"])])}}},le=W(ae,[["__scopeId","data-v-f949d2cd"]]);export{le as R};
