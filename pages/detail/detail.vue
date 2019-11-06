<template>
	<view class="page-detail" v-if="detail.content">
		<view class="fixed-tools">
			<view class="fixed-tools-replay">
				<view class="iconfont icon-edit"></view>
				写评论
			</view>
			<view class="r-icon iconfont icon-liuyan-o">
				<text class="badge">{{ detail.replay_count }}</text>
			</view>
			<view class="r-icon iconfont icon-staro"></view>
			<!-- <view class="r-icon iconfont icon-star"></view> -->
			<!-- #ifndef H5 -->
			<view class="r-icon iconfont icon-sharealt"></view>
			<!-- #endif -->
		</view>

		<view class="page-detail-container">
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
				<view class="page-detail-content"><parser :html="detail.content"></parser></view>
			</view>
			<view class="i-whitespace"></view>
			<replay-list :list-data="detail.replies" :count="detail.reply_count"></replay-list>
		</view>
	</view>
</template>

<script>
import parser from '@/common/jyf-Parser/index.vue';
import { topic } from '@/common/interface.js';
import { formateTime } from '../../common/day.js';
import replaylist from '@/components/information/reply-list.vue'

export default {
	components: {
		parser,
		replaylist
	},
	data() {
		return {
			detail: {},
			topic_id: ''
		};
	},
	onLoad(e) {
		this.topic_id = e.id;
		topic(this.topic_id, { mdrender: true, accesstoken: this.$store.state.accessToken }).then(res => {
			this.detail = res.data.data;
			this.detail.create_at = formateTime(this.detail.create_at);
			this.detail.replies.map(item => {
				item.is_author = this.detail.author.loginname === item.author.loginname ? '作者' : false;
				item.create_at = formateTime(item.create_at);
				return item;
			});
		});
	}
};
</script>

<style lang="less">
.page-detail {
	background: #fff;
	&-hd {
		position: relative;
		padding-bottom: 40upx;
		&:after {
			content: '';
			position: absolute;
			left: 30upx;
			right: 0;
			bottom: 0;
			height: 1px;
			background-color: #e8e8e8;
		}
	}
	&-title {
		font-size: 36upx;
		color: #373737;
		padding: 20upx 30upx;
	}
	&-hfooter {
		display: flex;
		flex-direction: row;
		justify-content: space-between;
		padding: 0 30upx;
		.left {
			display: flex;
			align-items: center;
		}
		.author {
			font-size: 26upx;
			color: #457bbe;
			padding-right: 20upx;
		}
		.time {
			font-size: 24upx;
			color: #9e9e9e;
		}
		.see {
			display: flex;
			align-items: center;
			font-size: 22upx;
			color: #c5c5c5;
			.iconfont {
				margin-right: 10upx;
				font-size: 24upx;
			}
		}
	}
	&-content {
		padding: 20upx 30upx;
		box-sizing: border-box;
		parse {
			overflow: hidden;
		}
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
	height: 100upx;
	background-color: #fff;
	box-shadow: 0 0 10upx rgba(0, 0, 0, 0.2);
	.fixed-tools-replay {
		display: flex;
		justify-content: center;
		align-items: center;
		flex: 1;
		margin: 0 30upx;
		height: 68upx;
		border-radius: 34upx;
		background-color: #ffffff;
		border: solid 1px #cbcbcb;
	}
	.r-icon {
		position: relative;
		display: flex;
		justify-content: center;
		align-items: center;
		width: 68upx;
		height: 68upx;
		border-radius: 50%;
		margin-right: 30upx;
		background-color: #f8f8f8;
		border: solid 1px #d0d0d0;
		.badge {
			position: absolute;
			right: 0;
			top: -12upx;
			display: block;
			padding: 0 10upx;
			height: 24upx;
			background-color: #e32e20;
			font-size: 20upx;
			line-height: 1.5;
			color: #ffffff;
			border-radius: 24upx;
			transform: translateX(50%);
		}
	}
	& ~ .page-detail-container {
		padding-bottom: 120upx;
	}
}
</style>
