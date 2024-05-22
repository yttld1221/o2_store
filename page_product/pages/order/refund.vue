<template>
  <view class="refund">
    <view class="product-list">
      <view class="list-item">
        <image mode="aspectFill" :src="info.img_url" />
        <view class="product-info">
          <view class="product-title">{{ info.title }}</view>
          <view class="product-price"
            ><text
              >￥<text class="price-text">{{ info.sale_price }}</text></text
            >
          </view>
        </view>
      </view>
    </view>
    <view class="content-box">
      <u--textarea
        maxlength="80"
        border="none"
        placeholderStyle="color:#969696"
        v-model="remark"
        placeholder="说出你所遇到的问题，客服人员会第一时间进行审核..."
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
    <view class="refund-btn" @click="refundSubmit()">提交申请</view>
    <prew-video ref="prewVideo" />
  </view>
</template>

<script>
import prewVideo from "../../components/prewVideo.vue";
export default {
  components: { prewVideo },
  data() {
    return {
      remark: "",
      id: "",
      info: {},
      fileList: [],
      from: "",
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
      let param = {
        id: +this.id,
        money: this.info.actual_fee,
        img_url: this.fileList.map((el) => el.url).join(","),
        remark: this.remark,
      };
      this.API.order
        .applyRefund(param)
        .then((res) => {
          console.log(res);
          let delta = 2;
          if (this.from) {
            delta = 1;
          }
          uni.$emit("changeTab", 5);
          uni.navigateBack({
            delta,
            success: () => {
              uni.showToast({
                title: "申请退款成功",
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
.refund {
  min-height: 100vh;
  background: #fafafa;
  box-sizing: border-box;
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
  .refund-btn {
    margin: 0 auto;
    width: 590rpx;
    height: 98rpx;
    background: #ff812f;
    border-radius: 49rpx;
    font-family: PingFang SC;
    font-weight: 500;
    font-size: 28rpx;
    color: #ffffff;
    line-height: 98rpx;
    text-align: center;
    margin-top: 76rpx;
  }
}
</style>