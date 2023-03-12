<template>
	<view class="chooseCompany">
		<view class="head">
			<view class="head-tabs">
				<view style="min-height: 60rpx;" v-if="!searchflg" class="flex-between-center">
					<view class="flex-align-center">
						<addresspicker :orgname='orgname' @onChangeAddress='changeAddress'>
						</addresspicker>
						<view class="down-icon">
						</view>
					</view>
					<view @click="changesearchflg" class="search-icon">
					</view>
				</view>
				<view style="min-height: 60rpx;" v-else class="flex-between-center">
					<input placeholder="请输入关键字" class="search-input" type="text" v-model="searchkey">
					<view @click="changesearchflg('search')" class="search-icon">
					</view>
				</view>
				<view class="tab-box flex">
					<view @click="tabclick(index)" class="tab-item" :class="tab_idx == index ? 'tab-active' : ''"
						v-for="(item, index) in tablist" :key="index">{{ item.name }}</view>
				</view>
				<view @click="addcompany" class="" style="color: #3d71e7;margin-top: 30rpx;">
					点击登记单位
				</view>
			</view>
		</view>
		<view class="list" v-if="list.length">
			<view @click="itemclick(item)" v-for="(item,index) in list" :key="index" class="list-item">
				<view class="main-text flex-align-center">
					<view>
						{{item.companyname||''}}
					</view>
					<view v-if="item.deptname" style="margin-left: 20rpx;">
						{{item.deptname}}
					</view>
				</view>
				<view class="sub-text" style="margin-top: 10rpx;">
					{{item.orgname||''}}
				</view>
				<view class="flex-between-center" style="margin-top: 10rpx;">
					<view class="sub-text maxwidth_500">
						{{item.address||''}}
					</view>
					<view class="sub-text">
						{{item.tel||''}}
					</view>
				</view>
			</view>
		</view>
		<bottomline v-if="showBtLine && list.length > 4"></bottomline>
	</view>
</template>

<script>
	import {
		getAddCompanyInfo
	} from "@/config/api.js"
	import bottomline from '@/components/bottomline';
	import addresspicker from '@/components/pick-address/index.vue';
	export default {
		data() {
			return {
				tablist: [{
					name: '驯养繁殖',
					formid: '161068947577124'
				}, {
					name: "收容救助",
					formid: '163713368101275'
				}, {
					name: '专委会',
					formid: '10001'
				}, {
					name: '行政部门',
					formid: '10002'
				}, ],
				tab_idx: 0,
				pageindex: 1,
				pagesize: 10,
				orgcode: uni.getStorageSync('orgcode') || '51',
				orgname: uni.getStorageSync('orgname') || '四川省',
				list: [],
				formid: '161068947577124',
				showBtLine: false,
				searchflg: false,
				searchkey: ''
			}
		},
		onLoad() {
			uni.hideHomeButton()
		},
		components: {
			bottomline,
			addresspicker
		},
		onShow() {
			this.getlist('refresh')
		},
		//触底加载
		onReachBottom() {
			if (this.showBtLine) return;
			this.pageindex++;
			this.getlist();
		},
		methods: {
			changeAddress(orgname, orgcode) {
				this.orgcode = orgcode
				this.orgname = orgname
				this.getlist('refresh')
			},
			addcompany() {
				uni.navigateTo({
					url: '/pages/business/registerCompany?flg=0'
				})
			},
			//点击搜索按钮显示搜索框
			changesearchflg(data) {
				this.searchflg = !this.searchflg
				if (data == 'search') {
					this.getlist('refresh')
				}
			},
			//点击选择
			itemclick(data) {
				uni.navigateTo({
					url: '/pages/business/confirmCompany?data=' + encodeURIComponent(JSON.stringify(data)) +
						'&formid=' + this.formid
				})
			},
			handleGetRegion(data) {
				console.log(data)
				this.orgcode = data[2].code
				let orgname = data[0].name
				if (data[1].name != '全省' && data[1].name != '全市' && data[1].name != '全区' && data[1].name != '全县') {
					orgname += `,${data[1].name}`
				}
				if (data[2].name != '全省' && data[2].name != '全市' && data[2].name != '全区' && data[2].name != '全县') {
					orgname += `,${data[2].name}`
				}
				this.orgname = orgname
			},
			tabclick(idx) {
				this.tab_idx = idx
				this.formid = this.tablist[idx].formid
				this.getlist('refresh')
			},
			getlist(refresh) {
				if (refresh) {
					this.pageindex = 1
				}
				getAddCompanyInfo({
					formid: this.formid,
					orgcode: this.orgcode,
					pageindex: this.pageindex,
					pagesize: this.pagesize,
					searchkey: this.searchkey
				}).then(res => {
					if (res.data.code == 0) {
						this.list = refresh ? [...res.data.data.rows] : this.list.concat([...res.data.data.rows])
						if (this.pageindex * this.pagesize >= res.data.data.total) {
							this.showBtLine = true;
						} else {
							this.showBtLine = false;
						}
					}

				})
			}
		}
	}
</script>

<style lang="less">
	page {
		background: #f5f5f5;
	}

	.chooseCompany {
		overflow-y: auto;

		.head {
			background: #f5f5f5;
			padding: 32rpx;
			position: fixed;
			top: 0;
			z-index: 99;
			width: 100%;
			left: 0;
			padding-bottom: 20rpx;

			.orgname {
				font-size: 30rpx;
				font-weight: bold;

			}

			.down-icon {
				margin-left: 10rpx;
				background: url('../../static/imgs/down.png') no-repeat;
				width: 30rpx;
				height: 30rpx;
				background-size: 100% 100%;
			}

			.search-icon {
				width: 34rpx;
				height: 34rpx;
				background: url('../../static/imgs/search.png') no-repeat;
				background-size: 100% 100%;
			}

			.search-input {
				border: 1px solid #3D71E7;
				border-radius: 40rpx;
				padding: 5rpx 32rpx;
				flex: 1;
				margin-right: 20rpx;
			}

			.tab-box {
				margin-top: 20rpx;
				justify-content: space-between;

				.tab-item {
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
		}

		.list {
			margin-top: 220rpx;

			.list-item {
				background: #fff;
				border-radius: 20rpx;
				padding: 32rpx;
				margin: 0 32rpx;
				margin-bottom: 20rpx;
				border-bottom: 1px solid #eee;

				.main-text {
					color: #000;
				}

				.sub-text {
					font-size: 22rpx;
					color: #999;
				}
			}
		}
	}
</style>
