<template>
	<view class="overViewButton-contaienr">
		<view v-if="isCompany" class="left">
			<view class="companyButton">
				<text class="title">企业台账</text>
				<view class="discribe">
					<text>12</text>个区县 <text>666</text>家企业
				</view>
			</view>
		</view>
		
		<view :class="{'right':true, 'towBox':!isCompany }">
			<view class="businessButton">
				<text class="title">业务台账</text>
				<view class="discribe">
					<text>1234</text>种 <text>88</text>万只
				</view>
			</view>
			<view class="speciesButton">
				<text class="title">物种台账</text>
				<view class="discribe">
					<text>1.4</text>万件
				</view>
			</view>
		</view>
		<button @click="hiddind" style="position: absolute;">隐藏company</button>
	</view>
</template>

<script>
	export default {
		name:"overViewButton",
		data() {
			return {
				overViewButtonList: [],
				isCompany: true
			};
		},
		methods: {
			hiddind(){
				this.isCompany = !this.isCompany
			}
		}
	}
</script>

<style lang="scss" scoped>
	.towBox {
		width: 100% !important;
		flex-direction: row !important;
		.businessButton {
			margin-right: 5rpx !important;
		}
		.speciesButton {
			margin-left: 5rpx !important;
		}
	}
	.overViewButton-contaienr {
		display: flex;
		width: 100%;
		height: 300rpx;
		.left {
			box-sizing: border-box;
			margin: 0 10rpx;
			width: 50%;
			height: inherit;
			.companyButton {
				padding: 20rpx;
				background: #EE9091;
				box-sizing: border-box;
				height: inherit;
				border-radius: 20rpx;
				.title {
					color: #fff;
					font-size: 38rpx;
				}
				.discribe {
					color: #fff;
					text {
						font-size: 50rpx;
					}
				}
			}
		}
		.right {
			width: 50%;
			    box-sizing: border-box;
			    margin: 0 10rpx;
			    display: flex;
			    flex-direction: column;
			    justify-content: space-between;
				.businessButton {
					padding: 15rpx;
					background: #EF9B7D;
					border-radius: 20rpx;
					width: 100%;
					height: 145rpx;
					.title {
						color: #fff;
						font-size: 30rpx;
					}
					.discribe {
						color: #fff;
						text {
							font-size: 38rpx;
							padding: 0 5rpx;
						}
					}
				}
				.speciesButton {
					padding: 15rpx;
					background: #70A0FB;
					border-radius: 20rpx;
					width: 100%;
					height: 145rpx;
					.title {
						color: #fff;
						font-size: 30rpx;
					}
					.discribe {
						color: #fff;
						text {
							font-size: 38rpx;
							padding: 0 5rpx;
						}
					}
				}
		}
	}
</style>