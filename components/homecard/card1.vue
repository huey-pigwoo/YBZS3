<template>
	<view @click="click" class="homecard1 radius-24">
		<view style="font-size: 30rpx;margin-bottom: 20rpx;">
			{{data.f1name}}
		</view>
		<view class="flex-baseline">
			<view style="font-size: 50rpx;">
				{{data.f2value}}
			</view>
			<view class="color-8" style="margin-right: 20rpx;">
				{{data.f2unit}}
			</view>
			<view style="font-size: 70rpx;">
				{{data.f3value}}
			</view>
			<view class="color-8">
				{{data.f3unit}}
			</view>
		</view>
		<view class="flex-baseline" style="justify-content: flex-end;">
			<view style="font-size: 24rpx;">
				{{data.f4value}}
			</view>
			<view style="font-size: 14rpx;" class="color-8">
				{{data.f4unit}}
			</view>
		</view>
		<view>
			<progressbar :name='data.f5name' :percent="data.f5value"></progressbar>
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
		props: ['data'],
		methods: {
			click() {
				this.$emit('click')
			}
		}
	}
</script>

<style lang="less">
	.homecard1 {
		height: 450rpx;
		color: #fff;
		background-color: #EC6E6F;
		padding: 20rpx;

		.f1 {
			font-size: 28rpx;
		}

		.f2 {}
	}
</style>
