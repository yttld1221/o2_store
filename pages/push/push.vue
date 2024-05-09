<template>
	<view class="content">
		<!-- 标题 -->
		<view class="titles" :style="'top:'+(statusBarHeight)+'px;height:'+(navBarHeight)+'px;'">
			想要说点什么呢~
		</view>
		<!-- 内容 -->
		<view class="the-types" :style="'margin-top:'+(statusBarHeight+navBarHeight)+'px;'">
			<view @click="toPush_Zudui('话题')" class="item">
				<image src="/static/3_huati.png" mode="widthFix"></image>
				<view>话题</view>
			</view>
			<view v-if="theLevel == 2" @click="toPush_Zudui('组队/搭子')" class="item">
				<image src="/static/3_zudui.png" mode="widthFix"></image>
				<view>组队/搭子</view>
			</view>
			<view v-if="theLevel == 2" @click="toPush_Zudui('分享/安利')" class="item">
				<image src="/static/3_fenxiang.png" mode="widthFix"></image>
				<view>分享/安利</view>
			</view>
			<view v-if="theLevel == 2" @click="toPush_Zudui('二手闲置')" class="item">
				<image src="/static/3_ershou.png" mode="widthFix"></image>
				<view>二手闲置</view>
			</view>
			<view v-if="theLevel == 2" @click="toPush_Zudui('兼职')" class="item">
				<image src="/static/3_jianzhi.png" mode="widthFix"></image>
				<view>兼职</view>
			</view>
			<view v-if="theLevel == 2" @click="toPush_Zudui('表白')" class="item">
				<image src="/static/3_biaobai.png" mode="widthFix"></image>
				<view>表白</view>
			</view>
			<view v-if="theLevel == 2" @click="toPush_Zudui('求助')" class="item">
				<image src="/static/3_qiuzhu.png" mode="widthFix"></image>
				<view>求助</view>
			</view>
			<view v-if="theLevel == 2" @click="toPush_Zudui('其他')" class="item">
				<image src="/static/3_qita.png" mode="widthFix"></image>
				<view>其他</view>
			</view>
		</view>
		<!-- 表情包 -->
		<!-- <view class="tips">点击即可复制哦(=^_^=)~</view>
		<view class="biaoqing-box">
			<view @click="$public.setClipboardData(item)" class="biaoqing-item" v-for="(item,index) in biaoqingData">{{item}}</view>
		</view> -->
		<tab-Bar current="2"></tab-Bar>
	</view>
</template>

<script>
	export default {
		data(){
			return {
				theLevel:0,
				// 顶部状态栏
				statusBarHeight: 0,
				// 导航标题栏
				navBarHeight: 0,
				// 表情包
				biaoqingData:['（＾∀＾）','＾ω＾','▼ω▼','(´∀｀）','(^○^)','(｀▽´)','米＾－＾米','(∩_∩)',
				'(⌒∇⌒)','(☆▽☆)','(￣∇￣)','（￣ー+￣）','σ(^○^)','(^■^*)','(*^-^)','d(^^*)','(´w｀*)',
				'|*￣ー￣|','{*≧∀≦}','(*´ー`)','o(^▽^)o','(*´∇｀*)','（*´▽`*)','(=^_^=)','σ(ﾟｰ^*)','（●＞ω＜●）','y（^ヮ^）y']
			}
		},
		onLoad() {
			
			
			// 获取状态、标题栏高度
			let obj_s = this.$public.getTopIconDistance();
			this.statusBarHeight = obj_s.statusBarHeight;
			this.navBarHeight = obj_s.navBarHeight;
		},
		onShow(){
			this.theLevel = this.$store.state.theLogonUser.level;
			
			// 记录当前的previousPage，用于二次点击发布回到原来页面
			this.$store.commit('changePreviousPage',{
				previousPage:this.$store.state.previousPage,
				isPage_2:true
			});
		},
		methods:{
			//------------------------------------------------  页面跳转  -----------------------------------------------------
			//------------------------------------------------  页面跳转  -----------------------------------------------------
			//------------------------------------------------  页面跳转  -----------------------------------------------------
			// 跳转地址选择
			toPush_Zudui: function(type) {
				if(true){  //this.theLevel != 0
					uni.navigateTo({
						url: '/pages/push/push_zudui?type='+type
					});
				}else{
					let that = this;
					uni.showModal({
						title: '温馨提示：',
						content: '需要认证用户才能发布哦，点击“去认证”继续吧~',
						confirmText: '去认证',
						confirmColor: '#f89f12',
						showCancel: true,
						success: function(res) {
							if (res.confirm) {
								uni.navigateTo({
									url: '/pages/mine/register?level=0'
								});
							} else if (res.cancel) {
							
							}
						}
					});
				}
			},
		}
	}
</script>

<style>
	.content {
		display: flex;
		flex-direction: column;
		align-items: center;
		background-color: #ffffff;
		/* justify-content: center; */
	
		height: 100vh;
		overflow: scroll;
	}
	
	.titles {
		width: 100%;
		display: flex;
		flex-direction: row;
		align-items: center;
		position: fixed;
		z-index: 9;
		font-size: 15px;
		font-weight: bold;
		margin-left: 6.5vw;
	}
	
	.the-types{
		padding-top: 1.5vh;
		width: 100vw;
		display: flex;
		flex-direction: row;
		flex-wrap: wrap;
		border-bottom: #E5E5E5 1px solid;
	}
	.item{
		display: flex;
		flex-direction: column;
		align-items: center;
		width: 19vw;
		margin: 3vw;
	}
	.item image{
		width: 15vw;
		height: 15vw;
	}
	.item view{
		font-size: 13px;
		margin-top: 10px;
	}
	.tips{
		margin-top: 15px;
		font-size: 12px;
		margin-bottom: 5px;
		color: #bbbbbb;
	}
	.biaoqing-box{
		display: flex;
		flex-direction: row;
		flex-wrap: wrap;
		width: 100vw;
	}
	.biaoqing-item{
		width: 25vw;
		height: 10vw;
		line-height: 10vw;
		text-align: center;
		font-size: 12px;
		color: #bbbbbb;
	}
</style>