//const baseURL = 'http://localhost:8888/vec';
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
			if(isNeedToken != null && !isNeedToken){
				header['v-token'] = uni.getStorageSync('auth-token');
			}
            uni.request({
                url: (options.baseURL || config.serverUrl) + options.url,
                method: options.method || 'POST', // 默认为POST请求
                data: options.data, //请求超时在manifest.json配置
                header: header,
                success: res => {
                    resolve(res.data)
                },
                fail: (err) => {
                    reject(err.data);
                    console.log(err);
                    uni.showToast({
                        title: '请检查网络连接',
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