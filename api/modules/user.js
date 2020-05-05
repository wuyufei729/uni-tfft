import request from '../request'
import ApiUrls from '../Api_Urls.js'

/**
 * 用户登录
 */
export function UserLogin(data){
	return request({
	    url: ApiUrls.User_loginURL,
	    method: 'POST',
	    data: data
	})
}


/**
 * 检查token是否过期--可能不需要
 */
export function CheckToken(){
	return request({
	    url: ApiUrls.User_checkTokenURL,
	    method: 'GET',
	})
}

/**
 * 刷新token
 */
export function RefreshToken(data){
	return request({
		url: ApiUrls.User_refreshTokenURL,
		method: 'POST',
		data: data,
	})
}

/**
 * 检查数据库是否包含当前用户手机号
 */
export function CheckUserPhoneNumIsValide(phoneNum){
	return request({
		url: ApiUrls.User_checkUserPhoneNumIsValideURL.replace('#id#',phoneNum),
		method: 'GET',
	})
}

/**
 * 用户获取验证码
 */
export function GetVerifyCode(id){
	return request({
	    url: ApiUrls.User_getVerifyCodeURL.replace('#id#',id),
	    method: 'GET'
	})
}

/**
 * 验证码验证
 */
export function VerifyCode(data){
	return request({
	    url: ApiUrls.User_verifyCodeURL.replace('#id#',data.mobile).replace('#code#',data.code),
	    method: 'GET',
	})
}


/**
 * 获取用户被骗经历
 */
export function GetUserExperienceListByPage(data){
    return request({
        url: ApiUrls.User_getExperienceListURL,
        method: 'GET',
        data: data
    })
}

/**
 * 获取用户基本信息
 */
export function GetUserBaseInfo(){
	return request({
	    url: ApiUrls.User_getBaseInfoURL,
	    method: 'GET'
	})
}

