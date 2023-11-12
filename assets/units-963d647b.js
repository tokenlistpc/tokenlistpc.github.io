var G=Object.defineProperty;var H=(n,t,i)=>t in n?G(n,t,{enumerable:!0,configurable:!0,writable:!0,value:i}):n[t]=i;var R=(n,t,i)=>(H(n,typeof t!="symbol"?t+"":t,i),i),V=(n,t,i)=>{if(!t.has(n))throw TypeError("Cannot "+i)};var s=(n,t,i)=>(V(n,t,"read from private field"),i?i.call(n):t.get(n)),g=(n,t,i)=>{if(t.has(n))throw TypeError("Cannot add the same private member more than once");t instanceof WeakSet?t.add(n):t.set(n,i)},L=(n,t,i,e)=>(V(n,t,"write to private field"),e?e.call(n,i):t.set(n,i),i);var l=(n,t,i)=>(V(n,t,"access private method"),i);import{bD as J,as as K,af as p,aw as v,aO as q,aN as O,c6 as W,ai as X,bQ as z,c0 as D}from"./index-1a6d1bbc.js";const Y=BigInt(-1),d=BigInt(0),S=BigInt(1),tt=BigInt(5),I={};let F="0000";for(;F.length<80;)F+=F;function x(n){let t=F;for(;t.length<n;)t+=t;return BigInt("1"+t.substring(0,n))}function y(n,t,i){const e=BigInt(t.width);if(t.signed){const r=S<<e-S;v(i==null||n>=-r&&n<r,"overflow","NUMERIC_FAULT",{operation:i,fault:"overflow",value:n}),n>d?n=z(D(n,e),e):n=-z(D(-n,e),e)}else{const r=S<<e;v(i==null||n>=0&&n<r,"overflow","NUMERIC_FAULT",{operation:i,fault:"overflow",value:n}),n=(n%r+r)%r&r-S}return n}function _(n){typeof n=="number"&&(n=`fixed128x${n}`);let t=!0,i=128,e=18;if(typeof n=="string"){if(n!=="fixed")if(n==="ufixed")t=!1;else{const u=n.match(/^(u?)fixed([0-9]+)x([0-9]+)$/);p(u,"invalid fixed format","format",n),t=u[1]!=="u",i=parseInt(u[2]),e=parseInt(u[3])}}else if(n){const u=n,a=(f,B,j)=>u[f]==null?j:(p(typeof u[f]===B,"invalid fixed format ("+f+" not "+B+")","format."+f,u[f]),u[f]);t=a("signed","boolean",t),i=a("width","number",i),e=a("decimals","number",e)}p(i%8===0,"invalid FixedNumber width (not byte aligned)","format.width",i),p(e<=80,"invalid FixedNumber decimals (too large)","format.decimals",e);const r=(t?"":"u")+"fixed"+String(i)+"x"+String(e);return{signed:t,width:i,decimals:e,name:r}}function it(n,t){let i="";n<d&&(i="-",n*=Y);let e=n.toString();if(t===0)return i+e;for(;e.length<=t;)e=F+e;const r=e.length-t;for(e=e.substring(0,r)+"."+e.substring(r);e[0]==="0"&&e[1]!==".";)e=e.substring(1);for(;e[e.length-1]==="0"&&e[e.length-2]!==".";)e=e.substring(0,e.length-1);return i+e}var c,o,h,b,N,m,w,E,$,T,P,A,Z,C,k;const U=class U{constructor(t,i,e){g(this,b);g(this,m);g(this,E);g(this,T);g(this,A);g(this,C);R(this,"format");g(this,c,void 0);g(this,o,void 0);g(this,h,void 0);R(this,"_value");J(t,I,"FixedNumber"),L(this,o,i),L(this,c,e);const r=it(i,e.decimals);K(this,{format:e.name,_value:r}),L(this,h,x(e.decimals))}get signed(){return s(this,c).signed}get width(){return s(this,c).width}get decimals(){return s(this,c).decimals}get value(){return s(this,o)}addUnsafe(t){return l(this,E,$).call(this,t)}add(t){return l(this,E,$).call(this,t,"add")}subUnsafe(t){return l(this,T,P).call(this,t)}sub(t){return l(this,T,P).call(this,t,"sub")}mulUnsafe(t){return l(this,A,Z).call(this,t)}mul(t){return l(this,A,Z).call(this,t,"mul")}mulSignal(t){l(this,b,N).call(this,t);const i=s(this,o)*s(t,o);return v(i%s(this,h)===d,"precision lost during signalling mul","NUMERIC_FAULT",{operation:"mulSignal",fault:"underflow",value:this}),l(this,m,w).call(this,i/s(this,h),"mulSignal")}divUnsafe(t){return l(this,C,k).call(this,t)}div(t){return l(this,C,k).call(this,t,"div")}divSignal(t){v(s(t,o)!==d,"division by zero","NUMERIC_FAULT",{operation:"div",fault:"divide-by-zero",value:this}),l(this,b,N).call(this,t);const i=s(this,o)*s(this,h);return v(i%s(t,o)===d,"precision lost during signalling div","NUMERIC_FAULT",{operation:"divSignal",fault:"underflow",value:this}),l(this,m,w).call(this,i/s(t,o),"divSignal")}cmp(t){let i=this.value,e=t.value;const r=this.decimals-t.decimals;return r>0?e*=x(r):r<0&&(i*=x(-r)),i<e?-1:i>e?1:0}eq(t){return this.cmp(t)===0}lt(t){return this.cmp(t)<0}lte(t){return this.cmp(t)<=0}gt(t){return this.cmp(t)>0}gte(t){return this.cmp(t)>=0}floor(){let t=s(this,o);return s(this,o)<d&&(t-=s(this,h)-S),t=s(this,o)/s(this,h)*s(this,h),l(this,m,w).call(this,t,"floor")}ceiling(){let t=s(this,o);return s(this,o)>d&&(t+=s(this,h)-S),t=s(this,o)/s(this,h)*s(this,h),l(this,m,w).call(this,t,"ceiling")}round(t){if(t==null&&(t=0),t>=this.decimals)return this;const i=this.decimals-t,e=tt*x(i-1);let r=this.value+e;const u=x(i);return r=r/u*u,y(r,s(this,c),"round"),new U(I,r,s(this,c))}isZero(){return s(this,o)===d}isNegative(){return s(this,o)<d}toString(){return this._value}toUnsafeFloat(){return parseFloat(this.toString())}toFormat(t){return U.fromString(this.toString(),t)}static fromValue(t,i,e){const r=i==null?0:q(i),u=_(e);let a=O(t,"value");const f=r-u.decimals;if(f>0){const B=x(f);v(a%B===d,"value loses precision for format","NUMERIC_FAULT",{operation:"fromValue",fault:"underflow",value:t}),a/=B}else f<0&&(a*=x(-f));return y(a,u,"fromValue"),new U(I,a,u)}static fromString(t,i){const e=t.match(/^(-?)([0-9]*)\.?([0-9]*)$/);p(e&&e[2].length+e[3].length>0,"invalid FixedNumber string value","value",t);const r=_(i);let u=e[2]||"0",a=e[3]||"";for(;a.length<r.decimals;)a+=F;v(a.substring(r.decimals).match(/^0*$/),"too many decimals for format","NUMERIC_FAULT",{operation:"fromString",fault:"underflow",value:t}),a=a.substring(0,r.decimals);const f=BigInt(e[1]+u+a);return y(f,r,"fromString"),new U(I,f,r)}static fromBytes(t,i){let e=W(X(t,"value"));const r=_(i);return r.signed&&(e=z(e,r.width)),y(e,r,"fromBytes"),new U(I,e,r)}};c=new WeakMap,o=new WeakMap,h=new WeakMap,b=new WeakSet,N=function(t){p(this.format===t.format,"incompatible format; use fixedNumber.toFormat","other",t)},m=new WeakSet,w=function(t,i){return t=y(t,s(this,c),i),new U(I,t,s(this,c))},E=new WeakSet,$=function(t,i){return l(this,b,N).call(this,t),l(this,m,w).call(this,s(this,o)+s(t,o),i)},T=new WeakSet,P=function(t,i){return l(this,b,N).call(this,t),l(this,m,w).call(this,s(this,o)-s(t,o),i)},A=new WeakSet,Z=function(t,i){return l(this,b,N).call(this,t),l(this,m,w).call(this,s(this,o)*s(t,o)/s(this,h),i)},C=new WeakSet,k=function(t,i){return v(s(t,o)!==d,"division by zero","NUMERIC_FAULT",{operation:"div",fault:"divide-by-zero",value:this}),l(this,b,N).call(this,t),l(this,m,w).call(this,s(this,o)*s(this,h)/s(t,o),i)};let M=U;const Q=["wei","kwei","mwei","gwei","szabo","finney","ether"];function et(n,t){let i=18;if(typeof t=="string"){const e=Q.indexOf(t);p(e>=0,"invalid unit","unit",t),i=3*e}else t!=null&&(i=q(t,"unit"));return M.fromValue(n,i,{decimals:i,width:512}).toString()}function nt(n,t){p(typeof n=="string","value must be a string","value",n);let i=18;if(typeof t=="string"){const e=Q.indexOf(t);p(e>=0,"invalid unit","unit",t),i=3*e}else t!=null&&(i=q(t,"unit"));return M.fromString(n,{decimals:i,width:512}).value}function ot(n){return et(n,18)}function lt(n){return nt(n,18)}export{M as F,nt as a,ot as b,et as f,lt as p};