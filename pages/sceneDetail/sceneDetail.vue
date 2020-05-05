<template>
	<view class="content">
		<scroll-view scroll-y>
			<view class="list-box">
				<view class="title b-b">
					<text class="title-icon"></text>
					<text class="title-text">案件信息</text>
				</view>
				<view class="detail b-b">
					<text class="left">案件编号</text>
					<text class="right single">{{data.uId}}</text>
				</view>
				<view class="detail b-b">
					<text class="left">涉案类型</text>
					<text class="right single">{{data.caseTypeName}}</text>
				</view>
				<view class="detail details b-b"> 
					<text class="left">案情简介</text>
					<text class="right">{{data.caseIntroduction}}</text>
				</view>
				<view class="detail b-b">
					<text class="left">终端编号</text>
					<text class="right single">{{data.deviceId}}</text>
				</view>
				<view class="detail b-b">
					<text class="left">受理单位</text>
					<text class="right single">{{data.departmentName}}</text>
				</view>
				<view class="detail b-b">
					<text class="left">受理警员</text>
					<text class="right single">{{data.policeName+ ' '+ data.policeNumber}}</text>
				</view>
				<view class="detail b-b">
					<text class="left">报案时间</text>
					<text class="right single">{{data.reportTime}}</text>
				</view>
				<view class="detail b-b">
					<text class="left">手机号</text>
					<text class="right single">{{data.victims.mobile}}</text>
				</view>
				<view class="history-section icon">
					<view class="sec-header">
						<text class="yticon icon-lishijilu"></text>
						<text>关联骗子</text>
					</view>
					<scroll-view scroll-x class="h-list">
						<view class="item" v-for="(item,i) in data.cheaters" :key="i">
							<!-- <image src="https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1553105186633&di=c121a29beece4e14269948d990f9e720&imgtype=0&src=http%3A%2F%2Fimg004.hc360.cn%2Fm8%2FM04%2FDE%2FDE%2FwKhQplZ-QteEBvsbAAAAADUkobU751.jpg" mode="aspectFill"></image> -->
							<image src="../../static/img/icon_cheater_active.png" mode="aspectFill"></image>
							<text class="">{{item.name}}</text>
						</view>
						<view class="item add-more" @click="openAddCheater()">
							<text class="">+</text>
						</view>
					</scroll-view>
				</view>
			</view>
			
			<!-- <button class="login-btn">保存</button> -->
		</scroll-view>
	</view>
</template>

<script>
import {GetSceneDetail} from '@/api/modules/scene.js'
export default {
	data() {
		return {
			data: null,
			sceneId: null,
		};
	},
	onLoad(options) {
		const _this = this;
		if(options != null && options.id != null){
			this.sceneId = options.id;
			this.initData()
		}
		this.$eventBus.$on('addCheaterSuccess', function (data) {
		 	_this.initData();
		});
	},
	
	methods: {
		
		/**
		 * 初始化数据
		 */
		initData(){
			const _this = this;
			GetSceneDetail(this.sceneId).then(res=>{
				//todo
				if(res && res.data){
					_this.data = res.data;
				}
			}).catch(err=>{
				console.log('案件详情获取成功！')
			})
		},
		
		/**
		 * 打开添加骗子页面
		 */
		openAddCheater(){
			uni.navigateTo({
				url: '/pages/cheaterAdd/cheaterAdd?sceneId='+this.sceneId
			})
		}
	},
	beforeDestroy() {
		this.$eventBus.$off('addCheaterSuccess')
	}
};
</script>

