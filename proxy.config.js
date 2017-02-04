// 'use strict';

// const mock = {
	
// };
// require('fs').readdirSync(require('path').join(__dirname + '/mock'))
//   .forEach(function (file) {
//     Object.assign(mock, require('./mock/' + file));
//   });

// module.exports = mock;
// http://dz14571854.imwork.net:23196

module.exports = {
  // Forward 到另一个服务器
  'GET https://assets.daily/*': 'https://assets.online/',
  'GET http://localhost:8989/*' : 'http://192.168.10.146:5001/',
  // 'GET http://localhost:8989/*' : 'http://dz14571854.imwork.net:23196/',

  // Forward 到另一个服务器，并指定路径
  'GET https://assets.daily/*': 'https://assets.online/v2/',

  // Forward 到另一个服务器，不指定来源服务器
  'POST /fmss/*': 'http://localhost:8081/',
  // 'POST /fmss/*': 'http://192.168.10.146:5001/',

  // Forward 到另一个服务器，并指定子路径
  // 请求 /someDir/0.0.50/index.css 会被代理到 https://g.alicdn.com/tb-page/taobao-home, 实际返回 https://g.alicdn.com/tb-page/taobao-home/0.0.50/index.css
  'GET /proxyDir/(.*)': 'http://dz14571854.imwork.net:23196/',


};