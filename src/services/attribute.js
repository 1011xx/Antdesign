import request from '../utils/request';
import qs from 'qs';

// const ipaddress="http://dz14571854.imwork.net:23196";
const ipaddress="";

// 获取颜色
export async function queryColor(params) {
  return request(`${ipaddress}/fmss/colorController/queryColor`, {
    method: 'post',
     headers: {
    "Content-Type": "application/x-www-form-urlencoded"
    },
    body: qs.stringify(params),
  });
}
//新增颜色
export async function newColor(params) {
  return request(`${ipaddress}/fmss/colorController/newColor`, {
    method: 'post',
    headers: {
    "Content-Type": "application/x-www-form-urlencoded"
  	},
    body: qs.stringify(params),
  });
}
//修改颜色
export async function updateColor(params) {
  return request(`${ipaddress}/fmss/colorController/updateColor`, {
    method: 'post',
     headers: {
    "Content-Type": "application/x-www-form-urlencoded"
    },
    body: qs.stringify(params),
  });
}
//删除颜色
export async function removeColor(params) {
  return request(`${ipaddress}/fmss/colorController/removeColor`, {
    method: 'post',
     headers: {
    "Content-Type": "application/x-www-form-urlencoded"
    },
    body: qs.stringify(params),
  });
}
//尺寸相关接口
// 获取尺寸
export async function querySize(params) {
  return request(`${ipaddress}/fmss/sizeController/querySize`, {
    method: 'post',
     headers: {
    "Content-Type": "application/x-www-form-urlencoded"
    },
    body: qs.stringify(params),
  });
}
//新增尺寸
export async function newSize(params) {
  return request(`${ipaddress}/fmss/sizeController/newSize`, {
    method: 'post',
    headers: {
    "Content-Type": "application/x-www-form-urlencoded"
    },
    body: qs.stringify(params),
  });
}
//修改尺寸
export async function updateSize(params) {
  return request(`${ipaddress}/fmss/sizeController/updateSize`, {
    method: 'post',
     headers: {
    "Content-Type": "application/x-www-form-urlencoded"
    },
    body: qs.stringify(params),
  });Size
}
//删除尺寸
export async function removeSize(params) {
  return request(`${ipaddress}/fmss/sizeController/removeSize`, {
    method: 'post',
     headers: {
    "Content-Type": "application/x-www-form-urlencoded"
    },
    body: qs.stringify(params),
  });
}
//尺寸组接口
// 获取尺寸组
export async function queryAllSizeGroup(params) {
  return request(`${ipaddress}/fmss/sizeGroupController/queryAllSizeGroup`, {
    method: 'post',
    headers: {
    "Content-Type": "application/x-www-form-urlencoded"
    },
    body: qs.stringify(params),
  });
}
//新增尺寸组
export async function newSizeGroup(params) {
  return request(`${ipaddress}/fmss/sizeGroupController/newSizeGroup`, {
    method: 'post',
    headers: {
    "Content-Type": "application/x-www-form-urlencoded"
    },
    body: qs.stringify(params),
  });
}
//修改尺寸组
export async function updateSizeGroup(params) {
  return request(`${ipaddress}/fmss/sizeGroupController/updateSizeGroup`, {
    method: 'post',
     headers: {
    "Content-Type": "application/x-www-form-urlencoded"
    },
    body: qs.stringify(params),
  });Size
}
//删除尺寸组
export async function removeSizeGroup(params) {
  return request(`${ipaddress}/fmss/sizeGroupController/removeSizeGroup`, {
    method: 'post',
     headers: {
    "Content-Type": "application/x-www-form-urlencoded"
    },
    body: qs.stringify(params),
  });
}
//属性维护相关接口
// 获取属性类
export async function queryAttributeClass(params) {
  return request(`${ipaddress}/fmss/attributeController/queryAttributeClass`, {
    method: 'post',
    headers: {
    "Content-Type": "application/x-www-form-urlencoded"
    },
    body: qs.stringify(params),
  });
}
//更据属性类的ID获取属性的数据
export async function queryAttributeByAttributeClassId(params) {
  return request(`${ipaddress}/fmss/attributeController/queryAttributeByAttributeClassId`, {
    method: 'post',
    headers: {
    "Content-Type": "application/x-www-form-urlencoded"
    },
    body: qs.stringify(params),
  });
}
//获取属性类名称：品牌代码长度：顺序号：
export async function queryAttributeClassById(params) {
  return request(`${ipaddress}/fmss/attributeController/queryAttributeClassById`, {
    method: 'post',
    headers: {
    "Content-Type": "application/x-www-form-urlencoded"
    },
    body: qs.stringify(params),
  });
}
//修改属性类
export async function updateAttribute(params) {
  return request(`${ipaddress}/fmss/attributeController/updateAttribute`, {
    method: 'post',
    headers: {
    "Content-Type": "application/x-www-form-urlencoded"
    },
    body: qs.stringify(params),
  });
}
//新增属性类
export async function newAttribute(params) {
  return request(`${ipaddress}/fmss/attributeController/newAttribute`, {
    method: 'post',
    headers: {
    "Content-Type": "application/x-www-form-urlencoded"
    },
    body: qs.stringify(params),
  });
}
//删除属性类
export async function removeAttribute(params) {
  return request(`${ipaddress}/fmss/attributeController/removeAttribute`, {
    method: 'post',
    headers: {
    "Content-Type": "application/x-www-form-urlencoded"
    },
    body: qs.stringify(params),
  });
}