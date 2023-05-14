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

		<view class="" v-for="(item, index) in formattedInfoList" :key="index">
			<view class="form-itemblock">
				<view class="block-title">
					出售动物
				</view>
				<view @click="deleteanimal(index)" class="block-delete">
				</view>
				<newCard :cardData="item.animalCard"></newCard>
			</view>

			<view class="form-itemblock">
				<view class="block-title">
					出售记录
				</view>
				<view class="">
					<view class="numinfo flex">
						<text>数量</text>
						<input type="number" class="num-input" v-model="item.registrationInfo.exhibitionNum" />
					</view>
					<view class="numinfo flex">
						<text>时间</text>
						<view style="border: 1px solid #fff;padding: 10rpx 0;display: flex; width: 80%;" class="field-input">
							<view class="" style="display: flex; width: 85%;">
								<view class="field-value" style="flex: 1;margin-right: 6rpx;padding: 5rpx 10rpx">
									<picker mode="date" @change="datechange('start',index, $event)" v-model="item.registrationInfo.startDate">
										<view>{{ item.registrationInfo.startDate || '开始时间' }}</view>
									</picker>
								</view>
								<text>-</text>
								<view class="field-value" style="flex: 1;margin-right: 6rpx;padding: 5rpx 10rpx">
									<picker mode="date" @change="datechange('end',index, $event)" v-model="item.registrationInfo.endDate">
										<view>{{ item.registrationInfo.endDate || '结束时间' }}</view>
									</picker>
								</view>
							</view>
							<view class="field-value" style="margin: auto">
								<picker mode="selector" :range="gapYearRange" @change="gapYearChange">
									<view>{{ gapYear }}</view>
								</picker>
							</view>
						</view>
					</view>

					<view @click="showtips(index)" class="tips">
						{{ `请输入备注信息 >` }}
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
			<view v-if="!audit" @click="addanimal" class="msgbtn">
				点击添加动物
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
import {
	sendExhibitionForm,
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
			registrationId: '',
			materialIdList: [], // 媒体文件
			documentNoId: '', // 文号id
			documentNo: '', // 文号编号
			companyName: '', // 对方单位名称
			targetCompanyName: '', // 对方单位名称，例如 移交、归还、接收  业务登记不需要文号, 只要对方单位名称

			formattedInfoList: [
				// {

				// 	animalCard: JSON.parse(decodeURIComponent(props.animalData)),
				// 	animalName: '',
				// 	queryAniamlStatus: false,
				// objectId: ''
				// 	targetId: '', // 描述对象id 	(业务动物id、动物objectId)
				// 	note: '', // 备注
				// 	noteStatus: false,
				// 	registrationInfo: {
				// 		exhibitionNum: '', // 出售数量
				//  	startDate: '',
				//  	endDate: '',
				// 	},
				// }
			],

			// -- E -----------------------------------------------------------------
		};
	},
	onLoad(props) {
		if (props.businessId) {
			console.log(props.businessId)
			getRegistrationDetail(props.businessId).then(res => {
				console.log('业务登记详情', res.data.data)
				const result = res.data.data
				const accCompanyName = result.documentSymbol.companyInfoList.filter(item => item.companyTypeInDocumentNo === 'ACCEPT_COMPANY')
				console.log('result.target.targetInfo', result.target.targetInfo)
				this.materialIdList = result.materialList.map(item => item.materialId)
				this.imglist = result.materialList.map(item => item.realUrl)
				this.documentNoId = result.documentSymbol.documentNoId
				this.documentNo = result.documentSymbol.documentNo
				if (accCompanyName.length > 0) this.companyName = accCompanyName[0]?.companyName
				this.formattedInfoList.push({
					animalCard: result.target.targetInfo,
					animalName: result.target.targetInfo.animalName,
					queryAniamlStatus: false,
					objectId: result.objectId,
					targetId: result.target.targetInfo.objectId, // 描述对象id 	(业务动物id、动物objectId)
					note: result.note, // 备注
					noteStatus: false,
					registrationInfo: {
						exhibitionNum: result.registrationInfo.exhibitionNum, // 展演数量
						startDate: result.registrationInfo.startDate,		// 开始时间
					 	endDate: result.registrationInfo.endDate,			// 结束时间
					}
				})
			})
		}
		if (props.audit) {
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
		if (props.selectAnimal) {
			this.delta = 2
		}
		if (props.animalData) {
			this.formattedInfoList.push({
				animalCard: JSON.parse(decodeURIComponent(props.animalData)),
				animalName: '',
				queryAniamlStatus: false,
				objectId: '',
				targetId: '', // 描述对象id 	(业务动物id、动物objectId)
				note: '', // 备注
				noteStatus: false,
				registrationInfo: {
						exhibitionNum: '', // 出售数量
						startDate: '',		// 开始时间
					 	endDate: '',			// 结束时间
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
		datechange(type,index,e){
			console.log(type,index,e.detail.value)
			if(type === 'start') this.formattedInfoList[index].registrationInfo.startDate = e.detail.value
			else this.formattedInfoList[index].registrationInfo.endDate = e.detail.value
		},
		//获取上传的图片
		getimg(data) {
			this.imglist = this.imglist.concat(data)
			console.log('获得照片', (data))
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
							exhibitionNum: '', // 出售数量
							startDate: '',		// 开始时间
							endDate: '',			// 结束时间
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
			if (audit) {
				auditBusiness(this.formattedInfoList[0].objectId, [], false).then(res => {
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
			if (!this.materialIdList.length) {
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
					documentNoInfo: {
						documentNo: this.documentNo,
						companyName: this.companyName,
					}
				},
				formattedInfoList: this.formattedInfoList.map(item => {
					return {
						targetId: item.animalCard.id,
						note: item.note,
						registrationInfo: item.registrationInfo
					}
				})
			}
			if (this.audit) {
				auditBusiness(this.formattedInfoList[0].objectId, [], true).then(res => {
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
				sendExhibitionForm(params).then(res => {
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

.foot {
	left: 0;
	position: fixed;
	bottom: 0;
	width: 100%;
	padding: 20rpx 0rpx 40rpx;
	background: #fff;
	z-index: 99;
}

.breed {}</style>
