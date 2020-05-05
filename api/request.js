import {RefreshToken} from '@/api/modules/user.js'
const config = require('../static/config.js');
var uurl = config.serverUrl;//读取baseURL
const request = (options) => {
    return new Promise((resolve, reject) => {
		if(options.isShowLoading != null && options.isShowLoading){
			uni.showLoading({
			    title: '加载中...',
			    mask: options.load || false // 默认遮罩出现可以继续操作
			});
		}
        
        try{
			var isNeedToken = options.needToken;
			var header = {
				'Content-Type': options.header == 'form' ? 'application/x-www-form-urlencoded' : 'application/json'
			}
			//不确定v-token是否能赋值成功
			/* if(isNeedToken != null && !isNeedToken){
				header['access-token'] = 'Bearer' + uni.getStorageSync('access-token');
			} */
			header['Authorization'] = 'Bearer ' + uni.getStorageSync('access-token');
            uni.request({
                url: (options.baseURL || config.serverUrl) + options.url,
                method: options.method || 'POST', // 默认为POST请求
                data: options.data, //请求超时在manifest.json配置
                header: header,
                success: res => {
					if(res.statusCode == 200){
						resolve(res)
					}else if(res.statusCode == 401){
						/* if(options.isCheckToken != null && options.isCheckToken){
							resolve(res)
						}else{
							uni.showModal({
								content: '未登录或登录超时，请重新登录！',
								showCancel: false,
								success: (e)=>{
									uni.reLaunch({
										url: '/pages/login/login.vue'
									})
								}
							})
						} */
						RefreshToken({
							accessToken: uni.getStorageSync('access-token'),
							refreshToken: uni.getStorageSync('refresh-token')
						}).then(res2=>{
							uni.setStorageSync('access-token');
							uni.setStorageSync('refresh-token')
						}).catch(err2=>{
							
						})
					}else if(res.statusCode == 400){
						uni.removeStorageSync('access-token');
						uni.removeStorageSync('refresh-token');
						uni.showModal({
							content: '未登录或登录超时，请重新登录！',
							showCancel: false,
							success: (e)=>{
								uni.reLaunch({
									url: '/pages/login/login'
								})
							}
						})
					
					}else{
						uni.showToast({
						    title: '系统错误！',
							icon: 'none'
						})
					}
                },
                fail: (err) => {
                    reject(err.data);
                    console.log(err);
                    uni.showToast({
                        title: '请检查网络连接'+err.errMsg,
                        icon: 'none'
                    })
                    /*错误码处理
                    let code = err.data.code; 
                    switch (code) {
                        case 1000:
                            break;
                        default:
                            break;
                    } */
                },
                complete: () => {
					uni.hideLoading();
                }
            });
        }catch(e){
            uni.hideLoading();
            uni.showToast({
                title: '服务端异常',
                icon: 'none'
            })
        }
        
    })
}

export default request