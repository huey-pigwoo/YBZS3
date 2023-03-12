const getQueryVariable = (str, name) => {
	let query = str.substring(str.indexOf('?') + 1);
	let vars = query.split("&");
	for (var i = 0; i < vars.length; i++) {
		let pair = vars[i].split("=");
		if (pair[0] == name) {
			return pair[1];
		}
	}
	return (false);
}
//判断是否为手机号
function checkMobile(s) {
	var length = s.length;
	if (length == 11 && /^(((1[3-9]{1})|)+\d{9})$/.test(s)) {
		return true;
	} else {
		return false;
	}
}
module.exports = {
	getQueryVariable,
	checkMobile
}
