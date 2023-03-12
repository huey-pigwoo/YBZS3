<template>
	<view @click="itemclick" class="flex-between card_manage">
		<view class="card_left">
			<view class="flex-between-baseline">
				<view class="card_f1 maxwidth_400 ellipse">
					{{data.f1}}
				</view>
				<view class="card_f2">
					{{data.f2}}
				</view>
			</view>
			<view class="flex-between-baseline" style="margin-top: 20rpx;">
				<view class="card_f3 maxwidth_400 ellipse">
					{{data.f3}}
				</view>
				<view class="card_f3">
					{{data.f4}}
				</view>
			</view>
		</view>
		<view :class="data.statename=='申请'?'card_right_active':''" class="card_right flex-center">
			{{data.statename}}
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
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
	.card_manage {
		background: #fff;
		border-radius: 20rpx;
		overflow: hidden;
		.card_left {
			padding: 24rpx 32rpx;
			flex: 1;
			.card_f1 {
				font-size: 32rpx;
				font-weight: bold;
			}

			.card_f2 {
				font-size: 28rpx;
			}

			.card_f3 {
				color: #999;
			}
		}

		.card_right {
			background-color: #E1EAFF;
			font-weight: bold;
			width: 118rpx;
			flex-shrink: 0;
		}

		.card_right_active {
			background-color: #3d71e7;
			color: #fff;
		}
	}
</style>
