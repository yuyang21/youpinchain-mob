/**
 * 配置编译环境和线上环境之间的切换
 * 
 * baseUrl: 域名地址
 * routerMode: 路由模式
 * imgBaseUrl: 图片所在域名地址
 * 
 */

let baseUrl = ''; 
let routerMode = 'hash';
let imgBaseUrl;


if (process.env.NODE_ENV == 'development') {
	imgBaseUrl = 'http://cangdu.org:8001/img/';
	baseUrl = '/youpin/wx'

}else if(process.env.NODE_ENV == 'production'){
	// baseUrl = 'http://cangdu.org:8001';
	imgBaseUrl = 'http://cangdu.org:8001/img/';
	baseUrl = '/youpin/wx'
}

export {
	baseUrl,
	routerMode,
	imgBaseUrl,
}