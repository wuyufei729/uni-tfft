<template>
	<view class="content">
		<mx-date-picker :color="'#03198D'" :showSeconds="false" :show="showPicker" :type="type" :value="dateValue" :show-tips="true" :begin-text="'开始时间'" :end-text="'结束时间'"
			:show-seconds="true" @confirm="onSelected" @cancel="onSelected" />
		<progress :percent="percent" stroke-width="1" />
		<scroll-view scroll-y>
			<view class="list-box">
				<view class="title b-b">
					<text class="title-icon"></text>
					<text class="title-text">编辑行骗过程</text>
				</view>
				<view class="detail details b-b">
					<text class="left">涉案金额</text>
					<input type="number" class="right" style="flex: 4;" v-model="data.amounts" />
				</view>
				<view class="detail details b-b"> 
					<text class="left">行骗方式</text>
					<view class="right" style="flex: 4;">
						<label v-for="(item,i) in types" :key="i" @click="slideType(item)" :class="item.checked?'active':''">{{item.name}}</label>
					</view>
				</view>
				<view class="detail b-b">
					<text class="left">时间</text>
					<text class="right single" @click="onShowDatePicker('rangetime')" style="flex: 4">
						{{showDateValue}}
					</text>
				</view>
				<view class="detail b-b" style="height: 120px;">
					<text class="left">内容</text>
					<textarea class="input-text right" v-model="data.process" style="flex: 4;height: 110px" placeholder="拷贝粘贴微信/QQ/邮件/短信等内容">
					</textarea>
				</view>
				<view class="detail b-b">
					<text class="left">转账记录</text>
					<text class="right" @click="uploadIcon()" style="flex: 4;">选择本地图片</text>
				</view>
				
				<scroll-view scroll-x class="image-list inner">
					<view class="item" v-for="(item,i) in uploadFiles" :key="i">
						<image :src="item" mode="aspectFill" @click="$viewImage(item)"></image>
						<text class="remove" @click="removeFile(item)">×</text>
					</view>
				</scroll-view>
			</view>
			
			<button class="login-btn" @click="saveCheater()">保存</button>
		</scroll-view>
	</view>
</template>

<script>
	import avatar from "../../components/yq-avatar/yq-avatar.vue"
	import MxDatePicker from "@/components/mx-datepicker/mx-datepicker.vue"
	import {mapState} from 'vuex'
	import {GetCheaterProcessTypes,GetCheaterProcess,UpdateCheaterProcess} from '@/api/modules/cheaterProcess.js'
	export default {
		components:{
			avatar,
			MxDatePicker,
		},
		data() {
			// 设置日期
            //const currentDate = 
			return {
				data: null,
				percent: 0,
				types: [],
				showPicker: false,
				//rangetime: [],//['2019/01/08 14:00','2019/01/16 13:59'],
				type: 'rangetime',
				dateValue: [],
				
				uploadFiles: [],
				
				progressId: null,
			}
		},
		computed:{
			...mapState('cheaterProcess',['v_data']),
			showDateValue(){
				if(this.dateValue != null && this.dateValue != '') {
					return this.dateValue.join(' - ');
				}else{
					return '选择时间范围';
				}
			}			
		},
		
		onLoad(options) {
			//获取url参数
			//var data = JSON.parse(options.id); // 字符串转对象
			/* this.progressId = options.id;
			this.getData(); */
			this.data = uni.getStorageSync('cheaterPorcessEditData');
			this.initProcessTypes();
			
			if(this.data.startDateTime != null && this.data.endDateTime != null){
				this.dateValue = [this.data.startDateTime,this.data.endDateTime];
			}else if(this.data.startDateTime != null){
				this.dateValue = [this.data.startDateTime];
			}else if(this.data.endDateTime != null){
				this.dateValue = [this.data.endDateTime];
			}else{
				this.dateValue = null;
			}
			
			
		},
		
		methods: {
			
			/**
			 * 根据过程id获取过程详情
			 */
			getData(){
				const _this = this;
				let getDetail = GetCheaterProcess(this.progressId).then(res=>{
					_this.initProcessTypes();
					if(res && res.data){
						_this.data = res.data;
						_this.dateValue = [_this.data.timeStart, _this.data.timeEnd];
					}
				}).catch(err=>{
					console.log('获取过程详情失败！');
				});
			},
			
			/**
			 * 获取行骗类型
			 */
			initProcessTypes(){
				const _this = this;
				GetCheaterProcessTypes().then(res=>{
					if(res && res.data){
						let types = res.data;
						_this.types = types.map(p=>{
							if(_this.data.criminalToolTypeName == p.name){
								p['checked'] = true;
							}else{
								p['checked'] = false;
							}
							return p;
						})
					}
				}).catch(err=>{
					console.log('编辑行骗过程中获取行骗类型失败!')
				})
			},
			
			/**
			 * 保存骗子行骗过程
			 */
			saveCheater(){
				//todo edit item
				const _this = this;
				let checkedType = null;
				if(_this.types.find(p=>p.checked) != null){
					checkedType = _this.types.find(p=>p.checked).id
				}
				
				_this.data.startDateTime = _this.dateValue != null && _this.dateValue.length>0? _this.dateValue[0]: null;
				_this.data.endDateTime = _this.dateValue != null&& _this.dateValue.length>2? _this.dateValue[1]: null;
				_this.data.criminalToolType = checkedType;
				
				UpdateCheaterProcess(_this.data).then(res=>{
					if(res){
						_this.$eventBus.$emit('refreshCheaterProcessList');
						uni.showToast({
							title: '更新成功！',
							icon: 'success',
						});
						setTimeout(()=>{
							uni.navigateBack();
						},1500)
					}
				}).catch(err=>{
					console.log('更新行骗过程失败！');
				})
				
				
				
			},
			uploadIcon(){
				//选择照片
                uni.chooseImage({
                    count:1,
                    sizeType:'compressed',
                    success: (res) => {
                        const imgsFile = res.tempFilePaths;
						this.uploadFiles.push(imgsFile[0]);
                        //上传
                        /* const uper=uni.uploadFile({
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
                        }) */
                    }
                })
			},
			
			
			
			/**
			 * 删除某个图片
			 */
			removeFile(item){
				this.uploadFiles = this.uploadFiles.filter(p=>p != item);
			},
			
			slideType(item){
				item.checked = !item.checked
				this.types.filter(p=>p.name != item.name).map(s=>s.checked = false);
			},
			onShowDatePicker(type){//显示
				this.type = type;
				this.showPicker = true;
				this.dateValue = this[type];
			},
			onSelected(e) {//选择
				this.showPicker = false;
				this.dateValue = e.value;
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
	@import "./cheaterProcessEdit.scss";
</style>
