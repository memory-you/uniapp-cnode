import fetch from './fetch.js'
const cnode = 'https://cnodejs.org';


// 主题首页
export function topics(data) {
	return fetch({
		url: cnode + '/api/v1/topics',
		method: 'GET',
		data
	})
}

// 主题详情
export function topic(id, data) {
	return fetch({
		url: cnode + '/api/v1/topic/' + id,
		method: 'GET',
		data
	})
}

// 主题收藏
export function collect(data) {
	return fetch({
		url: cnode + '/api/v1//topic_collect/collect',
		method: 'POST',
		data
	})
}

// 主题取消收藏
export function deCollect(data) {
	return fetch({
		url: cnode + '/api/v1/topic_collect/de_collect',
		method: 'POST',
		data
	})
}

// 用户收藏详情
export function topic_collect(id) {
	return fetch({
		url: cnode + '/api/v1/topic_collect/' + id,
		method: 'GET',
	})
}

// 用户信息详情
export function user_detail(loginname) {
	return fetch({
		url: cnode + '/api/v1/user/' + loginname,
		method: 'GET',
	})
}

// 验证 accessToken 的正确性
export function accesstoken(data) {
	return fetch({
		url: cnode + '/api/v1/accesstoken',
		method: 'POST',
		data
	})
}

// 获取未读信息数
export function unread_count(data) {
	return fetch({
		url: cnode + '/api/v1/message/count',
		method: 'GET',
		data
	})
}

// 获取已读和未读信息
export function messages(data) {
	return fetch({
		url: cnode + '/api/v1/messages',
		method: 'GET',
		data
	})
}

// 标记全部已读
export function mark_all() {
	return fetch({
		url: cnode + '/api/v1/message/mark_all',
		method: 'POST',
	})
}

// 标记单个信息为已读
export function mark_one(id) {
	return fetch({
		url: cnode + '/api/v1/message/mark_one/' + id,
		method: 'POST',
	})
}
