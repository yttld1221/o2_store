import api from '../api.js';
import store from '../../store/index'
const path = store.state.theUrl;

const user = {
	// v2人员-分页获取我的关注好友，粉丝和同学
	getMyPerson(data) {
		return api.post({
			token: true,
			url: `${path}/wechat/sundry/getMyPerson`,
			data: {
				...data
			}
		})
	},
	//v2消息中心-分页获取聊天的汇总数据
	getMySummaryMsgList(data) {
		return api.get({
			token: true,
			url: `${path}/wechat/sundry/getMySummaryMsgList`,
			data: {
				...data
			}
		})
	},
	//v2聊天对话-分页获取与指定人员聊天记录
	getMyChatMsgList(data) {
		return api.get({
			token: true,
			url: `${path}/wechat/sundry/getMyChatMsgList`,
			data: {
				...data
			}
		})
	},
	
}

export default user;
