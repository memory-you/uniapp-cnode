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
				<view class="article-list-label">{{ item.label }}</view>
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
		padding: 20upx 30upx 30upx 30upx;

		&.is-hover {
			background: #f8f8f8;
		}

		.article-list-userinfo {
			display: flex;
			justify-content: space-between;
			align-items: center;
			height: 40upx;
			font-size: 30upx;
			color: #545454;

			.article-list-userinfo-left {
				display: flex;
				align-items: center;
				height: 40upx;
			}

			.article-list-avatar {
				width: 40upx;
				height: 40upx;
				border-radius: 50%;
				overflow: hidden;
				background-color: #a1e6f7;
				margin-right: 20upx;
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
			font-size: 30upx;
			margin-top: 25upx;
			margin-bottom: 18upx;
			color: #333333;
		}

		.article-list-desc {
			font-size: 24upx;
			line-height: 36upx;
			color: #a2a2a2;
		}

		.article-list-footer {
			position: relative;
			display: flex;
			height: 28upx;
			padding-top: 20upx;
			margin-top: 28upx;
			&:after {
				position: absolute;
				left: 0;
				top: 0;
				content: '';
				width: 50upx;
				height: 1px;
				background: #d6d9e1;
			}
		}

		.article-list-label {
			width: 60upx;
			height: 32upx;
			line-height: 32upx;
			background-color: #49caca;
			border-radius: 8upx;
			font-size: 18upx;
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
			height: 28upx;
			align-items: center;
			font-size: 22upx;
			color: #c5c5c5;
			padding-left: 20upx;
			.iconfont {
				margin-right: 8upx;
			}
		}
	}
}
</style>
