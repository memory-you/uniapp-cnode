import Vue from 'vue'
import Vuex from 'vuex'
import {
	accesstoken,
	user_detail,
	topic_collect
} from '@/common/interface.js'
Vue.use(Vuex)

const store = new Vuex.Store({
	state: {
		isLogin: false,
		accessToken: "",
		userInfo: {},
		topicInfo: []
	},
	mutations: {
		SET_LOGIN(state, data) {
			state.isLogin = data
		},
		SET_ACCESS_TOKEN(state, data) {
			state.accessToken = data
		},
		SET_USER_INFO(state, data) {
			state.userInfo = data
		},
		SET_TOPIC_INFO(state, data) {
			state.topicInfo = data
		}
	},
	actions: {
		// 获取用户信息
		getUserInfo({
			commit,
			state,
			dispatch
		}, data) {
			let {
				accessToken,
				callback
			} = data

			accesstoken({
				'accesstoken': accessToken
			}).then(res => {
				if (res.statusCode === 200 && res.data.success) {
					user_detail(res.data.loginname).then(res => {
						commit('SET_USER_INFO', res.data.data)
					})
					dispatch('getTopicInfo', res.data.loginname)
					commit('SET_ACCESS_TOKEN', accessToken)
					commit('SET_LOGIN', true)
					uni.setStorage({
						key: 'accessToken',
						data: accessToken,
						success() {
							if (callback) {
								callback()
							}
						}
					})

				} else {
					uni.showToast({
						title: res.data.error_msg,
						icon: 'none'
					})
				}
			})
		},
		// 获取用户收藏主题
		getTopicInfo({
			commit
		}, data) {
			topic_collect(data).then(res => {
				commit('SET_TOPIC_INFO', res.data.data)
			})
		},
		// 检验登录与否
		checkLogin({
			commit,
			dispatch
		}) {
			uni.getStorage({
				key: 'accessToken',
				success(res) {
					dispatch('getUserInfo', {
						accessToken: res.data
					})
				},
				fail() {
					console.log('获取token失败')
				}
			})
		},
		// 注销
		logout({
			commit
		}) {
			commit('SET_TOPIC_INFO', [])
			commit('SET_USER_INFO', {})
			commit('SET_ACCESS_TOKEN', '')
			commit('SET_LOGIN', false)
			uni.clearStorage()
		}
	}
})

export default store
