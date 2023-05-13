<template>
	<div>
		<Picker class="addressPicker" mode="multiSelector" @change="onChange" @columnchange="onColumnChange"
			:range="range" :value="value">
			<View class="picker">
				<Text :class="region=='请选择区划' ? 'txtRegionplaceholder' : 'txtRegion'"> {{region}} </Text>
			</View>
		</Picker>
	</div>
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
				addressData: [],
				orgcode: uni.getStorageSync('orgcode')
			}
		},
		props: ['orgname'],
		mounted() {
			this.region = this.orgname || "请选择区划"
			getAddressList().then(res => {
				if (res.data.code == 0) {
					let datas = new Array();
					datas.push(res.data.data);
					console.log('获得到的地址节电树信息',res.data.data)
					if (res.data.data.code && res.data.data.code.length == 4) {
						firstCityItem = res.data.data.name;
						firstCountyItem = "全县";
						firstTownItem = "全镇";
					} else if (res.data.data.code && res.data.data.code.length == 6) {
						firstCityItem = res.data.data.name;
						firstCountyItem = "全镇";
					}
					this.addressData = datas
					this.initData()
				}
			})
		},
		watch: {
			orgname(val) {
				this.region = val
			}
		},
		methods: {
			initData() {
				// 省市区选择器初始化
				let addressData = this.addressData;
				let range = [];
				let temp = [];
				temp = [firstCityItem];
				for (let i = 0; i < addressData[0].children.length; i++) {
					temp.push(addressData[0].children[i].name);
				}
				range.push(temp);
				temp = [];
				range.push(temp);
				temp = [];
				range.push(temp);
				this.range = range
				this.value = [0, 0, 0]
			},
			onChange(e) {
				let valueTemp = e.detail.value;
				this.getAddressInfo(valueTemp);
			},
			getAddressInfo(valueTemp) {
				let addressData = this.addressData;
				let addressName = "";
				let addressCode = 0;
				let cityIndex = valueTemp[0];
				if (cityIndex != 0) {
					let cityName = addressData[0].children[cityIndex - 1].name;
					let cityCode = addressData[0].children[cityIndex - 1].code;
					addressName += cityName;
					addressCode = cityCode;
				} else {
					addressName += addressData[0].name;
					addressCode = addressData[0].code;
				}
				let countyIndex = valueTemp[1];
				if (countyIndex != 0) {
					let countyName =
						addressData[0].children[cityIndex - 1].children[countyIndex - 1].name;
					let countyCode =
						addressData[0].children[cityIndex - 1].children[countyIndex - 1].code;
					addressName += "-" + countyName;
					addressCode = countyCode;
					let townIndex = valueTemp[2];
					if (townIndex != 0) {
						let townName =
							addressData[0].children[cityIndex - 1].children[countyIndex - 1]
							.children[townIndex - 1].name;
						let townCode =
							addressData[0].children[cityIndex - 1].children[countyIndex - 1]
							.children[townIndex - 1].code;
						addressName += "-" + townName;
						addressCode = townCode;
					}
				}
				this.region = addressName
				this.value = valueTemp
				this.$emit('onChangeAddress', addressName, addressCode)
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
