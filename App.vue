<script>
	import {
		getLocation
	} from '@/utils/location.js'
	import {
		systemInfo
	} from '@/common/system-info.js'
	export default {
		onLaunch: function() {
			console.log('App Launch');
			getLocation()
		},
		onShow: function() {
			console.log('App Show');
		},
		onHide: function() {
			console.log('App Hide');
		},
		methods: {},
		globalData: {
			navheight: systemInfo().navHeight + systemInfo().statusBarHeight
		}
	};
</script>

<style>
	/*每个页面公共css */
	@import url('@/common/index.css');

	view,
	text {
		font-size: 23rpx;
		box-sizing: border-box;
	}

	image {
		width: 100%;
		height: 100%;
	}

	input {
		background: #F6F6F6;
		border-radius: 4rpx;
	}
</style>
