<template>
	<view class="authorization">
		<view class="authorization-info">
			<view class="title">
				隐私政策
			</view>
			<view class="info-box">
				<view class="">
					欢迎您使用野保助手!
				</view>
				<view class="">
					成都乐创信息科技有限公司作为野保助手小程序(以下简称“野保助手”）的运营主体，成都市林业和园林管理局作为野保助手小程序的主办单位，根据《用户服务协议》(以下简称“本协议”）为您提供服务。
				</view>
				<view class="">
					为使用野保助手服务，请您务必审慎阅读、充分理解本协议各条款内容，特别是免除或者限制责任的条款、对用户权利进行限制的条款等。限制、免责条款或者其他涉及您重大权益的条款可能以加粗形式提示您重点注意。
				</view>
				<view class="">
					除非您已充分阅读、完全理解并接受本协议所有条款，否则您无权注册、登录或使用野保助手服务。您点击“登录（具体措辞详见注册页面)”或您进行注册、使用、获取用户帐号、登录及使用相关服务的行为或者以其他任何明示或者默示方式表示接受本协议的，均视为您已阅读并同意签署本协议。
				</view>
				<view class="">
					如果您不具有完全民事行为能力或是18岁以下未成年人，请在法定监护人(以下简称"监护人"）的陪同下阅读和签署本协议。您有违反本协议的任何行为时，野保助手有权根据您违反约定的情形单方采取限制、中止或终止向您提供服务等措施，并有权追究您相关责任。
				</view>
				<view class="">
					一、定义与解释
				</view>
				<view class="">
					如无特别说明，下列术语在本协议中的定义为:
				</view>
				<view class="">
					1.1用户是指注册、登录、使用野保助手的个人或组织，在本协议中更多地称为“您”。
				</view>
				<view class="">
					1.2野保助手小程序是用户通过身份认证，即可在小程序通办多项民生服务事项的微信小程序。
				</view>
				<view class="">
					1.3野保助手帐号是指您在野保助手小程序通过微信授权绑定方式注册、登录野保助手帐号，并通过实名认证、人脸识别等核验方式进行身份认证的，用于登录野保助手小程序办理事项的帐号。(以下简称“野保助手帐号”)
				</view>
			</view>
		</view>
		<view class="foot flex">
			<view @click="refuse" class="cancel-btn">
				不同意
			</view>
			<view v-if="phoneflg" @click="agree" class="confirm-btn">
				同意
			</view>
			<button v-else class="confirm-btn" @getphonenumber="getPhoneNumber" open-type="getPhoneNumber">同意</button>
		</view>
		<Dialog :info='dialoginfo' v-if="dialogvisible" @confirm="diaconfirm" exitflg @cancel="diacancel">
		</Dialog>
	</view>
</template>

<script>
	import {
		getWxminiTel,
		updateTel
	} from '@/config/api.js'
	import Dialog from '@/components/dialog/index.vue'
	export default {
		data() {
			return {
				dialogvisible: false,
				dialoginfo: '拒绝协议将退出小程序，是否确认退出？',
				phone: '',
				phoneflg: false
			}
		},
		onLoad(props) {
			uni.hideHomeButton()
			if (props.phoneflg == 'true') {
				this.phoneflg = true
			}
			uni.login({
				success(res) {
					console.log(res)
				}
			})
		},
		components: {
			Dialog
		},
		methods: {
			getPhoneNumber(val) {
				console.log(val)
				if (!val.detail.code) {
					this.dialoginfo = "拒绝授权将退出小程序，是否确认退出？"
					this.dialogvisible = true
					return
				}
				getWxminiTel({
					code: val.detail.code
				}).then((res) => {
					if (res.data.code == 0) {
						this.phone = res.data.data.phone_info.phoneNumber
						uni.setStorageSync('phone', this.phone)
						updateTel({
							tel: this.phone
						}).then((res1) => {
							if (res1.data.code == 0) {
								uni.setStorageSync('token', res1.data.data.loginsuccessinfo.token)
								uni.setStorageSync('userid', res1.data.data.loginsuccessinfo.info.id)
								if (res1.data.data.firstpageflg) {
									uni.redirectTo({
										url: '/pages/home/index'
									})
								} else {
									uni.redirectTo({
										url: '/pages/business/chooseCompany'
									})
								}
							}
						})
					}
				})
			},
			agree() {
				uni.redirectTo({
					url: '/pages/business/chooseCompany'
				})
			},
			refuse() {
				this.dialoginfo = "拒绝协议将退出小程序，是否确认退出？"
				this.dialogvisible = true
			},
			diacancel() {
				this.dialogvisible = false
			}
		}
	}
</script>

<style lang="less">
	.authorization {
		.authorization-info {
			padding: 40rpx 40rpx 160rpx;
			border-radius: 20rpx;
			background: #fff;
			width: 92%;
			margin: 0 auto;
			overflow-y: hidden;

			.title {
				text-align: center;
				font-size: 40rpx;
				margin-bottom: 20rpx;
			}

			.info-box {
				height: 1000rpx;
				overflow-y: auto;
			}
		}

		.foot {
			position: fixed;
			bottom: 80rpx;
			width: 100%;

			.cancel-btn {
				width: 25%;
				text-align: center;
				color: #3D71E7;
				background: #E1EAFF;
				margin-right: 4%;
				margin-left: 3%;
				border-radius: 40rpx;
				height: 80rpx;
				line-height: 80rpx;
			}

			.confirm-btn {
				width: 65%;
				text-align: center;
				color: #fff;
				background: #3D71E7;
				border-radius: 40rpx;
				height: 80rpx;
				line-height: 80rpx;
			}
		}
	}

	button::after {
		border: none;
	}
</style>
