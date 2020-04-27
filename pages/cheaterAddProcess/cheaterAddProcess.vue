<template>
	<view class="content">
		<mx-date-picker :color="'#03198D'" :showSeconds="false" :show="showPicker" :type="type" :value="dateValue" :show-tips="true" :begin-text="'开始时间'" :end-text="'结束时间'"
			:show-seconds="true" @confirm="onSelected" @cancel="onSelected" />
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
					<text class="right" @click="onShowDatePicker('rangetime')" style="font-size: 12px;">
						{{showDateValue}}
					</text>
				</view>
				<view class="detail b-b">
					<text class="left">添加转账记录</text>
					<input class="right"/>
				</view>
			</view>
			
			<button class="login-btn">保存</button>
		</scroll-view>
	</view>
</template>

<script>
	import avatar from "../../components/yq-avatar/yq-avatar.vue";
	import MxDatePicker from "@/components/mx-datepicker/mx-datepicker.vue";
	export default {
		components:{
			avatar,
			MxDatePicker
		},
		data() {
			// 设置日期
            //const currentDate = 
			return {
				data: [],
				percent: 0,
				url: "../../static/missing-face.png",
				types: [],
				showPicker: false,
				rangetime: ['2019/01/08 14:00','2019/01/16 13:59'],
				type: 'rangetime',
				dateValue: ''
				
			}
		},
		computed:{
			showDateValue(){
				if(this.dateValue != null && this.dateValue != '') {
					return this.dateValue.join('—');
				}else{
					return '选择时间范围';
				}
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
			onShowDatePicker(type){//显示
				this.type = type;
				this.showPicker = true;
				this.dateValue = this[type];
			},
			onSelected(e) {//选择
				this.showPicker = false;
				if(e) {
					this[this.type] = e.value; 
					//选择的值
					console.log('value => '+ e.value);
					//原始的Date对象
					console.log('date => ' + e.date);
				}
			}
			
		}
	}
</script>

<style>
	@import "./cheaterAddProcess.scss";
</style>
