const params = {
	// 开发
	development: {
		hostName: 'http://2460392754.ngrok.xiaomiqiu.cn'
		// hostName: 'http://wxsp.2460392754.club'
	},

	// 生产
	Production: {
		hostName: ''
	}
}

const env = process.env.NODE_ENV;

export default {
	...params[env]
}
