<template>
	<view @click="itemclick" class="companyinfo">
		<view style="font-size: 32rpx;margin-bottom: 20rpx;" class="ellipse maxwidth_500">{{data.companyname}}</view>
		<view v-if="data.personname||data.tel" style="margin-bottom: 20rpx;" class="flex-between-center">
			<view v-if="data.personname" class="flex-align-center">
				<image style="width: 24rpx;height: 24rpx;" src="/static/imgs/Vector.png" mode=""></image>
				<view class="">
					联系人：<text>{{data.personname}}</text>
				</view>
			</view>
			<view v-if="data.tel" class="flex-align-center">
				<image style="width: 24rpx;height: 24rpx;" src="/static/imgs/phone.png" mode=""></image>
				<view class="">
					{{data.tel}}
				</view>
			</view>
		</view>
		<view class="ellipse">
			{{data.address}}
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {}
		},
		props: ['data'],
		methods: {
			itemclick() {
				this.$emit('click')
			}
		}
	}
</script>

<style lang="less">
	.companyinfo {
		margin-top: 30rpx;
		width: 100%;
		background-color: #fff;
		border-radius: 20rpx;
		padding: 30rpx;
	}
</style>
