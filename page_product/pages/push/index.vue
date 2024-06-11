<template>
  <view class="push"> </view>
</template>

<script>
export default {
  components: {},
  data() {
    return {
      type: "",
      titleObj: {
        话题: "发布话题",
        "组队/搭子": "发布组队",
        "分享/安利": "安利好物",
        二手闲置: "发布闲置",
        兼职: "发布兼职",
        表白: "发布表白",
        求助: "发布求助",
        其他: "发布其他",
      },
    };
  },
  onLoad(options) {
    if (options.type) {
      this.type = options.type;
      uni.setNavigationBarTitle({
        title: this.titleObj[options.type],
      });
    }
  },
  methods: {},
};
</script>
<style lang="scss" scoped>
</style>