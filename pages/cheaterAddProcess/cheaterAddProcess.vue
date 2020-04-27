<template>
	<view class="content">
		<progress :percent="percent" stroke-width="1" />
		<scroll-view scroll-y>
			<view class="list-box">
				<view class="title b-b">
					<text class="title-icon"></text>
					<text class="title-text">添加行骗过程</text>
				</view>
				<view class="detail details b-b"> 
					<text class="left">行骗方式</text>
					<view class="right">
						<label @click="slideType(0)" :class="types.includes(0)?'active':''">电话聊天</label>
						<label @click="slideType(1)" :class="types.includes(1)?'active':''">微信聊天</label>
						<label @click="slideType(2)" :class="types.includes(2)?'active':''">短信信息</label>
						<label @click="slideType(3)" :class="types.includes(3)?'active':''">发送邮件</label>
						<label @click="slideType(4)" :class="types.includes(4)?'active':''">账户打款</label>
					</view>
				</view>
				<view class="detail b-b">
					<text class="left">时间</text>
					<view class="right">
						<picker mode="date" :value="date" :start="startDate" :end="endDate" @change="dateChange">
							<view>{{date}}</view>
						</picker>
					</view>
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
			// 设置日期
            //const currentDate = 
			return {
				data: [],
				percent: 0,
				url: "../../static/missing-face.png",
				types: [],
				date: this.getDate({
					format: true
				}), 
                time: '12:01' // 时间初始的状态
				
			}
		},
		computed: {
            startDate() {
                return this.getDate('start');
            },
            endDate() {
                return this.getDate('end');
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
            },
			
			slideType(item){
				if(this.types.includes(item)){
					this.types = this.types.filter(p=>p != item);
				}else{
					this.types.push(item)
				}
			},
			
			// 选择时间 
            timeChange(e) {
                this.time = e.target.value
            },
            // 选择日期
            dateChange(e) {
                this.date = e.target.value
            },
            // 获取年月日信息
            getDate(type) {
                const date = new Date();
                let year = date.getFullYear();
                let month = date.getMonth() + 1;
                let day = date.getDate();
    
                if (type === 'start') {
                    year = year - 60;
                } else if (type === 'end') {
                    year = year + 2;
                }
                month = month > 9 ? month : '0' + month;;
                day = day > 9 ? day : '0' + day;
                return `${year}-${month}-${day}`;
            }
		}
	}
</script>

<style>
	@import "./cheaterAddProcess.scss";
</style>
