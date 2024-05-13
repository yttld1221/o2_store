const configJson = {
	dev: '', //本地环境
	publish: '', //线上地址
	release: 'http://10.30.5.36:18007' //测试环境
};
const env = 'dev'; //手动切换环境
export const requestUrl = configJson[env || 'dev'];
export default {
	/**
	 * @description api请求基础路径
	 */
	dev: requestUrl,
	uploadUrl: '/fast-file/fileWithout/uploadGroup/group1',
	env
};
// 线上环境环境跨域代理地址环境(publish,ip:10.)
// 测试环境跨域代理地址环境(release,ip:10.)
// 本地(dev,随意代理)

// vpn pc浏览器 dev模式(线上线下都通用)
