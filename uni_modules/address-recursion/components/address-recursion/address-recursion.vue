<template>
  <view class="content">
    <view class="the-title" v-for="(item, index) in theData">
      <view
        v-if="item.title.indexOf(searchValue) != -1"
        @click="selectingAddress([item, '省'])"
        :class="{ 'title-1': true, 'no-border-1': index == 0 }"
      >
        <text>{{ item.title }}</text>
      </view>
      <view
        v-if="level == 2"
        class="the-title"
        v-for="(item_ch, index_ch) in item.children"
      >
        <view
          v-if="item_ch.title.indexOf(searchValue) != -1"
          @click="selectingAddress([item_ch, '市'])"
          :class="{
            'title-2': true,
            'no-border-2': index_ch == item.children.length - 1,
          }"
        >
          <text>{{ item_ch.title }}</text>
        </view>
      </view>
    </view>
  </view>
</template>

<script>
export default {
  name: "address-recursion",
  props: {
    // 几级参数
    level: {
      type: Number,
      required: true,
    },
    // 搜索字段
    searchValue: {
      type: String,
      required: true,
    },
    //
    theData: {
      type: [Object, Array],
      default: () => [
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
              title: "绍兴市",
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
      required: true,
    },
  },
  mounted() {},
  methods: {
    // 选择其中一个地址
    selectingAddress: function (arr) {
      this.$emit("selectingAddress", arr);
    },
  },
};
</script>

<style>
.content {
  box-sizing: border-box;
  width: 100vw;
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: 0 30rpx 0 95rpx;
}

.the-title {
  width: 100%;
  display: flex;
  flex-direction: column;
}
.title-1 {
  padding: 25rpx 0;
  border-bottom: 1rpx solid #e5e5e5;
  overflow: scroll;
  font-family: PingFang SC;
  font-weight: 400;
  font-size: 26rpx;
  color: #000000;
}
.title-1 text {
  white-space: nowrap;
}
.title-2 {
  margin-left: 80rpx;
  padding: 25rpx 0;
  border-bottom: 1rpx solid #e5e5e5;
  overflow: scroll;
  font-family: PingFang SC;
  font-weight: 400;
  font-size: 26rpx;
  color: #000000;
}
.title-2 text {
  white-space: nowrap;
}
.no-border-1 {
  border-top: none !important;
}
.no-border-2 {
  /* border-bottom: none !important; */
}
</style>