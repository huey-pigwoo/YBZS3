<template>
	<view class="breed container">
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
					繁殖动物
				</view>
				<view  @click="deleteanimal(index)" class="block-delete">
				</view>
				<newCard :cardData="item.animalCard" ></newCard>
			</view>
			
			<view class="form-itemblock" >
				<view class="block-title">
					繁殖记录
				</view>
				<view class="">
					<view class="numinfo flex">
						<text>数量</text>
						<input type="number" class="num-input" v-model="item.registrationInfo.reproductionNum" />
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
		<view class="flex-align-center moreadd-box">
			<view class="">
				还有其他动物吗？
			</view>
			<view  v-if="!audit" @click="addanimal" class="msgbtn">
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
</template>

<script>
	import {
		sendBreedForm,
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
				formid: '166861643534115',
				imgidx: 0,
				imglist: [],
				datalist: [],
				relationid: '',
				onetimeid: '',
				jiuhujigou_name: '',
				jiuhujigou_code: '',
				delta: 1,
				
				// -- S ---------------------------------------------------------------
						audit: false,
						materialIdList: [], // 媒体文件
						
						formattedInfoList: [
							// {
							// 	animalCard: JSON.parse(decodeURIComponent(props.animalData)),
							// 	animalName: '',
							// 	queryAniamlStatus: false,
							// 	objectId: ''
							// 	targetId: '', // 描述对象id 	(业务动物id、动物objectId)
							// 	note: '', // 备注
							// 	noteStatus: false,
							// 	registrationInfo: {
							// 		reproductionNum: '', // 繁殖数量
							// 	},
							// }
						],

				// -- E -----------------------------------------------------------------
			};
		},
		onLoad(props) {
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
							reproductionNum: result.registrationInfo.reproductionNum, // 繁殖数量
						}
					})
				})
			}
			if(props.audit){
				console.log()
				this.audit = props.audit
			}
			if (props.selectdata) {
				this.datalist.push({
					animalinfo: JSON.parse(decodeURIComponent(props.selectdata)),
					shuliang: '',
					tips: '',
					tipsflg: false,
				})
				this.delta = 2
			}
			if(props.selectAnimal) {
				this.delta = 2
			}
			if(props.animalData) {
				this.formattedInfoList.push({
					animalCard: JSON.parse(decodeURIComponent(props.animalData)),
					animalName: '',
					queryAniamlStatus: false,
					objectId: '',
					targetId: '', // 描述对象id 	(业务动物id、动物objectId)
					note: '', // 备注
					noteStatus: false,
					registrationInfo: {
						reproductionNum: '', // 繁殖数量
					}
				})
			}
			if (props.onetimeid) {
				this.onetimeid = props.onetimeid
				this.getdetail()
			}
			// this.getfield()	//-- ？？？
		},
		onShow() {
			getLocation()
		},
		components: {
			makemedia,
			newCard
		},
		methods: {
			//获取上传的图片
			getimg(data) {
				this.imglist = this.imglist.concat(data)
				console.log('获得照片',(data))
				this.materialIdList = this.imglist.map(item => item.materialId)
				
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
									reproductionNum: '', // 繁殖数量
								}
							})
						}
					}
				})
			},
			//删除动物
			deleteanimal(idx) {
				this.formattedInfoList.splice(idx, 1)
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
				// if (!this.imglist.length && !this.datalist[0].shuliang && !this.datalist[0].tips) {
				// 	uni.showToast({
				// 		title: "请至少输入一个信息",
				// 		icon: 'none'
				// 	})
				// 	return
				// }
				if(!this.materialIdList.length) {
					uni.showToast({
						title: "请上传照片",
					 	icon: 'none'
					})
					return
				}
				let time = Date.now()
				let final_arr = []
				const _self = this
		// ----------------- S -----------------
				const params = {
					unformattedInfo: {
						materialIdList: this.materialIdList,
					},
					formattedInfoList: this.formattedInfoList.map(item => { return {
						targetId: item.animalCard.id,
						note: item.note,
						objectId: result.objectId,
						registrationInfo: item.registrationInfo
					}})
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
					sendBreedForm(params).then(res => {
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
				console.log(params)
		// ----------------- E -----------------
				
				// _self.datalist.map((item) => {
				// 	final_arr.push({
				// 		service: 'fromService',
				// 		data: {
				// 			formid: _self.formid,
				// 			onetimeid: _self.onetimeid,
				// 			isUp: 2,
				// 			location: {
				// 				Address: ''
				// 			},
							// time,
							// userid: uni.getStorageSync('userid'),
							// json: {
							// 	data: {
							// 		wuzhongmingchen: {
							// 			key: '物种名称',
							// 			value: item.animalinfo.name,
							// 			controltype: 0,
							// 			code: item.animalinfo.code
							// 		},
							// 		fanyushuliang: {
							// 			key: '繁育数量',
									// 	value: item.shuliang,
									// 	controltype: 0,
									// },
									// beizhu: {
									// 	key: '备注',
									// 	value: item.tips,
									// 	controltype: 0,
									// },
									// xianchangyingxiang: {
									// 	key: '现场影像',
									// 	value: _self.imglist,
								// 		controltype: 0,
								// 	},
								// 	jiuhujigou: {
								// 		key: '救护机构',
								// 		value: _self.jiuhujigou_name,
								// 		controltype: 0,
								// 		code: _self.jiuhujigou_code
								// 	},
								// },
								// source: 'wxmini',
								// appVersion: '1.0.0',
								// userid: uni.getStorageSync('userid'),
								// time,
				// 				relationid: item.animalinfo.relationid || _self.relationid,
				// 				geometrygouhui: [],
				// 				geometry: {
				// 					valuetype: 'geometry',
				// 					geotype: 'WKT',
				// 					data: `SRID=4326;POINT(${_self.$store.state.location.longitude} ${_self.$store.state.location.latitude})`
				// 				}
				// 			}
				// 		},
				// 		sourcejson: {
				// 			imglist: _self.imglist,
				// 			datalist: _self.datalist,
				// 			formtitle: '繁殖'
				// 		}
				// 	})
				// })
				// if (final_arr.length) {
				// 	saveForm(final_arr).then(res => {
				// 		if (res.data.code == 0) {
				// 			uni.showToast({
				// 				title: '保存成功'
				// 			})
				// 			setTimeout(() => {
				// 				uni.navigateBack({
				// 					delta: _self.delta
				// 				})
				// 			}, 1500)
				// 		}
				// 	})
				// }
			},
			//删除图片
			deleteimg(imgidx) {
				this.imglist.splice(imgidx, 1)
			},
			showtips(idx) {
				this.formattedInfoList[idx].noteStatus = !this.formattedInfoList[idx].noteStatus
			},

		}
	};
</script>

<style lang="less">
	page {
		background: #f5f5f5;
	}
	.foot{
		left: 0;
		position: fixed;
		bottom: 0;
		width: 100%;
		padding: 20rpx 0rpx 40rpx;
		background: #fff;
		z-index: 99;
	}
	.breed {}
</style>
