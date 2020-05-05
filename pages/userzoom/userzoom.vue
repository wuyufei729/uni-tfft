<template>
	<view class="content">
		<scroll-view scroll-y>
			<view class="list-box">
				<view class="title b-b">
					<text class="title-icon"></text>
					<text class="title-text">个人信息</text>
				</view>
				<view class="detail b-b">
					<text class="left">受害人</text>
					<text class="right">{{data.name}}</text>
				</view>
				<view class="detail b-b">
					<text class="left">手机号</text>
					<text class="right">{{data.mobile}}</text>
				</view>
				<view class="detail mult b-b">
					<view class="detail-c1" v-for="(item,i) in data.bankCardList" :key="i">
						<text class="left">{{key==0?'涉案账户':''}}</text>
						<text class="right">{{item}}</text>
					</view>
				</view>
				<view class="detail b-b">
					<text class="left">关联微信</text>
					<text class="right">{{wxInfo.userInfo.nickName}}</text>
				</view>
				<view class="detail b-b">
					<text class="left">上次登录</text>
					<text class="right">{{data.lastLoginTime}}</text>
				</view>
				
				
			</view>
			<button class="login-btn" @click="openScanqr()">扫码添加案件</button>
			<!-- <view class="scan-icon"></view>
			<view class="scan-warn"></view> -->
			<!-- <button class="login-btn" @click="logout()">退出</button> -->
		</scroll-view>
	</view>
</template>

<script>
import {GetUserBaseInfo} from '@/api/modules/user.js'
import {AddScene} from '@/api/modules/scene.js'
export default {
	data() {
		return {
			data: {},
			wxInfo: uni.getStorageSync('wxInfo')
		};
	},
	created(){
		this.getData();
	},
	methods: {
		
		/**
		 * 二维码扫码
		 */
		openScanqr(){
			const _this = this;
			// 允许从相机和相册扫码
			wx.scanCode({
				success (res) {
					let postData = {
						ciphertext: res.result
					}
					AddScene(postData).then(res=>{
						if(res && res.data){
							uni.showToast({
								title: '添加成功！'
							})
						}
					}).catch(err=>{
						console.log('扫码加案出错！')
					})
				},
				fail() {
					uni.showToast({
						title: '扫码添加案件失败！',
						icon: 'none'
					})
				}
			  
			})
		},
		/**
		 * 获取信息
		 */
		async getData(){
			const _this = this;
			GetUserBaseInfo().then(res=>{
				if(res != null && res.data != null){
					_this.data = res.data;
				}
			}).catch(error=>{
				console.log('获取用户信息失败！')
			})
			
			//_this.data = await this.$api.json('userInfo');
			
		},
		
		/**
		 * 注销，退出
		 */
		logout(){
			uni.setStorageSync('access-token','')
			uni.setStorageSync('refresh-token','')
			uni.reLaunch({
				url: `/pages/login/login`,
			});
			
		}
	}
};
</script>
<style scoped lang="scss">
	.scan-icon{
		background: url(../../static/img/icon_scan.png) no-repeat center;
		background-size: contain;
		width: 80px;
		height: 80px;
		
		
	}
	.scan-warn{
		height: 40px;
		line-height: 40px;
		font-size: 16px;
		text-align: center;
		color: #909399;
		margin-top: 180px;
	}
</style>

