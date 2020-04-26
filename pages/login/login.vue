<template>
	<view class="login">
		<view class="top">
			<view class="logo"></view>
			<view class="title">电信诈骗取证系统</view>
		</view>
		<view class="btm">
			<!-- #ifdef MP-WEIXIN -->
			<!-- <view v-if="isCanUse">
				<view>
					<view class="content">
						<view>申请获取以下权限</view>
						<text>获得你的公开信息(昵称，头像、地区等)</text>
					</view>
					<button class="bottom" type="primary" open-type="getUserInfo" withCredentials="true" lang="zh_CN" @getuserinfo="wxGetUserInfo">授权登录</button>
				</view>
			</view> -->
			<!-- #endif -->
		</view>
		<view class="bottom">
			<view class="input-phone">
				<view class="ele-p"><input type="number" placeholder="手机号" /></view>
				<view class="get-code">
					<label v-if="timerStatus == 0" @click="getPhoneNum()">获取验证码</label>
					<label v-if="timerStatus == 1">{{ seconds }} (s)</label>
					<label v-if="timerStatus == 2" @click="getPhoneNum()">重新发送</label>
				</view>
			</view>
			<view class="input-code" ref="inputCode" v-if="codeMaxLength != null">
				<view class="ele-span" v-for="(item, i) in codeMaxLength" :key="i">{{ codeList != null && codeList.length > i ? codeList[i] : '' }}</view>
				<input type="text" class="plateInput" v-model="codeList" />
			</view>
			<button class="login-btn" open-type="getUserInfo" lang="zh_CN" @getuserinfo="wxGetUserInfo">登录</button>
		</view>
	</view>
</template>

<script>
export default {
	data() {
		return {
			codeList: null, //输入的验证码
			codeMaxLength: 4, //验证码长度
			timerStatus: 0,
			defaultSeconds: 10,
			seconds: 0,
			postCodeTimer: null,

			SessionKey: '',
			OpenId: '',
			nickName: null,
			avatarUrl: null,
			isCanUse: uni.getStorageSync('isCanUse') || false //默认为true
		};
	},
	onLoad() {
		//默认加载
		//this.login();
	},
	watch: {
		codeList(newName, oldName) {
			//当输入位数到达设定时候
			if (this.codeList != null && this.codeList.length > this.codeMaxLength) {
				this.codeList = oldName;
				//this.handlerLogin();
			}
		}
	},
	methods: {
		//第一授权获取用户信息===》按钮触发
		wxGetUserInfo() {
			let _this = this;
			uni.showLoading({
				title: '登录中...'
			});
			/* setTimeout(()=>{
				uni.hideLoading();
				uni.showToast({
				    title: '未找到服务',
				    duration: 2000
				});
			},1000) */
			/* uni.getUserInfo({
				provider: 'weixin',
				success: function(infoRes) {
					let nickName = infoRes.userInfo.nickName; //昵称
					let avatarUrl = infoRes.userInfo.avatarUrl; //头像
					try {
						uni.setStorageSync('isCanUse', false); //记录是否第一次授权  false:表示不是第一次授权
						_this.updateUserInfo();
					} catch (e) {}
				},
				fail(res) {
					console.log(res);
				}
			}); */
			uni.switchTab({
				url: '/pages/scene/scene'
			})
		}, //登录

		login() {
			let _this = this;
			uni.showLoading({
				title: '登录中...'
			});

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
								_this.updateUserInfo(); //调用更新信息方法
							}
						});
					}

					//2.将用户登录code传递到后台置换用户SessionKey、OpenId等信息
					uni.request({
						url: '服务器地址',
						data: {
							code: code
						},
						method: 'GET',
						header: {
							'content-type': 'application/json'
						},
						success: res => {
							//openId、或SessionKdy存储//隐藏loading
							uni.hideLoading();
						}
					});
				}
			});
		},
		//向后台更新信息
		updateUserInfo() {
			let _this = this;
			uni.request({
				url: 'url', //服务器端地址
				data: {
					appKey: this.$store.state.appKey,
					customerId: _this.customerId,
					nickName: _this.nickName,
					headUrl: _this.avatarUrl
				},
				method: 'POST',
				header: {
					'content-type': 'application/json'
				},
				success: res => {
					if (res.data.state == 'success') {
						uni.reLaunch({
							//信息更新成功后跳转到小程序首页
							url: '/pages/index/index'
						});
					}
				}
			});
		},

		/**
		 * 点击获取验证码
		 */
		getPhoneNum() {
			this.timerStatus = 1;
			this.initTimer();
		},

		/**
		 * 验证码倒计时
		 */
		initTimer() {
			this.seconds = this.defaultSeconds;
			this.postCodeTimer = setInterval(() => {
				if (this.seconds == 0) {
					clearInterval(this.postCodeTimer);
					this.timerStatus = 2;
				}
				this.seconds -= 1;
			}, 1000);
		}
	}
};
</script>

<style lang="scss">
@import './login.scss';
</style>
