(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["page_product/pages/product/detail"],{"138b":function(n,e,t){"use strict";(function(n){var i=t("4ea4");Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0;var o=i(t("2eee")),u=i(t("c973")),r={components:{},data:function(){return{id:"",info:{},srcList:[],currentNum:0,buttonGroup:[{text:"立即购买",backgroundColor:"linear-gradient(-55deg, #FF812F, #FF9B5A)"}],options:[{icon:"dianpu",text:"店铺"},{icon:"kefu",text:"客服"},{icon:"star",text:"收藏"},{icon:"star-filled",text:"已收藏",color:"#2979ff"}]}},onLoad:function(n){this.id=n.id,this.getDetail()},methods:{buttonClick:function(e){if(console.log(e),"立即购买"==e.content.text){var t=[{id:this.id,num:1,pid:0,url:this.info.img_url,title:this.info.title,price:this.info.sale_price}];n.navigateTo({url:"/page_product/pages/product/pay?product="+encodeURIComponent(JSON.stringify(t))})}},previewImage:function(e){console.log(this.srcList),n.previewImage({current:e,urls:this.srcList})},getDetail:function(){var n=this;this.API.home.getTaskInfo({id:this.id}).then((function(e){console.log(e),n.info=e.data,n.srcList=n.info.img_url?n.info.img_url.split(","):[]})).catch(function(){var e=(0,u.default)(o.default.mark((function e(t){return o.default.wrap((function(e){while(1)switch(e.prev=e.next){case 0:if(410!=t.code){e.next=4;break}return e.next=3,n.$store.dispatch("toLogon",{});case 3:n.getDetail();case 4:case"end":return e.stop()}}),e)})));return function(n){return e.apply(this,arguments)}}())}}};e.default=r}).call(this,t("543d")["default"])},"24a5":function(n,e,t){"use strict";(function(n,e){var i=t("4ea4");t("f290");i(t("66fd"));var o=i(t("faed"));n.__webpack_require_UNI_MP_PLUGIN__=t,e(o.default)}).call(this,t("bc2e")["default"],t("543d")["createPage"])},"27fd":function(n,e,t){},5204:function(n,e,t){"use strict";var i=t("27fd"),o=t.n(i);o.a},c5b5:function(n,e,t){"use strict";t.r(e);var i=t("138b"),o=t.n(i);for(var u in i)["default"].indexOf(u)<0&&function(n){t.d(e,n,(function(){return i[n]}))}(u);e["default"]=o.a},d5a8:function(n,e,t){"use strict";t.d(e,"b",(function(){return o})),t.d(e,"c",(function(){return u})),t.d(e,"a",(function(){return i}));var i={uSwiper:function(){return Promise.all([t.e("common/vendor"),t.e("uni_modules/uview-ui/components/u-swiper/u-swiper")]).then(t.bind(null,"85a8"))},uImage:function(){return Promise.all([t.e("common/vendor"),t.e("uni_modules/uview-ui/components/u-image/u-image")]).then(t.bind(null,"8518"))},uDivider:function(){return Promise.all([t.e("common/vendor"),t.e("uni_modules/uview-ui/components/u-divider/u-divider")]).then(t.bind(null,"8973"))},uniGoodsNav:function(){return Promise.all([t.e("common/vendor"),t.e("uni_modules/uni-goods-nav/components/uni-goods-nav/uni-goods-nav")]).then(t.bind(null,"ce50"))}},o=function(){var n=this,e=n.$createElement,t=(n._self._c,n.srcList.length);n._isMounted||(n.e0=function(e){return n.currentNum=e.current}),n.$mp.data=Object.assign({},{$root:{g0:t}})},u=[]},faed:function(n,e,t){"use strict";t.r(e);var i=t("d5a8"),o=t("c5b5");for(var u in o)["default"].indexOf(u)<0&&function(n){t.d(e,n,(function(){return o[n]}))}(u);t("5204");var r=t("f0c5"),c=Object(r["a"])(o["default"],i["b"],i["c"],!1,null,"d492aa9c",null,!1,i["a"],void 0);e["default"]=c.exports}},[["24a5","common/runtime","common/vendor"]]]);