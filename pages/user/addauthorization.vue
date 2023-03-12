<template>
	<view class="registerCompany container">
		<view class="form-itemblock">
			<view class="block-title">
				授予权限
			</view>
			<view class="field-item flex-align-center">
				<view class="field-title-large">
					<text class="field-musticon">*</text>
					授权区域
				</view>
				<view class="field-value">
					<addresspicker @onChangeAddress="changeAddress_anthor" :orgname="anthor_orgname">
					</addresspicker>
				</view>
			</view>
			<view class="field-item flex-align-center">
				<view class="field-title-large">
					<text class="field-musticon">*</text>
					授权时间
				</view>
				<view class="field-value">
					<picker mode="date" @change="datechange('bigintime',$event)">
						<view>{{bigintime}}</view>
					</picker>
				</view>
				<text>—</text>
				<view class="field-value">
					<picker mode="date" @change="datechange('endtime',$event)">
						<view>{{endtime}}</view>
					</picker>
				</view>
			</view>
			<view class="field-item flex-align-center">
				<view class="field-title-large">
					<text class="field-musticon">*</text>
					授权业务
				</view>
				<view class="field-value">
					林业，野保
				</view>
			</view>
		</view>
		<view class="form-itemblock">
			<view class="block-title">
				授予单位
			</view>
			<view class="field-item flex-align-center">
				<view class="field-title">
					<text class="field-musticon">*</text>
					单位
				</view>
				<input v-model="unitinfo.deptname" class="field-input" type="text" placeholder="请输入单位名称">
			</view>
			<view class="field-item flex-align-center">
				<view class="field-title">
					地址
				</view>
				<view class="field-input" style="background-color: #f6f6f6;">
					<addresspicker @onChangeAddress="changeAddress_unit" :orgname="unit_orgname">
					</addresspicker>
				</view>
			</view>
			<view class="field-item flex-align-center">
				<view class="field-title">
				</view>
				<input :disabled="disabled" v-model="unitinfo.address" type="text" class="field-input"
					placeholder="详细到街道、组、门牌号 ">
			</view>
			<view class="field-item flex-align-center">
				<view class="field-title">
					电话
				</view>
				<view class="flex-align-center" style="flex: 1;">
					<input :disabled="disabled" v-model="unitinfo.areacode" placeholder="区号" type="text"
						class="field-input" style="max-width: 100rpx;margin-right: 10rpx;">
					<input :disabled="disabled" v-model="unitinfo.tel" placeholder="八位数座机号码" type="text"
						class="field-input">
				</view>
			</view>
		</view>
		<view class="form-itemblock">
			<view class="block-title">
				管理员
			</view>
			<view class="flex-align-center field-item">
				<view style="font-weight: bold;font-size: 26rpx;" class="field-title">
					<text class="field-musticon">*</text>
					姓名
				</view>
				<input :disabled="disabled" v-model="userinfo.name" placeholder="请输入姓名" class="field-input" type="text">
			</view>
			<view class="flex-align-center">
				<view style="font-weight: bold;font-size: 26rpx;" class="field-title">
					<text class="field-musticon">*</text>
					手机
				</view>
				<input :disabled="disabled" v-model="userinfo.tel" placeholder="请输入管理员手机号" class="field-input"
					type="number">
			</view>
		</view>
		<view v-if="disabled" class="form-itemblock">
			<view class="block-title">
				审核意见
			</view>
			<view class="">
				<textarea v-model="checkmark" placeholder="请输入..." class="textarea"></textarea>
			</view>
		</view>
		<view v-if="!editflg" class="foot flex">
			<view @click="cancel" class="cancel-btn">
				放弃
			</view>
			<view @click="save" class="confirm-btn">
				确认授权
			</view>
		</view>
		<view v-else class="foot flex">
			<view @click="cancel" class="cancel-btn">
				放弃
			</view>
			<view @click="opendelete" class="delete-btn">
				删除授权
			</view>
			<view @click="save" class="confirm-btn-short">
				确认修改
			</view>
		</view>
		<Dialog v-if="dialogvisible" @confirm="diaconfirm" exitflg @cancel="opendelete">
		</Dialog>
	</view>
</template>

<script>
	import {
		addAnthorityManagge,
		getAnthorityManageInfo,
		delAnthority,
		checkAnthority,
		getjudgeUnit
	} from "@/config/api.js"
	import Dialog from '@/components/dialog/index.vue'
	import addresspicker from "@/components/pick-address/index.vue"
	export default {
		data() {
			return {
				bisinfo: [],
				userinfo: {},
				unitinfo: {},
				flg: '',
				disabled: false,
				editflg: false,
				dialogvisible: false,
				detaildata: {},
				bigintime: '开始时间',
				endtime: '结束时间',
				checkmark: '',
				anthorityinfo: {
					orgcode: uni.getStorageSync('orgcode')
				},
				unit_orgname: uni.getStorageSync('orgname'),
				anthor_orgname: uni.getStorageSync('orgname'),
				cansaveflg: true
			}
		},
		onLoad(props) {
			if (props.flg) {
				this.flg = props.flg
			}
			if (props.editflg == 'true') {
				this.editflg = true
			}
			if (props.checkflg == 'true') {
				this.disabled = true
			}
			if (props.data) {
				let detaildata = JSON.parse(decodeURIComponent(props.data))
				this.detaildata = detaildata
				getAnthorityManageInfo({
					deptid: detaildata.deptid,
					personid: detaildata.personid,
					unittype: detaildata.unittype
				}).then(res => {
					if (res.data.code == 0) {
						this.unitinfo = res.data.data.unitinfo
						this.userinfo = res.data.data.userinfo
						this.anthorityinfo = res.data.data.anthorityinfo
						this.begintime = res.data.data.anthorityinfo.begintime || '开始时间'
						this.endtime = res.data.data.anthorityinfo.endtime || '结束时间'
						this.anthor_orgname = res.data.data.anthorityinfo.orgname
						this.unit_orgname = res.data.data.unitinfo.orgname
					}
				})
			}
		},
		components: {
			Dialog,
			addresspicker
		},
		onShow() {},
		methods: {
			//判断单位是否重复
			judge() {
				let bisid = ''
				this.bisinfo.forEach(item => {
					if (item.selectflg) {
						bisid = item.id
						return true
					}
				})
				if (bisid === '') return
				getjudgeUnit({
					type: bisid,
					unitname: this.unitinfo.deptname,
					companyid: this.detaildata.deptid || ''
				}).then(res => {
					if (res.data.code != 0) {
						uni.showToast({
							title: res.data.msg,
							icon: "none"
						})
						this.cansaveflg = false
					}
				})
			},
			changeAddress_anthor(name, code) {
				this.$set(this.anthorityinfo, "orgcode", code)
			},
			changeAddress_unit(name, code) {
				this.$set(this.unitinfo, "orgcode", code)
			},
			datechange(state, e) {
				this.$set(this.anthorityinfo, state, e.detail.value)
				this[state] = e.detail.value
			},
			//审核
			examine() {
				checkAnthority({
					deptid: this.detaildata.deptid,
					personid: this.detaildata.personid,
					orgcode: this.detaildata.orgcode,
					roleid: this.detaildata.roleid,
					checkflg: 0,
					unittype: this.detaildata.unittype,
					checkmark: this.checkmark
				}).then(res => {
					if (res.data.code == 0) {
						setTimeout(() => {
							uni.showToast({
								title: '审核成功'
							})
						}, 50)
						setTimeout(() => {
							uni.navigateBack()
						}, 1500)
					}
				})
			},
			//放弃
			cancel() {
				uni.navigateBack()
			},
			//删除弹框
			opendelete() {
				this.dialogvisible = !this.dialogvisible
			},
			//确认删除
			diaconfirm() {
				delAnthority({
					deptid: this.detaildata.deptid,
					personid: this.detaildata.personid,
					orgcode: this.detaildata.orgcode,
					roleid: this.detaildata.roleid
				}).then(res => {
					if (res.data.code == 0) {
						setTimeout(() => {
							uni.showToast({
								title: '删除成功'
							})
						}, 50)
						setTimeout(() => {
							uni.navigateBack()
						}, 1500)
					}
				})
			},
			//确认加入
			save() {
				// if (!this.cansaveflg) {
				// 	uni.showToast({
				// 		title: "添加的单位已经存在",
				// 		icon: "none"
				// 	})
				// 	return
				// }
				addAnthorityManagge({
					flg: this.flg,
					anthorityinfo: this.anthorityinfo,
					unitinfo: this.unitinfo,
					userinfo: this.userinfo
				}).then(res => {
					if (res.data.code == 0) {
						uni.showToast({
							title: '提交成功'
						})
						setTimeout(() => {
							uni.navigateTo({
								url: '/pages/home/index'
							})
						}, 2000)
					}
				})
			},
			checkclick(idx) {
				this.bisinfo[idx].selectflg = !this.bisinfo[idx].selectflg
			},
		}
	}
</script>

<style lang="less">
	page {
		background: #f5f5f5;
	}

	.registerCompany {
		.field-title {
			white-space: nowrap;
			width: 60rpx;
			flex-shrink: 0;

		}

		.field-musticon {
			color: #ff0000;
			position: absolute;
			left: 20rpx;
		}

		.field-title-large {
			width: 120rpx;
			font-weight: bold;
			font-size: 26rpx;
		}

		.field-input {
			flex: 1;
			margin-left: 10rpx;
		}

		.field-item {
			margin-bottom: 20rpx;
		}

		.field-value {
			padding: 5rpx 20rpx;
			background: #F6F6F6;
			border: 1px solid rgba(0, 0, 0, 0.1);
			border-radius: 4rpx;
		}

		.textarea {
			background: rgba(#000000, 0.04);
			padding: 20rpx;
			height: 200rpx;
		}
	}
</style>
