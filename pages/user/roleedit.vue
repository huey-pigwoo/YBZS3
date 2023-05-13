<template>
	<view class="roleedit container">
<!-- 		<view class="form-itemblock" style="margin-bottom: 20rpx;">
			<view class="block-title">
				单位信息
			</view>
			<view style="font-size: 26rpx;">
				{{unitinfo.deptname}}
			</view>
			<view style="margin: 20rpx 0 30rpx;" class="flex-between-center">
				<view style="color: #999;font-size: 20rpx;">
					{{unitinfo.address}}
				</view>
				<view style="color: #999;font-size: 20rpx;">
					{{unitinfo.tel||''}}
				</view>
			</view>
			<view class="block-title">
				身份
			</view>
			<view class="flex-align-center">
				<view class="">
					<checkbox-group>
						<block v-for="(item,index) in roleinfo" :key="index">
							<label @click="checkclick(index)" style="margin-right: 20rpx;">
								<checkbox style="transform:scale(0.6);margin-right: -10rpx;" value="cb"
									:checked="item.selectflg" color="#3d71e7" />{{item.name}}
							</label>
						</block>
					</checkbox-group>
				</view>
			</view>
		</view>
		<view v-if="flg!=0" class="form-itemblock">
			<view class="block-title">
				添加人信息
			</view>
			<view class="flex-align-center field-item">
				<view class="field-title">
					<text style="color: #FF0000;">*</text>姓名
				</view>
				<input class="field-input" v-model="name" style="flex: 1;" type="text" placeholder="请输入姓名">
			</view>
			<view class="flex-align-center field-item">
				<view class="field-title">
					<text style="color: #FF0000;">*</text>手机
				</view>
				<input v-model="tel" class="field-input" style="flex: 1;" type="text" placeholder="请输入添加人手机号">
			</view>
		</view>
		<view v-if="flg == 2" class="form-itemblock">
			<view class="block-title">
				审核意见
			</view>
			<view class="">
				<textarea v-model="checkmark" placeholder="请输入..." class="textarea"></textarea>
			</view>
		</view> -->

		<view class="card-post">
			<view class="list-item">
					<view class="left">
						<image :src="cardData.pic" mode="" ></image>
						<!-- <image src="/static/imgs/title-icon.png" mode="" ></image> -->
					</view>
					<view class="right">
						<view class="f1">{{cardData.f1}}</view>
						<view class="f2">{{cardData.f2}}</view>
						<Tag
							v-for="(it) in cardData.f3" 
							status="NORMAL" 
							:key="it.key"
							:value="it.value" 
						/>
						<view class="personTag" v-if="cardData.f3.length>0">
							{{cardData.f3[0].value}}
						</view>
						<view class="f4-group">
							<view class="f4">{{cardData.f4[0].value}}</view>
							<view class="f4">{{cardData.f4[1].value}}</view>
						</view>
					</view>
			</view>
			<view class="post-checkbox">
				<view class="checkbox-label" style="white-space: nowrap;padding-right: 5rpx;font-size: 12px;">岗位：</view>
				<uni-data-checkbox multiple v-model="choosePostList" :localdata="postList"></uni-data-checkbox>
			</view>
		</view>

		<uni-forms ref="dynamicForm" :rules="dynamicRules">
			<uni-section title="添加人信息" type="line" v-for="(item,index) in personList">
				<uni-forms-item  :key="item.id" label="姓名">
					<view class="form-item">
						<uni-easyinput
						 :disabled="inputDisabled"
						  :trim="all"
						  v-model="personList[index].name" placeholder="请输入姓名" />
					</view>
				</uni-forms-item>
				<uni-forms-item  :key="item.id" label="电话">
					<view class="form-item">
						<uni-easyinput :disabled="inputDisabled" v-model="personList[index].phone" placeholder="请输入号码" />
					</view>
				</uni-forms-item>
			</uni-section>
		</uni-forms>
		<text @click="addPerson" v-if="addPersonButton" style="color: #3d71e7; margin-top: 10px;">点击继续添加人员</text>
		<view class="foot flex">
			<view @click="cancel" class="cancel-btn">
				{{cancelname}}
			</view>
			<view @click="save(0)" class="confirm-btn">
				{{confirmname}}
			</view>
		</view>
		<button @click="checkDelPost">查看表单</button>
	</view>
</template>

<script>
	import {
		checkMobile
	} from '@/utils/util.js'
	import { 
		getCompanyAndPersonInfo, 
		getPersonCenter,
		editPersonPost, // 个人中心修改信息
		getUserPostList,	
		editPerson,	// 编辑人员
		delPerson,	// 删除
		checkPersonReject, // 审核拒绝
		checkPersonPass,	// 审核通过
		addCompanyCardInfo,
		addPerson
	} from '@/config/services.js'
	export default {
		data() {
			return {
				roleid: '',
				flg: "",
				roleinfo: [],
				unitinfo: '',
				tel: '',
				name: '',
				checkflg: '',
				checkmark: '',
				initrole: [],
				cancelname: '',
				confirmname: '',
				choosePostList: [],
				postList: [{text: '管理员',value: 1},{text: '技术负责人',value: 3},{text: '法人代表',value: 2},{text: '成员',value: 4}],
				personList: [{id: Date.now(), name: null,phone: null}],
				cardData: {},
				userId: '',
				companyId: '',
				delPost: [],
				type: null,
				addPersonButton: false,
				inputDisabled: false
			}
		},
		onLoad(props) {
			if (props.roleid) {
				this.roleid = props.roleid
			}
			if (props.name) {
				this.name = decodeURIComponent(props.name)
			}
			if (props.tel) {
				this.tel = decodeURIComponent(props.tel)
			}
			if(props.companyId) {
				this.companyId = props.companyId
			}
			if(props.type) {
				this.type = props.type
			if(props.type == 'add'){
				uni.setNavigationBarTitle({
					title: '添加人员'
				})
				this.cancelname = '清空'
				this.confirmname = '确认'
				this.userId = props.userId
				this.addPersonButton = true
				this.inputDisabled = false
				addCompanyCardInfo(props.companyId).then(res => {
					console.log('添加人员单位卡片信息',res.data.data.companyVO.records[0])
					this.cardData = res.data.data.companyVO.records[0]
				})
			}
			if(props.type == 'post' || props.type == 'comfirm') {
				uni.setNavigationBarTitle({
					title: '人员编辑'
				})
				this.cancelname = '删除'
				this.confirmname = '确认'
				this.inputDisabled = true
				this.userId = props.userId
				getCompanyAndPersonInfo(props.companyId,props.userId,'common').then(res => {
					console.log('getCompanyAndPersonInfo','common')
					this.choosePostList = res.data.data.havePostIdList.map(item => Number(item))
					this.delPost = res.data.data.havePostIdList.map(item => Number(item))
					this.cardData = res.data.data.companyAndPositionVO.companyVO.records[0]
					this.personList = [{id: Date.now(),name: res.data.data.username,phone: res.data.data.phone}]
					console.log('发送请求',this.cardData)
				})
			}
			if(props.type == 'check') {
				uni.setNavigationBarTitle({
					title: '审核人员'
				})
				this.cancelname = '拒绝'
				this.confirmname = '审核通过'
				this.inputDisabled = true
				this.userId = props.userId
				getCompanyAndPersonInfo(props.companyId,props.userId,'audit').then(res => {
					console.log('getCompanyAndPersonInfo','audit')
					this.choosePostList = res.data.data.havePostIdList.map(item => Number(item))
					this.cardData = res.data.data.companyAndPositionVO.companyVO.records[0]
					this.personList = [{id: Date.now(),name: res.data.data.username,phone: res.data.data.phone}]
					console.log('发送请求',this.cardData)
				})
			}
			} 
			// if (props.flg) {
			// 	this.flg = props.flg
			// }
			// if (props.flg == 1) {
			// 	uni.setNavigationBarTitle({
			// 		title: '添加人员'
			// 	})
			// 	this.cancelname = '放弃'
			// 	this.confirmname = '确认添加'
			// } else if (props.flg == 2) {
			// 	uni.setNavigationBarTitle({
			// 		title: '人员审核'
			// 	})
			// 	this.cancelname = '拒绝'
			// 	this.confirmname = '通过'
			// } else if (props.flg == 3) {
			// 	uni.setNavigationBarTitle({
			// 		title: '人员编辑'
			// 	})
			// 	this.cancelname = '取消'
			// 	this.confirmname = '确认调动'
			// } else {
			// 	uni.setNavigationBarTitle({
			// 		title: '人员编辑'
			// 	})
			// 	this.tel = uni.getStorageSync('tel')
			// 	this.name = uni.getStorageSync('name')
			// 	this.cancelname = '取消'
			// 	this.confirmname = '确认'
			// }

			// getPersonDeptRole({
			// 	flg: this.flg || 0,
			// 	roleid: this.roleid || ""
			// }).then(res => {
			// 	if (res.data.code == 0) {
			// 		let initrole = []
			// 		this.roleinfo = res.data.data.roleinfo
			// 		this.unitinfo = res.data.data.unit
			// 		res.data.data.roleinfo.map(item => {
			// 			if (item.selectflg) {
			// 				initrole.push(item.id)
			// 			}
			// 		})
			// 		this.initrole = initrole
			// 	}
			// })
		},
		methods: {
			clear(){
				this.choosePostList = []
				this.personList = [{id: Date.now(), name: null,phone: null}]
			},
			checkclick(idx) {
				this.roleinfo[idx].selectflg = !this.roleinfo[idx].selectflg
			},
			checkDelPost(){
				console.log({
					companyId: this.companyId,
					postList: this.choosePostList, 
					personList: this.personList.map(item => { return { userName: item.name, phone: item.phone }})
				})
			},
			addPerson(){
				this.personList.push({id: Date.now(),label: '姓名', name: null,phone: null})
			},
			checkForm(){console.log(this.personList)},
			save(checkflg) {
				let selectedrole = []
				this.roleinfo.map(item => {
					if (item.selectflg) {
						selectedrole.push(item.id)
					}
				})
				if (!selectedrole[0] && this.flg == 1) {
					uni.showToast({
						title: '请选择身份',
						icon: 'none'
					})
					return
				}
				if (!this.name && this.flg != 0) {
					uni.showToast({
						title: '姓名不能为空',
						icon: 'none'
					})
					return
				}
				if (!this.tel && this.flg != 0) {
					uni.showToast({
						title: '手机号不能为空',
						icon: 'none'
					})
					return
				}
				if (this.tel && !checkMobile(this.tel)) {
					uni.showToast({
						title: '请输入正确的手机号',
						icon: 'none'
					})
					return
				}
				let params = {
					flg: this.flg,
					deptid: this.deptid,
					selectedrole,
					initrole: this.initrole
				}
				if (checkflg || checkflg == 0) {
					params.checkflg = checkflg
					params.checkmark = this.checkmark
				}
				if (this.flg != 0) {
					params.tel = this.tel
					params.name = this.name
				}
				if(this.type == 'add') {
					console.log('这里是添加人员')
					// "companyObjectId":data.companyId,
					// "postList": data.postList,
					// "userBasicInfoParamList": data.personList
					addPerson({
						companyId: this.companyId,
						postList: this.choosePostList, 
						personList: this.personList.map(item => { return { userName: item.name, phone: item.phone }})
					}).then(res => {
							setTimeout(() => {
								uni.showToast({
									title: '添加成功'
								})
							}, 10)
							setTimeout(() => {
								uni.navigateBack()
							}, 1000)
						})
				}
				if(this.type == 'comfirm') {
					console.log('这里是编辑人员')
					editPerson(this.userId,this.choosePostList).then(
						res => {
							if (res.data.code == 0) {
								setTimeout(() => {
									uni.showToast({
										title: '保存成功'
									})
								}, 10)
								setTimeout(() => {
									uni.navigateBack()
								}, 1000)
							}
						}
					)
					.then(() => {
						getUserPostList().then(
						res => {
							console.log('更新postlist')
							uni.setStorageSync('postList',res.data.data.data)
							}
						)
					})
				}
				if(this.type == 'check') {
					console.log('这里是审核人员')
					const auditorId = uni.getStorageSync('currentCompany').empObjectId
					checkPersonPass(this.userId,auditorId,this.choosePostList).then(
						res => {
							if (res.data.code == 0) {
								setTimeout(() => {
									uni.showToast({
										title: '审核成功'
									})
								}, 10)
								setTimeout(() => {
									uni.navigateBack()
								}, 1000)
							}
						}
					)
					.then(() => {
						getUserPostList().then(
						res => {
							console.log('更新postlist')
							uni.setStorageSync('postList',res.data.data.data)
							}
						)
					})
				}
				if(this.type == 'post') {
					console.log('这里是个人中心身份编辑')
					editPersonPost(this.userId,this.choosePostList).then(
						res => {
							if (res.data.code == 0) {
								setTimeout(() => {
									uni.showToast({
										title: '保存成功'
									})
								}, 10)
								setTimeout(() => {
									uni.navigateBack()
								}, 1000)
							}
						}
					)
					.then(() => {
						getUserPostList().then(
						res => {
							console.log('更新postlist')
							uni.setStorageSync('postList',res.data.data.data)
							}
						)
					})
				}
			},
			cancel() {
				if (this.flg == 2) {
				} 
				else if (this.type == 'comfirm') {
					this.delPost = this.delPost.filter( it => !this.choosePostList.includes(it))
					delPerson(this.userId,this.delPost)
					  .then(res => {
						  	if (res.data.code == 0) {
						  		setTimeout(() => {
						  			uni.showToast({
						  				title: '删除成功'
						  			})
						  		}, 10)
						  		setTimeout(() => {
						  			uni.navigateBack()
						  		}, 1000)
						  	}
					  }).then(() => {
						getUserPostList().then(
						res => {
							console.log('更新postlist')
							uni.setStorageSync('postList',res.data.data.data)
							}
						)
					})
					console.log('删除')
				} 
				else if (this.type == 'add'){
					this.clear()
					console.log('清空')
				} else {
					// uni.navigateBack()
				}
			}
		}
	}
</script>

<style lang="less">
	page {
		background: #f5f5f5;
	}

	.roleedit {
		.uni-section {
			margin: 20rpx 0;
		}
		
		.uni-forms-item {
			margin-bottom: 10rpx;
		}
		
		.card-post {
			background: #fff;
			padding: 20rpx;
			border-radius: 20rpx;
			.post-checkbox {
				display: flex;
				.checklist-box {
					margin: 5rpx 10rpx;
					.checklist-content {
						.checklist-text {
							font-size: 12px;
						}
					}
				}
			}
		}
		.field-item {
			margin-bottom: 20rpx;
		}

		.field-title {
			font-size: 26rpx;
			margin-right: 10rpx;
		}

		.textarea {
			background: rgba(#000000, 0.04);
			padding: 20rpx;
			height: 200rpx;
		}
		.uni-section {
			border-radius: 20rpx;
			
			.uni-section-content {
				padding: 0 35rpx 20rpx;
			}
		}
		
		.foot {
				left: 0;
			    position: fixed;
			    bottom: 0;
			    width: 100%;
			    padding: 30rpx 0 30rpx;
			    z-index: 999;
				background-color: #fff;
		}
		
		.list-item {
			background: #fff;
			border-radius: 20rpx;
			margin-bottom: 20rpx;
			display: flex;
			
			.personTag {
				display: inline-block;
				box-sizing: border-box;
				border-radius: 4px;
				text-align: center;
				margin-right: 10rpx;
				padding: 2rpx 10rpx;
				font-size: 12px;
				white-space: nowrap;
				border: 1px solid rgba(154, 154, 154, 1);
				color: rgba(154, 154, 154, 1);
			}
		
		.left {
			width: 200rpx;
			height: 200rpx;
			border-radius: 10rpx;
		}
		.right{
			width: 100%;
			overflow: auto;
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
</style>
