<template>
	<view class="content record">
		<view class="head">
			<view class="input-box flex-between-center">
				<view class="flex-align-center" style="flex: 1;">
					<view class="search-icon">
					</view>
					<input @input="getlist('refresh')" style="flex: 1;background: #fff;" v-model="searchvalue"
						type="text" placeholder="输入关键词">
				</view>
			</view>
			<view class="tab-box flex">
				<view @click="tabclick(index)" class="tab-item" :class="tab_idx == index ? 'tab-active' : ''"
					v-for="(item, index) in tablist" :key="index">{{ item.name }}</view>
			</view>
		</view>
		<view v-if='datalist.length' class="list">
			<view @click="itemclick(item)" v-for="(item,i) in datalist" :key="i" class="list_item">
				<view class="flex-align-center animalcard">
					<view class="animalcard-img">
						<image v-if="item.pic" :src="item.pic"></image>
						<image v-else src="/static/imgs/img-default.png"></image>
					</view>
					<view style="flex: 1;" class="">
						<view class="flex-between-center">
							<view class="flex-baseline">
								<view class="f1">
									{{item.f1||''}}
								</view>
								<view class="f2 sub-text">
									{{item.f2||''}}
								</view>
								<view class="f3 sub-text">
									{{item.f3||''}}
								</view>
							</view>
							<view class="f4">
								{{item.f4||''}}
							</view>
						</view>
						<view class="sub-text f5">
							{{item.f5||''}}
						</view>
						<view class="sub-text f6">
							{{item.f6||''}}
						</view>
					</view>
				</view>
			</view>
		</view>
		<bottomline v-if="showBtLine && datalist.length > 3"></bottomline>
	</view>
</template>

<script>
	import bottomline from '@/components/bottomline';
	import {
		getPageConfig,
		getPageButtons,
		getWxMiniFormList
	} from '@/config/api.js';
	import {
		mapState
	} from 'vuex'
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
				tablename: '',
				sqlwhere: '',
				sqlwhere_source: '',
				yewuid: '',
				searchfield: '',
				searchvalue: '',
				searchActive: false
			};
		},
		components: {
			bottomline,
			card1
		},
		onLoad(props) {
			if (props.pageid) {
				getPageConfig({
					pageid: props.pageid
				});
				getPageButtons({
					pageid: props.pageid
				});
			}
			this.yewuid = props.yewuid
			if (props.yewuid == '80008') {
				this.tablename = 'tq_u_jiuhu_all_list'
				this.sqlwhere = "(shenhestateid in (0,1,3,4) or shenhestateid is null)"
				this.searchfield = 't2.danweimingchen'
				uni.setNavigationBarTitle({
					title: '业务记录'
				})
			} else if (props.yewuid == '80007') {
				this.tablename = 'tq_u_yijiaodengjixin_1668616814261'
				this.sqlwhere = '(querenstateid=2)'
				this.searchfield = 'yijiaodanwei'
				uni.setNavigationBarTitle({
					title: '接收确认'
				})
			} else if (props.yewuid == '80016') {
				this.tablename = 'tq_u_jiuhu_check_all_list'
				this.sqlwhere = '(shenhestateid = 1)'
				this.searchfield = 't2.danweimingchen'
				uni.setNavigationBarTitle({
					title: '审核记录'
				})
				this.tablist = [{
						name: '待审核'
					},
					{
						name: '全部记录'
					}
				]
			} else if (props.yewuid == '80022') {
				this.tablename = 'tq_u_fanyu_all_list'
				this.sqlwhere = '(t1.shenhestateid=0 or t1.shenhestateid is null)'
				this.searchfield = 't2.qiyemingchen'
				uni.setNavigationBarTitle({
					title: '业务记录'
				})
			}

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
		computed: {
			...mapState(['menu'])
		},
		onShow() {
			this.getlist('refresh')
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
			//点击标签切换
			tabclick(idx) {
				this.tab_idx = idx;
				this.pageindex = 1
				if (idx == 0) {
					if (this.yewuid == '80007') {
						this.sqlwhere = "(querenstateid=2)"
					} else if (this.yewuid == '80008') {
						this.sqlwhere = "(shenhestateid in (0,1,3,4) or shenhestateid is null)"
					} else if (this.yewuid == '80016') {
						this.sqlwhere = "(shenhestateid = 1)"
					} else if (this.yewuid == '80022') {
						this.sqlwhere = "(t1.shenhestateid=0 or t1.shenhestateid is null)"
					}
				} else if (idx == 1) {
					this.sqlwhere = ''
					if (this.yewuid == '80016') {
						this.sqlwhere = '(shenhestateid in (1,2,3))'
					}
				}
				this.getlist('refresh')
			},
			//点击去编辑
			itemclick(data) {
				console.log(data)
				let url = ''
				if (data.btnshowflg) {
					let pageurl = ''
					this.menu.map(item => {
						if (item.formid == data.formid) {
							pageurl = item.pageurl
						}
					})
					if (this.yewuid == 80016 || this.yewuid == 80007) {
						url =
							`/pages/businessform/detail?yewuid=${this.yewuid}&formid=${data.formid}&onetimeid=${data.onetimeid}&pagetitle=${data.f1}&btnshowflg=true`
					} else {
						url = `${pageurl}?yewuid=${this.yewuid}&onetimeid=${data.onetimeid}&btnshowflg=true`
					}
				} else {
					url =
						`/pages/businessform/detail?yewuid=${this.yewuid}&formid=${data.formid}&onetimeid=${data.onetimeid}&pagetitle=${data.f1}`
				}
				uni.navigateTo({
					url
				})
			},
			//打开筛选弹框
			openscreen() {
				this.screenvisible = !this.screenvisible;
			},
			//获取列表数据
			getlist(refresh) {
				this.pageindex = refresh ? 1 : this.pageindex
				getWxMiniFormList({
					tablename: this.tablename,
					pageindex: this.pageindex,
					pagesize: this.pagesize,
					sqlwhere: this.sqlwhere ?
						`${this.sqlwhere} and (${this.searchfield} like '%${this.searchvalue}%')` :
						`(${this.searchfield} like '%${this.searchvalue}%')`
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

	.record {
		overflow-y: auto;

		.head {
			padding: 20rpx;
			position: fixed;
			top: 0;
			width: 100%;
			background: #f5f5f5;

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

		.sub-text {
			color: #999;
			font-size: 22rpx;
		}

		.list {
			margin-top: 180rpx;

			.list_item {
				margin: 0 30rpx;
				padding: 20rpx;
				background: #fff;
				margin-bottom: 30rpx;
				border-radius: 20rpx;
			}

			.animalcard {
				.f1 {
					font-weight: bold;
					font-size: 32rpx;
				}

				.f2 {
					color: #000;
					margin-left: 20rpx;
				}

				.f3 {
					color: #000;
					margin-left: 20rpx;
				}

				.f4 {
					background: #FFE1E1;
					border: 1px solid #FA6F36;
					padding: 5rpx 20rpx;
					border-radius: 10rpx;
					color: #FA6F36;
				}

				.f5 {
					margin-top: 10rpx;
				}

				.f6 {
					margin-top: 10rpx;
				}
			}
		}
	}
</style>
