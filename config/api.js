import request from './https.js'
import {
	URL
} from './https.js'
export const uplodurl = URL + "/sjcl/ly/file/uploadFile.lt"
//登录
export const login = (data) => {
	return request('/api/user/login', 'POST', data)
}
//获取页面配置
export const getPageConfig = (data) => {
	return request('/xmcygl/ly/newwxmini/getPageConfigInfo.lt', 'GET', data)
}
//获取页面底部按钮配置
export const getPageButtons = (data) => {
	return request('/xmcygl/ly/newwxmini/getPageButtons.lt', 'GET', data)
}

//获取首页数据
export const getPadPage = (data) => {
	return request('/xmcygl/ly/newwxmini/getPadPageNew.lt', 'GET', data)
}

//获取表单json
export const getFormById = (data) => {
	return request('/xmcygl/ly/wxminiform/getWxNewFormById.lt', 'POST', data)
}
//获取列表数据
export const getWxMiniFormList = (data) => {
	return request('/xmcygl/ly/wxminiform/getWxMiniFormList.lt', 'GET', data)
}

//保存表单
export const saveForm = (data) => {
	return request('/sjcl/ly/save/saveListData.lt', 'POST', data)
}

//根据id获取表单编辑数据
export const getEditForm = (data) => {
	return request('/xmcygl/ly/wxminiform/getEditFormDataByOnetimeId.lt', 'GET', data)
}
//根据id删除表单
export const delFormByOnetimeId = (data) => {
	return request('/xmcygl/ly/wxminiform/delFormDataByOnetimeId.lt', 'GET', data)
}
//根据id获取详情
export const getFormDataInfoByOnetimeId = (data) => {
	return request('/xmcygl/ly/wxminiform/getFormDataInfoByOnetimeId.lt', 'GET', data)
}
//获取检疫异常负责人姓名和电话
export const getFuzenrenInfo = (data) => {
	return request('/xmcygl/ly/wxminiform/getFuzenrenInfo.lt', 'GET', data)
}

//表单数据审核
export const saveFormDataCheck = (data) => {
	return request('/xmcygl/ly/wxminiform/saveFormDataCheck.lt', 'POST', data)
}
//登录
export const loginByTelAndPwd = (data) => {
	return request('/xmcygl/ly/sysuser/loginByTelAndPwd.lt', 'GET', data)
}
//接收确认
export const saveYijiaoQueren = (data) => {
	return request('/xmcygl/ly/wxminiform/saveYijiaoQueren.lt', 'GET', data)
}
//获取工作提醒
export const getWorkTotal = (data) => {
	return request('/xmcygl/ly/wxminiform/getWorkTotal.lt', 'GET', data)
}

//获取手机号
export const getWxminiTel = (data) => {
	return request('/xmcygl/ly/wxuser/getWxminiTel.lt', 'GET', data)
}

//根据code登录微信小程序
export const loginWxMiniByCode = (data) => {
	return request('/xmcygl/ly/wxuser/loginWxMiniByCode.lt', 'GET', data)
}

//绑定手机号码
export const updateTel = (data) => {
	return request('/xmcygl/ly/wxuser/updateTel.lt', 'GET', data)
}
//获取企业列表
export const getAddCompanyInfo = (data) => {
	return request('/xmcygl/ly/wxminicompany/getAddCompanyInfo.lt', 'GET', data)
}
//授权
export const addAnthority = (data) => {
	return request('/xmcygl/ly/wxuser/addAnthority.lt', 'POST', data)
}
//根据区划和部门获取人员列表
export const getRoleNameByDeptidOrDutyid = (data) => {
	return request('/xmcygl/ly/tqrole/getRoleNameByDeptidOrDutyid.lt', 'GET', data)
}

//获取动物列表
export const getCodeTableByFormAndField = (data) => {
	return request('/xmcygl/ly/codetable/getCodeTableByFormAndField.lt', 'GET', data)
}

//获取审核列表
export const getCheckList = (data) => {
	return request('/xmcygl/ly/wxuser/getCheckList.lt', 'GET', data)
}

//获取审核详情
export const getCheckInfo = (data) => {
	return request('/xmcygl/ly/wxuser/getCheckInfo.lt', 'GET', data)
}

//审核
export const approvePersons = (data) => {
	return request('/xmcygl/ly/sysuser/approvePersons.lt', 'GET', data)
}

//根据经纬度获取地址
export const getAddrAndCurTime = async (data) => {
	return request('/xmcygl/ly/comthird/getAddrAndCurTime.lt', 'GET', data)
}
//判断库存数量
export const judgeEnoughNum = async (data) => {
	return request('/xmcygl/ly/wxminiform/judgeEnoughNum.lt', 'GET', data)
}
//获取区划地址树
export const getAddressList = async (data) => {
	return request('/xmcygl/ly/area/getAreaTree.lt', 'GET', data)
}
//判断当前用户对首页按钮的操作权限
export const getPadPageBisButtonAnthority = async (data) => {
	return request('/xmcygl/ly/newwxmini/getPadPageBisButtonAnthority.lt', 'GET', data)
}
//获取汇总数据
export const getOverviewDomestication = async (data) => {
	return request('/xmcygl/ly/wxminicompany/overviewDomestication.lt', 'GET', data)
}
//获取图表数据
export const getStatisticalChart = async (data) => {
	return request('/xmcygl/ly/wxminicompany/statisticalChart.lt', 'GET', data)
}
//获取汇总列表数据
export const getOverDetaiList = async (data) => {
	return request('/xmcygl/ly/wxminicompany/detaiList.lt', 'GET', data)
}
//获取身份管理列表
export const getRoleContainDutyAndOrgByPersonId = async (data) => {
	return request('/xmcygl/ly/tqrole/getRoleContainDutyAndOrgByPersonId.lt', 'GET', data)
}
//获取需要填写的资质
export const getWaitingQualification = async (data) => {
	return request('/xmcygl/ly/wxuser/getWaitingQualification.lt', 'GET', data)
}
//保存需要填写的资质
export const saveUserQualification = async (data) => {
	return request('/xmcygl/ly/wxuser/saveUserQualification.lt', 'POST', data)
}
//获取人员编辑（新增、审核）时部门信息以及该部门的角色信息
export const getPersonDeptRole = async (data) => {
	return request('/xmcygl/ly/wxuser/getPersonDeptRole.lt', 'GET', data)
}
//身份信息确认（包括其他或本人员编辑，人员审核，人员添加）
export const sureAnthority = async (data) => {
	return request('/xmcygl/ly/wxuser/sureAnthority.lt', 'POST', data)
}

//人员管理（企业管理员和行政管理人员
export const getpersonManage = async (data) => {
	return request('/xmcygl/ly/wxuser/personManage.lt', 'GET', data)
}
//单位管理
export const getunitManage = async (data) => {
	return request('/xmcygl/ly/wxuser/unitManage.lt', 'GET', data)
}
//获取码表
export const getCodeTable = async (data) => {
	return request('/xmcygl/ly/wxminicodetable/getCodeTable.lt', 'GET', data)
}
//增加单位（新增、编辑）
export const addUnit = async (data) => {
	return request('/xmcygl/ly/wxuser/addUnit.lt', 'POST', data)
}
//授权单位管理详情
export const getUnitManageInfo = async (data) => {
	return request('/xmcygl/ly/wxuser/getUnitManageInfo.lt', 'GET', data)
}
//单位审核
export const checkUnit = async (data) => {
	return request('/xmcygl/ly/wxuser/checkUnit.lt', 'GET', data)
}
//删除单位
export const delUnit = async (data) => {
	return request('/xmcygl/ly/wxuser/delUnit.lt', 'GET', data)
}
//授权管理列表
export const getanthorityManage = async (data) => {
	return request('/xmcygl/ly/wxuser/anthorityManage.lt', 'GET', data)
}
//授权管理详情
export const getAnthorityManageInfo = async (data) => {
	return request('/xmcygl/ly/wxuser/getAnthorityManageInfo.lt', 'GET', data)
}
//增加授权
export const addAnthorityManagge = async (data) => {
	return request('/xmcygl/ly/wxuser/addAnthorityManagge.lt', 'POST', data)
}
//删除授权
export const delAnthority = async (data) => {
	return request('/xmcygl/ly/wxuser/delAnthority.lt', 'GET', data)
}
//授权审核
export const checkAnthority = async (data) => {
	return request('/xmcygl/ly/wxuser/checkAnthority.lt', 'GET', data)
}
//业务切换
export const getPadCompanyAccount = async (data) => {
	return request('/xmcygl/ly/newwxmini/getPadCompanyAccount.lt', 'GET', data)
}

//修改个人信息
export const updateRegistInfo = async (data) => {
	return request('/xmcygl/ly/wxuser/updateRegistInfo.lt', 'GET', data)
}
//获取手机验证码
export const getSmsCode = async (data) => {
	return request('/xmcygl/ly/sysuser/getSmsCode.lt', 'GET', data)
}
//保存选取的身份
export const saveSelectRole = async (data) => {
	return request('/xmcygl/ly/wxuser/saveSelectRole.lt', 'GET', data)
}
//根据人员获取角色信息
export const getRoleByPersonId = async (data) => {
	return request('/xmcygl/ly/wxuser/getRoleContainDutyAndOrgByPersonId.lt', 'GET', data)
}
//判断单位是否重复
export const getjudgeUnit = async (data) => {
	return request('/xmcygl/ly/wxminicompany/judgeUnit.lt', 'GET', data)
}
//企业台账列表
export const getcompanyAccountList = async (data) => {
	return request('/xmcygl/ly/wxminicompany/companyAccountList.lt', 'GET', data)
}
//企业详情业务列表
export const getcompanyBisList = async (data) => {
	return request('/xmcygl/ly/wxminicompany/companyBisList.lt', 'GET', data)
}
//企业详情物种列表
export const getwuZhongList = async (data) => {
	return request('/xmcygl/ly/wxminicompany/wuZhongList.lt', 'GET', data)
}
//企业业务列表
export const getBisList = async (data) => {
	return request('/xmcygl/ly/wxminicompany/getBisList.lt', 'GET', data)
}
//企业物种列表\
export const getWuZhongInfoList = async (data) => {
	return request('/xmcygl/ly/wxminicompany/getWuZhongInfoList.lt', 'GET', data)
}
//企业动物列表下拉选择
export const getDongwuList = async (data) => {
	return request('/xmcygl/ly/wxminicompany/getDongwuList.lt', 'GET', data)
}
//业务台账 物种列表
export const getwuZhongTaiZhangList = async (data) => {
	return request('/xmcygl/ly/wxminicompany/wuZhongTaiZhangList.lt', 'GET', data)
}
//获取业务类型
export const getBisType = async (data) => {
	return request('/xmcygl/ly/wxminicompany/getBisType.lt', 'GET', data)
}

//业务总览-企业汇总：企业、业务、物种、动物
export const getcompanyAccountTotal = async (data) => {
	return request('/xmcygl/ly/wxminicompany/companyAccountTotal.lt', 'GET', data)
}
//业务台账 - 企业列表（动物和业务类型过滤）
export const getWuzhongCompangyList = async (data) => {
	return request('/xmcygl/ly/wxminicompany/getWuzhongCompangyList.lt', 'GET', data)
}
//获取企业简要信息
export const getcompanyBrieflyInfo = async (data) => {
	return request('/xmcygl/ly/wxminicompany/companyBrieflyInfo.lt', 'GET', data)
}

//获取物种总览
export const getanimalOverview = async (data) => {
	return request('/xmcygl/ly/wxminicompany/animalOverview.lt', 'GET', data)
}
//获取业务总览
export const getbisOverview = async (data) => {
	return request('/xmcygl/ly/wxminicompany/bisOverview.lt', 'GET', data)
}

//获取企业总览
export const getcompanyOverview = async (data) => {
	return request('/xmcygl/ly/wxminicompany/companyOverview.lt', 'GET', data)
}

//获取企业总览
export const getAllTotalInfo = async (data) => {
	return request('/xmcygl/ly/wxminicompany/getAllTotalInfo.lt', 'GET', data)
}
//获取台账切换权限
export const getAnthority = async (data) => {
	return request('/xmcygl/ly/wxuser/getAnthority.lt', 'GET', data)
}
