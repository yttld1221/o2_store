import api from '../api.js';
import store from '../../store/index'
const path = store.state.theUrl;

const push = {
	// v2校园墙-发校园墙(草稿)
	publish(data) {
		return api.post({
			token: true,
			url: `${path}/wechat/moments/publish`,
			data: {
				...data
			}
		})
	},
}

export default push;
