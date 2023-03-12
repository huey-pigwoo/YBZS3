<template>
	<view class="makemedia">
		<view v-if="imglist.length == 0" class="noimg-box flex-column-center" @click="openmedia()">
			<view class="noimg">
			</view>
			<view class="">
				拍摄/上传图片
			</view>
		</view>
		<swiper :current="imgidx" @change='swiperChange' circular v-else style="width: 100%;height: 320rpx;">
			<swiper-item v-for="(item, index) in imglist" :key="index">
				<image @click="preview(index)" v-if="item.type=='image'" style="width: 100%;height: 100%;"
					mode="aspectFill" :src="item.path">
				</image>
				<video v-else style="width: 100%;height: 100%;" :src="item.path"></video>
				<view v-if='item.address||item.curtimeformat' class="img-address">
					<view class="">
						{{item.address}}
					</view>
					<view class="">
						{{item.curtimeformat}}
					</view>
				</view>
			</swiper-item>
		</swiper>
		<view @click="openmedia()" v-if="imglist.length" class="imgnum-add">
			添加
		</view>
		<view @click="deleteimg()" v-if="imglist.length" class="imgnum-delete">
			删除
		</view>
		<view v-if="imglist.length" class="imgnum-info">
			{{imgidx+1}}/{{imglist.length}}
		</view>
	</view>
</template>

<script>
	import {
		uplodurl,
		getAddrAndCurTime
	} from '@/config/api.js'
	import {
		getLocation
	} from '@/utils/location.js'
	export default {
		name: 'dialog',
		data() {
			return {
				imgidx: 0
			};
		},
		props: ['imglist'],
		watch: {
			imglist(val1, val2) {
				console.log(val1, val2)
			}
		},
		methods: {
			async openmedia() {
				const _self = this;
				uni.chooseMedia({
					success(res) {
						getLocation()
						uni.showLoading({
							title: '',
							mask: true
						})
						let arr = []
						let idx = 0
						let address = ''
						let curtimeformat = ''
						getAddrAndCurTime({
							x: _self.$store.state.location.longitude,
							y: _self.$store.state.location.latitude
						}).then(tes => {
							if (tes.data.code == 0) {
								address = tes.data.data.address
								curtimeformat = tes.data.data.curtimeformat
							}

							if (res.type == 'video') {
								res.tempFiles.map(item => {
									uni.uploadFile({
										url: uplodurl,
										filePath: item.tempFilePath,
										name: 'file',
										success(ses) {
											idx += 1
											arr.push({
												path: JSON.parse(ses.data).data
													.dbpath,
												time: Date.now(),
												thumbTempFilePath: item
													.thumbTempFilePath,
												type: "video",
												address,
												curtimeformat
											});
											if (idx == res.tempFiles.length) {
												uni.hideLoading()
												_self.$emit('getchoose', [...arr])
											}
										}
									});
								});
							} else if (res.type == 'image') {
								res.tempFiles.map(item => {
									uni.uploadFile({
										url: uplodurl,
										filePath: item.tempFilePath,
										name: 'file',
										success(ses) {
											idx += 1
											arr.push({
												path: JSON.parse(ses.data).data
													.dbpath,
												time: Date.now(),
												type: "image",
												address,
												curtimeformat
											});
											if (idx == res.tempFiles.length) {
												uni.hideLoading()
												_self.$emit('getchoose', [...arr])
											}
										}
									});
								});
							}
						})
					}
				});
			},
			//预览
			preview(current) {
				let urls = [];
				this.imglist.map(item => {
					urls.push(item.path)
				})
				uni.previewImage({
					current,
					urls,
					indicator: 'none'
				});
			},
			deleteimg() {
				this.$emit("deleteimg", this.imgidx)
				this.imgidx = 0
			},
			//图片滑动
			swiperChange(e) {
				this.imgidx = e.detail.current
			},
		}
	};
</script>

<style lang="less">
	.makemedia {
		.img-address {
			position: absolute;
			left: 20rpx;
			bottom: 20rpx;
			color: #fff;
			max-width: 70%;
		}
	}
</style>
