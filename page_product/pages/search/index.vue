<template>
  <view class="search">
    <u-search
      placeholder="请输入搜索关键词"
      v-model="value"
      :showAction="true"
      actionText="取消"
      :clearabled="true"
      @search="searchVal"
      @custom="cancel"
    ></u-search>
  </view>
</template>

<script>
export default {
  components: {},
  data() {
    return {
      value: "",
    };
  },
  methods: {
    searchVal(val) {
      console.log(val);
      if (val) {
        uni.navigateTo({
          url: "/page_product/pages/search/searchResult?text=" + val,
        });
      }
    },
    cancel() {
      uni.navigateBack();
    },
  },
};
</script>
<style lang="scss" scoped>
.search {
  padding: 30rpx;
}
</style>