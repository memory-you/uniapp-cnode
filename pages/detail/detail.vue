<template>
	<view class="page-detail" v-if="detail.content">
		<!-- 固定在底部的工具栏 -->
		<view class="fixed-tools">
			<view class="fixed-tools-reply">
				<view class="iconfont icon-edit"></view>
				写评论
			</view>
			<view class="r-icon iconfont icon-liuyan-o" @click="goReply">
				<text class="badge">{{ detail.reply_count }}</text>
			</view>
			<view class="r-icon iconfont icon-staro" v-if="!detail.is_collect" @click="to_collect"></view>
			<view class="r-icon iconfont icon-star is-active" v-if="detail.is_collect" @click="de_collect"></view>
			<!-- #ifndef H5 -->
			<button class="r-icon iconfont icon-sharealt" open-type="share"></button>
			<!-- #endif -->
		</view>

		<!-- 页面内容 -->
		<view class="page-detail-container" id="page-detail-container">
			<!-- 文章内容 -->
			<view class="page-detail-container-wrapper">
				<view class="page-detail-hd">
					<view class="page-detail-title">{{ detail.title }}</view>
					<view class="page-detail-hfooter">
						<view class="left">
							<view class="author">{{ detail.author.loginname }}</view>
							<view class="time">{{ detail.create_at }}</view>
						</view>
						<view class="see">
							<view class="iconfont icon-eye">{{ detail.visit_count }}</view>
						</view>
					</view>
				</view>
				<view class="page-detail-content"><parse :html="detail.content" @navigate="navigate"></parse></view>
			</view>

			<view class="i-whitespace"></view>

			<!-- 评论区 -->
			<replylist :list-data="detail.replies" :count="detail.reply_count"></replylist>
		</view>
	</view>
</template>

<script>
import parse from '@/components/jyf-Parser/index.vue';
import { mapState, mapActions } from 'vuex';
import { topic, collect, deCollect } from '@/common/interface.js';
import { formateTime } from '@/common/day.js';
import replylist from '@/components/information/reply-list.vue';

export default {
	components: {
		parse,
		replylist
	},
	computed: {
		...mapState(['topicInfo', 'userInfo'])
	},
	data() {
		return {
			detail: {},
			topic_id: ''
		};
	},
	onLoad(e) {
		this.topic_id = e.id;
		// 获取文章所有内容（包括评论）
		topic(this.topic_id, { mdrender: true, accesstoken: this.$store.state.accessToken }).then(res => {
			this.detail = res.data.data;
			// 转换时间
			this.detail.create_at = formateTime(this.detail.create_at);
			this.detail.replies.map(item => {
				// 判断是不是作者
				item.is_author = this.detail.author.loginname === item.author.loginname ? '作者' : false;
				item.create_at = formateTime(item.create_at);
				return item;
			});
		});
	},
	methods: {
		...mapActions(['getTopicInfo']),
		// 如允许点击超链接跳转，则应该打开一个新页面，并传入href，由新页面内嵌webview组件负责显示该链接内容。
		navigate(href, e) {
			uni.showModal({
				content: '点击链接为:' + href,
				showCancel: false
			});
		},
		// 跳到评论列表
		goReply() {
			let view = uni.createSelectorQuery().select('#page-detail-container');
			view.boundingClientRect(data => {
				let height = data.height;
				uni.pageScrollTo({
					scrollTop: height,
					duration: 100
				});
			}).exec();
		},
		// 收藏
		to_collect() {
			if (this.$store.state.accessToken) {
				collect({
					topic_id: this.topic_id
				}).then(res => {
					if (res.data.success) {
						uni.showToast({
							title: '收藏成功',
							icon: 'none'
						});
						this.detail.is_collect = true;
						this.getTopicInfo(this.userInfo.loginname);
					} else {
						this.detail.is_collect = true;
					}
				});
			} else {
				uni.showModal({
					title: '提示',
					content: '收藏失败，您还没登录',
					confirmText: '去登录',
					success(res) {
						if (res.confirm) {
							uni.navigateTo({
								url: '/pages/login/index'
							});
						} else if (res.cancel) {
							console.log('用户点击取消');
						}
					}
				});
			}
		},
		// 取消收藏
		de_collect() {
			deCollect({
				topic_id: this.topic_id
			}).then(res => {
				if (res.data.success) {
					uni.showToast({
						title: '取消收藏成功',
						icon: 'none'
					});
					this.getTopicInfo(this.userInfo.loginname);
					this.detail.is_collect = false;
				}
			});
		},
		// 分享
		share() {
			uni.share({
				provider: 'weixin',
				scene: 'WXSenceTimeline',
				type: 0,
				href: 'http://uniapp.dcloud.io/',
				title: 'uni-app分享',
				summary: '我正在使用HBuilderX开发uni-app，赶紧跟我一起来体验！',
				imageUrl: 'https://img-cdn-qiniu.dcloud.net.cn/uniapp/images/uni@2x.png',
				success: function(res) {
					console.log('success:' + JSON.stringify(res));
				},
				fail: function(err) {
					console.log('fail:' + JSON.stringify(err));
				}
			});
		}
	}
};
</script>

<style lang="less">
.page-detail {
	background: #fff;

	&-hd {
		position: relative;
		padding-bottom: 40rpx;

		&:after {
			content: '';
			position: absolute;
			left: 30rpx;
			right: 0;
			bottom: 0;
			height: 1px;
			background-color: #e8e8e8;
		}
	}

	&-title {
		padding: 20rpx 30rpx;
		font-size: 36rpx;
		color: #373737;
	}

	&-hfooter {
		display: flex;
		flex-direction: row;
		justify-content: space-between;
		padding: 0 30rpx;

		.left {
			display: flex;
			align-items: center;
		}

		.author {
			padding-right: 20rpx;
			font-size: 26rpx;
			color: #457bbe;
		}

		.time {
			font-size: 24rpx;
			color: #9e9e9e;
		}

		.see {
			display: flex;
			align-items: center;
			font-size: 22rpx;
			color: #c5c5c5;

			.iconfont {
				margin-right: 10rpx;
				font-size: 24rpx;
			}
		}
	}

	&-content {
		padding: 20rpx 30rpx;
		box-sizing: border-box;
		parse {
			overflow: hidden;
		}
	}

	.fixed-tools {
		position: fixed;
		left: 0;
		right: 0;
		bottom: 0;
		z-index: 10;
		display: flex;
		align-items: center;
		height: 100rpx;
		background-color: #fff;
		box-shadow: 0 0 10rpx rgba(0, 0, 0, 0.2);
		.fixed-tools-reply {
			display: flex;
			justify-content: center;
			align-items: center;
			flex: 1;
			margin: 0 30rpx;
			height: 68rpx;
			border-radius: 34rpx;
			background-color: #ffffff;
			border: solid 1px #cbcbcb;
		}

		.r-icon {
			position: relative;
			display: flex;
			justify-content: center;
			align-items: center;
			width: 68rpx;
			height: 68rpx;
			border-radius: 50%;
			margin-right: 30rpx;
			background-color: #f8f8f8;
			border: solid 1px #d0d0d0;

			.badge {
				position: absolute;
				right: 0;
				top: -10rpx;
				// display: block;
				height: 34rpx;
				width: 34rpx;
				border-radius: 50%;
				background-color: #e32e20;
				font-size: 20rpx;
				line-height: 1.5;
				color: #ffffff;
				text-align: center;
				transform: translateX(50%);
			}
		}

		.is-active {
			color: rgb(69, 123, 190);
		}

		& ~ .page-detail-container {
			padding-bottom: 120rpx;
		}
	}
}
</style>
