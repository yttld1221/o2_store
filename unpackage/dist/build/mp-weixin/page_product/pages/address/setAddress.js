require('../../common/vendor.js');(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["page_product/pages/address/setAddress"],{"03f1":function(e,t,n){"use strict";n.d(t,"b",(function(){return o})),n.d(t,"c",(function(){return i})),n.d(t,"a",(function(){return r}));var r={uForm:function(){return Promise.all([n.e("common/vendor"),n.e("uni_modules/uview-ui/components/u-form/u-form")]).then(n.bind(null,"b266"))},uFormItem:function(){return Promise.all([n.e("common/vendor"),n.e("uni_modules/uview-ui/components/u-form-item/u-form-item")]).then(n.bind(null,"e425"))},uInput:function(){return Promise.all([n.e("common/vendor"),n.e("uni_modules/uview-ui/components/u-input/u-input")]).then(n.bind(null,"01b6"))},"u-Textarea":function(){return Promise.all([n.e("common/vendor"),n.e("uni_modules/uview-ui/components/u--textarea/u--textarea")]).then(n.bind(null,"550f"))},uSwitch:function(){return Promise.all([n.e("common/vendor"),n.e("uni_modules/uview-ui/components/u-switch/u-switch")]).then(n.bind(null,"728d"))}},o=function(){var e=this.$createElement;this._self._c},i=[]},"12d4":function(e,t,n){"use strict";var r=n("9a76"),o=n.n(r);o.a},"3dee":function(e,t,n){"use strict";(function(e,t){var r=n("4ea4");n("f290");r(n("66fd"));var o=r(n("8035"));e.__webpack_require_UNI_MP_PLUGIN__=n,t(o.default)}).call(this,n("bc2e")["default"],n("543d")["createPage"])},4301:function(e,t,n){"use strict";(function(e){var r=n("4ea4");Object.defineProperty(t,"__esModule",{value:!0}),t.default=void 0;var o=r(n("2eee")),i=r(n("c973")),u=r(n("9523"));function a(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);t&&(r=r.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,r)}return n}function c(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?a(Object(n),!0).forEach((function(t){(0,u.default)(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):a(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}var s={components:{cityPicker:function(){Promise.all([n.e("page_product/common/vendor"),n.e("page_product/components/piaoyi-cityPicker/piaoyi-cityPicker")]).then(function(){return resolve(n("9b8f"))}.bind(null,n)).catch(n.oe)}},data:function(){var e=this;return{column:3,visible:!1,fromPage:"",errorType:["message"],form:{name:"",phone:"",addressText:"",area_code:"",addr:"",is_default:2},rules:{name:[{required:!0,message:"请输入收货人姓名",trigger:["change","blur"]}],phone:[{required:!0,message:"请输入手机号",trigger:["change","blur"]},{validator:function(t,n,r){return e.$u.test.mobile(n)},message:"手机号码不正确",trigger:["change","blur"]}],addressText:[{required:!0,message:"请选择地区",trigger:["change","blur"]}],addr:[{required:!0,message:"请输入详细地址",trigger:["change","blur"]}],submitBack:!1}}},onLoad:function(t){if(t.from&&(this.fromPage=t.from),t.data){var n=JSON.parse(decodeURIComponent(t.data));console.log(n),this.form=c(c({},n),{},{addressText:n.complete_addr}),e.setNavigationBarTitle({title:"编辑收货地址"})}},methods:{save:function(){var t=this;console.log(1111),this.$refs.uForm.validate().then((function(n){var r=c({},t.form);t.API.home.saveReceiveAddr(r).then((function(t){console.log(t),e.navigateBack(),e.showToast({title:"保存成功",duration:2500,icon:"none"})})).catch(function(){var e=(0,i.default)(o.default.mark((function e(n){return o.default.wrap((function(e){while(1)switch(e.prev=e.next){case 0:if(410!=n.code){e.next=4;break}return e.next=3,t.$store.dispatch("toLogon",{});case 3:t.save();case 4:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}())}))},openPick:function(){this.visible=!0},confirm:function(e){console.log(e),this.form.area_code=e.code,this.form.addressText=e.name,this.visible=!1},cancel:function(){this.visible=!1}},onReady:function(){this.$refs.uForm.setRules(this.rules)}};t.default=s}).call(this,n("543d")["default"])},"7f54":function(e,t,n){"use strict";n.r(t);var r=n("4301"),o=n.n(r);for(var i in r)["default"].indexOf(i)<0&&function(e){n.d(t,e,(function(){return r[e]}))}(i);t["default"]=o.a},8035:function(e,t,n){"use strict";n.r(t);var r=n("03f1"),o=n("7f54");for(var i in o)["default"].indexOf(i)<0&&function(e){n.d(t,e,(function(){return o[e]}))}(i);n("12d4");var u=n("f0c5"),a=Object(u["a"])(o["default"],r["b"],r["c"],!1,null,"63d99a7c",null,!1,r["a"],void 0);t["default"]=a.exports},"9a76":function(e,t,n){}},[["3dee","common/runtime","common/vendor"]]]);