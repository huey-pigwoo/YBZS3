<template>
	<view class="guide">
		<button @click="gotoHome">点击</button>
	</view>
</template>

<script>
	import {
		loginWxMiniByCode,
		getUserPostList,
		getUserInfo
	} from "@/config/services.js"
	export default {
		onLoad() {
			let _self = this
			uni.login({
				success(res) {
					console.log(res.code)
					if (res.code) {
						_self.login(res.code)
					}
				},
			})
		},
		methods: {
			login(code) {
				loginWxMiniByCode({
					jsCode:code,
					loginType: 'mini'
				}).then((res) => {
					if (res.data.code == 0) {
						uni.setStorageSync('token', res.data.data.token)
						uni.setStorageSync('phone', res.data.data.phone)
						uni.setStorageSync('bindingStatus', res.data.data.bindingStatus)
						console.log(res.data.data.bindingStatus)
						if(res.data.data.bindingStatus) {
							getUserPostList().then(res => {
								if(res.data.code == 4) return;
								if(res.data.data.code == 18) {
									console.log('没审核')
									uni.redirectTo({
										url: `/pages/business/chooseCompany`
									})
								}
								else {
									console.log('审核进首页')
									uni.setStorageSync('postList',res.data.data.data)
									uni.reLaunch({
										url: '/pages/home/index'
									})
								}
							})
						} else {
							uni.redirectTo({
								url: '/pages/home/authorization'
							})
						}

						// if (!res.data.data.bindingStatus) {
						// 	uni.redirectTo({
						// 		url: `/pages/home/authorization`
						// 	})
						// } else {
						// 	uni.redirectTo({
						// 		url: '/pages/home/index'
						// 	})
						// }
					}
				})
			},
			gotoHome(){
				uni.redirectTo({
					url: '/pages/home/index'
				})
			}
		}
		
	}
</script>

<style lang="less">
	page {
		background: #fff;
	}
</style>
