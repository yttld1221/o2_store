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
          <view class="margin-left-5">
            {{
              addressNow != undefined
                ? addressNow != ""
                  ? addressNow.substring(0, 9)
                  : "(空)"
                : "(空)"
            }}{{
              addressNow != undefined ? (addressNow.length > 9 ? "…" : "") : ""
            }}
          </view>
        </view>
      </view>
      <!-- 50px -->
      <view class="the-selected">
        <view class="the-selected-title">
          <text>{{ tempSelectedAddress.title }}</text>
        </view>
        <view @click="confirmAddress()" class="the-button">确认选择</view>
      </view>
    </view>
    <!-- 列表 -->
    <view
      class="address-box"
      :style="'margin-top:' + (56 + 25 + 15 + 50) + 'px;'"
    >
      <address-recursion
        @selectingAddress="selectingAddress"
        :level="2"
        :searchValue="searchValue"
        :theData="tempAddressData"
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
      // 这个页面是复用的，所以这里要知道到底是哪个页面过来的，"index"表示首页选择地区，"push"表示发布页面选择地区
      // 这里没有用到uniapp的监听器，后期有机会试一下，这里用到全局文件store传递数据
      type: 0,
      isLoading: "loading",

      // 搜索栏的内容
      searchValue: "",
      addressNow: "",

      // 临时选中的地址
      tempSelectedAddress: {
        title: "",
        status: 0,
        code: "",
      },

      // 临时存储
      tempAddressData: [],
      // 地址数据
      addressData: [
        {
          title: "浙江省",
          status: 1,
          code: "110000",
          children: [
            {
              title: "杭州市",
              status: 1,
              code: "110100",
              children: [],
            },
            {
              title: "宁波市",
              status: 1,
              code: "110200",
              children: [],
            },
            {
              title: "温州市",
              status: 1,
              code: "110300",
              children: [],
            },
            {
              title: "绍兴市娃娃大碗大碗大碗大碗大碗大碗的有很多",
              status: 1,
              code: "110400",
              children: [],
            },
          ],
        },
        {
          title: "江苏省",
          status: 1,
          code: "210000",
          children: [
            {
              title: "苏州市",
              status: 1,
              code: "210100",
              children: [],
            },
            {
              title: "南京市",
              status: 1,
              code: "210200",
              children: [],
            },
            {
              title: "无锡市",
              status: 1,
              code: "210300",
              children: [],
            },
            {
              title: "南通市",
              status: 1,
              code: "210400",
              children: [],
            },
          ],
        },
      ],
    };
  },
  onLoad(option) {
    // 判断是哪里调过来的，因为这个页面在发布中也用到，两个逻辑不一样
    // console.log('option',option);
    this.type = option.type;

    // 获取默认选择的位置
    this.getStore_addressNow();

    // --------------------------------------------------------------调用初始数据--------------------------------------------------------------
    // --------------------------------------------------------------调用初始数据--------------------------------------------------------------
    // --------------------------------------------------------------调用初始数据--------------------------------------------------------------
    this.getAreaTree();
  },
  onShow() {},
  onPullDownRefresh() {
    let that = this;
    // 重置搜索文本
    this.searchValue = "";
    // 重置数组
    that.addressData = [];
    // 异步转同步调用
    (async function () {
      await that.getAreaTree();
      // 等待接口返回后，取消下拉刷新动画
      uni.stopPullDownRefresh();
    })();
  },
  methods: {
    // 浏览器本地存储和删除
    setStorageSync: function (key, data) {
      try {
        uni.setStorageSync(key, data);
      } catch (e) {
        uni.showToast({
          title: e,
          duration: 2500,
          icon: "none",
        });
      }
    },
    getStorageSync: function (key) {
      try {
        const value = uni.getStorageSync(key);
        return value;
      } catch (e) {
        uni.showToast({
          title: e,
          duration: 2500,
          icon: "none",
        });
      }
    },

    getStore_addressNow: function () {
      this.addressNow = this.$store.state.store_addressNow.title;
    },
    // 选中地址
    selectingAddress: function (item) {
      this.tempSelectedAddress = item[0];
    },
    // 确认选中的地址
    confirmAddress: function () {
      if (this.tempSelectedAddress.title != "") {
        // 空的
        if (this.type == "index") {
          this.$store.commit("changeStore_addressNow", {
            tempSelectedAddress: this.tempSelectedAddress,
          });

          // 存本地
          this.setStorageSync("storage_addressNow", this.tempSelectedAddress);

          uni.navigateBack();
        } else if (this.type == "register") {
          this.$store.commit("changeStore_addressRegister", {
            tempSelectedAddress: this.tempSelectedAddress,
          });
          // 选择完地区后，跳转选择学校
          uni.navigateTo({
            url: "/pages/index/school?type=register",
          });
        } else {
          // 目前只有发布页面用到，就用else  不做判断了
          this.$store.commit("changeStore_addressPush", {
            tempSelectedAddress: this.tempSelectedAddress,
          });
          uni.navigateBack();
        }
      } else {
        uni.showToast({
          title: "选择一个地区(*^_^*)吧~",
          duration: 2500,
          icon: "none",
        });
      }
    },
    // 输入框输入内容
    toInput: function () {
      if (this.searchValue != "") {
        // // 重置原始数据
        // this.tempAddressData = [];
        // for(let i=0;i<this.addressData.length;i++){
        // 	this.tempAddressData.push(this.addressData[i]);
        // }
        // // 去除不必要的数据
        // for (let i = 0; i < this.tempAddressData.length; i++) {
        // 	for (let j = 0; j < this.tempAddressData[i].children.length; j++) {
        // 		if(this.tempAddressData[i].children[j].title.indexOf(this.searchValue) == -1){
        // 			this.tempAddressData[i].children.splice(j,1);//删除城市
        // 			j=j-1;
        // 		}
        // 	}
        // }
      } else {
        this.tempAddressData = [];
        // 赋值
        for (let i = 0; i < this.addressData.length; i++) {
          this.tempAddressData.push(this.addressData[i]);
        }
      }
    },
    //------------------------------------------------  接口方法  -----------------------------------------------------
    //------------------------------------------------  接口方法  -----------------------------------------------------
    //------------------------------------------------  接口方法  -----------------------------------------------------
    // 获取省市树结构，已经组成tree结构
    getAreaTree: function () {
      let _this = this;
      return new Promise(function (resolve, reject) {
        let that = _this;
        uni.request({
          url: that.$store.state.theUrl + "/wechat/sundry/getAreaTree",
          method: "POST",
          header: {
            token: that.$store.state.theToken,
          },
          data: {
            // 	启用状态：0-全部，1-启用（默认），2-禁用
            status: 1,
          },
          success: (res) => {
            // console.log('that.$store.state.theToken',that.$store.state.theToken);
            // console.log('getAreaTree_res',res);
            let _that = that;
            if (res.data.code == 0) {
              _that.addressData = [];
              _that.tempAddressData = [];
              for (let i = 0; i < res.data.data.length; i++) {
                _that.addressData.push(res.data.data[i]);
                // 搜索用的，这里默认先赋值一下，后面就是每次搜索的时候，从addressData拿
                _that.tempAddressData.push(res.data.data[i]);
              }

              _that.isLoading = "no-more"; // 取消加载动画
              // console.log('_that.addressData',_that.addressData);
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
                __that.getAreaTree();
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
  width: 60vw;
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