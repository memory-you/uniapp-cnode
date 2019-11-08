<template>
	<view class="mine-list">
		<view class="mine-list-item" v-if="list" v-for="(item, index) in list" :key="index" @click="toDetail(item.id)">
			<view class="author-thumb"><image :src="item.author.avatar_url"></image></view>
			<view class="article-info">
				<view class="article-title">{{ item.title }}</view>
				<view class="article-detail">
					<view class="author-name">{{ item.author.loginname }}</view>
					<view class="create-time">{{ formateTime(item.last_reply_at) }}</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
import { formateTime } from '@/common/day.js';
export default {
	props: {
		list: {
			type: Array
		}
	},
	methods: {
		formateTime,
		toDetail(id) {
			uni.navigateTo({
				url: `/pages/detail/detail?id=${id}`
			});
		}
	}
};
</script>

<style lang="less">
.mine-list {
	&-item {
		display: flex;
		align-items: center;
		border-bottom: 1px solid #e8e8e8;
		padding: 20rpx 30rpx;

		.author-thumb {
			width: 80rpx;
			height: 80rpx;
			border-color: #000000;
			border-radius: 50%;
			overflow: hidden;
			border: 1px solid #c8c8c8;

			image {
				width: 100%;
				height: 100%;
			}
		}

		.article-info {
			display: flex;
			flex-direction: column;
			margin-left: 40rpx;
			width: 80%;

			.article-detail {
				display: flex;
				justify-content: space-between;

				.author-name,
				.create-time {
					font-size: 20rpx;
					line-height: 60rpx;
				}
			}
		}
	}
}
</style>
