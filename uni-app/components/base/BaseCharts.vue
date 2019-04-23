<template>
	<view class='base-charts'>
		<view class="qiun-charts">
			<!--#ifdef H5 || MP-ALIPAY || MP-BAIDU || MP-TOUTIAO-->
			<canvas
				:canvas-id="cavId"
				id="canvasPie"
				class="charts"
				:style="{
					width: cWidth * pixelRatio + 'px',
					height: cHeight * pixelRatio + 'px',
					transform: 'scale(' + 1 / pixelRatio + ')',
					'margin-left': (-cWidth * (pixelRatio - 1)) / 2 + 'px',
					'margin-top': (-cHeight * (pixelRatio - 1)) / 2 + 'px'
				}"
			></canvas>
			<!--#endif-->

			<!--#ifdef MP-WEIXIN || APP-PLUS -->
			<canvas :canvas-id="cavId" id="canvasPie" class="charts"></canvas>
			<!--#endif-->
		</view>
	</view>
</template>

<script>
// wxcharts插件有bug，小程序无法组件引入	

import wxCharts from '@/wxcomponents/wx-charts/wxcharts.js';

var canvaColumn = null;
export default {
	props: {
		// chartsData: [Object,null]
	},

	data() {
		return {
			cWidth: uni.upx2px(750),
			cHeight: uni.upx2px(500),
			pixelRatio: 1,
			cavId: 'cavPie',
			chartsData: {
				series: [
					{ name: '一班', data: 50, color: 'rgb(83, 175, 255)' },
					{ name: '二班', data: 30 },
					{ name: '三班', data: 20 },
					{ name: '四班', data: 18 },
					{ name: '五班', data: 8 },
					{ name: '六班', data: 8 },
					{ name: '七班', data: 8 },
					{ name: '八班', data: 8 },
					{ name: '九班', data: 8 },
					{ name: 'Ⅹ班', data: 8 }
				]
			}
		};
	},

	methods: {
		showPie() {
			const charts = new wxCharts({
				canvasId: this.cavId,
				type: 'pie',
				fontSize: 11,
				legend: true,
				background: '#ffffff',
				pixelRatio: this.pixelRatio,
				series: this.chartsData.series,
				animation: true,
				width: this.cWidth * this.pixelRatio,
				height: this.cHeight * this.pixelRatio,
				dataLabel: true
			});

			charts.addEventListener('renderComplete', () => {
				console.log('renderComplete');
			});
		},

// 		changeData() {
// 			//这里只做了柱状图数据动态更新，其他图表同理。
// 			canvaColumn.updateData({
// 				series: Data.ColumnB.series,
// 				categories: Data.ColumnB.categories
// 			});
// 		},
	},

	watch: {
		chartsData(val) {
			// console.log(this.chartsData);
			// this.showPie();
		}
	},

	created() {
		//#ifdef H5 || MP-ALIPAY || MP-BAIDU || MP-TOUTIAO
		uni.getSystemInfo({
			success: res => {
				if (res.pixelRatio > 1) {
					this.pixelRatio = 2;
					//正常这里_self.pixelRatio给2就行，如果要求高可用下行
					//_self.pixelRatio =res.pixelRatio;
				}
			}
		});
		//#endif
	},

	mounted() {
		this.showPie();
	}
};
</script>

<style>
.charts {
	width: 750upx;
	height: 500upx;
	background-color: #ffffff;
}
</style>
