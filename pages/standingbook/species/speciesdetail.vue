<template>
	<view class="speciesdetail">
		<navbar :title="titlearr"></navbar>
		<view :style="{ height: navheight + 'rpx', width: '100%' }"></view>
		<companyinfo :data='companyinfo'></companyinfo>
		<view class="list-box">
			<view class="list-head">
				<view class="flex-align-center">
					<view class="title-icon"></view>
					<view class="fz_32">
						<picker mode="selector" :range="bislist" range-key="name" @change="pickchange">
							<view class="list-title">{{ bisname }}</view>
						</picker>
					</view>
				</view>
			</view>
			<view @click="itemclick(item)" v-for="(item, index) in detaillist" :key="index" class="list-item">
				<cardoverview :data="item" />
			</view>
		</view>
		<bottomline v-if="showBtLine && detaillist.length > 4"></bottomline>
	</view>
</template>

<script>
	import cardoverview from '../../../components/listcard/card_overview.vue';
	import bottomline from '@/components/bottomline';
	import navbar from '../../../components/navbar/index.vue';
	import companyinfo from '../components/companyinfo.vue'
	import {
		getcompanyAccountTotal,
		getcompanyBisList,
		getDongwuList,
		getcompanyBrieflyInfo,
	} from '../../../config/api.js';
	export default {
		data() {
			return {
				navheight: getApp().globalData.navheight,
				titlearr: [{
						name: '物种详情',
						url: ''
					},
					{
						name: '物种台账',
						url: ''
					}
				],
				detaillist: [],
				orgname: uni.getStorageSync('orgname'),
				orgcode: uni.getStorageSync('orgcode'),
				pagesize: 10,
				pageindex: 1,
				showBtLine: false,
				type: 0,
				id: '',
				listheadidx: 0,
				bislist: [],
				bisname: '',
				companyinfo: {},
				listsum: []
			};
		},
		onLoad(props) {
			if (props.type) {
				this.type = props.type;
			}
			if (props.bisname) {
				this.bisname = props.bisname;
			}
			if (props.orgcode) {
				this.orgcode = props.orgcode;
			}
			if (props.id) {
				this.id = props.id;
			}
			getcompanyBrieflyInfo({
				type: this.type,
				companyid: this.id
			}).then(res => {
				if (res.data.code == 0) {
					this.companyinfo = res.data.data;
				}
			});
			getDongwuList({
				type: this.type,
				pagesize: 10000,
				pageindex: 1,
				companyid: this.id
			}).then(res => {
				if (res.data.code == 0) {
					this.bislist = res.data.data.rows;
				}
			});
			getcompanyAccountTotal({
				listbis: '业务,物种,企业',
				type: this.type
			}).then(res => {
				if (res.data.code == 0) {
					this.listsum = res.data.data.data;
				}
			});
			this.getlist('refresh');
		},
		components: {
			cardoverview,
			navbar,
			bottomline,
			companyinfo
		},
		methods: {
			pickchange(e) {
				console.log(e);
				this.bisname = this.bislist[e.detail.value].name;
				this.getlist('refresh');
			},
			itemclick(data) {
				uni.navigateTo({
					url: `/pages/businessform/detail?onetimeid=${data.id}`
				})
			},
			getlist(refresh) {
				if (refresh) {
					this.pageindex = 1;
				}
				getcompanyBisList({
					type: this.type,
					orgcode: this.orgcode,
					pageindex: this.pageindex,
					pagesize: this.pagesize,
					companyid: this.id,
					animalname: this.bisname
				}).then(res => {
					if (res.data.code == 0) {
						if (res.data.data.rows) {
							this.detaillist = refresh ? res.data.data.rows : this.detaillist.concat(res.data.data
								.rows);
							this.showBtLine = this.pageindex * this.pagesize >= res.data.data.total ? true : false;
						} else {
							this.detaillist = [];
						}
					}
				});
			}
		}
	};
</script>

<style lang="less">
	page {
		background: #eee;
	}

	.speciesdetail {
		.txtRegion {
			font-size: 28rpx !important;
		}

		padding: 0 30rpx;

		.list-box {
			background: #fff;
			border-radius: 20rpx;
			padding: 20rpx;
			flex: 1;
			margin: 30rpx 0;

			.list-head {
				margin-bottom: 20rpx;
				font-size: 32rpx;

				.title-icon {
					width: 3px;
					height: 32rpx;
					background: #3d71e7;
					margin-right: 10rpx;
				}
			}

			.list-title {
				font-size: 32rpx;
				font-weight: bold;
				position: relative;

				&::after {
					content: '';
					display: block;
					position: absolute;
					right: -40rpx;
					top: 10rpx;
					background: url('/static/imgs/down.png');
					background-repeat: no-repeat;
					background-size: 100% 100%;
					width: 30rpx;
					height: 30rpx;
				}
			}

			.list-item {
				margin-bottom: 20rpx;

				&:last-child {
					margin-bottom: 0;
				}
			}
		}
	}
</style>
