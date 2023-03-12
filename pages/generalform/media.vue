<template>
	<view class="content media">
		<div class="title">图片预览</div>
		<div class="banner">
			<block v-if="activeitem">
				<video style="width: 100%;height: 100%;" v-if="activeitem.thumbTempFilePath"
					:src="activeitem.path"></video>
				<image @click="preview(activeitem)" mode="aspectFit" style="width: 100%;height: 100%;" v-else
					:src="activeitem.path"></image>
			</block>
		</div>
		<view class="media-grid flex">
			<view @click="openmedia" class="grid-item flex-column-center">
				<view class="photo-img"></view>
				<view class="photo-text">拍摄</view>
			</view>
			<view @click="mediaclick(item, index)" v-for="(item, index) in medialist" :key="index" class="grid-item">
				<view v-if="item.checked==true" class="checked-icon"></view>
				<image mode="aspectFit" style="width: 100%;height: 100%;" v-if="item.path"
					:src="item.thumbTempFilePath || item.path"></image>
			</view>
		</view>
		<view @click="confirm" class="confirm flex-center">选好了{{ `(${selectnum}/9)` }}</view>
	</view>
</template>

<script>
	import {
		uplodurl
	} from '../../config/api.js';
	import {
		getLocation
	} from '@/utils/location.js';
	export default {
		data() {
			return {
				sumnum: 9,
				activeitem: null,
				medialist: [] //图片列表
			};
		},
		onLoad(props) {
			console.log(props.selectidx)
			if (props.list && props.selectidx) {
				let list = JSON.parse(decodeURIComponent(props.list))
				list.map((item, idx) => {
					item.checked = false
					if (idx == props.selectidx) {
						item.checked = true
						this.activeitem = item
					}
					this.medialist.push(item)
				})
				// this.medialist = JSON.parse(JSON.stringify(list));
				// this.medialist = this.medialist.map((item, i) => {
				// 	item.checked = false
				// 	if (i == props.selectidx) {
				// 		item.checked = true;
				// 		this.activeitem = item;
				// 	}
				// 	return item
				// });
				console.log(this.medialist)
			}
			getLocation();
		},
		computed: {
			selectnum() {
				let num = 0;
				this.medialist.map(item => {
					if (item.checked) {
						num += 1;
					}
				});
				return num;
			}
		},
		methods: {
			confirm() {
				let _self = this;
				let arr = [];
				this.medialist.map(item => {
					if (item.checked) {
						if (item.thumbTempFilePath) {
							arr.push({
								path: item.path,
								longitude: _self.$store.state.location.longitude,
								latitude: _self.$store.state.location.latitude,
								time: item.time,
								thumbTempFilePath: item.thumbTempFilePath,
								type: 'video'
							});
						} else {
							arr.push({
								path: item.path,
								longitude: _self.$store.state.location.longitude,
								latitude: _self.$store.state.location.latitude,
								time: item.time,
								type: 'image'
							});
						}
					}
				});
				console.log(arr, '返回的值');
				uni.navigateBack();
				const eventChannel = this.getOpenerEventChannel();
				eventChannel.emit('getchoose', [...arr]);
			},
			//点击列表中的图片
			mediaclick(data, idx) {
				// this.$set(this.medialist[idx], 'checked', !this.medialist[idx].checked)
				data.checked = !data.checked
				this.activeitem = data;
				console.log(this.medialist)
			},
			openmedia() {
				const _self = this;
				uni.chooseMedia({
					success(res) {
						console.log(res);
						// uni.showLoading({
						// 	title: '请稍后'
						// })
						if (res.type == 'video') {
							res.tempFiles.map(item => {
								uni.uploadFile({
									url: uplodurl,
									filePath: item.tempFilePath,
									name: 'file',
									success(ses) {
										console.log(ses, '服务器返回结果');
										_self.medialist.push({
											path: JSON.parse(ses.data).data.dbpath,
											time: Date.now(),
											thumbTempFilePath: item.thumbTempFilePath,
											checked: false
										});
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
										console.log(ses, '服务器返回结果');
										_self.medialist.push({
											path: JSON.parse(ses.data).data.dbpath,
											time: Date.now(),
											checked: false
										});
									}
								});
							});
						}
					}
				});
			},
			//预览
			preview(data) {
				let urls = [];
				urls.push(data.path);
				console.log(urls);
				uni.previewImage({
					urls,
					indicator: 'none'
				});
			}
		}
	};
</script>

<style lang="less">
	page {
		background: #f5f5f5;
	}

	.media {
		padding: 30rpx;

		.title {
			color: #009688;
			position: relative;
			margin-bottom: 20rpx;

			&::before {
				content: '';
				display: block;
				width: 4rpx;
				height: 24rpx;
				background: #009688;
				left: -10rpx;
				top: 8rpx;
				position: absolute;
			}
		}

		.banner {
			width: 100%;
			height: 320rpx;
			background: #ccc;
			margin-bottom: 20rpx;
		}

		.confirm {
			position: fixed;
			bottom: 100rpx;
			width: 90%;
			left: 5%;
			height: 100rpx;
			background: #009688;
			color: #fff;
		}

		.media-grid {
			flex-wrap: wrap;

			.grid-item {
				width: 25%;
				flex-shrink: 0;
				padding: 2rpx;
				background: #fff;
				height: 180rpx;
				border: 2px solid #f5f5f5;
				margin-bottom: 2px;
				position: relative;

				&:first-child {
					border: 1px dashed #009688;
				}

				.photo-img {
					width: 40rpx;
					height: 40rpx;
					background: url('/static/imgs/photo.png');
					background-size: 100% 100%;
					margin-bottom: 8rpx;
				}

				.photo-text {
					color: #009688;
				}

				.checked-icon {
					position: absolute;
					top: 6rpx;
					right: 6rpx;
					background: url('../../static/imgs/checked.png');
					background-size: 100% 100%;
					width: 30rpx;
					height: 30rpx;
				}
			}
		}
	}
</style>
