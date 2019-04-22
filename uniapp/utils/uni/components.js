import Vue from 'vue';
import $uni from '@/utils/uni/api.js';

// colorUi cu-custom导航栏参数信息
const nav = function() {
	$uni.system.info().then(e => {
		const {
			statusBarHeight: sH,
			titleBarHeight: tH,
			platform
		} = e;

		// #ifndef MP
		Vue.prototype.StatusBar = sH;
		Vue.prototype.CustomBar = platform === 'android' ? tH + 50 : sH + 45;
		// #endif

		// #ifdef MP-WEIXIN
		Vue.prototype.StatusBar = sH;
		let custom = wx.getMenuButtonBoundingClientRect();
		Vue.prototype.Custom = custom;
		Vue.prototype.CustomBar = custom.bottom + custom.top - sH;
		// #endif

		// #ifdef MP-ALIPAY
		Vue.prototype.StatusBar = sH;
		Vue.prototype.CustomBar = sH + tH;
		// #endif
		
		// #ifdef APP-PLUS
		Vue.prototype.StatusBar = sH;
		Vue.prototype.CustomBar = sH + 50;
		// #endif
	})
}

export default {
	nav
}
