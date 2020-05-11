<template>
	<view class="content">
		<progress :percent="percent" stroke-width="1" />
		<scroll-view scroll-y>
			<view class="list-box edit">
				<view class="title b-b">
					<text class="title-icon"></text>
					<text class="title-text">骗子信息录入</text>
				</view>
				<view class="detail avatar">
					<view class="right">
						<avatar	
							selWidth="200px" selHeight="400upx" @upload="uploadIcon" :avatarSrc="url"
							avatarStyle="width: 120upx; height: 120upx; border-radius: 100%;">
						</avatar>
						<!-- <button type="default" @click="test">上传</button> -->
					</view>
					<view class="left">头像</view>
				</view>
				<view class="detail b-b">
					<text class="left">姓名或网名</text>
					<input class="right" v-model="data.name" />
				</view>
				<view class="detail b-b">
					<text class="left">大致年龄</text>
					<input class="right" v-model="data.approximateAge"/>
				</view>
				<view class="detail b-b">
					<text class="left">口音或籍贯</text>
					<input class="right" v-model="data.accentOrBirthplace"/>
				</view>
				<view class="detail b-b">
					<text class="left">电话</text>
					<input class="right" v-model="data.phone"/>
				</view>
				<view class="detail b-b">
					<text class="left">微信</text>
					<input class="right" v-model="data.weChat"/>
				</view>
				<view class="detail b-b">
					<text class="left">邮箱</text>
					<input class="right" v-model="data.eMail"/>
				</view>
				<view class="detail b-b">
					<text class="left">其他软件及ID</text>
					<input class="right" v-model="data.otherAppId"/>
				</view>
				<view class="detail b-b">
					<text class="left">银行卡</text>
					<input class="right" v-model="data.bankCard"/>
				</view>
				
			</view>
			
			<button class="login-btn" @click="addCheater()">保存</button>
		</scroll-view>
	</view>
</template>

<script>
	import avatar from "../../components/yq-avatar/yq-avatar.vue"
	import {AddCheater,UploadCheaterIcon} from '@/api/modules/cheater.js'
	
	export default {
		components:{
			avatar,
		},
		data() {
			return {
				data: {
					caseId: "",
					name: "",
				    approximateAge: 0,
					accentOrBirthplace: "",
					phone: "",
					weChat: "",
					eMail: "",
					otherAppId: "",
					otherAppName: "",
					bankCard: "",
					photoUrl: "",
					photoThumbUrl: "",
				},
				percent: 0,
				url: "../../static/missing-face.png",
			}
		},
		onLoad(options) {
			if(options && options.sceneId){
				this.data.caseId = options.sceneId
			}
		},
		
		
		methods: {
			
			/**
			 * 添加骗子
			 */
			addCheater(){
				uni.showLoading({
				    title: '提交中...',
				    mask: true // 默认遮罩出现可以继续操作
				});
				const _this = this;
				AddCheater(this.data).then(res=>{
					uni.hideLoading()
					if(res){
						_this.$eventBus.$emit('addCheaterSuccess');
						uni.navigateBack();
					}
				}).catch(err=>{
					uni.hideLoading()
					console.log('添加骗子失败！')
				});
				
			},
			
			
			/**
			 * 上传骗子头像
			 */
			uploadIcon(rsp){
				const _this = this;
				this.url = rsp.path; //更新头像方式一
				
				let uploadData = {
					filePath: _this.url
				}
				//上传图片
				UploadCheaterIcon(uploadData).then(res=>{
					if(res && res.data){
						var resList = JSON.parse(res.data);
						if(resList.length>1){
							_this.data.photoUrl = resList[0].filePath
							_this.data.photoThumbUrl = resList[0].filePath
						}else{
							console.log('上传骗子头像返回为空！');
						}
					}
				}).catch(err=>{
					console.log('上传骗子头像失败！')
				})
				
				
			},
			
		}
	}
</script>

<style>
	@import "./cheaterAdd.scss";
</style>
