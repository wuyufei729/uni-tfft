<template>
	<view class="content">
		
		
		<scroll-view
			class="list-scroll-content" 
			scroll-y
			@scrolltolower="loadData"
		>
			<!-- 骗子列表 -->
			<view v-for="(item,index) in data" :key="index" class="order-item cheater">
				<view class="i-top b-b">
					<text class="time">{{item.name}}</text>
					<text class="del-btn yticon icon-iconfontshanchu1" @click="deleteOrder(index)"></text>
				</view>
				<view class="goods-box-single">
					<image class="goods-img" :src="item.icon" mode="aspectFill"></image>
					<view class="right">
						<!-- <text class="circle-box">{{item.meansName}}</text>
						<text class="circle-box">{{item.caseCount}}</text>
						<text class="circle-box">{{item.amount}}</text> -->
						<view>手段：{{ item.meansName }}</view>
						<view>往来：{{ item.caseCount }} 次</view>
					</view>
				</view>
				
				<view class="price-box">
					交易
					<text class="price">{{item.amount}}</text>
				</view>
				<view class="action-box b-t">
					<button class="action-btn" @click="editCheater(item)">编辑往来</button>
					<!-- <button class="action-btn recom">立即支付</button> -->
				</view>
			</view>
			 
			<uni-load-more :status="tabItem.loadingType"></uni-load-more>
			
		</scroll-view>
		
		
		
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
				loadingType: 'more', //加载更多状态
			}
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
		onPageScroll(e){
			//兼容iOS端下拉时顶部漂移
			if(e.scrollTop>=0){
				this.headerPosition = "fixed";
			}else{
				this.headerPosition = "absolute";
			}
		},
		//下拉刷新
		onPullDownRefresh(){
			this.loadData('refresh');
		},
		//加载更多
		onReachBottom(){
			this.loadData();
		},
		methods: {
			//加载商品 ，带下拉刷新和上滑加载
			async loadData(type='add', loading) {
				//没有更多直接返回
				if(type === 'add'){
					if(this.loadingType === 'nomore'){
						return;
					}
					this.loadingType = 'loading';
				}else{
					this.loadingType = 'more'
				}
				
				let data = await this.$api.json('cheaterList');
				
				if(type === 'refresh'){
					this.data = [];
				}
				//筛选，测试数据直接前端筛选了
				if(this.filterIndex === 1){
					data.sort((a,b)=>b.sales - a.sales)
				}
				if(this.filterIndex === 2){
					data.sort((a,b)=>{
						if(this.priceOrder == 1){
							return a.price - b.price;
						}
						return b.price - a.price;
					})
				}
				this.data = this.data.concat(data);
				
				//判断是否还有下一页，有是more  没有是nomore(测试数据判断大于20就没有了)
				this.loadingType  = this.data.length > 20 ? 'nomore' : 'more';
				if(type === 'refresh'){
					if(loading == 1){
						uni.hideLoading()
					}else{
						uni.stopPullDownRefresh();
					}
				}
			},
			
			editCheater(){
				uni.navigateTo({
					url: '/pages/cheaterAddProcess/cheaterAddProcess'
				})
			}
		}
	}
</script>

<style>
	@import "./cheater.scss";
</style>
