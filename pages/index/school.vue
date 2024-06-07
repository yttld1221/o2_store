<template>
  <view class="content">
    <!-- 置顶的 -->
    <view class="top">
      <uni-search-bar @input="toInput" v-model="searchValue"></uni-search-bar>
      <!-- 25px -->
      <view class="selected">
        <view class="selected-tip">已选择</view>
        <view class="selected-content">
          <uni-icons
            type="map-pin-ellipse"
            size="17"
            color="#ff812f"
          ></uni-icons>
          <view class="margin-left-5">当前：</view>
          <view class="margin-left-5"
            >{{ schoolNow != "" ? schoolNow.substring(0, 9) : "(空)"
            }}{{ schoolNow.length > 9 ? "…" : "" }}
          </view>
        </view>
      </view>
      <!-- 50px -->
      <view class="the-selected">
        <view class="the-selected-title">
          <text>{{
            tempSelectedSchool.title != ""
              ? tempSelectedSchool.title
              : "默认全部校区"
          }}</text>
        </view>
        <uni-icons
          v-if="tempSelectedSchool.title != ''"
          @click="cleanSchool()"
          type="clear"
          size="25"
          color="#727272"
        ></uni-icons>
        <view @click="confirmSchool()" class="the-button">确认选择</view>
      </view>
    </view>
    <!-- 列表 -->
    <view
      class="address-box"
      :style="'margin-top:' + (56 + 25 + 15 + 50) + 'px;'"
    >
      <address-recursion
        @selectingAddress="selectingSchool"
        :level="1"
        :searchValue="searchValue"
        :theData="tempschoolData"
      ></address-recursion>
    </view>
    <!-- 底部垫层 -->
    <view class="space-line-bottom">
      <uni-load-more :status="isLoading"></uni-load-more>
    </view>
  </view>
</template>

<script>
export default {
  data() {
    return {
      // 用于接受跳转过来的页面，目前主要用到注册界面需要区分对待
      type: "",

      // 搜索栏的内容
      searchValue: "",
      schoolNow: "",

      // 临时选中的学校
      tempSelectedSchool: {
        id: 0,
        title: "",
        status: 1,
        addr: "",
        create_id: 1,
        update_id: 1,
      },

      // 搜索框输入内容
      searchValue: "",

      // 临时存储
      tempschoolData: [],
      // 学校数据
      schoolData: [
        {
          addr: "",
          create_id: 0,
          created_at: "",
          id: 0,
          title: "", // 接口返回的是name,这里统一改成title
          status: 0,
          update_id: 0,
          updated_at: "",
        },
      ],
    };
  },
  onLoad(option) {
    // 获取默认选择的位置
    this.getStore_schoolNow();

    this.type = option.type;

    // --------------------------------------------------------------调用初始数据--------------------------------------------------------------
    // --------------------------------------------------------------调用初始数据--------------------------------------------------------------
    // --------------------------------------------------------------调用初始数据--------------------------------------------------------------
    this.getAllSchool();
  },
  onPullDownRefresh() {
    let that = this;
    // 重置搜索文本
    this.searchValue = "";
    // 重置数组
    that.schoolData = [];
    // 异步转同步调用
    (async function () {
      await that.getAllSchool();
      // 等待接口返回后，取消下拉刷新动画
      uni.stopPullDownRefresh();
    })();
  },
  methods: {
    // 获取全局中保存的当前学校
    getStore_schoolNow: function () {
      this.schoolNow = this.$store.state.store_schoolNow.title;
      console.log(this.schoolNow);
    },
    // 选中学校
    selectingSchool: function (item) {
      this.tempSelectedSchool = item[0];
    },
    // 清空选中学校
    cleanSchool: function () {
      this.tempSelectedSchool = {
        id: 0,
        title: "",
        status: 1,
        addr: "",
        create_id: 1,
        update_id: 1,
      };
    },
    // 确认选中的学校
    confirmSchool: function () {
      if (this.type == "register") {
        uni.$emit("changeResSchool", this.tempSelectedSchool);
        uni.navigateBack({
          delta: 2, // 返回最外层
        });
      } else {
        this.$store.commit("changeStore_schoolNow", {
          id: this.tempSelectedSchool.id,
          title: this.tempSelectedSchool.title,
          status: this.tempSelectedSchool.status,
          addr: this.tempSelectedSchool.addr,
          create_id: this.tempSelectedSchool.create_id,
          update_id: this.tempSelectedSchool.update_id,
        });
        if (this.tempSelectedSchool.title != this.schoolNow) {
          uni.$emit("changeIndexSchool", {});
        }
        uni.navigateBack(); // 返回上层
      }
    },
    // 输入框输入内容
    toInput: function () {
      if (this.searchValue != "") {
      } else {
        this.tempschoolData = [];
        // 赋值
        for (let i = 0; i < this.schoolData.length; i++) {
          this.tempschoolData.push({
            addr: this.schoolData[i].addr,
            create_id: this.schoolData[i].create_id,
            created_at: this.schoolData[i].created_at,
            id: this.schoolData[i].id,
            title: this.schoolData[i].title,
            status: this.schoolData[i].status,
            update_id: this.schoolData[i].update_id,
            updated_at: this.schoolData[i].updated_at,
          });
        }
      }
    },
    //------------------------------------------------  接口方法  -----------------------------------------------------
    //------------------------------------------------  接口方法  -----------------------------------------------------
    //------------------------------------------------  接口方法  -----------------------------------------------------
    getAllSchool: function () {
      let _this = this;
      return new Promise(function (resolve, reject) {
        let that = _this;

        uni.request({
          url: that.$store.state.theUrl + "/wechat/sundry/getAllSchool",
          method: "GET",
          header: {
            token: that.$store.state.theToken,
          },
          data: {
            // 	启用状态：0-全部，1-启用（默认），2-禁用
            status: 1,
            // 当前选的那级的行政区划代码，全国就传空字符串或不传该字段，
            // 举例：如果选择浙江省就传浙江省的代码，不需要传所有浙江省下面地级市的代码；选择宁波就只要传宁波的区划代码
            area_code:
              that.type != "register"
                ? that.$store.state.store_addressNow.code
                : that.$store.state.store_addressRegister.code,
          },
          success: (res) => {
            // console.log('that.$store.state.theToken',that.$store.state.theToken);
            // console.log('getAllSchool_res',res);
            let _that = that;
            if (res.data.code == 0) {
              _that.schoolData = [];
              _that.tempschoolData = [];
              for (let i = 0; i < res.data.data.length; i++) {
                _that.schoolData.push({
                  addr: res.data.data[i].addr,
                  create_id: res.data.data[i].create_id,
                  created_at: res.data.data[i].created_at,
                  id: res.data.data[i].id,
                  title: res.data.data[i].name,
                  status: res.data.data[i].status,
                  update_id: res.data.data[i].update_id,
                  updated_at: res.data.data[i].updated_at,
                });
                // 搜索用的，这里默认先赋值一下，后面就是每次搜索的时候，从schoolData拿
                _that.tempschoolData.push({
                  addr: res.data.data[i].addr,
                  create_id: res.data.data[i].create_id,
                  created_at: res.data.data[i].created_at,
                  id: res.data.data[i].id,
                  title: res.data.data[i].name,
                  status: res.data.data[i].status,
                  update_id: res.data.data[i].update_id,
                  updated_at: res.data.data[i].updated_at,
                });
              }
              // 判断如果当前地区没有学校，就提示返回首页
              if (_that.schoolData.length == 0) {
                uni.showModal({
                  title: "温馨提示：",
                  content: "当前地区暂无开放的学校哦，敬请期待吧＾ω＾",
                  confirmText: "返回",
                  confirmColor: "#f89f12",
                  showCancel: false,
                  success: function (res) {
                    if (res.confirm) {
                      uni.navigateBack();
                    }
                  },
                });
              }

              _that.isLoading = "no-more"; // 取消加载动画
              // console.log('_that.schoolData',_that.schoolData);
            } else if (res.data.code == 500) {
              uni.showToast({
                title: "服务器连接失败，请反馈官方客服哦~",
                duration: 2500,
                icon: "none",
              });
            } else if (res.data.code == 410) {
              let __that = _that;
              // 异步转同步，
              (async function () {
                // 登录
                await __that.$store.dispatch("toLogon", {});
                // 获取省市数据
                __that.getAllSchool();
              })();
            } else {
              uni.showToast({
                title: res.data.msg,
                duration: 2500,
                icon: "none",
              });
            }

            resolve();
          },
          fail: (res) => {
            uni.showToast({
              title: "网络失败，请重试！多次无效后，反馈官方客服哦！",
              duration: 2500,
              icon: "none",
            });

            resolve();
          },
        });
      });
    },
  },
};
</script>

<style>
.margin-left-5 {
  margin-left: 3.5vw;
}

::-webkit-scrollbar {
  width: 0;
  height: 0;
}

.content {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.top {
  background-color: #ffffff;
  width: 100vw;
  position: fixed;
  top: 0;
}

.selected {
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
}

.selected-tip {
  margin-left: 3.5vw;
  height: 25px;
  line-height: 25px;
  font-size: 13px;
  color: #bbbbbb;
}

.selected-content {
  display: flex;
  flex-direction: row;
  align-items: center;
  margin-right: 15px;
  font-size: 13px;
  height: 25px;
  line-height: 25px;
}

.the-selected {
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  padding: 0 0 0 15px;
  background-color: #f6f6f6;
  margin-top: 15px;
}

.the-selected-title {
  width: 45vw;
  overflow: scroll;
}

.the-selected-title text {
  white-space: nowrap;
}

.the-button {
  background-color: #f89f12;
  color: #ffffff;
  padding: 0 15px;
  height: 35px !important;
  line-height: 35px !important;
  border-radius: 15px;
}

.the-selected view {
  margin-right: 3.5vw;
  height: 50px;
  line-height: 50px;
}

.space-line-bottom {
  height: 100px;
}
</style>