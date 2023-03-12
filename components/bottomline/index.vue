<template name="screen">
	<view class="bottomline display-flex-align-center" catchtouchmove="true"><view class="bottomline_info">我是有底线的...</view></view>
</template>

<script>
export default {
	name: 'bottomline',
	props: {}
};
</script>

<style scoped lang="less">
.bottomline {
	margin: 32rpx 0 160rpx;
	justify-content: center;
	.bottomline_info {
		margin: 0 10rpx;
		font-size: 28rpx;
		color: #999;
		text-align: center;
	}
}
</style>
