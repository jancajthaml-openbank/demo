/*! For license information please see runtime.js.LICENSE.txt */
(()=>{var e={"./node_modules/@babel/runtime/regenerator/index.js":(e,r,t)=>{e.exports=t("dll-reference dependencies_dll")("./node_modules/@babel/runtime/regenerator/index.js")},"./node_modules/@lastui/rocker/platform/index.js":(e,r,t)=>{e.exports=t("dll-reference platform_dll")("./node_modules/@lastui/rocker/platform/index.js")},"./node_modules/connected-react-router/lib/index.js":(e,r,t)=>{e.exports=t("dll-reference dependencies_dll")("./node_modules/connected-react-router/lib/index.js")},"./node_modules/react-dom/index.js":(e,r,t)=>{e.exports=t("dll-reference dependencies_dll")("./node_modules/react-dom/index.js")},"./node_modules/react-redux/lib/index.js":(e,r,t)=>{e.exports=t("dll-reference dependencies_dll")("./node_modules/react-redux/lib/index.js")},"./node_modules/react-router/index.js":(e,r,t)=>{e.exports=t("dll-reference dependencies_dll")("./node_modules/react-router/index.js")},"./node_modules/react/index.js":(e,r,t)=>{e.exports=t("dll-reference dependencies_dll")("./node_modules/react/index.js")},"./node_modules/redux-saga/dist/redux-saga-core-npm-proxy.cjs.js":(e,r,t)=>{e.exports=t("dll-reference dependencies_dll")("./node_modules/redux-saga/dist/redux-saga-core-npm-proxy.cjs.js")},"./node_modules/redux-saga/dist/redux-saga-effects-npm-proxy.cjs.js":(e,r,t)=>{e.exports=t("dll-reference dependencies_dll")("./node_modules/redux-saga/dist/redux-saga-effects-npm-proxy.cjs.js")},"./node_modules/redux/lib/redux.js":(e,r,t)=>{e.exports=t("dll-reference dependencies_dll")("./node_modules/redux/lib/redux.js")},"dll-reference dependencies_dll":e=>{"use strict";e.exports=dependencies_dll},"dll-reference platform_dll":e=>{"use strict";e.exports=platform_dll}},r={};function t(n){var o=r[n];if(void 0!==o)return o.exports;var d=r[n]={exports:{}};return e[n](d,d.exports,t),d.exports}t.n=e=>{var r=e&&e.__esModule?()=>e.default:()=>e;return t.d(r,{a:r}),r},t.d=(e,r)=>{for(var n in r)t.o(r,n)&&!t.o(e,n)&&Object.defineProperty(e,n,{enumerable:!0,get:r[n]})},t.o=(e,r)=>Object.prototype.hasOwnProperty.call(e,r),(()=>{"use strict";var e=t("./node_modules/react/index.js"),r=t("./node_modules/react-dom/index.js"),n=t("./node_modules/connected-react-router/lib/index.js"),o=t("./node_modules/react-router/index.js"),d=t("./node_modules/@lastui/rocker/platform/index.js");function a(e,r,t,n,o,d,a){try{var s=e[d](a),u=s.value}catch(e){return void t(e)}s.done?r(u):Promise.resolve(u).then(n,o)}function s(e){return function(){var r=this,t=arguments;return new Promise((function(n,o){var d=e.apply(r,t);function s(e){a(d,n,o,s,u,"next",e)}function u(e){a(d,n,o,s,u,"throw",e)}s(void 0)}))}}function u(e,r){(null==r||r>e.length)&&(r=e.length);for(var t=0,n=new Array(r);t<r;t++)n[t]=e[t];return n}function c(e,r){return function(e){if(Array.isArray(e))return e}(e)||function(e,r){if("undefined"!==typeof Symbol&&Symbol.iterator in Object(e)){var t=[],n=!0,o=!1,d=void 0;try{for(var a,s=e[Symbol.iterator]();!(n=(a=s.next()).done)&&(t.push(a.value),!r||t.length!==r);n=!0);}catch(e){o=!0,d=e}finally{try{n||null==s.return||s.return()}finally{if(o)throw d}}return t}}(e,r)||function(e,r){if(e){if("string"===typeof e)return u(e,r);var t=Object.prototype.toString.call(e).slice(8,-1);return"Object"===t&&e.constructor&&(t=e.constructor.name),"Map"===t||"Set"===t?Array.from(e):"Arguments"===t||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t)?u(e,r):void 0}}(e,r)||function(){throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}()}var l=t("./node_modules/@babel/runtime/regenerator/index.js"),i=t.n(l),p=t("./node_modules/react-redux/lib/index.js"),f=t("./node_modules/redux/lib/redux.js"),m=t("./node_modules/redux-saga/dist/redux-saga-core-npm-proxy.cjs.js"),x=t.n(m),y=t("./node_modules/redux-saga/dist/redux-saga-effects-npm-proxy.cjs.js"),v={entrypoint:null,ready:!1};function _(e,r,t){return r in e?Object.defineProperty(e,r,{value:t,enumerable:!0,configurable:!0,writable:!0}):e[r]=t,e}function b(e,r){var t=Object.keys(e);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(e);r&&(n=n.filter((function(r){return Object.getOwnPropertyDescriptor(e,r).enumerable}))),t.push.apply(t,n)}return t}function j(e){for(var r=1;r<arguments.length;r++){var t=null!=arguments[r]?arguments[r]:{};r%2?b(Object(t),!0).forEach((function(r){_(e,r,t[r])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(t)):b(Object(t)).forEach((function(r){Object.defineProperty(e,r,Object.getOwnPropertyDescriptor(t,r))}))}return e}var h={};var g=function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:v,r=arguments.length>1?arguments[1]:void 0;switch(r.type){case d.constants.MODULES_READY:return{entrypoint:e.entrypoint,ready:r.payload.isReady};case d.constants.SET_ENTRYPOINT_MODULE:return{entrypoint:r.payload.entrypoint,ready:e.ready};default:return e}},w=function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:h,r=arguments.length>1?arguments[1]:void 0;switch(r.type){case d.constants.ADD_SHARED:console.debug("runtime ADD shared",r.payload);var t=j({},e);return t[r.payload.name]=r.payload.data,t;case d.constants.REMOVE_SHARED:console.debug("runtime REMOVE shared",r.payload);var n=j({},e);return delete n[r.payload.name],n;default:return e}},O=function(){var e=s(i().mark((function e(){return i().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.abrupt("return",fetch("/context").then((function(e){return e.json()})));case 1:case"end":return e.stop()}}),e)})));return function(){return e.apply(this,arguments)}}(),E=i().mark(P),S=i().mark(R);function P(){return i().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,(0,y.takeLatest)(d.constants.INIT,R);case 2:case"end":return e.stop()}}),E)}function R(e){var r;return i().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,(0,y.call)(O);case 2:return r=e.sent,e.next=5,(0,y.put)(d.actions.setAvailableModules(r.available));case 5:return e.next=7,(0,y.put)(d.actions.setEntryPointModule(r.entrypoint));case 7:case"end":return e.stop()}}),S)}const D=[P],M=s(i().mark((function e(){var r,t,o,a,s,u;return i().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return r=(0,d.createModuleLoader)(),t=x()(),o=[t,(0,n.routerMiddleware)(d.history),(0,d.moduleLoaderMiddleware)(r)],window.__GROOPIE_EXTENSION__&&o.unshift(window.__GROOPIE_EXTENSION__),a=f.compose,s=(0,f.combineReducers)({runtime:g,shared:w,router:(0,n.connectRouter)(d.history),modules:r.getReducer()}),u=(0,f.createStore)(s,{},a.apply(void 0,[f.applyMiddleware.apply(void 0,o)])),r.setSagaRunner(t.run),r.setStore(u),t.run(i().mark((function e(){return i().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,(0,y.all)(D.map(y.fork));case 2:case"end":return e.stop()}}),e)}))),e.abrupt("return",[u,r]);case 11:case"end":return e.stop()}}),e)})));const k=function(r){var t=c(e.useState(),2),n=(t[0],t[1]),o=c(e.useState({store:void 0,moduleLoader:void 0,isReady:!1}),2),a=o[0],u=o[1],l=function(){var e=s(i().mark((function e(){var r,t,o,d;return i().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.prev=0,e.next=3,M();case 3:r=e.sent,t=c(r,2),o=t[0],d=t[1],u({store:o,moduleLoader:d,isReady:!0}),e.next=13;break;case 10:e.prev=10,e.t0=e.catch(0),n((function(){throw e.t0}));case 13:case"end":return e.stop()}}),e,null,[[0,10]])})));return function(){return e.apply(this,arguments)}}();return e.useEffect((function(){l()}),[]),a.isReady?e.createElement(d.ModuleContext.Provider,{value:a.moduleLoader},e.createElement(p.Provider,{store:a.store},r.children)):null};var A=function(e){return e.runtime.entrypoint};const I=function(){var r=(0,p.useDispatch)();(0,e.useEffect)((function(){r(d.actions.init())}),[]);var t=(0,p.useSelector)(A);return e.createElement(d.Module,{name:t})};const L=function(){return e.createElement(k,null,e.createElement(n.ConnectedRouter,{history:d.history},e.createElement(o.Switch,null,e.createElement(o.Route,{component:I}))))};window.addEventListener("load",(function(t){r.render(e.createElement(L,null),document.getElementById("mount"))}))})()})();