(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["pages/follow/personalhome"],{"07a2":function(t,e,n){},9116:function(t,e,n){"use strict";n.r(e);var i=n("a716"),o=n.n(i);for(var s in i)["default"].indexOf(s)<0&&function(t){n.d(e,t,(function(){return i[t]}))}(s);e["default"]=o.a},9238:function(t,e,n){"use strict";(function(t,e){var i=n("4ea4");n("f290");i(n("66fd"));var o=i(n("f37d"));t.__webpack_require_UNI_MP_PLUGIN__=n,e(o.default)}).call(this,n("bc2e")["default"],n("543d")["createPage"])},a716:function(t,e,n){"use strict";(function(t){var i=n("4ea4");Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0;var o=i(n("2eee")),s=i(n("9523")),r=i(n("c973"));function a(t,e){var n=Object.keys(t);if(Object.getOwnPropertySymbols){var i=Object.getOwnPropertySymbols(t);e&&(i=i.filter((function(e){return Object.getOwnPropertyDescriptor(t,e).enumerable}))),n.push.apply(n,i)}return n}function u(t){for(var e=1;e<arguments.length;e++){var n=null!=arguments[e]?arguments[e]:{};e%2?a(Object(n),!0).forEach((function(e){(0,s.default)(t,e,n[e])})):Object.getOwnPropertyDescriptors?Object.defineProperties(t,Object.getOwnPropertyDescriptors(n)):a(Object(n)).forEach((function(e){Object.defineProperty(t,e,Object.getOwnPropertyDescriptor(n,e))}))}return t}var c={data:function(){return{schoolOneTitleIndex:0,userInfo:{},isLoading:"loading",theGetMomentsListPage:1,theGetMomentsListPagesize:10,contentText:{contentdown:"查看更多",contentrefresh:"加载中...",contentnomore:"到底了，可点击此处手动加载~"},current:0,inviteId:"",list:[{label:"动态",value:0}],id:"",theLogonUser:{},contentHeight:0,shopList:[]}},onPullDownRefresh:function(){var e=this;this.theGetMomentsListPage=1,this.shopList=[],(0,r.default)(o.default.mark((function n(){return o.default.wrap((function(n){while(1)switch(n.prev=n.next){case 0:return n.next=2,e.getList();case 2:t.stopPullDownRefresh();case 3:case"end":return n.stop()}}),n)})))()},onReachBottom:function(){this.isLoading="loading",this.getList()},onLoad:function(e){var n=this,i=t.createSelectorQuery().in(this);i.select(".mall-top").boundingClientRect((function(t){n.contentHeight=t.height})).exec(),e.id&&(this.id=e.id,this.getDetail())},onShareAppMessage:function(t){if(console.log(t,this.inviteId),"button"==t.from)return{title:this.inviteId.title,path:"/pages/index/detail?id=".concat(this.inviteId.id),imageUrl:this.inviteId.url?this.inviteId.url.split(",")[0]:"/static/icon-zd.png"}},methods:{zuduiButtons:function(){var e=(0,r.default)(o.default.mark((function e(n){var i,s;return o.default.wrap((function(e){while(1)switch(e.prev=e.next){case 0:if(1!=n.type){e.next=7;break}return i=n.is_entry,e.next=4,this.$store.dispatch("toEntry",{id:n.id,is_entry:n.is_entry});case 4:if(1==this.$store.state.is_entry_true)for(s=0;s<this.shopList.length;s++)n.id==this.shopList[s].id&&(2==i?(this.$set(this.shopList[s],"entry_num",this.shopList[s].entry_num+1),this.$set(this.shopList[s],"is_entry",1),t.showToast({title:"加入成功",duration:1e3,icon:"none"})):(this.$set(this.shopList[s],"entry_num",this.shopList[s].entry_num-1),this.$set(this.shopList[s],"is_entry",2),t.showToast({title:"已退出组队",duration:1e3,icon:"none"})));e.next=8;break;case 7:this.inviteId=n;case 8:case"end":return e.stop()}}),e,this)})));return function(t){return e.apply(this,arguments)}}(),actionMore:function(e){var n=this,i=e.is_collection,s=[2==e.is_collection?"收藏":"取消收藏"];t.showActionSheet({itemList:s,itemColor:"#333333",success:function(a){if(["收藏","取消收藏"].includes(s[a.tapIndex])){var u=n;(0,r.default)(o.default.mark((function n(){var s;return o.default.wrap((function(n){while(1)switch(n.prev=n.next){case 0:return n.next=2,u.$store.dispatch("toCollection",{id:e.id});case 2:if(1==u.$store.state.is_collection_true)for(s=0;s<u.shopList.length;s++)e.id==u.shopList[s].id&&(2==i?(u.$set(u.shopList[s],"is_collection",1),t.showToast({title:"收藏成功",duration:1e3,icon:"none"})):(u.$set(u.shopList[s],"is_collection",2),t.showToast({title:"已取消收藏",duration:1e3,icon:"none"})));case 3:case"end":return n.stop()}}),n)})))()}},fail:function(t){}})},toFans:function(){t.navigateTo({url:"/page_product/pages/fans/index?userId="+this.id+"&name="+this.userInfo.nick_name})},toSearch:function(){t.navigateTo({url:"/page_product/pages/search/index?shopId="+this.id})},getTime:function(){if(this.userInfo.last_login_at)return this.$public.showDateTime(this.userInfo.last_login_at)},toThumb:function(){var e=(0,r.default)(o.default.mark((function e(n){var i,s;return o.default.wrap((function(e){while(1)switch(e.prev=e.next){case 0:return i=n.is_thumb,e.next=3,this.$store.dispatch("toThumb",{id:n.id,is_thumb:n.is_thumb});case 3:if(1==this.$store.state.is_thumb_true)for(s=0;s<this.shopList.length;s++)n.id==this.shopList[s].id&&(2==i?(this.$set(this.shopList[s],"thumb_num",this.shopList[s].thumb_num+1),this.$set(this.shopList[s],"is_thumb",1),t.showToast({title:"点赞成功",duration:1e3,icon:"none"})):(this.$set(this.shopList[s],"thumb_num",this.shopList[s].thumb_num-1),this.$set(this.shopList[s],"is_thumb",2),t.showToast({title:"已取消点赞",duration:1e3,icon:"none"})));case 4:case"end":return e.stop()}}),e,this)})));return function(t){return e.apply(this,arguments)}}(),topPerSonalhome:function(e){2==e.is_anonymous?t.navigateTo({url:"/pages/follow/personalhome?id="+e.id}):t.showToast({title:"这个人很神秘，不想让你看到TA的主页~",duration:2500,icon:"none"})},toDetail:function(e){t.navigateTo({url:"/pages/index/detail?id="+e})},toJzDetail:function(e){t.navigateTo({url:"/pages/index/detail?id="+e+"&noPhone=1"})},goDetail:function(e){t.navigateTo({url:"/page_product/pages/product/detail?id="+e.id})},followHandle:function(){var t=this;this.API.order.regard({to_user_id:this.userInfo.id}).then((function(e){console.log(e.data),t.getDetail("follow")})).catch(function(){var e=(0,r.default)(o.default.mark((function e(n){return o.default.wrap((function(e){while(1)switch(e.prev=e.next){case 0:if(410!=n.code){e.next=4;break}return e.next=3,t.$store.dispatch("toLogon",{});case 3:t.followHandle();case 4:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}())},changeTab:function(t){console.log(t),this.current=t,this.theGetMomentsListPage=1,this.shopList=[],this.getList()},getList:function(){var t=this;return(0,r.default)(o.default.mark((function e(){var n,i,s;return o.default.wrap((function(e){while(1)switch(e.prev=e.next){case 0:return t.isLoading="loading",n="",i={page:t.theGetMomentsListPage,pagesize:t.theGetMomentsListPagesize},e.prev=3,i=u(u({},i),{},{create_id:t.id,is_anonymous:2}),e.next=7,t.API.order.getMomentsList(i);case 7:if(n=e.sent,0==n.code)if(console.log(n),1==t.theGetMomentsListPage&&(t.shopList=[]),0!=n.data.length){for(s=0;s<n.data.length;s++)t.shopList.push(u({},n.data[s]));t.isLoading="no-more",t.theGetMomentsListPage+=1}else t.isLoading="no-more";e.next=17;break;case 11:if(e.prev=11,e.t0=e["catch"](3),410!=e.t0.code){e.next=17;break}return e.next=16,t.$store.dispatch("toLogon",{});case 16:t.getList();case 17:case"end":return e.stop()}}),e,null,[[3,11]])})))()},getDetail:function(){var t=this,e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:"";this.API.order.getHomePageTop({user_id:this.id}).then((function(n){console.log(n.data),t.userInfo=n.data,t.theLogonUser=t.$store.state.theLogonUser,e||t.getList()})).catch(function(){var e=(0,r.default)(o.default.mark((function e(n){return o.default.wrap((function(e){while(1)switch(e.prev=e.next){case 0:if(410!=n.code){e.next=4;break}return e.next=3,t.$store.dispatch("toLogon",{});case 3:t.getDetail();case 4:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}())}}};e.default=c}).call(this,n("543d")["default"])},ac96:function(t,e,n){"use strict";n.d(e,"b",(function(){return o})),n.d(e,"c",(function(){return s})),n.d(e,"a",(function(){return i}));var i={postTypeZudui:function(){return n.e("uni_modules/post-type-zudui/components/post-type-zudui/post-type-zudui").then(n.bind(null,"8625"))},uniLoadMore:function(){return Promise.all([n.e("common/vendor"),n.e("uni_modules/uni-load-more/components/uni-load-more/uni-load-more")]).then(n.bind(null,"db88"))}},o=function(){var t=this.$createElement,e=(this._self._c,this.getTime());this.$mp.data=Object.assign({},{$root:{m0:e}})},s=[]},ca90:function(t,e,n){"use strict";var i=n("07a2"),o=n.n(i);o.a},f37d:function(t,e,n){"use strict";n.r(e);var i=n("ac96"),o=n("9116");for(var s in o)["default"].indexOf(s)<0&&function(t){n.d(e,t,(function(){return o[t]}))}(s);n("ca90");var r=n("f0c5"),a=Object(r["a"])(o["default"],i["b"],i["c"],!1,null,"2d62ecb1",null,!1,i["a"],void 0);e["default"]=a.exports}},[["9238","common/runtime","common/vendor"]]]);