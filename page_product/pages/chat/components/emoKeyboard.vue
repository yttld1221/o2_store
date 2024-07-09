<template>
	<view v-show="show" class="con">
		<view class="list-box">
			<view class="list" v-for="(itemc, indexc) in data" :key="indexc" @click="select(itemc)">
				{{ itemc }}
			</view>
		</view>
		<view class="del">
			<view @click="delMsg()" class="del-btn btn-style">
				<u-icon name="backspace" size="30"></u-icon>
			</view>
			<view @click="sendMessage()" class="send-btn btn-style">
				发送
			</view>
		</view>
		<!-- <swiper :current="index" class="con" @change="change" :indicator-dots="true">
			<swiper-item v-for="(item, index) in emojiList" :key="index">
				<view class="list-box">
					<view class="list" v-for="(itemc, indexc) in item" :key="indexc" @click="select(itemc)">
						{{ itemc }}
					</view>
				</view>
			</swiper-item>
		</swiper> -->
	</view>
</template>

<script>
	export default {
		data() {
			return {
				index: 0,
				chunkSize: 56, //ÿҳ���58������
			};
		},
		props: {
			content: {
				type: String,
				default: ''
			},
			show: {
				//��ʾ����
				type: Boolean,
				default: false,
			},
			data: {
				//���������
				type: Array,
				default: [],
			},
		},
		watch: {
			content: {
				handler(newVal) {},
				deep: true
			}
		},
		computed: {
			emojiList() {
				//��ά���� ÿҳ58��
				let result = [];
				for (let i = 0; i < this.data.length; i += this.chunkSize) {
					let chunk = this.data.slice(i, i + this.chunkSize);
					result.push(chunk);
				}
				return result;
			},
		},
		methods: {
			sendMessage() {
				this.$emit("sendMessage");
			},
			select(item) {
				this.$emit("change", item);
			},
			change(e) {
				this.index = e.detail.current;
			},
			delMsg() {
				this.$emit("delMsg");
			},
		},
	};
</script>

<style lang="scss" scoped>
	.con {
		height: 490rpx;
		background: #ffffff;
		position: relative;
		padding-bottom: calc(20rpx + env(safe-area-inset-bottom)/2);
		box-sizing: border-box;
	}

	.list-box {
		height: 100%;
		display: flex;
		flex-wrap: wrap;
		padding: 0 30rpx 100rpx;
		position: relative;
		overflow-y: auto;
		box-sizing: border-box;
	}

	.list {
		height: 75rpx;
		width: 12.5%;
		text-align: center;
		line-height: 75rpx;
		font-size: 50rpx;
	}

	.del {
		position: absolute;
		right: 30rpx;
		bottom: calc(20rpx + env(safe-area-inset-bottom)/2);
		display: flex;
		align-items: center;
		justify-content: center;

		.del-btn {
			border:1rpx solid #ebedf0;
			color: #323233;
			background-color: #fff;
		}

		.send-btn {
			border:1rpx solid #5ac725;
			color: #fff;
			background-color: #5ac725;
			margin-left: 20rpx;
		}

		.btn-style {
			border-radius: 10rpx;
			font-size: 14px;
			padding: 0 24rpx;
			height: 80rpx;
			box-sizing: border-box;
			display: flex;
			align-items: center;
			justify-content: center;
		}
	}
</style>