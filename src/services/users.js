import request from '../utils/request';
import qs from 'qs';

export async function query(params) {
  return request(`/api/users?${qs.stringify(params)}`);
}

export async function querylocal(params) {
  return request('http://localhost:8989/api/note?start=0&device_type=android&ver_code=38&app_ver=3.4.1&open_udid=02%3A00%3A00%3A00%3A00%3A00&oauth_signature=jXmXMtYoeHE95F7mAl5PrrOU49U%3D&screen_height=1280&oauth_signature_method=HMAC-SHA1&oauth_consumer_key=5&oauth_version=1.0&oauth_timestamp=1479875516&oauth_nonce=e4be995f-57f2-4562-88b0-df91a30e661d&device_id=02%3A00%3A00%3A00%3A00%3A00&list=FollowNoteList&sys_ver=6.0.1&channel_id=wandoujia&screen_width=720&device_token=AjHuEe-V_cFo8-I-EqcW8ndIcz9hAb1bVicvt98wOeO3&oauth_token=0_9837387abc33331ab&ywsdk_ver=20140507&ver=6&x_auth_mode=client_auth&app_code=com.yuwei.android');
}
export async function create(params) {
  return request('/api/users', {
    method: 'post',
    body: qs.stringify(params),
  });
}

export async function remove(params) {
  return request('/api/users', {
    method: 'delete',
    body: qs.stringify(params),
  });
}

export async function update(params) {
  return request('/api/users', {
    method: 'put',
    body: qs.stringify(params),
  });
}
