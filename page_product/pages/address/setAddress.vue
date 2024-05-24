<template>
  <view class="set-address">
    <view class="add-container">
      <u-form :model="form" ref="uForm" :errorType="errorType">
        <u-form-item required label="收货人" prop="name" label-width="90">
          <u-input v-model="form.name" placeholder="请输入收货人姓名" />
        </u-form-item>
        <u-form-item required label="手机号" prop="phone" label-width="90">
          <u-input placeholder="请输入手机号" v-model="form.phone"></u-input>
        </u-form-item>
        <u-form-item
          required
          label="所在地区"
          prop="addressText"
          label-width="90"
        >
          <view @click="openPick()">
            <u-input
              disabled
              :suffixIcon="visible ? 'arrow-up' : 'arrow-down'"
              suffixIconStyle="color: rgb(192, 196, 204)"
              v-model="form.addressText"
              placeholder="请选择所在地区"
            ></u-input>
          </view>
        </u-form-item>
        <u-form-item required label="详细地址" prop="addr" label-width="90">
          <u--textarea
            v-model="form.addr"
            placeholder="请输入详细地址"
          ></u--textarea>
        </u-form-item>
        <u-form-item label="默认地址" label-width="90">
          <u-switch
            activeColor="#ff812f"
            size="20"
            v-model="form.is_default"
            :active-value="1"
            :inactive-value="2"
          >
          </u-switch>
        </u-form-item>
      </u-form>
    </view>
    <cityPicker
      :column="column"
      :default-value="form.area_code"
      :mask-close-able="true"
      @confirm="confirm"
      @cancel="cancel"
      :visible="visible"
    />
    <view class="safe-bottom"></view>
    <view class="fix-bottom-box">
      <view class="fix-bottom">
        <view class="pay-btn" @click="save()">保存</view>
      </view>
    </view>
  </view>
</template>

<script>
import cityPicker from "../../components/piaoyi-cityPicker/piaoyi-cityPicker";
export default {
  components: { cityPicker },
  data() {
    return {
      column: 3,
      visible: false,
      fromPage: "",
      errorType: ["message"],
      form: {
        name: "",
        phone: "",
        addressText: "",
        area_code: "",
        addr: "",
        is_default: 2,
      },
      rules: {
        name: [
          {
            required: true,
            message: "请输入收货人姓名",
            trigger: ["change", "blur"],
          },
        ],
        phone: [
          {
            required: true,
            message: "请输入手机号",
            trigger: ["change", "blur"],
          },
          {
            validator: (rule, value, callback) => {
              // 调用uView自带的js验证规则，详见：https://www.uviewui.com/js/test.html
              return this.$u.test.mobile(value);
            },
            message: "手机号码不正确",
            // 触发器可以同时用blur和change，二者之间用英文逗号隔开
            trigger: ["change", "blur"],
          },
        ],
        addressText: [
          {
            required: true,
            message: "请选择地区",
            trigger: ["change", "blur"],
          },
        ],
        addr: [
          {
            required: true,
            message: "请输入详细地址",
            trigger: ["change", "blur"],
          },
        ],
        submitBack: false, //添加成功返回方式，true：navigateback
      },
    };
  },
  onLoad(options) {
    if (options.from) {
      this.fromPage = options.from;
    }
    if (options.data) {
      let obj = JSON.parse(decodeURIComponent(options.data));
      console.log(obj);
      this.form = {
        ...obj,
        addressText: obj.complete_addr,
      };
      uni.setNavigationBarTitle({
        title: "编辑收货地址",
      });
    }
  },
  methods: {
    save() {
      console.log(1111);
      this.$refs.uForm.validate().then((res) => {
        let param = {
          ...this.form,
        };
        this.API.home
          .saveReceiveAddr(param)
          .then((res) => {
            console.log(res);
            uni.navigateBack();
            uni.showToast({
              title: "保存成功",
              duration: 2500,
              icon: "none",
            });
          })
          .catch(async (err) => {
            if (err.code == 410) {
              await this.$store.dispatch("toLogon", {});
              this.save();
            }
          });
      });
    },
    openPick() {
      this.visible = true;
    },
    confirm(val) {
      console.log(val);
      this.form.area_code = val.code;
      this.form.addressText = val.name;
      this.visible = false;
    },
    cancel() {
      this.visible = false;
    },
  },
  // 必须要在onReady生命周期，因为onLoad生命周期组件可能尚未创建完毕
  onReady() {
    this.$refs.uForm.setRules(this.rules);
  },
};
</script>
<style lang="scss" scoped>
.set-address {
  box-sizing: border-box;
  min-height: 100vh;
  background: #fafafa;
  overflow: hidden;
  .add-container {
    background: #ffffff;
    border-radius: 20rpx;
    padding: 20rpx 20rpx 20rpx 30rpx;
    margin: 20rpx;
  }
  /deep/ .u-input,
  /deep/ .u-textarea {
    background: #fafafa !important;
    border: none !important;
  }
  .area-box {
    display: flex;
    align-items: center;
    padding: 16rpx 9px;
    background: #fafafa !important;
    justify-content: space-between;
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
}
</style>