
import {GetCheaterProcessListByPage, DeleteCheaterProcess} from '@/api/modules/cheaterProcess.js'

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
	},
	
	/**
	 * 删除某条行骗记录
	 */
	DELETE_ITEM(state, id){
		state.v_data = state.v_data.filter(p=>p.id != id);
		state.v_total -= 1;
	},
	
	/**
	 * 添加一条行骗记录
	 */
	ADD_ITEM(state, data){
		state.v_data.push(data);
		state.v_total += 1;
	}
	
	
}
import globalData from '../Json.js'
const actions = {
	
	/**
	 * 加载行骗过程列表
	 */
	v_LoadCheaterProcessData(context,data){
		let filter = {
			pageSize: context.state.v_pageSize,
			currentPage: context.state.v_currentPage,
			cheaterId: data.cheaterId
		}
		
		return new Promise((resolve,reject)=>{
			GetCheaterProcessListByPage(filter).then(res=>{
				if (data.type === 'refresh') {
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
				var cheaterProcess = globalData.cheaterProcess
				context.commit('SET_DATA',{data:cheaterProcess,total: 6}),
				resolve(cheaterProcess)
			},500) */
		})
	},
	
	/**
	 * 设置当前页面
	 */
	v_SetCurrent(context, data){
		context.commit('SET_CURRENT_PAGE',data)
	},
	
	/**
	 * 删除行骗记录
	 */
	v_DeleteCheaterProcess(context, id){
		return new Promise((resolve, reject)=>{
			DeleteCheaterProcess(id).then(res=>{
				context.commit('DELETE_ITEM',id);
				resolve(res)
			}).catch(err=>{
				reject(err)
			})
		})
	},
	
	/**
	 * 添加行骗记录
	 */
	V_AddCheaterProcess(context,data){
		context.commit('ADD_ITEM',data);
	}
}

export default {
    namespaced: true,
    state,
    mutations,
    actions
}