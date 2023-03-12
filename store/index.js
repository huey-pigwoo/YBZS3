import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)
const store = new Vuex.Store({
	state: {
		location: null,
		menu: [{
			id: 80002,
			pageurl: '/pages/businessform/rescue',
			field: 'wuzhongmingchen',
			formid: '166835536881135'
		}, {
			id: 80003,
			pageurl: '/pages/businessform/breed',
			field: 'wuzhongmingchen',
			formid: '166861643534115'
		}, {
			id: 80004,
			pageurl: '/pages/businessform/death',
			field: 'wuzhongmingchen',
			formid: '166861654810119'
		}, {
			id: 80005,
			pageurl: '/pages/businessform/release',
			field: 'wuzhongmingchen',
			formid: '166861664160028'
		}, {
			id: 80006,
			pageurl: '/pages/businessform/transfer',
			field: 'yijiaodongwu',
			formid: '166861681426337'
		}, {
			id: 80017,
			pageurl: '/pages/businessform/introduction',
			field: 'wuzhongmingchen',
			formid: '167013671300484'
		}, {
			id: 80018,
			pageurl: '/pages/businessform/breed_fanyu',
			field: 'wuzhongmingchen',
			formid: '167013725570004'
		}, {
			id: 80019,
			pageurl: '/pages/businessform/escape',
			field: 'wuzhongmingchen',
			formid: '167013744876313'
		}, {
			id: 80020,
			pageurl: '/pages/businessform/sale',
			field: 'wuzhongmingchen',
			formid: '167013761621117'
		}, {
			id: 80021,
			pageurl: '/pages/businessform/death_fanyu',
			field: 'wuzhongmingchen',
			formid: '167015795019385'
		}]
	},
	mutations: {
		changeLocation(state, location) {
			state.location = location
		}
	}
})
export default store
