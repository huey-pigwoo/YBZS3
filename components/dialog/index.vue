<template>
	<view class="dialog_main">
		<view class="dialog_mengban" @click.stop="cancel"></view>
		<view class="customdialog">
			<view class="dialog_title dialog_center">{{ info || '删除后不可恢复，确认要删除吗？' }}</view>
			<view class="view_test">
				<view class="dialog_center dialog_board board_right" @click="cancel">否</view>
				<view v-if="exitflg" class="dialog_center dialog_board dialog_color_yes" @click="confirm">
					<navigator class="navigator flex-center" open-type="exit" target="miniProgram">是</navigator>
				</view>
				<view v-else class="dialog_center dialog_board dialog_color_yes" @click="confirm">是</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		name: 'dialog',
		data() {
			return {};
		},
		props: ['info', 'exitflg'],
		methods: {
			cancel() {
				this.$emit('cancel');
			},
			confirm() {
				this.$emit('confirm');
			}
		}
	};
</script>

<style lang="less">
	.dialog_main {
		font-size: 28rpx;
		position: relative;
	}

	.dialog_mengban {
		height: 100vh;
		width: 100%;
		background: rgba(0, 0, 0, 0.45);
		position: fixed;
		top: 0;
		left: 0;
		z-index: 9999;
	}

	.customdialog {
		position: fixed;
		width: 90%;
		top: 35%;
		z-index: 10000;
		left: 5%;
		visibility: hideen;
		background-color: white;
		display: flex;
		flex-direction: column;
		border-radius: 16rpx;
	}

	.dialog_title {
		font-size: 15px;
		margin: 10px;
		flex: 1;
		padding: 58rpx 0;
	}

	.view_test {
		display: flex;
		justify-content: center;
		float: center;
		height: 116rpx;
		font-size: 32rpx;

		.navigator {
			width: 100%;
			height: 100%;
		}
	}

	.dialog_center {
		display: flex;
		justify-content: center;
		align-items: center;
	}

	.board_right {
		border-right: 1px solid #eee;
	}

	.dialog_color_yes {
		color: #ea4545;
	}

	.dialog_board {
		height: 100%;
		width: 50%;
		white-space: nowrap;
		border-top: 1px solid #eee;
		display: flex;
		font-weight: bold;
		box-sizing: border-box;
	}
</style>
