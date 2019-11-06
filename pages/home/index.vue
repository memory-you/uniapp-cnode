<template>
	<view class="page-home">
		<!-- #ifdef H5 -->
		<scroll-view scroll-x="true" scroll-with-animation class="page-home-vscroll fixed-top">
			<view class="page-home-vscroll-item" v-for="(item, index) in tabBars" :key="index">
				<view class="page-home-vscroll-text">{{ item.name }}</view>
			</view>
		</scroll-view>
		<!-- #endif -->
		<!-- #ifndef H5 -->
		<scroll-view scroll-x="true" scroll-with-animation class="page-home-vscroll">
			<view class="page-home-vscroll-item" v-for="(item, index) in tabBars" :key="index">
				<view class="page-home-vscroll-text">{{ item.name }}</view>
			</view>
		</scroll-view>
		<!-- #endif -->

		<article-list :information="currentData.list"></article-list>
	</view>
</template>

<script>
import { topics } from '@/common/interface.js';
import { formateTime } from '../../common/day.js';
import articleList from '../../components/information/article-list.vue';

export default {
	components: {
		articleList
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
			list: [
				{
					id: 'all',
					top: 0,
					page: 1,
					data: []
				},
				{
					id: 'good',
					top: 0,
					page: 1,
					data: []
				},
				{
					id: 'share',
					top: 0,
					page: 1,
					data: []
				},
				{
					id: 'ask',
					top: 0,
					page: 1,
					data: []
				},
				{
					id: 'job',
					top: 0,
					page: 1,
					data: []
				},
				{
					id: 'dev',
					top: 0,
					page: 1,
					data: []
				}
			],
			currentData: {
				id: 'all',
				list: []
			},
			tabIndex: 0,
			page: 1,
			scrollTop: 0,
			isFirst: true
		};
	},
	onLoad() {
		this.loadData(0, 1);
	},
	onReachBottom() {
		this.loadData(this.tabIndex, this.page);
	},
	methods: {
		getLabel(tab) {
			let label = '';
			this.tabBars.forEach(item => {
				if (item.id === tab) {
					label = item.name;
				}
			});
			return label;
		},
		loadData(index, page = 1) {
			let id = this.tabBars[index].id;
			let list = this.list[index];
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
		}
	}
};
</script>

<style lang="less">
.page-home {
	padding-top: 100upx;
	.page-home-vscroll {
		position: fixed;
		top: 0;
		left: 0;
		z-index: 10;
		height: 100upx;
		white-space: nowrap;
		background: rgb(69, 123, 190);

		&.fixed-top {
			top: 43rpx;
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
			width: 140upx;
			text-align: center;
			line-height: 100upx;
			margin-right: 20upx;
			color: #fff;

			.page-home-vscroll-text {
				display: inline-block;
				height: 100%;
			}
		}
	}
}
</style>
