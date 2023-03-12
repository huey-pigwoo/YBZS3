<template>
	<view class="enterprisedetail">
		<companyinfo :data='companyinfo'></companyinfo>
		<view class="list-box">
			<view class="list-head">
				<view class="flex-between-center">
					<view class="flex-align-center">
						<view class="title-icon"></view>
						<view class="fz_32">
							业务列表
						</view>
					</view>
					<view class="flex-align-center">
						<view @click="listheadclick(0)" :style="{color:listheadidx==0?'#3d71e7':'#000'}"
							style="margin-right: 20rpx;">
							<text class="fz_30">业务{{123 }}</text>
							<text style="font-size: 20rpx;">件</text>
						</view>
						<view @click="listheadclick(1)" :style="{color:listheadidx==1?'#3d71e7':'#000'}" class="">
							<text class="fz_30">物种{{123}}</text>
							<text style="font-size: 20rpx;">种</text>
						</view>
					</view>
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
	import companyinfo from '../components/companyinfo.vue'
	import {
		getcompanyBisList,
		getwuZhongList,
		getcompanyBrieflyInfo
	} from '../../../config/api.js'
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
				companyinfo: {}
			}
		},
		onLoad(props) {
			if (props.type) {
				this.type = props.type
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
		},
		components: {
			cardoverview,
			companyinfo,
			bottomline
		},
		methods: {
			itemclick(data) {
				let url = ''
				if (this.listheadidx == 0) {
					url = `/pages/standingbook/enterprise/bislist?type=${this.type}&id=${this.id}&bisname=${data.title}`
				} else if (this.listheadidx == 1) {
					url =
						`/pages/standingbook/enterprise/specieslist?type=${this.type}&id=${this.id}&bisname=${data.title}`
				}
				uni.navigateTo({
					url
				})
			},
			listheadclick(idx) {
				this.listheadidx = idx
				this.getlist('refresh')
			},
			getlist(refresh) {
				if (refresh) {
					this.pageindex = 1
				}
				if (this.listheadidx == 0) {
					getcompanyBisList({
						type: this.type,
						orgcode: this.orgcode,
						pageindex: this.pageindex,
						pagesize: this.pagesize,
						companyid: this.id
					}).then(res => {
						if (res.data.code == 0) {
							this.detaillist = refresh ? res.data.data.rows : this.detaillist.concat(res.data.data
								.rows)
							this.showBtLine = this.pageindex * this.pagesize >= res.data.data.total ? true : false
						}
					})
				} else if (this.listheadidx == 1) {
					getwuZhongList({
						type: this.type,
						orgcode: this.orgcode,
						pageindex: this.pageindex,
						pagesize: this.pagesize,
						companyid: this.id
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

			.list-item {
				margin-bottom: 20rpx;

				&:last-child {
					margin-bottom: 0;
				}
			}
		}

	}
</style>
