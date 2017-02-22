import request from '../utils/request';
import qs from 'qs';

// const ipaddress="http://192.168.10.146:5001";
// const ipaddress="http://dz14571854.imwork.net:23196";
const ipaddress="";

// 获取吊牌价设置状态
export async function queryTagPriceConfigState(params) {
  return request(`${ipaddress}/fmss/tagPriceController/queryTagPriceConfigState`, {
    method: 'post',
     headers: {
    "Content-Type": "application/x-www-form-urlencoded"
    },
    body: qs.stringify(params),
  });
}
// 获取吊牌价设置第一页列表
export async function queryTagPriceConfig(params) {
  return request(`${ipaddress}/fmss/tagPriceController/queryTagPriceConfig`, {
    method: 'post',
     headers: {
    "Content-Type": "application/x-www-form-urlencoded"
    },
    body: qs.stringify(params),
  });
}
// 获取吊牌价设置第一页列表
export async function queryTagPriceConfigAudit(params) {
  return request(`${ipaddress}/fmss/tagPriceController/queryTagPriceConfigAudit`, {
    method: 'post',
     headers: {
    "Content-Type": "application/x-www-form-urlencoded"
    },
    body: qs.stringify(params),
  });
}

// // 获取吊牌价设置审核第一页列表
// export async function queryTagPriceAuditResult(params) {
//   return request(`${ipaddress}/fmss/tagPriceController/queryTagPriceAuditResult`, {
//     method: 'post',
//      headers: {
//     "Content-Type": "application/x-www-form-urlencoded"
//     },
//     body: qs.stringify(params),
//   });
// }
//获取查看页面数据
export async function queryTagPriceConfigInfo(params) {
  return request(`${ipaddress}/fmss/tagPriceController/queryTagPriceConfigInfo`, {
    method: 'post',
     headers: {
    "Content-Type": "application/x-www-form-urlencoded"
    },
    body: qs.stringify(params),
  });
}

//删除吊牌价设置
export async function deleteTagPriceConfig(params) {
  return request(`${ipaddress}/fmss/tagPriceController/deleteTagPriceConfig`, {
    method: 'post',
     headers: {
    "Content-Type": "application/x-www-form-urlencoded"
    },
    body: qs.stringify(params),
  });
}
//提交调整价格数据接口同时也是提交吊牌价设置接口,修改页面提交审核
export async function updateAuditTagPriceConfig(params) {
  return request(`${ipaddress}/fmss/tagPriceController/updateAuditTagPriceConfig`, {
    method: 'post',
     headers: {
    "Content-Type": "application/x-www-form-urlencoded"
    },
    body: qs.stringify(params),
  });
}
//修改暂存接口吊牌价设置
export async function updateSaveTagPriceConfig(params) {
  return request(`${ipaddress}/fmss/tagPriceController/updateSaveTagPriceConfig`, {
    method: 'post',
     headers: {
    "Content-Type": "application/x-www-form-urlencoded"
    },
    body: qs.stringify(params),
  });
}
// 获取吊牌价设置审核结果
export async function queryTagPriceAuditResult(params) {
  return request(`${ipaddress}/fmss/tagPriceController/queryTagPriceAuditResult`, {
    method: 'post',
     headers: {
    "Content-Type": "application/x-www-form-urlencoded"
    },
    body: qs.stringify(params),
  });
}
// 审核吊牌价设置
export async function auditTagPriceConfig(params) {
  return request(`${ipaddress}/fmss/tagPriceController/auditTagPriceConfig`, {
    method: 'post',
     headers: {
    "Content-Type": "application/x-www-form-urlencoded"
    },
    body: qs.stringify(params),
  });
}
// 查询页面初始化吊牌价设置状态组件
export async function queryTagPriceAuditState(params) {
  return request(`${ipaddress}/fmss/tagPriceController/queryTagPriceAuditState`, {
    method: 'post',
     headers: {
    "Content-Type": "application/x-www-form-urlencoded"
    },
    body: qs.stringify(params),
  });
}
//新增页面暂存
export async function saveTagPriceConfig(params) {
  return request(`${ipaddress}/fmss/tagPriceController/saveTagPriceConfig`, {
    method: 'post',
     headers: {
    "Content-Type": "application/x-www-form-urlencoded"
    },
    body: qs.stringify(params),
  });
}
























// 获取吊牌价设置款号年份属性查询列表
export async function queryTagPriceConfigStyleYear(params) {
  return request(`${ipaddress}/fmss/tagPriceController/queryTagPriceConfigStyleYear`, {
    method: 'post',
     headers: {
    "Content-Type": "application/x-www-form-urlencoded"
    },
    body: qs.stringify(params),
  });
}
// 获取吊牌价设置款号季节属性查询列表
export async function queryTagPriceConfigStyleSeason(params) {
  return request(`${ipaddress}/fmss/tagPriceController/queryTagPriceConfigStyleSeason`, {
    method: 'post',
     headers: {
    "Content-Type": "application/x-www-form-urlencoded"
    },
    body: qs.stringify(params),
  });
}
// 获取吊牌价设置款号品牌属性查询列表
export async function queryTagPriceConfigStyleBrand(params) {
  return request(`${ipaddress}/fmss/tagPriceController/queryTagPriceConfigStyleBrand`, {
    method: 'post',
     headers: {
    "Content-Type": "application/x-www-form-urlencoded"
    },
    body: qs.stringify(params),
  });
}
// 获取吊牌价设置款号类别属性查询列表
export async function queryTagPriceConfigStyleCategory(params) {
  return request(`${ipaddress}/fmss/tagPriceController/queryTagPriceConfigStyleCategory`, {
    method: 'post',
     headers: {
    "Content-Type": "application/x-www-form-urlencoded"
    },
    body: qs.stringify(params),
  });
}
// 获取吊牌价设置款号批次属性查询列表
// export async function pici(params) {
//   return request(`${ipaddress}/fmss/tagPriceController/pici`, {
//     method: 'post',
//      headers: {
//     "Content-Type": "application/x-www-form-urlencoded"
//     },
//     body: qs.stringify(params),
//   });
// }
// 获取款号列表
export async function queryTagPriceConfigStyle(params) {
  return request(`${ipaddress}/fmss/tagPriceController/queryTagPriceConfigStyle`, {
    method: 'post',
     headers: {
    "Content-Type": "application/x-www-form-urlencoded"
    },
    body: qs.stringify(params),
  });
}
//新增页面提交审核
export async function toAuditTagPriceConfig(params) {
  return request(`${ipaddress}/fmss/tagPriceController/toAuditTagPriceConfig`, {
    method: 'post',
     headers: {
    "Content-Type": "application/x-www-form-urlencoded"
    },
    body: qs.stringify(params),
  });
}
