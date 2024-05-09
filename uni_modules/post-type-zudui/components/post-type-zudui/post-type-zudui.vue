<template>
  <!-- 组队类型 -->
  <view
    @click="toDetail"
    :class="{ content: true, 'posts-data-one': postsDataOneIndex == 0 }"
  >
    <view v-if="theData.type != '兼职' && type != '分享/安利'">
      <!-- 头像等 -->
      <view class="line-1">
        <view class="line-1-left">
          <view
            @click.stop="topPerSonalhome"
            class="avatar"
            :style="'background: url(' + theData.avatar_url + ');'"
          ></view>
          <view class="margin-bottom-2vw nickname-time">
            <view class="nickname">{{ theData.nick_name }}</view>
            <view class="time">{{ released_at }}</view>
          </view>
        </view>
        <view @click.stop="actionMore" class="line-1-right">
          <uni-icons type="more-filled" size="20"></uni-icons>
        </view>
      </view>
      <!-- 话题 -->
      <view class="line-2" v-if="label.length">
        <view class="line-2-one" v-for="(item, index) in label"
          >#{{ item }}</view
        >
      </view>
      <!-- 标题 -->
      <view class="line-3">{{ theData.title }}</view>
      <!-- 组队相关的，活动日期 -->
      <view class="line-3-1" v-if="theData.type == '组队/搭子'">
        <view class="line-3-1-a">#活动时间：{{ activeDate }}#</view>
      </view>
      <!-- 图片 -->
      <view class="line-4">
        <!-- <view @click.stop="$public.previewImage(pictures,index)" v-if="item != ''" class="picture" :style="'background: url('+item+'?x-oss-process=image/resize,m_lfit,h_160,w_160'+');'" v-for="(item,index) in getPictures"></view> -->
        <template v-if="item != ''">
          <image
            mode="aspectFill"
            :src="item + '?x-oss-process=image/resize,m_lfit,h_160,w_160'"
            @click.stop="$public.previewImage(pictures, index)"
            class="picture"
            v-for="(item, index) in getPictures"
          />
        </template>
      </view>
      <text
        @click.stop="$public.previewImage(pictures)"
        v-if="pictures.length"
        class="pic-tip"
        >共 {{ pictures.length }} 张，点击图片查看全部</text
      >
      <!-- 描述内容，只有详情页面才展示 -->
      <view v-if="isDetail" class="line-3-2">{{ theData.content }}</view>
      <!-- 组队邀请 -->
      <view v-if="theData.type == '组队/搭子'" class="line-5">
        <view class="progress-tip">
          <view class="progress-tip-title">
            <text>组队邀请</text>
            <view class="sex-icon-type">
              <text>(</text>
              <image
                class="sex-icon"
                src="/static/1_sex.png"
                mode="widthFix"
              ></image>
              <view class="sex-type">{{ theData.sex_type }}</view>
              <image
                class="sex-icon"
                src="/static/1_feiyong.png"
                mode="widthFix"
              ></image>
              <view class="sex-type">{{ theData.free_type }}</view>
              <text>)</text>
            </view>
          </view>
          <view v-if="isPersonalHome == false" class="progress-tip-num">{{
            theData.entry_num + " / " + theData.hope_num
          }}</view>
        </view>
        <view v-if="isPersonalHome == false" class="the-progress">
          <progress
            :percent="(theData.entry_num / theData.hope_num) * 100"
            border-radius="100"
            stroke-width="10"
            activeColor="#f89f12"
            backgroundColor="#f6f6f6"
          ></progress>
        </view>
        <view
          v-if="isPersonalHome == false && isMine == false"
          class="progress-button"
        >
          <view @click.stop="zuduiButtons(0)" class="progress-button-one-1">
            <uni-icons type="redo-filled" color="#ffffff" size="25"></uni-icons>
            <view class="progress-button-name">邀请好友</view>
          </view>
          <view
            @click.stop="zuduiButtons(1)"
            :class="{
              'progress-button-one-2': true,
              'bg-gray': theData.is_entry == 1,
            }"
          >
            <uni-icons type="auth-filled" color="#ffffff" size="25"></uni-icons>
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
            mode="widthFix"
          ></image>
          <view class="school-name"
            >{{ theData.area_name
            }}{{
              (theData.area_name != "" && theData.school_name) != "" ? "·" : ""
            }}{{ theData.school_name }}</view
          >
        </view>
        <view class="the-thumb-comment-box">
          <view
            v-if="isPersonalHome == false"
            @click.stop="toThumb"
            class="flex-row"
          >
            <uni-icons
              type="hand-up"
              :color="theData.is_thumb == 2 ? '#000000' : '#ff6155'"
              size="20"
            ></uni-icons>
            <view
              class="the-thumb-num"
              :style="theData.is_thumb == 2 ? '#000000' : 'color: #ff6155;'"
              >{{ theData.thumb_num }}</view
            >
          </view>
          <view v-if="isPersonalHome == false" class="flex-row the-comment">
            <uni-icons type="chatbubble" size="20"></uni-icons>
            <view class="the-thumb-num">{{ theData.comment_num }}</view>
          </view>
          <view v-if="isPersonalHome != false" class="flex-row the-comment">
            <!-- <uni-icons type="chatbubble" size="20"></uni-icons> -->
            <view class="the-thumb-num"
              ><text style="color: #ff812f; margin-right: 5px"
                >@{{ theData.type }}@</text
              ><text style="color: #bbbbbb">详情 >> </text></view
            >
          </view>
        </view>
      </view>
      <!-- 组队/搭子 有效，仅在详情页显示，已经报名的人 -->
      <view
        v-if="isDetail == true && theData.type == '组队/搭子'"
        class="line-7"
      >
        <view class="line-7-line-space"></view>
        <view class="line-7-line-title"
          >组队成员（{{ theData.members.length }}）</view
        >
        <view class="line-7-member-avatars">
          <image
            class="line-7-member-avatars-image"
            :src="item.avatar_url"
            mode="widthFix"
            v-for="(item, index) in theData.members"
          ></image>
        </view>
      </view>
    </view>
    <view v-if="theData.type == '兼职'">
      <!-- 标题 -->
      <view class="type-line-1">
        <view class="type-line-1-title">{{ theData.title }}</view>
        <view class="type-line-1-amount">{{ theData.wages }}</view>
      </view>
      <!-- 地址和结算方式 -->
      <view class="type-line-2">
        <view class="type-line-2-address">
          <uni-icons
            type="map-pin-ellipse"
            size="20"
            color="#ff812f"
          ></uni-icons>
          <view class="type-line-2-address-name">{{ theData.area_name }}</view>
        </view>
        <view class="type-line-2-settlement">{{ theData.settlement }}</view>
      </view>
    </view>
    <!-- 上下线按钮 -->
    <view v-if="isMine" class="is-on-line">
      <view class="is-on-line-status"
        >当前状态：{{ theData.is_on == 1 ? "已上线" : "草稿箱" }}</view
      >
      <view
        @click.stop=""
        :class="{
          'progress-button-one-2': true,
          'bg-gray': theData.is_on == 1,
        }"
      >
        <uni-icons
          type="paperplane-filled"
          color="#ffffff"
          size="25"
        ></uni-icons>
        <view @click="toOn()" class="progress-button-name">{{
          theData.is_on != 1 ? "上线发布" : "下线撤回"
        }}</view>
      </view>
    </view>
    <!-- 间隔 -->
    <view class="space-line"></view>
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

    // 是否是第一个，第一个有特殊的背景样式
    // 但是这里有个问题，由于当前列表做法是默认全部类型显示的，切换type只是v-if隐藏掉，导致其他type不是第一个
    postsDataOneIndex: {
      type: Number,
      default: 0,
      required: true,
    },
    //
    type: {
      type: String,
      default: "",
      required: true,
    },
    // 列表数据
    theData: {
      type: Object,
      default: {
        id: 1,
        title:
          "欢迎来到氧气仓库官方资讯，这里有最前沿的校园资讯分享，快来和我一起看看吧～",
        // 该字段只有详情页才有
        content:
          "这是一段描述的内容，也就是活动的详情内容，但是只有详情页才有这个字段。",
        // 该字段只有详情页才有
        members: [
          {
            id: "1",
            nick_name: "黄",
            avatar_url:
              "https://schoolwx.oss-cn-hangzhou.aliyuncs.com/school/img/20230513/168394053478518.png",
          },
          {
            id: "1",
            nick_name: "黄",
            avatar_url:
              "https://schoolwx.oss-cn-hangzhou.aliyuncs.com/school/img/20230513/168394053478518.png",
          },
          {
            id: "1",
            nick_name: "黄",
            avatar_url:
              "https://schoolwx.oss-cn-hangzhou.aliyuncs.com/school/img/20230513/168394053478518.png",
          },
        ],
        url: "https://schoolwx.oss-cn-hangzhou.aliyuncs.com/school/img/20230518/1684379049443118.png", // 图片，多张用英文的逗号隔开
        pid: 0,
        is_on: 1, // 是否是上线状态，1表示是，2表示否
        is_hot: 2, // 是否是热门，1表示是，2表示否
        school_id: 3, // 发布人所在学校ID
        type: "图文", //类型有：话题、组队/搭子、分享/安利、二手闲置、兼职、表白、求助、其他
        label: "#打球,#吃喝玩,#看电影", // 标签，多个用英文的逗号隔开
        is_anonymous: 1, // 是否匿名 1表示是，2表示不匿名
        wages: "", // 兼职用的，工资金额或者显示"面议"
        settlement: "", // 工资结算方式  用/拼接
        hope_num: 10, // 组队的期望人数
        free_type: "", // 组队的费用类型  免费/AA
        is_entry: 1, // 本人是否报名组队，1是，2否
        area_code: "640100", // 活动区地区代码
        task_id: 0, // 关联的活动ID
        created_at: "2023-05-18 11:05:13", // 第一次插入时间
        released_at: "2024-05-11 11:05:13", // 发布时间
        create_id: 50, // 发布人ID
        sex_type: "", // 组队的性别要求
        start_at: null, // 组队活动开始日期
        end_at: null, // 组队活动结束日期
        is_regard: 2, // 本人是否关注 1是2否
        is_thumb: 2, // 本人是否点过赞  1是2否
        thumb_num: 1, // 点赞数
        comment_num: 0, // 评论数
        entry_num: 0, // 实际报名人数
        nick_name: "氧*",
        avatar_url:
          "https://schoolwx.oss-cn-hangzhou.aliyuncs.com/school/img/20230518/1684378586065116.png",
        school_name: "宁波大学",
        area_name: "银川市",
      },
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
  mounted() {
    // console.log('theData',this.theData);

    // 这里除了个问题，导致拿到的theData有时候在mounted的时候是空的

    let that = this;

    setTimeout(function () {
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
          "~" +
          (ends[0] == nowYear ? "" : ends[0] + "年") +
          ends[1] +
          "月" +
          ends[2] +
          "日";
        // console.log('that.activeDate',that.activeDate);
      }
    }, 50);
  },
  computed: {
    getPictures: function () {
      let thePictures = [];
      console.log(this.pictures);
      if (this.pictures.length > 4) {
        for (let i = 0; i < this.pictures.length; i++) {
          thePictures.push(this.pictures[i]);
          if (i == 3) {
            break;
          }
        }
        return thePictures;
      } else {
        return this.pictures;
      }
    },
  },
  methods: {
    //---------------------------------------------------- 绑定的方法 ----------------------------------------------------
    //---------------------------------------------------- 绑定的方法 ----------------------------------------------------
    //---------------------------------------------------- 绑定的方法 ----------------------------------------------------
    toDetail: function () {
      this.$emit("toDetail", this.theData.id);
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
      this.$emit("actionMore", {
        id: this.theData.id,
        create_id: this.theData.create_id,
        is_collection: this.theData.is_collection,
      });
    },
    //---------------------------------------------------- 预处理数据 ----------------------------------------------------
    //---------------------------------------------------- 预处理数据 ----------------------------------------------------
    //---------------------------------------------------- 预处理数据 ----------------------------------------------------

    // 这里需要写个方法对时间进行处理
    getTime: function (theTime) {
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
    },
  },
};
</script>

<style>
.content {
  /* height: 200px; */
  width: 100vw;
  background-color: #ffffff;
  /* margin-bottom: 10px; */
  display: flex;
  flex-direction: column;
  height: auto;
  /* padding-bottom: 15px; */
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
  align-items: flex-start;
  width: 100vw;
  margin-top: 3.5vw;
}
.line-1-left {
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: start;
  margin-left: 3.5vw;
}
.line-1-right {
  margin-right: 3.5vw;
}
.avatar {
  /* border: #111111 1px solid; */
  border-radius: 100%;
  width: 11.5vw;
  height: 11.5vw;
  background-repeat: no-repeat !important;
  background-size: cover !important;
}
.nickname-time {
  display: flex;
  flex-direction: row;
}
.nickname {
  font-weight: bold;
  font-size: 14px;
  margin-left: 1.5vw;
}
.time {
  margin-left: 3.5vw;
  font-size: 13px;
  color: #bbbbbb;
}

.line-2 {
  display: flex;
  flex-direction: row;
  padding-left: 15vw;
  width: 81.5vw;
  padding-right: 3.5vw;
  flex-wrap: wrap;
}
.line-2-one {
  color: #f89f12;
  font-size: 13px;
  margin-right: 10px;
}

.line-3 {
  padding-left: 15vw;
  width: 81.5vw;
  padding-right: 3.5vw;
  font-size: 14px;
  margin-top: 5px;
  font-weight: bold;
}

.line-3-1 {
  padding-left: 15vw;
  width: 81.5vw;
  padding-right: 3.5vw;
  font-size: 14px;
  margin-top: 5px;
}
.line-3-1-a {
  font-style: italic;
  color: #ff6155;
  font-size: 12px;
}
.line-3-2 {
  padding-left: 15vw;
  width: 81.5vw;
  padding-right: 3.5vw;
  font-size: 14px;
  margin-top: 10px;
}

.line-4 {
  display: flex;
  flex-direction: row;
  align-items: center;
  /* justify-content: space-between; */
  flex-wrap: wrap;
  padding-left: 15vw;
  width: 55vw;
  /* 只显示一行两个，右侧部分留空便于点击详情 */
  padding-right: 29.5vw;
  margin-top: 10px;
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
  border-radius: 3px;
  width: 26.5vw;
  height: 26.5vw;
  margin-right: 1vw;
  margin-bottom: 1vw;
  /* background-repeat: no-repeat !important;
  background-size: cover !important;
  background-color: #e5e5e5 !important;
  background-position: center !important; */
}

.line-5 {
  display: flex;
  flex-direction: column;
  padding-left: 15vw;
  width: 81.5vw;
  padding-right: 3.5vw;
  margin-top: 15px;
}
.progress-tip {
  display: flex;
  flex-direction: row;
  align-items: center !important;
  justify-content: space-between;
  margin-bottom: 10px;
}
.progress-tip-title {
  font-size: 15px;
  font-weight: bold;
  display: flex;
  flex-direction: row;
  align-items: center;
}
.sex-icon-type {
  margin-left: 10px;
  display: flex;
  flex-direction: row;
  align-items: center;
}
.sex-icon-type text {
  font-size: 12px;
}
.sex-icon {
  width: 20px;
  height: 20px;
  margin-left: 5px;
}
.sex-type {
  font-size: 13px;
  margin-left: 5px;
  font-weight: normal !important;
  color: #ff6155;
  margin-right: 5px;
}
.progress-tip-num {
  font-size: 15px;
  font-weight: bold;
}
.progress-button {
  display: flex;
  flex-direction: row;
  align-items: center;
  width: 81.5vw;
  justify-content: space-between;
  margin-top: 15px;
}
.progress-button-one-1 {
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  width: 39vw;
  height: 45px;
  color: #ffffff;
  border-radius: 100px;
  background-color: #ff6155;
}
.progress-button-one-2 {
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  width: 39vw !important;
  height: 45px;
  color: #ffffff;
  border-radius: 100px;
  background-color: #f89f12;
}
.bg-gray {
  background-color: #bbbbbb !important;
}
.progress-button-name {
  margin-left: 10px !important;
}

.line-6 {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  padding-left: 15vw;
  width: 81.5vw;
  padding-right: 3.5vw;
  margin-top: 15px;
}
.the-school {
  display: flex;
  flex-direction: row;
  align-items: center;
}
.school-icon {
  width: 5vw;
  height: 5vw;
}
.school-name {
  font-size: 12px;
  margin-left: 10px;
}
.the-thumb-comment-box {
  display: flex;
  flex-direction: row;
  align-items: center;
}
.the-thumb-num {
  margin-left: 10px;
  font-size: 13px;
}
.the-comment {
  margin-left: 15px;
}
.line-7 {
  width: 100vw;
  display: flex;
  flex-direction: column;
}
.line-7-line-space {
  height: 10px;
  background-color: #fafafa;
  margin-top: 15px;
}
.line-7-line-title {
  padding-left: 4.5vw;
  margin-top: 15px;
  font-size: 15px;
  font-weight: bold;
}
.line-7-member-avatars {
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  padding: 3.5vw 3.5vw 0 3.5vw;
  width: 93vw;
}
.line-7-member-avatars-image {
  border-radius: 100%;
  width: 11.285vw;
  height: 11.285vw;
  margin-left: 1vw;
  margin-right: 1vw;
  margin-top: 1vw;
}

.type-line-1 {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  width: 100vw;
  margin-top: 4.5vw;
}
.type-line-1-title {
  margin-left: 6.5vw;
  font-size: 17px;
  font-weight: bold;
  width: 75%;
}
.type-line-1-amount {
  margin-right: 3.5vw;
  text-align: center;
  font-size: 20px;
  font-weight: bold;
  color: #ff812f;
  width: 25%;
}
.type-line-2 {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  width: 100vw;
  margin-top: 4.5vw;
}
.type-line-2-address {
  display: flex;
  flex-direction: row;
  align-items: center;
  margin-left: 6.5vw;
  font-size: 13px;
  width: 75%;
  color: #bbbbbb;
}
.type-line-2-address-name {
  margin-left: 5px;
  padding-right: 15px;
}
.type-line-2-settlement {
  margin-right: 3.5vw;
  font-size: 13px;
  width: 25%;
  text-align: center;
  color: #bbbbbb;
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
</style>
