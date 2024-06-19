<template>
  <view class="push">
    <view class="push-form">
      <view class="form-item">
        <u--input
          :placeholder="nameObj[type]"
          v-model="theData.title"
          placeholderStyle="color:#666666;"
          border="none"
        ></u--input>
      </view>
      <view class="form-item form-content">
        <u--textarea
          autoHeight
          border="none"
          placeholderStyle="color:#666666;"
          v-model="theData.content"
          :placeholder="contentObj[type]"
        >
        </u--textarea>
      </view>
      <view class="upload-box" v-if="type != '兼职'">
        <view
          @click="prewFile(item, index)"
          class="filelist-item"
          v-for="(item, index) in fileList"
          :key="index"
        >
          <view class="del-icon" @click.native.stop="delFile(index)">
            <u-icon name="close" color="#FFFFFF" size="12"></u-icon>
          </view>
          <image class="image-style" mode="aspectFill" :src="item.url" />
        </view>
        <view
          class="upload-btn"
          v-if="fileList.length < 9"
          @click="chooseMedia()"
        >
          <u-icon name="camera" color="#FFFFFF" size="50"></u-icon>
        </view>
      </view>
      <view class="the-buttons" v-if="type != '分享/安利'">
        <view
          @click="openPopup_huati"
          :class="{
            'the-button': true,
            label_selected: theSelectedLabels.length,
          }"
          >#添加话题
        </view>
        <view
          v-if="!['分享/安利', '兼职', '组队/搭子'].includes(type)"
          @click="toAnonymous"
          :class="{
            'the-button': true,
            'the-button-1': theData.is_anonymous == 1,
          }"
        >
          <image
            v-if="theData.is_anonymous == 2"
            src="/static/3_niming_1.png"
            mode="widthFix"
          ></image>
          <image
            v-if="theData.is_anonymous == 1"
            src="/static/3_niming_2.png"
            mode="widthFix"
          ></image>
          <view :class="{ is_anonymous: theData.is_anonymous == 1 }"
            >匿名发布</view
          >
        </view>
      </view>
    </view>
    <view class="choose-box">
      <view
        class="choose-item"
        v-if="!['组队/搭子'].includes(type)"
        @click="toRange()"
      >
        <view class="left-label">{{
          type == "分享/安利" ? "选择范围" : "公开范围"
        }}</view>
        <view class="flex-algin">
          <view class="right-text">{{
            theSelectedranges.length
              ? `当前已选（${theSelectedranges.length}）`
              : "默认不限"
          }}</view>
          <u-icon slot="right" name="arrow-right"></u-icon>
        </view>
      </view>
      <view v-else>
        <view class="choose-item hope-num">
          <view class="left-label">期望人数</view>
          <view class="flex-algin">
            <u--input
              placeholderStyle="color:#666666;"
              placeholder="请输入期望人数"
              v-model="theData.hope_num"
              border="none"
              type="number"
            ></u--input>
          </view>
        </view>
        <view class="choose-item">
          <view class="left-label">性别要求</view>
          <u-radio-group v-model="theData.sex_type" placement="row">
            <u-radio activeColor="#f89f12" name="不限" label="不限"></u-radio>
            <u-radio activeColor="#f89f12" name="男" label="男"></u-radio>
            <u-radio activeColor="#f89f12" name="女" label="女"></u-radio>
          </u-radio-group>
        </view>
        <view class="choose-item form-content">
          <view class="left-label">费用方式</view>
          <u-radio-group v-model="theData.free_type" placement="row">
            <u-radio activeColor="#f89f12" name="免费" label="免费"></u-radio>
            <u-radio activeColor="#f89f12" name="AA" label="AA"></u-radio>
          </u-radio-group>
        </view>
      </view>
      <view v-if="['兼职'].includes(type)">
        <view class="choose-item hope-num">
          <view class="left-label">结算报酬</view>
          <view class="flex-algin">
            <u--input
              placeholderStyle="color:#666666;"
              placeholder="请输入具体金额或面议"
              v-model="theData.wages"
              border="none"
              type="number"
            ></u--input>
          </view>
        </view>
        <view v-if="theData.wages != '面议'">
          <view class="choose-item">
            <view class="left-label">结算单位</view>
            <u-radio-group v-model="theData.jsdw" placement="row">
              <u-radio
                activeColor="#f89f12"
                name="元/小时"
                label="元/小时"
              ></u-radio>
              <u-radio
                activeColor="#f89f12"
                name="元/天"
                label="元/天"
              ></u-radio>
              <u-radio
                activeColor="#f89f12"
                name="元/月"
                label="元/月"
              ></u-radio>
            </u-radio-group>
          </view>
          <view class="choose-item">
            <view class="left-label">结算周期</view>
            <u-radio-group v-model="theData.jszq" placement="row">
              <u-radio activeColor="#f89f12" name="日结" label="日结"></u-radio>
              <u-radio activeColor="#f89f12" name="周结" label="周结"></u-radio>
              <u-radio activeColor="#f89f12" name="月结" label="月结"></u-radio>
            </u-radio-group>
          </view>
        </view>
        <view class="choose-item" @click="toAddress()">
          <view class="left-label">兼职城市</view>
          <view class="flex-algin">
            <view
              class="right-text"
              :class="{ 'choose-text': !theData.area_name }"
              >{{
                theData.area_name ? theData.area_name : "（请选择兼职所在城市）"
              }}</view
            >
            <u-icon slot="right" name="arrow-right"></u-icon>
          </view>
        </view>
      </view>
      <view
        class="choose-item"
        v-if="['分享/安利'].includes(type)"
        @click="chooseProduct()"
      >
        <view class="left-label">添加商品链接</view>
        <view class="flex-algin right-product">
          <view
            class="right-text product-title"
            :class="{ 'choose-text': !taskTitle }"
            >{{ taskTitle ? taskTitle : "（请选择关联商品）" }}</view
          >
          <u-icon slot="right" name="arrow-right"></u-icon>
        </view>
      </view>
    </view>
    <view class="choose-box" v-if="['组队/搭子'].includes(type)">
      <view class="choose-item" :class="{ 'choose-time': dateRange.length }">
        <view class="left-label">活动时间</view>
        <view class="flex-algin">
          <uni-datetime-picker
            :border="false"
            v-model="dateRange"
            type="daterange"
            @change="dateMaskClick"
          />
          <u-icon slot="right" name="arrow-right"></u-icon>
        </view>
      </view>
      <view class="choose-item" @click="toAddress()">
        <view class="left-label">活动地点</view>
        <view class="flex-algin">
          <view
            class="right-text"
            :class="{ 'choose-text': !theData.area_name }"
            >{{
              theData.area_name ? theData.area_name : "（请选择活动地点）"
            }}</view
          >
          <u-icon slot="right" name="arrow-right"></u-icon>
        </view>
      </view>
    </view>
    <view class="safe-bottom"></view>
    <view class="fix-bottom-box">
      <view class="fix-bottom">
        <view
          class="cgx-box"
          @click="save(2)"
          v-if="!['组队/搭子', '分享/安利'].includes(type)"
        >
          <image src="@/static/icon-cgx.png"></image>
          <text>存草稿</text>
        </view>
        <view class="pay-btn" @click="save(1)">立即发布</view>
      </view>
    </view>
    <!-- 添加话题的弹窗 -->
    <uni-popup ref="huati_popup" type="bottom">
      <view class="huati_popup-box">
        <!-- <view class="back" @click="closePopup_huati">
					<uni-icons type="undo-filled" size="20" color="#727272"></uni-icons>
					<text>确认返回</text>
				</view> -->
        <view class="the-selected-labels">
          <view class="the-selected-labels-title">可添加多个话题哦~</view>
          <view class="tips">(提示：轻击可删除哦~)</view>
          <view class="the-selected-labels-label">
            <view
              @click="deletedOne(index)"
              class="label-one"
              v-for="(item, index) in theSelectedLabels"
              >{{ item }}</view
            >
          </view>
        </view>
        <view class="the-tip-labels">
          <view
            @click="addLabel(item)"
            class="label-one"
            v-for="(item, index) in theLabels"
            >#{{ item }}</view
          >
        </view>

        <!-- 评论输入框 -->
        <view class="comment-input" :style="'bottom:' + 0 + 'px;'">
          <text>#</text>
          <uni-easyinput
            v-model="theHandAddLabel"
            @confirm="handAddLabel()"
            confirmType="next"
            placeholder="想要说点什么..."
            :inputBorder="false"
          />
          <view @click="handAddLabel()" class="comment-button">添加</view>
          <!-- <view @click="handAddLabel()" class="comment-button">确认</view> -->
        </view>
      </view>
    </uni-popup>
  </view>
</template>

<script>
import { addressList } from "../../components/piaoyi-cityPicker/cityData";
export default {
  components: {},
  data() {
    return {
      id: "",
      task_id: 0,
      taskTitle: "",
      addressArr: [],
      dateRange: [],
      theSelectedranges: [],
      theHandAddLabel: "",
      theLabels: [],
      theSelectedLabels: [],
      fileList: [],
      theData: {
        area_code: "",
        area_name: "",
        title: "",
        content: "",
        is_anonymous: 2,
        sex_type: "不限",
        free_type: "免费",
        settlement: "",
        jsdw: "元/小时",
        jszq: "日结",
      },
      type: "",
      titleObj: {
        话题: "话题",
        "组队/搭子": "组队",
        "分享/安利": "安利好物",
        二手闲置: "闲置",
        兼职: "兼职",
        表白: "表白",
        求助: "求助",
        其他: "其他",
      },
      nameObj: {
        话题: "请输入推荐标题",
        "组队/搭子": "请输入组队名称",
        "分享/安利": "请输入推荐标题",
        二手闲置: "请输入推荐标题",
        兼职: "请输入职位名称",
        表白: "请输入推荐标题",
        求助: "请输入推荐标题",
        其他: "请输入推荐标题",
      },
      contentObj: {
        话题: "在这里输入内容...",
        "组队/搭子": "请输入组队说明...",
        "分享/安利": "正文介绍...",
        二手闲置: "在这里输入内容...",
        兼职: "介绍工作内容、职位要求、加分项",
        表白: "在这里输入内容...",
        求助: "在这里输入内容...",
        其他: "在这里输入内容...",
      },
    };
  },
  onLoad(options) {
    this.getArea();
    if (options.type) {
      this.type = options.type;
      uni.setNavigationBarTitle({
        title:
          this.type == "分享/安利"
            ? this.titleObj[options.type]
            : `${options.id ? "编辑" : "发布"}${this.titleObj[options.type]}`,
      });
    }
    if (options.id) {
      this.id = options.id;
      this.getDetail(options.id);
    }
    uni.$on("getRange", (data) => {
      this.theSelectedranges = data;
    });
    uni.$on("changePushArea", async (data) => {
      this.theData.area_code = data.code;
      this.getAddText(data.code);
    });
    uni.$on("pushProduct", (data) => {
      this.task_id = data.id;
      this.taskTitle = data.title;
    });
  },
  methods: {
    getDetail(id) {
      this.API.home
        .getMyMomentInfo({
          moments_id: id,
        })
        .then((res) => {
          console.log(res);
          this.theData = { ...res.data };
          this.theSelectedLabels = res.data.label
            ? res.data.label.split(",")
            : [];
          let arrImg = res.data.url
            ? res.data.url.split(",").map((el) => {
                return {
                  url: el,
                };
              })
            : [];
          this.fileList = this.fileList.concat(arrImg);
          let areaArr = res.data.area_names
            ? res.data.area_names.split(",")
            : [];
          this.theSelectedranges = res.data.area_codes
            ? res.data.area_codes.split(",").map((el, index) => {
                return {
                  title: areaArr[index],
                  code: el,
                };
              })
            : [];
          this.task_id = res.data.task_id ? res.data.task_id : "";
          this.taskTitle = res.data.task_title ? res.data.task_title : "";
          if (res.data.area_code) {
            this.getAddText(res.data.area_code);
          }
          this.dateRange = res.data.start_at
            ? [res.data.start_at, res.data.end_at]
            : [];
          if (this.type == "兼职" && res.data.wages != "面议") {
            let str = res.data.settlement.slice(-2);
            let text = "/" + str;
            this.theData.jsdw = res.data.settlement.split(text)[0];
            this.theData.jszq = str;
          }
        })
        .catch(async (err) => {
          if (err.code == 410) {
            await this.$store.dispatch("toLogon", {});
            this.getDetail(id);
          }
        });
    },
    chooseProduct() {
      uni.navigateTo({
        url: "/page_product/pages/search/searchResult?from=push",
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
    getAddText(code) {
      this.addressArr.forEach((el) => {
        el.children.forEach((item) => {
          if (item.value == code) {
            this.$set(this.theData, "area_name", el.label + item.label);
          }
        });
      });
    },
    // 跳转地址选择
    toAddress: function () {
      uni.navigateTo({
        url: "/pages/index/address?type=push",
      });
    },
    // 选择时间
    dateMaskClick: function () {
      this.theData.start_at = this.dateRange[0];
      this.theData.end_at = this.dateRange[1];
    },
    // 发布
    save(is_on) {
      if (!this.theData.title) {
        uni.showToast({
          title: this.nameObj[this.type],
          duration: 2500,
          icon: "none",
        });
        return false;
      }
      let tag = true;
      if (this.type == "组队/搭子") {
        if (this.theData.hope_num < 2) {
          tag = false;
          uni.showToast({
            title: "请至少填写2个及以上的组队期望人数",
            duration: 2500,
            icon: "none",
          });
        } else {
          let errorObj = {
            sex_type: "请选择性别要求",
            free_type: "请选择费用方式",
            start_at: "请选择活动时间",
            end_at: "请选择活动时间",
            area_code: "请选择活动地点",
          };
          for (let i in errorObj) {
            if (!this.theData[i]) {
              tag = false;
              uni.showToast({
                title: errorObj[i],
                duration: 2500,
                icon: "none",
              });
              return;
            }
          }
        }
      } else if (this.type == "兼职") {
        let errorObj = {
          content: "请填写介绍工作内容、职位要求、加分项",
          wages: "请输入具体金额或面议",
          area_code: "请选择兼职所在城市",
        };
        for (let i in errorObj) {
          if (!this.theData[i]) {
            tag = false;
            uni.showToast({
              title: errorObj[i],
              duration: 2500,
              icon: "none",
            });
            return;
          }
        }
      } else if (this.type == "分享/安利") {
        if (!this.theData.content) {
          this.commonShowToast("请填写正文介绍");
          return false;
        } else if (!this.fileList.length) {
          this.commonShowToast("请上传图片");
          return false;
        } else if (!this.task_id) {
          this.commonShowToast("请选择关联商品");
          return false;
        }
      }
      if (!tag) {
        return false;
      }
      //图片
      let url = this.fileList.length
        ? this.fileList.map((el) => el.url).join(",")
        : "";
      let area_codes = this.theSelectedranges.length
        ? this.theSelectedranges.map((el) => el.code).join(",")
        : "";
      // 标签
      let label = this.theSelectedLabels.length
        ? this.theSelectedLabels.join(",")
        : "";
      let settlement = "";
      if (this.type == "兼职") {
        settlement =
          this.theData.wages == "面议"
            ? ""
            : `${this.theData.jsdw}/${this.theData.jszq}`;
      }
      let param = {
        ...this.theData,
        id: this.id ? this.id : 0,
        is_on,
        type: this.type,
        url,
        label,
        area_codes,
        sex_type: this.theData.sex_type,
        task_id: this.task_id,
        settlement,
      };
      if (["分享/安利", "兼职", "组队/搭子"].includes(this.type)) {
        delete param.is_anonymous;
      }
      this.API.push
        .publish(param)
        .then((res) => {
          if (is_on == 1) {
            uni.$emit("publishSchool", {});
            uni.switchTab({
              url: "/pages/index/index",
              success: () => {
                uni.showToast({
                  title: "发布成功",
                  icon: "none",
                });
              },
            });
          } else {
            uni.navigateBack({
              delta: 1,
              success: () => {
                uni.showToast({
                  title: "保存成功",
                  icon: "none",
                });
              },
            });
          }
        })
        .catch(async (err) => {
          if (err.code == 410) {
            await this.$store.dispatch("toLogon", {});
            this.save(is_on);
          }
        });
    },
    commonShowToast(text) {
      uni.showToast({
        title: text,
        duration: 2500,
        icon: "none",
      });
    },
    // 跳转范围选择
    toRange: function () {
      let arr = encodeURIComponent(JSON.stringify(this.theSelectedranges));
      uni.navigateTo({
        url: "/page_product/pages/push/range?list=" + arr,
      });
    },
    // 添加标签及校验
    addLabel: function (item) {
      let arr = this.theSelectedLabels.filter((el) => el == item);
      if (arr.length) {
        uni.showToast({
          title: "已添加过这个话题了哦~",
          duration: 1500,
          icon: "none",
        });
      } else {
        this.theSelectedLabels.push(item);
      }
    },
    // 手动输入话题
    handAddLabel: function () {
      if (this.theHandAddLabel) {
        this.addLabel(this.theHandAddLabel);
        this.theHandAddLabel = "";
      }
    },
    // 删除一个标签
    deletedOne: function (index) {
      this.theSelectedLabels.splice(index, 1);
    },
    // 打开话题选择弹窗
    async openPopup_huati() {
      await this.getLabels();
      this.$refs.huati_popup.open();
    },
    // 关闭
    closePopup_huati() {
      this.$refs.huati_popup.close();
    },
    // 是否匿名发帖
    toAnonymous: function () {
      if (this.theData.is_anonymous == 1) {
        this.theData.is_anonymous = 2;
        uni.showToast({
          title: "已取消匿名",
          duration: 1500,
          icon: "none",
        });
      } else {
        this.theData.is_anonymous = 1;
        uni.showToast({
          title: "已匿名",
          duration: 1500,
          icon: "none",
        });
      }
    },
    // 根据类型获取所有校园墙标签
    getLabels: function () {
      let that = this;
      return new Promise(function (resolve, reject) {
        uni.request({
          url: that.$store.state.theUrl + "/wechat/moments/getLabels",
          method: "POST",
          header: {
            token: that.$store.state.theToken,
          },
          data: {
            type: that.type, //校园墙类型：话题（默认）、组队/搭子、分享/安利、二手闲置、兼职、表白、求助、其他
          },
          success: (res) => {
            console.log("getLabels_res", res);
            if (res.data.code == 0) {
              // 重置
              that.theLabels = [];
              for (let i = 0; i < res.data.data.length; i++) {
                that.theLabels.push(res.data.data[i].title);
              }

              // 只有这里有resolve，也就是await这个方法的话，只有返回code  == 0 才能继续
              resolve();
            } else if (res.data.code == 500) {
              uni.showToast({
                title: "服务器连接失败，请反馈官方客服哦~",
                duration: 2500,
                icon: "none",
              });
            } else if (res.data.code == 410) {
              let __that = that;
              // 异步转同步，
              (async function () {
                // 登录
                await __that.$store.dispatch("toLogon", {});

                // 重新获取
                __that.openPopup_huati();
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

            resolve();
          },
        });
      });
    },
    //   预览
    prewFile(item, index) {
      uni.previewImage({
        current: index, // 当前显示图片索引
        urls: this.fileList.map((el) => el.url), // 需要预览的图片http链接列表
      });
    },
    // 删除文件
    delFile(index) {
      this.fileList.splice(index, 1);
    },
    chooseMedia() {
      uni.chooseImage({
        count: 9 - this.fileList.length, // 默认9, 设置图片的选择数量
        sizeType: ["original", "compressed"], // 可以指定是原图还是压缩图，默认二者都有
        sourceType: ["album", "camera"],
        success: async (e) => {
          console.log(e);
          let nowDateTime = this.$public.getNowDateTime();
          let theName = [];
          for (let i = 0; i < e.tempFiles.length; i++) {
            theName.push(nowDateTime + "_" + i);
          }
          e.tempFiles.forEach((el) => {
            el.extname = el.path.substring(el.path.lastIndexOf(".") + 1);
          });

          await this.$public
            .upLoadImage({
              type: "img",
              tempFilePaths: e.tempFilePaths,
              name: theName,
              tempFiles: e.tempFiles,
            })
            .then((res) => {
              console.log(res);
              if (res.length) {
                this.fileList = this.fileList.concat(res);
                console.log(this.fileList);
              }
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
.push {
  padding: 0 0 146rpx;
  .push-form {
    padding: 0 30rpx;
    border-top: 20rpx solid #fafafa;
  }
  .form-item {
    padding: 40rpx 0;
    border-bottom: 1rpx solid rgba(144, 144, 144, 0.4);
    /deep/ .u-textarea {
      min-height: 160rpx !important;
      padding: 0 !important;
      .u-textarea__field {
        font-size: 24rpx !important;
        color: #666666 !important;
      }
    }
    /deep/ .input-placeholder {
      font-family: PingFang SC;
      font-weight: 400;
      font-size: 28rpx !important;
      color: #666666 !important;
    }
  }

  .upload-box {
    display: flex;
    flex-wrap: wrap;
    .filelist-item {
      position: relative;
      margin: 0 30rpx 30rpx 0;
      & > .del-icon {
        cursor: pointer;
        padding: 5rpx;
        display: flex;
        align-items: center;
        justify-content: center;
        border-radius: 50%;
        background: #ff812f;
        margin-top: -14rpx;
        position: absolute;
        right: 0rpx;
        margin-right: -14rpx;
        z-index: 6;
      }
      & > image {
        width: 180rpx;
        height: 180rpx;
        border-radius: 14rpx;
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
    .upload-btn {
      width: 180rpx;
      height: 180rpx;
      background: #ededed;
      border-radius: 14rpx;
      display: flex;
      align-items: center;
      justify-content: center;
      margin-bottom: 30rpx;
    }
  }

  .the-buttons {
    display: flex;
    align-items: center;
    justify-content: space-between;
    background-color: #ffffff;
    padding-bottom: 30rpx;
    .the-button {
      display: flex;
      align-items: center;
      justify-content: center;
      background-color: #f3f3f3;
      height: 52rpx;
      line-height: 52rpx;
      padding: 0 30rpx;
      border-radius: 200rpx;
      font-family: PingFang SC;
      font-weight: 400;
      font-size: 24rpx;
      color: #333333;
    }

    .label_selected {
      background-color: #ff812f;
      color: #ffffff;
    }

    .the-button image {
      width: 24rpx;
      height: 24rpx;
      margin-right: 12rpx;
    }

    .is_anonymous {
      color: #ffffff;
    }

    .the-button-1 {
      background-color: #ff812f;
    }
  }
  .huati_popup-box {
    height: 85vh;
    width: 100vw;
    background-color: #ffffff;
    border-radius: 30rpx 30rpx 0 0;

    .the-selected-labels-title {
      height: 6.5vh;
      line-height: 6.5vh;
      text-align: start;
      color: #000000;
      font-size: 15px;
      margin-left: 3.5vw;
    }

    .the-selected-labels-label {
      display: flex;
      flex-direction: row;
      flex-wrap: wrap;
      width: 93vw;
      padding-left: 3.5vw;
      padding-right: 3.5vw;
      padding-bottom: 1vh;
      background-color: #f3f3f3;
      height: 24vh;
      align-content: flex-start;
      overflow: scroll;
    }

    .tips {
      font-size: 12px;
      color: #bbbbbb;
      margin-left: 3.5vw;
      height: 3.5vh;
      line-height: 3.5vh;
    }

    .the-tip-labels {
      display: flex;
      flex-direction: row;
      flex-wrap: wrap;
      width: 93vw;
      padding-left: 3.5vw;
      padding-right: 3.5vw;

      height: 40vh;
      overflow: scroll;
      padding-bottom: 11vh;
    }

    .label-one {
      padding: 0 30rpx;
      height: 52rpx;
      line-height: 52rpx;
      background-color: #ffedd5;
      margin: 30rpx 30rpx 0 0;
      border-radius: 200rpx;
      color: #727272;
      font-size: 26rpx;
    }

    .comment-input {
      display: flex;
      flex-direction: row;
      align-items: center;
      position: fixed;
      bottom: 0;
      z-index: 999;
      padding-left: 3.5vw;
      padding-right: 3.5vw;
      padding-top: 2.5vh;
      padding-bottom: 2.5vh;
      background-color: #ffffff;
      width: 93vw;
    }

    .comment-input text {
      font-size: 13px;
      margin-left: 3.5vw;
    }

    .comment-button {
      padding: 10rpx 30rpx;
      background-color: #ff812f;
      color: #ffffff;
      border-radius: 200rpx;
      text-align: center;
      margin-left: 20rpx;
    }
  }
  .choose-box {
    border-top: 20rpx solid #fafafa;
    background: #ffffff;
    padding: 0 30rpx;
    .choose-item {
      padding: 39rpx 0;
      border-bottom: 1rpx solid rgba(144, 144, 144, 0.4);
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
      .right-product {
        width: calc(100% - 300rpx);
        justify-content: flex-end;
      }
      .right-text {
        font-family: PingFang SC;
        font-weight: 500;
        font-size: 24rpx;
        color: #333333;
      }
      .product-title {
        text-align: right;
        width: 85%;
        overflow: hidden; /* 隐藏超出部分的内容 */
        white-space: nowrap; /* 禁止文本换行 */
        text-overflow: ellipsis; /* 在文本末尾添加省略号 */
      }
      /deep/ .u-radio-group {
        justify-content: flex-end;
        .u-radio {
          margin-left: 40rpx;
        }
        .u-radio__text {
          font-family: PingFang SC;
          font-weight: 400;
          font-size: 26rpx !important;
          color: #333333 !important;
        }
      }
      /deep/.uicon-arrow-right {
        margin: 2rpx 0 0 10rpx;
        font-size: 24rpx !important;
        color: #333333 !important;
      }
      /deep/ .uni-date-range {
        .icon-calendar {
          display: none !important;
        }
        .uni-date__x-input,
        .range-separator {
          word-break: keep-all;
          font-size: 24rpx !important;
          color: #666666;
          height: auto !important;
          line-height: 30rpx !important;
          display: inline !important;
        }
        .range-separator {
          margin: 0 10rpx;
        }
      }
      /deep/ .uni-date__icon-clear {
        display: none !important;
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
    }
    .hope-num {
      .u-input__content__field-wrapper__field {
        font-size: 24rpx;
      }
    }
    .choose-time {
      /deep/ .uni-date-range {
        .uni-date__x-input,
        .range-separator {
          color: #333333 !important;
        }
      }
    }
  }
  .form-content {
    border-bottom: none !important;
    /deep/ .input-placeholder {
      font-size: 24rpx !important;
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
    padding: 25rpx 30rpx;
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
      background: #ff812f;
      border-radius: 38rpx;
      font-family: PingFang SC;
      font-weight: 400;
      font-size: 26rpx;
      color: #ffffff;
      line-height: 76rpx;
      text-align: center;
    }
    .cgx-box {
      display: flex;
      flex-direction: column;
      align-items: center;
      margin-right: 36rpx;
      image {
        width: 34rpx;
        height: 30rpx;
        margin-bottom: 21rpx;
      }
      text {
        font-family: PingFang SC;
        font-weight: 400;
        font-size: 22rpx;
        color: #333333;
        word-break: keep-all;
      }
    }
  }
  .choose-text {
    color: #666666 !important;
    font-size: 24rpx !important;
  }
  .flex-algin {
    display: flex;
    align-items: center;
  }
}
</style>