<template>
  <view class="content">
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

    <!-- 标题 -->
    <view class="the-title">
      <view class="the-title-tip"
        ><text class="red">*</text>{{ type }}标题</view
      >
      <view class="the-title-input">
        <uni-easyinput
          :inputBorder="false"
          v-model="theData.title"
          placeholder="快来取个标题吧~"
        />
      </view>
    </view>
    <!-- 内容 -->
    <view class="the-title">
      <view class="the-title-tip">内容</view>
      <view class="the-title-input-2">
        <uni-easyinput
          autoHeight
          type="textarea"
          :inputBorder="false"
          v-model="theData.content"
          placeholder="想要说点什么呢~"
        />
      </view>
    </view>
    <!-- 图片 -->
    <view class="the-pic">
      <uni-file-picker
        @select="imageSelect"
        @delete="imageDelete"
        file-mediatype="image"
        v-model="imageValue"
        title="最多选择9张图片"
      ></uni-file-picker>
    </view>
    <!-- 视频 -->
    <view class="the-pic" @click="$public.disabled_tip('上传视频')">
      <uni-file-picker
        disabled
        file-mediatype="video"
        v-model="videoValue"
        title="上传视频"
        limit="1"
      ></uni-file-picker>
    </view>
    <!-- 话题 && 匿名发布按钮-->
    <view class="the-buttons">
      <view
        @click="openPopup_huati"
        :class="{
          'the-button': true,
          label_selected: theSelectedLabels.length != 0,
        }"
        >#添加话题( {{ theSelectedLabels.length }} )
      </view>
      <view
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
    <!-- 公开范围：帖子开放的区域 -->
    <view class="the-range" @click="toRange">
      <view class="the-range-title"
        ><text class="white">*</text>发布范围：</view
      >
      <view class="the-range-selected">
        <view
          v-if="theSelectedranges.length == 0"
          class="the-range-selected-one"
          >默认不限</view
        >
        <view
          v-if="theSelectedranges.length != 0"
          class="the-range-selected-one"
          >当前已选（ {{ theSelectedranges.length }} ）
        </view>
      </view>
      <view class="the-range-icon">
        <uni-icons type="right"></uni-icons>
      </view>
    </view>
    <!-- 组队活动特有 -->
    <view v-if="type == '组队/搭子'">
      <!-- 间隔行 -->
      <view class="space-line"></view>
      <!-- 期望人数（组队） -->
      <view class="the-hope">
        <view class="the-hope-title"><text class="red">*</text>期望人数：</view>
        <view class="the-hope-selected">
          <uni-easyinput
            @focus="easyinputFocus('number')"
            @blur="easyinputBlur('number')"
            placeholder="请输入组队/报名的上限数~"
            confirm-type="done"
            type="number"
            :inputBorder="false"
            v-model="theData.hope_num"
          />
        </view>
      </view>
      <!-- 性别 -->
      <view class="the-hope">
        <view class="the-hope-title"
          ><text class="white">*</text>性别要求：</view
        >
        <view class="the-hope-selected">
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
      <!-- 费用方式 -->
      <view class="the-hope">
        <view class="the-hope-title"
          ><text class="white">*</text>费用方式：</view
        >
        <view class="the-hope-selected">
          <view
            @click="selectedSettlementOne(index)"
            class="the-range-selected-one"
            v-for="(item, index) in settlements"
          >
            <uni-icons
              v-if="theSettlementIndex == index"
              type="circle-filled"
              size="25"
              color="#f89f12"
            ></uni-icons>
            <uni-icons
              v-if="theSettlementIndex != index"
              type="circle"
              size="25"
              color="#bbbbbb"
            ></uni-icons>
            <view>{{ item }}</view>
          </view>
        </view>
      </view>
      <!-- 间隔行 -->
      <view class="space-line"></view>
      <!-- 活动时间： -->
      <view class="the-hope">
        <view class="the-hope-title"><text class="red">*</text>活动日期：</view>
        <view class="the-hope-selected">
          <uni-datetime-picker
            :border="false"
            v-model="dateRange"
            type="daterange"
            @change="dateMaskClick"
          />
        </view>
      </view>
      <!-- 活动地点 -->
      <view class="the-range no-bodrder" @click="toAddress()">
        <view class="the-range-title"
          ><text class="red">*</text>活动地点：</view
        >
        <view class="the-range-selected">
          <view
            v-if="theAddress.title == ''"
            class="the-range-selected-one gray"
            >（选择活动地点）</view
          >
          <view
            v-if="theAddress.title != ''"
            style="width: 500px"
            class="the-range-selected-one"
          >
            {{
              theAddress.title.length < 9
                ? theAddress.title
                : theAddress.title.substring(0, 9) + "..."
            }}
          </view>
        </view>
        <view class="the-range-icon">
          <uni-icons type="right"></uni-icons>
        </view>
      </view>
    </view>
    <!-- 兼职特有 -->
    <view v-if="type == '兼职'">
      <!-- 活动地点 -->
      <view class="the-range no-bodrder" @click="toAddress()">
        <view class="the-range-title"
          ><text class="red">*</text>兼职城市：</view
        >
        <view class="the-range-selected">
          <view
            v-if="theAddress.title == ''"
            class="the-range-selected-one gray"
            >（选择兼职所在城市）</view
          >
          <view
            v-if="theAddress.title != ''"
            style="width: 500px"
            class="the-range-selected-one"
          >
            {{
              theAddress.title.length < 9
                ? theAddress.title
                : theAddress.title.substring(0, 9) + "..."
            }}
          </view>
        </view>
        <view class="the-range-icon">
          <uni-icons type="right"></uni-icons>
        </view>
      </view>
      <!-- 金额） -->
      <view class="the-hope">
        <view class="the-hope-title"><text class="red">*</text>结算报酬：</view>
        <view class="the-hope-selected">
          <uni-easyinput
            placeholder="请输入金额 或 填写如：面议~"
            confirm-type="done"
            type="text"
            :inputBorder="false"
            v-model="theData.wages"
          />
        </view>
      </view>
      <!-- 结算单位 -->
      <view class="the-hope">
        <view class="the-hope-title"
          ><text class="white">*</text>结算单位：</view
        >
        <view class="the-hope-selected">
          <view
            @click="selectedSettlement_1sOne(index)"
            class="the-range-selected-one"
            v-for="(item, index) in settlement_1s"
          >
            <uni-icons
              v-if="theSettlement_1sIndex == index"
              type="circle-filled"
              size="25"
              color="#f89f12"
            ></uni-icons>
            <uni-icons
              v-if="theSettlement_1sIndex != index"
              type="circle"
              size="25"
              color="#bbbbbb"
            ></uni-icons>
            <view>{{ item }}</view>
          </view>
        </view>
      </view>
      <!-- 结算周期 -->
      <view class="the-hope">
        <view class="the-hope-title"
          ><text class="white">*</text>结算周期：</view
        >
        <view class="the-hope-selected">
          <view
            @click="selectedSettlement_2sOne(index)"
            class="the-range-selected-one"
            v-for="(item, index) in settlement_2s"
          >
            <uni-icons
              v-if="theSettlement_2sIndex == index"
              type="circle-filled"
              size="25"
              color="#f89f12"
            ></uni-icons>
            <uni-icons
              v-if="theSettlement_2sIndex != index"
              type="circle"
              size="25"
              color="#bbbbbb"
            ></uni-icons>
            <view>{{ item }}</view>
          </view>
        </view>
      </view>
    </view>

    <!-- 间隔行底部 -->
    <view class="space-line-bottom">
      <view @click="toPush('存草稿')" class="to-push-1">
        <uni-icons type="compose" size="20" color="#727272"></uni-icons>
        <view class="">存草稿</view>
      </view>
      <view @click="toPush('立即发布')" class="to-push-2">立即发布</view>
    </view>
  </view>
</template>

<script>
export default {
  data() {
    return {
      // 屏幕宽度
      phoneWidth: 0,

      // 绑定的值，这里组件有问题，一直为空
      imageValue: [],
      videoValue: [],
      // 所以这里自己存了一个值，用于存放@select或者@delete的时候的值
      tempImageValue: [],
      tempVideoValue: [],

      // 当前页面类型，跳转过来的时候传过来的
      type: "",

      // 手动输入标签绑定的value
      theHandAddLabel: "",
      // 显示范围
      theSelectedranges: [
        // {
        // 	code:'12112',
        // 	name:'宁波市'
        // }
      ],
      // 组队活动的地点
      theAddress: {
        title: "",
        status: 0,
        code: "",
      },

      // 结算单位，本地写死
      settlement_1s: ["元/小时", "元/天", "元/月"],
      theSettlement_1sIndex: 0,
      // 结算周期，本地写死
      settlement_2s: ["日结", "周结", "月结"],
      theSettlement_2sIndex: 0,

      // 发布的对象
      theData: {
        id: 0, // 	校园墙id，新增时传0
        type: "", //(!!!!!!必传) 校园墙类型：话题、组队/搭子、分享/安利、二手闲置、兼职、表白、求助、其他
        title: "", //(!!!!!!必传) 标题或职位等
        content: "", //(!!!!!!必传) 正文内容
        url: "", // 图文或视频，如果有多个用英文逗号拼接，原型里面有图片的类型都是必传
        is_on: "", // 上线，1-是（默认），2-否
        area_codes: "", // 开放区域范围的行政区划代码(地市级)，多个用逗号拼接
        label: "", // 校园墙标签，多个用逗号拼接
        is_anonymous: 2, //匿名，1-是，2-否
        hope_num: 0, // 期望人数（组队，必传）
        free_type: "免费", // 费用方式（组队，必传)
        sex_type: "不限", // 性别要求（组队，必传）
        area_code: "", // 地点（组队兼职，必传）
        start_at: "", // 开始日期（组队，必传）
        end_at: "", //结束日期（组队，必传）
        wages: "", //工资（兼职，必传，取值范围：面议或具体金额）
        settlement: "元/小时/日结", // 结算方式（兼职，如果是面议自动转空字符串，多个值用/拼接）
        task_id: 0, // 关联的商品id
      },

      // 选中的话题
      theSelectedLabels: [],
      // 话题
      theLabels: [
        "#我1啊",
        "#我是2啊",
        "#我才是3啊",
        "#我4啊",
        "#我5啊",
        "#我是不是6啊",
      ],
      // 性别选择
      sexs: ["不限", "男生", "女生"],
      //
      theSexIndex: 0,
      // 费用方式
      settlements: ["免费", "AA"],
      //
      theSettlementIndex: 0,
      // 时间选择的范围，是个数组，临时存储
      dateRange: [],
    };
  },
  onLoad(option) {
    // 获取屏幕宽度
    let that = this;
    uni.getSystemInfo({
      success: function (res) {
        that.phoneWidth = res.windowWidth;
      },
    });

    // 获取当前跳转过来的发布类型
    this.type = option.type;
  },
  onShow() {
    // 发布的组队活动的地址
    this.theData.area_code = this.$store.state.store_addressPush.code;
    this.theAddress = this.$store.state.store_addressPush;

    // 获取选中的地区，主要是子页面无法传过来，用了公共参数
    this.theSelectedranges = this.$store.state.theSelectedranges;
  },
  methods: {
    // ----------------------------------------------------------------接口数据----------------------------------------------------------------
    // ----------------------------------------------------------------接口数据----------------------------------------------------------------
    // ----------------------------------------------------------------接口数据----------------------------------------------------------------
    // -----------------------核心接口-----------------------
    // 发布
    toPush: function (state) {
      // '存草稿' '立即发布'
      let that = this;
      let theDataUrl = [];
      return new Promise(function (resolve, reject) {
        if (that.pushChecking()) {
          // 拼接 图片
          for (let i = 0; i < that.tempImageValue.length; i++) {
            theDataUrl.push(that.tempImageValue[i].url);
          }
          //数组转字符串
          that.theData.url = theDataUrl.join(",");
          // console.log('that.theData.url',that.theData.url);

          // 把标签加进去
          //数组转字符串
          that.theData.label = that.theSelectedLabels.join(",");

          if (that.type == "兼职") {
            // 兼职的话，在这里给结算方式赋值一下
            that.theData.settlement =
              that.settlement_1s[that.theSettlement_1sIndex] +
              "/" +
              that.settlement_2s[that.theSettlement_2sIndex];
          }

          uni.request({
            url: that.$store.state.theUrl + "/wechat/moments/publish",
            method: "POST",
            header: {
              token: that.$store.state.theToken,
            },
            data: that.theData,
            success: (res) => {
              console.log("toPush_res", res);
              if (res.data.code == 0) {
                if (state == "存草稿") {
                  uni.showToast({
                    title: "保存成功！",
                    duration: 500,
                    icon: "none",
                  });
                  uni.$emit("publishSchool", {});
                  setTimeout(function () {
                    uni.switchTab({
                      url: "/pages/index/index",
                    });
                  }, 600);
                } else {
                  that.$store.dispatch("upDownMyMoments", {
                    id: res.data.data.id,
                    is_on: 1,
                  });
                }
                resolve();
              } else if (res.data.code == 500) {
                uni.showToast({
                  title: "服务器连接失败，请反馈官方客服哦~",
                  duration: 2500,
                  icon: "none",
                });
              } else if (res.data.code == 410) {
                (async function () {
                  // 登录
                  await that.$store.dispatch("toLogon", {});

                  // 重新发布
                  that.toPush();
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
    // 发布的校验，情况有很多种
    pushChecking: function () {
      if (this.type != "组队/搭子" && this.type != "兼职") {
        if (this.theData.title == "") {
          uni.showToast({
            title: "赶快填写一个标题吧~",
            duration: 2500,
            icon: "none",
          });
          return false;
        } else {
          // 类型传一下
          this.theData.type = this.type;
          return true;
        }
      } else if (this.type == "组队/搭子") {
        if (this.theData.title == "") {
          uni.showToast({
            title: "赶快填写一个标题吧~",
            duration: 2500,
            icon: "none",
          });
          return false;
        } else if (this.theData.hope_num < 2) {
          uni.showToast({
            title: "请至少填写2个及以上的组队期望人数哦~",
            duration: 2500,
            icon: "none",
          });
          return false;
        } else if (this.theData.start_at == "" || this.theData.end_at == "") {
          uni.showToast({
            title: "请填写活动日期哦~",
            duration: 2500,
            icon: "none",
          });
          return false;
        } else if (this.theData.area_code == "") {
          uni.showToast({
            title: "请选择活动所在城市~",
            duration: 2500,
            icon: "none",
          });
          return false;
        } else {
          // 类型传一下
          this.theData.type = this.type;
          return true;
        }
      } else if (this.type == "兼职") {
        if (this.theData.title == "") {
          uni.showToast({
            title: "赶快填写一个标题吧~",
            duration: 2500,
            icon: "none",
          });
          return false;
        } else if (this.theData.area_code == "") {
          uni.showToast({
            title: "请选择兼职所在城市~",
            duration: 2500,
            icon: "none",
          });
          return false;
        } else if (this.theData.wages == "") {
          uni.showToast({
            title: "如不确定金额，可直接填写“面议”。",
            duration: 2500,
            icon: "none",
          });
          return false;
        } else {
          // 类型传一下
          this.theData.type = this.type;
          return true;
        }
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

    // ----------------------------------------------------------------页面操作----------------------------------------------------------------
    // ----------------------------------------------------------------页面操作----------------------------------------------------------------
    // ----------------------------------------------------------------页面操作----------------------------------------------------------------

    // 选择上传图片
    imageSelect: function (e) {
      // console.log('e',e);
      // 就是当前时间,给图片命名的
      let nowDateTime = this.$public.getNowDateTime();
      // console.log('nowDateTime',nowDateTime);

      // 重定向
      let that = this;
      // 异步转同步
      (async function () {
        let theName = [];
        for (let i = 0; i < e.tempFiles.length; i++) {
          theName.push(nowDateTime + "_" + i);
        }

        // 调用全局方法
        await that.$store.dispatch("upLoadImage", {
          type: "img",
          tempFilePaths: e.tempFilePaths,
          name: theName,
          tempFiles: e.tempFiles,
          // extname:e.tempFiles[0].extname,
          // uuid:e.tempFiles[0].uuid
        });

        let theStoreTempImageUrl = that.$store.state.tempImageUrl;
        if (theStoreTempImageUrl.length != 0) {
          // 证明有图片添加进去了
          for (let i = 0; i < theStoreTempImageUrl.length; i++) {
            // 判断如果传成功了,那么push到这个tempImageValue数组中
            that.tempImageValue.push(theStoreTempImageUrl[i]);
          }

          // console.log('imageSelect_tempImageValue',that.tempImageValue);

          // 重置全局文件的临时存储字段
          // 传完以后,把临时存储置空,否则下一个图就搞不清楚了
          that.$store.commit("changeTempImageUrl", {});
        }
      })();
    },
    //
    imageDelete: function (e) {
      // console.log('imageDelete_e',e);
      for (let i = 0; i < this.tempImageValue.length; i++) {
        if (this.tempImageValue[i].uuid == e.tempFile.uuid) {
          this.tempImageValue.splice(i, 1);
        }
      }
      // console.log('imageDelete_tempImageValue',this.tempImageValue);
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
    // 打开话题选择弹窗 $refs.huati_popup.close()
    openPopup_huati: function () {
      let that = this;
      (async function () {
        await that.getLabels();
        that.$refs.huati_popup.open();
      })();
    },
    // 关闭
    closePopup_huati: function () {
      this.$refs.huati_popup.close();
    },
    // 手动输入话题
    handAddLabel: function () {
      if (this.theHandAddLabel != "") {
        this.addLabel(this.theHandAddLabel);
        this.theHandAddLabel = "";
      }
    },
    // 添加标签及校验
    addLabel: function (item) {
      let isAdd = true;
      for (let i = 0; i < this.theSelectedLabels.length; i++) {
        if (item == this.theSelectedLabels[i]) {
          uni.showToast({
            title: "已添加过这个话题了哦~",
            duration: 1500,
            icon: "none",
          });
          isAdd = false;
        }
      }
      if (isAdd == true) {
        this.theSelectedLabels.push(item);
      }
    },
    // 删除一个标签
    deletedOne: function (index) {
      this.theSelectedLabels.splice(index, 1);
    },

    // 输入期望人数的预处理方案，因为默认是0 ，但是为了方便填写
    // 获得焦点的时候，如果是0 就要去掉，反之，失去焦点的时候需要补上
    easyinputFocus: function (type) {
      if (type == "number") {
        if (this.theData.hope_num == 0) {
          this.theData.hope_num = null;
        }
      }
    },
    // 同上
    easyinputBlur: function (type) {
      if (type == "number") {
        if (this.theData.hope_num == null) {
          this.theData.hope_num = 0;
        }
      }
    },
    // 选择性别
    selectedSexOne: function (index) {
      this.theSexIndex = index;
      this.theData.sex_type = this.sexs[index];
    },
    // 选择费用方式
    selectedSettlementOne: function (index) {
      this.theSettlementIndex = index;
      this.theData.free_type = this.settlements[index];
    },
    // 选择时间
    dateMaskClick: function () {
      // console.log('this.dateRange',this.dateRange);
      this.theData.start_at = this.dateRange[0];
      this.theData.end_at = this.dateRange[1];
      // console.log('开始结束',this.theData.start_at,this.theData.end_at );
    },

    // 选择结算单位
    selectedSettlement_1sOne: function (index) {
      this.theSettlement_1sIndex = index;
    },
    // 选择结算周期
    selectedSettlement_2sOne: function (index) {
      this.theSettlement_2sIndex = index;
    },

    // ----------------------------------------------------------------页面跳转----------------------------------------------------------------
    // ----------------------------------------------------------------页面跳转----------------------------------------------------------------
    // ----------------------------------------------------------------页面跳转----------------------------------------------------------------
    // 跳转范围选择
    toRange: function () {
      uni.navigateTo({
        url: "/pages/push/range",
      });
    },
    // 跳转地址选择
    toAddress: function () {
      uni.navigateTo({
        // type=1 表示是index页面过来的
        url: "/pages/index/address?type=push",
      });
    },
  },
};
</script>

<style>
::-webkit-scrollbar {
  width: 0;
  height: 0;
}

.red {
  color: #ff0000;
  margin-right: 5px;
}

.white {
  color: #ffffff;
  margin-right: 5px;
}

.content {
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: #fafafa;
}

.huati_popup-box {
  height: 85vh;
  width: 100vw;
  background-color: #ffffff;
  border-radius: 15px 15px 0 0;
}

.back {
  position: absolute;
  top: 10px;
  right: 15px;
  z-index: 99999999;
  display: flex;
  flex-direction: row;
  align-items: center;
}

.back text {
  font-size: 14px;
  color: #727272;
  margin-left: 5px;
}

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
  /* border-bottom: #E5E5E5 1px solid; */
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
  height: 35px;
  line-height: 35px;
  padding: 0 15px;
  background-color: #ffedd5;
  margin: 15px 15px 0 0;
  border-radius: 100px;
  color: #727272;
  font-size: 13px;
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
  width: 75px;
  height: 5vh;
  line-height: 5vh;
  background-color: #ff812f;
  color: #ffffff;
  border-radius: 100px;
  text-align: center;
  margin-left: 10px;
}

.the-title {
  background-color: #ffffff;
}

.the-title-tip {
  width: 93vw;
  padding: 3.5vw 3.5vw 0 3.5vw;
  background-color: #ffffff;
  color: #bbbbbb;
}

.the-title-input {
  width: 93vw;
  padding: 10px 0 0 0;
  background-color: #ffffff;
  border-bottom: #e5e5e5 1px solid;
  margin: 0 3.5vw;
}

.the-title-input-2 {
  width: 93vw;
  padding: 10px 0 0 0;
  background-color: #ffffff;
  margin: 0 3.5vw;
}

.the-pic {
  width: 93vw;
  padding: 10px 3.5vw 10px 3.5vw;
}

.the-buttons {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  font-size: 13px;
  width: 93vw;
  padding: 0 3.5vw;
  background-color: #ffffff;
  padding-top: 15px;
}

.the-button {
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  background-color: #f3f3f3;
  height: 35px;
  line-height: 35px;
  padding: 0 15px;
  border-radius: 100px;
  color: #727272;
  margin-bottom: 10px;
}

.label_selected {
  background-color: #ff812f;
  color: #ffffff;
}

.the-button image {
  width: 15px;
  height: 15px;
  margin-right: 5px;
}

.is_anonymous {
  color: #ffffff;
}

.the-button-1 {
  background-color: #ff812f;
}

.space-line {
  width: 100vw;
  height: 10px;
  background-color: #fafafa;
}

.the-range {
  display: flex;
  flex-direction: row;
  background-color: #ffffff;
  border-top: #f3f3f3 1px solid;
}

.the-range-title {
  padding-left: 3.5vw;
  width: 27.5vw;
  height: 55px;
  line-height: 55px;
  color: #bbbbbb;
}

.the-range-selected {
  width: 60vw;
  height: 55px;
  line-height: 55px;
}

.the-range-selected-one {
  margin-right: 10px;
  display: flex;
  flex-direction: row;
  align-items: center;
  overflow: scroll;
}
.gray {
  color: #bbbbbb !important;
}
.the-range-selected-one view {
  margin-left: 5px;
}

.the-range-icon {
  width: 9vw;
  height: 55px;
  line-height: 55px;
  text-align: center;
}

.the-hope {
  display: flex;
  flex-direction: row;
  align-items: center;
  background-color: #ffffff;
  height: 55px;
  border-bottom: #f3f3f3 1px solid;
}

.the-hope-title {
  padding-left: 3.5vw;
  width: 27.5vw;
  color: #bbbbbb;
}

.the-hope-selected {
  width: 69vw;
  display: flex;
  flex-direction: row;
  align-items: center;
}

.space-line-bottom {
  padding: 25px 0 65px 0;
  display: flex;
  flex-direction: row;
  align-items: center;
}
.to-push-1 {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 25vw;
  height: 55px;
}
.to-push-1 view {
  font-size: 13px;
  color: #727272;
  margin-top: 5px;
}

.no-bodrder {
  border-top: none !important;
}

.to-push-2 {
  width: 71.5vw;
  margin-right: 3.5vw;
  height: 55px;
  line-height: 55px;
  text-align: center;
  color: #ffffff;
  background-color: #ff812f;
  border-radius: 100px;
}
</style>