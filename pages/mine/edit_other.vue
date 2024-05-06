<template>
	<view class="content">
		<!-- 姓名 -->
		<view class="line-name">
			<view class="line-name-title">我的昵称：</view>
			<view class="line-name-content">
				<uni-easyinput focus v-model="nick_name"
					placeholder="请输入一个不超过7个字符的昵称吧~" :inputBorder="false" />
			</view>
		</view>
		
		<!-- 间隔行底部 -->
		<view class="space-line-bottom">
			<view @click="navigateBack()" class="to-push-2">确认修改</view>

		</view>
	</view>
</template>

<script>
	export default{
		data(){
			return{
				nick_name:''
			}
		},
		onLoad(option) {
			this.nick_name = option.value;
			
		},
		methods:{
			// 跳转头像编辑界面
			navigateBack: function() {
				if(this.nick_name.length > 7){
					uni.showToast({
						title: '昵称最多只支持7个字符哦~',
						duration: 2500,
						icon: 'none'
					})
				}else{
					this.$store.commit('changeNickName',{nick_name:this.nick_name})
					uni.navigateBack();
				}
				
			},
		}
	}
</script>

<style>
	.line-name{
		display: flex;
		flex-direction: row;
		align-items: center;
		justify-content: space-between;
		width: 93vw;
		padding: 0 3.5vw;
		
		border-bottom: #f3f3f3 1px solid;
	}
	.line-name-title{
		width: 30vw;
		height: 55px;
		line-height: 55px;
		color: #bbbbbb;
	}
	.line-name-content{
		width: 63vw;
		height: 55px;
		display: flex;
		flex-direction: row;
		align-items: center;
	}
	
	.space-line-bottom{
		padding: 25px 0 65px 0;
		display: flex;
		flex-direction: row;
		align-items: center;
	}
	.to-push-2{
		width: 93vw;
		margin: 0 3.5vw;
		height: 55px;
		line-height: 55px;
		text-align: center;
		color: #ffffff;
		background-color: #ff812f;
		border-radius: 100px;
	}
</style>