<template>
	<view class="list-item" @click="itemclick">
			<view class="left">
				<image :src="cardData.pic" mode="" ></image>
			</view>
			<view class="right">
				<view class="f1">{{cardData.f1}}</view>
				<view class="f2">{{cardData.f2}}</view>
				<view class="f3">
					<Tag
						v-for="(it) in cardData.f3" 
						:key="it.key"
						:status="it.key"
						:value="it.value" 
					/>
				</view>
<!-- 				<view class="personTag">
					{{cardData.f3[0].value || ''}}
				</view> -->
				<view class="f4-group">
					<view class="f4">{{cardData.f4[0].value}}</view>
					<view class="f4">{{cardData.f4[1].value}}</view>
				</view>
			</view>
	</view>
</template>

<script>
	import Tag from '@/components/Tag.vue'
	export default {
		data() {
			return {

			}
		},
		components:{
			Tag
		},
		props: ['cardData'],
		methods: {
			itemclick() {
				this.$emit('click')
			}
		}
	}
</script>

<style lang="less">
	.list-item {
		display: flex;
		background: #fff;
		border-radius: 20rpx;
		padding: 32rpx 32rpx;
		margin-bottom: 20rpx;
		display: flex;
		justify-content: flex-start;
	
		.left {
			
			image {
				width: 200rpx;
				height: 200rpx;
				border-radius: 20rpx;
			}
		}
		.right{
			width: 100%;
			overflow: auto;
			padding-left: 20rpx;
			.f1 {
				font-size: 32rpx;
				font-weight: bold;
			}
			.f3 {
				display: flex;
				overflow: auto;
			}
			.f2,
			.f4 {
				font-size: 24rpx;
				color: rgba(154, 154, 154, 1);
			}
		}
	}
</style>
