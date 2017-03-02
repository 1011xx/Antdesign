//给select下拉选框添加全部选项
export  function addAll() {
  let a={};
	a.label="全部";
	a.value="undefined";
	return a;
}
//将json对象中为undefined的值转化为空字符串
export function setProp(obj) {
    for (var p in obj) {
        switch (typeof (obj[p])) {
            case 'object':
                setProp(obj[p]);
                break;
            case 'undefined':
                obj[p] = '';
                break;
        }
    }
    return obj;
}
//将json对象中为""字符串的值转化为undefined
export function setProps(obj) {
    for (var p in obj) {
        switch (obj[p]) {
            case '':
                obj[p] = undefined;
                break;
        }
    }
    return obj;
}
//将json对象中为""字符串的值转化为undefined
export function setPropundefined(obj) {
    for (var p in obj) {
        switch (obj[p]) {
            case 'undefined':
                obj[p] = undefined;
                break;
        }
    }
    return obj;
}