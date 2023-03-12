<template>
	<view class="specieslist">
		<navbar :title="titlearr"></navbar>
		<view :style="{ height: navheight + 'rpx', width: '100%' }"></view>
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
		<view v-if='totalinfo' class="statistics">
			在<text class="text">{{totalinfo.countytotal||0}}<text class="text-unit">个区县</text></text>内的
			<text class="text">{{totalinfo.companytotal||0}}<text
					class="text-unit">家</text></text>{{maintablist[activityidx].name}}企业在
			<text class="text">{{subtablist[subidx].name}}</text>对
			<text class="text">{{totalinfo.animaltypetotal||0}}<text class="text-unit">种</text></text>动物共
			<text class="text">{{totalinfo.totalnum||0}}<text class="text-unit">只</text></text>开展了<text
				class="text">{{totalinfo.bistypetotal||0}}<text class="text-unit">种</text></text><text
				class="text">{{totalinfo.bistimetotal||0}}<text
					class="text-unit">次</text></text>{{maintablist[activityidx].name}}业务。其中一级<text
				class="text">{{totalinfo.oneleveltotal||0}}</text> <text class="text-unit">只</text>，二级
			<text class="text">
				{{totalinfo.twoleveltotal||0}}
			</text>
			<text class="text-unit">只</text>，三有
			<text class="text">
				{{totalinfo.threehavetotal||0}}
			</text>
			<text class="text-unit">只</text>，外来
			<text class="text">
				{{totalinfo.wailaitotal}}
			</text>
			<text class="text-unit">只</text>。
		</view>
		<view class="list-box">
			<view class="list-head flex-align-center">
				<view class="title-icon"></view>
				<view class="fz_32">物种列表</view>
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
	import navbar from '../../../components/navbar/index.vue';
	import bottomline from '@/components/bottomline';
	import {
		getwuZhongTaiZhangList,
		getAllTotalInfo
	} from '../../../config/api.js';
	export default {
		data() {
			return {
				totalinfo: null,
				navheight: getApp().globalData.navheight,
				titlearr: [{
						name: '物种台账',
						url: ''
					},
					{
						name: '物种总览',
						url: '/pages/overview/species/index'
					}
				],
				statisticsList: [],
				maintablist: [{
						name: '驯养繁殖'
					},
					{
						name: '收容救助'
					}
				],
				activityidx: 0,
				detaillist: [],
				orgname: uni.getStorageSync('orgname'),
				orgcode: uni.getStorageSync('orgcode'),
				pagesize: 10,
				pageindex: 1,
				showBtLine: false
			};
		},
		onLoad(props) {
			this.getlist('refresh');
			this.gettotal()
		},
		onReachBottom() {
			if (this.showBtLine) return;
			this.pageindex++;
			this.getlist();
		},
		components: {
			addresspicker,
			cardoverview,
			navbar,
			bottomline
		},
		methods: {
			gettotal() {
				getAllTotalInfo({
					type: this.activityidx,
					orgcode: this.orgcode,
					timeflg: '一年'
				}).then(res => {
					if (res.data.code == 0) {
						this.totalinfo = res.data.data
					}
				})
			},
			getlist(refresh) {
				if (refresh) {
					this.pageindex = 1;
				}
				getwuZhongTaiZhangList({
					type: this.activityidx,
					orgcode: this.orgcode,
					pageindex: this.pageindex,
					pagesize: this.pagesize
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
			},
			changeAddress(name, code) {
				this.orgcode = code;
				this.orgname = name;
				this.getlist('refresh');
			},
			itemclick(data) {
				uni.navigateTo({
					url: `/pages/standingbook/species/enterpriselist?id=${data.companyid}&type=${this.activityidx}&orgcode=${this.orgcode}&bisname=${data.title}`
				});
			},
			maintabclick(e) {
				this.activityidx = e.index;
				this.getlist('refresh');
				this.gettotal()
			}
		}
	};
</script>

<style lang="less">
	page {
		background: #eee;
	}

	.specieslist {
		display: flex;
		flex-direction: column;

		.txtRegion {
			font-size: 28rpx !important;
		}

		padding: 0 30rpx;

		.tab-box {
			margin: 0 -20rpx;
		}

		.title {
			color: #009688;
			position: relative;
			padding-left: 16rpx;

			&::before {
				content: '';
				display: block;
				position: absolute;
				width: 6rpx;
				height: 20rpx;
				background: #009688;
				top: 8rpx;
				left: 0;
			}
		}

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

			.list-item {
				margin-bottom: 20rpx;

				&:last-child {
					margin-bottom: 0;
				}
			}
		}
	}
</style>
