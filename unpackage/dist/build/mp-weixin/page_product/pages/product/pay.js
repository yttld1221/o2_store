require('../../common/vendor.js');(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["page_product/pages/product/pay"],{"1ff5":function(e,t,n){"use strict";n.d(t,"b",(function(){return r})),n.d(t,"c",(function(){return a})),n.d(t,"a",(function(){return o}));var o={uIcon:function(){return Promise.all([n.e("common/vendor"),n.e("uni_modules/uview-ui/components/u-icon/u-icon")]).then(n.bind(null,"7e9b"))},uNumberBox:function(){return Promise.all([n.e("common/vendor"),n.e("uni_modules/uview-ui/components/u-number-box/u-number-box")]).then(n.bind(null,"dd6d"))},"u-Textarea":function(){return Promise.all([n.e("common/vendor"),n.e("uni_modules/uview-ui/components/u--textarea/u--textarea")]).then(n.bind(null,"550f"))}},r=function(){var e=this.$createElement,t=(this._self._c,this.addressInfo&&this.addressInfo.id?this.getArea():null);this.$mp.data=Object.assign({},{$root:{m0:t}})},a=[]},"6b00":function(e,t,n){"use strict";n.r(t);var o=n("1ff5"),r=n("a029");for(var a in r)["default"].indexOf(a)<0&&function(e){n.d(t,e,(function(){return r[e]}))}(a);n("e580");var u=n("f0c5"),i=Object(u["a"])(r["default"],o["b"],o["c"],!1,null,"ff9d33b2",null,!1,o["a"],void 0);t["default"]=i.exports},"9c02":function(e,t,n){"use strict";(function(e,t){var o=n("4ea4");n("f290");o(n("66fd"));var r=o(n("6b00"));e.__webpack_require_UNI_MP_PLUGIN__=n,t(r.default)}).call(this,n("bc2e")["default"],n("543d")["createPage"])},a029:function(e,t,n){"use strict";n.r(t);var o=n("a196"),r=n.n(o);for(var a in o)["default"].indexOf(a)<0&&function(e){n.d(t,e,(function(){return o[e]}))}(a);t["default"]=r.a},a196:function(e,t,n){"use strict";(function(e){var o=n("4ea4");Object.defineProperty(t,"__esModule",{value:!0}),t.default=void 0;var r=o(n("2eee")),a=o(n("c973")),u={components:{},data:function(){return{list:[],addressInfo:{},remark:""}},onLoad:function(t){var n=this;console.log(t),t.product&&(this.list=JSON.parse(decodeURIComponent(t.product)),this.getAddress()),e.$on("getAddress",(function(e){console.log(e),n.addressInfo=e.addressInfo}))},computed:{priceall:function(){var e=0;for(var t in this.list)e+=this.list[t].price*this.list[t].num;return parseFloat(e).toFixed(2)}},methods:{getArea:function(){var e=this.addressInfo.complete_addr.split(this.addressInfo.addr);return e[0]},toAddress:function(){e.navigateTo({url:"/page_product/pages/address/index?from=pay"})},getAddress:function(){var e=this;this.API.home.getMyReceiveAddrs({is_default:1}).then((function(t){console.log(t),t.data.length&&1==t.data[0].is_default&&(e.addressInfo=t.data[0])})).catch(function(){var t=(0,a.default)(r.default.mark((function t(n){return r.default.wrap((function(t){while(1)switch(t.prev=t.next){case 0:if(410!=n.code){t.next=4;break}return t.next=3,e.$store.dispatch("toLogon",{});case 3:e.getAddress();case 4:case"end":return t.stop()}}),t)})));return function(e){return t.apply(this,arguments)}}())}}};t.default=u}).call(this,n("543d")["default"])},aca7:function(e,t,n){},e580:function(e,t,n){"use strict";var o=n("aca7"),r=n.n(o);r.a}},[["9c02","common/runtime","common/vendor"]]]);