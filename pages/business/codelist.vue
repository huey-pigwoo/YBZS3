<template>
	<view class="content codelist">
		<view class="head flex">
			<view class="input-box flex-between-center">
				<view class="flex-align-center" style="flex: 1;">
					<view class="search-icon">
					</view>
					<input @input="getSearchList('refresh')" style="flex: 1;background: #fff;" v-model="searchvalue"
						type="text" placeholder="请输入关键词">
				</view>
			</view>
		</view>
	
		<view v-if="!simpleflg" class="list">
			<pureList v-if="!addAnimal" :listData="selectAnimalList" :type="pageType" :status="status"></pureList>
			<pureList @click="getSelectAnimal" @getCardData="getSelectAnimal" v-else :listData="selectAnimalList" status="addAnimal"></pureList>
		</view>
		<view v-else class="list">
			<view @click="itemclick(item)" v-for="(item,index) in queryList" :key="item.objectId" class="list_item_simple">
				{{item.animalName}}
			</view>
		</view>
		<bottomline v-if="showBtLine && datalist.length > 4"></bottomline>
	</view>
</template>

<script>
	import bottomline from '@/components/bottomline';
	import pureList from "@/components/pureList/pureList.vue"
	import {
		getCodeTableByFormAndField
	} from '@/config/api.js';
	import request from '@/config/https.js'
	import {
		getQueryVariable
	} from '@/utils/util.js'
	import card1 from '@/components/listcard/card1.vue'
	import {
		mapState
	} from "vuex"
	import {
		queryAnimalList,
		selectAnimal
	} from "@/config/businessRegister.js"
	export default {
		data() {
			return {
				screenvisible: false,
				datalist: [],
				showBtLine: false,
				pageindex: 1,
				pagesize: 20,
				api: '',
				searchvalue: '',
				btnlist: [],
				searchActive: false,
				formid: '',
				radioflg: false,
				yewuid: '',
				field: '',
				formid: '',
				sqlwhere: '',
				backflg: false,
				simpleflg: false,
				addAnimal: false,
				
				pageType: '',
				status: '',
				queryList: [],
				selectAnimalList: [],
				
				
			};
		},
		components: {
			bottomline,
			card1,
			pureList,
			
		},
		computed: {
			...mapState(['menu'])
		},
		onLoad(props) {
			console.log('选择动物',props)
			this.yewuid = props.yewuid
			if(props.pageType){
				console.log('现在是由那个页面进来的',props.pageType )
				this.pageType = props.pageType
			}
			if(props.status){
				console.log('现在是是不是选择动物',props.status )
				this.status = props.status
			}
			if (props.simpleflg) {
				this.simpleflg = true
			}
			if (props.relationid) {
				this.sqlwhere = `t.relationid not in (${props.relationid})`
			}
			if (props.addAnimal) {
				this.addAnimal = true
			}
			if (props.backflg) {
				this.backflg = true
			}
			this.menu.map((item) => {
				if (item.id == props.yewuid) {
					this.field = item.field
					this.formid = item.formid
				}
			})
			if (props.field) {
				this.field = props.field
			}
			
		},
		onShow() {
			this.getlist("refresh")
		},
		//触底加载
		onReachBottom() {
			if (this.showBtLine) return;
			this.pageindex++;
			this.getlist();
		},
		//下拉刷新
		async onPullDownRefresh() {
			await this.getlist('pulldown');
			uni.stopPullDownRefresh();
		},
		methods: {
			//点击查询按钮，显示查询框
			opensearch() {
				this.searchActive = !this.searchActive
			},
			getSelectAnimal(data){
				let eventChannel = this.getOpenerEventChannel()
				eventChannel.emit('getchoose', data)
			},
			//点击确定模糊查询
			searchconfirm() {
				this.getlist('refresh')
			},
			getlist(refresh) {
				if (refresh) {
					this.pageindex = refresh ? 1 : this.pageindex
				}
				selectAnimal(this.pageindex,{
				   key:"registrationStatus",
				   operator: "EQ",
				   values: ["AUDIT_PASS"]
				}).then(res => {
					console.log(res.data.data.records)
					this.selectAnimalList = res.data.data.records
				})				
			},
			getSearchList(refresh){
				if (refresh) {
					this.pageindex = refresh ? 1 : this.pageindex
				}
				queryAnimalList(this.searchvalue).then(res => {
					if(res.data.data.records.length > 0) {
						this.queryList = res.data.data.records
					}
				})
			},
			itemclick(data) {
				
				if (this.backflg) {
					let eventChannel = this.getOpenerEventChannel()
					eventChannel.emit('getchoose', data)
					uni.navigateBack()
				} else {
					let url = ''
					this.menu.map((item) => {
						if (item.id == this.yewuid) {
							url = item.pageurl
						}
					})
					uni.navigateTo({
						url: `${url}?selectdata=${encodeURIComponent(JSON.stringify(data))}`
					})
				}
				
		// -------- S ----------------------------------------
		
		
				
				
				
		// -------- E ----------------------------------------
			}
		}
	};
</script>

<style lang="less">
	page {
		background: #f5f5f5;
	}

	.codelist {
		position: relative;
		overflow-y: auto;

		.sub-text {
			color: #999;
			font-size: 22rpx;
			margin-top: 10rpx;
		}

		.head {
			position: fixed;
			padding: 20rpx;
			width: 100%;
			height: 100rpx;
			top: 0;
			z-index: 9;
			background: #f5f5f5;

			.tab-box {
				max-width: 50%;

				.tab-item {
					margin-right: 40rpx;
					color: #999;
				}

				.tab-active {
					color: #009688;
					font-weight: bold;
					position: relative;

					&::after {
						content: '';
						display: block;
						position: absolute;
						bottom: -10rpx;
						height: 2px;
						background: #009688;
						width: 80%;
					}
				}
			}

			.input-box {
				width: 100%;
				padding: 20rpx;
				background: #fff;
				border-radius: 40rpx;
				border: 1px solid #3D71E7;

				.search-icon {
					background: url('/static/imgs/search.png') no-repeat;
					background-size: 100% 100%;
					width: 30rpx;
					height: 30rpx;
					margin-right: 10rpx;
				}

				.searchconfirm {
					color: #009688;
					margin-right: 20rpx;
				}

				.searchcancel {
					color: #999;
				}
			}

			.control-box {
				flex-shrink: 0;
				flex: 1;

				.control-item {
					position: relative;
					color: #009688;
					margin-right: 80rpx;
				}

				.control-item:last-child {
					margin: 0;
				}

				.control-item1 {
					&::before {
						content: '';
						display: block;
						width: 30rpx;
						height: 30rpx;
						background: url('@/static/imgs/screen.png');
						background-size: 100% 100%;
						left: -40rpx;
						position: absolute;
						top: 8rpx;
					}
				}

				.control-item2 {
					&::before {
						content: '';
						display: block;
						width: 30rpx;
						height: 30rpx;
						background: url('@/static/imgs/search.png');
						background-size: 100% 100%;
						left: -40rpx;
						position: absolute;
						top: 8rpx;
					}
				}
			}
		}

		.list {
			margin-top: 100rpx;

			.list_item_simple {
				padding: 30rpx;
				background: #fff;
				border-bottom: 1px solid #eee;

				&:last-child {
					border-bottom: none;
				}
			}

			.list_item {
				margin: 0 30rpx;
				background: #fff;
				margin-bottom: 30rpx;
				padding: 30rpx;
				border-radius: 20rpx;
			}

			.animalcard-img {
				width: 140rpx;
				height: 140rpx;
				flex-shrink: 0;
				border-radius: 20rpx;
				overflow: hidden;
				margin-right: 20rpx;
			}

			.animalcard-name {
				font-size: 32rpx;
				width: 200rpx;
				font-weight: bold;
				text-overflow: ellipsis;
				overflow: hidden;
				white-space: nowrap;
			}

			.animalcard-type {
				background: #E1EAFF;
				padding: 5rpx 20rpx;
				font-size: 22rpx;
				border-radius: 10rpx;
				border: 1px solid #3D71E7;
				margin-left: 20rpx;
				color: #3D71E7;
			}
		}

		.foot {
			position: fixed;
			height: 160rpx;
			width: 100%;
			z-index: 99;
			left: 0;
			bottom: 0;

			.btn-item {
				flex: 1;
				height: 80rpx;
				line-height: 80rpx;
				color: #fff;
				background: #009688;
				border-radius: 40rpx;
				text-align: center;
				margin: 0 40rpx;
			}
		}
	}
</style>
