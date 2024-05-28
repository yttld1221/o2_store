<template>
  <view class="add-mall">
    <view class="info-box">
      <view class="info-name">
        <view class="left-label">姓名：</view>
        <u--input
          placeholder="请输入名字"
          v-model="ruleForm.person"
          border="none"
        ></u--input>
      </view>
      <view class="info-phone">
        <view class="left-label">手机号：</view>
        <view class="code-box flex-algin">
          <u--input
            placeholder="请输入您的手机号码"
            v-model="ruleForm.phone"
            border="none"
          ></u--input>
          <u-code
            changeText="X秒"
            :seconds="seconds"
            ref="uCode"
            @change="codeChange"
          ></u-code>
          <u-button color="#ff812f" type="primary" @tap="getCode">{{
            tips
          }}</u-button>
        </view>
      </view>
      <view class="info-merchant">
        <view class="left-label">短信验证码：</view>
        <u--input
          placeholder="请输入短信验证码"
          v-model="ruleForm.check_code"
          border="none"
        ></u--input>
      </view>
      <view class="info-merchant">
        <view class="left-label">工作室/企业名称：</view>
        <u--input
          placeholder="请输入工作室名称"
          v-model="ruleForm.merchant"
          border="none"
        ></u--input>
      </view>
      <view class="info-area">
        <view class="left-label">申请开放区域：</view>
        <view class="flex-algin" @click="chooseArea()">
          <u--input
            disabled
            disabledColor="#ffffff"
            placeholder="请选择开放区域"
            v-model="ruleForm.area_text"
            border="none"
          ></u--input>
          <u-icon slot="right" name="arrow-right"></u-icon>
        </view>
      </view>
    </view>
    <view class="card-box">
      <view class="card-title flex-algin">
        <view class="shu"></view>
        <text>店铺身份证信息</text>
      </view>
      <view class="card-tip"
        >请拍照、上传高清图，需清晰、完整、无遮挡，确保图片内容清晰可识别</view
      >
      <view class="card-container flex-algin">
        <view class="card-img">
          <view class="img-del" v-if="ruleForm.apply_id_card1">
            <view class="del-icon" @click="delFile('apply_id_card1')">
              <u-icon name="close" color="#FFFFFF" size="16"></u-icon>
            </view>
            <image
              @click="prewFile(ruleForm.apply_id_card1)"
              :src="ruleForm.apply_id_card1"
            ></image>
          </view>
          <image
            @click="chooseMedia('apply_id_card1')"
            v-else
            src="https://schoolwx.oss-cn-hangzhou.aliyuncs.com/school/img/v2/20240523/2024-05-23_17_16_23_refund_0_22.png"
          ></image>
          <text>请上传头像面</text>
        </view>
        <view class="card-img">
          <view class="img-del" v-if="ruleForm.apply_id_card2">
            <view class="del-icon" @click="delFile('apply_id_card2')">
              <u-icon name="close" color="#FFFFFF" size="16"></u-icon>
            </view>
            <image
              @click="prewFile(ruleForm.apply_id_card2)"
              :src="ruleForm.apply_id_card2"
            ></image>
          </view>
          <image
            @click="chooseMedia('apply_id_card2')"
            v-else
            src="https://schoolwx.oss-cn-hangzhou.aliyuncs.com/school/img/v2/20240523/2024-05-23_17_16_17_refund_0_22.png"
          ></image>

          <text>请上传国徽面</text>
        </view>
      </view>
      <view class="card-container flex-algin license-container">
        <view class="card-img">
          <view class="img-del" v-if="ruleForm.business_license">
            <view class="del-icon" @click="delFile('business_license')">
              <u-icon name="close" color="#FFFFFF" size="16"></u-icon>
            </view>
            <image
              @click="prewFile(ruleForm.business_license)"
              :src="ruleForm.business_license"
            ></image>
          </view>
          <image
            @click="chooseMedia('business_license')"
            v-else
            src="https://schoolwx.oss-cn-hangzhou.aliyuncs.com/school/img/v2/20240523/2024-05-23_17_16_28_refund_0_22.png"
          ></image>
          <text>请上传营业执照</text>
        </view>
      </view>
    </view>
    <view class="remark-box">
      <u--textarea
        autoHeight
        count
        maxlength="200"
        border="none"
        placeholderStyle="color:#969696"
        v-model="ruleForm.remark"
        placeholder="请填写申请说明..."
      >
      </u--textarea>
    </view>
    <view class="safe-bottom"></view>
    <view class="fix-bottom-box">
      <view class="fix-bottom">
        <view class="pay-btn" @click="addSubmit()">立即申请</view>
      </view>
    </view>
  </view>
</template>

<script>
import { addressList } from "../../components/piaoyi-cityPicker/cityData";
export default {
  components: {},
  data() {
    return {
      tips: "",
      seconds: 60,
      addressArr: [],
      ruleForm: {
        person: "",
        phone: "",
        check_code: "",
        merchant: "",
        area_code: "",
        apply_id_card1: "",
        apply_id_card2: "",
        business_license: "",
        remark: "",
        area_text: "",
      },
      id: "",
    };
  },
  onLoad(options) {
    this.getArea();
    if (options.id) {
      this.id = options.id;
      this.getDetail();
    }
    uni.$on("changeArea", (data) => {
      console.log(data);
      this.ruleForm.area_code = data.code;
      console.log(this.addressArr);
      this.getAddText(data.code);
    });
  },
  methods: {
    getAddText(code) {
      this.addressArr.forEach((el) => {
        el.children.forEach((item) => {
          if (item.value == code) {
            this.$set(this.ruleForm, "area_text", el.label + item.label);
          }
        });
      });
    },
    // 获取详情
    getDetail() {
      this.API.order
        .getMyApplyShopInfo({})
        .then(async (res) => {
          console.log(res.data);
          this.ruleForm = { ...res.data, check_code: "" };
          this.getAddText(res.data.area_code);
        })
        .catch(async (err) => {
          if (err.code == 410) {
            await this.$store.dispatch("toLogon", {});
            this.getDetail();
          }
        });
    },
    codeChange(text) {
      this.tips = text;
    },
    async getCode() {
      if (!this.ruleForm.phone) {
        uni.showToast({
          title: "请输入您的手机号码",
          icon: "none",
        });
        return;
      }
      let tag = uni.$u.test.mobile(this.ruleForm.phone);
      if (!tag) {
        uni.showToast({
          title: "手机号码不合法",
          icon: "none",
        });
        return;
      }
      if (this.$refs.uCode.canGetCode) {
        // 模拟向后端请求验证码
        await this.postCode();
        // 通知验证码组件内部开始倒计时
        this.$refs.uCode.start();
      } else {
        uni.showToast({
          title: "倒计时结束后再发送",
          icon: "none",
        });
      }
    },
    postCode() {
      let param = {
        phone: this.ruleForm.phone,
        type: 2,
      };
      this.API.order
        .sendSmsCheckCode(param)
        .then((res) => {
          uni.showToast({
            title: "验证码已发送",
            icon: "none",
          });
        })
        .catch(async (err) => {
          if (err.code == 410) {
            await this.$store.dispatch("toLogon", {});
            this.postCode();
          }
        });
    },
    // 删除上传图片
    delFile(key) {
      this.$set(this.ruleForm, key, "");
    },
    // 提交
    addSubmit() {
      let errorObj = {
        person: "请输入名字",
        phone: "请输入您的手机号码",
        check_code: "请输入短信验证码",
        merchant: "请输入工作室名称",
        area_code: "请选择开放区域",
        apply_id_card1: "请上传头像面",
        apply_id_card2: "请上传国徽面",
        business_license: "请上传营业执照",
      };
      let tag = true;
      for (let i in errorObj) {
        if (!this.ruleForm[i]) {
          tag = false;
          uni.showToast({
            title: errorObj[i],
            duration: 2500,
            icon: "none",
          });
          return;
        }
      }
      if (tag) {
        let param = {
          ...this.ruleForm,
        };
        if (this.id) {
          delete param.id;
        }
        this.API.order
          .applyShop(param)
          .then(async (res) => {
            await this.$store.dispatch("toLogon", {});
            uni.navigateBack({
              delta: 1,
              success: () => {
                uni.showToast({
                  title: "申请成功",
                  icon: "none",
                });
              },
            });
          })
          .catch(async (err) => {
            if (err.code == 410) {
              await this.$store.dispatch("toLogon", {});
              this.addSubmit();
            }
          });
      }
    },
    //   预览
    prewFile(url) {
      uni.previewImage({
        current: 0, // 当前显示图片索引
        urls: [url], // 需要预览的图片http链接列表
      });
    },
    getArea() {
      this.addressArr = [];
      addressList.forEach((el) => {
        this.addressArr.push({
          value: el.code,
          label: el.name,
          children: el.children.map((item) => {
            return {
              value: item.code + "00",
              label: item.name,
            };
          }),
        });
      });
    },
    chooseArea() {
      uni.navigateTo({
        url: "/pages/index/address?type=mall",
      });
    },
    chooseMedia(types) {
      uni.chooseMedia({
        count: 1, // 默认为9，可以设置为需要的文件数量
        mediaType: ["image"], // 可以选择视频和图片
        sourceType: ["album", "camera"], // 可以选择从相册或相机中选择
        success: (res1) => {
          const tempFiles = res1.tempFiles;
          // 这里可以获取到选择的文件列表，进行后续上传操作
          console.log(tempFiles);
          // 例如，可以使用uni.uploadFile来上传文件
          tempFiles.forEach((file) => {
            this.API.order
              .getOssUploadSign({
                type: "img",
              })
              .then((res) => {
                console.log(res);
                let fileTypes = file.tempFilePath.substring(
                  file.tempFilePath.lastIndexOf(".") + 1
                );
                let key = `${
                  res.data.dir
                }${this.$public.getNowDateTime()}_mall_0_${
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
                    console.log(uploadFileRes);
                    if (uploadFileRes.statusCode == 200) {
                      this.$set(
                        this.ruleForm,
                        types,
                        `${res.data.host}/${key}`
                      );
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
        },
        fail: (error) => {
          console.error("choose media fail:", error);
        },
      });
    },
  },
};
</script>
<style lang="scss" scoped>
.add-mall {
  box-sizing: border-box;
  background: #fafafa;
  min-height: 100vh;
  padding: 20rpx 0 146rpx;
  .info-box {
    background: #ffffff;
    padding: 0 30rpx;
    & > view {
      padding: 39rpx 0;
      border-bottom: 1rpx solid #e2e2e2;
      display: flex;
      align-items: center;
      justify-content: space-between;
      .left-label {
        font-family: PingFang SC;
        font-weight: 600;
        font-size: 28rpx;
        color: #333333;
        width: 250rpx;
      }
      /deep/.u-icon {
        margin: 2rpx 0 0 10rpx;
      }

      /deep/ .u-input__content__field-wrapper__field {
        text-align: right !important;
        // 重要是这个属性，设置光标的位置，ltr时是鼠标光标在右侧，rtl时是鼠标光标在左侧
        direction: ltr;
      }
      /deep/ .input-placeholder {
        text-align: right;
        font-family: PingFang SC;
        font-weight: 500;
        font-size: 24rpx;
        color: #666666;
      }
      /deep/ .code-box {
        .u-button {
          margin-left: 16rpx;
          width: 200rpx !important;
          height: 50rpx !important;
        }
      }
    }
    & > view:last-child {
      border: none;
    }
  }
  .card-box {
    margin-top: 20rpx;
    padding: 30rpx 32rpx;
    background: #ffffff;
    .shu {
      width: 12rpx;
      height: 32rpx;
      background: #ff812f;
    }
    .card-title {
      text {
        margin-left: 21rpx;
        font-family: PingFang SC;
        font-weight: 500;
        font-size: 30rpx;
        color: #222222;
      }
    }
    .card-tip {
      margin-top: 30rpx;
      font-family: PingFang SC;
      font-weight: 400;
      font-size: 24rpx;
      color: #222222;
      line-height: 47rpx;
    }
    .card-container {
      margin-top: 40rpx;
      justify-content: space-between;
      .img-del {
        position: relative;
        & > .del-icon {
          cursor: pointer;
          padding: 8rpx;
          border-radius: 50%;
          background: #969696;
          margin-top: -17rpx;
          position: absolute;
          right: 0rpx;
          margin-right: -10rpx;
          z-index: 6;
        }
      }
      .card-img {
        width: 327rpx;
        margin: 0 15rpx;
        display: flex;
        align-items: center;
        justify-content: center;
        flex-direction: column;
        image {
          width: 327rpx;
          height: 203rpx;
        }
        text {
          margin-top: 30rpx;
          font-family: PingFang SC;
          font-weight: 500;
          font-size: 22rpx;
          color: #555555;
        }
      }
      .card-img:first-child {
        margin-left: 0;
      }
      .card-img:last-child {
        margin-right: 0;
      }
    }
    .license-container {
      justify-content: center;
    }
  }
  .remark-box {
    background: #ffffff;
    padding: 30rpx;
    margin-top: 20rpx;
    /deep/ .u-textarea {
      min-height: 70px !important;
      padding: 0 !important;
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
    z-index: 10;
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

  .flex-algin {
    display: flex;
    align-items: center;
  }
}
</style>