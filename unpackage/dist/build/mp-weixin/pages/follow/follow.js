(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["pages/follow/follow"],{"1b88":function(t,e,n){},3055:function(t,e,n){"use strict";n.r(e);var a=n("db10"),o=n("eb12");for(var i in o)["default"].indexOf(i)<0&&function(t){n.d(e,t,(function(){return o[t]}))}(i);n("dc7e");var s=n("f0c5"),r=Object(s["a"])(o["default"],a["b"],a["c"],!1,null,null,null,!1,a["a"],void 0);e["default"]=r.exports},af14:function(t,e,n){"use strict";(function(t){var a=n("4ea4");Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0;var o=a(n("2eee")),i=a(n("c973")),s={data:function(){return{contentText:{contentdown:"查看更多",contentrefresh:"加载中...",contentnomore:"到底了，可点击此处手动加载~"},statusBarHeight:0,navBarHeight:0,navBarIndex:0,isLoading:"loading",theGetListPage:1,theGetListPagesize:10,followedUsers:[{id:2,nick_name:"可爱女人",intro:"我是一段描述",avatar_url:"https://ljkj-web-kb.oss-cn-hangzhou.aliyuncs.com/avatar.png",sex:"女",school_id:1,is_regard:1}],school_datas:[]}},onLoad:function(){var t=this.$public.getTopIconDistance();this.statusBarHeight=t.statusBarHeight,this.navBarHeight=t.navBarHeight},onShow:function(){this.$store.commit("changePreviousPage",{previousPage:1,isPage_2:!1}),this.theGetListPage=1,0==this.navBarIndex?this.getMyPerson():this.getMomentsList()},onReachBottom:function(){this.isLoading="loading",0==this.navBarIndex?this.getMyPerson():this.getMomentsList()},methods:{changeFollow:function(){this.theGetListPage=1,0==this.navBarIndex?(this.navBarIndex=1,this.getMomentsList()):(this.navBarIndex=0,this.getMyPerson())},topPerSonalhome:function(e){t.navigateTo({url:"/pages/follow/personalhome?id="+e})},toDetail:function(e){t.navigateTo({url:"/pages/index/detail?id="+e})},toRegard:function(){var e=(0,i.default)(o.default.mark((function e(n,a){return o.default.wrap((function(e){while(1)switch(e.prev=e.next){case 0:return e.next=2,this.$store.dispatch("toRegard",{id:n.id});case 2:1==this.$store.state.is_regard_true&&(this.followedUsers.splice(a,1),t.showToast({title:"已取消关注",duration:1e3,icon:"none"}));case 3:case"end":return e.stop()}}),e,this)})));return function(t,n){return e.apply(this,arguments)}}(),getMyPerson:function(){var e=this;return new Promise((function(n,a){var s=e;s.isLoading="loading",t.request({url:s.$store.state.theUrl+"/wechat/sundry/getMyPerson",method:"POST",header:{token:s.$store.state.theToken},data:{page:s.theGetListPage,pagesize:s.theGetListPagesize,type:"关注"},success:function(e){var a=s;if(1==a.theGetListPage&&(a.followedUsers=[]),0==e.data.code)if(0!=e.data.data.length){for(var r=0;r<e.data.data.length;r++)a.followedUsers.push(e.data.data[r]);a.isLoading="no-more",a.theGetListPage+=1,n()}else a.isLoading="no-more",n();else if(500==e.data.code)t.showToast({title:"服务器连接失败，请反馈官方客服哦~",duration:2500,icon:"none"});else if(410==e.data.code){var u=a;(0,i.default)(o.default.mark((function t(){return o.default.wrap((function(t){while(1)switch(t.prev=t.next){case 0:return t.next=2,u.$store.dispatch("toLogon",{});case 2:u.getMyPerson();case 3:case"end":return t.stop()}}),t)})))()}else t.showToast({title:e.data.msg,duration:2500,icon:"none"})},fail:function(e){t.showToast({title:"网络失败，请重试！多次无效后，反馈官方客服哦！",duration:2500,icon:"none"})}})}))},getMomentsList:function(){var e=this;return new Promise((function(n,a){var s=e;s.isLoading="loading",t.request({url:s.$store.state.theUrl+"/wechat/moments/getMomentsList",method:"POST",header:{token:s.$store.state.theToken},data:{page:s.theGetListPage,pagesize:s.theGetListPagesize,is_collection:1,type:""},success:function(e){var a=s;if(1==a.theGetListPage&&(a.school_datas=[]),0==e.data.code)if(0!=e.data.data.length){for(var r=0;r<e.data.data.length;r++)a.school_datas.push(e.data.data[r]);a.isLoading="no-more",a.theGetListPage+=1,n()}else a.isLoading="no-more",n();else if(500==e.data.code)t.showToast({title:"服务器连接失败，请反馈官方客服哦~",duration:2500,icon:"none"});else if(410==e.data.code){var u=a;(0,i.default)(o.default.mark((function t(){return o.default.wrap((function(t){while(1)switch(t.prev=t.next){case 0:return t.next=2,u.$store.dispatch("toLogon",{});case 2:u.getMomentsList();case 3:case"end":return t.stop()}}),t)})))()}else t.showToast({title:e.data.msg,duration:2500,icon:"none"})},fail:function(e){t.showToast({title:"网络失败，请重试！多次无效后，反馈官方客服哦！",duration:2500,icon:"none"})}})}))}}};e.default=s}).call(this,n("543d")["default"])},db10:function(t,e,n){"use strict";n.d(e,"b",(function(){return o})),n.d(e,"c",(function(){return i})),n.d(e,"a",(function(){return a}));var a={uniLoadMore:function(){return Promise.all([n.e("common/vendor"),n.e("uni_modules/uni-load-more/components/uni-load-more/uni-load-more")]).then(n.bind(null,"db88"))},postTypeZudui:function(){return n.e("uni_modules/post-type-zudui/components/post-type-zudui/post-type-zudui").then(n.bind(null,"8625"))},tabBar:function(){return n.e("uni_modules/tab-Bar/components/tab-Bar/tab-Bar").then(n.bind(null,"0d46"))}},o=function(){var t=this.$createElement;this._self._c},i=[]},dc7e:function(t,e,n){"use strict";var a=n("1b88"),o=n.n(a);o.a},e126:function(t,e,n){"use strict";(function(t,e){var a=n("4ea4");n("f290");a(n("66fd"));var o=a(n("3055"));t.__webpack_require_UNI_MP_PLUGIN__=n,e(o.default)}).call(this,n("bc2e")["default"],n("543d")["createPage"])},eb12:function(t,e,n){"use strict";n.r(e);var a=n("af14"),o=n.n(a);for(var i in a)["default"].indexOf(i)<0&&function(t){n.d(e,t,(function(){return a[t]}))}(i);e["default"]=o.a}},[["e126","common/runtime","common/vendor"]]]);