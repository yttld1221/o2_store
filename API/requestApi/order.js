import api from '../api.js';
import store from '../../store/index'
const path = store.state.theUrl;

const order = {
	// v2购买记录-获取本人购买的商品列表数据
	getMyOrderList(data) {
		return api.get({
			token: true,
			url: `${path}/wechat/wx/getMyOrderList`,
			data: {
				...data
			}
		})
	},
	// v2订单-获取我的订单的核销详情
	getMyOrderInfo(data) {
		return api.get({
			token: true,
			url: `${path}/wechat/wx/getMyOrderInfo`,
			data: {
				...data
			}
		})
	},
	//v2订单-删除已取消订单
	delOrder(data) {
		return api.post({
			token: true,
			url: `${path}/wechat/goods/delOrder`,
			data: {
				...data
			}
		})
	},
	//v2订单-取消未支付订单
	cancelOrder(data) {
		return api.post({
			token: true,
			url: `${path}/wechat/goods/cancelOrder`,
			data: {
				...data
			}
		})
	},
	//v2支付-未付款订单付款
	rePayForPrePayId(data) {
		return api.post({
			token: true,
			url: `${path}/wechat/goods/rePayForPrePayId`,
			data: {
				...data
			}
		})
	},
	//v2退款-申请退款
	applyRefund(data) {
		return api.post({
			token: true,
			url: `${path}/wechat/wx/applyRefund`,
			data: {
				...data
			}
		})
	},
	//v2退款-申请退款
	getOssUploadSign(data) {
		return api.post({
			token: true,
			url: `${path}/wechat/sundry/getOssUploadSign`,
			data: {
				...data
			}
		})
	},
	//v2评价-评价订单，确认收货或者核销之后可以评论
	evaluateOrder(data) {
		return api.post({
			token: true,
			url: `${path}/wechat/goods/evaluateOrder`,
			data: {
				...data
			}
		})
	},
	//v2订单-确认收货
	checkOrder(data) {
		return api.post({
			token: true,
			url: `${path}/wechat/goods/checkOrder`,
			data: {
				...data
			}
		})
	},
	//v2退款-获取我的指定订单的退款详情
	getApplyRefundInfo(data) {
		return api.post({
			token: true,
			url: `${path}/wechat/wx/getApplyRefundInfo`,
			data: {
				...data
			}
		})
	},
}

export default order;
