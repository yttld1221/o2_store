<template>
  <view></view>
</template>

<script>
export default {
  data() {
    return {};
  },
  onLoad(options) {
    if (options.scene) {
      let str = decodeURIComponent(options.scene);
      let id = str.split("=")[1];
      this.$store.commit("setScene", id);
      uni.switchTab({
        url: "/pages/index/index",
      });
    }
  },
  methods: {},
};
</script>
<style scoped>
</style>