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
  mounted() {
    console.log(1111111);
  },
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
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding-left: 10vw;
  width: 86.5vw;
  padding-right: 3.5vw;
}

.the-title {
  width: 100%;
  display: flex;
  flex-direction: column;
}
.title-1 {
  height: 45px;
  line-height: 45px;
  color: #727272;
  border-top: #e5e5e5 1px solid;
  border-bottom: #e5e5e5 1px solid;
  overflow: scroll;
}
.title-1 text {
  white-space: nowrap;
}
.title-2 {
  height: 45px;
  line-height: 45px;
  margin-left: 10vw;
  color: #727272;
  border-bottom: #e5e5e5 1px solid;
  overflow: scroll;
}
.title-2 text {
  white-space: nowrap;
}
.no-border-1 {
  border-top: none !important;
}
.no-border-2 {
  border-bottom: none !important;
}
</style>