<template>
	<view class="qualifications container">
		<view class="form-itemblock">
			<view class="block-title">
				资质认证
			</view>
			<view style="position: relative;width: 100%;">
				<makemedia @deleteimg='deleteimg()' @swiperclick='swiperclick()' :imgidx='imgidx' @getchoose="getimg"
					:imglist='imglist'>
				</makemedia>
			</view>
		</view>
		<view class="form-itemblock">
			<view class="block-title">
				资质证明信息
			</view>
			<view class="flex-align-center field-item">
				<view class="field-title">
					<text style="color: #FF0000;">*</text>证书名称
				</view>
				<input disabled class="field-input" v-model="list[0].name" style="flex: 1;" type="text"
					placeholder="请输入完整名称">
			</view>
			<view class="flex-align-center field-item">
				<view class="field-title">
					<text style="color: #FF0000;">*</text>证书编号
				</view>
				<input v-model="number" class="field-input" style="flex: 1;" type="text" placeholder="请输入证书编号">
			</view>
			<view class="flex-align-center field-item">
				<view class="field-title">
					<text style="color: #FF0000;">*</text>证书等级
				</view>
				<input v-model="level" class="field-input" style="flex: 1;" type="number" placeholder="请输入证书等级">
			</view>
		</view>
		<view class="foot flex">
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
		getDeptByPersonid,
		getWaitingQualification,
		saveUserQualification
	} from '@/config/api.js'
	import makemedia from "@/components/makemedia/index.vue"
	export default {
		data() {
			return {
				list: [],
				activeidx: 0,
				imglist: [],
				level: 1,
				number: ''
			}
		},
		onLoad() {
			getWaitingQualification().then(res => {
				if (res.data.code == 0) {
					this.list = res.data.data
				}
			})
		},
		components: {
			makemedia
		},
		methods: {
			//删除图片
			deleteimg(imgidx) {
				this.imglist.splice(imgidx, 1)
			},
			//获取上传的图片
			getimg(data) {
				this.imglist = this.imglist.concat(data)
			},
			cancel() {
				uni.navigateBack()
			},
			save() {
				let arr = []
				this.imglist.map(item => {
					arr.push(item.path)
				})
				console.log(arr)
				if (!this.imglist.length) {
					uni.showToast({
						title: "图片不能为空",
						icon: 'none'
					})
					return
				}
				if (!this.number) {
					uni.showToast({
						title: "证书编号名称",
						icon: 'none'
					})
					return
				}
				if (!this.level) {
					uni.showToast({
						title: "证书编号名称",
						icon: 'none'
					})
					return
				}
				saveUserQualification({
					pic: arr.join('|'),
					name: this.list[0].name,
					no: this.number,
					typeid: 1,
					level: 1
				}).then(res => {
					if (res.data.code == 0) {
						uni.showToast({
							title: '保存成功'
						})
						setTimeout(() => {
							uni.navigateBack()
						}, 1500)
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

	.qualifications {
		.field-item {
			margin-bottom: 20rpx;
		}

		.field-title {
			font-size: 26rpx;
			font-weight: bold;
			margin-right: 10rpx;
		}
	}
</style>
