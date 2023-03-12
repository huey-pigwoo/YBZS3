<template>
	<view class="rolemanage container">
		<view class="head">
			<view class="" style="color: #999;">
				{{deptname}}
			</view>
			<view @click="addclick" class="" style="color: #3d71e7;margin-top: 20rpx;">
				点击添加
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
		getpersonManage
	} from '@/config/api.js'
	import cardmanage from '@/components/listcard/card_manage.vue'
	import bottomline from '@/components/bottomline';
	export default {
		data() {
			return {
				datalist: [],
				pageindex: 1,
				pagesize: 10,
				showBtLine: false,
				deptname: uni.getStorageSync('deptname') || ''
			}
		},
		onLoad(props) {},
		onShow() {
			this.getlist('refresh')
		},
		components: {
			cardmanage,
			bottomline
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
					url: `/pages/user/roleedit?flg=1`,
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
			}
		}
	}
</script>

<style lang="less">
	page {
		background: #f5f5f5;
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
			margin-top: 120rpx
		}
	}
</style>
