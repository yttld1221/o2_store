(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["pages/index/detail"],{"06a3":function(t,e,n){"use strict";n.d(e,"b",(function(){return i})),n.d(e,"c",(function(){return o})),n.d(e,"a",(function(){return a}));var a={postTypeZudui:function(){return n.e("uni_modules/post-type-zudui/components/post-type-zudui/post-type-zudui").then(n.bind(null,"8625"))},uniIcons:function(){return Promise.all([n.e("common/vendor"),n.e("uni_modules/uni-icons/components/uni-icons/uni-icons")]).then(n.bind(null,"beec"))},uniLoadMore:function(){return Promise.all([n.e("common/vendor"),n.e("uni_modules/uni-load-more/components/uni-load-more/uni-load-more")]).then(n.bind(null,"db88"))},uIcon:function(){return Promise.all([n.e("common/vendor"),n.e("uni_modules/uview-ui/components/u-icon/u-icon")]).then(n.bind(null,"7e9b"))},uSwiper:function(){return Promise.all([n.e("common/vendor"),n.e("uni_modules/uview-ui/components/u-swiper/u-swiper")]).then(n.bind(null,"85a8"))},uImage:function(){return Promise.all([n.e("common/vendor"),n.e("uni_modules/uview-ui/components/u-image/u-image")]).then(n.bind(null,"8518"))},uniEasyinput:function(){return n.e("uni_modules/uni-easyinput/components/uni-easyinput/uni-easyinput").then(n.bind(null,"8708"))}},i=function(){var t=this,e=t.$createElement,n=(t._self._c,["兼职","分享/安利",""].includes(t.detailData.type)),a=n?null:t.__map(t.theComments,(function(e,n){var a=t.__get_orig(e),i=t.theComments.length,o=i>0?t.showDateTime(e):null;return{$orig:a,g1:i,m0:o}})),i=n&&"兼职"==t.detailData.type&&"面议"!=t.detailData.wages?t._f("getSettlement")(t.detailData.settlement):null,o=n&&"兼职"==t.detailData.type?t.label.length:null,s=n&&"兼职"!=t.detailData.type&&"分享/安利"==t.detailData.type?t.srcList.length:null,r=n&&"兼职"!=t.detailData.type&&"分享/安利"==t.detailData.type?t.getTime(t.detailData.released_at):null,u=n&&"兼职"!=t.detailData.type&&"分享/安利"==t.detailData.type?t.isMe():null,l=!["兼职","分享/安利",""].includes(t.detailData.type)&&1==t.detailData.is_on;t._isMounted||(t.e0=function(e){return t.currentNum=e.current}),t.$mp.data=Object.assign({},{$root:{g0:n,l0:a,f0:i,g2:o,g3:s,m1:r,m2:u,g4:l}})},o=[]},"1fb2":function(t,e,n){"use strict";(function(t,e){var a=n("4ea4");n("f290");a(n("66fd"));var i=a(n("d349"));t.__webpack_require_UNI_MP_PLUGIN__=n,e(i.default)}).call(this,n("bc2e")["default"],n("543d")["createPage"])},"37a4":function(t,e,n){"use strict";(function(t){var a=n("4ea4");Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0;var i=a(n("2eee")),o=a(n("c973")),s=n("760f"),r={data:function(){return{label:"",currentNum:0,srcList:[],inviteId:"",addressArr:[],showMore:!0,showPhone:!0,id:"",isLoading:"loading",totalCount:11,theGetCommentListPage:1,theGetCommentListPagesize:10,detailData:{type:""},theInputComment:"",theComments:[]}},filters:{getSettlement:function(t){if(t)return t.split(t.slice(-3))[0]}},onLoad:function(e){var n=this;e.id&&(this.id=e.id,this.getDetail()),e.noPhone&&(this.showPhone=!1),e.noMore&&(this.showMore=!1),t.$on("changeRegard",(function(t){"分享/安利"==n.detailData.type&&n.$set(n.detailData,"is_regard",t)}))},onPullDownRefresh:function(){var e=this;["兼职","分享/安利"].includes(e.detailData.type)?t.stopPullDownRefresh():(e.theGetCommentListPage=1,e.theComments=[],e.theInputComment="",e.totalCount=11,(0,o.default)(i.default.mark((function n(){return i.default.wrap((function(n){while(1)switch(n.prev=n.next){case 0:return n.next=2,e.getCommentList();case 2:t.stopPullDownRefresh();case 3:case"end":return n.stop()}}),n)})))())},onReachBottom:function(){["兼职","分享/安利"].includes(this.detailData.type)||(this.isLoading="loading",this.getCommentList())},onShareAppMessage:function(t){if(console.log(t,this.inviteId),"button"==t.from)return{title:this.inviteId.title,path:"/pages/index/detail?id=".concat(this.inviteId.id),imageUrl:this.inviteId.url?this.inviteId.url.split(",")[0]:"/static/icon-zd.png"}},methods:{isMe:function(){return this.detailData.create_id!=this.$store.state.theLogonUser.id},toProduct:function(){1==this.detailData.task_is_on?t.navigateTo({url:"/page_product/pages/product/detail?id="+this.detailData.task_id}):t.showToast({title:"关联商品已下线",duration:2500,icon:"none"})},getTime:function(t){if(t){var e=new Date(t).getTime(),n=(new Date).getTime(),a=(n-e)/1e3/60;if(a<5)return"刚刚";if(a>=5&&a<60)return Math.floor(a)+"分钟前";var i=t.substring(0,4),o=t.substring(5,7),s=t.substring(8,10),r=new Date,u=r.getFullYear()+"",l=r.getMonth()+1<10?"0"+(r.getMonth()+1):r.getMonth()+1+"",d=r.getDate()<10?"0"+r.getDate():r.getDate()+"";return i==u&&o==l&&s==d?"今天 "+t.substring(11,19):t}},getAddText:function(t){var e="";return this.addressArr.forEach((function(n){n.children.forEach((function(a){a.value==t&&(e=n.label+a.label)}))})),e},getArea:function(){var t=this;this.addressArr=[],s.addressList.forEach((function(e){t.addressArr.push({value:e.code,label:e.name,children:e.children.map((function(t){return{value:t.code+"00",label:t.name}}))})})),this.detailData.city=this.getAddText(this.detailData.area_code)},getDetail:function(){var e=this;this.API.home.getMomentInfo({moments_id:this.id}).then((function(n){e.detailData=n.data,["兼职","分享/安利"].includes(e.detailData.type)?["兼职"].includes(e.detailData.type)&&e.getArea():e.getCommentList(),["兼职","分享/安利","组队/搭子"].includes(e.detailData.type)&&(t.setNavigationBarTitle({title:"分享/安利"==e.detailData.type?"安利详情":"兼职"==e.detailData.type?"兼职详情":"组队详情"}),["分享/安利"].includes(e.detailData.type)?e.srcList=e.detailData.url?e.detailData.url.split(","):[]:["兼职"].includes(e.detailData.type)&&(e.label=n.data.label?n.data.label.split(","):[]))})).catch(function(){var t=(0,o.default)(i.default.mark((function t(n){return i.default.wrap((function(t){while(1)switch(t.prev=t.next){case 0:if(410!=n.code){t.next=4;break}return t.next=3,e.$store.dispatch("toLogon",{});case 3:e.getDetail();case 4:case"end":return t.stop()}}),t)})));return function(e){return t.apply(this,arguments)}}())},showDateTime:function(t){return"刚刚"!=t.created_at?this.$public.showDateTime(t.created_at):"刚刚"},topPerSonalhome:function(e){2==e.is_anonymous?t.navigateTo({url:"/pages/follow/personalhome?id="+e.id}):t.showToast({title:"这个人很神秘，不想让你看到TA的主页~",duration:2500,icon:"none"})},toThumb:function(){var e=(0,o.default)(i.default.mark((function e(n){var a;return i.default.wrap((function(e){while(1)switch(e.prev=e.next){case 0:return a=n.is_thumb,e.next=3,this.$store.dispatch("toThumb",{id:n.id,is_thumb:n.is_thumb});case 3:1==this.$store.state.is_thumb_true&&(2==a?(this.$set(this.detailData,"thumb_num",this.detailData.thumb_num+1),this.$set(this.detailData,"is_thumb",1),t.showToast({title:"点赞成功",duration:1e3,icon:"none"})):(this.$set(this.detailData,"thumb_num",this.detailData.thumb_num-1),this.$set(this.detailData,"is_thumb",2),t.showToast({title:"已取消点赞",duration:1e3,icon:"none"})));case 4:case"end":return e.stop()}}),e,this)})));return function(t){return e.apply(this,arguments)}}(),actionMore:function(e){console.log(e);var n=this,a=e.is_collection,s=[2==e.is_collection?"收藏":"取消收藏",1==e.is_regard?"取消关注":"关注TA"];this.$store.state.theLogonUser.id!=e.create_id&&this.showPhone||s.splice(1,1),t.showActionSheet({itemList:s,itemColor:"#333333",success:function(r){if(["收藏","取消收藏"].includes(s[r.tapIndex])){var u=n;(0,o.default)(i.default.mark((function n(){return i.default.wrap((function(n){while(1)switch(n.prev=n.next){case 0:return n.next=2,u.$store.dispatch("toCollection",{id:e.id});case 2:1==u.$store.state.is_collection_true&&(2==a?(u.$set(u.detailData,"is_collection",1),t.showToast({title:"收藏成功",duration:1e3,icon:"none"})):(u.$set(u.detailData,"is_collection",2),t.showToast({title:"已取消收藏",duration:1e3,icon:"none"})));case 3:case"end":return n.stop()}}),n)})))()}else["取消关注","关注TA"].includes(s[r.tapIndex])&&this.followHandle(e)},fail:function(t){}})},toFollow:function(){this.followHandle({create_id:this.detailData.create_id,is_regard:this.detailData.is_regard})},followHandle:function(e){var n=this;this.API.order.regard({to_user_id:e.create_id}).then((function(a){console.log(a.data),n.$set(n.detailData,"is_regard",1==e.is_regard?2:1),t.showToast({title:1==e.is_regard?"已取消关注":"关注成功",duration:1e3,icon:"none"})})).catch(function(){var t=(0,o.default)(i.default.mark((function t(a){return i.default.wrap((function(t){while(1)switch(t.prev=t.next){case 0:if(410!=a.code){t.next=4;break}return t.next=3,n.$store.dispatch("toLogon",{});case 3:n.followHandle(e);case 4:case"end":return t.stop()}}),t)})));return function(e){return t.apply(this,arguments)}}())},zuduiButtons:function(){var e=(0,o.default)(i.default.mark((function e(n){var a,o;return i.default.wrap((function(e){while(1)switch(e.prev=e.next){case 0:if(1!=n.type){e.next=7;break}return a=n.is_entry,e.next=4,this.$store.dispatch("toEntry",{id:n.id,is_entry:n.is_entry});case 4:if(1==this.$store.state.is_entry_true)if(2==a)this.$set(this.detailData,"entry_num",this.detailData.entry_num+1),this.$set(this.detailData,"is_entry",1),this.detailData.members.push({id:this.$store.state.theLogonUser.id,nick_name:this.$store.state.theLogonUser.nick_name,avatar_url:this.$store.state.theLogonUser.avatar_url}),t.showToast({title:"加入成功",duration:1e3,icon:"none"});else{for(this.$set(this.detailData,"entry_num",this.detailData.entry_num-1),this.$set(this.detailData,"is_entry",2),o=0;o<this.detailData.members.length;o++)this.$store.state.theLogonUser.id==this.detailData.members[o].id&&this.detailData.members.splice(o,1);t.showToast({title:"已退出组队",duration:1e3,icon:"none"})}e.next=8;break;case 7:this.inviteId=n;case 8:case"end":return e.stop()}}),e,this)})));return function(t){return e.apply(this,arguments)}}(),getCommentList:function(){var e=this;return new Promise((function(n,a){var s=e;s.isLoading="loading",s.theComments.length<s.totalCount&&t.request({url:s.$store.state.theUrl+"/wechat/moments/getCommentList",method:"POST",header:{token:s.$store.state.theToken},data:{page:s.theGetCommentListPage,pagesize:s.theGetCommentListPagesize,moments_id:s.detailData.id},success:function(e){var a=s;if(1==a.theGetCommentListPage&&(a.theComments=[],a.totalCount=e.data.count),0==e.data.code){for(var r=0;r<e.data.data.length;r++)a.theComments.push(e.data.data[r]);a.theGetCommentListPage+=1,n()}else if(500==e.data.code)t.showToast({title:"服务器连接失败，请反馈官方客服哦~",duration:2500,icon:"none"});else if(410==e.data.code){var u=a;(0,o.default)(i.default.mark((function t(){return i.default.wrap((function(t){while(1)switch(t.prev=t.next){case 0:return t.next=2,u.$store.dispatch("toLogon",{});case 2:u.getCommentList();case 3:case"end":return t.stop()}}),t)})))()}else t.showToast({title:e.data.msg,duration:2500,icon:"none"})},fail:function(e){console.log(333),t.showToast({title:"网络失败，请重试！多次无效后，反馈官方客服哦！",duration:2500,icon:"none"})}})}))},toComment:function(){var e=this;return new Promise((function(n,a){var s=e;[1,2].includes(s.$store.state.theLogonUser.level)?""!=s.theInputComment?t.request({url:s.$store.state.theUrl+"/wechat/moments/comment",method:"POST",header:{token:s.$store.state.theToken},data:{msg:s.theInputComment,moments_id:s.detailData.id},success:function(e){var a=s;if(0==e.data.code)a.theComments.unshift({id:0,moments_id:a.detailData.id,msg:a.theInputComment,create_id:a.$store.state.theLogonUser.id,created_at:"刚刚",thumb_num:0,is_thumb:2,nick_name:a.$store.state.theLogonUser.nick_name,avatar_url:a.$store.state.theLogonUser.avatar_url}),a.theInputComment="",n();else if(500==e.data.code)t.showToast({title:"服务器连接失败，请反馈官方客服哦~",duration:2500,icon:"none"});else if(410==e.data.code){var r=a;(0,o.default)(i.default.mark((function t(){return i.default.wrap((function(t){while(1)switch(t.prev=t.next){case 0:return t.next=2,r.$store.dispatch("toLogon",{});case 2:r.toComment();case 3:case"end":return t.stop()}}),t)})))()}else t.showToast({title:e.data.msg,duration:2500,icon:"none"})},fail:function(e){t.showToast({title:"网络失败，请重试！多次无效后，反馈官方客服哦！",duration:2500,icon:"none"})}}):t.showToast({title:"评论内容不能为空哦~",duration:2500,icon:"none"}):t.navigateTo({url:"/page_product/pages/info/register?level="+s.$store.state.theLogonUser.level})}))},commentThumb:function(e,n){var a=this,s=e;t.request({url:a.$store.state.theUrl+"/wechat/moments/commentThumb",method:"POST",header:{token:a.$store.state.theToken},data:{comment_id:e.id},success:function(e){var r=a;if(0==e.data.code)2==s.is_thumb?(r.theComments[n].is_thumb=1,r.theComments[n].thumb_num+=1):(r.theComments[n].is_thumb=2,r.theComments[n].thumb_num-=1);else if(500==e.data.code)t.showToast({title:"服务器连接失败，请反馈官方客服哦~",duration:2500,icon:"none"});else if(410==e.data.code){var u=r;(0,o.default)(i.default.mark((function t(){return i.default.wrap((function(t){while(1)switch(t.prev=t.next){case 0:return t.next=2,u.$store.dispatch("toLogon",{});case 2:u.commentThumb();case 3:case"end":return t.stop()}}),t)})))()}else t.showToast({title:e.data.msg,duration:2500,icon:"none"})},fail:function(e){t.showToast({title:"网络失败，请重试！多次无效后，反馈官方客服哦！",duration:2500,icon:"none"})}})}}};e.default=r}).call(this,n("543d")["default"])},b863:function(t,e,n){},c22d:function(t,e,n){"use strict";n.r(e);var a=n("37a4"),i=n.n(a);for(var o in a)["default"].indexOf(o)<0&&function(t){n.d(e,t,(function(){return a[t]}))}(o);e["default"]=i.a},d349:function(t,e,n){"use strict";n.r(e);var a=n("06a3"),i=n("c22d");for(var o in i)["default"].indexOf(o)<0&&function(t){n.d(e,t,(function(){return i[t]}))}(o);n("fab8");var s=n("f0c5"),r=Object(s["a"])(i["default"],a["b"],a["c"],!1,null,null,null,!1,a["a"],void 0);e["default"]=r.exports},fab8:function(t,e,n){"use strict";var a=n("b863"),i=n.n(a);i.a}},[["1fb2","common/runtime","common/vendor"]]]);