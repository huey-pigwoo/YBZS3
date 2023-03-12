<template>
	<view class="confirmCompany">
		<view class="form-itemblock" style="margin-bottom: 20rpx;">
			<view class="block-title">
				单位信息
			</view>
			<view style="font-size: 26rpx;">
				{{companydata.companyname}}
			</view>
			<view style="margin: 20rpx 0 30rpx;" class="flex-between-center">
				<view style="color: #999;font-size: 20rpx;">
					{{companydata.orgname||''}}
				</view>
				<view style="color: #999;font-size: 20rpx;">
					{{companydata.tel ||''}}
				</view>
			</view>
			<view class="block-title">
				身份
			</view>
			<view class="flex-align-center">
				<view class="">
					<checkbox-group>
						<block v-for="(item,index) in rolelist" :key="index">
							<label @click="checkclick(index)" style="margin-right: 20rpx;">
								<checkbox style="transform:scale(0.6);margin-right: -10rpx;" value="cb"
									:checked="item.selectflg" color="#3d71e7" />{{item.name}}
							</label>
						</block>
					</checkbox-group>
				</view>
			</view>
		</view>
		<view class="form-itemblock">
			<view class="block-title">
				添加人信息
			</view>
			<view class="flex-align-center field-item">
				<view class="field-title">
					<text style="color: #FF0000;">*</text>姓名
				</view>
				<input class="field-input" v-model="username" style="flex: 1;" type="text" placeholder="请输入姓名">
			</view>
			<view v-if="phone" class="flex-align-center field-item">
				<view class="field-title">
					<text style="color: #FF0000;">*</text>手机
				</view>
				<input disabled v-model="phone" class="field-input" style="flex: 1;" type="text"
					placeholder="请输入添加人手机号">
			</view>
		</view>
		<view class="foot flex">
			<view class="cancel-btn">
				取消
			</view>
			<view @click="save" class="confirm-btn">
				确认加入
			</view>
		</view>
	</view>
</template>

<script>
	import {
		addAnthority,
		getRoleNameByDeptidOrDutyid
	} from "@/config/api.js"
	export default {
		data() {
			return {
				companydata: null,
				username: '',
				phone: '',
				rolelist: [],
				roleidx: 0,
				formid: ''
			}
		},
		onLoad(props) {
			this.companydata = JSON.parse(decodeURIComponent(props.data))
			this.formid = props.formid
			this.phone = uni.getStorageSync("tel")
			this.username = uni.getStorageSync("name")
			console.log(this.companydata)
			this.getrolelist()
		},
		components: {},
		onShow() {},
		methods: {
			checkclick(idx) {
				this.rolelist[idx].selectflg = !this.rolelist[idx].selectflg
			},
			//确认加入
			save() {
				let selectedrole = []
				this.rolelist.map(item => {
					if (item.selectflg) {
						selectedrole.push(item.id)
					}
				})
				if (!selectedrole.length) {
					uni.showToast({
						title: '至少选择一个身份',
						icon: "none"
					})
					return
				}
				addAnthority({
					id: this.companydata.id,
					username: this.username,
					orgcode: this.companydata.orgcode,
					roleid: selectedrole
				}).then(res => {
					if (res.data.code == 0) {
						uni.showToast({
							title: '提交成功'
						})
						setTimeout(() => {
							uni.reLaunch({
								url: '/pages/home/index'
							})
						}, 2000)
					}
				})
			},
			//选择人员
			roleselect(idx) {
				this.roleidx = idx
			},
			//获取人员列表
			getrolelist() {
				getRoleNameByDeptidOrDutyid({
					orgcode: this.companydata.orgcode,
					deptid: this.companydata.id
				}).then(res => {
					if (res.data.code == 0) {
						this.rolelist = res.data.data
						this.rolelist.forEach(item => {
							item.selectflg = false
						})
					}
				})
			}
		}
	}
</script>

<style lang="less">
	page {
		background: #f5f5f5;
	}

	.confirmCompany {
		overflow-y: auto;

		.card {
			margin: 32rpx;
			background: #fff;
			margin-bottom: 20rpx;
			padding: 20rpx 40rpx;
			border-radius: 20rpx;

			.title {
				margin-bottom: 20rpx;
				position: relative;

				&::before {
					content: "";
					display: block;
					width: 6rpx;
					height: 20rpx;
					position: absolute;
					top: 8rpx;
					left: -14rpx;
					background: #3D71E7;
				}
			}

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

			.field-title {
				margin-right: 30rpx;
				white-space: nowrap;
			}

			.field-item {
				margin-bottom: 20rpx;
			}
		}

		.main-text {
			color: #000;
			font-size: 30rpx;
		}

		.sub-text {
			font-size: 22rpx;
			color: #999;
		}

		.type-text {
			margin-left: 30rpx;
			border: 1px solid #eee;
			padding: 6rpx 10rpx;
			color: #999;
			border-radius: 16rpx;
		}

		.foot {
			position: fixed;
			bottom: 40rpx;
			left: 0;
			width: 100%;
			z-index: 99;

			.cancel-btn {
				width: 25%;
				text-align: center;
				color: #3D71E7;
				background: #E1EAFF;
				margin-right: 4%;
				margin-left: 3%;
				border-radius: 40rpx;
				height: 80rpx;
				line-height: 80rpx;
			}

			.confirm-btn {
				width: 65%;
				text-align: center;
				color: #fff;
				background: #3D71E7;
				border-radius: 40rpx;
				height: 80rpx;
				line-height: 80rpx;
			}
		}

		.field-item {
			margin-bottom: 20rpx;
		}

		.field-title {
			font-size: 26rpx;
			margin-right: 10rpx;
		}
	}
</style>
