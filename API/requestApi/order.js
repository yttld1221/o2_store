import api from '../api.js';
import baseUrl from '../config';
const path = baseUrl.dev;

const order = {
	// 我的预约列表
	recordList(data) {
	    return api.get({
	        token: true,
	        url: `${path}/xsxcx/client/api/v1/myReservation/recordList`,
	        data: {
	            ...data
	        }
	    })
	}, 
	// 我的预约>历史待评价
	myRecordHistoryList(data) {
	    return api.get({
	        token: true,
	        url: `${path}/xsxcx/client/api/v1/myReservation/myRecordHistoryList`,
	        data: {
	            ...data
	        }
	    })
	}, 
	// 我的预约>预约详情
	reservationDetails(data) {
	    return api.get({
	        token: true,
	        url: `${path}/xsxcx/client/api/v1/myReservation/reservationDetails`,
	        data: {
	            ...data
	        }
	    })
	}, 
	// 我的预约>预约方取消预约
	cancelTheReservationByAppointment(data) {
		return api.post({
			token: true,
			url: `${path}/xsxcx/client/api/v1/myReservation/cancelTheReservationByAppointment`,
			data: {
				...data
			}
		})
	},
	// 我的预约>授课方取消预约
	cancelTheReservationByTeaching(data) {
		return api.post({
			token: true,
			url: `${path}/xsxcx/client/api/v1/myReservation/cancelTheReservationByTeaching`,
			data: {
				...data
			}
		})
	},
	// 我的预约>授课签到
	teachingCheckIn(data) {
		return api.post({
			token: true,
			url: `${path}/xsxcx/client/api/v1/myReservation/teachingCheckIn`,
			data: {
				...data
			}
		})
	},
	// 我的预约>提交评价
	submitEvaluation(data) {
		return api.post({
			token: true,
			url: `${path}/xsxcx/client/api/v1/myReservation/submitEvaluation`,
			data: {
				...data
			}
		})
	},
}

export default order;
