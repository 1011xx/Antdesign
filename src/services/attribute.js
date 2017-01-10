import request from '../utils/request';
import qs from 'qs';

const ipaddress="http://dz14571854.imwork.net:23196";

// 获取省和市
export async function queryColor(params) {
  return request(`${ipaddress}/fmss/colorController/queryColor`, {
    method: 'post',
    body: qs.stringify(params),
  });
}

// //获取列表数据
// export async function queryShop(params) {
//   return request(`${ipaddress}/fmss/shopController/queryShop`, {
//     method: 'post',
//     headers: {
//     "Content-Type": "application/x-www-form-urlencoded"
//   	},
//     body: qs.stringify(params),
//   });
// }
// //上传新增店铺数据
// export async function addShop(params) {
//   return request(`${ipaddress}/fmss/shopController/newShop`, {
//     method: 'post',
//     body: params,
//   });
// }
// //上传修改店铺数据
// export async function updateShop(params) {
//   return request(`${ipaddress}/fmss/shopController/updateShop`, {
//     method: 'post',
//     body: params,
//   });
// }
// //在修改页面通过id获取单条数据
// export async function queryShopInfo(params) {
//   return request(`${ipaddress}/fmss/shopController/queryShopInfo`, {
//     method: 'post',
//      headers: {
//     "Content-Type": "application/x-www-form-urlencoded"
//     },
//     body: qs.stringify(params),
//   });
// }