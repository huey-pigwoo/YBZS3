<template>
	<view class="deptmanage container">
		<view class="head">
			<view class="form-itemblock">
				<view class="flex-align-center" style="margin-bottom: 20rpx;">
					<view class="field-title">
						授权范围
					</view>
					<view class="head_value flex-align-center">
						<addresspicker :orgname='orgname' @onChangeAddress='changeAddress'></addresspicker>
						<image style="width: 28rpx;height: 11rpx;margin-left: 10rpx;"
							src="../../static/imgs/Polygon2.png"></image>
						<!-- {{orgname}} -->
					</view>
				</view>
				<view class="flex-align-center">
					<view class="field-title">
						授权业务
					</view>
					<view class="head_value flex-align-center">
						{{bisname}}
						<image style="width: 28rpx;height: 11rpx;margin-left: 10rpx;"
							src="../../static/imgs/Polygon2.png"></image>
					</view>
				</view>
			</view>
			<view class="flex-between-center">
				<view @click="addclick" class="" style="color: #3d71e7;">
					点击添加新的授权单位
				</view>
				<view class="">
					{{classify}}
				</view>
			</view>
		</view>
		<view v-if="datalist.length" class="list">
			<view v-for="(item,index) in datalist" :key="index" style="margin-bottom: 20rpx;">
				<cardmanage @click='itemclick(item)' :data='item'></cardmanage>
			</view>
		</view>
		<bottomline v-if="showBtLine && datalist.length > 4"></bottomline>
	</view>
</template>

<script>
	import {
		getunitManage,
		getanthorityManage
	} from '@/config/api.js'
	import cardmanage from '@/components/listcard/card_manage.vue'
	import bottomline from '@/components/bottomline';
	import addresspicker from '@/components/pick-address/index.vue'
	export default {
		data() {
			return {
				datalist: [],
				pageindex: 1,
				pagesize: 10,
				showBtLine: false,
				bisname: '林业，野保',
				orgname: uni.getStorageSync('orgname'),
				classify: '',
				orgcode: ''
			}
		},
		onLoad(props) {
			console.log(props.navtitle)
			uni.setNavigationBarTitle({
				title: props.navtitle
			})
			this.navtitle = props.navtitle
		},
		onShow() {
			this.getlist('refresh')
		},
		components: {
			cardmanage,
			bottomline,
			addresspicker
		},
		//触底加载
		onReachBottom() {
			if (this.showBtLine) return;
			this.pageindex++;
			this.getlist();
		},
		methods: {
			changeAddress(orgname, orgcode) {
				this.orgcode = orgcode
				this.getlist('refresh')
			},
			addclick() {
				let url = ''
				if (this.navtitle.includes('授权')) {
					url = `/pages/user/addauthorization?flg=1`
				} else {
					url = `/pages/business/registerCompany?flg=1`
				}
				const _self = this
				uni.navigateTo({
					url,
					events: {
						refresh() {
							_self.getlist('refresh')
						}
					}
				})
			},
			itemclick(data) {
				const _self = this
				let checkflg = false
				let url = ''
				if (data.stateid == 2) {
					checkflg = true
				}
				if (this.navtitle.includes('授权')) {
					url =
						`/pages/user/addauthorization?flg=1&data=${encodeURIComponent(JSON.stringify(data))}&checkflg=${checkflg}&editflg=true`
				} else {
					url =
						`/pages/business/registerCompany?flg=1&data=${encodeURIComponent(JSON.stringify(data))}&checkflg=${checkflg}&editflg=true`
				}
				uni.navigateTo({
					url,
					events: {
						refresh() {
							_self.getlist('refresh')
						}
					}
				})
			},
			getlist(refresh) {
				if (refresh) {
					this.pageindex = refresh ? 1 : this.pageindex
				}
				if (this.navtitle.includes('单位')) {


					getunitManage({
						orgcode: this.orgcode,
						pageindex: this.pageindex,
						pagesize: this.pagesize
					}).then(res => {
						if (res.data.code == 0) {
							if (refresh) {
								this.datalist = [...res.data.data.rows]
							} else {
								this.datalist = this.datalist.concat([...res.data.data.rows])
							}
							if (this.pageindex * this.pagesize >= res.data.data.total) {
								this.showBtLine = true
							} else {
								this.showBtLine = false
							}
						}
					})
				} else {
					getanthorityManage({
						orgcode: this.orgcode,
						pageindex: this.pageindex,
						pagesize: this.pagesize
					}).then(res => {
						if (res.data.code == 0) {
							if (refresh) {
								this.datalist = [...res.data.data.rows]
							} else {
								this.datalist = this.datalist.concat([...res.data.data.rows])
							}
							if (this.pageindex * this.pagesize >= res.data.data.total) {
								this.showBtLine = true
							} else {
								this.showBtLine = false
							}
						}
					})
				}
			}
		}
	}
</script>

<style lang="less">
	page {
		background: #f5f5f5;
	}

	.deptmanage {
		.head {
			position: fixed;
			top: 0;
			left: 0;
			width: 100%;
			padding: 20rpx;
			z-index: 99;
			background: #f5f5f5;
		}

		.head_value {
			background: #F6F6F6;
			border: 1px solid rgba(0, 0, 0, 0.1);
			border-radius: 4rpx;
			padding: 10rpx 20rpx;
		}

		.field-title {
			font-size: 26rpx;
			font-weight: bold;
			margin-right: 10rpx;
		}

		.list {
			margin-top: 260rpx
		}
	}
</style>
