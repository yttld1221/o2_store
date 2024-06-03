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
}

export default user;
