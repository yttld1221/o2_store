<template>
  <view class="prew-video">
    <u-popup :safeAreaInsetBottom='false' mode="center" :show="show" @close="close" @open="open">
      <view class="flex-center">
        <video v-if="show" id="myVideo" :src="videoUrl" autoplay></video>
      </view>
    </u-popup>
  </view>
</template>

<script>
export default {
  components: {},
  data() {
    return {
      videoUrl: "",
      show: false,
    };
  },
  methods: {
    open(url) {
      this.show = true;
      this.videoUrl = url;
    },
    close() {
      this.show = false;
    },
  },
};
</script>
<style lang="scss" scoped>
.prew-video {
  .flex-center {
    display: flex;
    justify-content: center;
    width: 300px;
    height: 225px;
  }
}
/deep/ .u-popup__content {
  background-color: transparent !important;
}
</style>