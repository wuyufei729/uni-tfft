import request from '../request'
import ApiUrls from '../Api_Urls.js'


/**
 * 获取案件列表
 */
export function GetSceneListByPage(data){
    return request({
        url: ApiUrls.Scene_getSceneListURL.replace('#currentPage#',data.currentPage).replace('#pageSize#',data.pageSize),
        method: 'GET',
        data: data
    })
}

/**
 * 获取案件详情
 */
export function GetSceneDetail(id){
	return request({
	    url: ApiUrls.Scene_getSceneDetailURL.replace('#id#',id),
	    method: 'GET'
	})
}

/**
 * 添加案件
 */
export function AddScene(data){
	return request({
	    url: ApiUrls.Scene_addSceneURL,
	    method: 'POST',
		data: data
	})
}
