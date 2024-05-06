<template>
	<view class="content">
		<!-- 导航栏 -->
		<view class="status-navBar" :style="'height:'+(statusBarHeight+navBarHeight)+'px;'">
			<view @click="changeFollow" class="navBar" :style="'height:'+(navBarHeight)+'px;'">
				<view :style="'height:'+(navBarHeight)+'px;line-height:'+(navBarHeight)+'px;'">消息中心</view>
			</view>
		</view>
		<!-- 新的关注 -->
		<view @click="toRegard('关注')" class="the-line-1" :style="'margin-top:'+(statusBarHeight+navBarHeight)+'px;'">
			<image class="the-line-1-image" src="/static/4_guanzhu@3x.png" mode="widthFix"></image>
			<view class="the-line-1-right">
				<view class="the-line-1-right-left">
					<view class="the-line-1-right-left-top">新的关注<view v-if="pageData.regard.has_not_read == 1" class="red-tip"></view></view>
					<view class="the-line-1-right-left-bottom">
						<uni-notice-bar speed="50" show-icon scrollable :text="pageData.regard.data.msg" />
					</view>
				</view>
				<view class="uni-icons">
					<uni-icons type="right" size="20"></uni-icons>
				</view>
			</view>
		</view>
		<!-- 互动消息 -->
		<view  @click="toRegard('互动')" class="the-line-2">
			<image class="the-line-1-image" src="/static/4_hudong@3x@3x.png" mode="widthFix"></image>
			<view class="the-line-1-right">
				<view class="the-line-1-right-left">
					<view class="the-line-1-right-left-top">互动消息<view v-if="pageData.interact.has_not_read == 1" class="red-tip"></view></view>
					<view class="the-line-1-right-left-bottom">
						<uni-notice-bar speed="50" show-icon scrollable :text="pageData.interact.data.msg" />
					</view>
				</view>
				<view class="uni-icons">
					<uni-icons type="right" size="20"></uni-icons>
				</view>
			</view>
		</view>

		<tab-Bar current="3"></tab-Bar>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				// 顶部状态栏和导航栏高度
				statusBarHeight: 0,
				navBarHeight: 0,
				
				// 页面数据
				pageData: {
					regard: { // 关注
						has_not_read: 1, //是否有未读信息，1-是，2-否
						data: {
							id: 1,
							msg: "@天空之城@关注了你",
							created_at: "2024-03-17 09:23:24"
						}
					},
					interact: { //互动
						has_not_read: 1, //是否有未读信息，1-是，2-否
						data: {
							id: 2,
							msg: "@天空之城@点赞了你：去外滩烧烤",
							created_at: "2024-03-17 09:26:31"
						}
					}
				}
			}
		},
		onLoad() {
			// 获取状态和导航栏高度
			let barObj = this.$public.getTopIconDistance();
			this.statusBarHeight = barObj.statusBarHeight;
			this.navBarHeight = barObj.navBarHeight;
		},
		onShow() {
			// 记录当前的previousPage，用于二次点击发布回到原来页面
			this.$store.commit('changePreviousPage', {
				previousPage: 3,
				isPage_2: false
			});
			
			let that = this;
			(async function(){
				await that.getSystemSummaryMsg();
				if(that.pageData.regard.has_not_read == 2 && that.pageData.interact.has_not_read == 2){
					that.$store.commit('changeRedTip',{
						isRedTip : false
					})
				}
			})()
			// console.log('that.$store.state.isRedTip',that.$store.state.isRedTip);
		},
		methods: {
			//------------------------------------------------  页面跳转  -----------------------------------------------------
			//------------------------------------------------  页面跳转  -----------------------------------------------------
			//------------------------------------------------  页面跳转  -----------------------------------------------------
			// 跳转新的关注页面
			toRegard: function(type) {
				uni.navigateTo({
					// type=1 表示是index页面过来的
					url: '/pages/message/regard?type='+type
				});
			},
			//------------------------------------------------  接口调用  -----------------------------------------------------
			//------------------------------------------------  接口调用  -----------------------------------------------------
			//------------------------------------------------  接口调用  -----------------------------------------------------
			// 获取消息统计
			getSystemSummaryMsg: function() {
				let _this = this;
				return new Promise(function(resolve, reject) {
					let that = _this;
					uni.request({
						url: that.$store.state.theUrl + '/wechat/sundry/getSystemSummaryMsg', //获取关注和互动消息汇总数据
						method: 'GET',
						header: {
							token: that.$store.state.theToken
						},
						success: (res) => {
							// console.log('getSystemSummaryMsg', res);
							let _that = that;

							if (res.data.code == 0) {
								_that.pageData = res.data.data;
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
								
												// 重置
				
												__that.getSystemSummaryMsg();
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
				})
			},
		}
	}
</script>

<style>
	.status-navBar {
		width: 100vw;
		position: fixed;
		top: 0;
		background-color: #ffffff;
		z-index: 8;
	}

	.navBar {
		position: absolute;
		bottom: 0;
		width: 100%;
		background-color: #ffffff;
		text-align: start;
		padding-left: 3.5vw;
	}

	.navBar view {
		font-size: 15px;
		font-weight: bold;
	}

	.navBar image {
		margin-left: 5px;
		width: 3.5vw;
		height: 3.5vw;
	}

	.the-line-1 {
		width: 93vw;
		padding: 3.5vw;
		display: flex;
		flex-direction: row;
		align-items: center;
	}

	.the-line-1-image {
		width: 17vw;
		height: 17vw;
	}

	.the-line-1-right {
		width: 76vw;
		display: flex;
		flex-direction: row;
		align-items: center;
		justify-content: space-between;
	}

	.the-line-1-right-left {
		margin-left: 3.5vw;
	}

	.the-line-1-right-left-top {
		font-weight: bold;
		font-size: 15px;
		display: flex;
		flex-direction: row;
	}

	.the-line-1-right-left-bottom {
		font-size: 13px;
		color: #bbbbbb;
		margin-top: 10px;
		width: 65vw;
	}

	.the-line-2 {
		width: 93vw;
		padding: 3.5vw;
		display: flex;
		flex-direction: row;
		align-items: center;
	}

	.red-tip {
		width: 10px;
		height: 10px;
		border-radius: 100%;
		background-color: #ff0000;
		margin-left: 5px;
	}
	
	.uni-icons{
		width: 11vw;
		text-align: center;
	}
</style>