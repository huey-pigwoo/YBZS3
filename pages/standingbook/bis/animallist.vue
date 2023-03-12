<template>
	<view class="animallist">
		<view style="margin-top:30rpx;" class="flex-align-center">
			<addresspicker @onChangeAddress="changeAddress" :orgname="orgname"></addresspicker>
			<image style="width: 28rpx;height: 11rpx;margin-left: 10rpx;" src="/static/imgs/Polygon2.png"></image>
		</view>
		<view class="tab-box">
			<u-tabs :activeStyle="{
					color: '#3D71E7',
					fontWeight: 'bold'
				}" :list="maintablist" @click="maintabclick"></u-tabs>
		</view>
		<view class="list-box">
			<view class="list-head">
				<view class="flex-between-center">
					<view class="flex-align-center">
						<view class="title-icon"></view>
						<view class="fz_32">
							<picker mode="selector" :range="bislist" range-key="name" @change="pickchange">
								<view class="list-title">{{ bisname }}</view>
							</picker>
						</view>
					</view>
					<!-- <view class="flex-align-center">
						<view @click="listheadclick(0)" :style="{ color: listheadidx == 0 ? '#3d71e7' : '#000' }"
							style="margin-right: 20rpx;">
							<text v-if="listsum[2]" class="fz_30">物种{{ listsum[2].value }}</text>
							<text style="font-size: 20rpx;">种</text>
						</view>
						<view @click="listheadclick(1)" :style="{ color: listheadidx == 1 ? '#3d71e7' : '#000' }"
							class="">
							<text v-if="listsum[0]" class="fz_30">企业{{ listsum[0].value }}</text>
							<text style="font-size: 20rpx;">家</text>
						</view>
					</view> -->
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
	import addresspicker from '../../../components/pick-address/index.vue';
	import cardoverview from '../../../components/listcard/card_overview.vue';
	import bottomline from '@/components/bottomline';
	import {
		getwuZhongTaiZhangList,
		getcompanyAccountList,
		getBisType,
		getcompanyAccountTotal
	} from '../../../config/api.js';
	export default {
		data() {
			return {
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
			getBisType({
				type: this.type
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
			bottomline,
			addresspicker
		},
		methods: {
			changeAddress(name, code) {
				this.orgcode = code;
				this.orgname = name;
				this.getlist('refresh');
			},
			maintabclick(e) {
				this.activityidx = e.index;
				this.getlist('refresh');
			},
			pickchange(e) {
				console.log(e);
				this.bisname = this.bislist[e.detail.value].name;
				this.getlist('refresh');
			},
			itemclick(data) {
				let url = '';
				if (this.listheadidx == 0) {
					url =
						`/pages/standingbook/bis/enterpriselist?type=${this.type}&id=${data.companyid}&bisname=${this.bisname}`;
				} else if (this.listheadidx == 1) {
					url =
						`/pages/standingbook/bis/bisdetail?type=${this.type}&id=${data.companyid}&bisname=${this.bisname}`;
				}
				uni.navigateTo({
					url
				});
			},
			listheadclick(idx) {
				uni.setNavigationBarTitle({
					title: idx == 0 ? '物种列表' : '企业列表'
				});
				this.listheadidx = idx;
				this.getlist('refresh');
			},
			getlist(refresh) {
				if (refresh) {
					this.pageindex = 1;
				}
				if (this.listheadidx == 0) {
					getwuZhongTaiZhangList({
						type: this.type,
						orgcode: this.orgcode,
						pageindex: this.pageindex,
						pagesize: this.pagesize
					}).then(res => {
						if (res.data.code == 0) {
							if (res.data.data.rows) {
								this.detaillist = refresh ? res.data.data.rows : this.detaillist.concat(res.data
									.data.rows);
								this.showBtLine = this.pageindex * this.pagesize >= res.data.data.total ? true :
									false;
							} else {
								this.detaillist = [];
							}
						}
					});
				} else if (this.listheadidx == 1) {
					getcompanyAccountList({
						type: this.type,
						orgcode: this.orgcode,
						pageindex: this.pageindex,
						pagesize: this.pagesize,
						bisname: this.bisname
					}).then(res => {
						if (res.data.code == 0) {
							if (res.data.data.rows) {
								this.detaillist = refresh ? res.data.data.rows : this.detaillist.concat(res.data
									.data.rows);
								this.showBtLine = this.pageindex * this.pagesize >= res.data.data.total ? true :
									false;
							} else {
								this.detaillist = [];
							}
						}
					});
				}
			}
		}
	};
</script>

<style lang="less">
	page {
		background: #eee;
	}

	.animallist {
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
