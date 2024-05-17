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
}

export default order;
