import wxCharts from '@/wxcomponents/wx-charts/wxcharts.js';

export default {
	// 初始化, 需要在created中
	init() {
		//#ifdef H5 || MP-ALIPAY || MP-BAIDU || MP-TOUTIAO
		uni.getSystemInfo({
			success: res => {
				if (res.pixelRatio > 1) {
					this.charts.pixelRatio = res.pixelRatio;
				}
			}
		});
		//#endif
	},

	// 加载
	load() {
		const {
			id,
			pixelRatio,
			width,
			height,
			data: {
				series
			}
		} = this.charts;
		
		if(Object.prototype.toString.call(series) !== '[object Array]' || series.length === 0){
			throw '图表参数series错误';
		}
		
		return new wxCharts({
			canvasId:id,
			type: 'pie',
			fontSize: 11,
			legend: true,
			background: '#ffffff',
			pixelRatio,
			series,
			animation: true,
			width: width * pixelRatio,
			height: height * pixelRatio,
			dataLabel: true
		});
	},

	/**
	 * 更新数据
	 * 
	 * @param {object} exampleObj wxCharts实例对象
	 * @param {array} series charts饼图数据		
	 */
	updateData(exampleObj, series) {
		//这里只做了柱状图数据动态更新，其他图表同理。
		exampleObj.updateData({
			series
		});
	}
}
