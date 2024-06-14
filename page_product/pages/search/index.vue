<template>
  <view class="search">
    <u-search
      placeholder="请输入搜索关键词"
      v-model="searchText"
      :showAction="true"
      focus
      actionText="取消"
      :clearabled="true"
      @search="searchVal"
      @custom="cancel"
    ></u-search>
    <view class="list-container" v-if="searchRecord.length">
      <view class="list-title">
        <text>历史搜索</text>
        <u-icon size="24" name="trash" @click="delRecord()"></u-icon>
      </view>
      <view class="list-box"
        ><view
          @click="searchVal(item.value)"
          class="list-item"
          v-for="(item, index) in searchRecord"
          :key="index"
        >
          {{ item.value }}
        </view></view
      >
    </view>
    <view class="list-container" v-if="hotList.length">
      <view class="list-title">
        <text>热门搜索</text>
      </view>
      <view class="list-box">
        <view
          @click="searchVal(item)"
          class="list-item"
          v-for="(item, index) in hotList"
          :key="index"
        >
          {{ item }}
        </view>
      </view>
    </view>
    <u-modal
      :show="show"
      :show-cancel-button="true"
      @confirm="confirmDel"
      @cancel="cancelDel"
      confirm-color="#FF812F"
      content="确认删除全部历史记录?"
    ></u-modal>
  </view>
</template>

<script>
export default {
  components: {},
  data() {
    return {
      show: false,
      searchText: "",
      hotList: [],
      searchRecord: [],
      shopId: "",
      from: "",
    };
  },
  onLoad(options) {
    if (options.shopId) {
      this.shopId = options.shopId;
    }
    if (options.from) {
      this.from = options.from;
    }
  },
  onShow() {
    if (!this.shopId && !this.from) {
      this.getHot();
    }
    this.getSearchRecord();
    this.searchText = "";
  },
  methods: {
    // 确认删除
    confirmDel() {
      let key = this.shopId
        ? "searchShopRecord"
        : this.from
        ? "searchPushRecord"
        : "searchRecord";
      uni.removeStorageSync(key);
      this.getSearchRecord();
      this.cancelDel();
    },
    // 取消删除
    cancelDel() {
      this.show = false;
    },
    // 删除历史纪录
    delRecord() {
      this.show = true;
    },
    getHot() {
      this.API.home
        .getHotWord({})
        .then((res) => {
          console.log(res);
          this.hotList = res.data;
        })
        .catch(async (err) => {
          if (err.code == 410) {
            await this.$store.dispatch("toLogon", {});
            this.getHot();
          }
        });
    },
    searchVal(val) {
      if (val) {
        let url = "/page_product/pages/search/searchResult?text=" + val;
        if (this.shopId) {
          url += "&shopId=" + this.shopId;
        } else if (this.from) {
          url += "&from=" + this.from;
        }
        uni.navigateTo({
          url,
        });
      }
    },
    cancel() {
      uni.navigateBack();
    },
    // 获取历史纪录
    getSearchRecord() {
      let key = "searchRecord";
      if (this.shopId) {
        key = "searchShopRecord";
      } else if (this.from) {
        key = "searchPushRecord";
      }
      this.searchRecord = uni.getStorageSync(key)
        ? JSON.parse(uni.getStorageSync(key))
        : [] || [];
      if (this.searchRecord.length > 0) {
        for (let i in this.searchRecord) {
          if (i > 9) {
            this.searchRecord.splice(i, 1);
          }
        }
      }
      console.log(this.searchRecord);
    },
  },
};
</script>
<style lang="scss" scoped>
.search {
  padding: 30rpx;
  .list-container {
    margin-top: 44rpx;
    .list-title {
      display: flex;
      align-items: center;
      justify-content: space-between;
      margin-bottom: 12rpx;
      font-family: PingFang SC;
      font-weight: 500;
      font-size: 28rpx;
      color: #333333;
    }
    .list-box {
      display: flex;
      align-items: center;
      flex-wrap: wrap;
      .list-item {
        margin-right: 30rpx;
        padding: 8rpx 26rpx;
        background: #f6f6f6;
        border-radius: 30rpx;
        margin-top: 21rpx;
        font-family: PingFang SC;
        font-weight: 300;
        font-size: 22rpx;
        color: #898989;
      }
    }
  }
}
</style>