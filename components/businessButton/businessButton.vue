<template>
	<view class="businessButton-container">
		<view class="businessButton-item"
		  v-for="(item,index) in businessButtonGroup" 
		  :key="index" 
		  @click="goPage(item.authHandleResult.haveAuth,item.componentId)"
		>
			<view :class="{'icon-box':true, 'active':!item.authHandleResult.haveAuth}" :style="{'background': item.color}">
				<uni-icons custom-prefix="iconfont" color="#fff" type="icon-ziliao" size="25" ></uni-icons>
			</view>
			{{item.componentName}}
		</view>
	</view>
</template>

<script>
	import { allBusinessButton, businessButtonColor } from '@/utils/pageButtonConfig.js'
	import { businessButtonConfig } from '@/utils/routerConfig.js'
	export default {
		name:"businessButton",
		data() {
			return {
				businessButtonGroup: [
					{ componentName: '引种登记', componentId: 'incomeCheckIn' , authHandleResult: {haveAuth: false, authErrorMsg: null}},
					{ componentName: '繁殖登记', componentId: 'breedCheckIn' , authHandleResult: {haveAuth: false, authErrorMsg: null}},
					{ componentName: '死亡登记', componentId: 'deathCheckIn' , authHandleResult: {haveAuth: false, authErrorMsg: null}},
					{ componentName: '逃逸登记', componentId: 'escapeCheckIn' , authHandleResult: {haveAuth: false, authErrorMsg: null}},
					{ componentName: '出售登记', componentId: 'saleCheckIn' , authHandleResult: {haveAuth: false, authErrorMsg: null}},
					{ componentName: '用药登记', componentId: 'durgCheckIn' , authHandleResult: {haveAuth: false, authErrorMsg: null}},
					{ componentName: '接受确认', componentId: 'acceptCheckIn' , authHandleResult: {haveAuth: true, authErrorMsg: null}},
					// { componentName: '补充登记', componentId: 'additionCheckIn' , authHandleResult: {haveAuth: true, authErrorMsg: null}},
					{ componentName: '展演登记', componentId: 'showCheckIn' , authHandleResult: {haveAuth: false, authErrorMsg: null}},
					{ componentName: '归还登记', componentId: 'restoreCheckIn' , authHandleResult: {haveAuth: true, authErrorMsg: null}},
					{ componentName: '放归登记', componentId: 'releaseCheckIn' , authHandleResult: {haveAuth: false, authErrorMsg: null}},
					{ componentName: '救助登记', componentId: 'saveCheckIn' , authHandleResult: {haveAuth: true, authErrorMsg: null}},
					{ componentName: '移交登记', componentId: 'transferCheckIn' , authHandleResult: {haveAuth: true, authErrorMsg: null}},
				]	
			};
		},
		onReady(){
			console.log('onReady')
			this.businessButtonGroup = this.businessButtonGroup.map(item => { return {
				 componentName: item.componentName, 
				 componentId: item.componentId, 
				 color: businessButtonColor[item.componentId],  
				 authHandleResult: item.authHandleResult
			}})
		},
		methods: {
			getButtonList(){
				console.log(this.businessButtonGroup)
			},
			// 点击按钮跳转到对应的页面
			goPage(auth,btnName) {
				if(auth) {
					uni.navigateTo({url: businessButtonConfig[btnName]})
				} else {
					console.log('没权限')
				}
				
			}
		}
	}
</script>

<style lang="scss" scoped>

	.businessButton-container {
		display: flex;
		flex-wrap: wrap;
		width: 100%;
		min-height: 100rpx;
		background-color: #fff;
		border-radius: 15rpx;
		padding: 20rpx 0;
		margin: 30rpx 0;
		
		.businessButton-item {
			display: flex;
			flex-wrap: wrap;
			justify-content: center;
			width: 100rpx;
			height: 100rpx;
			align-items: center;
			margin: 10rpx calc((100% - 100rpx * 4) / 4 / 2);
			
			.icon-box {
				display: flex;
				justify-content: center;
				align-items: center;
				width: 70rpx;
				height: 70rpx;
				padding: 10rpx;
				border-radius: 10px;
				background-color: #618EF5;
			}
			.active {
				width: 70rpx;
				height: 70rpx;
				padding: 10rpx;
				background-color: #ccc !important;
			}
		}
	}
</style>