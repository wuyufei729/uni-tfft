<template>
	<view class="content">
		<scroll-view scroll-y>
			<view class="list-box">
				<view class="title b-b">
					<text class="title-icon"></text>
					<text class="title-text">骗子信息录入</text>
				</view>
				<view class="detail b-b">
					<text class="left">头像</text>
					<text class="right">选择</text>
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
	export default {
		data() {
			return {
				data: [],
			}
		},
		methods: {
			
		}
	}
</script>

<style>
	@import "./cheaterAdd.scss";
</style>
