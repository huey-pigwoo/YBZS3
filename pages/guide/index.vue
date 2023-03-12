<template>
	<view class="guide">
	</view>
</template>

<script>
	import {
		loginWxMiniByCode
	} from "@/config/api.js"
	export default {
		onLoad() {
			let _self = this
			uni.login({
				success(res) {
					console.log(res.code)
					if (res.code) {
						_self.login(res.code)
					}
				}
			})
		},
		methods: {
			login(code) {
				loginWxMiniByCode({
					code
				}).then((res) => {
					if (res.data.code == 0) {
						uni.setStorageSync('token', res.data.data.loginsuccessinfo.token)
						uni.setStorageSync('userid', res.data.data.loginsuccessinfo.info.id)
						uni.setStorageSync('name', res.data.data.loginsuccessinfo.info.name)
						uni.setStorageSync('tel', res.data.data.loginsuccessinfo.info.tel)
						if (!res.data.data.phoneflg || !res.data.data.yebaoauthority) {
							uni.redirectTo({
								url: `/pages/home/authorization?phoneflg=${res.data.data.phoneflg}`
							})
						} else {
							uni.redirectTo({
								url: '/pages/home/index'
							})
						}
					}
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
