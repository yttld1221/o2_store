<template>
  <view class="search-result">
    <!-- 底部垫层 -->
    <view @click="searchReasult()" class="space-line-bottom">
      <uni-load-more
        :status="isLoading"
        :content-text="contentText"
      ></uni-load-more>
    </view>
  </view>
</template>

<script>
export default {
  components: {},
  data() {
    return {
      orderType: "",
      order_field: "sort",
      isLoading: "loading",
      // 当前获取的校园墙页码，每次需要+1
      theGetMomentsListPage: 1,
      theGetMomentsListPagesize: 10,
      searchText: "",
      searchRecord: [],
      contentText: {
        contentdown: "查看更多",
        contentrefresh: "加载中...",
        contentnomore: "到底了，可点击此处手动加载~",
      },
    };
  },
  onLoad(options) {
    if (options.text) {
      this.searchText = options.text;
      this.searchReasult();
    }
  },
  methods: {
    searchReasult() {
      if (this.searchText) {
        this.getSearchRecord();
        for (var i in this.searchRecord) {
          if (this.searchText == this.searchRecord[i].value) {
            this.searchRecord.splice(i, 1);
          }
        }
        this.searchRecord.unshift({
          value: this.searchText,
        });
        this.lStore.set("searchRecord", JSON.stringify(this.searchRecord));
        let params = {
          page: this.theGetMomentsListPage,
          pagesize: this.theGetMomentsListPagesize,
          title: this.searchText,
          order_type: this.orderType,
          order_field: this.order_field,
          is_product: 1,
          area_code: this.$store.state.store_addressNow.code,
        };
        this.API.home.getTravelBusiness(params).then((res) => {
          console.log(res);
          this.info = res.data;
          this.num =
            this.info.attractions.length +
            this.info.hotels.length +
            this.info.restaurants.length;
        });
      }
    },
  },
};
</script>
<style lang="scss" scoped>
.search-result {
  .space-line-bottom {
    height: 180px;
  }
}
</style>