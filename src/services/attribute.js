import request from '../utils/request';
import qs from 'qs';

// const ipaddress="http://dz14571854.imwork.net:23196";
const ipaddress="";

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
