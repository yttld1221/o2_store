<template>
	<view class="content">
		<!-- 我的二维码 -->
		<!-- 添加话题的弹窗 -->
		<uni-popup ref="erweima_popup" type="center">
			<view class="erweima_popup-box">
				<view class="back" @click="closePopup_erweima">
					<uni-icons type="closeempty" size="25" color="#727272"></uni-icons>
				</view>
				<image :show-menu-by-longpress="true" class="popup-erweima" :src="erweima_img" mode="widthFix"></image>
				<view class="popup-erweima-title">· 我的邀请码 ·</view>
				<view class="popup-erweima-content">世界越来越小，你我越来越近。</view>
			</view>
		</uni-popup>

		<view class="bg"></view>
		<!-- 第一行：头像、昵称等 -->
		<view class="the-line-1" :style="'margin-top:' + (statusBarHeight + navBarHeight) + 'px;'">
			<!-- 头像 -->
			<!-- <view class="the-line-1-left" :style="'background: url('+theLogonUser.avatar_url+');'"></view> -->
			<view @click="toPersonal(theLogonUser.level)" class="the-line-1-left"
				:style="'background: url(' + theLogonUser.avatar_url + ');'"></view>
			<!-- 昵称等 -->
			<view class="the-line-1-right">
				<!-- 昵称，二维码 -->
				<view class="the-line-1-right-top">
					<!-- 昵称 账号 -->
					<!-- <view class="the-line-1-right-top-left"> -->
					<view @click="toPersonal(theLogonUser.level)" class="the-line-1-right-top-left">
						<view class="the-line-1-right-top-left-name">{{
              theLogonUser.nick_name
            }}</view>
						<view class="the-line-1-right-top-left-num">
							绑定手机号：{{
                theLogonUser.phone != "" && theLogonUser.phone != null
                  ? theLogonUser.phone.substring(0, 3) +
                    "****" +
                    theLogonUser.phone.substring(7, 11)
                  : "还没绑哦（￣ー+￣）"
              }}
						</view>
					</view>
					<!-- 二维码 -->
					<image @click="openPopup_erweima" class="erweima" src="/static/5_erweima.png" mode="widthFix">
					</image>
				</view>
				<!-- 学校 专业 -->
				<view class="the-line-1-right-bottom">
					<view v-if="theLogonUser.level == 2" class="the-line-1-right-bottom-school">
						<image src="/static/1_school_icon@3x.png" mode="widthFix"></image>
						<view>浙江理工大学</view>
					</view>
					<view v-if="theLogonUser.level == 2" class="the-line-1-right-bottom-school margin-left-10">
						<view>21届视觉传达</view>
					</view>
					<view @click="toRegister(theLogonUser.level)" v-if="theLogonUser.level != 2"
						class="the-line-1-right-bottom-school">
						<view v-if="theLogonUser.level == 0">未注册/认证，点击前往</view>
						<view v-if="theLogonUser.level == 1">待认证</view>
					</view>
				</view>
			</view>
		</view>
		<!-- 第二行：关注、粉丝、欧元、积分等数据 -->
		<view class="the-line-2">
			<view class="the-line-2-item" v-for="(item, index) in line_2_items">
				<view class="the-line-2-item-num">{{ item.num }}</view>
				<view class="the-line-2-item-name">{{ item.name }}</view>
			</view>
		</view>
		<!-- 第三行：订单管理、发布管理等 -->
		<view class="the-line-3">
			<view class="the-line-3-top">
				<view @click="toMinePush(index)" v-if="item.enable" class="the-line-3-top-item"
					v-for="(item, index) in line_3_items">
					<image :src="item.src" mode="widthFix"></image>
					<view>{{ item.name }}</view>
				</view>
			</view>
			<image class="the-line-3-bottom"
				src="https://schoolwx.oss-cn-hangzhou.aliyuncs.com/school/img/v2/xiaochengxu_static/5_line_3_bg%403x%403x.png"
				mode="widthFix"></image>
		</view>
		<!-- 第四行：列表按钮 -->
		<view class="the-line-4">
			<view @click="line_4_itemsSelected(index, '状态切换')" class="the-line-4-item"
				v-for="(item, index) in line_4_items">
				<view :class="{
            'the-line-4-item-name': true,
            'the-line-4-item-selected': index == line_4_items_index,
          }">{{ item }}
				</view>
				<view v-if="index == line_4_items_index" class="the-line-4-item-line"></view>
			</view>
		</view>
		<!-- 第五行：列表内容 -->
		<view class="the-line-5">
			<view class="posts-data" v-for="(item, index) in school_datas">
				<post-type-zudui @topPerSonalhome="topPerSonalhome" @toDetail="toDetail" :postsDataOneIndex="-1"
					:isPersonalHome="true" :theData="item"></post-type-zudui>
			</view>
		</view>
		<!-- 底部垫层 -->
		<view class="space-line-bottom">
			<uni-load-more :status="isMore"></uni-load-more>
		</view>

		<tab-Bar ref="theMessage" current="4"></tab-Bar>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				// 顶部状态栏和导航栏高度
				statusBarHeight: 0,
				navBarHeight: 0,

				// 我的二维码
				erweima_img: "",

				// 登录信息
				theLogonUser: {
					// is_sale: 1, //是否是销售员，1-是，2-否
					// is_buy_vip: 1, //是否购买vip套餐，1-是，2-否，通过该字段判读购买
					// birthday: "", //生日
					// specialty: "", //学生专业，我的个人中心有用
					// shop_id: 0, //开的店铺id,0-代表未开店
					// vip_expire_at: "", // vip到期日期
					// ignore_type: "", // 忽略的校园墙类型，多个用逗号拼接，话题、组队/搭子、分享/安利、二手闲置、兼职、表白、求助、其他
					// buy_vip_at: "", // 购买vip套餐的日期
					// vip_task_id: 0, // vip会员套餐的活动id
					// allow_publish: 1, //是否允许发布校园墙，1-是，2-否
					// intro: "", // 自我介绍
					// id: 1,
					// is_sale: 1,
					// name: "", //姓名
					// nick_name: "游客A", // 昵称
					avatar_url: "", //头像   之所以解放这个属性，主要是解决微信的渲染层和网络层的报错，默认找不到这个字段会报错的
					// openid: "dfaafeee002001",
					// unionid: "opI9e1eV_BqJdUv0n_S97ptfJQNE",
					// sex: "", // 性别
					// school_id: 0,
					// school_ids: null,
					// school_name: '宁波大学',
					// school_names: [{
					// 	id: 1,
					// 	name: '宁波大学'
					// }],
					// phone: "",
					// level: 0, //会员等级，0-游客，1-普通会员，2-认证会员
					// create_id: 1,
					// update_id: 1,
					// pid: 0, // 推荐人id
					// cert_url: "", //学生证url
					// grad_date: null, //毕业日期
					// logon_time: null, //注册时间
					// verify_status: 0, //审核状态：0-无需处理(默认)，1-待审核，2-审核通过，3-被拒绝，4-锁定(毕业半年以上)
					// verify_time: null, //审核时间
					// created_at: "2023-03-16 14:16:16",
					// updated_at: "2023-03-16 14:18:26",
					// deleted_at: null
				},

				// 由于接口分也逻辑，如果拿完的是最后一页，下一页是会报错的，所以需要知道当前是否是最后一页，否则不允许调用接口的
				totalCount: 11, // 初始值必须大于theGetCommentListPagesize

				// 关注、粉丝等
				line_2_items: [{
						num: 0,
						name: "关注",
					},
					{
						num: 0,
						name: "粉丝",
					},
					{
						num: 0,
						name: "鸥元",
					},
					{
						num: 0,
						name: "积分",
					},
					{
						num: 0,
						name: "赞过",
					},
				],
				// 功能板块
				line_3_items: [{
						src: "/static/5_line_3_1@3x.png",
						name: "订单管理",
						enable: true,
					},
					{
						src: "/static/5_line_3_2@3x.png",
						name: "发布管理",
						enable: true,
					},
					{
						src: "/static/5_line_3_3@3x.png",
						name: "工作室",
						enable: true,
					},
					{
						src: "/static/5_line_3_4@3x.png",
						name: "更多功能",
						enable: true,
					},
				],
				//
				line_4_items: ["我加入的", "我点赞的"],
				line_4_items_index: 0,

				// 用于分页加载传参
				// 当前获取的校园墙页码，每次需要+1
				theGetMomentsListPage: 1,
				theGetMomentsListPagesize: 5,

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
					// 	is_regard: 2,
					// 	is_thumb: 1, // 本人是否点过赞 1是2否
					// 	thumb_num: 1, // 点赞数
					// 	comment_num: 0, // 评论数
					// 	entry_num: 3, // 实际报名人数
					// 	nick_name: "氧*",
					// 	avatar_url: "https://schoolwx.oss-cn-hangzhou.aliyuncs.com/school/img/20230518/1684378586065116.png",
					// 	school_name: "宁波大学",
					// 	area_name: "银川市"
					// }
				],
			};
		},
		onLoad() {
			// 获取状态和导航栏高度
			let barObj = this.$public.getTopIconDistance();
			this.statusBarHeight = barObj.statusBarHeight;
			this.navBarHeight = barObj.navBarHeight;
		},
		onShow() {
			// 获取登录人信息
			this.theLogonUser = this.$store.state.theLogonUser;
			console.log("this.theLogonUser", this.theLogonUser);
			let that = this;
			(async function() {
				// 接口：获取当前几个统计数据（关注、粉丝、积分等）
				await that.getMyStatisticsNum();

				// 接口，默认请求 我加入的组队
				that.getMomentsList({
					is_entry: 1, // 本人是否加入组队
					// 传参不全，当前只用到onload时候需要的字段
					page: that.theGetMomentsListPage,
					pagesize: that.theGetMomentsListPagesize,
					type: "组队/搭子",
				});
			})();

			// 记录当前的previousPage，用于二次点击发布回到原来页面
			this.$store.commit("changePreviousPage", {
				previousPage: 4,
				isPage_2: false,
			});

			// console.log('this.theLogonUser.level', this.theLogonUser.level);
		},
		// 监听下拉动作
		onPullDownRefresh() {
			let that = this;

			// 异步转同步调用
			(async function() {
				// 接口：获取当前几个统计数据（关注、粉丝、积分等）
				await that.getMyStatisticsNum();

				that.line_4_itemsSelected(0, "状态切换");
				// 等待接口返回后，取消下拉刷新动画
				uni.stopPullDownRefresh();
			})();
		},
		// 页面触底的监听事件，配合pages.json中的"onReachBottomDistance": 0，0的位置写距离底部的距离
		onReachBottom() {
			// 触底后动画效果开启
			this.isLoading = "loading";

			// 调用接口 line_4_items_index=0 为第一个的列表  1表示第二列的列表
			this.line_4_itemsSelected(this.line_4_items_index, "其他");
		},
		methods: {
			// 消息动画
			animtionAction: function() {
				let that = this;
				let animtionActionInter = setInterval(function() {
					that.$refs.theMessage.animtionAction();
				}, 1000);
				that.$store.commit("changeRedTip", {
					isRedTip: true,
				});

				setTimeout(function() {
					clearInterval(animtionActionInter);
				}, 5000);
			},

			// 收藏和点赞的切换按钮
			line_4_itemsSelected: function(index, type) {
				this.line_4_items_index = index;

				if (type == "状态切换") {
					// 只有在点击切换栏的时候，才重置
					this.theGetMomentsListPage = 1;
					this.school_datas = [];
					this.totalCount = 10;
				}

				if (index == 0) {
					// 接口，默认请求 我加入的组队
					this.getMomentsList({
						is_entry: 1, // 本人是否加入组队
						// 传参不全，当前只用到onload时候需要的字段
						page: this.theGetMomentsListPage,
						pagesize: this.theGetMomentsListPagesize,
						type: "组队/搭子",
					});
				} else {
					// 接口，默认请求 我加入的组队
					this.getMomentsList({
						is_thumb: 1, // 本人点赞过的
						// 传参不全，当前只用到onload时候需要的字段
						page: this.theGetMomentsListPage,
						pagesize: this.theGetMomentsListPagesize,
						type: "",
					});
				}
			},
			// 打开我的二维码
			openPopup_erweima: async function() {
				await this.getShareQrCode();
				this.$refs.erweima_popup.open();
			},
			// 关闭
			closePopup_erweima: function() {
				this.$refs.erweima_popup.close();
			},
			//------------------------------------------------  页面跳转  -----------------------------------------------------
			//------------------------------------------------  页面跳转  -----------------------------------------------------
			//------------------------------------------------  页面跳转  -----------------------------------------------------
			// 跳转主页
			topPerSonalhome: function(id) {
				uni.navigateTo({
					url: "/pages/follow/personalhome?id=" + id,
				});
			},
			// 跳转详情页
			toDetail: function(id) {
				uni.navigateTo({
					url: "/pages/index/detail?id=" + id,
				});
			},
			// 跳转个人主页
			toPersonal: function(level) {
				if (level != 0) {
					uni.navigateTo({
						url: "/pages/mine/personal?level=" + level,
					});
				} else {
					// 否则就让他先去注册
					let that = this;
					uni.showModal({
						title: "温馨提示：",
						content: "需要认证用户才能修改个人信息哦，点击“去认证”继续吧~",
						confirmText: "去认证",
						confirmColor: "#f89f12",
						showCancel: true,
						success: function(res) {
							if (res.confirm) {
								that.toRegister(0);
							} else if (res.cancel) {}
						},
					});
				}
			},
			// 跳转注册界面
			toRegister: function(level) {
				uni.navigateTo({
					url: "/pages/mine/register?level=" + level,
				});
			},
			// 跳转发布管理页面
			toMinePush: function(index) {
				if (index == 1) {
					uni.navigateTo({
						url: "/pages/mine/mine_push",
					});
				} else if (index == 2) {
					if (this.$store.state.theLogonUser.level != 0) {
						if (this.$store.state.theLogonUser.shop_id == 0) {
							uni.navigateTo({
								url: "/page_product/pages/mall/addMall",
							});
						} else if (this.$store.state.theLogonUser.shop_status == 1) {
							uni.navigateTo({
								url: "/page_product/pages/mall/index?id=" +
									this.$store.state.theLogonUser.shop_id +
									"&userId=" +
									this.$store.state.theLogonUser.id,
							});
						} else if (this.$store.state.theLogonUser.shop_status == 2) {
							uni.navigateTo({
								url: "/page_product/pages/mall/addMall?id=" +
									this.$store.state.theLogonUser.shop_id,
							});
						} else {
							uni.showToast({
								title: "工作室待审核",
								icon: "none",
							});
						}
					} else {
						this.$public.disabled_tip("工作室");
					}
				} else if (index == 3) {
					this.$public.disabled_tip("更多");
				} else {
					uni.navigateTo({
						url: "/page_product/pages/order/index",
					});
				}
			},
			//------------------------------------------------  接口请求  -----------------------------------------------------
			//------------------------------------------------  接口请求  -----------------------------------------------------
			//------------------------------------------------  接口请求  -----------------------------------------------------
			//获取我的二维码  返回：	文件流，base64加密，可以直接src里面显示
			getShareQrCode: function() {
				let _this = this;
				return new Promise(function(resolve, reject) {
					let that = _this;
					uni.request({
						url: that.$store.state.theUrl + "/wechat/sundry/getShareQrCode",
						method: "POST",
						header: {
							token: that.$store.state.theToken,
						},
						success: (res) => {
							// console.log('getShareQrCode', res);
							let _that = that;

							if (res.data.code == 0) {
								_that.erweima_img = res.data.data.img;

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
								(async function() {
									// 登录
									await __that.$store.dispatch("toLogon", {});
									// 重新获取登录人信息
									__that.theLogonUser = __that.$store.state.theLogonUser;

									// 获取省市数据
									__that.getShareQrCode();
								})();
							} else if (res.data.code == 411) {
								// let __that = _that;
								// uni.showModal({
								// 	title: '温馨提示：',
								// 	content: '需要认证用户才能申请个人邀请码，点击“去认证”继续吧~',
								// 	confirmText: '去认证',
								// 	confirmColor: '#f89f12',
								// 	showCancel: true,
								// 	success: function(res) {
								// 		if (res.confirm) {
								// 			__that.toRegister(0);
								// 		} else if (res.cancel) {
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
				});
			},

			//杂项统计数据，获取积分、粉丝数和点赞数
			getMyStatisticsNum: function() {
				let _this = this;
				return new Promise(function(resolve, reject) {
					let that = _this;
					uni.request({
						url: that.$store.state.theUrl + "/wechat/sundry/getMyStatisticsNum",
						method: "POST",
						header: {
							token: that.$store.state.theToken,
						},
						success: (res) => {
							// console.log('getMyStatisticsNum', res);
							let _that = that;

							if (res.data.code == 0) {
								_that.line_2_items[0].num = res.data.data.regard_num;
								_that.line_2_items[1].num = res.data.data.fans_num;
								_that.line_2_items[2].num = res.data.data.money_num;
								_that.line_2_items[3].num = res.data.data.score_num;
								_that.line_2_items[4].num = res.data.data.thumb_num;

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
								(async function() {
									// 登录
									await __that.$store.dispatch("toLogon", {});
									// 重新获取登录人信息
									__that.theLogonUser = __that.$store.state.theLogonUser;

									// 获取省市数据
									__that.getMyStatisticsNum();
									resolve();
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
				});
			},

			// 分页获取接口数据：没有再全局文件中放公共方法，是因为实际上传参都是不一致的，还是分开好
			getMomentsList: function(obj) {
				let _this = this;
				return new Promise(function(resolve, reject) {
					let that = _this;
					that.isLoading = "loading"; // 加载中
					// console.log(111);
					if (that.school_datas.length < that.totalCount) {
						uni.request({
							url: that.$store.state.theUrl + "/wechat/moments/getMomentsList",
							method: "POST",
							header: {
								token: that.$store.state.theToken,
							},
							data: obj,
							success: (res) => {
								// console.log('getMomentsList_res', res);
								let _that = that;
								// 如果是请求第一页，证明是首次请求，就重置一下
								if (_that.theGetMomentsListPage == 1) {
									_that.school_datas = [];

									// 只有第一次请求的时候，也就是页码是1的时候，赋值一下总条数
									_that.totalCount = res.data.count;
									// console.log('_that.totalCount', _that.totalCount);
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
						// console.log(222);
					}
				});
			},
		},
	};
</script>

<style>
	.erweima_popup-box {
		padding: 25px 0;
		width: 85vw;
		background-color: #ffffff;
		border-radius: 15px;
		display: flex;
		flex-direction: column;
		align-items: center;
	}

	.popup-erweima {
		width: 65vw;
		height: 65vw;
		margin-top: 25px;
	}

	.popup-erweima-title {
		font-size: 16px;
		font-weight: bold;
		margin-top: 25px;
	}

	.popup-erweima-content {
		margin-top: 10px;
		font-size: 14px;
		color: #f89f12;
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

	.bg {
		position: fixed;
		top: 0;
		width: 100vw;
		height: 110vw;
		background-image: linear-gradient(to bottom,
				#ffffff,
				#f4fcf5,
				#f4fcf5,
				#ffffff);
		z-index: -1;
	}

	.margin-left-10 {
		margin-left: 10px;
	}

	.the-line-1 {
		display: flex;
		flex-direction: row;
		padding: 3.5vw;
		width: 93vw;
	}

	.the-line-1-left {
		border-radius: 100%;
		width: 20vw;
		height: 20vw;
		background-repeat: no-repeat !important;
		background-size: cover !important;
		background-color: #fafefb;
	}

	.the-line-1-right {}

	.the-line-1-right-top {
		width: 73vw;
		margin-top: 10px;
		display: flex;
		flex-direction: row;
		align-items: center;
		justify-content: space-between;
	}

	.the-line-1-right-top-left {
		margin-left: 15px;
	}

	.the-line-1-right-top-left-name {
		font-size: 20px;
		font-weight: bold;
	}

	.the-line-1-right-top-left-num {
		font-size: 12px;
		margin-top: 10px;
		color: #727272;
	}

	.erweima {
		width: 7vw;
		height: 7vw;
	}

	.the-line-1-right-bottom {
		display: flex;
		flex-direction: row;
		align-items: center;
		margin-left: 15px;
		flex-wrap: nowrap;
		overflow: scroll;
	}

	.the-line-1-right-bottom-school {
		display: flex;
		flex-direction: row;
		align-items: center;
		text-align: center;
		padding: 3px 10px;
		background-color: #ecf3ee;
		border-radius: 100px;
		margin-top: 15px;
	}

	.the-line-1-right-bottom-school image {
		width: 4vw;
		height: 4vw;
		margin-right: 5px;
	}

	.the-line-1-right-bottom-school view {
		font-size: 12px;
		color: #727272;
	}

	.the-line-2 {
		margin-top: 15px;
		display: flex;
		flex-direction: row;
		align-items: center;
		justify-content: space-around;
	}

	.the-line-2-item {
		display: flex;
		flex-direction: column;
		align-items: center;
	}

	.the-line-2-item-num {
		font-size: 18px;
		font-weight: bold;
	}

	.the-line-2-item-name {
		margin-top: 10px;
		font-size: 12px;
		color: #727272;
	}

	.the-line-3 {
		display: flex;
		flex-direction: column;
		width: 100vw;
		margin-top: 5.5vw;
		border-top-left-radius: 20px;
		border-top-right-radius: 20px;
		box-shadow: #e9f0ea 0 -5px 15px 0;
		background-color: #ffffff;
	}

	.the-line-3-top {
		display: flex;
		flex-direction: row;
		align-items: center;
		justify-content: space-around;
		margin-top: 3.5vw;
	}

	.the-line-3-top-item {
		display: flex;
		flex-direction: column;
		align-items: center;
		margin-top: 3vw;
	}

	.the-line-3-top-item image {
		width: 6.5vw;
		height: 6.5vw;
	}

	.the-line-3-top-item view {
		font-size: 12px;
		margin-top: 5px;
	}

	.the-line-3-bottom {
		width: 93vw;
		height: 25vw;
		margin: 3.5vw 3.5vw 0vw 3.5vw;
	}

	.the-line-4 {
		display: flex;
		flex-direction: row;
		width: 100vw;
		border-bottom: #f3f3f3 1px solid;
		background-color: #ffffff;
	}

	.the-line-4-item {
		display: flex;
		flex-direction: column;
		align-items: center;
		width: 50%;
	}

	.the-line-4-item-selected {
		color: #000000 !important;
	}

	.the-line-4-item-name {
		color: #bbbbbb;
		margin-top: 4.5vw;
	}

	.the-line-4-item-line {
		width: 25%;
		height: 3px;
		background-color: #f89f12;
		border-radius: 100px;
		margin-top: 3.5vw;
	}

	.the-line-5 {
		display: flex;
		flex-direction: column;
		align-content: flex-start;
	}

	.posts-data {
		width: 93vw !important;
	}

	.space-line-bottom {
		height: 180px;
	}
</style>