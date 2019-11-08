<template>
	<view class="page-home">
		<!-- 滑动Tab栏 -->
		<!-- #ifdef H5 -->
		<scroll-view scroll-x="true" scroll-with-animation :scroll-into-view="toView" class="page-home-vscroll fixed-top">
			<view class="page-home-vscroll-item" :class="{ 'is-active': tabIndex === index }" v-for="(item, index) in tabBars" :id="item.id" :key="index" @click="tabHandle(index)">
				<view class="page-home-vscroll-text">{{ item.name }}</view>
			</view>
		</scroll-view>
		<!-- #endif -->
		<!-- #ifndef H5 -->
		<scroll-view scroll-x="true" scroll-with-animation :scroll-into-view="toView" class="page-home-vscroll">
			<view class="page-home-vscroll-item" :class="{ 'is-active': tabIndex === index }" v-for="(item, index) in tabBars" :key="index" :id="item.id" @click="tabHandle(index)">
				<view class="page-home-vscroll-text">{{ item.name }}</view>
			</view>
		</scroll-view>
		<!-- #endif -->

		<!-- 文章列表 -->
		<article-list :information="currentData.list"></article-list>

		<!-- 加载组件 -->
		<load-more :loading-type="loadingType" :content-text="loadingText"></load-more>
	</view>
</template>

<script>
import { topics } from '@/common/interface.js';
import { formateTime } from '@/common/day.js';
import articleList from '@/components/information/article-list.vue';
import loadMore from '@/components/uni-load-more/uni-load-more.vue';

export default {
	components: {
		articleList,
		loadMore
	},
	data() {
		return {
			tabBars: [
				{
					name: '全部',
					id: 'all'
				},
				{
					name: '精华',
					id: 'good'
				},
				{
					name: '分享',
					id: 'share'
				},
				{
					name: '问答',
					id: 'ask'
				},
				{
					name: '招聘',
					id: 'job'
				},
				{
					name: '测试',
					id: 'dev'
				}
			],
			currentData: {
				id: 'all',
				list: []
			},
			tabIndex: 0,
			page: 1,
			toView: 'all',
			scrollTop: 0,
			isFirst: true,
			loadingType: 0,
			loadingText: {
				contentdown: '上拉显示更多',
				contentrefresh: '正在加载...',
				contentnomore: '没有更多数据了'
			}
		};
	},
	onLoad() {
		this.loadData(0, 1);
	},
	onReachBottom() {
		this.loadData(this.tabIndex, this.page);
	},
	methods: {
		// tab切换触发的滑动效果和文章加载
		tabHandle(index) {
			uni.showLoading({
				title: '加载中'
			});
			this.tabIndex = index;
			switch (index) {
				case 0:
				case 1:
				case 2:
					this.toView = this.tabBars[0].id;
					break;
				default:
					this.toView = this.tabBars[3].id;
			}
			this.loadData(index);
		},
		// 将英文标题转为对应中文
		getLabel(tab) {
			let label = '';
			this.tabBars.forEach(item => {
				if (item.id === tab) {
					label = item.name;
				}
			});
			return label;
		},
		// 从API中获取数据
		loadData(index, page = 1) {
			let id = this.tabBars[index].id;
			topics({
				limit: 5,
				page: page,
				tab: id,
				mdrender: false
			}).then(res => {
				if (res.statusCode === 200) {
					let resData = res.data.data;
					let getData = [];
					getData = resData.map(item => {
						item.create_at = formateTime(item.create_at);
						item.label = this.getLabel(item.tab);
						return item;
					});

					if (this.tabBars[index].id === this.currentData.id) {
						if (this.isFirst) {
							this.isFirst = false;
							this.currentData.list = getData;
							this.page++;
						} else {
							this.currentData.list = this.currentData.list.concat(getData);
							this.page++;
						}
					} else {
						this.currentData.list = [];
						this.$nextTick(function() {
							this.currentData.list = getData;
							this.page = 2;
							this.currentData.id = this.tabBars[index].id;
							uni.pageScrollTo({
								scrollTop: 0,
								duration: 0
							});
						});
					}
				}
			});
			setTimeout(function() {
				uni.hideLoading();
			}, 500);
		}
	}
};
</script>

<style lang="less">
.page-home {
	padding-top: 100rpx;
	.page-home-vscroll {
		position: fixed;
		top: 0rpx;
		left: 0;
		z-index: 10;
		height: 100rpx;
		white-space: nowrap;
		background: rgb(69, 123, 190);

		&.fixed-top {
			top: 43px;
		}

		::-webkit-scrollbar {
			width: 0;
			height: 0;
			background-color: transparent;
		}

		.page-home-vscroll-item {
			position: relative;
			display: inline-block;
			height: 100%;
			width: 20%;
			text-align: center;
			line-height: 100rpx;
			margin-right: 20rpx;
			color: #fff;

			.page-home-vscroll-text {
				display: inline-block;
				height: 100%;
			}
		}
	}

	.is-active {
		.page-home-vscroll-text {
			font-weight: bold;
		}

		.page-home-vscroll-text:after {
			position: absolute;
			left: 50%;
			bottom: 0;
			transform: translateX(-50%);
			content: '';
			height: 6upx;
			width: 60upx;
			background: #fff;
			transition: all 0.5s ease-in-out;
		}
	}
}
</style>
