<template>
	<view class="article-list">
		<view class="article-list-item" @click="toDetail(item.id)" hover-class="is-hover" v-for="(item, index) in information" :key="index">
			<view class="article-list-userinfo">
				<view class="article-list-userinfo-left">
					<view class="article-list-avatar"><image :src="item.author.avatar_url"></image></view>
					<view class="article-list-username">{{ item.author.loginname }}</view>
				</view>
				<view class="article-list-time">{{ item.create_at }}</view>
			</view>
			<view class="article-list-title i-ellipsis-2">
				<text v-if="item.top">【置顶】</text>
				<text v-if="item.good">【精华】</text>
				{{ item.title }}
			</view>
			<view class="article-list-desc i-ellipsis-2">{{ item.content }}</view>
			<view class="article-list-footer">
				<view class="article-list-label" :class="item.tab">{{ item.label }}</view>
				<view class="article-list-fnum">
					<view class="iconfont icon-eye"></view>
					{{ item.visit_count }}
				</view>
				<view class="article-list-fnum">
					<view class="iconfont icon-pinglun"></view>
					{{ item.reply_count }}
				</view>
			</view>
		</view>
	</view>
</template>

<script>
export default {
	props: {
		information: {
			type: Array
		}
	},
	methods: {
		toDetail(id) {
			uni.navigateTo({
				url: `/pages/detail/detail?id=${id}`
			});
		}
	}
};
</script>

<style lang="less">
.article-list {
	background: #fff;

	.article-list-item {
		position: relative;
		padding: 20rpx 30rpx 30rpx 30rpx;

		&.is-hover {
			background: #f8f8f8;
		}

		.article-list-userinfo {
			display: flex;
			justify-content: space-between;
			align-items: center;
			height: 40rpx;
			font-size: 30rpx;
			color: #545454;

			.article-list-userinfo-left {
				display: flex;
				align-items: center;
				height: 40rpx;
			}

			.article-list-avatar {
				width: 40rpx;
				height: 40rpx;
				border-radius: 50%;
				overflow: hidden;
				background-color: #a1e6f7;
				margin-right: 20rpx;
				image {
					display: block;
					width: 100%;
					height: 100%;
				}
			}

			.article-list-time {
				color: #c5c5c5;
			}
		}

		.article-list-title {
			font-size: 30rpx;
			margin-top: 25rpx;
			margin-bottom: 18rpx;
			color: #333333;
		}

		.article-list-desc {
			font-size: 24rpx;
			line-height: 36rpx;
			color: #a2a2a2;
		}

		.article-list-footer {
			position: relative;
			display: flex;
			height: 28rpx;
			padding-top: 20rpx;
			margin-top: 28rpx;
			&:after {
				position: absolute;
				left: 0;
				top: 0;
				content: '';
				width: 50rpx;
				height: 1px;
				background: #d6d9e1;
			}
		}

		.article-list-label {
			width: 60rpx;
			height: 32rpx;
			line-height: 32rpx;
			background-color: #49caca;
			border-radius: 8rpx;
			font-size: 18rpx;
			line-height: 1.8;
			text-align: center;
			color: #ffffff;
			&.good {
				background-color: #49caca;
			}
			&.share {
				background-color: #ff9900;
			}
			&.ask {
				background-color: #86cdff;
			}
			&.job {
				background-color: #49caca;
			}
			&.dev {
				background-color: #1aa034;
			}
		}

		.article-list-fnum {
			display: flex;
			height: 28rpx;
			align-items: center;
			font-size: 22rpx;
			color: #c5c5c5;
			padding-left: 20rpx;
			.iconfont {
				margin-right: 8rpx;
			}
		}
	}
}
</style>
