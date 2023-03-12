<template>
	<view @click="itemclick" class="card_overview">
		<view v-if="data.title" class="card-up flex-baseline">
			<view style="font-size: 32rpx;" class="ellipse maxwidth_500">{{data.title}}</view>
			<view v-if="data.lbl" class="card-lbl" style="border-radius: 8rpx;padding: 10rpx 20rpx;">{{data.lbl}}</view>
		</view>
		<view class="card-down flex-between-center">
			<view v-for="(item,index) in data.data" :key="index" class="card-down-item flex-column-center">
				<view class="flex-baseline">
					<view class="card-value">
						{{item.value}}
					</view>
					<view class="card-unit">
						{{item.unit}}
					</view>
				</view>
				<view class="card-name">
					{{item.name}}
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				list: [{
					name: '繁殖登记',
					value: 213,
					unit: '件'
				}, {
					name: '动物数量',
					value: 123,
					unit: '万只'
				}, {
					name: '企业数量',
					value: 1232,
					unit: '家'
				}]
			}
		},
		props: ['data'],
		methods: {
			itemclick() {
				this.$emit('click')
			}
		}
	}
</script>

<style lang="less">
	.card_overview {
		width: 100%;
		background-color: #F6F6F6;
		border-radius: 20rpx;
		padding: 30rpx;

		.card-up {
			margin-bottom: 30rpx;
			white-space: nowrap;
			overflow: hidden;
			text-overflow: ellipsis;
			font-weight: bold;
		}

		.card-value {
			font-weight: bold;
			font-size: 30rpx
		}

		.card-unit {
			font-size: 20rpx
		}

		.card-lbl {
			background-color: rgba(#3d71e7, 0.1);
			padding: 10rpx 20rpx;
			color: #3d71e7;
			margin-left: 20rpx;
		}
	}
</style>
