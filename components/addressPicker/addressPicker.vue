<template>
	<view class="content">
		<picker 
			mode="multiSelector" 
			:value="value" 
			:range="arrList"
			@columnchange="addressColChange"
		>
			<view>{{`${firList[value[0]]} ,${secList[value[1]]} , ${thrList[value[2]]}`}}</view>
		</picker>
	</view>
</template>

<script>
	import { getAddressList } from "@/config/services.js"
	export default {
		data() {
			return {
				addressData: [],
				originSecArrData: [],
				originThrArrData: [],
				value:[0,0,0],
				addressText: ['请选择','请选择','请选择'],
				hanldeAddressList: [['请选择','1','asd'],['请选择','asd','fsd'],['请选择','fsfd','sdf']],
				firList: ['请选择'],
				secList: ['请选择'],
				thrList: ['请选择'],
				arrList: [],
			}
		},
		props: ['type'],
		mounted() {
			this.arrList = [this.firList,this.secList,this.thrList]
			this.getAddressList()
		},
		methods: {
			getAddressList(){
				getAddressList().then(res => {
					if(res.data.code == 0) {
						this.addressData = res.data.data
						this.firList =  ['请选择',...this.addressData.map(item => item.name)]
						this.originSecArrData = this.addressData[0].child
						this.secList =  ['请选择',...this.addressData[0].child.map(item => item.name)]
						this.arrList = [this.firList,this.secList,this.thrList]
					}
				})
			},
			addressColChange(e){
				if(e.detail.column === 0) {
					this.value = [e.detail.value,0,0]
				}
				if(e.detail.column === 1) {
					console.log('第一行选择了')
					this.value = [this.value[0],e.detail.value,0]
					if(e.detail.value !== 0 ) {
						const thrAddressList = this.addressData[0].child[e.detail.value-1].child.map(item => item.name)
						this.originThrArrData = this.originSecArrData[e.detail.value-1].child
						this.thrList = ['请选择',...thrAddressList]
						this.arrList = [this.arrList[0],this.arrList[1],this.thrList]
					}
				}
				if(e.detail.column === 2) {
					this.value = [this.value[0],this.value[1],e.detail.value]
				}
			},
		},
		watch: {
			value(){
				const state = this.addressData[this.value[0]-1]
				const city = this.originSecArrData[this.value[1]-1]
				const county = this.originThrArrData[this.value[1]-1]
				// const offerData = 
				this.$emit("onChangeAddress",[state,city,county])
				// if(this.type === 'permision') uni.setStorageSync('permisionAddress',[state,city,county])
				// else if(this.type === 'companyAddress') uni.setStorageSync('companyAddress',[state,city,county])
			}
		}
	}
</script>

<style>
	.content {
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
	}

	.logo {
		height: 200rpx;
		width: 200rpx;
		margin-top: 200rpx;
		margin-left: auto;
		margin-right: auto;
		margin-bottom: 50rpx;
	}

	.text-area {
		display: flex;
		justify-content: center;
	}

	.title {
		font-size: 36rpx;
		color: #8f8f94;
	}
</style>
