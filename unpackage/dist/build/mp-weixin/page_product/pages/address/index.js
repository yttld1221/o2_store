require('../../common/vendor.js');(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["page_product/pages/address/index"],{"30e5":function(e,t,n){"use strict";n.d(t,"b",(function(){return i})),n.d(t,"c",(function(){return s})),n.d(t,"a",(function(){return o}));var o={uSwipeAction:function(){return Promise.all([n.e("common/vendor"),n.e("uni_modules/uview-ui/components/u-swipe-action/u-swipe-action")]).then(n.bind(null,"fa78"))},uSwipeActionItem:function(){return Promise.all([n.e("common/vendor"),n.e("uni_modules/uview-ui/components/u-swipe-action-item/u-swipe-action-item")]).then(n.bind(null,"33c5"))},uIcon:function(){return Promise.all([n.e("common/vendor"),n.e("uni_modules/uview-ui/components/u-icon/u-icon")]).then(n.bind(null,"7e9b"))}},i=function(){var e=this.$createElement,t=(this._self._c,this.list.length),n=this.list.length;this.$mp.data=Object.assign({},{$root:{g0:t,g1:n}})},s=[]},"53b9":function(e,t,n){"use strict";n.r(t);var o=n("30e5"),i=n("d970");for(var s in i)["default"].indexOf(s)<0&&function(e){n.d(t,e,(function(){return i[e]}))}(s);n("55d2");var u=n("f0c5"),r=Object(u["a"])(i["default"],o["b"],o["c"],!1,null,"eefc2bbe",null,!1,o["a"],void 0);t["default"]=r.exports},"55d2":function(e,t,n){"use strict";var o=n("6bc5"),i=n.n(o);i.a},"6bc5":function(e,t,n){},"7f0e":function(e,t,n){"use strict";(function(e,t){var o=n("4ea4");n("f290");o(n("66fd"));var i=o(n("53b9"));e.__webpack_require_UNI_MP_PLUGIN__=n,t(i.default)}).call(this,n("bc2e")["default"],n("543d")["createPage"])},d6c9:function(e,t,n){"use strict";(function(e){var o=n("4ea4");Object.defineProperty(t,"__esModule",{value:!0}),t.default=void 0;var i=o(n("2eee")),s=o(n("c973")),u={components:{},data:function(){return{list:[],options:[{text:"删除",style:{backgroundColor:"#FF812F"}}],fromPage:""}},onLoad:function(e){console.log(e),e.from&&(this.fromPage=e.from)},onShow:function(){this.getList()},methods:{chooseAddress:function(t){console.log(t),e.$emit("getAddress",{addressInfo:t}),e.navigateBack()},editAddress:function(t){var n=encodeURIComponent(JSON.stringify(t)),o="/page_product/pages/address/setAddress?data=".concat(n);this.fromPage&&(o+="&from=pay"),e.navigateTo({url:o})},addAddress:function(){var t="/page_product/pages/address/setAddress";this.fromPage&&(t+="?from=pay"),e.navigateTo({url:t})},getList:function(){var e=this;this.API.home.getMyReceiveAddrs({is_default:0}).then((function(t){console.log(t),e.list=t.data,e.list.map((function(t){e.$set(t,"show",!1)}))})).catch(function(){var t=(0,s.default)(i.default.mark((function t(n){return i.default.wrap((function(t){while(1)switch(t.prev=t.next){case 0:if(410!=n.code){t.next=4;break}return t.next=3,e.$store.dispatch("toLogon",{});case 3:e.getList();case 4:case"end":return t.stop()}}),t)})));return function(e){return t.apply(this,arguments)}}())},open:function(e){var t=this;this.list[e].show=!0,this.list.map((function(n,o){e!=o&&(t.list[o].show=!1)}))},submit:function(e){var t=this;console.log(e),this.API.user.delMyReceiveAddr({id:e.id}).then((function(e){t.getList()})).catch(function(){var n=(0,s.default)(i.default.mark((function n(o){return i.default.wrap((function(n){while(1)switch(n.prev=n.next){case 0:if(410!=o.code){n.next=4;break}return n.next=3,t.$store.dispatch("toLogon",{});case 3:t.submit(e);case 4:case"end":return n.stop()}}),n)})));return function(e){return n.apply(this,arguments)}}())}}};t.default=u}).call(this,n("543d")["default"])},d970:function(e,t,n){"use strict";n.r(t);var o=n("d6c9"),i=n.n(o);for(var s in o)["default"].indexOf(s)<0&&function(e){n.d(t,e,(function(){return o[e]}))}(s);t["default"]=i.a}},[["7f0e","common/runtime","common/vendor"]]]);