<template>
	<view class="content codelist">
		<view class="head flex">
			<view class="input-box flex-between-center">
				<view class="flex-align-center" style="flex: 1;">
					<view class="search-icon">
					</view>
					<input @input="getSearchList('refresh')" style="flex: 1;background: #fff;" v-model="searchvalue"
						type="text" placeholder="请输入关键词">
				</view>
			</view>
		</view>
		<view class="list">
			<pureList @getCardData="getCardData" :listData="checkList" type="note"></pureList>
		</view>
	</view>
</template>

<script>
	import {
		getEmployeeList
	} from '@/config/services.js'
	import {
		getAuditRegistrationRecords
	} from '@/config/businessRegister.js'
	import pureList from '@/components/pureList/pureList.vue'
	import addresspicker from '@/components/pick-address/index.vue';
	import {
		isEmpty,
		debounce,
		throttle
	} from '@/utils/tools.js'
	export default {
		data() {
			return {
				checkList: [],
				pageindex: 1,
				pagesize: 20,
				searchvalue: '',
				pageConfig: {
					INTRODUCTION_REGISTRATION: '/pages/businessform/introduction',	// 引种登记
					REPRODUCTION_REGISTRATION: '/pages/businessform/breed',			// 繁殖登记
					deathCheckIn: '/pages/business/codelist',			// 死亡登记
					escapeCheckIn: 'pages/business/codeliste',			// 逃逸登记
					saleCheckIn: '/pages/business/codelist',			// 出售登记
					durgCheckIn: '',									// 用药登记
					acceptCheckIn: '',									// 接受确认
					additionCheckIn: '',								// 补充登记
					showCheckIn: '',									// 展演登记
					restoreCheckIn: '/pages/businessform/release',		// 归还登记
				}
			}
		},
		components: {
			pureList,
			addresspicker,
		},
		onShow() {
			this.init()
		},
		methods: {
			getCardData(data){
				let url
				if(data.origin.entityType === 'INTRODUCTION_REGISTRATION') {
					console.log('是引种登记',this.pageConfig[data.origin.entityType])
					url = this.pageConfig[data.origin.entityType]
					uni.navigateTo({
						url: `${url}?businessId=${data.id}&audit=true`
					})
				}
				if(data.origin.entityType === 'REPRODUCTION_REGISTRATION') {
					url = this.pageConfig[data.origin.entityType]
					uni.navigateTo({
						url: `${url}?businessId=${data.id}&audit=true`
					})
				}
			},
			changeAddress(orgname, orgcode) {
				this.orgcode = orgcode
				this.orgname = orgname
				this.getlist('refresh')
			},
			getSearchList(refresh) {
				if (refresh) {
					this.pageindex = refresh ? 1 : this.pageindex
				}
				debounce(() => {
					console.log('fda')
				})
				// queryAnimalList(this.searchvalue).then(res => {
				// 	this.queryList = [...this.queryList, res.data.data.records]
				// })
			},
			init() {
				const currentCompany = uni.getStorageSync('currentCompany')
				getAuditRegistrationRecords(currentCompany.companyId).then(res => {
					console.log('测试列表数据', res.data.data.records)
					this.checkList = res.data.data.records
				})
			}
		}
	}
</script>

<style lang="scss" scoped>
	.page-container {
		padding: 20rpx;
		background-color: #F2F3F8;
		min-height: 100vh;
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
			position: fixed;
			padding: 20rpx;
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
			padding: 100rpx 20rpx 20rpx;
			background-color: #F2F3F8;
			min-height: 100vh;

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
