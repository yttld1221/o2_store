require('../../common/vendor.js');(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["page_product/pages/order/index"],{"16da":function(e,t,n){"use strict";n.r(t);var r=n("1735"),i=n("a19a");for(var o in i)["default"].indexOf(o)<0&&function(e){n.d(t,e,(function(){return i[e]}))}(o);n("5469");var a=n("f0c5"),c=Object(a["a"])(i["default"],r["b"],r["c"],!1,null,"cd589468",null,!1,r["a"],void 0);t["default"]=c.exports},1735:function(e,t,n){"use strict";n.d(t,"b",(function(){return i})),n.d(t,"c",(function(){return o})),n.d(t,"a",(function(){return r}));var r={uIcon:function(){return Promise.all([n.e("common/vendor"),n.e("uni_modules/uview-ui/components/u-icon/u-icon")]).then(n.bind(null,"7e9b"))},uniLoadMore:function(){return Promise.all([n.e("common/vendor"),n.e("uni_modules/uni-load-more/components/uni-load-more/uni-load-more")]).then(n.bind(null,"db88"))},uModal:function(){return Promise.all([n.e("common/vendor"),n.e("uni_modules/uview-ui/components/u-modal/u-modal")]).then(n.bind(null,"2474"))}},i=function(){var e=this,t=e.$createElement,n=(e._self._c,e.__map(e.orderList,(function(t,n){var r=e.__get_orig(t),i=5==e.current||0==e.current&&t.refund_id>0&&[1,2].includes(t.refund_check_status),o=1!=t.status?[2,3,5].includes(t.status)&&(!t.refund_id||t.refund_id>0&&3==t.refund_check_status):null,a=[1].includes(t.status);return{$orig:r,g0:i,g1:o,g2:a}})));e.$mp.data=Object.assign({},{$root:{l0:n}})},o=[]},"234f":function(e,t,n){"use strict";(function(e){var r=n("4ea4");Object.defineProperty(t,"__esModule",{value:!0}),t.default=void 0;var i=r(n("2eee")),o=r(n("9523")),a=r(n("c973"));function c(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);t&&(r=r.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,r)}return n}function s(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?c(Object(n),!0).forEach((function(t){(0,o.default)(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):c(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}var u={components:{},data:function(){return{clickAble:!0,content:"",delId:0,handleIndex:"",show:!1,contentText:{contentdown:"查看更多",contentrefresh:"加载中...",contentnomore:"到底了，可点击此处手动加载~"},isLoading:"loading",btnText:{2:"申请退款",5:"确认收货",3:"立即评价"},statusText:{1:"待支付",2:"待发货",5:"待收货",3:"待评价",6:"已完成",4:"已取消"},refundText:{1:"退款中",2:"退款成功",3:"退款失败"},line_4_items:[{label:"全部",value:0},{label:"待支付",value:1},{label:"待发货",value:2},{label:"待收货",value:5},{label:"待评价",value:3},{label:"退款/售后",value:0}],current:0,theGetMomentsListPage:1,theGetMomentsListPagesize:5,orderList:[],contentHeight:0}},onLoad:function(t){var n=this;t.current&&(this.current=t.current);var r=e.createSelectorQuery().in(this);r.select(".the-line-4").boundingClientRect((function(e){n.contentHeight=e.height})).exec(),this.theGetMomentsListPage=1,this.getMomentsList(),e.$on("changeTab",(function(e){console.log(e),n.line_4_itemsSelected(e)}))},onShow:function(){},onReachBottom:function(){this.isLoading="loading",this.getMomentsList()},onPullDownRefresh:function(){var t=this;this.theGetMomentsListPage=1,this.orderList=[],(0,a.default)(i.default.mark((function n(){return i.default.wrap((function(n){while(1)switch(n.prev=n.next){case 0:return n.next=2,t.getMomentsList();case 2:e.stopPullDownRefresh();case 3:case"end":return n.stop()}}),n)})))()},methods:{confirmDel:function(){var t=this;return(0,a.default)(i.default.mark((function n(){var r;return i.default.wrap((function(n){while(1)switch(n.prev=n.next){case 0:if(r="","del"!=t.content){n.next=7;break}return n.next=4,t.API.order.delOrder({id:t.delId});case 4:r=n.sent,n.next=16;break;case 7:if("send"!=t.content){n.next=13;break}return n.next=10,t.API.order.checkOrder({id:t.delId});case 10:r=n.sent,n.next=16;break;case 13:return n.next=15,t.API.order.cancelOrder({id:t.delId});case 15:r=n.sent;case 16:console.log(r),n.prev=17,0==r.code&&("del"==t.content?t.orderList.splice(t.handleIndex,1):"send"==t.content?t.line_4_itemsSelected(4):t.$set(t.orderList[t.handleIndex],"status",4),e.showToast({title:"del"==t.content?"订单删除成功":"send"==t.content?"确认收货成功":"订单取消成功",duration:2500,icon:"none"}),t.cancelDel()),n.next=27;break;case 21:if(n.prev=21,n.t0=n["catch"](17),410!=n.t0.code){n.next=27;break}return n.next=26,t.$store.dispatch("toLogon",{});case 26:t.confirmDel();case 27:case"end":return n.stop()}}),n,null,[[17,21]])})))()},toHandle:function(t,n){1==t.status?this.toPay(t):2==t.status?e.navigateTo({url:"/page_product/pages/order/refund?id=".concat(t.id,"&from=all")}):3==t.status?e.navigateTo({url:"/page_product/pages/order/evaluate?id=".concat(t.id,"&from=all")}):5==t.status&&this.delOrder(t,n,"send")},toPay:function(t){var n=this;this.clickAble&&(this.clickAble=!1,this.API.order.rePayForPrePayId({id:t.id}).then((function(r){setTimeout((function(){n.clickAble=!0}),1e3);var i=r.data;e.requestPayment({provider:"wxpay",timeStamp:i.timeStamp,nonceStr:i.nonceStr,package:i.package,signType:i.signType,paySign:i.paySign,success:function(e){n.getDetail(t.id)},fail:function(t){e.showToast({title:"支付取消",icon:"none"})}})})).finally((function(){n.clickAble=!0})).catch(function(){var e=(0,a.default)(i.default.mark((function e(r){return i.default.wrap((function(e){while(1)switch(e.prev=e.next){case 0:if(410!=r.code){e.next=5;break}return e.next=3,n.$store.dispatch("toLogon",{});case 3:n.clickAble=!0,n.toPay(t);case 5:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}()))},getDetail:function(t){var n=this,r=setInterval((function(){n.API.order.getMyOrderInfo({id:t}).then((function(t){clearInterval(r),console.log(t),[2,3].includes(t.data.status)&&(e.showToast({title:"支付成功",icon:"none"}),n.line_4_itemsSelected(2))})).catch(function(){var e=(0,a.default)(i.default.mark((function e(o){return i.default.wrap((function(e){while(1)switch(e.prev=e.next){case 0:if(410!=o.code){e.next=5;break}return clearInterval(r),e.next=4,n.$store.dispatch("toLogon",{});case 4:n.getDetail(t);case 5:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}())}),1e3)},cancelDel:function(){this.show=!1},getMomentsList:function(){var e=this;this.isLoading="loading";var t={page:this.theGetMomentsListPage,pagesize:this.theGetMomentsListPagesize,status:this.line_4_items[this.current].value,refund_id:5==this.current?1:0};this.API.order.getMyOrderList(t).then((function(t){if(console.log(t),1==e.theGetMomentsListPage&&(e.orderList=[]),0!=t.data.length){[0,5].includes(e.current)||(t.data=t.data.filter((function(e){return!e.refund_id||e.refund_id>0&&3==e.refund_check_status})));for(var n=0;n<t.data.length;n++)e.orderList.push(s(s({},t.data[n]),{},{img_url:t.data[n].img_url?t.data[n].img_url.split(",")[0]:""}));e.isLoading="no-more",e.theGetMomentsListPage+=1}else e.isLoading="no-more"})).catch(function(){var t=(0,a.default)(i.default.mark((function t(n){return i.default.wrap((function(t){while(1)switch(t.prev=t.next){case 0:if(410!=n.code){t.next=4;break}return t.next=3,e.$store.dispatch("toLogon",{});case 3:e.getMomentsList();case 4:case"end":return t.stop()}}),t)})));return function(e){return t.apply(this,arguments)}}())},line_4_itemsSelected:function(e){this.current=e,this.orderList=[],this.theGetMomentsListPage=1,this.getMomentsList()},toDetail:function(t){e.navigateTo({url:"/page_product/pages/order/detail?id="+t.id})},delOrder:function(e,t,n){this.content=n,this.delId=e.id,this.handleIndex=t,this.show=!0}}};t.default=u}).call(this,n("543d")["default"])},5469:function(e,t,n){"use strict";var r=n("6693"),i=n.n(r);i.a},6693:function(e,t,n){},"7b04":function(e,t,n){"use strict";(function(e,t){var r=n("4ea4");n("f290");r(n("66fd"));var i=r(n("16da"));e.__webpack_require_UNI_MP_PLUGIN__=n,t(i.default)}).call(this,n("bc2e")["default"],n("543d")["createPage"])},a19a:function(e,t,n){"use strict";n.r(t);var r=n("234f"),i=n.n(r);for(var o in r)["default"].indexOf(o)<0&&function(e){n.d(t,e,(function(){return r[e]}))}(o);t["default"]=i.a}},[["7b04","common/runtime","common/vendor"]]]);