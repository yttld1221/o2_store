<template>
	<view class="content">
		<!-- 内容 -->
		<view class="posts-data">
			<post-type-zudui @toThumb="toThumb" @zuduiButtons="zuduiButtons" @topPerSonalhome="topPerSonalhome"
				@actionMore="actionMore"
				:isDetail="true" :postsDataOneIndex="1" :theData="detailData"></post-type-zudui>
		</view>

		<!-- 评论区域 -->
		<view class="comment">
			<view class="comment-title">精彩评论</view>
			<view class="comment-one" v-for="(item,index) in theComments">
				<!-- 头像 -->
				<view @click="topPerSonalhome(item.create_id)" class="comment-one-avatar" :style="'background: url('+item.avatar_url+');'"></view>
				<!-- 内容 -->
				<view class="comment-one-content">
					<view class="comment-one-content-line-1">
						<!-- 名字和时间 -->
						<view class="comment-one-content-line-1-left">
							<view class="left-name">{{item.nick_name}}</view>
							<view v-if="theComments.length > 0" class="left-time">{{showDateTime(item)}}</view>
							<!-- <view class="left-time">{{item.created_at != '刚刚'?$public.showDateTime(item.created_at):'刚刚'}}</view> -->
						</view>
						<!-- 点赞 -->
						<view @click="commentThumb(item,index)" class="comment-one-content-line-1-right">
							<view class="right-num" :style="item.is_thumb == 2?'#000000':'color: #ff6155;'">{{item.thumb_num}}</view>
							<uni-icons type="hand-up" :color="item.is_thumb == 2?'#000000':'#ff6155'" size="20"></uni-icons>
						</view>
					</view>
					<view class="comment-one-content-line-2">{{item.msg}}</view>
				</view>
			</view>
		</view>
		<!-- 底部间隔 -->
		<view class="space-line-bottom">
			<uni-load-more :status="loading"></uni-load-more>
		</view>
		<!-- 评论输入框 -->
		<view class="comment-input" :style="'bottom:'+0+'px;'">
			<uni-easyinput v-model="theInputComment" confirmType="send" placeholder="想要说点什么（￣ー+￣）..." :inputBorder="false" />
			<view @click="toComment" class="comment-button">发送</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				// 底部显示加载中的动画效果  more表示加载前，loading表示加载中，no-more表示没有更多数据
				isLoading: 'loading',
				
				// 由于接口分也逻辑，如果拿完的是最后一页，下一页是会报错的，所以需要知道当前是否是最后一页，否则不允许调用接口的
				totalCount:11, // 初始值必须大于theGetCommentListPagesize

				theGetCommentListPage: 1,
				theGetCommentListPagesize: 10,

				// 详情页数据
				detailData: {
					// 该字段只有详情页才有
					content: "这是一段描述的内容，也就是活动的详情内容，但是只有详情页才有这个字段。",
					// 该字段只有详情页才有
					members: [{
							id: "1",
							nick_name: "黄",
							avatar_url: "https://schoolwx.oss-cn-hangzhou.aliyuncs.com/school/img/20230513/168394053478518.png"
						}
					],
					//------------------------------------------------------------------------------------------------------------------------
					id: 1,
					title: "欢迎来到氧气仓库官方资讯，这里有最前沿的校园资讯分享，快来和我一起看看吧～",
					url: "https://schoolwx.oss-cn-hangzhou.aliyuncs.com/school/img/20230518/1684379049443118.png,https://schoolwx.oss-cn-hangzhou.aliyuncs.com/school/img/20230518/1684379049443118.png", // 图片，多张用英文的逗号隔开
					pid: 0,
					is_on: 1, // 是否是上线状态，1表示是，2表示否
					is_hot: 2, // 是否是热门，1表示是，2表示否
					school_id: 3, // 发布人所在学校ID
					type: "组队/搭子", //类型有：话题、组队/搭子、分享/安利、二手闲置、兼职、表白、求助、其他
					label: "#打球,#吃喝玩,#看电影,#看电影,#看电影,#看电影,#看电影,#看电影,#看电影", // 标签，多个用英文的逗号隔开
					is_anonymous: 1, // 是否匿名 1表示是，2表示不匿名
					wages: "", // 兼职用的，工资金额或者显示"面议"
					settlement: "", // 工资结算方式  用/拼接
					hope_num: 10, // 组队的期望人数
					free_type: "AA", // 组队的费用类型  免费/AA
					is_entry: 1, // 本人是否报名组队，1是，2否
					area_code: "640100", // 活动区地区代码
					task_id: 0, // 关联的活动ID
					created_at: "2021-05-18 11:05:13", // 第一次插入时间
					released_at: "2021-03-11 16:05:13", // 发布时间
					create_id: 50, // 发布人ID
					sex_type: "不限", // 组队的性别要求
					start_at: "2021-03-15", // 组队活动开始日期
					end_at: "2021-03-17", // 组队活动结束日期
					is_regard: 2, // 本人是否点关注 1是2否
					is_thumb: 2, // 本人是否点过赞 1是2否
					thumb_num: 1, // 点赞数
					comment_num: 0, // 评论数
					entry_num: 3, // 实际报名人数
					nick_name: "氧*",
					avatar_url: "https://schoolwx.oss-cn-hangzhou.aliyuncs.com/school/img/20230518/1684378586065116.png",
					school_name: "宁波大学",
					area_name: "银川市"
				},


				// 要发布的评论
				theInputComment: '',
				// 评论
				theComments: [
					{
						id: 1,
						moments_id: 1,
						msg: "。",
						create_id: 1,
						created_at: "",
						thumb_num: 0,
						is_thumb: 1, // 本人是否点赞过 1是2否
						nick_name: "",
						avatar_url: ""
					}
				]
			}
		},
		onLoad(option) {

			// --------------------------------------------------------------调用初始数据--------------------------------------------------------------
			// --------------------------------------------------------------调用初始数据--------------------------------------------------------------
			// --------------------------------------------------------------调用初始数据--------------------------------------------------------------
			// 调用详情接口
			// 重定向
			let that = this;
			// 异步转同步调用
			(async function() {
				console.log('option',option);
				// 存再index.js的公共方法，调用帖子详情（接口中把详情内容赋值给了index.js的全局变量theDetailData）
				await that.$store.dispatch('getMomentInfo', {
					id: option.id
				});
				// 本页面赋值
				that.detailData = that.$store.state.theDetailData;
				// console.log('that.detailData', that.detailData);

				// 获取评论列表（第一页的）
				that.getCommentList();
			})()


		},
		// 监听下拉动作
		onPullDownRefresh() {
			let that = this;
			// 重置获取的页码
			that.theGetCommentListPage = 1;
			
			// 重置评论数组
			that.theComments = [];
			
			// 重置输入框内容
			that.theInputComment ='';
			
			// 重置总条数
			that.totalCount = 11;
			
			// 异步转同步调用
			(async function() {

				// 获取评论列表（第一页的）
				
				await that.getCommentList();
				

				// 等待接口返回后，取消下拉刷新动画
				uni.stopPullDownRefresh();
			})()
		},
		// 页面触底的监听事件，配合pages.json中的"onReachBottomDistance": 0，0的位置写距离底部的距离
		onReachBottom() {
			// 触底后动画效果开启
			this.isLoading = 'loading';

			// 调用接口
			this.getCommentList();
		},
		methods: {
			//---------------------------------------------------------------界面处理方法---------------------------------------------------------------
			//---------------------------------------------------------------界面处理方法---------------------------------------------------------------
			//---------------------------------------------------------------界面处理方法---------------------------------------------------------------
			showDateTime:function(item){
				return item.created_at != '刚刚'?this.$public.showDateTime(item.created_at):'刚刚'
			},
			
			
			// 跳转主页
			topPerSonalhome: function(option) {
				if(option.is_anonymous == 2){ // 不匿名
					uni.navigateTo({
						url: '/pages/follow/personalhome?id=' + option.id
					});
				}else{
					uni.showToast({
						title: '这个人很神秘，不想让你看到TA的主页~',
						duration: 2500,
						icon: 'none'
					})
				}
			},

			// 点赞
			// 说明：点赞的接口放在index.js公共store中
			toThumb: async function(option) { // 这里之所以又加了一层，是为了拿到子组件传过来的option
				// 这是保存一下当前本人的点赞状态，用于判断最后本地是增加还是减少点赞数的
				let temp_is_thumb = option.is_thumb;
				await this.$store.dispatch('toThumb', {
					id: option.id,
					is_thumb: option.is_thumb
				})

				// console.log('this.$store.state.is_thumb_true ',this.$store.state.is_thumb_true );
				if (this.$store.state.is_thumb_true == true) { // 表示点赞操作成功了
					if (temp_is_thumb == 2) { // 原来的如果是2（未点赞状态，那么操作成功后这里应该改成1）
						// 使用$set响应的改变对象数据，第一个参数是对象本身，第二个参数是属性（记得加引号），第三个是改变后的值
						this.$set(this.detailData, 'thumb_num', (this.detailData.thumb_num + 1))
						this.$set(this.detailData, 'is_thumb', 1)
						uni.showToast({
							title: '点赞成功',
							duration: 1000,
							icon: 'none'
						})
					} else { // 反之
						this.$set(this.detailData, 'thumb_num', (this.detailData.thumb_num - 1))
						this.$set(this.detailData, 'is_thumb', 2)
						uni.showToast({
							title: '已取消点赞',
							duration: 1000,
							icon: 'none'
						})
					}
				}
			},
			//打开三个点的操作
			actionMore: function(option){
				let that = this;
				let temp_is_collection = option.is_collection;
				uni.showActionSheet({
					itemList: [option.is_collection == 2?'收藏该内容':'取消收藏该内容', '举报'],
					itemColor:'#f89f12',
					success: function (res) {
						// console.log(res.tapIndex);
						if(res.tapIndex == 0){
							let _that = that;
							(async function(){
								
								await _that.$store.dispatch('toCollection',{
									id:option.id
								});
								
								if(_that.$store.state.is_collection_true == true){ // 表示调用接口成功
									if (temp_is_collection == 2) {
										// 使用$set响应的改变对象数据，第一个参数是对象本身，第二个参数是属性（记得加引号），第三个是改变后的值
										_that.$set(_that.detailData, 'is_collection', 1)
										uni.showToast({
											title: '收藏成功',
											duration: 1000,
											icon: 'none'
										})
									} else {
										_that.$set(_that.detailData, 'is_collection', 2)
										uni.showToast({
											title: '已取消收藏',
											duration: 1000,
											icon: 'none'
										})
									}
								}
							})()
						}else{
							uni.showToast({
								title: '举报成功',
								duration: 1000,
								icon: 'none'
							})
						}
					},
					fail: function (res) {
						// console.log(res.errMsg);
					}
				});
			},
			// 邀请/组队按钮
			zuduiButtons: async function(option) {
				if (option.type == 1) { // 1表示是组队的按钮
					// 这是保存一下当前本人的加入状态，用于判断最后本地是显示加入还是退出
					let temp_is_entry = option.is_entry;
					await this.$store.dispatch('toEntry', {
						id: option.id,
						is_entry: option.is_entry
					})

					// console.log('this.$store.state.is_entry_true ',this.$store.state.is_entry_true );
					if (this.$store.state.is_entry_true == true) { // 表示接口调用成功了
						if (temp_is_entry == 2) {
							// 使用$set响应的改变对象数据，第一个参数是对象本身，第二个参数是属性（记得加引号），第三个是改变后的值
							this.$set(this.detailData, 'entry_num', (this.detailData.entry_num + 1))
							this.$set(this.detailData, 'is_entry', 1)
							// 添加本人到组队成员（主要是为了显示头像）
							this.detailData.members.push({
								id: this.$store.state.theLogonUser.id,
								nick_name: this.$store.state.theLogonUser.nick_name,
								avatar_url: this.$store.state.theLogonUser.avatar_url
							})
							uni.showToast({
								title: '加入成功',
								duration: 1000,
								icon: 'none'
							})
						} else {
							this.$set(this.detailData, 'entry_num', (this.detailData.entry_num - 1))
							this.$set(this.detailData, 'is_entry', 2)
							// 去掉组队成员中的头像
							for (let i = 0; i < this.detailData.members.length; i++) {
								// 通过id找到要去掉的成员（本人）的索引位置
								if (this.$store.state.theLogonUser.id == this.detailData.members[i].id) {
									this.detailData.members.splice(i, 1);
								}
							}
							uni.showToast({
								title: '已退出组队',
								duration: 1000,
								icon: 'none'
							})
						}
					}
				}
			},
			//---------------------------------------------------------------服务端接口---------------------------------------------------------------
			//---------------------------------------------------------------服务端接口---------------------------------------------------------------
			//---------------------------------------------------------------服务端接口---------------------------------------------------------------
			// 分页获取评论接口
			getCommentList: function() {
				let _this = this;
				return new Promise(function(resolve, reject) {
					let that = _this;
					that.isLoading = 'loading'; // 加载中
					// 判断是否是最后一页了
					if (that.theComments.length < that.totalCount) {
						uni.request({
							url: that.$store.state.theUrl + '/wechat/moments/getCommentList',
							method: 'POST',
							header: {
								token: that.$store.state.theToken
							},
							data: {
								page: that.theGetCommentListPage,
								pagesize: that.theGetCommentListPagesize,
								moments_id: that.detailData.id
							},
							success: (res) => {
								// console.log('getCommentList', res);
								let _that = that;
								// 如果是请求第一页，证明是首次请求，就重置一下
								if (_that.theGetCommentListPage == 1) {
									_that.theComments = [];
									
									_that.totalCount = res.data.count ;
								}

								if (res.data.code == 0) {
									for (let i = 0; i < res.data.data.length; i++) {
										_that.theComments.push(res.data.data[i])
									}
									
									_that.theGetCommentListPage += 1;
									resolve();
								} else if (res.data.code == 500) {
									uni.showToast({
										title: '服务器连接失败，请反馈官方客服哦~',
										duration: 2500,
										icon: 'none'
									})

								} else if (res.data.code == 410) {
									uni.showModal({
										title: '温馨提示：',
										content: '当前登录身份已过期，点击“重新登录”继续吧~',
										confirmText: '重新登录',
										confirmColor: '#f89f12',
										showCancel: false,
										success: function(res) {
											if (res.confirm) {
												let __that = _that;
												// 异步转同步，
												(async function() {
													// 登录
													await __that.$store.dispatch('toLogon', {});

													__that.getCommentList();
												})()
											}
										}
									});
								} else {
									uni.showToast({
										title: res.data.msg,
										duration: 2500,
										icon: 'none'
									})
								}
							},
							fail: (res) => {
								console.log(333);
								uni.showToast({
									title: '网络失败，请重试！多次无效后，反馈官方客服哦！',
									duration: 2500,
									icon: 'none'
								})
							}
						})
					}
				})
			},
			// 发布评论接口
			toComment: function() {
				let _this = this;
				return new Promise(function(resolve, reject) {
					let that = _this;
					// 判断如果是空字符串，证明是首次加载进来，不应该调用接口
					if (that.theInputComment != '') {
						uni.request({
							url: that.$store.state.theUrl + '/wechat/moments/comment',
							method: 'POST',
							header: {
								token: that.$store.state.theToken
							},
							data: {
								msg: that.theInputComment,
								moments_id: that.detailData.id
							},
							success: (res) => {
								// console.log('toComment', res);
								let _that = that;

								if (res.data.code == 0) {
									_that.theComments.unshift({
										id: 0,
										moments_id: _that.detailData.id,
										msg: _that.theInputComment,
										create_id: _that.$store.state.theLogonUser.id,
										created_at: "刚刚",
										thumb_num: 0,
										is_thumb: 2, // 本人是否点赞过 1是2否
										nick_name: _that.$store.state.theLogonUser.nick_name,
										avatar_url: _that.$store.state.theLogonUser.avatar_url,
									})
									// 重置
									_that.theInputComment = '';

									resolve();
								} else if (res.data.code == 500) {
									uni.showToast({
										title: '服务器连接失败，请反馈官方客服哦~',
										duration: 2500,
										icon: 'none'
									})

								} else if (res.data.code == 410) {
									uni.showModal({
										title: '温馨提示：',
										content: '当前登录身份已过期，点击“重新登录”继续吧~',
										confirmText: '重新登录',
										confirmColor: '#f89f12',
										showCancel: false,
										success: function(res) {
											if (res.confirm) {
												let __that = _that;
												// 异步转同步，
												(async function() {
													// 登录
													await __that.$store.dispatch('toLogon', {});

													// 获取省市数据
													__that.toComment();
												})()
											}
										}
									});
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
					} else {
						uni.showToast({
							title: '评论内容不能为空哦~',
							duration: 2500,
							icon: 'none'
						})
					}
				})
			},
			// 评论点赞取消
			commentThumb: function(item, index) {
				let that = this;
				let tempItem = item;
				uni.request({
					url: that.$store.state.theUrl + '/wechat/moments/commentThumb',
					method: 'POST',
					header: {
						token: that.$store.state.theToken
					},
					data: {
						comment_id: item.id
					},
					success: (res) => {
						// console.log('commentThumb', res);
						let _that = that;

						if (res.data.code == 0) {
							if (tempItem.is_thumb == 2) {
								_that.theComments[index].is_thumb = 1;
								_that.theComments[index].thumb_num += 1;
							} else {
								_that.theComments[index].is_thumb = 2;
								_that.theComments[index].thumb_num -= 1;
							}

						} else if (res.data.code == 500) {
							uni.showToast({
								title: '服务器连接失败，请反馈官方客服哦~',
								duration: 2500,
								icon: 'none'
							})

						} else if (res.data.code == 410) {
							uni.showModal({
								title: '温馨提示：',
								content: '当前登录身份已过期，点击“重新登录”继续吧~',
								confirmText: '重新登录',
								confirmColor: '#f89f12',
								showCancel: false,
								success: function(res) {
									if (res.confirm) {
										let __that = _that;
										// 异步转同步，
										(async function() {
											// 登录
											await __that.$store.dispatch('toLogon', {});

											// 获取省市数据
											__that.commentThumb();
										})()
									}
								}
							});
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
			}
		}
	}
</script>

<style>
	::-webkit-scrollbar {
		width: 0;
		height: 0;
	}

	.content {
		display: flex;
		flex-direction: column;
		overflow: scroll;
		background-color: #ffffff;
	}

	.posts-data {
		width: 100vw;
	}

	.space-line {
		width: 100vw;
		height: 10px;
		background-color: #fafafa;
	}

	.comment {
		width: 100vw;
		margin-bottom: 15px;
		background-color: #ffffff;
	}

	.comment-title {
		padding-left: 4.5vw;
		margin-top: 15px;
		font-size: 15px;
		font-weight: bold;
	}

	.comment-one {
		display: flex;
		flex-direction: row;
		align-items: flex-start;
		padding: 15px 3.5vw 0 3.5vw;
		margin-bottom: 15px;
	}

	.comment-one-avatar {
		/* border: #111111 1px solid; */
		border-radius: 100%;
		width: 11.5vw;
		height: 11.5vw;
		padding: 0 !important;
		background-repeat: no-repeat !important;
		background-size: cover !important;
	}

	.comment-one-content {
		width: 88.5vw;
		padding-left: 3.5vw;
	}

	.comment-one-content-line-1 {
		display: flex;
		flex-direction: row;
		justify-content: space-between;
	}

	.comment-one-content-line-1-left {
		display: flex;
		flex-direction: row;
		align-items: center;
	}

	.left-name {
		font-size: 14px !important;
		font-weight: bold;
	}

	.left-time {
		margin-left: 3.5vw;
		font-size: 13px;
		color: #bbbbbb;
	}

	.comment-one-content-line-1-right {
		display: flex;
		flex-direction: row;
		align-items: center;
	}

	.right-num {
		font-size: 13px;
		color: #727272;
	}

	.comment-one-content-line-2 {
		font-size: 13px !important;
		color: #727272;
		margin-top: 10px;
	}

	.space-line-bottom {
		height: 100px;
	}

	.comment-input {
		display: flex;
		flex-direction: row;
		position: fixed;
		bottom: 0;
		z-index: 999;
		padding-left: 3.5vw;
		padding-right: 3.5vw;
		padding-top: 10px;
		padding-bottom: 3.5vw;
		background-color: #ffffff;
		width: 93vw;
	}

	.comment-button {
		width: 75px;
		height: 35px;
		line-height: 35px;
		background-color: #ff812f;
		color: #ffffff;
		border-radius: 100px;
		text-align: center;
		margin-left: 10px;
	}
</style>