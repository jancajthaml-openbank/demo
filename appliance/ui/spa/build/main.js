/*! License information can be found in LICENSE.txt */
(()=>{var e={"./node_modules/object-assign/index.js":e=>{"use strict";var r=Object.getOwnPropertySymbols,n=Object.prototype.hasOwnProperty,t=Object.prototype.propertyIsEnumerable;function o(e){if(null===e||void 0===e)throw new TypeError("Object.assign cannot be called with null or undefined");return Object(e)}e.exports=function(){try{if(!Object.assign)return!1;var e=new String("abc");if(e[5]="de","5"===Object.getOwnPropertyNames(e)[0])return!1;for(var r={},n=0;n<10;n++)r["_"+String.fromCharCode(n)]=n;if("0123456789"!==Object.getOwnPropertyNames(r).map((function(e){return r[e]})).join(""))return!1;var t={};return"abcdefghijklmnopqrst".split("").forEach((function(e){t[e]=e})),"abcdefghijklmnopqrst"===Object.keys(Object.assign({},t)).join("")}catch(e){return!1}}()?Object.assign:function(e,s){for(var i,d,c=o(e),u=1;u<arguments.length;u++){for(var a in i=Object(arguments[u]))n.call(i,a)&&(c[a]=i[a]);if(r){d=r(i);for(var l=0;l<d.length;l++)t.call(i,d[l])&&(c[d[l]]=i[d[l]])}}return c}},"./node_modules/react/cjs/react-jsx-runtime.production.min.js":(e,r,n)=>{"use strict";n("./node_modules/object-assign/index.js");var t=n("./node_modules/react/index.js"),o=60103;if(60107,"function"===typeof Symbol&&Symbol.for){var s=Symbol.for;o=s("react.element"),s("react.fragment")}var i=t.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED.ReactCurrentOwner,d=Object.prototype.hasOwnProperty,c={key:!0,ref:!0,__self:!0,__source:!0};function u(e,r,n){var t,s={},u=null,a=null;for(t in void 0!==n&&(u=""+n),void 0!==r.key&&(u=""+r.key),void 0!==r.ref&&(a=r.ref),r)d.call(r,t)&&!c.hasOwnProperty(t)&&(s[t]=r[t]);if(e&&e.defaultProps)for(t in r=e.defaultProps)void 0===s[t]&&(s[t]=r[t]);return{$$typeof:o,type:e,key:u,ref:a,props:s,_owner:i.current}}r.jsx=u},"./node_modules/react/jsx-runtime.js":(e,r,n)=>{"use strict";e.exports=n("./node_modules/react/cjs/react-jsx-runtime.production.min.js")},"./node_modules/@lastui/rocker/runtime/index.js":(e,r,n)=>{e.exports=n("dll-reference runtime_dll")("./node_modules/@lastui/rocker/runtime/index.js")},"./node_modules/react-dom/index.js":(e,r,n)=>{e.exports=n("dll-reference dependencies_dll")("./node_modules/react-dom/index.js")},"./node_modules/react/index.js":(e,r,n)=>{e.exports=n("dll-reference dependencies_dll")("./node_modules/react/index.js")},"dll-reference dependencies_dll":e=>{"use strict";e.exports=dependencies_dll},"dll-reference runtime_dll":e=>{"use strict";e.exports=runtime_dll}},r={};function n(t){var o=r[t];if(void 0!==o)return o.exports;var s=r[t]={exports:{}};return e[t](s,s.exports,n),s.exports}(()=>{"use strict";n("./node_modules/react/index.js");var e=n("./node_modules/react-dom/index.js"),r=n("./node_modules/@lastui/rocker/runtime/index.js");function t(e,r,n,t,o,s,i){try{var d=e[s](i),c=d.value}catch(e){return void n(e)}d.done?r(c):Promise.resolve(c).then(t,o)}var o=function(){var e,r=(e=regeneratorRuntime.mark((function e(){return regeneratorRuntime.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.abrupt("return",fetch("/manifest.json").then((function(e){return e.json()})));case 1:case"end":return e.stop()}}),e)})),function(){var r=this,n=arguments;return new Promise((function(o,s){var i=e.apply(r,n);function d(e){t(i,o,s,d,c,"next",e)}function c(e){t(i,o,s,d,c,"throw",e)}d(void 0)}))});return function(){return r.apply(this,arguments)}}(),s=n("./node_modules/react/jsx-runtime.js");window.addEventListener("load",(function(n){var t=(0,s.jsx)(r.Main,{fetchContext:o});e.render(t,document.getElementById("mount"))}))})()})();