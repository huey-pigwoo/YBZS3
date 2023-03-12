<template>
	<view class="login">
		<view class="form">
			<view class="form-item">
				<view class="item-field">账号</view>
				<input class="item-input" v-model='username' type="text" placeholder="请输入账号">
			</view>
			<view class="form-item">
				<view class="item-field">密码</view>
				<input class="item-input" v-model='password' type="text" placeholder="请输入密码">
			</view>
		</view>
		<view @click="login" class="submit">
			登录
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
			login() {
				loginByTelAndPwd({
					tel: this.username,
					pwd: this.password
				}).then((res) => {
					if (res.data.code == 0) {
						uni.setStorage({
							key: 'token',
							data: res.data.data.token
						})
						uni.setStorage({
							key: 'userid',
							data: res.data.data.info.id
						})
						uni.reLaunch({
							url: '/pages/home/index'
						})
					}
				})
			}
		}
	}
</script>

<style lang="less">
	.login {
		.form {
			position: fixed;
			bottom: 260rpx;
			width: 90%;
			left: 5%;

			.form-item {
				margin-top: 40rpx;
				.item-field{
					margin-bottom: 20rpx;
				}
				.item-input{
					border-bottom: 1px solid #eee;
				}
			}
		}

		.submit {
			position: fixed;
			bottom: 80rpx;
			left: 5%;
			width: 90%;
			line-height: 80rpx;
			background: #009688;
			color: #fff;
			text-align: center;
			border-radius: 40rpx;
		}
	}
</style>
