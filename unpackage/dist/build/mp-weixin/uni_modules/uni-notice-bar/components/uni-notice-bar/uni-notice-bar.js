(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["uni_modules/uni-notice-bar/components/uni-notice-bar/uni-notice-bar"],{"8dc4":function(t,e,n){},aec3:function(t,e,n){"use strict";n.r(e);var i=n("e7a6"),o=n("caf7");for(var a in o)["default"].indexOf(a)<0&&function(t){n.d(e,t,(function(){return o[t]}))}(a);n("bf7b");var c=n("f0c5"),u=Object(c["a"])(o["default"],i["b"],i["c"],!1,null,"52287df2",null,!1,i["a"],void 0);e["default"]=u.exports},b566:function(t,e,n){"use strict";(function(t){Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0;var n={name:"UniNoticeBar",emits:["click","getmore","close"],props:{text:{type:String,default:""},moreText:{type:String,default:""},backgroundColor:{type:String,default:"#FFF9EA"},speed:{type:Number,default:100},color:{type:String,default:"#FF9A43"},fontSize:{type:Number,default:14},moreColor:{type:String,default:"#FF9A43"},single:{type:[Boolean,String],default:!1},scrollable:{type:[Boolean,String],default:!1},showIcon:{type:[Boolean,String],default:!1},showGetMore:{type:[Boolean,String],default:!1},showClose:{type:[Boolean,String],default:!1}},data:function(){var t="Uni_".concat(Math.ceil(1e6*Math.random()).toString(36)),e="Uni_".concat(Math.ceil(1e6*Math.random()).toString(36));return{textWidth:0,boxWidth:0,wrapWidth:"",webviewHide:!1,elId:t,elIdBox:e,show:!0,animationDuration:"none",animationPlayState:"paused",animationDelay:"0s"}},watch:{text:function(t,e){this.initSize()}},computed:{isShowGetMore:function(){return!0===this.showGetMore||"true"===this.showGetMore},isShowClose:function(){return(!0===this.showClose||"true"===this.showClose)&&(!1===this.showGetMore||"false"===this.showGetMore)}},mounted:function(){var t=this;this.$nextTick((function(){t.initSize()}))},methods:{initSize:function(){var e=this;if(this.scrollable){var n=[],i=new Promise((function(n,i){t.createSelectorQuery().in(e).select("#".concat(e.elId)).boundingClientRect().exec((function(t){e.textWidth=t[0].width,n()}))})),o=new Promise((function(n,i){t.createSelectorQuery().in(e).select("#".concat(e.elIdBox)).boundingClientRect().exec((function(t){e.boxWidth=t[0].width,n()}))}));n.push(i),n.push(o),Promise.all(n).then((function(){e.animationDuration="".concat(e.textWidth/e.speed,"s"),e.animationDelay="-".concat(e.boxWidth/e.speed,"s"),setTimeout((function(){e.animationPlayState="running"}),1e3)}))}},loopAnimation:function(){},clickMore:function(){this.$emit("getmore")},close:function(){this.show=!1,this.$emit("close")},onClick:function(){this.$emit("click")}}};e.default=n}).call(this,n("543d")["default"])},bf7b:function(t,e,n){"use strict";var i=n("8dc4"),o=n.n(i);o.a},caf7:function(t,e,n){"use strict";n.r(e);var i=n("b566"),o=n.n(i);for(var a in i)["default"].indexOf(a)<0&&function(t){n.d(e,t,(function(){return i[t]}))}(a);e["default"]=o.a},e7a6:function(t,e,n){"use strict";n.d(e,"b",(function(){return o})),n.d(e,"c",(function(){return a})),n.d(e,"a",(function(){return i}));var i={uniIcons:function(){return Promise.all([n.e("common/vendor"),n.e("uni_modules/uni-icons/components/uni-icons/uni-icons")]).then(n.bind(null,"d873"))}},o=function(){var t=this.$createElement,e=(this._self._c,this.show&&this.isShowGetMore?this.moreText.length:null);this.$mp.data=Object.assign({},{$root:{g0:e}})},a=[]}}]);
;(global["webpackJsonp"] = global["webpackJsonp"] || []).push([
    'uni_modules/uni-notice-bar/components/uni-notice-bar/uni-notice-bar-create-component',
    {
        'uni_modules/uni-notice-bar/components/uni-notice-bar/uni-notice-bar-create-component':(function(module, exports, __webpack_require__){
            __webpack_require__('543d')['createComponent'](__webpack_require__("aec3"))
        })
    },
    [['uni_modules/uni-notice-bar/components/uni-notice-bar/uni-notice-bar-create-component']]
]);
