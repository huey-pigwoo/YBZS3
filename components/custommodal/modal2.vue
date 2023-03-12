<template>
	<view class="custommodal">
		<view class="body">
			<view class="title">
				工作提醒
			</view>
			<view v-if="data.draft" class="info">
				信息未完善不能提交审核，暂存为草稿可在【首页】——【业务记录】中继续编辑
			</view>
			<view v-if="data.data" class="info">
				<text v-if="data.data.f1"> 当前存在{{data.data.f1}}条草稿 </text>
				<text v-if="data.data.f2">{{data.data.f2}}条审核未通过业务需处理</text>
			</view>
			<view class="modal-foot flex-align-center">
				<view @click="cancel" class="cancel-btn">
					以后再说
				</view>
				<view @click="confirm" class="confirm-btn">
					立即处理
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import {
		getFuzenrenInfo
	} from '@/config/api.js'
	export default {
		data() {
			return {}
		},
		props: ['data'],
		methods: {
			cancel() {
				this.$emit('cancel')
			},
			confirm() {
				this.$emit('confirm')
			}
		}
	}
</script>

<style lang="less">
	.custommodal {
		background: rgba(#000, 0.4);
		width: 100%;
		height: 100vh;
		z-index: 99;
		position: fixed;
		top: 0;
		left: 0;

		.body {
			position: absolute;
			top: 30%;
			width: 92%;
			background: #fff;
			border-radius: 20rpx;
			left: 4%;
			padding: 20rpx;

			.title {
				margin-bottom: 30rpx;
				font-size: 40rpx;
			}

			.info {
				margin-bottom: 20rpx;
				font-size: 30rpx;
			}

			.modal-foot {
				border-top: 1px solid #eee;
				line-height: 80rpx;
				font-size: 32rpx;
				color: green;
				text-align: center;
				padding-top: 20rpx;

				.cancel-btn {
					width: 50%;
					font-size: 30rpx;
					text-align: center;
				}

				.confirm-btn {
					width: 50%;
					font-size: 30rpx;
					text-align: center;
				}
			}
		}
	}
</style>
