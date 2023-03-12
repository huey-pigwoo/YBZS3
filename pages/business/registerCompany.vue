<template>
	<view class="registerCompany container">
		<view class="form-itemblock">
			<view class="block-title">
				单位信息
			</view>
			<view class="field-item flex-baseline">
				<view class="field-title">
					<text class="field-musticon">*</text>
					类型
				</view>
				<view class="">
					<checkbox-group style="display: flex;flex-wrap: wrap;">
						<block v-for="(item,index) in bisinfo" :key="index">
							<label @click="checkclick(index)" style="margin-right: 20rpx;white-space: nowrap;">
								<checkbox :disabled="disabled" style="transform:scale(0.6);margin-right: -10rpx;"
									value="cb" :checked="item.selectflg" color="#3d71e7" />{{item.name}}
							</label>
						</block>
					</checkbox-group>
				</view>
			</view>
			<view class="field-item flex-align-center">
				<view class="field-title">
					<text class="field-musticon">*</text>
					单位
				</view>
				<input @blur="judge" :disabled="disabled" v-model="unitinfo.deptname" class="field-input" type="text"
					placeholder="请输入单位名称">
			</view>
			<view class="field-item flex-align-center">
				<view class="field-title">
					<text class="field-musticon">*</text>
					地址
				</view>
				<view style="background-color: #F6F6F6;padding: 10rpx;" class="field-input">
					<addresspicker v-if="!disabled" :orgname='unitinfo.orgname' @onChangeAddress='changeAddress'>
					</addresspicker>
					<view v-else class="">
						{{unitinfo.orgname}}
					</view>
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
				<input :disabled="disabled||flg==0" v-model="userinfo.name" placeholder="请输入姓名" class="field-input"
					type="text">
			</view>
			<view class="flex-align-center">
				<view style="font-weight: bold;font-size: 26rpx;" class="field-title">
					<text class="field-musticon">*</text>
					手机
				</view>
				<input :disabled="disabled||flg==0" v-model="userinfo.tel" placeholder="请输入管理员手机号" class="field-input"
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
				确认
			</view>
		</view>
		<view v-if="!disabled&&editflg" class="foot flex">
			<view @click="cancel" class="cancel-btn">
				放弃
			</view>
			<view @click="opendelete" class="delete-btn">
				删除
			</view>
			<view @click="save" class="confirm-btn-short">
				确认
			</view>
		</view>
		<view v-if='disabled' class="foot flex">
			<view @click="cancel" class="cancel-btn">
				放弃
			</view>
			<view @click="examine" class="confirm-btn-short">
				确认
			</view>
		</view>
		<Dialog v-if="dialogvisible" @confirm="diaconfirm" exitflg @cancel="opendelete">
		</Dialog>
	</view>
</template>

<script>
	import {
		getCodeTable,
		addUnit,
		getUnitManageInfo,
		delUnit,
		checkUnit,
		getjudgeUnit
	} from "@/config/api.js"
	import Dialog from '@/components/dialog/index.vue'
	import addresspicker from '@/components/pick-address/index.vue'
	import {
		checkMobile
	} from "../../utils/util"
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
				checkmark: "",
				cansaveflg: true
			}
		},
		async onLoad(props) {
			if (props.flg) {
				console.log(props.flg)
				this.flg = props.flg
				this.$set(this.unitinfo, "orgname", uni.getStorageSync('orgname'))
				this.$set(this.unitinfo, "orgcode", uni.getStorageSync('orgcode'))
				if (this.flg == 0) {
					this.userinfo.name = uni.getStorageSync('name')
					this.userinfo.tel = uni.getStorageSync('tel')
				}
				uni.getStorageSync('name')
			}
			if (props.editflg == 'true') {
				this.editflg = true
				uni.setNavigationBarTitle({
					title: '编辑单位'
				})
			}
			if (props.checkflg == 'true') {
				this.disabled = true
				uni.setNavigationBarTitle({
					title: '审核单位'
				})
			}
			await getCodeTable({
				formid: 1,
				pagesize: 1000,
				pageindex: 1
			}).then(res => {
				if (res.data.code == 0) {
					this.bisinfo = res.data.data.rows
					this.bisinfo.forEach(item => {
						item.selectflg = false
					})
				}
			})
			if (props.data) {
				let detaildata = JSON.parse(decodeURIComponent(props.data))
				this.detaildata = detaildata
				getUnitManageInfo({
					deptid: detaildata.deptid,
					personid: detaildata.personid,
					unittype: detaildata.unittype
				}).then(res => {
					if (res.data.code == 0) {
						this.unitinfo = res.data.data.unitinfo
						this.$set(this.unitinfo, "orgname", res.data.data.unitinfo.orgname)
						this.userinfo = res.data.data.userinfo
						this.bisinfo.forEach((item, index) => {
							if (res.data.data.unitinfo.unittype.includes(index)) {
								item.selectflg = true
							}
						})
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
			changeAddress(name, code) {
				this.$set(this.unitinfo, "orgname", name)
				this.$set(this.unitinfo, "orgcode", code)
			},
			//审核
			examine() {
				checkUnit({
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
				delUnit({
					deptid: this.detaildata.deptid,
					personid: this.detaildata.personid,
					orgcode: this.detaildata.orgcode,
					roleid: this.detaildata.roleid,
					unittype: this.detaildata.unittype
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
				if (!this.cansaveflg) {
					uni.showToast({
						title: "添加的单位已经存在",
						icon: "none"
					})
					return
				}
				let flg = false
				this.bisinfo.some(item => {
					if (item.selectflg) {
						flg = true
					}
				})
				if (!flg) {
					uni.showToast({
						title: '单位类型不能为空',
						icon: "none"
					})
					return
				}
				if (!this.unitinfo.deptname) {
					uni.showToast({
						title: '单位名称不能为空',
						icon: "none"
					})
					return
				}
				if (!this.unitinfo.orgcode) {
					uni.showToast({
						title: '单位地址不能为空',
						icon: "none"
					})
					return
				}
				if (!this.userinfo.name) {
					uni.showToast({
						title: '管理员姓名不能为空',
						icon: "none"
					})
					return
				}
				if (!this.userinfo.tel) {
					uni.showToast({
						title: '管理员手机号不能为空',
						icon: "none"
					})
					return
				}
				if (!checkMobile(this.userinfo.tel)) {
					uni.showToast({
						title: '请输入正确的手机号',
						icon: "none"
					})
					return
				}
				let unittype = []
				this.bisinfo.map(item => {
					if (item.selectflg) {
						unittype.push(item.id)
					}
				})
				this.unitinfo.unittype = unittype
				addUnit({
					flg: this.flg,
					unitinfo: this.unitinfo,
					userinfo: this.userinfo
				}).then(res => {
					if (res.data.code == 0) {
						uni.showToast({
							title: '提交成功'
						})
						if (this.flg == 0) {
							setTimeout(() => {
								uni.navigateTo({
									url: '/pages/home/index'
								})
							}, 2000)
						} else {
							let eventChannel = this.getOpenerEventChannel()
							eventChannel.emit('refresh')
							setTimeout(() => {
								uni.navigateBack()
							}, 2000)
						}
					}
				})
			},
			checkclick(idx) {
				if (this.disabled) {
					return false
				}
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

			.field-musticon {
				color: #ff0000;
				position: absolute;
				left: 20rpx;
			}
		}

		.field-input {
			flex: 1;
			margin-left: 10rpx;
		}

		.field-item {
			margin-bottom: 20rpx;
		}

		.textarea {
			background: rgba(#000000, 0.04);
			padding: 20rpx;
			height: 200rpx;
			width: auto;
		}
	}
</style>
