<template>
	<view class="">
		<haoIndexList :isCurrentCity="['push', 'mall'].includes(type)?false:true" @haoTap='chooseAddress'
			:letters="indexList" :initAble='initAble' idValue="code" nameValue="title" :currentCity="currentCity"
			:hotCity="hotCity" :cityList="cityList">
		</haoIndexList>
	</view>
</template>

<script>
	import haoIndexList from '../../components/hao-indexList.vue'
	export default {
		components: {
			haoIndexList
		},
		data() {
			return {
				initAble: false,
				indexList: ["A", "B", "C", 'D', "E", 'F', 'G', 'H', 'J', 'K', 'L', 'M', 'N', 'P', 'Q', 'R', 'S', 'T',
					'W',
					'X',
					'Y', 'Z'
				],
				//当前城市
				currentCity: {
					"code": "",
					"title": "",
				},
				//热门城市
				hotCity: [{
						"code": "110100",
						"title": "北京市",
					},
					{
						"code": "310100",
						"title": "上海市",
					},
					{
						"code": "440100",
						"title": "广州市",
					},
					{
						"code": "440300",
						"title": "深圳市",
					},
					{
						"code": "510100",
						"title": "成都市",
					},
					{
						"code": "500100",
						"title": "重庆市",
					},
					{
						"code": "610100",
						"title": "西安市",
					},
					{
						"code": "320500",
						"title": "苏州市",
					},
					{
						"code": "420100",
						"title": "武汉市",
					},
					{
						"code": "330100",
						"title": "杭州市",
					},
					{
						"code": "330200",
						"title": "宁波市",
					},
					{
						"code": "320100",
						"title": "南京市",
					},
					{
						"code": "340100",
						"title": "合肥市",
					},
					{
						"code": "430100",
						"title": "长沙市",
					},
					{
						"code": "350100",
						"title": "福州市",
					},
				],
				cityList: {},
				addressNow: '',
				type:''
			};
		},
		onLoad(option) {
			this.type = option.type;
			if (this.type != 'index') {
				uni.setNavigationBarTitle({
					title: '选择地区',
				});
			}
			console.log(this.type)
			this.currentCity = {
				"code": this.$store.state.store_addressNow.code,
				"title": this.$store.state.store_addressNow.title,
			}
			this.getArea()
		},
		onReady() {},
		onShow() {},
		methods: {
			// 浏览器本地存储和删除
			setStorageSync: function(key, data) {
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
			chooseAddress(item) {
				if (this.type == "index") {
					this.$store.commit("changeStore_addressNow", {
						tempSelectedAddress: item,
					});

					// 存本地
					this.setStorageSync("storage_addressNow", item);
					if (this.currentCity.code != item.code) {
						uni.$emit("changeIndexArea", item);
					}
					uni.navigateBack();
				} else if (this.type == "register") {
					this.$store.commit("changeStore_addressRegister", {
						tempSelectedAddress: item,
					});
					// 选择完地区后，跳转选择学校
					uni.navigateTo({
						url: "/pages/index/school?type=register",
					});
				} else if (this.type == "mall") {
					uni.$emit("changeArea", item);
					uni.navigateBack({
						delta: 1,
						success: () => {},
					});
				} else {
					// 目前只有发布页面用到，就用else  不做判断了
					this.$store.commit("changeStore_addressPush", {
						tempSelectedAddress: item,
					});
					uni.$emit("changePushArea", item);
					uni.navigateBack();
				}
			},
			getArea() {
				this.API.home
					.getAreaTree({
						status: 1
					})
					.then((res) => {
						console.log(res);
						let cityArr = []
						res.data.forEach(el => {
							if (el.children && el.children.length) {
								cityArr = cityArr.concat(el.children)
							}
						})
						// console.log(cityArr)
						this.indexList.forEach((el, index) => {
							this.cityList[el] = []
							cityArr.forEach(item => {
								if (el == item.abc) {
									this.cityList[el].push(item)
								}
							})
						})
						// console.log(this.cityList)
						this.initAble = true
					})
					.catch(async (err) => {
						if (err.code == 410) {
							await this.$store.dispatch("toLogon", {});
							this.getArea();
						}
					});
			}
		}
	}
</script>

<style lang="scss" scoped>
	.list-cell {
		display: flex;
		box-sizing: border-box;
		width: 100%;
		padding: 10px 24rpx;
		overflow: hidden;
		color: #323233;
		font-size: 14px;
		line-height: 24px;
		background-color: #fff;
	}
</style>