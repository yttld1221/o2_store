<template>
  <view v-show="show" class="con">
    <swiper
      :current="index"
      class="con"
      @change="change"
      :indicator-dots="true"
    >
      <swiper-item v-for="(item, index) in emojiList" :key="index">
        <view class="list-box">
          <view
            class="list"
            v-for="(itemc, indexc) in item"
            :key="indexc"
            @click="select(itemc)"
          >
            {{ itemc }}
          </view>
        </view>
      </swiper-item>
    </swiper>
  </view>
</template>

<script>
export default {
  data() {
    return {
      index: 0,
      chunkSize: 58, //ÿҳ���58������
    };
  },
  props: {
    show: {
      //��ʾ����
      type: Boolean,
      default: false,
    },
    data: {
      //���������
      type: Array,
      default: [],
    },
  },
  computed: {
    emojiList() {
      //��ά���� ÿҳ58��
      let result = [];
      for (let i = 0; i < this.data.length; i += this.chunkSize) {
        let chunk = this.data.slice(i, i + this.chunkSize);
        result.push(chunk);
      }
      return result;
    },
  },
  methods: {
    select(item) {
      this.$emit("change", item);
    },
    change(e) {
      this.index = e.detail.current;
    },
    delMsg() {
      this.$emit("delMsg");
    },
  },
};
</script>

<style>
.con {
  height: 490rpx;
  background: #ffffff;
  position: relative;
}

.list-box {
  display: flex;
  flex-wrap: wrap;
  padding: 0 30rpx;
}

.list {
  height: 75rpx;
  width: 10%;
  text-align: center;
  line-height: 75rpx;
  font-size: 50rpx;
}

.del {
  width: 120rpx;
  height: 75rpx;
  background: #fff;
  position: absolute;
  right: 10rpx;
  bottom: 40rpx;
  border-radius: 10rpx;
  display: flex;
  align-items: center;
  justify-content: center;
}

.del-img {
  width: 60rpx;
}
</style>