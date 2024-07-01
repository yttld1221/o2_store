import Vue from "vue"
import Vuex from "vuex"
Vue.use(Vuex);

export default new Vuex.Store({
	state: {
		isOnload: false,
		sceneId: 0,
		// 接口前缀
		// theUrl: 'https://school.izekai.cn',
		theUrl: 'https://api2.allinnb.com',
		// WSS接口前缀
		theWssUrl: 'wss://api2.allinnb.com/wss',
		isclose: false, // 是否已连接
		// 每次传图片的临时存储
		tempImageUrl: [
			// {
			// 	url: '',
			// 	uuid: 0
			// }
		],
		// 个人主页数据（临时存储）
		homePageData: {

		},


		// 点赞是否成功
		is_thumb_true: false,
		// 关注是否成功
		is_regard_true: false,
		// 加入组队是否成功
		is_entry_true: false,
		// 收藏是否成功
		is_collection_true: false,

		// 发布管理页面调用发布是否成功
		isOn_true: false,
		// 消息的红点提示
		isRedTip: false,

		// 是否发送了验证码  0表示没发送，发送的话，重置为59
		codeSecond: 0,

		// 登录token
		theToken: '',
		// 登录信息
		theLogonUser: {
			is_sale: 1, //是否是销售员，1-是，2-否
			is_buy_vip: 1, //是否购买vip套餐，1-是，2-否，通过该字段判读购买
			birthday: "", //生日
			specialty: "", //学生专业，我的个人中心有用
			shop_id: 0, //开的店铺id,0-代表未开店
			vip_expire_at: "", // vip到期日期
			ignore_type: "", // 忽略的校园墙类型，多个用逗号拼接，话题、组队/搭子、分享/安利、二手闲置、兼职、表白、求助、其他
			buy_vip_at: "", // 购买vip套餐的日期
			vip_task_id: 0, // vip会员套餐的活动id
			allow_publish: 1, //是否允许发布校园墙，1-是，2-否
			intro: "", // 自我介绍
			id: 0,
			is_sale: 1,
			name: "", //姓名
			nick_name: "不愿意透露姓名的唐马儒先生", // 昵称  
			avatar_url: "https://schoolwx.oss-cn-hangzhou.aliyuncs.com/school/img/20230518/1684378586065116.png", //头像
			openid: "",
			unionid: "",
			sex: "", // 性别
			school_id: 0,
			school_ids: null,
			school_name: '学校不详，遇强则"降"▼ω▼',
			school_names: [{
				id: 1,
				name: ''
			}],
			phone: "",
			level: 0,
			create_id: 1,
			update_id: 1,
			pid: 0, // 推荐人id
			cert_url: "", //学生证url
			grad_date: null, //毕业日期
			logon_time: null, //注册时间
			verify_status: 0, //审核状态：0-无需处理(默认)，1-待审核，2-审核通过，3-被拒绝，4-锁定(毕业半年以上)
			verify_time: null, //审核时间
			created_at: "2023-03-16 14:16:16",
			updated_at: "2023-03-16 14:18:26",
			deleted_at: null
		},

		// 当前打开的帖子详情页内容（全局方法中似乎return 和 resove（）冲突）
		theDetailData: {},

		// 为了达到二次点击发布 回到上一个tab页面
		previousPage: 0, // 表示首页 一次类推
		isPage_2: false, //当前是不是发布页面，配合上面的字段用的

		// 顶部状态栏
		statusBarHeight: 0,
		// 导航标题栏
		navBarHeight: 0,
		// 底部tabbar高度
		tabBarHeight: 0,

		// 当前选择的地址，用于index首页
		store_addressNow: {
			title: "",
			status: 0,
			code: ""
		},

		// 当前发布组队活动的地址，用于register认证页面
		store_addressRegister: {
			title: "",
			status: 0,
			code: ""
		},

		// 当前发布组队活动的地址，用于push发布页面
		store_addressPush: {
			title: "",
			status: 0,
			code: ""
		},

		// 当前选择的学校
		store_schoolNow: {
			addr: '',
			create_id: 0,
			created_at: '',
			id: 0,
			title: '', // 接口返回的是name,这里统一改成title
			status: 0,
			update_id: 0,
			updated_at: '',
		},

		// 选中的地址区域,发布的时候，选择公开范围的字段
		theSelectedranges: [],

		// 用于修改昵称的全局传参
		theNickName: ''
	},
	mutations: {
		changeTheLogonUser: function (state, payload) {
			state.theLogonUser = payload.theLogonUser;
			state.theToken = payload.theToken;
			uni.setStorageSync('token', payload.theToken);
		},
		setScene: function (state, payload) {
			state.sceneId = payload;
		},
		changeOnload: function (state, payload) {
			state.isOnload = payload;
		},
		changeTheLogonUser_register: function (state, payload) {
			state.theLogonUser.level = payload.level;
			state.theToken = payload.theToken;
			state.theLogonUser.avatar_url = payload.avatar_url;
			state.theLogonUser.nick_name = payload.nick_name;
		},

		// 认证的验证码发送后，重置为59
		changecodeSecond: function (state, payload) {
			state.codeSecond = payload.codeSecond;
		},

		// 设置状态栏和标题栏高度
		changePreviousPage: function (state, payload) {
			state.previousPage = payload.previousPage;
			state.isPage_2 = payload.isPage_2;
		},

		// 消除红点提示
		changeRedTip: function (state, payload) {
			state.isRedTip = payload.isRedTip;
		},


		// 设置状态栏和标题栏高度
		changeNavBarHeight: function (state, payload) {
			state.statusBarHeight = payload.statusBarHeight;
			state.navBarHeight = payload.navBarHeight;
			state.tabBarHeight = payload.tabBarHeight;
		},
		// 改变当前选择的地址
		changeStore_addressNow: function (state, payload) {
			state.store_addressNow.title = payload.tempSelectedAddress.title;
			state.store_addressNow.status = payload.tempSelectedAddress.status;
			state.store_addressNow.code = payload.tempSelectedAddress.code;
		},
		// 改变当前选择的地址（认证页面）
		changeStore_addressRegister: function (state, payload) {
			state.store_addressRegister.title = payload.tempSelectedAddress.title;
			state.store_addressRegister.status = payload.tempSelectedAddress.status;
			state.store_addressRegister.code = payload.tempSelectedAddress.code;
		},
		// 改变当前选择的地址（发布页面）
		changeStore_addressPush: function (state, payload) {
			state.store_addressPush.title = payload.tempSelectedAddress.title;
			state.store_addressPush.status = payload.tempSelectedAddress.status;
			state.store_addressPush.code = payload.tempSelectedAddress.code;
		},
		// 改变当前选择的地址
		changeStore_schoolNow: function (state, payload) {
			state.store_schoolNow.id = payload.id;
			// 注意 tempSelectedSchool 中的name改成了title
			state.store_schoolNow.title = payload.title;
			state.store_schoolNow.status = payload.status;
			state.store_schoolNow.addr = payload.addr;
			state.store_schoolNow.create_id = payload.create_id;
			state.store_schoolNow.update_id = payload.update_id;
		},
		// 改变公开范围选择
		changeTheSelectedranges: function (state, payload) {
			state.theSelectedranges = payload.theSelectedranges;
		},
		//重置
		changeTempImageUrl: function (state, payload) {
			state.tempImageUrl = [];
		},
		//
		changeNickName: function (state, payload) {
			state.theNickName = payload.nick_name
		}
	},

	// ----------------------------------------------注意：----------------------------------------------
	// ----------------------------------------------注意：----------------------------------------------
	// content 是专门指当前页面的上下文的，本页面的数据调用，使用content代替this.$store
	// ----------------------------------------------注意：----------------------------------------------
	// ----------------------------------------------注意：----------------------------------------------
	actions: {
		// 登录(含两层，第一层是登录微信获取code,第二层是调用服务端的正式登录接口)
		toLogon: function (content, payload) {
			let _this = this;
			return new Promise(function (resolve, reject) {
				// 这是登录方法，uniapp整合过了的（微信小程序也适用）
				uni.login({
					provider: 'weixin', //使用微信登录
					success: function (loginRes) { // loginRes拿到code
						// console.log('loginRes', loginRes);
						let that = _this;
						let code = loginRes.code;
						// 调用登录接口，服务端正真的登录接口
						uni.request({
							url: content.state.theUrl + '/wechat/wx/login',
							// url:'https://school.izekai.cn/wechat/wx/login',
							method: 'POST',
							data: {
								// 测试数据 前端获取的微信登入code，1-普通会员，2-认证会员，0-游客
								code: code
								// code: 2 
							},
							success: (res) => {
								let __that = that;
								// console.log('toLogon_res',res);
								// 接口返回两个东西，一个是登录人信息，一个是token  
								if (res.data.code == 0) {
									content.commit('changeTheLogonUser', {
										theLogonUser: res.data.data.user,
										theToken: res.data.data.token
									})
									content.dispatch('startWs', {})
									// console.log('theLogonUser',content.state.theLogonUser);
									// console.log('theToken',content.state.theToken);

									resolve();
								} else if (res.data.code == 500) {
									uni.showToast({
										title: '服务器连接失败，请反馈官方客服哦~',
										duration: 2500,
										icon: 'none'
									})
								} else {
									uni.showToast({
										title: res.data.msg,
										duration: 2500,
										icon: 'none'
									})
								}
							},
							fail: (res) => {
								uni.showToast({
									title: '网络失败，请重试！多次无效后，反馈官方客服哦！',
									duration: 2500,
									icon: 'none'
								})
							}
						})
					},
					fail: (res) => {
						uni.showToast({
							title: '微信登录失败，请重试！',
							duration: 2500,
							icon: 'none'
						})
					}
				});
			})
		},

		// 点赞
		toThumb: function (content, payload) {
			let _this = this;
			return new Promise(function (resolve, reject) {
				// 调用登录接口，服务端正真的登录接口
				uni.request({
					url: content.state.theUrl + '/wechat/moments/thumb',
					method: 'POST',
					header: {
						token: content.state.theToken
					},
					data: {
						moments_id: payload.id
					},
					success: (res) => {
						let that = _this;
						// console.log('toThumb_res',res);
						if (res.data.code == 0) {
							// 给上面的is_thumb_true赋值，表示操作成功了
							content.state.is_thumb_true = true;

							resolve();
						} else if (res.data.code == 500) {
							uni.showToast({
								title: '服务器连接失败，请反馈官方客服哦~',
								duration: 2500,
								icon: 'none'
							})
							content.state.is_thumb_true = false;
						} else if (res.data.code == 410) {
							let __that = that;
							// 异步转同步，
							(async function () {
								// 登录
								await __that.$store.dispatch('toLogon', {});

								// 重新点赞
								__that.toThumb();
							})()
						} else {
							uni.showToast({
								title: res.data.msg,
								duration: 2500,
								icon: 'none'
							})
							content.state.is_thumb_true = false;
						}
					},
					fail: (res) => {
						uni.showToast({
							title: '网络失败，请重试！多次无效后，反馈官方客服哦！',
							duration: 2500,
							icon: 'none'
						})
						content.state.is_thumb_true = false;
					}
				})
			})
		},
		// 收藏帖子
		toCollection: function (content, payload) {
			let _this = this;
			return new Promise(function (resolve, reject) {
				// 调用登录接口，服务端正真的登录接口
				uni.request({
					url: content.state.theUrl + '/wechat/moments/collection',
					method: 'POST',
					header: {
						token: content.state.theToken
					},
					data: {
						moments_id: payload.id
					},
					success: (res) => {
						let that = _this;
						// console.log('toCollection_res',res);
						if (res.data.code == 0) {
							// 给上面的is_thumb_true赋值，表示操作成功了
							content.state.is_collection_true = true;

							resolve();
						} else if (res.data.code == 500) {
							uni.showToast({
								title: '服务器连接失败，请反馈官方客服哦~',
								duration: 2500,
								icon: 'none'
							})
							content.state.is_collection_true = false;
						} else if (res.data.code == 410) {
							let __that = that;
							// 异步转同步，
							(async function () {
								// 登录
								await __that.$store.dispatch('toLogon', {});

								// 重新收藏
								__that.toCollection();
							})()
						} else {
							uni.showToast({
								title: res.data.msg,
								duration: 2500,
								icon: 'none'
							})
							content.state.is_collection_true = false;
						}
					},
					fail: (res) => {
						uni.showToast({
							title: '网络失败，请重试！多次无效后，反馈官方客服哦！',
							duration: 2500,
							icon: 'none'
						})
						content.state.is_collection_true = false;
					}
				})
			})
		},
		// 关注（ta）
		toRegard: function (content, payload) {
			let _this = this;
			return new Promise(function (resolve, reject) {
				// 调用登录接口，服务端正真的登录接口
				uni.request({
					url: content.state.theUrl + '/wechat/wx/regard',
					method: 'POST',
					header: {
						token: content.state.theToken
					},
					data: {
						to_user_id: payload.id
					},
					success: (res) => {
						let that = _this;
						// console.log('toThumb_res',res);
						if (res.data.code == 0) {
							// 给上面的is_thumb_true赋值，表示操作成功了
							content.state.is_regard_true = true;

							resolve();
						} else if (res.data.code == 500) {
							uni.showToast({
								title: '服务器连接失败，请反馈官方客服哦~',
								duration: 2500,
								icon: 'none'
							})
							content.state.is_thumb_true = false;
						} else if (res.data.code == 410) {
							let __that = that;
							// 异步转同步，
							(async function () {
								// 登录
								await __that.$store.dispatch('toLogon', {});

								// 重新点赞
								__that.toRegard();
							})()
						} else {
							uni.showToast({
								title: res.data.msg,
								duration: 2500,
								icon: 'none'
							})
							content.state.is_thumb_true = false;
						}
					},
					fail: (res) => {
						uni.showToast({
							title: '网络失败，请重试！多次无效后，反馈官方客服哦！',
							duration: 2500,
							icon: 'none'
						})
						content.state.is_thumb_true = false;
					}
				})
			})
		},
		// 加入组队
		toEntry: function (content, payload) {
			let _this = this;
			return new Promise(function (resolve, reject) {
				// 调用登录接口，服务端正真的登录接口
				uni.request({
					url: content.state.theUrl + '/wechat/moments/momentsEntry',
					method: 'POST',
					header: {
						token: content.state.theToken
					},
					data: {
						moments_id: payload.id
					},
					success: (res) => {
						let that = _this;
						// console.log('toEntry_res',res);
						if (res.data.code == 0) {
							// 给上面的is_entry_true赋值，表示操作成功了
							content.state.is_entry_true = true;

							resolve();
						} else if (res.data.code == 500) {
							uni.showToast({
								title: '服务器连接失败，请反馈官方客服哦~',
								duration: 2500,
								icon: 'none'
							})
							content.state.is_entry_true = false;
						} else if (res.data.code == 410) {
							let __that = that;
							// 异步转同步，
							(async function () {
								// 登录
								await __that.$store.dispatch('toLogon', {});

								// 重新加入
								__that.toEntry();
							})()
						} else {
							uni.showToast({
								title: res.data.msg,
								duration: 2500,
								icon: 'none'
							})
							content.state.is_entry_true = false;
						}

						resolve();
					},
					fail: (res) => {
						uni.showToast({
							title: '网络失败，请重试！多次无效后，反馈官方客服哦！',
							duration: 2500,
							icon: 'none'
						})
						content.state.is_entry_true = false;

						resolve();
					}
				})
			})
		},
		// 上线/下线 帖子
		upDownMyMoments: function (content, payload) {
			let that = this;
			return new Promise(function (resolve, reject) {
				// 调用登录接口，服务端正真的登录接口
				uni.request({
					url: content.state.theUrl + '/wechat/moments/upDownMyMoments',
					method: 'POST',
					header: {
						token: content.state.theToken
					},
					data: {
						moments_id: payload.id,
						is_on: payload.is_on // 上下线，1-上线（默认），2-下线
					},
					success: (res) => {
						// console.log('upDownMyMoments_res',res);
						if (res.data.code == 0) {
							uni.showToast({
								title: (payload.is_on == 1 ? '发布' : '下线') + '成功',
								duration: 500,
								icon: 'none'
							})
							if (payload.type == '发布管理') {
								// 注意发布管理点击上下线成功后，返回一个全部变量用于通知调用的页面
								content.state.isOn_true = true;
							} else {
								uni.$emit("publishSchool", {});
								setTimeout(function () {
									uni.switchTab({
										url: "/pages/index/index",
									});
								}, 600);
							}
							resolve();
						} else if (res.data.code == 500) {
							uni.showToast({
								title: '服务器连接失败，请反馈官方客服哦~',
								duration: 2500,
								icon: 'none'
							})
						} else if (res.data.code == 410) {
							let __that = that;
							// 异步转同步，
							(async function () {
								// 登录
								await __that.$store.dispatch('toLogon', {});

								// 重新上下线
								__that.upDownMyMoments();
							})()
						} else {
							uni.showToast({
								title: res.data.msg,
								duration: 2500,
								icon: 'none'
							})
						}
					},
					fail: (res) => {
						uni.showToast({
							title: '网络失败，请重试！多次无效后，反馈官方客服哦！',
							duration: 2500,
							icon: 'none'
						})
						content.state.is_thumb_true = false;

						resolve();
					}
				})
			})
		},
		// 获取帖子详情：用于列表查看（他人，通用）
		getMomentInfo: function (content, payload) {
			let that = this;
			return new Promise(function (resolve, reject) {
				// 调用登录接口，服务端正真的登录接口
				uni.request({
					url: content.state.theUrl + '/wechat/moments/getMomentInfo',
					method: 'POST',
					header: {
						token: content.state.theToken
					},
					data: {
						moments_id: payload.id,
					},
					success: (res) => {
						// console.log('getMomentInfo_res',res);
						if (res.data.code == 0) {
							content.state.theDetailData = res.data.data;
							// console.log('content.state.theDetailData',content.state.theDetailData);
							resolve();
						} else if (res.data.code == 500) {
							uni.showToast({
								title: '服务器连接失败，请反馈官方客服哦~',
								duration: 2500,
								icon: 'none'
							})
						} else if (res.data.code == 410) {
							let __that = that;

							// 异步转同步
							(async function () {
								// 登录
								await __that.$store.dispatch('toLogon', {});

								// 重新请求接口
								__that.getMomentInfo();
							})()
						} else {
							uni.showToast({
								title: res.data.msg,
								duration: 2500,
								icon: 'none'
							})
						}
					},
					fail: (res) => {
						uni.showToast({
							title: '网络失败，请重试！多次无效后，反馈官方客服哦！',
							duration: 2500,
							icon: 'none'
						})
						content.state.is_thumb_true = false;

						resolve();
					}
				})
			})
		},
		// 获取个人主页
		getHomePageTop: function (content, payload) {
			let that = this;
			return new Promise(function (resolve, reject) {
				// 调用登录接口，服务端正真的登录接口
				uni.request({
					url: content.state.theUrl + '/wechat/wx/getHomePageTop',
					method: 'POST',
					header: {
						token: content.state.theToken
					},
					data: {
						user_id: payload.id,
					},
					success: (res) => {
						// console.log('getHomePageTop_res',res);
						if (res.data.code == 0) {
							content.state.homePageData = res.data.data;
							resolve();
						} else if (res.data.code == 500) {
							uni.showToast({
								title: '服务器连接失败，请反馈官方客服哦~',
								duration: 2500,
								icon: 'none'
							})
						} else if (res.data.code == 410) {
							let __that = that;

							// 异步转同步
							(async function () {
								// 登录
								await content.dispatch('toLogon', {});

								// 重新请求接口  没用的，因为用户ID丢失了，这个时候直接跳回主页吧
								// __that.getHomePageTop();

								uni.showModal({
									title: '哦买嘎!',
									content: '找不到这个"孩纸"了，返回首页找找吧~',
									confirmText: '前往首页',
									confirmColor: '#f89f12',
									showCancel: false,
									success: function (res) {
										if (res.confirm) {
											uni.switchTab({
												url: '/pages/index/index'
											});
										}
									}
								});
							})()
						} else {
							uni.showToast({
								title: res.data.msg,
								duration: 2500,
								icon: 'none'
							})
						}
					},
					fail: (res) => {
						uni.showToast({
							title: '网络失败，请重试！多次无效后，反馈官方客服哦！',
							duration: 2500,
							icon: 'none'
						})
						content.state.is_thumb_true = false;

						resolve();
					}
				})
			})
		},
		// 上传图片
		upLoadImage: function (content, payload) {
			let that = this;
			return new Promise(function (resolve, reject) {
				// 调用登录接口，服务端正真的登录接口
				uni.request({
					url: content.state.theUrl + '/wechat/sundry/getOssUploadSign',
					method: 'POST',
					header: {
						token: content.state.theToken
					},
					data: {
						// 类型：img(默认)，video-视频
						type: payload.type
					},
					success: (res) => {
						// console.log('upLoadImage_res', res);
						// res.data.data = {
						// 	accessid: "LTAI5t6v8fP1peq8vV62LjBR"
						// 	callback: "eyJjYHQLWZvcm0t.....dXJsZW5jb2RlZCJ9",
						// 	dir: "school/img/v2/20240322/",
						// 	expire: 1711119285,
						// 	host: "https://schoolwx.oss-cn-hangzhou.aliyuncs.com",
						// 	policy: "eyJleHBpcmF0aW9uMtd2l0aCIsIiRrZXkiLC......JzY2hvb2xcL2ltZ1wvdjJcLzIwMjQwMzIyXC8iXV19",
						// 	signature: "vfLy5TcfuwaTTGICwTmrMIg/Vk8="
						// }
						// console.log('content.state.theLogonUser.id',content.state.theLogonUser.id);
						if (res.data.code == 0) {

							// 每次调用的时候清空一下，反正调用成功后，会回调回去加一次的
							content.state.tempImageUrl = [];
							// console.log('payload',payload);
							for (let i = 0; i < payload.tempFilePaths.length; i++) {
								// console.log('i',i);
								uni.uploadFile({
									url: res.data.data.host,
									filePath: payload.tempFilePaths[i],
									name: 'file',
									formData: {
										key: res.data.data.dir + payload.name[i] + '_' + content.state.theLogonUser.id + '.' + payload.tempFiles[i].extname, // 这里传过来的是时间，格式示例：2024-03-22_23:15:04
										policy: res.data.data.policy,
										OssAccessKeyId: res.data.data.accessid,
										success_action_status: '200',
										signature: res.data.data.signature
									},
									success: (uploadFileRes) => {
										// console.log('uploadFileRes', uploadFileRes);
										if (uploadFileRes.statusCode == 200) {
											content.state.tempImageUrl.push({
												url: res.data.data.host + '/' + res.data.data.dir + payload.name[i] + '_' + content.state.theLogonUser.id + '.' + payload.tempFiles[i].extname,
												uuid: payload.tempFiles[i].uuid
											})

											// console.log('content.state.tempImageUrl',content.state.tempImageUrl);

											if (i == payload.tempFilePaths.length - 1) {
												resolve();
											}
										} else {
											uni.showToast({
												title: '错误:' + uploadFileRes.statusCode + ':' + uploadFileRes.errMsg,
												duration: 2500,
												icon: 'none'
											})
											// 失败就重置下
											content.state.tempImageUrl = [];
											// content.state.tempImageUrl.url = '';
											// content.state.tempImageUrl.uuid = 0;
										}
									},
									fail: (res) => {
										uni.showToast({
											title: '上传失败,方法错误!',
											duration: 2500,
											icon: 'none'
										})
										// 失败就重置下
										content.state.tempImageUrl = [];
										// content.state.tempImageUrl.url = '';
										// content.state.tempImageUrl.uuid = 0;
									}
								});
							}
						} else if (res.data.code == 500) {
							uni.showToast({
								title: '服务器连接失败，请反馈官方客服哦~',
								duration: 2500,
								icon: 'none'
							})
						} else if (res.data.code == 410) {
							let __that = that;
							// 异步转同步，
							(async function () {
								// 登录
								await content.dispatch('toLogon', {});


								uni.navigateBack();
								// 重新调用没用，因为需要选择图片的操作，不然无法传参
								// __that.upLoadImage();
								uni.showToast({
									title: '很抱歉(^■^*)，页面过期，已为您重新刷新~',
									duration: 2500,
									icon: 'none'
								})
							})()
						} else {
							uni.showToast({
								title: res.data.msg,
								duration: 2500,
								icon: 'none'
							})
						}
					},
					fail: (res) => {
						uni.showToast({
							title: '网络失败，请重试！多次无效后，反馈官方客服哦！',
							duration: 2500,
							icon: 'none'
						})

						resolve();
					}
				})
			})
		},

		// 消息动画
		animtionAction: function (content, payload) {
			let _payload = payload;
			let animtionActionInter = setInterval(function () {
				_payload.animtionAction
			}, 1000)
			content.state.isRedTip = true;


			setTimeout(function () {
				clearInterval(animtionActionInter)
			}, 5000)
		},
		// 开启ws
		startWs: (content, payload) =>{
			// let param = {
			//   data: {
			//     to_user_id: 84,
			//     msg: "你好啊.ggg",
			//   },
			//   cmd: "ws:sendChatMsg",
			// };
			// this.$store.dispatch("sendMessage", {
			//   message:JSON.stringify(param) ,
			//   type: "user",
			// });
			if (content.state.theToken) {
				uni.connectSocket({
					url: content.state.theWssUrl,
					success: (res) => {
						console.log('连接成功', res);
					},
					fail: (err) => {
						console.log('err', err);
					},
				});
				const heartbeatInterval = 30 * 1000;
				let  heartbeatTimer=''
				uni.onSocketOpen((res) => {
					console.log('打开链接')
					let param = {
						data: {
							"token": content.state.theToken
						},
						cmd: "ws:login",
					}
					uni.sendSocketMessage({
						data: JSON.stringify(param), // 这里填写你要发送的数据
						complete: function (res) {
							console.log('发送成功', res);
						}
					});
				
					// 开始定时发送心跳
					heartbeatTimer = setInterval(() => {
						let param ={
						  "data":{
							"data":"ping"
						  },
						  "cmd":"ws:ping"
						};
					  uni.sendSocketMessage({
					    data: JSON.stringify(param), // 心跳内容，根据服务器要求可能是特定格式
					    success: function () {
					      console.log('心跳发送成功');
					    },
					    fail: function () {
					      console.log('心跳发送失败');
					    }
					  });
					}, heartbeatInterval);
				})

				// 监听服务器消息
				uni.onSocketMessage((res) => {
					console.log("收到服务器消息1:", res.data)
					if(res.data!='Opened'){
						console.log("收到服务器消息:", JSON.parse(res.data));	
					}
				});
				//发生了错误事件
				uni.onSocketError(function () {
					console.log("websocket发生了错误");
				});
				// 监听关闭连接，清除定时器
				uni.onSocketClose((res) => {
				  clearInterval(heartbeatTimer);
				});
			}

		},
		// 发送消息
		sendMessage: function (content, payload) {
			console.log(222)
			uni.sendSocketMessage({
				data: payload.message,
				success: (res) => {
					console.log('消息发送成功', res);
				},
				fail: (err) => {
					console.log('消息发送失败', err);
				}
			});
		},
	}
})