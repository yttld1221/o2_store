<template>
  <view class="center-cut-menu">
    <scroll-view
      scroll-x="true"
      scroll-with-animation="true"
      class="scroll-view"
      :scroll-left="scrollLeft"
    >
      <view
        class="scroll-item"
        v-for="(item, index) in list"
        :key="index"
        @click="changeMenu(item, index)"
      >
        <view class="item-box">
          <transition name="myname">
            <view class="line" v-if="curIndex == index"></view>
          </transition>
          <text class="item-text" :class="curIndex == index ? 'active' : ''">{{
            item.name
          }}</text>
        </view>
      </view>
    </scroll-view>
  </view>
</template>
 
<script>
export default {
  data() {
    return {
      contentScrollW: 0, // 导航区宽度
      curIndex: 0, // 当前选中
      scrollLeft: 0, // 横向滚动条位置
    };
  },
  props: {
    list: {
      type: Array,
      default() {
        return [];
      },
    },
  },
  watch: {
    list: {
      handler(newVal, oldVal) {
        this.getScrollW();
      },
      deep: true,
    },
  },
  mounted() {
    // 获取标题区域宽度，和每个子元素节点的宽度
    this.getScrollW();
  },
  methods: {
    // 获取标题区域宽度，和每个子元素节点的宽度以及元素距离左边栏的距离
    getScrollW() {
      let query = uni.createSelectorQuery().in(this);
      query
        .select(".scroll-view")
        .boundingClientRect((data) => {
          // 拿到 scroll-view 组件宽度
          this.contentScrollW = data.width;
        })
        .exec();

      query
        .selectAll(".scroll-item")
        .boundingClientRect((data) => {
          let dataLen = data.length;
          for (let i = 0; i < dataLen; i++) {
            //  scroll-view 子元素组件距离左边栏的距离
            this.list[i].left = data[i].left;
            //  scroll-view 子元素组件宽度
            this.list[i].width = data[i].width;
          }
        })
        .exec();
    },

    // 选择标题
    changeMenu(item, index) {
      this.curIndex = index;

      // 效果一(当前点击子元素靠左展示)  局限性：子元素宽度相同
      // this.scrollLeft = index * this.list[index].width

      // 效果一(当前点击子元素靠左展示)  子元素宽度不相同也可实现
      // this.scrollLeft = 0;
      // for (let i = 0; i < index; i++) {
      //     this.scrollLeft += this.list[i].width
      // };

      // 效果二(当前点击子元素靠左留一展示)  局限性：子元素宽度相同
      // this.scrollLeft = (index - 1)  * this.list[index].width

      // 效果二(当前点击子元素靠左留一展示)  子元素宽度不相同也可实现
      // this.scrollLeft = 0;
      // for (let i = 0; i < index - 1; i++) {
      //     this.scrollLeft += this.list[i].width
      // };

      // 效果三(当前点击子元素居中展示)  不受子元素宽度影响
      this.scrollLeft =
        this.list[index].left -
        this.contentScrollW / 2 +
        this.list[index].width / 2;
      this.$emit("changeTab", item);
    },
  },
};
</script>
 
<style lang="scss">
.center-cut-menu {
  width: 100%;
  height: 80rpx;
  box-sizing: border-box;

  .scroll-view {
    height: 80rpx;
    white-space: nowrap;

    .scroll-item {
      height: 80rpx;
      margin-right: 42rpx;
      display: inline-block;
      .item-box {
        height: 100%;
        display: flex;
        align-items: center;
        position: relative;
      }

      .line {
        margin: 0 auto;
        left: 0;
        right: 0;
        position: absolute;
        bottom: 0;
        width: 50rpx;
        height: 8rpx;
        background: linear-gradient(270deg, #ffc974, #f89f12);
        border-radius: 4rpx;
      }
      .item-text {
        font-weight: 500;
        font-size: 28rpx;
        color: #333333;
        &.active {
          font-weight: 600;
          font-size: 32rpx;
          color: #333333;
        }
      }
    }
    .scroll-item:last-child {
      margin-right: 0;
    }
  }
  .myname-enter {
    opacity: 0;
  }

  .myname-enter-active {
    transition: opacity 1s;
  }
  .myname-leave-to {
    opacity: 0;
  }

  .myname-leave-active {
    transition: opacity 1s;
  }
}
</style>