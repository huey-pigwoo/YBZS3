<template>
	<view class="quarantine">
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
		<view class="foot flex">
			<view @click="cancel" class="cancel-btn">
				异常
			</view>
			<view @click="save(true)" class="confirm-btn">
				检疫正常
			</view>
		</view>
		<modal1 @close="closemodal" v-if="modal1flg" @click="modalClick"></modal1>
	</view>
</template>

<script>
	import {
		saveForm,
		uplodurl,
		getCodeTableByFormAndField
	} from '@/config/api.js';
	import modal1 from '@/components/custommodal/modal1.vue'
	import makemedia from '@/components/makemedia/index.vue'
	import {
		getLocation
	} from '@/utils/location.js'
	export default {
		data() {
			return {
				formid: '166861587930201',
				imgidx: 0,
				imglist: [],
				modal1flg: false,
				jiuhujigou_name: '',
				jiuhujigou_code: ''
			};
		},
		onLoad(props) {
			this.getfield()
		},
		onShow() {
			getLocation()
		},
		components: {
			modal1,
			makemedia
		},
		methods: {
			//获取上传的图片
			getimg(data) {
				this.imglist = this.imglist.concat(data)
			},
			//关闭弹框
			closemodal() {
				this.modal1flg = false
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
			//取消
			cancel() {
				if (!this.imglist.length) {
					uni.showToast({
						title: '至少拍摄一张照片',
						icon: 'none'
					})
					return
				}
				this.modal1flg = true
			},
			//点击弹框内的确定按钮保存检疫异常
			modalClick() {
				this.save(false)
			},
			//确认
			save(flg) {
				if (!this.imglist.length) {
					uni.showToast({
						title: '至少拍摄一张照片',
						icon: 'none'
					})
					return
				}
				const _self = this
				let time = Date.now()
				let final_arr = []
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
								jianyizhuangtai: {
									key: '检疫状态',
									value: flg ? '正常' : '异常',
									controltype: 0
								},
								beizhu: {
									key: '备注',
									value: '',
									controltype: 0,
								},
								jiuhujigou: {
									key: '救护机构',
									value: _self.jiuhujigou_name,
									controltype: 0,
									code: _self.jiuhujigou_code
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
					sourcejson: {}
				})
				saveForm(final_arr).then(res => {
					if (res.data.code == 0) {
						if (flg) {
							uni.navigateTo({
								url: '/pages/businessform/rescue?relationid=' + res.data.data[0]
							})
						} else {
							uni.navigateBack()
						}
					}
				})
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

	.quarantine {
		padding: 20rpx 20rpx 180rpx;

		.form-itemblock {
			padding: 20rpx;
			background: #fff;
			margin-bottom: 40rpx;
			border-radius: 20rpx;
			position: relative;

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


			.noimg-box {
				width: 100%;
				height: 320rpx;
				border: 1px dashed #999;
				color: #999;

				.noimg {
					background: url('../../static/imgs/noimg.png') no-repeat;
					background-size: 100% 100%;
					width: 146rpx;
					height: 100rpx;
					margin-bottom: 20rpx;
				}
			}

			.imgnum-delete {
				background: #F8822D;
				border-radius: 40rpx;
				padding: 5rpx 30rpx;
				font-size: 22rpx;
				top: -50rpx;
				color: #fff;
				right: 20rpx;
				position: absolute;
			}

			.imgnum-add {
				background: #F8822D;
				border-radius: 40rpx;
				padding: 5rpx 30rpx;
				font-size: 22rpx;
				top: -50rpx;
				color: #fff;
				right: 140rpx;
				position: absolute;
			}

			.imgnum-info {
				position: absolute;
				bottom: 20rpx;
				right: 20rpx;
				border-radius: 40rpx;
				background: rgba(#000, 0.5);
				color: #fff;
				padding: 5rpx 20rpx;
			}

			.noitem-box {
				width: 100%;
				height: 80rpx;
				border: 1px dashed #009688;
				color: #009688;
			}
		}

		.foot {
			left: 0;
			position: fixed;
			bottom: 40rpx;
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
	}
</style>
