<template>
	<view class="confirmCompany">
		<view class="form-itemblock" style="margin-bottom: 20rpx;">
			<view class="block-title">
				单位信息
			</view>
					<view class="list-item">
					<view class="left">
						<image :src="companydata.pic" mode="" ></image>
						<!-- <image src="/static/imgs/title-icon.png" mode="" ></image> -->
					</view>
					<view class="right">
						<view class="f1">{{companydata.f1}}</view>
						<view class="f2">{{companydata.f2}}</view>
						<Tag
							v-for="(it,index) in companydata.f3" 
							:status="it.key" 
							:key="it.value"
							:value="it.value" 
						/>
						<view class="f4-group">
							<view class="f4">{{companydata.f4[0].value}}</view>
							<view class="f4">{{companydata.f4[1].value}}</view>
						</view>
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
									:checked="item.selectflg" color="#3d71e7" />{{item.label}}
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
					<text style="opacity: 0;">*</text>手机
				</view>
<!-- 				<input v-if="!disabledEdit" v-model="phone" class="field-input" style="flex: 1;" type="text"
					placeholder="请输入添加人手机号"> -->
				<view  class="displayEdit">{{phone}}</view>
			</view>
		</view>
		<view class="foot flex">
			<view class="cancel-btn" @click="back">
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
	import {
		addCompanyCardInfo,
		getCompanyPostList,
		addNewBusinessPeople
	} from "@/config/services.js"
	import Tag from '@/components/Tag';
	export default {
		data() {
			return {
				companydata: null,
				compantId: null,
				username: '',
				phone: '',
				rolelist: [
					{ label: '管理员', value: '1', selectflg: false },
					{ label: '技术人员', value: '2', selectflg: false },
					{ label: '法人', value: '3', selectflg: false },
					{ label: '成员', value: '4', selectflg: false },
				],
				choosePostList: [],
				roleidx: 0,
				formid: '',
				disabledEdit: false
			}
		},
		onLoad(props) {
			this.compantId = props.compantId
			this.phone = uni.getStorageSync("phone")
			this.username = uni.getStorageSync("name")
			addCompanyCardInfo(props.compantId).then(res => 
			{
				this.companydata = res.data.data.companyVO.records[0];
				console.log(res.data.data.companyVO.records[0])
			}
			)
			getCompanyPostList().then(res => console.log('岗位信息',res.data))
		},
		components: {
			Tag
		},
		onShow() {},
		methods: {
			checkclick(idx) {
				this.rolelist[idx].selectflg = !this.rolelist[idx].selectflg
				this.choosePostList = this.rolelist.filter(item => item.selectflg===true).map(item => Number(item.value))
			},
			//确认加入
			save() {
				if (!this.choosePostList.length) {
					uni.showToast({
						title: '至少选择一个身份',
						icon: "none"
					})
					return
				};
				const requestParams = {
					companyObjectId: this.compantId,
					postList: this.choosePostList,
					userName: this.username ,
					phone: this.phone
				};
				
				addNewBusinessPeople(requestParams)
					.then(res => {
						if(res.data.code) {
							uni.reLaunch({
								url: '/pages/home/index'
							})
						}
					})
			},
			back(){
				uni.navigateBack()
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
		
		.list-item {
			background: #fff;
			border-radius: 20rpx;
			padding: 32rpx 0;
			margin: 0 32rpx;
			margin-bottom: 20rpx;
			display: flex;
		
		.left {
			width: 200rpx;
			height: 200rpx;
			border-radius: 10rpx;
			border: 1px solid red;
		}
		.right{
			padding-left: 20rpx;
			
			.f1 {
				font-size: 32rpx;
				font-weight: bold;
			}
			
			.f2,
			.f4 {
				font-size: 24rpx;
				color: rgba(154, 154, 154, 1);
			}
		}
		}
	}
</style>
