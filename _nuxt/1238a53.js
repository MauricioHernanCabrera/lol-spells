(window.webpackJsonp=window.webpackJsonp||[]).push([[2],{111:function(e,t,n){var content=n(250);"string"==typeof content&&(content=[[e.i,content,""]]),content.locals&&(e.exports=content.locals);(0,n(25).default)("4e8213bc",content,!0,{sourceMap:!1})},141:function(e,t,n){"use strict";t.a=function(e){var i,s,t,n,a,o,r=e.app;e.store;i=window,s=document,t="script",n="ga",i.GoogleAnalyticsObject=n,i.ga=i.ga||function(){(i.ga.q=i.ga.q||[]).push(arguments)},i.ga.l=1*new Date,a=s.createElement(t),o=s.getElementsByTagName(t)[0],a.async=1,a.src="https://www.google-analytics.com/analytics.js",o.parentNode.insertBefore(a,o),ga("create","UA-180482408-1","auto"),r.router.afterEach((function(e,t){ga("set","page",e.path),"localhost"===location.hostname||"127.0.0.1"===location.hostname?ga("set","sendHitTask",null):ga("send","pageview")}))}},142:function(e,t,n){"use strict";t.a=function(e){e.app;var t=e.store,n=(JSON.parse(localStorage.getItem("data"))||{}).selectedChampions,o=void 0===n?[]:n;t.dispatch("setSelectedChampions",o),t.subscribe((function(){localStorage.setItem("data",JSON.stringify(t.state))}))}},150:function(e){e.exports=JSON.parse('[{"icon":"/images/spells/heal.png","name":"Curación","duration":240,"id":"heal"},{"icon":"/images/spells/ghost.png","name":"Fantasma","duration":210,"id":"ghost"},{"icon":"/images/spells/barrier.png","name":"Barrera","duration":180,"id":"barrier"},{"icon":"/images/spells/exhaust.png","name":"Extenuación","duration":210,"id":"exhaust"},{"icon":"/images/spells/clarity.png","name":"Claridad","duration":240,"id":"clarity"},{"icon":"/images/spells/flash.png","name":"Destello","duration":300,"id":"flash"},{"icon":"/images/spells/teleport.png","name":"Teleportación","duration":400,"id":"teleport"},{"icon":"/images/spells/smite.png","name":"Castigo","duration":15,"id":"smite"},{"icon":"/images/spells/ignite.png","name":"Ignición","duration":180,"id":"ignite"},{"icon":"/images/spells/cleanse.png","name":"Purificación","duration":210,"id":"cleanse"}]')},205:function(e,t,n){"use strict";n(8),n(30),n(17),n(11),n(73),n(42),n(20),n(21),n(16),n(12);var o=n(1),r=n(67);function c(object,e){var t=Object.keys(object);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(object);e&&(n=n.filter((function(e){return Object.getOwnPropertyDescriptor(object,e).enumerable}))),t.push.apply(t,n)}return t}var l={computed:function(e){for(var i=1;i<arguments.length;i++){var source=null!=arguments[i]?arguments[i]:{};i%2?c(Object(source),!0).forEach((function(t){Object(o.a)(e,t,source[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(source)):c(Object(source)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(source,t))}))}return e}({},Object(r.c)(["selectedChampions"])),methods:{goBack:function(){this.$router.go(-1)},shareGame:function(){var e=this.selectedChampions.map((function(e){return e.championId})).join(","),t=this.selectedChampions.map((function(e){var t=e.firstSpell;return t.id?t.id:"_"})).join(","),n=this.selectedChampions.map((function(e){var t=e.secondSpell;return t.id?t.id:"_"})).join(","),o=this.selectedChampions.map((function(e){return e.hasBoots?1:0})).join(","),r=this.selectedChampions.map((function(e){return e.level})).join(","),c="".concat(window.location.origin).concat(this.$router.history.base,"/selected?champions=").concat(e,"&firstSpells=").concat(t,"&secondSpells=").concat(n,"&hasBoots=").concat(o,"&levels=").concat(r),l=document.getElementById("copyClipboard");l.value=c,l.select(),l.setSelectionRange(0,99999),document.execCommand("copy")}}},d=(n(249),n(68)),m=n(143),f=n.n(m),h=n(317),O=n(321),v=n(318),C=n(322),S=n(319),E=n(320),component=Object(d.a)(l,(function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("v-app",{staticClass:"app",attrs:{dark:""}},[n("v-toolbar",{staticClass:"elevation-0",attrs:{color:"#0F0713"}},["index"!==e.$route.name?n("v-btn",{attrs:{text:"",to:"/"}},[e._v(" Inicio ")]):e._e(),e._v(" "),n("v-spacer"),e._v(" "),n("v-btn",{attrs:{text:""},on:{click:e.shareGame}},[n("span",{staticClass:"hidden-xs-only"},[e._v("Copiar link de partida")]),e._v(" "),n("v-icon",{staticClass:"ml-2"},[e._v("mdi-share-variant-outline")])],1)],1),e._v(" "),n("v-main",[n("nuxt")],1),e._v(" "),n("input",{staticClass:"copy_clipboard",attrs:{type:"text",value:"",id:"copyClipboard"}})],1)}),[],!1,null,null,null);t.a=component.exports;f()(component,{VApp:h.a,VBtn:O.a,VIcon:v.a,VMain:C.a,VSpacer:S.a,VToolbar:E.a})},215:function(e,t,n){n(216),e.exports=n(217)},244:function(e,t,n){var content=n(245);"string"==typeof content&&(content=[[e.i,content,""]]),content.locals&&(e.exports=content.locals);(0,n(25).default)("455292ae",content,!0,{sourceMap:!1})},245:function(e,t,n){var o=n(24),r=n(246),c=n(247),l=n(248);t=o(!1);var d=r(c),m=r(l);t.push([e.i,"@font-face{font-family:beaufort;src:url("+d+') format("woff2"),url('+m+') format("woff");font-style:normal;font-weight:400}spacer{flex-grow:1}body{-webkit-user-select:none;-moz-user-select:none;-ms-user-select:none;user-select:none}',""]),e.exports=t},247:function(e,t,n){e.exports=n.p+"fonts/BeauBold-webfont.067b7a0.woff2"},248:function(e,t,n){e.exports=n.p+"fonts/BeauBold-webfont.cf88af4.woff"},249:function(e,t,n){"use strict";var o=n(111);n.n(o).a},250:function(e,t,n){(t=n(24)(!1)).push([e.i,".app.app{background-color:#0f0713}.app.app .v-toolbar__content{border-bottom:1px solid #2e2734}.copy_clipboard{position:fixed;top:-500vh;left:-500vw}",""]),e.exports=t},286:function(e,t,n){"use strict";n.r(t),n.d(t,"state",(function(){return m})),n.d(t,"getters",(function(){return f})),n.d(t,"mutations",(function(){return h})),n.d(t,"actions",(function(){return O}));n(8),n(17),n(11),n(42),n(78),n(287),n(22),n(20),n(21),n(16),n(12),n(41);var o=n(1),r=n(60),c=n(150);function l(object,e){var t=Object.keys(object);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(object);e&&(n=n.filter((function(e){return Object.getOwnPropertyDescriptor(object,e).enumerable}))),t.push.apply(t,n)}return t}function d(e){for(var i=1;i<arguments.length;i++){var source=null!=arguments[i]?arguments[i]:{};i%2?l(Object(source),!0).forEach((function(t){Object(o.a)(e,t,source[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(source)):l(Object(source)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(source,t))}))}return e}var m=function(){return{selectedChampions:[],championSearch:""}},f={},h={SET_SELECTED_CHAMPIONS:function(e,t){e.selectedChampions=t.map((function(e,t){return d({position:t+1},e)}))},ADD_SELECTED_CHAMPION:function(e,t){var n=e.selectedChampions.length,o=0==n?1:e.selectedChampions[n-1].position+1;e.selectedChampions.push(d(d({firstSpell:{},secondSpell:{},level:1,hasBoots:!1,interval:null,isRun:!1},t),{},{position:o}))},REMOVE_SELECTED_CHAMPION:function(e,t){var n=Object(r.findIndex)(e.selectedChampions,["championId",t]);if(-1!=n){var o=JSON.parse(JSON.stringify(e.selectedChampions));o.splice(n,1),e.selectedChampions=o}},UPDATE_SELECTED_CHAMPION:function(e,t){var n=t.championId,o=t.champion,c=Object(r.findIndex)(e.selectedChampions,["championId",n]);if(-1!=c){var l=JSON.parse(JSON.stringify(e.selectedChampions));l[c]=d(d({},l[c]),JSON.parse(JSON.stringify(o))),e.selectedChampions=l}},SET_CHAMPION_SEARCH:function(e,t){e.championSearch=t}},O={restartTimer:function(e,t){var n=e.state,l=e.commit,m=t.championId,f=t.spellPosition,h=Object(r.find)(n.selectedChampions,["championId",m]);if(h){var O=d({},h[f]);clearInterval(O.interval),O.interval=null,O.isRun=!1;var v=Object(r.find)(c,["id",O.id]);O.duration=v.duration,l("UPDATE_SELECTED_CHAMPION",{championId:m,champion:Object(o.a)({},f,O)})}},removeSelectedChampion:function(e,t){var n=e.state,o=e.commit,c=e.dispatch,l=Object(r.find)(n.selectedChampions,["championId",t]);l.firstSpell&&l.firstSpell.duration&&c("restartTimer",{championId:t,spellPosition:"firstSpell"}),l.secondSpell&&l.secondSpell.duration&&c("restartTimer",{championId:t,spellPosition:"secondSpell"}),o("REMOVE_SELECTED_CHAMPION",t)},startTimer:function(e,t){var n=e.state,c=e.commit,l=e.dispatch,m=t.championId,f=t.spellPosition,h=Object(r.find)(n.selectedChampions,["championId",m]);if(h){var O=JSON.parse(JSON.stringify(h[f]));if(O.isRun)l("restartTimer",{championId:m,spellPosition:f});else{var v=1;h.hasBoots&&(v-=.1),O.isRun=!0,O.duration*=v,"Teleportación"==O.name&&(O.duration-=10*(h.level-1)),O.duration--,O.interval=setInterval((function(){var e=Object(r.find)(n.selectedChampions,["championId",m]),t=JSON.parse(JSON.stringify(e[f])),h=t.duration-1;if(h<=0)return l("restartTimer",{championId:m,spellPosition:f});c("UPDATE_SELECTED_CHAMPION",{championId:m,champion:Object(o.a)({},f,d(d({},t),{},{duration:h}))})}),1e3),c("UPDATE_SELECTED_CHAMPION",{championId:m,champion:Object(o.a)({},f,O)})}}},addSelectedChampion:function(e,t){(0,e.commit)("ADD_SELECTED_CHAMPION",t)},setSelectedChampions:function(e,t){(0,e.commit)("SET_SELECTED_CHAMPIONS",t)},updateSelectedChampion:function(e,t){(0,e.commit)("UPDATE_SELECTED_CHAMPION",t)},toggleChampion:function(e,t){var n=e.state,o=e.dispatch;n.selectedChampions.some((function(e){return e.championId===t}))?o("removeSelectedChampion",t):o("addSelectedChampion",{championId:t}),o("setChampionSearch","")},setChampionSearch:function(e,t){(0,e.commit)("SET_CHAMPION_SEARCH",t)}}}},[[215,6,3,7]]]);