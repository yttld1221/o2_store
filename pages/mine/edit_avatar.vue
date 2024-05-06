<template>
	<view class="content">
		<!-- 头像 -->
		<view class="">
			<qf-image-cropper :width="500" :height="500" :radius="0" @crop="handleCrop"></qf-image-cropper>
		</view>
	</view>
</template>

<script>
	export default {
		data(){
			return {
				
			}
		},
		onLoad() {
			
		},
		methods:{
			handleCrop:async function(e) {
				// console.log('handleCrop_e',e);
				// 因为全局方法 upLoadImage（）是专门处理数组的，所以这里也要传数组
				let theName = [];
				let nowDateTime = this.$public.getNowDateTime();
				let that = this;
				theName.push(nowDateTime+'_avatar_'+0)
				// 调用全局方法
				await that.$store.dispatch('upLoadImage',{
					type:'img',
					tempFilePaths:[e.tempFilePath], // 需要传数组，但是这个组件返回的是对象：handleCrop_e {tempFilePath: "http://tmp/pJBLBVfx8R3p39213d9ebb4528cf8551283d7fb1345a.png"}
					name:theName,
					tempFiles:[{
						extname:e.tempFilePath.substring(e.tempFilePath.lastIndexOf('.')+1,e.tempFilePath.length),
						uuid:0
					}]
					// extname:e.tempFiles[0].extname,
					// uuid:e.tempFiles[0].uuid
				})
				
				// 注意全局变量中的tempImageUrl存放了最新的头像url(阿里云上的地址)
				uni.navigateBack();
			}
		}
	}
</script>

<style>
</style>