<template>
  <view class="tabbar">
    <!-- <view class="message">
			<uni-icons :animation="animationData" type="chatboxes" size="30" color="#ffffff"></uni-icons>
		</view> -->

    <view
      :class="{ 'tabbar-item': true, 'tabbar-item-push': index == 2 }"
      v-for="(item, index) in list"
      :key="index"
      @click="changeTab(index)"
    >
      <view :class="{ 'img-box': index == 2 }">
        <image
          :animation="index == 3 ? animationData : ''"
          :class="{ img: true, push: index == 2 }"
          mode="widthFix"
          :src="item.selectedIconPath"
          v-if="momentIndex == index"
        ></image>
        <image
          :animation="index == 3 ? animationData : ''"
          :class="{ img: true, push: index == 2 }"
          mode="widthFix"
          :src="item.iconPath"
          v-else
        ></image>
        <image
          class="push-hidden"
          :class="{ img: true }"
          mode="widthFix"
          src="@/static/2_tabbar_follow@3x.png"
          v-if="index == 2"
        ></image>
        <view class="text active" v-if="momentIndex == index">{{
          item.text
        }}</view>
        <view class="text" v-else
          >{{ item.text
          }}<text v-if="index == 3 && isRedTip" class="red-tip"></text
        ></view>
      </view>
    </view>
    <u-popup
      @close="closePop()"
      :duration="50"
      :safeAreaInsetBottom="false"
      :round="10"
      :show="show"
      mode="bottom"
    >
      <view class="push-pop">
        <view class="pop-title">选择分类</view>
        <view class="push-container">
          <view
            @click="toPush(item)"
            class="push-item"
            v-for="(item, index) in pushListTop"
            :key="index"
          >
            <image :src="item.url"></image>
            {{ item.label }}
          </view>
        </view>
        <view class="push-container">
          <view
            @click="toPush(item)"
            class="push-item"
            v-for="(item, index) in pushListBottom"
            :key="index"
          >
            <image :src="item.url"></image>
            {{ item.label }}
          </view>
        </view>
      </view>
    </u-popup>
  </view>
</template>

<script>
export default {
  name: "tabbar",
  props: ["current"],
  watch: {
    current: {
      handler(newVal) {
        this.momentIndex = newVal;
      },
      deep: true,
    },
  },
  mounted() {
    this.momentIndex = this.current;
  },
  data() {
    return {
      momentIndex: 0,
      show: false,
      animation: null,
      // 动画
      animationData: {},
      pushListTop: [
        {
          label: "话题",
          url: require("@/static/icon-ht.png"),
          show: true,
        },
        {
          label: "组队/搭子",
          url: require("@/static/icon-zd.png"),
          show: true,
        },
        {
          label: "分享/安利",
          url: require("@/static/icon-fx.png"),
          show: true,
        },
        {
          label: "二手闲置",
          url: require("@/static/icon-xz.png"),
          show: true,
        },
      ],
      pushListBottom: [
        {
          label: "兼职",
          url: require("@/static/icon-jz.png"),
          show: true,
        },
        {
          label: "表白",
          url: require("@/static/icon-bb.png"),
          show: true,
        },
        {
          label: "求助",
          url: require("@/static/icon-qz.png"),
          show: true,
        },
        {
          label: "其他",
          url: require("@/static/icon-qt.png"),
          show: true,
        },
      ],
      list: [
        {
          pagePath: "pages/index/index",
          iconPath: "/static/1_tabbar_index@3x.png",
          selectedIconPath: "/static/1_tabbar_index_selected@3x.png",
          text: "首页",
        },
        {
          pagePath: "pages/follow/follow",
          iconPath: "/static/2_tabbar_follow@3x.png",
          selectedIconPath: "/static/2_tabbar_follow_selected@3x.png",
          text: "关注",
        },
        {
          pagePath: "pages/push/push",
          iconPath: "/static/3_tabbar_push_new@3x.png",
          selectedIconPath: "/static/3_tabbar_push_cancel_new@3x.png",
          text: "发布",
        },
        {
          pagePath: "pages/message/message",
          iconPath: "/static/4_tabbar_message@3x.png",
          selectedIconPath: "/static/4_tabbar_message_selected@3x.png",
          text: "消息",
        },
        {
          pagePath: "pages/mine/mine",
          iconPath: "/static/5_tabbar_mine@3x.png",
          selectedIconPath: "/static/5_tabbar_mine_selected@3x.png",
          text: "我的",
        },
      ],
    };
  },
  created() {
    uni.hideTabBar();
  },
  computed: {
    isRedTip: function () {
      return this.$store.state.isRedTip;
    },
  },
  methods: {
    closePop() {
      this.show = false;
      this.momentIndex = this.current;
    },
    toPush(item) {
      uni.navigateTo({
        url: "/page_product/pages/push/index?type=" + item.label,
      });
    },
    // 动画效果
    animtionAction: function () {
      this.animation = uni.createAnimation({
        duration: 250,
        timingFunction: "ease",
      });

      this.animation.translateX(-10).rotateZ(-20).step();
      this.animation.translateX(10).rotateZ(20).step();
      this.animation.translateX(0).rotateZ(0).step();
      this.animationData = this.animation.export();

      let that = this;
      setTimeout(function () {
        that.animationData = {};
      }, 50);
    },
    // 重新播放动画
    resetAnimtionAction: function () {
      this.animation.clearAnimation(); // 清除之前的动画

      this.animation.translateX(-10).rotateZ(-20).step();
      this.animation.translateX(10).rotateZ(20).step();
      this.animation.translateX(0).rotateZ(0).step();

      this.animation.import(animation.export(), true); // 重新导入动画
      this.animation.play(); // 播放动画
    },

    changeTab(e) {
      if (e == 2) {
        if ([1, 2].includes(this.$store.state.theLogonUser.level)) {
          this.show = !this.show;
          this.momentIndex = this.show ? 2 : this.current;
        } else {
          uni.navigateTo({
            url:
              "/page_product/pages/info/register?level=" +
              this.$store.state.theLogonUser.level,
          });
        }
      } else {
        if (e == 3) {
          // 表示进入了消息页
        }
        uni.switchTab({
          url: "/" + this.list[e].pagePath,
        });
      }
    },
  },
};
</script>

<style lang="scss">
.tabbar {
  box-shadow: 0rpx -5rpx 6rpx 1rpx rgba(0, 0, 0, 0.04);
  font-size: 1.5vh;
  position: fixed;
  left: 0;
  bottom: 0;
  z-index: 100;
  width: 100%;
  height: 125rpx;
  display: flex;
  align-items: center;
  justify-content: space-around;
  background-color: #fff;
}

.message {
  position: fixed;
  bottom: 12vh;
  right: 3.5vw;
  background-color: #ff812f;
  width: 13.5vw;
  height: 13.5vw;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  border-radius: 100%;
  box-shadow: #cf6325 1px 3px 5px;
}

.red-tip {
  width: 10px;
  height: 10px;
  border-radius: 100%;
  background-color: #ff0000;
  position: absolute;
  top: 1vh;
  z-index: 7;
}

.tabbar-item {
  height: 100%;
  width: 20vw;
  /* padding: 0 40rpx; */
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 10090;
  background: white;
}

.tabbar-item-1 {
  /* margin-left: 1vw; */
}

.tabbar-item-3 {
  /* margin-right: 1vw; */
}

.tabbar-item-push {
  position: relative;
  z-index: 10080;
  background: transparent !important;
}

.img {
  height: 7vw;
  width: 7vw;
  /* margin: 0 4vw; */
}

.push {
  width: 100%;
  position: absolute;
  margin-top: -55rpx;
  top: 0;
}
.push-hidden {
  visibility: hidden;
}

.text {
  text-align: center;
  color: #727272;
}

.select {
  width: 10vh;
  height: 10vh;
  border-radius: 10vh;
  background: rgba(248, 125, 18, 0.1);
  margin-bottom: 4vh;
  position: relative;
}

.text.active {
  color: #ff812f;
}
.img-box {
  width: 100%;
}
.push-pop {
  padding: 45rpx 52rpx 125rpx;
  .pop-title {
    font-family: PingFang SC;
    font-weight: 500;
    font-size: 34rpx;
    color: #000000;
    margin-bottom: 6rpx;
  }
  .push-container {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    & > view {
      margin-top: 40rpx;
      display: flex;
      flex-direction: column;
      align-items: center;
      font-family: PingFang SC;
      font-weight: 400;
      font-size: 24rpx;
      color: #000000;
      image {
        width: 98rpx;
        height: 99rpx;
        margin-bottom: 26rpx;
      }
    }
  }
}
</style>