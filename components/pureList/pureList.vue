<template>
	<view class="pureList-container">
		<newCard v-for="(item,index) in listData" :cardData="item" @click="itemclick(item)"></newCard>
	</view>
</template>

<script>
	import newCard from '@/components/listcard/newCard.vue'
	export default {
		name:"pureList",
		data() {
			return {
				dataSource: [],
				pageType: null,
			};
		},
		props: ['type','listData','status'],
		methods:{
			itemclick(data) {
				console.log('点击',this.status)
				// uni.navigateTo({
				// 	url: `/pages/standingbook/bis/animallist?id=${data.companyid}&type=${this.activityidx}&orgcode=${this.orgcode}&bisname=${data.title}`
				// });
				// 业务审核页面	
				if(this.type === 'check') {
					uni.navigateTo({
						url: `/pages/business/checkDetail`
					});
				}
				// 业务记录页面
				if(this.type === 'note') {
					uni.navigateTo({
						url: `/pages/businessDoc/index`
					});
				}
				if(this.status === 'chooseAnimal') {
					uni.navigateTo({
						url: `/pages/businessform/${this.type}?animalData=${encodeURIComponent(JSON.stringify(data))}&selectAnimal=true`
					});
				}
				// if(this.type === 'breed' && this.status === 'chooseAnimal') {
				// 	uni.navigateTo({
				// 		url: `/pages/businessform/breed?animalData=${encodeURIComponent(JSON.stringify(data))}&selectAnimal=true`
				// 	});
				// }
				// if(this.type === 'death' && this.status === 'chooseAnimal') {
				// 	uni.navigateTo({
				// 		url: `/pages/businessform/death?animalData=${encodeURIComponent(JSON.stringify(data))}&selectAnimal=true`
				// 	});
				// }
				// if(this.type === 'escape' && this.status === 'chooseAnimal') {
				// 	uni.navigateTo({
				// 		url: `/pages/businessform/escape?animalData=${encodeURIComponent(JSON.stringify(data))}&selectAnimal=true`
				// 	});
				// }
				// if(this.type === 'sale' && this.status === 'chooseAnimal') {
				// 	uni.navigateTo({
				// 		url: `/pages/businessform/sale?animalData=${encodeURIComponent(JSON.stringify(data))}&selectAnimal=true`
				// 	});
				// }
				// if(this.type === 'release' && this.status === 'chooseAnimal') {
				// 	uni.navigateTo({
				// 		url: `/pages/businessform/release?animalData=${encodeURIComponent(JSON.stringify(data))}&selectAnimal=true`
				// 	});
				// }
				// if(this.type === 'drug' && this.status === 'chooseAnimal') {
				// 	uni.navigateTo({
				// 		url: `/pages/businessform/drug?animalData=${encodeURIComponent(JSON.stringify(data))}&selectAnimal=true`
				// 	});
				// }
				
				if(this.status === 'addAnimal') {
					uni.navigateBack()
				}
				
				this.$emit("getCardData",data)
			}
		},
		onShow(){
			this.pageType = type
		},
		components: {
			newCard
		}
	}
</script>

<style lang="scss" scoped>
	.pureList-container {
		margin: 30rpx 0;
	}
</style>