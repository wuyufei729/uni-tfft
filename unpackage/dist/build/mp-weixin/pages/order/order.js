(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["pages/order/order"],{"0109":function(t,e,n){"use strict";var a=n("cc4d"),o=n.n(a);o.a},"43b9":function(t,e,n){"use strict";n.r(e);var a=n("92db"),o=n.n(a);for(var r in a)"default"!==r&&function(t){n.d(e,t,(function(){return a[t]}))}(r);e["default"]=o.a},"89a4":function(t,e,n){"use strict";var a={"uni-load-more":function(){return n.e("components/uni-load-more/uni-load-more").then(n.bind(null,"d80e"))}},o=function(){var t=this,e=t.$createElement;t._self._c},r=[];n.d(e,"b",(function(){return o})),n.d(e,"c",(function(){return r})),n.d(e,"a",(function(){return a}))},"92db":function(t,e,n){"use strict";(function(t){Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0;var a=o(n("2bba"));function o(t){return t&&t.__esModule?t:{default:t}}var r=function(){n.e("components/uni-load-more/uni-load-more").then(function(){return resolve(n("d80e"))}.bind(null,n)).catch(n.oe)},i=function(){n.e("components/empty").then(function(){return resolve(n("f5f9"))}.bind(null,n)).catch(n.oe)},d={components:{uniLoadMore:r,empty:i},data:function(){return{tabCurrentIndex:0,navList:[{state:0,text:"全部",loadingType:"more",orderList:[]},{state:1,text:"待付款",loadingType:"more",orderList:[]},{state:2,text:"待收货",loadingType:"more",orderList:[]},{state:3,text:"待评价",loadingType:"more",orderList:[]},{state:4,text:"售后",loadingType:"more",orderList:[]}]}},onLoad:function(t){this.tabCurrentIndex=+t.state,0==t.state&&this.loadData()},methods:{loadData:function(t){var e=this,n=this.tabCurrentIndex,o=this.navList[n],r=o.state;"tabChange"===t&&!0===o.loaded||"loading"!==o.loadingType&&(o.loadingType="loading",setTimeout((function(){var t=a.default.orderList.filter((function(t){return t=Object.assign(t,e.orderStateExp(t.state)),0===r?t:t.state===r}));t.forEach((function(t){o.orderList.push(t)})),e.$set(o,"loaded",!0),o.loadingType="more"}),600))},changeTab:function(t){this.tabCurrentIndex=t.target.current,this.loadData("tabChange")},tabClick:function(t){this.tabCurrentIndex=t},deleteOrder:function(e){var n=this;t.showLoading({title:"请稍后"}),setTimeout((function(){n.navList[n.tabCurrentIndex].orderList.splice(e,1),t.hideLoading()}),600)},cancelOrder:function(e){var n=this;t.showLoading({title:"请稍后"}),setTimeout((function(){var a=n.orderStateExp(9),o=a.stateTip,r=a.stateTipColor;e=Object.assign(e,{state:9,stateTip:o,stateTipColor:r});var i=n.navList[1].orderList,d=i.findIndex((function(t){return t.id===e.id}));-1!==d&&i.splice(d,1),t.hideLoading()}),600)},orderStateExp:function(t){var e="",n="#fa436a";switch(+t){case 1:e="待付款";break;case 2:e="待发货";break;case 9:e="订单已关闭",n="#909399";break}return{stateTip:e,stateTipColor:n}}}};e.default=d}).call(this,n("543d")["default"])},"97a8":function(t,e,n){"use strict";(function(t){n("da0f"),n("921b");a(n("66fd"));var e=a(n("d83d"));function a(t){return t&&t.__esModule?t:{default:t}}t(e.default)}).call(this,n("543d")["createPage"])},cc4d:function(t,e,n){},d83d:function(t,e,n){"use strict";n.r(e);var a=n("89a4"),o=n("43b9");for(var r in o)"default"!==r&&function(t){n.d(e,t,(function(){return o[t]}))}(r);n("0109");var i,d=n("f0c5"),u=Object(d["a"])(o["default"],a["b"],a["c"],!1,null,null,null,!1,a["a"],i);e["default"]=u.exports}},[["97a8","common/runtime","common/vendor"]]]);