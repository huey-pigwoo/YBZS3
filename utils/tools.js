// 防抖
export const debounce = (fn,wait) => {
    let timer = null;
    return function(){
        if(timer !== null){
            clearTimeout(timer);
        }
        timer = setTimeout(()=> {
			
			console.log('防抖函数')
		},wait);
    }
}

// 节流
export function throttle(fn, delay) {
    let timer;
    return function(){
      if(!timer) {
        fn.apply(this, arguments)
        timer = setTimeout(()=>{
          clearTimeout(timer)
          timer = null
        },delay)
      }
    }
}


// 返回两个数组中都显示的元素的数组
export function arrSimilarity(arr, values){
	arr.filter(v => values.includes(v))
}

// 遍历节电树
export function foreachTree(data, childrenName = 'children', callback) {
    for (let i = 0; i < data.length; i++) {
        callback(data[i]);
        if (data[i][childrenName] && data[i][childrenName].length > 0) {
            foreachTree(data[i][childrenName], childrenName, callback);
        }
    }
}

// 检查 value 是否为空
export function isEmpty(value) {
    if (value == null) {
        return true;
    }
    if (isArrayLike(value)) {
        return !value.length;
    }else if(isPlainObject(value)){
        for (let key in value) {
            if (hasOwnProperty.call(value, key)) {
              return false;
            }
        }
    }
    return false;
}





