<template>
  <view class="content">
    <view class="info-box">
      <view class="info-merchant">
        <view class="left-label">真实姓名：</view>
        <u--input
          placeholder="请输入真实姓名"
          v-model="parameters.name"
          border="none"
        ></u--input>
      </view>
      <view class="info-phone">
        <view class="left-label">手机号：</view>
        <view class="code-box flex-algin">
          <u--input
            placeholder="请输入您的手机号码"
            v-model="parameters.phone"
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
          v-model="parameters.check_code"
          border="none"
        ></u--input>
      </view>
      <view class="info-merchant">
        <view class="left-label">性别：</view>
        <u-radio-group v-model="parameters.sex" placement="row">
          <u-radio activeColor="#f89f12" name="男" label="男"></u-radio>
          <u-radio activeColor="#f89f12" name="女" label="女"></u-radio>
        </u-radio-group>
      </view>
      <view class="info-area">
        <view class="left-label">所在学校：</view>
        <view class="flex-algin" @click="toAddress()">
          <u--input
            disabled
            disabledColor="#ffffff"
            placeholder="请选择所在学校"
            v-model="theschoolName"
            border="none"
          ></u--input>
          <u-icon slot="right" name="arrow-right"></u-icon>
        </view>
      </view>
      <view class="info-area">
        <view class="left-label">毕业日期：</view>
        <view class="flex-algin" @click="chooseBirth()">
          <u--input
            disabled
            disabledColor="#ffffff"
            placeholder="请选择毕业日期"
            v-model="parameters.grad_date"
            border="none"
          ></u--input>
          <u-icon slot="right" name="arrow-right"></u-icon>
        </view>
      </view>
    </view>
    <!-- <view class="card-box">
      <view class="card-title flex-algin">
        <view class="shu"></view>
        <text>上传证件</text>
      </view>
      <view class="card-tip">拍摄并上传学生证/学信网电子证件</view>
      <view class="card-container flex-algin">
        <view class="card-img">
          <view class="img-del" v-if="parameters.zjimg">
            <view class="del-icon" @click="delFile('zjimg')">
              <u-icon name="close" color="#FFFFFF" size="16"></u-icon>
            </view>
            <image
              @click="prewFile(parameters.zjimg)"
              :src="parameters.zjimg"
            ></image>
          </view>
          <image
            @click="chooseMedia('zjimg')"
            v-else
            src="https://schoolwx.oss-cn-hangzhou.aliyuncs.com/school/img/v2/20240523/2024-05-23_17_16_23_refund_0_22.png"
          ></image>
          <text>请上传证件</text>
        </view>
      </view>
    </view> -->
    <u-datetime-picker
      ref="datetimePicker"
      :show="show"
      v-model="grateText"
      :maxDate="maxDate"
      :minDate="minDate"
      @confirm="submitDate"
      @cancel="cancelDate"
      mode="date"
    ></u-datetime-picker>
    <u-modal
      @confirm="agreeXy"
      @cancel="disagreeXy"
      confirmColor="#FF5809"
      showCancelButton
      confirmText="同意"
      cancelText="不同意"
      :show="xyShow"
      title="用户协议及隐私保护"
    >
      <view class="slot-content">
        为了更好的保障您的合法权益，请您阅读并同意以下协议《<text
          @click="toXy('yh')"
          class="xy-text"
          >用户协议</text
        >》《<text @click="toXy('ys')" class="xy-text">隐私政策</text>》《<text
          @click="toXy('fw')"
          class="xy-text"
          >服务协议</text
        >》
      </view>
    </u-modal>
    <view class="safe-bottom"></view>
    <view class="fix-bottom-box">
      <view class="fix-bottom">
        <view class="pay-btn" @click="inspect()">提交认证</view>
      </view>
    </view>
  </view>
</template>

<script>
export default {
  data() {
    return {
      xyShow: false,
      minDate: Number(new Date("1980-01-01")),
      maxDate: Number(new Date("2050-12-31")),
      grateText: Number(new Date()),
      show: false,
      tips: "",
      seconds: 60,
      parameters: {
        name: "", //-------（必传）---------姓名
        phone: "", //-------（必传）---------手机号，新增或更换手机号必须同时推送验证码
        sex: "男", //-------（必传）---------值为：男或女
        school_id: 0, //-------（必传）---------所在学校id
        school_ids: "", //关注的学校id集合，英文逗号拼接，该字段不受其他字段影响
        grad_date: "", //-------（必传）---------	毕业日期，格式2023-05-30
        check_code: "", //-------（必传）---------手机校验码（同样需要先调发送接口）
        intro: "", //	自我介绍
        nick_name: "", //昵称
        avatar_url: "", //	头像地址
        birthday: "", //生日，格式2010-05-20
        specialty: "", //专业
        zjimg: "",
        pic: "", // 认证图片
      },

      // 传过来的等级，用于界面判断显示只读与否。1为只读（审核中）
      theLevel: 0,

      // 显示当前所选学校
      theschoolName: "",

      // 性别选择
      sexs: ["男", "女"],
      theSexIndex: 0,
    };
  },
  onReady() {
    // 微信小程序需要用此写法
    this.$refs.datetimePicker.setFormatter(this.formatter);
  },
  onLoad(option) {
    this.theLevel = option.level;
    uni.$on("changeResSchool", async (data) => {
      this.parameters.school_id = data.id;
      this.theschoolName = data.title;
    });
  },
  onShow() {},
  computed: {
    storePhone: function () {
      return this.$store.state.theLogonUser.phone;
    },
    storeCodeSecond: function () {
      return this.$store.state.codeSecond;
    },
  },
  methods: {
    // 跳转协议
    toXy(key) {
      uni.navigateTo({
        url: "/page_product/pages/info/protocol?key=" + key,
      });
    },
    prewFile(url) {
      uni.previewImage({
        current: 0, // 当前显示图片索引
        urls: [url], // 需要预览的图片http链接列表
      });
    },
    // 删除上传图片
    delFile(key) {
      this.$set(this.parameters, key, "");
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
                }${this.$public.getNowDateTime()}_register_0_${
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
                        this.parameters,
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
    formatter(type, value) {
      if (type === "year") {
        return `${value}年`;
      }
      if (type === "month") {
        return `${value}月`;
      }
      if (type === "day") {
        return `${value}日`;
      }
      return value;
    },
    cancelDate() {
      this.show = false;
    },
    submitDate(time) {
      this.$set(
        this.parameters,
        "grad_date",
        this.$public.getNowDate(time.value)
      );
      this.show = false;
    },
    chooseBirth() {
      this.show = true;
      if (this.parameters.grad_date) {
        this.$refs.datetimePicker.innerValue = Number(
          new Date(this.parameters.grad_date)
        );
      }
    },
    codeChange(text) {
      this.tips = text;
    },
    async getCode() {
      if (!this.parameters.phone) {
        uni.showToast({
          title: "请输入您的手机号码",
          icon: "none",
        });
        return;
      }
      let tag = uni.$u.test.mobile(this.parameters.phone);
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
        phone: this.parameters.phone,
        type: 1,
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
    disagreeXy() {
      this.xyShow = false;
    },
    agreeXy() {
      this.toLogonRegister();
    },
    // 提交认证
    toLogonRegister: function () {
      // uni.navigateBack();
      let _this = this;
      return new Promise(function (resolve, reject) {
        let that = _this;
        // 判断如果是空字符串，不应该调用接口
        // 是否注册后自动切换为注册城市
        // uni.setStorageSync(
        //   "storage_addressNow",
        //   that.$store.state.store_addressRegister
        // );
        // that.$store.commit("changeStore_addressNow", {
        //   tempSelectedAddress: that.$store.state.store_addressRegister,
        // });
        // uni.$emit("changeIndexArea", that.$store.state.store_addressRegister);
        // 检测返回为true时才可以调用接口
        uni.request({
          url: that.$store.state.theUrl + "/wechat/wx/logon",
          method: "POST",
          header: {
            token: that.$store.state.theToken,
          },
          data: that.parameters,
          success: (res) => {
            console.log("toLogonRegister_res", res);
            let _that = that;
            if (res.data.code == 0) {
              // 注册后，主要变更的是这几个
              _that.$store.commit("changeTheLogonUser_register", {
                level: res.data.data.user.level, // 主要是这个
                theToken: res.data.data.token,
                avatar_url: res.data.data.user.avatar_url,
                nick_name: res.data.data.user.nick_name,
              });

              // 这是为了提交后回写的内容。这里重新登录一下获取最新的个人信息
              let oth = _that;
              (async function () {
                await oth.$store.dispatch("toLogon", {});
                // 这里用这个方法是为了规避路径可能找不到的问题，不过正常来说只有开发过程中会有这个问题
                // uni.switchTab({
                //   url: "/pages/mine/mine",
                // });
                oth.disagreeXy();
                uni.navigateBack();
                resolve();
              })();
            } else if (res.data.code == 500) {
              uni.showToast({
                title: "服务器连接失败，请反馈官方客服哦~",
                duration: 2500,
                icon: "none",
              });
              _that.disagreeXy();
            } else if (res.data.code == 410) {
              let __that = _that;
              // 异步转同步，
              (async function () {
                // 登录
                await __that.$store.dispatch("toLogon", {});

                __that.toLogonRegister();
              })();
            } else {
              _that.disagreeXy();
              uni.showToast({
                title: res.data.msg,
                duration: 2500,
                icon: "none",
              });
            }
          },
          fail: (res) => {
            uni.showToast({
              title: "网络失败，请重试！多次无效后，反馈官方客服哦！",
              duration: 2500,
              icon: "none",
            });
          },
        });
      });
    },
    // 检查提交认证接口的传参
    inspect: function () {
      let theUser = this.$store.state.theLogonUser;
      // 由于这个接口是修改个人信息和注册统一的，所以这里都要传，这里把个人信息赋值一下
      this.parameters.school_ids =
        theUser.school_ids == "" || theUser.school_ids == null
          ? ""
          : theUser.school_ids;
      // 开始检验
      if (this.parameters.name == "") {
        uni.showToast({
          title: "请填写您的真实姓名",
          duration: 2500,
          icon: "none",
        });
        return false;
      } else if (
        this.parameters.phone == "" ||
        this.parameters.phone.length != 11
      ) {
        uni.showToast({
          title: "请正确填写手机号码",
          duration: 2500,
          icon: "none",
        });
        return false;

        // 验证码只有当手机号码和数据库已经保存的手机号码不一致的时候，才需要传
      } else if (
        this.parameters.phone != theUser.phone &&
        this.parameters.phone != "" &&
        this.parameters.check_code == ""
      ) {
        uni.showToast({
          title: "请获取并正确输入验证码",
          duration: 2500,
          icon: "none",
        });
        return false;
      } else if (this.parameters.school_id == 0) {
        uni.showToast({
          title: "请选择您的学校",
          duration: 2500,
          icon: "none",
        });
        return false;
      } else if (this.parameters.grad_date == "") {
        uni.showToast({
          title: "请选择您的毕业时间",
          duration: 2500,
          icon: "none",
        });
        return false;
      } else {
        this.xyShow = true;
      }
      // else if (this.parameters.zjimg == "") {
      //   uni.showToast({
      //     title: "请上传您的证件",
      //     duration: 2500,
      //     icon: "none",
      //   });
      //   return false;
      // }
    },

    //------------------------------------------------  页面跳转  -----------------------------------------------------
    //------------------------------------------------  页面跳转  -----------------------------------------------------
    //------------------------------------------------  页面跳转  -----------------------------------------------------
    // 跳转地址选择
    toAddress: function () {
      if (this.theLevel == 0) {
        uni.navigateTo({
          // type=index 表示是index页面过来的
          url: "/pages/index/address?type=register",
        });
      } else {
        uni.showToast({
          title: "提交后不可修改哦~",
          duration: 2500,
          icon: "none",
        });
      }
    },
  },
};
</script>

<style lang="scss">
.content {
  padding-bottom: 146rpx;
}
.info-box {
  border-top: 20rpx solid #fafafa;
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
    /deep/.uicon-arrow-right {
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
        width: 160rpx !important;
        height: 50rpx !important;
        padding: 0 !important;
      }
    }
    /deep/ .u-radio-group {
      justify-content: flex-end;
      .u-radio {
        margin-left: 40rpx;
      }
    }
  }
  & > view:last-child {
    border: none;
  }
  .info-avatar {
    padding: 22rpx 0;
  }
}
.card-box {
  border-top: 20rpx solid #fafafa;
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
    margin-top: 46rpx;
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
      & > text {
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
.safe-bottom {
  padding-bottom: env(safe-area-inset-bottom);
}
.fix-bottom-box {
  z-index: 10;
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
.slot-content {
  font-family: PingFang SC;
  font-weight: 400;
  font-size: 28rpx;
  color: #666666;
  line-height: 40rpx;
  .xy-text {
    text-decoration: underline;
  }
}
.flex-algin {
  display: flex;
  align-items: center;
}
</style>