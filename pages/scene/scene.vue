<template>
	<view class="content">
		<!-- <view v-for="item in data" :key="item.id" class="card-item" :id="'main-' + item.sceneId">
			<view class="top">
				<text class="title">{{ item.sceneId }}</text>
				<text class="state">{{ item.statusName }}</text>
				<text class="del-btn yticon icon-iconfontshanchu1"></text>
			</view>
			<view class="con">
				<view>涉案类型：{{ item.caseTypeName }}</view>
				<view>涉案账户：{{ item.involvedAccount }}</view>
				<view>受理单位：{{ item.deptName }}</view>
				<view class="date">
					{{ item.inputTime }}
					<text>查看详情>></text>
				</view>
			</view>
		</view> -->
		
		<!-- 案件列表 -->
		<view v-for="(item,index) in data" :key="index" class="order-item scene">
			<view class="i-top b-b">
				<text class="time">{{ item.sceneId }}</text>
				<text class="state">{{ item.statusName }}</text>
				<text class="del-btn yticon icon-iconfontshanchu1"></text>
			</view>
			<view class="goods-box-single">
				<view class="right">
					<view>涉案类型：{{ item.caseTypeName }}</view>
					<view>涉案账户：{{ item.involvedAccount }}</view>
					<view>受理单位：{{ item.deptName }}</view>
				</view>
			</view>
			
			<view class="price-box">
				<text class="price">{{ item.inputTime }}</text>
			</view>
			<view class="action-box b-t">
				<button class="action-btn" @click="viewSceneDetail(item)">查看详情</button>
				<!-- <button class="action-btn recom">查看详情</button> -->
			</view>
		</view>
		
		<uni-load-more :status="loadingType"></uni-load-more>
	</view>
</template>

<script>
import uniLoadMore from '@/components/uni-load-more/uni-load-more.vue';
export default {
	components: {
		uniLoadMore
	},
	data() {
		return {
			data: [],
			loadingType: 'more' //加载更多状态
		};
	},
	created() {
		/* for(var i =0;i<20;i++){
				this.data.push({
					id: i,
					name: 'Tony'+i
				})
			} */
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

			let data = await this.$api.json('sceneList');
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
		},
		
		//查看案件详情
		viewSceneDetail(item){
			uni.navigateTo({
				url: '/pages/sceneDetail/sceneDetail'
			})
		}
	}
};
</script>

<style>
@import './scene.scss';
</style>
