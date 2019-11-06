<template>
	<view class="reply">
		<view class="reply-title">全部评论{{ count }}</view>
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
		</view>
	</view>
</template>

<script>
import { replyUps } from '@/common/interface.js';
import parse from '@/common/jyf-Parser/index.vue';
export default {
	components: {
		parse
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
	},
	watch: {
		listData(val) {
			this.list = this.listData;
		}
	}
};
</script>

<style lang="less">
.reply {
	&-title {
		position: relative;
		display: flex;
		align-items: center;
		height: 80upx;
		padding-left: 30upx;

		&:after {
			content: '';
			position: absolute;
			left: 30upx;
			right: 0;
			bottom: 0;
			height: 1rpx;
			background-color: #e8e8e8;
		}
	}

	&-list {
		&-item {
			display: flex;
			padding-left: 30upx;
			padding-top: 30upx;
		}

		&-thumb {
			width: 70upx;
			height: 70upx;
			margin-right: 25upx;
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
			padding-right: 30upx;
			padding-bottom: 30upx;

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
				font-size: 28upx;
				color: #373737;
			}

			.is-author {
				display: inline-block;
				padding: 0upx 10upx;
				background-color: #86cdff;
				border-radius: 8upx;
				font-size: 18upx;
				color: #ffffff;
			}

			.floor {
				font-size: 24upx;
				color: #9e9e9e;
				vertical-align: middle;
			}

			.content {
				font-size: 28upx;
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
					width: 120upx;
					vertical-align: middle;

					.iconfont {
						padding-right: 10upx;
					}

					&.is-active {
						.iconfont {
							color: rgb(68, 123, 190);
						}

						text {
							color: rgb(69, 123, 190);
						}
					}
				}

				.like,
				.comment {
					display: flex;
					align-items: center;
					vertical-align: middle;
				}

				.iconfont {
					color: #9e9e9e;
				}

				text {
					font-size: 24upx;
					color: #9e9e9e;
				}
			}
		}
	}
}
</style>
