<template>
	<view class="content">
		<scroll-view
			class="list-scroll-content" 
			scroll-y
			@scrolltolower="loadData"
		>
			<!-- 行骗记录列表 -->
			<view v-for="(item,index) in v_data" :key="index" class="order-item process-list">
				<view class="i-top b-b">
					<text class="time">{{item.startDateTime+" - "+item.endDateTime}}</text>
					<text class="del-btn yticon icon-iconfontshanchu1" @click="deleteCheaterProcess(item)"></text>
				</view>
				<view class="goods-box-single">
					<view class="right">
						<view>内容：{{ item.process}}</view>
						<view>转账记录：</view>
						<scroll-view scroll-x class="image-list">
							<view class="item" v-for="(imgItem,i) in item.evidenceImageUrls" :key="i">
								<image :src="imgItem" mode="aspectFill" @click="$viewImage(imgItem)"></image>
							</view>
						</scroll-view>
					</view>
				</view>
				<view class="action-box b-t">
					<button class="action-btn" @click="editCheaterProcess(item)">编辑</button>
					<!-- <button class="action-btn recom">立即支付</button> -->
					
				</view>
			</view>
			 
			<uni-load-more :status="loadingType"></uni-load-more>
			<button class="login-btn" @click="addProcess()">添加</button>
		</scroll-view>
		
		
		
	</view>
</template>

<script>
	import uniLoadMore from '@/components/uni-load-more/uni-load-more.vue';
	import {mapState,mapActions} from 'vuex'
	export default {
		components: {
			uniLoadMore	
		},
		data() {
			return {
				cheaterId: null,
				loadingType: 'more', //加载更多状态
			}
		},
		computed:{
			...mapState('cheaterProcess',['v_data', 'v_total', 'v_currentPage']),
		},
		onLoad(options) {
			const _this = this;
			if(options != null && options.cheaterId != null){
				this.cheaterId = options.cheaterId;
				this.loadData();
			}
			
			this.$eventBus.$on('refreshCheaterProcessList', function (data) {
			 	_this.loadData();
			});
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
			if(this.v_total != 0 && this.v_total === this.v_data.length){
				this.loadingType = "nomore";
			}else{
				this.v_SetCurrent(this.v_currentPage+1)
				this.loadData();
			}
		},
		methods: {
			...mapActions('cheaterProcess',['v_LoadCheaterProcessData', 'v_SetCurrent', 'v_DeleteCheaterProcess']),
			/**
			 * 加载数据
			 */
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
				this.v_LoadCheaterProcessData({cheaterId:this.cheaterId,type:type}).then(res=>{
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
			
			/**
			 * 添加行骗记录
			 */
			addProcess(){
				uni.navigateTo({
					url: '/pages/cheaterProcessAdd/cheaterProcessAdd?cheaterId='+this.cheaterId
				})
			},
			
			/**
			 * 编辑行骗记录
			 */
			editCheaterProcess(item){
				uni.setStorageSync('cheaterPorcessEditData',item);
				uni.navigateTo({
					url: `/pages/cheaterProcessEdit/cheaterProcessEdit?id=${item.typeName}`
				});
				
			},
			
			/**
			 * 删除行骗记录
			 */
			deleteCheaterProcess(item){
				const _this = this;
				uni.showModal({
				    title: '提示',
				    content: '确定要删除行骗记录吗？',
				    success: function (res) {
				        if (res.confirm) {
							_this.v_DeleteCheaterProcess(item.id).then(res2=>{
								if(res2){
									uni.showToast({
										title: "删除成功！",
										duration: 2000,
									})
								}
							}).catch(err2=>{
								console.log('删除行骗过程'+item.id+'删除失败！');
							})
							
				        } else if (res.cancel) {
				            //console.log('用户点击取消');
				        }
				    }
				});
			}
		},
		beforeDestroy() {
			this.$eventBus.$off('refreshCheaterProcessList');
		}
		
	}
</script>

<style>
	@import "./cheaterProcess.scss";
</style>
