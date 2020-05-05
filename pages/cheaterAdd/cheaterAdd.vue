<template>
	<view class="content">
		<progress :percent="percent" stroke-width="1" />
		<scroll-view scroll-y>
			<view class="list-box">
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
	import {AddCheater} from '@/api/modules/cheater.js'
	
	export default {
		components:{
			avatar,
		},
		data() {
			return {
				data: {
					name: "",
				    approximateAge: 0,
					accentOrBirthplace: "",
					phone: "",
					weChat: "",
					eMail: "",
					otherAppId: "",
					otherAppName: "",
					bankCard: "",
					caseId: "",
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
				
				const _this = this;
				AddCheater(this.data).then(res=>{
					if(res){
						_this.$eventBus.$emit('addCheaterSuccess');
						uni.navigateBack();
					}
				}).catch(err=>{
					console.log('添加骗子失败！')
				})
			},
			uploadIcon(rsp){
				const _this = this;
				this.url = rsp.path; //更新头像方式一
				//选择照片
                /* uni.chooseImage({
                    count:1,
                    sizeType:'compressed',
                    success: (res) => {
                        const imgsFile = res.tempFilePaths;
						_this.url = imgsFile
                        //上传
                        const uper= uni.uploadFile({
                            url: 'https://demo.hcoder.net/index.php?c=uperTest',
                            filePath: imgsFile[0],
                            name: 'file',
                            // formData:{    },用于做令牌认证
                            success: function(res1){
                                console.log(res1.data)
                            }
                        })
                        //上传进度更新的方法
                        uper.onProgressUpdate((e)=>{
                            console.log(e)
                            _self.percent=e.progress
                        })
                    }
                }) */
			},
			
		}
	}
</script>

<style>
	@import "./cheaterAdd.scss";
</style>
