<template>
	<view class="content" >
		<button @click="commonAddCompany">注册用户加入单位</button>
		<button @click="addAuthPage">添加授权单位</button>
		
		<view class="banner" 
		>
				<!-- v-if="homedata.bannerinfo&&homedata.bannerinfo[0].value.length" -->
<!-- 			<swiper class="swiper" autoplay circular>
				<swiper-item v-for="(item,index) in homedata.bannerinfo[0].value" :key="index">
					<view class="swiper-item-imgbox">
						<image v-if="item.pic" style="width: 100%;height: 100%;" :src="item.pic" mode='aspectFill'>
						</image>
						home.jpg
					</view>
				</swiper-item>
			</swiper> -->
			<swiper class="swiper" autoplay circular>
				<swiper-item>
					<view class="swiper-item-imgbox">
						<image style="width: 100%;height: 100%;" src="/static/imgs/home.jpg" mode='aspectFill'>
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
					<image v-if="item.pic" :src="item.pic" />
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
					<image v-if="item.pic" :src="item.pic" />
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
					<image v-if="item.pic" :src="item.pic" />
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
		<view class="post-userBtn-box">
			  <uni-data-select
				:value="value"
				:localdata="tempRoleList"
				@change="postChange"
				:clear="false"
			  ></uni-data-select>
			<userButtonGroup></userButtonGroup>
			<businessButton></businessButton>
			<overViewButton></overViewButton>
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
		getPermisionBusiness,
		getCurrentUserButton,
		changePost,
		getUserPostList,
	} from '@/config/services.js'
	import {
		getLocation
	} from "@/utils/location.js"
	import homecard1 from '@/components/homecard/card1.vue'
	import homecard2 from '@/components/homecard/card2.vue'
	import homecard3 from '@/components/homecard/card3.vue'
	import homecard4 from '@/components/homecard/card4.vue'
	import progressbar from '@/components/cn-progressbar/cn-progressbar.vue'
	import userButtonGroup from '@/components/userButtonGroup'
	import businessButton from '@/components/businessButton/businessButton.vue'
	import overViewButton from '@/components/overViewButton/overViewButton.vue'
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
				value: 0,
				tabidx: 0,
				rolename: '',
				deptname: '',
				rolelist: [],
				curretPost: '',
				tempRoleList: [],
				currentPost: null, // 当前岗位
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
			homecard4,
			userButtonGroup,
			businessButton,
			overViewButton
		},
		methods: {
			commonAddCompany(){
				uni.navigateTo({
					url: '/pages/business/registerCompany'
				})
			},
			addAuthPage(){
				uni.navigateTo({
					url: '/pages/user/addauthorization'
				})
			},
			async init() {
				console.log('进入首页,开始刷新')
				getPermisionBusiness().then(res => {
					console.log('获取授权业务',res.data.data)
				})
				const userPageConfig = await getCurrentUserButton().then(res => { return res.data.data })
				uni.setStorageSync('userPageConfig',userPageConfig)
				// 每次进首页获取一次角色列表 -- 判断本地是否有缓存
				const roleList = uni.getStorageSync('postList')
				if(roleList) {
					const newRoleList = roleList.map(item => {return { value:item.postId, text:`${item.companyName} ${item.postName}`, postId: item.empPostObjectId, companyId: item.companyEntityId} })
					this.tempRoleList = newRoleList;
					console.log('newRoleList1',newRoleList,roleList)
				} else {
					getUserPostList().then(res => {
						uni.setStorageSync('postList',res.data.data.data)
						const newRoleList = res.data.data.data.map(item => {return { value:item.postId, text:`${item.companyName} ${item.postName}`, postId: item.empPostObjectId, companyId: item.companyEntityId} })
						console.log('newRoleList2',newRoleList,res.data.data.data)
						this.tempRoleList = newRoleList;
					})
				}
		
				// 获取当前本地存储的已选择岗位
				const currentPost = uni.getStorageSync('currentPost')
				const localRoleList = uni.getStorageSync('postList')
				if(currentPost) {
					// 如果有已经选择的岗位,遍历查看当前已选岗位是不是存在 postList 中
					const newCurrentPost = this.tempRoleList.filter(item => item.value == currentPost)
					if(newCurrentPost.length !== 0){
						console.log('当前有对应岗位',newCurrentPost,currentPost)
						this.value = currentPost
						console.log('当前选中岗位的公司',localRoleList.filter(it => it.postId == currentPost))
						const currentPostCompany = localRoleList.filter(it => it.postId == currentPost)
						changePost(currentPostCompany[0].empPostObjectId).then(res => console.log(res.data.data))
					} else {
						this.value = this.tempRoleList[0].value;
						changePost(this.tempRoleList[0].postId).then(res => console.log(res.data.data))
					}
				}
				else {
					console.log('本地没有岗位',this.tempRoleList)
					this.value = this.tempRoleList[0].value
					changePost(this.tempRoleList[0].postId).then((res)=> {
					})
					uni.setStorageSync('currentPost',this.tempRoleList[0].value)
					uni.setStorageSync('currentCompany',{
						companyName: localRoleList[0].companyName,
						companyId: localRoleList[0].companyEntityId,
						empObjectId: localRoleList[0].empObjectId,
						})
					console.log('this.tempRoleList',this.tempRoleList[0])
				}
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
			postChange(e){
				this.value = e
				uni.setStorageSync('currentPost',e)
				const currentPostList = uni.getStorageSync('postList').filter(item => item.postId == e)
				uni.setStorageSync('currentCompany',{
					companyName: currentPostList[0].companyName,
					companyId: currentPostList[0].companyEntityId,
					empObjectId: currentPostList[0].empObjectId,
					})
				changePost(currentPostList[0].empPostObjectId).then(res => console.log(res.data.data))
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
		min-height: 100vh;
		background-color: #F2F3F8;
	}
	.page-container {
		padding: 0 20rpx;
	}
	
	.post-userBtn-box {
		width: 100%;
		position: absolute;
		top: 260rpx;
		padding: 0 20rpx;
		margin-bottom: 50rpx;
	}

	.color-8 {
		color: rgba(#fff, 0.8);
	}

	.content {
		position: relative;
		.uni-select {
			border: 0;
			.uni-select__input-text {
				color: #fff;
				text-align: end;
			}
			.uni-icons {
				color: #fff !important;
			}
		}
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
