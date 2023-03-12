<template>
	<view @click.stop="close" class="custommodal">
		<view class="body">
			<view class="title">
				工作提醒
			</view>
			<view class="info">
				请及时向负责人报告检疫异常!
			</view>
			<view class="info">
				负责人：{{name}} 电话：{{tel}}
			</view>
			<view @click.stop="footclick" class="modal-foot">
				我知道了
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
			return {
				name: "",
				tel: ''
			}
		},
		mounted(props) {
			getFuzenrenInfo().then(res => {
				if (res.data.code == 0) {
					this.name = res.data.data.name
					this.tel = res.data.data.tel
				}
			})
		},
		methods: {
			footclick() {
				this.$emit('click')
			},
			close() {
				this.$emit('close')
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
			}
		}
	}
</style>
