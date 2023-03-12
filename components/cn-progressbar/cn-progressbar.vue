<template>
	<view class="outer" :style="{background:outerback}">
		<view class="left" :style="{background:leftback}"></view>
		<view class="right" :style="[rotateStyle, percent>50?{background:percentback}:null]"></view>
		<view class="inner" :style="{background:innerback}">
			<text class="numinner">{{percent}}<text style="font-size: 22rpx;">%</text></text>
			<text :style="{color:namecolor}" style="font-size: 22rpx;" class="nameinner">{{name}}</text>
		</view>
	</view>
</template>

<script>
	export default {
		name: 'progressbar',
		props: {
			percent: {
				type: Number,
				default: 0
			},
			name: {
				type: String,
				default: '覆盖率'
			},
			percentback: {
				type: String,
				default: '#fff'
			},
			outerback: {
				type: String,
				default: '#fff'
			},
			innerback: {
				type: String,
				default: '#EC6E6F'
			},
			leftback: {
				type: String,
				default: '#f48283'
			},
			namecolor: {
				type: String,
				default: '#fff'
			}
		},
		computed: {
			rotateStyle() {
				var deg = (this.percent / 100) * 360;
				return {
					transform: `rotate(${deg > 180 ? deg - 180 : deg}deg)`,
				};
			}
		},
	}
</script>


<style lang="scss" scoped>
	.outer {

		position: relative;

		width: 180rpx;

		height: 180rpx;

		// margin: auto;

		background: #fff;

		border-radius: 50%;

	}

	.left {

		width: 180rpx;

		height: 180rpx;

		position: absolute;

		margin: auto;

		background: #f48283;

		border-radius: 50%;

		clip: rect(auto, 90rpx, auto, auto);

	}

	.right {

		width: 180rpx;

		height: 180rpx;

		position: absolute;

		margin: auto;

		background: #f48283;

		border-radius: 50%;

		clip: rect(auto, auto, auto, 90rpx);

		transition: transform 0.2s;

	}

	.inner {
		width: 135rpx;
		height: 135rpx;
		left: 50%;
		top: 50%;
		transform: translate(-50%, -50%);
		position: absolute;
		background: #EC6E6F;
		border-radius: 50%;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		display: flex;
		font-size: 26rpx;

		.nameinner {
			color: #fff;
		}

		.numinner {
			line-height: 42rpx;
			font-size: 30rpx;
		}
	}
</style>
