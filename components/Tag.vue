<template>
	<view class="tag" :class="status">
		{{value}}
	</view>
</template>

<script>
	export default {
		name:"Tag",
		props: {
			status: {
				type: String,
				default: "NORMAL"
			},
			value: {
				type: String,
				default: "selfText"
			}
		},
		data() {
			return {
				
			};
		},
		methods: {
			
		}
	}
</script>

<style lang="less">
	.tag {
		display: inline-block;
		box-sizing: border-box;
		border-radius: 4px;
		text-align: center;
		margin-right: 10rpx;
		margin-top: 5rpx;
		padding: 2rpx 10rpx;
		font-size: 12px;
		white-space: nowrap;
	}
		
	.NORMAL {
		border: 1px solid rgba(154, 154, 154, 1);
		color: rgba(154, 154, 154, 1);
	}
	.PENDING,
	.WARN {
		background-color: rgba(255, 4, 4, 1);
		border: 1px solid rgba(255, 4, 4, 1);
		color: rgba(255, 255, 255, 1);
	}
	
	.ACTIVE {
		background-color: rgba(17, 188, 7, 1);
		border: 1px solid rgba(17, 188, 7, 1);
		color: rgba(255, 255, 255, 1);
	}
</style>