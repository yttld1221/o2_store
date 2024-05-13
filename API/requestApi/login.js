import api from '../api.js';
import baseUrl from '../config';
const path = baseUrl.dev;

const login = {
	// 上传
	uploadFile(data) {
		return api.post({
			token: true,
			url: `/fast-file/fileWithout/uploadGroup/group1`,
			data: {
				...data
			}
		})
	},
	// 点击消息查看详情
	sendMsgInfo(data) {
		return api.get({
			token: false,
			url: `${path}/xsxcx/client/api/v1/myReservation/sendMsgInfo`,
			data: {
				...data
			}
		})
	},
	// 验证登录是否首次登陆
	checkLogin(data) {
		return api.get({
			token: false,
			url: `${path}/xsxcx/client/api/v1/login/checkLogin`,
			data: {
				...data
			}
		})
	},
	// 用户登录
	h5UserLogin(data) {
		return api.get({
			token: false,
			url: `${path}/xsxcx/client/api/v1/login/h5UserLogin`,
			data: {
				...data
			}
		})
	},
	// 查询当前用户信息
	getCurrentUser(data) {
		return api.get({
			token: true,
			url: `${path}/xsxcx/client/api/v1/login/getCurrentUser`,
			data: {
				...data
			}
		})
	},
	// 平台组织列表
	getOrganizeDeptList(data) {
		return api.get({
			token: true,
			url: `${path}/xsxcx/client/api/v1/organizeDept/getOrganizeDeptList`,
			data: {
				...data
			}
		})
	},
	// 修改用户平台组织信息
	updateStaffOrganize(data) {
		return api.get({
			token: true,
			url: `${path}/xsxcx/client/api/v1/login/updateStaffOrganize`,
			data: {
				...data
			}
		})
	},
	// 获取签名信息
	ddConfigSign(data) {
		return api.get({
			token: true,
			url: `${path}/xsxcx/client/api/v1/login/ddConfigSign`,
			data: {
				...data
			}
		})
	},
	//获取登录验证码
	sendLoginSmsMessage(data) {
		return api.get({
			token: false,
			url: `${path}/xsxcx/client/api/v1/login/sendLoginSmsMessage`,
			data: {
				...data
			}
		})
	},
	//手机号验证码登录
	h5PhoneLogin(data) {
		return api.get({
			token: false,
			url: `${path}/xsxcx/client/api/v1/login/h5PhoneLogin`,
			data: {
				...data
			}
		})
	},
	
}

export default login;
