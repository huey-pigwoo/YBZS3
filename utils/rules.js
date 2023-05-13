// 验证不能包含字母
export const isNoWord = value => /^[^A-Za-z]*$/g.test(value);

// 验证中文姓名
export const isChineseName = value => /^(?:[\u4e00-\u9fa5·]{2,16})$/g.test(value);

// 验证手机号码
export const isPhoneNumber = value => /^(?:(?:\+|00)86)?1(?:(?:3[\d])|(?:4[5-7|9])|(?:5[0-3|5-9])|(?:6[5-7])|(?:7[0-8])|(?:8[\d])|(?:9[1|8|9]))\d{8}$/g.test(value);

// 验证座机电话
export const isLandlineTelephone = value => /\d{3}-\d{8}|\d{4}-\d{7}/g.test(value)

// 纯数字校验
export function isNumber (rule, value, callback) {
  const reg = /^[0-9]+$/
  common(rule, value, callback, reg, '不能为空', '请输入数字格式')
}

// 是否特殊字符
export function isSpecialChars(rule, value, callback) {
    if (!value) {
        return callback()
    }
    // eslint-disable-next-line no-useless-escape
    var pattern = /^[+\-=_@#$%^&;:,.<>/~\\\[\](){}?!|]+$/
    if (pattern.test(value)) {
        return callback()
    }
    return callback(new Error(i18n.t('validate.validate_chars')))
}





