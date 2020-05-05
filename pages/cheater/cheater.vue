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
					<text class="del-btn yticon icon-iconfontshanchu1" @click="openDeleteCheater(item)"></text>
				</view>
				<view class="goods-box-single">
					<!-- <image class="goods-img" v-if="item.imageUrl != null && item.imageUrl.thumbUrl != null" :src="item.imageUrl.thumbUrl" mode="aspectFill"></image> -->
					<image class="goods-img" src="../../static/img/icon_cheater.png" mode="aspectFill"></image>
					<view class="right">
						<!-- <text class="circle-box">{{item.meansName}}</text>
						<text class="circle-box">{{item.caseCount}}</text>
						<text class="circle-box">{{item.amount}}</text> -->
						<view>手段：{{ item.criminalToolProcess==null?'':item.criminalToolProcess.map(p=>p.name).join('、') }}</view>
						<view>往来：{{ item.count }} 次</view>
					</view>
				</view>
				
				<view class="price-box">
					交易
					<text class="price">{{item.amount}}</text>
				</view>
				<view class="action-box b-t">
					<button class="action-btn" @click="openCheaterProcess(item)">编辑往来</button>
					<!-- <button class="action-btn recom">立即支付</button> -->
				</view>
			</view>
			 
			<uni-load-more :status="loadingType"></uni-load-more>
			
		</scroll-view>
		
		
		
	</view>
</template>

<script>
	import uniLoadMore from '@/components/uni-load-more/uni-load-more.vue';
	import {GetCheaterListByPage, DeleteCheater} from '@/api/modules/cheater.js'
	export default {
		components: {
			uniLoadMore	
		},
		data() {
			return {
				data: [],
				total: 0,
				pageSize: 3,
				currentPage: 1,
				loadingType: 'more', //加载更多状态
			}
		},
		created() {
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
			if(this.total != 0 && this.total === this.data.length){
				this.loadingType = "nomore";
			}else{
				this.currentPage += 1;
				this.loadData();
			}
		},
		methods: {
			
			/**
			 * 获取骗子列表数据
			 */
			loadData(type='add', loading){
				const _this = this;
				//没有更多直接返回
				if(type === 'add'){
					if(this.loadingType === 'nomore'){
						return;
					}
					this.loadingType = 'loading';
				}else{
					this.loadingType = 'more'
				}
				let filter = {
					pageSize: _this.pageSize,
					currentPage: _this.currentPage
				}
				GetCheaterListByPage(filter).then(res=>{
					if(res != null && res.data != null){
						let data = res.data
						if(type === 'refresh'){
							_this.data = [];
						}
						_this.data = _this.data.concat(data.result);
						_this.total = data.total;
						
						//判断是否还有下一页，有是more  没有是nomore(测试数据判断大于20就没有了)
						_this.loadingType  = _this.data.length >= _this.total ? 'nomore' : 'more';
						if(type === 'refresh'){
							if(loading == 1){
								uni.hideLoading()
							}else{
								uni.stopPullDownRefresh();
							}
						}
					}
				}).catch(err=>{
					console.log('获取骗子列表失败！');
				})
			},
			
			
			/**
			 * 查看行骗过程
			 */
			openCheaterProcess(item){
				uni.navigateTo({
					url: `/pages/cheaterProcess/cheaterProcess?cheaterId=${item.id}`
				})
			},
			
			/**
			 * 删除骗子
			 */
			openDeleteCheater(item){
				const _this = this;
				uni.showModal({
				    title: '提示',
				    content: '确定要删除该骗子吗？',
				    success: function (res) {
				        if (res.confirm) {
							_this.deleteCheater(item);
				        } else if (res.cancel) {
				            //console.log('用户点击取消');
				        }
				    }
				});
			},
			
			/**
			 * 删除骗子
			 */
			deleteCheater(item){
				const _this = this;
				DeleteCheater(item.id).then(res=>{
					if(res != null && res.data){
						_this.data = _this.data.filter(p=>p.id != item.id);
						_this.total -= 1;
						uni.showToast({
							title: "删除成功！",
							duration: 2000,
						})
					}
				}).catch(err=>{
					console.log('删除骗子失败！')
				})
			}
		}
	}
</script>

<style>
	@import "./cheater.scss";
</style>
