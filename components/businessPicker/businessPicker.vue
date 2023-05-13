<template>
	<view class="content">
		<picker 
			mode="multiSelector" 
			:value="value" 
			:range="arrList"
			@columnchange="businessColChange"
		>
			<view>{{`${first[value[0]]} , ${second[value[1]]}, ${thrid[value[2]]}`}}</view>
		</picker>
	</view>
</template>

<script>
	import { getPermisionBusiness } from "@/config/services.js"
	export default {
		data() {
			return {
				businessData: [],
				originfirBusData: [],
				originSecBusData: [],
				originThrBusData: [],
				value:[0,0,0],
				addressText: ['请选择','请选择','请选择'],
				hanldeAddressList: [['请选择','1','asd'],['请选择','asd','fsd'],['请选择','fsfd','sdf']],
				first: ['请选择'],
				second: ['请选择'],
				thrid: ['请选择'],
				arrList: [],
				chooseAddressCode: [0,0,0]
			}
		},
		mounted() {
			this.getBusinessList()
		},
		props: ['type'],
		methods: {
			getBusinessList(){
				getPermisionBusiness().then(res => {
					if(res.data.code == 0) {
						console.log('成功获取得到的授权业务',res.data.data)
						this.businessData = res.data.data
						this.originfirBusData = res.data.data
						this.first = ['请选择',...this.originfirBusData.map(item => item.name)]
						this.originSecBusData = this.businessData[0].child
						this.second =  ['请选择',...this.businessData[0].child.map(item => item.name)]
						this.arrList = [this.first,this.second,this.thrid]
					}
				})
				
			},
			checkInfo(){
				console.log(this.value)
			},
			businessColChange(e){
				if(e.detail.column === 0) {
					this.value = [e.detail.value,0,0]
				}
				if(e.detail.column === 1) {
					this.value = [this.value[0],e.detail.value,0]
					if(e.detail.value !== 0 ) {
						const thrBusinessList = this.originSecBusData[this.chooseAddressCode[1]].child.map(item => item.name)
						this.originThrBusData = this.originSecBusData[e.detail.value-1].child
						this.thrid = ['请选择',...thrBusinessList]
						console.log(['请选择',...thrBusinessList])
						this.arrList = [this.arrList[0],this.arrList[1],this.thrid]
					}
				}
				if(e.detail.column === 2) {
					this.value = [this.value[0],this.value[1],e.detail.value]
				}
			},
		},
		watch: {
			value(){
				console.log(this.type)
				const business1 = this.businessData[this.value[0]-1]
				const business2 = this.originSecBusData[this.value[1]-1]
				const business3 = this.originThrBusData[this.value[1]-1]
				this.$emit("onChangeBusiness",[business1,business2,business3])
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
