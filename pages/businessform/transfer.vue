<template>
	<view class="transfer container">
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
				移交单位
			</view>
			<view style="margin-bottom: 20rpx;" class="flex-align-center">
				<view class="">
					单位
				</view>
				<input style="flex: 1;" placeholder="请选择移交单位" class="field-input" @click="choosedanwei" disabled
					v-model="jieshoudanwei_name" type="text">
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
			<view style="margin-bottom: 10rpx;" class="form-itemblock">
				<view class="block-title">
					移交动物
				</view>
				<view v-if="datalist.length>1" @click="deleteanimal(index)" class="block-delete">
				</view>
				<view class="flex-align-center">
					<view class="animalcard-img">
						<image :src="item.animalinfo.pic"></image>
					</view>
					<view style="flex: 1;" class="">
						<view class="flex-between-center">
							<view class="animalcard-name">
								{{item.animalinfo.f1}}
							</view>
							<view class="animalcard-type">
								{{item.animalinfo.f2}}
							</view>
						</view>
						<view class="sub-text">
							{{item.animalinfo.f3}}
						</view>
						<view class="sub-text">
							{{item.animalinfo.f4}}
						</view>
					</view>
				</view>
			</view>
			<view class="form-itemblock">
				<view class="block-title">
					移交记录
				</view>
				<view class="">
					<view class="numinfo flex">
						<text>数量</text>
						<input @blur="inputblur(index)" type="number" class="num-input" v-model="item.shuliang" />
					</view>
					<view @click="showtips(index)" class="tips">
						{{`请输入备注信息 >`}}
					</view>
					<view v-if="item.tipsflg" class="textarea-box">
						<textarea class="textarea" v-model="item.tips"></textarea>
					</view>
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
		delFormByOnetimeId,
		judgeEnoughNum
	} from '@/config/api.js';
	import {
		getLocation
	} from '@/utils/location.js'
	import makemedia from '@/components/makemedia/index.vue'
	import {
		checkMobile
	} from "@/utils/util.js"
	export default {
		data() {
			return {
				formid: '166861681426337',
				imgidx: 0,
				imglist: [],
				datalist: [],
				relationid: '',
				onetimeid: '',
				jieshoudanwei_name: "",
				jieshoudanwei_code: "",
				name: '',
				phone: '',
				yijiaodanwei_name: '',
				yijiaodanwei_code: '',
				delta: 1
			};
		},
		onLoad(props) {
			if (props.selectdata) {
				this.datalist.push({
					animalinfo: JSON.parse(decodeURIComponent(props.selectdata)),
					shuliang: '',
					tips: '',
					tipsflg: false
				})
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
						this.jieshoudanwei_name = JSON.parse(res.data.data.sourcejson).danweiinfo
							.jieshoudanwei_name
						this.jieshoudanwei_code = JSON.parse(res.data.data.sourcejson).danweiinfo
							.jieshoudanwei_code
						this.name = JSON.parse(res.data.data.sourcejson).danweiinfo.name
						this.phone = JSON.parse(res.data.data.sourcejson).danweiinfo.phone
					}
				})
			},
			//选择单位
			choosedanwei() {
				const _self = this
				uni.navigateTo({
					url: '/pages/business/codelist?backflg=true&simpleflg=true&yewuid=80006&field=jieshoudanwei',
					events: {
						getchoose(data) {
							_self.jieshoudanwei_code = data.code
							_self.jieshoudanwei_name = data.name
						}
					}

				})
			},
			//获取救护机构，移交单位
			getfield() {
				getCodeTableByFormAndField({
					field: 'yijiaodanwei',
					formid: this.formid,
					pageindex: 1,
					pagesize: 10
				}).then((res) => {
					if (res.data.code == 0) {
						this.yijiaodanwei_name = res.data.data.data[0].name
						this.yijiaodanwei_code = res.data.data.data[0].code
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
				let url = '/pages/business/codelist?yewuid=80006&backflg=true'
				if (relationid.length) {
					url = `/pages/business/codelist?yewuid=80006&backflg=true&relationid=${relationid.join(',')}`
				}
				uni.navigateTo({
					url,
					events: {
						getchoose(data) {
							_self.datalist.push({
								animalinfo: JSON.parse(JSON.stringify(data)),
								shuliang: '',
								tips: '',
								tipsflg: false
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
				uni.navigateBack()
			},
			//确认
			save() {
				if (!this.imglist.length && !this.jieshoudanwei_name && !this.name && !this.phone && !this.datalist[0]
					.shuliang && !this.datalist[0].tips) {
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
									yijiaodongwu: {
										key: '物种名称',
										value: item.animalinfo.name,
										controltype: 0,
										code: item.animalinfo.code
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
									jieshoudanwei: {
										key: '接收单位',
										value: _self.jieshoudanwei_name,
										controltype: 0,
										code: _self.jieshoudanwei_code
									},
									yijiaodanwei: {
										key: '移交单位',
										value: _self.yijiaodanwei_name,
										controltype: 0,
										code: _self.yijiaodanwei_code
									}
								},
								source: 'wxmini',
								appVersion: '1.0.0',
								userid: uni.getStorageSync('userid'),
								time,
								relationid: item.animalinfo.relationid || _self.relationid,
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
								jieshoudanwei_name: _self.jieshoudanwei_name,
								jieshoudanwei_code: _self.jieshoudanwei_code,
								danwei: _self.yijiaodanwei_name,
								name: _self.name,
								phone: _self.phone
							},
							formtitle: '移交'
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
			showtips(idx) {
				this.datalist[idx].tipsflg = !this.datalist[idx].tipsflg
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

	.transfer {}
</style>
