<template>
	<view class="u-read-more">
		<view v-if="childLen" class="more-msg-box" :style="{'padding-left':isDetail?'0rpx':'53rpx'}">
			<view v-if="!collapsed" class="more-msg-list">
				<view @longpress.stop="onLongChild(child)" class="more-msg-item" v-for="(child,childIndex) in childList"
					:key='childIndex'>
					<view class="avatar-box">
						<view class="avatar-left">
							<view @click.stop="topPerSonalhome(item)" class="avatar"
								:style="'background: url(' + child.avatar_url + ');'">
							</view>
							<view class="nick-name">{{child.nick_name}}</view>
							<view class="create-time">{{getTime(child.created_at)}}</view>
						</view>
						<view @click.stop="toThumb" class="flex-row">
							<uni-icons type="hand-up" :color="child.is_thumb == 2 ? '#000000' : '#ff6155'"
								size="20"></uni-icons>
							<view class="the-thumb-num" :style="{
						  color: child.is_thumb == 2 ? '#000000' : '#ff6155',
						}">{{ child.thumb_num }}</view>
						</view>
					</view>
					<view @click.stop="clickChild(child)">
						<view class="msg-box">{{child.msg}}</view>
						<image v-if="child.imgUrl" @click.stop="prewFile(child.imgUrl)" class="comment-one-content-line-3"
							mode="aspectFill" :src="child.imgUrl" />
					</view>
				</view>
			</view>
			<view class="handle-click">
				<view class='flex-algin' v-if="collapsed" @click.stop="toggle(index,false)">
					<view class="heng">
					</view>
					<text>展开{{childLen}}条回复</text>
					<u-icon name="arrow-down" color="#666666" size="12"></u-icon>
				</view>
				<view class='flex-algin' v-else>
					<view class="heng">
					</view>
					<view class='flex-algin collapsed-more' v-if="childList.length<childLen"
						@click.stop="toggle(index,false)">
						<text>展开更多</text>
						<u-icon name="arrow-down" color="#666666" size="12"></u-icon>
					</view>
					<view class='flex-algin' @click.stop="toggle(index,true)">
						<text>收起</text>
						<u-icon name="arrow-up" color="#666666" size="12"></u-icon>
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		components: {},
		props: {
			list: {
				type: Array,
				default: () => [],
				required: false,
			},
			childLen: {
				type: Number,
				default: 0,
				required: false,
			},
			parentId: {
				type: Number,
				default: 0,
				required: false,
			},
			isDetail: {
				type: Boolean,
				default: false,
				required: false,
			},
		},
		watch: {
			list: {
				handler(newValue, oldValue) {},
				deep: true,
				immediate: true
			}
		},
		data() {
			return {
				childList: [],
				pagenum: 1,
				pagesize: 5,
				collapsed: true
			};
		},
		methods: {
			clickChild(item) {
				if (this.isDetail) {
					this.$emit('clickChild', item)
				}
			},
			// 长按
			onLongChild(item) {
				if (this.isDetail) {
					this.$emit('onLongChild', item)
				}
			},
			//   预览
			prewFile(url) {
				uni.previewImage({
					current: 0,
					urls: [url]
				})
			},
			topPerSonalhome(option) {
				uni.navigateTo({
					url: "/pages/follow/personalhome?id=" + option.id,
				});
			},
			toggle(index, tag) {
				if (tag) {
					this.childList = []
					this.pagenum = 1
				} else {
					let arr = [{
						is_thumb: 2,
						thumb_num: 5,
						avatar_url: "https://schoolwx.oss-cn-hangzhou.aliyuncs.com/school/img/v2/20240611/2024-06-11_09_43_03_avatar_0_22.png",
						nick_name: "姓名2",
						created_at: "2024-07-27 16:34:16",
						msg: "有事需要代课222",
						imgUrl: 'https://schoolwx.oss-cn-hangzhou.aliyuncs.com/school/img/v2/20240428/2024-04-28_17_43_15_0_48.jpg?x-oss-process=image/resize,m_lfit,h_800,w_800/quality,q_100'
					}, {
						is_thumb: 2,
						thumb_num: 5,
						avatar_url: "https://schoolwx.oss-cn-hangzhou.aliyuncs.com/school/img/v2/20240611/2024-06-11_09_43_03_avatar_0_22.png",
						nick_name: "姓名3",
						created_at: "2024-07-29 18:40:16",
						msg: "有事需要代课333"
					}, {
						is_thumb: 2,
						thumb_num: 5,
						avatar_url: "https://schoolwx.oss-cn-hangzhou.aliyuncs.com/school/img/v2/20240611/2024-06-11_09_43_03_avatar_0_22.png",
						nick_name: "姓名4",
						created_at: "2024-07-30 18:40:16",
						msg: "有事需要代课444"
					}]
					this.childList = this.childList.concat(arr)
					this.$forceUpdate()
				}
				if (tag != this.collapsed) {
					this.collapsed = tag;
				}
			},
			// 这里需要写个方法对时间进行处理
			getTime: function(theTime) {
				console.log(theTime);
				if (theTime) {
					// 转化时间戳的方法
					// 发帖时间的时间戳
					let timestamp_at = new Date(theTime).getTime();
					// 当前时间的时间戳
					let timestamp_now = new Date().getTime();

					// 相差的时间，转化为了分钟
					let difference = (timestamp_now - timestamp_at) / 1000 / 60;
					if (difference < 5) {
						// 小于1个小时，就显示时间
						// console.log(difference+'分钟前');
						return "刚刚";
					} else if (difference >= 5 && difference < 60) {
						return Math.floor(difference) + "分钟前";
					} else {
						let theYear = theTime.substring(0, 4);
						let theMonth = theTime.substring(5, 7);
						let theDay = theTime.substring(8, 10);

						let now = new Date();
						let nowYear = now.getFullYear() + "";
						let nowMonth =
							now.getMonth() + 1 < 10 ?
							"0" + (now.getMonth() + 1) :
							now.getMonth() + 1 + "";
						let nowDay =
							now.getDate() < 10 ? "0" + now.getDate() : now.getDate() + "";
						// 同一天的话
						if (theYear == nowYear && theMonth == nowMonth && theDay == nowDay) {
							// console.log(theTime.substring(11,19));
							// console.log(theYear,theMonth,theDay);
							// console.log(nowYear,nowMonth,nowDay);
							return "今天" + " " + theTime.substring(11, 19);
						} else {
							// console.log(theTime.substring(11,19));
							// console.log(theYear,theMonth,theDay);
							// console.log(nowYear,nowMonth,nowDay);
							return theTime;
						}
					}
				}
			},

		}
	};
</script>

<style lang="scss" scoped>
	.u-read-more {
		.avatar-box {
			display: flex;
			align-items: center;
			justify-content: space-between;

			.avatar-left {
				display: flex;
				align-items: center;

				.avatar {
					width: 40rpx;
					height: 40rpx;
					border-radius: 100%;
					background-repeat: no-repeat !important;
					background-size: cover !important;
					margin-right: 13rpx;
				}

				.nick-name {
					font-family: PingFang SC;
					font-weight: 600;
					font-size: 24rpx;
					color: #333333;
				}

				.create-time {
					margin-left: 22rpx;
					font-family: PingFang SC;
					font-weight: 400;
					font-size: 24rpx;
					color: #666666;
				}
			}

			.flex-row {
				display: flex;
				align-items: center;

				.the-thumb-num {
					font-family: PingFang SC;
					font-weight: 400;
					font-size: 24rpx;
					color: #000000;
				}
			}
		}

		.msg-box {
			box-sizing: border-box;
			margin-top: 10rpx;
			padding-left: 53rpx;
			font-family: PingFang SC;
			font-weight: 400;
			font-size: 24rpx;
			color: #333333;
			line-height: 36rpx;
		}

		.comment-one-content-line-3 {
			margin: 10rpx 0 0 53rpx;
			width: 200rpx;
			height: 200rpx;
			border-radius: 10rpx;
		}

		.more-msg-box {
			box-sizing: border-box;

			.more-msg-item {
				margin-top: 21rpx;
			}

			.handle-click {
				margin-top: 20rpx;
				font-family: PingFang SC;
				font-weight: 400;
				font-size: 24rpx;
				color: #666666;

				.flex-algin {
					display: flex;
					align-items: center;

					&>text {
						margin-right: 10rpx;
					}

					.heng {
						width: 40rpx;
						border-top: 1rpx solid #c8c9cc;
						margin-right: 13rpx;
					}
				}

				.collapsed-more {
					margin-right: 40rpx;
				}
			}
		}

	}
</style>