<template>
	<view class="prew-video">
		<u-popup :safeAreaInsetBottom="false" mode="center" :show="show" @close="close" @open="open">
			<view v-if="show" @click="close" class="flex-center">
				<image  mode="widthFix" :src="imageUrl"></image>
			</view>
		</u-popup>
	</view>
</template>

<script>
	export default {
		components: {},
		data() {
			return {
				imageUrl: "",
				show: false,
			};
		},
		methods: {
			open(url) {
				this.show = true;
				this.imageUrl = url;
			},
			close() {
				this.show = false;
			},
		},
	};
</script>
<style lang="scss" scoped>
	.prew-video {
		.flex-center {
			justify-content: center;
			background-color: #000000 !important;
			box-sizing: border-box;
			display: flex;
			flex-direction: column;
			width: 100vw;
			height: 100vh;
			padding-bottom: calc(10px + env(safe-area-inset-bottom));

			&>image {
				width: 100%;
				height: 100%;
			}
		}
	}
</style>