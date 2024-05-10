<template>
  <view class="content">
    <!-- 头像 -->
    <view @click="toEditAvatar" class="line-name margin-bottom-avatar">
      <view class="line-name-title">我的头像：</view>
      <view
        class="line-name-avatar"
        :style="'background: url(' + theUser.avatar_url + ');'"
      ></view>
    </view>
    <!-- 我的昵称 -->
    <view
      class="the-school margin-bottom"
      @click="toEditOther('昵称', theUser.nick_name)"
    >
      <view class="the-school-title">我的昵称：</view>
      <view class="the-school-selected">
        <view class="the-school-selected-one"> {{ theUser.nick_name }} </view>
      </view>
      <view class="the-school-icon">
        <uni-icons type="right"></uni-icons>
      </view>
    </view>

    <!-- 手机 -->
    <view class="line-name margin-bottom">
      <view class="line-name-title">手机号码：</view>
      <view class="line-name-content phone">
        <uni-easyinput
          v-model="parameters.phone"
          placeholder="请输入手机号码"
          :inputBorder="false"
        />
      </view>
      <view class="line-name-other">
        <view
          class="code-button"
          @click="sendCode"
          v-if="storePhone != parameters.phone && storeCodeSecond == 0"
          >发送验证码
        </view>
        <view class="gray" v-if="storePhone == parameters.phone">已验证</view>
        <view v-if="storeCodeSecond != 0">{{ storeCodeSecond }}s</view>
      </view>
    </view>

    <!-- 验证码 -->
    <view v-if="storePhone != parameters.phone" class="line-name margin-bottom">
      <view class="line-name-title">验证码：</view>
      <view class="line-name-content phone">
        <uni-easyinput
          v-model="parameters.check_code"
          placeholder="请输入验证码"
          :inputBorder="false"
        />
      </view>
      <view
        :class="{
          'code-button': true,
          'code-button-gray':
            parameters.phone == '' || parameters.check_code == '',
        }"
        @click="toLogonRegister()"
        >确认并提交</view
      >
    </view>

    <!-- 性别 -->
    <view class="the-sex">
      <view class="the-sex-title">性别：</view>
      <view class="the-sex-selected">
        <view
          @click="selectedSexOne(index)"
          class="the-range-selected-one"
          v-for="(item, index) in sexs"
        >
          <uni-icons
            v-if="theSexIndex == index"
            type="circle-filled"
            size="25"
            color="#f89f12"
          ></uni-icons>
          <uni-icons
            v-if="theSexIndex != index"
            type="circle"
            size="25"
            color="#bbbbbb"
          ></uni-icons>
          <view>{{ item }}</view>
        </view>
      </view>
    </view>

    <!-- 间隔 -->
    <view class="space-line"></view>
    <!-- 姓名 -->
    <view class="line-name margin-bottom">
      <view class="line-name-title">真实姓名：</view>
      <view class="line-name-content">
        <uni-easyinput
          focus
          :disabled="theLevel != 0"
          v-model="parameters.name"
          placeholder="请输入真实姓名"
          :inputBorder="false"
        />
      </view>
    </view>

    <!-- 选择学校 -->
    <view class="the-school margin-bottom">
      <view class="the-school-title">所在学校：</view>
      <view class="the-school-selected">
        <view
          v-if="parameters.school_id == 0"
          class="the-school-selected-one gray"
          >（选择所在学校）</view
        >
        <view
          v-if="parameters.school_id != 0"
          style="width: 500px"
          class="the-school-selected-one gray"
        >
          {{
            theschoolName.length < 9
              ? theschoolName
              : theschoolName.substring(0, 9) + "..."
          }}
        </view>
      </view>
    </view>

    <!-- 毕业日期： -->
    <view class="the-school">
      <view class="the-school-title">毕业日期：</view>
      <view class="the-school-selected">
        <uni-datetime-picker
          :border="false"
          :disabled="theLevel != 0"
          v-model="parameters.grad_date"
          type="date"
          @change="dateMaskClick"
        />
      </view>
    </view>

    <!-- 上传证件 -->
    <!-- <view class="line-pic">
			<view class="line-pic-title"><text class="pic-icon"></text>上传证件：</view>
			<view class="line-pic-tip">上传学生证或学信网截图，获得真实认证资质~</view>

			<view class="the-pic">
				<uni-file-picker limit="1" @select="imageSelect" @delete="imageDelete" file-mediatype="image" v-model="imageValue" title="最多选择1张图片"></uni-file-picker>
			</view>
		</view> -->
  </view>
</template>

<script>
export default {
  data() {
    return {
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

    // 回写一下注册的传参,主要就一个昵称
    this.parameters.nick_name = this.theUser.nick_name;

    if (this.theLevel == 1) {
      // 审核中的话，回写一下
      let theUser = this.$store.state.theLogonUser;
      // console.log('theUser',theUser);
      // 由于这个接口是修改个人信息和注册统一的，所以这里都要传，这里把个人信息赋值一下
      this.parameters.name =
        theUser.name == "" || theUser.name == null ? "" : theUser.name;
      this.parameters.phone =
        theUser.phone == "" || theUser.phone == null ? "" : theUser.phone;
      let theSex = theUser.sex == "" || theUser.sex == null ? "" : theUser.sex;
      if (theSex != "") {
        this.theSexIndex = this.sexs.indexOf(theSex);
      }
      this.parameters.sex = this.sexs[this.theSexIndex];
      this.parameters.school_id = theUser.school_id;
      // console.log('this.parameters.school_id',this.parameters.school_id);
      // console.log('this.parameters.school_id',this.parameters.school_id);
      this.theschoolName =
        theUser.school_name == "" || theUser.school_name == null
          ? ""
          : theUser.school_name;
      this.parameters.grad_date =
        theUser.grad_date == "" || theUser.grad_date == null
          ? ""
          : theUser.grad_date;
    }
  },
  onShow() {
    // 专门处理从修改头像界面返回过来的情况
    if (this.$store.state.tempImageUrl.length != 0) {
      // 证明是通过修改头像界面跳过来的
      this.parameters.avatar_url = this.$store.state.tempImageUrl[0].url;
      // console.log(this.parameters);
      this.toLogonRegister();
    }
    // 专门处理从编辑昵称界面返回
    if (
      this.$store.state.theNickName != "" &&
      this.$store.state.theNickName != this.theUser.nick_name
    ) {
      this.parameters.avatar_url = this.theUser.avatar_url;
      this.parameters.nick_name = this.$store.state.theNickName;
      this.toLogonRegister();
    }
  },
  computed: {
    storePhone: function () {
      return this.$store.state.theLogonUser.phone;
    },
    storeCodeSecond: function () {
      return this.$store.state.codeSecond;
    },
  },
  methods: {
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
              // console.log('that.parameters',that.parameters);
              // console.log('toLogonRegister_res', res);
              let _that = that;
              // 如果是请求第一页，证明是首次请求，就重置一下
              if (res.data.code == 0) {
                // 注册后，主要变更的是这几个
                _that.$store.commit("changeTheLogonUser_register", {
                  level: res.data.data.user.level, // 主要是这个
                  theToken: res.data.data.token,
                  avatar_url: res.data.data.user.avatar_url,
                  nick_name: res.data.data.user.nick_name,
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
      // 由于这个接口是修改个人信息和注册统一的，所以这里都要传，这里把个人信息赋值一下
      this.parameters.school_ids =
        this.theUser.school_ids == "" || this.theUser.school_ids == null
          ? ""
          : this.theUser.school_ids;
      this.parameters.intro =
        this.theUser.intro == "" || this.theUser.intro == null
          ? ""
          : this.theUser.intro;
      // this.parameters.nick_name = (this.theUser.nick_name == '' || this.theUser.nick_name == null ? '' : this.theUser.nick_name);
      this.parameters.birthday =
        this.theUser.birthday == "" || this.theUser.birthday == null
          ? ""
          : this.theUser.birthday;
      this.parameters.specialty =
        this.theUser.specialty == "" || this.theUser.specialty == null
          ? ""
          : this.theUser.specialty;

      // 开始检验
      if (
        this.parameters.nick_name.length > 7 ||
        this.parameters.nick_name.length < 1
      ) {
        uni.showToast({
          title: "昵称至少1个字符，最多不超过7个字符哦~",
          duration: 2500,
          icon: "none",
        });
        return false;
      } else if (
        this.parameters.phone == "" ||
        this.parameters.phone.length != 11
      ) {
        uni.showToast({
          title: "请正确填写手机号码哦~",
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
          title: "请获取并正确输入验证码~",
          duration: 2500,
          icon: "none",
        });
        return false;
      } else {
        return true;
      }
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

<style>
.content {
  display: flex;
  flex-direction: column;
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
  width: 20vw;
  height: 20vw;
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

.space-line-bottom {
  padding: 25px 0 65px 0;
  display: flex;
  flex-direction: row;
  align-items: center;
}
</style>