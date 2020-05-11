<template>
	<view class="content">
		<!-- 案件列表 -->
		<view v-for="(item,index) in v_data" :key="index" class="order-item scene">
			<view class="i-top b-b">
				<text class="time">{{ item.uId }}</text>
				<text class="state">{{ getCaseStatus(item.caseStatus)}}</text>
				<!-- <text class="del-btn yticon icon-iconfontshanchu1"></text> -->
			</view>
			<view class="goods-box-single">
				<view class="right">
					<view>涉案类型：{{ item.caseTypeName }}</view>
					<view>涉案账户：{{ item.bankCards != null && item.bankCards.length>0? item.bankCards[0]: '' }}</view>
					<view>受理单位：{{ item.departmentName }}</view>
				</view>
			</view>
			
			<view class="price-box" v-if="item.reportTime != null">
				<text class="price">{{ item.reportTime }}</text>
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
import uniLoadMore from '@/components/uni-load-more/uni-load-more.vue'
import {mapState, mapActions} from 'vuex'
export default {
	components: {
		uniLoadMore
	},
	data() {
		return {
			loadingType: 'more' //加载更多状态
		};
	},
	computed:{
		...mapState('scene',['v_data', 'v_total', 'v_pageSize','v_currentPage']),
		
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
		this.v_SetCurrent(1)
		this.loadData('refresh');
	},
	//加载更多
	onReachBottom() {
		if(this.v_total != 0 && this.v_total === this.v_data.length){
			this.loadingType = "nomore";
		}else{
			this.v_SetCurrent(this.v_currentPage+1)
			this.loadData();
		}
	},
	methods: {
		...mapActions('scene',['v_LoadSceneData', 'v_SetCurrent']),
		
		loadData(type = 'add', loading){
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
			this.v_LoadSceneData(type).then(res=>{
				if(res != null){
					//判断是否还有下一页，有是more  没有是nomore(测试数据判断大于20就没有了)
					_this.loadingType = _this.v_data.length >= _this.v_total ? 'nomore' : 'more';
					if (type === 'refresh') {
						if (loading == 1) {
							uni.hideLoading();
						} else {
							uni.stopPullDownRefresh();
						}
					}
				}
			}).catch(err=>{
				console.log('获取案件列表失败！');
			})
		},
		//加载商品 ，带下拉刷新和上滑加载
		async loadData2(type = 'add', loading) {
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
		},
		
		//查看案件详情
		viewSceneDetail(item){
			uni.navigateTo({
				url: `/pages/sceneDetail/sceneDetail?id=${item.id}`
			})
		},
		
		/**
		 * 获取案件状态枚举名称
		 */
		getCaseStatus(typeId){
			let item = this.$dic.caseStatus.find(p=>p.id == typeId);
			if(item == null){
				return '';
			}
			return item.name
		}
	}
};
</script>

<style>
@import './scene.scss';
</style>
