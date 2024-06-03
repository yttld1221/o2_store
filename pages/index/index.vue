<template>
  <view class="content">
    <!-- 置顶的搜索输入框 -->
    <view
      v-if="inputBottomHeight != 0"
      class="z-input"
      :style="'position: fixed;z-index:999;bottom:' + inputBottomHeight + 'px;'"
    >
      <text>{{ searchInputText }}</text>
    </view>
    <!-- tabbar的背景 -->
    <!-- <image class="tabbar-bg" :style="'bottom:'+(tabBarHeight-10)+ 'px;'" src="/static/tabbar_bg@3x.png" mode="widthFix"></image> -->

    <!-- 背景 -->
    <view
      class="bg"
      :style="'height:' + (statusBarHeight + navBarHeight + 125) + 'px;'"
    ></view>

    <!-- 导航切换栏 -->
    <view
      class="titles"
      :style="'top:' + statusBarHeight + 'px;height:' + navBarHeight + 'px;'"
    >
      <view class="titles-box">
        <view
          class="titles-item"
          @click="toTitleOne(index)"
          :class="{ 'title-selected': index == theTitleIndex }"
          v-for="(item, index) in titleName"
          >{{ item }}</view
        >
      </view>
    </view>
    <!-- 定位选择 -->
    <view
      @click="toAddress()"
      class="location"
      :style="'top:' + statusBarHeight + 'px;height:' + navBarHeight + 'px;'"
    >
      <u-icon top="1" name="map-fill" color="#000000" size="16"></u-icon>
      <text class="city-text">{{
        theAddress.title != undefined
          ? theAddress.title.length < 4
            ? theAddress.title
            : theAddress.title.substring(0, 3) + "..."
          : "选择地区"
      }}</text>
      <u-icon name="arrow-down-fill" color="#000000" size="12"></u-icon>
    </view>

    <template v-if="theTitleIndex == 1">
      <!-- 校园墙 -->
      <view
        class="school"
        :style="'top:' + (statusBarHeight + navBarHeight) + 'px;'"
      >
        <!-- 搜索 -->
        <view class="searchs-2">
          <view class="search-box-2">
            <view class="search-picker" @click="toSchool()">
              <text v-if="theSchool.title != ''">{{
                theSchool.title.length < 5
                  ? theSchool.title
                  : theSchool.title.substring(0, 4) + "..."
              }}</text>
              <text v-if="theSchool.title == ''">全部校区</text>
              <uni-icons
                class="margin-left-5"
                type="down"
                size="12"
              ></uni-icons>
            </view>
            <view class="search-input">
              <input
                type="text"
                v-model="searchInputText"
                :adjust-position="fasle"
                cursor-spacing="20"
                @focus="inputBindFocus"
                @blur="inputBindBlur"
                @confirm="searchPost"
                confirm-type="search"
                placeholder="请输入搜索内容"
              />
            </view>
            <uni-icons
              @click="emptyInput('searchInputText')"
              v-if="searchInputText != ''"
              type="clear"
              size="20"
              color="#bbbbbb"
            ></uni-icons>
            <view @click="searchPost" class="search-button">
              <image
                class="image-width-20"
                src="/static/1_search_2@3x.png"
                mode="widthFix"
              ></image>
            </view>
          </view>
        </view>
        <!-- 标题 -->
        <view class="posts">
          <view class="posts-titles">
            <view
              class="flex-row"
              :style="'width:' + titles.length * 20 + 'vw;'"
            >
              <view
                :class="{
                  'posts-titles-one': true,
                  'posts-titles-one-choised': schoolOneTitleIndex == index,
                }"
                @click="choiseOneTitle(index)"
                v-for="(item, index) in theLevel == 2 ? titles : tempTitles"
              >
                <view class="flex-column">
                  <view>{{ item }}</view>
                  <view
                    :class="{ 'short-line': schoolOneTitleIndex == index }"
                  ></view>
                </view>
              </view>
            </view>
          </view>
          <!-- 筛选 -->
          <image
            @click="$public.disabled_tip('高级筛选')"
            class="image-width-20"
            src="/static/1_shaixuan.png"
            mode="widthFix"
          ></image>
        </view>
      </view>
      <!-- 内容 -->
      <view>
        <view
          class="posts-data"
          :style="
            index == 0
              ? 'margin-top:' + (statusBarHeight + navBarHeight + 125) + 'px;'
              : ''
          "
          v-for="(item, index) in school_datas"
        >
          <post-type-zudui
            @toDetail="toDetail"
            @topPerSonalhome="topPerSonalhome"
            @toThumb="toThumb"
            @actionMore="actionMore"
            @zuduiButtons="zuduiButtons"
            v-if="
              titles[schoolOneTitleIndex] == item.type ||
              titles[schoolOneTitleIndex] == '综合'
            "
            :postsDataOneIndex="index"
            :theData="item"
          ></post-type-zudui>
        </view>
      </view>
    </template>
    <template v-else>
      <view
        class="school home-search"
        :style="'top:' + (statusBarHeight + navBarHeight) + 'px;'"
      >
        <view class="search-box">
          <u-search
            @click="toSearch()"
            disabled
            placeholder="请输入搜索关键词"
            v-model="searchInputText"
            :showAction="false"
          ></u-search
        ></view>
        <view class="home-type">
          <image
            class="the-line-3-bottom"
            src="https://schoolwx.oss-cn-hangzhou.aliyuncs.com/school/img/v2/20240511/admin/0ea97dedc8c1adfd15d2f17197fdd882.png"
          ></image>
          <types @changeTab="changeTab" :list="tabArr"></types>
        </view>
      </view>
      <!-- :style="{ 'margin-top': `${statusBarHeight + navBarHeight + 230}px` }" -->
      <view
        class="list-container"
        :style="
          'margin-top:' +
          (statusBarHeight + navBarHeight + contentHeight) +
          'px;'
        "
      >
        <view
          @click="goDetail(item)"
          class="list-item"
          v-for="(item, index) in school_datas"
          :key="index"
        >
          <view class="image-box">
            <image mode="aspectFill" :src="item.img_url" />
          </view>
          <view class="list-item-info">
            <view class="list-item-title">{{ item.title }}</view>
            <view class="list-item-price flex-algin">
              <view class="list-item-price-left"
                >¥<text style="font-size: 34rpx">{{
                  item.sale_price
                }}</text></view
              >
              <view class="list-item-price-right"
                >已售：{{ item.sale_num }}</view
              >
            </view>
          </view>
        </view>
      </view>
    </template>

    <!-- 底部垫层 -->
    <view @click="loadMore()" class="space-line-bottom">
      <uni-load-more
        :status="isLoading"
        :content-text="contentText"
      ></uni-load-more>
    </view>

    <tab-Bar ref="theMessage" current="0"></tab-Bar>
  </view>
</template>

<script>
import types from "./components/types.vue";
export default {
  components: {
    types,
  },
  data() {
    return {
      contentHeight: 0,
      tabArr: [],
      momentType: "",
      theLevel: 0,

      contentText: {
        contentdown: "查看更多",
        contentrefresh: "加载中...",
        contentnomore: "到底了，可点击此处手动加载~",
      },

      // 最后的加载组件的加载动画效果，
      isLoading: "loading",
      // 当前获取的校园墙页码，每次需要+1
      theGetMomentsListPage: 1,
      theGetMomentsListPagesize: 10,

      titleName: ["首页", "校园墙"],
      theTitleIndex: 1,
      schoolOneTitleIndex: 0,

      // 顶部状态栏
      statusBarHeight: 0,
      // 导航标题栏
      navBarHeight: 0,
      // 底部tabbar高度
      tabBarHeight: 0,

      // 搜索输入框内容
      searchInputText: "",
      // 获取焦点时候的输入框的高度，主要是给置顶的bottom用，就是键盘高度
      inputBottomHeight: 0,

      //
      titles: [
        "综合",
        "话题",
        "组队/搭子",
        "分享/安利",
        "兼职",
        "表白",
        "求助",
        "其他",
      ],
      tempTitles: ["综合", "话题"],
      textWidths: 0,

      // 注意这个临时地址主要是为了给首页判断的，当选择完地址后，这里要通过这个判断是否变更了地址，如果改变了，则需要重新获取数据的
      tempAddressTitle: "",
      tempSchoolTitle: "",
      // 当前所在地址
      theAddress: {
        title: "",
        status: 0,
        code: "",
      },
      theSchool: {
        id: 1,
        title: "",
        status: 1,
        addr: "",
        create_id: 1,
        update_id: 1,
      },
      currentIndex: 0,
      //
      school_datas: [
        // {
        // 	id: 1,
        // 	title: "欢迎来到氧气仓库官方资讯，这里有最前沿的校园资讯分享，快来和我一起看看吧～",
        // 	url: "https://schoolwx.oss-cn-hangzhou.aliyuncs.com/school/img/20230518/1684379049443118.png,https://schoolwx.oss-cn-hangzhou.aliyuncs.com/school/img/20230518/1684379049443118.png,https://schoolwx.oss-cn-hangzhou.aliyuncs.com/school/img/20230518/1684379049443118.png,https://schoolwx.oss-cn-hangzhou.aliyuncs.com/school/img/20230518/1684379049443118.png", // 图片，多张用英文的逗号隔开
        // 	pid: 0,
        // 	is_on: 1, // 是否是上线状态，1表示是，2表示否
        // 	is_hot: 2, // 是否是热门，1表示是，2表示否
        // 	school_id: 3, // 发布人所在学校ID
        // 	type: "话题", //类型有：话题、组队/搭子、分享/安利、二手闲置、兼职、表白、求助、其他
        // 	label: "#打球,#吃喝玩,#看电影,#看电影,#看电影,#看电影,#看电影,#看电影,#看电影", // 标签，多个用英文的逗号隔开
        // 	is_anonymous: 1, // 是否匿名 1表示是，2表示不匿名
        // 	wages: "", // 兼职用的，工资金额或者显示"面议"
        // 	settlement: "", // 工资结算方式  用/拼接
        // 	hope_num: 10, // 组队的期望人数
        // 	free_type: "", // 组队的费用类型  免费/AA
        // 	is_entry: 1, // 本人是否报名组队，1是，2否
        // 	area_code: "640100", // 活动区地区代码
        // 	task_id: 0, // 关联的活动ID
        // 	created_at: "2023-05-18 11:05:13", // 第一次插入时间
        // 	released_at: "2024-03-11 16:05:13", // 发布时间
        // 	create_id: 50, // 发布人ID
        // 	sex_type: "", // 组队的性别要求
        // 	start_at: null, // 组队活动开始日期
        // 	end_at: null, // 组队活动开始日期
        // 	is_regard: 2, // 组队活动结束日期
        // 	is_thumb: 1, // 本人是否点过赞 1是2否
        // 	thumb_num: 1, // 点赞数
        // 	comment_num: 0, // 评论数
        // 	entry_num: 3, // 实际报名人数
        // 	nick_name: "氧*",
        // 	avatar_url: "https://schoolwx.oss-cn-hangzhou.aliyuncs.com/school/img/20230518/1684378586065116.png",
        // 	school_name: "宁波大学",
        // 	area_name: "银川市"
        // },
        // {
        // 	// 该字段只有详情页才有
        // 	content: "这是一段描述的内容，也就是活动的详情内容，但是只有详情页才有这个字段。",
        // 	// 该字段只有详情页才有
        // 	members: [{
        // 			id: "1",
        // 			nick_name: "黄",
        // 			avatar_url: "https://schoolwx.oss-cn-hangzhou.aliyuncs.com/school/img/20230513/168394053478518.png"
        // 		},
        // 		{
        // 			id: "1",
        // 			nick_name: "黄",
        // 			avatar_url: "https://schoolwx.oss-cn-hangzhou.aliyuncs.com/school/img/20230513/168394053478518.png"
        // 		},
        // 		{
        // 			id: "1",
        // 			nick_name: "黄",
        // 			avatar_url: "https://schoolwx.oss-cn-hangzhou.aliyuncs.com/school/img/20230513/168394053478518.png"
        // 		},
        // 		{
        // 			id: "1",
        // 			nick_name: "黄",
        // 			avatar_url: "https://schoolwx.oss-cn-hangzhou.aliyuncs.com/school/img/20230513/168394053478518.png"
        // 		},
        // 		{
        // 			id: "1",
        // 			nick_name: "黄",
        // 			avatar_url: "https://schoolwx.oss-cn-hangzhou.aliyuncs.com/school/img/20230513/168394053478518.png"
        // 		},
        // 		{
        // 			id: "1",
        // 			nick_name: "黄",
        // 			avatar_url: "https://schoolwx.oss-cn-hangzhou.aliyuncs.com/school/img/20230513/168394053478518.png"
        // 		},
        // 		{
        // 			id: "1",
        // 			nick_name: "黄",
        // 			avatar_url: "https://schoolwx.oss-cn-hangzhou.aliyuncs.com/school/img/20230513/168394053478518.png"
        // 		},
        // 		{
        // 			id: "1",
        // 			nick_name: "黄",
        // 			avatar_url: "https://schoolwx.oss-cn-hangzhou.aliyuncs.com/school/img/20230513/168394053478518.png"
        // 		},
        // 		{
        // 			id: "1",
        // 			nick_name: "黄",
        // 			avatar_url: "https://schoolwx.oss-cn-hangzhou.aliyuncs.com/school/img/20230513/168394053478518.png"
        // 		},
        // 		{
        // 			id: "1",
        // 			nick_name: "黄",
        // 			avatar_url: "https://schoolwx.oss-cn-hangzhou.aliyuncs.com/school/img/20230513/168394053478518.png"
        // 		},
        // 		{
        // 			id: "1",
        // 			nick_name: "黄",
        // 			avatar_url: "https://schoolwx.oss-cn-hangzhou.aliyuncs.com/school/img/20230513/168394053478518.png"
        // 		},
        // 		{
        // 			id: "1",
        // 			nick_name: "黄",
        // 			avatar_url: "https://schoolwx.oss-cn-hangzhou.aliyuncs.com/school/img/20230513/168394053478518.png"
        // 		}
        // 	],
        // 	//------------------------------------------------------------------------------------------------------------------------
        // 	id: 1,
        // 	title: "欢迎来到氧气仓库官方资讯，这里有最前沿的校园资讯分享，快来和我一起看看吧～",
        // 	url: "https://schoolwx.oss-cn-hangzhou.aliyuncs.com/school/img/20230518/1684379049443118.png,https://schoolwx.oss-cn-hangzhou.aliyuncs.com/school/img/20230518/1684379049443118.png", // 图片，多张用英文的逗号隔开
        // 	pid: 0,
        // 	is_on: 1, // 是否是上线状态，1表示是，2表示否
        // 	is_hot: 2, // 是否是热门，1表示是，2表示否
        // 	school_id: 3, // 发布人所在学校ID
        // 	type: "组队/搭子", //类型有：话题、组队/搭子、分享/安利、二手闲置、兼职、表白、求助、其他
        // 	label: "#打球,#吃喝玩,#看电影,#看电影,#看电影,#看电影,#看电影,#看电影,#看电影", // 标签，多个用英文的逗号隔开
        // 	is_anonymous: 1, // 是否匿名 1表示是，2表示不匿名
        // 	wages: "", // 兼职用的，工资金额或者显示"面议"
        // 	settlement: "", // 工资结算方式  用/拼接
        // 	hope_num: 10, // 组队的期望人数
        // 	free_type: "AA", // 组队的费用类型  免费/AA
        // 	is_entry: 1, // 本人是否报名组队，1是，2否
        // 	area_code: "640100", // 活动区地区代码
        // 	task_id: 0, // 关联的活动ID
        // 	created_at: "2023-05-18 11:05:13", // 第一次插入时间
        // 	released_at: "2024-03-11 16:05:13", // 发布时间
        // 	create_id: 50, // 发布人ID
        // 	sex_type: "不限", // 组队的性别要求
        // 	start_at: "2024-03-15", // 组队活动开始日期
        // 	end_at: "2025-03-17", // 组队活动结束日期
        // 	is_regard: 2, // 本人是否点关注 1是2否
        // 	is_thumb: 2, // 本人是否点过赞 1是2否
        // 	thumb_num: 1, // 点赞数
        // 	comment_num: 0, // 评论数
        // 	entry_num: 3, // 实际报名人数
        // 	nick_name: "氧*",
        // 	avatar_url: "https://schoolwx.oss-cn-hangzhou.aliyuncs.com/school/img/20230518/1684378586065116.png",
        // 	school_name: "宁波大学",
        // 	area_name: "银川市"
        // },
        // {
        // 	id: 1,
        // 	title: "欢迎来到氧气仓库官方资讯，这里有最前沿的校园资讯分享，快来和我一起看看吧～",
        // 	url: "https://schoolwx.oss-cn-hangzhou.aliyuncs.com/school/img/20230518/1684379049443118.png", // 图片，多张用英文的逗号隔开
        // 	pid: 0,
        // 	is_on: 1, // 是否是上线状态，1表示是，2表示否
        // 	is_hot: 2, // 是否是热门，1表示是，2表示否
        // 	school_id: 3, // 发布人所在学校ID
        // 	type: "话题", //类型有：话题、组队/搭子、分享/安利、二手闲置、兼职、表白、求助、其他
        // 	label: "#打球,#吃喝玩,#看电影,#看电影,#看电影,#看电影,#看电影,#看电影,#看电影", // 标签，多个用英文的逗号隔开
        // 	is_anonymous: 1, // 是否匿名 1表示是，2表示不匿名
        // 	wages: "", // 兼职用的，工资金额或者显示"面议"
        // 	settlement: "", // 工资结算方式  用/拼接
        // 	hope_num: 0, // 组队的期望人数
        // 	free_type: "", // 组队的费用类型  免费/AA
        // 	is_entry: 1, // 本人是否报名组队，1是，2否
        // 	area_code: "640100", // 活动区地区代码
        // 	task_id: 0, // 关联的活动ID
        // 	created_at: "2023-05-18 11:05:13", // 第一次插入时间
        // 	released_at: "2024-03-11 16:05:13", // 发布时间
        // 	create_id: 50, // 发布人ID
        // 	sex_type: "", // 组队的性别要求
        // 	start_at: null, // 组队活动开始日期
        // 	end_at: null, // 组队活动开始日期
        // 	is_regard: 2, // 组队活动结束日期
        // 	is_thumb: 2, // 本人是否点过赞 1是2否
        // 	thumb_num: 1, // 点赞数
        // 	comment_num: 0, // 评论数
        // 	entry_num: 0, // 实际报名人数
        // 	nick_name: "氧*",
        // 	avatar_url: "https://schoolwx.oss-cn-hangzhou.aliyuncs.com/school/img/20230518/1684378586065116.png",
        // 	school_name: "宁波大学",
        // 	area_name: "银川市"
        // },
        // {
        // 	id: 1,
        // 	title: "潮流嘻哈素人拍照有需要的小伙伴快来一起参与我们吧！",
        // 	url: "https://schoolwx.oss-cn-hangzhou.aliyuncs.com/school/img/20230518/1684379049443118.png", // 图片，多张用英文的逗号隔开
        // 	pid: 0,
        // 	is_on: 1, // 是否是上线状态，1表示是，2表示否
        // 	is_hot: 2, // 是否是热门，1表示是，2表示否
        // 	school_id: 3, // 发布人所在学校ID
        // 	type: "兼职", //类型有：话题、组队/搭子、分享/安利、二手闲置、兼职、表白、求助、其他
        // 	label: "#打球,#吃喝玩,#看电影,#看电影,#看电影,#看电影,#看电影,#看电影,#看电影", // 标签，多个用英文的逗号隔开
        // 	is_anonymous: 1, // 是否匿名 1表示是，2表示不匿名
        // 	wages: "288", // 兼职用的，工资金额或者显示"面议"
        // 	settlement: "元/天/日结", // 工资结算方式  用/拼接
        // 	hope_num: 0, // 组队的期望人数
        // 	free_type: "", // 组队的费用类型  免费/AA
        // 	is_entry: 1, // 本人是否报名组队，1是，2否
        // 	area_code: "640100", // 活动区地区代码
        // 	task_id: 0, // 关联的活动ID
        // 	created_at: "2023-05-18 11:05:13", // 第一次插入时间
        // 	released_at: "2024-03-11 16:05:13", // 发布时间
        // 	create_id: 50, // 发布人ID
        // 	sex_type: "", // 组队的性别要求
        // 	start_at: null, // 组队活动开始日期
        // 	end_at: null, // 组队活动开始日期
        // 	is_regard: 2, // 组队活动结束日期
        // 	is_thumb: 2, // 本人是否点过赞 1是2否
        // 	thumb_num: 1, // 点赞数
        // 	comment_num: 0, // 评论数
        // 	entry_num: 0, // 实际报名人数
        // 	nick_name: "氧*",
        // 	avatar_url: "https://schoolwx.oss-cn-hangzhou.aliyuncs.com/school/img/20230518/1684378586065116.png",
        // 	school_name: "宁波大学",
        // 	area_name: "银川市"
        // },
        // {
        // 	id: 1,
        // 	title: "潮流嘻哈素人拍照有需要的小伙伴快来一起参与我们吧！",
        // 	url: "https://schoolwx.oss-cn-hangzhou.aliyuncs.com/school/img/20230518/1684379049443118.png", // 图片，多张用英文的逗号隔开
        // 	pid: 0,
        // 	is_on: 1, // 是否是上线状态，1表示是，2表示否
        // 	is_hot: 2, // 是否是热门，1表示是，2表示否
        // 	school_id: 3, // 发布人所在学校ID
        // 	type: "兼职", //类型有：话题、组队/搭子、分享/安利、二手闲置、兼职、表白、求助、其他
        // 	label: "#打球,#吃喝玩,#看电影,#看电影,#看电影,#看电影,#看电影,#看电影,#看电影", // 标签，多个用英文的逗号隔开
        // 	is_anonymous: 1, // 是否匿名 1表示是，2表示不匿名
        // 	wages: "288", // 兼职用的，工资金额或者显示"面议"
        // 	settlement: "元/天/日结", // 工资结算方式  用/拼接
        // 	hope_num: 0, // 组队的期望人数
        // 	free_type: "", // 组队的费用类型  免费/AA
        // 	is_entry: 1, // 本人是否报名组队，1是，2否
        // 	area_code: "640100", // 活动区地区代码
        // 	task_id: 0, // 关联的活动ID
        // 	created_at: "2023-05-18 11:05:13", // 第一次插入时间
        // 	released_at: "2024-03-11 16:05:13", // 发布时间
        // 	create_id: 50, // 发布人ID
        // 	sex_type: "", // 组队的性别要求
        // 	start_at: null, // 组队活动开始日期
        // 	end_at: null, // 组队活动开始日期
        // 	is_regard: 2, // 组队活动结束日期
        // 	is_thumb: 2, // 本人是否点过赞 1是2否
        // 	thumb_num: 1, // 点赞数
        // 	comment_num: 0, // 评论数
        // 	entry_num: 0, // 实际报名人数
        // 	nick_name: "氧*",
        // 	avatar_url: "https://schoolwx.oss-cn-hangzhou.aliyuncs.com/school/img/20230518/1684378586065116.png",
        // 	school_name: "宁波大学",
        // 	area_name: "银川撒旦撒大大实打实的撒大大啊实打实大苏打大苏打市"
        // }
      ],
    };
  },
  onLoad() {
    // --------------------------------------------------------------处理初始状态--------------------------------------------------------------
    // --------------------------------------------------------------处理初始状态--------------------------------------------------------------
    // --------------------------------------------------------------处理初始状态--------------------------------------------------------------
    // 获取状态栏高度
    this.getTopIconDistance();
    // 加载的时候保留一下当前的地址
    // 就是为了后续判断是否变更过（跳转二级页面返回的时候需要判断）
    this.tempAddressTitle = this.$store.state.store_addressNow.title;
    this.tempSchoolTitle = this.$store.state.store_schoolNow.title;

    // 获取本地地址（如果有的话），并传给全局变量中
    let storage_addressNow = this.getStorageSync("storage_addressNow");
    this.$store.commit("changeStore_addressNow", {
      tempSelectedAddress: storage_addressNow,
    });

    this.getShopType();
    uni.$on("changeIndexArea", async (data) => {
      this.theSchool = {
        id: 0,
        title: "",
        status: 1,
        addr: "",
        create_id: 1,
        update_id: 1,
      };
      this.$store.commit("changeStore_schoolNow", {
        id: 0,
        title: "",
        status: 1,
        addr: "",
        create_id: 1,
        update_id: 1,
      });
      // 重置一下，需要重新获取数据，那么页码和容器都要重置
      this.theGetMomentsListPage = 1;
      this.school_datas = [];
      // 接口调用
      if (this.theTitleIndex == 1) {
        await this.getMomentsList("area");
      } else {
        await this.initShop();
        this.tempAddressTitle = this.theAddress.title;
      }
    });
    uni.$on("changeIndexSchool", async (data) => {
      this.theGetMomentsListPage = 1;
      this.school_datas = [];
      await this.getMomentsList("school");
    });
    uni.$on("publishSchool", async (data) => {
      this.theTitleIndex = 1;
      this.theGetMomentsListPage = 1;
      this.school_datas = [];
      await this.getMomentsList();
    });
  },
  onShow() {
    this.theLevel = this.$store.state.theLogonUser.level;
    // 判断一下，防止重复登录
    // if(this.$store.state.theLogonUser.id == 0){
    // 	this.$store.dispatch('toLogon', {});
    // }

    // 记录当前的previousPage，用于二次点击发布回到原来页面
    this.$store.commit("changePreviousPage", {
      previousPage: 0,
      isPage_2: false,
    });

    // 从全局中，获取地址和学校（这里特意放在onshow中，便于首次或者从地址页面返回的时候都会触发）
    this.theAddress = this.$store.state.store_addressNow;
    this.theSchool = this.$store.state.store_schoolNow;

    // 地址为空，就弹窗提示选择地址
    let that = this;

    // console.log('that.theAddress.title',that.theAddress.title);
    if (that.theAddress.title == "" || that.theAddress.title == undefined) {
      // 表示当前地址为空，可能是用户第一次打开小程序，没有本地缓存数据
      uni.showModal({
        title: "温馨提示：",
        content: "您当前还没有选择地区，点击“前往”将前往地区选择哦~",
        confirmText: "前往",
        confirmColor: "#f89f12",
        showCancel: false,
        success: function (res) {
          if (res.confirm) {
            that.toAddress();
          }
        },
      });
    }
  },
  // 监听下拉动作
  onPullDownRefresh() {
    let that = this;
    // 重置获取的页码
    that.theGetMomentsListPage = 1;
    // 重置搜索文本
    that.searchInputText = "";
    // 重置数组
    that.school_datas = [];
    // 异步转同步调用
    (async function () {
      if (that.theTitleIndex == 1) {
        await that.getMomentsList();
      } else {
        await that.initShop();
      }
      // 等待接口返回后，取消下拉刷新动画
      uni.stopPullDownRefresh();
    })();
  },
  // 页面触底的监听事件，配合pages.json中的"onReachBottomDistance": 0，0的位置写距离底部的距离
  onReachBottom() {
    // 触底后动画效果开启
    this.isLoading = "loading";
    if (this.theTitleIndex == 1) {
      this.getMomentsList();
    } else {
      this.initShop();
    }
    // 调用接口
  },
  methods: {
    // 跳转搜索
    toSearch() {
      uni.navigateTo({
        url: "/page_product/pages/search/index",
      });
    },
    // 跳转详情
    goDetail(item) {
      uni.navigateTo({
        url: "/page_product/pages/product/detail?id=" + item.id,
      });
    },
    // 加载更多
    loadMore() {
      if (this.theTitleIndex == 1) {
        this.getMomentsList();
      } else {
        this.initShop();
      }
    },
    // 初始化数据
    initData() {
      (async () => {
        this.theGetMomentsListPage = 1;
        this.school_datas = [];

        await this.getMomentsList();
        this.tempAddressTitle = this.$store.state.store_addressNow.title;
      })();
    },
    initShop() {
      this.isLoading = "loading"; // 加载中
      let param = {
        page: this.theGetMomentsListPage,
        pagesize: this.theGetMomentsListPagesize,
        category_id: this.momentType,
        is_hot: this.momentType == 0 ? 1 : 0,
        is_product: 1,
        // // 行政区划编码，选定的最低一级区域的编码，空字符串是全部
        area_code: this.$store.state.store_addressNow.code,
      };
      this.API.home
        .getTaskList(param)
        .then((res) => {
          console.log(res);
          // 如果是请求第一页，证明是首次请求，就重置一下
          if (this.theGetMomentsListPage == 1) {
            this.school_datas = [];
          }
          if (res.data.length != 0) {
            for (let i = 0; i < res.data.length; i++) {
              this.school_datas.push({
                ...res.data[i],
                img_url: res.data[i].img_url
                  ? res.data[i].img_url.split(",")[0]
                  : "",
              });
            }

            this.isLoading = "no-more"; // 取消加载动画
            // 页面+1
            this.theGetMomentsListPage += 1;
          } else {
            this.isLoading = "no-more"; // 取消加载动画
          }
          console.log(this.school_datas);
        })
        .catch(async (err) => {
          if (err.code == 410) {
            await this.$store.dispatch("toLogon", {});
            this.initShop();
          }
        });
    },
    getShopType() {
      if (this.theTitleIndex == 1) {
        this.initData();
      } else {
        this.$nextTick(() => {
          let query = uni.createSelectorQuery().in(this);
          query
            .select(".home-search")
            .boundingClientRect((data) => {
              this.contentHeight = data.height;
            })
            .exec();
        });
        this.API.home
          .getAllMenu({})
          .then((res) => {
            console.log(res);
            this.tabArr = [{ name: "精选", id: 0 }];
            //所有分类
            // res.data.forEach((el) => {
            // 	el.children.forEach(item=>{
            // 		this.tabArr.push({ name:item.title=='全部'?el.title:item.title, id: item.id });
            // 	})
            // });
            res.data.forEach((el) => {
              if (el.category_id > 0) {
                this.tabArr.push({ name: el.title, id: el.category_id });
              }
            });
            if (this.tabArr.length) {
              this.theGetMomentsListPage = 1;
              this.school_datas = [];
              this.momentType = this.tabArr[0].id;
              if (this.theAddress.title) {
                this.initShop();
              }
            }
          })
          .catch(async (err) => {
            console.log(err);
            if (err.code == 410) {
              await this.$store.dispatch("toLogon", {});
              await this.getShopType();
              this.tempAddressTitle = this.$store.state.store_addressNow.title;
              this.tempSchoolTitle = this.$store.state.store_schoolNow.title;
            }
          });
      }
    },
    changeTab(item) {
      console.log(item);
      this.currentIndex = item.currentIndex;
      this.theGetMomentsListPage = 1;
      this.school_datas = [];
      this.momentType = item.id;
      this.initShop();
    },
    // 消息动画
    animtionAction: function () {
      let that = this;
      let animtionActionInter = setInterval(function () {
        that.$refs.theMessage.animtionAction();
      }, 1000);
      that.$store.commit("changeRedTip", {
        isRedTip: true,
      });

      setTimeout(function () {
        clearInterval(animtionActionInter);
      }, 5000);
    },

    // 浏览器本地存储和删除
    setStorageSync: function (key, data) {
      try {
        uni.setStorageSync(key, data);
      } catch (e) {
        uni.showToast({
          title: e,
          duration: 2500,
          icon: "none",
        });
      }
    },
    getStorageSync: function (key) {
      try {
        const value = uni.getStorageSync(key);
        return value;
      } catch (e) {
        uni.showToast({
          title: e,
          duration: 2500,
          icon: "none",
        });
      }
    },
    // ---------------------------------------------------页面方法---------------------------------------------------
    // ---------------------------------------------------页面方法---------------------------------------------------
    // ---------------------------------------------------页面方法---------------------------------------------------
    // 获取状态栏高度
    getTopIconDistance() {
      uni.getSystemInfo({
        success: (res) => {
          // 获取手机顶部状态栏的高度
          this.statusBarHeight = res.statusBarHeight || 0;

          // 获取导航栏的高度（手机状态栏高度 + 胶囊高度 + 胶囊的上下间距）
          const menuButtonInfo = uni.getMenuButtonBoundingClientRect();
          this.navBarHeight =
            menuButtonInfo.height +
            (menuButtonInfo.top - this.statusBarHeight) * 2;
          this.tabBarHeight = res.screenHeight - res.safeArea.bottom;

          // 设置全局变量
          this.$store.commit("changeNavBarHeight", {
            statusBarHeight: this.statusBarHeight,
            navBarHeight: this.navBarHeight,
            tabBarHeight: this.tabBarHeight,
          });
        },
        fail: (err) => {},
      });
    },
    // 获取键盘高度
    // 这里主要解决键盘弹出的时候，会顶掉input内容上移，通过 adjust-position 属性控制不上移，但是会不显示
    // 所以，需要写一个自动在键盘顶部显示的内容层
    inputBindFocus(e) {
      this.inputBottomHeight = e.detail.height;
    },
    inputBindBlur() {
      this.inputBottomHeight = 0;
    },

    // 选择首页或校园墙的界面
    toTitleOne: function (index) {
      // this.animtionAction();
      this.theTitleIndex = index;
      let that = this;
      // 重置获取的页码
      that.theGetMomentsListPage = 1;
      // 重置搜索文本
      that.searchInputText = "";
      // 重置数组
      that.school_datas = [];
      if (index == 0) {
        if (that.tabArr.length) {
          that.momentType = that.tabArr[0].id;
          that.initShop();
        } else {
          that.getShopType();
        }
      } else {
        that.getMomentsList();
      }
    },
    // 选择标签（校园墙）
    choiseOneTitle: function (index) {
      this.schoolOneTitleIndex = index;
    },

    // 清空输入框
    emptyInput: function (type) {
      if ((type = "searchInputText")) {
        this.searchInputText = "";
      }
    },

    //------------------------------------------------  页面跳转  -----------------------------------------------------
    //------------------------------------------------  页面跳转  -----------------------------------------------------
    //------------------------------------------------  页面跳转  -----------------------------------------------------
    // 跳转地址选择
    toAddress: function () {
      uni.navigateTo({
        // type=index 表示是index页面过来的
        url: "/pages/index/address?type=index",
      });
    },
    // 跳转学校选择
    toSchool: function () {
      uni.navigateTo({
        url: "/pages/index/school",
      });
    },
    // 跳转详情页
    toDetail: function (id) {
      uni.navigateTo({
        url: "/pages/index/detail?id=" + id,
      });
    },
    // 跳转主页
    topPerSonalhome: function (option) {
      if (option.is_anonymous == 2) {
        // 不匿名
        uni.navigateTo({
          url: "/pages/follow/personalhome?id=" + option.id,
        });
      } else {
        uni.showToast({
          title: "这个人很神秘，不想让你看到TA的主页~",
          duration: 2500,
          icon: "none",
        });
      }
    },

    //------------------------------------------------  接口方法  -----------------------------------------------------
    //------------------------------------------------  接口方法  -----------------------------------------------------
    //------------------------------------------------  接口方法  -----------------------------------------------------
    // 分页获取接口数据
    getMomentsList: function (getType = "") {
      let _this = this;
      return new Promise(function (resolve, reject) {
        let that = _this;
        that.isLoading = "loading"; // 加载中
        // 判断如果是空字符串，证明是首次加载进来，不应该调用接口
        if (that.$store.state.store_addressNow.title != "") {
          uni.request({
            url: that.$store.state.theUrl + "/wechat/moments/getMomentsList",
            method: "POST",
            header: {
              token: that.$store.state.theToken,
            },
            data: {
              // 传参不全，当前只用到onload时候需要的字段
              page: that.theGetMomentsListPage,
              pagesize: that.theGetMomentsListPagesize,
              // 校园墙类型：话题、组队/搭子、分享/安利、二手闲置、兼职、表白、求助、其他，传空字符串为全部
              // schoolOneTitleIndex == 0 表示是综合，就是全部的意思，所以传空
              // type:(that.schoolOneTitleIndex == 0 ?'':that.titles[that.schoolOneTitleIndex]),
              type: "",

              // 搜索字段，默认是个空
              title: that.searchInputText,
              // // 当前选中的学校id
              school_id: that.$store.state.store_schoolNow.id,
              // // 行政区划编码，选定的最低一级区域的编码，空字符串是全部
              area_code: that.$store.state.store_addressNow.code,
            },
            success: (res) => {
              // console.log('getMomentsList_res', res);
              let _that = that;
              // 如果是请求第一页，证明是首次请求，就重置一下
              if (_that.theGetMomentsListPage == 1) {
                _that.school_datas = [];
              }
              if (getType == "area") {
                _that.tempAddressTitle = _that.theAddress.title;
              } else if (getType == "school") {
                _that.tempSchoolTitle =
                  _that.$store.state.store_schoolNow.title;
              }
              if (res.data.code == 0) {
                if (res.data.data.length != 0) {
                  for (let i = 0; i < res.data.data.length; i++) {
                    _that.school_datas.push(res.data.data[i]);
                  }

                  _that.isLoading = "no-more"; // 取消加载动画
                  // console.log('_that.addressData',_that.addressData);
                  // 页面+1
                  _that.theGetMomentsListPage += 1;
                  _that.tempAddressTitle = _that.theAddress.title;
                  resolve();
                } else {
                  _that.isLoading = "no-more"; // 取消加载动画
                  // uni.showToast({
                  // 	title: '没有更多了哦~',
                  // 	duration: 1500,
                  // 	icon: 'none'
                  // })
                  resolve();
                }
              } else if (res.data.code == 500) {
                uni.showToast({
                  title: "服务器连接失败，请反馈官方客服哦~",
                  duration: 2500,
                  icon: "none",
                });
              } else if (res.data.code == 410) {
                let __that = _that;
                (async function () {
                  // 登录
                  await __that.$store.dispatch("toLogon", {});
                  /*
										// 连接WSS
										uni.connectSocket({
										  url: 'wss://school.izekai.cn/wss',
										});
										
										// 打开监听  
										uni.onSocketOpen(function (res) {
											// 登录
											// 测试号数据存一下
											// wss://school.izekai.cn/wss
											// {"data":{"token":"639bba3ff80c75e545d336c5bc1118a5"},"cmd":"ws:login"}
											// {"data":{"msg":"3523532532525","to_user_id":1},"cmd":"ws:sendChatMsg"}
											uni.sendSocketMessage({
												data:JSON.stringify({
													data:{
														token:__that.$store.state.theToken
													},
													cmd:'ws:login'
												}),
												success: (res) => {
													console.log('登录WSS',res);
												}
											})
											
											// 心跳包
											var inter = setInterval(function(){
												uni.sendSocketMessage({
													data:JSON.stringify({
														data:'ping',
														cmd:'ws:ping'
													}),
													success: (res) => {
														console.log('心跳包',res);
													}
												})
											},30000)
											
											console.log('onSocketMessage我监听到了',res);
											// 发送消息
											// uni.sendSocketMessage({
											// 	data:JSON.stringify({
											// 		data:{
											// 			to_user_id:5
											// 			msg:'我是发送的消息！！！！！'
											// 		},
											// 		cmd:'ws:sendChatMsg'
											// 	})
											// })
										  
										});
										// 监听关闭
										uni.onSocketClose(function (res) {
										  console.log('WebSocket 已关闭！');
										});
										// 监听消息
										uni.onSocketMessage(function (res) {
										  console.log('收到服务器内容：' + JSON.parse(res.data));
											// __that.animtionAction();
											if(JSON.parse(res.data).cmd == 'ws:sendChatMsg'){
												console.log('我解析成功啦啦啦啦！！！');
												__that.$store.dispatch('animtionAction',{
													animtionAction:__that.$refs.theMessage.animtionAction()
												});
											}
										});
										*/

                  // 重置
                  __that.theGetMomentsListPage = 1;
                  // 获取省市数据
                  __that.getMomentsList(getType);
                  __that.tempAddressTitle =
                    __that.$store.state.store_addressNow.title;
                  __that.tempSchoolTitle =
                    __that.$store.state.store_schoolNow.title;
                })();
                // uni.showModal({
                // 	title: '温馨提示：',
                // 	content: '当前登录身份已过期，点击“重新登录”继续吧~',
                // 	confirmText: '重新登录',
                // 	confirmColor: '#f89f12',
                // 	showCancel: false,
                // 	success: function(res) {
                // 		if (res.confirm) {
                // 			let __that = _that;
                // 			// 异步转同步，
                // 			(async function() {
                // 				// 登录
                // 				await __that.$store.dispatch('toLogon', {});

                // 				// 重置
                // 				__that.theGetMomentsListPage = 1;
                // 				// 获取省市数据
                // 				__that.getMomentsList();
                // 			})()
                // 		}
                // 	}
                // });
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

    // 搜索
    searchPost: function () {
      // 点搜索的话，应该需要重置一下数据
      // 重置后，接下去的触底加载应该是延用一样的逻辑，只是当前的搜索字段没有重置，一直保留
      this.school_datas = [];
      // 注意：搜索的话，默认把这个页码重置为1就行了，因为之后就是启用触底加载了
      this.theGetMomentsListPage = 1;
      this.getMomentsList();
    },

    // 点赞
    // 说明：点赞的接口放在index.js公共store中
    toThumb: async function (option) {
      // 这里之所以又加了一层，是为了拿到子组件传过来的option
      // 这是保存一下当前本人的点赞状态，用于判断最后本地是增加还是减少点赞数的
      let temp_is_thumb = option.is_thumb;
      await this.$store.dispatch("toThumb", {
        id: option.id,
        is_thumb: option.is_thumb,
      });

      // console.log('this.$store.state.is_thumb_true ',this.$store.state.is_thumb_true );
      if (this.$store.state.is_thumb_true == true) {
        for (let i = 0; i < this.school_datas.length; i++) {
          if (option.id == this.school_datas[i].id) {
            if (temp_is_thumb == 2) {
              // 使用$set响应的改变对象数据，第一个参数是对象本身，第二个参数是属性（记得加引号），第三个是改变后的值
              this.$set(
                this.school_datas[i],
                "thumb_num",
                this.school_datas[i].thumb_num + 1
              );
              this.$set(this.school_datas[i], "is_thumb", 1);
              uni.showToast({
                title: "点赞成功",
                duration: 1000,
                icon: "none",
              });
            } else {
              this.$set(
                this.school_datas[i],
                "thumb_num",
                this.school_datas[i].thumb_num - 1
              );
              this.$set(this.school_datas[i], "is_thumb", 2);
              uni.showToast({
                title: "已取消点赞",
                duration: 1000,
                icon: "none",
              });
            }
          }
        }
      }
    },
    //打开三个点的操作
    actionMore: function (option) {
      let that = this;
      let temp_is_collection = option.is_collection;
      uni.showActionSheet({
        itemList: [
          option.is_collection == 2 ? "收藏该内容" : "取消收藏该内容",
          "举报",
        ],
        itemColor: "#f89f12",
        success: function (res) {
          // console.log(res.tapIndex);
          if (res.tapIndex == 0) {
            let _that = that;
            (async function () {
              await _that.$store.dispatch("toCollection", {
                id: option.id,
              });

              if (_that.$store.state.is_collection_true == true) {
                // 表示调用接口成功
                for (let i = 0; i < _that.school_datas.length; i++) {
                  if (option.id == _that.school_datas[i].id) {
                    if (temp_is_collection == 2) {
                      // 使用$set响应的改变对象数据，第一个参数是对象本身，第二个参数是属性（记得加引号），第三个是改变后的值
                      _that.$set(_that.school_datas[i], "is_collection", 1);
                      uni.showToast({
                        title: "收藏成功",
                        duration: 1000,
                        icon: "none",
                      });
                    } else {
                      _that.$set(_that.school_datas[i], "is_collection", 2);
                      uni.showToast({
                        title: "已取消收藏",
                        duration: 1000,
                        icon: "none",
                      });
                    }
                  }
                }
              }
            })();
          } else {
            uni.showToast({
              title: "举报成功",
              duration: 1000,
              icon: "none",
            });
          }
        },
        fail: function (res) {
          // console.log(res.errMsg);
        },
      });
    },

    // 邀请/组队按钮
    zuduiButtons: async function (option) {
      if (option.type == 1) {
        // 1表示是组队的按钮
        // 这是保存一下当前本人的加入状态，用于判断最后本地是显示加入还是退出
        let temp_is_entry = option.is_entry;
        await this.$store.dispatch("toEntry", {
          id: option.id,
          is_entry: option.is_entry,
        });

        // console.log('this.$store.state.is_entry_true ',this.$store.state.is_entry_true );
        if (this.$store.state.is_entry_true == true) {
          for (let i = 0; i < this.school_datas.length; i++) {
            if (option.id == this.school_datas[i].id) {
              if (temp_is_entry == 2) {
                // 使用$set响应的改变对象数据，第一个参数是对象本身，第二个参数是属性（记得加引号），第三个是改变后的值
                this.$set(
                  this.school_datas[i],
                  "entry_num",
                  this.school_datas[i].entry_num + 1
                );
                this.$set(this.school_datas[i], "is_entry", 1);
                uni.showToast({
                  title: "加入成功",
                  duration: 1000,
                  icon: "none",
                });
              } else {
                this.$set(
                  this.school_datas[i],
                  "entry_num",
                  this.school_datas[i].entry_num - 1
                );
                this.$set(this.school_datas[i], "is_entry", 2);
                uni.showToast({
                  title: "已退出组队",
                  duration: 1000,
                  icon: "none",
                });
              }
            }
          }
        }
      }
    },
  },
};
</script>

<style lang='scss'>
::-webkit-scrollbar {
  width: 0;
  height: 0;
}

.z-input {
  background-color: rgba(255, 240, 232, 0.8);
  width: 93vw;
  height: 45px;
  line-height: 45px;
  padding: 0 3.5vw;
  overflow-x: scroll;
}

.z-input text {
  white-space: nowrap;
}

.flex-row {
  display: flex;
  flex-direction: row;
  align-items: flex-start;
}

.flex-column {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.tabbar-bg {
  width: 100vw;
  position: fixed;
  z-index: 999 !important;
}

.tabbar-mid-button {
  width: 55px;
  right: 10px;
  position: absolute;
  z-index: 9999999999 !important;
}

.content {
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: #ffffff;
  /* justify-content: center; */
  /* background-color: #fafafa; */
  /* height: 100vh; */
  overflow: scroll;
}

.font-15-blod {
  font-size: 15px;
  font-weight: bold;
}

.margin-left-10 {
  margin-left: 2vw;
}

.margin-left-5 {
  margin-left: 1vw;
}

.image-width-20 {
  width: 4.5vw;
  height: 4.5vw;
}

.space-data {
  position: fixed;
}

.bg {
  width: 100%;
  position: fixed;
  z-index: 9;
  top: 0;
  background-image: linear-gradient(to bottom, #fb933a, #ffe479);
}

.titles {
  width: 100%;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  position: fixed;
  z-index: 9;
}

.titles-box {
  width: 263rpx;
  display: flex;
  flex-direction: row;
  align-items: center;
  background: rgba(0, 0, 0, 0.04);
  padding: 4rpx;
  border-radius: 40rpx;
  .titles-item {
    line-height: 47rpx;
    text-align: center;
    font-family: PingFang SC;
    font-weight: 400;
    font-size: 26rpx;
    color: #333333;
    height: 47rpx;
    flex: 1;
  }
}

.title {
  /* margin: 0 5px; */
  padding: 0 15px;
  font-size: 13px;
}

.title-selected {
  background: linear-gradient(0deg, #ffffff 0%, #fff4e3 51%, #ffffff 99%);
  border-radius: 24rpx;
  opacity: 0.9;
  font-family: PingFang SC;
  font-weight: 600;
  font-size: 26rpx;
  color: #f89f12 !important;
}

.location {
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: start;
  position: fixed;
  left: 0;
  z-index: 9;
  padding-left: 30rpx;
}

.school {
  position: fixed;
  display: flex;
  flex-direction: column;
  justify-content: center;
  width: 100vw;
  z-index: 99;
}

.searchs-2 {
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  padding: 0 30rpx;
  margin-top: 15px;
  z-index: 9;
}

.search-box-2 {
  width: 96vw;
  height: 40px;
  border-radius: 100px;
  background-color: rgba(255, 255, 255, 0.8);

  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  padding: 0px 3px;
}

.search-picker {
  margin-left: 4.5vw;
  font-size: 14px;
  font-weight: bold;
  border-right: #bbbbbb 1px solid;
  padding-right: 4.5vw;
}

.search-input {
  font-size: 13px;
}

.search-button {
  width: 12vw;
  height: 9vw;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  border-radius: 100px;
  background-color: #f89f12;
}

.posts {
  width: 92vw;
  height: 55px;
  margin-top: 15px;
  padding: 0 4vw;
  background-color: #fff0e8;
  border-top-left-radius: 10px;
  border-top-right-radius: 10px;
  border-bottom: #e8e8e8 1px solid;

  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;

  box-shadow: 0 -15px 15px 0px #fdc35f;
}

.posts-titles {
  width: 85%;
  overflow: scroll;
}

.posts-titles-one {
  padding: 0 3vw;
  line-height: 10vw;
  text-align: center;
  font-size: 13px;
  /* font-weight: bold; */
}

.posts-titles-one-choised {
  font-weight: bold;
  font-size: 16px;
}

.short-line {
  width: 20px;
  height: 5px;
  border-radius: 100px;
  background-image: linear-gradient(to right, #fec467, #fb933a);
}

.posts-data {
  position: relative;
  z-index: 1;
  width: 100vw;
}

.space-line-bottom {
  height: 180px;
}
.city-text {
  margin: 0 12rpx;
  font-family: PingFang SC;
  font-weight: 600;
  font-size: 32rpx;
  color: #000000;
}
.home-search {
  .search-box {
    padding: 40rpx 30rpx 32rpx;
  }
  .home-type {
    background: #ffffff;
    box-shadow: 0rpx -9rpx 5rpx 1rpx rgba(0, 0, 0, 0.02);
    border-radius: 20rpx 20rpx 0 0;
    border-top: 2px solid #ffffff;
    padding: 26rpx 26rpx 0;
    image {
      width: 100%;
      height: 187rpx;
    }
  }
}
.list-container {
  width: 100%;
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
  padding: 29rpx 30rpx 0;
  box-sizing: border-box;
  .list-item {
    margin-bottom: 20rpx;
    width: 335rpx;
    border-radius: 10rpx 10rpx 0rpx 0rpx;
    .image-box {
      background: #ffffff;
      border-radius: 10rpx 10rpx 0rpx 0rpx;
      width: 335rpx;
      height: 335rpx;
      z-index: 1;
      position: relative;
      image {
        border-radius: 10rpx 10rpx 0rpx 0rpx;
        width: 335rpx;
        height: 335rpx;
      }
    }
    .list-item-info {
      margin-top: -15rpx;
      padding: 30rpx 21rpx 32rpx;
      background: #ffffff;
      box-shadow: 0rpx 0rpx 7rpx 1rpx rgba(0, 0, 0, 0.04);
      border-radius: 0 0 10rpx 10rpx;
      border: 1px solid #f4f4f4;
      border-top: none;
      .list-item-title {
        width: 100%;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
        font-family: PingFang SC;
        font-weight: 500;
        font-size: 24rpx;
        color: #393a3e;
        margin-bottom: 24rpx;
      }
      .list-item-price {
        display: flex;
        justify-content: space-between;
        align-items: flex-end;
        .list-item-price-left {
          font-family: PingFang SC;
          font-weight: 300;
          font-size: 22rpx;
          color: #f23333;
          line-height: 24rpx;
        }
        .list-item-price-right {
          font-family: PingFang SC;
          font-weight: 400;
          font-size: 22rpx;
          color: #999999;
        }
      }
    }
  }
}
</style>