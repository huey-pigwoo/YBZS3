export const allUserButton = [
        { componentName: '企业资料', componentId: 'companyInfomation' , authHandleResult: {haveAuth: true, authErrorMsg: null}},
        { componentName: '消息管理', componentId: 'messageManage' , authHandleResult: {haveAuth: true, authErrorMsg: null}},
        { componentName: '业务记录', componentId: 'businessNode' , authHandleResult: {haveAuth: true, authErrorMsg: null}},
        { componentName: '个人中心', componentId: 'personCenter', authHandleResult: {haveAuth: true, authErrorMsg: null}},
        { componentName: '人员管理', componentId: 'personManage', authHandleResult: {haveAuth: true, authErrorMsg: null}},
        { componentName: '单位管理', componentId: 'companyManage', authHandleResult: {haveAuth: true, authErrorMsg: null}},
        { componentName: '业务审核', componentId: 'businessCheck', authHandleResult: {haveAuth: true, authErrorMsg: null}},
        { componentName: '文档管理', componentId: 'documentInfomation', authHandleResult: {haveAuth: true, authErrorMsg: null}},
]

export const allBusinessButton = [
	{ componentName: '引种登记', componentId: 'incomeCheckIn' , authHandleResult: {haveAuth: false, authErrorMsg: null}},
	{ componentName: '繁殖登记', componentId: 'breedCheckIn' , authHandleResult: {haveAuth: false, authErrorMsg: null}},
	{ componentName: '死亡登记', componentId: 'deathCheckIn' , authHandleResult: {haveAuth: false, authErrorMsg: null}},
	{ componentName: '逃逸登记', componentId: 'escapeCheckIn' , authHandleResult: {haveAuth: false, authErrorMsg: null}},
	{ componentName: '出售登记', componentId: 'saleCheckIn' , authHandleResult: {haveAuth: false, authErrorMsg: null}},
	{ componentName: '用药登记', componentId: 'durgCheckIn' , authHandleResult: {haveAuth: false, authErrorMsg: null}},
	{ componentName: '接受确认', componentId: 'acceptCheckIn' , authHandleResult: {haveAuth: true, authErrorMsg: null}},
	// { componentName: '补充登记', componentId: 'additionCheckIn' , authHandleResult: {haveAuth: true, authErrorMsg: null}},
	{ componentName: '展演登记', componentId: 'showCheckIn' , authHandleResult: {haveAuth: false, authErrorMsg: null}},
	{ componentName: '归还登记', componentId: 'restoreCheckIn' , authHandleResult: {haveAuth: true, authErrorMsg: null}},
	{ componentName: '放归登记', componentId: 'releaseCheckIn' , authHandleResult: {haveAuth: false, authErrorMsg: null}},
	{ componentName: '救助登记', componentId: 'saveCheckIn' , authHandleResult: {haveAuth: true, authErrorMsg: null}},
	{ componentName: '移交登记', componentId: 'transferCheckIn' , authHandleResult: {haveAuth: true, authErrorMsg: null}},
]	

export const allOverViewButton = [
	{ componentName: '业务总览', componentId: 'businessOverview' , authHandleResult: {haveAuth: true, authErrorMsg: null}},
	{ componentName: '物种总览', componentId: 'speciesOverview' , authHandleResult: {haveAuth: true, authErrorMsg: null}},
	{ componentName: '企业总览', componentId: 'companyOverview' , authHandleResult: {haveAuth: true, authErrorMsg: null}},
]


export const pageConfig = {
	
	INTRODUCTION_REGISTRATION: '/pages/businessform/introduction',	// 引种登记
	REPRODUCTION_REGISTRATION: '/pages/businessform/breed',			// 繁殖登记
	DEAD_REGISTRATION: '/pages/businessform/death',			// 死亡登记
	ESCAPE_REGISTRATION: '/pages/businessform/escape',			// 逃逸登记
	SALE_REGISTRATION: '/pages/businessform/sale',			// 出售登记
	RELEASE_REGISTRATION: '/pages/businessform/release',	// 放归登记
	DRUG_REGISTRATION: '/pages/businessform/drug',			// 用药登记	
	EXHIBITION_REGISTRATION: '/pages/businessform/show',			// 展演登记
	restoreCheckIn: '/pages/businessform/release',		// 归还登记
	acceptCheckIn: '',									// 接受确认
	additionCheckIn: '',								// 补充登记
}

export const businessButtonColor = {
	incomeCheckIn: '#42B3BA',
	breedCheckIn: '#3D71E8',
	deathCheckIn: '#FB6C04',
	escapeCheckIn: '#17B4F7',
	saleCheckIn: '#FFA945',
	durgCheckIn: '#FF5F96',
	additionCheckIn: '#A09C36',
	showCheckIn: '#7CA4C1',
	returnCheckIn: '#FFA945',
	restoreCheckIn: '#A486FB',
	acceptCheckIn: '#FF5F96',
	saveCheckIn: '#FB6C04',
	transferCheckIn: '#3D71E8',
}

export const iconMap = {
	personCenter: 'icon-geren',
	personManage: 'icon-HRrenshirenshiguanli',
	companyInfomation: 'icon-ziliao',
	messageManage: 'icon-xiaoxi',
	businessNode: 'icon-lishijilu_huaban',
	companyManage: 'icon-bumenguanli',
	businessCheck: 'icon-shenhe',
	documentInfomation: 'icon-ziliao'
}


