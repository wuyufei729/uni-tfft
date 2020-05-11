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
export function DeleteCheater(id){
	return request({
	    url: ApiUrls.Cheater_deleteCheaterURL.replace('#id#',id),
	    method: 'DELETE',
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

/**
 * 上传骗子头像
 */
export function UploadCheaterIcon(data){
	return request({
	    url: ApiUrls.Cheater_uploadIconURL,
	    method: 'POST',
	    data: data,
		isUpload: true,
	})
}
