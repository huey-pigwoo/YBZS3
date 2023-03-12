<template>
	<view class="content detail">
		<view v-for="(item,index) in formdata" :key="index" class="form-itemblock">
			<view v-if='item.title' class="block-title">
				{{item.title}}
			</view>
			<view v-if='item.cardtype ==3' class="media-box">
				<swiper style="width: 100%;" autoplay>
					<swiper-item v-for="(jtem, jdx) in item.data" :key="jdx" @click="swiperclick(index, jdx)">
						<image @click="preview(jtem)" v-if="jtem.type=='image'" style="width: 100%;height: 100%;"
							mode="aspectFill" :src="jtem.path"></image>
						<video v-else="item.type == 'video'" style="width: 100%;height: 100%;" :src="jtem.path"></video>
					</swiper-item>
				</swiper>
			</view>
			<view v-if='item.cardtype ==2' class="mode2-box">
				<view class="mode2-item" v-for="(jtem,jndex) in item.data" :key="jndex">
					<view class="flex">
						<view class="name">
							{{jtem.name}}
						</view>
						<view class="value">
							{{jtem.value || ''}}
						</view>
					</view>
				</view>
			</view>
			<view v-if='item.cardtype ==1' class="">
				<card1 :data='item.data'></card1>
			</view>
		</view>
		<view v-if="btnlist.length" class="foot flex-center">
			<view class="btn-item" @click="btnclick(item)" v-for="(item,index) in btnlist" :key="index">
				{{item.controlname}}
			</view>
		</view>
		<view v-if="cusdialogflg" class="mengban"></view>
		<view v-if="cusdialogflg" class="cusdialog">
			<view class="cusdialog-title">
				{{cusdialog_title}}
			</view>
			<view class="cusdialog-info">
				<input v-model="checktext" type="text" maxlength="60">
			</view>
			<view class="cusdialog-foot flex-align-center">
				<view @click="cancel" class="cancel-btn foot-btn">
					取消
				</view>
				<view @click="confirm()" class="confirm-btn foot-btn">
					确认
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import {
		getPageConfig,
		getPageButtons,
		saveFormDataCheck,
		getFormDataInfoByOnetimeId,
		saveYijiaoQueren
	} from '@/config/api.js';
	import card1 from '@/components/listcard/card1.vue'
	import {
		getLocation
	} from '../../utils/location';
	export default {
		data() {
			return {
				formid: '',
				formdata: [],
				btnlist: [],
				onetimeid: "",
				cusdialog_title: '',
				cusdialogflg: false,
				checktext: '',
				state: 1,
				shenhestateid: ''
			};
		},
		onLoad(props) {
			this.formid = props.formid;
			this.onetimeid = props.onetimeid
			this.pageid = props.pageid
			console.log(this.pageid)
			getPageButtons({
				pageid: this.pageid,
				formid: props.formid,
				id: props.onetimeid
			}).then(res => {
				if (res.data.code == 0) {
					this.btnlist = res.data.data
				}
			})
			uni.setNavigationBarTitle({
				title: props.pagetitle
			})
			getFormDataInfoByOnetimeId({
				id: this.onetimeid,
				formid: this.formid
			}).then(res => {
				if (res.data.code == 0) {
					this.formdata = res.data.data
				}
			})
		},
		onShow() {
			getLocation()
		},
		components: {
			card1,
		},
		methods: {
			//预览
			preview(data) {
				let urls = [];
				urls.push(data.path);
				console.log(urls);
				uni.previewImage({
					urls,
					indicator: 'none'
				});
			},
			//点击页面底部按钮
			btnclick(data) {
				//点击之后弹框
				if (data.clickedtype) {

				}
				//点击之后保存表单，并且跳转
				else {
					this.controleng = data.controleng
					if (data.controleng == 'JianYiZhengChang') {
						let arr = this.getparams()
						if (!arr[0].data.json.data.xianchangyingxiang.value.path) {
							uni.showToast({
								title: '至少拍一张照片',
								icon: 'none'
							})
							return
						}
						saveForm(arr).then((res) => {
							if (res.data.code == 0) {
								uni.navigateTo({
									url: data.clickedurl + '&relationid=' + res.data.data[0]
								})

							}
						})
					} else if (data.controleng == 'add') {
						let arr = this.getparams()
						saveForm(arr).then((res) => {
							if (res.data.code == 0) {
								uni.removeStorage({
									key: 'selectcode'
								})
								uni.navigateBack({
									delta: 2
								})
							}
						})
					} else if (data.controleng == 'checkNotOk') {
						this.cusdialog_title = '不通过原因'
						this.shenhestateid = 3
						this.cancel()
						// saveFormDataCheck({
						// 	dataid: this.onetimeid,
						// 	formid: this.formid,
						// 	shenhestateid: 3,
						// 	checktext: ''
						// }).then((res) => {
						// 	if (res.data.code == 0) {
						// 		uni.navigateBack()
						// 	}
						// })
					} else if (data.controleng == 'checkOk') {
						this.cusdialog_title = '备注说明'
						this.shenhestateid = 2
						this.cancel()
						// saveFormDataCheck({
						// 	dataid: this.onetimeid,
						// 	formid: this.formid,
						// 	shenhestateid: 2,
						// 	checktext: ''
						// }).then((res) => {
						// 	if (res.data.code == 0) {
						// 		uni.navigateBack()
						// 	}
						// })
					} else if (data.controleng == 'refuse') {
						this.cusdialog_title = '拒绝原因'
						this.state = 0
						this.cancel()
					} else if (data.controleng == 'agree') {
						this.cusdialog_title = '备注说明'
						this.cancel()
						this.state = 1
					}
				}
			},
			swiperclick() {

			},
			//取消
			cancel() {
				this.cusdialogflg = !this.cusdialogflg
			},
			//确认通过，或者拒绝通过、
			confirm() {
				if (this.controleng == 'refuse' || this.controleng == 'agree') {
					if (this.controleng == 'refuse' && !this.checktext) {
						uni.showToast({
							title: '原因不能为空',
							icon: 'none'
						})
						return
					}
					saveYijiaoQueren({
						dataid: this.onetimeid,
						formid: this.formid,
						state: this.state,
						checktext: this.checktext
					}).then((res) => {
						if (res.data.code == 0) {
							uni.navigateBack()
						}
					})
				} else if (this.controleng == 'checkOk' || this.controleng == 'checkNotOk') {
					if (this.controleng == 'checkNotOk' && !this.checktext) {
						uni.showToast({
							title: '原因不能为空',
							icon: 'none'
						})
						return
					}
					saveFormDataCheck({
						dataid: this.onetimeid,
						formid: this.formid,
						shenhestateid: this.shenhestateid,
						checktext: this.checktext
					}).then((res) => {
						if (res.data.code == 0) {
							uni.navigateBack()
						}
					})
				}
			}
		}
	};
</script>

<style lang="less">
	page {
		background: #f5f5f5;
	}

	.detail {
		padding: 20rpx 20rpx 180rpx;

		.form-itemblock {
			padding: 20rpx;
			background: #fff;
			margin-bottom: 40rpx;
			border-radius: 20rpx;
			position: relative;

			.mode2-box {
				.mode2-item {
					font-size: 30rpx;
					margin-bottom: 20rpx;

					.name {
						// width: 120rpx;
						margin-right: 40rpx;
					}
				}
			}

			.deleteicon {
				position: absolute;
				right: 20rpx;
				top: 20rpx;
				color: red;
				width: 40rpx;
				height: 40rpx;
				z-index: 99;
			}

			.block-title {
				color: #009688;
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
					background: #009688;
				}
			}

			.fields-item {
				margin-bottom: 20rpx;
				width: 100%;

				.detail {
					flex: 1;

				}

				&:last-child {
					margin-bottom: 0;
				}

				.fields-name {
					margin-right: 16rpx;
					flex-shrink: 0;
					min-width: 80rpx;
				}

				.fields-value {
					border: 1px solid rgba(0, 150, 136, 0.3);
					padding: 0 10rpx;
				}

				.msgbtn {
					color: #009688;
				}

				.noimg-box {
					width: 100%;
					height: 200rpx;
					border: 1px dashed #009688;
					color: #009688;
				}

				.noitem-box {
					width: 100%;
					height: 80rpx;
					border: 1px dashed #009688;
					color: #009688;
				}

				.u-swiper {
					flex: 1;
				}

				.linkbox-item {
					flex: 1;
				}

				.radio-box {
					width: 100%;

					.radio-item {
						border: 1px solid #009688;
						padding: 20rpx;

						.radio-itemname {
							margin-right: 20rpx;
						}

						.radio-nochecked {
							width: 30rpx;
							height: 30rpx;
							background: url('../../static/imgs/nochecked.png');
							background-size: 100% 100%;
						}

						.radio-checked {
							width: 30rpx;
							height: 30rpx;
							background: url('../../static/imgs/checked.png');
							background-size: 100% 100%;
						}
					}
				}
			}
		}

		.foot {
			position: fixed;
			height: 160rpx;
			width: 100%;
			z-index: 99;
			left: 0;
			bottom: 0;

			.btn-item {
				flex: 1;
				height: 80rpx;
				line-height: 80rpx;
				color: #fff;
				background: #009688;
				border-radius: 40rpx;
				text-align: center;
				margin: 0 40rpx;
			}
		}

		.mengban {
			background: rgba(#000, 0.3);
			position: fixed;
			top: 0;
			left: 0;
			height: 100vh;
			width: 100%;
			z-index: 100;
		}

		.cusdialog {
			position: fixed;
			top: 20%;
			left: 4%;
			width: 92%;
			z-index: 999;
			background: #fff;

			.cusdialog-title {
				padding: 20rpx;
				font-size: 30rpx;
			}

			.cusdialog-info {
				padding: 20rpx;
				margin: 20rpx 0;
			}

			.cusdialog-foot {
				height: 80rpx;

				.foot-btn {
					width: 50%;
					height: 100%;
					text-align: center;
					line-height: 80rpx;
				}

				.cancel-btn {
					background: #eee;
					border-right: 1px solid #eee;
				}

				.confirm-btn {
					background: #009688;
				}
			}
		}
	}
</style>
