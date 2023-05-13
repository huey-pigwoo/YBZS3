<template>
	<view class="rolemanage container">
		<view class="head">
			<view class="filter-container">
				<view class="" style="color: #999;">
					{{deptname}}
					{{companyList.companyName || ''}}
				</view>
				<uni-data-select
					  style="width:120rpx"
				      :value="value"
				      :localdata="statusRange"
				      @change="change"
					  :clear="false"
				    ></uni-data-select>
			</view>
			
			<view @click="addclick" class="" style="color: #3d71e7;margin-top: 20rpx;">
				点击继续添加人员
			</view>
		</view>
		<view v-if="datalist.length" class="list">
			<view v-for="(item,index) in datalist" :key="index" style="margin-bottom: 20rpx;">
				<cardmanage @click='itemclick(item)' :data='item'></cardmanage>
			</view>
		</view>
		<view class="list" v-if="personList.length">
			<view @click="listItemclick(item)" v-for="(item,index) in personList" :key="index" class="list-item">
				<view class="left">
					<image :src="item.pic" mode="" ></image>
					<!-- <image src="/static/imgs/title-icon.png" mode="" ></image> -->
				</view>
				<view class="right">
					<view class="f1">{{item.f1.employeeName}}</view>
					<view class="f2">{{item.f2}}</view>
					<view class="f3">
						<Tag
							v-for="(it) in item.f3" 
							:key="it.key"
							:status="it.key" 
							:value="it.value" 
						/>
					</view>
					<view class="f4-group">
						<view class="f4">{{item.f4[0].value.companyName}}</view>
						<view class="f4">{{item.f4[0].value.businessNodeList[0].name}}</view>
					</view>
				</view>
			</view>
		</view>
		<bottomline v-if="showBtLine && datalist.length > 4"></bottomline>
	</view>
</template>

<script>
	import {
		getpersonManage
	} from '@/config/api.js'
	import {
		getBusinessPerson,	
		getEmployeeList
	} from '@/config/services.js'
	import Tag from '@/components/Tag.vue'
	import cardmanage from '@/components/listcard/card_manage.vue'
	import bottomline from '@/components/bottomline';
	export default {
		data() {
			return {
				datalist: [],
				pageindex: 1,
				pagesize: 10,
				showBtLine: false,
				value: 0,
				deptname: uni.getStorageSync('deptname') || '',
				statusRange: [{value: 0,text: '全部'},{value: 1,text: '待审核'},{value: 2,text: '在职'},{value: 3,text: '离职'},{value: 4,text: '已拒绝'}],
				personList: [],
				companyList: []
			}
		},
		onLoad(props) {
			
		},
		onShow() {
			this.getlist('refresh')
			this.companyList = uni.getStorageSync('currentCompany')
		},
		components: {
			cardmanage,
			bottomline,
			Tag
		},
		//触底加载
		onReachBottom() {
			if (this.showBtLine) return;
			this.pageindex++;
			this.getlist();
		},
		methods: {
			addclick() {
				const _self = this
				uni.navigateTo({
					url: `/pages/user/roleedit?type=add&companyId=${this.companyList.companyId}`,
					events: {
						refresh() {
							_self.getlist('refresh')
						}
					}
				})
			},
			itemclick(data) {
				const _self = this
				let flg = 3
				if (data.stateid == 2) {
					flg = 2
				}
				uni.navigateTo({
					url: `/pages/user/roleedit?flg=${flg}&roleid=${data.roleid}&stateid=${data.stateid}&name=${encodeURIComponent(data.f1)}&tel=${encodeURIComponent(data.f2)}`,
					events: {
						refresh() {
							_self.getlist('refresh')
						}
					}
				})
			},
			listItemclick(listItem){
				uni.navigateTo({
					url: `/pages/user/roleedit?type=${listItem.f1.statusEnum == 'ACTIVE' ? 'comfirm': 'check'}&userId=${listItem.id}&companyId=${this.companyList.companyId}`,
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
				getpersonManage({
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
				getEmployeeList().then(res => {
					if(res.data.code== 15) {
						console.log('无权限')
						setTimeout(()=> {
							uni.reLaunch({url: '/pages/home/index'}) 
						},500)
					}
					this.personList = res.data.data.records
				})
			}
		}
	}
</script>

<style lang="less">
	page {
		background: #f5f5f5;
	}
	
	.filter-container {
		display: flex;
		justify-content: space-between;
		
		.uni-select {
			height: 40rpx;
		}
	}

	.rolemanage {
		.head {
			position: fixed;
			top: 0;
			left: 0;
			width: 100%;
			padding: 20rpx;
			z-index: 99;
			background: #f5f5f5;
		}

		.list {
			margin-top: 120rpx;
		}
	}
	.list-item {
		display: flex;
		background: #fff;
		border-radius: 20rpx;
		padding: 32rpx 32rpx;
		margin-bottom: 20rpx;
		display: flex;
		justify-content: flex-start;
	
		.left {
			
			image {
				width: 200rpx;
				height: 200rpx;
				border-radius: 20rpx;
			}
		}
		.right{
			padding-left: 20rpx;
			.f1 {
				font-size: 32rpx;
				font-weight: bold;
			}
			.f3 {
				display: flex;
				overflow: auto;
			}
			.f2,
			.f4 {
				font-size: 24rpx;
				color: rgba(154, 154, 154, 1);
			}
		}
	}
</style>
