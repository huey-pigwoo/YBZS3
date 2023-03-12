<template>
	<view @click="click" :style="style" class="homecard2 radius-24">
		<view style="margin-bottom: 10rpx;">
			{{data.f1name}}
		</view>
		<view class="flex">
			<view class="flex-baseline">
				<view class="" style="font-size: 50rpx;">
					{{data.f2value}}
				</view>
				<view class="">
					{{data.f2unit}}

				</view>
			</view>
			<view class="flex-baseline" style="margin-left: 30rpx;">
				<view style="font-size: 50rpx;" class="">
					{{data.f3value}}
				</view>
				<view class="">
					{{data.f3unit}}
				</view>
			</view>
		</view>
		<view class="flex">
			<view style="margin-right: 20rpx;" class="flex-column-center">
				<view class="">
					<text style="font-size: 20rpx;">{{data.f4value}}</text>
					<text style="font-size: 12rpx;">{{data.f4unit}}</text>
				</view>
				<view style="font-size: 18rpx;">
					{{data.f4name}}
				</view>
			</view>
			<view style="margin-right: 20rpx;" class="flex-column-center">
				<view class="">
					<text style="font-size: 20rpx;">{{data.f5value}}</text>
					<text style="font-size: 12rpx;">{{data.f5unit}}</text>
				</view>
				<view style="font-size: 18rpx;">
					{{data.f5name}}
				</view>
			</view>
			<view style="margin-right: 20rpx;" class="flex-column-center">
				<view class="">
					<text style="font-size: 20rpx;">{{data.f6value}}</text>
					<text style="font-size: 12rpx;">{{data.f6unit}}</text>
				</view>
				<view style="font-size: 18rpx;">
					{{data.f6name}}
				</view>
			</view>
			<view class="flex-column-center">
				<view class="">
					<text style="font-size: 20rpx;">{{data.f7value}}</text>
					<text style="font-size: 12rpx;">{{data.f7unit}}</text>
				</view>
				<view style="font-size: 18rpx;">
					{{data.f7name}}
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {}
		},
		props: ['data', 'style'],
		methods: {
			click() {
				this.$emit('click')
			}
		}
	}
</script>

<style lang="less">
	.homecard2 {
		height: 215rpx;
		color: #fff;
		background-color: #FC9E7D;
		padding: 20rpx;
	}
</style>
