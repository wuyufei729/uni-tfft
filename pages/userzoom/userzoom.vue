<template>
	<view class="content">
		<scroll-view scroll-y>
			<view class="list-box">
				<view class="title b-b">
					<text class="title-icon"></text>
					<text class="title-text">个人信息</text>
				</view>
				<view class="detail b-b">
					<text class="left">受害人</text>
					<text class="right">刘能</text>
				</view>
				<view class="detail b-b">
					<text class="left">手机号</text>
					<text class="right">188 4486 5566</text>
				</view>
				<view class="detail mult b-b">
					<view class="detail-c1">
						<text class="left">涉案账户</text>
						<text class="right">6210 3300 1001 5245</text>
					</view>
					<view class="detail-c1">
						<text class="left"></text>
						<text class="right">6210 3300 1001 5245</text>
					</view>
				</view>
				<view class="detail b-b">
					<text class="left">关联微信</text>
					<text class="right">XW_ssddd_dsdxidylw</text>
				</view>
				<view class="detail b-b">
					<text class="left">上次登录</text>
					<text class="right">2020-05-05 15:56:12</text>
				</view>
				
				
			</view>
			
			<button class="login-btn">退出</button>
		</scroll-view>
	</view>
</template>

<script>
export default {
	data() {
		return {
			data: [],
		};
	},
	
	methods: {
		
	}
};
</script>

