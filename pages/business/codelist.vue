<template>
	<view class="content codelist">
		<view class="head flex">
			<view class="input-box flex-between-center">
				<view class="flex-align-center" style="flex: 1;">
					<view class="search-icon">
					</view>
					<input @input="getlist('refresh')" style="flex: 1;background: #fff;" v-model="searchvalue"
						type="text" placeholder="请输入关键词">
				</view>
			</view>
		</view>
		<view v-if="!simpleflg" class="list">
			<view @click="itemclick(item)" v-for="(item,index) in datalist" :key="index" class="list_item">
				<view class="flex-align-center">
					<view class="animalcard-img">
						<image v-if="item.pic" :src="item.pic"></image>
						<image v-else src="/static/imgs/img-default.png"></image>
					</view>
					<view style="flex: 1;" class="">
						<view class="flex-between-center">
							<view class="animalcard-name">
								{{item.f1||''}}
							</view>
							<view class="animalcard-type">
								{{item.f2||''}}
							</view>
						</view>
						<view class="sub-text">
							{{item.f3||''}}
						</view>
						<view class="sub-text">
							{{item.f4||''}}
						</view>
					</view>
				</view>
			</view>
		</view>
		<view v-else class="list">
			<view @click="itemclick(item)" v-for="(item,index) in datalist" :key="index" class="list_item_simple">
				{{item.f1}}
			</view>
		</view>
		<bottomline v-if="showBtLine && datalist.length > 4"></bottomline>
	</view>
</template>

<script>
	import bottomline from '@/components/bottomline';
	import {
		getCodeTableByFormAndField
	} from '@/config/api.js';
	import request from '@/config/http.js'
	import {
		getQueryVariable
	} from '@/utils/util.js'
	import card1 from '@/components/listcard/card1.vue'
	import {
		mapState
	} from "vuex"
	export default {
		data() {
			return {
				screenvisible: false,
				datalist: [],
				showBtLine: false,
				pageindex: 1,
				pagesize: 20,
				api: '',
				searchvalue: '',
				btnlist: [],
				searchActive: false,
				formid: '',
				radioflg: false,
				yewuid: '',
				field: '',
				formid: '',
				sqlwhere: '',
				backflg: false,
				simpleflg: false
			};
		},
		components: {
			bottomline,
			card1
		},

		computed: {
			...mapState(['menu'])
		},
		onLoad(props) {
			console.log(props)
			this.yewuid = props.yewuid
			if (props.simpleflg) {
				this.simpleflg = true
			}
			if (props.relationid) {
				this.sqlwhere = `t.relationid not in (${props.relationid})`
			}
			if (props.backflg) {
				this.backflg = true
			}
			this.menu.map((item) => {
				if (item.id == props.yewuid) {
					this.field = item.field
					this.formid = item.formid
				}
			})
			if (props.field) {
				this.field = props.field
			}
		},
		onShow() {
			this.getlist("refresh")
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
		methods: {
			//点击查询按钮，显示查询框
			opensearch() {
				this.searchActive = !this.searchActive
			},
			//点击确定模糊查询
			searchconfirm() {
				this.getlist('refresh')
			},
			getlist(refresh) {
				if (refresh) {
					this.pageindex = refresh ? 1 : this.pageindex
				}
				getCodeTableByFormAndField({
					pageindex: this.pageindex,
					pagesize: this.pagesize,
					searchvalue: this.searchvalue,
					formid: this.formid,
					field: this.field,
					sqlwhere: this.sqlwhere
				}).then((res) => {
					if (res.data.code == 0) {
						res.data.data.data = res.data.data.data.map(item => {
							item.checked = false
							return item
						})
						if (refresh) {
							this.datalist = [...res.data.data.data]
						} else {
							this.datalist = this.datalist.concat([...res.data.data.data])
						}
						if (this.pageindex * this.pagesize >= res.data.data.total) {
							this.showBtLine = true
						} else {
							this.showBtLine = false
						}
					}
				})
			},
			itemclick(data) {
				if (this.backflg) {
					let eventChannel = this.getOpenerEventChannel()
					eventChannel.emit('getchoose', data)
					uni.navigateBack()
				} else {
					let url = ''
					this.menu.map((item) => {
						if (item.id == this.yewuid) {
							url = item.pageurl
						}
					})
					uni.navigateTo({
						url: `${url}?selectdata=${encodeURIComponent(JSON.stringify(data))}`
					})
				}
			}
		}
	};
</script>

<style lang="less">
	page {
		background: #f5f5f5;
	}

	.codelist {
		position: relative;
		overflow-y: auto;

		.sub-text {
			color: #999;
			font-size: 22rpx;
			margin-top: 10rpx;
		}

		.head {
			padding: 20rpx;
			position: fixed;
			width: 100%;
			height: 100rpx;
			top: 0;
			z-index: 9;
			background: #f5f5f5;

			.tab-box {
				max-width: 50%;

				.tab-item {
					margin-right: 40rpx;
					color: #999;
				}

				.tab-active {
					color: #009688;
					font-weight: bold;
					position: relative;

					&::after {
						content: '';
						display: block;
						position: absolute;
						bottom: -10rpx;
						height: 2px;
						background: #009688;
						width: 80%;
					}
				}
			}

			.input-box {
				width: 100%;
				padding: 20rpx;
				background: #fff;
				border-radius: 40rpx;
				border: 1px solid #3D71E7;

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

			.control-box {
				flex-shrink: 0;
				flex: 1;

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
			margin-top: 100rpx;

			.list_item_simple {
				padding: 30rpx;
				background: #fff;
				border-bottom: 1px solid #eee;

				&:last-child {
					border-bottom: none;
				}
			}

			.list_item {
				margin: 0 30rpx;
				background: #fff;
				margin-bottom: 30rpx;
				padding: 30rpx;
				border-radius: 20rpx;
			}

			.animalcard-img {
				width: 140rpx;
				height: 140rpx;
				flex-shrink: 0;
				border-radius: 20rpx;
				overflow: hidden;
				margin-right: 20rpx;
			}

			.animalcard-name {
				font-size: 32rpx;
				width: 200rpx;
				font-weight: bold;
				text-overflow: ellipsis;
				overflow: hidden;
				white-space: nowrap;
			}

			.animalcard-type {
				background: #E1EAFF;
				padding: 5rpx 20rpx;
				font-size: 22rpx;
				border-radius: 10rpx;
				border: 1px solid #3D71E7;
				margin-left: 20rpx;
				color: #3D71E7;
			}
		}

		.foot {
			position: fixed;
			height: 160rpx;
			width: 100%;
			z-index: 99;
			left: 0;
			bottom: 0;

			.btn-item {
				flex: 1;
				height: 80rpx;
				line-height: 80rpx;
				color: #fff;
				background: #009688;
				border-radius: 40rpx;
				text-align: center;
				margin: 0 40rpx;
			}
		}
	}
</style>
