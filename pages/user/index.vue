<template>
	<view class="user">
		<view @click="torole" class="user-item flex-between-center">
			<view class="">
				个人信息
			</view>
			<view class="edit-btn">
				修改
			</view>
		</view>
		<view @click="toidentity" class="user-item flex-between-center">
			<view class="">
				身份管理
			</view>
			<view class="edit-btn">
				修改
			</view>
		</view>
		<view @click="toqualifications" class="user-item flex-between-center">
			<view class="">
				资质证明管理
			</view>
			<view class="edit-btn">
				修改
			</view>
		</view>
	</view>
</template>

<script>
	import {
		loginByTelAndPwd
	} from '@/config/api.js'
	export default {
		data() {
			return {
				username: '',
				password: ""
			}
		},
		methods: {
			torole() {
				uni.navigateTo({
					url: '/pages/user/changerole'
				})
			},
			toidentity() {
				uni.navigateTo({
					url: '/pages/user/identity'
				})
			},
			toqualifications() {
				uni.navigateTo({
					url: '/pages/user/qualifications'
				})
			}

		}
	}
</script>

<style lang="less">
	page {
		background: #f5f5f5;
	}

	.user {
		.user-item {
			border-radius: 24rpx;
			padding: 30rpx;
			padding-left: 40rpx;
			font-weight: bold;
			margin: 0 30rpx;
			margin-top: 20rpx;
			font-size: 28rpx;
			position: relative;
			background: #fff;

			.edit-btn {
				color: #3d71e7;
				font-weight: normal;
				font-size: 22rpx;
			}

			&::before {
				content: '';
				position: absolute;
				left: 28rpx;
				display: block;
				width: 6rpx;
				height: 24rpx;
				background-color: #3d71e7;
			}
		}
	}
</style>
