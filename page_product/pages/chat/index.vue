<template>
	<view class="chat">
		<view @click='toTop' v-if="showMore" class="more-message">
			<u-icon name="arrow-left-double" color="#ff812f"></u-icon>
			{{notNum}}条新消息
		</view>
		<scroll-view :scroll-anchoring='true' @click="closeBottom" :style="{height:heightArr[0]}"
			:refresher-triggered="triggered" refresher-enabled refresher-default-style="none"
			@refresherrefresh="pullList" class="scroll-view" scroll-y :scroll-with-animation="false" @scroll="onScroll"
			:scroll-top="top">
			<view class="list-item" :class="{'media-height':item.msgType!='text'}" v-for="(item, index) in list"
				:key="index">
				<view class="time-box" :class="{'first-item':index==0}" v-if="item.show_time">
					<view class="time-text">{{ getTime(item.created_at) }}</view>
				</view>
				<view class="message" :class="theLogonUser.id != item.from_user_id ? 'friend' : 'self'">
					<image :src="item.from_avatar_url" v-if="theLogonUser.id != item.from_user_id" class="avatar"
						mode="widthFix"></image>
					<view v-if="item.msgType == 'image'" @click.stop="prewFile(item.msg, 'image')">
						<image class="message-image" :src="item.msg" mode="aspectFill">
						</image>
					</view>
					<view class="video-box" v-else-if="item.msgType == 'video'"
						@click.stop="prewFile(item.msg, 'video')">
						<view class='play-box'>
							<u-icon name="play-right-fill" color="#FFFFFF" size="40"></u-icon>
						</view>
						<image :src="getFm(item.msg)" mode="aspectFill">
						</image>
					</view>
					<view class="content" v-else>
						<view>{{ item.msg }}</view>
					</view>
					<image :src="item.from_avatar_url" v-if="theLogonUser.id == item.from_user_id" class="avatar"
						mode="widthFix"></image>
				</view>
			</view>
		</scroll-view>
		<view class="tool" id="bottom-fix" :style="{ bottom: `${keyHeight}px` }">
			<view class="input-box" :style="{ 'align-items': rowLine == 1 ? 'center' : 'flex-end' }">
				<textarea @linechange='lineChange' :show-confirm-bar='false' auto-height rows="1" cursor-spacing='100'
					maxlength="-1" :confirm-hold="true" :focus="textFocus" class="focus-border" :clearable='false'
					:adjust-position='false' :trim="true" v-model="content" confirmType="send" @blur="closeContent"
					@focus="focusContent" @confirm="sendMessage" />
				<view class="btn-box emoji-btn">
					<image @click="openBottom('emoji')" mode='scaleToFill' class="icon-image"
						src="/static/xiaolian.png"></image>
				</view>
				<view class="btn-box">
					<image @click="openBottom('use')" mode='scaleToFill' class="icon-image"
						src="/static/plus-circle.png">
					</image>
				</view>
			</view>
			<view class="tool-bottom" v-if="showBottom">
				<emoKeyboard :content='content' @delMsg='delMsg' @sendMessage='sendMessage' v-if="typeShow == 'emoji'"
					:show="true" :data="emojiList" @change="changeBq"></emoKeyboard>
				<view class="use-box" v-else>
					<view @click="chooseUse(index)" class="use-item" :key="index" v-for="(item, index) in useList">
						<view class="img-box">
							<uni-icons :type="item.icon" size="30"></uni-icons>
						</view>
						<text>{{ item.label }}</text>
					</view>
				</view>
			</view>

		</view>
		<prew-video ref="prewVideo" />
		<prew-image ref="prewImage" />
	</view>
</template>

<script>
	import emoKeyboard from "./components/emoKeyboard.vue";
	import prewVideo from "../../components/prewVideo.vue";
	import prewImage from "../../components/prewImage.vue";
	export default {
		components: {
			emoKeyboard,
			prewVideo,
			prewImage
		},
		data() {
			return {
				cs: 1,
				heightArr: [],
				keyHeight: 1,
				isReachBottom: true,
				textFocus: false,
				showScroll: true,
				useList: [{
						label: "图片",
						icon: "image-filled"
					},
					{
						label: "视频",
						icon: "videocam-filled"
					},
					{
						label: "拍照",
						icon: "camera-filled"
					},
				],
				showBottom: false,
				typeShow: "",
				rowLine: 1,
				emojiList: [],
				isShow: false,
				theLogonUser: {},
				// 当前获取的校园墙页码，每次需要+1
				theGetListPage: 1,
				theGetListPagesize: 10,
				content: "",
				list: [],
				top: 1,
				id: "",
				triggered: false,
				bottomHeight: 1,
				notNum: 0,
				showMore: false
			};
		},
		watch: {
			list: {
				handler(val) {
					this.showTime();
				},
				deep: true,
			},
		},
		onReady() {
			this.$nextTick(() => {
				this.getBottomHeight("list");
			});
		},
		//和onLoad(){} 位置同级
		onUnload() {
			// 移除监听事件 优化性能   
			uni.$off('changeMessageInfo');
		},
		onLoad(options) {
			if (options.id) {
				this.id = options.id;
				uni.setNavigationBarTitle({
					title: options.name,
				});
				this.getData();
			}
			if (options.num > this.theGetListPagesize) {
				this.notNum = options.num
			}

			uni.$on("changeMessageInfo", (data) => {
				if (
					(this.id == data.from_user_id &&
						this.theLogonUser.id == data.to_user_id) ||
					(this.id == data.to_user_id &&
						this.theLogonUser.id == data.from_user_id)
				) {
					this.list.push({
						...data,
						msgType: this.getMsgType(data.msg),
						msg: ['image', 'video'].includes(this.getMsgType(data.msg)) ? this
							.getUrl(data.msg, this.getMsgType(data.msg) == 'image' ? 'theqnxasendimage' :
								'theqnxasendvideo') : data.msg
					});
					if (this.theLogonUser.id == data.from_user_id) {
						this.scrollToBottom();
					}
					if (this.theLogonUser.id == data.to_user_id) {
						this.isRead([data]);
						if (this.isReachBottom) {
							this.scrollToBottom();
						}
						// this.$refs.uNotify.show({
						//   type: "warning",
						//   color: "#ffffff",
						//   bgColor: "#FF812F",
						//   message: "有新消息",
						//   duration: 0,
						//   safeAreaInsetTop: true,
						// });
					}
				}
			});
		},
		onShow() {
			this.theGetListPage = 1;
			this.list = [];
			// 调用接口
			this.getMessage("init");
			this.theLogonUser = this.$store.state.theLogonUser;
		},
		computed: {
			Style() {
				let obj = {
					height: `calc(100vh - ${this.bottomHeight}px)`,
				};
				return JSON.stringify(obj);
			},
		},
		methods: {
			toTop() {
				this.$nextTick(() => {
					this.top = 0;
					this.showMore = false
				})
			},
			delMsg() { //删除	
				if (!this.content) return
				const lastTwoChars = this.content.slice(-2);
				if (this.isEmoji(lastTwoChars)) {
					this.content = this.content.substring(0, this.content.length - 2);
				} else {
					this.content = this.content.substring(0, this.content.length - 1);
				}
			},
			isEmoji(str) {
				// 匹配表情的正则表达式
				const regExp = /[\uD800-\uDBFF][\uDC00-\uDFFF]/g;
				return regExp.test(str);
			},
			onScroll(event) {
				// console.log(event)
				let query = uni.createSelectorQuery().in(this);
				query
					.select(".scroll-view")
					.boundingClientRect((data) => {
						if (data) {
							// 获取scroll-view的滚动高度
							const scrollTop = event.detail.scrollTop;
							// 获取scroll-view的总高度
							const scrollHeight = event.detail.scrollHeight;
							// 获取scroll-view的可视区域高度
							const windowHeight = data.height;

							if (scrollTop == 0 && this.showMore) {
								this.showMore = false
							}
							// 判断是否滚动到底部
							this.isReachBottom = scrollTop + windowHeight >= scrollHeight - 120;
							// console.log('是否滚动到:', scrollTop, windowHeight, scrollTop + windowHeight, scrollHeight);
							// console.log('是否滚动到底部:', this.isReachBottom);
						}
					})
					.exec();
			},
			//   预览
			prewFile(url, type) {
				console.log(url)
				if (type == "image") {
					this.$refs.prewImage.open(url);
				} else {
					this.$refs.prewVideo.open(url);
				}
			},
			getUrl(text, key) {
				if (text) {
					let url = text.split(key)[0]
					return url;
				}
			},
			getFm(url) {
				if (url) {
					url += '?x-oss-process=video/snapshot,t_0,f_png,w_300,h_375,m_fast'
					return url
				}
			},
			getMsgType(text) {
				if (text) {
					let type = "";
					if (text.indexOf("theqnxasendimage") > -1) {
						type = "image";
					} else if (text.indexOf("theqnxasendvideo") > -1) {
						type = "video";
					} else {
						type = "text";
					}
					return type;
				}
			},
			chooseUse(index) {
				uni.chooseMedia({
					count: index == 2 ? 1 : 100, // 默认为9，可以设置为需要的文件数量
					mediaType: index == 2 ? ["video", "image"] : index == 0 ? ["image"] : ["video"], // 可以选择视频和图片
					sourceType: index == 2 ? ["camera"] : ["album"], // 可以选择从相册或相机中选择
					success: (res1) => {
						const tempFiles = res1.tempFiles;
						// 这里可以获取到选择的文件列表，进行后续上传操作
						console.log(tempFiles);
						// 例如，可以使用uni.uploadFile来上传文件
						tempFiles.forEach(async (file, index) => {
							const result = await this.uploadFilePromise(file, index);
							console.log(result);
							this.commonSend(result);
						});
					},
					fail: (error) => {
						console.error("choose media fail:", error);
					},
				});
			},
			uploadFilePromise(file, index) {
				return new Promise((resolve, reject) => {
					let a = this.API.order
						.getOssUploadSign({
							type: file.fileType == "image" ? "img" : "video",
						})
						.then((res) => {
							console.log(res);
							let fileTypes = file.tempFilePath.substring(
								file.tempFilePath.lastIndexOf(".") + 1
							);
							let key = `${
              res.data.dir
            }${this.$public.getNowDateTime()}_chat_${index}_${
              this.$store.state.theLogonUser.id
            }.${fileTypes}`;
							console.log(key, "key");
							uni.uploadFile({
								url: res.data.host,
								filePath: file.tempFilePath,
								formData: {
									key,
									policy: res.data.policy,
									OssAccessKeyId: res.data.accessid,
									success_action_status: "200",
									signature: res.data.signature,
								},
								name: "file", // 这是后端接收文件的字段名
								success: (uploadFileRes) => {
									if (uploadFileRes.statusCode == 200) {
										resolve(
											`${res.data.host}/${key}theqnxasend${file.fileType}`
										);
									}
								},
								fail: (error) => {
									reject(error);
									console.error("upload fail:", error);
								},
							});
						})
						.catch(async (err) => {
							if (err.code == 410) {
								await this.$store.dispatch("toLogon", {});
								uni.showToast({
									title: "网络失败，请重试！",
									duration: 2500,
									icon: "none",
								});
							}
						});
				});
			},
			closeBottom() {
				if (this.showBottom) {
					this.showBottom = false;
					this.typeShow = ''
					this.$nextTick(() => {
						this.getBottomHeight();
					});
				}
			},
			// 打开底部
			openBottom(type) {
				this.showBottom = this.typeShow == type ? !this.showBottom : true;
				this.typeShow = type;
				this.$nextTick(() => {
					this.getBottomHeight();
				});
			},
			closeContent() {
				this.showScroll = false
				this.textFocus = false;
				this.keyHeight = 0
				this.heightArr[0] = 'calc(100% - ' + (this.bottomHeight + this.keyHeight) + 'px)'
				this.cs += 0.01
				// 延迟滚到底部100
				// this.$nextTick(() => {
				this.showScroll = true
				this.scrollToBottom();
				if (!this.showBottom) {
					this.closeBottom();
				}
				// })
			},
			// 获取焦点
			focusContent(e) {
				console.log(e)
				this.showScroll = false
				this.keyHeight = e.detail.height
				this.heightArr[0] = 'calc(100% - ' + (this.bottomHeight + this.keyHeight) + 'px)'
				this.cs += 0.01
				// 延迟滚到底部100
				// this.$nextTick(() => {
				this.showScroll = true
				this.scrollToBottom();
				this.closeBottom();
				// })
			},
			// 获取底部高度
			getBottomHeight(type = "") {
				this.showScroll = false;
				let query = uni.createSelectorQuery().in(this);
				query
					.select("#bottom-fix")
					.boundingClientRect((data) => {
						console.log(data)
						if (data) {
							this.bottomHeight = data.height;
							this.heightArr[0] = 'calc(100% - ' + (this.bottomHeight + this.keyHeight) + 'px)'
							this.cs += 0.01
							// 延迟滚到底部50
							this.$nextTick(() => {
								this.showScroll = true;
								this.scrollToBottom();
							})
						}
					})
					.exec();
			},
			lineChange(event) {
				console.log(event.detail.lineCount, this.rowLine, '行数')
				if (event.detail.lineCount != this.rowLine) {
					this.rowLine = event.detail.lineCount;
					this.$nextTick(() => {
						this.getBottomHeight("change");
					});
				}
			},
			changeBq(emoji) {
				this.content += emoji;
			},
			getData() {
				//表情可以去这里复制https://geekerline.com/emoji/
				this.emojiList = [
					"😀",
					"😃",
					"😄",
					"😁",
					"😆",
					"😅",
					"😂",
					"🤣",
					"😊",
					"😇",
					"🙂",
					"🙃",
					"😉",
					"😌",
					"😍",
					"😘",
					"😗",
					"😙",
					"😚",
					"😋",
					"😛",
					"😝",
					"😜",
					"🤪",
					"🤨",
					"🧐",
					"🤓",
					"😎",
					"🤩",
					"😏",
					"😒",
					"😞",
					"😔",
					"😟",
					"😕",
					"🙁",
					"😣",
					"😖",
					"😫",
					"😩",
					"😢",
					"😭",
					"😤",
					"😠",
					"😡",
					"🤬",
					"🤯",
					"😳",
					"😱",
					"😨",
					"😰",
					"😥",
					"😓",
					"🤗",
					"🤔",
					"🤭",
					"🤫",
					"🤥",
					"😶",
					"😐",
					"😑",
					"😬",
					"🙄",
					"😯",
					"😦",
					"😧",
					"😮",
					"😲",
					"😴",
					"🤤",
					"😪",
					"😵",
					"🤐",
					"🤢",
					"🤮",
					"🤧",
					"😷",
					"🤒",
					"🤕",
					"🤑",
					"🤠",
					"😈",
					"👿",
					"👹",
					"👺",
					"🤡",
					"💩",
					"👻",
					"💀",
					"☠",
					"👽",
					"👾",
					"🤖",
					"🎃",
					"😺",
					"😸",
					"😹",
					"😻",
					"😼",
					"😽",
					"🙀",
					"😿",
					"😾",
				];
			},
			onRefresherPull() {
				// 下拉时触发
				console.log("下拉刷新");
			},
			pullList() {
				this.isShow = true;
				this.triggered = true;
				this.showMore = false
				this.getMessage("pull");
			},
			commonSend(msg) {
				if (msg !== '') {
					let param = {
						data: {
							to_user_id: this.id,
							msg,
						},
						cmd: "ws:sendChatMsg",
					};
					console.log(param)
					this.$store.dispatch("sendMessage", {
						message: JSON.stringify(param),
						type: "user",
					});
					this.content = "";
					this.textFocus = !this.showBottom && !this.typeShow ? true : false;
					console.log(this.textFocus)
				}
			},
			sendMessage() {
				console.log("发送");
				this.commonSend(this.content);
			},
			getTime(time) {
				if (time) {
					return this.$public.formatTime(time);
				}
			},
			getMessage(type = "") {
				let params = {
					page: this.theGetListPage,
					pagesize: this.notNum > 0 && type == 'init' ? this.notNum : this.theGetListPagesize,
					from_user_id: this.id,
				};
				this.API.user
					.getMyChatMsgList(params)
					.then((res) => {
						console.log(res);
						// 如果是请求第一页，证明是首次请求，就重置一下
						if (this.theGetListPage == 1) {
							this.list = [];
						}
						if (res.data.length != 0) {
							res.data.forEach(el => {
								el.msgType = this.getMsgType(el.msg),
									el.msg = ['image', 'video'].includes(this.getMsgType(el.msg)) ? this
									.getUrl(el.msg, this.getMsgType(el.msg) == 'image' ? 'theqnxasendimage' :
										'theqnxasendvideo') : el.msg
							})
							if (type == "init") {
								this.list = this.list.concat(res.data);
							} else {
								this.list.unshift(...res.data);
							}
							// 页面+1
							this.theGetListPage += 1;
							if (type == "init") {
								this.$nextTick(() => {
									this.getBottomHeight();
									this.showMore = this.notNum > 0 ? true : false
								});
							} else if (type == "pull") {
								this.triggered = false;
								this.$nextTick(() => {
									this.getTop(res.data.length)
								});
							}
							this.isRead(res.data);
						} else {
							if (type == "pull") {
								this.triggered = false;
							}
						}
					})
					.catch(async (err) => {
						if (err.code == 410) {
							await this.$store.dispatch("toLogon", {});
							this.theLogonUser = this.$store.state.theLogonUser;
							this.getMessage(type);
						}
					});
			},
			getTop(len) {
				let query = uni.createSelectorQuery().in(this);
				query
					.selectAll(".list-item")
					.boundingClientRect((data) => {
						console.log(data, len)
						if (data.length) {
							let top = 0
							for (let i = 0; i < len - 2; i++) {
								console.log(data[i])
								top += data[i].height
							}
							console.log(top)
							this.top = top + this.theGetListPage;
						}

					})
					.exec();
			},
			isRead(list) {
				let arr = list.filter(
					(el) => el.status == 2 && el.to_user_id == this.theLogonUser.id
				);
				if (arr.length) {
					let params = {
						ids: arr.map((el) => el.id).join(","),
					};
					this.API.user
						.setSystemMsgIsRead(params)
						.then((res) => {
							console.log(res);
							this.$store.dispatch('getNotNum', {})
						})
						.catch(async (err) => {
							if (err.code == 410) {
								await this.$store.dispatch("toLogon", {});
								this.isRead(list);
							}
						});
				}
			},
			showTime() {
				for (let i = 0; i < this.list.length; i++) {
					const currTime = new Date(this.list[i]["created_at"]).getTime();
					if (i == 0) {
						this.list[i].show_time = true;
					} else {
						const lastTime = new Date(this.list[i - 1]["created_at"]).getTime();
						// console.log(i,currTime,lastTime,currTime - lastTime,'时间')
						if (currTime - lastTime >= 180000) {
							this.list[i].show_time = true;
						} else {
							this.list[i].show_time = false;
						}
					}
				}
			},
			scrollToBottom() {
				this.$nextTick(() => {
					this.top = (this.list.length + this.cs) * 10000;
				})
			},
		},
	};
</script>
<style lang="scss" scoped>
	.chat {
		position: relative;
		background: #fafafa;
		height: 100vh;

		.more-message {
			display: flex;
			align-items: center;
			justify-content: center;
			width: 250rpx;
			border-radius: 100rpx 0 0 100rpx;
			position: fixed;
			right: 0;
			top: 300rpx;
			color: #ff812f;
			background: #ffffff;
			z-index: 1000;
			padding: 15rpx 0;
			font-size: 28rpx;

			/deep/ .uicon-arrow-left-double {
				transform: rotate(90deg);
				margin-right: 8rpx;
			}
		}

		.scroll-view {
			background: #fafafa;
			box-sizing: border-box;
			padding: 0 30rpx;

			.list-item {
				box-sizing: border-box;
			}
		}

		.time-box {
			padding-bottom: 55rpx;
			display: flex;
			justify-content: center;

			.time-text {
				font-family: PingFang SC;
				font-weight: 400;
				font-size: 22rpx;
				color: #ffffff;
				background: #eaeaea;
				border-radius: 12rpx;
				padding: 7rpx 23rpx;
			}
		}

		.first-item {
			padding-top: 20rpx;
		}

		.message {
			display: flex;
			align-items: flex-start;
			padding-bottom: 55rpx;

			.avatar {
				width: 80rpx;
				height: 80rpx;
				border-radius: 100%;
				margin-right: 25rpx;
			}

			.content {
				min-height: 80rpx;
				max-width: 60vw;
				line-height: 1.3;
				box-sizing: border-box;
				font-family: PingFang SC;
				font-weight: 400;
				font-size: 28rpx;
				display: flex;
				align-items: center;
				padding: 20rpx;
				border-radius: 20rpx;

				&>view {
					width: 100%;
					word-wrap: break-word;
				}
			}

			&.self {
				justify-content: flex-end;

				.avatar {
					margin: 0 0 0 25rpx;
				}

				.content {
					position: relative;
					background: #ff812f;
					color: #ffffff;

					&::after {
						position: absolute;
						content: "";
						width: 0;
						height: 0;
						border: 16rpx solid transparent;
						border-left: 16rpx solid #ff812f;
						right: -28rpx;
						top: 24rpx;
					}
				}
			}

			&.friend {
				.content {
					background: #ffffff;
					color: #222222;
					position: relative;

					&::after {
						position: absolute;
						content: "";
						width: 0;
						height: 0;
						border: 16rpx solid transparent;
						border-right: 16rpx solid #fff;
						left: -28rpx;
						top: 24rpx;
					}
				}
			}

			.video-box {
				position: relative;
				width: 200rpx;
				height: 250rpx;
				display: flex;
				align-items: center;
				justify-content: center;

				.play-box {
					position: absolute;
				}

				&>image {
					border-radius: 20rpx;
					width: 100%;
					height: 100%;
				}
			}
		}

		.media-height {
			.message {
				height: 305rpx;
				box-sizing: border-box;
			}
		}

		.tool {
			min-height: 100rpx;
			position: fixed;
			width: 100%;
			left: 0;
			bottom: 0;
			background: #ffffff;
			box-sizing: border-box;
			padding-bottom: calc(env(safe-area-inset-bottom)/2);

			.input-box {
				background: #ffffff;
				box-sizing: border-box;
				display: flex;
				padding: 15rpx 30rpx;
				min-height: 100rpx;

				.focus-border {
					width: calc(100% - 170rpx);
					padding: 5rpx 10rpx;
					border: 1px solid #D3D3D3;
					background: #FAFAFA;
					height: 70rpx;
					border-radius: 10rpx;
				}
			}

			.tool-bottom {
				border-top: 1rpx solid rgba(211, 211, 211, 0.5);
				padding: 20rpx 0 0;
				box-sizing: border-box;

				.use-box {
					padding: 26rpx 30rpx;
					display: flex;

					.use-item {
						margin-right: 52rpx;
						display: flex;
						flex-direction: column;
						align-items: center;

						.img-box {
							display: flex;
							align-items: center;
							justify-content: center;
							width: 120rpx;
							height: 119rpx;
							background: #fafafa;
							border-radius: 10rpx;
							border: 1px solid #d3d3d3;
						}

						&>text {
							margin-top: 21rpx;
							font-family: PingFang;
							font-weight: 500;
							font-size: 26rpx;
							color: #999999;
						}
					}
				}
			}

			.btn-box {
				margin-left: 21rpx;
				display: flex;
				align-items: center;
			}

			.icon-image {
				width: 58rpx;
				height: 58rpx;
			}

			.emoji-btn {
				margin-left: 33rpx;
			}
		}

		.message-image {
			width: 200rpx !important;
			height: 250rpx !important;
			border-radius: 20rpx;
		}

		/deep/ .uni-easyinput {
			.uni-easyinput__content {
				border-radius: 10rpx;
				border: 1px solid #D3D3D3 !important;
			}

			input {
				white-space: pre-wrap;
				/* 保留空白符序列，但是当到达容器边界时会自动换行 */
				word-break: break-all;
				/* 允许在单词内换行 */
				overflow-wrap: break-word;
				/* 对于过长的内容，确保正确的换行行为 */
			}
		}


		/deep/ .u-button--info {
			margin-right: 20rpx;

			.u-icon__icon {
				font-size: 60rpx !important;
			}
		}
	}
</style>