(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["pages/category/category"],{"2b73":function(t,n,e){"use strict";e.r(n);var i=e("a20e"),r=e.n(i);for(var c in i)"default"!==c&&function(t){e.d(n,t,(function(){return i[t]}))}(c);n["default"]=r.a},"30b6":function(t,n,e){"use strict";e.r(n);var i=e("9850"),r=e("2b73");for(var c in r)"default"!==c&&function(t){e.d(n,t,(function(){return r[t]}))}(c);e("57bd");var a,u=e("f0c5"),o=Object(u["a"])(r["default"],i["b"],i["c"],!1,null,null,null,!1,i["a"],a);n["default"]=o.exports},"515f":function(t,n,e){},"57bd":function(t,n,e){"use strict";var i=e("515f"),r=e.n(i);r.a},"6c06":function(t,n,e){"use strict";(function(t){e("da0f"),e("921b");i(e("66fd"));var n=i(e("30b6"));function i(t){return t&&t.__esModule?t:{default:t}}t(n.default)}).call(this,e("543d")["createPage"])},9850:function(t,n,e){"use strict";var i,r=function(){var t=this,n=t.$createElement;t._self._c},c=[];e.d(n,"b",(function(){return r})),e.d(n,"c",(function(){return c})),e.d(n,"a",(function(){return i}))},a20e:function(t,n,e){"use strict";(function(t){Object.defineProperty(n,"__esModule",{value:!0}),n.default=void 0;var i=r(e("4795"));function r(t){return t&&t.__esModule?t:{default:t}}function c(t,n,e,i,r,c,a){try{var u=t[c](a),o=u.value}catch(s){return void e(s)}u.done?n(o):Promise.resolve(o).then(i,r)}function a(t){return function(){var n=this,e=arguments;return new Promise((function(i,r){var a=t.apply(n,e);function u(t){c(a,i,r,u,o,"next",t)}function o(t){c(a,i,r,u,o,"throw",t)}u(void 0)}))}}var u={data:function(){return{sizeCalcState:!1,tabScrollTop:0,currentId:1,flist:[],slist:[],tlist:[]}},onLoad:function(){this.loadData()},methods:{loadData:function(){var t=this;return a(i.default.mark((function n(){var e;return i.default.wrap((function(n){while(1)switch(n.prev=n.next){case 0:return n.next=2,t.$api.json("cateList");case 2:e=n.sent,e.forEach((function(n){n.pid?n.picture?t.tlist.push(n):t.slist.push(n):t.flist.push(n)}));case 4:case"end":return n.stop()}}),n)})))()},tabtap:function(t){this.sizeCalcState||this.calcSize(),this.currentId=t.id;var n=this.slist.findIndex((function(n){return n.pid===t.id}));this.tabScrollTop=this.slist[n].top},asideScroll:function(t){this.sizeCalcState||this.calcSize();var n=t.detail.scrollTop,e=this.slist.filter((function(t){return t.top<=n})).reverse();e.length>0&&(this.currentId=e[0].pid)},calcSize:function(){var n=0;this.slist.forEach((function(e){var i=t.createSelectorQuery().select("#main-"+e.id);i.fields({size:!0},(function(t){e.top=n,n+=t.height,e.bottom=n})).exec()})),this.sizeCalcState=!0},navToList:function(n,e){t.navigateTo({url:"/pages/product/list?fid=".concat(this.currentId,"&sid=").concat(n,"&tid=").concat(e)})}}};n.default=u}).call(this,e("543d")["default"])}},[["6c06","common/runtime","common/vendor"]]]);