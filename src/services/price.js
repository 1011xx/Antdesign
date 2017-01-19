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
export async function queryTagPriceConfigAudit(params) {
  return request(`${ipaddress}/fmss/tagPriceController/queryTagPriceConfigAudit`, {
    method: 'post',
     headers: {
    "Content-Type": "application/x-www-form-urlencoded"
    },
    body: qs.stringify(params),
  });
}
// 查询吊牌价设置信息
export async function queryTagPriceConfigInfo(params) {
  return request(`${ipaddress}/fmss/tagPriceController/queryTagPriceConfigInfo`, {
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