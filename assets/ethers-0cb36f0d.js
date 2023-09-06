var _t=Object.defineProperty;var Ot=(a,s,e)=>s in a?_t(a,s,{enumerable:!0,configurable:!0,writable:!0,value:e}):a[s]=e;var d=(a,s,e)=>(Ot(a,typeof s!="symbol"?s+"":s,e),e),de=(a,s,e)=>{if(!s.has(a))throw TypeError("Cannot "+e)};var c=(a,s,e)=>(de(a,s,"read from private field"),e?e.call(a):s.get(a)),f=(a,s,e)=>{if(s.has(a))throw TypeError("Cannot add the same private member more than once");s instanceof WeakSet?s.add(a):s.set(a,e)},l=(a,s,e,t)=>(de(a,s,"write to private field"),t?t.call(a,e):s.set(a,e),e);var $e=(a,s,e,t)=>({set _(r){l(a,s,r,e)},get _(){return c(a,s,t)}}),S=(a,s,e)=>(de(a,s,"access private method"),e);import{a8 as Le,a9 as Oe,aa as m,ab as G,ac as fe,ad as y,ae,af as xe,ag as He,ah as Ge,ai as Ke,aj as ze,ak as ve,al as ie,am as Ve,an as k,ao as ye,ap as xt,aq as vt,ar as g,as as qe,at as N,au as R,av as U,aw as Qe,ax as Xe,ay as oe,az as Ze,aA as Ye,aB as et,aC as tt,aD as rt,aE as st,aF as nt,aG as we,aH as ke,aI as at,aJ as K,aK as it,aL as Ct,aM as Bt,aN as At,aO as Ft,aP as It,aQ as Ut,aR as Dt,aS as $t,aT as Mt,aU as jt,aV as Jt,aW as Wt,aX as Lt,aY as Ht,aZ as Gt,a_ as Kt,a$ as zt,b0 as Vt,b1 as qt,b2 as Qt,b3 as Xt,b4 as Zt,b5 as Yt,b6 as er,b7 as tr,b8 as rr,b9 as sr,ba as nr,bb as ar,bc as ir,bd as or,be as cr,bf as ur,bg as lr,bh as hr,bi as fr,bj as gr,bk as dr,bl as mr,bm as pr,bn as br,bo as yr,bp as wr,bq as kr,br as Er,bs as Rr,bt as Tr,bu as Pr,bv as Nr,bw as Sr,bx as _r,by as Or,bz as xr,bA as vr,bB as Cr,bC as Br,bD as Ar,bE as Fr,bF as Ir,bG as Ur,bH as Dr,bI as $r,bJ as Mr,bK as jr,bL as Jr,bM as Wr,bN as Lr,bO as Hr,bP as Gr,bQ as Kr,bR as zr,bS as Vr,bT as qr,bU as Qr,bV as Xr,bW as Zr,bX as Yr,bY as es,bZ as ts,b_ as rs,b$ as ss,c0 as ns,c1 as as,c2 as is,c3 as os,c4 as cs,c5 as us}from"./index-fbe4e919.js";import{p as ot,r as Ee,a as ct,s as ut,b as lt,c as Ce,d as ht,e as ls,f as ft,L as gt,B as hs,E as fs,H as gs,g as ds,M as ms,h as ps,W as bs,i as ys,j as ws,k as ks,l as Es,m as Rs,n as Ts,o as Ps,q as Ns,t as Ss,u as _s,v as Os,w as xs,x as vs,y as Cs}from"./wallet-e007cd21.js";import{F as Bs,b as As,f as Fs,p as Is,a as Us}from"./units-4a879e1d.js";function Ds(){Le.lock(),Oe.lock(),ot.lock(),Ee.lock(),ct.lock(),ut.lock(),lt.lock(),Ce.lock(),ht.lock(),Ee.lock()}const $s=new RegExp("^bytes([0-9]+)$"),Ms=new RegExp("^(u?int)([0-9]*)$"),js=new RegExp("^(.*)\\[([0-9]*)\\]$");function dt(a,s,e){switch(a){case"address":return e?y(ae(s,32)):y(He(s));case"string":return xe(s);case"bytes":return y(s);case"bool":return s=s?"0x01":"0x00",e?y(ae(s,32)):y(s)}let t=a.match(Ms);if(t){let r=t[1]==="int",n=parseInt(t[2]||"256");return m((!t[2]||t[2]===String(n))&&n%8===0&&n!==0&&n<=256,"invalid number type","type",a),e&&(n=256),r&&(s=Ge(s,n)),y(ae(Ke(s),n/8))}if(t=a.match($s),t){const r=parseInt(t[1]);return m(String(r)===t[1]&&r!==0&&r<=32,"invalid bytes type","type",a),m(ze(s)===r,`invalid value for ${a}`,"value",s),e?y(ve(s,32)):s}if(t=a.match(js),t&&Array.isArray(s)){const r=t[1],n=parseInt(t[2]||String(s.length));m(n===s.length,`invalid array length for ${a}`,"value",s);const i=[];return s.forEach(function(o){i.push(dt(r,o,!0))}),y(fe(i))}m(!1,"invalid type","type",a)}function Be(a,s){m(a.length===s.length,"wrong number of values; expected ${ types.length }","values",s);const e=[];return a.forEach(function(t,r){e.push(dt(t,s[r]))}),G(fe(e))}function Js(a,s){return Oe(Be(a,s))}function Ws(a,s){return Ce(Be(a,s))}function Ls(a){const s=xe(a);if(s.length>31)throw new Error("bytes32 string must be less than 32 bytes");return ve(s,32)}function Hs(a){const s=y(a,"bytes");if(s.length!==32)throw new Error("invalid bytes32 - not 32 bytes long");if(s[31]!==0)throw new Error("invalid bytes32 string - no null terminator");let e=31;for(;s[e-1]===0;)e--;return ie(s.slice(0,e))}class Ae{constructor(s,e,t){d(this,"interface");d(this,"bytecode");d(this,"runner");const r=Ve.from(s);e instanceof Uint8Array?e=G(y(e)):(typeof e=="object"&&(e=e.object),e.startsWith("0x")||(e="0x"+e),e=G(y(e))),k(this,{bytecode:e,interface:r,runner:t||null})}attach(s){return new ye(s,this.interface,this.runner)}async getDeployTransaction(...s){let e={};const t=this.interface.deploy;if(t.inputs.length+1===s.length&&(e=await xt(s.pop())),t.inputs.length!==s.length)throw new Error("incorrect number of arguments to constructor");const r=await vt(this.runner,t.inputs,s),n=fe([this.bytecode,this.interface.encodeDeploy(r)]);return Object.assign({},e,{data:n})}async deploy(...s){const e=await this.getDeployTransaction(...s);g(this.runner&&typeof this.runner.sendTransaction=="function","factory runner does not support sending transactions","UNSUPPORTED_OPERATION",{operation:"sendTransaction"});const t=await this.runner.sendTransaction(e),r=qe(t);return new ye(r,this.interface,this.runner,t)}connect(s){return new Ae(this.interface,this.bytecode,s)}static fromSolidity(s,e){m(s!=null,"bad compiler output","output",s),typeof s=="string"&&(s=JSON.parse(s));const t=s.abi;let r="";return s.bytecode?r=s.bytecode:s.evm&&s.evm.bytecode&&(r=s.evm.bytecode),new this(t,r,e)}}const Me=new Set;function D(a){Me.has(a)||(Me.add(a),console.log("========= NOTICE ========="),console.log(`Request-Rate Exceeded for ${a} (this message will not be repeated)`),console.log(""),console.log("The default API keys for each service are provided as a highly-throttled,"),console.log("community resource for low-traffic projects and early prototyping."),console.log(""),console.log("While your application will continue to function, we highly recommended"),console.log("signing up for your own API keys to improve performance, increase your"),console.log("request rate/limit and enable other perks, such as metrics and advanced APIs."),console.log(""),console.log("For more details: https://docs.ethers.org/api-keys/"),console.log("=========================="))}const te="9f7d929b018cdffb338517efa06f58359e86ff1ffd350bc889738523659e7972";function Gs(a){switch(a){case"mainnet":return"rpc.ankr.com/eth";case"goerli":return"rpc.ankr.com/eth_goerli";case"matic":return"rpc.ankr.com/polygon";case"arbitrum":return"rpc.ankr.com/arbitrum"}m(!1,"unsupported network","network",a)}class z extends N{constructor(e,t){e==null&&(e="mainnet");const r=R.from(e);t==null&&(t=te);const n={polling:!0,staticNetwork:r},i=z.getRequest(r,t);super(i,r,n);d(this,"apiKey");k(this,{apiKey:t})}_getProvider(e){try{return new z(e,this.apiKey)}catch{}return super._getProvider(e)}static getRequest(e,t){t==null&&(t=te);const r=new U(`https://${Gs(e.name)}/${t}`);return r.allowGzip=!0,t===te&&(r.retryFunc=async(n,i,o)=>(D("AnkrProvider"),!0)),r}getRpcError(e,t){return e.method==="eth_sendRawTransaction"&&t&&t.error&&t.error.message==="INTERNAL_ERROR: could not replace existing tx"&&(t.error.message="replacement transaction underpriced"),super.getRpcError(e,t)}isCommunityResource(){return this.apiKey===te}}const re="_gg7wSSi0KMBsdKnGVfHDueq6xMB9EkC";function Ks(a){switch(a){case"mainnet":return"eth-mainnet.alchemyapi.io";case"goerli":return"eth-goerli.g.alchemy.com";case"sepolia":return"eth-sepolia.g.alchemy.com";case"arbitrum":return"arb-mainnet.g.alchemy.com";case"arbitrum-goerli":return"arb-goerli.g.alchemy.com";case"matic":return"polygon-mainnet.g.alchemy.com";case"matic-mumbai":return"polygon-mumbai.g.alchemy.com";case"optimism":return"opt-mainnet.g.alchemy.com";case"optimism-goerli":return"opt-goerli.g.alchemy.com"}m(!1,"unsupported network","network",a)}class V extends N{constructor(e,t){e==null&&(e="mainnet");const r=R.from(e);t==null&&(t=re);const n=V.getRequest(r,t);super(n,r,{staticNetwork:r});d(this,"apiKey");k(this,{apiKey:t})}_getProvider(e){try{return new V(e,this.apiKey)}catch{}return super._getProvider(e)}async _perform(e){if(e.method==="getTransactionResult"){const{trace:t,tx:r}=await Qe({trace:this.send("trace_transaction",[e.hash]),tx:this.getTransaction(e.hash)});if(t==null||r==null)return null;let n,i=!1;try{n=t[0].result.output,i=t[0].error==="Reverted"}catch{}if(n)return g(!i,"an error occurred during transaction executions","CALL_EXCEPTION",{action:"getTransactionResult",data:n,reason:null,transaction:r,invocation:null,revert:null}),n;g(!1,"could not parse trace result","BAD_DATA",{value:t})}return await super._perform(e)}isCommunityResource(){return this.apiKey===re}static getRequest(e,t){t==null&&(t=re);const r=new U(`https://${Ks(e.name)}/v2/${t}`);return r.allowGzip=!0,t===re&&(r.retryFunc=async(n,i,o)=>(D("alchemy"),!0)),r}}class mt extends N{constructor(s){s==null&&(s="mainnet");const e=R.from(s);m(e.name==="mainnet","unsupported network","network",s),super("https://cloudflare-eth.com/",e,{staticNetwork:e})}}const je=2e3;function zs(a){return a&&typeof a.then=="function"}const pt="org.ethers.plugins.provider.Etherscan";class Fe extends Xe{constructor(e){super(pt);d(this,"baseUrl");k(this,{baseUrl:e})}clone(){return new Fe(this.baseUrl)}}const Vs=["enableCcipRead"];let qs=1;var M;class bt extends oe{constructor(e,t){const r=t??null;super();d(this,"network");d(this,"apiKey");f(this,M,void 0);const n=R.from(e);l(this,M,n.getPlugin(pt)),k(this,{apiKey:r,network:n}),this.getBaseUrl()}getBaseUrl(){if(c(this,M))return c(this,M).baseUrl;switch(this.network.name){case"mainnet":return"https://api.etherscan.io";case"goerli":return"https://api-goerli.etherscan.io";case"sepolia":return"https://api-sepolia.etherscan.io";case"arbitrum":return"https://api.arbiscan.io";case"arbitrum-goerli":return"https://api-goerli.arbiscan.io";case"matic":return"https://api.polygonscan.com";case"matic-mumbai":return"https://api-testnet.polygonscan.com";case"optimism":return"https://api-optimistic.etherscan.io";case"optimism-goerli":return"https://api-goerli-optimistic.etherscan.io";case"bnb":return"http://api.bscscan.com";case"bnbt":return"http://api-testnet.bscscan.com"}m(!1,"unsupported network","network",this.network)}getUrl(e,t){const r=Object.keys(t).reduce((i,o)=>{const u=t[o];return u!=null&&(i+=`&${o}=${u}`),i},""),n=this.apiKey?`&apikey=${this.apiKey}`:"";return`${this.getBaseUrl()}/api?module=${e}${r}${n}`}getPostUrl(){return`${this.getBaseUrl()}/api`}getPostData(e,t){return t.module=e,t.apikey=this.apiKey,t}async detectNetwork(){return this.network}async fetch(e,t,r){const n=qs++,i=r?this.getPostUrl():this.getUrl(e,t),o=r?this.getPostData(e,t):null;this.emit("debug",{action:"sendRequest",id:n,url:i,payload:o});const u=new U(i);u.setThrottleParams({slotInterval:1e3}),u.retryFunc=(C,$,E)=>(this.isCommunityResource()&&D("Etherscan"),Promise.resolve(!0)),u.processFunc=async(C,$)=>{const E=$.hasBody()?JSON.parse(ie($.body)):{},De=(typeof E.result=="string"?E.result:"").toLowerCase().indexOf("rate limit")>=0;return e==="proxy"?E&&E.status==0&&E.message=="NOTOK"&&De&&(this.emit("debug",{action:"receiveError",id:n,reason:"proxy-NOTOK",error:E}),$.throwThrottleError(E.result,je)):De&&(this.emit("debug",{action:"receiveError",id:n,reason:"null result",error:E.result}),$.throwThrottleError(E.result,je)),$},o&&(u.setHeader("content-type","application/x-www-form-urlencoded; charset=UTF-8"),u.body=Object.keys(o).map(C=>`${C}=${o[C]}`).join("&"));const p=await u.send();try{p.assertOk()}catch(C){this.emit("debug",{action:"receiveError",id:n,error:C,reason:"assertOk"}),g(!1,"response error","SERVER_ERROR",{request:u,response:p})}p.hasBody()||(this.emit("debug",{action:"receiveError",id:n,error:"missing body",reason:"null body"}),g(!1,"missing response","SERVER_ERROR",{request:u,response:p}));const h=JSON.parse(ie(p.body));return e==="proxy"?(h.jsonrpc!="2.0"&&(this.emit("debug",{action:"receiveError",id:n,result:h,reason:"invalid JSON-RPC"}),g(!1,"invalid JSON-RPC response (missing jsonrpc='2.0')","SERVER_ERROR",{request:u,response:p,info:{result:h}})),h.error&&(this.emit("debug",{action:"receiveError",id:n,result:h,reason:"JSON-RPC error"}),g(!1,"error response","SERVER_ERROR",{request:u,response:p,info:{result:h}})),this.emit("debug",{action:"receiveRequest",id:n,result:h}),h.result):h.status==0&&(h.message==="No records found"||h.message==="No transactions found")?(this.emit("debug",{action:"receiveRequest",id:n,result:h}),h.result):((h.status!=1||typeof h.message=="string"&&!h.message.match(/^OK/))&&(this.emit("debug",{action:"receiveError",id:n,result:h}),g(!1,"error response","SERVER_ERROR",{request:u,response:p,info:{result:h}})),this.emit("debug",{action:"receiveRequest",id:n,result:h}),h.result)}_getTransactionPostData(e){const t={};for(let r in e){if(Vs.indexOf(r)>=0||e[r]==null)continue;let n=e[r];r==="type"&&n===0||({type:!0,gasLimit:!0,gasPrice:!0,maxFeePerGs:!0,maxPriorityFeePerGas:!0,nonce:!0,value:!0}[r]?n=Ze(n):r==="accessList"?n="["+Ye(n).map(i=>`{address:"${i.address}",storageKeys:["${i.storageKeys.join('","')}"]}`).join(",")+"]":n=G(n),t[r]=n)}return t}_checkError(e,t,r){let n="";if(et(t,"SERVER_ERROR")){try{n=t.info.result.error.message}catch{}if(!n)try{n=t.info.message}catch{}}if(e.method==="estimateGas"&&!n.match(/revert/i)&&n.match(/insufficient funds/i)&&g(!1,"insufficient funds","INSUFFICIENT_FUNDS",{transaction:e.transaction}),(e.method==="call"||e.method==="estimateGas")&&n.match(/execution reverted/i)){let i="";try{i=t.info.result.error.data}catch{}const o=tt.getBuiltinCallException(e.method,e.transaction,i);throw o.info={request:e,error:t},o}if(n&&e.method==="broadcastTransaction"){const i=rt.from(e.signedTransaction);n.match(/replacement/i)&&n.match(/underpriced/i)&&g(!1,"replacement fee too low","REPLACEMENT_UNDERPRICED",{transaction:i}),n.match(/insufficient funds/)&&g(!1,"insufficient funds for intrinsic transaction cost","INSUFFICIENT_FUNDS",{transaction:i}),n.match(/same hash was already imported|transaction nonce is too low|nonce too low/)&&g(!1,"nonce has already been used","NONCE_EXPIRED",{transaction:i})}throw t}async _detectNetwork(){return this.network}async _perform(e){switch(e.method){case"chainId":return this.network.chainId;case"getBlockNumber":return this.fetch("proxy",{action:"eth_blockNumber"});case"getGasPrice":return this.fetch("proxy",{action:"eth_gasPrice"});case"getBalance":return this.fetch("account",{action:"balance",address:e.address,tag:e.blockTag});case"getTransactionCount":return this.fetch("proxy",{action:"eth_getTransactionCount",address:e.address,tag:e.blockTag});case"getCode":return this.fetch("proxy",{action:"eth_getCode",address:e.address,tag:e.blockTag});case"getStorage":return this.fetch("proxy",{action:"eth_getStorageAt",address:e.address,position:e.position,tag:e.blockTag});case"broadcastTransaction":return this.fetch("proxy",{action:"eth_sendRawTransaction",hex:e.signedTransaction},!0).catch(t=>this._checkError(e,t,e.signedTransaction));case"getBlock":if("blockTag"in e)return this.fetch("proxy",{action:"eth_getBlockByNumber",tag:e.blockTag,boolean:e.includeTransactions?"true":"false"});g(!1,"getBlock by blockHash not supported by Etherscan","UNSUPPORTED_OPERATION",{operation:"getBlock(blockHash)"});case"getTransaction":return this.fetch("proxy",{action:"eth_getTransactionByHash",txhash:e.hash});case"getTransactionReceipt":return this.fetch("proxy",{action:"eth_getTransactionReceipt",txhash:e.hash});case"call":{if(e.blockTag!=="latest")throw new Error("EtherscanProvider does not support blockTag for call");const t=this._getTransactionPostData(e.transaction);t.module="proxy",t.action="eth_call";try{return await this.fetch("proxy",t,!0)}catch(r){return this._checkError(e,r,e.transaction)}}case"estimateGas":{const t=this._getTransactionPostData(e.transaction);t.module="proxy",t.action="eth_estimateGas";try{return await this.fetch("proxy",t,!0)}catch(r){return this._checkError(e,r,e.transaction)}}}return super._perform(e)}async getNetwork(){return this.network}async getEtherPrice(){return this.network.name!=="mainnet"?0:parseFloat((await this.fetch("stats",{action:"ethprice"})).ethusd)}async getContract(e){let t=this._getAddress(e);zs(t)&&(t=await t);try{const r=await this.fetch("contract",{action:"getabi",address:t}),n=JSON.parse(r);return new st(t,n,this)}catch{return null}}isCommunityResource(){return this.apiKey==null}}M=new WeakMap;function Qs(){if(typeof self<"u")return self;if(typeof window<"u")return window;if(typeof global<"u")return global;throw new Error("unable to locate global object")}const Xs=Qs().WebSocket;var T,Q,_,B,O;class ge{constructor(s,e){f(this,T,void 0);f(this,Q,void 0);f(this,_,void 0);f(this,B,void 0);f(this,O,void 0);l(this,T,s),l(this,Q,JSON.stringify(e)),l(this,_,null),l(this,B,null),l(this,O,null)}get filter(){return JSON.parse(c(this,Q))}start(){l(this,_,c(this,T).send("eth_subscribe",this.filter).then(s=>(c(this,T)._register(s,this),s)))}stop(){c(this,_).then(s=>{c(this,T).send("eth_unsubscribe",[s])}),l(this,_,null)}pause(s){g(s,"preserve logs while paused not supported by SocketSubscriber yet","UNSUPPORTED_OPERATION",{operation:"pause(false)"}),l(this,B,!!s)}resume(){l(this,B,null)}_handleMessage(s){if(c(this,_)!=null&&c(this,B)===null){let e=c(this,O);e==null?e=this._emit(c(this,T),s):e=e.then(async()=>{await this._emit(c(this,T),s)}),l(this,O,e.then(()=>{c(this,O)===e&&l(this,O,null)}))}}async _emit(s,e){throw new Error("sub-classes must implemente this; _emit")}}T=new WeakMap,Q=new WeakMap,_=new WeakMap,B=new WeakMap,O=new WeakMap;class yt extends ge{constructor(s){super(s,["newHeads"])}async _emit(s,e){s.emit("block",parseInt(e.number))}}class wt extends ge{constructor(s){super(s,["newPendingTransactions"])}async _emit(s,e){s.emit("pending",e)}}var X;class kt extends ge{constructor(e,t){super(e,["logs",t]);f(this,X,void 0);l(this,X,JSON.stringify(t))}get logFilter(){return JSON.parse(c(this,X))}async _emit(e,t){e.emit(this.logFilter,e._wrapLog(t,e._network))}}X=new WeakMap;var A,j,x;class Et extends nt{constructor(e){super(e,{batchMaxCount:1});f(this,A,void 0);f(this,j,void 0);f(this,x,void 0);l(this,A,new Map),l(this,j,new Map),l(this,x,new Map)}_getSubscriber(e){switch(e.type){case"close":return new we("close");case"block":return new yt(this);case"pending":return new wt(this);case"event":return new kt(this,e.filter);case"orphan":if(e.filter.orphan==="drop-log")return new we("drop-log")}return super._getSubscriber(e)}_register(e,t){c(this,j).set(e,t);const r=c(this,x).get(e);if(r){for(const n of r)t._handleMessage(n);c(this,x).delete(e)}}async _send(e){m(!Array.isArray(e),"WebSocket does not support batch send","payload",e);const t=new Promise((r,n)=>{c(this,A).set(e.id,{payload:e,resolve:r,reject:n})});return await this._waitUntilReady(),await this._write(JSON.stringify(e)),[await t]}async _processMessage(e){const t=JSON.parse(e);if(t&&typeof t=="object"&&"id"in t){const r=c(this,A).get(t.id);if(r==null){this.emit("error",ke("received result for unknown id","UNKNOWN_ERROR",{reasonCode:"UNKNOWN_ID",result:t}));return}c(this,A).delete(t.id),r.resolve(t)}else if(t&&t.method==="eth_subscription"){const r=t.params.subscription,n=c(this,j).get(r);if(n)n._handleMessage(t.params.result);else{let i=c(this,x).get(r);i==null&&(i=[],c(this,x).set(r,i)),i.push(t.params.result)}}else{this.emit("error",ke("received unexpected message","UNKNOWN_ERROR",{reasonCode:"UNEXPECTED_MESSAGE",result:t}));return}}async _write(e){throw new Error("sub-classes must override this")}}A=new WeakMap,j=new WeakMap,x=new WeakMap;var F,w;class Ie extends Et{constructor(e,t){super(t);f(this,F,void 0);f(this,w,void 0);typeof e=="string"?(l(this,F,()=>new Xs(e)),l(this,w,c(this,F).call(this))):typeof e=="function"?(l(this,F,e),l(this,w,e())):(l(this,F,null),l(this,w,e)),this.websocket.onopen=async()=>{try{await this._start(),this.resume()}catch(r){console.log("failed to start WebsocketProvider",r)}},this.websocket.onmessage=r=>{this._processMessage(r.data)}}get websocket(){if(c(this,w)==null)throw new Error("websocket closed");return c(this,w)}async _write(e){this.websocket.send(e)}async destroy(){c(this,w)!=null&&(c(this,w).close(),l(this,w,null)),super.destroy()}}F=new WeakMap,w=new WeakMap;const L="84842078b09946638c03157f83405213";function Zs(a){switch(a){case"mainnet":return"mainnet.infura.io";case"goerli":return"goerli.infura.io";case"sepolia":return"sepolia.infura.io";case"arbitrum":return"arbitrum-mainnet.infura.io";case"arbitrum-goerli":return"arbitrum-goerli.infura.io";case"linea":return"linea-mainnet.infura.io";case"linea-goerli":return"linea-goerli.infura.io";case"matic":return"polygon-mainnet.infura.io";case"matic-mumbai":return"polygon-mumbai.infura.io";case"optimism":return"optimism-mainnet.infura.io";case"optimism-goerli":return"optimism-goerli.infura.io"}m(!1,"unsupported network","network",a)}class Rt extends Ie{constructor(e,t){const r=new W(e,t),n=r._getConnection();g(!n.credentials,"INFURA WebSocket project secrets unsupported","UNSUPPORTED_OPERATION",{operation:"InfuraProvider.getWebSocketProvider()"});const i=n.url.replace(/^http/i,"ws").replace("/v3/","/ws/v3/");super(i,e);d(this,"projectId");d(this,"projectSecret");k(this,{projectId:r.projectId,projectSecret:r.projectSecret})}isCommunityResource(){return this.projectId===L}}class W extends N{constructor(e,t,r){e==null&&(e="mainnet");const n=R.from(e);t==null&&(t=L),r==null&&(r=null);const i=W.getRequest(n,t,r);super(i,n,{staticNetwork:n});d(this,"projectId");d(this,"projectSecret");k(this,{projectId:t,projectSecret:r})}_getProvider(e){try{return new W(e,this.projectId,this.projectSecret)}catch{}return super._getProvider(e)}isCommunityResource(){return this.projectId===L}static getWebSocketProvider(e,t){return new Rt(e,t)}static getRequest(e,t,r){t==null&&(t=L),r==null&&(r=null);const n=new U(`https://${Zs(e.name)}/v3/${t}`);return n.allowGzip=!0,r&&n.setCredentials("",r),t===L&&(n.retryFunc=async(i,o,u)=>(D("InfuraProvider"),!0)),n}}const se="919b412a057b5e9c9b6dce193c5a60242d6efadb";function Ys(a){switch(a){case"mainnet":return"ethers.quiknode.pro";case"goerli":return"ethers.ethereum-goerli.quiknode.pro";case"arbitrum":return"ethers.arbitrum-mainnet.quiknode.pro";case"arbitrum-goerli":return"ethers.arbitrum-goerli.quiknode.pro";case"matic":return"ethers.matic.quiknode.pro";case"matic-mumbai":return"ethers.matic-testnet.quiknode.pro";case"optimism":return"ethers.optimism.quiknode.pro";case"optimism-goerli":return"ethers.optimism-goerli.quiknode.pro"}m(!1,"unsupported network","network",a)}class q extends N{constructor(e,t){e==null&&(e="mainnet");const r=R.from(e);t==null&&(t=se);const n=q.getRequest(r,t);super(n,r,{staticNetwork:r});d(this,"token");k(this,{token:t})}_getProvider(e){try{return new q(e,this.token)}catch{}return super._getProvider(e)}isCommunityResource(){return this.token===se}static getRequest(e,t){t==null&&(t=se);const r=new U(`https://${Ys(e.name)}/${t}`);return r.allowGzip=!0,t===se&&(r.retryFunc=async(n,i,o)=>(D("QuickNodeProvider"),!0)),r}}const en=BigInt("1"),tn=BigInt("2");function rn(a){for(let s=a.length-1;s>0;s--){const e=Math.floor(Math.random()*(s+1)),t=a[s];a[s]=a[e],a[e]=t}}function sn(a){return new Promise(s=>{setTimeout(s,a)})}function Re(){return new Date().getTime()}function me(a){return JSON.stringify(a,(s,e)=>typeof e=="bigint"?{type:"bigint",value:e.toString()}:e)}const Je={stallTimeout:400,priority:1,weight:1},We={blockNumber:-2,requests:0,lateResponses:0,errorResponses:0,outOfSync:-1,unsupportedEvents:0,rollingDuration:0,score:0,_network:null,_updateNumber:null,_totalTime:0,_lastFatalError:null,_lastFatalErrorTimestamp:0};async function nn(a,s){for(;(a.blockNumber<0||a.blockNumber<s)&&(a._updateNumber||(a._updateNumber=(async()=>{try{const e=await a.provider.getBlockNumber();e>a.blockNumber&&(a.blockNumber=e)}catch(e){a.blockNumber=-2,a._lastFatalError=e,a._lastFatalErrorTimestamp=Re()}a._updateNumber=null})()),await a._updateNumber,a.outOfSync++,!a._lastFatalError););}function H(a){if(a==null)return"null";if(Array.isArray(a))return"["+a.map(H).join(",")+"]";if(typeof a=="object"&&typeof a.toJSON=="function")return H(a.toJSON());switch(typeof a){case"boolean":case"symbol":return a.toString();case"bigint":case"number":return BigInt(a).toString();case"string":return JSON.stringify(a);case"object":{const s=Object.keys(a);return s.sort(),"{"+s.map(e=>`${JSON.stringify(e)}:${H(a[e])}`).join(",")+"}"}}throw console.log("Could not serialize",a),new Error("Hmm...")}function pe(a){if("error"in a){const e=a.error;return{tag:H(e),value:e}}const s=a.result;return{tag:H(s),value:s}}function Te(a,s){const e=new Map;for(const{value:r,tag:n,weight:i}of s){const o=e.get(n)||{value:r,weight:0};o.weight+=i,e.set(n,o)}let t=null;for(const r of e.values())r.weight>=a&&(!t||r.weight>t.weight)&&(t=r);if(t)return t.value}function Pe(a,s){let e=0;const t=new Map;let r=null;const n=[];for(const{value:o,tag:u,weight:p}of s)if(o instanceof Error){const h=t.get(u)||{value:o,weight:0};h.weight+=p,t.set(u,h),(r==null||h.weight>r.weight)&&(r=h)}else n.push(BigInt(o)),e+=p;if(e<a)return r&&r.weight>=a?r.value:void 0;n.sort((o,u)=>o<u?-1:u>o?1:0);const i=Math.floor(n.length/2);return n.length%2?n[i]:(n[i-1]+n[i]+en)/tn}function be(a,s){const e=Te(a,s);if(e!==void 0)return e;for(const t of s)if(t.value)return t.value}function an(a,s){if(a===1)return K(Pe(a,s),"%internal");const e=new Map,t=(i,o)=>{const u=e.get(i)||{result:i,weight:0};u.weight+=o,e.set(i,u)};for(const{weight:i,value:o}of s){const u=K(o);t(u-1,i),t(u,i),t(u+1,i)}let r=0,n;for(const{weight:i,result:o}of e.values())i>=a&&(i>r||n!=null&&i===r&&o>n)&&(r=i,n=o);return n}var b,P,J,ue,Pt,Z,Ne,le,Nt,he,St,Y,Se;class Tt extends oe{constructor(e,t,r){super(t,r);f(this,ue);f(this,Z);f(this,le);f(this,he);f(this,Y);d(this,"quorum");d(this,"eventQuorum");d(this,"eventWorkers");f(this,b,void 0);f(this,P,void 0);f(this,J,void 0);l(this,b,e.map(n=>n instanceof oe?Object.assign({provider:n},Je,We):Object.assign({},Je,n,We))),l(this,P,-2),l(this,J,null),r&&r.quorum!=null?this.quorum=r.quorum:this.quorum=Math.ceil(c(this,b).reduce((n,i)=>(n+=i.weight,n),0)/2),this.eventQuorum=1,this.eventWorkers=1,m(this.quorum<=c(this,b).reduce((n,i)=>n+i.weight,0),"quorum exceed provider wieght","quorum",this.quorum)}get providerConfigs(){return c(this,b).map(e=>{const t=Object.assign({},e);for(const r in t)r[0]==="_"&&delete t[r];return t})}async _detectNetwork(){return R.from(at(await this._perform({method:"chainId"})))}async _translatePerform(e,t){switch(t.method){case"broadcastTransaction":return await e.broadcastTransaction(t.signedTransaction);case"call":return await e.call(Object.assign({},t.transaction,{blockTag:t.blockTag}));case"chainId":return(await e.getNetwork()).chainId;case"estimateGas":return await e.estimateGas(t.transaction);case"getBalance":return await e.getBalance(t.address,t.blockTag);case"getBlock":{const r="blockHash"in t?t.blockHash:t.blockTag;return await e.getBlock(r,t.includeTransactions)}case"getBlockNumber":return await e.getBlockNumber();case"getCode":return await e.getCode(t.address,t.blockTag);case"getGasPrice":return(await e.getFeeData()).gasPrice;case"getLogs":return await e.getLogs(t.filter);case"getStorage":return await e.getStorage(t.address,t.position,t.blockTag);case"getTransaction":return await e.getTransaction(t.hash);case"getTransactionCount":return await e.getTransactionCount(t.address,t.blockTag);case"getTransactionReceipt":return await e.getTransactionReceipt(t.hash);case"getTransactionResult":return await e.getTransactionResult(t.hash)}}async _perform(e){if(e.method==="broadcastTransaction"){const n=await Promise.all(c(this,b).map(async({provider:o,weight:u})=>{try{const p=await o._perform(e);return Object.assign(pe({result:p}),{weight:u})}catch(p){return Object.assign(pe({error:p}),{weight:u})}})),i=be(this.quorum,n);if(g(i!==void 0,"problem multi-broadcasting","SERVER_ERROR",{request:"%sub-requests",info:{request:e,results:n.map(me)}}),i instanceof Error)throw i;return i}await S(this,le,Nt).call(this);const t=new Set;for(let n=0;n<this.quorum;n++)S(this,Z,Ne).call(this,t,e);const r=await S(this,Y,Se).call(this,t,e);for(const n of t)n.perform&&n.result==null&&n.config.lateResponses++;return r}async destroy(){for(const{provider:e}of c(this,b))e.destroy();super.destroy()}}b=new WeakMap,P=new WeakMap,J=new WeakMap,ue=new WeakSet,Pt=function(e){const t=Array.from(e).map(n=>n.config),r=c(this,b).slice();rn(r),r.sort((n,i)=>n.priority-i.priority);for(const n of r)if(!n._lastFatalError&&t.indexOf(n)===-1)return n;return null},Z=new WeakSet,Ne=function(e,t){const r=S(this,ue,Pt).call(this,e);if(r==null)return null;const n={config:r,result:null,didBump:!1,perform:null,staller:null},i=Re();return n.perform=(async()=>{try{r.requests++;const u=await this._translatePerform(r.provider,t);n.result={result:u}}catch(u){r.errorResponses++,n.result={error:u}}const o=Re()-i;r._totalTime+=o,r.rollingDuration=.95*r.rollingDuration+.05*o,n.perform=null})(),n.staller=(async()=>{await sn(r.stallTimeout),n.staller=null})(),e.add(n),n},le=new WeakSet,Nt=async function(){let e=c(this,J);if(!e){const t=[];c(this,b).forEach(r=>{t.push((async()=>{await nn(r,0),r._lastFatalError||(r._network=await r.provider.getNetwork())})())}),l(this,J,e=(async()=>{await Promise.all(t);let r=null;for(const n of c(this,b)){if(n._lastFatalError)continue;const i=n._network;r==null?r=i.chainId:i.chainId!==r&&g(!1,"cannot mix providers on different networks","UNSUPPORTED_OPERATION",{operation:"new FallbackProvider"})}})())}await e},he=new WeakSet,St=async function(e,t){const r=[];for(const n of e)if(n.result!=null){const{tag:i,value:o}=pe(n.result);r.push({tag:i,value:o,weight:n.config.weight})}if(!(r.reduce((n,i)=>n+i.weight,0)<this.quorum)){switch(t.method){case"getBlockNumber":{c(this,P)===-2&&l(this,P,Math.ceil(K(Pe(this.quorum,c(this,b).filter(i=>!i._lastFatalError).map(i=>({value:i.blockNumber,tag:K(i.blockNumber).toString(),weight:i.weight}))))));const n=an(this.quorum,r);return n===void 0?void 0:(n>c(this,P)&&l(this,P,n),c(this,P))}case"getGasPrice":case"estimateGas":return Pe(this.quorum,r);case"getBlock":return"blockTag"in t&&t.blockTag==="pending"?be(this.quorum,r):Te(this.quorum,r);case"call":case"chainId":case"getBalance":case"getTransactionCount":case"getCode":case"getStorage":case"getTransaction":case"getTransactionReceipt":case"getLogs":return Te(this.quorum,r);case"broadcastTransaction":return be(this.quorum,r)}g(!1,"unsupported method","UNSUPPORTED_OPERATION",{operation:`_perform(${me(t.method)})`})}},Y=new WeakSet,Se=async function(e,t){if(e.size===0)throw new Error("no runners?!");const r=[];let n=0;for(const o of e){if(o.perform&&r.push(o.perform),o.staller){r.push(o.staller);continue}o.didBump||(o.didBump=!0,n++)}const i=await S(this,he,St).call(this,e,t);if(i!==void 0){if(i instanceof Error)throw i;return i}for(let o=0;o<n;o++)S(this,Z,Ne).call(this,e,t);return g(r.length>0,"quorum not met","SERVER_ERROR",{request:"%sub-requests",info:{request:t,results:Array.from(e).map(o=>me(o.result))}}),await Promise.race(r),await S(this,Y,Se).call(this,e,t)};function on(a){return a&&typeof a.send=="function"&&typeof a.close=="function"}const cn="goerli kovan sepolia classicKotti optimism-goerli arbitrum-goerli matic-mumbai bnbt".split(" ");function un(a,s){s==null&&(s={});const e=i=>s[i]==="-"?!1:typeof s.exclusive=="string"?i===s.exclusive:Array.isArray(s.exclusive)?s.exclusive.indexOf(i)!==-1:!0;if(typeof a=="string"&&a.match(/^https?:/))return new N(a);if(typeof a=="string"&&a.match(/^wss?:/)||on(a))return new Ie(a);let t=null;try{t=R.from(a)}catch{}const r=[];if(e("publicPolygon")&&t&&t.name==="matic"&&r.push(new N("https://polygon-rpc.com/",t,{staticNetwork:t})),e("alchemy"))try{r.push(new V(a,s.alchemy))}catch{}if(e("ankr")&&s.ankr!=null)try{r.push(new z(a,s.ankr))}catch{}if(e("cloudflare"))try{r.push(new mt(a))}catch{}if(e("etherscan"))try{r.push(new bt(a,s.etherscan))}catch{}if(e("infura"))try{let i=s.infura,o;typeof i=="object"&&(o=i.projectSecret,i=i.projectId),r.push(new W(a,i,o))}catch{}if(e("quicknode"))try{let i=s.quicknode;r.push(new q(a,i))}catch{}if(g(r.length,"unsupported default network","UNSUPPORTED_OPERATION",{operation:"getDefaultProvider"}),r.length===1)return r[0];let n=Math.floor(r.length/2);return n>2&&(n=2),t&&cn.indexOf(t.name)!==-1&&(n=1),s&&s.quorum&&(n=s.quorum),new Tt(r,void 0,{quorum:n})}var v,I;const Ue=class Ue extends it{constructor(e){super(e.provider);d(this,"signer");f(this,v,void 0);f(this,I,void 0);k(this,{signer:e}),l(this,v,null),l(this,I,0)}async getAddress(){return this.signer.getAddress()}connect(e){return new Ue(this.signer.connect(e))}async getNonce(e){if(e==="pending"){c(this,v)==null&&l(this,v,super.getNonce("pending"));const t=c(this,I);return await c(this,v)+t}return super.getNonce(e)}increment(){$e(this,I)._++}reset(){l(this,I,0),l(this,v,null)}async sendTransaction(e){const t=this.getNonce("pending");return this.increment(),e=await this.signer.populateTransaction(e),e.nonce=await t,await this.signer.sendTransaction(e)}signTransaction(e){return this.signer.signTransaction(e)}signMessage(e){return this.signer.signMessage(e)}signTypedData(e,t,r){return this.signer.signTypedData(e,t,r)}};v=new WeakMap,I=new WeakMap;let _e=Ue;const ne="62e1ad51b37b8e00394bda3b";function ln(a){switch(a){case"mainnet":return"eth-mainnet.gateway.pokt.network";case"goerli":return"eth-goerli.gateway.pokt.network";case"matic":return"poly-mainnet.gateway.pokt.network";case"matic-mumbai":return"polygon-mumbai-rpc.gateway.pokt.network"}m(!1,"unsupported network","network",a)}class ce extends N{constructor(e,t,r){e==null&&(e="mainnet");const n=R.from(e);t==null&&(t=ne),r==null&&(r=null);const i={staticNetwork:n},o=ce.getRequest(n,t,r);super(o,n,i);d(this,"applicationId");d(this,"applicationSecret");k(this,{applicationId:t,applicationSecret:r})}_getProvider(e){try{return new ce(e,this.applicationId,this.applicationSecret)}catch{}return super._getProvider(e)}static getRequest(e,t,r){t==null&&(t=ne);const n=new U(`https://${ln(e.name)}/v1/lb/${t}`);return n.allowGzip=!0,r&&n.setCredentials("",r),t===ne&&(n.retryFunc=async(i,o,u)=>(D("PocketProvider"),!0)),n}isCommunityResource(){return this.applicationId===ne}}const hn=void 0,fn=")!@#$%^&*(ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz-_";function gn(a,s){const e=(1<<a)-1,t=[];let r=0,n=0,i=0;for(let o=0;o<s.length;o++)for(r=r<<6|fn.indexOf(s[o]),n+=6;n>=a;){const u=r>>n-a;r&=(1<<n-a)-1,n-=a,u===0?i+=e:(t.push(u+i),i=0)}return t}function dn(a,s){let e=ls(a).join(",");return s.split(/,/g).forEach(t=>{const r=t.match(/^([a-z]*)([0-9]+)([0-9])(.*)$/);m(r!==null,"internal error parsing accents","accents",s);let n=0;const i=gn(parseInt(r[3]),r[4]),o=parseInt(r[2]),u=new RegExp(`([${r[1]}])`,"g");e=e.replace(u,(p,h)=>(--i[n]===0&&(h=String.fromCharCode(h.charCodeAt(0),o),n++),h))}),e.split(",")}var ee;class mn extends ft{constructor(e,t,r,n){super(e,t,n);f(this,ee,void 0);l(this,ee,r)}get _accent(){return c(this,ee)}_decodeWords(){return dn(this._data,this._accent)}}ee=new WeakMap;const pn={en:gt.wordlist()},En=Object.freeze(Object.defineProperty({__proto__:null,AbiCoder:tt,AbstractProvider:oe,AbstractSigner:it,AlchemyProvider:V,AnkrProvider:z,BaseContract:ye,BaseWallet:hs,Block:Ct,BrowserProvider:Bt,CloudflareProvider:mt,ConstructorFragment:At,Contract:st,ContractEventPayload:Ft,ContractFactory:Ae,ContractTransactionReceipt:It,ContractTransactionResponse:Ut,ContractUnknownEventPayload:Dt,EnsPlugin:$t,EnsResolver:Mt,ErrorDescription:jt,ErrorFragment:Jt,EtherSymbol:fs,EtherscanPlugin:Fe,EtherscanProvider:bt,EventFragment:Wt,EventLog:Lt,EventPayload:Ht,FallbackFragment:Gt,FallbackProvider:Tt,FeeData:Kt,FeeDataNetworkPlugin:zt,FetchCancelSignal:Vt,FetchRequest:U,FetchResponse:qt,FetchUrlFeeDataNetworkPlugin:Qt,FixedNumber:Bs,Fragment:Xt,FunctionFragment:Zt,GasCostPlugin:Yt,HDNodeVoidWallet:gs,HDNodeWallet:ds,Indexed:er,InfuraProvider:W,InfuraWebSocketProvider:Rt,Interface:Ve,IpcSocketProvider:hn,JsonRpcApiProvider:nt,JsonRpcProvider:N,JsonRpcSigner:tr,LangEn:gt,Log:rr,LogDescription:sr,MaxInt256:nr,MaxUint256:ar,MessagePrefix:ms,MinInt256:ir,Mnemonic:ps,MulticoinProviderPlugin:or,N:cr,NamedFragment:ur,Network:R,NetworkPlugin:Xe,NonceManager:_e,ParamType:lr,PocketProvider:ce,QuickNodeProvider:q,Result:hr,Signature:fr,SigningKey:gr,SocketBlockSubscriber:yt,SocketEventSubscriber:kt,SocketPendingSubscriber:wt,SocketProvider:Et,SocketSubscriber:ge,StructFragment:dr,Transaction:rt,TransactionDescription:mr,TransactionReceipt:pr,TransactionResponse:br,Typed:yr,TypedDataEncoder:wr,UndecodedEventLog:kr,UnmanagedSubscriber:we,Utf8ErrorFuncs:Er,VoidSigner:Rr,Wallet:bs,WebSocketProvider:Ie,WeiPerEther:Tr,Wordlist:ys,WordlistOwl:ft,WordlistOwlA:mn,ZeroAddress:Pr,ZeroHash:Nr,accessListify:Ye,assert:g,assertArgument:m,assertArgumentCount:Sr,assertNormalize:_r,assertPrivate:Or,checkResultErrors:xr,computeAddress:vr,computeHmac:Le,concat:fe,copyRequest:Cr,dataLength:ze,dataSlice:Br,decodeBase58:Ar,decodeBase64:Fr,decodeBytes32String:Hs,decodeRlp:Ir,decryptCrowdsaleJson:ws,decryptKeystoreJson:ks,decryptKeystoreJsonSync:Es,defaultPath:Rs,defineProperties:k,dnsEncode:Ur,encodeBase58:Dr,encodeBase64:$r,encodeBytes32String:Ls,encodeRlp:Mr,encryptKeystoreJson:Ts,encryptKeystoreJsonSync:Ps,ensNormalize:jr,formatEther:As,formatUnits:Fs,fromTwos:Jr,getAccountPath:Ns,getAddress:He,getBigInt:at,getBytes:y,getBytesCopy:Wr,getCreate2Address:Lr,getCreateAddress:qe,getDefaultProvider:un,getIcapAddress:Hr,getIndexedAccountPath:Ss,getNumber:K,getUint:Gr,hashMessage:_s,hexlify:G,id:Kr,isAddress:zr,isAddressable:Vr,isBytesLike:qr,isCallException:Qr,isCrowdsaleJson:Os,isError:et,isHexString:Xr,isKeystoreJson:xs,isValidName:Zr,keccak256:Oe,lock:Ds,makeError:ke,mask:Yr,namehash:es,parseEther:Is,parseUnits:Us,pbkdf2:ot,randomBytes:Ee,recoverAddress:ts,resolveAddress:rs,resolveProperties:Qe,ripemd160:ct,scrypt:ut,scryptSync:lt,sha256:Ce,sha512:ht,showThrottleMessage:D,solidityPacked:Be,solidityPackedKeccak256:Js,solidityPackedSha256:Ws,stripZerosLeft:ss,toBeArray:Ke,toBeHex:ns,toBigInt:as,toNumber:is,toQuantity:Ze,toTwos:Ge,toUtf8Bytes:xe,toUtf8CodePoints:os,toUtf8String:ie,uuidV4:vs,verifyMessage:Cs,verifyTypedData:cs,version:us,wordlists:pn,zeroPadBytes:ve,zeroPadValue:ae},Symbol.toStringTag,{value:"Module"}));export{En as e};
