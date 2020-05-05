<template>
	<view class="content">
		<timeline>
			<timelineItem v-for="(item,i) in data" :key="i">
				<view class="tripItem">
					<view class="time">{{item.startDateTime}}</view>
					<view class="title">
						<!-- <image :src="item.imageUrl.thumbUrl"></image> -->
						<image src="../../static/missing-face.png"></image>
						<text>{{item.name}}</text>
						<text class="money">受骗金额<text>￥{{item.amount}}</text></text>
					</view>
					<view class="tips">
						<view class="means">
							<text>{{item.criminalToolTypeName}}</text>
						</view>
						<view class="">
							{{item.process}}
						</view>
					</view>
				</view>
			</timelineItem>
		</timeline>
		<uni-load-more :status="loadingType"></uni-load-more>
	</view>
</template>

<script>
import uniLoadMore from '@/components/uni-load-more/uni-load-more.vue'
import timeline from '../../components/chenbin-timeline/timeLine.vue'
import timelineItem from '../../components/chenbin-timeline/timelineItem.vue'
import {GetUserExperienceListByPage} from '@/api/modules/user.js'
export default {
	components: {
		uniLoadMore,
		timeline,
		timelineItem
	},
	data() {
		return {
			data: [],
			total: 0,
			currentPage: 1,
			pageSize: 3,
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
		if(this.total != 0 && this.total === this.data.length){
			this.loadingType = "nomore";
		}else{
			this.currentPage += 1;
			this.loadData();
		}
	},
	methods: {
		
		/**
		 * todo 获取被骗经历
		 */
		loadData(type ='add', loading){
			const _this = this;
			//没有更多直接返回
			if (type === 'add') {
				if (this.loadingType === 'nomore') {
					return;
				}
				this.loadingType = 'loading';
			} else {
				this.loadingType = 'more';
			}
			let filter = {
				pageSize: _this.pageSize,
				currentPage: _this.currentPage
			}
			GetUserExperienceListByPage(filter).then(res=>{
				let data = res.data;
				if (type === 'refresh') {
					_this.data = [];
				}
				_this.data = _this.data.concat(data.result);
				_this.total = data.total;
				
				//判断是否还有下一页，有是more  没有是nomore(测试数据判断大于20就没有了)
				_this.loadingType = _this.data.length >= _this.total ? 'nomore' : 'more';
				if (type === 'refresh') {
					if (loading == 1) {
						uni.hideLoading();
					} else {
						uni.stopPullDownRefresh();
					}
				}
			}).catch(err=>{
				console.log('获取被骗经历失败！')
			})
		},
		
		//加载商品 ，带下拉刷新和上滑加载
		async loadData2(type ='add', loading) {
			//没有更多直接返回
			if (type === 'add') {
				if (this.loadingType === 'nomore') {
					return;
				}
				this.loadingType = 'loading';
			} else {
				this.loadingType = 'more';
			}

			let data = await this.$api.json('experienceList');

			if (type === 'refresh') {
				this.data = [];
			}
			
			this.data = this.data.concat(data);

			//判断是否还有下一页，有是more  没有是nomore(测试数据判断大于20就没有了)
			this.loadingType = this.data.length >= this.total ? 'nomore' : 'more';
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
