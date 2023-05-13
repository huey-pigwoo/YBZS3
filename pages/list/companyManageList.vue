<template>
	<view class="page-container">
		<view class="addresspicker-area">
			<addressPicker></addressPicker>
		</view>
		<view class="">
			<pureList :listData="checkList" type="check"></pureList>
		</view>
	</view>
</template>

<script>
	import {
		getEmployeeList
	} from '@/config/services.js'
	import pureList from '@/components/pureList/pureList.vue'
	import addressPicker from '@/components/addressPicker/addressPicker.vue';
	export default {
		data() {
			return {
				checkList: [],
				orgname: uni.getStorageSync('orgname') || '四川省',
			}
		},
		components: {
			pureList,
			addressPicker,
		},
		onLoad(){
			this.init()
		},
		methods: {
			changeAddress(orgname, orgcode) {
				this.orgcode = orgcode
				this.orgname = orgname
				this.getlist('refresh')
			},
			init(){
				getEmployeeList().then(res => {
					console.log('测试列表数据',res.data.data.records)
					this.checkList = res.data.data.records
				})
			}
		}
	}
</script>

<style lang="scss" scoped>
	.page-container {
		min-height: 100vh;
		padding: 20rpx 20rpx;
		background-color: #F2F3F8;
		border: 1px solid sandybrown;
		
		.addresspicker-area {
			display: flex;
		}
	}
</style>
