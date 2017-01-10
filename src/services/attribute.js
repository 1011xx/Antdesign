import request from '../utils/request';
import qs from 'qs';

const ipaddress="http://dz14571854.imwork.net:23196";
// const ipaddress="";

// 获取颜色
export async function queryColor(params) {
  return request(`${ipaddress}/fmss/colorController/queryColor`, {
    method: 'post',
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
