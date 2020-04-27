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
							selWidth="200px" selHeight="400upx" @upload="myUpload" :avatarSrc="url"
							avatarStyle="width: 120upx; height: 120upx; border-radius: 100%;">
						</avatar>
					</view>
					<view class="left">头像</view>
				</view>
				<view class="detail b-b">
					<text class="left">姓名或网名</text>
					<input class="right" />
				</view>
				<view class="detail b-b">
					<text class="left">大致年龄</text>
					<input class="right"/>
				</view>
				<view class="detail b-b">
					<text class="left">口音或籍贯</text>
					<input class="right"/>
				</view>
				<view class="detail b-b">
					<text class="left">电话</text>
					<input class="right"/>
				</view>
				<view class="detail b-b">
					<text class="left">微信</text>
					<input class="right"/>
				</view>
				<view class="detail b-b">
					<text class="left">邮箱</text>
					<input class="right"/>
				</view>
				<view class="detail b-b">
					<text class="left">其他软件及ID</text>
					<input class="right"/>
				</view>
				<view class="detail b-b">
					<text class="left">银行卡</text>
					<input class="right"/>
				</view>
				
			</view>
			
			<button class="login-btn">保存</button>
		</scroll-view>
	</view>
</template>

<script>
	import avatar from "../../components/yq-avatar/yq-avatar.vue";
	export default {
		components:{
			avatar,
		},
		data() {
			return {
				data: [],
				percent: 0,
				url: "../../static/missing-face.png",
			}
		},
		methods: {
			uploadIcon(){
				//选择照片
                uni.chooseImage({
                    count:1,
                    sizeType:'compressed',
                    success: (res) => {
                        const imgsFile = res.tempFilePaths
                        //上传
                        const uper=uni.uploadFile({
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
                })
			},
			myUpload(rsp) {
				debugger
            	this.url = rsp.path; //更新头像方式一
            	//rsp.avatar.imgSrc = rsp.path; //更新头像方式二
				
				wx.uploadFile({
					url: 'https://***/upimg',
					filePath: rsp.path,
					name: 'file',
					formData: {
						'user': 'test'
					},
					header: { "Content-Type": "multipart/form-data"},
					success: function (res) {
						var data = res.data
						console.log(res);
					},
					fail:function(res){
					}
				})
            }
		}
	}
</script>

<style>
	@import "./cheaterAdd.scss";
</style>
