<template>
	<view class="content">
		<view class="banner" v-if="homedata.bannerinfo&&homedata.bannerinfo[0].value.length">
			<swiper class="swiper" autoplay circular>
				<swiper-item v-for="(item,index) in homedata.bannerinfo[0].value" :key="index">
					<view class="swiper-item-imgbox">
						<image v-if="item.pic" style="width: 100%;height: 100%;" :src="item.pic" mode='aspectFill'>
						</image>
					</view>
				</swiper-item>
			</swiper>
		</view>
		<view class="personinfo-box flex-around-center" v-if="homedata.personinfo&&homedata.personinfo.length">
			<view class="roleswitch flex-align-center">
				<picker @change="rolechange" range-key="deptrole" :range="rolelist">
					{{`${deptname}  ${rolename}`}}
				</picker>
				<image style="width: 28rpx;height: 11rpx;" src="../../static/imgs/Polygon.png"></image>
			</view>
			<view @click="menuclick(item)" class="personinfo-item flex-column-center"
				v-for="(item,index) in homedata.personinfo" :key="index">
				<view class="personinfo-img">
					<image v-if="item.pic" :src="item.pic">
				</view>
				<view class="">
					{{item.name}}
				</view>
			</view>
		</view>
		<view v-if="homedata.msgopinfo&&homedata.msgopinfo.length" class="msgopinfo-box">
			<view @click="menuclick(item)" v-for="(item,index) in homedata.msgopinfo" :key="index"
				class="flex-align-center">
				<view style="color: #999;">
					{{item.value}}
				</view>
				<view v-if="item.name" style="color: #3d71e7;">
					{{item.name}}
				</view>
			</view>
		</view>
		<view v-if="homedata.bisopinfo&&homedata.bisopinfo.length" class="bisopinfo-box flex">
			<view @click="menuclick(item)" class="bisopinfo-item flex-column-center"
				v-for="(item,index) in homedata.bisopinfo" :key="index">
				<view class="bisopinfo-img">
					<image v-if="item.pic" :src="item.pic">
				</view>
				<view class="">
					{{item.name}}
				</view>
			</view>
		</view>
		<view v-if="homedata.orgbisinfo[0]&&!homedata.zhuanweihuibisinfo[0]" class="tab-box">
			<u-tabs :activeStyle="{
		    color: '#3D71E7',
		    fontWeight: 'bold'
		}" :list="maintablist" @click="maintabclick"></u-tabs>
		</view>
		<view v-if="homedata.orgbisinfo && homedata.orgbisinfo[0]" class="orgbisinfo flex-between-center">
			<view class="business-left">
				<homecard1 @click="menuclick(homedata.orgbisinfo[0])" :data="homedata.orgbisinfo[0].value[0]">
				</homecard1>
			</view>
			<view class="business-right">
				<homecard2 @click="menuclick(homedata.orgbisinfo[1])" :style="{marginBottom:'20rpx'}"
					:data="homedata.orgbisinfo[1].value[0]"></homecard2>
				<homecard3 @click="menuclick(homedata.orgbisinfo[2])" :data="homedata.orgbisinfo[2].value[0]">
				</homecard3>
			</view>
		</view>
		<view v-if="homedata.zhuanweihuibisinfo && homedata.zhuanweihuibisinfo[0]"
			class="orgbisinfo flex-between-center">
			<view class="business-left">
				<homecard1 @click="menuclick(homedata.zhuanweihuibisinfo[0])"
					:data="homedata.zhuanweihuibisinfo[0].value[0]"></homecard1>
			</view>
			<view class="business-right">
				<view class="business-right-up">
					<homecard2 @click="menuclick(homedata.zhuanweihuibisinfo[1])" :style="{marginBottom:'20rpx'}"
						:data="homedata.zhuanweihuibisinfo[1].value[0]">
					</homecard2>
				</view>
				<view class="business-right-down">
					<homecard3 @click="menuclick(homedata.zhuanweihuibisinfo[0])"
						:data="homedata.zhuanweihuibisinfo[2].value[0]"></homecard3>
				</view>
			</view>
		</view>
		<view v-if="homedata.companybisinfo&&homedata.companybisinfo.length"
			class="companybisinfo-box flex-between-center">
			<view @click="menuclick(homedata.companybisinfo[0])" class="companybisinfo-item">
				<homecard3 :style="{background:'url(' + homedata.companybisinfo[0].pic + ') 100% no-repeat '}"
					:data="homedata.companybisinfo[0].value[0]"></homecard3>
			</view>
			<view @click="menuclick(homedata.companybisinfo[1])" class="companybisinfo-item">
				<homecard2 :style="{background:'url(' + homedata.companybisinfo[1].pic + ') 100% no-repeat '}"
					:data="homedata.companybisinfo[1].value[0]"></homecard2>
			</view>
		</view>
		<view v-if="homedata.scienceinfo&&homedata.scienceinfo.length" class="scienceinfo-box flex-between-center">
			<view @click="menuclick(item)" class="scienceinfo-item" v-for="(item,index) in homedata.scienceinfo"
				:key="index">
				<view class="scienceinfo-img">
					<image v-if="item.pic" :src="item.pic">
				</view>
				<view class="scienceinfo-title">
					{{item.name}}
				</view>
			</view>
		</view>
		<view class="statusinfo-box" v-if="homedata.statusinfo&&homedata.statusinfo.length">
			<homecard4 :data="homedata.statusinfo[0].value[0]"></homecard4>
		</view>
		<view class="flex-between-center advancedinfo-box" v-if="homedata.advancedinfo&&homedata.advancedinfo.length">
			<view class="advancedinfo-item" v-for="(item,index) in homedata.advancedinfo" :key="index"
				:class="'advancedinfo-'+index">
				<view style="font-size: 40rpx;" class="">
					{{item.name}}
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import {
		getPadPage,
		getPadPageBisButtonAnthority,
		getRoleByPersonId,
		getPadCompanyAccount,
		saveSelectRole
	} from '@/config/api.js'
	import {
		getLocation
	} from "@/utils/location.js"
	import homecard1 from '@/components/homecard/card1.vue'
	import homecard2 from '@/components/homecard/card2.vue'
	import homecard3 from '@/components/homecard/card3.vue'
	import homecard4 from '@/components/homecard/card4.vue'
	import progressbar from '@/components/cn-progressbar/cn-progressbar.vue'
	export default {
		data() {
			return {
				homedata: {},
				maintablist: [{
					id: 0,
					name: '人工繁育'
				}, {
					id: 1,
					name: '收容救助'
				}],
				tabidx: 0,
				rolename: '',
				deptname: '',
				rolelist: []
			};
		},
		onLoad() {
			uni.hideHomeButton()
		},
		onShow() {
			this.init()
		},
		components: {
			progressbar,
			homecard1,
			homecard2,
			homecard3,
			homecard4
		},
		methods: {
			async init() {
				await getRoleByPersonId().then(res => {
					if (res.data.code == 0) {
						if (!res.data.data[0]) {
							uni.removeStorageSync('orgcode')
							uni.removeStorageSync('orgname')
							uni.removeStorageSync('roleid')
							uni.reLaunch({
								url: '/pages/guide/index'
							})
							return
						}
						this.rolelist = res.data.data
						let itemdata = null
						this.rolelist.map(item => {
							if (item.selectflg) {
								itemdata = item
							}
						})
						if (itemdata) {
							this.deptname = itemdata.deptname
							this.rolename = itemdata.rolename
							uni.setStorageSync('orgcode', itemdata.orgcode)
							uni.setStorageSync('orgname', itemdata.orgname)
							uni.setStorageSync('roleid', itemdata.roleid)
							uni.setStorageSync('checkflg', itemdata.checkflg)
						} else {
							this.deptname = this.rolelist[0].deptname
							this.rolename = this.rolelist[0].rolename
							uni.setStorageSync('orgcode', this.rolelist[0].orgcode)
							uni.setStorageSync('orgname', this.rolelist[0].orgname)
							uni.setStorageSync('roleid', this.rolelist[0].roleid)
							uni.setStorageSync('checkflg', this.rolelist[0].checkflg)
						}
						uni.setStorageSync('deptname', this.deptname)
					}
				})
				getPadPage().then((res) => {
					if (res.data.code == 0) {
						this.homedata = res.data.data
					}
				})
			},
			rolechange(e) {
				let data = this.rolelist[Number(e.detail.value)]
				saveSelectRole({
					orgcode: data.orgcode,
					roleid: data.roleid
				}).then(res => {
					if (res.data.code == 0) {
						uni.setStorageSync('roleid', data.roleid)
						uni.setStorageSync('orgcode', data.orgcode)
						uni.setStorageSync('orgname', data.orgname)
						this.deptname = data.deptname
						this.rolename = data.rolename
						this.init()
						uni.setStorageSync('deptname', this.deptname)
					}
				})
			},
			//切换
			maintabclick(data) {
				getPadCompanyAccount({
					unittype: data.id
				}).then(res => {
					if (res.data.code == 0) {
						this.homedata.orgbisinfo = res.data.data
					}
				})
			},
			menuclick(data) {
				getPadPageBisButtonAnthority({
					bisid: data.id
				}).then(res => {
					if (res.data.code == 0) {
						if (res.data.data.anthority) {
							let url = data.api + `?yewuid=${data.id}`
							if (data.id == 80002) {
								url = '/pages/businessform/quarantine'
							}
							if (data.id == 80017) {
								url = '/pages/businessform/introduction'
							}
							uni.navigateTo({
								url
							});
						} else {
							uni.showToast({
								title: res.data.data.msg,
								icon: 'none'
							})
						}
					} else {
						uni.showToast({
							title: res.data.msg,
							icon: 'none'
						})
					}
				})
			}
		}
	};
</script>
<style lang="less">
	page {
		background: #f5f5f5;
	}

	.color-8 {
		color: rgba(#fff, 0.8);
	}

	.content {
		.banner {
			height: 400rpx;

			swiper {
				height: 100%;
			}

			.swiper-item-imgbox {
				width: 100%;
				height: 100%;
			}
		}

		.personinfo-box {
			background: #fff;
			position: absolute;
			margin-top: -120rpx;
			width: -webkit-fill-available;
			margin-left: 30rpx;
			margin-right: 30rpx;
			padding: 30rpx;
			border-radius: 20rpx;
			box-shadow: 0 0 5rpx 0 #ccc;

			.roleswitch {
				position: absolute;
				top: -40rpx;
				right: 0;
				color: #fff;
			}

			.personinfo-item {

				.personinfo-img {
					width: 60rpx;
					height: 60rpx;
					margin-bottom: 16rpx;

					image {
						width: 100%;
						height: 100%;
					}
				}
			}
		}

		.msgopinfo-box {
			margin: 0 30rpx;
			border-radius: 20rpx;
			color: #999;
			padding: 20rpx 30rpx;
			background: rgba(#3D71E7, 0.1);
			margin-top: 90rpx;

			.msgopinfo-btn {
				background: #3D71E7;
				border: 20rpx;
				padding: 0 10rpx;
				color: #fff;
				font-size: 22rpx;
			}
		}

		.tab-box {
			margin: 0 20rpx;

		}

		.orgbisinfo {
			margin: 30rpx 30rpx 0;

			.business-left {
				width: 48%;
			}

			.business-right {
				width: 48%;
			}
		}

		.bisopinfo-box {
			background: #fff;
			padding: 40rpx 0 0;
			flex-wrap: wrap;
			margin: 30rpx 30rpx 0;
			border-radius: 20rpx;

			.bisopinfo-item {
				width: 25%;
				margin-bottom: 40rpx;

				.bisopinfo-img {
					width: 70rpx;
					height: 70rpx;
					margin-bottom: 10rpx;

					image {
						width: 100%;
						height: 100%;
					}
				}
			}
		}

		.companybisinfo-box {
			flex-wrap: wrap;
			margin: 30rpx 30rpx 0;

			.companybisinfo-item {
				width: 48%;
				flex-shrink: 0;

				.companybisinfo-title {
					position: relative;
				}

				.companybisinfo-img {
					position: absolute;
					width: 100%;
					height: 100%;
					margin-bottom: 10rpx;
					left: 0;
					top: 0;

					image {
						width: 100%;
						height: 100%;
					}
				}
			}
		}

		.statusinfo-box {
			margin: 30rpx 30rpx 0;
		}

		.advancedinfo-box {
			margin: 30rpx;

			.advancedinfo-item {
				padding: 20rpx;
				border-radius: 10rpx;
			}

			.advancedinfo-0 {
				background: #F3F9FF;
				color: #3D71E7;
			}

			.advancedinfo-1 {
				color: #F57C51;
				background: rgba(#FF9671, 0.1);
			}

			.advancedinfo-2 {
				color: #2ED4A3;
				background: rgba(#79FFD6, 0.1);
			}
		}

		.scienceinfo-box {
			flex-wrap: wrap;
			margin: 30rpx 30rpx 0;

			.scienceinfo-item {
				flex-shrink: 0;
				position: relative;
				border-radius: 20rpx;
				color: #fff;
				padding: 20rpx;
				width: 32%;
				height: 160rpx;

				&:nth-child(1) {
					color: #E78A69;
				}

				&:nth-child(2) {
					color: #50BFDD;
				}

				&:nth-child(3) {
					color: #6C6AD7;
				}

				.scienceinfo-img {
					position: absolute;
					width: 100%;
					height: 100%;
					margin-bottom: 10rpx;
					left: 0;
					top: 0;

					image {
						width: 100%;
						height: 100%;
					}
				}

				.scienceinfo-title {
					position: relative;
					font-size: 32rpx;
				}
			}
		}
	}
</style>
