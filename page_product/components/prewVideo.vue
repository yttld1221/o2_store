<template>
  <view class="prew-video">
    <u-popup
      :safeAreaInsetBottom="false"
      mode="center"
      :show="show"
      @close="close"
      @open="open"
    >
      <view class="flex-center">
        <video  :show-fullscreen-btn="false" controls style="width:100%; height: 100%;" v-if="show"  id="myVideo" :src="videoUrl" autoplay></video>
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
	  videoContext:''
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
    width: 70vw;
    height: 70vh;
    #myVideo {
      width: 100%;
      height: 100%;
    }
  }
}
</style>