import request from '../request'
import ApiUrls from '../Api_Urls.js'

/**
 * 获取行骗过程列表
 */
export function GetCheaterProcessListByPage(data){
    return request({
        url: ApiUrls.Process_getCheaterProcessListURL.replace('#currentPage#',data.currentPage).replace('#pageSize#',data.pageSize).replace('#cheaterId#',data.cheaterId),
        method: 'GET',
        data: data
    })
}

/**
 * 根据行骗过程Id获取详情
 */
export function GetCheaterProcess(id){
	return request({
	    url: ApiUrls.Porcess_getCheaterProcessURL.replace('#id#',id),
	    method: 'GET'
	})
}

/**
 * 删除某条行骗过程
 */
export function DeleteCheaterProcess(id){
	return request({
	    url: ApiUrls.Porcess_deleteCheaterProcessURL.replace('#id#',id),
	    method: 'DELETE'
	})
}

/**
 * 修改某条行骗过程
 */
export function UpdateCheaterProcess(data){
	return request({
	    url: ApiUrls.Porcess_putUpdateCheaterProcessURL.replace('#id#',data.id),
	    method: 'PUT',
	    data: data
	})
}

/**
 * 新增某条行骗过程
 */
export function AddCheaterProcess(data){
	return request({
	    url: ApiUrls.Porcess_postAddCheaterProcessURL,
	    method: 'POST',
	    data: data
	})
}


/**
 * 获取行骗过程类型
 */
export function GetCheaterProcessTypes(){
	return request({
	    url: ApiUrls.Porcess_getCheaterProcessTypesURL,
	    method: 'GET'
	})
}

/**
 * 上传行骗证据
 */
export function UploadCheaterProcessFile(data){
	return request({
	    url: ApiUrls.Porcess_uploadCheaterProcessFileURL,
	    method: 'POST',
	    data: data,
		isUpload: true,
	})
}

/**
 * 删除行骗证据
 */
export function DeleteCheaterProcessFile(data){
	return request({
	    url: ApiUrls.Porcess_deleteCheaterProcessFileURL,
	    method: 'DELETE',
	    data: data,
	})
}
