const baseURL = '/api/v1.0/wechat';
let Api_Urls = {
	
	User_loginURL: `${baseURL}/Account/WeChatLogin`,//用户登录
	User_checkTokenURL: `${baseURL}/Account/CheckToken`,//check Token是否有效
	User_refreshTokenURL: `${baseURL}/Account/RefreshToken`,//刷新token
	User_getExperienceListURL: `${baseURL}/Experience`,//获取用户被骗经历
	User_getBaseInfoURL:`${baseURL}/User/Info`, //获取用户基本信息
	User_checkUserPhoneNumIsValideURL: `${baseURL}/Case/Mobile/#id#/Count`,//手机号是否被包含在案件中
	
	User_getVerifyCodeURL: `${baseURL}/VerifyCode/SMS/#id#`, //获取短信验证码
	User_verifyCodeURL: `${baseURL}/VerifyCode/SMS/Verify/#id#/#code#`, //验证短信验证码
	
	
	
	
	/* 案件 */
	Scene_getSceneListURL: `${baseURL}/Case?currentPage=#currentPage#&pageSize=#pageSize#`,//获取案件列表
	Scene_getSceneDetailURL: `${baseURL}/Case/#id#`, //获取案件详情
	Scene_addSceneURL: `${baseURL}/Case`, //添加案件
	
	
	/* 骗子 */
	Cheater_getCheaterListURL: `${baseURL}/Cheater?currentPage=#currentPage#&pageSize=#pageSize#`,//获取骗子列表
	Cheater_deleteCheaterURL: `${baseURL}/Cheater/#id#`,//删除骗子
	Cheater_addCheaterURL: `${baseURL}/Cheater`,//添加骗子
	
	Cheater_uploadIconURL: `${baseURL}/Attachments/CheaterPhoto`,//上传骗子头像
	
	/* 行骗过程 */
	Process_getCheaterProcessListURL: `${baseURL}/CriminalToolProcess?currentPage=#currentPage#&pageSize=#pageSize#&cheaterId=#cheaterId#`, //获取行骗过程列表
	Porcess_getCheaterProcessURL: `${baseURL}/CriminalToolProcess/#id#`,//获取某条行骗过程
	Porcess_deleteCheaterProcessURL: `${baseURL}/CriminalToolProcess/#id#`,//删除某条行骗过程
	Porcess_putUpdateCheaterProcessURL: `${baseURL}/CriminalToolProcess/#id#`,//修改某条行骗过程
	Porcess_postAddCheaterProcessURL: `${baseURL}/CriminalToolProcess`,//新增某条行骗过程
	Porcess_getCheaterProcessTypesURL: `${baseURL}/CriminalToolProcess/CriminalToolType`,//获取行骗类型
	/**
	 * 证据
	 */
	Porcess_uploadCheaterProcessFileURL: `${baseURL}/Attachments/Evidence`,//上传行骗证据
	Porcess_deleteCheaterProcessFileURL:`${baseURL}/Attachments/Evidence`,//删除行骗证据
	
	
	
	
	
	
	
}

export default Api_Urls