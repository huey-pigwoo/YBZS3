<template>
	<view class="enterprisedetail">
		<navbar :title="titlearr"></navbar>
		<view :style="{height: navheight+'rpx',width:'100%'}"></view>
		<companyinfo :data='companyinfo'></companyinfo>
		<view class="list-box">
			<view class="list-head">
				<view class="flex-align-center">
					<view class="flex-align-center">
						<view class="title-icon"></view>
						<view class="fz_32">
							<picker mode="selector" :range="animallist" range-key="name" @change="pickchange">
								<view class="list-title">{{bisname}}</view>
							</picker>
						</view>
					</view>
					<!-- <view style="margin-left: 60rpx;" class="flex-align-center">
						<text class="fz_30">{{123 }}</text>
						<text style="font-size: 20rpx;">件</text>
					</view> -->
				</view>
			</view>
			<view @click="itemclick(item)" v-for="(item,index) in detaillist" :key="index" class="list-item">
				<cardoverview :data='item' />
			</view>
		</view>
		<bottomline v-if="showBtLine && detaillist.length > 4"></bottomline>
	</view>
</template>

<script>
	import cardoverview from '../../../components/listcard/card_overview.vue'
	import bottomline from '@/components/bottomline';
	import navbar from '@/components/navbar/index.vue';
	import companyinfo from '../components/companyinfo.vue'
	import {
		getWuZhongInfoList,
		getDongwuList,
		getcompanyBrieflyInfo,
		getcompanyAccountTotal
	} from '../../../config/api.js'
	export default {
		data() {
			return {
				titlearr: [{
					name: "物种详情",
					url: ''
				}, {
					name: '业务台账',
					url: ''
				}],
				navheight: getApp().globalData.navheight,
				detaillist: [],
				orgname: uni.getStorageSync('orgname'),
				orgcode: uni.getStorageSync('orgcode'),
				pagesize: 10,
				pageindex: 1,
				showBtLine: false,
				type: 0,
				id: '',
				listheadidx: 0,
				bisname: '',
				animallist: [],
				companyinfo: {}
			}
		},
		onLoad(props) {
			if (props.type) {
				this.type = props.type
			}
			if (props.bisname) {
				this.bisname = props.bisname
			}
			if (props.orgcode) {
				this.orgcode = props.orgcode
			}
			if (props.id) {
				this.id = props.id
			}
			getcompanyBrieflyInfo({
				type: this.type,
				companyid: this.id
			}).then(res => {
				if (res.data.code == 0) {
					this.companyinfo = res.data.data;
				}
			});
			this.getlist('refresh')
			this.getAnimalList()
			getcompanyAccountTotal({
				type: this.type,
				orgcode: this.orgcode
			})
		},
		components: {
			cardoverview,
			navbar,
			companyinfo
		},
		methods: {
			itemclick(data) {
				uni.navigateTo({
					url: `/pages/businessform/detail?onetimeid=${data.id}`
				})
			},
			pickchange(e) {
				console.log(e)
				this.bisname = this.animallist[e.detail.value].name
				this.getlist('refresh')
			},
			getAnimalList() {
				getDongwuList({
					type: this.type,
					orgcode: this.orgcode,
					pageindex: 1,
					pagesize: 10000,
					companyid: this.id,
				}).then(res => {
					if (res.data.code == 0) {
						this.animallist = res.data.data.rows
					}
				})
			},
			getlist(refresh) {
				if (refresh) {
					this.pageindex = 1
				}
				getWuZhongInfoList({
					type: this.type,
					orgcode: this.orgcode,
					pageindex: this.pageindex,
					pagesize: this.pagesize,
					companyid: this.id,
					animalname: this.bisname
				}).then(res => {
					if (res.data.code == 0) {
						this.detaillist = refresh ? res.data.data.rows : this.detaillist.concat(res.data.data
							.rows)
						this.showBtLine = this.pageindex * this.pagesize >= res.data.data.total ? true : false
					}
				})
			}
		}
	}
</script>

<style lang="less">
	page {
		background: #eee;
	}

	.enterprisedetail {
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
