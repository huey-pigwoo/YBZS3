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
				<input placeholder="请填写批准文号" style="flex: 1;" class="field-input" v-model="wenhao" type="text">
			</view>
			<view style="margin-bottom: 20rpx;" class="flex-align-center">
				<view class="">
					单位
				</view>
				<input placeholder="请填写对方单位名称" style="flex: 1;" class="field-input" v-model="danwei" type="text">
			</view>
			<view class="flex-align-center">
				<view class="">
					姓名
				</view>
				<input style="width: 140rpx;" placeholder="请填写姓名" class="field-input" type="text" v-model="name">
				<view style="margin-left: 20rpx;" class="">
					电话
				</view>
				<input style="flex: 1;" placeholder="请填写电话号码" class="field-input" type="number" v-model="phone">
			</view>
		</view>
		<view class="" v-for="(item,index) in datalist" :key="index">
			<view class="form-itemblock">
				<view class="block-title">
					引进动物
				</view>
				<view class="flex-align-center">
					<text>名称</text>
					<input disabled @click="chooseanimal(index)" placeholder="请选择动物" class="field-input"
						style="flex: 1;" type="text" v-model="item.animalinfo.name">
				</view>
				<view style="margin-top: 20rpx;" class="flex-align-center">
					<text>数量</text>
					<input style="width: 140rpx;" class="num-input" type="number" v-model="item.shuliang">
				</view>
				<view @click="showtips(index)" class="tips">
					{{`请输入备注信息 >`}}
				</view>
				<view v-if="item.tipsflg" class="textarea-box">
					<textarea class="textarea" v-model="item.tips"></textarea>
				</view>
			</view>
		</view>
		<view class="flex-align-center moreadd-box">
			<view class="">
				还有其他动物吗？
			</view>
			<view @click="addanimal" class="msgbtn">
				添加动物
			</view>
		</view>
		<view v-if="onetimeid" class="foot flex">
			<view @click="cancel" class="cancel-btn">
				取消
			</view>
			<view @click="deleteclick" class="delete-btn">
				删除
			</view>
			<view @click="save" class="confirm-btn-short">
				确认
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
		getEditForm,
		saveForm,
		uplodurl,
		getCodeTableByFormAndField,
		delFormByOnetimeId
	} from '@/config/api.js';
	import makemedia from '@/components/makemedia/index.vue'
	import {
		getLocation
	} from '@/utils/location.js'
	import {
		checkMobile
	} from "@/utils/util.js"
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
				onetimeid: ''
			};
		},
		onLoad(props) {
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
		onShow() {
			getLocation()
		},
		components: {
			makemedia
		},
		methods: {
			//获取上传的图片
			getimg(data) {
				this.imglist = this.imglist.concat(data)
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
						this.danwei = JSON.parse(res.data.data.sourcejson).danweiinfo.danwei
						this.wenhao = JSON.parse(res.data.data.sourcejson).danweiinfo.wenhao
						this.name = JSON.parse(res.data.data.sourcejson).danweiinfo.name
						this.phone = JSON.parse(res.data.data.sourcejson).danweiinfo.phone
					}
				})
			},
			showtips(idx) {
				this.datalist[idx].tipsflg = !this.datalist[idx].tipsflg
			},
			//添加动物
			addanimal(idx) {
				this.datalist.push({
					animalinfo: {
						name: '',
						code: ""
					},
					shuliang: '',
					tips: '',
					tipsflg: false
				})
			},
			//获取繁育单位
			getfield() {
				getCodeTableByFormAndField({
					field: 'fanyudanwei',
					formid: this.formid,
					pageindex: 1,
					pagesize: 10
				}).then((res) => {
					if (res.data.code == 0) {
						this.fanyudanwei_name = res.data.data.data[0].name
						this.fanyudanwei_code = res.data.data.data[0].code
					}
				})
			},
			//选择动物
			chooseanimal(idx) {
				const _self = this
				uni.navigateTo({
					url: "/pages/business/codelist?simpleflg=true&backflg=true&field=wuzhongmingchen&yewuid=80002",
					events: {
						getchoose(data) {
							_self.datalist[idx].animalinfo.name = data.name
							_self.datalist[idx].animalinfo.code = data.code
						}
					}
				})
			},
			//取消
			cancel() {
				uni.navigateBack()
			},
			//确认
			save() {
				if (!this.imglist.length && !this.danwei && !this.wenhao && !this.name && !this.phone && !this.datalist[0]
					.shuliang && !this.datalist[0]
					.animalinfo.name && !this.datalist[0].tips) {
					uni.showToast({
						title: "请至少输入一个信息",
						icon: 'none'
					})
					return
				}
				if (this.phone && !checkMobile(this.phone)) {
					uni.showToast({
						title: '请输入正确的手机号',
						icon: 'none'
					})
					return
				}
				let time = Date.now()
				let final_arr = []
				const _self = this
				_self.datalist.map((item) => {
					final_arr.push({
						service: 'fromService',
						data: {
							formid: _self.formid,
							onetimeid: _self.onetimeid,
							isUp: 2,
							location: {
								Address: ''
							},
							time,
							userid: uni.getStorageSync('userid'),
							json: {
								data: {
									wuzhongmingchen: {
										key: '物种名称',
										value: item.animalinfo.name,
										controltype: 0,
										code: item.animalinfo.code
									},
									danwei: {
										key: '单位',
										value: _self.danwei,
										controltype: 0,
									},
									wenhao: {
										key: '文号',
										value: _self.wenhao,
										controltype: 0,
									},
									shuliang: {
										key: '数量',
										value: item.shuliang,
										controltype: 0,
									},
									xingming: {
										key: '姓名',
										value: _self.name,
										controltype: 0
									},
									dianhua: {
										key: '电话',
										value: _self.phone,
										controltype: 0
									},
									beizhu: {
										key: '备注',
										value: item.tips,
										controltype: 0,
									},
									xianchangyingxiang: {
										key: '现场影像',
										value: _self.imglist,
										controltype: 0,
									},
									fanyudanwei: {
										key: '繁育单位',
										value: _self.fanyudanwei_name,
										controltype: 0,
										code: _self.fanyudanwei_code
									}
								},
								source: 'wxmini',
								appVersion: '1.0.0',
								userid: uni.getStorageSync('userid'),
								time,
								relationid: '',
								geometrygouhui: [],
								geometry: {
									valuetype: 'geometry',
									geotype: 'WKT',
									data: `SRID=4326;POINT(${_self.$store.state.location.longitude} ${_self.$store.state.location.latitude})`
								}
							}
						},
						sourcejson: {
							imglist: _self.imglist,
							datalist: _self.datalist,
							danweiinfo: {
								danwei: _self.danwei,
								wenhao: _self.wenhao,
								name: _self.name,
								phone: _self.phone
							},
							formtitle: '引进'
						}
					})
				})
				if (final_arr.length) {
					saveForm(final_arr).then(res => {
						if (res.data.code == 0) {
							uni.showToast({
								title: '保存成功'
							})
							setTimeout(() => {
								uni.navigateBack({
									delta: _self.delta
								})
							}, 1500)
						}
					})
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
