<template>
	<view class="enterpriselist">
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
		<view class="list-box">
			<view class="list-head">
				<view class="flex-align-center">
					<view class="title-icon"></view>
					<view style="margin-right: 60rpx;" class="fz_32">
						<picker mode="selector" :range="bislist" range-key="name"
							@change="pickchange('bisname', 'bislist', $event)">
							<view class="list-title">{{ bisname }}</view>
						</picker>
					</view>
					<view class="fz_32">
						<picker mode="selector" :range="animallist" range-key="name"
							@change="pickchange('animalname', 'animallist', $event)">
							<view class="list-title">{{ animalname }}</view>
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
	import addresspicker from '../../../components/pick-address/index.vue';
	import cardoverview from '../../../components/listcard/card_overview.vue';
	import navbar from '../../../components/navbar/index.vue';
	import bottomline from '@/components/bottomline';
	import {
		getWuzhongCompangyList,
		getBisType,
		getDongwuList
	} from '../../../config/api.js';
	export default {
		data() {
			return {
				navheight: getApp().globalData.navheight,
				titlearr: [{
						name: '企业列表',
						url: ''
					},
					{
						name: '业务台账',
						url: ''
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
				showBtLine: false,
				animalname: '',
				animallist: [],
				bislist: [],
				bisname: ''
			};
		},
		onLoad(props) {
			if (props.type) {
				this.activityidx = Number(props.type);
			}
			if (props.bisname) {
				this.bisname = props.bisname;
			}
			this.getlist('refresh');
			getBisType({
				type: this.activityidx
			}).then(res => {
				if (res.data.code == 0) {
					this.bislist = res.data.data.rows;
				}
			});
			getDongwuList({
				type: this.activityidx,
				orgcode: this.orgcode,
				pageindex: 1,
				pagesize: 10000,
				animalname: this.animalname,
				bisname: this.bisname
			}).then(res => {
				if (res.data.code == 0) {
					this.animallist = res.data.data.rows;
					this.animalname = res.data.data.rows[0].name;
				}
			});
		},
		components: {
			addresspicker,
			cardoverview,
			navbar
		},
		methods: {
			itemclick(data) {
				uni.navigateTo({
					url: `/pages/businessform/detail?onetimeid=${data.id}`
				})
			},
			pickchange(state1, state2, e) {
				console.log(e);
				this[state1] = this[state2][e.detail.value].name;
				this.getlist('refresh');
			},
			getlist(refresh) {
				if (refresh) {
					this.pageindex = 1;
				}
				getWuzhongCompangyList({
					type: this.activityidx,
					orgcode: this.orgcode,
					pageindex: this.pageindex,
					pagesize: this.pagesize,
					animalname: this.animalname,
					bisname: this.bisname
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
			maintabclick(e) {
				this.activityidx = e.index;
				this.getlist('refresh');
			},
			changeAddress(name, code) {
				this.orgcode = code;
				this.orgname = name;
				this.getlist('refresh');
			}
		}
	};
</script>

<style lang="less">
	page {
		background: #eee;
	}

	.enterpriselist {
		display: flex;
		flex-direction: column;
		height: 100vh;

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
