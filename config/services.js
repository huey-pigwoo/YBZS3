import request from './https.js'
import {
	URL
} from './https.js'
// 上传照片地址： 

// 登陆微信
export const loginWxMiniByCode = (data) => {
	return request('/wx/user/wxLogin','POST',data)
}

// 业务登记提交
export const submitBusiness = (data) => {
	return request('/api/object/action', 'POST', data)
}

// 获取动物详情 by ID
export const animalDetialById = (data) => {
	return request('/api/business/getByBusinessAnimalId','GET',data)
} 

// 获取 addressPicker 信息
export const addressList = (data) => {
	return requset('/api/area/checkedIdList','GET',data)
}

// 获取信息
export const getUserInfo = (data) => {
	return request('/wx/user/wxLoginBinding','POST',data)
}

// 获取用户是否拥有岗位信息
export const getUserPostList = () => {
	return request('/api/object/action','POST',{
		"objectId": "Post",
		"actionType": "UserHavePostOfPendingAndActive",
	})
}

// 岗位变化更新
export const changePost = (data) => {
	return request('/api/object/action','POST',{
		"objectId": "Post",
		"actionType": "UpdateSelectedPost",
		param: { "businessUserPostObjectId": data}
	})
}

// 选择单位列表
export const chooseCompany = (data) => {
	return request('/api/object/action','POST',
	{objectId: "CompanyLedger",
	actionType: "Page",
	param: {
	    filterList: [
	        { key: "companyType", operation: "IN", values: data.type ?? ["DOMESTICATION_BREED"] },
	        // { key: "code", operation: "START_WITH", values: filterAddress }
	]}})}

// 获取加入单位详情
export const getCompanyDetail = (data) => {
	return request('/api/object/action','POST',{ objectId: "Company", actionType: "QueryDetailById", param: { "companyEntityId": data } })
}

// 获取加入公司的卡片详情
export const addCompanyCardInfo = (data) => {
	return request('/api/object/action','POST',{ objectId: 'CompanyCard',actionType: "Only", param:{ "companyObjectId":data} })
}

// 获取当前用户的按钮
export const getCurrentUserButton = () => {
	return request('/api/component/listByCurrentUser','GET')
}

// 新增业务用户
export const addNewBusinessPeople = (data) => {
	return request('/api/object/action','POST',	{ objectId: "PersonnelManage", actionType: "Add", 
	param:{
		applicationScene:"passive",
		companyObjectId: data.companyObjectId,
		postList: data.postList,
		userBasicInfoParamList:[ { userName: data.userName, phone: data.phone } ]
	} })}
	
//获取区划地址树
export const getAddressList = async (data) => {
	return request('/api/area/tree', 'GET', { lastLevel: 'COUNTY' })
}


// 人员管理 -- 
export const getEmployeeList = async (data) => {
	return request('/api/object/action','POST',{objectId: "BusinessUserLedger",actionType: "Page",
	// params: {
		
	// }
	})
}

// 获取个人中心数据
export const getPersonCenter = (data) => {
	return request('/api/object/action','POST',{
		"objectId": "PersonalCenter",
		"actionType": "Query",
	})
}

// 获取个人中心基本信息
export const getPersonBaseInfo = (data) => {
	return request('/api/object/action','POST',{
		"objectId": "Employee",
		"actionType": "Query",
	})
}

// 修改个人中心身份
export const editPersonPost = (userId,data) => {
	return request('/api/object/action','POST',{
		"objectId": "PersonnelManage",
		"actionType": "Update",
		param: {
			"id":"updateManage",
			userBusinessObjectId: userId,
			postIdList: data
		}
	})
}

// 根据公司id和业务人员ID 查询公司信息及个人信息（ga岗位信息）
export const getCompanyAndPersonInfo = (companyId,userId,pageType) => {
	return request('/api/object/action','POST',{
		"objectId": "CompanyCard",
		"actionType": "AndPost",
		param: {
			"companyObjectId":companyId,
			"userObjectId":userId,
			"pageId": pageType
		}
	})
}

// 获取个人资质信息
export const getCertification = (data) => {
	return request('/api/object/action','POST',{
		"objectId": "Qualification",
		"actionType": "Query",
		param: {
			"qualificationId":data
		}
	})
}

// 获取业务人员
export const getBusinessPerson = (data) => {
	return request('/api/object/action','POST',{
		"objectId": "BusinessUserLedger",
		"actionType": "Page",
		// "param":{
		//         "filterList":[{
		//             "key":"userStatus",
		//             "values": ["PENDING"]
		//         }]
		// }
	}) 
}

// 审核人员通过
export const checkPersonPass = (userId,auditorId,postList) => {
	return request('/api/object/action','POST',{
    "objectId": "PersonnelManage",
        "actionType": "Audit",
        "param":{
            "manageVO":{
                "id":"passManage",
           		"userBusinessObjectId": userId,
          		"postIdList":postList
            },
            "auditVO":{
                "targetId":userId,
                "auditComments":"",
                "auditOperatorId":auditorId,
                "pass":true,
                "intermediateType":"EMPLOYEE_AUDIT",
                "materialIdList":[]
            }
        }
}) 
}

// 审核人员拒绝
export const checkPersonReject = (userId,postList) => {
	return request('/api/object/action','POST',{
    "objectId": "PersonnelManage",
    "actionType": "Audit",
	"param":{
		"id":"rejectManage",
		"userBusinessObjectId": userId,
		"postIdList": postList
    }
}) 
}

// 删除人员
export const delPerson = (userId,postList) => {
	return request('/api/object/action','POST',{
		"objectId": "PersonnelManage",
		    "actionType": "Del",
		    "param":{
		        "id":"delManage",
				"userBusinessObjectId": userId,
				"postIdList": postList		
		    }


	})
}

// 修改人员
export const editPerson = (userId,postList) => {
	return request('/api/object/action','POST',{
    "objectId": "PersonnelManage",
    "actionType": "Update",
    "param":{
        "id":"updateManage",
        "userBusinessObjectId": userId,
        "postIdList": postList
    }
})
}

// 人员管理添加人员 
export const addPerson = (data) => {
	return request('/api/object/action','POST',{
    "objectId": "PersonnelManage",
    "actionType": "Add",
    "param":{
        "applicationScene":"initiative",
        "companyObjectId":data.companyId,
        "postList": data.postList,
        "userBasicInfoParamList": data.personList
    }
})
}

// 获取授权业务
export const getPermisionBusiness = () => {
	return request('/api/object/action', 'POST', {
		objectId: 'BusinessNode', 
		actionType: 'TreeAll', 
	})
}

/** 普通用户添加单位
 * objectId 'AddByApply'// 新用户登陆添加单位  ｜ "ModifyByOther"	// 业务用户添加单位
 */
export const addPermisionCompany = (status,data) => {
	return request('/api/object/action', 'POST', {
		objectId: status, 
		actionType: 'Company', 
		param: data
	})
}

/**
 * 获取单位管理页面列表
 * data: {
	 authCode 授权业务
	 locationCode
	 businessNodeId
 }
 */ 
export const getCompanyManageList = (data) => {
	return request('/api/object/action','POST',{
		    objectId: "CompanyLedger",
		    actionType: "Page",
		    param: {
				orderList: [{ key: "companyStatus", isAsc: true }],
		  //       filterList:[
				// 	{ key: "authCode", "values": '51' },
				// 	{ key: "locationCode", "values": '51' },
				// 	{ key: "businessNodeId", "values": businessNodeId },
				// ]
		    }
		
	})
}


