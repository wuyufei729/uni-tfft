import request from '../request'
import ApiUrls from '../Api_Urls.js'


/**
 * 获取骗子列表
 */
export function GetCheaterListByPage(data){
    return request({
        url: ApiUrls.Cheater_getCheaterListURL.replace('#currentPage#',data.currentPage).replace('#pageSize#',data.pageSize),
        method: 'GET',
        data: data
    })
}

/**
 * 删除骗子
 */
export function DeleteCheater(data){
	return request({
	    url: ApiUrls.Cheater_deleteCheaterURL,
	    method: 'POST',
	    data: data
	})
}

/**
 * 添加骗子
 */
export function AddCheater(data){
	return request({
	    url: ApiUrls.Cheater_addCheaterURL,
	    method: 'POST',
	    data: data
	})
}