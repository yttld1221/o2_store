(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["pages/index/index"],{"0f62":function(t,e,n){"use strict";n.r(e);var o=n("44cd"),s=n("9dbf");for(var i in s)["default"].indexOf(i)<0&&function(t){n.d(e,t,(function(){return s[t]}))}(i);n("ccc1");var a=n("f0c5"),r=Object(a["a"])(s["default"],o["b"],o["c"],!1,null,null,null,!1,o["a"],void 0);e["default"]=r.exports},"44cd":function(t,e,n){"use strict";n.d(e,"b",(function(){return s})),n.d(e,"c",(function(){return i})),n.d(e,"a",(function(){return o}));var o={uIcon:function(){return Promise.all([n.e("common/vendor"),n.e("uni_modules/uview-ui/components/u-icon/u-icon")]).then(n.bind(null,"7e9b"))},uniIcons:function(){return Promise.all([n.e("common/vendor"),n.e("uni_modules/uni-icons/components/uni-icons/uni-icons")]).then(n.bind(null,"beec"))},postTypeZudui:function(){return n.e("uni_modules/post-type-zudui/components/post-type-zudui/post-type-zudui").then(n.bind(null,"8625"))},uSearch:function(){return Promise.all([n.e("common/vendor"),n.e("uni_modules/uview-ui/components/u-search/u-search")]).then(n.bind(null,"4f1c"))},uniLoadMore:function(){return Promise.all([n.e("common/vendor"),n.e("uni_modules/uni-load-more/components/uni-load-more/uni-load-more")]).then(n.bind(null,"db88"))},tabBar:function(){return n.e("uni_modules/tab-Bar/components/tab-Bar/tab-Bar").then(n.bind(null,"0d46"))}},s=function(){var t=this,e=t.$createElement,n=(t._self._c,void 0!=t.theAddress.title?t.theAddress.title.length:null),o=void 0==t.theAddress.title||n<4?null:t.theAddress.title.substring(0,3),s=1==t.theTitleIndex&&""!=t.theSchool.title?t.theSchool.title.length:null,i=1!=t.theTitleIndex||""==t.theSchool.title||s<5?null:t.theSchool.title.substring(0,4),a=1==t.theTitleIndex?t.titles.length:null;t._isMounted||(t.e0=function(e){return t.$public.disabled_tip("高级筛选")}),t.$mp.data=Object.assign({},{$root:{g0:n,g1:o,g2:s,g3:i,g4:a}})},i=[]},"9cc5":function(t,e,n){},"9dbf":function(t,e,n){"use strict";n.r(e);var o=n("c85b"),s=n.n(o);for(var i in o)["default"].indexOf(i)<0&&function(t){n.d(e,t,(function(){return o[t]}))}(i);e["default"]=s.a},c85b:function(t,e,n){"use strict";(function(t){var o=n("4ea4");Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0;var s=o(n("2eee")),i=o(n("9523")),a=o(n("c973"));function r(t,e){var n=Object.keys(t);if(Object.getOwnPropertySymbols){var o=Object.getOwnPropertySymbols(t);e&&(o=o.filter((function(e){return Object.getOwnPropertyDescriptor(t,e).enumerable}))),n.push.apply(n,o)}return n}function c(t){for(var e=1;e<arguments.length;e++){var n=null!=arguments[e]?arguments[e]:{};e%2?r(Object(n),!0).forEach((function(e){(0,i.default)(t,e,n[e])})):Object.getOwnPropertyDescriptors?Object.defineProperties(t,Object.getOwnPropertyDescriptors(n)):r(Object(n)).forEach((function(e){Object.defineProperty(t,e,Object.getOwnPropertyDescriptor(n,e))}))}return t}var h={components:{types:function(){n.e("pages/index/components/types").then(function(){return resolve(n("e6c4"))}.bind(null,n)).catch(n.oe)}},data:function(){return{contentHeight:0,tabArr:[],momentType:"",theLevel:0,contentText:{contentdown:"查看更多",contentrefresh:"加载中...",contentnomore:"到底了，可点击此处手动加载~"},isLoading:"loading",theGetMomentsListPage:1,theGetMomentsListPagesize:10,titleName:["首页","校园墙"],theTitleIndex:0,schoolOneTitleIndex:0,statusBarHeight:0,navBarHeight:0,tabBarHeight:0,searchInputText:"",inputBottomHeight:0,titles:["综合","话题","组队/搭子","分享/安利","兼职","表白","求助","其他"],tempTitles:["综合","话题"],textWidths:0,tempAddressTitle:"",tempSchoolTitle:"",theAddress:{title:"",status:0,code:""},theSchool:{id:1,title:"",status:1,addr:"",create_id:1,update_id:1},school_datas:[]}},onLoad:function(){this.getTopIconDistance(),this.tempAddressTitle=this.$store.state.store_addressNow.title,this.tempSchoolTitle=this.$store.state.store_schoolNow.title;var t=this.getStorageSync("storage_addressNow");this.$store.commit("changeStore_addressNow",{tempSelectedAddress:t}),this.getShopType()},onShow:function(){this.theLevel=this.$store.state.theLogonUser.level,this.$store.state.isOnload&&(this.theTitleIndex=1),this.$store.commit("changePreviousPage",{previousPage:0,isPage_2:!1}),this.theAddress=this.$store.state.store_addressNow,this.theSchool=this.$store.state.store_schoolNow;var e=this;""!=e.theAddress.title&&void 0!=e.theAddress.title||t.showModal({title:"温馨提示：",content:"您当前还没有选择地区，点击“前往”将前往地区选择哦~",confirmText:"前往",confirmColor:"#f89f12",showCancel:!1,success:function(t){t.confirm&&e.toAddress()}}),e.tempAddressTitle&&e.tempAddressTitle!=e.theAddress.title&&void 0!=e.theAddress.title?(0,a.default)(s.default.mark((function t(){return s.default.wrap((function(t){while(1)switch(t.prev=t.next){case 0:return e.theSchool={id:0,title:"",status:1,addr:"",create_id:1,update_id:1},e.$store.commit("changeStore_schoolNow",{id:0,title:"",status:1,addr:"",create_id:1,update_id:1}),e.theGetMomentsListPage=1,e.school_datas=[],t.next=6,e.getMomentsList("area");case 6:case"end":return t.stop()}}),t)})))():e.$store.state.isOnload?(0,a.default)(s.default.mark((function t(){return s.default.wrap((function(t){while(1)switch(t.prev=t.next){case 0:return e.$store.commit("changeOnload",!1),e.theGetMomentsListPage=1,e.school_datas=[],t.next=5,e.getMomentsList();case 5:case"end":return t.stop()}}),t)})))():e.tempSchoolTitle!=e.theSchool.title&&(0,a.default)(s.default.mark((function t(){return s.default.wrap((function(t){while(1)switch(t.prev=t.next){case 0:return e.theGetMomentsListPage=1,e.school_datas=[],t.next=4,e.getMomentsList("school");case 4:case"end":return t.stop()}}),t)})))()},onPullDownRefresh:function(){var e=this;e.theGetMomentsListPage=1,e.searchInputText="",e.school_datas=[],(0,a.default)(s.default.mark((function n(){return s.default.wrap((function(n){while(1)switch(n.prev=n.next){case 0:if(1!=e.theTitleIndex){n.next=5;break}return n.next=3,e.getMomentsList();case 3:n.next=7;break;case 5:return n.next=7,e.initShop();case 7:t.stopPullDownRefresh();case 8:case"end":return n.stop()}}),n)})))()},onReachBottom:function(){this.isLoading="loading",1==this.theTitleIndex?this.getMomentsList():this.initShop()},methods:{toSearch:function(){t.navigateTo({url:"/page_product/pages/search/index"})},goDetail:function(e){t.navigateTo({url:"/page_product/pages/product/detail?id="+e.id})},loadMore:function(){1==this.theTitleIndex?this.getMomentsList():this.initShop()},initData:function(){var t=this;(0,a.default)(s.default.mark((function e(){return s.default.wrap((function(e){while(1)switch(e.prev=e.next){case 0:return t.$store.commit("changeOnload",!1),t.theGetMomentsListPage=1,t.school_datas=[],e.next=5,t.getMomentsList();case 5:t.tempAddressTitle=t.$store.state.store_addressNow.title;case 6:case"end":return e.stop()}}),e)})))()},initShop:function(){var t=this;this.isLoading="loading";var e={page:this.theGetMomentsListPage,pagesize:this.theGetMomentsListPagesize,category_id:this.momentType,is_product:0,area_code:this.$store.state.store_addressNow.code};this.API.home.getTaskList(e).then((function(e){if(console.log(e),1==t.theGetMomentsListPage&&(t.school_datas=[]),0!=e.data.length){for(var n=0;n<e.data.length;n++)t.school_datas.push(c(c({},e.data[n]),{},{img_url:e.data[n].img_url?e.data[n].img_url.split(",")[0]:""}));t.isLoading="no-more",t.theGetMomentsListPage+=1}else t.isLoading="no-more";console.log(t.school_datas)})).catch(function(){var e=(0,a.default)(s.default.mark((function e(n){return s.default.wrap((function(e){while(1)switch(e.prev=e.next){case 0:if(410!=n.code){e.next=4;break}return e.next=3,t.$store.dispatch("toLogon",{});case 3:t.initShop();case 4:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}())},getShopType:function(){var e=this;if(1==this.theTitleIndex)this.initData();else{var n=t.createSelectorQuery().in(this);n.select(".home-search").boundingClientRect((function(t){e.contentHeight=t.height})).exec(),this.API.home.getAllMenu({}).then((function(t){console.log(t),e.tabArr=[],t.data.forEach((function(t){t.category_id>0&&e.tabArr.push({name:t.title,id:t.category_id})})),e.tabArr.length&&(e.theGetMomentsListPage=1,e.school_datas=[],e.momentType=e.tabArr[0].id,e.initShop())})).catch(function(){var t=(0,a.default)(s.default.mark((function t(n){return s.default.wrap((function(t){while(1)switch(t.prev=t.next){case 0:if(console.log(n),410!=n.code){t.next=5;break}return t.next=4,e.$store.dispatch("toLogon",{});case 4:e.getShopType();case 5:case"end":return t.stop()}}),t)})));return function(e){return t.apply(this,arguments)}}())}},changeTab:function(t){console.log(t),this.theGetMomentsListPage=1,this.school_datas=[],this.momentType=t.id,this.initShop()},animtionAction:function(){var t=this,e=setInterval((function(){t.$refs.theMessage.animtionAction()}),1e3);t.$store.commit("changeRedTip",{isRedTip:!0}),setTimeout((function(){clearInterval(e)}),5e3)},setStorageSync:function(e,n){try{t.setStorageSync(e,n)}catch(o){t.showToast({title:o,duration:2500,icon:"none"})}},getStorageSync:function(e){try{var n=t.getStorageSync(e);return n}catch(o){t.showToast({title:o,duration:2500,icon:"none"})}},getTopIconDistance:function(){var e=this;t.getSystemInfo({success:function(n){e.statusBarHeight=n.statusBarHeight||0;var o=t.getMenuButtonBoundingClientRect();e.navBarHeight=o.height+2*(o.top-e.statusBarHeight),e.tabBarHeight=n.screenHeight-n.safeArea.bottom,e.$store.commit("changeNavBarHeight",{statusBarHeight:e.statusBarHeight,navBarHeight:e.navBarHeight,tabBarHeight:e.tabBarHeight})},fail:function(t){}})},inputBindFocus:function(t){this.inputBottomHeight=t.detail.height},inputBindBlur:function(){this.inputBottomHeight=0},toTitleOne:function(t){this.theTitleIndex=t;this.theGetMomentsListPage=1,this.searchInputText="",this.school_datas=[],0==t?this.tabArr.length&&(this.momentType=this.tabArr[0].id,this.initShop()):this.getMomentsList()},choiseOneTitle:function(t){this.schoolOneTitleIndex=t},emptyInput:function(t){"searchInputText"&&(this.searchInputText="")},toAddress:function(){t.navigateTo({url:"/pages/index/address?type=index"})},toSchool:function(){t.navigateTo({url:"/pages/index/school"})},toDetail:function(e){t.navigateTo({url:"/pages/index/detail?id="+e})},topPerSonalhome:function(e){2==e.is_anonymous?t.navigateTo({url:"/pages/follow/personalhome?id="+e.id}):t.showToast({title:"这个人很神秘，不想让你看到TA的主页~",duration:2500,icon:"none"})},getMomentsList:function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:"",n=this;return new Promise((function(o,i){var r=n;r.isLoading="loading",""!=r.$store.state.store_addressNow.title&&t.request({url:r.$store.state.theUrl+"/wechat/moments/getMomentsList",method:"POST",header:{token:r.$store.state.theToken},data:{page:r.theGetMomentsListPage,pagesize:r.theGetMomentsListPagesize,type:"",title:r.searchInputText,school_id:r.$store.state.store_schoolNow.id,area_code:r.$store.state.store_addressNow.code},success:function(n){var i=r;if(1==i.theGetMomentsListPage&&(i.school_datas=[]),"area"==e?i.tempAddressTitle=i.theAddress.title:"school"==e&&(i.tempSchoolTitle=i.$store.state.store_schoolNow.title),0==n.data.code)if(0!=n.data.data.length){for(var c=0;c<n.data.data.length;c++)i.school_datas.push(n.data.data[c]);i.isLoading="no-more",i.theGetMomentsListPage+=1,i.tempAddressTitle=i.theAddress.title,o()}else i.isLoading="no-more",o();else if(500==n.data.code)t.showToast({title:"服务器连接失败，请反馈官方客服哦~",duration:2500,icon:"none"});else if(410==n.data.code){var h=i;(0,a.default)(s.default.mark((function t(){return s.default.wrap((function(t){while(1)switch(t.prev=t.next){case 0:return t.next=2,h.$store.dispatch("toLogon",{});case 2:h.theGetMomentsListPage=1,h.getMomentsList(e);case 4:case"end":return t.stop()}}),t)})))()}else t.showToast({title:n.data.msg,duration:2500,icon:"none"})},fail:function(e){t.showToast({title:"网络失败，请重试！多次无效后，反馈官方客服哦！",duration:2500,icon:"none"})}})}))},searchPost:function(){this.school_datas=[],this.theGetMomentsListPage=1,this.getMomentsList()},toThumb:function(){var e=(0,a.default)(s.default.mark((function e(n){var o,i;return s.default.wrap((function(e){while(1)switch(e.prev=e.next){case 0:return o=n.is_thumb,e.next=3,this.$store.dispatch("toThumb",{id:n.id,is_thumb:n.is_thumb});case 3:if(1==this.$store.state.is_thumb_true)for(i=0;i<this.school_datas.length;i++)n.id==this.school_datas[i].id&&(2==o?(this.$set(this.school_datas[i],"thumb_num",this.school_datas[i].thumb_num+1),this.$set(this.school_datas[i],"is_thumb",1),t.showToast({title:"点赞成功",duration:1e3,icon:"none"})):(this.$set(this.school_datas[i],"thumb_num",this.school_datas[i].thumb_num-1),this.$set(this.school_datas[i],"is_thumb",2),t.showToast({title:"已取消点赞",duration:1e3,icon:"none"})));case 4:case"end":return e.stop()}}),e,this)})));return function(t){return e.apply(this,arguments)}}(),actionMore:function(e){var n=this,o=e.is_collection;t.showActionSheet({itemList:[2==e.is_collection?"收藏该内容":"取消收藏该内容","举报"],itemColor:"#f89f12",success:function(i){if(0==i.tapIndex){var r=n;(0,a.default)(s.default.mark((function n(){var i;return s.default.wrap((function(n){while(1)switch(n.prev=n.next){case 0:return n.next=2,r.$store.dispatch("toCollection",{id:e.id});case 2:if(1==r.$store.state.is_collection_true)for(i=0;i<r.school_datas.length;i++)e.id==r.school_datas[i].id&&(2==o?(r.$set(r.school_datas[i],"is_collection",1),t.showToast({title:"收藏成功",duration:1e3,icon:"none"})):(r.$set(r.school_datas[i],"is_collection",2),t.showToast({title:"已取消收藏",duration:1e3,icon:"none"})));case 3:case"end":return n.stop()}}),n)})))()}else t.showToast({title:"举报成功",duration:1e3,icon:"none"})},fail:function(t){}})},zuduiButtons:function(){var e=(0,a.default)(s.default.mark((function e(n){var o,i;return s.default.wrap((function(e){while(1)switch(e.prev=e.next){case 0:if(1!=n.type){e.next=5;break}return o=n.is_entry,e.next=4,this.$store.dispatch("toEntry",{id:n.id,is_entry:n.is_entry});case 4:if(1==this.$store.state.is_entry_true)for(i=0;i<this.school_datas.length;i++)n.id==this.school_datas[i].id&&(2==o?(this.$set(this.school_datas[i],"entry_num",this.school_datas[i].entry_num+1),this.$set(this.school_datas[i],"is_entry",1),t.showToast({title:"加入成功",duration:1e3,icon:"none"})):(this.$set(this.school_datas[i],"entry_num",this.school_datas[i].entry_num-1),this.$set(this.school_datas[i],"is_entry",2),t.showToast({title:"已退出组队",duration:1e3,icon:"none"})));case 5:case"end":return e.stop()}}),e,this)})));return function(t){return e.apply(this,arguments)}}()}};e.default=h}).call(this,n("543d")["default"])},ccc1:function(t,e,n){"use strict";var o=n("9cc5"),s=n.n(o);s.a},e318:function(t,e,n){"use strict";(function(t,e){var o=n("4ea4");n("f290");o(n("66fd"));var s=o(n("0f62"));t.__webpack_require_UNI_MP_PLUGIN__=n,e(s.default)}).call(this,n("bc2e")["default"],n("543d")["createPage"])}},[["e318","common/runtime","common/vendor"]]]);