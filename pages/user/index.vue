<template>
	<view class="user">
		<view @click="torole" class="user-item flex-between-center">
			<view class="user-item-title">
				个人信息
			</view>
			<view class="list-item">
					<view class="left">
						<image :src="personCenterData.picture" mode="" style="border-radius: 20rpx;"></image>
					</view>
					<view class="right">
						<view class="f1">{{personCenterData.userName}}</view>
						<view class="f2">{{personCenterData.phone}}</view>
						<view class="personTag">
							{{personCenterData.status}}
						</view>
						
						<view class="f4-group">
							<view class="f4">{{personCenterData.companyName}}</view>
							<view class="f4">{{personCenterData.identityInfo[0].position}}</view>
						</view>
					</view>
				</view>
		</view>
		<view class="user-item flex-between-center">
			<view class="">
				资质证书
			</view>
			<view class="card-column-item" v-for="(item,index) in qualificationList" @click="toqualifications(item)">
				{{item.certificateName}}
			</view>
		</view>
		<view  class="user-item flex-between-center">
			<view class="">
				身份
			</view>
			<view class="card-column-item-identify" v-for="(item,index) in identityInfoList" @click="clickIdentify(item)">
				<text>{{item.companyName}}</text>
				<text>{{item.postName}}</text>
			</view>
		</view>
	</view>
</template>

<script>
	import {
		loginByTelAndPwd
	} from '@/config/api.js'
	import {
		getPersonCenter
	} from '@/config/services.js'
	export default {
		data() {
			return {
				username: '',
				password: "",
				personCenterData: {},
				qualificationList: [], // 资质证书
				identityInfoList: [],
			}
		},
		onShow() {
			this.personCenterInit()
		},
		methods: {
			personCenterInit(){
				getPersonCenter().then(res => {
					console.log(res.data.data)
					this.personCenterData = res.data.data
					this.identityInfoList = res.data.data.identityInfo.map( item => { 
						return { 
							companyName: item.companyName, 
							postName: item.position, 
							companyId: item.companyObjectId, 
							userId: item.businessUserObjectId,
						}})
					this.qualificationList = res.data.data.qualificationList
				})
			},
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
			toqualifications(data) {
				uni.navigateTo({
					url: `/pages/user/qualifications?getCertification=${data.certificateId}&certificateName=${data.certificateName}&certificateRef=${data.certificateRef}&certificateLevel=${data.certificateLevel}`
				})
			},
			clickIdentify(data) {
				uni.navigateTo({
					url: `/pages/user/roleedit?type=post&companyId=${data.companyId}&userId=${data.userId}`
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
			display: flex;
			flex-direction: column;
			align-items: flex-start;
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
				font-size: 32rpx;
			}

			.user-item-title::before {
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
		.list-item {
			background: #fff;
			border-radius: 20rpx;
			padding-top: 32rpx;
			margin-bottom: 20rpx;
			display: flex;
			
			.personTag {
				display: inline-block;
				box-sizing: border-box;
				border-radius: 4px;
				text-align: center;
				margin-right: 10rpx;
				padding: 2rpx 10rpx;
				font-size: 12px;
				white-space: nowrap;
				background-color: #EFEFEF;
				color: #000;
			}
		
		.left {
			width: 200rpx;
			height: 200rpx;
			border-radius: 10rpx;
		}
		.right{
			padding-left: 20rpx;
			
			.f1 {
				font-size: 32rpx;
				font-weight: bold;
			}
			
			.f2,
			.f4 {
				font-size: 24rpx;
				color: rgba(154, 154, 154, 1);
			}
		}
		}
		
		.card-column-item {
			width: 100%;
			background-color: #f6f6f6;
			margin-top: 15rpx;
			padding: 25rpx 15rpx;
			border-radius: 10rpx;
			
		}
		.card-column-item-identify {
			width: 100%;
			background-color: #f6f6f6;
			margin-top: 15rpx;
			padding: 25rpx 15rpx;
			border-radius: 10rpx;
			display: flex;
			justify-content: space-between;
		}
</style>
