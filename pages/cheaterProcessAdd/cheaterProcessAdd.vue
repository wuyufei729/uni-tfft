<template>
	<view class="content">
		<mx-date-picker :color="'#03198D'" :showSeconds="false" :show="showPicker" :type="type" :value="dateValue" :show-tips="true" :begin-text="'开始时间'" :end-text="'结束时间'"
			:show-seconds="true" @confirm="onSelected" @cancel="onSelected" />
		<progress :percent="percent" stroke-width="1" />
		<scroll-view scroll-y>
			<view class="list-box edit">
				<view class="title b-b">
					<text class="title-icon"></text>
					<text class="title-text">添加行骗过程</text>
				</view>
				<view class="detail details b-b">
					<text class="left">涉案金额</text>
					<input type="number" class="right" style="flex: 4;" v-model="amounts" />
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
					<textarea class="input-text right" v-model="content" style="flex: 4;height: 110px" placeholder="拷贝粘贴微信/QQ/邮件/短信等内容">
						
					</textarea>
				</view>
				<view class="detail b-b">
					<text class="left">转账记录</text>
					<text class="right" @click="uploadIcon()" style="flex: 4;">选择本地图片</text>
				</view>
				
				<scroll-view scroll-x class="image-list inner">
					<view class="item" v-for="(item,i) in evidenceImageUrls" :key="i">
						<image :src="item.thumbUrl" mode="aspectFill"></image>
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
	import {mapState, mapActions} from 'vuex'
	import {GetCheaterProcessTypes, AddCheaterProcess, UploadCheaterProcessFile} from '@/api/modules/cheaterProcess.js'
	export default {
		components:{
			avatar,
			MxDatePicker,
		},
		data() {
			// 设置日期
            //const currentDate = 
			return {
				cheaterId: null,
				data: {},
				percent: 0,
				url: "../../static/missing-face.png",
				types: [],
				content: '',
				amounts: 0,
				
				showPicker: false,
				//rangetime: [],//['2019/01/08 14:00','2019/01/16 13:59'],
				type: 'rangetime',
				dateValue: '',
				
				evidenceImageUrls: [],
				
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
			if(options && options.cheaterId){
				this.cheaterId = options.cheaterId;
			}
		},
		created(){
			//初始化行骗过程
			this.initProcessTypes();
		},
		
		methods: {
			...mapActions('cheaterProcess',['V_AddCheaterProcess']),
			
			/**
			 * 获取行骗类型
			 */
			initProcessTypes(){
				const _this = this;
				GetCheaterProcessTypes().then(res=>{
					if(res && res.data){
						_this.types = res.data.map(p=>{
							return Object.assign(p,{checked: false})
						});
					}
				}).catch(err=>{
					console.log('添加行骗过程中获取行骗类型失败!')
				})
				
			},
			
			/**
			 * 保存骗子行骗过程
			 */
			saveCheater(){
				const _this = this;
				let checkedType = null;
				if(_this.types.find(p=>p.checked) != null){
					checkedType = _this.types.find(p=>p.checked).id
				}
				//todo add item
				let postData = {
					cheaterId: _this.cheaterId,
					startDateTime: _this.dateValue[0],
					endDateTime: _this.dateValue[1],
					criminalToolType: checkedType,
					process: _this.content,
					amounts: _this.amounts,
					experienceIds: _this.evidenceImageUrls.map(p=>p.id)
				}
				AddCheaterProcess(postData).then(res=>{
					if(res){
						//_this.V_AddCheaterProcess(postData)
						_this.$eventBus.$emit('refreshCheaterProcessList');
						uni.showToast({
							title: '添加成功！',
							icon: 'success'
						});
						setTimeout(()=>{
							wx.navigateBack();
						},1500)
						
					}
				}).catch(err=>{
					console.log('添加行骗过程失败！')
				})
				
				
				
			},
			
			/**
			 * 上传证据
			 */
			uploadIcon(){
				const _this = this;
				//选择照片
                uni.chooseImage({
                    count:1,
                    sizeType:'compressed',
                    success: (res) => {
                        const imgsFile = res.tempFilePaths;
						_this.evidenceImageUrls.push({
							thumbUrl: imgsFile[0],
							id: null
						})
						
						let uploadData = {
							filePath: imgsFile[0],
							formData:{
								criminalToolProcessId: null
							}
						}
						//上传图片
						UploadCheaterProcessFile(uploadData).then(res=>{
							if(res && res.data){
								var evidence = JSON.parse(res.data);
								if(evidence != null){
									_this.evidenceImageUrls.find(p=>p.thumbUrl == uploadData.filePath).id = evidence.evidenceId
								}else{
									console.log('上传行骗证据返回为空！');
								}
							}
						   }).catch(err=>{
							console.log('上传行骗证据失败！')
						})
                    }
                })
			},
			
			/**
			 * 删除某个图片
			 */
			removeFile(item){
				var postData = {
					evidenceId: item.id,
					criminalToolProcessId: null
				}
				DeleteCheaterProcessFile(postData).then(res=>{
					
				}).catch(err=>{
					console.log('删除证据失败！')
				})
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
	@import "./cheaterProcessAdd.scss";
</style>
