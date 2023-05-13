
<template>
	<view class="changerole">
		<view class="form-itemblock changerole-box">
			<view class="block-title">
				个人照片
			</view>
			<view style="position: relative;width: 100%;">
				<makemedia @deleteimg='deleteimg()' @swiperclick='swiperclick()' :imgidx='imgidx' @getchoose="getimg"
					:imglist='imglist'>
				</makemedia>
			</view>
		</view>
		<view class="changerole-box">
			<view class="changerole-item flex-align-center">
				<view class="field-title">
					修改姓名
				</view>
				<input v-model="name" style="background: none;flex: 1;" type="text">
			</view>
			<view class="changerole-item flex-align-center">
				<view class="field-title">
					更换号码
				</view>
				<input v-model="tel" style="background: none;flex: 1;" type="text">
				<view :class="codetxt=='获取验证码'?'':'disabled-btn'" @click="getcode" class="code-btn">
					{{codetxt}}
				</view>
			</view>
			<view class="changerole-item flex-align-center">
				<view class="field-title">
					验证码
				</view>
				<input v-model="smscode" style="background: none;flex: 1;" type="text">
			</view>
		</view>
		<view class="foot flex">
			<view @click="cancel" class="cancel-btn">
				取消
			</view>
			<view @click="save" class="confirm-btn">
				确认
			</view>
		</view>
	</view>
</template>

<script>
	import {
		updateRegistInfo,
		getSmsCode
	} from '@/config/api.js'
	import {
		getPersonBaseInfo
	} from '@/config/services.js'
	import makemedia from "@/components/makemedia/index.vue"
	export default {
		data() {
			return {
				name: uni.getStorageSync('name') || '',
				tel: uni.getStorageSync('tel') || '',
				smscode: '',
				codetxt: '获取验证码',
				imglist: [],
				imgidx: 0,
			}
		},
		components: {
			makemedia
		},
		onShow(){
			getPersonBaseInfo().then(
				res => {
					console.log('获取个人详情',res.data.data.material.realUrl)
					this.name = res.data.data.username
					this.imglist = [res.data.data.material.realUrl]
				}
			)
		},
		methods: {
			deleteimg(imgidx) {
				this.imglist.splice(imgidx, 1)
			},
			//获取上传的图片
			getimg(data) {
				this.imglist = this.imglist.concat(data)
			},
			checkForm(){
				console.log(this.list)
			},
			cancel() {
				uni.navigateBack()
			},
			save() {
				if (!this.name && !this.tel) {
					uni.showToast({
						title: '姓名不能为空',
						icon: 'none'
					})
					return
				}
				if (!this.tel && this.smscode) {
					uni.showToast({
						title: '手机号不能为空',
						icon: 'none'
					})
					return
				}
				updateRegistInfo({
					name: this.name,
					tel: this.tel,
					smscode: this.smscode
				}).then(res => {
					if (res.data.code == 0) {
						uni.setStorageSync('name', this.name)
						uni.setStorageSync('tel', this.tel)
						setTimeout(() => {
							uni.showToast({
								title: '保存成功'
							})
						}, 50)
						setTimeout(() => {
							uni.navigateBack()
						}, 1500)
					}
				})
			},
			//获取验证码
			getcode() {
				if (!this.tel) {
					uni.showToast({
						title: '请输入手机号',
						icon: 'none'
					})
					return
				}
				if (this.codetxt != '获取验证码') {
					return
				}
				getSmsCode({
					tel: this.tel
				})
				let str = 60
				var timer = setInterval(() => {
					str -= 1
					this.codetxt = `重新获取（${str}）`
					if (str == 0) {
						clearInterval(timer)
						this.codetxt = '获取验证码'
					}
				}, 1000)
			}
		}
	}
</script>

<style lang="less">
	page {
		background: #f5f5f5;
	}

	.changerole {
		.changerole-box {
			border-radius: 24rpx;
			margin: 0 30rpx;
			margin-top: 20rpx;
			font-size: 28rpx;
			position: relative;
			background: #fff;

			.changerole-item {
				padding: 20rpx;
				border-bottom: 1px solid #eee;

				&:last-child {
					border-bottom: none;
				}

				.field-title {
					width: 140rpx;
				}

				.code-btn {
					background: #3d71e7;
					color: #fff;
					border-radius: 10rpx;
					padding: 16rpx 24rpx;
				}

				.disabled-btn {
					background: #f2f2f2;
					color: #cecece;
				}
			}
		}
	}
</style>
