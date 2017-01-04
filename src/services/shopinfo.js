import request from '../utils/request';
import qs from 'qs';



// 获取省和市
export async function queryProvicneAndCity(params) {
  return request('http://192.168.43.29:8084/fmss/shopController/queryProvicneAndCity', {
    method: 'post',
    body: qs.stringify(params),
  });
}
//获取销售区域
export async function querySaleArea(params) {
  return request('http://192.168.43.29:8084/fmss/shopController/querySaleArea', {
    method: 'post',
    body: qs.stringify(params),
  });
}
//获取店仓状态
export async function queryShopStatus(params) {
  return request('http://192.168.43.29:8084/fmss/shopController/queryShopStatus', {
    method: 'post',
    body: qs.stringify(params),
  });
}
//获取类别
export async function queryShopType(params) {
  return request('http://192.168.43.29:8084/fmss/shopController/queryShopType', {
    method: 'post',
    body: qs.stringify(params),
  });
}
//获取列表数据
export async function queryShop(params) {
  return request('http://192.168.43.29:8084/fmss/shopController/queryShop', {
    method: 'post',
    headers: {
    "Content-Type": "application/x-www-form-urlencoded"
  	},
    body: qs.stringify(params),
  });
}
//上传新增店铺数据
export async function addShop(params) {
  return request('http://192.168.43.29:8084/fmss/shopController/newShop', {
    method: 'post',
    body: params,
  });
}