<template>
	<view class="introduction container">
		<view class="form-itemblock">
			<view class="block-title">
				现场影像
			</view>
			<view style="position: relative;width: 100%;">
				<makemedia @deleteimg='deleteimg()' @swiperclick='swiperclick()' :imgidx='imgidx' @getchoose="getimg"
					:imglist='imglist'>
				</makemedia>
			</view>
		</view>
		<view class="form-itemblock">
			<view class="block-title">
				引进单位
			</view>
			<view style="margin-bottom: 20rpx;" class="flex-align-center">
				<view class="">
					文号
				</view>
				<input placeholder="请填写批准文号" style="flex: 1;" class="field-input" v-model="documentNo" type="text">
			</view>
			<view style="margin-bottom: 20rpx;" class="flex-align-center">
				<view class="">
					单位
				</view>
				<input placeholder="请填写对方单位名称" style="flex: 1;" class="field-input" v-model="companyName" type="text">
			</view>
		</view>
		
		<view class="" v-for="(item,index) in formattedInfoList" :key="index">
			<view class="form-itemblock">
				<view class="block-title">
					引进动物
				</view>
				<view class="flex-align-center">
					<text>名称</text>
					<input disabled @click="chooseanimal(index)" placeholder="请选择动物" class="field-input"
						style="flex: 1;" type="text" v-model="item.animalName">
				</view>
				<view style="margin-top: 20rpx;" class="flex-align-center">
					<text>数量</text>
					<input style="width: 140rpx;" class="num-input" type="number"
						v-model="item.registrationInfo.introductionNum"
						placeholder="输入数量">
				</view>
				<view @click="showtips(index)" class="tips">
					{{`请输入备注信息 >`}}
				</view>
				<view v-if="item.noteStatus" class="textarea-box">
					<textarea class="textarea" v-model="item.note"></textarea>
				</view>
			</view>
		</view>

		<view class="flex-align-center moreadd-box">
			<view class="">
				还有其他动物吗？
			</view>
			<view v-if="!audit" @click="addanimal" class="msgbtn">
				添加动物
			</view>
		</view>
		<view v-if="audit" class="foot flex">
			<view @click="cancel" class="cancel-btn">
				拒绝
			</view>
			<view @click="save" class="confirm-btn">
				审核通过
			</view>
		</view>
		<view v-else class="foot flex">
			<view @click="cancel" class="cancel-btn">
				取消
			</view>
			<view @click="save" class="confirm-btn">
				确认
			</view>
		</view>
	</view>
</template>

<script>
	import makemedia from '@/components/makemedia/index.vue'
	import {
		getLocation
	} from '@/utils/location.js'

	import {
		sendIntroductionForm,
		getRegistrationDetail,
		auditBusiness
	} from "@/config/businessRegister.js"
	import {
		isNumber,
	} from "@/utils/rules.js"
	export default {
		data() {
			return {
				formid: '167013671300484',
				imgidx: 0,
				imglist: [],
				relationid: '',
				fanyudanwei_name: '',
				fanyudanwei_code: '',
				name: '',
				wenhao: '',
				phone: '',
				danwei: '',
				datalist: [{
					animalinfo: {
						name: '',
						code: ""
					},
					shuliang: '',
					tips: '',
					tipsflg: false
				}],
				delta: 1,
				onetimeid: '',
		// -- S ---------------------------------------------------------------
				audit: false,
				registrationId: '',
				materialIdList: [], // 媒体文件
				documentNoId: '', // 文号id
				documentNo: '', // 文号编号
				companyName: '', // 对方单位名称
				targetCompanyName: '', // 对方单位名称，例如 移交、归还、接收  业务登记不需要文号, 只要对方单位名称

				formattedInfoList: [{
					objectId: '',
					animalName: '',
					targetId: '', // 描述对象id 	(业务动物id、动物objectId)
					note: '', // 备注
					noteStatus: false,
					registrationInfo: {
						introductionNum: '', // 引种数量
					}
				}],
		// -- E -----------------------------------------------------------------
			};
		},
		onLoad(props) {
			if(props.businessId || props.business) {
				console.log('查看详情',props.businessId)
				getRegistrationDetail(props.businessId).then(res => {
					console.log('业务登记详情',res.data.data)
					const result = res.data.data
					const sendCompanyName = result.documentSymbol.companyInfoList.filter(item => item.companyTypeInDocumentNo === 'SEND_OUT_COMPANY')
					console.log('result.target.targetInfo',result.target.targetInfo)
					this.materialIdList = result.materialList.map(item => item.materialId)
					this.imglist = result.materialList.map(item => item.realUrl)
					this.documentNoId = result.documentSymbol.documentNoId
					this.documentNo = result.documentSymbol.documentNo
					if(sendCompanyName.length>0) this.companyName = sendCompanyName[0]?.companyName
					this.formattedInfoList[0].objectId = result.objectId
					if(result.target.targetInfo) {
						this.formattedInfoList[0].animalName = result.target.targetInfo.animalName
						this.formattedInfoList[0].targetId = result.target.targetInfo.objectId
					}
					this.formattedInfoList[0].note = result.note
					this.formattedInfoList[0].registrationInfo.introductionNum = result.registrationInfo.introductionNum
					// this.registrationId = result.note
				})
			}
			if(props.audit){
				console.log()
				this.audit = props.audit
			}
			if (props.relationid) {
				this.relationid = props.relationid
				this.delta = 2
			}
			if (props.onetimeid) {
				this.onetimeid = props.onetimeid
				this.getdetail()
			}
			this.getfield()
		},
		onShow(props) {
			getLocation()
			console.log('onShow中',props)
		},
		components: {
			makemedia
		},
		methods: {
			//获取上传的图片
			getimg(data) {
				this.imglist = this.imglist.concat(data)
				this.materialIdList = this.imglist.map(item => item.materialId)
			},
			//删除表单
			deleteclick() {},
			//获取编辑表单的内容
			getdetail() {
				
			},
			showtips(idx) {
				this.formattedInfoList[idx].noteStatus = !this.formattedInfoList[idx].noteStatus
				console.log(idx)
			},
			//添加动物
			addanimal() {
				this.formattedInfoList.push({
					animalName: '',
					targetId: '', 
					note: '', 
					noteStatus: false,
					registrationInfo: {
						introductionNum: '', 
					}
				})
			},
			//获取繁育单位
			getfield() {},
			//选择动物
			chooseanimal(idx) {
				const _self = this
				console.log(idx)
				uni.navigateTo({
					url: "/pages/business/codelist?simpleflg=true&backflg=true",
					events: {
						getchoose(data) {
							console.log('获取到的动物',data)
							_self.formattedInfoList[idx].animalName = data.animalName
							_self.formattedInfoList[idx].targetId = data.objectId
						}
					}
				})
			},
			//取消
			cancel() {
				if(this.audit) {
					auditBusiness(this.formattedInfoList[0].objectId,[],false).then(res => {
						if (res.data.code == 0) {
							uni.showToast({
								title: '保存成功'
							})
							setTimeout(() => {
								uni.navigateBack({
									delta: this.delta
								})
							}, 1500)
						}
					})
				} else {
					uni.navigateBack()
				}
			
			},
			//确认
			save() {
				if(!this.materialIdList.length) {
					uni.showToast({
						title: "请上传照片",
					 	icon: 'none'
					})
					return
				}
				const params = {
					unformattedInfo: {
						materialIdList: this.materialIdList,
						documentNoInfo: {
							documentNo: this.documentNo,
							companyName: this.companyName,
						}
					},
					formattedInfoList: this.formattedInfoList
				}
				if(this.audit){
					auditBusiness(this.formattedInfoList[0].objectId,[],true).then(res => {
						if (res.data.code == 0) {
							uni.showToast({
								title: '保存成功'
							})
							setTimeout(() => {
								uni.navigateBack({
									delta: this.delta
								})
							}, 1500)
						}
					})
				} else {
					sendIntroductionForm(params).then(res => {
						if (res.data.code == 0) {
							uni.showToast({
								title: '保存成功'
							})
							setTimeout(() => {
								uni.navigateBack({
									delta: this.delta
								})
							}, 1500)
						}
					})
					console.log(params)
				}
			},
			//删除图片
			deleteimg(imgidx) {
				this.imglist.splice(imgidx, 1)
			},
		}
	};
</script>

<style lang="less">
	page {
		background: #f5f5f5;
	}

	.introduction {
		.field-input {
			border: 1px solid #eee;
			margin-left: 20rpx;
			padding: 5rpx 10rpx;
		}
	}
</style>
