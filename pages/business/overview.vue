<template>
	<view class="overview">
		<navbar :title="titlearr"></navbar>
		<view :style="{height: navheight+'rpx'}">
		</view>
		<!-- <pickAddress></pickAddress> -->
		<view class="tab-box">
			<u-tabs :activeStyle="{
            color: '#000',
            fontWeight: 'bold'
        }" :list="maintablist" @click="maintabclick"></u-tabs>
		</view>
		<view class="statistics">
			在<text class="text">{{statisticsList[0].value}}<text
					class="text-unit">{{statisticsList[0].unit}}</text></text>内分布有
			<text class="text">{{statisticsList[1].value}}<text
					class="text-unit">{{statisticsList[1].unit}}</text></text>驯养繁殖企业,共开展
			<text class="text">{{statisticsList[2].value}}<text
					class="text-unit">{{statisticsList[2].unit}}</text></text>
			<text class="text">{{statisticsList[3].value}}<text
					class="text-unit">{{statisticsList[3].unit}}</text></text>业务,覆盖率达到
			<text class="text">{{statisticsList[4].value}}<text
					class="text-unit">{{statisticsList[4].unit}}</text></text>。总面积为<text
				class="text">{{statisticsList[5].value}}<text
					class="text-unit">{{statisticsList[5].unit}}</text></text>,总人数为<text
				class="text">{{statisticsList[6].value}}<text
					class="text-unit">{{statisticsList[6].unit}}</text></text>,涉及<text
				class="text">{{statisticsList[7].value}}<text
					class="text-unit">{{statisticsList[7].unit}}</text></text>、<text
				class="text">{{statisticsList[8].value}}<text
					class="text-unit">{{statisticsList[8].unit}}</text></text>。
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
				<view @click="subtabclick(index)" :class="subidx==index?'subactive':''" v-for="(item,index) in subtablist" :key="index">
					{{item.name}}
				</view>
			</view>
			<view class="chart">
				<qiun-data-charts type="ring" :opts="opts" :chartData="chartData" />
			</view>
		</view>
		<view v-for="(item,index) in detaillist" :key="index" class="">
			<cardoverview :data='item' />
		</view>
	</view>
</template>

<script>
	import pickAddress from '../../components/pick-address/index.vue'
	import cardoverview from '../../components/listcard/card_overview.vue'
	import navbar from '../../components/navbar/index.vue'
	import {
		getOverviewDomestication,
		getStatisticalChart,
		getOverDetaiList
	} from '../../config/api.js'
	export default {
		data() {
			return {
				navheight: getApp().globalData.navheight,
				titlearr: [{
					name: "企业总览",
					url: ''
				}, {
					name: '企业台账',
					url: ''
				}],
				statisticsList: [],
				startTime: '',
				endTime: '',
				maintablist: [{
					name: '驯养繁殖'
				}, {
					name: '收容救助'
				}, {
					name: '加工利用'
				}],
				chartcontrol1: [{
					name: '分类'
				}, {
					name: '物种'
				}, {
					name: '企业'
				}, {
					name: '区划'
				}, {
					name: '时间'
				}, ],
				subtablist: [{
					name: '一周内'
				}, {
					name: '一月内'
				}, {
					name: '半年内'
				}, {
					name: '一年内'
				}],
				chartData: {},
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
							customRadius:60
						}
					}
				},
				controlidx: 0,
				detaillist: [],
				subidx: 0
			}
		},
		onLoad(props) {
			this.getServerData();
			this.init()
		},
		components: {
			pickAddress,
			cardoverview,
			navbar
		},
		methods: {
			init() {
				getOverviewDomestication({
					type: 1,
					orgcode: '5101'
				}).then(res => {
					if (res.data.code == 0) {
						this.statisticsList = res.data.data
					}
				})
				getStatisticalChart({
					type: 1,
					condition: '趋势',
					startTime: this.startTime,
					endTime: this.endTime
				}).then(res => {
					if (res.data.code == 0) {

					}
				})
				getOverDetaiList().then(res => {
					if (res.data.code == 0) {
						this.detaillist = res.data.data.row
					}
				})
			},
			controlclick(idx) {
				this.controlidx = idx
			},
			maintabclick(data) {
				console.log(data)
			},
			subtabclick(idx) {
				this.subidx = idx
			},
			activityClick(idx) {
				this.activityidx = idx
			},
			getServerData() {
				//模拟从服务器获取数据时的延时
				setTimeout(() => {
					//模拟服务器返回数据，如果数据格式和标准格式不同，需自行按下面的格式拼接
					let res = {
						series: [{
							data: [{
								"name": "高新区",
								"value": 50,
								"labelShow": false
							}, {
								"name": "锦江区",
								"value": 30,
								"labelShow": false
							}, {
								"name": "双流区",
								"value": 20,
								"labelShow": false
							}, {
								"name": "大邑县",
								"value": 10,
								"labelShow": false
							}, {
								"name": "金牛区",
								"value": 8,
								"labelShow": false
							}, {
								"name": "其他地区",
								"value": 8,
								"labelShow": false
							}]
						}]
					};
					this.chartData = JSON.parse(JSON.stringify(res));
				}, 500);
			},
		}
	}
</script>

<style lang="less">
	page {
		background: #eee;
	}

	.overview {
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
				margin-top: 20rpx;
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
