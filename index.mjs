// Copyright (c) 2023 The Stdlib Authors. License is Apache-2.0: http://www.apache.org/licenses/LICENSE-2.0
/// <reference types="./index.d.ts" />
import t from"https://cdn.jsdelivr.net/gh/stdlib-js/utils-define-nonenumerable-read-only-property@esm/index.mjs";import e from"https://cdn.jsdelivr.net/gh/stdlib-js/utils-define-nonenumerable-read-only-accessor@esm/index.mjs";import s from"https://cdn.jsdelivr.net/gh/stdlib-js/utils-define-nonenumerable-read-write-accessor@esm/index.mjs";import n from"https://cdn.jsdelivr.net/gh/stdlib-js/assert-has-own-property@esm/index.mjs";import r from"https://cdn.jsdelivr.net/gh/stdlib-js/assert-is-plain-object@esm/index.mjs";import i from"https://cdn.jsdelivr.net/gh/stdlib-js/assert-is-uint32array@esm/index.mjs";import{isPrimitive as o}from"https://cdn.jsdelivr.net/gh/stdlib-js/assert-is-boolean@esm/index.mjs";import d from"https://cdn.jsdelivr.net/gh/stdlib-js/assert-is-function@esm/index.mjs";import m from"https://cdn.jsdelivr.net/gh/stdlib-js/utils-constant-function@esm/index.mjs";import p from"https://cdn.jsdelivr.net/gh/stdlib-js/utils-noop@v0.0.14-esm/index.mjs";import a from"https://cdn.jsdelivr.net/gh/stdlib-js/math-base-assert-is-nan@esm/index.mjs";import{factory as l}from"https://cdn.jsdelivr.net/gh/stdlib-js/random-base-poisson@esm/index.mjs";import{factory as h}from"https://cdn.jsdelivr.net/gh/stdlib-js/random-base-gamma@esm/index.mjs";import j from"https://cdn.jsdelivr.net/gh/stdlib-js/blas-base-gcopy@v0.0.8-esm/index.mjs";import g from"https://cdn.jsdelivr.net/gh/stdlib-js/array-uint32@esm/index.mjs";import c from"https://cdn.jsdelivr.net/gh/stdlib-js/object-assign@esm/index.mjs";import f from"https://cdn.jsdelivr.net/gh/stdlib-js/array-to-json@esm/index.mjs";import u from"https://cdn.jsdelivr.net/gh/stdlib-js/error-tools-fmtprodmsg@v0.0.2-esm/index.mjs";import{isPrimitive as y}from"https://cdn.jsdelivr.net/gh/stdlib-js/assert-is-positive-number@esm/index.mjs";import{isPrimitive as b}from"https://cdn.jsdelivr.net/gh/stdlib-js/assert-is-number@esm/index.mjs";import v from"https://cdn.jsdelivr.net/gh/stdlib-js/assert-is-nan@esm/index.mjs";function w(t,e){return y(t)?!b(e)||v(e)?new TypeError(u("0on6w,NJ",e)):e<=0||e>=1?new RangeError(u("0on7X,Nu",e)):null:new TypeError(u("0on71,NQ",t))}function x(){var y,b,v,x,E,N,T,J,L,G;if(T=!0,0===arguments.length)v=l(x={copy:!1});else if(1===arguments.length){if(!r(x=arguments[0]))throw new TypeError(u("0on2V,FD",x));if(n(x,"copy")&&!o(x.copy))throw new TypeError(u("0on2o,GE","copy",x.copy));if(n(x,"prng")){if(!d(x.prng))throw new TypeError(u("0on6u,JI","prng",x.prng));v=l({prng:x.prng})}else{if(n(x,"state")&&!i(x.state))throw new TypeError(u("0on6z,JJ","state",x.state));!1===(x=c({},x)).copy?T=!1:x.state&&(x.state=j(x.state.length,x.state,1,new g(x.state.length),1)),x.copy=!1,v=l(x)}}else{if(J=w(G=arguments[0],L=arguments[1]))throw J;if(arguments.length>2){if(!r(x=arguments[2]))throw new TypeError(u("0on2V,FD",x));if(n(x,"copy")&&!o(x.copy))throw new TypeError(u("0on2o,GE","copy",x.copy));if(n(x,"prng")){if(!d(x.prng))throw new TypeError(u("0on6u,JI","prng",x.prng));v=l({prng:x.prng})}else{if(n(x,"state")&&!i(x.state))throw new TypeError(u("0on6z,JJ","state",x.state));!1===(x=c({},x)).copy?T=!1:x.state&&(x.state=j(x.state.length,x.state,1,new g(x.state.length),1)),x.copy=!1,v=l(x)}}else v=l(x={copy:!1})}return x&&x.prng?y=void 0===G?h({prng:x.prng}):h(G,L/(1-L),{prng:x.prng}):(x.state?b=x.state:(b=v.state,v.state=b),y=void 0===G?h({state:b,copy:!1}):h(G,L/(1-L),{state:b,copy:!1})),E=void 0===G?O:M,N=v.PRNG,t(E,"NAME","negative-binomial"),x&&x.prng?(t(E,"seed",null),t(E,"seedLength",null),s(E,"state",m(null),p),t(E,"stateLength",null),t(E,"byteLength",null),t(E,"toJSON",m(null))):(e(E,"seed",P),e(E,"seedLength",R),s(E,"state",D,F),e(E,"stateLength",z),e(E,"byteLength",A),t(E,"toJSON",I)),t(E,"PRNG",N),E;function P(){return N.seed}function R(){return N.seedLength}function z(){return N.stateLength}function A(){return N.byteLength}function D(){return N.state}function F(t){if(!i(t))throw new TypeError(u("0on70,NW",t));T&&(t=j(t.length,t,1,new g(t.length),1)),N.state=t}function I(){var t={type:"PRNG"};return t.name=E.NAME,t.state=f(N.state),t.params=void 0===G?[]:[G,L],t}function M(){return v(y())}function O(t,e){return a(t)||a(e)||e<=0||e>=1?NaN:v(y(t,e/(1-e)))}}var E=x();t(E,"factory",x);export{E as default,x as factory};
//# sourceMappingURL=index.mjs.map
