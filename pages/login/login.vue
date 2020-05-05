<template>
	<view class="login">
		<view class="top">
			<view class="logo"></view>
			<view class="title">电信诈骗取证系统</view>
		</view>
		<template v-if="isShowScanqr">
			<view class="bottom">
				<view class="scan-icon" @click="openScanqr()">
					<text class="swiper-animate"></text>
				</view>
				<view class="scan-warn">
					请点击扫码二维码进行操作,或者<text @click="isShowScanqr = false">返回</text>
				</view>
			</view>
		</template>
		<template v-else>
			<view class="bottom" v-if="isShowWeChartAuth">
			<!-- #ifdef MP-WEIXIN -->
				<view class="need-permission">
					<view>申请获取以下权限</view>
					<text>获得你的公开信息(昵称，头像、地区等)</text>
					<button class="permission-btn" type="primary" open-type="getUserInfo" withCredentials="true" lang="zh_CN" @getuserinfo="wxGetUserInfo">授权登录</button>
				</view>
			<!-- #endif -->
			</view>
			<view class="bottom" v-else>
				<view class="input-phone">
					<view class="ele-p"><input type="number" placeholder="手机号" v-model="phoneNum" /></view>
					<view class="get-code">
						<label v-if="timerStatus == 0" @click="getPhoneNum()">获取验证码</label>
						<label v-if="timerStatus == 1">{{ seconds }} (s)</label>
						<label v-if="timerStatus == 2" @click="getPhoneNum()">重新发送</label>
					</view>
				</view>
				<view class="input-code" ref="inputCode" v-if="codeMaxLength != null">
					<view class="ele-span" v-for="(item, i) in codeMaxLength" :key="i">{{ phoneCode != null && phoneCode.length > i ? phoneCode[i] : '' }}</view>
					<input type="number" class="plateInput" v-model="phoneCode" />
				</view>
				<button class="login-btn" @click="verifyCode()">确认</button>
			</view>
		</template>
		
	</view>
</template>

<script>
import Api_Urls from '../../api/Api_Urls.js'
import {UserLogin,GetVerifyCode,VerifyCode, CheckUserPhoneNumIsValide} from '@/api/modules/user.js'
import {AddScene} from '@/api/modules/scene.js'
export default {
	data() {
		return {
			phoneCode: null, //输入的验证码
			codeMaxLength: 6, //验证码长度
			timerStatus: 0,
			defaultSeconds: 10,
			seconds: 0,
			postCodeTimer: null,

			avatarUrl: null,
			isShowWeChartAuth: uni.getStorageSync('isShowWeChartAuth') || false, //默认为 true
			
			phoneNum: '', //手机号
			data: null, //授权信息字段
			wechartCode: null,//微信授权code
			isShowScanqr: false,
		};
	},
	onLoad() {
		//this.checkToken();
		var accessToken = uni.getStorageSync('access-token');
		var refreshToken = uni.getStorageSync('refresh-token');
		//todo 验证
		if(accessToken != null && accessToken != '' && refreshToken != null && refreshToken != ''){
			uni.switchTab({
				url: '/pages/scene/scene'
			})
		}
		
		
	},
	watch: {
		phoneCode(newName, oldName) {
			//当输入位数到达设定时候
			if (this.phoneCode != null && this.phoneCode.length > this.codeMaxLength) {
				this.phoneCode = oldName;
				//this.handlerLogin();
			}
		}
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
					let postData= {
						ciphertext: res.result
					}
					AddScene(postData).then(res=>{
						if(res && res.data){
							_this.isShowScanqr = false;
							_this.checkSceneIncludesPhoneNum();
						}
					}).catch(err=>{
						console.log('扫码添加案件失败！')
					})
				},
			  
			})
		},
		
		/**
		 * 检查token(刷新token待确定)
		 */
		checkToken(){
			//如果有token并且token有效
			if(true){
				uni.switchTab({
					url: '/pages/scene/scene'
				})
			}
		},
		
		/**
		 * 验证验证码
		 */
		verifyCode(){
			const _this = this;
			if(_this.phoneNum == null || _this.phoneNum == ''){
				uni.showToast({
					title: '手机号不能为空',
					icon: 'none'
				})
				return;
			}
			if (!this.$validate.isPhone(_this.phoneNum)) {
				uni.showToast({
					icon: 'none',
					title: '请输入正确的手机号'
				})
				return;
			}
			if(_this.phoneCode == null || _this.phoneCode == ''){
				uni.showToast({
					title: '验证码不能为空',
					icon: 'none'
				})
				return;
			}
			if(_this.phoneCode.length<6){
				uni.showToast({
					title: '验证码必须是6位数字',
					icon: 'none'
				})
				return;
			}
			
			VerifyCode({mobile: _this.phoneNum,code: _this.phoneCode}).then(res=>{
				if(res && res.data){
					_this.checkSceneIncludesPhoneNum();
				}
			}).catch(err=>{
				console.log('验证码服务发生错误！')
			});
			
		},
		
		/**
		 * check 当前手机号是否被包含在案件中
		 */
		checkSceneIncludesPhoneNum(){
			const _this = this;
			CheckUserPhoneNumIsValide(this.phoneNum).then(res=>{
				//手机号被案件包含的次数
				if(res.data>0){
					_this.login();//执行登录
				}else{
					_this.isShowScanqr = true;
				}
			}).catch(err=>{
				console.log('验证案件是否包含时候失败！')
			})
			
			/* if(false){
				this.login();
			}else{
				this.isShowScanqr = true;
			} */
		},
		
		
		//第一授权获取用户信息===》按钮触发
		wxGetUserInfo() {
			let _this = this;
			/* uni.showLoading({
				title: '登录中...'
			}); */
			
			uni.getUserInfo({
				provider: 'weixin',
				success: function(infoRes) {
					/* _this.nickName = infoRes.userInfo.nickName; //昵称
					_this.avatarUrl = infoRes.userInfo.avatarUrl; //头像 */
					_this.data = infoRes;
					_this.isShowWeChartAuth = false;
					try {
						uni.setStorageSync('isShowWeChartAuth', false); //记录是否第一次授权  false:表示不是第一次授权
						//_this.triggerLogin()
					} catch (e) {}
				},
				fail(res) {
					console.log(res);
				}
			});
			/* uni.switchTab({
				url: '/pages/scene/scene'
			}) */
		}, //登录
		
		/**
		 * 最后一步，登录
		 */
		triggerLogin(){
			//AppID: 'wx23abff1e4e2875ba',
			//AppSecret: '3b5d06873fcd2e88692806eaaf2bc067',
			uni.showLoading({
				title: '登录中...'
			});
			const _this = this;
			let postData = {
				iv: _this.data.iv,
				signature: _this.data.signature,
				encryptedData: _this.data.encryptedData,
				code: _this.wechartCode,
				mobile: _this.phoneNum,
			}
			UserLogin(postData).then(res=>{
				uni.hideLoading();
				if(res && res.data){
					if(res != null && res != ''){
						uni.setStorageSync('access-token',res.data.accessToken)
						uni.setStorageSync('refresh-token',res.data.refreshToken)
						uni.switchTab({
							url: '/pages/scene/scene'
						})
					}
				}
			}).catch(err=>{
				uni.hideLoading();
				console.log('登录失败！')
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
					_this.wechartCode = loginRes.code;
					if (!_this.isShowWeChartAuth) {
						//非第一次授权获取用户信息
						uni.getUserInfo({
							provider: 'weixin',
							success: function(infoRes) {
								//获取用户信息后向调用信息更新方法
								//this.nickName = infoRes.userInfo.nickName; //昵称
								//this.avatarUrl = infoRes.userInfo.avatarUrl; //头像
								uni.setStorageSync('wxInfo',infoRes)
								_this.data = infoRes;
								_this.triggerLogin(); //调用更新信息方法
							},
							fail(res) {
								//uni.hideLoading();
								_this.isShowWeChartAuth = true;
								console.log(res);
							}
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
