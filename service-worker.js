if(!self.define){let s,e={};const o=(o,i)=>(o=new URL(o+".js",i).href,e[o]||new Promise((e=>{if("document"in self){const s=document.createElement("script");s.src=o,s.onload=e,document.head.appendChild(s)}else s=o,importScripts(o),e()})).then((()=>{let s=e[o];if(!s)throw new Error(`Module ${o} didn’t register its module`);return s})));self.define=(i,n)=>{const l=s||("document"in self?document.currentScript.src:"")||location.href;if(e[l])return;let r={};const t=s=>o(s,l),f={module:{uri:l},exports:r,require:t};e[l]=Promise.all(i.map((s=>f[s]||t(s)))).then((s=>(n(...s),r)))}}define(["./workbox-6567b62a"],(function(s){"use strict";s.setCacheNameDetails({prefix:"wsd04"}),self.addEventListener("message",(s=>{s.data&&"SKIP_WAITING"===s.data.type&&self.skipWaiting()})),s.precacheAndRoute([{url:"/front-demo-site-login/css/286.7a5645f0.css",revision:null},{url:"/front-demo-site-login/css/328.b698f78c.css",revision:null},{url:"/front-demo-site-login/css/336.2431296d.css",revision:null},{url:"/front-demo-site-login/css/367.643fcff5.css",revision:null},{url:"/front-demo-site-login/css/377.d1f896b1.css",revision:null},{url:"/front-demo-site-login/css/738.156d4ffc.css",revision:null},{url:"/front-demo-site-login/css/app.00cc97bd.css",revision:null},{url:"/front-demo-site-login/index.html",revision:"afa1d9cd4f867e73cd2e4c084d8866dc"},{url:"/front-demo-site-login/js/286.15e7ad98.js",revision:null},{url:"/front-demo-site-login/js/328.9c810530.js",revision:null},{url:"/front-demo-site-login/js/336.1e2a64f2.js",revision:null},{url:"/front-demo-site-login/js/367.49931185.js",revision:null},{url:"/front-demo-site-login/js/373.1a706368.js",revision:null},{url:"/front-demo-site-login/js/496.d6316af8.js",revision:null},{url:"/front-demo-site-login/js/624.adc9507e.js",revision:null},{url:"/front-demo-site-login/js/738.2bed374f.js",revision:null},{url:"/front-demo-site-login/js/app.d5bbcfb7.js",revision:null},{url:"/front-demo-site-login/js/chunk-vendors.71482b4a.js",revision:null},{url:"/front-demo-site-login/manifest.json",revision:"0439fc64937e2b3d71ce0977fe8fe74d"},{url:"/front-demo-site-login/robots.txt",revision:"b6216d61c03e6ce0c9aea6ca7808f7ca"}],{})}));
//# sourceMappingURL=service-worker.js.map
