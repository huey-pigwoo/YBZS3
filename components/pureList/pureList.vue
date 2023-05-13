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
		props: ['type','listData','chooseAnimal'],
		methods:{
			itemclick(data) {
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
				if(this.type === 'chooseAnimal') {
					uni.navigateTo({
						url: `/pages/businessform/breed?animalData=${encodeURIComponent(JSON.stringify(data))}&selectAnimal=true`
					});
				}
				if(this.type === 'addAnimal') {
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