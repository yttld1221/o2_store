<template>
  <view class="content">
    <view class="info-box">
      <view class="info-name info-avatar" @click="toEditAvatar">
        <view class="left-label">头像：</view>
        <view
          class="line-name-avatar"
          :style="'background: url(' + theUser.avatar_url + ');'"
        ></view>
      </view>
      <view class="info-merchant">
        <view class="left-label">昵称：</view>
        <u--input
          placeholder="请输入昵称"
          v-model="parameters.nick_name"
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
          <u-button
            v-if="storePhone != parameters.phone"
            color="#ff812f"
            type="primary"
            @tap="getCode"
            >{{ tips }}</u-button
          >
        </view>
      </view>
      <view class="info-merchant" v-if="storePhone != parameters.phone">
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
        <view class="left-label">生日：</view>
        <view class="flex-algin" @click="chooseBirth()">
          <u--input
            disabled
            disabledColor="#ffffff"
            placeholder="请选择生日"
            v-model="parameters.birthday"
            border="none"
          ></u--input>
          <u-icon slot="right" name="arrow-right"></u-icon>
        </view>
      </view>
    </view>
    <view class="info-box">
      <view class="info-merchant">
        <view class="left-label">真实姓名：</view>
        <text style="color: #999999">{{ parameters.name }}</text>
      </view>
      <view class="info-name">
        <view class="left-label">简介：</view>
        <u--input
          placeholder="请输入简介"
          v-model="parameters.intro"
          border="none"
        ></u--input>
      </view>
      <view class="info-merchant">
        <view class="left-label">院校：</view>
        <text style="color: #999999">{{ theschoolName }}</text>
      </view>
      <view class="info-merchant">
        <view class="left-label">专业：</view>
        <u--input
          placeholder="请输入专业"
          v-model="parameters.specialty"
          border="none"
        ></u--input>
      </view>
      <view class="info-merchant">
        <view class="left-label">毕业日期：</view>
        <text style="color: #999999">{{ parameters.grad_date }}</text>
      </view>
    </view>
    <u-datetime-picker
      ref="datetimePicker"
      :show="show"
      v-model="birthText"
      :maxDate="maxDate"
      :minDate="minDate"
      @confirm="submitDate"
      @cancel="cancelDate"
      mode="date"
    ></u-datetime-picker>
    <view class="safe-bottom"></view>
    <view class="fix-bottom-box">
      <view class="fix-bottom">
        <view class="pay-btn" @click="toLogonRegister()">保存</view>
      </view>
    </view>
  </view>
</template>

<script>
export default {
  data() {
    return {
      minDate: Number(new Date("1980-01-01")),
      maxDate: Number(new Date()),
      birthText: "",
      show: false,
      tips: "",
      seconds: 60,
      parameters: {
        name: "", //-------（必传）---------姓名
        phone: null, //-------（必传）---------手机号，新增或更换手机号必须同时推送验证码
        sex: "", //-------（必传）---------值为：男或女
        school_id: 0, //-------（必传）---------所在学校id
        school_ids: "", //关注的学校id集合，英文逗号拼接，该字段不受其他字段影响
        grad_date: "", //-------（必传）---------	毕业日期，格式2023-05-30
        check_code: "", //-------（必传）---------手机校验码（同样需要先调发送接口）
        intro: "", //	自我介绍
        nick_name: "", //昵称
        avatar_url: "", //	头像地址
        birthday: "", //生日，格式2010-05-20
        specialty: "", //专业
        pic: "", // 认证图片
      },

      theUser: {
        avatar_url: "",
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
  onLoad(option) {
    this.theLevel = option.level;
    this.theUser = this.$store.state.theLogonUser;

    // 重置一下 用于下面onshow时候判断不出错
    this.$store.commit("changeTempImageUrl", {});

    if (this.theLevel == 1) {
      this.changeData();
    }
  },
  onShow() {
    uni.$on("changeAvatar", (url) => {
      console.log(url);
      this.parameters.avatar_url = url;
      this.theUser.avatar_url = url;
    });
  },
  computed: {
    storePhone: function () {
      return this.$store.state.theLogonUser.phone;
    },
    storeCodeSecond: function () {
      return this.$store.state.codeSecond;
    },
  },
  onReady() {
    // 微信小程序需要用此写法
    this.$refs.datetimePicker.setFormatter(this.formatter);
  },
  methods: {
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
        "birthday",
        this.$public.getNowDate(time.value)
      );
      this.show = false;
    },
    chooseBirth() {
      this.show = true;
      this.$refs.datetimePicker.innerValue = Number(
        new Date(this.parameters.birthday)
      );
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
    // 保存
    save() {
      (async () => {
        await this.$store.dispatch("toLogon", {});
        uni.navigateBack();
      })();
    },
    // 回显数据
    changeData() {
      // 审核中的话，回写一下
      let theUser = this.$store.state.theLogonUser;
      this.parameters = {
        ...theUser,
        nick_name: this.showVal(theUser.nick_name),
        name: this.showVal(theUser.name),
        phone: this.showVal(theUser.phone),
        sex: theUser.sex ? theUser.sex : "男",
        grad_date: this.showVal(theUser.grad_date),
        birthday: this.showVal(theUser.birthday),
        intro: this.showVal(theUser.intro),
        specialty: this.showVal(theUser.specialty),
      };
      this.theschoolName = this.showVal(theUser.school_name);
    },
    showVal(val) {
      return val ? val : "";
    },
    // 选择性别
    selectedSexOne: function (index) {
      this.theSexIndex = index;
      this.parameters.sex = this.sexs[index];
    },
    // 选择时间
    dateMaskClick: function (e) {
      // console.log('dateMaskClick',e);
      this.parameters.grad_date = e;
    },
    //------------------------------------------------  接口调用  -----------------------------------------------------
    //------------------------------------------------  接口调用  -----------------------------------------------------
    //------------------------------------------------  接口调用  -----------------------------------------------------
    // 发送验证码
    sendCode: function () {
      if (true) {
        let _this = this;
        return new Promise(function (resolve, reject) {
          let that = _this;
          that.isLoading = "loading"; // 加载中
          // 判断如果是空字符串，不应该调用接口
          if (
            that.parameters.phone != "" &&
            that.parameters.phone != null &&
            that.parameters.phone.length == 11
          ) {
            uni.request({
              url: that.$store.state.theUrl + "/wechat/wx/sendSmsCheckCode",
              method: "POST",
              header: {
                token: that.$store.state.theToken,
              },
              data: {
                phone: that.parameters.phone,
                type: 1, //验证码类型，1-账号注册验证码，2-店铺申请验证码
              },
              success: (res) => {
                // console.log('sendCode_res', res);
                let _that = that;
                // 如果是请求第一页，证明是首次请求，就重置一下
                if (res.data.code == 0) {
                  // 倒计时重置为59
                  let num = 59;
                  let myInterval = setInterval(function () {
                    num = num - 1;
                    _that.$store.commit("changecodeSecond", {
                      codeSecond: num,
                    });
                    if (num == 0) {
                      clearInterval(myInterval);
                    }
                  }, 1000);
                  uni.showToast({
                    title: "验证码已发送，请及时查收！",
                    duration: 2500,
                    icon: "none",
                  });
                  resolve();
                } else if (res.data.code == 500) {
                  uni.showToast({
                    title: "服务器连接失败，请反馈官方客服哦~",
                    duration: 2500,
                    icon: "none",
                  });
                } else if (res.data.code == 410) {
                  let __that = _that;
                  // 异步转同步，
                  (async function () {
                    // 登录
                    await __that.$store.dispatch("toLogon", {});
                    __that.theUser = __that.$store.state.theLogonUser;
                    __that.sendCode();
                  })();
                } else {
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
          } else {
            uni.showToast({
              title: "请填写正确的手机号码！",
              duration: 2500,
              icon: "none",
            });
          }
        });
      } else {
        uni.showToast({
          title: "",
          duration: 2500,
          icon: "none",
        });
      }
    },
    // 提交认证/修改个人信息
    toLogonRegister: function () {
      let _this = this;
      return new Promise(function (resolve, reject) {
        let that = _this;
        // 判断如果是空字符串，不应该调用接口
        if (that.inspect()) {
          // 检测返回为true时才可以调用接口
          uni.request({
            url: that.$store.state.theUrl + "/wechat/wx/logon",
            method: "POST",
            header: {
              token: that.$store.state.theToken,
            },
            data: that.parameters,
            success: (res) => {
              let _that = that;
              // 如果是请求第一页，证明是首次请求，就重置一下
              if (res.data.code == 0) {
                // 注册后，主要变更的是这几个
                _that.save();

                resolve();
              } else if (res.data.code == 500) {
                uni.showToast({
                  title: "服务器连接失败，请反馈官方客服哦~",
                  duration: 2500,
                  icon: "none",
                });
              } else if (res.data.code == 410) {
                let __that = _that;
                // 异步转同步，
                (async function () {
                  // 登录
                  await __that.$store.dispatch("toLogon", {});
                  __that.theUser = __that.$store.state.theLogonUser;
                  __that.toLogonRegister();
                })();
              } else {
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
        }
      });
    },
    // 检查提交认证接口的传参
    inspect: function () {
      // 开始检验
      if (!this.parameters.avatar_url) {
        this.noPass("请上传头像");
        return false;
      } else if (
        this.parameters.nick_name.length > 7 ||
        this.parameters.nick_name.length < 1
      ) {
        uni.showToast({
          title: "昵称至少1个字符，最多不超过7个字符",
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
        this.parameters.phone != this.theUser.phone &&
        this.parameters.phone != "" &&
        this.parameters.check_code == ""
      ) {
        uni.showToast({
          title: "请获取并正确输入验证码",
          duration: 2500,
          icon: "none",
        });
        return false;
      } else if (!this.parameters.sex) {
        this.noPass("请选择性别");
        return false;
      } else if (!this.parameters.birthday) {
        this.noPass("请选择生日");
        return false;
      } else if (!this.parameters.intro) {
        this.noPass("请输入简介");
        return false;
      } else if (!this.parameters.specialty) {
        this.noPass("请输入专业");
        return false;
      } else {
        return true;
      }
    },
    noPass(title) {
      uni.showToast({
        title,
        duration: 2500,
        icon: "none",
      });
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
    // 跳转头像编辑界面
    toEditAvatar: function () {
      uni.navigateTo({
        url: "/pages/mine/edit_avatar",
      });
    },
    // 其他编辑页，目前是昵称编辑
    toEditOther: function (type, value) {
      uni.navigateTo({
        url: "/pages/mine/edit_other?=type=" + type + "&value=" + value,
      });
    },
  },
};
</script>

<style lang="scss">
.content {
  padding-bottom: 135rpx;
}
.red {
  color: #ff0000;
  margin-right: 5px;
  font-weight: normal !important;
}

.white {
  color: #ffffff;
  margin-right: 5px;
  font-weight: normal !important;
}

.margin-bottom {
  border-bottom: #f3f3f3 1px solid;
}

.space-line {
  width: 100vw;
  height: 10px;
  background-color: #fafafa;
  /* margin-top: 15px; */
}

.margin-bottom-avatar {
  border-bottom: #f3f3f3 1px solid;
  padding-top: 10px !important;
  padding-bottom: 10px !important;
}

.line-name {
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  width: 93vw;
  padding: 0 3.5vw;
}

.line-name-title {
  width: 30vw;
  height: 55px;
  line-height: 55px;
  color: #bbbbbb;
}

.line-name-avatar {
  border-radius: 100%;
  width: 110rpx;
  height: 110rpx;
  background-repeat: no-repeat !important;
  background-size: cover !important;
  background-color: #fafefb;
}

.line-name-content {
  width: 63vw;
  height: 55px;
  display: flex;
  flex-direction: row;
  align-items: center;
}

.phone {
  width: 40vw !important;
}

.code-button {
  background-color: #ff812f;
  color: #ffffff !important;
  width: 23vw;
  text-align: center !important;
  font-size: 14px;
  border-radius: 10px;
  padding: 5px 0;
}

.code-button-gray {
  background-color: #bbbbbb;
}

.line-name-other {
  width: 23vw;
}

.line-name-other view {
  font-size: 14px;
  color: #ff812f;
  text-align: end;
}

.the-sex {
  display: flex;
  flex-direction: row;
  align-items: center;
  background-color: #ffffff;
  height: 55px;
}

.the-sex-title {
  padding-left: 3.5vw;
  width: 27.5vw;
  color: #bbbbbb;
}

.the-range-selected-one {
  margin-right: 10px;
  display: flex;
  flex-direction: row;
  align-items: center;
  overflow: scroll;
}

.the-range-selected-one view {
  margin-left: 5px;
}

.the-sex-selected {
  width: 69vw;
  display: flex;
  flex-direction: row;
  align-items: center;
}

.the-school {
  display: flex;
  flex-direction: row;
  background-color: #ffffff;
}

.the-school-title {
  padding-left: 3.5vw;
  width: 27.5vw;
  height: 55px;
  line-height: 55px;
  color: #bbbbbb;
}

.the-school-selected {
  width: 60vw;
  height: 55px;
  line-height: 55px;
}

.the-school-selected-one {
  margin-right: 10px;
  display: flex;
  flex-direction: row;
  align-items: center;
  overflow: scroll;
}

.gray {
  color: #bbbbbb !important;
}

.the-school-selected-one view {
  margin-left: 5px;
}

.the-school-icon {
  width: 9vw;
  height: 55px;
  line-height: 55px;
  text-align: center;
}

.line-pic {
  display: flex;
  flex-direction: column;
  align-items: start;
  width: 93vw;
  padding: 0 3.5vw;
}

.pic-icon {
  height: 35px;
  background-color: #ff812f;
  margin-right: 10px;
  padding: 0 3px;
}

.line-pic-title {
  width: 93vw;
  height: 45px;
  line-height: 45px;
  font-weight: bold;
}

.line-pic-tip {
  font-size: 13px;
  color: #bbbbbb;
}

.the-pic {
  width: 93vw;
  padding: 10px 0 10px 0;
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
        width: 200rpx !important;
        height: 50rpx !important;
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
.flex-algin {
  display: flex;
  align-items: center;
}
</style>