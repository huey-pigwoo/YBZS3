<template>
	<view>
<!-- 		<Picker class="addressPicker" mode="multiSelector" @change="onChange" @columnchange="addressColChange"
			:range="arrList" :value="value">
			<View class="picker">
				<Text :class="region=='请选择区划' ? 'txtRegionplaceholder' : 'txtRegion'"> {{region}} </Text>
			</View>
		</Picker> -->

			<picker 
				mode="multiSelector" 
				:value="value" 
				:range="arrList"
				@columnchange="addressColChange"
			>
				<view>{{`${firList[value[0]]} ,${secList[value[1]]} , ${thrList[value[2]]}`}}</view>
			</picker>
			<button @click="getaddressInfo">查看数据</button>

	</view>
</template>

<script>
	// import {
	// 	getAddressList
	// } from "../../config/api.js";
	
	import {
		getAddressList
	} from '@/config/services.js'
	let firstCityItem = "四川省";
	let firstCountyItem = "全市";
	let firstTownItem = "全县";
	export default {
		data() {
			return {
				region: "请选择区划",
				range: [],
				value: [0, 0, 0],
				orgcode: uni.getStorageSync('orgcode'),
				addressData: [],
				originSecArrData: [],
				originThrArrData: [],
				addressText: ['请选择','请选择','请选择'],
				firList: ['请选择'],
				secList: ['请选择'],
				thrList: ['请选择'],
				arrList: [],
			}
		},
		// props: ['orgname'],
		mounted() {
			// this.region = this.orgname || "请选择区划"
			this.arrList = [this.firList,this.secList,this.thrList]
			this.getAddressList()
		},
		watch: {
			// orgname(val) {
			// 	this.region = val
			// },
			value(){
				console.log(value.some(()=>{return item=0}))
			}
		},
		methods: {
			getAddressList(){
				getAddressList().then(res => {
					console.log('newAddressPicker',res.code.code)
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
			getaddressInfo(){
				console.log([
					this.addressData[--this.value[0]],
					this.originSecArrData[--this.value[1]],
					this.originThrArrData[--this.value[1]]
				])
			this.$emit('onChangeAddress', [
				this.addressData[--this.value[0]],
				this.originSecArrData[--this.value[1]],
				this.originThrArrData[--this.value[1]]
			])
			},
			onColumnChange(e) {
				console.log(e.detail);
				let addressData = this.addressData;
				let rangeTemp = this.range;
				let valueTemp = this.value;
				let column = e.detail.column;
				let row = e.detail.value;
				valueTemp[column] = row;
				switch (column) {
					case 0:
						let countyTemp = [];
						let townTemp = [];
						if (row > 0) {
							for (
								let i = 0; i < addressData[0].children[row - 1].children.length; i++
							) {
								countyTemp.push(addressData[0].children[row - 1].children[i].name);
							}
							countyTemp.splice(0, 0, firstCountyItem);
						}
						valueTemp[1] = 0;
						valueTemp[2] = 0;
						rangeTemp[1] = countyTemp;
						rangeTemp[2] = townTemp;
						break;
					case 1:
						let townTemp2 = [];
						if (row > 0) {
							for (
								let i = 0; i <
								addressData[0].children[valueTemp[0] - 1].children[row - 1].children
								.length; i++
							) {
								townTemp2.push(
									addressData[0].children[valueTemp[0] - 1].children[row - 1]
									.children[i].name
								);
							}
							townTemp2.splice(0, 0, firstTownItem);
						}

						valueTemp[2] = 0;
						rangeTemp[2] = townTemp2;
						break;
					case 2:
						break;
				}
				this.range = [rangeTemp[0], rangeTemp[1], rangeTemp[2]]
				this.value = [valueTemp[0], valueTemp[1], valueTemp[2]]
			}
		}
	}
</script>

<style lang="less">
	.txtRegionplaceholder {}
</style>
