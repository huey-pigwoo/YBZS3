<template>
	<view class="roleedit container">
		<view class="form-itemblock" style="margin-bottom: 20rpx;">
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
		</view>
		<view class="foot flex">
			<view @click="cancel" class="cancel-btn">
				{{cancelname}}
			</view>
			<view @click="save(0)" class="confirm-btn">
				{{confirmname}}
			</view>
		</view>
	</view>
</template>

<script>
	import {
		getPersonDeptRole,
		sureAnthority
	} from '@/config/api.js'
	import {
		checkMobile
	} from '@/utils/util.js'
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
				confirmname: ''
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
			if (props.flg) {
				this.flg = props.flg
			}
			if (props.flg == 1) {
				uni.setNavigationBarTitle({
					title: '添加人员'
				})
				this.cancelname = '放弃'
				this.confirmname = '确认添加'
			} else if (props.flg == 2) {
				uni.setNavigationBarTitle({
					title: '人员审核'
				})
				this.cancelname = '拒绝'
				this.confirmname = '通过'
			} else if (props.flg == 3) {
				uni.setNavigationBarTitle({
					title: '人员编辑'
				})
				this.cancelname = '取消'
				this.confirmname = '确认调动'
			} else {
				uni.setNavigationBarTitle({
					title: '人员编辑'
				})
				this.tel = uni.getStorageSync('tel')
				this.name = uni.getStorageSync('name')
				this.cancelname = '取消'
				this.confirmname = '确认'
			}
			getPersonDeptRole({
				flg: this.flg || 0,
				roleid: this.roleid || ""
			}).then(res => {
				if (res.data.code == 0) {
					let initrole = []
					this.roleinfo = res.data.data.roleinfo
					this.unitinfo = res.data.data.unit
					res.data.data.roleinfo.map(item => {
						if (item.selectflg) {
							initrole.push(item.id)
						}
					})
					this.initrole = initrole
				}
			})
		},
		methods: {
			checkclick(idx) {
				this.roleinfo[idx].selectflg = !this.roleinfo[idx].selectflg
			},
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
				sureAnthority(params).then(res => {
					if (res.data.code == 0) {
						setTimeout(() => {
							uni.showToast({
								title: '保存成功'
							})
						}, 10)
						let eventChannel = this.getOpenerEventChannel()
						eventChannel.emit('refresh')
						setTimeout(() => {
							uni.navigateBack()
						}, 1500)
					}
				})
			},
			cancel() {
				if (this.flg == 2) {
					this.save(1)
				} else {
					uni.navigateBack()
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
	}
</style>
