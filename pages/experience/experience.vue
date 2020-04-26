<template>
	<view class="content">
		<timeline>
			<timelineItem>
				<view class="tripItem">
					<view class="time">2020-08-05 11:56:54</view>
					<view class="title">
						<image src="../../static/missing-face.png"></image>
						<text>谢广坤</text>
					</view>
					<view class="tips">内容：代理商的减肥了快速的减肥是多了几分水电费老师就打开了福建省水电费了深刻的减肥了圣诞节开发水电费了几十块的反馈了</view>
				</view>
			</timelineItem>
			<timelineItem>
				<view class="tripItem">
					<view class="time">2020-08-05 11:56:54</view>
					<view class="title">
						<image src="../../static/missing-face.png"></image>
						<text>谢广坤</text>
					</view>
					<view class="tips">内容：代理商的减肥了快速的减肥是多了几分水电费老师就打开了福建省水电费了深刻的减肥了圣诞节开发水电费了几十块的反馈了</view>
				</view>
				<view class="tripItem my">
					<view class="time">2020-08-05 11:56:54</view>
					<view class="title">
						<image src="../../static/tab-my-current.png"></image>
						<text>我</text>
					</view>
					<view class="tips">内容：代理商的减肥了快的减肥是多了几分水电费老师就打开了福建省水电费了深刻的减肥了圣诞节开发水电费了几十块的反馈了</view>
				</view>
			</timelineItem>
			<timelineItem>
				<view class="tripItem">
					<view class="time">2020-08-05 11:56:54</view>
					<view class="title">
						<image src="../../static/missing-face.png"></image>
						<text>谢广坤</text>
					</view>
					<view class="tips">内容：代理商的减肥了快速的减肥是多了几分水电费老师就打开了福建省水电费了深刻的减肥了圣诞节开发水电费了几十块的反馈了</view>
				</view>
				<view class="tripItem my">
					<view class="time">2020-08-05 11:56:54</view>
					<view class="title">
						<image src="../../static/tab-my-current.png"></image>
						<text>我</text>
					</view>
					<view class="tips">内容：代理商的减肥了快的减肥是多了几分水电费老师就打开了福建省水电费了深刻的减肥了圣诞节开发水电费了几十块的反馈了</view>
				</view>
			</timelineItem>
			<timelineItem>
				<view class="tripItem">
					<view class="time">2020-08-05 11:56:54</view>
					<view class="title">
						<image src="../../static/missing-face.png"></image>
						<text>谢广坤</text>
					</view>
					<view class="tips">内容：代理商的减肥了快速的减肥是多了几分水电费老师就打开了福建省水电费了深刻的减肥了圣诞节开发水电费了几十块的反馈了</view>
				</view>
				<view class="tripItem my">
					<view class="time">2020-08-05 11:56:54</view>
					<view class="title">
						<image src="../../static/tab-my-current.png"></image>
						<text>我</text>
					</view>
					<view class="tips">内容：代理商的减肥了快的减肥是多了几分水电费老师就打开了福建省水电费了深刻的减肥了圣诞节开发水电费了几十块的反馈了</view>
				</view>
			</timelineItem>
		</timeline>
	</view>
</template>

<script>
import uniLoadMore from '@/components/uni-load-more/uni-load-more.vue';
import timeline from '../../components/chenbin-timeline/timeLine.vue';
import timelineItem from '../../components/chenbin-timeline/timelineItem.vue';
export default {
	components: {
		uniLoadMore,
		timeline,
		timelineItem
	},
	data() {
		return {
			data: [],
			loadingType: 'more' //加载更多状态
		};
	},
	created() {
		this.loadData();
	},
	onPageScroll(e) {
		//兼容iOS端下拉时顶部漂移
		if (e.scrollTop >= 0) {
			this.headerPosition = 'fixed';
		} else {
			this.headerPosition = 'absolute';
		}
	},
	//下拉刷新
	onPullDownRefresh() {
		this.loadData('refresh');
	},
	//加载更多
	onReachBottom() {
		this.loadData();
	},
	methods: {
		//加载商品 ，带下拉刷新和上滑加载
		async loadData(type = 'add', loading) {
			//没有更多直接返回
			if (type === 'add') {
				if (this.loadingType === 'nomore') {
					return;
				}
				this.loadingType = 'loading';
			} else {
				this.loadingType = 'more';
			}

			let data = await this.$api.json('cheaterList');

			if (type === 'refresh') {
				this.data = [];
			}
			//筛选，测试数据直接前端筛选了
			if (this.filterIndex === 1) {
				data.sort((a, b) => b.sales - a.sales);
			}
			if (this.filterIndex === 2) {
				data.sort((a, b) => {
					if (this.priceOrder == 1) {
						return a.price - b.price;
					}
					return b.price - a.price;
				});
			}
			this.data = this.data.concat(data);

			//判断是否还有下一页，有是more  没有是nomore(测试数据判断大于20就没有了)
			this.loadingType = this.data.length > 20 ? 'nomore' : 'more';
			if (type === 'refresh') {
				if (loading == 1) {
					uni.hideLoading();
				} else {
					uni.stopPullDownRefresh();
				}
			}
		}
	}
};
</script>

<style>
@import './experience.scss';
</style>
