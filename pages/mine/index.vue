<template>
	<view class="page-mine">
		<view class="page-mine-header">
			<view class="page-mine-header-top">
				<view class="page-mine-avatar">
					<view class="logout" @click="logout" v-if="isLogin === true">退出登录</view>
					<view class="page-mine-avatar-thumb">
						<block v-if="isLogin === true">
							<view class="page-mine-avatar-thumbcon"><image :src="userInfo.avatar_url" alt="" /></view>
						</block>
						<block v-if="isLogin === false">
							<view class="page-mine-avatar-thumbcon" @click="goLogin"><view class="page-mine-avatar-button">去登录</view></view>
						</block>
					</view>
					<view class="page-mine-avatar-username" v-if="isLogin === true">{{ userInfo.loginname }}</view>
					<view class="page-mine-avatar-useremail" v-if="isLogin === true">{{ userInfo.githubUsername + '@github.com' }}</view>
					<view class="page-mine-detail">
						<view class="page-mine-create-time" v-if="isLogin === true">注册时间: {{ create_at }}</view>
						<view class="page-mine-score" v-if="isLogin === true">积分: {{ userInfo.score }}</view>
					</view>
				</view>
			</view>
			<view class="page-mine-header-bottom page-mine-tools">
				<view class="page-mine-tools-item" v-for="(item, index) in tabBars" :key="index" :class="{ 'is-active': isLogin && tabIndex === index }">
					<view class="page-mine-tools-text" @click="tabHandle(index)">{{ item.text }}</view>
				</view>
			</view>
		</view>

		<mine-list :list="current_list"></mine-list>
	</view>
</template>

<script>
import mineList from '@/components/information/mine-list.vue';
import { mapState, mapActions, mapMutations } from 'vuex';
import { topic_collect } from '@/common/interface.js';

export default {
	components: {
		mineList
	},
	computed: {
		...mapState(['isLogin', 'userInfo', 'topicInfo'])
	},
	data() {
		return {
			tabBars: [
				{
					text: '最近回复'
				},
				{
					text: '最近发布'
				},
				{
					text: '话题收藏'
				}
			],
			tabIndex: 0,
			reply_list: [],
			release_list: [],
			topic_list: [],
			current_list: this.replay_list,
			create_at: ''
		};
	},
	watch: {
		userInfo() {
			this.reply_list = this.userInfo.recent_replies;
			this.current_list = this.reply_list;
			this.create_at = this.userInfo.create_at.substr(0, 10);
			this.release_list = this.userInfo.recent_topics;
		},
		topicInfo() {
			this.topic_list = this.topicInfo;
			if (this.tabIndex === 2) {
				this.current_list = this.topic_list
			}
		}
	},
	onLoad() {
		this.checkLogin();
	},
	methods: {
		...mapActions(['logout']),
		// 去登录
		goLogin() {
			uni.navigateTo({
				url: '/pages/login/index'
			});
		},
		// 检查是否登录了
		checkLogin() {
			var self = this;
			uni.getStorage({
				key: 'accessToken',
				success(res) {
					self.$store.dispatch('getUserInfo', { accessToken: res.data });
				},
				fail() {
					console.log('获取token失败');
				}
			});
		},
		// tab切换触发的滑动效果和文章加载
		tabHandle(index = 0) {
			this.tabIndex = index;
			if (this.tabIndex === 0) {
				this.current_list = this.reply_list;
			}
			if (this.tabIndex === 1) {
				this.current_list = this.release_list;
			}
			if (this.tabIndex === 2) {
				this.current_list = this.topic_list;
			}
		}
	}
};
</script>

<style lang="less">
.page-mine {
	&-header {
		height: 400rpx;
		background-color: #457bbe;

		&-top {
			height: 300rpx;
		}

		&-bottom {
			height: 100rpx;
		}
	}

	&-tools {
		display: flex;
		flex-direction: row;

		&-item {
			position: relative;
			display: flex;
			flex: 1;
			align-items: center;
			justify-content: center;
			color: #fff;

			.iconfont {
				font-size: 22rpx;
			}

			&:after {
				content: '';
				position: absolute;
				right: 0;
				top: 20rpx;
				width: 1rpx;
				height: 90rpx;
				background: rgba(255, 255, 255, 0.2);
			}

			.page-mine-tools-text:after {
				position: absolute;
				left: 50%;
				bottom: 0;
				transform: translateX(-50%);
				content: '';
				height: 6upx;
				width: 0;
				background: #55a532;
				transition: all 0.5s ease-in-out;
			}
		}

		&-text {
			font-size: 20rpx;
			padding-left: 10rpx;
		}

		.is-active {
			.page-mine-tools-text {
				font-weight: bold;
			}

			.page-mine-tools-text:after {
				width: 100%;
			}
		}
	}

	&-avatar {
		padding-top: 10rpx;
		position: relative;
		&-thumb {
			position: relative;
			width: 148upx;
			height: 148rpx;
			border: 10rpx solid rgba(255, 255, 255, 0.2);
			overflow: hidden;
			border-radius: 50%;
			margin: 0 auto;
			&con {
				position: relative;
				width: 148rpx;
				height: 148rpx;
				background-color: #ffffff;
				display: flex;
				justify-content: center;
				align-items: center;
				image {
					display: block;
					width: 100%;
					height: 100%;
				}
			}
		}
		&-button {
			position: absolute;
			left: 0;
			right: 0;
			top: 0;
			bottom: 0;
			text-align: center;
			line-height: 148rpx;
			font-size: 30rpx;
			color: #0086b3;
		}

		&-username {
			padding-top: 20rpx;
			font-size: 20rpx;
			text-align: center;
			color: #fff;
		}

		&-useremail {
			font-size: 20rpx;
			text-align: center;
			color: #c0c0c0;
		}
	}

	&-detail {
		display: flex;
		justify-content: space-between;
		padding: 0 30rpx;
		align-items: center;

		.page-mine-create-time {
			font-size: 16rpx;
			color: #fff;
		}

		.page-mine-score {
			font-size: 16rpx;
			color: #09bb07;
		}
	}

	.logout {
		position: absolute;
		right: 15rpx;
		top: 0;
		width: 100rpx;
		height: 64rpx;
		background-color: #1AAD19;
		line-height: 64rpx;
		text-align: center;
		border-radius: 10rpx;
		font-size: 20rpx;
		color: #f4f3f3;
	}
}
</style>
