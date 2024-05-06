<template>
	<view class="content">
		<!-- 置顶的 -->
		<view class="top">
			<uni-search-bar @input="toInput" v-model="searchValue"></uni-search-bar>
			<!-- 25px -->
			<view class="selected">
				<view class="selected-tip">提示（已选 <text style="color: #ff6155;margin: 0 5px;">{{theSelectedranges.length}}</text>）：轻击可删除区域哦~</view>
			</view>
			<!-- 150px -->
			<view class="the-selected">
				<view class="the-selected-labels-label">
					<view @click="deletedOne(index)" class="label-one" v-for="(item,index) in theSelectedranges">{{item.title}}</view>
				</view>
			</view>
		</view>
		<!-- 列表 -->
		<view class="address-box" :style="'margin-top:'+(56+25+15+150)+'px;'">
			<address-recursion @selectingAddress="selectingAddress" :level="2" :searchValue="searchValue" :theData="tempAddressData"></address-recursion>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				// 搜索栏的内容
				searchValue: '',
				addressNow: '',

				// 选中的地址区域
				theSelectedranges:[],

				// 搜索框输入内容
				searchValue: '',
				
				// 临时存储
				tempAddressData:[],
				// 地址数据
				addressData: [{
						title: "浙江省",
						status: 1,
						code: "110000",
						children: [{
								title: "杭州市",
								status: 1,
								code: "110100",
								children: []
							}
						]
					}
				],
			}
		},
		onLoad() {

			// --------------------------------------------------------------调用初始数据--------------------------------------------------------------
			// --------------------------------------------------------------调用初始数据--------------------------------------------------------------
			// --------------------------------------------------------------调用初始数据--------------------------------------------------------------
			this.getAreaTree();
		},
		onShow() {
			// 同步一下
			this.theSelectedranges = this.$store.state.theSelectedranges;
		},
		methods: {
			// 选择一个城市
			selectingAddress:function(arr){
				if(arr[1] == '省'){
					uni.showToast({
						title: '请选择具体的城市',
						duration: 2500,
						icon: 'none'
					})
				}else{
					let isAdd = true;
					for (let i = 0; i < this.theSelectedranges.length; i++) {
						if (arr[0].code == this.theSelectedranges[i].code) {
							uni.showToast({
								title: '已添加过这个城市了哦~',
								duration: 1500,
								icon: 'none'
							})
							isAdd = false;
						}
					}
					if (isAdd == true) {
						this.theSelectedranges.push(arr[0])
					}
					// 传全局变量
					this.$store.commit('changeTheSelectedranges',{
						theSelectedranges:this.theSelectedranges
					})
					
					console.log('this.theSelectedranges',this.theSelectedranges);
				}
			},
			// 删除一个标签
			deletedOne: function(index) {
				this.theSelectedranges.splice(index, 1)
				// 传全局变量
				this.$store.commit('changeTheSelectedranges',{
					theSelectedranges:this.theSelectedranges
				})
			},
			
			// 输入框输入内容
			toInput: function() {
				if(this.searchValue != ''){
					// // 重置原始数据
					// this.tempAddressData = [];
					// for(let i=0;i<this.addressData.length;i++){
					// 	this.tempAddressData.push(this.addressData[i]);
					// }
					// // 去除不必要的数据
					// for (let i = 0; i < this.tempAddressData.length; i++) {
					// 	for (let j = 0; j < this.tempAddressData[i].children.length; j++) {
					// 		if(this.tempAddressData[i].children[j].title.indexOf(this.searchValue) == -1){
					// 			this.tempAddressData[i].children.splice(j,1);//删除城市
					// 			j=j-1;
					// 		}
					// 	}
					// }
				}else{
					this.tempAddressData = [];
					// 赋值
					for(let i=0;i<this.addressData.length;i++){
						this.tempAddressData.push(this.addressData[i]);
					}
				}
			},
			//------------------------------------------------  接口方法  -----------------------------------------------------
			//------------------------------------------------  接口方法  -----------------------------------------------------
			//------------------------------------------------  接口方法  -----------------------------------------------------
			// 获取省市树结构，已经组成tree结构
			getAreaTree: function() {
				let _this = this;
				return new Promise(function(resolve, reject){
					let that = _this;
					uni.request({
						url: that.$store.state.theUrl + '/wechat/sundry/getAreaTree',
						method: 'POST',
						header: {
							token: that.$store.state.theToken
						},
						data: {
							// 	启用状态：0-全部，1-启用（默认），2-禁用
							status: 1
						},
						success: (res) => {
							// console.log('that.$store.state.theToken',that.$store.state.theToken);
							// console.log('getAreaTree_res',res);
							let _that = that;
							if (res.data.code == 0) {
								_that.addressData = [];
								_that.tempAddressData = [];
								for(let i =0;i<res.data.data.length;i++){
									_that.addressData.push(res.data.data[i]);
									// 搜索用的，这里默认先赋值一下，后面就是每次搜索的时候，从addressData拿
									_that.tempAddressData.push(res.data.data[i]);
								}
								
								_that.isLoading = 'no-more'; // 取消加载动画
								// console.log('_that.addressData',_that.addressData);
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
											(async function(){
												// 登录
												await __that.$store.dispatch('toLogon',{});
												// 获取省市数据
												__that.getAreaTree();
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
							
							resolve();
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
		}
	}
</script>

<style>
	.margin-left-5 {
		margin-left: 3.5vw;
	}

	::-webkit-scrollbar {
		width: 0;
		height: 0;
	}

	.content {
		display: flex;
		flex-direction: column;
		align-items: center;
	}

	.top {
		background-color: #ffffff;
		width: 100vw;
		position: fixed;
		top: 0;
	}

	.selected {
		display: flex;
		flex-direction: row;
		align-items: center;
		justify-content: space-between;
	}

	.selected-tip {
		margin-left: 3.5vw;
		height: 25px;
		line-height: 25px;
		font-size: 13px;
		color: #bbbbbb;
	}

	.selected-content {
		display: flex;
		flex-direction: row;
		align-items: center;
		margin-right: 15px;
		font-size: 13px;
		height: 25px;
		line-height: 25px;
	}

	.the-selected {
		margin-top: 15px;
		height: 150px;
		overflow: scroll;
		background-color: #ebebeb;
	}

	.the-selected-labels-label {
		display: flex;
		flex-direction: row;
		flex-wrap: wrap;
		width: 93vw;
		padding-left: 3.5vw;
		padding-right: 3.5vw;
		/* border-bottom: #E5E5E5 1px solid; */
		padding-bottom: 15px;
		align-content: flex-start;
	}
	
	.tips {
		font-size: 12px;
		color: #bbbbbb;
		margin-left: 3.5vw;
		margin-bottom: 10px;
	}
	
	.the-tip-labels {
		display: flex;
		flex-direction: row;
		flex-wrap: wrap;
		width: 93vw;
		padding-left: 3.5vw;
		padding-right: 3.5vw;
	}
	
	.label-one {
		height: 35px !important;
		line-height: 35px !important;
		padding: 0 15px;
		background-color: #fafafa;
		margin: 15px 15px 0 0;
		border-radius: 100px;
		color: #727272;
		font-size: 13px;
	}


</style>