(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["uni_modules/uview-ui/components/u-code/u-code"],{"53c4":function(e,t,n){"use strict";n.d(t,"b",(function(){return i})),n.d(t,"c",(function(){return s})),n.d(t,"a",(function(){}));var i=function(){var e=this.$createElement;this._self._c},s=[]},"559d":function(e,t,n){"use strict";n.r(t);var i=n("53c4"),s=n("fa6c");for(var a in s)["default"].indexOf(a)<0&&function(e){n.d(t,e,(function(){return s[e]}))}(a);n("a0bc");var c=n("f0c5"),u=Object(c["a"])(s["default"],i["b"],i["c"],!1,null,"cf7be74a",null,!1,i["a"],void 0);t["default"]=u.exports},"8d74":function(e,t,n){},a0bc:function(e,t,n){"use strict";var i=n("8d74"),s=n.n(i);s.a},a638:function(e,t,n){"use strict";(function(e){var i=n("4ea4");Object.defineProperty(t,"__esModule",{value:!0}),t.default=void 0;var s=i(n("7a0a")),a={name:"u-code",mixins:[e.$u.mpMixin,e.$u.mixin,s.default],data:function(){return{secNum:this.seconds,timer:null,canGetCode:!0}},mounted:function(){this.checkKeepRunning()},watch:{seconds:{immediate:!0,handler:function(e){this.secNum=e}}},methods:{checkKeepRunning:function(){var t=Number(e.getStorageSync(this.uniqueKey+"_$uCountDownTimestamp"));if(!t)return this.changeEvent(this.startText);var n=Math.floor(+new Date/1e3);this.keepRunning&&t&&t>n?(this.secNum=t-n,e.removeStorageSync(this.uniqueKey+"_$uCountDownTimestamp"),this.start()):this.changeEvent(this.startText)},start:function(){var e=this;this.timer&&(clearInterval(this.timer),this.timer=null),this.$emit("start"),this.canGetCode=!1,this.changeEvent(this.changeText.replace(/x|X/,this.secNum)),this.timer=setInterval((function(){--e.secNum?e.changeEvent(e.changeText.replace(/x|X/,e.secNum)):(clearInterval(e.timer),e.timer=null,e.changeEvent(e.endText),e.secNum=e.seconds,e.$emit("end"),e.canGetCode=!0)}),1e3),this.setTimeToStorage()},reset:function(){this.canGetCode=!0,clearInterval(this.timer),this.secNum=this.seconds,this.changeEvent(this.endText)},changeEvent:function(e){this.$emit("change",e)},setTimeToStorage:function(){if(this.keepRunning&&this.timer&&this.secNum>0&&this.secNum<=this.seconds){var t=Math.floor(+new Date/1e3);e.setStorage({key:this.uniqueKey+"_$uCountDownTimestamp",data:t+Number(this.secNum)})}}},beforeDestroy:function(){this.setTimeToStorage(),clearTimeout(this.timer),this.timer=null}};t.default=a}).call(this,n("543d")["default"])},fa6c:function(e,t,n){"use strict";n.r(t);var i=n("a638"),s=n.n(i);for(var a in i)["default"].indexOf(a)<0&&function(e){n.d(t,e,(function(){return i[e]}))}(a);t["default"]=s.a}}]);
;(global["webpackJsonp"] = global["webpackJsonp"] || []).push([
    'uni_modules/uview-ui/components/u-code/u-code-create-component',
    {
        'uni_modules/uview-ui/components/u-code/u-code-create-component':(function(module, exports, __webpack_require__){
            __webpack_require__('543d')['createComponent'](__webpack_require__("559d"))
        })
    },
    [['uni_modules/uview-ui/components/u-code/u-code-create-component']]
]);
