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
// 获取吊牌价设置审核第一页列表
export async function queryTagPriceConfig(params) {
  return request(`${ipaddress}/fmss/tagPriceController/queryTagPriceConfig`, {
    method: 'post',
     headers: {
    "Content-Type": "application/x-www-form-urlencoded"
    },
    body: qs.stringify(params),
  });
}
//获取吊牌价设置审核信息
export async function queryTagPriceConfigAudit(params) {
  return request(`${ipaddress}/fmss/tagPriceController/queryTagPriceConfigAudit`, {
    method: 'post',
     headers: {
    "Content-Type": "application/x-www-form-urlencoded"
    },
    body: qs.stringify(params),
  });
}
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
//提交调整价格数据接口
export async function updateAuditTagPriceConfig(params) {
  return request(`${ipaddress}/fmss/tagPriceController/updateAuditTagPriceConfig`, {
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