<template>
	<view class="container detail">
		<view v-if="imglist.length" class="form-itemblock">
			<view class="block-title">现场影像</view>
			<view style="position: relative;width: 100%;">
				<swiper :current="imgidx" @change="swiperChange" autoplay circular style="width: 100%;height: 320rpx;">
					<swiper-item v-for="(item, index) in imglist" :key="index" @click="preview(index)">
						<image style="width: 100%;height: 100%;" mode="aspectFill" :src="item.path"></image>
					</swiper-item>
				</swiper>
				<view class="imgnum-info">{{ imgidx + 1 }}/{{ imglist.length }}</view>
			</view>
		</view>
		<view v-if="danweiinfo" class="form-itemblock">
			<view class="block-title">{{ formtitle }}单位</view>
			<view v-if="danweiinfo.wenhao" class="flex-align-center">
				<text class="field-title">文号</text>
				<view class="field-value">{{ danweiinfo.wenhao }}</view>
			</view>
			<view style="margin-top: 20rpx;" class="flex-align-center">
				<text class="field-title">单位</text>
				<view class="field-value">{{ danweiinfo.danwei }}</view>
			</view>
			<view style="margin-top: 20rpx;" class="flex-align-center">
				<text class="field-title">姓名</text>
				<view class="field-value">{{ danweiinfo.name }}</view>
			</view>
			<view style="margin-top: 20rpx;" class="flex-align-center">
				<text class="field-title">电话</text>
				<view class="field-value">{{ danweiinfo.phone }}</view>
			</view>
		</view>
		<view v-if="danweiinfo && danweiinfo.jieshoudanwei_name" class="form-itemblock">
			<view class="block-title">接收单位</view>
			<view v-if="danweiinfo.wenhao" class="flex-align-center">
				<text class="field-title">文号</text>
				<view class="field-value">{{ danweiinfo.wenhao }}</view>
			</view>
			<view style="margin-top: 20rpx;" class="flex-align-center">
				<text class="field-title">单位</text>
				<view class="field-value">{{ danweiinfo.danwei }}</view>
			</view>
			<view style="margin-top: 20rpx;" class="flex-align-center">
				<text class="field-title">姓名</text>
				<view class="field-value">{{ danweiinfo.name }}</view>
			</view>
			<view style="margin-top: 20rpx;" class="flex-align-center">
				<text class="field-title">电话</text>
				<view class="field-value">{{ danweiinfo.phone }}</view>
			</view>
		</view>
		<block v-for="(item, index) in datalist" :key="index">
			<view class="form-itemblock">
				<view class="block-title">{{ formtitle }}动物</view>
				<view v-if="item.animalinfo.f1" class="flex-align-center">
					<view class="animalcard-img"><image :src="item.animalinfo.pic"></image></view>
					<view style="flex: 1;">
						<view class="flex-between-center">
							<view class="animalcard-name">{{ item.animalinfo.f1 }}</view>
							<view class="animalcard-type">{{ item.animalinfo.f2 }}</view>
						</view>
						<view class="sub-text">{{ item.animalinfo.f3 }}</view>
						<view class="sub-text">{{ item.animalinfo.f4 }}</view>
					</view>
				</view>
				<view v-else>{{ item.animalinfo.name }}</view>
			</view>
			<view class="form-itemblock">
				<view class="block-title">{{ formtitle }}记录</view>
				<view>
					<view v-if="item.shuliang" class="numinfo flex">
						<text class="field-title">数量</text>
						<view class="field-value">{{ item.shuliang }}</view>
					</view>
					<view class="flex-align-center" v-if="item.num1 || item.num2 || item.num3">
						<text class="field-title">数量</text>
						<view class="field-value">{{ Number(item.num1) + Number(item.num2) + Number(item.num3) }}</view>
					</view>
					<view class="flex-align-center" style="margin-top: 20rpx;" v-if="item.num1">
						<text class="field-title">收容</text>
						<view class="field-value">{{ item.num1 }}</view>
					</view>
					<view class="flex-align-center" style="margin-top: 20rpx;" v-if="item.num2">
						<text class="field-title">放归</text>
						<view class="field-value">{{ item.num2 }}</view>
					</view>
					<view class="flex-align-center" style="margin-top: 20rpx;" v-if="item.num3">
						<text class="field-title">死亡</text>
						<view class="field-value">{{ item.num3 }}</view>
					</view>
					<view v-if="item.radiochecked" style="margin-top: 20rpx;" class="flex-align-center">
						<text class="field-title">处理方式</text>
						<view class="field-value">{{ item.radiochecked }}</view>
					</view>
					<view v-if="item.tips" style="margin-top: 20rpx;" class="flex-align-center">
						<text class="field-title">备注</text>
						<view class="field-value">{{ item.tips }}</view>
					</view>
				</view>
			</view>
		</block>
		<view v-if="btnshowflg" class="form-itemblock">
			<view class="block-title">审批意见</view>
			<view class="textarea-box"><textarea :placeholder="placeholder" class="textarea" v-model="checktext"></textarea></view>
		</view>
		<view v-if="btnshowflg" class="foot flex">
			<view @click="btnclick(index)" v-for="(item, index) in btnlist" :key="index" :class="index == 0 ? 'cancel-btn' : 'confirm-btn'">{{ item.name }}</view>
		</view>
	</view>
</template>

<script>
import { getFormDataInfoByOnetimeId, saveFormDataCheck, saveYijiaoQueren } from '@/config/api.js';
import { getLocation } from '../../utils/location';
export default {
	data() {
		return {
			imglist: [],
			imgidx: 0,
			formtitle: '',
			datalist: [],
			danweiinfo: null,
			yewuid: '',
			btnshowflg: false,
			btnlist: [],
			checktext: '',
			placeholder: '请输入审批意见',
			formid: ''
		};
	},
	onLoad(props) {
		if (props.formid) {
			this.formid = props.formid;
		}
		this.onetimeid = props.onetimeid;
		this.yewuid = props.yewuid;
		//审核
		if (props.yewuid == 80016) {
			this.btnlist = [
				{
					name: '不通过'
				},
				{
					name: '审核通过'
				}
			];
		} else if (props.yewuid == 80007) {
			this.btnlist = [
				{
					name: '拒绝接收'
				},
				{
					name: '确认接收'
				}
			];
		}
		if (props.btnshowflg) {
			this.btnshowflg = true;
		}
		uni.setNavigationBarTitle({
			title: props.pagetitle || '详情'
		});
		getFormDataInfoByOnetimeId({
			id: this.onetimeid,
			formid: this.formid
		}).then(res => {
			if (res.data.code == 0) {
				this.imglist = JSON.parse(res.data.data.sourcejson).imglist;
				this.datalist = JSON.parse(res.data.data.sourcejson).datalist;
				this.danweiinfo = JSON.parse(res.data.data.sourcejson).danweiinfo;
				this.formtitle = JSON.parse(res.data.data.sourcejson).formtitle;
				this.datalist.forEach(item => {
					if (item.radio) {
						item.radio.map(jtem => {
							if (jtem.checked) {
								item.radiochecked = jtem.name;
							}
						});
					}
				});
			}
		});
	},
	onShow() {
		getLocation();
	},
	components: {},
	methods: {
		//图片滑动
		swiperChange(e) {
			this.imgidx = e.detail.current;
		},
		//预览
		preview(current) {
			let urls = [];
			this.imglist.map(item => {
				urls.push(item.path);
			});
			uni.previewImage({
				urls,
				current
			});
		},
		btnclick(idx) {
			if (this.yewuid == 80016) {
				saveFormDataCheck({
					dataid: this.onetimeid,
					formid: this.formid,
					shenhestateid: idx == 0 ? 3 : 2,
					checktext: this.checktext
				}).then(res => {
					if (res.data.code == 0) {
						uni.navigateBack();
					}
				});
			} else if (this.yewuid == 80007) {
				saveYijiaoQueren({
					dataid: this.onetimeid,
					formid: this.formid,
					state: idx,
					checktext: this.checktext
				}).then(res => {
					if (res.data.code == 0) {
						uni.navigateBack();
					}
				});
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
	.form-itemblock {
		.textarea-box {
			background: rgba(#000, 0.04);
			padding: 20rpx;
			border-radius: 10rpx;
			height: 140rpx;
		}

		.field-title {
			width: 100rpx;
			color: #666;
		}

		.field-value {
			color: #000;
		}
	}
}
</style>
