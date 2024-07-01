(global["webpackJsonp"] = global["webpackJsonp"] || []).push([["pages/mine/mine_push"],{

/***/ 270:
/*!**********************************************************************!*\
  !*** D:/ouying/o2_store/main.js?{"page":"pages%2Fmine%2Fmine_push"} ***!
  \**********************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(wx, createPage) {

var _interopRequireDefault = __webpack_require__(/*! @babel/runtime/helpers/interopRequireDefault */ 4);
__webpack_require__(/*! uni-pages */ 26);
var _vue = _interopRequireDefault(__webpack_require__(/*! vue */ 25));
var _mine_push = _interopRequireDefault(__webpack_require__(/*! ./pages/mine/mine_push.vue */ 271));
// @ts-ignore
wx.__webpack_require_UNI_MP_PLUGIN__ = __webpack_require__;
createPage(_mine_push.default);
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./node_modules/@dcloudio/uni-mp-weixin/dist/wx.js */ 1)["default"], __webpack_require__(/*! ./node_modules/@dcloudio/uni-mp-weixin/dist/index.js */ 2)["createPage"]))

/***/ }),

/***/ 271:
/*!***************************************************!*\
  !*** D:/ouying/o2_store/pages/mine/mine_push.vue ***!
  \***************************************************/
/*! no static exports found */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _mine_push_vue_vue_type_template_id_4f4f6883___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./mine_push.vue?vue&type=template&id=4f4f6883& */ 272);
/* harmony import */ var _mine_push_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./mine_push.vue?vue&type=script&lang=js& */ 274);
/* harmony reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in _mine_push_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__) if(["default"].indexOf(__WEBPACK_IMPORT_KEY__) < 0) (function(key) { __webpack_require__.d(__webpack_exports__, key, function() { return _mine_push_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__[key]; }) }(__WEBPACK_IMPORT_KEY__));
/* harmony import */ var _mine_push_vue_vue_type_style_index_0_lang_css___WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./mine_push.vue?vue&type=style&index=0&lang=css& */ 276);
/* harmony import */ var _HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../../../HBuilderX/plugins/uniapp-cli/node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib/runtime/componentNormalizer.js */ 32);

var renderjs





/* normalize component */

var component = Object(_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_3__["default"])(
  _mine_push_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__["default"],
  _mine_push_vue_vue_type_template_id_4f4f6883___WEBPACK_IMPORTED_MODULE_0__["render"],
  _mine_push_vue_vue_type_template_id_4f4f6883___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"],
  false,
  null,
  null,
  null,
  false,
  _mine_push_vue_vue_type_template_id_4f4f6883___WEBPACK_IMPORTED_MODULE_0__["components"],
  renderjs
)

component.options.__file = "pages/mine/mine_push.vue"
/* harmony default export */ __webpack_exports__["default"] = (component.exports);

/***/ }),

/***/ 272:
/*!**********************************************************************************!*\
  !*** D:/ouying/o2_store/pages/mine/mine_push.vue?vue&type=template&id=4f4f6883& ***!
  \**********************************************************************************/
/*! exports provided: render, staticRenderFns, recyclableRender, components */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_17_0_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_template_js_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_uni_app_loader_page_meta_js_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_mine_push_vue_vue_type_template_id_4f4f6883___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../HBuilderX/plugins/uniapp-cli/node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!../../../../HBuilderX/plugins/uniapp-cli/node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-preprocess-loader??ref--17-0!../../../../HBuilderX/plugins/uniapp-cli/node_modules/@dcloudio/webpack-uni-mp-loader/lib/template.js!../../../../HBuilderX/plugins/uniapp-cli/node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-uni-app-loader/page-meta.js!../../../../HBuilderX/plugins/uniapp-cli/node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib??vue-loader-options!../../../../HBuilderX/plugins/uniapp-cli/node_modules/@dcloudio/webpack-uni-mp-loader/lib/style.js!./mine_push.vue?vue&type=template&id=4f4f6883& */ 273);
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "render", function() { return _HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_17_0_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_template_js_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_uni_app_loader_page_meta_js_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_mine_push_vue_vue_type_template_id_4f4f6883___WEBPACK_IMPORTED_MODULE_0__["render"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "staticRenderFns", function() { return _HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_17_0_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_template_js_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_uni_app_loader_page_meta_js_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_mine_push_vue_vue_type_template_id_4f4f6883___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "recyclableRender", function() { return _HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_17_0_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_template_js_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_uni_app_loader_page_meta_js_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_mine_push_vue_vue_type_template_id_4f4f6883___WEBPACK_IMPORTED_MODULE_0__["recyclableRender"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "components", function() { return _HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_17_0_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_template_js_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_uni_app_loader_page_meta_js_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_mine_push_vue_vue_type_template_id_4f4f6883___WEBPACK_IMPORTED_MODULE_0__["components"]; });



/***/ }),

/***/ 273:
/*!**********************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-preprocess-loader??ref--17-0!./node_modules/@dcloudio/webpack-uni-mp-loader/lib/template.js!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-uni-app-loader/page-meta.js!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib??vue-loader-options!./node_modules/@dcloudio/webpack-uni-mp-loader/lib/style.js!D:/ouying/o2_store/pages/mine/mine_push.vue?vue&type=template&id=4f4f6883& ***!
  \**********************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/*! exports provided: render, staticRenderFns, recyclableRender, components */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "render", function() { return render; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "staticRenderFns", function() { return staticRenderFns; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "recyclableRender", function() { return recyclableRender; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "components", function() { return components; });
var components
try {
  components = {
    postTypeZudui: function () {
      return __webpack_require__.e(/*! import() | uni_modules/post-type-zudui/components/post-type-zudui/post-type-zudui */ "uni_modules/post-type-zudui/components/post-type-zudui/post-type-zudui").then(__webpack_require__.bind(null, /*! @/uni_modules/post-type-zudui/components/post-type-zudui/post-type-zudui.vue */ 472))
    },
    uniLoadMore: function () {
      return Promise.all(/*! import() | uni_modules/uni-load-more/components/uni-load-more/uni-load-more */[__webpack_require__.e("common/vendor"), __webpack_require__.e("uni_modules/uni-load-more/components/uni-load-more/uni-load-more")]).then(__webpack_require__.bind(null, /*! @/uni_modules/uni-load-more/components/uni-load-more/uni-load-more.vue */ 487))
    },
  }
} catch (e) {
  if (
    e.message.indexOf("Cannot find module") !== -1 &&
    e.message.indexOf(".vue") !== -1
  ) {
    console.error(e.message)
    console.error("1. 排查组件名称拼写是否正确")
    console.error(
      "2. 排查组件是否符合 easycom 规范，文档：https://uniapp.dcloud.net.cn/collocation/pages?id=easycom"
    )
    console.error(
      "3. 若组件不符合 easycom 规范，需手动引入，并在 components 中注册该组件"
    )
  } else {
    throw e
  }
}
var render = function () {
  var _vm = this
  var _h = _vm.$createElement
  var _c = _vm._self._c || _h
}
var recyclableRender = false
var staticRenderFns = []
render._withStripped = true



/***/ }),

/***/ 274:
/*!****************************************************************************!*\
  !*** D:/ouying/o2_store/pages/mine/mine_push.vue?vue&type=script&lang=js& ***!
  \****************************************************************************/
/*! no static exports found */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _HBuilderX_plugins_uniapp_cli_node_modules_babel_loader_lib_index_js_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_13_1_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_script_js_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_mine_push_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../HBuilderX/plugins/uniapp-cli/node_modules/babel-loader/lib!../../../../HBuilderX/plugins/uniapp-cli/node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-preprocess-loader??ref--13-1!../../../../HBuilderX/plugins/uniapp-cli/node_modules/@dcloudio/webpack-uni-mp-loader/lib/script.js!../../../../HBuilderX/plugins/uniapp-cli/node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib??vue-loader-options!../../../../HBuilderX/plugins/uniapp-cli/node_modules/@dcloudio/webpack-uni-mp-loader/lib/style.js!./mine_push.vue?vue&type=script&lang=js& */ 275);
/* harmony import */ var _HBuilderX_plugins_uniapp_cli_node_modules_babel_loader_lib_index_js_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_13_1_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_script_js_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_mine_push_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_HBuilderX_plugins_uniapp_cli_node_modules_babel_loader_lib_index_js_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_13_1_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_script_js_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_mine_push_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__);
/* harmony reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in _HBuilderX_plugins_uniapp_cli_node_modules_babel_loader_lib_index_js_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_13_1_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_script_js_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_mine_push_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__) if(["default"].indexOf(__WEBPACK_IMPORT_KEY__) < 0) (function(key) { __webpack_require__.d(__webpack_exports__, key, function() { return _HBuilderX_plugins_uniapp_cli_node_modules_babel_loader_lib_index_js_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_13_1_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_script_js_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_mine_push_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__[key]; }) }(__WEBPACK_IMPORT_KEY__));
 /* harmony default export */ __webpack_exports__["default"] = (_HBuilderX_plugins_uniapp_cli_node_modules_babel_loader_lib_index_js_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_13_1_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_script_js_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_mine_push_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0___default.a); 

/***/ }),

/***/ 275:
/*!***********************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-preprocess-loader??ref--13-1!./node_modules/@dcloudio/webpack-uni-mp-loader/lib/script.js!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib??vue-loader-options!./node_modules/@dcloudio/webpack-uni-mp-loader/lib/style.js!D:/ouying/o2_store/pages/mine/mine_push.vue?vue&type=script&lang=js& ***!
  \***********************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(uni) {

var _interopRequireDefault = __webpack_require__(/*! @babel/runtime/helpers/interopRequireDefault */ 4);
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _regenerator = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/regenerator */ 34));
var _asyncToGenerator2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/helpers/asyncToGenerator */ 36));
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
var _default = {
  data: function data() {
    return {
      inviteId: {},
      // 用于 uni-load-more
      contentText: {
        contentdown: "查看更多",
        contentrefresh: "加载中...",
        contentnomore: "到底了，可点击此处手动加载~"
      },
      theIsOnIndex: 0,
      //
      line_4_items: ["全部", "已上线的", "草稿箱"],
      line_4_items_index: 0,
      // 最后的加载组件的加载动画效果，
      isLoading: "loading",
      // 用于分页加载传参
      // 当前获取的校园墙页码，每次需要+1
      theGetMomentsListPage: 1,
      theGetMomentsListPagesize: 5,
      school_datas: [],
      contentHeight: 0
    };
  },
  onLoad: function onLoad() {
    var _this2 = this;
    var query = uni.createSelectorQuery().in(this);
    query.select(".the-line-4").boundingClientRect(function (data) {
      _this2.contentHeight = data.height;
    }).exec();
    this.theGetMomentsListPage = 1;
    this.getMomentsList();
  },
  // 监听下拉动作
  onPullDownRefresh: function onPullDownRefresh() {
    var _this3 = this;
    // 重置获取的页码
    this.theGetMomentsListPage = 1;
    // 重置数组
    this.school_datas = [];
    // 异步转同步调用
    (0, _asyncToGenerator2.default)( /*#__PURE__*/_regenerator.default.mark(function _callee() {
      return _regenerator.default.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              _context.next = 2;
              return _this3.getMomentsList();
            case 2:
              // 等待接口返回后，取消下拉刷新动画
              uni.stopPullDownRefresh();
            case 3:
            case "end":
              return _context.stop();
          }
        }
      }, _callee);
    }))();
  },
  onShow: function onShow() {
    // --------------------------------------------------------------调用初始数据--------------------------------------------------------------
    // --------------------------------------------------------------调用初始数据--------------------------------------------------------------
    // --------------------------------------------------------------调用初始数据--------------------------------------------------------------
  },
  // 页面触底的监听事件，配合pages.json中的"onReachBottomDistance": 0，0的位置写距离底部的距离
  onReachBottom: function onReachBottom() {
    // 触底后动画效果开启
    this.isLoading = "loading";

    // 调用接口
    this.getMomentsList();
  },
  //分享按钮
  onShareAppMessage: function onShareAppMessage(e) {
    console.log(e, this.inviteId);
    if (e.from == "button") {
      return {
        title: this.inviteId.title,
        path: "/pages/index/detail?id=".concat(this.inviteId.id),
        imageUrl: this.inviteId.url ? this.inviteId.url.split(",")[0] : "/static/icon-zd.png"
      };
    }
  },
  methods: {
    // 邀请/组队按钮
    zuduiButtons: function () {
      var _zuduiButtons = (0, _asyncToGenerator2.default)( /*#__PURE__*/_regenerator.default.mark(function _callee2(option) {
        var temp_is_entry, i;
        return _regenerator.default.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                if (!(option.type == 1)) {
                  _context2.next = 7;
                  break;
                }
                // 1表示是组队的按钮
                // 这是保存一下当前本人的加入状态，用于判断最后本地是显示加入还是退出
                temp_is_entry = option.is_entry;
                _context2.next = 4;
                return this.$store.dispatch("toEntry", {
                  id: option.id,
                  is_entry: option.is_entry
                });
              case 4:
                // console.log('this.$store.state.is_entry_true ',this.$store.state.is_entry_true );
                if (this.$store.state.is_entry_true == true) {
                  for (i = 0; i < this.school_datas.length; i++) {
                    if (option.id == this.school_datas[i].id) {
                      if (temp_is_entry == 2) {
                        // 使用$set响应的改变对象数据，第一个参数是对象本身，第二个参数是属性（记得加引号），第三个是改变后的值
                        this.$set(this.school_datas[i], "entry_num", this.school_datas[i].entry_num + 1);
                        this.$set(this.school_datas[i], "is_entry", 1);
                        uni.showToast({
                          title: "加入成功",
                          duration: 1000,
                          icon: "none"
                        });
                      } else {
                        this.$set(this.school_datas[i], "entry_num", this.school_datas[i].entry_num - 1);
                        this.$set(this.school_datas[i], "is_entry", 2);
                        uni.showToast({
                          title: "已退出组队",
                          duration: 1000,
                          icon: "none"
                        });
                      }
                    }
                  }
                }
                _context2.next = 8;
                break;
              case 7:
                this.inviteId = option;
              case 8:
              case "end":
                return _context2.stop();
            }
          }
        }, _callee2, this);
      }));
      function zuduiButtons(_x) {
        return _zuduiButtons.apply(this, arguments);
      }
      return zuduiButtons;
    }(),
    // 切换状态
    line_4_itemsSelected: function line_4_itemsSelected(index) {
      // console.log(1111111);
      this.line_4_items_index = index;
      this.theIsOnIndex = index;
      this.school_datas = [];
      this.theGetMomentsListPage = 1;
      this.getMomentsList();
    },
    // 个人主页兼职不可以展示联系按钮
    toJzDetail: function toJzDetail(id) {
      console.log(id);
      var url = "/pages/index/detail?id=" + id;
      url += "&noPhone=1";
      var index = this.school_datas.findIndex(function (el) {
        return el.id == id;
      });
      if (index > -1) {
        url += this.school_datas[index].is_on == 1 ? "" : "&noMore=1";
      }
      uni.navigateTo({
        url: url
      });
    },
    // 跳转详情页
    toDetail: function toDetail(id) {
      console.log(id);
      var url = "/pages/index/detail?id=" + id;
      var index = this.school_datas.findIndex(function (el) {
        return el.id == id;
      });
      if (index > -1) {
        url += this.school_datas[index].is_on == 1 ? "" : "&noMore=1";
      }
      uni.navigateTo({
        url: url
      });
    },
    //打开三个点的操作
    actionMore: function actionMore(option) {
      var _this4 = this;
      var that = this;
      var itemList = [option.is_on == 1 ? "下线撤回" : "上线发布"];
      if (option.is_on == 2) {
        itemList.unshift("编辑");
      }
      uni.showActionSheet({
        itemList: itemList,
        itemColor: "#333333",
        success: function success(res) {
          // console.log(res.tapIndex);
          if (["下线撤回", "上线发布"].includes(itemList[res.tapIndex])) {
            _this4.toOn(option);
          } else if (["编辑"].includes(itemList[res.tapIndex])) {
            uni.navigateTo({
              url: "/page_product/pages/push/index?type=" + option.type + "&id=" + option.id
            });
          }
        },
        fail: function fail(res) {
          // console.log(res.errMsg);
        }
      });
    },
    // 上下线
    toOn: function () {
      var _toOn = (0, _asyncToGenerator2.default)( /*#__PURE__*/_regenerator.default.mark(function _callee3(option) {
        return _regenerator.default.wrap(function _callee3$(_context3) {
          while (1) {
            switch (_context3.prev = _context3.next) {
              case 0:
                // 每次调用前先重置一下
                this.$store.state.isOn_true = false;
                if (!(option.is_on == 1)) {
                  _context3.next = 7;
                  break;
                }
                _context3.next = 4;
                return this.$store.dispatch("upDownMyMoments", {
                  id: option.id,
                  is_on: 2,
                  type: "发布管理"
                });
              case 4:
                if (this.$store.state.isOn_true == true) {
                  // 调用成功
                  this.line_4_itemsSelected(2); // 操作成功，就跳转草稿页
                }
                _context3.next = 10;
                break;
              case 7:
                _context3.next = 9;
                return this.$store.dispatch("upDownMyMoments", {
                  id: option.id,
                  is_on: 1,
                  type: "发布管理"
                });
              case 9:
                if (this.$store.state.isOn_true == true) {
                  // 调用成功
                  this.line_4_itemsSelected(1); // 操作成功，就跳转已上线页
                }
              case 10:
              case "end":
                return _context3.stop();
            }
          }
        }, _callee3, this);
      }));
      function toOn(_x2) {
        return _toOn.apply(this, arguments);
      }
      return toOn;
    }(),
    //------------------------------------------------  接口方法  -----------------------------------------------------
    //------------------------------------------------  接口方法  -----------------------------------------------------
    //------------------------------------------------  接口方法  -----------------------------------------------------
    // 分页获取接口数据
    getMomentsList: function getMomentsList() {
      var _this = this;
      return new Promise(function (resolve, reject) {
        var that = _this;
        that.isLoading = "loading"; // 加载中
        uni.request({
          url: that.$store.state.theUrl + "/wechat/moments/getMomentsList",
          method: "POST",
          header: {
            token: that.$store.state.theToken
          },
          data: {
            create_id: that.$store.state.theLogonUser.id,
            // 传参不全，当前只用到onload时候需要的字段
            page: that.theGetMomentsListPage,
            pagesize: that.theGetMomentsListPagesize,
            // 校园墙类型：话题、组队/搭子、分享/安利、二手闲置、兼职、表白、求助、其他，传空字符串为全部
            // schoolOneTitleIndex == 0 表示是综合，就是全部的意思，所以传空
            // type:(that.schoolOneTitleIndex == 0 ?'':that.titles[that.schoolOneTitleIndex]),
            type: "",
            // 是否上线 是否上线，1-是（默认），2-草稿，0-全部
            is_on: that.theIsOnIndex
          },
          success: function success(res) {
            // console.log('getMomentsList_res', res);
            var _that = that;
            // 如果是请求第一页，证明是首次请求，就重置一下
            if (_that.theGetMomentsListPage == 1) {
              _that.school_datas = [];
            }
            if (res.data.code == 0) {
              if (res.data.data.length != 0) {
                for (var i = 0; i < res.data.data.length; i++) {
                  _that.school_datas.push(res.data.data[i]);
                }
                console.log("_that.school_datas", _that.school_datas);
                _that.isLoading = "no-more"; // 取消加载动画
                // 页面+1
                _that.theGetMomentsListPage += 1;
                resolve();
              } else {
                _that.isLoading = "no-more"; // 取消加载动画
                // uni.showToast({
                // 	title: '没有更多了哦~',
                // 	duration: 1500,
                // 	icon: 'none'
                // })
                resolve();
              }
            } else if (res.data.code == 500) {
              uni.showToast({
                title: "服务器连接失败，请反馈官方客服哦~",
                duration: 2500,
                icon: "none"
              });
            } else if (res.data.code == 410) {
              var __that = _that;
              // 异步转同步，
              (0, _asyncToGenerator2.default)( /*#__PURE__*/_regenerator.default.mark(function _callee4() {
                return _regenerator.default.wrap(function _callee4$(_context4) {
                  while (1) {
                    switch (_context4.prev = _context4.next) {
                      case 0:
                        _context4.next = 2;
                        return __that.$store.dispatch("toLogon", {});
                      case 2:
                        // 重置
                        __that.school_datas = [];
                        // 获取省市数据
                        __that.getMomentsList();
                      case 4:
                      case "end":
                        return _context4.stop();
                    }
                  }
                }, _callee4);
              }))();
            } else {
              uni.showToast({
                title: res.data.msg,
                duration: 2500,
                icon: "none"
              });
            }
          },
          fail: function fail(res) {
            uni.showToast({
              title: "网络失败，请重试！多次无效后，反馈官方客服哦！",
              duration: 2500,
              icon: "none"
            });
          }
        });
      });
    }
  }
};
exports.default = _default;
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./node_modules/@dcloudio/uni-mp-weixin/dist/index.js */ 2)["default"]))

/***/ }),

/***/ 276:
/*!************************************************************************************!*\
  !*** D:/ouying/o2_store/pages/mine/mine_push.vue?vue&type=style&index=0&lang=css& ***!
  \************************************************************************************/
/*! no static exports found */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _HBuilderX_plugins_uniapp_cli_node_modules_mini_css_extract_plugin_dist_loader_js_ref_6_oneOf_1_0_HBuilderX_plugins_uniapp_cli_node_modules_css_loader_dist_cjs_js_ref_6_oneOf_1_1_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_loaders_stylePostLoader_js_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_6_oneOf_1_2_HBuilderX_plugins_uniapp_cli_node_modules_postcss_loader_src_index_js_ref_6_oneOf_1_3_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_mine_push_vue_vue_type_style_index_0_lang_css___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../HBuilderX/plugins/uniapp-cli/node_modules/mini-css-extract-plugin/dist/loader.js??ref--6-oneOf-1-0!../../../../HBuilderX/plugins/uniapp-cli/node_modules/css-loader/dist/cjs.js??ref--6-oneOf-1-1!../../../../HBuilderX/plugins/uniapp-cli/node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib/loaders/stylePostLoader.js!../../../../HBuilderX/plugins/uniapp-cli/node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-preprocess-loader??ref--6-oneOf-1-2!../../../../HBuilderX/plugins/uniapp-cli/node_modules/postcss-loader/src??ref--6-oneOf-1-3!../../../../HBuilderX/plugins/uniapp-cli/node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib??vue-loader-options!../../../../HBuilderX/plugins/uniapp-cli/node_modules/@dcloudio/webpack-uni-mp-loader/lib/style.js!./mine_push.vue?vue&type=style&index=0&lang=css& */ 277);
/* harmony import */ var _HBuilderX_plugins_uniapp_cli_node_modules_mini_css_extract_plugin_dist_loader_js_ref_6_oneOf_1_0_HBuilderX_plugins_uniapp_cli_node_modules_css_loader_dist_cjs_js_ref_6_oneOf_1_1_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_loaders_stylePostLoader_js_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_6_oneOf_1_2_HBuilderX_plugins_uniapp_cli_node_modules_postcss_loader_src_index_js_ref_6_oneOf_1_3_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_mine_push_vue_vue_type_style_index_0_lang_css___WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_HBuilderX_plugins_uniapp_cli_node_modules_mini_css_extract_plugin_dist_loader_js_ref_6_oneOf_1_0_HBuilderX_plugins_uniapp_cli_node_modules_css_loader_dist_cjs_js_ref_6_oneOf_1_1_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_loaders_stylePostLoader_js_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_6_oneOf_1_2_HBuilderX_plugins_uniapp_cli_node_modules_postcss_loader_src_index_js_ref_6_oneOf_1_3_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_mine_push_vue_vue_type_style_index_0_lang_css___WEBPACK_IMPORTED_MODULE_0__);
/* harmony reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in _HBuilderX_plugins_uniapp_cli_node_modules_mini_css_extract_plugin_dist_loader_js_ref_6_oneOf_1_0_HBuilderX_plugins_uniapp_cli_node_modules_css_loader_dist_cjs_js_ref_6_oneOf_1_1_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_loaders_stylePostLoader_js_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_6_oneOf_1_2_HBuilderX_plugins_uniapp_cli_node_modules_postcss_loader_src_index_js_ref_6_oneOf_1_3_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_mine_push_vue_vue_type_style_index_0_lang_css___WEBPACK_IMPORTED_MODULE_0__) if(["default"].indexOf(__WEBPACK_IMPORT_KEY__) < 0) (function(key) { __webpack_require__.d(__webpack_exports__, key, function() { return _HBuilderX_plugins_uniapp_cli_node_modules_mini_css_extract_plugin_dist_loader_js_ref_6_oneOf_1_0_HBuilderX_plugins_uniapp_cli_node_modules_css_loader_dist_cjs_js_ref_6_oneOf_1_1_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_loaders_stylePostLoader_js_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_6_oneOf_1_2_HBuilderX_plugins_uniapp_cli_node_modules_postcss_loader_src_index_js_ref_6_oneOf_1_3_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_mine_push_vue_vue_type_style_index_0_lang_css___WEBPACK_IMPORTED_MODULE_0__[key]; }) }(__WEBPACK_IMPORT_KEY__));
 /* harmony default export */ __webpack_exports__["default"] = (_HBuilderX_plugins_uniapp_cli_node_modules_mini_css_extract_plugin_dist_loader_js_ref_6_oneOf_1_0_HBuilderX_plugins_uniapp_cli_node_modules_css_loader_dist_cjs_js_ref_6_oneOf_1_1_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_loaders_stylePostLoader_js_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_6_oneOf_1_2_HBuilderX_plugins_uniapp_cli_node_modules_postcss_loader_src_index_js_ref_6_oneOf_1_3_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_mine_push_vue_vue_type_style_index_0_lang_css___WEBPACK_IMPORTED_MODULE_0___default.a); 

/***/ }),

/***/ 277:
/*!****************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/mini-css-extract-plugin/dist/loader.js??ref--6-oneOf-1-0!./node_modules/css-loader/dist/cjs.js??ref--6-oneOf-1-1!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-preprocess-loader??ref--6-oneOf-1-2!./node_modules/postcss-loader/src??ref--6-oneOf-1-3!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib??vue-loader-options!./node_modules/@dcloudio/webpack-uni-mp-loader/lib/style.js!D:/ouying/o2_store/pages/mine/mine_push.vue?vue&type=style&index=0&lang=css& ***!
  \****************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// extracted by mini-css-extract-plugin
    if(false) { var cssReload; }
  

/***/ })

},[[270,"common/runtime","common/vendor"]]]);
//# sourceMappingURL=../../../.sourcemap/mp-weixin/pages/mine/mine_push.js.map