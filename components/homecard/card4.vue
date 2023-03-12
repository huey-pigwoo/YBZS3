<template>
	<view :style="style" class="homecard4 radius-24">
		<view class="title-icon">
			<image style="width: 38rpx;height: 38rpx;" src="/static/imgs/title-icon.png"></image>
		</view>
		<view style="padding:0 30rpx;" class="flex-align-center">
			<view style="margin-right: 40rpx;">
				<progressbar outerback="#1A4AE5" innerback="#fff" leftback="#f6f6f6" percentback="#1A4AE5"
					:name='data.f1name' namecolor="#232323"
					:percent="data.f1value"></progressbar>
			</view>
			<view class="flex-between-center" style="flex: 1;">
				<view class="flex-column-center">
					<view style="font-size: 40rpx;">
						{{data.f2value}}

					</view>
					<view class="statusinfo-item-name">
						{{data.f2name}}
					</view>
				</view>
				<view class="flex-column-center">
					<view style="font-size: 40rpx;">
						{{data.f3value}}

					</view>
					<view class="statusinfo-item-name">
						{{data.f3name}}
					</view>
				</view>
				<view class="flex-column-center">
					<view style="font-size: 40rpx;">
						{{data.f4value}}

					</view>
					<view class="statusinfo-item-name">
						{{data.f4name}}
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import progressbar from '@/components/cn-progressbar/cn-progressbar.vue'
	export default {
		data() {
			return {}
		},
		components: {
			progressbar
		},
		props: ['data', 'style']
	}
</script>

<style lang="less">
	.homecard4 {
		padding: 20rpx;
		background-color: #fff;

		.statusinfo-item-name {
			color: #999;
			font-size: 20rpx;
		}
	}
</style>
