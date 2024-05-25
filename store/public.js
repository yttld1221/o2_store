// 字符串转数组
function strToArr(str, char) { // str为字符串，char为间隔的字符
	return str.split(char)
}

//方法：点击图片打开图片查看器
function previewImage(urls, index = 0) {
	let theUrls = [];
	for (let i = 0; i < urls.length; i++) {
		theUrls.push(urls[i] + '?x-oss-process=image/resize,m_lfit,h_750,w_750')
	}
	uni.previewImage({
		current: index,
		urls: theUrls
	})
}

// 方法：获取状态栏高度
function getTopIconDistance() {
	let statusBarHeight = 0;
	let navBarHeight = 0;
	let tabBarHeight = 0;

	uni.getSystemInfo({
		success: (res) => {
			// console.log('res', res);
			// 获取手机顶部状态栏的高度
			statusBarHeight = res.statusBarHeight || 0;

			// 获取导航栏的高度（手机状态栏高度 + 胶囊高度 + 胶囊的上下间距）
			const menuButtonInfo = uni.getMenuButtonBoundingClientRect();
			navBarHeight = menuButtonInfo.height + (menuButtonInfo.top - statusBarHeight) * 2;
			tabBarHeight = res.screenHeight - res.safeArea.bottom;
		},
		fail: (err) => {
			// console.error('获取系统信息失败:', err);
		},
	});

	return {
		statusBarHeight: statusBarHeight, // 状态栏高度
		navBarHeight: navBarHeight, // 胶囊所在标题栏高度
		tabBarHeight: tabBarHeight // 底部导航栏高度
	}
}

// 方法：点击把内容复制到剪切板上
function setClipboardData(data) {
	uni.setClipboardData({
		data: data,
		success: function () {
			uni.showToast({
				title: '已复制' + data,
				duration: 1500,
				icon: 'none'
			})
		}
	})
}

// 方法：把就近的时间返回 XX分钟前，当天则显示具体时间，隔天才显示完全的时间
function showDateTime(dateTime) {
	// 转化时间戳的方法
	// 发帖时间的时间戳
	let timestamp_at = new Date(dateTime).getTime();
	// 当前时间的时间戳
	let timestamp_now = new Date().getTime();

	// 相差的时间，转化为了分钟
	let difference = (timestamp_now - timestamp_at) / 1000 / 60;
	// console.log(difference+'分钟前1');
	if (difference < 5) { // 小于1个小时，就显示时间
		return '刚刚';
	} else if (difference >= 5 && difference < 60) {
		// console.log(difference+'分钟前2');
		return Math.floor(difference) + '分钟前'
	} else {
		let theYear = dateTime.substring(0, 4);
		let theMonth = dateTime.substring(5, 7);
		let theDay = dateTime.substring(8, 10);

		let now = new Date();
		let nowYear = now.getFullYear() + '';
		let nowMonth = (now.getMonth() + 1) < 10 ? '0' + (now.getMonth() + 1) : (now.getMonth() + 1) + '';
		let nowDay = now.getDate() < 10 ? '0' + now.getDate() : now.getDate() + '';
		// 同一天的话
		if (theYear == nowYear && theMonth == nowMonth && theDay == nowDay) {
			// console.log(dateTime.substring(11,19));
			// console.log(theYear,theMonth,theDay);
			// console.log(nowYear,nowMonth,nowDay);
			return '今天' + ' ' + dateTime.substring(11, 19);
		} else {
			// console.log(dateTime.substring(11,19));
			// console.log(theYear,theMonth,theDay);
			// console.log(nowYear,nowMonth,nowDay);
			return dateTime;
		}
	}
}

// 返回年月日时分秒的时间，格式如 XXXX-XX-XX_XX:XX:XX
function getNowDateTime() {
	let now = new Date();
	let nowYear = now.getFullYear() + '';
	let nowMonth = (now.getMonth() + 1) < 10 ? '0' + (now.getMonth() + 1) : (now.getMonth() + 1) + '';
	let nowDay = now.getDate() < 10 ? '0' + now.getDate() : now.getDate() + '';
	let nowHours = now.getHours() < 10 ? '0' + now.getHours() : now.getHours() + '';
	let nowMinutes = now.getMinutes() < 10 ? '0' + now.getMinutes() : now.getMinutes() + '';
	let nowSeconds = now.getSeconds() < 10 ? '0' + now.getSeconds() : now.getSeconds() + '';
	return nowYear + '-' + nowMonth + '-' + nowDay + '_' + nowHours + '_' + nowMinutes + '_' + nowSeconds
}

// 功能暂未开放提示
function disabled_tip(type) {
	uni.showToast({
		title: '认证并提升等级，以解锁【' + type + '】功能哦~',
		duration: 1500,
		icon: 'none'
	})
}

function getDateDiff(dateTimeStamp) {
	var result = '';
	var date = (new Date());
	var theDate = new Date(dateTimeStamp).getTime();
	var today = new Date(date.getFullYear(), date.getMonth(), date.getDate()).getTime(); //今天凌晨
	var yestday = new Date(today - 24 * 3600 * 1000).getTime();
	var minute = 1000 * 60;
	var hour = minute * 60;
	var day = hour * 24;
	var halfamonth = day * 15;
	var month = day * 30;
	var now = new Date().getTime();
	var diffValue = now - theDate;
	if (diffValue < 0) { return '刚刚'; }
	var monthC = diffValue / month;
	var weekC = diffValue / (7 * day);
	var dayC = diffValue / day;
	var hourC = diffValue / hour;
	var minC = diffValue / minute;
	if (monthC >= 1) {
		result = "" + parseInt(monthC) + "月前";
	}
	else if (weekC >= 1) {
		result = "" + parseInt(weekC) + "周前";
	}
	else if (dayC >= 1) {
		result = "" + parseInt(dayC) + "天前";
	}
	else if (hourC >= 1) {
		if (theDate < today && yestday <= theDate) {
			result = "昨天";
		} else {
			result = "" + parseInt(hourC) + "小时前";
		}

	}
	else if (minC >= 1) {
		result = "" + parseInt(minC) + "分钟前";
	} else {
		result = "刚刚";
	}
	return result;
}

// 暴露出去的方法
module.exports = {
	getDateDiff,
	strToArr,
	previewImage,
	getTopIconDistance,
	setClipboardData,
	showDateTime,
	getNowDateTime,
	disabled_tip
}