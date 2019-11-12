<template>
	<view class="message-item" @click="toMessage(message.topic.id)">
		<view class="author-thumb">
			<view class="author-img"><image :src="message.author.avatar_url"></image></view>
			<view class="message-info">
				<view class="author-one">
					<view class="author-name">{{ message.author.loginname }}</view>
					<view class="create-time">{{ formateTime(message.create_at) }}</view>
				</view>
				<view class="author-two">
					<view class="message-type">回复了您的主题</view>
					<view class="message-read" v-if="!message.has_read"></view>
				</view>
			</view>
		</view>
		<view class="message-content"><parse :html="message.reply.content"></parse></view>
		<view class="article-info">主题: {{ message.topic.title }}</view>
	</view>
</template>

<script>
import parse from '@/components/jyf-Parser/index.vue';
import { formateTime } from '@/common/day.js';

export default {
	props: {
		message: {}
	},
	components: {
		parse
	},
	methods: {
		formateTime,
		toMessage(id) {
			console.log(1);
			uni.navigateTo({
				url: `/pages/detail/detail?id=${id}`
			});
		}
	}
};
</script>

<style lang="less">
.message-item {
	padding: 30rpx 30rpx;
	border-bottom: 1px solid #1aad19;

	.author-thumb {
		display: flex;
		align-items: center;
		padding-bottom: 10rpx;

		.author-img {
			padding-right: 20rpx;
			image {
				width: 70rpx;
				height: 70rpx;
				border-radius: 50%;
			}
		}

		.message-info {
			display: flex;
			flex-direction: column;
			width: 100%;

			.author-one {
				display: flex;
				justify-content: space-between;

				.author-name {
					font-size: 28rpx;
					color: #373737;
				}
			}

			.author-two {
				display: flex;
				justify-content: space-between;
				align-items: center;

				.message-type {
					font-size: 20rpx;
					color: #9e9e9e;
				}

				.message-read {
					margin-right: 20rpx;
					width: 10rpx;
					height: 10rpx;
					border-radius: 50%;
					background-color: #df5000;
				}
			}
		}
	}

	.message-content {
		padding-bottom: 20rpx;
	}

	.article-info {
		background: #999999;
		border-radius: 6rpx;
		padding: 10rpx 20rpx;
		color: #fff;
	}
}
</style>
