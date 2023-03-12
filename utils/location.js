import store from '@/store/index.js';
export const uniGetLocation = () => {
	uni.getLocation({
		isHighAccuracy: true,
		success(res) {
			let obj = {
				longitude: res.longitude,
				latitude: res.latitude
			};
			store.commit('changeLocation', obj);
			uni.setStorage({
				key: 'location',
				data: obj
			})
			console.log(store.state.location);
		}
	});
}
export const getLocation = () => {
	uni.authorize({
		scope: 'scope.userLocation',
		success: () => {
			uniGetLocation()
		},
		fail: err => {
			//执行失败，弹窗提示是否授权
			uni.getSetting({
				success: result => {
					if (!result.authSetting['scope.userLocation']) {
						uni.showModal({
							content: '位置权限未开将无法正常使用',
							success(res) {
								if (res.confirm) {
									uni.openSetting({
										success(ses) {
											if (ses.authSetting[
													'scope.userLocation'
												]) {
												uniGetLocation()
											}
										}
									});
								}
							}
						});
					} else {
						uniGetLocation()
					}
				}
			});
		}
	})
}
