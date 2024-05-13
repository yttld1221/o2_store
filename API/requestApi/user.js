import api from '../api.js';
import baseUrl from '../config';
const path = baseUrl.dev;

const user = {
	// 个人信息保存
	teachersave(data) {
		return api.post({
			token: true,
			url: `${path}/xsxcx/client/api/v1/teacher/save`,
			data: {
				...data
			}
		})
	},
	// 获取对象
	getByStaffCode(data) {
		return api.get({
			token: true,
			url: `${path}/xsxcx/client/api/v1/teacher/getByStaffCode`,
			data: {
				...data
			}
		})
	},
	// 日历打点接口
	calendarPoint(data) {
		return api.get({
			token: true,
			url: `${path}/xsxcx/client/api/v1/teacherFree/calendarPoint/${data}`
		})
	},
	// 查询闲时时段
	getFree(data) {
		return api.get({
			token: true,
			url: `${path}/xsxcx/client/api/v1/teacherFree/getFree`,
			data: {
				...data
			}
		})
	},
	// 根据日期获取教师空闲时间
	getFreeList(data) {
		return api.get({
			token: true,
			url: `${path}/xsxcx/client/api/v1/teacherFree/getFreeList/${data}`
		})
	},
	// 时间段保存
	teacherFreesave(data) {
		return api.post({
			token: true,
			url: `${path}/xsxcx/client/api/v1/teacherFree/save`,
			data: {
				...data
			}
		})
	},
	// 个人中心>个人信息
	getUserInfo(data) {
		return api.get({
			token: true,
			url: `${path}/xsxcx/client/api/v1/staff/getUserInfo`,
			data: {
				...data
			}
		})
	},
	// 个人用户>修改用户头像
	updateHeaderImg(data) {
		return api.get({
			token: true,
			url: `${path}/xsxcx/client/api/v1/staff/updateHeaderImg`,
			data: {
				...data
			}
		})
	},
	// 新增反馈意见
	addFeedback(data) {
		return api.post({
			token: true,
			url: `${path}/xsxcx/client/api/v1/feedback/addFeedback`,
			data: {
				...data
			},
			loading:true
		})
	},
	// 个人中心-本校看板
	reserveTeacherschool(data) {
	    return api.get({
	        token: true,
	        url: `${path}/xsxcx/client/api/v1/reserveTeacher/school`,
	        data: {
	            ...data
	        }
	    })
	},
	// 个人中心-本校看板-明細
	schoolDetail(data) {
	    return api.get({
	        token: true,
	        url: `${path}/xsxcx/client/api/v1/reserveTeacher/schoolDetail`,
	        data: {
	            ...data
	        }
	    })
	},
}

export default user;
