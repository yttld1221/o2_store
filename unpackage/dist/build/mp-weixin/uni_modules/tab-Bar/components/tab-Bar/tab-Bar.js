(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["uni_modules/tab-Bar/components/tab-Bar/tab-Bar"],{"2e88":function(t,e,a){"use strict";(function(t){Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0;var a={name:"tabbar",props:["current"],data:function(){return{list:[{pagePath:"pages/index/index",iconPath:"/static/1_tabbar_index@3x.png",selectedIconPath:"/static/1_tabbar_index_selected@3x.png",text:"首页"},{pagePath:"pages/follow/follow",iconPath:"/static/2_tabbar_follow@3x.png",selectedIconPath:"/static/2_tabbar_follow_selected@3x.png",text:"关注"},{pagePath:"pages/push/push",iconPath:"/static/3_tabbar_push_new@3x.png",selectedIconPath:"/static/3_tabbar_push_cancel_new@3x.png",text:"发布"},{pagePath:"pages/message/message",iconPath:"/static/4_tabbar_message@3x.png",selectedIconPath:"/static/4_tabbar_message_selected@3x.png",text:"消息"},{pagePath:"pages/mine/mine",iconPath:"/static/5_tabbar_mine@3x.png",selectedIconPath:"/static/5_tabbar_mine_selected@3x.png",text:"我的"}]}},created:function(){t.hideTabBar()},methods:{changeTab:function(e){2==e?1==this.$store.state.isPage_2?t.switchTab({url:"/"+this.list[this.$store.state.previousPage].pagePath}):t.switchTab({url:"/"+this.list[e].pagePath}):(3==e&&this.$store.commit("changeRedTip",{isRedTip:!1}),t.switchTab({url:"/"+this.list[e].pagePath}))}}};e.default=a}).call(this,a("543d")["default"])},5048:function(t,e,a){"use strict";a.d(e,"b",(function(){return n})),a.d(e,"c",(function(){return s})),a.d(e,"a",(function(){}));var n=function(){var t=this.$createElement;this._self._c},s=[]},"571a":function(t,e,a){"use strict";var n=a("99bb"),s=a.n(n);s.a},6100:function(t,e,a){"use strict";a.r(e);var n=a("5048"),s=a("be1d");for(var i in s)["default"].indexOf(i)<0&&function(t){a.d(e,t,(function(){return s[t]}))}(i);a("571a");var c=a("f0c5"),r=Object(c["a"])(s["default"],n["b"],n["c"],!1,null,null,null,!1,n["a"],void 0);e["default"]=r.exports},"99bb":function(t,e,a){},be1d:function(t,e,a){"use strict";a.r(e);var n=a("2e88"),s=a.n(n);for(var i in n)["default"].indexOf(i)<0&&function(t){a.d(e,t,(function(){return n[t]}))}(i);e["default"]=s.a}}]);
;(global["webpackJsonp"] = global["webpackJsonp"] || []).push([
    'uni_modules/tab-Bar/components/tab-Bar/tab-Bar-create-component',
    {
        'uni_modules/tab-Bar/components/tab-Bar/tab-Bar-create-component':(function(module, exports, __webpack_require__){
            __webpack_require__('543d')['createComponent'](__webpack_require__("6100"))
        })
    },
    [['uni_modules/tab-Bar/components/tab-Bar/tab-Bar-create-component']]
]);
