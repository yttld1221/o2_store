require('../../common/vendor.js');(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["page_product/pages/product/detail"],{"138b":function(e,t,n){"use strict";(function(e){var i=n("4ea4");Object.defineProperty(t,"__esModule",{value:!0}),t.default=void 0;var o=i(n("2eee")),r=i(n("c973")),u={components:{},data:function(){return{id:"",info:{},srcList:[],detailSrc:[],currentNum:0,buttonGroup:[{text:"立即购买",backgroundColor:"linear-gradient(-55deg, #FF812F, #FF9B5A)"}],options:[{icon:"dianpu",text:"店铺"},{icon:"kefu",text:"客服"},{icon:"star",text:"收藏"},{icon:"star-filled",text:"已收藏",color:"#2979ff"}]}},onLoad:function(t){e.showShareMenu({menus:["shareAppMessage"],success:function(e){console.log(e)},fail:function(e){console.log(e)}}),this.id=t.id,this.getDetail()},methods:{onClick:function(t){var n=this;if(0==t.index){if(!this.info.apply_id)return;e.navigateTo({url:"/page_product/pages/mall/index?id="+this.info.shop_id+"&userId="+this.info.apply_id})}else 1==t.index?e.showToast({title:"功能暂未开放",duration:2500,icon:"none"}):this.API.home.collection({task_id:this.id}).then((function(t){console.log(t),e.showToast({title:1==n.info.is_collection?"取消收藏成功":"收藏成功",duration:2500,icon:"none"}),n.getDetail()})).catch(function(){var e=(0,r.default)(o.default.mark((function e(i){return o.default.wrap((function(e){while(1)switch(e.prev=e.next){case 0:if(410!=i.code){e.next=4;break}return e.next=3,n.$store.dispatch("toLogon",{});case 3:n.onClick(t);case 4:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}())},buttonClick:function(t){if(console.log(t),this.$store.state.theLogonUser.level<this.info.buy_level)return e.navigateTo({url:"/page_product/pages/info/register?level="+this.$store.state.theLogonUser.level}),!1;if("立即购买"==t.content.text){var n=[{id:this.id,num:1,url:this.info.img_url?this.info.img_url.split(",")[0]:"",title:this.info.title,price:this.info.sale_price}];e.navigateTo({url:"/page_product/pages/product/pay?product="+encodeURIComponent(JSON.stringify(n))})}},previewImage:function(t){console.log(this.srcList),e.previewImage({current:t,urls:this.srcList})},getDetail:function(){var e=this;this.API.home.getTaskInfo({id:this.id}).then((function(t){console.log(t),e.info=t.data,e.srcList=e.info.img_url?e.info.img_url.split(","):[],e.detailSrc=e.info.content_html?e.info.content_html.split(","):[]})).catch(function(){var t=(0,r.default)(o.default.mark((function t(n){return o.default.wrap((function(t){while(1)switch(t.prev=t.next){case 0:if(410!=n.code){t.next=4;break}return t.next=3,e.$store.dispatch("toLogon",{});case 3:e.getDetail();case 4:case"end":return t.stop()}}),t)})));return function(e){return t.apply(this,arguments)}}())}}};t.default=u}).call(this,n("543d")["default"])},"24a5":function(e,t,n){"use strict";(function(e,t){var i=n("4ea4");n("f290");i(n("66fd"));var o=i(n("faed"));e.__webpack_require_UNI_MP_PLUGIN__=n,t(o.default)}).call(this,n("bc2e")["default"],n("543d")["createPage"])},6348:function(e,t,n){"use strict";var i=n("cb44"),o=n.n(i);o.a},a383:function(e,t,n){"use strict";n.d(t,"b",(function(){return o})),n.d(t,"c",(function(){return r})),n.d(t,"a",(function(){return i}));var i={uSwiper:function(){return Promise.all([n.e("common/vendor"),n.e("uni_modules/uview-ui/components/u-swiper/u-swiper")]).then(n.bind(null,"85a8"))},uImage:function(){return Promise.all([n.e("common/vendor"),n.e("uni_modules/uview-ui/components/u-image/u-image")]).then(n.bind(null,"8518"))},uDivider:function(){return Promise.all([n.e("common/vendor"),n.e("uni_modules/uview-ui/components/u-divider/u-divider")]).then(n.bind(null,"8973"))},uniGoodsNav:function(){return Promise.all([n.e("common/vendor"),n.e("uni_modules/uni-goods-nav/components/uni-goods-nav/uni-goods-nav")]).then(n.bind(null,"ce50"))}},o=function(){var e=this,t=e.$createElement,n=(e._self._c,e.srcList.length);e._isMounted||(e.e0=function(t){return e.currentNum=t.current}),e.$mp.data=Object.assign({},{$root:{g0:n}})},r=[]},c5b5:function(e,t,n){"use strict";n.r(t);var i=n("138b"),o=n.n(i);for(var r in i)["default"].indexOf(r)<0&&function(e){n.d(t,e,(function(){return i[e]}))}(r);t["default"]=o.a},cb44:function(e,t,n){},faed:function(e,t,n){"use strict";n.r(t);var i=n("a383"),o=n("c5b5");for(var r in o)["default"].indexOf(r)<0&&function(e){n.d(t,e,(function(){return o[e]}))}(r);n("6348");var u=n("f0c5"),c=Object(u["a"])(o["default"],i["b"],i["c"],!1,null,"66c16f82",null,!1,i["a"],void 0);t["default"]=c.exports}},[["24a5","common/runtime","common/vendor"]]]);