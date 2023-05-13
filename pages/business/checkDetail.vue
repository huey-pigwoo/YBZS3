<style lang="scss" scoped>
	.check-container {
		min-height: 100vh;
		padding: 20rpx 20rpx;
		background-color: #F2F3F8;
	}
	
	.uni-section {
		margin: 20rpx 0;
		border-radius: 4rpx;
	}
</style>

<template>
	<view class="check-container">
		<uni-forms label-position="left">
		
		<uni-section padding='0 35rpx 10rpx' class="authPermisonn-section" title="授予权限" type="line" >
			<uni-forms-item label="授权区域" required style="background-color: rebeccapurple;">
				<addressPicker type='permision' class="form-addresspicker" style="height: 35px;"></addressPicker>
			</uni-forms-item>
			<uni-forms-item label="授权时间" required >
				<uni-datetime-picker v-model="range" type="daterange" @change="dateChange" />
			</uni-forms-item>
			<uni-forms-item label="授权业务" required >
				<businessPicker class="form-addresspicker" ></businessPicker>
			</uni-forms-item>
		</uni-section>
		
		<uni-section padding='0 35rpx 10rpx' title="授予单位" type="line" style="margin-top: 0;">	
			<uni-forms-item label="单位" required>
				<uni-easyinput v-model="companyName" placeholder="请输入单位名称" />
			</uni-forms-item>
			<uni-forms-item label="地址" required>
				<addressPicker type='companyAddress' class="form-addresspicker" ></addressPicker>
			</uni-forms-item>
			<uni-forms-item  label=" " >
				<uni-easyinput v-model="address.companyAddressPre" placeholder="详细到街道/组/门牌号" />
			</uni-forms-item>
			
			<uni-forms-item label="电话">
				<uni-easyinput v-model="phoneCountryCode" placeholder="区号" />
				<uni-easyinput v-model="phoneNumber" placeholder="请输入电话号码" />
			</uni-forms-item>
		</uni-section>
		
		<uni-section padding='0 35rpx 10rpx'  title="管理人" type="line" v-for="(item,index) in adminList" :key="index" >
			<uni-forms-item label="姓名">
				<uni-easyinput v-model="adminList[index].userName" placeholder="请输入姓名" />
			</uni-forms-item>
			<uni-forms-item label="电话">
				<uni-easyinput v-model="adminList[index].phone" placeholder="请输入手机号" />
			</uni-forms-item>
		</uni-section>
		</uni-forms>
		<button @click="addPerson">点击继续添加管理员</button>
		<button @click="checkForm">查看表单数据</button>
	</view>
</template>

<script>
	import addressPicker from "@/components/addressPicker/addressPicker.vue"
	import businessPicker from "@/components/businessPicker/businessPicker.vue"
	import { } from "@/config/services.js"
	export default {
		data() {
			return {
		// ----------------------------------------------
		
				// "companyName": data.companyName,
				// "companyTypeIdList": data.companyTypeIdList,
				// "companyAddressPre": data.companyAddressPre,
				// "companyAddress": data.companyAddress,
				// "authStartTime": data.authStartTime,
				// "authEndTime": data.authEndTime,
				// "adminList": data.adminList,
				// "authArea":{ 
				//     "codeList":data.authAreaCodeList
				// },
				// "locationArea":{
				//     "codeList":data.locationAreaCodeList
				// },
				// "phoneNumber": data.phoneNumber,
				// "phoneCountryCode": data.phoneCountryCode
				
		// ----------------------------------------------		
				authAreaCodeList: [],	//授权区域
				locationAreaCodeList: [], // 授权业务
				startTime: '',	// 开始时间
				endTime: '',	// 结束时间
				companyTypeIdList: [],	// 公司类型
				companyName: '',	// 公司名称
				regionCode: '',		// 公司地址
				companyAddressPre: '',	//公司详细地址
				phoneCountryCode: '',	// 区号
				phoneNumber: '',	// 电话号码
				adminList: [{userName: '', phone: ''}],
				range: [],
				typeList: [
					{ text: '驯养繁殖', value: 0},
					{ text: '收容救助', value: 1},
					{ text: '行政部门', value: 2},
					{ text: '专委会', value: 3},
				]
			}
		},
		components: {
			addressPicker,
			businessPicker
		},
		onLoad(){
			uni.removeStorageSync('permisionAddress')
			uni.removeStorageSync('permisionBusiness')
			uni.removeStorageSync('companyAddress')
		},
		methods: {
			change(e){
				console.log(e)
			},
			checkForm(){
				const authAddress = uni.getStorageSync('permisionAddress')
				const authBusiness = uni.getStorageSync('permisionBusiness')
				const companyAddress = uni.getStorageSync('companyAddress')
				if(authAddress) this.authAreaCodeList = authAddress.map(item => item.code)
				if(authAddress) this.locationAreaCodeList = authBusiness.map(item => item.id)
				if(authAddress) this.address.regionCode = companyAddress.map(item => item.code)
				// this.authAreaCodeList = authAddress.map(item => item.code)
				// this.locationAreaCodeList = authBusiness.map(item => item.id)
				// this.address.regionCode = companyAddress.map(item => item.code)
				console.log(
					this.authAreaCodeList,
					this.locationAreaCodeList,
					this.startTime,
					this.endTime,
					this.companyTypeIdList,
					this.companyName,
					this.regionCode,
					this.companyAddressPre,
					this.phoneCountryCode,
					this.phoneNumber,
					this.adminList
				)
			},
			getaddressInfo(data){
				console.log(data)
			},
			dateChange(e){
				console.log('时间选择器',e)
				this.startTime = e[0]
				this.endTime = e[1]
			},
			addPerson(){
				this.adminList = [...this.adminList,{name: '', phone: ''}]
			}
		}
	}
</script>


