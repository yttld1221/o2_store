<template>
  <view class="chat">
    <scroll-view
      v-if="showScroll"
      @click="closeBottom"
      :style="{height:`calc(100vh - ${bottomHeight}px)`}"
      :refresher-triggered="triggered"
      refresher-enabled
      refresher-default-style="none"
      @refresherrefresh="pullList"
      class="scroll-view"
      scroll-y
      :scroll-with-animation="isShow"
      :scroll-top="top"
    >
      <view class="list-item" v-for="(item, index) in list" :key="index">
        <view class="time-box" v-if="item.show_time">
          <view class="time-text">{{ getTime(item.created_at) }}</view>
        </view>
        <view
          class="message"
          :class="theLogonUser.id != item.from_user_id ? 'friend' : 'self'"
        >
          <image
            :src="item.from_avatar_url"
            v-if="theLogonUser.id != item.from_user_id"
            class="avatar"
            mode="widthFix"
          ></image>
          <view class="content" v-if="item.messageType === 'image'">
            <image :src="item.content" mode="widthFix"></image>
          </view>
          <view class="content" v-else>
            <view>{{ item.msg }}</view>
          </view>
          <image
            :src="item.from_avatar_url"
            v-if="theLogonUser.id == item.from_user_id"
            class="avatar"
            mode="widthFix"
          ></image>
        </view>
      </view>
    </scroll-view>
    <view class="tool" id="bottom-fix">
      <view
        class="input-box"
        :style="{ 'align-items': rowLine == 1 ? 'center' : 'flex-end' }"
      >
        <u--textarea
          @linechange="lineChange"
          @confirm="sendMessage"
          @focus="focusContent"
          cursorSpacing="100"
          :showConfirmBar="false"
          fixed
          v-model="content"
          autoHeight
        ></u--textarea>
        <image
          @click="openBottom('emoji')"
          class="icon-image"
          style="margin-left: 33rpx"
          src="/static/xiaolian.png"
        ></image>
        <image
          @click="openBottom('use')"
          class="icon-image"
          src="/static/plus-circle.png"
        ></image>
      </view>
      <view class="tool-bottom" v-if="showBottom">
        <emoKeyboard
          v-if="typeShow == 'emoji'"
          :show="true"
          :data="emojiList"
          @change="changeBq"
        ></emoKeyboard>
        <view class="use-box" v-else>
          <view
            @click="chooseUse(index)"
            class="use-item"
            :key="index"
            v-for="(item, index) in useList"
          >
            <view class="img-box">
              <uni-icons :type="item.icon" size="30"></uni-icons>
            </view>
            <text>{{ item.label }}</text>
          </view>
        </view>
      </view>
    </view>
  </view>
</template>

<script>
import emoKeyboard from "./components/emoKeyboard.vue";
export default {
  components: { emoKeyboard },
  data() {
    return {
      showScroll: true,
      useList: [
        { label: "图片", icon: "image-filled" },
        { label: "视频", icon: "videocam-filled" },
        { label: "拍照", icon: "camera-filled" },
      ],
      showBottom: false,
      typeShow: "",
      rowLine: 1,
      emojiList: [],
      isShow: false,
      theLogonUser: {},
      // 当前获取的校园墙页码，每次需要+1
      theGetListPage: 1,
      theGetListPagesize: 10,
      content: "",
      list: [],
      top: 0,
      id: "",
      triggered: false,
      bottomHeight: 0,
    };
  },
  watch: {
    list: {
      handler(val) {
        this.showTime();
      },
      deep: true,
    },
  },
  onReady() {
    this.$nextTick(() => {
      this.getBottomHeight("list");
    });
  },
  onLoad(options) {
    if (options.id) {
      this.id = options.id;
      uni.setNavigationBarTitle({
        title: options.name,
      });
      // 调用接口
      this.getMessage("init");
      this.getData();
    }

    uni.$on("changeMessageInfo", (data) => {
      console.log(data);
      if (
        (this.id == data.from_user_id &&
          this.theLogonUser.id == data.to_user_id) ||
        (this.id == data.to_user_id &&
          this.theLogonUser.id == data.from_user_id)
      ) {
        this.list.push(data);
        if (this.theLogonUser.id == data.from_user_id) {
          this.scrollToBottom();
        }
      }
    });
  },
  onShow() {
    this.theLogonUser = this.$store.state.theLogonUser;
  },
  computed: {
    Style() {
      let obj = {
        height: `calc(100vh - ${this.bottomHeight}px)`,
      };
      return JSON.stringify(obj);
    },
  },
  methods: {
    chooseUse(index) {
      uni.chooseMedia({
        count: index == 2 ? 1 : 100, // 默认为9，可以设置为需要的文件数量
        mediaType:
          index == 2 ? ["video", "image"] : index == 0 ? ["image"] : ["video"], // 可以选择视频和图片
        sourceType: index == 2 ? ["camera"] : ["album"], // 可以选择从相册或相机中选择
        success: (res1) => {
          const tempFiles = res1.tempFiles;
          // 这里可以获取到选择的文件列表，进行后续上传操作
          console.log(tempFiles);
          // 例如，可以使用uni.uploadFile来上传文件
          tempFiles.forEach(async (file, index) => {
            const result = await this.uploadFilePromise(file, index);
            console.log(result);
            this.commonSend(result);
          });
        },
        fail: (error) => {
          console.error("choose media fail:", error);
        },
      });
    },
    uploadFilePromise(file, index) {
      return new Promise((resolve, reject) => {
        let a = this.API.order
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
            }${this.$public.getNowDateTime()}_chat_${index}_${
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
                  resolve(`${res.data.host}/${key}theqnxasend${file.fileType}`);
                }
              },
              fail: (error) => {
                reject(error);
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
    closeBottom() {
      this.showBottom = false;
      this.$nextTick(() => {
        this.getBottomHeight();
      });
    },
    // 打开底部
    openBottom(type) {
      this.showBottom = this.typeShow == type ? !this.showBottom : true;
      this.typeShow = type;
      this.$nextTick(() => {
        this.getBottomHeight();
      });
    },
    // 获取焦点
    focusContent() {
      this.scrollToBottom();
      this.closeBottom();
    },
    // 获取底部高度
    getBottomHeight(type = "") {
      this.showScroll = false;
      let query = uni.createSelectorQuery().in(this);
      query
        .select("#bottom-fix")
        .boundingClientRect((data) => {
          if (data) {
            this.bottomHeight = data.height;
            this.showScroll = true;
            this.scrollToBottom();
          }
        })
        .exec();
    },
    lineChange(event) {
      console.log(event);
      this.rowLine = event.detail.lineCount;
      this.$nextTick(() => {
        this.getBottomHeight("change");
      });
    },
    changeBq(emoji) {
      this.content += emoji;
    },
    getData() {
      //表情可以去这里复制https://geekerline.com/emoji/
      this.emojiList = [
        "😀",
        "😃",
        "😄",
        "😁",
        "😆",
        "😅",
        "😂",
        "🤣",
        "😊",
        "😇",
        "🙂",
        "🙃",
        "😉",
        "😌",
        "😍",
        "😘",
        "😗",
        "😙",
        "😚",
        "😋",
        "😛",
        "😝",
        "😜",
        "🤪",
        "🤨",
        "🧐",
        "🤓",
        "😎",
        "🤩",
        "😏",
        "😒",
        "😞",
        "😔",
        "😟",
        "😕",
        "🙁",
        "😣",
        "😖",
        "😫",
        "😩",
        "😢",
        "😭",
        "😤",
        "😠",
        "😡",
        "🤬",
        "🤯",
        "😳",
        "😱",
        "😨",
        "😰",
        "😥",
        "😓",
        "🤗",
        "🤔",
        "🤭",
        "🤫",
        "🤥",
        "😶",
        "😐",
        "😑",
        "😬",
        "🙄",
        "😯",
        "😦",
        "😧",
        "😮",
        "😲",
        "😴",
        "🤤",
        "😪",
        "😵",
        "🤐",
        "🤢",
        "🤮",
        "🤧",
        "😷",
        "🤒",
        "🤕",
        "🤑",
        "🤠",
        "😈",
        "👿",
        "👹",
        "👺",
        "🤡",
        "💩",
        "👻",
        "💀",
        "☠",
        "👽",
        "👾",
        "🤖",
        "🎃",
        "😺",
        "😸",
        "😹",
        "😻",
        "😼",
        "😽",
        "🙀",
        "😿",
        "😾",
      ];
    },
    onRefresherPull() {
      // 下拉时触发
      console.log("下拉刷新");
    },
    pullList() {
      this.isShow = true;
      this.triggered = true;
      this.getMessage("pull");
    },
    commonSend(msg) {
      if (msg) {
        let param = {
          data: {
            to_user_id: this.id,
            msg,
          },
          cmd: "ws:sendChatMsg",
        };
        this.$store.dispatch("sendMessage", {
          message: JSON.stringify(param),
          type: "user",
        });
        this.content = "";
      }
    },
    sendMessage() {
      console.log("发送");
      this.commonSend(this.content);
    },
    getTime(time) {
      if (time) {
        return this.$public.formatTime(time);
      }
    },
    getMessage(type = "") {
      let params = {
        page: this.theGetListPage,
        pagesize: this.theGetListPagesize,
        from_user_id: this.id,
      };
      this.API.user
        .getMyChatMsgList(params)
        .then((res) => {
          console.log(res);
          // 如果是请求第一页，证明是首次请求，就重置一下
          if (this.theGetListPage == 1) {
            this.list = [];
          }
          if (res.data.length != 0) {
            if (type == "init") {
              this.list = this.list.concat(res.data);
            } else {
              this.list.unshift(...res.data);
            }
            // 页面+1
            this.theGetListPage += 1;
            if (type == "init") {
              this.$nextTick(() => {
                this.scrollToBottom();
              });
            } else if (type == "pull") {
              this.triggered = false;
            }
          } else {
            if (type == "pull") {
              this.triggered = false;
            }
          }
        })
        .catch(async (err) => {
          if (err.code == 410) {
            await this.$store.dispatch("toLogon", {});
            this.theLogonUser = this.$store.state.theLogonUser;
            this.getMessage(type);
          }
        });
    },
    showTime() {
      for (let i = 0; i < this.list.length; i++) {
        const currTime = new Date(this.list[i]["created_at"]).getTime();
        if (i == 0) {
          this.list[i].show_time = true;
        } else {
          const lastTime = new Date(this.list[i - 1]["created_at"]).getTime();
          if (currTime - lastTime >= 18000) {
            this.list[i].show_time = true;
          } else {
            this.list[i].show_time = false;
          }
        }
      }
    },
    scrollToBottom() {
      this.top = this.list.length * 10000;
    },
  },
};
</script>
<style lang="scss" scoped>
/* 行为相关颜色 */
$uni-color-primary: #007aff;
$uni-color-success: #4cd964;
$uni-color-warning: #f0ad4e;
$uni-color-error: #dd524d;

/* 文字基本颜色 */
$uni-text-color: #333; //基本色
$uni-text-color-inverse: #fff; //反色
$uni-text-color-grey: #999; //辅助灰色，如加载更多的提示信息
$uni-text-color-placeholder: #808080;
$uni-text-color-disable: #c0c0c0;

/* 背景颜色 */
$uni-bg-color: #ffffff;
$uni-bg-color-grey: #f8f8f8;
$uni-bg-color-hover: #f1f1f1; //点击状态颜色
$uni-bg-color-mask: rgba(0, 0, 0, 0.4); //遮罩颜色

/* 边框颜色 */
$uni-border-color: #c8c7cc;

/* 尺寸变量 */

/* 文字尺寸 */
$uni-font-size-sm: 12px;
$uni-font-size-base: 14px;
$uni-font-size-lg: 16;

/* 图片尺寸 */
$uni-img-size-sm: 20px;
$uni-img-size-base: 26px;
$uni-img-size-lg: 40px;

/* Border Radius */
$uni-border-radius-sm: 2px;
$uni-border-radius-base: 3px;
$uni-border-radius-lg: 6px;
$uni-border-radius-circle: 50%;

/* 水平间距 */
$uni-spacing-row-sm: 5px;
$uni-spacing-row-base: 10px;
$uni-spacing-row-lg: 15px;

/* 垂直间距 */
$uni-spacing-col-sm: 4px;
$uni-spacing-col-base: 8px;
$uni-spacing-col-lg: 12px;

/* 透明度 */
$uni-opacity-disabled: 0.3; // 组件禁用态的透明度

/* 文章场景相关 */
$uni-color-title: #2c405a; // 文章标题颜色
$uni-font-size-title: 20px;
$uni-color-subtitle: #555555; // 二级标题颜色
$uni-font-size-subtitle: 26px;
$uni-color-paragraph: #3f536e; // 文章段落颜色
$uni-font-size-paragraph: 15px;

.chat {
  background: #fafafa;
  height: 100vh;
  .scroll-view {
    background: #fafafa;
    box-sizing: border-box;
    padding: 30rpx 30rpx 0;
    .list-item {
      box-sizing: border-box;
    }
  }

  .time-box {
    padding-bottom: 55rpx;
    display: flex;
    justify-content: center;
    .time-text {
      font-family: PingFang SC;
      font-weight: 400;
      font-size: 22rpx;
      color: #ffffff;
      background: #eaeaea;
      border-radius: 12rpx;
      padding: 7rpx 23rpx;
    }
  }
  .message {
    display: flex;
    align-items: flex-start;
    padding-bottom: 55rpx;

    .avatar {
      width: 80rpx;
      height: 80rpx;
      border-radius: 100%;
      margin-right: 25rpx;
    }
    .content {
      min-height: 80rpx;
      max-width: 60vw;
      line-height: 1.3;
      box-sizing: border-box;
      font-family: PingFang SC;
      font-weight: 400;
      font-size: 28rpx;
      display: flex;
      align-items: center;
      padding: 20rpx;
      border-radius: 20rpx;
      & > view {
        width: 100%;
        word-wrap: break-word;
      }
      image {
        width: 200rpx;
      }
    }
    &.self {
      justify-content: flex-end;
      .avatar {
        margin: 0 0 0 25rpx;
      }
      .content {
        position: relative;
        background: #ff812f;
        color: #ffffff;
        &::after {
          position: absolute;
          content: "";
          width: 0;
          height: 0;
          border: 16rpx solid transparent;
          border-left: 16rpx solid #ff812f;
          right: -28rpx;
          top: 24rpx;
        }
      }
    }
    &.friend {
      .content {
        background: #ffffff;
        color: #222222;
        position: relative;
        &::after {
          position: absolute;
          content: "";
          width: 0;
          height: 0;
          border: 16rpx solid transparent;
          border-right: 16rpx solid #fff;
          left: -28rpx;
          top: 24rpx;
        }
      }
    }
  }

  .tool {
    position: fixed;
    width: 100%;
    left: 0;
    bottom: 0;
    background: #ffffff;
    box-sizing: border-box;
    padding-bottom: calc(constant(safe-area-inset-bottom)) !important;
    padding-bottom: calc(env(safe-area-inset-bottom)) !important;
    .input-box {
      background: #ffffff;
      box-sizing: border-box;
      display: flex;
      padding: 15rpx 30rpx;
      min-height: 100rpx;
    }
    .tool-bottom {
      border-top: 1rpx solid rgba(211, 211, 211, 0.5);
      padding: 20rpx 30rpx 0;
      .use-box {
        padding: 26rpx 0;
        display: flex;
        .use-item {
          margin-right: 52rpx;
          display: flex;
          flex-direction: column;
          align-items: center;
          .img-box {
            display: flex;
            align-items: center;
            justify-content: center;
            width: 120rpx;
            height: 119rpx;
            background: #fafafa;
            border-radius: 10rpx;
            border: 1px solid #d3d3d3;
          }
          & > text {
            margin-top: 21rpx;
            font-family: PingFang;
            font-weight: 500;
            font-size: 26rpx;
            color: #999999;
          }
        }
      }
    }
    .icon-image {
      width: 58rpx;
      height: 58rpx;
      margin-left: 21rpx;
    }
  }
  /deep/ .u-textarea {
    padding: 5px !important;
    // .u-textarea__field {
    //   min-height: 70rpx !important;
    //   font-size: 36rpx !important;
    // }
  }
}
</style>