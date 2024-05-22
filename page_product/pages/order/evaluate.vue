<template>
  <view class="evaluate">
    <view class="product-list">
      <view class="list-item">
        <image mode="aspectFill" :src="info.img_url" />
        <view class="product-info">
          <u-rate
            size="20"
            active-color="#FF812F"
            gutter="20"
            :count="5"
            v-model="total_num"
          ></u-rate>
        </view>
      </view>
    </view>
    <view class="content-box">
      <u--textarea
        maxlength="80"
        border="none"
        placeholderStyle="color:#969696"
        v-model="content"
        placeholder="写出你的感受，可以帮助到更多的人..."
      >
      </u--textarea>
      <view class="filelist-box">
        <view
          @click="prewFile(item)"
          class="filelist-item"
          v-for="(item, index) in fileList"
          :key="index"
        >
          <view class="del-icon" @click.native.stop="delFile(index)">
            <u-icon name="close" color="#FFFFFF" size="16"></u-icon>
          </view>
          <image
            class="image-style"
            v-if="item.type == 'image'"
            mode="aspectFill"
            :src="item.url"
          />
          <view class="video-box" v-else>
            <u-icon name="play-right" color="#FFFFFF" size="34"></u-icon>
          </view>
        </view>
      </view>
      <view
        v-if="fileList.length < 3"
        @click="chooseMedia()"
        class="img-upload"
      >
        <u-icon name="camera" color="#868686" size="60"></u-icon>
        <text>请添加合规的图片/视频</text>
      </view>
    </view>
    <view class="rate-box">
      <view class="rate-item" v-for="(item, index) in rateList" :key="index">
        <view class="rate-label">{{ item.label }}</view>
        <u-rate
          size="16"
          active-color="#FF812F"
          gutter="30"
          :count="5"
          v-model="rateForm[item.key]"
        ></u-rate>
      </view>
    </view>
    <view class="safe-bottom"></view>
    <view class="fix-bottom-box">
      <view class="fix-bottom">
        <view class="pay-btn" @click="refundSubmit()">提交评价</view>
      </view>
    </view>
    <prew-video ref="prewVideo" />
  </view>
</template>

<script>
import prewVideo from "../../components/prewVideo.vue";
export default {
  components: { prewVideo },
  data() {
    return {
      total_num: "",
      content: "",
      id: "",
      info: {},
      fileList: [],
      from: "",
      rateForm: {
        match_num: "",
        composite_num: "",
        speed_num: "",
        delivery_num: "",
      },
      rateList: [
        {
          label: "描述相符",
          key: "match_num",
        },
        {
          label: "综合评分",
          key: "composite_num",
        },
        {
          label: "物流速度",
          key: "speed_num",
        },
        {
          label: "配送员服务",
          key: "delivery_num",
        },
      ],
    };
  },
  onLoad(options) {
    if (options.id) {
      this.id = options.id;
      this.getOrder();
    }
    if (options.from) {
      this.from = options.from;
    }
  },

  methods: {
    //提交申请
    refundSubmit() {
      let tag = this.rateList
        .map((el) => el.key)
        .every((item) => this.rateForm[item]);
      if (!this.total_num || !tag) {
        uni.showToast({
          title: "请选择评分",
          icon: "none",
        });
        return;
      }
      let param = {
        id: +this.id,
        total_num: this.total_num,
        ...this.rateForm,
        img_url: this.fileList.map((el) => el.url).join(","),
        content: this.content,
      };
      this.API.order
        .evaluateOrder(param)
        .then((res) => {
          console.log(res);
          let delta = 2;
          if (this.from) {
            delta = 1;
          }
          uni.$emit("changeTab", 4);
          uni.navigateBack({
            delta,
            success: () => {
              uni.showToast({
                title: "评价成功",
                icon: "none",
              });
            },
          });
        })
        .catch(async (err) => {
          if (err.code == 410) {
            await this.$store.dispatch("toLogon", {});
            this.refundSubmit();
          }
        });
    },
    //   预览
    prewFile(item) {
      if (item.type == "image") {
        uni.previewImage({
          current: 0, // 当前显示图片索引
          urls: [item.url], // 需要预览的图片http链接列表
        });
      } else {
        this.$refs.prewVideo.open(item.url);
      }
    },
    chooseMedia() {
      uni.chooseMedia({
        count: 1, // 默认为9，可以设置为需要的文件数量
        mediaType: ["video", "image"], // 可以选择视频和图片
        sourceType: ["album", "camera"], // 可以选择从相册或相机中选择
        success: (res1) => {
          const tempFiles = res1.tempFiles;
          if (this.fileList.length + tempFiles.length <= 3) {
            // 这里可以获取到选择的文件列表，进行后续上传操作
            console.log(tempFiles);
            // 例如，可以使用uni.uploadFile来上传文件
            tempFiles.forEach((file) => {
              this.API.order
                .getOssUploadSign({
                  type: file.fileType == "image" ? "img" : "video",
                })
                .then((res) => {
                  console.log(res);
                  let fileTypes = file.tempFilePath.substring(
                    file.tempFilePath.lastIndexOf(".") + 1
                  );
                  let key = `${
                    res.data.dir
                  }${this.$public.getNowDateTime()}_refund_0_${
                    this.$store.state.theLogonUser.id
                  }.${fileTypes}`;
                  console.log(key, "key");
                  uni.uploadFile({
                    url: res.data.host,
                    filePath: file.tempFilePath,
                    formData: {
                      key,
                      policy: res.data.policy,
                      OssAccessKeyId: res.data.accessid,
                      success_action_status: "200",
                      signature: res.data.signature,
                    },
                    name: "file", // 这是后端接收文件的字段名
                    success: (uploadFileRes) => {
                      if (uploadFileRes.statusCode == 200) {
                        this.fileList.push({
                          type: file.fileType,
                          url: `${res.data.host}/${key}`,
                          uuid: 0,
                        });
                      }
                    },
                    fail: (error) => {
                      console.error("upload fail:", error);
                    },
                  });
                })
                .catch(async (err) => {
                  if (err.code == 410) {
                    await this.$store.dispatch("toLogon", {});
                    uni.showToast({
                      title: "网络失败，请重试！",
                      duration: 2500,
                      icon: "none",
                    });
                  }
                });
            });
          } else {
            uni.showToast({
              title: "上传数量不可大于3",
              icon: "none",
            });
          }
        },
        fail: (error) => {
          console.error("choose media fail:", error);
        },
      });
    },
    // 删除文件
    delFile(index) {
      this.fileList.splice(index, 1);
    },
    // 获取详情
    getOrder() {
      this.API.order
        .getMyOrderInfo({ id: this.id })
        .then((res) => {
          console.log(res);
          this.info = {
            ...res.data,
            img_url: res.data.img_url ? res.data.img_url.split(",")[0] : "",
          };
        })
        .catch(async (err) => {
          if (err.code == 410) {
            await this.$store.dispatch("toLogon", {});
            this.getOrder();
          }
        });
    },
  },
};
</script>
<style lang="scss" scoped>
.evaluate {
  min-height: 100vh;
  background: #fafafa;
  box-sizing: border-box;
  padding-bottom: 146rpx;
  .product-list {
    padding: 29rpx 40rpx;
    background: #ffffff;
    .list-item {
      display: flex;
      align-items: center;
      image {
        width: 132rpx;
        height: 132rpx;
        background: #ffffff;
        border-radius: 6rpx;
        border: 1px solid #eeeeee;
        margin-right: 26rpx;
      }
      .product-info {
        box-sizing: border-box;
        height: 132rpx;
        width: calc(100% - 158rpx);
        display: flex;
        flex-direction: column;
        justify-content: center;
        .product-title {
          font-family: PingFang SC;
          font-weight: 500;
          font-size: 24rpx;
          margin-bottom: 34rpx;
          color: #393a3e;
          width: 100%;
          overflow: hidden;
          text-overflow: ellipsis;
          display: -webkit-box;
          -webkit-box-orient: vertical;
          -webkit-line-clamp: 2;
        }
        .product-price {
          display: flex;
          align-items: center;
          justify-content: space-between;
          font-family: PingFang SC;
          font-weight: 300;
          font-size: 22rpx;
          color: #f23333;
          display: flex;
          align-items: flex-end;
          line-height: 23rpx;
          .price-text {
            font-size: 34rpx;
          }
          .product-num {
            font-family: DIN Alternate;
            font-weight: bold;
            font-size: 26rpx;
            color: #111111;
          }
        }
      }
    }
  }
  .content-box {
    margin-top: 14rpx;
    background: #ffffff;
    padding: 40rpx;
    /deep/ .u-textarea {
      padding: 0 !important;
    }
    .img-upload {
      display: flex;
      align-items: center;
      justify-content: center;
      flex-direction: column;
      background: #ffffff;
      box-shadow: 0rpx 0rpx 9rpx 1rpx rgba(0, 0, 0, 0.06);
      border-radius: 20rpx;
      padding: 30rpx 0;
      margin-top: 30rpx;
      & > text {
        font-family: PingFang SC;
        font-weight: 300;
        font-size: 22rpx;
        color: #969696;
        margin-top: 20rpx;
      }
    }
    .filelist-box {
      display: flex;
      align-items: flex-start;
      background: white;
      .filelist-item {
        position: relative;
        margin-right: 30rpx;
        & > .del-icon {
          padding: 8rpx;
          border-radius: 50%;
          background: #969696;
          margin-top: -17rpx;
          position: absolute;
          right: 0rpx;
          margin-right: -10rpx;
          z-index: 6;
        }
        & > image {
          width: 140rpx;
          height: 140rpx;
          border-radius: 20rpx;
        }
        .video-box {
          display: flex;
          align-items: center;
          justify-content: center;
          width: 140rpx;
          height: 140rpx;
          border-radius: 20rpx;
          background: rgba(0, 0, 0, 0.5);
        }
      }
    }
  }
  .rate-box {
    margin-top: 20rpx;
    background: #ffffff;
    padding: 39rpx;
    .rate-item {
      margin-bottom: 40rpx;
      display: flex;
      align-items: center;
      .rate-label {
        width: 173rpx;
        font-family: PingFang SC;
        font-weight: 300;
        font-size: 24rpx;
        color: #333333;
      }
    }
    .rate-item:last-child {
      margin-bottom: 0rpx;
    }
  }

  .safe-bottom {
    padding-bottom: env(safe-area-inset-bottom);
  }
  .fix-bottom-box {
    background: #ffffff;
    box-shadow: 0rpx 0rpx 7rpx 1rpx rgba(0, 0, 0, 0.04);
    box-sizing: border-box;
    position: fixed;
    bottom: 0;
    width: 100%;
    padding: 25rpx 75rpx;
    box-sizing: border-box;
    .fix-bottom {
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding-bottom: env(safe-area-inset-bottom);
    }
    .pay-btn {
      width: 100%;
      height: 76rpx;
      background: linear-gradient(-55deg, #ff9b5a, #ff812f);
      border-radius: 38rpx;
      font-family: PingFang SC;
      font-weight: 400;
      font-size: 26rpx;
      color: #ffffff;
      line-height: 76rpx;
      text-align: center;
    }
  }
}
</style>