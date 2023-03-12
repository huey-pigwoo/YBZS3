<template>
	<view @click="itemclick" class="card1" :class="data.checked?'checked':''">
		<view class="flex-between-center">
			<view v-if="data.f1" class="data_f1">
				{{data.f1}}
			</view>
			<view v-if="data.f2" class="data_f2">
				{{data.f2}}
			</view>
		</view>
		<view class="flex-between-center">
			<view v-if="data.f3" class="data_f3">
				{{data.f3}}
			</view>
			<view v-if="data.f4" class="data_f4">
				{{data.f4}}
			</view>
		</view>
		<view class="flex-between-center">
			<view v-if="data.f5" class="data_f5">
				{{data.f5}}
			</view>
			<view v-if="data.f6" class="data_f6">
				{{data.f6}}
			</view>
		</view>
		<view class="flex-between-center">
			<view v-if="data.f7" class="data_f7">
				{{data.f7}}
			</view>
			<view v-if="data.f8" class="data_f8">
				{{data.f8}}
			</view>
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
	.card1 {
		border-radius: 20rpx;
		background: rgba(#aaa, 0.2);
		padding: 20rpx;
		margin: 20rpx 0;
		width: 100%;

		.data_f1 {
			font-size: 32rpx;
			font-weight: bold;
		}

		.data_f5,
		.data_f7 {
			width: 65%;
			white-space: nowrap;
			overflow: hidden;
			text-overflow: ellipsis;
		}

		.data_f2,
		.data_f4,
		.data_f6,
		.data_f8 {
			white-space: nowrap;
		}
	}

	.checked {
		border: 1px solid #1168aa;
	}
</style>
