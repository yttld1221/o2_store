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
      this.$store.commit("setScene", options.scene);
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