<template>
	<view class="userButton-container" >
			<view class="userButton-item" 
			  v-for="(item,index) in testButtonGroup" 
			  :key="index" 
			  @click="goPage(item.authHandleResult.haveAuth,item.componentId)"
			  :style="{
				  margin: `10rpx calc((100% - 100rpx * ${testButtonGroup.length}) / ${testButtonGroup.length} / 2)`
				  }"
			>
				<view :class="{'icon-box':true, 'active':!item.authHandleResult.haveAuth}">
					<uni-icons custom-prefix="iconfont" color="#fff" :type="item.icon" size="20" style="line-height: 20px;"></uni-icons>
				</view>
				{{item.componentName}}
			</view>
	</view>
</template>

<script>
	import { allUserButton, iconMap } from '@/utils/pageButtonConfig.js'
	import { userButtonConfig } from '@/utils/routerConfig.js'
	export default {
		name:"userButtonGroup",
		data() {
			return {
				// userButtonGroup: uni.getStorageSync('userPageConfig').filter(item => allUserButton.map(item => item.componentId).includes(item.componentId)),
				testButtonGroup: [
					{ componentName: '业务记录', componentId: 'businessNode', authHandleResult: {haveAuth: true, authErrorMsg: null}},
					{ componentName: '人员管理', componentId: 'personManage', authHandleResult: {haveAuth: true, authErrorMsg: null}},
					{ componentName: '个人中心', componentId: 'personCenter', authHandleResult: {haveAuth: true, authErrorMsg: null}},
					{ componentName: '单位管理', componentId: 'companyManage', authHandleResult: {haveAuth: true, authErrorMsg: null}},
					{ componentName: '业务审核', componentId: 'businessCheck', authHandleResult: {haveAuth: true, authErrorMsg: null}},
				],
			};
		},
		onReady(){
			this.testButtonGroup = this.testButtonGroup.map(item => { return {
				componentName: item.componentName,
				componentId: item.componentId,
				icon: iconMap[item.componentId],
				authHandleResult: item.authHandleResult
			}})
		},
		onShow() {
			this.init()
		},
		methods: {
			getUserButton(){
				console.log(this.testButtonGroup)
			},
			// 点击按钮跳转到对应的页面
			goPage(auth,btnName) {
				if(auth) {
					uni.navigateTo({url: userButtonConfig[btnName]})
				} else {
					console.log('没权限')
				}
				
			}
		}
	}
</script>

<style lang="scss" scoped>
	.userButton-container {
		display: flex;
		width: 100%;
		padding: 20rpx 0;
		min-height: 100rpx;
		background-color: #fff;
		border-radius: 15rpx;
		
		
		.userButton-item {
			display: flex;
			justify-content: center;
			width: 100rpx;
			flex-wrap: wrap;
			height: 100rpx;
			align-items: center;
			margin: 10rpx calc((100% - 100rpx * 5) / 5 / 2);
			
			.icon-box {
				display: flex;
				justify-content: center;
				align-items: center;
				width: 60rpx;
				height: 60rpx;
				padding: 10rpx;
				border-radius: 25px;
				background-color: #618EF5;
			}
			.active {
				width: 60rpx;
				height: 60rpx;
				padding: 10rpx;
				border-radius: 25px;
				background-color: #ccc;
			}
		}
		
		
	}
</style>

