<template>
	<view class="content examine">
		<view class="head">
			<view class="input-box flex-between-center">
				<view class="flex-align-center" style="flex: 1;">
					<view class="search-icon">
					</view>
					<input @input="getlist('refresh')" style="flex: 1;" v-model="searchkey" type="text"
						placeholder="输入关键词">
				</view>
			</view>
			<view class="tab-box flex">
				<view @click="tabclick(index)" class="tab-item" :class="tab_idx == index ? 'tab-active' : ''"
					v-for="(item, index) in tablist" :key="index">{{ item.name }}</view>
			</view>
		</view>
		<view v-if='datalist.length' class="list">
			<view @click="itemclick(item)" v-for="(item,i) in datalist" :key="i" class="list_item">
				<view class="flex-between-center">
					<view class="flex-align-center">
						<view class="f1 main-text">
							{{item.f1}}
						</view>
						<view class="f2 main-text">
							{{item.f2}}
						</view>
					</view>
					<view class="f3 sub-text">
						{{item.f3}}
					</view>
				</view>
				<view style="margin-top: 20rpx;" class="f4 sub-text">
					{{item.f4||''}}
				</view>
				<view style="margin-top: 10rpx;" class="flex-between-center">
					<view class="flex-align-center">
						<view class="f1 sub-text">
							{{item.f5}}
						</view>
						<view class="f2 sub-text">
							{{item.f6}}
						</view>
					</view>
					<view class="f3 sub-text">
						{{item.f7}}
					</view>
				</view>
			</view>
		</view>
		<bottomline v-if="showBtLine && datalist.length > 4"></bottomline>
	</view>
</template>

<script>
	import bottomline from '@/components/bottomline';
	import {
		getCheckList
	} from '@/config/api.js';
	import card1 from '@/components/listcard/card1.vue'
	export default {
		data() {
			return {
				tablist: [{
						name: '待处理'
					},
					{
						name: '全部记录'
					}
				],
				tab_idx: 0,
				screenvisible: false,
				datalist: [],
				showBtLine: false,
				pageindex: 1,
				pagesize: 20,
				opflg: 2,
				searchkey: ''
			};
		},
		components: {
			bottomline,
			card1
		},
		onLoad(props) {

		},
		//触底加载
		onReachBottom() {
			if (this.showBtLine) return;
			this.pageindex++;
			this.getlist();
		},
		//下拉刷新
		async onPullDownRefresh() {
			await this.getlist('pulldown');
			uni.stopPullDownRefresh();
		},
		onShow() {
			this.getlist('refresh')
		},
		methods: {
			//点击标签切换
			tabclick(idx) {
				this.tab_idx = idx;
				this.pageindex = 1
				if (idx == 0) {
					this.opflg = 2
				} else if (idx == 1) {
					this.opflg = 0
				}
				this.getlist('refresh')
			},
			//点击去详情
			itemclick(data) {
				console.log(data)
				uni.navigateTo({
					url: `/pages/business/examinedetail?data=${encodeURIComponent(JSON.stringify(data))}`
				})
			},
			//获取列表数据
			getlist(refresh) {
				this.pageindex = refresh ? 1 : this.pageindex
				getCheckList({
					pageindex: this.pageindex,
					pagesize: this.pagesize,
					opflg: this.opflg,
					searchkey: this.searchkey
				}).then((res) => {
					if (res.data.code == 0) {
						if (res.data.data.rows) {
							this.datalist = refresh ? res.data.data.rows : this.datalist.concat(res.data.data.rows)
							this.showBtLine = this.pageindex * this.pagesize > res.data.data.total ? true : false
						}
					} else {
						uni.showToast({
							title: res.data.message,
							icon: 'none'
						})
					}
				})
			}
		}
	};
</script>

<style lang="less">
	page {
		background: #f5f5f5;
	}

	.examine {
		overflow-y: auto;

		.head {
			padding: 20rpx;
			position: fixed;
			top: 0;
			width: 100%;

			.input-box {
				width: 100%;
				padding: 10rpx 20rpx;
				background: #fff;
				border: 1px solid #3D71E7;
				border-radius: 40rpx;
				margin-bottom: 20rpx;

				.search-icon {
					background: url('/static/imgs/search.png') no-repeat;
					background-size: 100% 100%;
					width: 30rpx;
					height: 30rpx;
					margin-right: 10rpx;
				}

				.searchconfirm {
					color: #009688;
					margin-right: 20rpx;
				}

				.searchcancel {
					color: #999;
				}
			}

			.tab-box {
				max-width: 50%;

				.tab-item {
					margin-right: 40rpx;
					color: #999;
				}

				.tab-active {
					color: #3D71E7;
					font-weight: bold;
					position: relative;

					&::after {
						content: '';
						display: block;
						position: absolute;
						bottom: -10rpx;
						height: 2px;
						background: #3D71E7;
						width: 80%;
					}
				}
			}

			.control-box {
				flex-shrink: 0;

				.control-item {
					position: relative;
					color: #009688;
					margin-right: 80rpx;
				}

				.control-item:last-child {
					margin: 0;
				}

				.control-item1 {
					&::before {
						content: '';
						display: block;
						width: 30rpx;
						height: 30rpx;
						background: url('@/static/imgs/screen.png');
						background-size: 100% 100%;
						left: -40rpx;
						position: absolute;
						top: 8rpx;
					}
				}

				.control-item2 {
					&::before {
						content: '';
						display: block;
						width: 30rpx;
						height: 30rpx;
						background: url('@/static/imgs/search.png');
						background-size: 100% 100%;
						left: -40rpx;
						position: absolute;
						top: 8rpx;
					}
				}
			}
		}

		.list {
			margin-top: 180rpx;

			.list_item {
				padding: 0 20rpx;
				background: #fff;
				margin: 0 30rpx;
				padding: 20rpx;
				margin-bottom: 30rpx;
				border-radius: 20rpx;

				.main-text {
					font-size: 30rpx;
				}

				.sub-text {
					color: #999;
					font-size: 22rpx;
				}

				.f2 {
					margin-left: 20rpx;
				}
			}
		}
	}
</style>
