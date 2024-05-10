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
      <view>
        <image
          :animation="index == 3 ? animationData : ''"
          :class="{ img: true, push: index == 2 }"
          mode="widthFix"
          :src="item.selectedIconPath"
          v-if="current == index"
        ></image>
        <image
          :animation="index == 3 ? animationData : ''"
          :class="{ img: true, push: index == 2 }"
          mode="widthFix"
          :src="item.iconPath"
          v-else
        ></image>
        <view class="text active" v-if="current == index">{{ item.text }}</view>
        <view class="text" v-else
          >{{ item.text
          }}<text v-if="index == 3 && isRedTip" class="red-tip"></text
        ></view>
      </view>
    </view>
  </view>
</template>

<script>
export default {
  name: "tabbar",
  props: ["current"],
  data() {
    return {
      animation: null,
      // 动画
      animationData: {},

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
        if ([1,2].includes(this.$store.state.theLogonUser.level)) {
          if (this.$store.state.isPage_2 == true) {
            // 表示已经在发布页，证明是第二次点击
            uni.switchTab({
              url: "/" + this.list[this.$store.state.previousPage].pagePath,
            });
          } else {
            uni.switchTab({
              url: "/" + this.list[e].pagePath,
            });
          }
        } else {
          uni.showToast({
            title: "请前往注册认证",
            duration: 2500,
            icon: "none",
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

<style>
.tabbar {
  font-size: 1.5vh;
  position: fixed;
  left: 0;
  bottom: 0;
  z-index: 9;
  width: 100%;
  height: 6vh;
  display: flex;
  align-items: center;
  justify-content: space-around;
  background-color: #fff;
  padding: 20rpx 0;
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
}

.tabbar-item-1 {
  /* margin-left: 1vw; */
}

.tabbar-item-3 {
  /* margin-right: 1vw; */
}

.tabbar-item-push {
  position: relative;
  bottom: 1.8vh;
  margin-bottom: 2.2vh;
}

.img {
  height: 7vw;
  width: 7vw;
  /* margin: 0 4vw; */
}

.push {
  width: 23vw;
  height: 18.1125vw;
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
</style>