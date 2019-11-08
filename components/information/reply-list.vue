<template>
	<view class="reply">
		<!-- 评论区头部 -->
		<view class="reply-title">全部评论{{ count }}</view>
		<!-- 评论 -->
		<view class="reply-list">
			<view class="reply-list-item" v-if="list" v-for="(item, index) in list" :key="index">
				<view class="reply-list-thumb"><image :src="item.author.avatar_url"></image></view>
				<view class="reply-list-info">
					<view class="loginname">
						{{ item.author.loginname }}
						<text class="is-author" v-if="item.is_author">{{ item.is_author }}</text>
					</view>
					<view class="floor">第{{ index + 1 }}楼 {{ item.create_at }}</view>
					<view class="content"><parse :html="item.content"></parse></view>
					<view class="tools">
						<view class="like">
							<view class="iconfont icon-like">
								<text>{{ item.ups.length }}</text>
							</view>
						</view>
						<view class="comment"><view class="iconfont icon-liuyan-o"></view></view>
					</view>
				</view>
			</view>
			<!-- 没有评论的时候 -->
			<i-abnor v-if="!list.length" thumb="../../static/images/abnor.png" thumbStyle="width:238rpx;height:188rpx" text="暂无评论"></i-abnor>
		</view>
	</view>
</template>

<script>
import parse from '@/components/jyf-Parser/index.vue';
import iAbnor from '@/components/i-abnor/i-abnor.vue';

export default {
	components: {
		parse,
		iAbnor
	},
	props: {
		count: {
			type: Number,
			default: 0
		},
		listData: {
			type: Array,
			default: function() {
				return [];
			}
		}
	},
	data() {
		return {
			list: this.listData
		};
	}
};
</script>

<style lang="less">
.reply {
	&-title {
		position: relative;
		display: flex;
		align-items: center;
		padding-left: 30rpx;
		height: 80rpx;

		&:after {
			content: '';
			position: absolute;
			left: 30rpx;
			right: 0;
			bottom: 0;
			height: 1rpx;
			background-color: #e8e8e8;
		}
	}

	&-list {
		&-item {
			display: flex;
			padding-left: 30rpx;
			padding-top: 30rpx;
		}

		&-thumb {
			width: 70rpx;
			height: 70rpx;
			margin-right: 25rpx;
			border-color: #000000;
			border-radius: 50%;
			overflow: hidden;
			border: 1px solid #c8c8c8;

			image {
				width: 100%;
				height: 100%;
			}
		}

		&-info {
			position: relative;
			flex: 1;
			overflow: hidden;
			box-sizing: border-box;
			padding-right: 30rpx;
			padding-bottom: 30rpx;

			&:after {
				content: '';
				position: absolute;
				left: 0;
				right: 0;
				bottom: 0;
				height: 1rpx;
				background-color: #e8e8e8;
			}

			.loginname {
				font-size: 28rpx;
				color: #373737;
			}

			.is-author {
				display: inline-block;
				padding: 0rpx 10rpx;
				background-color: #86cdff;
				border-radius: 8rpx;
				font-size: 18rpx;
				color: #ffffff;
			}

			.floor {
				font-size: 24rpx;
				color: #9e9e9e;
				vertical-align: middle;
			}

			.content {
				font-size: 28rpx;
				box-sizing: border-box;
				overflow: hidden;
				color: #373737;
			}

			.tools {
				display: flex;
				align-items: center;
				justify-content: flex-end;
				vertical-align: middle;

				.like {
					width: 120rpx;
					vertical-align: middle;
				}

				.like,
				.comment {
					display: flex;
					align-items: center;
					vertical-align: middle;

					.iconfont {
						color: #9e9e9e;
						padding-right: 10rpx;
					}

					text {
						font-size: 24rpx;
						color: #9e9e9e;
					}
				}
			}
		}
	}
}
</style>
