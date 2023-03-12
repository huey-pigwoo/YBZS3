<template>
	<view class="identity">
		<view @click="tocompany" class="add-btn">
			点击登记单位
		</view>
		<view @click="itemclick(index,item)" :class="activeidx==index?'identity-item-active':''"
			class="identity-item flex-align-center" v-for="(item,index) in list" :key="index">
			<view class="ellipse width_400">
				{{item.deptname}}
			</view>
			<view class="">
				{{item.rolename}}
				<text v-if='item.checkflg==2' style="color: orange;">（待审核）</text>
				<text v-if='item.checkflg==1' style="color: #ff0000;">（未通过）</text>
			</view>
		</view>
	</view>
</template>

<script>
	import {
		getRoleByPersonId
	} from '@/config/api.js'
	export default {
		data() {
			return {
				list: [],
				activeidx: 0
			}
		},
		onShow() {
			this.getlist('refresh')
		},
		methods: {
			tocompany() {
				uni.navigateTo({
					url: '/pages/business/chooseCompany'
				})
			},
			getlist() {
				getRoleByPersonId().then(res => {
					if (res.data.code == 0) {
						this.list = res.data.data
						this.list.map((item, index) => {
							if (item.selectflg) {
								this.activeidx = index
							}
						})
					}
				})
			},
			itemclick(idx, data) {
				// this.activeidx = idx
				uni.navigateTo({
					url: `/pages/user/roleedit?flg=0&roleid=${data.roleid}`
				})
			}
		}
	}
</script>

<style lang="less">
	page {
		background: #f5f5f5;
	}

	.identity {
		padding: 0 30rpx;

		.add-btn {
			color: #3d71e7;
			margin: 20rpx 0;
		}

		.identity-item {
			border-radius: 20rpx;
			background: #fff;
			padding: 30rpx;
			font-weight: bold;
			margin-bottom: 20rpx;
		}

		.identity-item-active {
			background: #3d71e7;
			color: #fff;
		}
	}
</style>
