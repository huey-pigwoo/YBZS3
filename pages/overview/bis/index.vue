<template>
	<view class="overview_species">
		<navbar :title="titlearr"></navbar>
		<view :style="{height: navheight+'rpx'}">
		</view>
		<view style="margin-top:30rpx;" class="flex-align-center">
			<addresspicker @onChangeAddress="changeAddress" :orgname="orgname"></addresspicker>
			<image style="width: 28rpx;height: 11rpx;margin-left: 10rpx;" src="/static/imgs/Polygon2.png"></image>
		</view>
		<view class="tab-box">
			<u-tabs :activeStyle="{
            color: '#000',
            fontWeight: 'bold'
        }" :list="maintablist" @click="maintabclick"></u-tabs>
		</view>
		<view v-if='totalinfo' class="statistics">
			在<text class="text">{{totalinfo.countytotal}}<text class="text-unit">个区县</text></text>内的
			<text class="text">{{totalinfo.companytotal}}<text
					class="text-unit">家</text></text>{{maintablist[activityidx].name}}企业在
			<text class="text">{{subtablist[subidx].name}}</text>对
			<text class="text">{{totalinfo.animaltypetotal}}<text class="text-unit">种</text></text>动物共
			<text class="text">{{totalinfo.totalnum}}<text class="text-unit">只</text></text>开展了<text
				class="text">{{totalinfo.bistypetotal}}<text class="text-unit">种</text></text><text
				class="text">{{totalinfo.bistimetotal}}<text
					class="text-unit">次</text></text>{{maintablist[activityidx].name}}业务
		</view>
		<view class="chart-box">
			<view class="subtab-box">
				<view class="flex-around-center">
					<view @click="controlclick(index)" :class="index==controlidx?'control-item-active':''"
						class="control-item" v-for="(item,index) in chartcontrol1" :key="index">
						{{item.name}}
					</view>
				</view>
			</view>
			<view class="flex-around-center" style="margin-top: 40rpx;">
				<view @click="subtabclick(index)" :class="subidx==index?'subactive':''"
					v-for="(item,index) in subtablist" :key="index">
					{{item.name}}
				</view>
			</view>
			<view class="chart">
				<block v-if="chartData">
					<qiun-data-charts v-if="chartcontrol1[controlidx].name!='趋势'" type="ring" :opts="opts"
						:chartData="chartData" />
					<qiun-data-charts v-else type="line" :opts="opts_line" :chartData="chartData" />
				</block>
				<view v-else style="height: 300rpx;text-align: center;margin-top: 150rpx;color: #666;">
					暂无数据...
				</view>
				<view v-if="controlidx==1" style="position: absolute;right: 30rpx;bottom: 20rpx;z-index: 9;"
					class="flex-baseline">
					<view style="margin-right: 10rpx;" @click="controlbisclick(0)"
						:class="controlbisidx==0?'control-bisitem-active':'control-bisitem'">
						物种
					</view>
					<view @click="controlbisclick(1)"
						:class="controlbisidx==1?'control-bisitem-active':'control-bisitem'">
						动物
					</view>
				</view>
			</view>
		</view>
		<view class="list-box">
			<view class="list-head">
				<view class="flex-align-center">
					<view class="title-icon"></view>
					<view class="fz_28">
						{{chartcontrol1[controlidx].name}}详情
					</view>
				</view>
			</view>
			<view v-if="!detaillist[0]" style="height: 200rpx;text-align: center;color: #666;margin-top: 100rpx;">
				暂无数据...
			</view>
			<view v-for="(item,index) in detaillist" :key="index" class="list-item">
				<cardoverview :data='item' />
			</view>
		</view>
	</view>
</template>

<script>
	import addresspicker from '../../../components/pick-address/index.vue';
	import cardoverview from '../../../components/listcard/card_overview.vue'
	import navbar from '../../../components/navbar/index.vue'
	import {
		getbisOverview,
		getAllTotalInfo,
		getAnthority
	} from '../../../config/api.js'
	export default {
		data() {
			return {
				navheight: getApp().globalData.navheight,
				titlearr: [{
					name: "业务总览",
					url: ''
				}, {
					name: '业务台账',
					url: '/pages/standingbook/bis/bislist'
				}],
				statisticsList: [],
				startTime: '',
				endTime: '',
				maintablist: [],
				chartcontrol1: [{
					name: '分类'
				}, {
					name: '物种'
				}, {
					name: '企业'
				}, {
					name: '区划'
				}, ],
				subtablist: [{
					name: '一周内',
					field: '一周'
				}, {
					name: '一月内',
					field: '一月'
				}, {
					name: '半年内',
					field: '半年'
				}, {
					name: '一年内',
					field: '一年'
				}],
				chartData: null,
				activityidx: 0,
				opts: {
					rotate: false,
					rotateLock: false,
					color: ["#1890FF", "#91CB74", "#FAC858", "#EE6666", "#73C0DE", "#3CA272", "#FC8452", "#9A60B4",
						"#ea7ccc"
					],
					padding: [5, 5, 5, 5],
					dataLabel: true,
					legend: {
						show: true,
						position: "right",
						lineHeight: 25
					},
					title: {
						name: "",
					},
					subtitle: {
						name: "",
					},
					extra: {
						ring: {
							ringWidth: 20,
							activeOpacity: 0.5,
							activeRadius: 10,
							offsetAngle: 0,
							labelWidth: 15,
							border: false,
							borderWidth: 3,
							borderColor: "#FFFFFF",
							customRadius: 60
						}
					}
				},
				opts_line: {
					color: ["#1890FF", "#91CB74", "#FAC858", "#EE6666", "#73C0DE", "#3CA272", "#FC8452", "#9A60B4",
						"#ea7ccc"
					],
					padding: [15, 10, 0, 15],
					enableScroll: false,
					legend: {},
					xAxis: {
						disableGrid: true
					},
					yAxis: {
						gridType: "dash",
						dashLength: 2
					},
					extra: {
						line: {
							type: "straight",
							width: 2,
							activeType: "hollow"
						}
					}
				},
				controlidx: 0,
				detaillist: [],
				subidx: 3,
				orgname: uni.getStorageSync('orgname'),
				orgcode: uni.getStorageSync('orgcode'),
				totalinfo: null,
				controlbisidx: 0
			}
		},
		onLoad(props) {
			this.init()
			getAnthority().then(res => {
				if (res.data.code == 0) {
					this.maintablist = res.data.data
				}
			})
		},
		components: {
			addresspicker,
			cardoverview,
			navbar
		},
		computed: {
			bistype() {
				return this.chartcontrol1[this.controlidx].name
			},
		},
		methods: {
			//点击动物、物种
			controlbisclick(idx) {
				this.controlbisidx = idx
				this.chartcontrol1[1].name = idx == 1 ? '动物' : '物种'
				this.init()
			},
			changeAddress(name, code) {
				this.orgcode = code;
				this.orgname = name;
				this.init();
			},
			init() {
				getbisOverview({
					type: this.activityidx,
					orgcode: this.orgcode,
					bistype: this.bistype,
					timeflg: this.subtablist[this.subidx].field
				}).then(res => {
					if (res.data.code == 0) {
						if (res.data.data.bar[0]) {
							this.chartData = {
								series: [{
									data: res.data.data.bar.map(item => {
										item.labelShow = false
										return item
									})
								}]
							}
						} else {
							this.chartData = null
						}
						if (res.data.data.list[0]) {
							this.detaillist = res.data.data.list
						} else {
							this.detaillist = []
						}
					}
				})
				getAllTotalInfo({
					type: this.activityidx,
					orgcode: this.orgcode,
					timeflg: this.subtablist[this.subidx].field
				}).then(res => {
					if (res.data.code == 0) {
						this.totalinfo = res.data.data
					}
				})
			},
			controlclick(idx) {
				this.controlidx = idx
				if (this.controlidx == 2) {
					this.opts.legend.show = false
				} else {
					this.opts.legend.show = true
				}
				this.init()
			},
			maintabclick(e) {
				this.activityidx = this.maintablist[e.index].type
				this.init()
			},
			subtabclick(idx) {
				this.subidx = idx
				this.init()
			}
		}
	}
</script>

<style lang="less">
	page {
		background: #eee;
	}

	.overview_species {
		padding: 0 30rpx;

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

		.tab-box {
			margin: 0 -20rpx;
		}

		.statistics {
			padding: 10rpx 0;
			color: #999;

			.text {
				font-size: 30rpx;
				color: #000;

				.text-unit {
					font-size: 24rpx
				}
			}

		}

		.list-box {
			padding: 20rpx;
			border-radius: 20rpx;
			background-color: #fff;

			.list-item {
				margin-bottom: 20rpx;

				&:last-child {
					margin-bottom: 0;
				}
			}

			.list-head {
				margin-bottom: 20rpx;

				.title-icon {
					width: 3px;
					height: 28rpx;
					background: #3d71e7;
					margin-right: 10rpx;
				}
			}
		}

		.chart-box {
			padding: 20rpx;
			margin: 20rpx 0;
			background: #fff;
			border-radius: 24rpx;

			.subtab-box {
				.control-item {
					padding: 5rpx 20rpx;
					color: rgba(#000, 0.6);
					border-radius: 30rpx;
					border: 1px solid rgba(153, 153, 153, 0.8);
				}

				.control-item-active {
					background: #3d71e7;
					color: #fff;
				}
			}

			.subactive {
				font-weight: bold;
			}

			.chart {
				position: relative;
				margin-top: 20rpx;

				.control-bisitem-active {
					font-size: 32rpx;
					color: #3d71e7;
				}
			}

			.chart-box-left {
				flex-shrink: 0;
				margin-left: 20rpx;

				.chart-box-left-item {
					margin-bottom: 40rpx;
				}

				.chart-box-left-item:last-child {
					margin-bottom: 0;
				}
			}
		}

		.activity-box {
			background-color: #fff;
			border-radius: 30rpx;
			padding: 20rpx;
			margin: 20rpx;

			.grid-list {
				flex-wrap: wrap;
				margin-top: 30rpx;

				.grid-list-item {
					flex-direction: column;
					justify-content: center;
					align-items: center;
					border: 1rpx solid #009688;
					width: 25%;
					flex-shrink: 0;
					padding: 20rpx;
					margin: 0 -1px -1px 0;

					.grid-item-name {
						margin-bottom: 20rpx;
					}

					.grid-item-name,
					.grid-item-unit {
						text-align: center;
					}
				}

				.grid-active {
					background: #009688;
					color: #fff;
				}
			}
		}

	}
</style>
