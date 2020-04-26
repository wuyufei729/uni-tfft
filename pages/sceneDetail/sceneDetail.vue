<template>
	<view class="content">
		<scroll-view scroll-y>
			<view class="list-box">
				<view class="title b-b">
					<text class="title-icon"></text>
					<text class="title-text">案件信息</text>
				</view>
				<view class="detail b-b">
					<text class="left">案件编号</text>
					<text class="right">S20200505199525</text>
				</view>
				<view class="detail b-b">
					<text class="left">涉案类型</text>
					<text class="right">网络诈骗—微信</text>
				</view>
				<view class="detail details b-b"> 
					<text class="left">案情简介</text>
					<text class="right">公元2020年5月21日，在高新区泰德大厦，一可疑男子多次使用公共电话上升到了福建省蝶恋蜂狂决胜巅峰洛杉矶的反垄断设计费</text>
				</view>
				<view class="detail b-b">
					<text class="left">终端编号</text>
					<text class="right">32554554</text>
				</view>
				<view class="detail b-b">
					<text class="left">受理单位</text>
					<text class="right">大连市高新园区七贤岭派出所</text>
				</view>
				<view class="detail b-b">
					<text class="left">受理警员</text>
					<text class="right">张伟霆 J20201545545</text>
				</view>
				<view class="detail b-b">
					<text class="left">报案时间</text>
					<text class="right">2020-05-25 08:45:15</text>
				</view>
				<view class="detail b-b">
					<text class="left">手机号</text>
					<text class="right">183 5565 5566</text>
				</view>
				<view class="history-section icon">
					<view class="sec-header">
						<text class="yticon icon-lishijilu"></text>
						<text>关联骗子</text>
					</view>
					<scroll-view scroll-x class="h-list">
						<view class="item">
							<image @click="navTo('/pages/product/product')" src="https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1553105186633&di=c121a29beece4e14269948d990f9e720&imgtype=0&src=http%3A%2F%2Fimg004.hc360.cn%2Fm8%2FM04%2FDE%2FDE%2FwKhQplZ-QteEBvsbAAAAADUkobU751.jpg" mode="aspectFill"></image>
							<text class="">谢广坤</text>
						</view>
						<view class="item">
							<image @click="navTo('/pages/product/product')" src="https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1553105231218&di=09534b9833b5243296630e6d5b728eff&imgtype=0&src=http%3A%2F%2Fimg002.hc360.cn%2Fm1%2FM05%2FD1%2FAC%2FwKhQcFQ3iN2EQTo8AAAAAHQU6_8355.jpg" mode="aspectFill"></image>
							<text class="">王老七</text>
						</view>
						<view class="item">
							<image @click="navTo('/pages/product/product')" src="https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1553105320890&di=c743386be51f2c4c0fd4b75754d14f3c&imgtype=0&src=http%3A%2F%2Fimg007.hc360.cn%2Fhb%2FMTQ1OTg4ODY0MDA3Ny05OTQ4ODY1NDQ%3D.jpg" mode="aspectFill"></image>
							<text class="">王小蒙</text>
						</view>
						<view class="item">
							<image @click="navTo('/pages/product/product')" src="https://ss2.bdstatic.com/70cFvnSh_Q1YnxGkpoWK1HF6hhy/it/u=2691146630,2165926318&fm=26&gp=0.jpg" mode="aspectFill"></image>
							<text class="">谢永强</text>
						</view>
						<view class="item">
							<image @click="navTo('/pages/product/product')" src="https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1553105443324&di=8141bf13f3f208c61524d67f9bb83942&imgtype=0&src=http%3A%2F%2Fimg.zcool.cn%2Fcommunity%2F01ac9a5548d29b0000019ae98e6d98.jpg" mode="aspectFill"></image>
							<text class="">谢飞机</text>
						</view>
						<view class="item">
							<image @click="navTo('/pages/product/product')" src="https://ss0.bdstatic.com/70cFuHSh_Q1YnxGkpoWK1HF6hhy/it/u=191678693,2701202375&fm=26&gp=0.jpg" mode="aspectFill"></image>
							<text class="">张大炮</text>
						</view>
						<view class="item add-more" @click="addCheater()">
							<text class="">+</text>
						</view>
					</scroll-view>
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
		};
	},
	
	methods: {
		addCheater(){
			uni.showModal({
			    title: '提示',
			    content: '确定要向该案件添加骗子吗？',
			    success: function (res) {
			        if (res.confirm) {
			            //console.log('用户点击确定');
						
						uni.navigateTo({
							url: '/pages/cheaterAdd/cheaterAdd'
						})
						
			        } else if (res.cancel) {
			            console.log('用户点击取消');
			        }
			    }
			});
		}
	}
};
</script>

