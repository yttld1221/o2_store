<template>
  <view class="waterfall">
    <view class="left-list list-box">
      <view
        @click="toDetail(item)"
        class="left-list-item list-item"
        v-for="(item, index) in leftList"
        :key="index"
      >
        <image mode="widthFix" :src="item.img_url" />
        <view class="al-content">
          <view class="al-title">{{ item.title }}</view>
          <view class="al-bottom flex-algin">
            <view class="flex-algin">
              <image :src="item.avatar_url"></image>
              <text class="al-bottom-nick">{{ item.nick_name }}</text>
            </view>
            <view
              class="flex-algin"
              @click.stop="toThumb(item, index, 'leftList')"
            >
              <uni-icons
                type="hand-up"
                :color="item.is_thumb == 2 ? '#868686' : '#ff6155'"
                size="20"
              ></uni-icons>
              <view
                :style="{
                  color: item.is_thumb == 2 ? '#868686' : '#ff6155',
                }"
                class="al-bottom-num"
                >{{ item.thumb_num }}</view
              >
            </view>
          </view>
        </view>
      </view>
    </view>
    <view class="right-list list-box">
      <view
        @click="toDetail(item)"
        class="right-list-item list-item"
        v-for="(item, index) in rightList"
        :key="index"
      >
        <image mode="widthFix" :src="item.img_url" />
        <view class="al-content">
          <view class="al-title">{{ item.title }}</view>
          <view class="al-bottom flex-algin">
            <view class="flex-algin">
              <image :src="item.avatar_url"></image>
              <text class="al-bottom-nick">{{ item.nick_name }}</text>
            </view>
            <view
              class="flex-algin"
              @click.stop="toThumb(item, index, 'rightList')"
            >
              <uni-icons
                type="hand-up"
                :color="item.is_thumb == 2 ? '#868686' : '#ff6155'"
                size="20"
              ></uni-icons>
              <view
                :style="{
                  color: item.is_thumb == 2 ? '#868686' : '#ff6155',
                }"
                class="al-bottom-num"
                >{{ item.thumb_num }}</view
              >
            </view>
          </view>
        </view></view
      >
    </view>
  </view>
</template>

<script>
export default {
  components: {},
  props: {
    list: {
      type: Array,
      default: () => [],
    },
  },
  data() {
    return {
      leftList: [],
      rightList: [],
    };
  },
  watch: {
    list: {
      handler(newVal) {
        this.initList();
      },
      deep: true,
    },
  },
  computed: {},
  methods: {
    toDetail(item) {
      this.$emit("toDetail", item.id);
    },
    // 点赞
    async toThumb(option, index, key) {
      let temp_is_thumb = option.is_thumb;
      await this.$store.dispatch("toThumb", {
        id: option.id,
        is_thumb: option.is_thumb,
      });

      if (this.$store.state.is_thumb_true == true) {
        if (temp_is_thumb == 2) {
          this.$set(
            this[key][index],
            "thumb_num",
            this[key][index].thumb_num + 1
          );
          this.$set(this[key][index], "is_thumb", 1);
          uni.showToast({
            title: "点赞成功",
            duration: 1000,
            icon: "none",
          });
        } else {
          this.$set(
            this[key][index],
            "thumb_num",
            this[key][index].thumb_num - 1
          );
          this.$set(this[key][index], "is_thumb", 2);
          uni.showToast({
            title: "已取消点赞",
            duration: 1000,
            icon: "none",
          });
        }
        console.log(this.list);
      }
    },
    separatelist(list) {
      const evens = list.filter((el, index) => index % 2 !== 0);
      const odds = list.filter((el, index) => index % 2 === 0);
      return { odds, evens };
    },
    initList() {
      const { odds, evens } = this.separatelist(this.list);
      this.leftList = odds;
      this.rightList = evens;
    },
  },
  mounted() {
    this.initList();
  },
};
</script>
<style lang="scss" scoped>
.waterfall {
  display: flex;
  width: 100vw;
  box-sizing: border-box;
  overflow: hidden;
  padding: 0 30rpx;
  & > view {
    flex: 1;
  }
  .list-box {
    .list-item {
      margin: 20rpx 0 0 0;
      border-radius: 2rpx 2rpx 0 0;
      box-sizing: border-box;
      display: flex;
      flex-direction: column;
      & > image {
        width: 100%;
      }
      .al-content {
        padding: 20rpx 18rpx;
        border-radius: 0 0 2rpx 2rpx;
        .al-title {
          font-family: PingFang SC;
          font-weight: 600;
          font-size: 24rpx;
          color: #111111;
        }
        .al-bottom {
          margin-top: 18rpx;
          justify-content: space-between;
          image {
            width: 30rpx;
            height: 30rpx;
            border-radius: 50%;
            margin-right: 8rpx;
          }
          .al-bottom-nick {
            font-family: PingFang SC;
            font-weight: 300;
            font-size: 20rpx;
            color: #888888;
          }
          .al-bottom-num {
            font-family: DIN;
            font-weight: 400;
            font-size: 20rpx;
            margin-left: 15rpx;
          }
        }
      }
    }
  }
  .left-list {
    .list-item {
      & > image {
        height: 336rpx;
      }
    }
  }
  .right-list {
    margin-left: 20rpx;
    .list-item {
      & > image {
        height: 430rpx;
      }
    }
  }
  .flex-algin {
    display: flex;
    align-items: center;
  }
}
</style>