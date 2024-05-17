import store from '../store/index'
function getToken(token) {
	if (token) {
		if (token !== '') {
			// store.state.theToken
			api.header['token'] = store.state.theToken
			return false;
		} else {
			return true;
		}
	} else {
		return false;
	}
}

let api = {
	header: {
		'content-type': 'application/json',
		'token': '',
	},
	errToken() {
		return new Promise((resolve, reject) => {
			reject();
		});
	},
	errCode(res) {
		console.log(res, 'res')
		if (res.statusCode > 200) {
		} else {
			if (res.data.code == 0) {
				return true
			} else if (res.data.code == 500) {
				uni.showToast({
					title: "服务器连接失败，请反馈官方客服哦~",
					duration: 2500,
					icon: "none",
				});
			} else if (res.data.code == 410) {

			} else {
				uni.showToast({
					title: res.data.msg,
					duration: 2500,
					icon: "none",
				});
			}
		}
	},
	pushRequest(
		url,
		data,
		type,
		loading
	) {
		let _this = this
		if (loading) {
			uni.showLoading({
				title: '加载中',
				mask: true
			});
		}
		return new Promise((resolve, reject) => {
			uni.request({
				url: url,
				data: {
					...data
				},
				header: _this.header,
				method: type,
				dataType: 'json',
				responseType: 'text',
				success(res) {
					if (_this.errCode(res)) {
						if (loading) {
							uni.hideLoading();
						}
						resolve(res.data);
					} else {
						if (loading) {
							uni.hideLoading();
						}
						reject(res.data);
					}
				},
				fail(err) {
					console.error('调用失败', err);
					reject('error');
				},
			});
		});
	},
	get({
		url,
		data,
		token,
		loading = false
	}) {
		if (getToken(token)) {
			return this.errToken();
		}
		return this.pushRequest(url, data, 'GET', loading);
	},
	post({
		url,
		data,
		token,
		loading = false
	}) {
		if (getToken(token)) {
			return this.errToken();
		}
		return this.pushRequest(url, data, 'POST', loading);
	},
	put({
		url,
		data,
		token
	}) {
		if (!getToken(token)) {
			return this.errToken();
		}
		return this.pushRequest(url, data, 'PUT');
	},
	delete({
		url,
		data,
		token
	}) {
		if (!getToken(token)) {
			return this.errToken();
		}
		return this.pushRequest(url, data, 'DELETE');
	}
}

export default api;
