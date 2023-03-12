<template>
	<view class="content examinedetail">
		<view class="form-itemblock">
			<view class="block-title">
				{{title1}}
			</view>
			<view class="flex-align-center field-item">
				<view class="field-title">
					类型
				</view>
				<view class="">
					{{unitinfo.typename||''}}
				</view>
			</view>
			<view class="flex-align-center field-item">
				<view class="field-title">
					单位
				</view>
				<view class="">
					{{unitinfo.unit||''}}
				</view>
			</view>
			<view class="flex-align-center field-item">
				<view class="field-title">
					部门
				</view>
				<view class="">
					{{unitinfo.deptname||''}}
				</view>
			</view>
			<view class="flex field-item">
				<view class="field-title">
					地址
				</view>
				<view class="">
					<view class="">
						{{unitinfo.orgname||''}}
					</view>
					<view class="">
						{{unitinfo.address||''}}
					</view>
				</view>
			</view>
			<view class="flex-align-center field-item">
				<view class="field-title">
					电话
				</view>
				<view class="">
					{{unitinfo.tel||''}}
				</view>
			</view>
		</view>
		<view class="form-itemblock">
			<view class="block-title">
				{{title2}}
			</view>
			<view class="flex-align-center field-item">
				<view class="field-title">
					身份
				</view>
				<view class="">
					{{userinfo.rolename||''}}
				</view>
			</view>
			<view class="flex-align-center field-item">
				<view class="field-title">
					姓名
				</view>
				<view class="">
					{{userinfo.name||''}}
				</view>
			</view>
			<view class="flex-align-center field-item">
				<view class="field-title">
					手机
				</view>
				<view class="">
					{{userinfo.tel||''}}
				</view>
			</view>
		</view>
		<view v-if="checkflg" class="foot flex">
			<view @click="examine('0')" class="cancel-btn">
				不通过
			</view>
			<view @click="examine('1')" class="confirm-btn">
				审核通过
			</view>
		</view>
	</view>
</template>

<script>
	import bottomline from '@/components/bottomline';
	import {
		getCheckInfo,
		approvePersons
	} from '@/config/api.js';
	import card1 from '@/components/listcard/card1.vue'
	export default {
		data() {
			return {
				title1: '单位信息',
				title2: '申请人信息',
				unitinfo: null,
				userinfo: null,
				deptid: '',
				id: '',
				formid: '',
				checkflg: false
			};
		},
		components: {

		},
		onLoad(props) {
			uni.setNavigationBarTitle({
				title: '人员审核'
			})
			console.log(JSON.parse(decodeURIComponent(props.data)))
			let propsdata = JSON.parse(decodeURIComponent(props.data))
			this.formid = propsdata.formid
			this.id = propsdata.id
			this.deptid = propsdata.deptid
			this.checkflg = propsdata.checkflg == 2 ? true : false
			this.getdetail()
		},
		//触底加载
		onReachBottom() {},
		methods: {
			//获取详情数据
			getdetail() {
				getCheckInfo({
					formid: this.formid,
					deptid: this.deptid,
					id: this.id
				}).then((res) => {
					if (res.data.code == 0) {
						this.unitinfo = res.data.data.unitinfo
						this.userinfo = res.data.data.userinfo
					} else {
						uni.showToast({
							title: res.data.message,
							icon: 'none'
						})
					}
				})
			},
			//审核
			examine(type) {
				approvePersons({
					ids: this.id,
					isApproved: type
				}).then(res => {
					if (res.data.code == 0) {
						uni.showToast({
							title: '审核完成',
						})
						setTimeout(() => {
							uni.navigateBack()
						}, 1500)
					}
				})
			}
		}
	};
</script>

<style lang="less">
	page {
		background: #f5f5f5;
	}

	.examinedetail {
		overflow-y: auto;

		.form-itemblock {
			padding: 20rpx;
			background: #fff;
			margin-bottom: 40rpx;
			border-radius: 20rpx;
			position: relative;
			margin: 0 30rpx;
			margin-top: 30rpx;

			.block-title {
				color: #000;
				position: relative;
				margin-bottom: 20rpx;

				&::before {
					content: '';
					display: block;
					position: absolute;
					left: -10rpx;
					top: 8rpx;
					width: 6rpx;
					height: 24rpx;
					background: #3D71E7;
				}
			}

			.field-item {
				margin-bottom: 20rpx;
			}

			.field-title {
				min-width: 80rpx;
			}
		}

		.foot {
			position: fixed;
			bottom: 40rpx;
			width: 100%;
			left: 0;
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
	}
</style>
