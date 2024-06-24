<template>
  <!-- 组队类型 -->
  <view
    @click="toDetail"
    :class="{
      content:
        (theData.type != '分享/安利' && compoentType == 'list') ||
        compoentType != 'list',
      'posts-data-one': postsDataOneIndex == 0,
    }"
  >
    <view class="jz-box" v-if="theData.type == '兼职'">
      <view v-if="isMine" @click.stop="actionMore" class="jz-more">
        <uni-icons type="more-filled" size="20"></uni-icons>
      </view>
      <view class="jz-top">
        <!-- 标题 -->
        <view class="type-line-1">
          <view class="type-line-1-title">{{ theData.title }}</view>
          <view class="type-line-1-amount"
            >{{ theData.wages
            }}<text v-if="theData.wages != '面议'">{{
              theData.settlement | getSettlement
            }}</text>
          </view></view
        >
        <view class="jz-labels" v-if="label.length">
          <view
            class="line-2-one jz-labels-item"
            :key="index"
            v-for="(item, index) in label"
            >{{ item }}</view
          >
        </view>
        <!-- 地址和结算方式 -->
        <view class="type-line-2">
          <view class="type-line-2-address">
            <u-icon name="map-fill" color="#FF5809" size="20"></u-icon>
            <view class="type-line-2-address-name">{{
              theData.area_name
            }}</view>
          </view>
          <view
            v-if="theData.is_on == 1 && showPhone"
            class="phone-btn"
            @click.stop="topPerSonalhome"
            >立即联系</view
          >
        </view>
      </view>
    </view>
    <view
      class="compoent-al"
      v-if="theData.type == '分享/安利' && compoentType == 'list'"
    >
      <image mode="aspectFill" :src="theData.img_url" />
      <view class="al-content">
        <view class="al-title">{{ theData.title }}</view>
        <view class="al-bottom flex-algin">
          <view class="flex-algin">
            <image :src="theData.avatar_url"></image>
            <text class="al-bottom-nick">{{ theData.nick_name }}</text>
          </view>
          <view class="flex-algin" @click.stop="toThumb">
            <uni-icons
              type="hand-up"
              :color="theData.is_thumb == 2 ? '#868686' : '#ff6155'"
              size="20"
            ></uni-icons>
            <view
              :style="{
                color: theData.is_thumb == 2 ? '#868686' : '#ff6155',
              }"
              class="al-bottom-num"
              >{{ theData.thumb_num }}</view
            >
          </view>
        </view>
      </view>
    </view>
    <view
      class="other-box"
      v-if="
        !['兼职', '分享/安利'].includes(theData.type) ||
        (theData.type == '分享/安利' && compoentType != 'list')
      "
    >
      <!-- 头像等 -->
      <view
        @click.stop="topPerSonalhome"
        class="avatar"
        :style="'background: url(' + theData.avatar_url + ');'"
      ></view>
      <view class="post-right">
        <view class="line-1 flex-algin">
          <view class="line-1-left flex-algin">
            <view class="nickname">{{ theData.nick_name }}</view>
            <view class="time">{{ released_at }}</view>
          </view>
          <view v-if="showMore" @click.stop="actionMore" class="line-1-right">
            <uni-icons type="more-filled" size="22"></uni-icons>
          </view>
        </view>
        <!-- 话题 -->
        <view class="line-2" v-if="label.length">
          <view class="line-2-one" :key="index" v-for="(item, index) in label"
            >#{{ item }}</view
          >
        </view>
        <!-- 标题 -->
        <view class="line-3">{{ theData.title }}</view>
        <view
          v-if="getPictures.length"
          class="line-4"
          :class="{ 'pad-r-pic': getPictures.length == 4 }"
        >
          <image
            mode="aspectFill"
            :src="
              item +
              '?x-oss-process=image/resize,m_lfit,h_800,w_800/quality,q_100'
            "
            @click.stop="$public.previewImage(pictures, index)"
            class="picture"
            :class="{
              'mar-r-b': getPictures.length != 4 && [2, 5, 8].includes(index),
            }"
            :key="index"
            v-for="(item, index) in getPictures"
          />
        </view>
        <!-- 描述内容，只有详情页面才展示 -->
        <view v-if="isDetail" class="line-3-2">{{ theData.content }}</view>
        <!-- 组队邀请 -->
        <view v-if="theData.type == '组队/搭子'" class="line-5">
          <view class="progress-tip">
            <view class="progress-tip-title">
              <text>组队邀请</text>
            </view>
            <view class="progress-tip-num">{{
              theData.entry_num + " / " + theData.hope_num
            }}</view>
          </view>
          <view class="the-progress">
            <progress
              :percent="(theData.entry_num / theData.hope_num) * 100"
              border-radius="100"
              stroke-width="10"
              activeColor="#F89F12"
              backgroundColor="#F6F6F6"
            ></progress>
          </view>
          <view v-if="isDetail" class="zd-info">
            <text>性别：{{ theData.sex_type }}</text>
            <text>付费方式：{{ theData.free_type }}</text>
            <text>时间：{{ activeDate }}</text>
          </view>
          <view class="progress-button" v-if="theData.is_on == 1">
            <button
              @click.stop="zuduiButtons(0)"
              open-type="share"
              class="progress-button-one-1"
            >
              <uni-icons
                type="redo-filled"
                color="#ffffff"
                size="25"
              ></uni-icons>
              <view class="progress-button-name">邀请好友</view>
            </button>
            <view
              @click.stop="zuduiButtons(1)"
              :class="{
                'progress-button-one-2': true,
                'bg-gray': theData.is_entry == 1,
              }"
            >
              <uni-icons
                type="staff-filled"
                color="#ffffff"
                size="25"
              ></uni-icons>
              <view class="progress-button-name">{{
                theData.is_entry == 2 ? "加入组队" : "退出组队"
              }}</view>
            </view>
          </view>
        </view>
        <!-- 学校、点赞数等 -->
        <view class="line-6">
          <view class="the-school">
            <image
              class="school-icon"
              src="/static/1_school_icon@3x.png"
            ></image>
            <view class="school-name">{{ theData.school_name }}</view>
          </view>
          <view
            class="the-thumb-comment-box"
            v-if="!isPersonalHome && theData.is_on == 1 && !isMine"
          >
            <view @click.stop="toThumb" class="flex-row">
              <uni-icons
                type="hand-up"
                :color="theData.is_thumb == 2 ? '#000000' : '#ff6155'"
                size="20"
              ></uni-icons>
              <view
                class="the-thumb-num"
                :style="{
                  color: theData.is_thumb == 2 ? '#000000' : '#ff6155',
                }"
                >{{ theData.thumb_num }}</view
              >
            </view>
            <view class="flex-row the-comment">
              <uni-icons type="chatbubble" size="20"></uni-icons>
              <view class="the-thumb-num chat-num">{{
                theData.comment_num
              }}</view>
            </view>
          </view>
        </view>
        <!-- 组队/搭子 有效，仅在详情页显示，已经报名的人 -->
        <view
          v-if="isDetail == true && theData.type == '组队/搭子'"
          class="line-7"
        >
          <view class="line-7-line-title"
            >组队成员（{{ theData.members.length }}）</view
          >
          <view class="line-7-member-avatars">
            <image
              :key="index"
              class="line-7-member-avatars-image"
              :src="item.avatar_url"
              v-for="(item, index) in theData.members"
            ></image>
          </view>
        </view>
      </view>
    </view>
  </view>
</template>

<script>
export default {
  name: "post-type-zudui",
  props: {
    // 是否是详情页，详情页才会有content和members字段
    isDetail: {
      type: Boolean,
      default: false,
      required: false,
    },
    // 是否是我发布的
    isMine: {
      type: Boolean,
      default: false,
      required: false,
    },
    // 是否是个人主页，个人主页由于可以继续调转详情页，导致从详情页返回个人主页的时候，无法监听本地点赞和加入组队等情况
    // 所以干脆主页去掉操作和点赞和组队进度等影响数据的内容
    isPersonalHome: {
      type: Boolean,
      default: false,
      required: false,
    },
    // 是否是个人主页，个人主页由于可以继续调转详情页，导致从详情页返回个人主页的时候，无法监听本地点赞和加入组队等情况
    // 所以干脆主页去掉操作和点赞和组队进度等影响数据的内容
    showPhone: {
      type: Boolean,
      default: true,
      required: false,
    },
    showMore: {
      type: Boolean,
      default: true,
      required: false,
    },

    // 是否是第一个，第一个有特殊的背景样式
    // 但是这里有个问题，由于当前列表做法是默认全部类型显示的，切换type只是v-if隐藏掉，导致其他type不是第一个
    postsDataOneIndex: {
      type: Number,
      default: 0,
      required: true,
    },
    compoentType: {
      type: String,
      default: "dt",
      required: false,
    },
    type: {
      type: String,
      default: "",
      required: true,
    },
    // 列表数据
    theData: {
      type: Object,
      default: () => {},
      required: true,
    },
  },
  data() {
    return {
      // 发帖时间
      released_at: "",
      // 话题
      label: "",
      // 图片
      pictures: [],
      // 活动日期，这里是处理后的
      activeDate: "",
      // 组队的按钮
    };
  },
  filters: {
    getSettlement(val) {
      if (val) {
        return val.split(val.slice(-3))[0];
      }
    },
  },
  watch: {
    theData: {
      handler(newVal, oldVal) {
        this.initDatas();
      },
      deep: true,
    },
  },

  mounted() {
    // 这里除了个问题，导致拿到的theData有时候在mounted的时候是空的
    console.log(this.theData);
    this.initDatas();
  },
  computed: {
    getPictures: function () {
      return this.pictures;
    },
  },
  methods: {
    initDatas() {
      let that = this;
      that.$nextTick(function () {
        that.released_at = that.getTime(that.theData.released_at);
        that.label = that.theData.label ? that.theData.label.split(",") : [];
        that.pictures = that.theData.url ? that.theData.url.split(",") : [];
        //   that.$public.strToArr(that.theData.url, ",");
        //   that.pictures = that.pictures.filter((el) => el);

        if (that.theData.type == "组队/搭子") {
          // 只有组队/搭子，才需要处理这个
          let nowYear = new Date().getFullYear() + "";
          let starts = that.$public.strToArr(that.theData.start_at, "-");
          // console.log(starts);
          let ends = that.$public.strToArr(that.theData.end_at, "-");
          // console.log(ends);
          that.activeDate =
            (starts[0] == nowYear ? "" : starts[0] + "年") +
            starts[1] +
            "月" +
            starts[2] +
            "日" +
            "-" +
            (ends[0] == nowYear ? "" : ends[0] + "年") +
            ends[1] +
            "月" +
            ends[2] +
            "日";
          // console.log('that.activeDate',that.activeDate);
        }
      });
    },
    //---------------------------------------------------- 绑定的方法 ----------------------------------------------------
    //---------------------------------------------------- 绑定的方法 ----------------------------------------------------
    //---------------------------------------------------- 绑定的方法 ----------------------------------------------------
    toDetail: function () {
      if (!this.showPhone) {
        this.$emit("toJzDetail", this.theData.id);
      } else {
        this.$emit("toDetail", this.theData.id);
      }
    },
    topPerSonalhome: function () {
      this.$emit("topPerSonalhome", {
        id: this.theData.create_id,
        is_anonymous: this.theData.is_anonymous,
      });
    },
    toThumb: function () {
      this.$emit("toThumb", {
        id: this.theData.id,
        is_thumb: this.theData.is_thumb,
      });
    },
    // 邀请好友 加入/退出组队
    zuduiButtons: function (index) {
      // 传0表示是邀请，传1是组队按钮
      this.$emit("zuduiButtons", {
        id: this.theData.id,
        title: this.theData.title,
        url: this.theData.url,
        is_entry: this.theData.is_entry,
        type: index,
      });
    },
    // 上下线
    toOn: function () {
      // 传0表示是邀请，传1是组队按钮
      this.$emit("toOn", {
        id: this.theData.id,
        is_on: this.theData.is_on,
      });
    },

    // 点击右上角的三个点
    actionMore: function () {
      this.API.home
        .getMomentInfo({
          moments_id: this.theData.id,
        })
        .then((res) => {
          this.$emit("actionMore", {
            id: this.theData.id,
            is_on: res.data.is_on,
            type: this.theData.type,
            create_id: this.theData.create_id,
            is_regard: res.data.is_regard,
            is_collection: res.data.is_collection,
            index: this.postsDataOneIndex,
          });
        })
        .catch(async (err) => {
          if (err.code == 410) {
            await this.$store.dispatch("toLogon", {});
            this.actionMore();
          }
        });
    },
    //---------------------------------------------------- 预处理数据 ----------------------------------------------------
    //---------------------------------------------------- 预处理数据 ----------------------------------------------------
    //---------------------------------------------------- 预处理数据 ----------------------------------------------------

    // 这里需要写个方法对时间进行处理
    getTime: function (theTime) {
      console.log(theTime);
      if (theTime) {
        // 转化时间戳的方法
        // 发帖时间的时间戳
        let timestamp_at = new Date(theTime).getTime();
        // 当前时间的时间戳
        let timestamp_now = new Date().getTime();

        // 相差的时间，转化为了分钟
        let difference = (timestamp_now - timestamp_at) / 1000 / 60;
        if (difference < 5) {
          // 小于1个小时，就显示时间
          // console.log(difference+'分钟前');
          return "刚刚";
        } else if (difference >= 5 && difference < 60) {
          return Math.floor(difference) + "分钟前";
        } else {
          let theYear = theTime.substring(0, 4);
          let theMonth = theTime.substring(5, 7);
          let theDay = theTime.substring(8, 10);

          let now = new Date();
          let nowYear = now.getFullYear() + "";
          let nowMonth =
            now.getMonth() + 1 < 10
              ? "0" + (now.getMonth() + 1)
              : now.getMonth() + 1 + "";
          let nowDay =
            now.getDate() < 10 ? "0" + now.getDate() : now.getDate() + "";
          // 同一天的话
          if (theYear == nowYear && theMonth == nowMonth && theDay == nowDay) {
            // console.log(theTime.substring(11,19));
            // console.log(theYear,theMonth,theDay);
            // console.log(nowYear,nowMonth,nowDay);
            return "今天" + " " + theTime.substring(11, 19);
          } else {
            // console.log(theTime.substring(11,19));
            // console.log(theYear,theMonth,theDay);
            // console.log(nowYear,nowMonth,nowDay);
            return theTime;
          }
        }
      }
    },
  },
};
</script>

<style lang="scss">
.content {
  padding: 27rpx 30rpx 36rpx;
  background-color: #ffffff;
  display: flex;
  flex-direction: column;
  height: auto;
  border-bottom: 15rpx solid #fafafa;
}
.flex-row {
  display: flex;
  flex-direction: row;
  align-items: center;
}
.margin-bottom-2vw {
  margin-bottom: 2vw;
}

.posts-data-one {
  background-image: linear-gradient(
    to bottom,
    #fff0e8,
    #fffdfd,
    #ffffff
  ) !important;
}

.line-1 {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  margin-top: 6rpx;
  padding-bottom: 12rpx;
}
.line-1-left {
  display: flex;
  flex-direction: row;
  align-items: center;
}
.line-1-right {
  overflow: hidden;
  box-sizing: border-box;
  /deep/ uni-icons {
    display: flex;
    align-items: center;
  }
}
.other-box {
  width: 100%;
  display: flex;
  align-items: flex-start;
}
.avatar {
  /* border: #111111 1px solid; */
  border-radius: 100%;
  width: 68rpx;
  height: 68rpx;
  background-repeat: no-repeat !important;
  background-size: cover !important;
  margin-right: 20rpx;
}
.post-right {
  width: calc(100% - 83rpx);
}
.nickname-time {
  display: flex;
  flex-direction: row;
}
.nickname {
  font-family: PingFang SC;
  font-weight: 600;
  font-size: 26rpx;
  color: #333333;
}
.time {
  margin-left: 27rpx;
  font-family: PingFang SC;
  font-weight: 400;
  font-size: 22rpx;
  color: #666666;
}

.line-2 {
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
}
.line-2-one {
  color: #f89f12;
  font-size: 24rpx;
  margin-right: 20rpx;
}
.jz-labels {
  margin-top: 16rpx;
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  .jz-labels-item {
    padding: 5rpx 22rpx;
    background: rgba(0, 0, 0, 0.03);
    border-radius: 6rpx;
    font-family: PingFang SC;
    font-weight: 400;
    font-size: 22rpx;
    color: #666666;
    margin-right: 8rpx;
  }
  .jz-labels-item:last-child {
    margin-right: 0;
  }
}

.line-3 {
  font-size: 24rpx;
  margin-top: 10rpx;
  color: #040000;
}

.line-3-1 {
  margin-top: 10rpx;
}
.line-3-1-a {
  font-style: italic;
  color: #ff6155;
  font-size: 24rpx;
}
.line-3-2 {
  font-size: 28rpx;
  margin-top: 20rpx;
}

.line-4 {
  display: flex;
  flex-direction: row;
  align-items: center;
  flex-wrap: wrap;
  margin-top: 15rpx;
  overflow: hidden;
}
.pad-r-pic {
  padding-right: 150rpx;
}
.pic-tip {
  background-color: #fafafa;
  font-size: 12px;
  padding: 0px 5px;
  margin-left: 15vw;
  border-radius: 5px;
  color: #bbbbbb;
}
/* 注意background-size: cover的作用，铺满整个容器 */
.picture {
  image-rendering: -moz-crisp-edges;
  image-rendering: -o-crisp-edges;
  image-rendering: -webkit-optimize-contrast;
  image-rendering: crisp-edges;
  -ms-interpolation-mode: nearest-neighbor;
  border-radius: 6rpx;
  width: 194rpx;
  height: 194rpx;
  margin-right: 11rpx;
  margin-top: 11rpx;
  /* background-repeat: no-repeat !important;
  background-size: cover !important;
  background-color: #e5e5e5 !important;
  background-position: center !important; */
}

.line-4 .picture:last-child {
  margin-right: 0;
}

.mar-r-b {
  margin-right: 0;
}

.line-5 {
  display: flex;
  flex-direction: column;
  margin: 29rpx 0 13rpx;
}
.progress-tip {
  display: flex;
  flex-direction: row;
  align-items: center !important;
  justify-content: space-between;
  margin-bottom: 29rpx;
}
.progress-tip-title {
  display: flex;
  flex-direction: row;
  align-items: center;
  & > text {
    font-family: Alibaba PuHuiTi;
    font-weight: 800;
    font-size: 26rpx;
    color: #333333;
  }
}
.sex-icon-type {
  margin-left: 20rpx;
  display: flex;
  flex-direction: row;
  align-items: center;
}
.sex-icon-type text {
  font-size: 24rpx;
}
.sex-icon {
  width: 35rpx;
  height: 35rpx;
  margin-left: 10rpx;
}
.sex-type {
  font-size: 26rpx;
  margin-left: 10rpx;
  font-weight: normal !important;
  color: #ff6155;
  margin-right: 10rpx;
}
.progress-tip-num {
  font-family: DIN Alternate;
  font-weight: bold;
  font-size: 26rpx;
  color: #333333;
}
.zd-info {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-top: 29rpx;
  font-family: PingFang SC;
  font-weight: 400;
  font-size: 22rpx;
  color: #000000;
}
.progress-button {
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  margin-top: 40rpx;
  & > view,
  & > button {
    flex: 1;
    margin: 0 14rpx;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    font-family: PingFang SC;
    font-weight: 400;
    font-size: 26rpx;
    color: #ffffff;
    border-radius: 200rpx;
    height: 78rpx;
    padding: 0 !important;
  }

  .progress-button-one-1 {
    margin-left: 0;
    background-color: #ff6155;
  }
  .progress-button-one-2 {
    margin-right: 0;
    background-color: #f89f12;
  }
}
.bg-gray {
  background-color: #bbbbbb !important;
}
.progress-button-name {
  margin-left: 10rpx !important;
}

.line-6 {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  margin-top: 29rpx;
}
.the-school {
  display: flex;
  flex-direction: row;
  align-items: center;
}
.school-icon {
  width: 30rpx;
  height: 30rpx;
}
.school-name {
  font-family: PingFang SC;
  font-weight: 400;
  font-size: 22rpx;
  color: #000000;
  margin-left: 10rpx;
}
.the-thumb-comment-box {
  display: flex;
  flex-direction: row;
  align-items: center;
  line-height: 33rpx;
}
.the-thumb-num {
  margin-left: 11rpx;
  font-family: PingFang SC;
  font-weight: 400;
  font-size: 24rpx;
  color: #000000;
}
.chat-num {
  margin-top: -2rpx;
}
.the-comment {
  margin-left: 40rpx;
}
.line-7 {
  border-top: 15rpx solid #fafafa;
  display: flex;
  flex-direction: column;
  margin: 30rpx -30rpx 0 -113rpx;
  padding: 0 30rpx;
}
.line-7-line-title {
  margin-top: 30rpx;
  font-family: PingFang SC;
  font-weight: 600;
  font-size: 30rpx;
  color: #111111;
}
.line-7-member-avatars {
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  margin-top: 9rpx;
}
.line-7-member-avatars-image {
  border-radius: 100%;
  width: 70rpx;
  height: 70rpx;
  margin-right: 33rpx;
  margin-top: 30rpx;
}
.jz-box {
  width: 100%;
  padding-top: 11rpx;
  .jz-more {
    display: flex;
    justify-content: flex-end;
  }
  .jz-top {
    width: 100%;
  }
  .phone-btn {
    width: 146rpx;
    height: 45rpx;
    line-height: 45rpx;
    text-align: center;
    background: #ff5809;
    border-radius: 60rpx;
    font-family: PingFang SC;
    font-weight: 400;
    font-size: 24rpx;
    color: #ffffff;
  }
}
.mt-box {
  display: flex;
  align-items: center;
  justify-content: space-between;
  .my-text {
    font-family: PingFang SC;
    font-weight: 600;
    font-size: 33rpx;
    color: #ff812f;
  }
}

.type-line-1 {
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
}
.type-line-1-title {
  font-family: PingFang SC;
  font-weight: 600;
  font-size: 30rpx;
  color: #333333;
  box-sizing: border-box;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  width: 50%;
}
.type-line-1-amount {
  font-family: DIN Alternate;
  font-weight: bold;
  font-size: 30rpx;
  color: #ff812f;
  position: relative;
  white-space: nowrap;
}
.amount-text {
  height: 0rpx;
  visibility: hidden;
}
.type-line-2 {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  margin-top: 28rpx;
}
.type-line-2-address {
  display: flex;
  flex-direction: row;
  align-items: center;
  font-family: PingFang SC;
  font-weight: 400;
  font-size: 22rpx;
  color: #666666;
}
.type-line-2-address-name {
  margin-left: 18rpx;
  font-family: PingFang SC;
  font-weight: 400;
  font-size: 22rpx;
  color: #666666;
}
.type-line-2-settlement {
  font-family: PingFang SC;
  font-weight: 400;
  font-size: 22rpx;
  color: #666666;
}

.space-line {
  width: 100vw;
  height: 10px;
  background-color: #fafafa;
  margin-top: 15px;
}
.is-on-line {
  width: 93vw;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  margin-top: 15px;
  padding: 15px 3.5vw 0 3.5vw;
  border-top: #fafafa 1px solid;
}
.is-on-line-status {
  color: #bbbbbb;
  font-size: 13px;
}
.al-content {
  padding: 20rpx 18rpx;
  border-radius: 0 0 2rpx 2rpx;
  .al-title {
    font-family: PingFang SC;
    font-weight: 600;
    font-size: 24rpx;
    color: #111111;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
  .al-bottom {
    margin-top: 18rpx;
    justify-content: space-between;
    image {
      width: 30rpx;
      height: 30rpx;
      border-radius: 50%;
      margin-right: 8rpx;
    }
    .al-bottom-nick {
      font-family: PingFang SC;
      font-weight: 300;
      font-size: 20rpx;
      color: #888888;
    }
    .al-bottom-num {
      font-family: DIN;
      font-weight: 400;
      font-size: 20rpx;
      margin-left: 15rpx;
    }
  }
}
.flex-algin {
  display: flex;
  align-items: center;
}
</style>
