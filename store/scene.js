
import {GetSceneListByPage} from '@/api/modules/scene.js'

const state = {
	v_data: [],
	v_pageSize: 3,
	v_total: 0,
	v_currentPage: 1,
}
const mutations = {
	
	/**
	 * append data值
	 */
	SET_DATA(state, data){
		state.v_data = state.v_data.concat(data.result);
		state.v_total = data.total;
	},
	
	/**
	 * 清空列表
	 */
	CLEAR_DATA(state){
		state.v_data = [];
		state.v_total = 0;
	},
	
	/**
	 * 设置分页
	 */
	SET_CURRENT_PAGE(state, val){
		state.v_currentPage = val;
	}
	
}
import globalData from '../Json.js'
const actions = {
	
	/**
	 * 加载案件数据
	 */
	v_LoadSceneData(context,type){
		let filter = {
			pageSize: context.state.v_pageSize,
			currentPage: context.state.v_currentPage
		}
		
		return new Promise((resolve,reject)=>{
			GetSceneListByPage(filter).then(res=>{
				if (type === 'refresh') {
					context.commit('CLEAR_DATA');
				}
				context.commit('SET_DATA',res.data)
				resolve(res)
			}).catch(err=>{
				reject(err)
			})
			
			/* setTimeout(()=>{
				if (type === 'refresh') {
					context.commit('CLEAR_DATA');
				}
				var sceneList = globalData.sceneList
				context.commit('SET_DATA',{data:sceneList,total: 6}),
				resolve(sceneList)
			},500) */
		})
	},
	
	/**
	 * 设置当前页面
	 */
	v_SetCurrent(context, data){
		context.commit('SET_CURRENT_PAGE',data)
	}
}

export default {
    namespaced: true,
    state,
    mutations,
    actions
}