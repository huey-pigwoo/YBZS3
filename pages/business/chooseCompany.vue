<template>
	<view class="chooseCompany">
		<view class="head">
			<view class="head-tabs">
				<view style="min-height: 60rpx;" v-if="!searchflg" class="flex-between-center">
					<view class="flex-align-center">
						<addresspicker :orgname='orgname' @onChangeAddress='changeAddress'>
						</addresspicker>
						<view class="down-icon">
						</view>
					</view>
					<view @click="changesearchflg" class="search-icon">
					</view>
				</view>
				<view style="min-height: 60rpx;" v-else class="flex-between-center">
					<input placeholder="请输入关键字" class="search-input" type="text" v-model="searchkey">
					<view @click="changesearchflg('search')" class="search-icon">
					</view>
				</view>
				<view class="tab-box flex">
					<view @click="tabclick(index)" class="tab-item" :class="tab_idx == index ? 'tab-active' : ''"
						v-for="(item, index) in tablist" :key="index">{{ item.name }}</view>
				</view>
				<view @click="addcompany" class="" style="color: #3d71e7;margin-top: 30rpx;">
					点击登记单位
				</view>
			</view>
		</view>
		<view class="list" v-if="list.length">
			<view @click="itemclick(item)" v-for="(item,index) in list" :key="index" class="list-item">
				<view class="left">
					<image :src="item.pic" mode="" ></image>
					<!-- <image src="/static/imgs/title-icon.png" mode="" ></image> -->
				</view>
				<view class="right">
					<view class="f1">{{item.f1}}</view>
					<view class="f2">{{item.f2}}</view>
					<Tag
						v-for="(it) in item.f3" 
						:key="it.key"
						:status="it.key" 
						:value="it.value" 
					/>
					<view class="f4-group">
						<view class="f4">{{item.f4[0].value}}</view>
						<view class="f4">业务：{{item.f4[1].value}}</view>
					</view>
				</view>
			</view>
		</view>
		<bottomline v-if="showBtLine && list.length > 4"></bottomline>
	</view>
</template>

<script>
	import {
		getAddCompanyInfo
	} from "@/config/api.js"
	import {
		chooseCompany
	} from "@/config/services.js"
	import Tag from '@/components/Tag';
	import bottomline from '@/components/bottomline';
	import addresspicker from '@/components/pick-address/index.vue';
	// import addressPicker from '@/components/addressPicker/addressPicker.vue';
	
	export default {
		data() {
			return {
				tablist: [{
					name: '驯养繁殖',
					formid: 'DOMESTICATION_BREED'
				}, {
					name: "收容救助",
					formid: 'CONTAINMENT_ASSISTANCE'
				}, {
					name: '专委会',
					formid: 'EXECUTIVE_BRANCH'
				}, {
					name: '行政部门',
					formid: 'SPECIAL_COMMITTEE'
				}, ],
				tab_idx: 0,
				pageindex: 1,
				pagesize: 10,
				orgcode: uni.getStorageSync('orgcode') || '51',
				orgname: uni.getStorageSync('orgname') || '四川省',
				list: [],
				formid: '161068947577124',
				showBtLine: false,
				searchflg: false,
				searchkey: ''
			}
		},
		onLoad() {
			uni.hideHomeButton()
		},
		components: {
			bottomline,
			addresspicker,
			Tag
		},
		onShow() {
			this.getlist('refresh')
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
				this.orgname = orgname
				this.getlist('refresh')
			},
			addcompany() {
				uni.navigateTo({
					url: '/pages/business/registerCompany?flg=0'
				})
			},
			//点击搜索按钮显示搜索框
			changesearchflg(data) {
				this.searchflg = !this.searchflg
				if (data == 'search') {
					this.getlist('refresh')
				}
			},
			//点击选择
			itemclick(data) {				
				uni.navigateTo({
					url: `/pages/business/confirmCompany?compantId=${data.id}`
				})
			},
			handleGetRegion(data) {
				console.log(data)
				this.orgcode = data[2].code
				let orgname = data[0].name
				if (data[1].name != '全省' && data[1].name != '全市' && data[1].name != '全区' && data[1].name != '全县') {
					orgname += `,${data[1].name}`
				}
				if (data[2].name != '全省' && data[2].name != '全市' && data[2].name != '全区' && data[2].name != '全县') {
					orgname += `,${data[2].name}`
				}
				this.orgname = orgname
			},
			tabclick(idx) {
				this.tab_idx = idx
				this.formid = this.tablist[idx].formid
				this.getlist('refresh')
				
				console.log('this.tab_idx',this.formid)
			},
			getlist(refresh) {
				if (refresh) {
					this.pageindex = 1
				}
				chooseCompany({address: null,type:this.formid}).then(res => {
					console.log(res)
					this.list = res?.data?.data?.records
				}
				)
			}
		}
	}
</script>

<style lang="less">
	page {
		background: #f5f5f5;
	}

	.chooseCompany {
		overflow-y: auto;

		.head {
			background: #f5f5f5;
			padding: 32rpx;
			position: fixed;
			top: 0;
			z-index: 99;
			width: 100%;
			left: 0;
			padding-bottom: 20rpx;

			.orgname {
				font-size: 30rpx;
				font-weight: bold;

			}

			.down-icon {
				margin-left: 10rpx;
				background: url('../../static/imgs/down.png') no-repeat;
				width: 30rpx;
				height: 30rpx;
				background-size: 100% 100%;
			}

			.search-icon {
				width: 34rpx;
				height: 34rpx;
				background: url('../../static/imgs/search.png') no-repeat;
				background-size: 100% 100%;
			}

			.search-input {
				border: 1px solid #3D71E7;
				border-radius: 40rpx;
				padding: 5rpx 32rpx;
				flex: 1;
				margin-right: 20rpx;
			}

			.tab-box {
				margin-top: 20rpx;
				justify-content: space-between;

				.tab-item {
					color: #999;
				}

				.tab-active {
					color: #3D71E7;
					font-weight: bold;
					position: relative;

					&::after {
						content: '';
						display: block;
						position: absolute;
						bottom: -10rpx;
						height: 2px;
						background: #3D71E7;
						width: 80%;
					}
				}
			}
		}

		.list {
			margin-top: 220rpx;
			
			
			

			.list-item {
				background: #fff;
				border-radius: 20rpx;
				padding: 32rpx 0;
				margin: 0 32rpx;
				margin-bottom: 20rpx;
				display: flex;

				.left {
					width: 200rpx;
					height: 200rpx;
					border-radius: 10rpx;
					border: 1px solid red;
				}
				.right{
					padding-left: 20rpx;
					
					.f1 {
						font-size: 32rpx;
						font-weight: bold;
					}
					
					.f2,
					.f4 {
						font-size: 24rpx;
						color: rgba(154, 154, 154, 1);
					}
				}
			}
		}
	}
</style>
