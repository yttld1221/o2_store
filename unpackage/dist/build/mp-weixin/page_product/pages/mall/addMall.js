require('../../common/vendor.js');(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["page_product/pages/mall/addMall"],{4722:function(e,t,n){"use strict";var r=n("9278"),o=n.n(r);o.a},"59ec":function(e,t,n){"use strict";(function(e){var r=n("4ea4");Object.defineProperty(t,"__esModule",{value:!0}),t.default=void 0;var o=r(n("2eee")),a=r(n("9523")),c=r(n("c973")),i=n("760f");function u(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);t&&(r=r.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,r)}return n}function s(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?u(Object(n),!0).forEach((function(t){(0,a.default)(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):u(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}var l={components:{},data:function(){return{tips:"",seconds:60,addressArr:[],ruleForm:{person:"",phone:"",check_code:"",merchant:"",area_code:"",apply_id_card1:"",apply_id_card2:"",business_license:"",remark:"",area_text:""},id:""}},onLoad:function(t){var n=this;this.getArea(),t.id&&(this.id=t.id,this.getDetail()),e.$on("changeArea",(function(e){console.log(e),n.ruleForm.area_code=e.code,console.log(n.addressArr),n.getAddText(e.code)}))},methods:{getAddText:function(e){var t=this;this.addressArr.forEach((function(n){n.children.forEach((function(r){r.value==e&&t.$set(t.ruleForm,"area_text",n.label+r.label)}))}))},getDetail:function(){var e=this;this.API.order.getMyApplyShopInfo({}).then(function(){var t=(0,c.default)(o.default.mark((function t(n){return o.default.wrap((function(t){while(1)switch(t.prev=t.next){case 0:console.log(n.data),e.ruleForm=s(s({},n.data),{},{check_code:""}),e.getAddText(n.data.area_code);case 3:case"end":return t.stop()}}),t)})));return function(e){return t.apply(this,arguments)}}()).catch(function(){var t=(0,c.default)(o.default.mark((function t(n){return o.default.wrap((function(t){while(1)switch(t.prev=t.next){case 0:if(410!=n.code){t.next=4;break}return t.next=3,e.$store.dispatch("toLogon",{});case 3:e.getDetail();case 4:case"end":return t.stop()}}),t)})));return function(e){return t.apply(this,arguments)}}())},codeChange:function(e){this.tips=e},getCode:function(){var t=this;return(0,c.default)(o.default.mark((function n(){var r;return o.default.wrap((function(n){while(1)switch(n.prev=n.next){case 0:if(t.ruleForm.phone){n.next=3;break}return e.showToast({title:"请输入您的手机号码",icon:"none"}),n.abrupt("return");case 3:if(r=e.$u.test.mobile(t.ruleForm.phone),r){n.next=7;break}return e.showToast({title:"手机号码不合法",icon:"none"}),n.abrupt("return");case 7:if(!t.$refs.uCode.canGetCode){n.next=13;break}return n.next=10,t.postCode();case 10:t.$refs.uCode.start(),n.next=14;break;case 13:e.showToast({title:"倒计时结束后再发送",icon:"none"});case 14:case"end":return n.stop()}}),n)})))()},postCode:function(){var t=this,n={phone:this.ruleForm.phone,type:2};this.API.order.sendSmsCheckCode(n).then((function(t){e.showToast({title:"验证码已发送",icon:"none"})})).catch(function(){var e=(0,c.default)(o.default.mark((function e(n){return o.default.wrap((function(e){while(1)switch(e.prev=e.next){case 0:if(410!=n.code){e.next=4;break}return e.next=3,t.$store.dispatch("toLogon",{});case 3:t.postCode();case 4:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}())},delFile:function(e){this.$set(this.ruleForm,e,"")},addSubmit:function(){var t=this,n={person:"请输入名字",phone:"请输入您的手机号码",check_code:"请输入短信验证码",merchant:"请输入工作室名称",area_code:"请选择开放区域",apply_id_card1:"请上传头像面",apply_id_card2:"请上传国徽面",business_license:"请上传营业执照"},r=!0;for(var a in n)if(!this.ruleForm[a])return r=!1,void e.showToast({title:n[a],duration:2500,icon:"none"});if(r){var i=s({},this.ruleForm);this.id&&delete i.id,this.API.order.applyShop(i).then(function(){var n=(0,c.default)(o.default.mark((function n(r){return o.default.wrap((function(n){while(1)switch(n.prev=n.next){case 0:return n.next=2,t.$store.dispatch("toLogon",{});case 2:e.navigateBack({delta:1,success:function(){e.showToast({title:"申请成功",icon:"none"})}});case 3:case"end":return n.stop()}}),n)})));return function(e){return n.apply(this,arguments)}}()).catch(function(){var e=(0,c.default)(o.default.mark((function e(n){return o.default.wrap((function(e){while(1)switch(e.prev=e.next){case 0:if(410!=n.code){e.next=4;break}return e.next=3,t.$store.dispatch("toLogon",{});case 3:t.addSubmit();case 4:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}())}},prewFile:function(t){e.previewImage({current:0,urls:[t]})},getArea:function(){var e=this;this.addressArr=[],i.addressList.forEach((function(t){e.addressArr.push({value:t.code,label:t.name,children:t.children.map((function(e){return{value:e.code+"00",label:e.name}}))})}))},chooseArea:function(){e.navigateTo({url:"/pages/index/address?type=mall"})},chooseMedia:function(t){var n=this;e.chooseMedia({count:1,mediaType:["image"],sourceType:["album","camera"],success:function(r){var a=r.tempFiles;console.log(a),a.forEach((function(r){n.API.order.getOssUploadSign({type:"img"}).then((function(o){console.log(o);var a=r.tempFilePath.substring(r.tempFilePath.lastIndexOf(".")+1),c="".concat(o.data.dir).concat(n.$public.getNowDateTime(),"_mall_0_").concat(n.$store.state.theLogonUser.id,".").concat(a);console.log(c,"key"),e.uploadFile({url:o.data.host,filePath:r.tempFilePath,formData:{key:c,policy:o.data.policy,OssAccessKeyId:o.data.accessid,success_action_status:"200",signature:o.data.signature},name:"file",success:function(e){console.log(e),200==e.statusCode&&n.$set(n.ruleForm,t,"".concat(o.data.host,"/").concat(c))},fail:function(e){console.error("upload fail:",e)}})})).catch(function(){var t=(0,c.default)(o.default.mark((function t(r){return o.default.wrap((function(t){while(1)switch(t.prev=t.next){case 0:if(410!=r.code){t.next=4;break}return t.next=3,n.$store.dispatch("toLogon",{});case 3:e.showToast({title:"网络失败，请重试！",duration:2500,icon:"none"});case 4:case"end":return t.stop()}}),t)})));return function(e){return t.apply(this,arguments)}}())}))},fail:function(e){console.error("choose media fail:",e)}})}}};t.default=l}).call(this,n("543d")["default"])},"711c":function(e,t,n){"use strict";n.r(t);var r=n("7f67"),o=n("bea7");for(var a in o)["default"].indexOf(a)<0&&function(e){n.d(t,e,(function(){return o[e]}))}(a);n("4722");var c=n("f0c5"),i=Object(c["a"])(o["default"],r["b"],r["c"],!1,null,"4fb31265",null,!1,r["a"],void 0);t["default"]=i.exports},7997:function(e,t,n){"use strict";(function(e,t){var r=n("4ea4");n("f290");r(n("66fd"));var o=r(n("711c"));e.__webpack_require_UNI_MP_PLUGIN__=n,t(o.default)}).call(this,n("bc2e")["default"],n("543d")["createPage"])},"7f67":function(e,t,n){"use strict";n.d(t,"b",(function(){return o})),n.d(t,"c",(function(){return a})),n.d(t,"a",(function(){return r}));var r={"u-Input":function(){return Promise.all([n.e("common/vendor"),n.e("uni_modules/uview-ui/components/u--input/u--input")]).then(n.bind(null,"9703"))},uCode:function(){return Promise.all([n.e("common/vendor"),n.e("uni_modules/uview-ui/components/u-code/u-code")]).then(n.bind(null,"559d"))},uButton:function(){return Promise.all([n.e("common/vendor"),n.e("uni_modules/uview-ui/components/u-button/u-button")]).then(n.bind(null,"3d95"))},uIcon:function(){return Promise.all([n.e("common/vendor"),n.e("uni_modules/uview-ui/components/u-icon/u-icon")]).then(n.bind(null,"7e9b"))},"u-Textarea":function(){return Promise.all([n.e("common/vendor"),n.e("uni_modules/uview-ui/components/u--textarea/u--textarea")]).then(n.bind(null,"550f"))}},o=function(){var e=this.$createElement;this._self._c},a=[]},9278:function(e,t,n){},bea7:function(e,t,n){"use strict";n.r(t);var r=n("59ec"),o=n.n(r);for(var a in r)["default"].indexOf(a)<0&&function(e){n.d(t,e,(function(){return r[e]}))}(a);t["default"]=o.a}},[["7997","common/runtime","common/vendor"]]]);