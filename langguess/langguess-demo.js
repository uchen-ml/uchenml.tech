var ft=Object.create;var G=Object.defineProperty;var gt=Object.getOwnPropertyDescriptor;var wt=Object.getOwnPropertyNames;var bt=Object.getPrototypeOf,yt=Object.prototype.hasOwnProperty;var vt=(s,r,e)=>r in s?G(s,r,{enumerable:!0,configurable:!0,writable:!0,value:e}):s[r]=e;var J=(s,r)=>()=>{try{return r||s((r={exports:{}}).exports,r),r.exports}catch(e){throw r=0,e}};var _t=(s,r,e,t)=>{if(r&&typeof r=="object"||typeof r=="function")for(let n of wt(r))!yt.call(s,n)&&n!==e&&G(s,n,{get:()=>r[n],enumerable:!(t=gt(r,n))||t.enumerable});return s};var R=(s,r,e)=>(e=s!=null?ft(bt(s)):{},_t(r||!s||!s.__esModule?G(e,"default",{value:s,enumerable:!0}):e,s));var ie=(s,r,e)=>vt(s,typeof r!="symbol"?r+"":r,e);var ce=J((de,U)=>{"use strict";var V=(()=>{var s=globalThis.document?.currentScript?.src;return async function(r={}){var e=r,t=!!globalThis.window,n=!!globalThis.WorkerGlobalScope,i=globalThis.process?.versions?.node&&globalThis.process?.type!="renderer";n&&(s=self.location.href);var o="";function u(a){return o+a}var c,l;if(t||n){try{o=new URL(".",s).href}catch{}n&&(l=a=>{var d=new XMLHttpRequest;return d.open("GET",a,!1),d.responseType="arraybuffer",d.send(null),new Uint8Array(d.response)}),c=async a=>{var d=await fetch(a,{credentials:"same-origin"});if(d.ok)return d.arrayBuffer();throw new Error(d.status+" : "+d.url)}}var m=console.log.bind(console),p=console.error.bind(console),_,S=!1;class x{}class k extends x{}var b=!1;function M(){var a=oe.buffer;e.HEAPU8=N=new Uint8Array(a),ae=new Uint32Array(a),e.HEAPF32=Ke=new Float32Array(a),re=new BigInt64Array(a)}function w(){}function F(){b=!0,$.j()}function Ht(){}function q(a){a=`Aborted(${a})`,p(a),S=!0,a+=". Build with -sASSERTIONS for more info.";var d=new WebAssembly.RuntimeError(a);throw d}var I;function Te(){return u("langguess_bin.wasm")}function Ee(a){if(a==I&&_)return new Uint8Array(_);if(l)return l(a);throw"both async and sync fetching of the wasm failed"}async function Le(a){if(!_)try{var d=await c(a);return new Uint8Array(d)}catch{}return Ee(a)}async function Ae(a,d){try{var f=await Le(a),h=await WebAssembly.instantiate(f,d);return h}catch(g){p(`failed to asynchronously prepare wasm: ${g}`),q(g)}}async function Pe(a,d,f){if(!a)try{var h=fetch(d,{credentials:"same-origin"}),g=await WebAssembly.instantiateStreaming(h,f);return g}catch(y){p(`wasm streaming compile failed: ${y}`),p("falling back to ArrayBuffer instantiation")}return Ae(d,f)}function Ce(){var a={a:ht};return a}async function ke(){function a(y){return $=y.exports,mt($),M(),$}function d(y){return a(y.instance)}var f=Ce();I??(I=Te());var h=await Pe(_,I,f),g=d(h);return g}class Wt{constructor(d){ie(this,"name","ExitStatus");this.message=`Program terminated with exit(${d})`,this.status=d}}var Ne=()=>q(""),$e=new TextDecoder,Re=(a,d,f,h)=>{var g=d+f;if(h)return g;for(;a[d]&&!(d>=g);)++d;return d},N,Fe=(a,d,f)=>{if(!a)return"";var h=Re(N,a,d,f);return $e.decode(N.subarray(a,h))},Ie=9007199254740992,Oe=-9007199254740992,Ue=a=>a<Oe||a>Ie?NaN:Number(a),te=()=>performance.now(),Be=()=>Date.now(),ze=1,je=a=>a>=0&&a<=3,re;function De(a,d,f){if(d=Ue(d),!je(a))return 28;var h;if(a===0)h=Be();else if(ze)h=te();else return 52;var g=Math.round(h*1e3*1e3);return re[f>>3]=BigInt(g),0}var He=(a,d)=>p(Fe(a,d)),We=()=>N.length,qe=()=>We(),Ge=a=>{q("OOM")},Je=a=>{var d=N.length;a>>>=0,Ge(a)},O=a=>{var d;return(d=/\bwasm-function\[\d+\]:(0x[0-9a-f]+)/.exec(a))?+d[1]:(d=/:(\d+):\d+(?:\)|$)/.exec(a))?2147483648|+d[1]:0},E={},ne=a=>{for(var d of a){var f=O(d);f&&(E[f]=d)}},se=()=>new Error().stack.toString(),Ve=()=>{var a=se().split(`
`);return a[0]=="Error"&&a.shift(),ne(a),E.last_addr=O(a[3]),E.last_stack=a,E.last_addr},ae,Ye=(a,d,f)=>{var h;E.last_addr==a?h=E.last_stack:(h=se().split(`
`),h[0]=="Error"&&h.shift(),ne(h));for(var g=3;h[g]&&O(h[g])!=a;)++g;for(var y=0;y<f&&h[y+g];++y)ae[d+y*4>>2]=O(h[y+g]);return y},Ke;e.wasmBinary&&(_=e.wasmBinary);var Xe,Ze,Qe,et,tt,rt,nt,st,at,ot,it,lt,dt,ct,ut,oe;function mt(a){Xe=e._lg_load=a.k,Ze=e._lg_input=a.l,Qe=e._lg_input_capacity=a.m,et=e._lg_classify=a.n,tt=e._lg_featurize=a.o,rt=e._lg_infer=a.p,nt=e._lg_scores=a.q,st=e._lg_class_count=a.r,at=e._lg_label_ptr=a.s,ot=e._lg_label_len=a.t,it=e._lg_status_message=a.u,lt=e._malloc=a.v,dt=e._free=a.w,ct=oe=a.i,ut=a.__indirect_function_table}var ht={e:Ne,d:De,f:He,b:qe,a:te,c:Je,h:Ve,g:Ye};async function pt(){!S&&(F(),void 0)}var $;return $=await ke(),await pt(),e}})();typeof de=="object"&&typeof U=="object"?(U.exports=V,U.exports.default=V):typeof define=="function"&&define.amd&&define([],()=>V)});var Y=J(()=>{});var K=J(()=>{});var L=class{constructor(r){this._minContentSize=r?.minContentSize??20,this._maxContentSize=r?.maxContentSize??1e5,this._normalizeNewline=r?.normalizeNewline??!0}accepts(r){return!!r&&r.length>=this._minContentSize}prepare(r){return r.length>=this._maxContentSize&&(r=r.substring(0,this._maxContentSize)),this._normalizeNewline&&(r=r.replace(/\r\n/g,`
`)),r}};function le(s,r){let e=[];for(let t=0;t<r.length;t++)e.push({languageId:s[t],confidence:r[t]});return e.sort((t,n)=>n.confidence-t.confidence)}var he=R(ce()),St=0,ue=new TextEncoder,pe=new TextDecoder;function xt(s,r){let e=s.HEAPU8;return pe.decode(e.subarray(r,e.indexOf(0,r)))}function B(s,r){if(r!==St)throw new Error(xt(s,s._lg_status_message(r)))}function me(s,r){let e=s._malloc(r.length);return s.HEAPU8.set(r,e),e}var z=class s{constructor(r,e,t,n){this._module=r;this._inputPtr=e;this._inputCapacity=t;this.labels=n}static async create(r,e,t){if(!(t instanceof ArrayBuffer)||t.byteLength===0)throw new Error("wasmLoaderFunc must resolve to a non-empty ArrayBuffer");let n=await(0,he.default)({wasmBinary:t}),i=ue.encode(JSON.stringify(r)),o=new Uint8Array(e),u=me(n,i);try{let l=me(n,o);try{B(n,n._lg_load(u,i.length,l,o.length))}finally{n._free(l)}}finally{n._free(u)}let c=[];for(let l=0;l<n._lg_class_count();l++){let m=n._lg_label_ptr(l);c.push(pe.decode(n.HEAPU8.subarray(m,m+n._lg_label_len(l))))}return new s(n,n._lg_input(),n._lg_input_capacity(),c)}classify(r){return B(this._module,this._module._lg_classify(this.encode(r))),this.scores()}featurize(r){B(this._module,this._module._lg_featurize(this.encode(r)))}infer(){return B(this._module,this._module._lg_infer()),this.scores()}encode(r){return ue.encodeInto(r,this._module.HEAPU8.subarray(this._inputPtr,this._inputPtr+this._inputCapacity)).written}scores(){let r=this._module._lg_scores()>>2;return this._module.HEAPF32.slice(r,r+this.labels.length)}};var v=class v{static async readNodeBinary(...r){let e=await Promise.resolve().then(()=>R(Y())),t=await Promise.resolve().then(()=>R(K()));return new Promise((n,i)=>{e.readFile(t.join(__dirname,...r),(o,u)=>{if(o){i(o);return}n(u.buffer.slice(u.byteOffset,u.byteOffset+u.byteLength))})})}constructor(r){this._modelJsonLoaderFunc=r?.modelJsonLoaderFunc??v.NODE_MODEL_JSON_FUNC,this._weightsLoaderFunc=r?.weightsLoaderFunc??v.NODE_WEIGHTS_FUNC,this._wasmLoaderFunc=r?.wasmLoaderFunc??v.NODE_WASM_FUNC,this._content=new L(r)}loadModel(){if(this._wasm)return this._wasm;let r=(async()=>{let e=this._modelJson??(this._modelJson=await this._modelJsonLoaderFunc()),t=this._weights??(this._weights=await this._weightsLoaderFunc()),n=this._wasmBinary??(this._wasmBinary=await this._wasmLoaderFunc());try{return await z.create(e,t,n)}finally{this._modelJson=this._weights=this._wasmBinary=void 0}})();return this._wasm=r,r.catch(()=>{this._wasm===r&&(this._wasm=void 0)}),r}async runModel(r){if(!this._content.accepts(r))return[];let e=await this.loadModel();return le(e.labels,e.classify(this._content.prepare(r)))}dispose(){this._wasm=this._modelJson=this._weights=this._wasmBinary=void 0}};v.NODE_MODEL_JSON_FUNC=async()=>{let r=await Promise.resolve().then(()=>R(Y())),e=await Promise.resolve().then(()=>R(K()));return new Promise((t,n)=>{r.readFile(e.join(__dirname,"..","..","model","model.json"),(i,o)=>{if(i){n(i);return}t(JSON.parse(o.toString()))})})},v.NODE_WEIGHTS_FUNC=()=>v.readNodeBinary("..","..","model","group1-shard1of1.bin"),v.NODE_WASM_FUNC=()=>v.readNodeBinary("langguess.wasm");var j=v;async function fe(s,r){let e=performance.now(),t=0,n,i;do{let o=s();n=o instanceof Promise?await o:o,t++,i=performance.now()-e}while(i<r);return{perCallMs:i/t,calls:t,result:n}}function Mt(s){let r=[...s].sort((t,n)=>t-n),e=r.length>>1;return r.length%2?r[e]:(r[e-1]+r[e])/2}function ge(){let s=1/0;for(let r=0;r<20;r++){let e=performance.now(),t=e;for(;t===e;)t=performance.now();s=Math.min(s,t-e)}return s}function we(s){return Math.max(2,50*s)}function be(){return new Promise(s=>{let{port1:r,port2:e}=new MessageChannel;r.onmessage=()=>{r.close(),s()},e.postMessage(null)})}async function ye(s,r,e){for(let i=0;i<r.warmup;i++)await fe(s,0),await e();let t=[],n=performance.now();for(;t.length<r.maxSamples&&(t.length<r.minSamples||performance.now()-n<r.budgetMs);)t.push(await fe(s,r.minMs)),await e();return{medianMs:Mt(t.map(i=>i.perCallMs)),samples:t.length,callsPerSample:t.reduce((i,o)=>i+o.calls,0)/t.length}}var ve={asm:"Assembly",bat:"Batch",c:"C",cs:"C#",cpp:"C++",clj:"Clojure",cmake:"CMake",cbl:"COBOL",coffee:"CoffeeScript",css:"CSS",csv:"CSV",dart:"Dart",dm:"DM",dockerfile:"Dockerfile",ex:"Elixir",erl:"Erlang",f90:"Fortran",go:"Go",groovy:"Groovy",hs:"Haskell",html:"HTML",ini:"INI",java:"Java",js:"JavaScript",json:"JSON",jl:"Julia",kt:"Kotlin",lisp:"Lisp",lua:"Lua",makefile:"Makefile",md:"Markdown",matlab:"MATLAB",mm:"Objective-C",ml:"OCaml",pas:"Pascal",pm:"Perl",php:"PHP",ps1:"PowerShell",prolog:"Prolog",py:"Python",r:"R",rb:"Ruby",rs:"Rust",scala:"Scala",sh:"Shell",sql:"SQL",swift:"Swift",tex:"TeX",toml:"TOML",ts:"TypeScript",v:"Verilog",vba:"VBA",xml:"XML",yaml:"YAML"};var A=[{name:"TypeScript",code:`interface Point {
  readonly x: number;
  readonly y: number;
}

export function centroid(points: readonly Point[]): Point | undefined {
  if (points.length === 0) {
    return undefined;
  }
  const sum = points.reduce((acc, p) => ({ x: acc.x + p.x, y: acc.y + p.y }), { x: 0, y: 0 });
  return { x: sum.x / points.length, y: sum.y / points.length };
}

const unit: Point[] = [{ x: 0, y: 0 }, { x: 1, y: 0 }, { x: 0, y: 1 }];
console.log(centroid(unit));
`},{name:"Python",code:`from collections import Counter
from pathlib import Path


def word_counts(path: Path, top: int = 10) -> list[tuple[str, int]]:
    """Return the most common words in a text file."""
    words = path.read_text(encoding="utf-8").lower().split()
    return Counter(w.strip(".,;:!?") for w in words).most_common(top)


if __name__ == "__main__":
    for word, count in word_counts(Path("notes.txt")):
        print(f"{word:>12} {count}")
`},{name:"Rust",code:`use std::collections::HashMap;

#[derive(Debug, Clone, PartialEq)]
enum Token {
    Number(f64),
    Ident(String),
}

fn tally(tokens: &[Token]) -> HashMap<&str, usize> {
    let mut counts = HashMap::new();
    for token in tokens {
        let key = match token {
            Token::Number(_) => "number",
            Token::Ident(_) => "ident",
        };
        *counts.entry(key).or_insert(0) += 1;
    }
    counts
}

fn main() {
    let tokens = vec![Token::Number(1.5), Token::Ident("x".to_string())];
    println!("{:?}", tally(&tokens));
}
`},{name:"Go",code:`package main

import (
	"fmt"
	"net/http"
	"time"
)

func handler(w http.ResponseWriter, r *http.Request) {
	fmt.Fprintf(w, "path=%s at %s\\n", r.URL.Path, time.Now().Format(time.RFC3339))
}

func main() {
	mux := http.NewServeMux()
	mux.HandleFunc("/", handler)
	srv := &http.Server{Addr: ":8080", Handler: mux, ReadTimeout: 5 * time.Second}
	if err := srv.ListenAndServe(); err != nil {
		panic(err)
	}
}
`},{name:"SQL",code:`CREATE TABLE orders (
    id          INTEGER PRIMARY KEY,
    customer_id INTEGER NOT NULL REFERENCES customers(id),
    total_cents INTEGER NOT NULL,
    placed_at   TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

SELECT c.name, COUNT(o.id) AS order_count, SUM(o.total_cents) / 100.0 AS revenue
FROM customers c
LEFT JOIN orders o ON o.customer_id = c.id
WHERE o.placed_at >= DATE '2024-01-01'
GROUP BY c.name
HAVING COUNT(o.id) > 2
ORDER BY revenue DESC;
`},{name:"PowerShell",code:`param(
    [Parameter(Mandatory = $true)]
    [string]$Path,
    [int]$Days = 30
)

$cutoff = (Get-Date).AddDays(-$Days)
Get-ChildItem -Path $Path -Recurse -File |
    Where-Object { $_.LastWriteTime -lt $cutoff } |
    ForEach-Object {
        Write-Host "Removing $($_.FullName)"
        Remove-Item -LiteralPath $_.FullName -WhatIf
    }
`},{name:"YAML",code:`name: build
on:
  push:
    branches: [main]
  pull_request:

jobs:
  test:
    runs-on: ubuntu-latest
    strategy:
      matrix:
        node: [18, 20, 22]
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with:
          node-version: \${{ matrix.node }}
      - run: npm ci
      - run: npm test
`},{name:"C++",code:`#include <algorithm>
#include <iostream>
#include <string>
#include <vector>

template <typename T>
T clamp_sum(const std::vector<T>& values, T limit) {
  T total{};
  for (const T& v : values) {
    total = std::min(total + v, limit);
  }
  return total;
}

int main() {
  std::vector<int> xs = {3, 9, 27, 81};
  std::cout << "sum: " << clamp_sum(xs, 100) << std::endl;
  return 0;
}
`}];var X={minContentSize:20,maxContentSize:1e5},C=5,xe=3,Tt=new Set(["Go","SQL","PowerShell","YAML"]),Et=250,Lt={warmup:5,minSamples:5,maxSamples:15,budgetMs:300},At={warmup:2,minSamples:3,maxSamples:5,budgetMs:300},_e=1,H=["#0871c1","#da7135","#0c9999","#da668a","#018455","#b772ce","#6d7601","#7489ed","#996103","#00a0cf","#b64340","#0ea998","#a5458a","#62a745","#7758bb","#af8f05"],W=[{id:"uchen",label:"Uchen (WASM)",short:"Uchen",slow:!1},{id:"tfjs",label:"TensorFlow.js",short:"TensorFlow.js",slow:!0},{id:"litert",label:"LiteRT.js 2.5.3 \xB7 sparse .tflite",short:"LiteRT.js",slow:!1}];if(W.length*C>H.length)throw new Error("More table cells than language colors: two languages on screen would share one.");var Pt=new Uint8Array([0,97,115,109,1,0,0,0,1,5,1,96,0,1,123,3,2,1,0,10,10,1,8,0,65,0,253,15,253,98,11]),Ct=`
:host {
	display: block;
	max-width: 100%;
	container-type: inline-size;
	color: var(--lg-fg, inherit);
	background: var(--lg-bg, transparent);
	font-family: var(--lg-font, inherit);
	--_muted: var(--lg-muted, color-mix(in srgb, currentColor 62%, transparent));
	--_surface: var(--lg-surface, rgb(127 127 127 / 0.08));
	--_border: var(--lg-border, rgb(127 127 127 / 0.35));
	--_input-border: var(--lg-input-border, var(--_border));
	--_input-shadow: var(--lg-input-shadow, none);
	--_input-surface: var(--lg-input-surface, var(--_surface));
	--_accent: var(--lg-accent, #2563eb);
	--_warn: var(--lg-warn, #d97706);
	--_mono: var(--lg-mono, ui-monospace, SFMono-Regular, Menlo, Consolas, "Liberation Mono", monospace);
}
*, *::before, *::after { box-sizing: border-box; }
[hidden] { display: none !important; }
.wrap { display: grid; gap: 0.75rem; min-width: 0; }
p { margin: 0; }
.muted { color: var(--_muted); font-size: 0.875em; }
.vh {
	position: absolute; width: 1px; height: 1px; overflow: hidden;
	clip: rect(0 0 0 0); clip-path: inset(50%); white-space: nowrap;
}
button {
	font: inherit; font-size: 0.875em; color: inherit; cursor: pointer;
	padding: 0.35em 0.8em; border: 1px solid var(--_border); border-radius: 999px;
	background: var(--_surface);
}
button:hover { border-color: var(--_accent); }
button:disabled, button[aria-disabled="true"] { cursor: default; opacity: 0.55; border-color: var(--_border); }
:focus-visible { outline: 2px solid var(--_accent); outline-offset: 2px; }
.chips { display: flex; flex-wrap: wrap; align-items: center; gap: 0.15rem; }
.chips button {
	font-size: 0.75rem; padding: 0.15em 0.65em; background: transparent; color: var(--_muted);
	border-color: color-mix(in srgb, var(--_muted) 35%, transparent);
	min-height: 24px; /* WCAG 2.5.8 target size */
}
.chips button:hover { border-color: var(--_accent); color: inherit; }
/* The ring, not just the tint, marks the loaded sample. */
.chips button[aria-pressed="true"] {
	border-color: var(--_accent); box-shadow: inset 0 0 0 1px var(--_accent);
	background: color-mix(in srgb, var(--_accent) 10%, transparent); color: inherit;
}
.editor {
	display: flex; flex-direction: column;
	height: 30em; min-height: 12em; resize: vertical; overflow: hidden; font-size: 0.8125rem;
	border: 1.5px solid var(--_input-border); box-shadow: var(--_input-shadow);
	background: var(--_input-surface);
}
.editor > .cm-editor, .editor > .placeholder { flex: 1 1 auto; min-height: 0; }
/* Focus recolors and thickens the frame itself instead of adding a ring around it. */
.editor:has(> .cm-editor.cm-focused) { border-color: var(--_accent); box-shadow: inset 0 0 0 1px var(--_accent), var(--_input-shadow); }
@supports not selector(:has(*)) {
	.editor:focus-within { border-color: var(--_accent); box-shadow: inset 0 0 0 1px var(--_accent), var(--_input-shadow); }
}
.strip {
	flex: none; display: flex; align-items: center; justify-content: space-between; gap: 0.5rem;
	min-height: 2.25rem; padding: 0.25rem 0.5rem 0.25rem 0.7em; border-bottom: 1px solid var(--_border);
	font-family: var(--lg-font, inherit); font-size: 0.8125rem;
}
.strip button { padding: 0.15em 0.7em; }
#guess { min-width: 0; overflow: hidden; text-overflow: ellipsis; white-space: nowrap; }
.tools { flex: none; display: flex; align-items: center; gap: 0.6rem; }
.placeholder {
	margin: 0; overflow: auto; padding: 4px 0.7em; font-family: var(--_mono); line-height: 1.45;
	tab-size: 4; white-space: pre;
}
.meta { display: flex; flex-wrap: wrap; align-items: center; gap: 0.25rem 1rem; }
/* Kept in layout so focusing the editor does not shift the page. */
#tab-hint { margin-left: auto; visibility: hidden; }
.wrap:has(.cm-editor.cm-focused) #tab-hint { visibility: visible; }
@supports not selector(:has(*)) {
	#tab-hint { visibility: visible; }
}
.swatch::before {
	content: ""; display: inline-block; width: 0.6em; height: 0.6em; margin-right: 0.4em; border-radius: 0.15em;
	background: var(--_lang, transparent);
}
table {
	width: 100%; table-layout: fixed; border-collapse: collapse;
	font-size: 0.875em; font-variant-numeric: tabular-nums;
}
caption { text-align: left; color: var(--_muted); padding-bottom: 0.5em; font-size: 0.9375em; }
/* Wide enough for the footer's "Median" label, which shares the rank column. */
col.rank { width: 4.25em; }
th, td { padding: 0.4em 0.5em; text-align: left; vertical-align: top; min-width: 0; }
thead th { font-weight: 600; vertical-align: bottom; overflow-wrap: anywhere; border-bottom: 1px solid var(--_border); }
tbody th, tbody td { vertical-align: middle; }
tbody th, tfoot th { font-weight: 400; color: var(--_muted); }
tfoot td, tfoot th { border-top: 1px solid var(--_border); }
tfoot .time { font-weight: 600; }
/* Reserved lines keep the footer one height from loading to timed. */
tfoot .time, tfoot .ratio { display: block; min-height: 1lh; }
tfoot small { font-weight: 400; color: var(--_muted); font-size: 0.857em; overflow-wrap: anywhere; }
tfoot button { margin-top: 0.35em; font-size: 0.8em; padding: 0.25em 0.6em; }
.cell { display: flex; align-items: center; gap: 0.4em; }
.lang { flex: 0 0 42%; min-width: 0; overflow: hidden; text-overflow: ellipsis; white-space: nowrap; }
.swatch:empty::before { content: none; }
.bar {
	flex: 1; min-width: 1.5em; height: 0.45rem; border-radius: 999px; overflow: hidden;
	background: color-mix(in srgb, currentColor 8%, transparent);
	border: 1px solid color-mix(in srgb, var(--_muted) 30%, transparent);
}
.fill { display: block; height: 100%; width: 0; background: var(--_lang, var(--_accent)); border-radius: inherit; transition: width 120ms ease-out; }
.pct { flex: none; font-size: 0.857em; color: var(--_muted); min-width: 3.3em; text-align: right; }
td.stale { opacity: 0.45; }
.differs { background: color-mix(in srgb, var(--_warn) 16%, transparent); box-shadow: inset 3px 0 0 var(--_warn); }
.legend { display: flex; gap: 0.5em; align-items: center; }
.legend::before { content: ""; width: 0.9em; height: 0.9em; flex: none; border-radius: 0.15em;
	background: color-mix(in srgb, var(--_warn) 16%, transparent); box-shadow: inset 3px 0 0 var(--_warn); }
.below { display: grid; justify-items: start; row-gap: 0.25rem; }
.how { justify-self: stretch; min-width: 0; }
summary { width: fit-content; cursor: pointer; padding: 0.35em 0; font-size: 0.875em; color: var(--_muted); }
.loads { margin: 0.5em 0; padding-left: 1.2em; display: grid; gap: 0.4em; font-size: 0.875em; overflow-wrap: anywhere; }
.loads .detail { display: block; color: var(--_muted); }
#env { overflow-wrap: anywhere; }
.error { border: 1px solid var(--_border); border-left: 3px solid #d14343; border-radius: 0.4em; padding: 0.7em 0.9em; background: var(--_surface); }
@container (max-width: 480px) {
	/* 16px stops iOS zooming on focus; the height keeps editor and the top rows on one iPhone screen. */
	.editor { font-size: 16px; height: 17.5rem; }
	.chips .wide-only { display: none; }
	/* Its own line on a phone; shown on focus, where the keyboard opening reflows the page anyway. */
	#tab-hint { display: none; }
	.wrap:has(.cm-editor.cm-focused) #tab-hint { display: inline; }
	@supports not selector(:has(*)) {
		#tab-hint { display: inline; }
	}
	table { font-size: 0.8125em; }
	th, td { padding: 0.4em 0.25em; }
	col.rank { width: 3.6em; }
	/* A third of a phone is too narrow for name, bar and percent on one line. */
	.cell { flex-wrap: wrap; row-gap: 0.15em; }
	.lang { flex-basis: 100%; }
}
@media (prefers-reduced-motion: reduce) {
	.fill { transition: none; }
}
`,D=s=>W.map(r=>s(r.id)).join(""),kt=`
<style>${Ct}</style>
<div class="wrap">
	<p class="muted" id="editor-error" role="alert" hidden>The editor failed to load; the samples still run.</p>
	<div class="chips" role="group" aria-label="Samples"></div>
	<div class="editor" id="src"><div class="strip"><span id="guess"></span><span class="tools"><span id="chars"
		class="muted"></span><button type="button" id="clear" aria-label="Clear editor" hidden>Clear</button></span></div>
		<pre class="placeholder"></pre></div>
	<div class="meta muted">
		<span id="limit" hidden></span>
		<span id="tab-hint">Tab indents; Esc, then Tab, leaves the editor.</span>
	</div>
	<table>
		<caption>Same weights in every framework.<span class="vh"> Top ${C} languages for the editor text from each
		framework, with the median time per call measured in this tab.</span></caption>
		<colgroup><col class="rank">${D(()=>"<col>")}</colgroup>
		<thead><tr>
			<th scope="col"><span aria-hidden="true">#</span><span class="vh">Rank</span></th>
			${W.map(s=>`<th scope="col" data-fw="${s.id}">${s.short}</th>`).join("")}
		</tr></thead>
		<tbody id="guesses">
			${Array.from({length:C},(s,r)=>`<tr${r<xe?"":' class="more" hidden'}><th scope="row">${r+1}</th>${D(e=>`<td data-fw="${e}"><span class="cell"><span class="lang swatch"></span><span class="bar" aria-hidden="true"><span class="fill"></span></span><span class="pct"></span></span><span class="vh note"></span></td>`)}</tr>`).join("")}
		</tbody>
		<tfoot><tr>
			<th scope="row">Median<span class="vh"> per call</span></th>
			${D(s=>`<td data-fw="${s}"><span class="time"></span><small class="ratio"></small>`+(s==="litert"?`<button type="button" id="load-litert" hidden>Load (${Me(3795318)} gzipped)</button>`:"")+"</td>")}
		</tr></tfoot>
	</table>
	<p class="muted legend" id="differ-note" hidden>Highlighted: this framework's top guess differs from the others'.</p>
	<div class="below">
		<button type="button" id="more" aria-expanded="false" aria-controls="guesses">Show top ${C}</button>
		<details class="how">
			<summary>How this was measured</summary>
			<ul class="loads">${D(s=>`<li data-fw="${s}"><span class="line"></span><span class="detail"></span></li>`)}</ul>
			<p class="muted" id="env"></p>
		</details>
	</div>
	<p class="vh" id="top" aria-live="polite"></p>
</div>
`;function Nt(){return typeof WebAssembly=="object"&&WebAssembly.validate(Pt)}function T(s){let r=s*1e3;return`${r.toLocaleString("en-US",{maximumFractionDigits:r<100?1:0})} \xB5s`}function $t(s){return s>=10?s.toFixed(0):s.toFixed(1)}function Me(s){return`${(s/1e3).toLocaleString("en-US",{maximumFractionDigits:s<1e4?1:0})} KB`}function Rt(s){return`${(s/1e3).toLocaleString("en-US",{minimumFractionDigits:3})} KB`}function Z(s){return ve[s]??s}async function P(s){let r=await fetch(s);if(!r.ok)throw new Error(`${r.status} ${r.statusText} for ${s}`);return r}async function Ft(s){let r=new Map;for(let e of performance.getEntriesByType("resource"))if(s(e.name)){let t=r.get(e.name);r.set(e.name,{bytes:Math.max(t?.bytes??0,e.decodedBodySize),revalidated:(t?.revalidated??!1)||e.transferSize>0&&e.decodedBodySize===0})}return Promise.all([...r].map(async([e,{bytes:t,revalidated:n}])=>({name:new URL(e).pathname.split("/").pop(),bytes:t||(n?await It(e):0)})))}async function It(s){try{return(await(await fetch(s,{cache:"force-cache"})).arrayBuffer()).byteLength}catch{return 0}}function Ot(s){return`download ${T(s.fetchMs)}, then init and a first call ${T(s.initMs)}`}function Ut(s){let r=Math.round(s.callsPerSample);return`${s.samples} batches \xD7 ${r} call${r===1?"":"s"}`}function Bt(s){return s.reduce((r,e)=>r+e.bytes,0)}function zt(s){return s.loadError===void 0?s.status||"not loaded":`failed: ${s.loadError}`}function jt(){return navigator.connection?.saveData===!0}async function Dt(s,r){console.time(s);try{return await r()}finally{console.timeEnd(s)}}var ee=class extends HTMLElement{constructor(){super(...arguments);this.started=!1;this.policy=new L(X);this.frameworks=W.map(e=>({...e,status:""}));this.measureOrder=[...this.frameworks].sort((e,t)=>Number(e.slow)-Number(t.slow));this.modelJsonText="";this.weights=new ArrayBuffer(0);this.wasmBinary=new ArrayBuffer(0);this.timerResolutionMs=0;this.batchMs=0;this.predictSeq=0;this.chipSeq=0;this.queue=Promise.resolve();this.text=A[0].code;this.colorSlot=new Map;this.slotSeen=H.map(()=>-1);this.renders=0}connectedCallback(){this.started||(this.started=!0,this.shadow=this.attachShadow({mode:"open"}),this.shadow.innerHTML=kt,this.$(".placeholder").textContent=this.text,this.buildSamples(),this.$("#load-litert").addEventListener("click",()=>{this.loadLitert()}),this.$("#more").addEventListener("click",()=>this.toggleMore()),this.render(),this.start())}$(e){return this.shadow.querySelector(e)}framework(e){return this.frameworks.find(t=>t.id===e)}assetUrl(e){let t=this.getAttribute("base"),n=t===null?new URL("./",import.meta.url):new URL(t.endsWith("/")?t:`${t}/`,document.baseURI);return new URL(e,n).href}loaders(){return{modelJsonLoaderFunc:async()=>JSON.parse(this.modelJsonText),weightsLoaderFunc:async()=>this.weights,wasmLoaderFunc:async()=>this.wasmBinary,...X}}buildSamples(){let e=this.$(".chips"),t=(n,i)=>{let o=document.createElement("button");o.type="button",o.textContent=n,o.setAttribute("aria-pressed","false"),o.classList.toggle("wide-only",Tt.has(n)),o.addEventListener("click",()=>{this.loadSample(o,n,i)}),e.append(o)};for(let n of A)t(n.name,async()=>n.code);t("201 KB test file",()=>this.largeFile()),this.setPressedChip(e.querySelector("button"))}largeFile(){return this.largeFetch??(this.largeFetch=P(this.assetUrl("large.ts.txt")).then(e=>e.text()).catch(e=>{throw this.largeFetch=void 0,e})),this.largeFetch}async loadSample(e,t,n){let i=++this.chipSeq,o;try{o=await n()}catch(u){console.error(u),e.textContent=`${t} (failed to load)`;return}i===this.chipSeq&&(e.textContent=t,this.text=o,this.editor?this.editor.setText(o):this.$(".placeholder").textContent=o,this.setPressedChip(e),this.textChanged(!0))}setPressedChip(e){this.pressed?.setAttribute("aria-pressed","false"),e?.setAttribute("aria-pressed","true"),this.pressed=e}async mountEditor(){try{let e=await import(new URL("./langguess-editor.js",import.meta.url).href);await this.exclusive(async()=>{let t=this.shadow.querySelector("#src");if(!t)return;this.editor=e.createEditor(t,this.shadow,this.text,{"aria-label":"Source code to classify","aria-describedby":"tab-hint"},i=>{this.text=i,this.chipSeq++,this.setPressedChip(),this.textChanged(!1)}),t.querySelector(".placeholder").remove();let n=this.$("#clear");n.addEventListener("click",()=>{n.getAttribute("aria-disabled")!=="true"&&this.editor?.clear()}),n.hidden=!1})}catch(e){console.error(e);let t=this.shadow.querySelector("#editor-error");t&&(t.hidden=!1);return}this.render()}fail(e){let t=this.$(".wrap");t.innerHTML='<p class="error" role="alert"></p>',t.firstElementChild.textContent=e,this.style.minHeight="0"}async start(){if(!Nt()){this.fail("This demo needs WebAssembly SIMD (Chrome or Edge 91+, Firefox 89+, Safari 16.4+). This browser does not support it.");return}this.timerResolutionMs=ge(),this.batchMs=we(this.timerResolutionMs);let e=this.assetUrl("model/"),t=this.assetUrl("langguess.wasm"),n=performance.getEntriesByName(import.meta.url)[0];if(!await this.load(this.framework("uchen"),()=>Promise.all([P(`${e}model.json`).then(c=>c.text()),P(`${e}group1-shard1of1.bin`).then(c=>c.arrayBuffer()),P(t).then(c=>c.arrayBuffer())]),async([c,l,m])=>{this.modelJsonText=c,this.weights=l,this.wasmBinary=m;let p=new j(this.loaders());return await p.runModel(A[0].code),{engine:p,runtime:"WebAssembly SIMD, main thread"}},c=>c===import.meta.url||c===t||c.startsWith(e),n?.startTime)){this.fail(`Could not load the model: ${this.framework("uchen").loadError}`);return}let{fetchMs:o,initMs:u}=this.framework("uchen").load;this.dispatchEvent(new CustomEvent("langguess-ready",{detail:{loadMs:o+u},bubbles:!0,composed:!0})),this.textChanged(!0),await this.mountEditor(),await this.loadTfjs(),jt()?(this.framework("litert").status="Data saver is on",this.$("#load-litert").hidden=!1,this.render()):await this.loadLitert()}async loadTfjs(){let e=new URL("./tfjs-race.js",import.meta.url).href;await this.load(this.framework("tfjs"),()=>import(e),async t=>{let n=new t.ModelOperations(this.loaders());return await n.runModel(A[0].code),{engine:n,runtime:"3.21.0, CPU backend as upstream configures it"}},t=>t===e)}async loadLitert(){this.$("#load-litert").hidden=!0;let e=new URL("./litert-race.js",import.meta.url).href,t=this.assetUrl("litert/");await this.load(this.framework("litert"),async()=>{let n=await import(e),[,i,o]=await Promise.all([n.loadRuntime(t),P(`${t}guesslang_sparse.tflite`).then(u=>u.arrayBuffer()),P(`${t}labels.json`).then(u=>u.json())]);return{mod:n,model:i,labels:o}},async({mod:n,model:i,labels:o})=>{let u=await n.LiteRtEngine.create(t,new Uint8Array(i),o,X);await u.runModel(A[0].code);let{wasm:c,numThreads:l,fullyAccelerated:m}=u.runtime,p=l===void 0?"default threads":`${l} thread${l===1?"":"s"}`;return{engine:u,runtime:`${c}.wasm, ${p}, XNNPACK ${m?"takes every op":"misses some ops"}, bigram featurizer in JavaScript; timing repeats one text, so it skips the input resize a new text costs`}},n=>n===e||n.startsWith(t))}async load(e,t,n,i,o=performance.now()){e.status="loading\u2026",e.loadError=void 0,this.render();try{let u=await t(),c=performance.now()-o;await this.exclusive(async()=>{let l=performance.now(),{engine:m,runtime:p}=await n(u);e.load={fetchMs:c,initMs:performance.now()-l,files:[]},e.runtime=p,e.engine=m}),e.load.files=await Ft(i)}catch(u){return e.status="failed",e.loadError=u.message,this.render(),!1}return this.render(),this.kick(),!0}exclusive(e){let t=this.queue.then(e);return this.queue=t.catch(()=>{}),t}textChanged(e){this.measuring?.abort(),this.measuring=void 0,clearTimeout(this.debounce),this.debounce=void 0,this.predict(),e?this.startMeasuring():this.debounce=setTimeout(()=>{this.debounce=void 0,this.startMeasuring()},Et)}async predict(){let e=++this.predictSeq,t=this.text,n=this.framework("uchen");if(n.engine&&this.policy.accepts(t))try{let i=await n.engine.runModel(t);if(e!==this.predictSeq)return;n.results={text:t,top:i}}catch(i){n.failed={text:t,message:i.message}}this.render()}kick(){this.debounce===void 0&&!this.measuring&&this.startMeasuring()}startMeasuring(){let e=new AbortController;this.measuring=e,this.measureAll(this.text,e)}nextUnmeasured(e){return this.policy.accepts(e)?this.measureOrder.find(t=>t.engine&&t.timing?.text!==e&&t.failed?.text!==e):void 0}async measureAll(e,t){try{for(let n=this.nextUnmeasured(e);n&&!t.signal.aborted;n=this.nextUnmeasured(e)){let i=n;try{await this.exclusive(()=>this.measureOne(i,e,t.signal))}catch(o){t.signal.aborted||(i.failed={text:e,message:o.message},this.render())}}}finally{this.measuring===t&&(this.measuring=void 0)}}async measureOne(e,t,n){n.throwIfAborted();let i=e.engine,o=()=>i.runModel(t),u=async()=>{await be(),n.throwIfAborted()};await u();let c=await Dt(`langguess:${e.id}`,o);n.throwIfAborted(),e.results={text:t,top:c},this.render();let l=this.timerResolutionMs>_e?void 0:await ye(o,{...e.slow?At:Lt,minMs:this.batchMs},u);e.timing={text:t,m:l},this.render()}render(){let e=this.text,t=e.length,n=this.policy.accepts(e);this.$("#chars").textContent=`${t.toLocaleString("en-US")} characters`;let i=this.$("#limit");i.hidden=t<=1e5,i.textContent=i.hidden?"":`Every framework reads only the first ${1e5.toLocaleString("en-US")} characters, as upstream does.`,this.$("#clear").setAttribute("aria-disabled",String(t===0));let o=this.differing(e),u=this.languageColors(n);for(let l of this.frameworks)this.renderColumn(l,e,n,o.has(l),u);this.$("#differ-note").hidden=o.size===0,this.$("#env").textContent=this.environmentText(e);let c=this.framework("uchen").results;if(!n)this.announceTop("","No prediction"),this.showGuess(void 0,u,`No guess under ${20} characters`);else if(c?.text===e){let l=c.top[0].languageId;this.announceTop(l,`Top guess: ${Z(l)}`),this.showGuess(l,u)}else this.framework("uchen").failed?.text===e&&(this.announceTop("","No prediction"),this.showGuess(void 0,u,"Uchen failed on this text"))}showGuess(e,t,n=""){let i=this.editor?.setLanguage(e),o=this.$("#guess");if(o.classList.toggle("swatch",e!==void 0),e===void 0){o.style.removeProperty("--_lang"),o.textContent=n;return}o.style.setProperty("--_lang",t.get(e));let u=l=>{let m=document.createElement("span");return m.textContent=l,m},c=u(" \xB7 ");c.setAttribute("aria-hidden","true"),o.replaceChildren(u(Z(e)),c,u(`Uchen's guess${i===!1?", no highlighter":""}`))}languageColors(e){let t=++this.renders,n=new Set;for(let c=0;e&&c<C;c++)for(let l of this.frameworks){let m=l.results?.top[c];m&&n.add(m.languageId)}let i=new Set,o=[];for(let c of n){let l=this.colorSlot.get(c);l!==void 0&&!i.has(l)?i.add(l):o.push(c)}for(let c of o){let l=-1;for(let m=0;m<H.length;m++)!i.has(m)&&(l<0||this.slotSeen[m]<this.slotSeen[l])&&(l=m);for(let[m,p]of this.colorSlot)p===l&&this.colorSlot.delete(m);this.colorSlot.set(c,l),i.add(l)}let u=new Map;for(let c of n){let l=this.colorSlot.get(c);this.slotSeen[l]=t,u.set(c,H[l])}return u}differing(e){let t=this.frameworks.filter(i=>i.results?.text===e&&i.results.top.length),n=i=>i.results.top[0].languageId;return new Set(t.length<2?[]:t.filter(i=>!t.some(o=>o!==i&&n(o)===n(i))))}renderColumn(e,t,n,i,o){let u=`[data-fw="${e.id}"]`;this.$(`thead ${u}`).classList.toggle("differs",i);let c=this.$(`.loads ${u}`);if(e.load&&e.engine){let b=Bt(e.load.files),M=b?`${Me(b)}${e.id==="tfjs"?" + same weights":""} \xB7 `:"";c.querySelector(".line").textContent=`${e.label}: ${M}loaded in ${T(e.load.fetchMs+e.load.initMs)}`;let w=e.load.files.map(F=>`${F.name} ${Rt(F.bytes)}`).join(", ");c.querySelector(".detail").textContent=(w?`Uncompressed: ${w}. `:"")+`Load: ${Ot(e.load)}.`}else c.querySelector(".line").textContent=`${e.label}: ${zt(e)}`,c.querySelector(".detail").textContent="";let l=n?e.results:void 0,m=l!==void 0&&l.text!==t;this.shadow.querySelectorAll(`tbody td${u}`).forEach((b,M)=>{let w=l?.top[M];b.classList.toggle("stale",m),b.classList.toggle("differs",i&&M===0),b.querySelector(".lang").textContent=w?Z(w.languageId):"",b.style.setProperty("--_lang",w?o.get(w.languageId):"transparent"),b.querySelector(".pct").textContent=w?`${(w.confidence*100).toFixed(1)}%`:"",b.querySelector(".fill").style.width=w?`${(w.confidence*100).toFixed(2)}%`:"0",b.querySelector(".note").textContent=m&&w?" (previous text)":i&&M===0?" (differs from the others)":""});let p=this.$(`tfoot ${u}`),_=this.framework("uchen").timing,S="",x="",k=e.timing?.text===t?e.timing.m:void 0;n&&e.failed?.text===t?(S="failed",x=e.failed.message):n&&e.timing?.text===t&&!k?(S="not timed",x="timer too coarse"):n&&k?(S=T(k.medianMs),e.id==="uchen"?x="reference":_?.text===t&&_.m&&(x=`\xD7${$t(k.medianMs/_.m.medianMs)} vs Uchen`)):n&&e.engine?S="measuring\u2026":e.engine||(S=e.status,x=e.loadError??""),p.querySelector(".time").textContent=S,p.querySelector(".ratio").textContent=x}environmentText(e){let t=this.frameworks.filter(o=>o.timing?.text===e&&o.timing.m);return[this.timerResolutionMs>_e?`Not timed: this browser's timer resolution is ${T(this.timerResolutionMs)}.`:`Median per call after warmup${t.length?": ":""}`+t.map(o=>`${o.short} ${Ut(o.timing.m)}`).join(", ")+`. Batches last \u2265 ${T(this.batchMs)}, since this browser's timer resolution is ${T(this.timerResolutionMs)}.`,...this.frameworks.filter(o=>o.runtime).map(o=>`${o.short}: ${o.runtime}.`),`crossOriginIsolated: ${globalThis.crossOriginIsolated===!0}; hardwareConcurrency: ${navigator.hardwareConcurrency}; ${navigator.userAgent}`].join(" ")}announceTop(e,t){e!==this.announcedTop&&(this.announcedTop=e,this.$("#top").textContent=t)}toggleMore(){let e=this.$("#more"),t=e.getAttribute("aria-expanded")!=="true";e.setAttribute("aria-expanded",String(t)),e.textContent=`Show top ${t?xe:C}`,this.shadow.querySelectorAll("tbody tr.more").forEach(n=>{n.hidden=!t})}};customElements.get("langguess-demo")||customElements.define("langguess-demo",ee);
