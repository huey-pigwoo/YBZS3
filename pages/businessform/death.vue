<template>
	<view class="death container">
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

		<view class="" v-for="(item,index) in formattedInfoList" :key="index">
			<view class="form-itemblock">
				<view class="block-title">
					死亡动物
				</view>
				<view @click="deleteanimal(index)" class="block-delete">
				</view>
				<newCard :cardData="item.animalCard"></newCard>
			</view>

			<view class="form-itemblock">
				<view class="block-title">
					死亡记录
				</view>
				<view class="">
					<view class="numinfo flex">
						<text>数量</text>
						<input type="number" class="num-input" v-model="item.registrationInfo.deadNum" />
					</view>
					<view class="numinfo flex" style="margin: 10rpx 0">
						<text style="display: flex;align-items: center;">处理方式</text>						
						<view class="uni-px-5 uni-pb-5">
							<uni-data-checkbox v-model="item.registrationInfo.processMethod" :localdata="checkBoxList"></uni-data-checkbox>
						</view>
					</view>
					
					<view @click="showtips(index)" class="tips">
						{{`请输入备注信息 >`}}
					</view>
					<view v-if="item.noteStatus" class="textarea-box">
						<textarea class="textarea" v-model="item.note"></textarea>
					</view>
				</view>
			</view>
		</view>

			<view v-if="!audit" class="flex-align-center moreadd-box">
				<view class="">
					还有其他动物吗？
				</view>
				<view   @click="addanimal" class="msgbtn">
					点击添加动物
				</view>
			</view>
			<view v-if="audit"  class="foot flex">
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
	</view>
</template>

<script>
	import {
		getEditForm,
		saveForm,
		uplodurl,
		getCodeTableByFormAndField,
		delFormByOnetimeId,
		judgeEnoughNum
	} from '@/config/api.js';
	import {
			sendDeathForm,
			getRegistrationDetail,
			auditBusiness
	} from '@/config/businessRegister.js'
	import makemedia from '@/components/makemedia/index.vue'
	import newCard from '@/components/listcard/newCard.vue'
	import {
		getLocation
	} from '@/utils/location.js'
	export default {
		data() {
			return {
				formid: '166861654810119',
				imgidx: 0,
				imglist: [],
				datalist: [],
				relationid: '',
				jiuhujigou_name: '',
				jiuhujigou_code: '',
				onetimeid: '',
				delta: 1,

				// -- S ---------------------------------------------------------------
				checkBoxList: [
					{ value: 'HARMLESS_TREATMENT', text: '无害化处理' },
					{ value: 'OTHER', text: '其他' }
				],
				audit: false,
				materialIdList: [], // 媒体文件

				formattedInfoList: [],

				// -- E -----------------------------------------------------------------
			};
		},
		onLoad(props) {

			// ------------ S ---------------------
			if(props.businessId) {
				console.log(props.businessId)
				getRegistrationDetail(props.businessId).then(res => {
					console.log('业务登记详情',res.data.data)
					const result = res.data.data
					this.materialIdList = result.materialList.map(item => item.materialId)
					this.imglist = result.materialList.map(item => item.realUrl)
					this.formattedInfoList.push({
						animalCard: result.target.targetInfo,
						animalName: result.target.targetInfo.animalName,
						queryAniamlStatus: false,
						objectId: result.objectId,
						targetId: result.target.targetInfo.objectId, // 描述对象id 	(业务动物id、动物objectId)
						note: result.note, // 备注
						noteStatus: false,
						registrationInfo: {
							deadNum: result.registrationInfo.deadNum, // 死亡数量
							processMethod: result.registrationInfo.processMethod,	// 处理方式
						}
					})
				})
			}
			if (props.animalData) {
				console.log(JSON.parse(decodeURIComponent(props.animalData)))
				this.formattedInfoList.push({
					animalCard: JSON.parse(decodeURIComponent(props.animalData)),
					animalName: '',
					queryAniamlStatus: false,
					objectId: '',
					targetId: '', // 描述对象id 	(业务动物id、动物objectId)
					note: '', // 备注
					noteStatus: false,
					registrationInfo: {
						deadNum: "",
						processMethod: "HARMLESS_TREATMENT", // 处理方式 HARMLESS_TREATMENT-无害化处理 OTHER-其他
					}
				})
			}
			if(props.audit){
				console.log()
				this.audit = props.audit
			}


			// ------------ S ---------------------
			// if (props.selectdata) {
			// 	this.datalist.push({
			// 		animalinfo: JSON.parse(decodeURIComponent(props.selectdata)),
			// 		shuliang: '',
			// 		tips: '',
			// 		tipsflg: false,
			// 		radio: [{
			// 			name: '无害化处理',
			// 			checked: true
			// 		}, {
			// 			name: '其他',
			// 			checked: false
			// 		}]
			// 	})
			// 	this.delta = 2
			// }
			if (props.onetimeid) {
				this.onetimeid = props.onetimeid
				this.getdetail()
			}
			this.getfield()
		},
		onShow() {
			getLocation()
		},
		components: {
			makemedia,
			newCard
		},
		methods: {
			//判断库存量
			inputblur(idx) {
				judgeEnoughNum({
					num: this.datalist[idx].shuliang,
					relation: this.datalist[idx].animalinfo.relationid
				}).then(res => {
					if (res.data.code == 4) {
						uni.showToast({
							title: res.data.msg,
							icon: 'none'
						})
						this.datalist[idx].shuliang = ''
					}
				})
			},
			//获取上传的图片
			getimg(data) {
				this.imglist = this.imglist.concat(data)
				console.log('获得照片',(data))
				this.materialIdList = this.imglist.map(item => item.materialId)
			},
			//删除表单
			deleteclick() {
				delFormByOnetimeId({
					id: this.onetimeid,
					formid: this.formid
				}).then((res) => {
					if (res.data.code == 0) {
						uni.showToast({
							title: '删除成功'
						})
						setTimeout(() => {
							uni.navigateBack()
						}, 2000)
					}
				})
			},
			//获取编辑表单的内容
			getdetail() {
				getEditForm({
					id: this.onetimeid,
					formid: this.formid
				}).then((res) => {
					if (res.data.code == 0) {
						this.imglist = JSON.parse(res.data.data.sourcejson).imglist
						this.datalist = JSON.parse(res.data.data.sourcejson).datalist
					}
				})
			},
			//选择处理方式
			radioclick(idx, jdx) {
				this.datalist[idx].radio.forEach(item => {
					item.checked = false
				})
				this.datalist[idx].radio[jdx].checked = true
			},
			//获取救护机构
			getfield() {
				getCodeTableByFormAndField({
					field: 'jiuhujigou',
					formid: this.formid,
					pageindex: 1,
					pagesize: 10
				}).then((res) => {
					if (res.data.code == 0) {
						this.jiuhujigou_name = res.data.data.data[0].name
						this.jiuhujigou_code = res.data.data.data[0].code
					}
				})
			},
			//添加动物
			addanimal() {
				const _self = this
				let relationid = []
				_self.datalist.map((item) => {
					relationid.push(item.animalinfo.relationid)
				})

				let url = '/pages/business/codelist?addAnimal=true&backflg=true'
				if (relationid.length) {
					url = `/pages/business/codelist?yewuid=80003&backflg=true&relationid=${relationid.join(',')}`
				}

				uni.navigateTo({
					url,
					events: {
						getchoose(data) {
							_self.formattedInfoList.push({
								animalCard: data,
								animalName: '',
								queryAniamlStatus: false,
								objectId: '',
								targetId: data.id, // 描述对象id 	(业务动物id、动物objectId)
								note: '', // 备注
								noteStatus: false,
								registrationInfo: {
									deadNum: "",
									processMethod: "HARMLESS_TREATMENT", // 死亡数量
								}
							})
						}
					}
				})
			},
			//删除动物
			deleteanimal(idx) {
				this.datalist.splice(idx, 1)
			},
			//取消
			cancel() {
				if(audit) {
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
				}
				uni.navigateBack()
			},
			//确认
			save() {
				const params = {
					unformattedInfo: {
						materialIdList: this.materialIdList,
					},
					formattedInfoList: this.formattedInfoList.map(item => { return {
						targetId: item.animalCard.id,
						note: item.note,
						objectId: item.objectId,
						registrationInfo: item.registrationInfo
					}})
				}
				if (!this.imglist.length) {
					uni.showToast({
						title: "请上传照片",
						icon: 'none'
					})
					return
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
					sendDeathForm(params).then(res => {
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
				}
				console.log('params', params)
				
			},
			//删除图片
			deleteimg(imgidx) {
				this.imglist.splice(imgidx, 1)
			},
			showtips(idx) {
				this.datalist[idx].tipsflg = !this.datalist[idx].tipsflg
			}

		}
	};
</script>

<style lang="less" scoped>
	page {
		background: #f5f5f5;
	}
	
	.radio-box{
		display: flex;
		width: 60%;
		justify-content: space-around;
		border: 0;
		
		.uni-list-cell {
			display: flex;
			align-items: center;
		}
	}

	.death {
		.circle {
			width: 24rpx;
			height: 24rpx;
			border: 1px solid #3D71E7;
			border-radius: 50%;
			margin-right: 10rpx;
		}

		.circle-active {
			background: #3D71E7;
		}
	}
</style>
