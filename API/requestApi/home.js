import api from '../api.js';
import store from '../../store/index'
const path = store.state.theUrl;

const home = {
	// 活动-获取活动详情实例
	getTaskInfo(data) {
		return api.post({
			token: true,
			url: `${path}/wechat/task/getTaskInfo`,
			data: {
				...data
			}
		})
	},
	// 菜单-一次获取所有已启用首页菜单
	getAllMenu(data) {
		return api.get({
			token: true,
			url: `${path}/wechat/sundry/getAllMenu`,
			data: {
				...data
			}
		})
	},
	// 活动-分页获取活动列表
	getTaskList(data) {
		return api.get({
			token: true,
			url: `${path}/wechat/task/getTaskList`,
			data: {
				...data
			}
		})
	},
	// 收货地址-获取当前用户的（全部或默认）收货地址
	getMyReceiveAddrs(data) {
		return api.post({
			token: true,
			url: `${path}/wechat/wx/getMyReceiveAddrs`,
			data: {
				...data
			}
		})
	},
	// v2活动-收藏取消收藏
	collection(data) {
		return api.post({
			token: true,
			url: `${path}/wechat/task/collection`,
			data: {
				...data
			}
		})
	},
	// v2收货地址-删除本人的收货地址
	delMyReceiveAddr(data) {
		return api.post({
			token: true,
			url: `${path}/wechat/wx/delMyReceiveAddr`,
			data: {
				...data
			}
		})
	},
	// v2收货地址-收货地址新增或编辑
	saveReceiveAddr(data) {
		return api.post({
			token: true,
			url: `${path}/wechat/wx/saveReceiveAddr`,
			data: {
				...data
			}
		})
	},
}

export default home;
