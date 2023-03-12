<template>
	<view @click="click" :style="style" class="homecard3 radius-24">
		<view>
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
		</view>
		<view class="flex-align-center">
			<view style="margin-right: 20rpx;">
				<view style="font-size: 18rpx; color: rgba(#fff, 0.6);" class="">
					{{data.f3name}}
					{{data.f3value}}
					{{data.f3unit}}
				</view>
				<view style="font-size: 18rpx; color: rgba(#fff, 0.6);" class="">
					{{data.f4name}}
					{{data.f4value}}
					{{data.f4unit}}
				</view>
			</view>
			<view class="">
				<text style="font-size: 50rpx;">{{data.f5value}}</text>
				{{data.f5unit}}
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
	.homecard3 {
		height: 215rpx;
		color: #fff;
		background-color: #5a8ee7;
		padding: 20rpx;
	}
</style>
