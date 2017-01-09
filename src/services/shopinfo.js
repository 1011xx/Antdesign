import request from '../utils/request';
import qs from 'qs';

const ipaddress="";

// 获取省和市
export async function queryProvicneAndCity(params) {
  return request(`${ipaddress}/fmss/shopController/queryProvicneAndCity`, {
    method: 'post',
    body: qs.stringify(params),
  });
}
//获取销售区域
export async function querySaleArea(params) {
  return request(`${ipaddress}/fmss/shopController/querySaleArea`, {
    method: 'post',
    body: qs.stringify(params),
  });
}
//获取店仓状态
export async function queryShopStatus(params) {
  return request(`${ipaddress}/fmss/shopController/queryShopStatus`, {
    method: 'post',
    body: qs.stringify(params),
  });
}
//获取类别
export async function queryShopType(params) {
  return request(`${ipaddress}/fmss/shopController/queryShopType`, {
    method: 'post',
    body: qs.stringify(params),
  });
}
//获取列表数据
export async function queryShop(params) {
  return request(`${ipaddress}/fmss/shopController/queryShop`, {
    method: 'post',
    headers: {
    "Content-Type": "application/x-www-form-urlencoded"
  	},
    body: qs.stringify(params),
  });
}
//上传新增店铺数据
export async function addShop(params) {
  return request(`${ipaddress}/fmss/shopController/newShop`, {
    method: 'post',
    body: params,
  });
}
//上传修改店铺数据
export async function updateShop(params) {
  return request(`${ipaddress}/fmss/shopController/updateShop`, {
    method: 'post',
    body: params,
  });
}
//在修改页面通过id获取单条数据
export async function queryShopInfo(params) {
  return request(`${ipaddress}/fmss/shopController/queryShopInfo`, {
    method: 'post',
     headers: {
    "Content-Type": "application/x-www-form-urlencoded"
    },
    body: qs.stringify(params),
  });
}