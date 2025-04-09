exports.id = "component---src-pages-portfolio-tsx";
exports.ids = ["component---src-pages-portfolio-tsx"];
exports.modules = {

/***/ "./node_modules/recharts/es6/index.js":
/*!********************************************!*\
  !*** ./node_modules/recharts/es6/index.js ***!
  \********************************************/
/***/ (() => {



/***/ }),

/***/ "./node_modules/sonner/dist/index.mjs":
/*!********************************************!*\
  !*** ./node_modules/sonner/dist/index.mjs ***!
  \********************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   Toaster: () => (/* binding */ Te),
/* harmony export */   toast: () => (/* binding */ Jt),
/* harmony export */   useSonner: () => (/* binding */ we)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react_dom__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react-dom */ "./node_modules/react-dom/index.js");
"use client";var Ct=s=>{switch(s){case"success":return $t;case"info":return _t;case"warning":return Wt;case"error":return Ut;default:return null}},Ft=Array(12).fill(0),It=({visible:s})=>react__WEBPACK_IMPORTED_MODULE_0__.createElement("div",{className:"sonner-loading-wrapper","data-visible":s},react__WEBPACK_IMPORTED_MODULE_0__.createElement("div",{className:"sonner-spinner"},Ft.map((o,t)=>react__WEBPACK_IMPORTED_MODULE_0__.createElement("div",{className:"sonner-loading-bar",key:`spinner-bar-${t}`})))),$t=react__WEBPACK_IMPORTED_MODULE_0__.createElement("svg",{xmlns:"http://www.w3.org/2000/svg",viewBox:"0 0 20 20",fill:"currentColor",height:"20",width:"20"},react__WEBPACK_IMPORTED_MODULE_0__.createElement("path",{fillRule:"evenodd",d:"M10 18a8 8 0 100-16 8 8 0 000 16zm3.857-9.809a.75.75 0 00-1.214-.882l-3.483 4.79-1.88-1.88a.75.75 0 10-1.06 1.061l2.5 2.5a.75.75 0 001.137-.089l4-5.5z",clipRule:"evenodd"})),Wt=react__WEBPACK_IMPORTED_MODULE_0__.createElement("svg",{xmlns:"http://www.w3.org/2000/svg",viewBox:"0 0 24 24",fill:"currentColor",height:"20",width:"20"},react__WEBPACK_IMPORTED_MODULE_0__.createElement("path",{fillRule:"evenodd",d:"M9.401 3.003c1.155-2 4.043-2 5.197 0l7.355 12.748c1.154 2-.29 4.5-2.599 4.5H4.645c-2.309 0-3.752-2.5-2.598-4.5L9.4 3.003zM12 8.25a.75.75 0 01.75.75v3.75a.75.75 0 01-1.5 0V9a.75.75 0 01.75-.75zm0 8.25a.75.75 0 100-1.5.75.75 0 000 1.5z",clipRule:"evenodd"})),_t=react__WEBPACK_IMPORTED_MODULE_0__.createElement("svg",{xmlns:"http://www.w3.org/2000/svg",viewBox:"0 0 20 20",fill:"currentColor",height:"20",width:"20"},react__WEBPACK_IMPORTED_MODULE_0__.createElement("path",{fillRule:"evenodd",d:"M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a.75.75 0 000 1.5h.253a.25.25 0 01.244.304l-.459 2.066A1.75 1.75 0 0010.747 15H11a.75.75 0 000-1.5h-.253a.25.25 0 01-.244-.304l.459-2.066A1.75 1.75 0 009.253 9H9z",clipRule:"evenodd"})),Ut=react__WEBPACK_IMPORTED_MODULE_0__.createElement("svg",{xmlns:"http://www.w3.org/2000/svg",viewBox:"0 0 20 20",fill:"currentColor",height:"20",width:"20"},react__WEBPACK_IMPORTED_MODULE_0__.createElement("path",{fillRule:"evenodd",d:"M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-8-5a.75.75 0 01.75.75v4.5a.75.75 0 01-1.5 0v-4.5A.75.75 0 0110 5zm0 10a1 1 0 100-2 1 1 0 000 2z",clipRule:"evenodd"}));var Dt=()=>{let[s,o]=react__WEBPACK_IMPORTED_MODULE_0__.useState(document.hidden);return react__WEBPACK_IMPORTED_MODULE_0__.useEffect(()=>{let t=()=>{o(document.hidden)};return document.addEventListener("visibilitychange",t),()=>window.removeEventListener("visibilitychange",t)},[]),s};var ct=1,ut=class{constructor(){this.subscribe=o=>(this.subscribers.push(o),()=>{let t=this.subscribers.indexOf(o);this.subscribers.splice(t,1)});this.publish=o=>{this.subscribers.forEach(t=>t(o))};this.addToast=o=>{this.publish(o),this.toasts=[...this.toasts,o]};this.create=o=>{var b;let{message:t,...n}=o,h=typeof(o==null?void 0:o.id)=="number"||((b=o.id)==null?void 0:b.length)>0?o.id:ct++,u=this.toasts.find(d=>d.id===h),g=o.dismissible===void 0?!0:o.dismissible;return u?this.toasts=this.toasts.map(d=>d.id===h?(this.publish({...d,...o,id:h,title:t}),{...d,...o,id:h,dismissible:g,title:t}):d):this.addToast({title:t,...n,dismissible:g,id:h}),h};this.dismiss=o=>(o||this.toasts.forEach(t=>{this.subscribers.forEach(n=>n({id:t.id,dismiss:!0}))}),this.subscribers.forEach(t=>t({id:o,dismiss:!0})),o);this.message=(o,t)=>this.create({...t,message:o});this.error=(o,t)=>this.create({...t,message:o,type:"error"});this.success=(o,t)=>this.create({...t,type:"success",message:o});this.info=(o,t)=>this.create({...t,type:"info",message:o});this.warning=(o,t)=>this.create({...t,type:"warning",message:o});this.loading=(o,t)=>this.create({...t,type:"loading",message:o});this.promise=(o,t)=>{if(!t)return;let n;t.loading!==void 0&&(n=this.create({...t,promise:o,type:"loading",message:t.loading,description:typeof t.description!="function"?t.description:void 0}));let h=o instanceof Promise?o:o(),u=n!==void 0;return h.then(async g=>{if(Ot(g)&&!g.ok){u=!1;let b=typeof t.error=="function"?await t.error(`HTTP error! status: ${g.status}`):t.error,d=typeof t.description=="function"?await t.description(`HTTP error! status: ${g.status}`):t.description;this.create({id:n,type:"error",message:b,description:d})}else if(t.success!==void 0){u=!1;let b=typeof t.success=="function"?await t.success(g):t.success,d=typeof t.description=="function"?await t.description(g):t.description;this.create({id:n,type:"success",message:b,description:d})}}).catch(async g=>{if(t.error!==void 0){u=!1;let b=typeof t.error=="function"?await t.error(g):t.error,d=typeof t.description=="function"?await t.description(g):t.description;this.create({id:n,type:"error",message:b,description:d})}}).finally(()=>{var g;u&&(this.dismiss(n),n=void 0),(g=t.finally)==null||g.call(t)}),n};this.custom=(o,t)=>{let n=(t==null?void 0:t.id)||ct++;return this.create({jsx:o(n),id:n,...t}),n};this.subscribers=[],this.toasts=[]}},v=new ut,Vt=(s,o)=>{let t=(o==null?void 0:o.id)||ct++;return v.addToast({title:s,...o,id:t}),t},Ot=s=>s&&typeof s=="object"&&"ok"in s&&typeof s.ok=="boolean"&&"status"in s&&typeof s.status=="number",Kt=Vt,Xt=()=>v.toasts,Jt=Object.assign(Kt,{success:v.success,info:v.info,warning:v.warning,error:v.error,custom:v.custom,message:v.message,promise:v.promise,dismiss:v.dismiss,loading:v.loading},{getHistory:Xt});function ft(s,{insertAt:o}={}){if(!s||typeof document=="undefined")return;let t=document.head||document.getElementsByTagName("head")[0],n=document.createElement("style");n.type="text/css",o==="top"&&t.firstChild?t.insertBefore(n,t.firstChild):t.appendChild(n),n.styleSheet?n.styleSheet.cssText=s:n.appendChild(document.createTextNode(s))}ft(`:where(html[dir="ltr"]),:where([data-sonner-toaster][dir="ltr"]){--toast-icon-margin-start: -3px;--toast-icon-margin-end: 4px;--toast-svg-margin-start: -1px;--toast-svg-margin-end: 0px;--toast-button-margin-start: auto;--toast-button-margin-end: 0;--toast-close-button-start: 0;--toast-close-button-end: unset;--toast-close-button-transform: translate(-35%, -35%)}:where(html[dir="rtl"]),:where([data-sonner-toaster][dir="rtl"]){--toast-icon-margin-start: 4px;--toast-icon-margin-end: -3px;--toast-svg-margin-start: 0px;--toast-svg-margin-end: -1px;--toast-button-margin-start: 0;--toast-button-margin-end: auto;--toast-close-button-start: unset;--toast-close-button-end: 0;--toast-close-button-transform: translate(35%, -35%)}:where([data-sonner-toaster]){position:fixed;width:var(--width);font-family:ui-sans-serif,system-ui,-apple-system,BlinkMacSystemFont,Segoe UI,Roboto,Helvetica Neue,Arial,Noto Sans,sans-serif,Apple Color Emoji,Segoe UI Emoji,Segoe UI Symbol,Noto Color Emoji;--gray1: hsl(0, 0%, 99%);--gray2: hsl(0, 0%, 97.3%);--gray3: hsl(0, 0%, 95.1%);--gray4: hsl(0, 0%, 93%);--gray5: hsl(0, 0%, 90.9%);--gray6: hsl(0, 0%, 88.7%);--gray7: hsl(0, 0%, 85.8%);--gray8: hsl(0, 0%, 78%);--gray9: hsl(0, 0%, 56.1%);--gray10: hsl(0, 0%, 52.3%);--gray11: hsl(0, 0%, 43.5%);--gray12: hsl(0, 0%, 9%);--border-radius: 8px;box-sizing:border-box;padding:0;margin:0;list-style:none;outline:none;z-index:999999999}:where([data-sonner-toaster][data-x-position="right"]){right:max(var(--offset),env(safe-area-inset-right))}:where([data-sonner-toaster][data-x-position="left"]){left:max(var(--offset),env(safe-area-inset-left))}:where([data-sonner-toaster][data-x-position="center"]){left:50%;transform:translate(-50%)}:where([data-sonner-toaster][data-y-position="top"]){top:max(var(--offset),env(safe-area-inset-top))}:where([data-sonner-toaster][data-y-position="bottom"]){bottom:max(var(--offset),env(safe-area-inset-bottom))}:where([data-sonner-toast]){--y: translateY(100%);--lift-amount: calc(var(--lift) * var(--gap));z-index:var(--z-index);position:absolute;opacity:0;transform:var(--y);filter:blur(0);touch-action:none;transition:transform .4s,opacity .4s,height .4s,box-shadow .2s;box-sizing:border-box;outline:none;overflow-wrap:anywhere}:where([data-sonner-toast][data-styled="true"]){padding:16px;background:var(--normal-bg);border:1px solid var(--normal-border);color:var(--normal-text);border-radius:var(--border-radius);box-shadow:0 4px 12px #0000001a;width:var(--width);font-size:13px;display:flex;align-items:center;gap:6px}:where([data-sonner-toast]:focus-visible){box-shadow:0 4px 12px #0000001a,0 0 0 2px #0003}:where([data-sonner-toast][data-y-position="top"]){top:0;--y: translateY(-100%);--lift: 1;--lift-amount: calc(1 * var(--gap))}:where([data-sonner-toast][data-y-position="bottom"]){bottom:0;--y: translateY(100%);--lift: -1;--lift-amount: calc(var(--lift) * var(--gap))}:where([data-sonner-toast]) :where([data-description]){font-weight:400;line-height:1.4;color:inherit}:where([data-sonner-toast]) :where([data-title]){font-weight:500;line-height:1.5;color:inherit}:where([data-sonner-toast]) :where([data-icon]){display:flex;height:16px;width:16px;position:relative;justify-content:flex-start;align-items:center;flex-shrink:0;margin-left:var(--toast-icon-margin-start);margin-right:var(--toast-icon-margin-end)}:where([data-sonner-toast][data-promise="true"]) :where([data-icon])>svg{opacity:0;transform:scale(.8);transform-origin:center;animation:sonner-fade-in .3s ease forwards}:where([data-sonner-toast]) :where([data-icon])>*{flex-shrink:0}:where([data-sonner-toast]) :where([data-icon]) svg{margin-left:var(--toast-svg-margin-start);margin-right:var(--toast-svg-margin-end)}:where([data-sonner-toast]) :where([data-content]){display:flex;flex-direction:column;gap:2px}[data-sonner-toast][data-styled=true] [data-button]{border-radius:4px;padding-left:8px;padding-right:8px;height:24px;font-size:12px;color:var(--normal-bg);background:var(--normal-text);margin-left:var(--toast-button-margin-start);margin-right:var(--toast-button-margin-end);border:none;cursor:pointer;outline:none;display:flex;align-items:center;flex-shrink:0;transition:opacity .4s,box-shadow .2s}:where([data-sonner-toast]) :where([data-button]):focus-visible{box-shadow:0 0 0 2px #0006}:where([data-sonner-toast]) :where([data-button]):first-of-type{margin-left:var(--toast-button-margin-start);margin-right:var(--toast-button-margin-end)}:where([data-sonner-toast]) :where([data-cancel]){color:var(--normal-text);background:rgba(0,0,0,.08)}:where([data-sonner-toast][data-theme="dark"]) :where([data-cancel]){background:rgba(255,255,255,.3)}:where([data-sonner-toast]) :where([data-close-button]){position:absolute;left:var(--toast-close-button-start);right:var(--toast-close-button-end);top:0;height:20px;width:20px;display:flex;justify-content:center;align-items:center;padding:0;background:var(--gray1);color:var(--gray12);border:1px solid var(--gray4);transform:var(--toast-close-button-transform);border-radius:50%;cursor:pointer;z-index:1;transition:opacity .1s,background .2s,border-color .2s}:where([data-sonner-toast]) :where([data-close-button]):focus-visible{box-shadow:0 4px 12px #0000001a,0 0 0 2px #0003}:where([data-sonner-toast]) :where([data-disabled="true"]){cursor:not-allowed}:where([data-sonner-toast]):hover :where([data-close-button]):hover{background:var(--gray2);border-color:var(--gray5)}:where([data-sonner-toast][data-swiping="true"]):before{content:"";position:absolute;left:0;right:0;height:100%;z-index:-1}:where([data-sonner-toast][data-y-position="top"][data-swiping="true"]):before{bottom:50%;transform:scaleY(3) translateY(50%)}:where([data-sonner-toast][data-y-position="bottom"][data-swiping="true"]):before{top:50%;transform:scaleY(3) translateY(-50%)}:where([data-sonner-toast][data-swiping="false"][data-removed="true"]):before{content:"";position:absolute;inset:0;transform:scaleY(2)}:where([data-sonner-toast]):after{content:"";position:absolute;left:0;height:calc(var(--gap) + 1px);bottom:100%;width:100%}:where([data-sonner-toast][data-mounted="true"]){--y: translateY(0);opacity:1}:where([data-sonner-toast][data-expanded="false"][data-front="false"]){--scale: var(--toasts-before) * .05 + 1;--y: translateY(calc(var(--lift-amount) * var(--toasts-before))) scale(calc(-1 * var(--scale)));height:var(--front-toast-height)}:where([data-sonner-toast])>*{transition:opacity .4s}:where([data-sonner-toast][data-expanded="false"][data-front="false"][data-styled="true"])>*{opacity:0}:where([data-sonner-toast][data-visible="false"]){opacity:0;pointer-events:none}:where([data-sonner-toast][data-mounted="true"][data-expanded="true"]){--y: translateY(calc(var(--lift) * var(--offset)));height:var(--initial-height)}:where([data-sonner-toast][data-removed="true"][data-front="true"][data-swipe-out="false"]){--y: translateY(calc(var(--lift) * -100%));opacity:0}:where([data-sonner-toast][data-removed="true"][data-front="false"][data-swipe-out="false"][data-expanded="true"]){--y: translateY(calc(var(--lift) * var(--offset) + var(--lift) * -100%));opacity:0}:where([data-sonner-toast][data-removed="true"][data-front="false"][data-swipe-out="false"][data-expanded="false"]){--y: translateY(40%);opacity:0;transition:transform .5s,opacity .2s}:where([data-sonner-toast][data-removed="true"][data-front="false"]):before{height:calc(var(--initial-height) + 20%)}[data-sonner-toast][data-swiping=true]{transform:var(--y) translateY(var(--swipe-amount, 0px));transition:none}[data-sonner-toast][data-swipe-out=true][data-y-position=bottom],[data-sonner-toast][data-swipe-out=true][data-y-position=top]{animation:swipe-out .2s ease-out forwards}@keyframes swipe-out{0%{transform:translateY(calc(var(--lift) * var(--offset) + var(--swipe-amount)));opacity:1}to{transform:translateY(calc(var(--lift) * var(--offset) + var(--swipe-amount) + var(--lift) * -100%));opacity:0}}@media (max-width: 600px){[data-sonner-toaster]{position:fixed;--mobile-offset: 16px;right:var(--mobile-offset);left:var(--mobile-offset);width:100%}[data-sonner-toaster] [data-sonner-toast]{left:0;right:0;width:calc(100% - var(--mobile-offset) * 2)}[data-sonner-toaster][data-x-position=left]{left:var(--mobile-offset)}[data-sonner-toaster][data-y-position=bottom]{bottom:20px}[data-sonner-toaster][data-y-position=top]{top:20px}[data-sonner-toaster][data-x-position=center]{left:var(--mobile-offset);right:var(--mobile-offset);transform:none}}[data-sonner-toaster][data-theme=light]{--normal-bg: #fff;--normal-border: var(--gray4);--normal-text: var(--gray12);--success-bg: hsl(143, 85%, 96%);--success-border: hsl(145, 92%, 91%);--success-text: hsl(140, 100%, 27%);--info-bg: hsl(208, 100%, 97%);--info-border: hsl(221, 91%, 91%);--info-text: hsl(210, 92%, 45%);--warning-bg: hsl(49, 100%, 97%);--warning-border: hsl(49, 91%, 91%);--warning-text: hsl(31, 92%, 45%);--error-bg: hsl(359, 100%, 97%);--error-border: hsl(359, 100%, 94%);--error-text: hsl(360, 100%, 45%)}[data-sonner-toaster][data-theme=light] [data-sonner-toast][data-invert=true]{--normal-bg: #000;--normal-border: hsl(0, 0%, 20%);--normal-text: var(--gray1)}[data-sonner-toaster][data-theme=dark] [data-sonner-toast][data-invert=true]{--normal-bg: #fff;--normal-border: var(--gray3);--normal-text: var(--gray12)}[data-sonner-toaster][data-theme=dark]{--normal-bg: #000;--normal-border: hsl(0, 0%, 20%);--normal-text: var(--gray1);--success-bg: hsl(150, 100%, 6%);--success-border: hsl(147, 100%, 12%);--success-text: hsl(150, 86%, 65%);--info-bg: hsl(215, 100%, 6%);--info-border: hsl(223, 100%, 12%);--info-text: hsl(216, 87%, 65%);--warning-bg: hsl(64, 100%, 6%);--warning-border: hsl(60, 100%, 12%);--warning-text: hsl(46, 87%, 65%);--error-bg: hsl(358, 76%, 10%);--error-border: hsl(357, 89%, 16%);--error-text: hsl(358, 100%, 81%)}[data-rich-colors=true][data-sonner-toast][data-type=success],[data-rich-colors=true][data-sonner-toast][data-type=success] [data-close-button]{background:var(--success-bg);border-color:var(--success-border);color:var(--success-text)}[data-rich-colors=true][data-sonner-toast][data-type=info],[data-rich-colors=true][data-sonner-toast][data-type=info] [data-close-button]{background:var(--info-bg);border-color:var(--info-border);color:var(--info-text)}[data-rich-colors=true][data-sonner-toast][data-type=warning],[data-rich-colors=true][data-sonner-toast][data-type=warning] [data-close-button]{background:var(--warning-bg);border-color:var(--warning-border);color:var(--warning-text)}[data-rich-colors=true][data-sonner-toast][data-type=error],[data-rich-colors=true][data-sonner-toast][data-type=error] [data-close-button]{background:var(--error-bg);border-color:var(--error-border);color:var(--error-text)}.sonner-loading-wrapper{--size: 16px;height:var(--size);width:var(--size);position:absolute;inset:0;z-index:10}.sonner-loading-wrapper[data-visible=false]{transform-origin:center;animation:sonner-fade-out .2s ease forwards}.sonner-spinner{position:relative;top:50%;left:50%;height:var(--size);width:var(--size)}.sonner-loading-bar{animation:sonner-spin 1.2s linear infinite;background:var(--gray11);border-radius:6px;height:8%;left:-10%;position:absolute;top:-3.9%;width:24%}.sonner-loading-bar:nth-child(1){animation-delay:-1.2s;transform:rotate(.0001deg) translate(146%)}.sonner-loading-bar:nth-child(2){animation-delay:-1.1s;transform:rotate(30deg) translate(146%)}.sonner-loading-bar:nth-child(3){animation-delay:-1s;transform:rotate(60deg) translate(146%)}.sonner-loading-bar:nth-child(4){animation-delay:-.9s;transform:rotate(90deg) translate(146%)}.sonner-loading-bar:nth-child(5){animation-delay:-.8s;transform:rotate(120deg) translate(146%)}.sonner-loading-bar:nth-child(6){animation-delay:-.7s;transform:rotate(150deg) translate(146%)}.sonner-loading-bar:nth-child(7){animation-delay:-.6s;transform:rotate(180deg) translate(146%)}.sonner-loading-bar:nth-child(8){animation-delay:-.5s;transform:rotate(210deg) translate(146%)}.sonner-loading-bar:nth-child(9){animation-delay:-.4s;transform:rotate(240deg) translate(146%)}.sonner-loading-bar:nth-child(10){animation-delay:-.3s;transform:rotate(270deg) translate(146%)}.sonner-loading-bar:nth-child(11){animation-delay:-.2s;transform:rotate(300deg) translate(146%)}.sonner-loading-bar:nth-child(12){animation-delay:-.1s;transform:rotate(330deg) translate(146%)}@keyframes sonner-fade-in{0%{opacity:0;transform:scale(.8)}to{opacity:1;transform:scale(1)}}@keyframes sonner-fade-out{0%{opacity:1;transform:scale(1)}to{opacity:0;transform:scale(.8)}}@keyframes sonner-spin{0%{opacity:1}to{opacity:.15}}@media (prefers-reduced-motion){[data-sonner-toast],[data-sonner-toast]>*,.sonner-loading-bar{transition:none!important;animation:none!important}}.sonner-loader{position:absolute;top:50%;left:50%;transform:translate(-50%,-50%);transform-origin:center;transition:opacity .2s,transform .2s}.sonner-loader[data-visible=false]{opacity:0;transform:scale(.8) translate(-50%,-50%)}
`);function U(s){return s.label!==void 0}var qt=3,Qt="32px",Zt=4e3,te=356,ee=14,oe=20,ae=200;function ne(...s){return s.filter(Boolean).join(" ")}var se=s=>{var yt,xt,vt,wt,Tt,St,Rt,Et,Nt,Pt;let{invert:o,toast:t,unstyled:n,interacting:h,setHeights:u,visibleToasts:g,heights:b,index:d,toasts:q,expanded:$,removeToast:V,defaultRichColors:Q,closeButton:i,style:O,cancelButtonStyle:K,actionButtonStyle:Z,className:tt="",descriptionClassName:et="",duration:X,position:ot,gap:w,loadingIcon:j,expandByDefault:W,classNames:r,icons:I,closeButtonAriaLabel:at="Close toast",pauseWhenPageIsHidden:k,cn:T}=s,[z,nt]=react__WEBPACK_IMPORTED_MODULE_0__.useState(!1),[D,H]=react__WEBPACK_IMPORTED_MODULE_0__.useState(!1),[st,N]=react__WEBPACK_IMPORTED_MODULE_0__.useState(!1),[M,rt]=react__WEBPACK_IMPORTED_MODULE_0__.useState(!1),[c,m]=react__WEBPACK_IMPORTED_MODULE_0__.useState(0),[y,S]=react__WEBPACK_IMPORTED_MODULE_0__.useState(0),A=react__WEBPACK_IMPORTED_MODULE_0__.useRef(null),l=react__WEBPACK_IMPORTED_MODULE_0__.useRef(null),_=d===0,J=d+1<=g,x=t.type,P=t.dismissible!==!1,Mt=t.className||"",At=t.descriptionClassName||"",G=react__WEBPACK_IMPORTED_MODULE_0__.useMemo(()=>b.findIndex(a=>a.toastId===t.id)||0,[b,t.id]),Lt=react__WEBPACK_IMPORTED_MODULE_0__.useMemo(()=>{var a;return(a=t.closeButton)!=null?a:i},[t.closeButton,i]),mt=react__WEBPACK_IMPORTED_MODULE_0__.useMemo(()=>t.duration||X||Zt,[t.duration,X]),it=react__WEBPACK_IMPORTED_MODULE_0__.useRef(0),Y=react__WEBPACK_IMPORTED_MODULE_0__.useRef(0),pt=react__WEBPACK_IMPORTED_MODULE_0__.useRef(0),F=react__WEBPACK_IMPORTED_MODULE_0__.useRef(null),[gt,zt]=ot.split("-"),ht=react__WEBPACK_IMPORTED_MODULE_0__.useMemo(()=>b.reduce((a,f,p)=>p>=G?a:a+f.height,0),[b,G]),bt=Dt(),jt=t.invert||o,lt=x==="loading";Y.current=react__WEBPACK_IMPORTED_MODULE_0__.useMemo(()=>G*w+ht,[G,ht]),react__WEBPACK_IMPORTED_MODULE_0__.useEffect(()=>{nt(!0)},[]),react__WEBPACK_IMPORTED_MODULE_0__.useLayoutEffect(()=>{if(!z)return;let a=l.current,f=a.style.height;a.style.height="auto";let p=a.getBoundingClientRect().height;a.style.height=f,S(p),u(B=>B.find(R=>R.toastId===t.id)?B.map(R=>R.toastId===t.id?{...R,height:p}:R):[{toastId:t.id,height:p,position:t.position},...B])},[z,t.title,t.description,u,t.id]);let L=react__WEBPACK_IMPORTED_MODULE_0__.useCallback(()=>{H(!0),m(Y.current),u(a=>a.filter(f=>f.toastId!==t.id)),setTimeout(()=>{V(t)},ae)},[t,V,u,Y]);react__WEBPACK_IMPORTED_MODULE_0__.useEffect(()=>{if(t.promise&&x==="loading"||t.duration===1/0||t.type==="loading")return;let a,f=mt;return $||h||k&&bt?(()=>{if(pt.current<it.current){let C=new Date().getTime()-it.current;f=f-C}pt.current=new Date().getTime()})():(()=>{f!==1/0&&(it.current=new Date().getTime(),a=setTimeout(()=>{var C;(C=t.onAutoClose)==null||C.call(t,t),L()},f))})(),()=>clearTimeout(a)},[$,h,W,t,mt,L,t.promise,x,k,bt]),react__WEBPACK_IMPORTED_MODULE_0__.useEffect(()=>{let a=l.current;if(a){let f=a.getBoundingClientRect().height;return S(f),u(p=>[{toastId:t.id,height:f,position:t.position},...p]),()=>u(p=>p.filter(B=>B.toastId!==t.id))}},[u,t.id]),react__WEBPACK_IMPORTED_MODULE_0__.useEffect(()=>{t.delete&&L()},[L,t.delete]);function Yt(){return I!=null&&I.loading?react__WEBPACK_IMPORTED_MODULE_0__.createElement("div",{className:"sonner-loader","data-visible":x==="loading"},I.loading):j?react__WEBPACK_IMPORTED_MODULE_0__.createElement("div",{className:"sonner-loader","data-visible":x==="loading"},j):react__WEBPACK_IMPORTED_MODULE_0__.createElement(It,{visible:x==="loading"})}return react__WEBPACK_IMPORTED_MODULE_0__.createElement("li",{"aria-live":t.important?"assertive":"polite","aria-atomic":"true",role:"status",tabIndex:0,ref:l,className:T(tt,Mt,r==null?void 0:r.toast,(yt=t==null?void 0:t.classNames)==null?void 0:yt.toast,r==null?void 0:r.default,r==null?void 0:r[x],(xt=t==null?void 0:t.classNames)==null?void 0:xt[x]),"data-sonner-toast":"","data-rich-colors":(vt=t.richColors)!=null?vt:Q,"data-styled":!(t.jsx||t.unstyled||n),"data-mounted":z,"data-promise":!!t.promise,"data-removed":D,"data-visible":J,"data-y-position":gt,"data-x-position":zt,"data-index":d,"data-front":_,"data-swiping":st,"data-dismissible":P,"data-type":x,"data-invert":jt,"data-swipe-out":M,"data-expanded":!!($||W&&z),style:{"--index":d,"--toasts-before":d,"--z-index":q.length-d,"--offset":`${D?c:Y.current}px`,"--initial-height":W?"auto":`${y}px`,...O,...t.style},onPointerDown:a=>{lt||!P||(A.current=new Date,m(Y.current),a.target.setPointerCapture(a.pointerId),a.target.tagName!=="BUTTON"&&(N(!0),F.current={x:a.clientX,y:a.clientY}))},onPointerUp:()=>{var B,C,R,dt;if(M||!P)return;F.current=null;let a=Number(((B=l.current)==null?void 0:B.style.getPropertyValue("--swipe-amount").replace("px",""))||0),f=new Date().getTime()-((C=A.current)==null?void 0:C.getTime()),p=Math.abs(a)/f;if(Math.abs(a)>=oe||p>.11){m(Y.current),(R=t.onDismiss)==null||R.call(t,t),L(),rt(!0);return}(dt=l.current)==null||dt.style.setProperty("--swipe-amount","0px"),N(!1)},onPointerMove:a=>{var Bt;if(!F.current||!P)return;let f=a.clientY-F.current.y,p=a.clientX-F.current.x,C=(gt==="top"?Math.min:Math.max)(0,f),R=a.pointerType==="touch"?10:2;Math.abs(C)>R?(Bt=l.current)==null||Bt.style.setProperty("--swipe-amount",`${f}px`):Math.abs(p)>R&&(F.current=null)}},Lt&&!t.jsx?react__WEBPACK_IMPORTED_MODULE_0__.createElement("button",{"aria-label":at,"data-disabled":lt,"data-close-button":!0,onClick:lt||!P?()=>{}:()=>{var a;L(),(a=t.onDismiss)==null||a.call(t,t)},className:T(r==null?void 0:r.closeButton,(wt=t==null?void 0:t.classNames)==null?void 0:wt.closeButton)},react__WEBPACK_IMPORTED_MODULE_0__.createElement("svg",{xmlns:"http://www.w3.org/2000/svg",width:"12",height:"12",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"1.5",strokeLinecap:"round",strokeLinejoin:"round"},react__WEBPACK_IMPORTED_MODULE_0__.createElement("line",{x1:"18",y1:"6",x2:"6",y2:"18"}),react__WEBPACK_IMPORTED_MODULE_0__.createElement("line",{x1:"6",y1:"6",x2:"18",y2:"18"}))):null,t.jsx||react__WEBPACK_IMPORTED_MODULE_0__.isValidElement(t.title)?t.jsx||t.title:react__WEBPACK_IMPORTED_MODULE_0__.createElement(react__WEBPACK_IMPORTED_MODULE_0__.Fragment,null,x||t.icon||t.promise?react__WEBPACK_IMPORTED_MODULE_0__.createElement("div",{"data-icon":"",className:T(r==null?void 0:r.icon,(Tt=t==null?void 0:t.classNames)==null?void 0:Tt.icon)},t.promise||t.type==="loading"&&!t.icon?t.icon||Yt():null,t.type!=="loading"?t.icon||(I==null?void 0:I[x])||Ct(x):null):null,react__WEBPACK_IMPORTED_MODULE_0__.createElement("div",{"data-content":"",className:T(r==null?void 0:r.content,(St=t==null?void 0:t.classNames)==null?void 0:St.content)},react__WEBPACK_IMPORTED_MODULE_0__.createElement("div",{"data-title":"",className:T(r==null?void 0:r.title,(Rt=t==null?void 0:t.classNames)==null?void 0:Rt.title)},t.title),t.description?react__WEBPACK_IMPORTED_MODULE_0__.createElement("div",{"data-description":"",className:T(et,At,r==null?void 0:r.description,(Et=t==null?void 0:t.classNames)==null?void 0:Et.description)},t.description):null),react__WEBPACK_IMPORTED_MODULE_0__.isValidElement(t.cancel)?t.cancel:t.cancel&&U(t.cancel)?react__WEBPACK_IMPORTED_MODULE_0__.createElement("button",{"data-button":!0,"data-cancel":!0,style:t.cancelButtonStyle||K,onClick:a=>{var f,p;U(t.cancel)&&P&&((p=(f=t.cancel).onClick)==null||p.call(f,a),L())},className:T(r==null?void 0:r.cancelButton,(Nt=t==null?void 0:t.classNames)==null?void 0:Nt.cancelButton)},t.cancel.label):null,react__WEBPACK_IMPORTED_MODULE_0__.isValidElement(t.action)?t.action:t.action&&U(t.action)?react__WEBPACK_IMPORTED_MODULE_0__.createElement("button",{"data-button":!0,"data-action":!0,style:t.actionButtonStyle||Z,onClick:a=>{var f,p;U(t.action)&&(a.defaultPrevented||((p=(f=t.action).onClick)==null||p.call(f,a),L()))},className:T(r==null?void 0:r.actionButton,(Pt=t==null?void 0:t.classNames)==null?void 0:Pt.actionButton)},t.action.label):null))};function Ht(){if(typeof window=="undefined"||typeof document=="undefined")return"ltr";let s=document.documentElement.getAttribute("dir");return s==="auto"||!s?window.getComputedStyle(document.documentElement).direction:s}function we(){let[s,o]=react__WEBPACK_IMPORTED_MODULE_0__.useState([]);return react__WEBPACK_IMPORTED_MODULE_0__.useEffect(()=>v.subscribe(t=>{o(n=>{if("dismiss"in t&&t.dismiss)return n.filter(u=>u.id!==t.id);let h=n.findIndex(u=>u.id===t.id);if(h!==-1){let u=[...n];return u[h]={...u[h],...t},u}else return[t,...n]})}),[]),{toasts:s}}var Te=s=>{let{invert:o,position:t="bottom-right",hotkey:n=["altKey","KeyT"],expand:h,closeButton:u,className:g,offset:b,theme:d="light",richColors:q,duration:$,style:V,visibleToasts:Q=qt,toastOptions:i,dir:O=Ht(),gap:K=ee,loadingIcon:Z,icons:tt,containerAriaLabel:et="Notifications",pauseWhenPageIsHidden:X,cn:ot=ne}=s,[w,j]=react__WEBPACK_IMPORTED_MODULE_0__.useState([]),W=react__WEBPACK_IMPORTED_MODULE_0__.useMemo(()=>Array.from(new Set([t].concat(w.filter(c=>c.position).map(c=>c.position)))),[w,t]),[r,I]=react__WEBPACK_IMPORTED_MODULE_0__.useState([]),[at,k]=react__WEBPACK_IMPORTED_MODULE_0__.useState(!1),[T,z]=react__WEBPACK_IMPORTED_MODULE_0__.useState(!1),[nt,D]=react__WEBPACK_IMPORTED_MODULE_0__.useState(d!=="system"?d:typeof window!="undefined"&&window.matchMedia&&window.matchMedia("(prefers-color-scheme: dark)").matches?"dark":"light"),H=react__WEBPACK_IMPORTED_MODULE_0__.useRef(null),st=n.join("+").replace(/Key/g,"").replace(/Digit/g,""),N=react__WEBPACK_IMPORTED_MODULE_0__.useRef(null),M=react__WEBPACK_IMPORTED_MODULE_0__.useRef(!1),rt=react__WEBPACK_IMPORTED_MODULE_0__.useCallback(c=>{var m;(m=w.find(y=>y.id===c.id))!=null&&m.delete||v.dismiss(c.id),j(y=>y.filter(({id:S})=>S!==c.id))},[w]);return react__WEBPACK_IMPORTED_MODULE_0__.useEffect(()=>v.subscribe(c=>{if(c.dismiss){j(m=>m.map(y=>y.id===c.id?{...y,delete:!0}:y));return}setTimeout(()=>{react_dom__WEBPACK_IMPORTED_MODULE_1__.flushSync(()=>{j(m=>{let y=m.findIndex(S=>S.id===c.id);return y!==-1?[...m.slice(0,y),{...m[y],...c},...m.slice(y+1)]:[c,...m]})})})}),[]),react__WEBPACK_IMPORTED_MODULE_0__.useEffect(()=>{if(d!=="system"){D(d);return}d==="system"&&(window.matchMedia&&window.matchMedia("(prefers-color-scheme: dark)").matches?D("dark"):D("light")),typeof window!="undefined"&&window.matchMedia("(prefers-color-scheme: dark)").addEventListener("change",({matches:c})=>{D(c?"dark":"light")})},[d]),react__WEBPACK_IMPORTED_MODULE_0__.useEffect(()=>{w.length<=1&&k(!1)},[w]),react__WEBPACK_IMPORTED_MODULE_0__.useEffect(()=>{let c=m=>{var S,A;n.every(l=>m[l]||m.code===l)&&(k(!0),(S=H.current)==null||S.focus()),m.code==="Escape"&&(document.activeElement===H.current||(A=H.current)!=null&&A.contains(document.activeElement))&&k(!1)};return document.addEventListener("keydown",c),()=>document.removeEventListener("keydown",c)},[n]),react__WEBPACK_IMPORTED_MODULE_0__.useEffect(()=>{if(H.current)return()=>{N.current&&(N.current.focus({preventScroll:!0}),N.current=null,M.current=!1)}},[H.current]),w.length?react__WEBPACK_IMPORTED_MODULE_0__.createElement("section",{"aria-label":`${et} ${st}`,tabIndex:-1},W.map((c,m)=>{var A;let[y,S]=c.split("-");return react__WEBPACK_IMPORTED_MODULE_0__.createElement("ol",{key:c,dir:O==="auto"?Ht():O,tabIndex:-1,ref:H,className:g,"data-sonner-toaster":!0,"data-theme":nt,"data-y-position":y,"data-x-position":S,style:{"--front-toast-height":`${((A=r[0])==null?void 0:A.height)||0}px`,"--offset":typeof b=="number"?`${b}px`:b||Qt,"--width":`${te}px`,"--gap":`${K}px`,...V},onBlur:l=>{M.current&&!l.currentTarget.contains(l.relatedTarget)&&(M.current=!1,N.current&&(N.current.focus({preventScroll:!0}),N.current=null))},onFocus:l=>{l.target instanceof HTMLElement&&l.target.dataset.dismissible==="false"||M.current||(M.current=!0,N.current=l.relatedTarget)},onMouseEnter:()=>k(!0),onMouseMove:()=>k(!0),onMouseLeave:()=>{T||k(!1)},onPointerDown:l=>{l.target instanceof HTMLElement&&l.target.dataset.dismissible==="false"||z(!0)},onPointerUp:()=>z(!1)},w.filter(l=>!l.position&&m===0||l.position===c).map((l,_)=>{var J,x;return react__WEBPACK_IMPORTED_MODULE_0__.createElement(se,{key:l.id,icons:tt,index:_,toast:l,defaultRichColors:q,duration:(J=i==null?void 0:i.duration)!=null?J:$,className:i==null?void 0:i.className,descriptionClassName:i==null?void 0:i.descriptionClassName,invert:o,visibleToasts:Q,closeButton:(x=i==null?void 0:i.closeButton)!=null?x:u,interacting:T,position:c,style:i==null?void 0:i.style,unstyled:i==null?void 0:i.unstyled,classNames:i==null?void 0:i.classNames,cancelButtonStyle:i==null?void 0:i.cancelButtonStyle,actionButtonStyle:i==null?void 0:i.actionButtonStyle,removeToast:rt,toasts:w.filter(P=>P.position==l.position),heights:r.filter(P=>P.position==l.position),setHeights:I,expandByDefault:h,gap:K,loadingIcon:Z,expanded:at,pauseWhenPageIsHidden:X,cn:ot})}))})):null};
//# sourceMappingURL=index.mjs.map

/***/ }),

/***/ "./src/components/ClientOnly.tsx":
/*!***************************************!*\
  !*** ./src/components/ClientOnly.tsx ***!
  \***************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _emotion_react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @emotion/react */ "./node_modules/@emotion/react/dist/emotion-react.development.esm.js");


/**
 * ClientOnly component - only renders its children on the client side
 * Use this to wrap components that rely on browser APIs
 */
const ClientOnly = ({
  children,
  fallback = null
}) => {
  const {
    0: hasMounted,
    1: setHasMounted
  } = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)(false);
  (0,react__WEBPACK_IMPORTED_MODULE_0__.useEffect)(() => {
    setHasMounted(true);
  }, []);
  if (!hasMounted) {
    return (0,_emotion_react__WEBPACK_IMPORTED_MODULE_1__.jsx)((react__WEBPACK_IMPORTED_MODULE_0___default().Fragment), null, fallback);
  }
  return (0,_emotion_react__WEBPACK_IMPORTED_MODULE_1__.jsx)((react__WEBPACK_IMPORTED_MODULE_0___default().Fragment), null, children);
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (ClientOnly);

/***/ }),

/***/ "./src/components/ParticleBackground.tsx":
/*!***********************************************!*\
  !*** ./src/components/ParticleBackground.tsx ***!
  \***********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _ClientOnly__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./ClientOnly */ "./src/components/ClientOnly.tsx");
/* harmony import */ var _emotion_react__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @emotion/react */ "./node_modules/@emotion/react/dist/emotion-react.development.esm.js");



// The actual particle background implementation
const ParticleBackgroundContent = () => {
  const canvasRef = (0,react__WEBPACK_IMPORTED_MODULE_0__.useRef)(null);
  (0,react__WEBPACK_IMPORTED_MODULE_0__.useEffect)(() => {
    // Check if we're in a browser environment
    const isBrowser = typeof window !== 'undefined';
    if (!isBrowser) return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    let animationFrameId;
    let particles = [];

    // Set canvas size
    const handleResize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;

      // Reset particles when resizing
      initParticles();
    };

    // Initialize particles
    const initParticles = () => {
      particles = [];
      const particleCount = Math.min(window.innerWidth / 10, 120);
      for (let i = 0; i < particleCount; i++) {
        particles.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          size: Math.random() * 3 + 0.1,
          // Smaller particles for more subtle effect
          speedX: (Math.random() - 0.5) * 0.9,
          speedY: (Math.random() - 0.5) * 0.9,
          color: '#ffffff',
          opacity: Math.random() * 0.5 + 0.1
        });
      }
    };

    // Draw particles
    const drawParticles = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Update and draw each particle
      particles.forEach((particle, i) => {
        // Update position
        particle.x += particle.speedX;
        particle.y += particle.speedY;

        // Check boundaries and reverse direction if needed
        if (particle.x < 0 || particle.x > canvas.width) {
          particle.speedX *= -1;
        }
        if (particle.y < 0 || particle.y > canvas.height) {
          particle.speedY *= -1;
        }

        // Draw the particle
        ctx.beginPath();
        ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255, 255, 255, ${particle.opacity})`;
        ctx.fill();

        // Connect nearby particles with lines
        connectParticles(particle, i);
      });
    };

    // Connect particles with lines if they're close enough
    const connectParticles = (particle, index) => {
      for (let j = index + 1; j < particles.length; j++) {
        const otherParticle = particles[j];
        const distance = Math.sqrt(Math.pow(particle.x - otherParticle.x, 2) + Math.pow(particle.y - otherParticle.y, 2));
        if (distance < 130) {
          ctx.beginPath();
          ctx.strokeStyle = `rgba(167, 167, 167, ${0.4 * (1 - distance / 130)})`;
          ctx.lineWidth = 1;
          ctx.moveTo(particle.x, particle.y);
          ctx.lineTo(otherParticle.x, otherParticle.y);
          ctx.stroke();
        }
      }
    };

    // Animation loop
    const animate = () => {
      drawParticles();
      animationFrameId = requestAnimationFrame(animate);
    };

    // Initialize and start the animation
    handleResize();
    window.addEventListener('resize', handleResize);
    animate();

    // Cleanup
    return () => {
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);
  return (0,_emotion_react__WEBPACK_IMPORTED_MODULE_2__.jsx)("div", {
    className: "particles-container"
  }, (0,_emotion_react__WEBPACK_IMPORTED_MODULE_2__.jsx)("canvas", {
    ref: canvasRef,
    className: "absolute inset-0",
    style: {
      opacity: 0.8,
      zIndex: 1
    }
  }));
};

// Main component that uses ClientOnly to prevent SSR issues
const ParticleBackground = () => {
  return (0,_emotion_react__WEBPACK_IMPORTED_MODULE_2__.jsx)(_ClientOnly__WEBPACK_IMPORTED_MODULE_1__["default"], {
    fallback: (0,_emotion_react__WEBPACK_IMPORTED_MODULE_2__.jsx)("div", {
      className: "particles-container"
    })
  }, (0,_emotion_react__WEBPACK_IMPORTED_MODULE_2__.jsx)(ParticleBackgroundContent, null));
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (ParticleBackground);

/***/ }),

/***/ "./src/components/dashboard/ChartComponent.tsx":
/*!*****************************************************!*\
  !*** ./src/components/dashboard/ChartComponent.tsx ***!
  \*****************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var recharts__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! recharts */ "./node_modules/recharts/es6/index.js");
/* harmony import */ var recharts__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(recharts__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _emotion_react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @emotion/react */ "./node_modules/@emotion/react/dist/emotion-react.development.esm.js");


const ChartComponent = ({
  title,
  data,
  colors = ['#00A0A0', '#0F4C81', '#19598E', '#367BA3', '#5A9EB8', '#7EC1CD']
}) => {
  return (0,_emotion_react__WEBPACK_IMPORTED_MODULE_0__.jsx)("div", {
    className: "dashboard-card bg-gradient-to-br from-srv-dark to-srv-blue/90 rounded-lg shadow p-6 h-full"
  }, (0,_emotion_react__WEBPACK_IMPORTED_MODULE_0__.jsx)("h3", {
    className: "text-white font-semibold mb-4"
  }, title), (0,_emotion_react__WEBPACK_IMPORTED_MODULE_0__.jsx)("div", {
    className: "h-64"
  }, (0,_emotion_react__WEBPACK_IMPORTED_MODULE_0__.jsx)(recharts__WEBPACK_IMPORTED_MODULE_1__.ResponsiveContainer, {
    width: "100%",
    height: "100%"
  }, (0,_emotion_react__WEBPACK_IMPORTED_MODULE_0__.jsx)(recharts__WEBPACK_IMPORTED_MODULE_1__.PieChart, null, (0,_emotion_react__WEBPACK_IMPORTED_MODULE_0__.jsx)(recharts__WEBPACK_IMPORTED_MODULE_1__.Pie, {
    data: data,
    cx: "50%",
    cy: "50%",
    labelLine: false,
    outerRadius: 80,
    fill: "#8884d8",
    dataKey: "value"
  }, data.map((entry, index) => (0,_emotion_react__WEBPACK_IMPORTED_MODULE_0__.jsx)(recharts__WEBPACK_IMPORTED_MODULE_1__.Cell, {
    key: `cell-${index}`,
    fill: colors[index % colors.length]
  }))), (0,_emotion_react__WEBPACK_IMPORTED_MODULE_0__.jsx)(recharts__WEBPACK_IMPORTED_MODULE_1__.Tooltip, {
    contentStyle: {
      backgroundColor: '#0B1930',
      borderColor: '#0F4C81',
      borderRadius: '0.375rem',
      color: 'white'
    },
    formatter: value => [`${value}%`, '']
  })))), (0,_emotion_react__WEBPACK_IMPORTED_MODULE_0__.jsx)("div", {
    className: "mt-4 grid grid-cols-2 gap-2"
  }, data.map((item, index) => (0,_emotion_react__WEBPACK_IMPORTED_MODULE_0__.jsx)("div", {
    key: index,
    className: "flex items-center"
  }, (0,_emotion_react__WEBPACK_IMPORTED_MODULE_0__.jsx)("div", {
    className: "w-3 h-3 rounded-full mr-2",
    style: {
      backgroundColor: colors[index % colors.length]
    }
  }), (0,_emotion_react__WEBPACK_IMPORTED_MODULE_0__.jsx)("span", {
    className: "text-white/80 text-xs"
  }, item.name)))));
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (ChartComponent);

/***/ }),

/***/ "./src/components/dashboard/PortfolioCard.tsx":
/*!****************************************************!*\
  !*** ./src/components/dashboard/PortfolioCard.tsx ***!
  \****************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _emotion_react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @emotion/react */ "./node_modules/@emotion/react/dist/emotion-react.development.esm.js");

const PortfolioCard = ({
  company
}) => {
  if (!company.announced) {
    return (0,_emotion_react__WEBPACK_IMPORTED_MODULE_0__.jsx)("div", {
      className: "dashboard-card stealth-mode rounded-lg shadow p-6 h-full"
    }, (0,_emotion_react__WEBPACK_IMPORTED_MODULE_0__.jsx)("div", {
      className: "flex flex-col items-center justify-center h-full opacity-80"
    }, (0,_emotion_react__WEBPACK_IMPORTED_MODULE_0__.jsx)("div", {
      className: "w-16 h-16 rounded-full bg-white/10 flex items-center justify-center mb-4"
    }, (0,_emotion_react__WEBPACK_IMPORTED_MODULE_0__.jsx)("svg", {
      xmlns: "http://www.w3.org/2000/svg",
      className: "h-8 w-8 text-white",
      fill: "none",
      viewBox: "0 0 24 24",
      stroke: "currentColor"
    }, (0,_emotion_react__WEBPACK_IMPORTED_MODULE_0__.jsx)("path", {
      strokeLinecap: "round",
      strokeLinejoin: "round",
      strokeWidth: 2,
      d: "M12 15v2m0 0v2m0-2h2m-2 0H9m3-3a3 3 0 100-6 3 3 0 000 6z"
    }))), (0,_emotion_react__WEBPACK_IMPORTED_MODULE_0__.jsx)("div", {
      className: "text-center"
    }, (0,_emotion_react__WEBPACK_IMPORTED_MODULE_0__.jsx)("p", {
      className: "text-white/70 text-sm mb-2"
    }, "Coming Soon"), (0,_emotion_react__WEBPACK_IMPORTED_MODULE_0__.jsx)("div", {
      className: "flex flex-wrap justify-center gap-2 mt-4"
    }, company.industry.map((tag, index) => (0,_emotion_react__WEBPACK_IMPORTED_MODULE_0__.jsx)("span", {
      key: index,
      className: "bg-white/10 text-white/80 text-xs px-2 py-1 rounded"
    }, tag))), (0,_emotion_react__WEBPACK_IMPORTED_MODULE_0__.jsx)("p", {
      className: "text-white/60 text-xs mt-4"
    }, company.stage))));
  }
  return (0,_emotion_react__WEBPACK_IMPORTED_MODULE_0__.jsx)("div", {
    className: "dashboard-card bg-gradient-to-br from-srv-dark to-srv-blue/90 rounded-lg shadow p-6 h-full"
  }, (0,_emotion_react__WEBPACK_IMPORTED_MODULE_0__.jsx)("div", {
    className: "flex flex-col h-full"
  }, (0,_emotion_react__WEBPACK_IMPORTED_MODULE_0__.jsx)("div", {
    className: "flex items-center mb-4"
  }, (0,_emotion_react__WEBPACK_IMPORTED_MODULE_0__.jsx)("div", {
    className: "w-12 h-12 bg-white rounded-md flex items-center justify-center mr-4 overflow-hidden"
  }, company.logo ? (0,_emotion_react__WEBPACK_IMPORTED_MODULE_0__.jsx)("img", {
    src: company.logo,
    alt: `${company.name} logo`,
    className: "w-full h-full object-contain"
  }) : (0,_emotion_react__WEBPACK_IMPORTED_MODULE_0__.jsx)("span", {
    className: "text-srv-blue font-bold"
  }, company.name.substring(0, 2))), (0,_emotion_react__WEBPACK_IMPORTED_MODULE_0__.jsx)("div", null, (0,_emotion_react__WEBPACK_IMPORTED_MODULE_0__.jsx)("h3", {
    className: "text-white font-semibold"
  }, company.name), (0,_emotion_react__WEBPACK_IMPORTED_MODULE_0__.jsx)("p", {
    className: "text-srv-gray text-sm"
  }, company.stage))), (0,_emotion_react__WEBPACK_IMPORTED_MODULE_0__.jsx)("p", {
    className: "text-white/80 text-sm mb-4 flex-grow"
  }, company.description), (0,_emotion_react__WEBPACK_IMPORTED_MODULE_0__.jsx)("div", {
    className: "mt-auto"
  }, (0,_emotion_react__WEBPACK_IMPORTED_MODULE_0__.jsx)("div", {
    className: "flex flex-wrap gap-2 mb-4"
  }, company.industry.map((tag, index) => (0,_emotion_react__WEBPACK_IMPORTED_MODULE_0__.jsx)("span", {
    key: index,
    className: "bg-srv-teal/20 text-srv-teal text-xs px-2 py-1 rounded"
  }, tag))), (0,_emotion_react__WEBPACK_IMPORTED_MODULE_0__.jsx)("div", {
    className: "flex justify-between items-center"
  }, (0,_emotion_react__WEBPACK_IMPORTED_MODULE_0__.jsx)("span", {
    className: "text-srv-gray text-xs"
  }, new Date(company.investmentDate).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short'
  })), company.website && (0,_emotion_react__WEBPACK_IMPORTED_MODULE_0__.jsx)("a", {
    href: company.website,
    target: "_blank",
    rel: "noopener noreferrer",
    className: "text-srv-teal hover:underline text-sm"
  }, "Website \u2192")))));
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (PortfolioCard);

/***/ }),

/***/ "./src/components/dashboard/StatisticCard.tsx":
/*!****************************************************!*\
  !*** ./src/components/dashboard/StatisticCard.tsx ***!
  \****************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _emotion_react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @emotion/react */ "./node_modules/@emotion/react/dist/emotion-react.development.esm.js");

const StatisticCard = ({
  title,
  value,
  icon,
  change,
  trend = 'neutral'
}) => {
  return (0,_emotion_react__WEBPACK_IMPORTED_MODULE_0__.jsx)("div", {
    className: "dashboard-card bg-gradient-to-br from-srv-dark to-srv-blue/90 rounded-lg shadow p-6"
  }, (0,_emotion_react__WEBPACK_IMPORTED_MODULE_0__.jsx)("div", {
    className: "flex justify-between items-start"
  }, (0,_emotion_react__WEBPACK_IMPORTED_MODULE_0__.jsx)("div", null, (0,_emotion_react__WEBPACK_IMPORTED_MODULE_0__.jsx)("h3", {
    className: "text-srv-gray font-medium text-sm mb-1"
  }, title), (0,_emotion_react__WEBPACK_IMPORTED_MODULE_0__.jsx)("p", {
    className: "text-white text-2xl font-bold"
  }, value)), icon && (0,_emotion_react__WEBPACK_IMPORTED_MODULE_0__.jsx)("div", {
    className: "bg-srv-teal/10 p-2 rounded-full"
  }, icon)), change && (0,_emotion_react__WEBPACK_IMPORTED_MODULE_0__.jsx)("div", {
    className: "mt-4 flex items-center"
  }, (0,_emotion_react__WEBPACK_IMPORTED_MODULE_0__.jsx)("span", {
    className: `text-xs font-medium mr-1 ${trend === 'up' ? 'text-green-400' : trend === 'down' ? 'text-red-400' : 'text-srv-gray'}`
  }, change), trend === 'up' && (0,_emotion_react__WEBPACK_IMPORTED_MODULE_0__.jsx)("svg", {
    className: "w-3 h-3 text-green-400",
    fill: "none",
    stroke: "currentColor",
    viewBox: "0 0 24 24",
    xmlns: "http://www.w3.org/2000/svg"
  }, (0,_emotion_react__WEBPACK_IMPORTED_MODULE_0__.jsx)("path", {
    strokeLinecap: "round",
    strokeLinejoin: "round",
    strokeWidth: 2,
    d: "M5 10l7-7m0 0l7 7m-7-7v18"
  })), trend === 'down' && (0,_emotion_react__WEBPACK_IMPORTED_MODULE_0__.jsx)("svg", {
    className: "w-3 h-3 text-red-400",
    fill: "none",
    stroke: "currentColor",
    viewBox: "0 0 24 24",
    xmlns: "http://www.w3.org/2000/svg"
  }, (0,_emotion_react__WEBPACK_IMPORTED_MODULE_0__.jsx)("path", {
    strokeLinecap: "round",
    strokeLinejoin: "round",
    strokeWidth: 2,
    d: "M19 14l-7 7m0 0l-7-7m7 7V3"
  }))));
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (StatisticCard);

/***/ }),

/***/ "./src/pages/portfolio.tsx?export=default":
/*!************************************************!*\
  !*** ./src/pages/portfolio.tsx?export=default ***!
  \************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _services_AirtableService__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../services/AirtableService */ "./src/services/AirtableService.ts");
/* harmony import */ var _components_dashboard_PortfolioCard__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../components/dashboard/PortfolioCard */ "./src/components/dashboard/PortfolioCard.tsx");
/* harmony import */ var _components_dashboard_StatisticCard__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../components/dashboard/StatisticCard */ "./src/components/dashboard/StatisticCard.tsx");
/* harmony import */ var _components_dashboard_ChartComponent__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../components/dashboard/ChartComponent */ "./src/components/dashboard/ChartComponent.tsx");
/* harmony import */ var _components_ParticleBackground__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../components/ParticleBackground */ "./src/components/ParticleBackground.tsx");
/* harmony import */ var sonner__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! sonner */ "./node_modules/sonner/dist/index.mjs");
/* harmony import */ var _emotion_react__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @emotion/react */ "./node_modules/@emotion/react/dist/emotion-react.development.esm.js");








const Portfolio = () => {
  const {
    0: companies,
    1: setCompanies
  } = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)([]);
  const {
    0: statistics,
    1: setStatistics
  } = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)(null);
  const {
    0: loading,
    1: setLoading
  } = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)(true);
  const {
    0: filter,
    1: setFilter
  } = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)('all');
  (0,react__WEBPACK_IMPORTED_MODULE_0__.useEffect)(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const [portfolioData, statsData] = await Promise.all([_services_AirtableService__WEBPACK_IMPORTED_MODULE_1__["default"].getPortfolioCompanies(), _services_AirtableService__WEBPACK_IMPORTED_MODULE_1__["default"].getFundStatistics()]);
        setCompanies(portfolioData);
        setStatistics(statsData);
      } catch (error) {
        console.error('Error loading dashboard data:', error);
        sonner__WEBPACK_IMPORTED_MODULE_6__.toast.error('Failed to load dashboard data');
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  // Format statistics data for charts
  const prepareIndustryChartData = () => {
    if (!statistics) return [];
    return Object.entries(statistics.industrySplit).map(([name, value]) => ({
      name,
      value
    }));
  };
  const prepareStageChartData = () => {
    if (!statistics) return [];
    return Object.entries(statistics.stageSplit).map(([name, value]) => ({
      name,
      value
    }));
  };

  // Filter companies based on selected filter
  const filteredCompanies = companies.filter(company => {
    if (filter === 'all') return true;
    if (filter === 'announced') return company.announced;
    if (filter === 'stealth') return !company.announced;
    return company.industry.includes(filter);
  });

  // Get unique industries for filter dropdown
  const industries = Array.from(new Set(companies.flatMap(company => company.industry)));
  return (0,_emotion_react__WEBPACK_IMPORTED_MODULE_7__.jsx)("div", {
    className: "min-h-screen pt-20 pb-16"
  }, (0,_emotion_react__WEBPACK_IMPORTED_MODULE_7__.jsx)(_components_ParticleBackground__WEBPACK_IMPORTED_MODULE_5__["default"], null), (0,_emotion_react__WEBPACK_IMPORTED_MODULE_7__.jsx)("div", {
    className: "container mx-auto px-4"
  }, (0,_emotion_react__WEBPACK_IMPORTED_MODULE_7__.jsx)("div", {
    className: "mb-12 text-center"
  }, (0,_emotion_react__WEBPACK_IMPORTED_MODULE_7__.jsx)("h1", {
    className: "text-4xl font-bold text-white mb-4"
  }, "Our Portfolio"), (0,_emotion_react__WEBPACK_IMPORTED_MODULE_7__.jsx)("p", {
    className: "text-srv-gray max-w-2xl mx-auto"
  }, "We invest in exceptional founders building innovative solutions across various industries.")), loading ? (0,_emotion_react__WEBPACK_IMPORTED_MODULE_7__.jsx)("div", {
    className: "flex justify-center items-center h-64"
  }, (0,_emotion_react__WEBPACK_IMPORTED_MODULE_7__.jsx)("div", {
    className: "animate-pulse-slow text-srv-teal"
  }, "Loading dashboard data...")) : (0,_emotion_react__WEBPACK_IMPORTED_MODULE_7__.jsx)((react__WEBPACK_IMPORTED_MODULE_0___default().Fragment), null, (0,_emotion_react__WEBPACK_IMPORTED_MODULE_7__.jsx)("div", {
    className: "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-10"
  }, (0,_emotion_react__WEBPACK_IMPORTED_MODULE_7__.jsx)(_components_dashboard_StatisticCard__WEBPACK_IMPORTED_MODULE_3__["default"], {
    title: "Total Investments",
    value: `$${((statistics === null || statistics === void 0 ? void 0 : statistics.totalInvestments) / 1000000).toFixed(1)}M`,
    icon: (0,_emotion_react__WEBPACK_IMPORTED_MODULE_7__.jsx)("span", {
      className: "text-srv-teal text-xl"
    }, "\uD83D\uDCB0"),
    change: "+23% from last year",
    trend: "up"
  }), (0,_emotion_react__WEBPACK_IMPORTED_MODULE_7__.jsx)(_components_dashboard_StatisticCard__WEBPACK_IMPORTED_MODULE_3__["default"], {
    title: "Portfolio Companies",
    value: (statistics === null || statistics === void 0 ? void 0 : statistics.totalCompanies) || 0,
    icon: (0,_emotion_react__WEBPACK_IMPORTED_MODULE_7__.jsx)("span", {
      className: "text-srv-teal text-xl"
    }, "\uD83C\uDFE2")
  }), (0,_emotion_react__WEBPACK_IMPORTED_MODULE_7__.jsx)(_components_dashboard_StatisticCard__WEBPACK_IMPORTED_MODULE_3__["default"], {
    title: "Average Investment",
    value: `$${((statistics === null || statistics === void 0 ? void 0 : statistics.averageInvestment) / 1000000).toFixed(2)}M`,
    icon: (0,_emotion_react__WEBPACK_IMPORTED_MODULE_7__.jsx)("span", {
      className: "text-srv-teal text-xl"
    }, "\uD83D\uDCCA")
  }), (0,_emotion_react__WEBPACK_IMPORTED_MODULE_7__.jsx)(_components_dashboard_StatisticCard__WEBPACK_IMPORTED_MODULE_3__["default"], {
    title: "Success Rate",
    value: "85%",
    icon: (0,_emotion_react__WEBPACK_IMPORTED_MODULE_7__.jsx)("span", {
      className: "text-srv-teal text-xl"
    }, "\uD83D\uDE80"),
    change: "+5% from previous fund",
    trend: "up"
  })), (0,_emotion_react__WEBPACK_IMPORTED_MODULE_7__.jsx)("div", {
    className: "grid grid-cols-1 md:grid-cols-2 gap-6 mb-10"
  }, (0,_emotion_react__WEBPACK_IMPORTED_MODULE_7__.jsx)(_components_dashboard_ChartComponent__WEBPACK_IMPORTED_MODULE_4__["default"], {
    title: "Investment by Industry",
    data: prepareIndustryChartData()
  }), (0,_emotion_react__WEBPACK_IMPORTED_MODULE_7__.jsx)(_components_dashboard_ChartComponent__WEBPACK_IMPORTED_MODULE_4__["default"], {
    title: "Investment by Stage",
    data: prepareStageChartData(),
    colors: ['#00A0A0', '#1A85B9', '#0F4C81']
  })), (0,_emotion_react__WEBPACK_IMPORTED_MODULE_7__.jsx)("div", {
    className: "mb-8"
  }, (0,_emotion_react__WEBPACK_IMPORTED_MODULE_7__.jsx)("div", {
    className: "flex justify-between items-center mb-6"
  }, (0,_emotion_react__WEBPACK_IMPORTED_MODULE_7__.jsx)("h2", {
    className: "text-2xl font-bold text-white"
  }, "Portfolio Companies"), (0,_emotion_react__WEBPACK_IMPORTED_MODULE_7__.jsx)("div", null, (0,_emotion_react__WEBPACK_IMPORTED_MODULE_7__.jsx)("select", {
    value: filter,
    onChange: e => setFilter(e.target.value),
    className: "bg-srv-blue/20 text-white border border-srv-blue/30 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-srv-teal"
  }, (0,_emotion_react__WEBPACK_IMPORTED_MODULE_7__.jsx)("option", {
    value: "all"
  }, "All Companies"), (0,_emotion_react__WEBPACK_IMPORTED_MODULE_7__.jsx)("option", {
    value: "announced"
  }, "Announced Only"), (0,_emotion_react__WEBPACK_IMPORTED_MODULE_7__.jsx)("option", {
    value: "stealth"
  }, "Stealth Only"), (0,_emotion_react__WEBPACK_IMPORTED_MODULE_7__.jsx)("optgroup", {
    label: "By Industry"
  }, industries.map(industry => (0,_emotion_react__WEBPACK_IMPORTED_MODULE_7__.jsx)("option", {
    key: industry,
    value: industry
  }, industry)))))), (0,_emotion_react__WEBPACK_IMPORTED_MODULE_7__.jsx)("div", {
    className: "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
  }, filteredCompanies.length > 0 ? filteredCompanies.map(company => (0,_emotion_react__WEBPACK_IMPORTED_MODULE_7__.jsx)(_components_dashboard_PortfolioCard__WEBPACK_IMPORTED_MODULE_2__["default"], {
    key: company.id,
    company: company
  })) : (0,_emotion_react__WEBPACK_IMPORTED_MODULE_7__.jsx)("div", {
    className: "col-span-full text-center py-12"
  }, (0,_emotion_react__WEBPACK_IMPORTED_MODULE_7__.jsx)("p", {
    className: "text-srv-gray"
  }, "No companies found matching the selected filter.")))))));
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Portfolio);

/***/ }),

/***/ "./src/services/AirtableService.ts":
/*!*****************************************!*\
  !*** ./src/services/AirtableService.ts ***!
  \*****************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var sonner__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! sonner */ "./node_modules/sonner/dist/index.mjs");


// Types for our portfolio companies

// Types for our fund statistics

// Mock data for demo purposes - this would be replaced with actual Airtable API calls
const mockPortfolioData = [{
  id: '1',
  name: 'TechFusion',
  description: 'AI-powered data analytics platform for enterprise',
  logo: 'https://placehold.co/200x200?text=TF',
  website: 'https://example.com',
  industry: ['Artificial Intelligence', 'Enterprise Software'],
  stage: 'Series A',
  investmentDate: '2023-06-15',
  announced: true
}, {
  id: '2',
  name: 'GreenEnergy',
  description: 'Renewable energy solutions for residential buildings',
  logo: 'https://placehold.co/200x200?text=GE',
  website: 'https://example.com',
  industry: ['CleanTech', 'IoT'],
  stage: 'Seed',
  investmentDate: '2023-08-22',
  announced: true
}, {
  id: '3',
  name: 'HealthAI',
  description: 'AI diagnostics for healthcare providers',
  logo: 'https://placehold.co/200x200?text=HA',
  website: 'https://example.com',
  industry: ['HealthTech', 'Artificial Intelligence'],
  stage: 'Seed',
  investmentDate: '2023-04-10',
  announced: true
}, {
  id: '4',
  name: '',
  description: '',
  logo: '',
  website: '',
  industry: ['FinTech'],
  stage: 'Pre-seed',
  investmentDate: '2023-09-05',
  announced: false
}, {
  id: '5',
  name: '',
  description: '',
  logo: '',
  website: '',
  industry: ['DeepTech', 'Manufacturing'],
  stage: 'Seed',
  investmentDate: '2023-10-30',
  announced: false
}];
const mockFundStatistics = {
  totalInvestments: 5200000,
  // $5.2M
  totalCompanies: 5,
  averageInvestment: 1040000,
  // $1.04M
  industrySplit: {
    'Artificial Intelligence': 40,
    'Enterprise Software': 20,
    'CleanTech': 20,
    'IoT': 10,
    'HealthTech': 20,
    'FinTech': 20,
    'DeepTech': 10,
    'Manufacturing': 10
  },
  stageSplit: {
    'Pre-seed': 20,
    'Seed': 60,
    'Series A': 20
  }
};
class AirtableService {
  // Fetch portfolio companies
  async getPortfolioCompanies() {
    try {
      // In a real implementation, this would be an API call to Airtable
      // For now, we'll return mock data with a simulated delay
      return new Promise(resolve => {
        setTimeout(() => {
          resolve(mockPortfolioData);
        }, 800);
      });
    } catch (error) {
      console.error('Error fetching portfolio companies:', error);
      sonner__WEBPACK_IMPORTED_MODULE_0__.toast.error('Failed to load portfolio data');
      return [];
    }
  }

  // Fetch fund statistics
  async getFundStatistics() {
    try {
      // In a real implementation, this would be an API call to Airtable
      return new Promise(resolve => {
        setTimeout(() => {
          resolve(mockFundStatistics);
        }, 600);
      });
    } catch (error) {
      console.error('Error fetching fund statistics:', error);
      sonner__WEBPACK_IMPORTED_MODULE_0__.toast.error('Failed to load fund statistics');
      return {
        totalInvestments: 0,
        totalCompanies: 0,
        averageInvestment: 0,
        industrySplit: {},
        stageSplit: {}
      };
    }
  }

  // Submit application form
  async submitApplication(formData) {
    try {
      // In a real implementation, this would post to Airtable API
      console.log('Form submission data:', formData);

      // Simulate API call
      return new Promise(resolve => {
        setTimeout(() => {
          if (Math.random() > 0.1) {
            // 90% success rate for demo
            resolve(true);
          } else {
            throw new Error('Simulated API error');
          }
        }, 1000);
      });
    } catch (error) {
      console.error('Error submitting application:', error);
      sonner__WEBPACK_IMPORTED_MODULE_0__.toast.error('Failed to submit application. Please try again.');
      return false;
    }
  }
}
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (new AirtableService());

/***/ })

};
;
//# sourceMappingURL=component---src-pages-portfolio-tsx.js.map