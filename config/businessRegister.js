// 业务登记的接口信息

import request from './https.js'
import {
	URL
} from './https.js'

// --- S 业务登记入参信息 ---------------------------------------------------------------------

/**
 * @param {objectId , actionType} : 
 * 救助登记（SalvageRegistration, Commit） 			｜ 出售登记（SaleRegistration, Commit）
 * 用药登记（DrugRegistration, Commit）	 			｜ 死亡登记（DeadRegistrattion, Commit）
 * 逃离登记（EscapeRegistration, Commit）	 			｜ 展演登记（ExhibitionRegistration, Commit）
 * 移交登记（HandoverRegistration, Commit）			｜ 检疫登记（QuarantineRegistration, Commit）
 * 引种登记（IntroductionRegistration, Commit）		｜ 接受确认登记（AcceptRegistration, Commit）
 * 归还登记（ReturnRegistration, Commit）				｜ 归还确认（ReturnConfirmRegistration, Confirm）
 * 展演确认（ExhibitionConfirmRegistration, Confirm）	｜ 繁殖登记（ReproductionRegistration, Commit）
 * 放归登记（ReleaseRegistration, Commit）
 */

const param = {
	 objectId: "ReproductionRegistration",
	 actionType: "Commit",
	 param: {
		 unformattedInfo: {	 					// 非格式化描述
			 materialIdList: [],				// 文件id列表
			 documentNoInfo: {
				 documentNoId: '',				// 如果查看详情时有 则传 可以不管
				 documentNo: '', 				// 文号编号
				 companyId: '',					 // 可以不管
				 companyName: '',				//对方单位名称
			 },
			 targetCompanyName: '',				// 对方单位名称，例如 移交、归还、接收  业务登记不需要文号, 只要对方单位名称
		 },
		
		
		 formattedInfoList: [{
			 objectId: '',					// 业务登记id 如果填了 则表示是修改 (这个数组最多只有一条修改数据)
			 targetId: "111", 				// 描述对象id (业务动物id、动物objectId)
			 note: "",						// 备注
			 registrationInfo: {
				
			 }
		 }],
		 happenTime: "" 					// 2022-02-02 11:22:22, 发生时间, 补登时需要传
	 }
}

// --- E 业务登记入参信息 ---------------------------------------------------------------------


// 业务登记列表
export const getRegistrationRecords = (companyId) => {
	return request('/api/object/action', 'POST',{
		"objectId": "BusinessRegistrationLedger",
		"actionType": "Page",
		"param": {
		    "orderList": [{
		        "key": "happenTime",
		        "asc": false
		    }]
		}
	})
}

// 审核业务登记列表
export const getAuditRegistrationRecords = (companyId) => {
	return request('/api/object/action', 'POST',{
		"objectId": "BusinessRegistrationLedger",
		"actionType": "Page",
		"param": {
			"filterList":[{
				"key":"registrationStatus",
				 "operator": "EQ",
				 "values": ["WAIT_AUDIT"]
			}],
		    "orderList": [{
		        "key": "happenTime",
		        "asc": false
		    }]
		}
	})
}

// 获取业务详情
export const getRegistrationDetail = (businessId) => {
	return request('/api/object/action', 'POST',{
		"objectId": "CommonRegistration",
		"actionType": "GetById",
		"param": {
			"objectId": businessId
		}
	})
}

// 选择业务动物 
/**
 * @param {animalNameFilter}  {
	 key: animalName,
	 operator: 'LIKE',
	 values: 需要查询的值
 }
 */
export const selectAnimal = (page,animalNameFilter) => {
	return request('/api/object/action','POST', {
		"objectId": "BusinessAnimalLedger",
		"actionType": "Page",
		param: {
			current: page,
			filterList: [
				{
				   "key": "logicRemainingNumber",
				   "operator": "GT",
				   "values": ["0"],
				},
				animalNameFilter
			]
		}
	})
}

// 模糊搜索下拉框
export const queryAnimalList = (name) => {
	return request('/api/animal/page','POST',{
		"current":1,
		"size": 10,
		"name": name
	})
}


/**
 * sendBusinessForm： 提交/修改引种登记记录
 * @param {data.unformattedInfo}  unformattedInfo: 非格式化描述(图片/视频列表，文号，文号相关单位)
 * @param {data.formattedInfoList}  formattedInfoList: 格式化描述
 */
export const sendIntroductionForm = (data) => {
	return request('/api/object/action','POST',{
		   "objectId": "IntroductionRegistration",
		   "actionType": "Commit",
		   param: data
	})
}

// 提交审核
/**
 * @param {materialIdList}  媒体列表
 * @param {pass}  true/false
 */
export const auditBusiness = (objectId, materialIdList, isPass) => {
	return request('/api/object/action','POST',{
		   "objectId": "CommonRegistration",
		   "actionType": "Audit",
		   "param": {
			  "registrationId": objectId, // 业务登记id
			  "auditComments": "审核意见",
			   "materialIdList": materialIdList, // 图片列表 最多3张
			   "pass": isPass  // 是否通过 
		   }  
	})
}

// 繁育登记
export const sendBreedForm = (data) => {
	return request('/api/object/action','POST',{
		   "objectId": "ReproductionRegistration",
		   "actionType": "Commit",
		   param: data
	})
}



// 死亡登记
export const sendDeadForm = (data) => {
	return request('/api/object/action','POST',{
		   "objectId": "DeadRegistrattion",
		   "actionType": "Commit",
		   param: data
	})
}

// 逃逸登记
export const sendEscapeForm = (data) => {
	return request('/api/object/action','POST',{
		   "objectId": "EscapeRegistration",
		   "actionType": "Commit",
		   param: data
	})
}

// 出售登记
export const sendSaleForm = (data) => {
	return request('/api/object/action','POST',{
		   "objectId": "SaleRegistration",
		   "actionType": "Commit",
		   param: data
	})
}


// 展演登记
export const sendExhibitionForm = (data) => {
	return request('/api/object/action','POST',{
		   "objectId": "ExhibitionRegistration",
		   "actionType": "Commit",
		   param: data
	})
}

// 归还登记
export const sendReturnForm = (data) => {
	return request('/api/object/action','POST',{
		   "objectId": "ReturnRegistration",
		   "actionType": "Commit",
		   param: data
	})
}

// 死亡登记
export const sendDeathForm = (data) => {
	return request('/api/object/action','POST',{
		"objectId": "DeadRegistration",
		"actionType": "Commit",
		param: data
	})
}

// 放归登记
export const sendReleaseForm = (data) => {
	return request('/api/object/action','POST',{
		"objectId": "ReleaseRegistration",
		"actionType": "Commit",
		param: data
	})
}

// 用药记录
export const sendDrugForm = (data) => {
	return request('/api/object/action','POST',{
		"objectId": "DrugRegistration",
		"actionType": "Commit",
		param: data
	})
}


// 确认业务登记
export const confirmBusinessForm = (objectId,confirmType) => {
	return request('/api/object/action','POST',{
		   "objectId": "ReturnConfirmRegistration",
		   "actionType": "Confirm",
		   param: {
			   objectId: objectId,	//	业务登记id
			   confirm: confirmType	// 是否确认
		   }
	})
}

