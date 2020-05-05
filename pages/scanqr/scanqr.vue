<template>
	<view class="login">
		<view class="top">
			<view class="logo"></view>
			<view class="title">电信诈骗取证系统</view>
		</view>
		<view class="bottom">
			<view class="scan-icon" @click="login()"></view>
			<view class="scan-warn">
				请点击扫码二维码进行操作
			</view>
		</view>
	</view>
</template>

<script>
import Api_Urls from '../../api/Api_Urls.js'
export default {
	data() {
		return {
			
		};
	},
	onLoad() {
		//this.checkToken();
	},
	
	methods: {
		openCode(){
			// 允许从相机和相册扫码
			wx.scanCode({
			  success (res) {
			    console.log(res)
			  }
			})
		},
		
		/**
		 * 最后一步，登录
		 */
		triggerLogin(){
			const _this = this;
			let url = Api_Urls.User_loginURL;
			this.$request({url: url,data:{
				//AppID: 'wx23abff1e4e2875ba',
				//AppSecret: '3b5d06873fcd2e88692806eaaf2bc067',
				username: _this.nickName,
				password: '123456'
			}
			}).then(res=>{
				if(res != null && res != ''){
					uni.setStorageSync('auth-token',res);
					uni.switchTab({
						url: '/pages/scene/scene'
					})
				}
			}).catch(error=>{
				console.log('登录失败')
			})
		},
		
		login() {
			let _this = this;
			/* uni.showLoading({
				title: '登录中...'
			}); */
			// 1.wx获取登录用户code
			uni.login({
				provider: 'weixin',
				success: function(loginRes) {
					let code = loginRes.code;
					if (!_this.isCanUse) {
						//非第一次授权获取用户信息
						uni.getUserInfo({
							provider: 'weixin',
							success: function(infoRes) {
								//获取用户信息后向调用信息更新方法
								let nickName = infoRes.userInfo.nickName; //昵称
								let avatarUrl = infoRes.userInfo.avatarUrl; //头像
								_this.triggerLogin(); //调用更新信息方法
							}
						});
					}
				}
			});
		},
	}
};
</script>

<style lang="scss">
	@import '../login/login.scss';
	.scan-icon{
		background: url(../../static/img/icon_scan.png) no-repeat center;
		background-size: contain;
		width: 80px;
		height: 80px;
		position: absolute;
		top: 80px;
		left: 50%;
		margin-left: -40px;
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
