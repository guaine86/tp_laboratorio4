(()=>{"use strict";var e={63:(e,t,n)=>{n.d(t,{A:()=>s});var r=n(601),o=n.n(r),a=n(314),i=n.n(a)()(o());i.push([e.id,"// extracted by mini-css-extract-plugin\nexport {};",""]);const s=i},962:(e,t,n)=>{n.d(t,{A:()=>s});var r=n(601),o=n.n(r),a=n(314),i=n.n(a)()(o());i.push([e.id,"// extracted by mini-css-extract-plugin\nexport {};",""]);const s=i},314:e=>{e.exports=function(e){var t=[];return t.toString=function(){return this.map((function(t){var n="",r=void 0!==t[5];return t[4]&&(n+="@supports (".concat(t[4],") {")),t[2]&&(n+="@media ".concat(t[2]," {")),r&&(n+="@layer".concat(t[5].length>0?" ".concat(t[5]):""," {")),n+=e(t),r&&(n+="}"),t[2]&&(n+="}"),t[4]&&(n+="}"),n})).join("")},t.i=function(e,n,r,o,a){"string"==typeof e&&(e=[[null,e,void 0]]);var i={};if(r)for(var s=0;s<this.length;s++){var c=this[s][0];null!=c&&(i[c]=!0)}for(var u=0;u<e.length;u++){var l=[].concat(e[u]);r&&i[l[0]]||(void 0!==a&&(void 0===l[5]||(l[1]="@layer".concat(l[5].length>0?" ".concat(l[5]):""," {").concat(l[1],"}")),l[5]=a),n&&(l[2]?(l[1]="@media ".concat(l[2]," {").concat(l[1],"}"),l[2]=n):l[2]=n),o&&(l[4]?(l[1]="@supports (".concat(l[4],") {").concat(l[1],"}"),l[4]=o):l[4]="".concat(o)),t.push(l))}},t}},601:e=>{e.exports=function(e){return e[1]}},72:e=>{var t=[];function n(e){for(var n=-1,r=0;r<t.length;r++)if(t[r].identifier===e){n=r;break}return n}function r(e,r){for(var a={},i=[],s=0;s<e.length;s++){var c=e[s],u=r.base?c[0]+r.base:c[0],l=a[u]||0,p="".concat(u," ").concat(l);a[u]=l+1;var d=n(p),f={css:c[1],media:c[2],sourceMap:c[3],supports:c[4],layer:c[5]};if(-1!==d)t[d].references++,t[d].updater(f);else{var m=o(f,r);r.byIndex=s,t.splice(s,0,{identifier:p,updater:m,references:1})}i.push(p)}return i}function o(e,t){var n=t.domAPI(t);return n.update(e),function(t){if(t){if(t.css===e.css&&t.media===e.media&&t.sourceMap===e.sourceMap&&t.supports===e.supports&&t.layer===e.layer)return;n.update(e=t)}else n.remove()}}e.exports=function(e,o){var a=r(e=e||[],o=o||{});return function(e){e=e||[];for(var i=0;i<a.length;i++){var s=n(a[i]);t[s].references--}for(var c=r(e,o),u=0;u<a.length;u++){var l=n(a[u]);0===t[l].references&&(t[l].updater(),t.splice(l,1))}a=c}}},659:e=>{var t={};e.exports=function(e,n){var r=function(e){if(void 0===t[e]){var n=document.querySelector(e);if(window.HTMLIFrameElement&&n instanceof window.HTMLIFrameElement)try{n=n.contentDocument.head}catch(e){n=null}t[e]=n}return t[e]}(e);if(!r)throw new Error("Couldn't find a style target. This probably means that the value for the 'insert' parameter is invalid.");r.appendChild(n)}},540:e=>{e.exports=function(e){var t=document.createElement("style");return e.setAttributes(t,e.attributes),e.insert(t,e.options),t}},56:(e,t,n)=>{e.exports=function(e){var t=n.nc;t&&e.setAttribute("nonce",t)}},825:e=>{e.exports=function(e){if("undefined"==typeof document)return{update:function(){},remove:function(){}};var t=e.insertStyleElement(e);return{update:function(n){!function(e,t,n){var r="";n.supports&&(r+="@supports (".concat(n.supports,") {")),n.media&&(r+="@media ".concat(n.media," {"));var o=void 0!==n.layer;o&&(r+="@layer".concat(n.layer.length>0?" ".concat(n.layer):""," {")),r+=n.css,o&&(r+="}"),n.media&&(r+="}"),n.supports&&(r+="}");var a=n.sourceMap;a&&"undefined"!=typeof btoa&&(r+="\n/*# sourceMappingURL=data:application/json;base64,".concat(btoa(unescape(encodeURIComponent(JSON.stringify(a))))," */")),t.styleTagTransform(r,e,t.options)}(t,e,n)},remove:function(){!function(e){if(null===e.parentNode)return!1;e.parentNode.removeChild(e)}(t)}}}},113:e=>{e.exports=function(e,t){if(t.styleSheet)t.styleSheet.cssText=e;else{for(;t.firstChild;)t.removeChild(t.firstChild);t.appendChild(document.createTextNode(e))}}}},t={};function n(r){var o=t[r];if(void 0!==o)return o.exports;var a=t[r]={id:r,exports:{}};return e[r](a,a.exports,n),a.exports}n.n=e=>{var t=e&&e.__esModule?()=>e.default:()=>e;return n.d(t,{a:t}),t},n.d=(e,t)=>{for(var r in t)n.o(t,r)&&!n.o(e,r)&&Object.defineProperty(e,r,{enumerable:!0,get:t[r]})},n.o=(e,t)=>Object.prototype.hasOwnProperty.call(e,t),n.nc=void 0;var r=n(72),o=n.n(r),a=n(825),i=n.n(a),s=n(659),c=n.n(s),u=n(56),l=n.n(u),p=n(540),d=n.n(p),f=n(113),m=n.n(f),v=n(63),y={};y.styleTagTransform=m(),y.setAttributes=l(),y.insert=c().bind(null,"head"),y.domAPI=i(),y.insertStyleElement=d(),o()(v.A,y),v.A&&v.A.locals&&v.A.locals;var h=n(962),b={};function g(e){return g="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e},g(e)}function x(e,t){for(var n,r=0;r<t.length;r++)(n=t[r]).enumerable=n.enumerable||!1,n.configurable=!0,"value"in n&&(n.writable=!0),Object.defineProperty(e,S(n.key),n)}function S(e){var t=function(e){if("object"!=g(e)||!e)return e;var t=e[Symbol.toPrimitive];if(void 0!==t){var n=t.call(e,"string");if("object"!=g(n))return n;throw new TypeError("@@toPrimitive must return a primitive value.")}return String(e)}(e);return"symbol"==g(t)?t:t+""}b.styleTagTransform=m(),b.setAttributes=l(),b.insert=c().bind(null,"head"),b.domAPI=i(),b.insertStyleElement=d(),o()(h.A,b),h.A&&h.A.locals&&h.A.locals;var E=function(){return e=function e(t,n){(function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")})(this,e),this.campo=t,this.valor=n,this.patron=this.asignaPatron(),this.mensaje},t=[{key:"asignaPatron",value:function(){return"nombre"===this.campo||"apellido"===this.campo?(this.patron=new RegExp(/^[a-zA-Z\s]*$/),this.mensaje="Este campo solo admite caracteres alfabeticos!!"):"dni"===this.campo?(this.patron=new RegExp(/^[0-9]*$/),this.mensaje="Solo se admiten numeros para ingresar DNI!!"):"telefono"===this.campo&&(this.patron=new RegExp(/^\d*[-|\s]*\d*[-|\s]*\d*$/),this.mensaje="Ingrese telefono con el siguiente fomato 11 5555-6666"),void this.valida()}},{key:"valida",value:function(){var e=this;this.patron.test(this.valor)||setTimeout((function(){alert(e.mensaje)}),30)}}],t&&x(e.prototype,t),Object.defineProperty(e,"prototype",{writable:!1}),e;var e,t}(),A=document.querySelector("#nombre"),w=document.querySelector("#apellido"),T=document.querySelector("#dni"),j=document.querySelector("#telefono"),C=document.querySelector("#domicilio");function P(e){new E(e.target.id,e.target.value),I(e)}function I(e){var t=e.target;t.validity.tooShort?t.setCustomValidity("El campo ".concat(e.target.id.toUpperCase()," requiere ").concat(e.target.minLength," caracteres como minimo")):t.setCustomValidity(""),t.reportValidity()}A.addEventListener("input",P),w.addEventListener("input",P),T.addEventListener("input",P),j.addEventListener("input",P),C.addEventListener("input",I)})();