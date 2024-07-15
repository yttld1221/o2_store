<template>
	<view class="">
		<haoIndexList :letters="indexList" :initAble='initAble' idValue="code" nameValue="title" :currentCity="currentCity"
			:hotCity="hotCity" :cityList="cityList">
		</haoIndexList>
		<view @click="onClickSearch" class="asdas">
			asdasdas
		</view>
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
				initAble:false,
				indexList: ["A", "B", "C", 'D', "E", 'F', 'G', 'H', 'J', 'K', 'L', 'M', 'N', 'P', 'Q', 'R', 'S', 'T',
					'W',
					'X',
					'Y', 'Z'
				],
				//当前城市
				currentCity: {
					"code": "430100",
					"title": "长沙市",
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
				],
				cityList: {}
			};
		},
		onLoad(option) {
			this.getArea()
		},
		onReady() {},
		onShow() {},
		methods: {
			onClickSearch() {
				console.log(this.cityList)
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
						console.log(cityArr)
						this.indexList.forEach((el, index) => {
							this.cityList[el] = []
							cityArr.forEach(item => {
								if (el == item.abc) {
									this.cityList[el].push(item)
								}
							})
						})
						console.log(this.cityList)
						this.initAble=true
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